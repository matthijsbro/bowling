// Things that fly off when something is hit or something goes well. Drawing only; random on purpose.
import { INK, boil, noise, stroke } from './ink.ts';
import { project, type View } from './lane.ts';

export type Fx = 'blood' | 'feathers' | 'confetti' | 'stars' | 'nachos' | 'snot' | 'dust';
type Part = { kind: Fx; x: number; y: number; z: number; vx: number; vy: number; vz: number; age: number; life: number; color: string; size: number; rot: number; spin: number; landed: boolean; seed: number };

const KINDS: Record<Fx, { n: number; colors: string[]; out: number; up: [number, number]; gravity: number; size: [number, number]; life: number; sticks?: boolean }> = {
  blood: { n: 13, colors: ['#c0281c', '#a81c12', '#d63a2c'], out: 1.1, up: [1.5, 5], gravity: 9, size: [0.04, 0.13], life: 1e9, sticks: true },
  snot: { n: 10, colors: ['#9bc53d', '#7fa82a', '#c3e06a'], out: 1.4, up: [1, 4], gravity: 9, size: [0.04, 0.12], life: 6, sticks: true },
  nachos: { n: 10, colors: ['#f0c040', '#e8a020'], out: 1.4, up: [2.5, 5], gravity: 9, size: [0.07, 0.11], life: 4, sticks: true },
  feathers: { n: 24, colors: ['#fffdf6', '#e9e2cf'], out: 1.2, up: [1.5, 3.5], gravity: 1.3, size: [0.08, 0.14], life: 3.5 },
  confetti: { n: 60, colors: ['#d6402b', '#f0c040', '#3f7fbf', '#3aa6a0', '#e07a8a', '#7a5cc0'], out: 1.6, up: [3, 7], gravity: 3.2, size: [0.04, 0.08], life: 3.2 },
  stars: { n: 8, colors: ['#f0c040'], out: 0.9, up: [1, 2.2], gravity: 0.4, size: [0.1, 0.16], life: 1.1 },
  dust: { n: 9, colors: ['#b9a98f', '#d9c9a6'], out: 0.8, up: [0.3, 1], gravity: 0.3, size: [0.08, 0.16], life: 0.6 },
};
let parts: Part[] = [];
const rnd = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Throw a handful of `kind` from a spot on the lane (metres; z is height). */
export function burst(kind: Fx, x: number, y: number, z = 0.7, amount = 1) {
  const k = KINDS[kind];
  for (let i = 0, n = Math.round(k.n * amount * (calm ? 0.3 : 1)); i < n; i++) {
    const a = Math.random() * Math.PI * 2, out = Math.random() * k.out;
    parts.push({
      kind, x, y, z, vx: Math.cos(a) * out, vy: Math.sin(a) * out * 1.5, vz: rnd(...k.up), age: 0, life: k.life,
      color: k.colors[i % k.colors.length], size: rnd(...k.size), rot: Math.random() * 6, spin: rnd(-8, 8), landed: false, seed: Math.random() * 1000,
    });
  }
  if (parts.length > 700) parts = parts.slice(-700);
}
/** New frame, clean lane. Kees has cleaned it. */
export const clearFx = () => { parts = []; };

type Pt = [number, number];
/** A splat as a pen would draw it: lumpy, with a few spikes where it hit hard. Flat, because it lies on the floor. */
const splat = (cx: number, cy: number, r: number, seed: number): Pt[] => Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2, reach = r * (0.85 + Math.abs(noise(seed + i * 3.1)) * 0.3) * (i % 8 === Math.floor(seed) % 8 ? 1.45 : 1);
  return [cx + Math.cos(a) * reach * 1.5, cy + Math.sin(a) * reach * 0.5];
});
/** A closed, rounded outline through the points, each nudged a little by the boiling pen. */
function loop(ctx: CanvasRenderingContext2D, pts: Pt[], seed: number, wob: number, dx = 0, dy = 0) {
  const q = pts.map(([x, y], i): Pt => [x + dx + noise(seed + i * 5.3 + boil * 17.9) * wob, y + dy + noise(seed + i * 9.7 + boil * 11.3) * wob]);
  const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  ctx.beginPath();
  ctx.moveTo(...mid(q[q.length - 1], q[0]));
  q.forEach((p, i) => ctx.quadraticCurveTo(p[0], p[1], ...mid(p, q[(i + 1) % q.length])));
  ctx.closePath();
}
const inked = (ctx: CanvasRenderingContext2D, pts: Pt[], color: string, seed: number, r: number) => {
  // colour slightly off the line, then the outline drawn twice, the second time missing a little: the same hand as the rest
  loop(ctx, pts, seed, 0, r * 0.16, r * 0.09); ctx.fillStyle = color; ctx.fill();
  ctx.strokeStyle = INK; ctx.lineJoin = 'round';
  loop(ctx, pts, seed, r * 0.05); ctx.lineWidth = Math.max(0.9, r * 0.12); ctx.stroke();
  loop(ctx, pts, seed + 50, r * 0.1); ctx.lineWidth = Math.max(0.7, r * 0.05); ctx.globalAlpha *= 0.7; ctx.stroke(); ctx.globalAlpha /= 0.7;
};

