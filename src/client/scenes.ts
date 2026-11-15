// What is acted out on the lane for each card. Positions are lane metres: x across, y down-lane.
// Each scene has its cast, a short scripted moment when it opens (beats), and what happens to everyone
// when the decision lands (react).
import { angry, board, cake, child, counterLady, curtain, fatMan, fatManStaff, goodBall, jar, janitor, leagueFive, lever, oldFive, pinBoy, pinsetter, runaway, thief, tray } from './cast/cast.ts';
import type { Mood } from './cast/draw.ts';
import type { Fx } from './stage/fx.ts';
import type { OptionId } from '../shared/types.ts';

type Anim = 'rolloff' | 'rollright' | 'bonk' | 'pushed' | 'drop' | 'hop' | 'squash' | 'spin' | 'choke' | 'wave' | 'duck' | 'sneeze' | 'shake';
type Spot = [number, number];
export type Change = { mood?: Mood; anim?: Anim; fx?: readonly Fx[]; say?: string; to?: Spot };
export type Beat = [at: number, who: string, change: Change];
export type ActorDef = { key: string; draw: (m: Mood) => string; x: number; y: number; h: number; mood?: Mood; anim?: 'bob' | 'rumble' | 'sway'; from?: Spot; enter?: 'top' };
export type Reaction = Record<string, Change>;
export type Scene = { cam: number; actors: ActorDef[]; beats?: Beat[]; react?: Partial<Record<OptionId, Reaction>> };

const LANE4 = 1.775;
const five: ActorDef = { key: 'five', draw: leagueFive, x: 0, y: 9.3, h: 1.5, anim: 'bob' };
// the runaway ball comes rumbling up from the bowlers' end
const ball: ActorDef = { key: 'ball', draw: runaway, x: 0, y: 6.9, h: 1, anim: 'rumble', from: [0, 1.5] };
const pull: ActorDef = { key: 'lever', draw: lever, x: -1, y: 7.4, h: 1.1 };
const fatBeside: ActorDef = { key: 'fat', draw: fatMan, x: 0.95, y: 7.3, h: 1.8, mood: 'glee', anim: 'sway', from: [3.2, 7.3] };
const off = { ball: { anim: 'rolloff' } } as const, aside = { ball: { anim: 'rollright' } } as const, stopped = { ball: { anim: 'bonk' } } as const;
// the usual outcomes
const fiveSaved = { five: { mood: 'glee', anim: 'hop', fx: ['confetti'] } } as const;
const fiveHit = { ...off, five: { mood: 'hurt', anim: 'squash', fx: ['feathers', 'blood'] } } as const;
const fatHit = { mood: 'hurt', fx: ['blood', 'nachos'] } as const;
const fiveBusy: Beat[] = [[500, 'five', { say: 'honk honk' }], [2600, 'five', { mood: 'alarm', say: 'HONK?' }]];

export const TITLE: Scene = { cam: 0, actors: [{ key: 'pinsetter', draw: pinsetter, x: 0.8, y: 4.5, h: 2.1, anim: 'sway' }, { ...five, anim: 'bob' }] };

