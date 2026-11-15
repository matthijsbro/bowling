// Ties it together: one lane, one cast layer, one paper layer, and the engine deciding what is true.
// Alone or passing one device round, the engine runs right here. Online, the server runs it and sends us our view.
import '@fontsource/patrick-hand/latin-400.css';
import './style.css';
import { cardOf, frameDone, newGame, step, summary, toRemember, type Ev, type View } from '../shared/engine.ts';
import { DT, LANE, createSim, fullRack, standingAfter, stepSim, type Lane, type Sim, type Throw } from '../shared/sim.ts';
import type { OptionId } from '../shared/types.ts';
import { isMuted, rollStart, rollStop, setMuted, sfx, unlock } from './audio.ts';
import { boilDefs, startBoil } from './cast/draw.ts';
import { lang, setLang, t } from './i18n.ts';
import * as net from './net.ts';
import { SCENES, TITLE } from './scenes.ts';
import { placeActors, poke, react, setScene } from './stage/actors.ts';
import { bubble } from './stage/bubble.ts';
import { burst, clearFx, drawFx, drawStains } from './stage/fx.ts';
import { tickBoil } from './stage/ink.ts';
import { drawLane, hitNonsense, nearScale, quirks, setQuirks, type View as Camera } from './stage/lane.ts';
import { QUIPS, render, type Ui } from './ui.ts';

const canvas = document.querySelector<HTMLCanvasElement>('#stage')!, fxCanvas = document.querySelector<HTMLCanvasElement>('#fx')!;
const ui = document.querySelector<HTMLElement>('#ui')!, actors = document.querySelector<HTMLElement>('#actors')!;
const ctx = canvas.getContext('2d')!, fxCtx = fxCanvas.getContext('2d')!;
const view: Camera = { w: 0, h: 0, camY: 0 };
const emptyLane: Lane = { standing: fullRack() };
const store = (k: string, v?: string) => { try { if (v !== undefined) localStorage.setItem(k, v); return localStorage.getItem(k) ?? ''; } catch { return ''; } };
/** The rules the alley remembers of you alone, kept on this device and, if you are signed in, in your account. */
const remembered = (): string[] => { try { return (JSON.parse(store('sd.rules') || '[]') as unknown[]).filter((x): x is string => typeof x === 'string'); } catch { return []; } };

let game: View | null = null;
const u: Ui = {
  screen: 'title', mode: 'solo', show: 'bowl', me: 'p0', handed: false, sliders: false, read: false, explaining: false, boardOpen: false, thump: null, note: '',
  best: Number(store('sd.best.5')) || 0, serverUp: false, room: null, qr: '', error: '', name: store('sd.name'), team: '', names: [], quip: QUIPS[Math.floor(Math.random() * QUIPS.length)],
  account: null, codeFor: '', remembered: remembered(),
};
let sim: Sim | null = null, thrown: Throw | null = null, inGutter = false, seen = 0, aimX = 0, acc = 0, last = 0, busyUntil = 0, shake = 0, beat = 0;

const inScene = () => u.screen === 'game' && (u.show === 'card' || u.show === 'react' || u.show === 'split');
function paint() {
  document.documentElement.lang = lang;
  canvas.setAttribute('aria-label', t('Bowling lane. Drag back and flick to throw.'));
  setScene(u.screen !== 'game' ? TITLE : game && inScene() ? SCENES[cardOf(game).id] ?? null : null);
  ui.innerHTML = render(game, u);
}
const jolt = () => { shake = 1; };

/** Whose turn it is on this device. */
function whoIsUp(g: View): string {
  if (u.mode === 'online') return `p${u.room?.you ?? 0}`;
  if (u.mode === 'solo') return 'p0';
  if (g.phase === 'card') return g.players.find((p) => !(p.id in g.votes))?.id ?? u.me;
  if (g.phase === 'bowl') return g.players.find((p) => !frameDone(g.bowl[p.id]))?.id ?? u.me;
  return u.me;
}
const showFor = (g: View) => (g.phase === 'end' ? 'end' : g.phase === 'bowl' ? 'bowl' : g.phase === 'aftermath' ? 'aftermath' : g.phase === 'split' ? 'split' : 'card');

