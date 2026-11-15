import { expect, test } from 'vitest';
import { CARDS, CHAIN_IDS, FILLERS, inChain } from './cards/index.ts';
import { EXCEPTIONS, RULES, opposite } from './cards/rules.ts';
import { cardOf, newGame, reasonsFor, step, summary, toRemember, type Ev, type Game } from './engine.ts';
import type { OptionId } from './types.ts';

const POCKET = { x: 0.05, vx: 0, vy: 8, spin: 0 };
const play = (g: Game, ...evs: Ev[]) => evs.reduce(step, g);
/** Every player bowls until the frame is over, then on to the next card. */
function bowl(g: Game): Game {
  while (g.phase === 'bowl') for (const p of g.players) g = step(g, { t: 'throw', p: p.id, throw: POCKET });
  return step(g, { t: 'next' });
}
const vote = (g: Game, ...options: OptionId[]) => play(g, ...options.map((option, i): Ev => ({ t: 'vote', p: `p${i}`, option })));
const game = (cards: string[], names = ['You']) => bowl(newGame(1, names, { cards: ['warmup', ...cards] }));
const rules = (g: Game) => g.stamps.filter((s) => !s.struck).map((s) => s.text);

test('lever, then no push: Split, explained, tested by the matching twist, bumpers for standing by it', () => {
  let g = vote(game(['switch', 'fatman', 'twist:fatman']), 'A');
  expect(rules(g)).toEqual(['Numbers count']);
  expect(g.bowl.p0.lane.props?.[0].kind).toBe('bucket');
  g = vote(bowl(g), 'B');
  expect(g.phase).toBe('split');
  expect(reasonsFor(g).map((d) => d.says)).toEqual(['hands:A', 'tool:A', 'staff:A', 'self:A']);
  g = step(g, { t: 'split', way: 'explain', diff: 1 });
  expect(rules(g)).toEqual(['Numbers count', 'Nobody gets used as a tool']);
  g = bowl(g);
  expect(cardOf(g).id).toBe('loop');
  g = vote(g, 'B');
  expect([g.phase, g.bowl.p0.lane.bumpers]).toEqual(['bowl', true]);
  g = bowl(g);
  expect(g.phase).toBe('end');
  expect(g.record).toEqual({ explained: 1, survived: 1, takenBack: 0, shrugged: 0 });
  expect(summary(g).title).toBe('Utilitarians, who explained one Split');
  expect(summary(g).receipts[0].title).toBe('The Flip');
});

test('going against your own reason in the twist crosses it out, without a second Split', () => {
  let g = step(vote(bowl(vote(game(['switch', 'fatman', 'twist:fatman']), 'A')), 'B'), { t: 'split', way: 'explain', diff: 0 });
  g = vote(bowl(g), 'B'); // said touching was the difference, then refuses the lever-operated trapdoor
  expect(g.phase).toBe('bowl');
  expect(g.stamps.find((s) => s.claim === 'hands:A')?.struck).toBe(true);
});

test('shrug: 7-10 next frame, and that rule binds nobody afterwards; take it back: the old rule flips', () => {
  const toSplit = () => vote(bowl(vote(game(['switch', 'fatman', 'micro']), 'A')), 'B');
  let g = bowl(step(toSplit(), { t: 'split', way: 'shrug' }));
  expect(g.sevenTen).toBe(true);
  expect(summary(g).title).toBe('Utilitarians, except when they would have to push someone');
  g = step(toSplit(), { t: 'split', way: 'takeBack' });
  expect(rules(g)).toEqual(['We do not steer harm onto someone', 'Nobody gets used as a tool']);
  // having taken it back, picking the thousand tiny pins ("Numbers count") is the next Split
  expect(vote(bowl(g), 'A').phase).toBe('split');
});