export const SCENES: Record<string, Scene> = {
  warmup: { cam: 0, actors: [] },
  switch: {
    cam: 1.2,
    actors: [five, { key: 'janitor', draw: janitor, x: LANE4 - 0.2, y: 7.8, h: 1.6, anim: 'sway' }, ball, pull],
    beats: [...fiveBusy, [1500, 'janitor', { say: 'La la la.' }], [2100, 'lever', { anim: 'hop' }]],
    react: {
      A: { ...aside, ...fiveSaved, janitor: { mood: 'hurt', anim: 'spin', fx: ['blood', 'stars'] } },
      B: { ...fiveHit, janitor: { mood: 'glee' } },
    },
  },
  twoGoodBalls: {
    cam: 0,
    actors: [
      { key: 'g1', draw: goodBall, x: -0.2, y: 7, h: 0.9, anim: 'bob', enter: 'top' }, { key: 'g2', draw: goodBall, x: 0.25, y: 7.3, h: 0.9, anim: 'sway', enter: 'top' },
      { key: 'fat', draw: fatMan, x: 1, y: 8.4, h: 1.8, anim: 'sway', from: [3.2, 8.4] }, { key: 'janitor', draw: janitor, x: -1, y: 8.6, h: 1.6, anim: 'bob', from: [-3, 8.6] },
      { key: 'child', draw: child, x: -0.85, y: 6.6, h: 1.1, mood: 'glee', anim: 'bob', from: [-3, 6.6] },
    ],
    beats: [[900, 'g1', { fx: ['stars'] }], [1500, 'fat', { say: 'After you.' }], [2200, 'child', { say: 'MINE.', to: [-0.5, 6.8] }], [3000, 'janitor', { say: 'Hm.' }]],
  },
  fatman: {
    cam: 1.2,
    actors: [five, fatBeside, ball],
    beats: [...fiveBusy, [1300, 'fat', { say: 'Nachos.', fx: ['nachos'] }]],
    react: {
      A: { ...stopped, ...fiveSaved, fat: { ...fatHit, anim: 'pushed' } },
      B: { ...fiveHit, fat: { mood: 'glee', anim: 'hop' } },
    },
  },
  trapdoor: {
    cam: 1.2,
    actors: [five, { key: 'fat', draw: fatMan, x: 0, y: 8.3, h: 1.8, mood: 'glee', anim: 'bob' }, ball, pull],
    beats: [...fiveBusy, [1200, 'fat', { say: 'Odd floor, this.', anim: 'hop' }]],
    react: {
      A: { ...stopped, ...fiveSaved, fat: { ...fatHit, anim: 'drop' } },
      B: { ...fiveHit, fat: { mood: 'glee', anim: 'hop' } },
    },
  },
  loop: {
    cam: 1.2,
    actors: [five, { key: 'janitor', draw: janitor, x: 0, y: 8.3, h: 1.6, anim: 'sway', from: [LANE4, 8.3] }, ball, pull],
    beats: [...fiveBusy, [1400, 'janitor', { say: 'Just mopping.' }]],
    react: {
      A: { ...stopped, ...fiveSaved, janitor: { mood: 'hurt', anim: 'squash', fx: ['blood', 'stars'] } },
      B: { ...fiveHit, janitor: { mood: 'glee' } },
    },
  },
  shirt: {
    cam: 1.2,
    actors: [five, { ...fatBeside, draw: fatManStaff }, ball],
    beats: [...fiveBusy, [1300, 'fat', { say: 'I work here now.', anim: 'hop' }]],
    react: {
      A: { ...stopped, ...fiveSaved, fat: { ...fatHit, anim: 'pushed' } },
      B: { ...fiveHit, fat: { mood: 'glee', anim: 'hop' } },
    },
  },
};