/** A new state of the game arrives, from our own engine or from the server. Work out what to show. */
function apply(next: View) {
  const before = game;
  game = next;
  if (before === next) return;
  const fresh = !before || before.frame !== next.frame || before.cards !== next.cards && before.log.length > next.log.length;
  const decided = before && !fresh && (before.phase === 'card' || before.phase === 'split') && next.phase !== 'card' && next.phase !== 'split';
  if (fresh || (before.phase === 'aftermath' && next.phase !== 'aftermath')) {
    clearTimeout(beat); clearFx(); setQuirks(next.rng + next.frame);
    if (next.phase === 'card') sfx.blip();
    Object.assign(u, { read: false, explaining: false, boardOpen: false, handed: false, thump: null, note: '', show: showFor(next), me: whoIsUp(next) });
    if (next.phase === 'end') celebrate(next);
  } else if (decided) {
    // the decision lands: the cast reacts, the rule thumps down, then the lane is yours
    const added = next.stamps.slice(before.stamps.length), way = next.log.at(-1)?.split;
    const st = added.find((s) => s.why) ?? added[0] ?? (way === 'takeBack' ? next.stamps[before.splitAgainst!] : undefined);
    u.thump = st && !st.struck ? { text: t(st.text), cls: st.why ? 'why' : '' } : { text: t(way === 'shrug' ? 'Shrug noted.' : next.decision ? 'Decided.' : 'Everyone has chosen.'), cls: 'plain' };
    Object.assign(u, { show: 'react', explaining: false, boardOpen: false });
    react(next.decision ? SCENES[cardOf(before).id]?.react?.[next.decision] : undefined, jolt);
    window.setTimeout(sfx.thump, 250); // the stamp lands
    beat = window.setTimeout(() => {
      if (!game) return;
      Object.assign(u, { show: showFor(game), thump: null, me: whoIsUp(game) });
      if (game.phase === 'end') celebrate(game);
      paint();
    }, 2600);
  } else if (next.phase === 'split' && before.phase !== 'split') { Object.assign(u, { show: 'split', explaining: false }); sfx.split(); }
  else if (next.phase === 'aftermath' && before.phase === 'bowl') window.setTimeout(() => { if (game?.phase === 'aftermath') { u.show = 'aftermath'; u.note = ''; paint(); } }, 1300);
  else if (next.phase === 'card' && u.mode === 'pass') Object.assign(u, { me: whoIsUp(next), handed: false }); // the next voter, in private
  paint();
}

function celebrate(g: View) {
  burst('confetti', 0, 4, 2.5, 2.5); burst('stars', 0, 5, 1.5, 2); sfx.fanfare();
  const score = g.players[0].score;
  if (u.mode !== 'solo') return;
  if (g.length === 5 && score > u.best) store('sd.best.5', String(score));
  // the alley notes what you stood for tonight, for next time
  u.remembered = toRemember(g); store('sd.rules', JSON.stringify(u.remembered));
  if (u.account) void net.api('me/game', { score, frames: g.length, mode: 'solo', title: summary(g).title, rules: u.remembered }).then(refreshAccount);
}

/** Everything the players do goes through here. */
function send(ev: Ev) {
  if (!game) return;
  if (u.mode === 'online') { net.send({ t: 'ev', ev }); if (ev.t === 'throw') apply(step(game, ev)); } // our own throw is shown at once; the server confirms it
  else apply(step(game, ev));
}

function start(mode: Ui['mode'], length: 5 | 10) {
  Object.assign(u, { mode, screen: 'game', error: '', best: Number(store('sd.best.5')) || 0 });
  game = null;
  apply(newGame(Date.now(), mode === 'pass' ? u.names : ['You'], { length, best: length === 5 ? u.best : 0, remembered: mode === 'solo' ? u.remembered : [] }));
}