test('rules clash across chains, and the honest reason comes back to bite', () => {
  let g = vote(game(['switch', 'hungry', 'nacho']), 'A'); // Numbers count
  g = vote(bowl(g), 'B'); // ...but the Fat Man does not get every tray
  expect([g.phase, g.stamps[g.splitAgainst!].text]).toEqual(['split', 'Numbers count']);
  expect(reasonsFor(g).map((d) => d.says)).toEqual(['tool:A', 'share:A', 'self:A']); // no card reasons here: the general ones for the rule, then the honest one
  g = step(g, { t: 'split', way: 'explain', diff: 2 });
  expect(rules(g)).toEqual(['Numbers count', 'We do what suits us']);
  g = vote(bowl(g), 'A'); // helping Lotte costs pins: that does not suit us
  expect([g.phase, g.stamps[g.splitAgainst!].text]).toEqual(['split', 'We do what suits us']);
  expect(reasonsFor(g).map((d) => d.says)).toEqual(['matter:A', 'golden:A']);
  g = step(g, { t: 'split', way: 'takeBack' });
  expect(rules(g)).toEqual(['Numbers count', 'When it costs little, you help']);
});

test('naming Kees the cleaner goes against four different rules', () => {
  const o = CARDS.machine.options[0];
  expect(o.breaks).toEqual(['truth:A', 'tool:A', 'numbers:B', 'guilt:A']);
  const g = vote(bowl(vote(game(['question', 'machine']), 'A')), 'A'); // We tell the truth, then name an innocent man
  expect([g.phase, g.stamps[g.splitAgainst!].text]).toEqual(['split', 'We tell the truth']);
});

test('votes stay open until everyone is in; on a tie the lowest scorer decides', () => {
  let g = newGame(4, ['Ann', 'Bo'], { cards: ['warmup', 'switch'] });
  for (const [p, t] of [['p0', POCKET], ['p0', POCKET], ['p1', { x: 0.4, vx: 1.5, vy: 5, spin: 0 }], ['p1', { x: 0.4, vx: 1.5, vy: 5, spin: 0 }]] as const)
    g = step(g, { t: 'throw', p, throw: t });
  g = step(step(g, { t: 'next' }), { t: 'vote', p: 'p0', option: 'A' });
  expect(g.phase).toBe('card');
  expect(step(g, { t: 'vote', p: 'p1', option: 'B' }).decision).toBe('B'); // Bo is behind, Bo decides
});

test('secret frames: grabbing, the curtain, the tip jar', () => {
  let g = vote(game(['twoGoodBalls'], ['Ann', 'Bo']), 'B', 'A');
  expect([g.bowl.p0.lane.ball, g.bowl.p1.lane.ball]).toEqual(['perfect', 'wobble']);
  expect(step(g, { t: 'vote', p: 'p0', option: 'A' })).toBe(g);
  expect(step(g, { t: 'throw', p: 'nobody', throw: POCKET })).toBe(g);
  g = vote(game(['curtain'], ['Ann', 'Bo']), 'A', 'B');
  expect([g.phase, g.bowl.p0.lane.standing.some(Boolean), g.bowl.p1.lane.standing.filter(Boolean).length]).toEqual(['bowl', false, 3]); // Bo still has three pins to bowl at
  g = bowl(g);
  expect(g.players[0].frames.at(-1)).toBe(10);
  expect(g.players[1].frames.at(-1)).toBeLessThanOrEqual(3);
  g = vote(game(['tipjar', 'liar'], ['Ann', 'Bo']), 'A', 'B');
  expect(g.dryNext).toBe(true);
  expect(bowl(g).bowl.p0.lane.speed).toBeCloseTo(0.7);
});

test('the card data hangs together', () => {
  for (const c of Object.values(CARDS)) {
    for (const o of c.options) for (const claim of [o.says, ...(o.breaks ?? [])]) if (claim) expect(RULES[claim], `${c.id}: ${claim}`).toBeTruthy();
    for (const d of c.differences ?? []) {
      expect(RULES[d.says], `${c.id}: ${d.says}`).toBeTruthy();
      if (d.twist) expect(CARDS[d.twist]?.role).toBe('twist');
    }
    if (c.kind !== 'plain') expect(c.options.length).toBeGreaterThanOrEqual(2);
  }
  for (const chain of CHAIN_IDS) for (const role of ['setup', 'echo', 'twist'] as const) expect(inChain(chain, role).length, `${chain} ${role}`).toBeGreaterThan(0);
  for (const id of FILLERS) expect(CARDS[id], id).toBeTruthy();
  expect(CHAIN_IDS).toHaveLength(8);
});

