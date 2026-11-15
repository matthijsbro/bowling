// The alley, drawn every frame: the room, our lane, whatever lies on it, the pins and the ball.
import { LANE, PIN_SPOTS, type Lane, type Pin, type Prop, type Sim } from '../../shared/sim.ts';
import { SPRITES } from '../cast/sprites.ts';
import { INK, PAPER, blob, boil, fill, hatch, noise, stroke } from './ink.ts';
import { t } from '../i18n.ts';

export type View = { w: number; h: number; camY: number };
/** What the hanging scoreboard shows. */
export type Board = { total: string; frames: number; of: number };
type Pt = [number, number];
const CAM_BACK = 4, PIN_H = 0.5, FAR = LANE.deckEnd, HW = LANE.halfW, GUT = HW + 0.2;
const LANE4 = 1.775; // the centre of the lane next door
let pinScale = 1; // the thousand tiny pins are drawn small

// ---- things with no function at all
const ADS = ['SHOES: NOW WITH LACES', 'ASK ABOUT OUR FLOOR', 'LANE 4 IS FINE', 'NACHOS ARE A VEGETABLE', 'NO REFUNDS ON PRINCIPLES', 'THE PIGEON IS NOT STAFF', 'TRY THE GUTTER. EVERYONE DOES', 'WE HAVE ALWAYS BEEN OPEN'];
/** One pin per frame may have a moustache; rarely one is golden. Worth exactly one pin either way. */
export const quirks = { moustache: -1, golden: -1 };
export function setQuirks(seed: number) {
  const r = (k: number) => Math.abs(Math.sin(seed * 12.9898 + k * 78.233) * 43758.5453) % 1;
  quirks.moustache = r(1) < 0.4 ? Math.floor(r(2) * 10) : -1;
  quirks.golden = r(3) < 0.1 ? Math.floor(r(4) * 10) : -1;
}
const VEND = { x: -1.72, y: FAR - 0.05, h: 1.95 };
let pigeonUp = -1e9; // when it was last startled, in ms
const pigeonAt = (now: number) => {
  const t = now / 1000, fly = Math.min(1, (now - pigeonUp) / 6000), walk = Math.sin(t * 0.13) * 0.4;
  // startled: straight up and out of sight, then it wanders back in as if nothing happened
  return { x: LANE4 - 0.1 + walk, y: FAR - 2.2, z: fly < 1 ? Math.sin(fly * Math.PI) * 4 : Math.abs(Math.sin(t * 5)) * 0.03, flip: Math.cos(t * 0.13) < 0, gone: fly < 0.85 && fly > 0.15 };
};
function rectOf(v: View, x: number, y: number, z: number, h: number, ratio: number) {
  const p = project(v, x, y, z), hh = h * p.s, ww = hh * ratio;
  return { x: p.x - ww / 2, y: p.y - hh, w: ww, h: hh };
}
/** Did that tap land on something pointless? */
export function hitNonsense(v: View, px: number, py: number, now: number): 'vending' | 'pigeon' | null {
  const inside = (r: { x: number; y: number; w: number; h: number }, pad = 0) => px > r.x - pad && px < r.x + r.w + pad && py > r.y - pad && py < r.y + r.h + pad;
  const pg = pigeonAt(now);
  if (!pg.gone && inside(rectOf(v, pg.x, pg.y, pg.z, 0.55, 200 / 190), 12)) { pigeonUp = now; return 'pigeon'; }
  return inside(rectOf(v, VEND.x, VEND.y, 0, VEND.h, 160 / 260)) ? 'vending' : null;
}
const ready = (i: HTMLImageElement) => i.complete && i.naturalWidth > 0;

const stageW = (v: View) => Math.min(v.w, v.h * 0.62);
/** Pixels per metre at the foul line when the camera is at rest. */
export const nearScale = (v: View) => (0.84 * stageW(v)) / (2 * HW);
const horizon = (v: View) => v.h * 0.17;