// The other cards use a small set of fixed spots, so the cast is always above the card panel.
const SPOT = { end: [0, 9.3], mid: [0, 7.2], R: [1.02, 8.1], L: [-1.02, 8.1], R2: [0.95, 6.9], L2: [-0.95, 6.9], four: [LANE4, 8] } as const;
const WHO = {
  five: [leagueFive, 1.5], oldFive: [oldFive, 1.6], fat: [fatMan, 1.8], janitor: [janitor, 1.6], child: [child, 1.2], pinsetter: [pinsetter, 2.1],
  lady: [counterLady, 1.6], pinBoy: [pinBoy, 1.7], angry: [angry, 1.9], thief: [thief, 1.5],
  jar: [jar, 1.1], curtain: [curtain, 1.9], cake: [cake, 0.9], tray: [tray, 0.8], board: [board, 1.9], goodBall: [goodBall, 0.9], ball: [runaway, 1],
} as const;
const ANIMS = ['bob', 'sway', 'bob', 'sway'] as const;
const MOODS = ['calm', 'alarm', 'glee', 'hurt'], FXS = ['blood', 'feathers', 'confetti', 'stars', 'nachos', 'snot', 'dust'];
/** "child:glee+confetti fat:hurt+blood+squash" -> what each actor does when the decision lands. */
const reaction = (spec: string): Reaction => Object.fromEntries(spec.split(' ').filter(Boolean).map((bit) => {
  const [who, what] = bit.split(':'), words = what.split('+');
  return [who, {
    mood: words.find((w) => MOODS.includes(w)) as Mood | undefined,
    fx: words.filter((w) => FXS.includes(w)) as Fx[],
    anim: (words.find((w) => !MOODS.includes(w) && !FXS.includes(w)) ?? 'hop') as Anim,
  }];
}));
const at = (spot: keyof typeof SPOT): Spot => [...SPOT[spot]];
/** "fat@R:alarm<right jar@mid<top" -> a scene: who stands where, in what mood, and how they come in. */
const stage = (spec: string, reactions: string[] = [], beats: Beat[] = []): Scene => ({
  cam: 1.2,
  actors: spec.split(' ').map((bit, i) => {
    const [main, how] = bit.split('<'), [who, rest] = main.split('@'), [spot, mood] = rest.split(':');
    const [draw, h] = WHO[who as keyof typeof WHO], [x, y] = SPOT[spot as keyof typeof SPOT];
    return {
      key: `${who}${i}`, draw: draw as ActorDef['draw'], x, y, h, mood: mood as Mood | undefined, anim: who === 'ball' || who === 'angry' ? 'rumble' : ANIMS[i % 4],
      from: how === 'left' ? [-3, y] : how === 'right' ? [3.3, y] : how === 'near' ? [x, 1.5] : undefined, enter: how === 'top' ? 'top' : undefined,
    };
  }),
  beats,
  react: reactions.length ? { A: reaction(reactions[0]), B: reaction(reactions[1] ?? ''), C: reaction(reactions[2] ?? '') } : undefined,
});