const refreshAccount = () => net.api('me').then((r) => { u.account = r.account ?? null; if (u.screen === 'account' || u.screen === 'title') paint(); });
/** Signed in: the account's remembered rules are the ones that count, on every device. */
function signedIn(account: net.Account) {
  u.account = account; u.codeFor = ''; u.error = '';
  if (account.rules.length) { u.remembered = account.rules; store('sd.rules', JSON.stringify(account.rules)); }
  else if (u.remembered.length) void net.api('me/rules', { rules: u.remembered });
}

function goOnline(first: Parameters<typeof net.connect>[0]) {
  u.error = '';
  net.connect(first, (room) => {
    const wasLobby = u.screen !== 'game';
    Object.assign(u, { room, mode: 'online', error: '' });
    if (u.team !== room.team) {
      u.team = room.team; u.qr = '';
      // the code is just a link: any phone camera opens it, so there is no scanner to build
      import('qrcode').then((q) => q.toString(`${location.origin}/j/${room.team}`, { type: 'svg', margin: 1 })).then((svg) => { u.qr = svg; if (u.screen === 'lobby') paint(); });
    }
    if (room.game) { u.screen = 'game'; if (wasLobby) game = null; apply(room.game); u.me = `p${room.you}`; }
    else { u.screen = 'lobby'; game = null; }
    paint();
  }, (msg) => { u.error = msg; if (u.screen !== 'game') u.screen = 'online'; paint(); });
}

ui.addEventListener('click', (e) => {
  const b = (e.target as HTMLElement).closest<HTMLElement>('[data-act]');
  if (!b) return;
  unlock(); sfx.click();
  const act = b.dataset.act, len = b.dataset.len === '10' ? 10 : 5;
  const field = (sel: string) => ui.querySelector<HTMLInputElement>(sel)?.value.trim() ?? '';
  if (act === 'start') return start('solo', len);
  if (act === 'startPass') {
    const typed = [...ui.querySelectorAll<HTMLInputElement>('input[name=n]')].map((i) => i.value.trim()).filter(Boolean);
    if (typed.length) u.names = typed;
    if (u.names.length < 2) { u.error = 'Pass-and-play needs at least two names.'; return paint(); }
    return start('pass', len);
  }
  if (act === 'create' || act === 'join') {
    u.name = store('sd.name', field('#name') || 'Bowler'); u.team = '';
    return goOnline(act === 'create' ? { t: 'create', name: u.name, token: net.token() } : { t: 'join', team: field('#team').toUpperCase(), name: u.name, token: net.token() });
  }
  if (act === 'startOnline') return net.send({ t: 'start', length: len });
  if (act === 'forgetTeam') return net.send({ t: 'forget' });
  if (act === 'sendCode' || act === 'verify' || act === 'logout') {
    const email = field('#email') || u.codeFor;
    const call = act === 'sendCode' ? net.api('login/request', { email, lang }) : act === 'verify' ? net.api('login/verify', { email: u.codeFor, code: field('#code') }) : net.api('logout', {});
    return void call.then((r) => {
      u.error = r.error ?? '';
      if (!r.error && act === 'sendCode') u.codeFor = email;
      if (!r.error && act === 'logout') u.account = null;
      if (r.account) signedIn(r.account);
      paint();
    });
  }
  if (act === 'forget') { u.remembered = []; store('sd.rules', '[]'); if (u.account) void net.api('me/rules', { rules: [] }); }
  else if (act === 'account') Object.assign(u, { screen: 'account', error: '', codeFor: '' });
  if (act === 'home') { if (u.mode === 'online') net.leave(); game = null; sim = null; clearFx(); rollStop(); Object.assign(u, { screen: 'title', mode: 'solo', room: null, error: '', note: '', quip: QUIPS[Math.floor(Math.random() * QUIPS.length)] }); }
  else if (act === 'names') Object.assign(u, { screen: 'names', error: '' });
  else if (act === 'online') Object.assign(u, { screen: 'online', error: '' });
  else if (act === 'board') u.boardOpen = !u.boardOpen;
  else if (act === 'sliders') u.sliders = !u.sliders;
  else if (act === 'sliderThrow') {
    const n = (sel: string) => Number(ui.querySelector<HTMLInputElement>(sel)?.value ?? 0);
    return throwBall({ x: n('#aim') / 100, vx: 0, vy: 4.5 + (n('#power') / 100) * 5, spin: n('#curve') / 100 });
  }
  else if (act === 'mute') setMuted(!isMuted());
  else if (act === 'lang') setLang(lang === 'nl' ? 'en' : 'nl');
  else if (act === 'read') u.read = true;
  else if (act === 'unread') u.read = false;
  else if (act === 'handed') u.handed = true;
  else if (act === 'explain') u.explaining = true;
  else if (act === 'back') u.explaining = false;
  else if (act === 'vote') return send({ t: 'vote', p: u.me, option: b.dataset.o as OptionId });
  else if (act === 'diff') return send({ t: 'split', way: 'explain', diff: Number(b.dataset.i) });
  else if (act === 'way') return send({ t: 'split', way: b.dataset.w as 'takeBack' | 'shrug' });
  else if (act === 'next') return send({ t: 'next' });
  paint();
});

