// The cast, standing in the alley: SVG figures pinned to lane positions and moved with the camera.
// A scene can script them: walk somewhere, say something, change face, make a mess.
import { sfx } from '../audio.ts';
import { hurtMarks, type Mood } from '../cast/draw.ts';
import type { ActorDef, Change, Reaction, Scene } from '../scenes.ts';
import { bubble, clearBubbles } from './bubble.ts';
import { burst, type Fx } from './fx.ts';
import { project, type View } from './lane.ts';

type Live = ActorDef & { el: HTMLElement; body: HTMLElement; leaving: boolean; cx: number; cy: number };
const layer = document.querySelector<HTMLElement>('#actors')!;
let live: Live[] = [], current: Scene | null = null, timers: number[] = [];

const paint = (a: Live, mood: Mood) =>
  (a.body.innerHTML = `<svg viewBox="0 0 200 260" class="ink ${mood === 'hurt' ? '' : a.anim ?? ''}" overflow="visible">${a.draw(mood)}${mood === 'hurt' ? hurtMarks : ''}</svg>`);
const find = (who: string) => live.filter((a) => !a.leaving && (a.key === who || a.key.replace(/\d+$/, '') === who));

const NOISE: Partial<Record<Fx, () => void>> = { blood: sfx.splat, feathers: sfx.honk, confetti: sfx.pop, snot: sfx.sneeze, nachos: sfx.crunch };
function perform(a: Live, c: Change) {
  if (a.leaving) return;
  if (c.to) { a.x = c.to[0]; a.y = c.to[1]; }
  if (c.mood) paint(a, c.mood);
  if (c.anim) { a.body.classList.remove(c.anim); void a.body.offsetWidth; a.body.classList.add(c.anim); }
  for (const f of c.fx ?? []) { burst(f, a.cx, a.cy, a.h * 0.55, f === 'blood' ? 1.4 : 1); NOISE[f]?.(); }
  if (c.say) { const r = a.el.getBoundingClientRect(); bubble(c.say, r.left + r.width / 2, r.top + r.height * 0.1); }
}

export function setScene(scene: Scene | null) {
  if (scene === current) return;
  current = scene;
  timers.forEach(clearTimeout); timers = []; clearBubbles();
  for (const a of live) if (!a.leaving) {
    a.leaving = true;
    a.body.classList.add('out', a.cx < 0 ? 'left' : 'right');
    setTimeout(() => { a.el.remove(); live = live.filter((x) => x !== a); }, 600);
  }
  scene?.actors.forEach((def, i) => {
    const el = document.createElement('div'), body = document.createElement('div');
    el.className = 'actor'; body.className = def.enter === 'top' ? 'body dropin' : def.from ? 'body' : 'body pop';
    body.style.animationDelay = `${i * 120}ms`;
    el.append(body); layer.append(el);
    const a: Live = { ...def, el, body, leaving: false, cx: def.from?.[0] ?? def.x, cy: def.from?.[1] ?? def.y };
    paint(a, def.mood ?? 'calm');
    live.push(a);
  });
  // the little play this dilemma gets
  for (const [at, who, change] of scene?.beats ?? []) timers.push(window.setTimeout(() => find(who).forEach((a) => perform(a, change)), at));
}

const HIT: Fx[] = ['blood', 'feathers'];
/** The decision lands on the cast. Whoever gets hit reacts a beat later, when the ball arrives. */
export function react(r: Reaction | undefined, shake: () => void) {
  timers.forEach(clearTimeout); timers = [];
  for (const a of live) {
    if (a.leaving) continue;
    const change: Change | undefined = r ? r[a.key] ?? r[a.key.replace(/\d+$/, '')] : { anim: 'hop' };
    if (!change) continue;
    const hit = change.fx?.some((f) => HIT.includes(f));
    setTimeout(() => { perform(a, change); if (hit && !a.leaving) shake(); }, hit ? 750 : 0);
  }
}

/** Which member of the cast is under that tap, if any. They hop. */
export function poke(px: number, py: number): string | null {
  const hit = [...live].reverse().find((a) => {
    if (a.leaving) return false;
    const r = a.el.getBoundingClientRect();
    return px > r.left + r.width * 0.15 && px < r.right - r.width * 0.15 && py > r.top + r.height * 0.1 && py < r.bottom;
  });
  if (!hit) return null;
  perform(hit, { anim: 'hop' });
  return hit.key.replace(/\d+$/, '');
}

/** Called every frame: walks each figure towards its spot and keeps its feet there as the camera moves. */
export function placeActors(v: View, dt: number) {
  const ease = 1 - Math.exp(-dt * 2.4);
  for (const a of live) {
    const far = Math.hypot(a.x - a.cx, a.y - a.cy);
    a.cx += (a.x - a.cx) * ease; a.cy += (a.y - a.cy) * ease;
    a.el.classList.toggle('walking', far > 0.08);
    const p = project(v, a.cx, a.cy), k = (a.h * p.s) / 260;
    a.el.style.transform = `translate(${p.x - 100 * k}px, ${p.y - 250 * k}px) scale(${k})`;
    a.el.style.zIndex = String(Math.round(1000 - a.cy * 10));
  }
}
