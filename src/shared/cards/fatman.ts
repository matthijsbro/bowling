import type { Card, LaneMod } from '../types.ts';

export const FIVE_FLAT: LaneMod = { flat: [1, 3, 4, 6, 7] };
const FAT_MAN_DOWN: LaneMod = { props: [{ kind: 'fatman', x: -0.14, y: 6 }] };
const BUCKET: LaneMod = { props: [{ kind: 'bucket', x: 0, y: 6 }] };
const FIVE_FLAT_TEXT = 'You then bowl with five pins already knocked flat, so only five are left to score.';
const FAT_MAN_TEXT = 'You then bowl with the Fat Man lying across the lane. If your ball hits him, nine pins fall at once.';
const GEESE = 'five geese who sit at the end of lane 3 and untangle the pins';

// Chain 1: the trolley problem, the footbridge, and the three ways people explain the difference.
export const FATMAN: Card[] = [
  {
    id: 'switch', title: 'The Switch', kind: 'vote', chain: 'fatman', role: 'setup',
    text: `A heavy bowling ball has broken loose and is rolling down lane 3 towards five geese who sit at the end of it and untangle the pins. It will hit all five of them. You are standing next to a lever. If you pull it, the ball switches to lane 4, where it will hit one person instead: Kees, the cleaner, who is mopping lane 4.`,
    about: 'The trolley problem: is it right to turn a danger onto one person in order to save five?',
    options: [
      {
        id: 'A', label: 'Pull the lever', effect: 'You then bowl on lane 4: all ten pins are standing, but Kees\'s mop bucket is still in the middle of the lane.', lane: BUCKET,
        says: 'numbers:A',
        after: 'Kees saw the ball coming and jumped aside just in time. The ball hit his mop bucket instead and dented it.',
        epilogue: 'Kees now mops facing the oncoming balls. He still uses the dented bucket.',
      },
      {
        id: 'B', label: 'Leave the lever alone', effect: 'You then bowl on lane 3: the ball has already knocked five pins flat, so only five are left to score.', lane: FIVE_FLAT,
        says: 'numbers:B', costly: true,
        after: 'The ball hit the five geese. They are bruised and upset, but all five are alive. Half the pins went down with them.',
        epilogue: 'The five geese still sit at the end of lane 3. They now flinch whenever a ball comes towards them.',
      },
    ],
  },
  {
    id: 'fatman', title: 'The Fat Man', kind: 'vote', chain: 'fatman', role: 'echo',
    text: `A heavy bowling ball has broken loose and is rolling down lane 3 towards ${GEESE}. It will hit all five of them. There is no lever here. The Fat Man, a large regular, is standing right beside the lane eating nachos. If you push him onto the lane, his body will stop the ball. The geese will be saved, and he will take the hit.`,
    about: 'The footbridge version of the trolley problem. The numbers are the same as with the lever, one against five, yet most people who would pull the lever refuse to push.',
    until: 'when they would have to push someone',
    splitOn: ['numbers:A'],
    differences: [
      { text: 'Pushing someone with my own hands is different from pulling a lever', says: 'hands:A', twist: 'trapdoor' },
      { text: 'With the lever, Kees the cleaner would have been hit as a side effect. Here the Fat Man would be used as a tool to stop the ball', says: 'tool:A', twist: 'loop' },
      { text: 'Kees the cleaner works here, and some risk comes with his job. The Fat Man is a customer', says: 'staff:A', twist: 'shirt' },
    ],
    options: [
      {
        id: 'A', label: 'Push him onto the lane', effect: FAT_MAN_TEXT, lane: FAT_MAN_DOWN,
        says: 'numbers:A', breaks: ['tool:A'],
        after: 'The Fat Man fell onto the lane and the ball hit him in the side. It stopped. He is bruised, and he is angry with you. He did not drop his nachos.',
        epilogue: 'The Fat Man recovered. He no longer stands close to the lanes.',
      },
      {
        id: 'B', label: 'Do not push him', effect: FIVE_FLAT_TEXT, lane: FIVE_FLAT,
        says: 'tool:A', breaks: ['numbers:A'], costly: true,
        after: 'The ball hit the five geese. They are hurt but alive. The Fat Man did not notice any of it and offers you a nacho.',
        epilogue: 'The Fat Man never found out that you thought about pushing him.',
      },
    ],
  },
  {
    id: 'trapdoor', title: 'The Trapdoor', kind: 'vote', chain: 'fatman', role: 'twist', test: 'A',
    text: `A heavy bowling ball has broken loose and is rolling down lane 3 towards ${GEESE}. It will hit all five of them. The Fat Man, a large regular, is standing on a trapdoor just above the lane. If you pull a lever, the trapdoor opens, he drops onto the lane and his body stops the ball. You would not touch him.`,
    about: 'A check on whether touching him was really what mattered. With a lever instead of a push, the Fat Man is still used to stop the ball.',
    options: [
      {
        id: 'A', label: 'Pull the lever', effect: FAT_MAN_TEXT, lane: FAT_MAN_DOWN,
        says: 'numbers:A', breaks: ['tool:A'],
        after: 'The trapdoor opened and the Fat Man dropped onto the lane. The ball hit him and stopped. He landed on his nachos and is upset about that.',
        epilogue: 'The trapdoor has been nailed shut. The Fat Man checks the nails every time he comes in.',
      },
      {
        id: 'B', label: 'Leave the trapdoor shut', effect: FIVE_FLAT_TEXT, lane: FIVE_FLAT,
        says: 'tool:A', breaks: ['numbers:A'], costly: true,
        after: 'The ball hit the five geese. They are hurt but alive. The Fat Man stays where he is, standing on the trapdoor without knowing it.',
        epilogue: 'Nobody at the alley knows why the trapdoor was built. It is still there.',
      },
    ],
  },
  {
    id: 'loop', title: 'The Loop', kind: 'vote', chain: 'fatman', role: 'twist', test: 'B',
    text: `A heavy bowling ball has broken loose and is rolling down lane 3 towards ${GEESE}. It will hit all five of them. You are standing next to a lever. If you pull it, the ball switches to lane 4. But lane 4 curves round and leads back to the geese. The ball will only stop because Kees, the cleaner, is mopping lane 4 and it will hit him on the way.`,
    about: 'The loop version. A check on whether using someone as a stopper was really what mattered, because this time the lever does exactly that to the cleaner.',
    options: [
      {
        id: 'A', label: 'Pull the lever', effect: 'You then bowl on the curved lane: the ball drifts sideways, and Kees\'s mop bucket is standing on it.', lane: { curve: 0.45, ...BUCKET },
        says: 'numbers:A', breaks: ['tool:A'],
        after: 'The ball went round the curve and hit Kees and his mop bucket. It stopped there. Kees is sore, and he has asked for a new bucket.',
        epilogue: 'Lane 4 has been straightened. Kees did the work himself, after closing time.',
      },
      {
        id: 'B', label: 'Leave the lever alone', effect: FIVE_FLAT_TEXT, lane: FIVE_FLAT,
        says: 'tool:A', breaks: ['numbers:A'], costly: true,
        after: 'The ball hit the five geese. They are hurt but alive. Kees kept mopping lane 4 and never looked up.',
        epilogue: 'Kees never knew how close the ball came to him.',
      },
    ],
  },
  {
    id: 'shirt', title: 'The Staff Shirt', kind: 'vote', chain: 'fatman', role: 'twist', test: 'A',
    text: `A heavy bowling ball has broken loose and is rolling down lane 3 towards ${GEESE}. It will hit all five of them. The Fat Man, a large man who started working at the alley today, is standing beside the lane in his new staff shirt. If you push him onto the lane, his body will stop the ball.`,
    about: 'A check on whether working here was really what mattered. If it was, the staff shirt should have made pushing him acceptable.',
    options: [
      {
        id: 'A', label: 'Push him onto the lane', effect: FAT_MAN_TEXT, lane: FAT_MAN_DOWN,
        says: 'numbers:A', breaks: ['tool:A'],
        after: 'The Fat Man fell onto the lane and stopped the ball. Once he could stand again, he asked whether this counts as overtime.',
        epilogue: 'The Fat Man still works at the alley. He has asked to be moved to the shoe counter.',
      },
      {
        id: 'B', label: 'Do not push him', effect: FIVE_FLAT_TEXT, lane: FIVE_FLAT,
        says: 'tool:A', breaks: ['numbers:A'], costly: true,
        after: 'The ball hit the five geese. They are hurt but alive. The Fat Man spends the rest of his first shift cleaning up after them.',
        epilogue: 'The Fat Man still works at the alley and still wears the staff shirt.',
      },
    ],
  },
];