/** Lane metres (x across, y down-lane, z up) to screen pixels. */
export function project(v: View, x: number, y: number, z = 0) {
  const s0 = nearScale(v), camH = (v.h * 0.9 - horizon(v)) / s0;
  const s = (s0 * CAM_BACK) / Math.max(0.6, y - v.camY + CAM_BACK);
  return { x: v.w / 2 + x * s, y: horizon(v) + (camH - z) * s, s };
}
const P = (v: View, x: number, y: number, z = 0): Pt => { const p = project(v, x, y, z); return [p.x, p.y]; };

function drawPin(ctx: CanvasRenderingContext2D, v: View, x: number, y: number, id: number, lean: number, z = 0) {
  const p = project(v, x, y), u = p.s * PIN_H * pinScale; // u = pin height in px
  if (z > 0.02) { ctx.fillStyle = 'rgba(42,36,32,.18)'; ctx.beginPath(); ctx.ellipse(p.x, p.y, u * 0.22, u * 0.07, 0, 0, 7); ctx.fill(); }
  ctx.save(); ctx.translate(p.x, p.y - z * p.s);
  if (lean) { ctx.translate(0, -u * 0.3); ctx.rotate(lean); ctx.translate(0, u * 0.3); } // a falling pin turns about its belly
  const half = (t: number) => (t < 0.45 ? 0.2 - Math.pow(t - 0.22, 2) * 1.6 : t < 0.7 ? 0.085 : 0.115 - Math.pow(t - 0.86, 2) * 3.5) * u;
  const side = (sgn: number) => Array.from({ length: 9 }, (_, i) => [sgn * half(i / 8), -(i / 8) * u] as Pt);
  const shape = [...side(-1), ...side(1).reverse()];
  fill(ctx, shape, id === quirks.golden ? '#f0c040' : '#fffdf6', u * 0.04, u * 0.02);
  for (const t of [0.58, 0.66]) stroke(ctx, [[-half(t), -t * u], [half(t), -t * u]], id * 9 + t, Math.max(1.5, u * 0.05), '#d6402b');
  stroke(ctx, shape, id * 3.3 + 1, Math.max(1.2, u * 0.035), INK, true);
  if (id === quirks.moustache) stroke(ctx, [[-0.16 * u, -0.8 * u], [-0.05 * u, -0.74 * u], [0, -0.77 * u], [0.05 * u, -0.74 * u], [0.16 * u, -0.8 * u]], 7, Math.max(1.5, u * 0.05));
  ctx.restore();
}

// How each knocked pin is tumbling. Drawing only: the physics just knows it is down.
const tumbling = new WeakMap<Pin, { t: number; ang: number; z: number; vz: number; dir: number }>();
function tumble(p: Pin, t: number) {
  const speed = Math.hypot(p.vx, p.vy);
  let s = tumbling.get(p);
  if (!s) tumbling.set(p, (s = { t, ang: 0, z: 0, vz: Math.min(3, 0.6 + speed * 0.7), dir: p.vx + noise(p.id) * 0.3 >= 0 ? 1 : -1 }));
  for (let dt = Math.min(0.1, t - s.t); dt > 0; dt = 0) {
    s.z += s.vz * dt; s.vz -= 9.8 * dt;
    if (s.z <= 0) { s.z = 0; s.vz = speed > 1.2 ? speed * 0.35 : 0; } // still skidding fast: it hops again
    const lying = (Math.round((s.ang - (s.dir * Math.PI) / 2) / Math.PI) * Math.PI) + (s.dir * Math.PI) / 2;
    if (s.z > 0 || speed > 0.4 || Math.abs(s.ang) < 1.2) s.ang += s.dir * (4 + speed * 5 + (s.z > 0 ? 5 : 0)) * dt;
    else s.ang += (lying - s.ang) * Math.min(1, dt * 12); // come to rest flat on its side
  }
  s.t = t;
  return s;
}

