import type { Claim, Difference } from '../types.ts';

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
  'doubt:A': 'If it might suffer, we go easy', 'doubt:B': 'Without proof of suffering, we carry on',
  'share:A': 'Everyone gets an equal share',
  'walk:A': 'Some games are not worth playing',
  // reasons given at a Split
  'hands:A': 'We do not push people with our own hands', 'staff:A': 'Staff take risks that customers do not',
  'only:A': 'We help when nobody else can', 'check:A': 'We only pay for what we can check',
  'merit:A': 'Skill gets rewarded', 'chance:A': 'Equal chances are enough',
  'prize:A': 'Luck may reward, but not punish', 'harm:A': 'Luck counts when nobody is hurt',
  'people:A': 'People are not things', 'once:A': 'A title is won once',
  'asked:A': 'Gifts we did not ask for may be kept', 'same:A': 'If everyone gains equally, nobody is wronged',
  'right:A': 'Only people with a right to the truth are owed it', 'shield:A': 'A lie that protects someone is allowed',
  'guilt:A': 'Only the guilty get blamed',
  'self:A': 'We do what suits us',
  'many:A': 'When enough people are saved, harm to one is accepted', 'idle:A': 'Doing nothing is also a choice',
  'consent:A': 'We may do what the person would agree to', 'enough:A': 'Using someone needs a very good reason',
  'know:A': 'People we know count for more', 'price:A': 'We are careful only while it costs little',
  'others:A': 'If someone else can help, it is not our job', 'serious:A': 'When it is serious enough, we step in',
  'limit:A': 'We cannot help everyone, so we may stop somewhere', 'near:A': 'People close to us come first',
  'keep:A': 'Nobody has to give up what they won fairly', 'big:A': 'Small bad luck is part of the game, big bad luck is not',
  'fault:A': 'When the alley makes a mistake, the alley puts it right', 'result:A': 'When the harm is big, the result counts too',
  'pure:A': 'A result that is pure chance does not count', 'origin:A': 'When the original people come back, they come first',
  'team:A': 'A team is more than the people in it', 'value:A': 'An original is worth more than a copy',
  'sure:A': 'We trust a copy only when we know it is perfect', 'tell:A': 'If nobody can tell the difference, there is none',
  'game:A': 'In a game, some pretending is allowed', 'score:A': 'Scores have to be real',
  'compare:A': 'When people are compared, it has to be real', 'kind:A': 'An untruth to spare someone\'s feelings is allowed',
  'silent:A': 'Keeping quiet is not lying', 'friend:A': 'Friends are owed the truth',
  'rules:A': 'The rules of the game come before covering for each other', 'repaired:A': 'Someone who has put things right does not have to pay',
  'sorry:A': 'Real regret counts as paying', 'deserve:A': 'Some wrongs must be paid for, even when it fixes nothing',
  'sign:A': 'We need a real sign of suffering', 'small:A': 'When being careful is cheap, we are careful',
  'words:A': 'When something asks us in words to stop, we stop', 'matter:A': 'Some things matter more than the score',
  'golden:A': 'We treat others as we would want to be treated',
};

/**
 * Reasons on offer at any Split against a rule, so there is always a real choice of explanation.
 * A card built for a particular clash adds its own reasons first (Card.differences).
 */
