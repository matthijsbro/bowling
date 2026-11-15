// The whole rule set as one pure function: step(game, event) -> game.
// The browser runs it offline; the server will run the same code for online play.
//
// How consistency works: every decision stamps a rule (a Claim) on the board. A later choice
// clashes when it goes against a rule that is still standing: the opposite side of what it says,
// anything in its `breaks` list, or, for a choice that costs pins, "We do what suits us".
// A clash is a Split. Reasons given at a Split become rules too, so they can be broken later.
import { CARDS, CHAIN_IDS, FILLERS, inChain } from './cards/index.ts';
import { PEOPLE, RULES, opposite } from './cards/rules.ts';
import { fullRack, runThrow, type Lane, type Throw } from './sim.ts';
import type { Card, Claim, LaneMod, Option, OptionId, ScoreMod } from './types.ts';

export type Stamp = { claim: Claim; text: string; frame: number; struck?: boolean; why?: boolean; covers?: Claim; old?: boolean };
export type Player = { id: string; name: string; score: number; frames: number[] };
export type Way = 'explain' | 'takeBack' | 'shrug';
export type FrameLog = { card: string; decision: OptionId | null; votes: Record<string, OptionId>; split?: Way; grabbers?: string[]; kept?: boolean; notes: string[] };
type Bowl = { lane: Lane; score: ScoreMod; throws: number; pins: number };
/** Online only: who has voted so far. The votes themselves stay hidden until everyone is in. */
export type View = Game & { voted?: string[] };
export type Game = {
  rng: number;
  frame: number;
  cards: string[];
  length: number;
  best: number;        // solo: your best game, to decide whether you are "ahead" or "behind"
  players: Player[];
  phase: 'card' | 'split' | 'bowl' | 'aftermath' | 'end';
  votes: Record<string, OptionId>;
  decision: OptionId | null;
  stamps: Stamp[];
  splitAgainst: number | null;
  explained: Record<string, { diff: number; stamp: number }>;
  record: { explained: number; survived: number; takenBack: number; shrugged: number };
  penalty: boolean;    // a shrug: the next frame is a 7-10 split
  sevenTen: boolean;   // this frame is that 7-10 split
  bumpers: boolean;    // reward for standing by an explanation
  dryNext: boolean; dry: boolean;  // the tip jar came up short
  sloppy: boolean;     // the Pin Boy is out
  strikeAt: number;    // the Heap: how many pins count as a strike
  bowl: Record<string, Bowl>;
  after: string[] | null;
  log: FrameLog[];
};
export type Ev =
  | { t: 'vote'; p: string; option: OptionId }
  | { t: 'split'; way: Way; diff?: number }
  | { t: 'throw'; p: string; throw: Throw }
  | { t: 'next' };