// --- bowling
// the "where" slider moves the ball along the foul line as you drag it
ui.addEventListener('input', (e) => { const t = e.target as HTMLInputElement; if (t.id === 'aim' && !sim) aimX = Number(t.value) / 100; });
const myBowl = () => (game && u.screen === 'game' && u.show === 'bowl' ? game.bowl[u.me] : undefined);
const canThrow = () => { const b = myBowl(); return !!b && !sim && performance.now() > busyUntil && !frameDone(b); };

function throwBall(t: Throw) {
  if (!canThrow()) return;
  sim = createSim(myBowl()!.lane, (thrown = t));
  seen = 0; inGutter = false; u.note = ''; rollStart(); paint();
}

function landed(s: Sim, th: Throw) {
  const before = s.lane.standing.filter(Boolean).length, left = standingAfter(s).filter(Boolean).length, hit = before - left;
  const first = myBowl()!.throws === 0;
  u.note = s.fatmanHit ? t('Nine pins. You hit the Fat Man.') : left === 0 && hit ? (first ? 'STRIKE!' : 'spare!') : hit === 0 ? t('No pins.') : t('{0} down', hit);
  rollStop();
  if (left === 0 && hit) {
    // one strike in five, the confetti cannon lets everyone down
    if (first && Math.random() < 0.2) { burst('confetti', 0, LANE.length, 1, 0.04); sfx.pfft(); u.note += ` ${t('The confetti cannon misfired.')}`; }
    else { burst('confetti', 0, LANE.length, 1, first ? 2 : 1); burst('stars', 0, LANE.length, 1.2); (first ? sfx.strike : sfx.spare)(); }
  } else if (hit === 0 && !s.fatmanHit) sfx.trombone();
  if (quirks.golden >= 0 && s.lane.standing[quirks.golden] && !standingAfter(s)[quirks.golden]) u.note += ` ${t('You hit the golden pin. It counts as one pin, like the others.')}`;
  sim = null;
  busyUntil = performance.now() + 1100;
  const who = u.me;
  send({ t: 'throw', p: who, throw: th });
  // pass-and-play: leave the result on screen for a moment before the lane changes hands
  window.setTimeout(() => { u.note = ''; if (game && u.show === 'bowl') u.me = whoIsUp(game); paint(); }, 1300);
  u.me = who; paint();
}

/** What the ball just ran into, turned into mess. */
function mess(s: Sim) {
  for (; seen < s.events.length; seen++) {
    const e = s.events[seen];
    if (e.kind === 'pins') { burst('dust', e.x, e.y, 0.3); sfx.crash(); }
    else if (e.kind === 'bucket' || e.kind === 'stray') { burst('stars', e.x, e.y, 0.5); burst('dust', e.x, e.y, 0.2); shake = 0.5; sfx.clang(); }
    else { sfx.splat(); burst('blood', e.x, e.y, 0.5, 1.3); burst('stars', e.x, e.y, 1); if (e.kind !== 'lump') burst('nachos', e.x, e.y, 0.8); shake = 1; }
  }
}