export const EXCEPTIONS: Record<Claim, Difference[]> = {
  'numbers:A': [
    { text: 'Saving more people does not allow us to use one person to do it', says: 'tool:A' },
    { text: 'A bigger total is not worth it if each one is worse off', says: 'share:A' },
  ],
  'numbers:B': [
    { text: 'So many more people are saved this time that the harm to one is worth it', says: 'many:A' },
    { text: 'Doing nothing would also have been a choice, and a worse one', says: 'idle:A' },
  ],
  'tool:A': [
    { text: 'If the person understood the whole situation, they would agree to it', says: 'consent:A' },
    { text: 'Too many people would be hurt if we did nothing', says: 'many:A' },
  ],
  'tool:B': [
    { text: 'This time the result was not good enough to justify using someone', says: 'enough:A' },
    { text: 'We know this person, and that makes a difference to us', says: 'know:A' },
  ],
  'help:A': [
    { text: 'This time helping would have cost us more than a little', says: 'price:A' },
    { text: 'Someone else was in a better position to help', says: 'others:A' },
  ],
  'help:B': [
    { text: 'This was too serious to leave to other people', says: 'serious:A' },
    { text: 'It happened right in front of us', says: 'far:B' },
  ],
  'far:A': [
    { text: 'We cannot help everyone who is far away, so we have to stop somewhere', says: 'limit:A' },
    { text: 'The people close to us depend on us first', says: 'near:A' },
  ],
  'far:B': [
    { text: 'This time we could be sure that the help would arrive', says: 'check:A' },
    { text: 'Three pins is a small price, wherever the person in trouble is', says: 'help:A' },
  ],
  'luck:A': [
    { text: 'This time the difference came from skill, not from luck', says: 'merit:A' },
    { text: 'The players who are ahead did nothing wrong, so they should not have to give anything up', says: 'keep:A' },
  ],
  'luck:B': [
    { text: 'This time the bad luck was too big to just accept', says: 'big:A' },
    { text: 'The bad luck came from a fault in the alley, not from the game itself', says: 'fault:A' },
  ],
  'outcome:A': [
    { text: 'Nobody was harmed, so letting luck count does no damage', says: 'harm:A' },
    { text: 'When the harm is big, what actually happened has to count too', says: 'result:A' },
  ],
  'outcome:B': [
    { text: 'A lucky result is fine to keep, but bad luck should not be punished', says: 'prize:A' },
    { text: 'What happened here was pure chance and had nothing to do with anyone\'s actions', says: 'pure:A' },
  ],
  'history:A': [
    { text: 'People are different from balls', says: 'people:A' },
    { text: 'When the original people come back and ask, they come first', says: 'origin:A' },
  ],
  'history:B': [
    { text: 'People are different from balls', says: 'people:A' },
    { text: 'A team is more than the people who happen to be in it', says: 'team:A' },
  ],
  'copy:A': [
    { text: 'A copy may be the same thing, but the original is still worth more', says: 'value:A' },
    { text: 'This time we cannot be sure that the copy is perfect', says: 'sure:A' },
  ],
  'copy:B': [
    { text: 'Nobody can tell the copy from the original, so it makes no difference', says: 'tell:A' },
    { text: 'Everything was copied in the same way, so it is still fair for everyone', says: 'same:A' },
  ],
  'real:A': [
    { text: 'We never asked for it, so we may keep it', says: 'asked:A' },
    { text: 'It is a game, so some pretending is allowed', says: 'game:A' },
  ],
  'real:B': [
    { text: 'A feeling may be pretend, but a score has to be real', says: 'score:A' },
    { text: 'When we are compared with other bowlers, it has to be real', says: 'compare:A' },
  ],
  'truth:A': [
    { text: 'An untruth to spare someone\'s feelings is different from a lie for our own gain', says: 'kind:A' },
    { text: 'Keeping quiet is not the same as lying', says: 'silent:A' },
  ],
  'truth:B': [
    { text: 'A friend is better off hearing the truth', says: 'friend:A' },
    { text: 'The rules of the game come before covering for each other', says: 'rules:A' },
  ],
  'punish:A': [
    { text: 'He has already put everything right', says: 'repaired:A' },
    { text: 'He is truly sorry, and that counts as paying', says: 'sorry:A' },
  ],
  'punish:B': [
    { text: 'Some wrongs must be paid for, even if the punishment fixes nothing', says: 'deserve:A' },
    { text: 'Blaming someone who did nothing is never allowed, whatever good it does', says: 'guilt:A' },
  ],
  'doubt:A': [
    { text: 'Being careful would have cost us too much this time', says: 'price:A' },
    { text: 'There was no real sign that anything was suffering', says: 'sign:A' },
  ],
  'doubt:B': [
    { text: 'Being careful cost us very little this time', says: 'small:A' },
    { text: 'It asked us in words to stop', says: 'words:A' },
  ],
  'guilt:A': [
    { text: 'Otherwise everyone in the alley would lose their lanes', says: 'numbers:A' },
    { text: 'He would agree to take the blame if it saves everyone\'s evening', says: 'consent:A' },
  ],
  'self:A': [
    { text: 'This mattered more than our score', says: 'matter:A' },
    { text: 'We would want others to do the same for us', says: 'golden:A' },
  ],
};

/** What a rule makes of the group, for the House Record title. */
export const PEOPLE: Record<Claim, string> = {
  'numbers:A': 'Utilitarians', 'numbers:B': 'People who will not steer harm', 'tool:A': 'Kantians', 'tool:B': 'People who put the result first',
  'help:A': 'Good neighbours', 'help:B': 'People who mind their own business', 'far:A': 'Citizens of the world', 'far:B': 'People who help nearby',
  'luck:A': 'Levellers', 'luck:B': 'People who accept their luck', 'outcome:A': 'Intention people', 'outcome:B': 'Results people',
  'history:A': 'Sentimentalists', 'history:B': 'People who go by the parts', 'copy:A': 'People who trust copies', 'copy:B': 'People who want the original',
  'real:A': 'Realists', 'real:B': 'Dreamers', 'truth:A': 'Truth-tellers', 'truth:B': 'People who cover for each other',
  'punish:A': 'Punishers', 'punish:B': 'Pragmatists', 'doubt:A': 'Careful people', 'doubt:B': 'Sceptics',
  'share:A': 'Sharers', 'walk:A': 'People who walked out', 'guilt:A': 'Fair judges', 'self:A': 'People who do what suits them',
};

export const opposite = (c: Claim): Claim | undefined => {
  const o = c.endsWith(':A') ? c.slice(0, -1) + 'B' : c.slice(0, -1) + 'A';
  return RULES[o] ? o : undefined;
};