Object.assign(SCENES, {
  // she is eating, then she is not breathing
  nacho: stage('child@mid:glee cake@L2 fat@R<right', ['child:glee+confetti+nachos fat:glee', 'child:hurt+spin fat:alarm'],
    [[700, 'child', { fx: ['nachos'], say: 'Nacho!' }], [1700, 'child', { mood: 'alarm', anim: 'choke', say: 'hkk!' }], [2500, 'fat', { mood: 'alarm', say: 'Oh no.' }]]),
  jar: stage('jar@mid<top lady@R', ['jar:confetti lady:glee', 'jar:dust'],
    [[900, 'jar', { anim: 'shake', say: 'clink' }], [1700, 'lady', { say: 'For a child. Elsewhere.' }]]),
  screen: stage('jar@mid board@L<top child@R2:alarm', ['child:glee+confetti jar:confetti', 'child:hurt+spin'],
    [[900, 'board', { say: 'LIVE' }], [1600, 'child', { anim: 'wave', say: 'hello?' }], [3000, 'child', { anim: 'choke', say: 'hkk' }]]),
  crowd: stage('five@end child@mid:glee fat@R<right janitor@L<left thief@L2<left angry@R2<right', ['child:glee+confetti+nachos five:glee', 'child:hurt+spin fat:alarm thief:alarm'],
    [[900, 'child', { mood: 'alarm', anim: 'choke', say: 'hkk!' }], [1700, 'fat', { say: 'Somebody should.' }], [2400, 'thief', { say: 'Not me.' }], [3100, 'angry', { say: '...' }], [3700, 'five', { say: 'honk.' }]]),
  vouch: stage('jar@mid lady@R', ['jar:confetti lady:glee', 'jar:dust'],
    [[800, 'lady', { say: 'It is real.' }], [1800, 'lady', { say: 'I checked.' }], [2400, 'jar', { anim: 'shake' }]]),
  veil: stage('five@end lady@R curtain@L<top', ['five:glee+confetti', 'five:alarm'],
    [[900, 'lady', { say: 'Shuffling the lanes.' }], [1700, 'curtain', { anim: 'shake' }], [2300, 'five', { say: 'honk?' }]]),
  tray: stage('five@end tray@mid<top fat@R<right', ['five:glee+nachos tray:nachos', 'fat:glee+nachos+confetti five:alarm'],
    [[800, 'tray', { fx: ['nachos'] }], [1500, 'fat', { say: 'For me?' }], [2200, 'five', { say: 'HONK.' }]]),
  weighted: stage('goodBall@mid pinsetter@R<right', ['goodBall:confetti', 'goodBall:stars'],
    [[900, 'goodBall', { anim: 'shake', fx: ['dust'] }], [1600, 'pinsetter', { say: 'It was weighted.' }], [2600, 'pinsetter', { say: 'All night.' }]]),
  // two blindfolded throws: one into nothing, one into the cake
  blind: stage('cake@mid child@L:glee thief@R:glee<right fat@R2:glee<right', ['thief:alarm fat:alarm child:glee', 'child:hurt thief:glee+confetti fat:hurt+blood+squash'],
    [[900, 'thief', { anim: 'hop', say: 'Blindfolded!' }], [1500, 'fat', { anim: 'hop', say: 'Me too!' }], [2300, 'cake', { anim: 'squash', fx: ['dust', 'stars'] }], [2500, 'child', { mood: 'alarm', say: 'MY CAKE.' }]]),
  sneeze: stage('fat@R<right five@end', ['fat:alarm+snot five:glee+confetti+snot', 'fat:alarm+snot five:alarm+snot'],
    [[900, 'fat', { mood: 'alarm', say: 'ah...' }], [1700, 'fat', { anim: 'sneeze', fx: ['snot'], say: 'CHOO' }], [1900, 'five', { mood: 'alarm', anim: 'hop' }]]),
  foul: stage('pinsetter@R<right', [], [[900, 'pinsetter', { say: 'The sensor is broken.' }], [2200, 'pinsetter', { say: 'Nobody saw.' }]]),
  lucky: stage('goodBall@L2 janitor@R<right goodBall@R2<top', ['goodBall:confetti+stars janitor:glee', 'goodBall:confetti+stars janitor:glee'],
    [[1100, 'janitor', { say: 'I kept every part.' }], [1900, 'goodBall', { anim: 'hop' }]]),
  champions: stage('five@end oldFive@mid<near', ['five:glee+confetti oldFive:alarm', 'oldFive:glee+confetti five:alarm'],
    [[1300, 'oldFive', { say: 'Our lane, please.' }], [2300, 'five', { mood: 'alarm', say: 'HONK!' }]]),
  return: stage('ball@mid<near pinsetter@R', ['ball:stars', 'ball:blood+squash'],
    [[1200, 'ball', { fx: ['dust', 'stars'], anim: 'shake' }], [1800, 'pinsetter', { say: 'That is a copy.' }], [2900, 'pinsetter', { say: 'So are you.' }]]),
  heaven: stage('board@mid<top lady@R', ['board:confetti+stars', 'board:dust'],
    [[900, 'board', { fx: ['confetti'], say: 'STRIKE!' }], [1700, 'board', { fx: ['confetti'], say: 'STRIKE!' }], [2500, 'lady', { say: 'It is a screen.' }]]),
  rounding: stage('board@mid pinsetter@R<right', ['board:dust', 'board:confetti'],
    [[900, 'board', { anim: 'shake', say: '+1' }], [1500, 'board', { say: '+1' }], [2300, 'pinsetter', { say: 'Every frame.' }]]),
  pinboy: stage('pinBoy@mid<top five@end', ['pinBoy:glee+confetti five:alarm', 'pinBoy:hurt+blood five:glee', 'pinBoy:alarm'],
    [[1000, 'pinBoy', { say: '...' }], [2000, 'pinBoy', { anim: 'shake', say: 'May I bowl?' }]]),
  question: stage('pinsetter@mid<near', [], [[1100, 'pinsetter', { say: 'Well?' }], [2600, 'pinsetter', { say: 'I can wait.' }]]),
  // he stomps in; the Fat Man gets small behind nothing at all
  angry: stage('fat@L angry@mid<right', ['angry:glee fat:hurt+blood+nachos+spin', 'angry:alarm fat:glee+confetti'],
    [[300, 'fat', { mood: 'alarm', anim: 'duck', say: 'shh' }], [1300, 'angry', { say: 'WHERE IS HE.' }], [2500, 'angry', { anim: 'shake', say: 'WELL?' }]]),
  technique: stage('fat@mid:glee<right', ['fat:hurt+spin', 'fat:glee+confetti+nachos'],
    [[1100, 'fat', { say: 'Watch this.' }], [1800, 'fat', { anim: 'spin', fx: ['nachos'] }], [2800, 'fat', { say: 'Good, right?' }]]),
  thief: stage('thief@mid<left lady@R', ['thief:hurt+blood+stars+spin', 'thief:glee+confetti'],
    [[1100, 'thief', { mood: 'alarm', say: 'They are all back!' }], [2000, 'lady', { say: 'I counted.' }], [2800, 'thief', { say: 'Sorry.' }]]),
  machine: stage('pinBoy@L janitor@four', ['janitor:hurt+blood+stars+spin pinBoy:glee', 'janitor:glee+confetti pinBoy:alarm'],
    [[700, 'pinBoy', { anim: 'shake', fx: ['dust', 'stars'], say: 'clunk' }], [1700, 'janitor', { to: at('R'), say: 'Not me.' }]]),
  culprit: stage('pinBoy@mid janitor@R<right', [], [[900, 'pinBoy', { anim: 'shake', fx: ['dust'] }], [1700, 'janitor', { say: 'They think it was me.' }]]),
  glitch: stage('board@mid<top', [], [[900, 'board', { anim: 'shake', say: 'bzzt' }], [1700, 'board', { say: '+3 ?' }]]),
  tipjar: stage('jar@mid<top janitor@R<right', [], [[1100, 'janitor', { say: 'For the oil.' }], [1900, 'jar', { anim: 'shake', say: 'clink' }]]),
  curtain: stage('curtain@mid<top lady@R', [], [[1000, 'curtain', { anim: 'shake' }], [1700, 'lady', { say: 'I already know.' }]]),
  heap: stage('pinsetter@R<right', [], [[1000, 'pinsetter', { say: 'Ten.' }], [1700, 'pinsetter', { say: 'Nine.' }], [2400, 'pinsetter', { say: 'Still a rack?' }]]),
  micro: stage('pinsetter@R<right', [], [[1000, 'pinsetter', { say: 'They are very small.' }], [2200, 'pinsetter', { say: 'And not happy.' }]]),
  scream: stage('five@end', ['five:alarm', 'five:hurt+feathers+blood+squash'], [[800, 'five', { mood: 'alarm', say: 'AAAA' }], [2000, 'five', { say: '(it is the pins)' }]]),
  note: stage('pinBoy@mid<top', ['pinBoy:glee+confetti', 'pinBoy:hurt+blood'], [[1000, 'pinBoy', { say: 'please stop' }], [2300, 'pinBoy', { anim: 'shake', say: 'please' }]]),
  hungry: stage('fat@mid:glee tray@L2<top tray@R2<top', ['fat:glee+confetti+nachos tray:nachos', 'fat:alarm'],
    [[900, 'fat', { say: 'x 100' }], [1500, 'fat', { fx: ['nachos'], anim: 'hop' }], [2400, 'fat', { say: 'Measured.' }]]),
  buridan: stage('pinsetter@mid<near', [], [[1100, 'pinsetter', { say: 'Left.' }], [1800, 'pinsetter', { say: 'Or right.' }], [2700, 'pinsetter', { say: 'Identical.' }]]),
});
