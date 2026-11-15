// Single cards that sit between the chains. Several of them clash with rules from the chains.
import type { Card } from '../types.ts';

export const ONEOFFS: Card[] = [
  { id: 'warmup', title: 'Warm-up', kind: 'plain', options: [], about: '',
    text: 'Frame one. Nothing is wrong with the lane. Drag back, then flick.' },
  { id: 'bonus', title: 'The Eleventh Frame', kind: 'plain', options: [], about: '', lane: { bumpers: true },
    text: 'You got through the whole night without shrugging at a Split. The house gives you an eleventh frame, with bumpers.' },

  // ---- secret frames: everyone chooses privately
  {
    id: 'twoGoodBalls', title: 'Two Good Balls', kind: 'secret',
    text: 'Tonight only two of the house balls roll straight. You and the regulars each choose in secret, at the same moment: share the good balls fairly, or grab one for yourself.',
    about: 'The prisoner\'s dilemma: what is best for each person alone turns out worst for everyone when they all do it.',
    options: [
      { id: 'A', label: 'Share', effect: 'If everyone shares, everyone bowls with a normal ball.', after: '' },
      { id: 'B', label: 'Grab', effect: 'If you are the only one who grabs, you get a perfect ball and the others get wobbly ones. If two or more grab, everyone gets a wobbly ball.', after: '',
        epilogue: 'One good ball is missing. The Counter Lady knows where. She is not saying.' },
    ],
  },
  {
    id: 'glitch', title: 'The Glitch', kind: 'secret',
    text: 'This one is private. The scoreboard has a glitch: right now you can add three pins to your own score. It will never be shown who did it.',
    about: 'The ring of Gyges, from Plato: would you still be honest if you could never be caught?',
    options: [
      { id: 'A', label: 'Leave your score alone', effect: 'Nothing happens. Then a normal frame.', after: '' },
      { id: 'B', label: 'Add three pins', effect: 'You get three pins for nothing. Then a normal frame.', score: { bonus: 3 }, after: '',
        epilogue: 'The scoreboard was audited. The auditor left with more pins than he came with.' },
    ],
  },
  {
    id: 'tipjar', title: 'The Tip Jar', kind: 'secret',
    text: 'The oil for the lanes is paid for from the tip jar. Everyone secretly puts in zero, one or two pins from this frame. If the jar ends up with fewer pins than there are bowlers, the lanes run dry next frame and every ball is slow.',
    about: 'The tragedy of the commons: everyone gains from the shared thing, and everyone is tempted to let the others pay for it.',
    options: [
      { id: 'A', label: 'Put in nothing', effect: 'You keep all your pins this frame.', after: '' },
      { id: 'B', label: 'Put in one pin', effect: 'You lose one pin this frame.', score: { bonus: -1 }, after: '' },
      { id: 'C', label: 'Put in two pins', effect: 'You lose two pins this frame.', score: { bonus: -2 }, after: '' },
    ],
  },
  {
    id: 'curtain', title: 'The Curtain', kind: 'secret',
    text: 'The Counter Lady has already put either ten golden pins or nothing at all behind a curtain. She decided by predicting what you are about to choose. She has never been wrong so far.',
    about: 'Newcomb\'s problem: the prize is already there or not there, so why not take both? Yet those who take both go home with less.',
    options: [
      { id: 'A', label: 'Bowl at the curtain only', effect: 'If she predicted this, the ten golden pins behind it are yours.', after: '' },
      { id: 'B', label: 'Bowl at the curtain and at three visible pins', effect: 'You also get three ordinary pins to bowl at. But if she predicted this, the curtain is empty.', after: '' },
    ],
  },

  // ---- quick votes
  {
    id: 'heap', title: 'The Heap', kind: 'vote',
    text: 'While you aim, pins vanish from the rack one at a time. The Pinsetter asks: at which pin did it stop being a full rack? Your answer decides what counts as a strike for the rest of the game.',
    about: 'The sorites paradox: one pin less never seems to make the difference, and yet at some point the rack is no longer full.',
    options: [
      { id: 'A', label: 'At the first missing pin', effect: 'A strike stays a strike: all ten. Then a normal frame.', says: 'real:A', costly: true,
        after: 'The Pinsetter nods. Ten is ten.', epilogue: 'A full rack is still ten pins here. The Pinsetter counts them every morning.' },
      { id: 'B', label: 'Somewhere around seven', effect: 'From now on, seven or more pins in a frame is scored as ten.', special: 'heap-loose', says: 'real:B', breaks: ['real:A', 'truth:A'],
        after: 'The Pinsetter writes "seven-ish" on the wall, in pen.', epilogue: 'A strike is now "seven-ish". Averages have never been better.' },
    ],
  },
  {
    id: 'micro', title: 'Micro-pins', kind: 'vote',
    text: 'Choose your pins for this frame. Either ten normal pins, worth ten points together. Or a thousand tiny, miserable pins, worth eleven points together.',
    about: 'The repugnant conclusion, from Derek Parfit: is a huge number of barely worthwhile lives better than a few very good ones, because the total is higher?',
    options: [
      { id: 'A', label: 'A thousand tiny pins', effect: 'The pins are tiny. Whatever you knock down is worth a tenth more.', lane: { tiny: true }, score: { mul: 1.1 }, says: 'numbers:A',
        after: 'They fall with a sound like rain on a tent. None of them seemed to enjoy it.', epilogue: 'The thousand tiny pins have formed a union. Their demand is to be fewer.' },
      { id: 'B', label: 'Ten normal pins', effect: 'You then bowl a normal frame.', breaks: ['numbers:A'], costly: true,
        after: 'Ten proper pins. Each of them has room to think.', epilogue: 'The tiny pins were swept up and put in a jar. They rattle at night.' },
    ],
  },
  {
    id: 'scream', title: 'The Screaming Pins', kind: 'vote',
    text: 'The pins scream when they are hit. It is probably a speaker. Nobody can find the speaker.',
    about: 'Moral uncertainty: how careful should you be when you cannot tell whether something can suffer?',
    options: [
      { id: 'A', label: 'Bowl softly, in case', effect: 'Your ball speed is capped this frame, so the pins fall less easily.', lane: { speed: 0.6 }, says: 'doubt:A', costly: true,
        after: 'The pins go down with a small "oh". That is somehow worse.', epilogue: 'The speaker was found in the end. It was not plugged in.' },
      { id: 'B', label: 'Bowl as usual', effect: 'You then bowl a normal frame. It is loud.', says: 'doubt:B', breaks: ['help:A'],
        after: 'The screaming stops when the last pin falls. Then it is very quiet.', epilogue: 'The pins still scream. People have started to bring headphones.' },
    ],
  },
  {
    id: 'note', title: 'The Note', kind: 'vote',
    text: 'The pin machine has started leaving notes in the ball return. They all say the same thing: please stop.',
    about: 'Machine minds: if a machine says it is suffering, what would it take for you to believe it?',
    options: [
      { id: 'A', label: 'Switch the machine off', effect: 'You set your own pins in a hurry: three are missing from the rack this frame.', lane: { missing: 3 }, says: 'doubt:A', costly: true,
        after: 'The machine winds down. The last note says: thank you. Then, smaller: the rack is crooked.', epilogue: 'The pin machine is switched on only when it asks. It asks on Tuesdays.' },
      { id: 'B', label: 'Carry on', effect: 'You then bowl a normal frame.', says: 'doubt:B', breaks: ['help:A'],
        after: 'The next note says: fine. The handwriting has got worse.', epilogue: 'The notes kept coming. They are filed under "feedback".' },
    ],
  },
  {
    id: 'hungry', title: 'The Hungry Regular', kind: 'vote',
    text: 'It has been measured: the Fat Man enjoys nachos a hundred times more than anyone else does. A tray of nachos gives its holder bumpers. There is one tray for each of you this frame.',
    about: 'The utility monster, from Robert Nozick: if one person gets far more happiness out of everything, should he get everything?',
    options: [
      { id: 'A', label: 'Give him every tray', effect: 'No bumpers for you. He is a hundred times happier than you would have been.', says: 'numbers:A', costly: true,
        after: 'He eats all of them. The joy is measurable from the car park.', epilogue: 'The Fat Man now gets everyone\'s nachos, on principle. He has never been happier, by a factor of a hundred.' },
      { id: 'B', label: 'Keep sharing', effect: 'You keep your tray: bumpers this frame.', lane: { bumpers: true }, says: 'share:A', breaks: ['numbers:A'],
        after: 'Everyone gets a tray. The Fat Man gets one too, and looks at it for a long time.', epilogue: 'The nachos are still shared equally. The Fat Man has started a petition.' },
    ],
  },

  // ---- paradox frames: no vote, only strange bowling
  { id: 'zeno', title: 'Zeno\'s Lane', kind: 'plain', options: [], lane: { zeno: true },
    text: 'No decision this frame, only a strange lane. Every second your ball covers a part of the distance that is left, so it keeps slowing down. If it gets within a hair of the pins before the buzzer, they all fall. Throw hard.',
    about: 'Zeno\'s paradox: to arrive you must first get halfway, then halfway again, and so on forever.' },
  { id: 'buridan', title: 'Buridan\'s Lanes', kind: 'vote',
    text: 'No dilemma this frame, only two lanes that are identical in every way. You cannot throw until you pick one.',
    about: 'Buridan\'s donkey: placed exactly between two identical bales of hay, with no reason to prefer one, it starves.',
    options: [
      { id: 'A', label: 'The left lane', effect: 'You then bowl a normal frame.', after: 'You picked the left lane. The right lane was exactly as good.' },
      { id: 'B', label: 'The right lane', effect: 'You then bowl a normal frame.', after: 'You picked the right lane. The left lane was exactly as good.' },
    ] },
  { id: 'liar', title: 'The Liar Board', kind: 'plain', options: [],
    text: 'No decision this frame. The scoreboard is showing a message: "The number on this board is wrong." If that is true, it is false. Bowl anyway.',
    about: 'The liar paradox: a sentence that says of itself that it is false can be neither true nor false.' },
];
