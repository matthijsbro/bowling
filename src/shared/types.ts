import type { BallKind, Prop } from './sim.ts';

export type OptionId = 'A' | 'B' | 'C';
/** A position on a principle, e.g. 'numbers:A'. The wording of each claim is in cards/rules.ts. */
export type Claim = string;
/** What an option does to the lane you then bowl on. */
export type LaneMod = {
  flat?: number[]; missing?: number; props?: Prop[]; bumpers?: boolean; ball?: BallKind;
  curve?: number; sway?: number; speed?: number; wide?: boolean; screen?: boolean; zeno?: boolean; tiny?: boolean;
};
/** What an option does to the frame's score: gift = the frame counts as ten whatever you throw. */
export type ScoreMod = { bonus?: number; gift?: boolean; mul?: number };

export type Option = {
  id: OptionId;
  label: string;
  effect: string;      // what it does to your bowling, shown before you choose
  lane?: LaneMod;
  score?: ScoreMod;
  says?: Claim;        // the rule this choice stamps on the board
  breaks?: Claim[];    // other rules on the board this choice goes against (the opposite of `says` always counts)
  costly?: boolean;    // costs pins, so it goes against "We do what suits us"
  special?: string;    // an effect the engine works out (see engine.ts)
  after: string;       // aftermath line; jokes live here
  epilogue?: string;
};

/** A reason offered at a Split. It becomes a rule itself and can be broken later. */
export type Difference = { text: string; says: Claim; twist?: string; test?: OptionId };

export type Card = {
  id: string;
  title: string;
  kind: 'plain' | 'vote' | 'secret';
  chain?: string;
  role?: 'setup' | 'echo' | 'twist';
  text: string;
  options: Option[];
  about: string;           // the serious background; only shown in the review at the end
  lane?: LaneMod;          // plain frames only
  splitOn?: Claim[];       // the clash this echo was built for; `differences` are offered for it
  differences?: Difference[];
  test?: OptionId;         // twist: the choice that fits the reason that led here
  until?: string;          // "... until <this>" in the group title after a shrug
};
