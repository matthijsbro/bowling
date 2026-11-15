// The "hand": every line in the game goes through here so it all wobbles the same way.
export const INK = '#2a2420';
export const PAPER = '#f4ead5';

/** Cheap repeatable noise in -1..1. Rendering only, never game logic. */
export const noise = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return (s - Math.floor(s)) * 2 - 1;
};

/** Three alternating redraws make the lines "boil" like a hand-drawn cartoon. */
export let boil = 0;
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const tickBoil = (ms: number) => { boil = still ? 0 : Math.floor(ms / 170) % 3; };

type Pt = [number, number];

/** A pen stroke through the points: wobbly, overshooting, then gone over a second time, badly. */
export function stroke(ctx: CanvasRenderingContext2D, pts: Pt[], seed: number, width = 2.5, color = INK, close = false) {
  const all = close ? [...pts, pts[0]] : pts;
  const pass = (salt: number, wob: number, w: number, alpha: number) => {
    ctx.beginPath();
    for (let i = 0; i < all.length - 1; i++) {
      const [ax, ay] = all[i], [bx, by] = all[i + 1];
      const len = Math.hypot(bx - ax, by - ay), steps = Math.max(1, Math.round(len / 22));
      const nx = len ? -(by - ay) / len : 0, ny = len ? (bx - ax) / len : 0;
      for (let k = i ? 1 : 0; k <= steps; k++) {
        const t = k / steps, j = noise(seed * 7.3 + salt + i * 31.7 + k * 3.1 + boil * 17.9) * wob;
        const o = close || !len ? 0 : (i === 0 && k === 0 ? -5 / len : i === all.length - 2 && k === steps ? 5 / len : 0);
        const x = ax + (bx - ax) * (t + o) + nx * j, y = ay + (by - ay) * (t + o) + ny * j;
        if (i === 0 && k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
    }
    ctx.globalAlpha = alpha; ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.stroke(); ctx.globalAlpha = 1;
  };
  pass(0, Math.max(0.9, width * 0.7), width, 1);
  pass(99, Math.max(1.6, width * 1.1), Math.max(0.8, width * 0.4), 0.7);
}

let scribble: CanvasPattern | null = null;
function scrib(ctx: CanvasRenderingContext2D) {
  if (scribble) return scribble;
  const c = document.createElement('canvas'); c.width = c.height = 9;
  const x = c.getContext('2d')!;
  x.strokeStyle = 'rgba(42,36,32,.14)'; x.lineWidth = 1.2;
  x.beginPath(); x.moveTo(-1, 10); x.lineTo(10, -1); x.moveTo(-1, 1); x.lineTo(1, -1); x.moveTo(8, 10); x.lineTo(10, 8); x.stroke();
  return (scribble = ctx.createPattern(c, 'repeat')!);
}

/** Flat colour that misses its outline, scribbled over like a felt-tip running dry. */
export function fill(ctx: CanvasRenderingContext2D, pts: Pt[], color: string, dx = 5, dy = 3) {
  ctx.beginPath();
  pts.forEach(([x, y], i) => (i ? ctx.lineTo(x + dx, y + dy) : ctx.moveTo(x + dx, y + dy)));
  ctx.closePath(); ctx.fillStyle = color; ctx.fill();
  ctx.fillStyle = scrib(ctx); ctx.fill();
}

export const blob = (cx: number, cy: number, rx: number, ry: number, n = 14, rot = 0): Pt[] =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2, c = Math.cos(rot), s = Math.sin(rot);
    const x = Math.cos(a) * rx, y = Math.sin(a) * ry;
    return [cx + x * c - y * s, cy + x * s + y * c] as Pt;
  });

/** Scribbled shadow: a few diagonal pen lines inside a box. */
export function hatch(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, seed: number, gap = 7) {
  for (let i = 0, n = Math.floor((w + h) / gap); i < n; i++) {
    const d = i * gap + noise(seed + i) * 2;
    const a: Pt = [x + Math.min(d, w), y + Math.max(0, d - w)], b: Pt = [x + Math.max(0, d - h), y + Math.min(d, h)];
    stroke(ctx, [a, b], seed + i * 1.7, 1, 'rgba(42,36,32,.35)');
  }
}
