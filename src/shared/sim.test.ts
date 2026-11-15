import { expect, test } from 'vitest';
import { clampThrow, fullRack, runThrow, type Lane } from './sim.ts';

const lane = (extra: Partial<Lane> = {}): Lane => ({ standing: fullRack(), ...extra });
const down = (s: boolean[]) => s.filter((up) => !up).length;
const centre = { x: 0.05, vx: 0, vy: 8, spin: 0 };

test('same throw, same pins', () => {
  const t = { x: 0.07, vx: -0.11, vy: 7.3, spin: 0.4 };
  expect(runThrow(lane(), t)).toEqual(runThrow(lane(), t));
});

test('a pocket shot knocks most pins, a gutter ball none', () => {
  expect(down(runThrow(lane(), centre).standing)).toBeGreaterThanOrEqual(8);
  expect(down(runThrow(lane(), { x: 0.4, vx: 1.5, vy: 5, spin: 0 }).standing)).toBe(0);
});

test('pins already down stay down', () => {
  const after = runThrow(lane({ standing: fullRack().map((_, i) => i > 4) }), centre).standing;
  expect(after.slice(0, 5)).toEqual([false, false, false, false, false]);
});

test('hostile throws are clamped', () => {
  const c = clampThrow({ x: 99, vx: NaN, vy: 1e9, spin: -Infinity });
  expect(c.x).toBeCloseTo(0.415);
  expect([c.vx, c.vy, c.spin]).toEqual([-2, 10, -1]);
});

test('hitting the Fat Man takes nine pins and leaves the 10', () => {
  const r = runThrow(lane({ props: [{ kind: 'fatman', x: -0.14, y: 6 }] }), { x: -0.1, vx: 0, vy: 7, spin: 0 });
  expect(r.fatmanHit).toBe(true);
  expect(r.standing).toEqual([...Array(9).fill(false), true]);
});

test('the gap beside the Fat Man can be threaded', () => {
  const r = runThrow(lane({ props: [{ kind: 'fatman', x: -0.14, y: 6 }] }), { x: 0.415, vx: 0, vy: 7, spin: 0 });
  expect(r.fatmanHit).toBe(false);
});

test('bumpers turn a gutter ball into pins', () => {
  expect(down(runThrow(lane({ bumpers: true }), { x: 0.4, vx: 1.5, vy: 5, spin: 0 }).standing)).toBeGreaterThan(0);
});

test('a wobbly ball and a perfect ball roll differently from a plain one', () => {
  const t = { x: -0.3, vx: 0, vy: 6, spin: 0 };
  expect(down(runThrow(lane({ ball: 'perfect' }), t).standing)).toBeGreaterThan(down(runThrow(lane(), t).standing));
  expect(runThrow(lane({ ball: 'wobble' }), centre)).not.toEqual(runThrow(lane(), centre));
});

test('zeno: a hard throw gets within a hair and takes all ten, a soft one never arrives', () => {
  expect(down(runThrow(lane({ zeno: true }), { x: 0, vx: 0, vy: 9.5, spin: 0 }).standing)).toBe(10);
  expect(down(runThrow(lane({ zeno: true }), { x: 0, vx: 0, vy: 4.5, spin: 0 }).standing)).toBe(0);
});

test('a screen strikes on any throw; a wide lane has no gutter; every obstacle and ball still ends the roll', () => {
  expect(down(runThrow(lane({ screen: true }), { x: 0.4, vx: 1.5, vy: 5, spin: 0 }).standing)).toBe(10);
  const drift = { x: 0.4, vx: 0.12, vy: 6, spin: 0 };
  expect(down(runThrow(lane(), drift).standing)).toBe(0);
  expect(down(runThrow(lane({ wide: true }), drift).standing)).toBeGreaterThan(0);
  for (const kind of ['lump', 'runner', 'stray'] as const)
    for (const ball of ['wobble', 'perfect', 'smooth', 'cracked', 'foam', 'heavy'] as const)
      expect(runThrow(lane({ ball, props: [{ kind, x: 0.1, y: 5 }], sway: 1.5, speed: 0.6 }), centre).standing).toHaveLength(10);
});