// --- tap a character or object to hear it speak; this has no effect on the game
const SAYS: Record<string, [() => void, string[]]> = {
  vending: [sfx.clunk, ['Sold out.', 'Out of order.', 'The machine keeps your coin.']],
  pigeon: [sfx.flap, ['coo', 'The pigeon walks away.']],
  five: [sfx.honk, ['HONK.', 'Honk?']], oldFive: [sfx.honk, ['We won the championship here in 1987.', 'honk']],
  fat: [sfx.crunch, ['Would you like a nacho?', 'Am I in the way here?']],
  janitor: [sfx.squeak, ['I am Kees, the cleaner.', 'Careful, the floor is wet.', 'I just mopped there.']],
  child: [sfx.squeak, ['I am Lotte. It is my birthday today.', 'Would you like some cake?']],
  pinsetter: [sfx.blip, ['I am Walter. I run this alley.', 'Drag back and flick to bowl.']],
  lady: [sfx.blip, ['I am Marga. I work at the shoe counter.', 'I knew you would tap me.']],
  pinBoy: [sfx.clunk, ['I am Timo. I set the pins.', 'I would like to bowl one day.']], angry: [sfx.gutter, ['WHERE IS HE?']], thief: [sfx.squeak, ['I am Ruud.', 'I am sorry about the shoes.']],
  jar: [sfx.clang, ['clink']], curtain: [sfx.pfft, ['You may not look behind the curtain.']], cake: [sfx.splat, ['squish']], tray: [sfx.crunch, ['crunch']],
  board: [sfx.blip, ['This is the scoreboard.']], goodBall: [sfx.clang, ['This ball rolls straight.']], ball: [sfx.gutter, ['The ball keeps rolling.']], lever: [sfx.clunk, ['The lever does not move yet.']],
};
function tap(x: number, y: number) {
  const what = hitNonsense(view, x, y, performance.now()) ?? (inScene() || u.screen !== 'game' ? poke(x, y) : null);
  const entry = what && SAYS[what];
  if (!entry) return;
  entry[0]();
  bubble(entry[1][Math.floor(Math.random() * entry[1].length)], x, y - 26);
}

let drag: { x0: number; y0: number; trail: { t: number; x: number; y: number }[] } | null = null;
const laneX = (px: number) => Math.max(-0.41, Math.min(0.41, (px - view.w / 2) / nearScale(view)));
canvas.addEventListener('pointerdown', (e) => {
  unlock();
  canvas.setPointerCapture(e.pointerId);
  drag = { x0: e.clientX, y0: e.clientY, trail: [{ t: e.timeStamp, x: e.clientX, y: e.clientY }] };
  if (!sim) aimX = laneX(e.clientX);
});
canvas.addEventListener('pointermove', (e) => {
  if (!drag) { if (e.pointerType === 'mouse' && !sim) aimX = laneX(e.clientX); return; }
  drag.trail.push({ t: e.timeStamp, x: e.clientX, y: e.clientY });
  if (!sim) aimX = laneX(e.clientX);
});
canvas.addEventListener('pointerup', (e) => {
  if (!drag) return;
  const d = drag; drag = null;
  const end = { t: e.timeStamp, x: e.clientX, y: e.clientY };
  const from = d.trail.findLast((p) => end.t - p.t >= 70) ?? d.trail[0];
  const dt = Math.max(1, end.t - from.t) / 1000;
  const up = (from.y - end.y) / dt / view.h, side = (end.x - from.x) / dt / view.h; // screen heights per second
  if (up < 0.5) { if (Math.hypot(end.x - d.x0, end.y - d.y0) < 12) tap(end.x, end.y); return; } // not a flick: a wander, or a poke
  const vy = 4.5 + Math.min(1, (up - 0.5) / 2.5) * 5;
  const slope = side / up, wholeSlope = (end.x - d.x0) / Math.max(20, d.y0 - end.y);
  throwBall({ x: aimX, vx: vy * Math.max(-1, Math.min(1, slope)) * 0.12, vy, spin: (slope - wholeSlope) * 3 });
});
canvas.addEventListener('pointercancel', () => { drag = null; });
// dev hooks for driving the game from tests; `skip` finishes the current roll without waiting for frames
if (import.meta.env.DEV) Object.assign(window, {
  throwBall, game: () => game, ui: () => u,
  deal: (cards: string[], names = ['You']) => { Object.assign(u, { screen: 'game', mode: names.length > 1 ? 'pass' : 'solo', names }); game = null; apply(newGame(1, names, { cards })); },
  skip: () => { busyUntil = 0; if (sim) { while (!sim.done) stepSim(sim); mess(sim); landed(sim, thrown!); busyUntil = 0; } },
});

