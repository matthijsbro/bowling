// Deterministic bowling: fixed time step, only + - * / sqrt and floor, so every device
// and the server get the same pins from the same throw.
export const LANE = { halfW: 0.525, length: 10, deckEnd: 11.3, ballR: 0.11, pinR: 0.06, pinDownR: 0.06 };
export const DT = 1 / 120;
const HOOK = 1.2, BALL_M = 6, PIN_M = 1.5, BOUNCE = 0.45, PIN_DRAG = 4, WALL = LANE.halfW + 0.15;

export type Throw = { x: number; vx: number; vy: number; spin: number };
/** bucket: can be knocked about. fatman: lying across, worth nine pins. lump: stands still. runner, stray: cross the lane back and forth. */
export type Prop = { kind: 'bucket' | 'fatman' | 'lump' | 'runner' | 'stray'; x: number; y: number; rate?: number };
export type BallKind = 'wobble' | 'perfect' | 'smooth' | 'cracked' | 'foam' | 'heavy';
/** Everything a dilemma can do to the lane. */
export type Lane = {
  standing: boolean[]; flat?: number[]; props?: Prop[]; bumpers?: boolean; ball?: BallKind;
  curve?: number;   // the lane drags the ball sideways
  sway?: number;    // the ball drifts left and right (socks, shaky aim, a talker next door)
  speed?: number;   // multiplies ball speed (dry lane, bowling softly)
  wide?: boolean;   // no gutters
  screen?: boolean; // the pins are a screen: any throw is a strike
  zeno?: boolean;   // the ball covers a fraction of the remaining distance each second
  tiny?: boolean;   // drawing only: miserable little pins
};
const BALLS: Record<BallKind, { sway?: number; pull?: number; m?: number; r?: number; speed?: number }> = {
  wobble: { sway: 3 }, perfect: { pull: 5 }, smooth: { pull: 1.5 }, cracked: { pull: 5, sway: 2 },
  foam: { m: 0.9, speed: 0.85 }, heavy: { m: 25, r: 0.17, speed: 0.5 },
};

type Body = { x: number; y: number; vx: number; vy: number; r: number; m: number };
export type Pin = Body & { id: number; down: boolean; out: boolean };
export type Ball = Body & { spin: number; gutter: boolean };
export type PropBody = Body & { kind: Prop['kind']; x0: number; rate: number; hit?: boolean };
/** Things worth drawing: what the ball ran into, and where. Never used for scoring. */
export type SimEvent = { kind: Prop['kind'] | 'pins'; x: number; y: number };
export type Sim = { lane: Lane; ball: Ball; pins: Pin[]; props: PropBody[]; fatmanHit: boolean; zenoK: number; auto: boolean; events: SimEvent[]; t: number; done: boolean };

// Standard numbering: index 0 is the head pin, 6 and 9 are the 7 and the 10.
export const PIN_SPOTS: [number, number][] = [];
for (let r = 0; r < 4; r++) for (let i = 0; i <= r; i++) PIN_SPOTS.push([(i - r / 2) * 0.305, LANE.length + r * 0.264]);
export const fullRack = () => Array<boolean>(10).fill(true);

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, Number.isFinite(v) ? v : lo));
const tri = (u: number) => 4 * Math.abs(u - Math.floor(u + 0.5)) - 1; // triangle wave, -1..1

/** Trust boundary: throws arrive from clients. */
export const clampThrow = (t: Throw): Throw => ({
  x: clamp(t.x, -(LANE.halfW - LANE.ballR), LANE.halfW - LANE.ballR),
  vx: clamp(t.vx, -2, 2),
  vy: clamp(t.vy, 3, 10),
  spin: clamp(t.spin, -1, 1),
});

export function createSim(lane: Lane, t: Throw): Sim {
  const c = clampThrow(t), kind = lane.ball ? BALLS[lane.ball] : {};
  const body = (p: Prop, dx: number, r: number, m: number): PropBody => ({ kind: p.kind, x: p.x + dx, y: p.y, vx: 0, vy: 0, r, m, x0: p.x + dx, rate: p.rate ?? 0.4 });
  return {
    lane,
    ball: { x: c.x, y: 0, vx: c.vx, vy: c.vy * (lane.speed ?? 1) * (kind.speed ?? 1), r: kind.r ?? LANE.ballR, m: kind.m ?? BALL_M, spin: c.spin, gutter: false },
    pins: PIN_SPOTS.flatMap(([x, y], id) =>
      lane.standing[id] ? [{ id, x, y, vx: 0, vy: 0, r: LANE.pinR, m: PIN_M, down: false, out: false }] : []),
    props: (lane.props ?? []).flatMap((p): PropBody[] =>
      p.kind === 'bucket' ? [body(p, 0, 0.14, 3)]
      // the Fat Man lies across the lane as three fixed lumps, leaving a gap on the right
      : p.kind === 'fatman' ? [-0.26, 0, 0.26].map((dx) => body(p, dx, 0.16, 1e9))
      : [body(p, 0, p.kind === 'stray' ? LANE.ballR : 0.2, 1e9)]),
    fatmanHit: false,
    zenoK: c.vy / 7,
    auto: false,
    events: [],
    t: 0,
    done: false,
  };
}

function collide(a: Body, b: Body): boolean {
  const dx = b.x - a.x, dy = b.y - a.y, min = a.r + b.r, d2 = dx * dx + dy * dy;
  if (d2 >= min * min || d2 === 0) return false;
  const d = Math.sqrt(d2), nx = dx / d, ny = dy / d;
  const push = (min - d) / (a.m + b.m);
  a.x -= nx * push * b.m; a.y -= ny * push * b.m;
  b.x += nx * push * a.m; b.y += ny * push * a.m;
  const rel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
  if (rel >= 0) return false;
  const j = (-(1 + BOUNCE) * rel) / (1 / a.m + 1 / b.m);
  a.vx -= (j / a.m) * nx; a.vy -= (j / a.m) * ny;
  b.vx += (j / b.m) * nx; b.vy += (j / b.m) * ny;
  return true;
}

