import type { Card } from '../types.ts';
import { CHAINS } from './chains.ts';
import { FATMAN } from './fatman.ts';
import { ONEOFFS } from './oneoffs.ts';

export const CARDS: Record<string, Card> = Object.fromEntries([...FATMAN, ...CHAINS, ...ONEOFFS].map((c) => [c.id, c]));
export const CHAIN_IDS = [...new Set(Object.values(CARDS).flatMap((c) => (c.chain ? [c.chain] : [])))];
/** Cards that can fill the slot between the chains. */
export const FILLERS = ['twoGoodBalls', 'glitch', 'tipjar', 'curtain', 'heap', 'micro', 'scream', 'note', 'hungry', 'zeno', 'buridan', 'liar'];
export const inChain = (chain: string, role: Card['role']) => Object.values(CARDS).filter((c) => c.chain === chain && c.role === role);
