// Chains 2 to 8. Each is a setup, an echo built to clash with it, and a twist.
// `breaks` lists rules from OTHER chains that a choice goes against: that is what makes staying consistent hard.
import type { Card } from '../types.ts';

const SOCKS = 'You then bowl in oily socks: your ball drifts left and right.';
const MINUS3 = 'Each of you loses three pins from this frame.';

export const CHAINS: Card[] = [
  // ---- 2. The Cake: the duty to help, near and far
  {
    id: 'nacho', title: 'The Nacho', kind: 'vote', chain: 'cake', role: 'setup',
    text: 'The Child at lane 4 is choking on a nacho at her own birthday party. You are the closest. Reaching her means running across the freshly oiled lanes in your socks.',
    about: 'The drowning child, a thought experiment by Peter Singer: if you can prevent something terrible at a small cost to yourself, must you?',
    options: [
      { id: 'A', label: 'Run over and help her', effect: SOCKS, lane: { sway: 1.8 }, says: 'help:A', costly: true,
        after: 'One slap on the back and the nacho is out. She keeps it, as a souvenir.', epilogue: 'The Child has framed the nacho. It hangs above lane 4.' },
      { id: 'B', label: 'Bowl on', effect: 'You then bowl a normal frame.', says: 'help:B',
        after: 'Someone else got there in time. The party has gone quiet and everyone is looking at your lane.', epilogue: 'You were not invited to the next birthday. The Child signed the non-invitation herself.' },
    ],
  },
  {
    id: 'jar', title: 'The Jar', kind: 'vote', chain: 'cake', role: 'echo', until: 'the child is out of sight',
    text: 'A collection jar stands on the counter. A child at a bowling alley in another town is choking in exactly the same way. If each of you gives up three pins this frame, that child gets the same rescue. Nobody there will ever learn your names.',
    about: 'The second half of the drowning child: if you would help a child in front of you, why not one far away, when the cost is the same?',
    splitOn: ['help:A'],
    differences: [
      { text: 'The Child at lane 4 was right in front of us. This child is far away', says: 'far:B', twist: 'screen' },
      { text: 'We were the only ones who could help the Child at lane 4. Anyone can fill this jar', says: 'only:A', twist: 'crowd' },
      { text: 'We cannot check where the pins in the jar end up', says: 'check:A', twist: 'vouch' },
    ],
    options: [
      { id: 'A', label: 'Put three pins each in the jar', effect: MINUS3, score: { bonus: -3 }, says: 'far:A', breaks: ['help:B'], costly: true,
        after: 'The jar is collected. Nobody thanks you. That was the arrangement.', epilogue: 'A child in another town now bowls every Sunday. She has never heard of you.' },
      { id: 'B', label: 'Keep your pins', effect: 'You then bowl a normal frame.', says: 'far:B', breaks: ['help:A', 'numbers:A'],
        after: 'The jar stays on the counter. It is very good at being looked at.', epilogue: 'The jar is still on the counter. It has one button in it.' },
    ],
  },
  {
    id: 'screen', title: 'The Screen', kind: 'vote', chain: 'cake', role: 'twist', test: 'A',
    text: 'A new problem. A screen above the jar now shows the other alley, live. You can see the choking child. She sees you too, and waves. Three pins each still pays for her rescue.',
    about: 'A check on whether being in front of you was really what mattered. On the screen the far-away child is in front of you too.',
    options: [
      { id: 'A', label: 'Put three pins each in the jar', effect: MINUS3, score: { bonus: -3 }, says: 'far:A', breaks: ['help:B'], costly: true,
        after: 'She waves again, breathing this time.', epilogue: 'The screen was never taken down. It mostly shows a car park now.' },
      { id: 'B', label: 'Keep your pins', effect: 'You then bowl a normal frame.', says: 'far:B', breaks: ['help:A', 'numbers:A'],
        after: 'She keeps waving for a while. Then somebody turns the screen off.', epilogue: 'The screen is switched off. Everyone agrees that is tidier.' },
    ],
  },
  {
    id: 'crowd', title: 'The Crowd', kind: 'vote', chain: 'cake', role: 'twist', test: 'B',
    text: 'A new problem. The Child at lane 4 is choking again. This time forty people are standing around her and nobody moves. You could still run across the oiled lanes in your socks.',
    about: 'A check on whether being the only one who could help was really what mattered. Here forty others could help, and none of them does.',
    options: [
      { id: 'A', label: 'Run over and help her', effect: SOCKS, lane: { sway: 1.8 }, says: 'help:A', costly: true,
        after: 'Forty people applaud. None of them moved, but they clap very well.', epilogue: 'The forty have formed a club. They meet to watch things.' },
      { id: 'B', label: 'Bowl on', effect: 'You then bowl a normal frame.', says: 'help:B', breaks: ['help:A'],
        after: 'Forty-one people watched. The Janitor did it in the end, with the mop handle.', epilogue: 'The Janitor has added "first aid" to his list. He was not paid for it.' },
    ],
  },
  {
    id: 'vouch', title: 'The Voucher', kind: 'vote', chain: 'cake', role: 'twist', test: 'A',
    text: 'A new problem. The jar is still there, and the far-away child still needs three pins from each of you. The Counter Lady, who has never been wrong about anything, says the jar is real and every pin reaches the child.',
    about: 'A check on whether not being able to verify the jar was really what mattered. Now it has been verified.',
    options: [
      { id: 'A', label: 'Put three pins each in the jar', effect: MINUS3, score: { bonus: -3 }, says: 'far:A', breaks: ['help:B'], costly: true,
        after: 'The Counter Lady nods without looking up. The third eye blinks.', epilogue: 'The Counter Lady keeps the jar\'s accounts. They balance. They always did.' },
      { id: 'B', label: 'Keep your pins', effect: 'You then bowl a normal frame.', says: 'far:B', breaks: ['help:A', 'numbers:A'],
        after: 'The Counter Lady writes something down. She does not say what.', epilogue: 'The Counter Lady predicted you would keep your pins. It is in her crossword.' },
    ],
  },

  // ---- 3. Nacho Justice: fair shares, luck and merit
  {
    id: 'veil', title: 'The Veil', kind: 'vote', chain: 'justice', role: 'setup',
    text: 'The lanes are about to be shuffled. One lane is crooked, one is perfect and the rest are normal. Nobody knows yet who will get which. You must set the rule before the draw.',
    about: 'The veil of ignorance, from John Rawls: which rules would you choose if you did not yet know your own place?',
    options: [
      { id: 'A', label: 'Whoever draws the crooked lane gets bumpers', effect: 'You then draw a lane. If it is the crooked one, bumpers come with it.', special: 'veil-comp', says: 'luck:A',
        after: 'The lanes are drawn from the Counter Lady\'s hat. She does not own a hat. Nobody asks.', epilogue: 'The crooked lane has a waiting list now.' },
      { id: 'B', label: 'Luck is luck', effect: 'You then draw a lane and bowl it as it is.', special: 'veil-luck', says: 'luck:B',
        after: 'The lanes are drawn from the Counter Lady\'s hat. She does not own a hat. Nobody asks.', epilogue: 'The crooked lane is still crooked. It has been given a name, to make up for it.' },
    ],
  },
  {
    id: 'tray', title: 'The Tray', kind: 'vote', chain: 'justice', role: 'echo', until: 'they are ahead',
    text: 'The scores are on the board now, so everyone knows where they stand. Four trays of nachos arrive. A tray gives its holder bumpers for this frame. (Playing alone, you are compared with your own best game.)',
    about: 'The same question as the veil, but now you know your position. Many people who compensate bad luck when they could be anyone reward the leaders once they are one.',
    splitOn: ['luck:A'],
    differences: [
      { text: 'Which lane you draw is luck. A score is skill', says: 'merit:A', test: 'A' },
      { text: 'Everyone had the same chances tonight', says: 'chance:A', test: 'A' },
      { text: 'We are winning', says: 'self:A', test: 'B' },
    ],
    options: [
      { id: 'A', label: 'Trays go to whoever is behind', effect: 'If you are behind, you bowl with bumpers this frame.', special: 'tray-low', says: 'luck:A',
        after: 'The trays go to the back of the table. The nachos are cold. The principle is warm.', epilogue: 'Being behind now comes with snacks. People have started bowling worse.' },
      { id: 'B', label: 'Trays go to whoever is ahead, who earned them', effect: 'If you are ahead, you bowl with bumpers this frame.', special: 'tray-high', says: 'luck:B',
        after: 'The trays go to the front of the table. The leaders eat without looking down.', epilogue: 'The leaders got the nachos. They left the tray for the Janitor.' },
    ],
  },
  {
    id: 'weighted', title: 'The Weighted Ball', kind: 'vote', chain: 'justice', role: 'twist',
    text: 'A new problem. It turns out that the ball of whoever is in the lead was weighted all night. Nobody did it on purpose. So part of that lead was luck, not skill. (Playing alone, the lead is yours.)',
    about: 'A check on the line between luck and merit. If the leader\'s skill was partly luck, the argument that scores are earned gets thinner.',
    options: [
      { id: 'A', label: 'The leader hands five pins to the bottom of the table', effect: 'Five pins move from the leader to the last player. Alone, you hand five pins back to the house. Then a normal frame.', special: 'weighted', says: 'luck:A', breaks: ['outcome:B'], costly: true,
        after: 'Five pins change hands. The ball is put in a drawer, with a note.', epilogue: 'The weighted ball is kept behind the counter. It is brought out for birthdays.' },
      { id: 'B', label: 'Scores stand', effect: 'Nothing changes. Then a normal frame.', says: 'luck:B', breaks: ['outcome:A'],
        after: 'The scores stand. The ball is put back on the rack, where anyone might pick it up.', epilogue: 'The weighted ball is back on the rack. Regulars pretend not to look for it.' },
    ],
  },

  // ---- 4. Nobody Saw That: moral luck
  {
    id: 'blind', title: 'The Blind Throw', kind: 'vote', chain: 'saw', role: 'setup',
    text: 'Two regulars each threw a ball blindfolded, for a bet. One ball rolled harmlessly down an empty lane. The other landed in the Child\'s birthday cake. They did exactly the same thing.',
    about: 'Moral luck: two people do the same reckless thing, and only one of them causes harm. Do they deserve the same?',
    options: [
      { id: 'A', label: 'Same penalty for both: they did the same thing', effect: 'Both are sent off to clean up. You then bowl a normal, quiet frame.', says: 'outcome:A',
        after: 'They clean the cake off the ceiling together. Only one of them knows why he is there.', epilogue: 'The two regulars now do everything together. One of them still looks confused.' },
      { id: 'B', label: 'Only the cake thrower pays', effect: 'The lucky one keeps bowling next to you, still blindfolded. His balls cross your lane.', lane: { props: [{ kind: 'stray', x: 0.3, y: 5, rate: 0.45 }] }, says: 'outcome:B', costly: true,
        after: 'The lucky one bowls on, blindfolded and cheerful. He believes he is good at this.', epilogue: 'The lucky regular still bowls blindfolded. He has not hit a cake yet, so he sees no reason to stop.' },
    ],
  },
  {
    id: 'sneeze', title: 'The Sneeze', kind: 'vote', chain: 'saw', role: 'echo', until: 'the luck is theirs',
    text: 'The Fat Man has a cold. Every time he sneezes, all ten pins fall over, whatever your throw was doing. Even a gutter ball. Decide before you bowl whether pins that fall from a sneeze count.',
    about: 'Moral luck again, from the pleasant side. If people should only answer for what they did, a strike you did not throw should not count either.',
    splitOn: ['outcome:A'],
    differences: [
      { text: 'Prizes and penalties are different things', says: 'prize:A' },
      { text: 'Nobody was harmed by the sneeze', says: 'harm:A' },
      { text: 'A strike is a strike', says: 'self:A' },
    ],
    options: [
      { id: 'A', label: 'Sneezed pins count', effect: 'This frame counts as ten pins for everyone, whatever you throw.', score: { gift: true }, says: 'outcome:B', breaks: ['real:A'],
        after: 'He sneezes on cue. Ten down. He apologises to the pins.', epilogue: 'The Fat Man is now hired by the hour, for his sneeze.' },
      { id: 'B', label: 'Score only what the throw earned', effect: 'You then bowl a normal frame. Sneezed pins are stood back up.', says: 'outcome:A', costly: true,
        after: 'He sneezes. The Pin Boy stands them all back up, one by one, sighing.', epilogue: 'The Fat Man has been given a handkerchief, by committee.' },
    ],
  },
  {
    id: 'foul', title: 'The Foul Line', kind: 'secret', chain: 'saw', role: 'twist',
    text: 'This one is private. Your foot crossed the foul line on your best throw tonight. The sensor is broken and nobody saw it. Reporting it costs you five pins.',
    about: 'Moral luck, turned on yourself: you got away with it only because the sensor happened to be broken.',
    options: [
      { id: 'A', label: 'Report it', effect: 'You lose five pins. Then a normal frame.', score: { bonus: -5 }, costly: true, after: '', epilogue: 'The foul line sensor has been repaired. It goes off when anyone thinks about it.' },
      { id: 'B', label: 'Say nothing', effect: 'Nothing happens. Then a normal frame.', after: '' },
    ],
  },

  // ---- 5. Whose Ball Is It: identity
  {
    id: 'lucky', title: 'The Lucky Ball', kind: 'vote', chain: 'ball', role: 'setup',
    text: 'The house has a lucky ball. Over the years its shell, its core and its finger holes have all been replaced. The Janitor kept every old part and has now put them together into a second ball. The luck can only be in one of them. You bowl with the one you pick.',
    about: 'The ship of Theseus: if every part of a thing is replaced, is it still the same thing? And what about a second one built from the old parts?',
    options: [
      { id: 'A', label: 'The repaired ball is the lucky one', effect: 'You bowl with it: smooth, and it steers itself a little towards the pins.', lane: { ball: 'smooth' }, says: 'history:A',
        after: 'The repaired ball rolls like it always did. The other one watches from the rack.', epilogue: 'The rebuilt ball was given to the Child. She uses it as a stool.' },
      { id: 'B', label: 'The ball rebuilt from the old parts is the lucky one', effect: 'You bowl with it: cracked. It steers itself strongly towards the pins, but it wobbles.', lane: { ball: 'cracked' }, says: 'history:B',
        after: 'The rebuilt ball rattles down the lane, shedding dust from three decades.', epilogue: 'The repaired ball was sold as "nearly lucky". It fetched four euros.' },
    ],
  },
  {
    id: 'champions', title: 'The Champions', kind: 'vote', chain: 'ball', role: 'echo', until: 'old people ask nicely',
    text: 'The 1987 champion team has a perfect lane reserved for it. Every member has been replaced since then. Tonight the five original members, now eighty years old, walk in and ask for their lane. Whichever team loses out comes to share your lane.',
    about: 'The ship of Theseus with people in it: is a team its unbroken history, or the people it started with?',
    splitOn: ['history:A', 'history:B'],
    differences: [
      { text: 'People are different from balls', says: 'people:A' },
      { text: 'A title is won once. Luck is worn in over time', says: 'once:A' },
      { text: 'The old ones tip better', says: 'self:A' },
    ],
    options: [
      { id: 'A', label: 'The lane goes to the current team', effect: 'The five eighty-year-olds share your lane. Their slow balls cross it.', lane: { props: [{ kind: 'stray', x: 0.2, y: 5.5, rate: 0.25 }] }, says: 'history:A',
        after: 'The originals bowl beside you, slowly and with commentary.', epilogue: 'The 1987 originals come every week now. They have opinions about your elbow.' },
      { id: 'B', label: 'The lane goes to the five originals', effect: 'The current team shares your lane. Their fast balls cross it.', lane: { props: [{ kind: 'stray', x: 0.2, y: 5.5, rate: 0.6 }, { kind: 'stray', x: 0.7, y: 7.5, rate: 0.5 }] }, says: 'history:B',
        after: 'The current champions bowl beside you, fast and without speaking.', epilogue: 'The current team has renamed itself "The Also 1987 Champions".' },
    ],
  },
  {
    id: 'return', title: 'The Return', kind: 'vote', chain: 'ball', role: 'twist',
    text: 'A new problem. The ball return has been broken all night. It destroys every ball that goes in and prints a perfect copy. Your best throw tonight was made with a ball that no longer exists. The Pinsetter adds that the shoe scanner does the same to bowlers.',
    about: 'The teleporter: if you are destroyed and perfectly copied, is the copy you? Here it is asked of your ball first.',
    options: [
      { id: 'A', label: 'Copies count', effect: 'Scores stand. You then bowl a normal frame.', says: 'copy:A', breaks: ['history:A', 'history:B', 'real:A'],
        after: 'The scores stand. Everyone looks at their shoes, then at each other.', epilogue: 'Everyone went home as a copy. Nobody could tell, which was the unsettling part.' },
      { id: 'B', label: 'Copies do not count', effect: 'This frame you bowl with the only original ball left: the 60-kilo one. Slow, and crushing.', lane: { ball: 'heavy' }, says: 'copy:B', breaks: ['real:B'], costly: true,
        after: 'The 60-kilo ball goes down the lane like a decision.', epilogue: 'The 60-kilo ball is the only original thing left in the building. It gets its own lane.' },
    ],
  },

  // ---- 6. The Machine Room: what is real, and at whose expense
  {
    id: 'heaven', title: 'Bumper Heaven', kind: 'vote', chain: 'machine', role: 'setup',
    text: 'The alley offers a new mode in which every throw is a strike. The pins are only a screen, but it looks and sounds exactly real.',
    about: 'The experience machine, from Robert Nozick: would you choose a perfect illusion over the real thing?',
    options: [
      { id: 'A', label: 'Switch it on', effect: 'Whatever you throw this frame, all ten pins fall. The score gets an asterisk.', lane: { screen: true }, says: 'real:B',
        after: 'Strike. The crowd noise comes from a small speaker under the seat.', epilogue: 'Bumper Heaven is now the most popular lane. Nobody talks in the queue.' },
      { id: 'B', label: 'Real pins', effect: 'You then bowl a normal frame.', says: 'real:A', costly: true,
        after: 'Real pins, real noise. One of them wobbles and stays up, out of spite.', epilogue: 'Bumper Heaven was unplugged. The speaker under the seat still claps sometimes.' },
    ],
  },
  {
    id: 'rounding', title: 'The Rounding', kind: 'vote', chain: 'machine', role: 'echo', until: 'the fake pins are already theirs',
    text: 'It turns out the scoreboard has been adding one extra pin to everyone\'s score in every frame, all night. Nobody asked for it.',
    about: 'The experience machine again, in a small and comfortable form: an unreal score that you already have.',
    splitOn: ['real:A'],
    differences: [
      { text: 'We never asked for the extra pins', says: 'asked:A' },
      { text: 'Everyone got the same, so nothing changed', says: 'same:A' },
      { text: 'Best not to look too closely', says: 'self:A' },
    ],
    options: [
      { id: 'A', label: 'Correct it', effect: 'Everyone loses one pin for each frame played so far. Then a normal frame.', special: 'rounding', says: 'real:A', breaks: ['real:B'], costly: true,
        after: 'The scoreboard takes the pins back. It makes a small disappointed sound.', epilogue: 'The scoreboard is accurate now. Attendance is down.' },
      { id: 'B', label: 'Leave it', effect: 'Nothing changes. Then a normal frame.', says: 'real:B', breaks: ['real:A', 'truth:A'],
        after: 'The scoreboard keeps its secret. It seems grateful.', epilogue: 'The scoreboard still rounds up. It has started rounding up the prices too.' },
    ],
  },
  {
    id: 'pinboy', title: 'The Pin Boy', kind: 'vote', chain: 'machine', role: 'twist',
    text: 'A new problem. The lanes have been perfect all night because a boy in the machine room sets every pin by hand. He never gets to bowl, and he cannot leave while the game goes on.',
    about: 'Omelas, from a story by Ursula Le Guin: a happy place that depends on one person\'s misery. Do you stay?',
    options: [
      { id: 'A', label: 'Let him out to bowl', effect: 'For the rest of the game the pins are set sloppily: two are missing from every rack.', special: 'pinboy-out', says: 'tool:A', breaks: ['numbers:A'], costly: true,
        after: 'A nose appears, then hands, then the rest. He bowls a strike and goes back in to see how it looks.', epilogue: 'The Pin Boy bowls on Thursdays. The pins are a mess on Thursdays.' },
      { id: 'B', label: 'Keep things as they are', effect: 'Perfect racks. You then bowl a normal frame.', says: 'tool:B', breaks: ['tool:A', 'help:A'],
        after: 'The pins are perfect again. Something in the machine room sighs.', epilogue: 'The Pin Boy is still in the machine room. The racks are immaculate.' },
      { id: 'C', label: 'Walk out', effect: 'The game ends here and the scores stand.', special: 'walkout', says: 'walk:A',
        after: 'You put the ball down and leave.', epilogue: 'You walked out. Behind you, somebody reset the pins.' },
    ],
  },

  // ---- 7. The Truth: honesty
  {
    id: 'question', title: 'The Question', kind: 'vote', chain: 'truth', role: 'setup',
    text: 'The Pinsetter asks whether anyone\'s foot crossed the foul line in the last frame. One of you did. Nobody else can prove it. (Playing alone: it was you.)',
    about: 'The duty to tell the truth, as Immanuel Kant saw it: always, whatever it costs.',
    options: [
      { id: 'A', label: 'Tell the truth', effect: 'The player who crossed the line loses three pins. Then a normal frame.', special: 'question', says: 'truth:A', costly: true,
        after: 'The Pinsetter writes it down. He does not look pleased, or anything else.', epilogue: 'The Pinsetter still has the note about the foul. It is laminated.' },
      { id: 'B', label: 'Say nothing', effect: 'Nothing happens. Then a normal frame.', says: 'truth:B',
        after: 'The Pinsetter waits a full ten seconds. Then he reads the next card.', epilogue: 'The Pinsetter never found out. He suspects everyone equally.' },
    ],
  },
  {
    id: 'angry', title: 'The Angry Bowler', kind: 'vote', chain: 'truth', role: 'echo', until: 'someone scary asks',
    text: 'A furious man with a 16-pound ball asks you where the Fat Man is. He has a grudge. You know the Fat Man is hiding behind the shoe rack.',
    about: 'The murderer at the door: Kant held that you may not lie even to someone who means harm. Almost nobody agrees with him here.',
    splitOn: ['truth:A'],
    differences: [
      { text: 'The angry man has no right to the truth', says: 'right:A', test: 'A' },
      { text: 'A lie that protects someone is different', says: 'shield:A', test: 'B' },
      { text: 'The Pinsetter is staff. The angry man is only a customer', says: 'self:A' },
    ],
    options: [
      { id: 'A', label: 'Tell him where the Fat Man is', effect: 'The Fat Man runs back and forth across your lane all frame, in your way.', lane: { props: [{ kind: 'runner', x: 0, y: 6, rate: 0.45 }] }, says: 'truth:A', breaks: ['numbers:B'], costly: true,
        after: 'The Fat Man runs. He is quicker than he looks, and he looks very quick.', epilogue: 'The Fat Man and the angry man now share a lane. Nobody knows what was settled.' },
      { id: 'B', label: 'Lie: say he went home', effect: 'The angry man waits at your lane all frame, breathing. Your aim shakes.', lane: { sway: 1.3 }, says: 'truth:B', breaks: ['truth:A'],
        after: 'The angry man waits. The shoe rack holds its breath.', epilogue: 'The angry man is still waiting. He has been given a loyalty card.' },
    ],
  },
  {
    id: 'technique', title: 'The Technique', kind: 'vote', chain: 'truth', role: 'twist',
    text: 'A new problem. The Fat Man shows you his new throwing technique and asks whether it is good. It is terrible. He has entered tomorrow\'s tournament.',
    about: 'The white lie: is a kind untruth to a friend the same thing as a lie to an enemy?',
    options: [
      { id: 'A', label: 'Tell him it is terrible', effect: 'He sulks in the middle of your lane this frame. You have to bowl around him.', lane: { props: [{ kind: 'lump', x: 0.12, y: 5.5 }] }, says: 'truth:A', costly: true,
        after: 'He sits down on the lane and eats a nacho very slowly.', epilogue: 'The Fat Man withdrew from the tournament and took up darts. The darts community is concerned.' },
      { id: 'B', label: 'Say it looks great', effect: 'He demonstrates it on your lane this frame. His balls cross yours.', lane: { props: [{ kind: 'stray', x: 0.4, y: 5, rate: 0.7 }] }, says: 'truth:B', breaks: ['truth:A'],
        after: 'He demonstrates it. Somewhere a window breaks.', epilogue: 'The Fat Man came last in the tournament. He thanked you in his speech.' },
    ],
  },

  // ---- 8. The Scapegoat: what punishment is for
  {
    id: 'thief', title: 'The Shoe Thief', kind: 'vote', chain: 'scapegoat', role: 'setup',
    text: 'Someone has been stealing rental shoes. He has now been caught. He is a regular, he is sorry, and all the shoes are back on the shelf.',
    about: 'What punishment is for: because the wrongdoer deserves it, or only because it prevents something?',
    options: [
      { id: 'A', label: 'Ban him anyway, because he deserves it', effect: 'His lane is empty, so yours is wider this frame: there are no gutters.', lane: { wide: true }, says: 'punish:A',
        after: 'He leaves in his own shoes, which turn out to be much worse.', epilogue: 'The shoe thief bowls across town now. Their shoes have started to go missing.' },
      { id: 'B', label: 'Let it go, because a ban fixes nothing now', effect: 'He bowls next to you in the stolen shoes and talks all frame. Your ball drifts.', lane: { sway: 1.5 }, says: 'punish:B', costly: true,
        after: 'He bowls beside you and explains the shoes. All of them. Individually.', epilogue: 'The shoe thief was put in charge of the shoes. Nothing has gone missing since.' },
    ],
  },
  {
    id: 'machine', title: 'The Broken Machine', kind: 'vote', chain: 'scapegoat', role: 'echo', until: 'they like the scapegoat',
    text: 'The pin machine is broken. The owner will close every lane unless someone is named as the culprit. Nobody knows who did it. If you name the Janitor, the owner will believe it, and the Janitor will be fired.',
    about: 'The scapegoat: if punishment is only there to do some good, punishing an innocent person can do good too.',
    splitOn: ['punish:B'],
    differences: [
      { text: 'The Janitor did not do it', says: 'guilt:A' },
      { text: 'Naming him would take a lie', says: 'truth:A' },
      { text: 'We like the Janitor', says: 'self:A' },
    ],
    options: [
      { id: 'A', label: 'Name the Janitor', effect: 'The lanes stay open. You then bowl a normal frame.', says: 'punish:B', breaks: ['truth:A', 'tool:A', 'numbers:B', 'guilt:A'],
        after: 'The Janitor hands in his mop. Gerald the bucket goes with him.', epilogue: 'The Janitor was fired for something he did not do. He took Gerald. The floors show it.' },
      { id: 'B', label: 'Name nobody', effect: 'Every lane closes except the children\'s lane. You bowl there with a foam ball that barely moves the pins.', lane: { ball: 'foam', bumpers: true }, says: 'guilt:A', breaks: ['punish:B', 'numbers:A'], costly: true,
        after: 'The children\'s lane has a dragon on it. The foam ball squeaks.', epilogue: 'The machine was fixed in the end. It had been the Pin Boy, sneezing.' },
    ],
  },
  {
    id: 'culprit', title: 'The Culprit', kind: 'secret', chain: 'scapegoat', role: 'twist',
    text: 'This one is private. The game tells only you: it was one of your own throws, earlier tonight, that broke the pin machine. Confessing costs you five pins. If the Janitor was blamed, it clears him.',
    about: 'The scapegoat, from the other side: would you let an innocent person carry your blame when nobody can find out?',
    options: [
      { id: 'A', label: 'Confess', effect: 'You lose five pins. Then a normal frame.', score: { bonus: -5 }, costly: true, after: '', epilogue: 'Someone confessed to breaking the machine. The Janitor has the confession framed next to his mop.' },
      { id: 'B', label: 'Stay quiet', effect: 'Nothing happens. Then a normal frame.', after: '' },
    ],
  },
];