const topple = (p: Pin) => { p.down = true; p.r = LANE.pinDownR; };
const slow = (b: Body) => b.vx * b.vx + b.vy * b.vy < 0.0025;

export function stepSim(s: Sim): void {
  if (s.done) return;
  const { ball, pins, lane } = s;
  s.t += DT;

  if (!ball.gutter) {
    const kind = lane.ball ? BALLS[lane.ball] : {}, sway = (lane.sway ?? 0) + (kind.sway ?? 0);
    let ax = ball.y < LANE.length ? ball.spin * HOOK * (ball.y / LANE.length) : 0;
    ax += (lane.curve ?? 0) + tri(s.t * 1.6) * sway;
    if (kind.pull) ax += (0.05 - ball.x) * kind.pull - ball.vx * kind.pull * 0.5;
    ball.vx += ax * DT;
    ball.x += ball.vx * DT;
    if (Math.abs(ball.x) > LANE.halfW + (lane.wide ? 0.2 : 0) && ball.y < LANE.length - 0.3) {
      const side = ball.x > 0 ? 1 : -1;
      if (lane.bumpers) { ball.x = side * (LANE.halfW + (lane.wide ? 0.2 : 0)); ball.vx *= -0.8; }
      else { ball.gutter = true; ball.x = side * (LANE.halfW + (lane.wide ? 0.29 : 0.09)); ball.vx = 0; }
    }
  }
  if (lane.zeno && !s.auto) {
    // Zeno: always most of the way there. Within a hair of the head pin before the buzzer and the pins give up.
    ball.vy = Math.max(0, LANE.length - 0.25 - ball.y) * s.zenoK;
    if (s.t > 4) { ball.vx = ball.vy = 0; s.auto = true; }
    else if (!ball.gutter && ball.y > LANE.length - 0.45) { ball.vx = ball.vy = 0; s.auto = true; for (const p of pins) topple(p); }
  }
  if (lane.screen && !s.auto && ball.y > LANE.length) { s.auto = true; for (const p of pins) topple(p); }
  ball.y += ball.vy * DT;

  const drag = 1 - PIN_DRAG * DT;
  const live = pins.filter((p) => !p.out);
  for (const p of live) {
    if (!p.down) continue;
    p.x += p.vx * DT; p.y += p.vy * DT;
    p.vx *= drag; p.vy *= drag;
    if (Math.abs(p.x) > WALL) { p.x = p.x > 0 ? WALL : -WALL; p.vx *= -0.5; }
    if (p.y > LANE.deckEnd || p.y < LANE.length - 1.5) { p.out = true; p.vx = p.vy = 0; }
  }
  for (const b of s.props) {
    if (b.kind === 'fatman') {
      if (!ball.gutter && !s.fatmanHit && collide(b, ball)) {
        // he is worth nine pins: everything but the 10 goes down with him
        s.fatmanHit = true;
        s.events.push({ kind: 'fatman', x: ball.x, y: b.y });
        ball.vx = ball.vy = 0;
        for (const p of live) if (p.id < 9) topple(p); // they fall where they stand, so the 10 is safe
      }
      continue;
    }
    if (b.kind !== 'bucket') { // stands, or paces back and forth across the lane, and does not budge
      if (b.kind !== 'lump') b.x = b.kind === 'runner' ? tri(s.t * b.rate) * 0.42 : tri(s.t * b.rate + b.x0) * 0.85;
      b.vx = b.vy = 0;
      if (!ball.gutter && collide(b, ball) && !b.hit) { b.hit = true; s.events.push({ kind: b.kind, x: b.x, y: b.y }); }
      b.vx = b.vy = 0;
      continue;
    }
    b.x += b.vx * DT; b.y += b.vy * DT;
    b.vx *= drag; b.vy *= drag;
    if (Math.abs(b.x) > WALL) { b.x = b.x > 0 ? WALL : -WALL; b.vx *= -0.5; }
    if (!ball.gutter && collide(ball, b) && !b.hit) { b.hit = true; s.events.push({ kind: 'bucket', x: b.x, y: b.y }); }
    for (const p of live) if (!slow(b) && collide(b, p)) topple(p);
  }
  for (let i = 0; i < live.length; i++) {
    const p = live[i];
    if (!ball.gutter && collide(ball, p)) { if (!s.events.some((e) => e.kind === 'pins')) s.events.push({ kind: 'pins', x: p.x, y: p.y }); topple(p); }
    for (let k = i + 1; k < live.length; k++) {
      const q = live[k];
      if ((p.down || q.down) && collide(p, q)) { topple(p); topple(q); }
    }
  }

  const still = pins.every((p) => p.out || slow(p)) && s.props.every(slow);
  const ballGone = ball.y > LANE.deckEnd + 0.5 || ball.y < -1 || slow(ball) || (ball.vy < 0.3 && s.t > 6);
  s.done = (ballGone && still) || s.t > 10;
}

export function standingAfter(s: Sim): boolean[] {
  const up = new Set(s.pins.filter((p) => !p.down).map((p) => p.id));
  return s.lane.standing.map((was, id) => was && up.has(id));
}

export function runThrow(lane: Lane, t: Throw): { standing: boolean[]; fatmanHit: boolean } {
  const s = createSim(lane, t);
  while (!s.done) stepSim(s);
  return { standing: standingAfter(s), fatmanHit: s.fatmanHit };
}
