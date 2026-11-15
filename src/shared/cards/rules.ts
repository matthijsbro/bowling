import type { Claim } from '../types.ts';

/** Every rule that can end up on the House Rules board. A and B of one principle contradict each other. */
export const RULES: Record<Claim, string> = {
  'numbers:A': 'Numbers count', 'numbers:B': 'We do not steer harm onto someone',
  'tool:A': 'Nobody gets used as a tool', 'tool:B': 'People may be used for a good result',
  'help:A': 'When it costs little, you help', 'help:B': 'Other people\'s trouble is not ours',
  'far:A': 'Distance makes no difference', 'far:B': 'We help who is in front of us',
  'luck:A': 'Bad luck gets compensated', 'luck:B': 'You play what you are dealt',
  'outcome:A': 'You answer for what you did', 'outcome:B': 'You answer for what happened',
  'history:A': 'A thing is its history', 'history:B': 'A thing is its parts',
  'copy:A': 'A perfect copy is the same thing', 'copy:B': 'A copy is not the original',
  'real:A': 'It has to be real', 'real:B': 'The feeling is what counts',
  'truth:A': 'We tell the truth', 'truth:B': 'We cover for each other',
  'punish:A': 'Wrongdoers pay', 'punish:B': 'Punishment has to do some good',
  'doubt:A': 'If it might suffer, we go easy', 'doubt:B': 'No proof, no problem',
  'share:A': 'Everyone gets a turn',
  'walk:A': 'Some games are not worth playing',
  // reasons given at a Split
  'hands:A': 'Hands are not levers', 'staff:A': 'Staff are fair game',
  'only:A': 'We help when nobody else can', 'check:A': 'We only pay for what we can check',
  'merit:A': 'Skill gets rewarded', 'chance:A': 'Equal chances are enough',
  'prize:A': 'Luck may reward, never punish', 'harm:A': 'Luck counts when nobody is hurt',
  'people:A': 'People are not things', 'once:A': 'A title is won once',
  'asked:A': 'Unasked gifts may be kept', 'same:A': 'If all gain equally, nobody is wronged',
  'right:A': 'Truth is owed only to those with a right to it', 'shield:A': 'A lie that protects someone is allowed',
  'guilt:A': 'Only the guilty get blamed',
  'self:A': 'We do what suits us',
};

/** What a rule makes of the group, for the House Record title. */
export const PEOPLE: Record<Claim, string> = {
  'numbers:A': 'Utilitarians', 'numbers:B': 'Hands-off people', 'tool:A': 'Kantians, roughly', 'tool:B': 'Managers',
  'help:A': 'Good neighbours', 'help:B': 'Minders of their own business', 'far:A': 'Citizens of the world', 'far:B': 'Locals',
  'luck:A': 'Levellers', 'luck:B': 'Gamblers', 'outcome:A': 'Intention people', 'outcome:B': 'Results people',
  'history:A': 'Sentimentalists', 'history:B': 'Mechanics', 'copy:A': 'Photocopiers', 'copy:B': 'Collectors',
  'real:A': 'Realists', 'real:B': 'Dreamers', 'truth:A': 'Truth-tellers', 'truth:B': 'Loyal liars',
  'punish:A': 'Avengers', 'punish:B': 'Pragmatists', 'doubt:A': 'Careful souls', 'doubt:B': 'Sceptics',
  'share:A': 'Sharers', 'walk:A': 'Leavers', 'guilt:A': 'Fair judges', 'self:A': 'Honest opportunists',
};

export const opposite = (c: Claim): Claim | undefined => {
  const o = c.endsWith(':A') ? c.slice(0, -1) + 'B' : c.slice(0, -1) + 'A';
  return RULES[o] ? o : undefined;
};