function resize() {
  const dpr = Math.min(devicePixelRatio, 2);
  view.w = innerWidth; view.h = innerHeight;
  for (const [c, x] of [[canvas, ctx], [fxCanvas, fxCtx]] as const) { c.width = view.w * dpr; c.height = view.h * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0); }
}
addEventListener('resize', resize); resize();

function tick(now: number) {
  const elapsed = Math.min(0.05, (now - last) / 1000); last = now;
  tickBoil(now);
  if (sim) {
    for (acc += elapsed; acc >= DT && !sim.done; acc -= DT) stepSim(sim);
    mess(sim);
    if (sim.ball.gutter && !inGutter) { inGutter = true; rollStop(); sfx.gutter(); }
    if (sim.done) landed(sim, thrown!);
  }
  // the camera trots after the ball, or up the lane to wherever the trouble is
  const scene = game && inScene() ? SCENES[cardOf(game).id] : null;
  const want = sim ? Math.max(0, Math.min(LANE.length - 4.5, sim.ball.y - 2.5)) : scene?.cam ?? 0;
  view.camY += (want - view.camY) * Math.min(1, elapsed * (sim ? 5 : 2.5));
  // a hit shakes the whole alley
  shake *= Math.max(0, 1 - elapsed * 6);
  const off = shake > 0.02 ? `${(Math.random() - 0.5) * 22 * shake}px ${(Math.random() - 0.5) * 22 * shake}px` : '';
  canvas.style.translate = actors.style.translate = fxCanvas.style.translate = off;

  const b = game && u.screen === 'game' && (u.show === 'bowl' || u.show === 'aftermath') ? game.bowl[u.me] : undefined;
  const p = game?.players.find((x) => x.id === u.me), liar = !!game && game.phase !== 'end' && cardOf(game).id === 'liar';
  drawLane(ctx, view, sim, b?.lane ?? emptyLane, aimX, !!b && u.show === 'bowl' && !frameDone(b), () => drawStains(ctx, view),
    { total: p && u.screen === 'game' ? String(p.score + (liar ? 3 + (game!.frame % 4) : 0)) : '--', frames: p?.frames.length ?? 0, of: game?.cards.length ?? 5 });
  placeActors(view, elapsed);
  drawFx(fxCtx, view, elapsed);
  requestAnimationFrame(tick);
}

document.body.insertAdjacentHTML('beforeend', boilDefs);
startBoil();
// a join link (the QR code is one) drops you straight at the team's door
const joinId = location.pathname.match(/^\/j\/([A-Za-z0-9]{6})$/)?.[1];
if (joinId) { history.replaceState(null, '', '/'); Object.assign(u, { screen: 'online', team: joinId.toUpperCase() }); }
net.serverUp().then((up) => { u.serverUp = up; if (up) void net.api('me').then((r) => { if (r.account) { signedIn(r.account); if (u.screen === 'title') paint(); } }); if (u.screen === 'title') paint(); else if (joinId && !up) { u.error = 'The game server cannot be reached.'; paint(); } });
paint();
requestAnimationFrame(tick);