function rand(g: Game): number { // mulberry32
  let t = (g.rng += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
const pick = <T>(g: Game, list: T[]): T => list[Math.floor(rand(g) * list.length)];
function shuffled<T>(g: Game, list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand(g) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export function cardOf(g: Game): Card {
  const id = g.cards[Math.min(g.frame, g.cards.length - 1)];
  if (!id.startsWith('twist:')) return CARDS[id];
  const chain = id.slice(6), ex = g.explained[chain];
  const viaReason = ex && inChain(chain, 'echo')[0].differences?.[ex.diff].twist;
  return viaReason ? CARDS[viaReason] : inChain(chain, 'twist')[0];
}

export function newGame(seed: number, names: string[], opts: { length?: 5 | 10; best?: number; cards?: string[]; remembered?: Claim[] } = {}): Game {
  const g: Game = {
    rng: seed | 0, frame: 0, cards: [], length: opts.length ?? 5, best: opts.best ?? 0,
    players: names.map((name, i) => ({ id: `p${i}`, name, score: 0, frames: [] })),
    phase: 'card', votes: {}, decision: null, stamps: [], splitAgainst: null, explained: {},
    record: { explained: 0, survived: 0, takenBack: 0, shrugged: 0 },
    penalty: false, sevenTen: false, bumpers: false, dryNext: false, dry: false, sloppy: false, strikeAt: 10,
    bowl: {}, after: null, log: [],
  };
  // chains are interleaved so each echo lands after the group has moved on
  const [a, b, c] = shuffled(g, CHAIN_IDS), id = (chain: string, role: Card['role']) => inChain(chain, role)[0].id;
  const filler = pick(g, FILLERS);
  g.cards = opts.cards ?? (g.length === 5
    ? ['warmup', id(a, 'setup'), filler, id(a, 'echo'), `twist:${a}`]
    : ['warmup', id(a, 'setup'), id(b, 'setup'), id(c, 'setup'), id(a, 'echo'), filler, id(b, 'echo'), `twist:${a}`, id(c, 'echo'), `twist:${c}`]);
  // rules carried over from an earlier night are on the board from the first frame, and can be broken like any other
  for (const claim of opts.remembered ?? []) if (RULES[claim] && live(g, claim) < 0) g.stamps.push({ claim, text: RULES[claim], frame: -1, old: true });
  startFrame(g);
  return g;
}

/** What the alley keeps for next time: the last few plain rules still standing. Reasons given at a Split are forgotten. */
export const toRemember = (g: Game): Claim[] => g.stamps.filter((s) => !s.struck && !s.why && s.claim !== 'self:A').slice(-3).map((s) => s.claim);

function startFrame(g: Game) {
  const card = cardOf(g);
  g.votes = {}; g.decision = null; g.after = null; g.splitAgainst = null; g.bumpers = false;
  g.sevenTen = g.penalty; g.penalty = false;
  g.dry = g.dryNext; g.dryNext = false;
  g.log.push({ card: card.id, decision: null, votes: {}, notes: [] });
  if (card.kind === 'plain') setBowl(g, () => ({ lane: card.lane })); else g.phase = 'card';
}

export const frameDone = (b: Bowl) => b.throws >= 2 || !b.lane.standing.some(Boolean);

function setBowl(g: Game, forPlayer: (playerId: string) => { lane?: LaneMod; score?: ScoreMod; standing?: number[] }) {
  g.bowl = {};
  for (const p of g.players) {
    const { lane: mod = {}, score = {}, standing: only } = forPlayer(p.id);
    const gone = new Set(mod.flat ?? []);
    const missing = (mod.missing ?? 0) + (g.sloppy ? 2 : 0);
    for (const i of shuffled(g, [...Array(10).keys()]).slice(0, missing)) gone.add(i);
    const standing = fullRack().map((_, i) => (!g.sevenTen || i === 6 || i === 9) && !gone.has(i) && (!only || only.includes(i)));
    const { missing: _m, ...rest } = mod;
    g.bowl[p.id] = {
      lane: { ...rest, standing, flat: mod.flat, bumpers: mod.bumpers || g.bumpers, speed: (mod.speed ?? 1) * (g.dry ? 0.7 : 1) },
      score, throws: 0, pins: 0,
    };
  }
  g.phase = 'bowl';
  if (Object.values(g.bowl).every(frameDone)) finishFrame(g); // nothing left to throw at
}

function finishFrame(g: Game) {
  const log = g.log.at(-1)!, card = cardOf(g);
  for (const p of g.players) {
    const b = g.bowl[p.id];
    let pins = b.score.gift || b.pins >= g.strikeAt ? 10 : b.pins;
    pins = Math.round(pins * (b.score.mul ?? 1)) + (b.score.bonus ?? 0);
    b.pins = pins; p.frames.push(pins); p.score += pins;
  }
  const option = card.options.find((o) => o.id === g.decision);
  g.after = [option?.after ?? '', ...log.notes].filter(Boolean);
  if (card.kind === 'plain') g.after.unshift(card.lane ? 'That was the strange one.' : 'Nothing went wrong. Remember the feeling.');
  g.phase = 'aftermath';
}

const live = (g: Game, claim: Claim) => g.stamps.findIndex((s) => s.claim === claim && !s.struck);
const lowestScorer = (g: Game) => g.players.reduce((lo, p) => (p.score < lo.score ? p : lo));

function tally(g: Game): OptionId {
  const counts = new Map<OptionId, number>();
  for (const v of Object.values(g.votes)) counts.set(v, (counts.get(v) ?? 0) + 1);
  const top = Math.max(...counts.values());
  const tied = [...counts].filter(([, n]) => n === top).map(([o]) => o);
  return tied.length === 1 ? tied[0] : g.votes[lowestScorer(g).id]; // on a tie the lowest scorer decides
}

/** Which standing rule, if any, this choice goes against. */
export function clashOf(g: Game, o: Option): number {
  const against = [o.says && opposite(o.says), ...(o.breaks ?? []), o.costly ? 'self:A' : undefined];
  for (const claim of against) {
    if (!claim || claim === o.says) continue;
    const i = live(g, claim), opp = opposite(claim);
    if (i < 0) continue;
    if (opp && live(g, opp) >= 0) continue; // both sides already stand (a shrug): that rule binds nobody any more
    if (o.says && g.stamps.some((s) => !s.struck && s.claim === o.says && s.covers === claim)) continue; // already explained
    return i;
  }
  return -1;
}

function addStamp(g: Game, claim: Claim, extra: Partial<Stamp> = {}): number {
  const have = live(g, claim);
  if (have >= 0) return have;
  return g.stamps.push({ claim, text: RULES[claim], frame: g.frame, ...extra }) - 1;
}

const behind = (g: Game, id: string) => {
  const p = g.players.find((x) => x.id === id)!;
  if (g.players.length === 1) return p.score < (g.best ? g.best / g.length : 7) * g.frame; // solo: against your own best pace
  const sorted = g.players.map((x) => x.score).sort((x, y) => x - y);
  return p.score <= sorted[Math.floor((sorted.length - 1) / 2)];
};

/** The decision is final: stamp it, apply what it does, set the lane. */
function settle(g: Game, card: Card) {
  const o = card.options.find((x) => x.id === g.decision)!, log = g.log.at(-1)!;
  if (o.says && log.split !== 'explain') addStamp(g, o.says);
  const perPlayer: Record<string, LaneMod> = {};
  switch (o.special) {
    case 'veil-comp': case 'veil-luck': {
      const draws = g.players.length === 1 ? [pick(g, ['crooked', 'perfect', 'normal'])] : shuffled(g, ['crooked', 'perfect', ...Array(g.players.length - 2).fill('normal')]);
      g.players.forEach((p, i) => {
        const d = draws[i];
        perPlayer[p.id] = d === 'crooked' ? { curve: 0.5, bumpers: o.special === 'veil-comp' } : d === 'perfect' ? { ball: 'perfect' } : {};
        log.notes.push(`${p.name} drew the ${d} lane${d === 'crooked' ? (o.special === 'veil-comp' ? ', with bumpers' : ', and bowls it as it is') : ''}.`);
      });
      break;
    }
    case 'tray-low': case 'tray-high':
      for (const p of g.players) {
        const gets = behind(g, p.id) === (o.special === 'tray-low');
        perPlayer[p.id] = { bumpers: gets };
        log.notes.push(`${p.name} ${behind(g, p.id) ? 'was behind' : 'was ahead'} and ${gets ? 'got a tray: bumpers' : 'got no tray'}.`);
      }
      break;
    case 'rounding':
      for (const p of g.players) p.score -= g.frame;
      log.notes.push(`Everyone lost ${g.frame} pins.`);
      break;
    case 'weighted': {
      const lead = g.players.reduce((hi, p) => (p.score > hi.score ? p : hi)), last = lowestScorer(g);
      lead.score -= 5;
      if (last !== lead) last.score += 5;
      log.notes.push(last !== lead ? `${lead.name} handed five pins to ${last.name}.` : 'You handed five pins back to the house.');
      break;
    }
    case 'question': {
      const who = pick(g, g.players);
      who.score -= 3;
      log.notes.push(`${who.name} lost three pins for the foul.`);
      break;
    }
    case 'pinboy-out': g.sloppy = true; break;
    case 'heap-loose': g.strikeAt = 7; break;
    case 'walkout':
      g.after = [o.after]; g.frame = g.cards.length; g.phase = 'end';
      return;
  }
  setBowl(g, (id) => ({ lane: { ...o.lane, ...perPlayer[id] }, score: o.score }));
}

/** Secret frames: each choice only affects its owner, except where the card pools them. */
function settleSecret(g: Game, card: Card) {
  const log = g.log.at(-1)!, solo = g.players.length === 1;
  const mine = (id: string) => card.options.find((o) => o.id === g.votes[id])!;
  if (card.id === 'twoGoodBalls') {
    const grab = g.players.filter((p) => g.votes[p.id] === 'B').map((p) => p.name);
    if (solo && rand(g) < 0.35) grab.push('Goose no. 4'); // alone, you are up against the regulars. Only the goose is tempted.
    log.grabbers = grab;
    log.notes.push(grab.length === 0 ? 'Everyone shared, so everyone bowled with a normal ball.'
      : grab.length === 1 ? `${grab[0]} grabbed a good ball and got a perfect one. Everyone else got a wobbly ball.`
      : `${grab.join(' and ')} all grabbed, so everyone got a wobbly ball.`);
    return setBowl(g, (id) => ({ lane: grab.length === 0 ? {} : { ball: grab.length === 1 && g.votes[id] === 'B' ? 'perfect' : 'wobble' } }));
  }
  if (card.id === 'tipjar') {
    const gave = (o: OptionId) => (o === 'C' ? 2 : o === 'B' ? 1 : 0);
    let total = g.players.reduce((n, p) => n + gave(g.votes[p.id]), 0), bowlers = g.players.length;
    if (solo) for (let i = 0; i < 3; i++, bowlers++) total += Math.floor(rand(g) * 3); // the three regulars tip as they please
    g.dryNext = total < bowlers;
    log.notes.push(`The jar holds ${total} ${total === 1 ? 'pin' : 'pins'} from ${bowlers} bowlers. ${g.dryNext ? 'Not enough: next frame the lanes are dry and every ball is slow.' : 'Enough: the lanes get their oil.'}`);
  }
  if (card.id === 'curtain') {
    // she has never been wrong: whatever you choose is what she predicted
    log.notes.push('The Counter Lady predicted each choice correctly. One-boxers found ten golden pins. Two-boxers found an empty curtain.');
    return setBowl(g, (id) => (g.votes[id] === 'A' ? { standing: [], score: { bonus: 10 } } : { standing: [0, 1, 2] }));
  }
  const acted = g.players.filter((p) => g.votes[p.id] === 'A');
  if (card.id === 'glitch') log.notes.push(`Bowlers who used the glitch: ${g.players.filter((p) => g.votes[p.id] === 'B').length} of ${g.players.length}.`);
  if (card.id === 'foul') log.notes.push(`Fouls reported: ${acted.length}.`);
  if (card.id === 'culprit') log.notes.push(acted.length ? 'Someone confessed. The Janitor is cleared.' : 'Nobody confessed.');
  setBowl(g, (id) => ({ lane: mine(id).lane, score: mine(id).score }));
}

export function step(old: Game, ev: Ev): Game {
  const g = structuredClone(old), card = cardOf(g), log = g.log.at(-1)!;

  if (ev.t === 'vote' && g.phase === 'card') {
    if (!g.players.some((p) => p.id === ev.p) || !card.options.some((o) => o.id === ev.option)) return old;
    g.votes[ev.p] = ev.option;
    if (Object.keys(g.votes).length < g.players.length) return g;
    log.votes = g.votes;
    if (card.kind === 'secret') { settleSecret(g, card); return g; }
    g.decision = log.decision = tally(g);
    const o = card.options.find((x) => x.id === g.decision)!;
    // a twist that tests a reason given earlier: stand by it for bumpers, or lose the reason
    const ex = card.chain ? g.explained[card.chain] : undefined;
    const fits = ex && card.role === 'twist' ? inChain(card.chain!, 'echo')[0].differences![ex.diff].test ?? card.test : undefined;
    if (ex && fits) {
      log.kept = g.decision === fits;
      if (log.kept) {
        g.record.survived++; g.bumpers = true;
        log.notes.push('You stuck to the reason you gave at the Split, so the bumpers are up this frame as a reward.');
      } else {
        g.stamps[ex.stamp].struck = true;
        log.notes.push('You went against the reason you gave at the Split, so it has been crossed off the board.');
      }
      settle(g, card);
      return g;
    }
    const against = clashOf(g, o);
    if (against >= 0) { g.splitAgainst = against; g.phase = 'split'; } else settle(g, card);
    return g;
  }

  if (ev.t === 'split' && g.phase === 'split' && g.splitAgainst !== null) {
    const was = g.stamps[g.splitAgainst];
    if (ev.way === 'explain') {
      const diff = reasonsFor(g)[ev.diff ?? -1];
      if (!diff) return old;
      const stamp = addStamp(g, diff.says, { why: true, covers: was.claim });
      if (card.chain && card.differences?.includes(diff)) g.explained[card.chain] = { diff: card.differences.indexOf(diff), stamp };
      g.record.explained++;
    } else if (ev.way === 'takeBack') {
      const flipped = opposite(was.claim);
      if (flipped && live(g, flipped) < 0) g.stamps[g.splitAgainst] = { claim: flipped, text: RULES[flipped], frame: g.frame };
      else was.struck = true;
      g.record.takenBack++;
    } else {
      g.record.shrugged++;
      g.penalty = true;
      log.notes.push('Because you shrugged at the Split, next frame only the two far corner pins are set up.');
    }
    log.split = ev.way;
    g.splitAgainst = null;
    settle(g, card);
    return g;
  }

  if (ev.t === 'throw' && g.phase === 'bowl') {
    const b = g.bowl[ev.p];
    if (!b || frameDone(b)) return old;
    const before = b.lane.standing.filter(Boolean).length;
    const r = runThrow(b.lane, ev.throw);
    b.pins += before - r.standing.filter(Boolean).length;
    b.throws++;
    b.lane.standing = r.standing;
    if (r.fatmanHit) b.lane.props = b.lane.props?.filter((p) => p.kind !== 'fatman');
    if (Object.values(g.bowl).every(frameDone)) finishFrame(g);
    return g;
  }

  if (ev.t === 'next' && g.phase === 'aftermath') {
    g.frame++;
    // a full game without a single shrug earns an eleventh frame, with bumpers
    if (g.frame === g.cards.length && g.length === 10 && g.record.shrugged === 0 && g.cards.at(-1) !== 'bonus') g.cards = [...g.cards, 'bonus'];
    if (g.frame >= g.cards.length) g.phase = 'end'; else startFrame(g);
    return g;
  }
  return old;
}

/** The reasons on offer at the current Split. Outside the clash a card was built for, the only reason is the honest one. */
export function reasonsFor(g: Game) {
  if (g.phase !== 'split' || g.splitAgainst === null) return [];
  const card = cardOf(g), old = g.stamps[g.splitAgainst];
  const offered = card.splitOn?.includes(old.claim) ? card.differences ?? [] : [];
  const honest = { text: 'No real difference. It simply suited us better this time', says: 'self:A' };
  // a reason that is already a rule, or whose opposite is, cannot be given again
  const open = offered.filter((d) => live(g, d.says) < 0 && !(opposite(d.says) && live(g, opposite(d.says)!) >= 0));
  return old.claim === 'self:A' ? [] : open.some((d) => d.says === 'self:A') || live(g, 'self:A') >= 0 ? open : [...open, honest];
}

/** The House Record, the epilogue, the review and each player's receipt. */
export function summary(g: Game) {
  const first = g.stamps.find((s) => !s.why && PEOPLE[s.claim]) ?? g.stamps.find((s) => PEOPLE[s.claim]);
  const people = first ? PEOPLE[first.claim] : 'Bowlers';
  const shrugged = g.log.find((l) => l.split === 'shrug'), r = g.record;
  const title = shrugged ? `${people} until ${CARDS[shrugged.card].until ?? 'it costs pins'}`
    : r.explained ? `${people}, with ${r.explained === 1 ? 'a footnote' : `${r.explained} footnotes`}`
    : r.takenBack ? `Reformed ${people.toLowerCase()}`
    : `Unbending ${people.toLowerCase()}. Suspicious.`;
  const epilogue = g.log.flatMap((l) => {
    const c = CARDS[l.card];
    const o = c.kind === 'secret' ? c.options.find((x) => x.epilogue && Object.values(l.votes).includes(x.id)) : c.options.find((x) => x.id === l.decision);
    return o?.epilogue ? [o.epilogue] : [];
  });
  if (r.shrugged) epilogue.push('The Pinsetter has had your shrug framed. It hangs by the shoe counter.');
  const review = g.log.flatMap((l) => (CARDS[l.card].about ? [{ title: CARDS[l.card].title, about: CARDS[l.card].about }] : []));
  const receipts = g.players.map((p) => {
    // replay this player's own votes against their own earlier votes
    const held = new Set<Claim>();
    let flips = 0;
    const secrets: string[] = [];
    for (const l of g.log) {
      const c = CARDS[l.card], o = c.options.find((x) => x.id === l.votes[p.id]);
      if (!o) continue;
      if (c.kind === 'secret') {
        if (c.id === 'twoGoodBalls') secrets.push(o.id === 'B' ? 'Grabbed a good ball.' : 'Shared the good balls.');
        if (c.id === 'glitch') secrets.push(o.id === 'B' ? 'Used the glitch: three free pins.' : 'Left the glitch alone.');
        if (c.id === 'tipjar') secrets.push(`Put ${o.id === 'C' ? 'two pins' : o.id === 'B' ? 'one pin' : 'nothing'} in the tip jar.`);
        if (c.id === 'curtain') secrets.push(o.id === 'A' ? 'Took only the curtain.' : 'Took the curtain and the three pins.');
        if (c.id === 'foul') secrets.push(o.id === 'A' ? 'Reported your own foul.' : 'Kept quiet about your own foul.');
        if (c.id === 'culprit') secrets.push(o.id === 'A' ? 'Confessed to breaking the machine.' : 'Let someone else carry the blame for the machine.');
        continue;
      }
      const broken = [o.says && opposite(o.says), ...(o.breaks ?? [])].filter((x): x is Claim => !!x && held.has(x));
      if (broken.length) flips++;
      for (const x of broken) held.delete(x); // one flip per rule dropped, not one per later card
      if (o.says) held.add(o.says);
    }
    return {
      name: p.name, score: p.score, frames: p.frames,
      title: flips === 0 ? 'Steadiest Hand' : flips === 1 ? 'The Flip' : 'The Weathervane',
      lines: [`Votes that went against your own earlier votes: ${flips}.`, ...secrets],
    };
  });
  return { title, record: r, stamps: g.stamps, epilogue: epilogue.slice(0, 5), review, receipts };
}