const BALL_COLOR: Record<string, string> = { perfect: '#f0c040', wobble: '#8a9a5b', smooth: '#5aa6c9', cracked: '#a8743a', foam: '#e79ab0', heavy: '#3a3a40' };
/** The ball. Its three finger holes are its face, and it has opinions about where it is going. */
function drawBall(ctx: CanvasRenderingContext2D, v: View, x: number, y: number, kind: Lane['ball'], mood: 'calm' | 'go' | 'fear', speed: number) {
  const rr = kind === 'heavy' ? 0.17 : LANE.ballR, p = project(v, x, y, rr), r = p.s * rr * 1.25, roll = y * 5;
  const floor = project(v, x, y), shape = kind === 'wobble' || kind === 'cracked' ? blob(p.x, p.y, r * 1.08, r * 0.9, 14, roll) : blob(p.x, p.y, r, r);
  ctx.fillStyle = 'rgba(42,36,32,.22)';
  ctx.beginPath(); ctx.ellipse(floor.x + r * 0.2, floor.y, r * 1.05, r * 0.3, 0, 0, 7); ctx.fill();
  if (speed > 4) for (const dx of [-0.6, 0, 0.6]) // going fast: three quick pen lines behind it
    stroke(ctx, [[p.x + dx * r, p.y + r * 1.25], [p.x + dx * r * 1.15, p.y + r * (1.5 + speed * 0.09)]], dx * 9 + Math.floor(y * 4), Math.max(1, r * 0.07), 'rgba(42,36,32,.55)');
  fill(ctx, shape, BALL_COLOR[kind ?? ''] ?? '#3f7fbf', r * 0.07, r * 0.05);
  // a stripe going round shows it is rolling, while the face stays upright, as faces should
  const band = Math.sin(roll) * r * 0.75, w = Math.sqrt(Math.max(0, r * r - band * band)) * 0.92;
  stroke(ctx, [[p.x - w, p.y + band], [p.x, p.y + band + r * 0.12 * Math.cos(roll)], [p.x + w, p.y + band]], 31, Math.max(1, r * 0.06), 'rgba(255,253,246,.45)');
  if (kind === 'cracked') stroke(ctx, [[p.x - r * 0.5, p.y - r * 0.7], [p.x - r * 0.1, p.y - r * 0.3], [p.x - r * 0.4, p.y], [p.x, p.y + r * 0.5]], 3, 1.5);
  const bob = Math.sin(roll * 0.7) * r * 0.05, ey = p.y - r * 0.12 + bob, wide = mood === 'fear' ? 1.5 : 1;
  ctx.fillStyle = INK;
  for (const dx of [-0.27, 0.27]) { ctx.beginPath(); ctx.ellipse(p.x + dx * r, ey, r * 0.1 * wide, r * 0.12 * wide, 0, 0, 7); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(p.x, ey + r * 0.42, r * (mood === 'fear' ? 0.2 : 0.11), r * (mood === 'fear' ? 0.24 : mood === 'go' ? 0.07 : 0.11), 0, 0, 7); ctx.fill();
  const brow = Math.max(1.5, r * 0.09);
  if (mood === 'go') for (const sgn of [-1, 1]) stroke(ctx, [[p.x + sgn * r * 0.45, ey - r * 0.36], [p.x + sgn * r * 0.14, ey - r * 0.2]], sgn * 4, brow);
  if (mood === 'fear') {
    for (const sgn of [-1, 1]) stroke(ctx, [[p.x + sgn * r * 0.45, ey - r * 0.28], [p.x + sgn * r * 0.16, ey - r * 0.42]], sgn * 4, brow);
    stroke(ctx, blob(p.x + r * 0.95, p.y - r * 0.7, r * 0.1, r * 0.17, 6), 8, 1.2, '#3f7fbf', true);
  }
  stroke(ctx, blob(p.x - r * 0.38, p.y - r * 0.5, r * 0.2, r * 0.1, 6, -0.6), 5, 1.2, 'rgba(255,255,255,.8)', true);
  stroke(ctx, shape, 42, Math.max(1.5, r * 0.09), INK, true);
}

function drawProp(ctx: CanvasRenderingContext2D, v: View, kind: Prop['kind'], x: number, y: number, hit = false) {
  const hurt = `${kind}Hurt` as keyof typeof SPRITES;
  const img = (hit && SPRITES[hurt] ? SPRITES[hurt] : SPRITES[kind])[boil], p = project(v, x, y);
  if (!ready(img)) return;
  const jolt = hit ? noise(performance.now() * 0.05) * p.s * 0.02 : 0; // whoever has been hit is still shaking
  if (kind !== 'fatman') { // upright, feet on its spot
    const h = p.s * (kind === 'bucket' ? 0.5 : kind === 'stray' ? 0.3 : 1.5), w = (h * img.naturalWidth) / img.naturalHeight;
    ctx.drawImage(img, p.x - w / 2 + jolt, p.y - h * 0.92, w, h);
  } else { // lying across the lane, head to the left
    const len = p.s * 1.2, thick = (len * 200) / 260;
    ctx.save(); ctx.translate(p.x + jolt, p.y - thick * 0.3); ctx.rotate(-Math.PI / 2);
    ctx.drawImage(img, -thick / 2, -len / 2, thick, len); ctx.restore();
  }
}

/** A sign painted on something: straight on, in the house handwriting. */
function label(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, size: number, color: string, maxW?: number, tilt = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(tilt);
  ctx.font = `${Math.max(7, size)}px "Patrick Hand", cursive`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = color;
  ctx.fillText(text, 0, 0, maxW); ctx.restore();
}

/** Everything that is not our lane: the room it stands in. */
function drawRoom(ctx: CanvasRenderingContext2D, v: View, near: number, now: number, board: Board) {
  const quad = (x1: number, x2: number, y1 = near, y2 = FAR, z = 0): Pt[] => [P(v, x1, y1, z), P(v, x2, y1, z), P(v, x2, y2, z), P(v, x1, y2, z)];
  const wall = (x1: number, x2: number, z1: number, z2: number): Pt[] => [P(v, x1, FAR, z2), P(v, x2, FAR, z2), P(v, x2, FAR, z1), P(v, x1, FAR, z1)];
  const floorY = P(v, 0, FAR)[1], right = 3.4, left = -3.4;
  ctx.fillStyle = '#c9d6c3'; ctx.fillRect(0, 0, v.w, floorY);          // the back wall
  hatch(ctx, 0, 0, v.w, floorY * 0.5, 4, 11);
  ctx.fillStyle = '#b3a288'; ctx.fillRect(0, floorY, v.w, v.h - floorY); // the walkway on the left
  stroke(ctx, [[0, floorY], [v.w, floorY]], 70, 2);

  // carpet from another decade, on the walkway
  for (let i = 0; i < 16; i++) {
    const cx = -1.0 - Math.abs(noise(i * 3.7)) * 1.9, cy = 0.6 + Math.abs(noise(i * 5.1 + 2)) * 10, c = ['#d6402b', '#3aa6a0', '#f0c040', '#7a5cc0'][i % 4];
    if (cy < near + 0.4) continue;
    stroke(ctx, [P(v, cx - 0.12, cy), P(v, cx - 0.04, cy + 0.16), P(v, cx + 0.05, cy), P(v, cx + 0.13, cy + 0.16)], 200 + i, 1.6, c);
  }

  // lane 4, next door: somebody else's game, half played
  fill(ctx, quad(GUT, right), '#8a7a68', 0, 0);                                   // the strip between the lanes, and beyond
  fill(ctx, quad(LANE4 - GUT, LANE4 + GUT), '#6f6258', 0, 0);
  fill(ctx, quad(LANE4 - HW, LANE4 + HW), '#dcb476', 3, 0);
  for (const x of [LANE4 - GUT, LANE4 - HW, LANE4 + HW, LANE4 + GUT]) stroke(ctx, [P(v, x, near), P(v, x, FAR)], x * 7, 2);
  for (let i = -2; i <= 2; i++) stroke(ctx, [P(v, LANE4 + i * 0.17, near), P(v, LANE4 + i * 0.17, FAR)], 40 + i, 1, 'rgba(120,80,30,.3)');
  // the ball return runs along the strip; there is gum under it, as there always is
  stroke(ctx, [P(v, GUT + 0.16, Math.max(near, 0.3), 0.14), P(v, GUT + 0.16, FAR, 0.14)], 55, 4, '#5d6670');
  stroke(ctx, [P(v, GUT + 0.16, Math.max(near, 0.3), 0.14), P(v, GUT + 0.16, FAR, 0.14)], 56, 1);
  stroke(ctx, blob(...P(v, GUT + 0.15, 7.2, 0.04), 4, 2.5, 6), 57, 1, '#e07a8a', true);

  // the pit and the mask above it, across both lanes
  const pitL = -GUT - 0.12, pitR = LANE4 + GUT + 0.12;
  fill(ctx, wall(pitL, pitR, 0, 0.95), '#2b2320'); hatch(ctx, ...P(v, pitL, FAR, 0.95), P(v, pitR, FAR)[0] - P(v, pitL, FAR)[0], (floorY - P(v, 0, FAR, 0.95)[1]) * 0.5, 12, 6);
  fill(ctx, wall(pitL, pitR, 0.95, 1.9), '#3aa6a0');
  stroke(ctx, wall(pitL, pitR, 0, 1.9), 77, 2.5, INK, true);
  stroke(ctx, [P(v, pitL, FAR, 0.95), P(v, pitR, FAR, 0.95)], 78, 2);
  stroke(ctx, [P(v, GUT + 0.16, FAR, 0), P(v, GUT + 0.16, FAR, 1.9)], 79, 2);
  const mask = project(v, 0, FAR, 1.42), ad = t(ADS[Math.floor(now / 7000) % ADS.length]);
  label(ctx, '3', mask.x - mask.s * 0.6, mask.y, mask.s * 0.5, '#fffdf6');
  label(ctx, ad, mask.x + mask.s * 0.12, mask.y, mask.s * 0.19, 'rgba(255,253,246,.85)', mask.s * 1.05, -0.012); // the mask rents itself out
  label(ctx, '4', project(v, LANE4, FAR, 1.42).x, mask.y, mask.s * 0.5, '#fffdf6');
  // their pins: seven left, and nobody is in a hurry
  for (const id of [9, 8, 7, 5, 4, 2, 0]) drawPin(ctx, v, LANE4 + PIN_SPOTS[id][0], PIN_SPOTS[id][1], 20 + id, 0);

  // the left wall: a clock that stopped at ten past seven, and the league photo with one face scratched out
  const clock = project(v, VEND.x, FAR, 2.45), cr = clock.s * 0.2;
  fill(ctx, blob(clock.x, clock.y, cr, cr, 12), '#fffdf6', 2, 1); stroke(ctx, blob(clock.x, clock.y, cr, cr, 12), 81, 2, INK, true);
  stroke(ctx, [[clock.x, clock.y], [clock.x - cr * 0.3, clock.y + cr * 0.45]], 82, 2); stroke(ctx, [[clock.x, clock.y], [clock.x + cr * 0.65, clock.y - cr * 0.35]], 83, 1.5);
  const ph = wall(-1.25, -0.87, 1.25, 1.75);
  fill(ctx, ph, '#e9e2cf', 2, 1); stroke(ctx, ph, 84, 2, INK, true);
  for (let i = 0; i < 5; i++) {
    const head = P(v, -1.19 + i * 0.065, FAR, 1.52);
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(head[0], head[1], Math.max(1.2, clock.s * 0.022), 0, 7); ctx.fill();
    if (i === 3) stroke(ctx, [[head[0] - 3, head[1] - 3], [head[0] + 3, head[1] + 3], [head[0] - 3, head[1] + 2], [head[0] + 3, head[1] - 3]], 85, 1.3, '#d6402b');
  }

  // a string of pennants, and the lamps
  const flags = ['#d6402b', '#f0c040', '#3f7fbf', '#3aa6a0', '#e07a8a'];
  for (let i = 0; i < 16; i++) {
    const x1 = left + 0.3 + i * 0.4, sag = (i: number) => 2.95 - Math.sin((i / 16) * Math.PI) * 0.22;
    const a = P(v, x1, FAR, sag(i)), b = P(v, x1 + 0.4, FAR, sag(i + 1)), tip = P(v, x1 + 0.2, FAR, sag(i + 0.5) - 0.28);
    fill(ctx, [a, b, tip], flags[i % 5], 1, 1); stroke(ctx, [a, b, tip], 90 + i, 1.2, INK, true);
  }
  for (const [lx, ly] of [[0, 8.6], [LANE4, 8.6], [-1.7, 9.4]]) {
    const top = project(v, lx, ly, 3.35), s = top.s;
    stroke(ctx, [[top.x, 0], [top.x, top.y]], 120 + lx, 1.5);
    const shade: Pt[] = [[top.x - s * 0.1, top.y], [top.x + s * 0.1, top.y], [top.x + s * 0.3, top.y + s * 0.22], [top.x - s * 0.3, top.y + s * 0.22]];
    ctx.fillStyle = 'rgba(255,240,170,.13)'; ctx.beginPath(); ctx.moveTo(shade[3][0], shade[3][1]); ctx.lineTo(shade[2][0], shade[2][1]);
    ctx.lineTo(top.x + s * 1.1, top.y + s * 3.3); ctx.lineTo(top.x - s * 1.1, top.y + s * 3.3); ctx.fill(); // the light it throws
    fill(ctx, shade, '#f0c040', 2, 1); stroke(ctx, shade, 121 + lx, 2, INK, true);
  }

  // the scoreboard hangs over our lane. It has a dead pixel.
  const m = wall(-0.78, 0.78, 2.12, 2.82), mc = project(v, 0, FAR, 2.47), ms = mc.s;
  for (const x of [-0.6, 0.6]) stroke(ctx, [P(v, x, FAR, 2.82), [P(v, x, FAR, 2.82)[0], 0]], 130 + x, 1.5);
  fill(ctx, m, '#22302b', 3, 2); stroke(ctx, m, 131, 2.5, INK, true);
  label(ctx, t('LANE 3'), mc.x - ms * 0.42, mc.y - ms * 0.17, ms * 0.17, '#9be28a');
  label(ctx, board.total, mc.x + ms * 0.4, mc.y - ms * 0.02, ms * 0.44, '#9be28a', ms * 0.62);
  for (let i = 0; i < board.of; i++) { // one pip per frame, lit when played
    ctx.fillStyle = i < board.frames ? '#9be28a' : '#3d5248';
    ctx.fillRect(mc.x - ms * 0.7 + i * ms * 0.085, mc.y + ms * 0.14, ms * 0.055, ms * 0.07);
  }
  ctx.fillStyle = '#d6402b'; ctx.fillRect(mc.x + ms * 0.66, mc.y - ms * 0.27, Math.max(1.5, ms * 0.02), Math.max(1.5, ms * 0.02));

  // the two residents
  const vend = SPRITES.vending[boil], vr = rectOf(v, VEND.x, VEND.y, 0, VEND.h, 160 / 260);
  if (ready(vend)) ctx.drawImage(vend, vr.x, vr.y, vr.w, vr.h);
  const pg = pigeonAt(now), pr = rectOf(v, pg.x, pg.y, pg.z, 0.55, 200 / 190), bird = SPRITES.pigeon[boil];
  if (!pg.gone && ready(bird)) {
    ctx.save(); ctx.translate(pr.x + pr.w / 2, pr.y); if (pg.flip) ctx.scale(-1, 1);
    ctx.drawImage(bird, -pr.w / 2, 0, pr.w, pr.h); ctx.restore();
  }
}

export function drawLane(ctx: CanvasRenderingContext2D, v: View, sim: Sim | null, lane: Lane, aimX: number, showBall: boolean, onFloor: () => void, board: Board) {
  pinScale = 1;
  const near = v.camY - CAM_BACK + 0.7;
  ctx.fillStyle = PAPER; ctx.fillRect(0, 0, v.w, v.h);
  drawRoom(ctx, v, near, performance.now(), board);
  pinScale = lane.tiny ? 0.5 : 1;

  // gutters, then our lane on top
  const quad = (x1: number, x2: number): Pt[] => [P(v, x1, near), P(v, x2, near), P(v, x2, FAR), P(v, x1, FAR)];
  fill(ctx, quad(-GUT, GUT), lane.wide ? '#e6bf82' : '#6f6258', 0, 0); // a wide lane has wood where the gutters were
  fill(ctx, quad(-HW, HW), '#e6bf82', 4, 0);
  for (let i = -3; i <= 3; i++) stroke(ctx, [P(v, i * 0.13, near), P(v, i * 0.13, FAR)], 20 + i, 1, 'rgba(120,80,30,.4)');
  for (let i = -3; i <= 3; i++) { // aiming arrows
    const ay = 3.4 - Math.abs(i) * 0.25, ax = i * 0.13;
    stroke(ctx, [P(v, ax - 0.03, ay), P(v, ax, ay + 0.3), P(v, ax + 0.03, ay)], 60 + i, 1.6, '#9c4a2a');
  }
  for (const x of [-GUT, -HW, HW, GUT]) stroke(ctx, [P(v, x, near), P(v, x, FAR)], x * 10, 2.5);
  if (lane.bumpers) for (const x of [-HW - 0.1, HW + 0.1]) stroke(ctx, [P(v, x, Math.max(near, 0), 0.12), P(v, x, FAR, 0.12)], x * 5, 7, '#e07a8a');
  stroke(ctx, [P(v, -HW, 0), P(v, HW, 0)], 90, 3); // foul line
  stroke(ctx, [P(v, -HW, LANE.length - 0.25), P(v, HW, LANE.length - 0.25)], 91, 1.2, 'rgba(42,36,32,.5)');

  onFloor(); // whatever is lying on the wood goes under the pins, the ball and everybody's feet

  // pins and ball, far to near
  type Item = { y: number; draw: () => void };
  const items: Item[] = sim
    ? sim.pins.filter((p) => !p.out).map((p) => ({
        y: p.y,
        draw: () => { const t = p.down ? tumble(p, sim.t) : null; drawPin(ctx, v, p.x, p.y, p.id, t?.ang ?? 0, t?.z ?? 0); },
      }))
    : PIN_SPOTS.flatMap(([x, y], id) => (lane.standing[id] ? [{ y, draw: () => drawPin(ctx, v, x, y, id, 0) }] : []));
  // pins a dilemma knocked flat before you got here
  for (const id of lane.flat ?? []) { const [x, y] = PIN_SPOTS[id]; items.push({ y: y - 0.01, draw: () => drawPin(ctx, v, x + 0.08, y, id, id % 2 ? 1.5 : -1.55) }); }
  for (const p of lane.props ?? []) if (p.kind === 'fatman' || !sim) items.push({ y: p.y, draw: () => drawProp(ctx, v, p.kind, p.x, p.y, p.kind === 'fatman' && !!sim?.fatmanHit) });
  for (const b of sim?.props ?? []) if (b.kind !== 'fatman') items.push({ y: b.y, draw: () => drawProp(ctx, v, b.kind, b.x, b.y, b.hit) });
  if (sim) {
    const b = sim.ball, scared = b.gutter || Math.abs(b.x) > 0.4 || sim.props.some((q) => q.kind !== 'bucket' && q.kind !== 'stray' && !q.hit && q.y > b.y && q.y - b.y < 1.6 && Math.abs(q.x - b.x) < 0.3);
    if (b.y < FAR) items.push({ y: b.y, draw: () => drawBall(ctx, v, b.x, b.y, lane.ball, scared ? 'fear' : 'go', Math.hypot(b.vx, b.vy)) });
  } else if (showBall) items.push({ y: 0, draw: () => drawBall(ctx, v, aimX, 0, lane.ball, 'calm', 0) });
  items.sort((a, b) => b.y - a.y).forEach((it) => it.draw());
}