test('four hundred random games all reach closing time, and between them play every card', () => {
  const seen = new Set<string>();
  let splits = 0;
  for (let seed = 1; seed <= 400; seed++) {
    let n = seed * 7919;
    const dice = (k: number) => (n = (n * 1103515245 + 12345) & 0x7fffffff) % k;
    let g = newGame(seed, seed % 3 ? ['You'] : ['Ann', 'Bo', 'Cy'], { length: seed % 2 ? 10 : 5 });
    for (let guard = 0; g.phase !== 'end'; guard++) {
      expect(guard, `seed ${seed} stuck in ${g.phase} on ${cardOf(g).id}`).toBeLessThan(400);
      seen.add(cardOf(g).id);
      const before = g;
      if (g.phase === 'card') for (const p of g.players) g = step(g, { t: 'vote', p: p.id, option: cardOf(g).options[dice(cardOf(g).options.length)].id });
      else if (g.phase === 'split') {
        splits++;
        const reasons = reasonsFor(g), way = (['explain', 'takeBack', 'shrug'] as const)[dice(3)];
        g = step(g, way === 'explain' && reasons.length ? { t: 'split', way, diff: dice(reasons.length) } : { t: 'split', way: way === 'explain' ? 'shrug' : way });
      } else if (g.phase === 'bowl') for (const p of g.players) g = step(g, { t: 'throw', p: p.id, throw: { x: dice(80) / 100 - 0.4, vx: dice(40) / 100 - 0.2, vy: 5 + dice(5), spin: dice(20) / 10 - 1 } });
      else g = step(g, { t: 'next' });
      expect(g, `seed ${seed}: nothing happened in ${before.phase}`).not.toBe(before);
    }
    const s = summary(g);
    expect(s.title).not.toMatch(/undefined/);
    for (const p of g.players) expect(Number.isFinite(p.score)).toBe(true);
  }
  const rare = ['loop', 'shirt', 'crowd', 'vouch']; // twists reached only through one particular reason: covered by the routing test
  for (const id of Object.keys(CARDS)) if (!rare.includes(id)) expect(seen, id).toContain(id);
  expect(splits).toBeGreaterThan(300); // random play is caught out often: that is the point
  console.log(`splits in 400 random games: ${splits}`);
});

test('a ten-frame night without a shrug earns an eleventh frame with bumpers', () => {
  let g = newGame(9, ['You'], { length: 10, cards: [...Array(10).fill('liar')] });
  g.length = 10;
  for (let i = 0; i < 10; i++) g = bowl(g);
  expect([g.phase, cardOf(g).id, g.bowl.p0.lane.bumpers]).toEqual(['bowl', 'bonus', true]);
  expect(bowl(g).phase).toBe('end');
});

test('each reason leads to the twist that tests it', () => {
  for (const [setup, echo, pickSetup, pickEcho] of [['switch', 'fatman', 'A', 'B'], ['nacho', 'jar', 'A', 'B']] as const)
    CARDS[echo].differences!.forEach((d, i) => {
      let g = vote(bowl(vote(game([setup, echo, `twist:${CARDS[echo].chain}`]), pickSetup)), pickEcho);
      g = bowl(step(g, { t: 'split', way: 'explain', diff: i }));
      expect(cardOf(g).id).toBe(d.twist);
    });
});

test('the alley remembers: last night\'s rule can cause a Split tonight', () => {
  const last = bowl(vote(game(['switch']), 'A'));
  expect(toRemember(last)).toEqual(['numbers:A']);
  let g = bowl(newGame(2, ['You'], { cards: ['warmup', 'hungry'], remembered: [...toRemember(last), 'no-such-rule'] }));
  expect(g.stamps.map((s) => [s.text, s.old])).toEqual([['Numbers count', true]]);
  g = vote(g, 'B');
  expect([g.phase, g.stamps[g.splitAgainst!].old]).toEqual(['split', true]);
});

test('every rule a choice can go against offers at least two reasons at a Split', () => {
  const clashable = new Set(['self:A']);
  for (const c of Object.values(CARDS)) for (const o of c.options) for (const x of [o.says && opposite(o.says), ...(o.breaks ?? [])]) if (x) clashable.add(x);
  for (const claim of clashable) {
    const g = newGame(1, ['You'], { cards: ['warmup'], remembered: [claim] });
    Object.assign(g, { phase: 'split', splitAgainst: 0 });
    expect(reasonsFor(g).length, claim).toBeGreaterThanOrEqual(2);
  }
  for (const d of Object.values(EXCEPTIONS).flat()) expect(RULES[d.says], d.says).toBeDefined();
});
