import type { Card, LaneMod } from '../types.ts';

export const FIVE_FLAT: LaneMod = { flat: [1, 3, 4, 6, 7] };
const FAT_MAN_DOWN: LaneMod = { props: [{ kind: 'fatman', x: -0.14, y: 6 }] };
const GERALD: LaneMod = { props: [{ kind: 'bucket', x: 0, y: 6 }] };
const FIVE_FLAT_TEXT = 'You then bowl with five pins already knocked flat, so only five are left to score.';
const FAT_MAN_TEXT = 'You then bowl with the Fat Man lying across the lane. Hit him and nine pins fall at once.';

// Chain 1: the trolley problem, the footbridge, and the three ways people explain the difference.
export const FATMAN: Card[] = [
  {
    id: 'switch', title: 'The Switch', kind: 'vote', chain: 'fatman', role: 'setup',
    text: 'A heavy bowling ball has broken loose and is rolling towards the League Five, five geese untangling pins at the end of lane 3. It will hit all five. You are standing next to a lever. If you pull it, the ball goes down lane 4 instead, where it will hit one person: the Janitor, who is mopping there.',
    about: 'The trolley problem: is it right to turn a danger onto one person in order to save five?',
    options: [
      {
        id: 'A', label: 'Pull the lever', effect: 'You then bowl on lane 4: all ten pins, but the Janitor\'s bucket is standing in the middle of the lane.', lane: GERALD,
        says: 'numbers:A',
        after: 'The Janitor saw it coming and stepped aside. Gerald the bucket did not.',
        epilogue: 'The Janitor now mops facing the lanes. Gerald has a dent and a grudge.',
      },
      {
        id: 'B', label: 'Leave the lever alone', effect: 'You then bowl on lane 3: the ball has already knocked five pins flat, so only five are left to score.', lane: FIVE_FLAT,
        says: 'numbers:B', costly: true,
        after: 'The League Five are fine. Geese bounce. The pin among them does not, but it is used to it.',
        epilogue: 'The League Five still count five. They count the pin twice.',
      },
    ],
  },
  {
    id: 'fatman', title: 'The Fat Man', kind: 'vote', chain: 'fatman', role: 'echo',
    text: 'A new problem. Another heavy ball has broken loose and is rolling towards the League Five. This time there is no lever. But the Fat Man is standing right beside the lane, eating nachos. If you push him onto the lane, his body stops the ball: the five are saved and he takes the hit.',
    about: 'The footbridge version of the trolley problem. The numbers are the same as with the lever, one against five, yet most people who would pull the lever refuse to push.',
    until: 'nachos are involved',
    splitOn: ['numbers:A'],
    differences: [
      { text: 'Pushing someone with my own hands is different from pulling a lever', says: 'hands:A', twist: 'trapdoor' },
      { text: 'The Janitor would have been hit by accident. The Fat Man would be used as a tool to stop the ball', says: 'tool:A', twist: 'loop' },
      { text: 'The Janitor works here, so risk comes with his job. The Fat Man is a customer', says: 'staff:A', twist: 'shirt' },
    ],
    options: [
      {
        id: 'A', label: 'Push him onto the lane', effect: FAT_MAN_TEXT, lane: FAT_MAN_DOWN,
        says: 'numbers:A', breaks: ['tool:A'],
        after: 'He stopped the ball. He kept hold of the nachos. He would like a word.',
        epilogue: 'The Fat Man now works here as pin eleven.',
      },
      {
        id: 'B', label: 'Do not push him', effect: FIVE_FLAT_TEXT, lane: FIVE_FLAT,
        says: 'tool:A', breaks: ['numbers:A'], costly: true,
        after: 'The Fat Man offers you a nacho. He has no idea.',
        epilogue: 'The Fat Man finished his nachos. He never knew how close it was.',
      },
    ],
  },
  {
    id: 'trapdoor', title: 'The Trapdoor', kind: 'vote', chain: 'fatman', role: 'twist', test: 'A',
    text: 'A new problem. A heavy ball is again rolling towards the League Five. The Fat Man is standing on a trapdoor above the lane. If you pull a lever, the trapdoor opens, he falls onto the lane and his body stops the ball. You do not touch him.',
    about: 'A check on whether touching him was really what mattered. With a lever instead of a push, the Fat Man is still used to stop the ball.',
    options: [
      {
        id: 'A', label: 'Pull the lever', effect: FAT_MAN_TEXT, lane: FAT_MAN_DOWN,
        says: 'numbers:A', breaks: ['tool:A'],
        after: 'He landed on the nachos. He considers that the real loss.',
        epilogue: 'The trapdoor has been nailed shut. The Fat Man checks it every visit.',
      },
      {
        id: 'B', label: 'Leave the trapdoor shut', effect: FIVE_FLAT_TEXT, lane: FIVE_FLAT,
        says: 'tool:A', breaks: ['numbers:A'], costly: true,
        after: 'The trapdoor stays shut. The Fat Man jumps on it twice, to see.',
        epilogue: 'Nobody can say what the trapdoor is for. It has its own maintenance budget.',
      },
    ],
  },
  {
    id: 'loop', title: 'The Loop', kind: 'vote', chain: 'fatman', role: 'twist', test: 'B',
    text: 'A new problem. A heavy ball is again rolling towards the League Five, and there is a lever again. If you pull it, the ball goes down lane 4. But lane 4 bends round and comes back to the five. The ball only stops because the Janitor is standing on lane 4 and it hits him.',
    about: 'The loop version. A check on whether using someone as a stopper was really what mattered, because this time the lever does exactly that to the Janitor.',
    options: [
      {
        id: 'A', label: 'Pull the lever', effect: 'You then bowl on the bent lane: the ball drifts sideways, and the Janitor\'s bucket is standing on it.', lane: { curve: 0.45, ...GERALD },
        says: 'numbers:A', breaks: ['tool:A'],
        after: 'The Janitor stopped the ball with Gerald. He has asked for a second bucket.',
        epilogue: 'Lane 4 has been straightened. The Janitor did it himself, at night.',
      },
      {
        id: 'B', label: 'Leave the lever alone', effect: FIVE_FLAT_TEXT, lane: FIVE_FLAT,
        says: 'tool:A', breaks: ['numbers:A'], costly: true,
        after: 'The Janitor never looked up. Gerald did.',
        epilogue: 'The Janitor got a certificate. It says "for standing there".',
      },
    ],
  },
  {
    id: 'shirt', title: 'The Staff Shirt', kind: 'vote', chain: 'fatman', role: 'twist', test: 'A',
    text: 'A new problem. A heavy ball is again rolling towards the League Five. The Fat Man is beside the lane again, but he has just been given a staff shirt, so he now works here. If you push him onto the lane, his body stops the ball.',
    about: 'A check on whether working here was really what mattered. If it was, the staff shirt should have made pushing him acceptable.',
    options: [
      {
        id: 'A', label: 'Push him onto the lane', effect: FAT_MAN_TEXT, lane: FAT_MAN_DOWN,
        says: 'numbers:A', breaks: ['tool:A'],
        after: 'He stopped the ball. He has asked about overtime.',
        epilogue: 'The Fat Man now works here as pin eleven. He kept the shirt.',
      },
      {
        id: 'B', label: 'Do not push him', effect: FIVE_FLAT_TEXT, lane: FIVE_FLAT,
        says: 'tool:A', breaks: ['numbers:A'], costly: true,
        after: 'He wears the shirt home. It is the nicest thing anyone has given him.',
        epilogue: 'The Fat Man still wears the staff shirt. Nobody has asked for it back.',
      },
    ],
  },
];