/** What has landed and stuck: drawn on the lane itself, so balls, pins and people are on top of it. */
export function drawStains(ctx: CanvasRenderingContext2D, v: View) {
  for (const p of parts) {
    if (!p.landed) continue;
    const s = project(v, p.x, p.y, 0), r = Math.max(2, p.size * s.s);
    ctx.globalAlpha = Math.min(1, (p.life - p.age) * 2.5);
    if (p.kind === 'nachos') inked(ctx, [[s.x - r, s.y], [s.x + r * 0.2, s.y - r * 0.5], [s.x + r, s.y + r * 0.2]], p.color, p.seed, r);
    else {
      inked(ctx, splat(s.x, s.y, r, p.seed), p.color, p.seed, r);
      // a stray droplet next to the big ones, and a glint so it looks wet
      if (p.size > 0.09) inked(ctx, splat(s.x + r * 2.1 * noise(p.seed), s.y + r * 0.6, r * 0.28, p.seed + 9), p.color, p.seed + 9, r * 0.4);
      stroke(ctx, [[s.x - r * 0.6, s.y - r * 0.12], [s.x - r * 0.1, s.y - r * 0.2]], p.seed + 3, Math.max(1, r * 0.1), 'rgba(255,253,246,.7)');
    }
  }
  ctx.globalAlpha = 1;
}

/** What is still in the air: drawn over everything. */
export function drawFx(ctx: CanvasRenderingContext2D, v: View, dt: number) {
  ctx.clearRect(0, 0, v.w, v.h);
  parts = parts.filter((p) => (p.age += dt) < p.life);
  for (const p of parts) {
    const k = KINDS[p.kind];
    if (p.landed) continue;
    p.vz -= k.gravity * dt;
    if (p.kind === 'feathers' || p.kind === 'confetti') { p.vx += Math.sin(p.age * 7 + p.rot) * dt * 2; if (p.vz < -0.9) p.vz = -0.9; }
    p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt; p.rot += p.spin * dt;
    if (p.z <= 0) { p.z = 0; if (k.sticks) { p.landed = true; continue; } p.age = Math.max(p.age, p.life - 0.4); }
    const s = project(v, p.x, p.y, p.z), r = Math.max(1.5, p.size * s.s);
    ctx.globalAlpha = Math.min(1, (p.life - p.age) * 2.5);
    ctx.fillStyle = p.color; ctx.strokeStyle = INK; ctx.lineWidth = Math.max(1, r * 0.14);
    ctx.save(); ctx.translate(s.x, s.y);
    ctx.beginPath();
    if (p.kind === 'confetti') { ctx.rotate(p.rot); ctx.fillRect(-r, -r * 0.5 * Math.cos(p.age * 9 + p.rot), r * 2, r * Math.cos(p.age * 9 + p.rot)); }
    else if (p.kind === 'feathers') { ctx.rotate(p.rot); ctx.ellipse(0, 0, r, r * 0.35, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-r, 0); ctx.lineTo(r, 0); ctx.stroke(); }
    else if (p.kind === 'nachos') { ctx.rotate(p.rot); ctx.moveTo(0, -r); ctx.lineTo(r, r); ctx.lineTo(-r, r); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    else if (p.kind === 'stars') {
      ctx.rotate(p.rot);
      for (let i = 0; i < 10; i++) { const a = (i * Math.PI) / 5, q = i % 2 ? r * 0.45 : r; ctx.lineTo(Math.cos(a) * q, Math.sin(a) * q); }
      ctx.closePath(); ctx.fill(); ctx.stroke();
    } else if (p.kind === 'dust') { ctx.globalAlpha *= 0.6; inked(ctx, splat(0, 0, r * (0.6 + p.age * 2), p.seed).map(([x, y]) => [x * 0.7, y * 2] as Pt), p.color, p.seed, r * 0.5); }
    else {
      // a drop in flight: a lumpy teardrop with its tail pointing back the way it came
      const stretch = 1 + Math.min(1.4, Math.abs(p.vz) * 0.3), up = p.vz > 0 ? 1 : -1;
      const drop: Pt[] = [[0, -r * stretch * up * -1], [r * 0.55, -r * 0.1 * up], [r * 0.7, r * 0.5 * up], [0, r * 0.95 * up], [-r * 0.7, r * 0.5 * up], [-r * 0.55, -r * 0.1 * up]];
      inked(ctx, drop.map(([x, y]) => [x * 0.9 * (1 + noise(p.seed + y) * 0.15), -y * 0.9] as Pt), p.color, p.seed, r * 0.6);
    }
    ctx.restore();
  }
  ctx.globalAlpha = 1;
}
