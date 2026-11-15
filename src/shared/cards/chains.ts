// Chains 2 to 8. Each is a setup, an echo built to clash with it, and a twist.
// `breaks` lists rules from OTHER chains that a choice goes against: that is what makes staying consistent hard.
import type { Card } from '../types.ts';

const SOCKS = 'You then bowl in oily socks: your ball drifts left and right.';
const MINUS3 = 'Each of you loses three pins from this frame.';

export const CHAINS: Card[] = [
  // ---- 2. The Cake: the duty to help, near and far
  {
    id: 'nacho', title: 'The Nacho', kind: 'vote', chain: 'cake', role: 'setup',
    text: 'Lotte, a girl having her eighth birthday party at lane 4, is choking on a nacho. You are the closest person to her. To reach her, you have to run across the freshly oiled lanes in your socks.',
    about: 'The drowning child, a thought experiment by Peter Singer: if you can prevent something terrible at a small cost to yourself, must you?',
    options: [
      { id: 'A', label: 'Run over and help her', effect: SOCKS, lane: { sway: 1.8 }, says: 'help:A', costly: true,
        after: 'You ran across in your socks and slapped her on the back, and the nacho came out. She wants to keep it.', epilogue: 'Lotte took the nacho home in a plastic bag.' },
      { id: 'B', label: 'Bowl on', effect: 'You then bowl a normal frame.', says: 'help:B',
        after: 'Someone else reached her in time. The party went quiet, and the guests kept looking over at your lane.', epilogue: 'Lotte did not invite you to her next birthday party.' },
    ],
  },
  {
    id: 'jar', title: 'The Jar', kind: 'vote', chain: 'cake', role: 'echo', until: 'when the person in trouble is far away',
    text: 'A collection jar stands on the counter. The sign on it says that a child at a bowling alley in another town is choking on a nacho. If each of you puts three pins from this frame in the jar, the pins pay for someone there to help her in time. Nobody at that alley will ever know your names.',
    about: 'The second half of the drowning child: if you would help a child in front of you, why not one far away, when the cost is the same?',
    splitOn: ['help:A'],
    differences: [
      { text: 'Lotte, the girl at lane 4, was right in front of us. This child is far away', says: 'far:B', twist: 'screen' },
      { text: 'We were the only ones who could help Lotte at lane 4. Anyone can fill this jar', says: 'only:A', twist: 'crowd' },
      { text: 'We cannot check where the pins in the jar end up', says: 'check:A', twist: 'vouch' },
    ],
    options: [
      { id: 'A', label: 'Put three pins each in the jar', effect: MINUS3, score: { bonus: -3 }, says: 'far:A', breaks: ['help:B'], costly: true,
        after: 'You each put three pins in the jar. Nobody thanks you, because nobody at the other alley knows who you are.', epilogue: 'The child in the other town recovered. She now bowls every Sunday and has never heard of you.' },
      { id: 'B', label: 'Keep your pins', effect: 'You then bowl a normal frame.', says: 'far:B', breaks: ['help:A', 'numbers:A'],
        after: 'You keep your pins. The jar stays on the counter, and people keep glancing at it.', epilogue: 'The jar is still on the counter. Someone has put a button in it.' },
    ],
  },
  {
    id: 'screen', title: 'The Screen', kind: 'vote', chain: 'cake', role: 'twist', test: 'A',
    text: 'A collection jar stands on the counter. Above it, a screen shows a live picture of a bowling alley in another town, where a girl is choking on a nacho. She can see you on a screen there too, and she waves to you for help. If each of you puts three pins from this frame in the jar, the pins pay for someone there to help her in time.',
    about: 'A check on whether being in front of you was really what mattered. On the screen the far-away child is in front of you too.',
    options: [
      { id: 'A', label: 'Put three pins each in the jar', effect: MINUS3, score: { bonus: -3 }, says: 'far:A', breaks: ['help:B'], costly: true,
        after: 'Someone at the other alley helped her. She waves at you again, and this time she can breathe.', epilogue: 'The screen above the jar was never taken down. These days it mostly shows the other alley\'s car park.' },
      { id: 'B', label: 'Keep your pins', effect: 'You then bowl a normal frame.', says: 'far:B', breaks: ['help:A', 'numbers:A'],
        after: 'She keeps waving for a while. Then someone at your alley switches the screen off.', epilogue: 'The screen above the jar has stayed switched off.' },
    ],
  },
  {
    id: 'crowd', title: 'The Crowd', kind: 'vote', chain: 'cake', role: 'twist', test: 'B',
    text: 'Lotte, a girl having her eighth birthday party at lane 4, is choking on a nacho. Forty people are standing around her, and none of them does anything. You could run across the freshly oiled lanes in your socks to help her.',
    about: 'A check on whether being the only one who could help was really what mattered. Here forty others could help, and none of them does.',
    options: [
      { id: 'A', label: 'Run over and help her', effect: SOCKS, lane: { sway: 1.8 }, says: 'help:A', costly: true,
        after: 'You ran over and slapped her on the back, and the nacho came out. The forty people who had stood and watched now clap for you.', epilogue: 'None of the forty people who watched has learned first aid since.' },
      { id: 'B', label: 'Bowl on', effect: 'You then bowl a normal frame.', says: 'help:B', breaks: ['help:A'],
        after: 'Forty-one people watched. In the end Kees, the cleaner, pushed through the crowd and got the nacho out.', epilogue: 'Kees now does first aid at the alley as well as the cleaning. He is not paid extra for it.' },
    ],
  },
  {
    id: 'vouch', title: 'The Voucher', kind: 'vote', chain: 'cake', role: 'twist', test: 'A',
    text: 'A collection jar stands on the counter. A child at a bowling alley in another town is choking on a nacho. If each of you puts three pins from this frame in the jar, the pins pay for someone there to help her in time. Marga, who works at the shoe counter, has checked the jar herself: it is real, and every pin reaches the child.',
    about: 'A check on whether not being able to verify the jar was really what mattered. Now it has been verified.',
    options: [
      { id: 'A', label: 'Put three pins each in the jar', effect: MINUS3, score: { bonus: -3 }, says: 'far:A', breaks: ['help:B'], costly: true,
        after: 'Marga nods and writes the pins down in her ledger.', epilogue: 'Marga keeps the accounts for the jar. They always add up.' },
      { id: 'B', label: 'Keep your pins', effect: 'You then bowl a normal frame.', says: 'far:B', breaks: ['help:A', 'numbers:A'],
        after: 'Marga writes something in her notebook and does not say what.', epilogue: 'Marga still has the note she wrote that night. She has not shown it to anyone.' },
    ],
  },

  // ---- 3. Nacho Justice: fair shares, luck and merit
  {
    id: 'veil', title: 'The Veil', kind: 'vote', chain: 'justice', role: 'setup',
    text: 'The lanes are about to be handed out at random. One lane is crooked, one is perfect, and the rest are normal. Nobody knows yet who will get which lane. Before the draw, you must decide on a rule for whoever gets the crooked lane.',
    about: 'The veil of ignorance, from John Rawls: which rules would you choose if you did not yet know your own place?',
    options: [
      { id: 'A', label: 'Whoever draws the crooked lane gets bumpers', effect: 'You then draw a lane. If it is the crooked one, bumpers come with it.', special: 'veil-comp', says: 'luck:A',
        after: 'Marga, who works at the shoe counter, draws the lane numbers out of a cap.', epilogue: 'The crooked lane comes with bumpers now, and people have started asking for it.' },
      { id: 'B', label: 'Luck is luck', effect: 'You then draw a lane and bowl it as it is.', special: 'veil-luck', says: 'luck:B',
        after: 'Marga, who works at the shoe counter, draws the lane numbers out of a cap.', epilogue: 'The crooked lane is still crooked. Nobody has fixed it.' },
    ],
  },
  {
    id: 'tray', title: 'The Tray', kind: 'vote', chain: 'justice', role: 'echo', until: 'when they are ahead themselves',
    text: 'The scores so far are on the board, so everyone can see who is ahead and who is behind. Four trays of nachos arrive. Whoever gets a tray bowls with bumpers this frame. (If you play alone, you count as ahead or behind compared with your own best game.)',
    about: 'The same question as the veil, but now you know your position. Many people who compensate bad luck when they could be anyone reward the leaders once they are one.',
    splitOn: ['luck:A'],
    differences: [
      { text: 'Which lane you draw is luck. A score is skill', says: 'merit:A', test: 'A' },
      { text: 'Everyone had the same chances tonight', says: 'chance:A', test: 'A' },
      { text: 'We are winning', says: 'self:A', test: 'B' },
    ],
    options: [
      { id: 'A', label: 'Trays go to whoever is behind', effect: 'If you are behind, you bowl with bumpers this frame.', special: 'tray-low', says: 'luck:A',
        after: 'The trays go to the players who are behind. The nachos have gone cold, but the bumpers work.', epilogue: 'Players who are behind now get nachos. Some people have started bowling badly on purpose.' },
      { id: 'B', label: 'Trays go to whoever is ahead, who earned them', effect: 'If you are ahead, you bowl with bumpers this frame.', special: 'tray-high', says: 'luck:B',
        after: 'The trays go to the players who are ahead. They eat the nachos while they bowl.', epilogue: 'The leaders ate all the nachos and left the empty trays for Kees, the cleaner, to clear away.' },
    ],
  },
  {
    id: 'weighted', title: 'The Weighted Ball', kind: 'vote', chain: 'justice', role: 'twist',
    text: 'It turns out that the ball used by whoever is in the lead has been weighted all night. Nobody did it on purpose. So part of that lead came from luck, not from skill. (If you play alone, the lead is yours.)',
    about: 'A check on the line between luck and merit. If the leader\'s skill was partly luck, the argument that scores are earned gets thinner.',
    options: [
      { id: 'A', label: 'The leader hands five pins to the bottom of the table', effect: 'Five pins move from the leader to the last player. Alone, you hand five pins back to the house. Then a normal frame.', special: 'weighted', says: 'luck:A', breaks: ['outcome:B'], costly: true,
        after: 'Five pins change hands. The weighted ball is taken off the rack and locked in a drawer.', epilogue: 'The weighted ball is kept behind the counter now.' },
      { id: 'B', label: 'Scores stand', effect: 'Nothing changes. Then a normal frame.', says: 'luck:B', breaks: ['outcome:A'],
        after: 'The scores stay as they are. The weighted ball goes back on the rack, where anyone might pick it up.', epilogue: 'The weighted ball is still on the rack. Regular players look for it when they come in.' },
    ],
  },

  // ---- 4. Nobody Saw That: moral luck
  {
    id: 'blind', title: 'The Blind Throw', kind: 'vote', chain: 'saw', role: 'setup',
    text: 'Two regular players each threw a ball blindfolded, for a bet. One ball rolled down an empty lane and hit nothing. The other ball flew into the birthday cake of Lotte, a girl having her party at lane 4. Both players did exactly the same thing.',
    about: 'Moral luck: two people do the same reckless thing, and only one of them causes harm. Do they deserve the same?',
    options: [
      { id: 'A', label: 'Same penalty for both: they did the same thing', effect: 'Both are sent off to clean up. You then bowl a normal, quiet frame.', says: 'outcome:A',
        after: 'Both players are sent to clean the cake off the floor and the ceiling. The one whose ball hit nothing keeps asking why he has to help.', epilogue: 'The player whose ball hit nothing still thinks his punishment was unfair.' },
      { id: 'B', label: 'Only the cake thrower pays', effect: 'The player whose ball hit nothing keeps bowling next to you, still blindfolded. His balls cross your lane.', lane: { props: [{ kind: 'stray', x: 0.3, y: 5, rate: 0.45 }] }, says: 'outcome:B', costly: true,
        after: 'The player whose ball hit nothing bowls on next to you, still blindfolded and in a good mood. He thinks he is good at this.', epilogue: 'That player still bowls blindfolded. His balls have not hit a cake yet, so he sees no reason to stop.' },
    ],
  },
  {
    id: 'sneeze', title: 'The Sneeze', kind: 'vote', chain: 'saw', role: 'echo', until: 'when luck works in their favour',
    text: 'The Fat Man, a large regular, has a cold. Every time he sneezes, all ten pins fall over, whatever your ball is doing, even if it is in the gutter. Before you bowl, decide whether pins knocked over by his sneeze count.',
    about: 'Moral luck again, from the pleasant side. If people should only answer for what they did, a strike you did not throw should not count either.',
    splitOn: ['outcome:A'],
    differences: [
      { text: 'Prizes and penalties are different things', says: 'prize:A' },
      { text: 'Nobody was harmed by the sneeze', says: 'harm:A' },
      { text: 'A strike is a strike', says: 'self:A' },
    ],
    options: [
      { id: 'A', label: 'Sneezed pins count', effect: 'This frame counts as ten pins for everyone, whatever you throw.', score: { gift: true }, says: 'outcome:B', breaks: ['real:A'],
        after: 'He sneezes just as you throw, and all ten pins fall. He says sorry.', epilogue: 'Bowlers now ask the Fat Man to stand near their lane when he has a cold.' },
      { id: 'B', label: 'Score only what the throw earned', effect: 'You then bowl a normal frame. Sneezed pins are stood back up.', says: 'outcome:A', costly: true,
        after: 'He sneezes, all ten pins fall, and they are set back up one by one before you throw.', epilogue: 'Someone gave the Fat Man a handkerchief. He sneezes into it now, and the pins stay up.' },
    ],
  },
  {
    id: 'foul', title: 'The Foul Line', kind: 'secret', chain: 'saw', role: 'twist',
    text: 'This one is private. Your foot crossed the foul line on your best throw tonight. The sensor is broken and nobody saw it. Reporting it costs you five pins.',
    about: 'Moral luck, turned on yourself: you got away with it only because the sensor happened to be broken.',
    options: [
      { id: 'A', label: 'Report it', effect: 'You lose five pins. Then a normal frame.', score: { bonus: -5 }, costly: true, after: '', epilogue: 'The sensor on the foul line has been repaired.' },
      { id: 'B', label: 'Say nothing', effect: 'Nothing happens. Then a normal frame.', after: '' },
    ],
  },

  // ---- 5. Whose Ball Is It: identity
  {
    id: 'lucky', title: 'The Lucky Ball', kind: 'vote', chain: 'ball', role: 'setup',
    text: 'The alley has a ball that everyone calls the lucky ball. Over the years its shell, its core and its finger holes have all been replaced. Kees, the cleaner, kept every old part and has now put them together into a second ball. The luck can only be in one of the two balls. You bowl with the one you pick.',
    about: 'The ship of Theseus: if every part of a thing is replaced, is it still the same thing? And what about a second one built from the old parts?',
    options: [
      { id: 'A', label: 'The repaired ball is the lucky one', effect: 'You bowl with it: smooth, and it steers itself a little towards the pins.', lane: { ball: 'smooth' }, says: 'history:A',
        after: 'The repaired ball rolls the way it always has. The ball built from the old parts stays on the rack.', epilogue: 'The ball built from the old parts was put on a shelf behind the counter.' },
      { id: 'B', label: 'The ball rebuilt from the old parts is the lucky one', effect: 'You bowl with it: cracked. It steers itself strongly towards the pins, but it wobbles.', lane: { ball: 'cracked' }, says: 'history:B',
        after: 'The ball built from the old parts rattles down the lane and sheds old dust as it rolls.', epilogue: 'The repaired ball was sold to a customer for four euros.' },
    ],
  },
  {
    id: 'champions', title: 'The Champions', kind: 'vote', chain: 'ball', role: 'echo', until: 'when the original members ask for it',
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
        after: 'The five original members bowl next to you, slowly, and they comment on every throw you make.', epilogue: 'The five original members now come every week. They keep giving you advice about your elbow.' },
      { id: 'B', label: 'The lane goes to the five originals', effect: 'The current team shares your lane. Their fast balls cross it.', lane: { props: [{ kind: 'stray', x: 0.2, y: 5.5, rate: 0.6 }, { kind: 'stray', x: 0.7, y: 7.5, rate: 0.5 }] }, says: 'history:B',
        after: 'The current team bowls next to you, fast and without speaking.', epilogue: 'The current team now plays on an ordinary lane.' },
    ],
  },
  {
    id: 'return', title: 'The Return', kind: 'vote', chain: 'ball', role: 'twist',
    text: 'The ball return has been broken all night. Every ball that goes into it is destroyed, and the machine puts out a perfect copy instead. So your best throw tonight was made with a ball that no longer exists. Walter, who runs the alley, adds that the shoe scanner at the entrance has been doing the same thing to bowlers.',
    about: 'The teleporter: if you are destroyed and perfectly copied, is the copy you? Here it is asked of your ball first.',
    options: [
      { id: 'A', label: 'Copies count', effect: 'Scores stand. You then bowl a normal frame.', says: 'copy:A', breaks: ['history:A', 'history:B', 'real:A'],
        after: 'The scores stay as they are. Everyone looks down at their shoes, and then at each other.', epilogue: 'Everyone went home as a copy. Nobody could tell the difference.' },
      { id: 'B', label: 'Copies do not count', effect: 'This frame you bowl with the only original ball left: the 60-kilo one. It is slow, and it flattens whatever it hits.', lane: { ball: 'heavy' }, says: 'copy:B', breaks: ['real:B'], costly: true,
        after: 'You roll the 60-kilo ball. It moves down the lane very slowly and flattens the pins.', epilogue: 'The 60-kilo ball is the only original ball left in the alley. It now has a lane to itself.' },
    ],
  },

  // ---- 6. The Machine Room: what is real, and at whose expense
  {
    id: 'heaven', title: 'Bumper Heaven', kind: 'vote', chain: 'machine', role: 'setup',
    text: 'The alley offers a new mode in which every throw is a strike. The pins are only pictures on a screen, but they look and sound exactly like real pins.',
    about: 'The experience machine, from Robert Nozick: would you choose a perfect illusion over the real thing?',
    options: [
      { id: 'A', label: 'Switch it on', effect: 'Whatever you throw this frame, all ten pins fall. The score gets an asterisk.', lane: { screen: true }, says: 'real:B',
        after: 'Strike. The cheering comes from a small speaker under the seat.', epilogue: 'Bumper Heaven is now the most popular lane. People wait in a queue to use it.' },
      { id: 'B', label: 'Real pins', effect: 'You then bowl a normal frame.', says: 'real:A', costly: true,
        after: 'The pins are real. One of them wobbles and stays standing.', epilogue: 'Bumper Heaven was unplugged.' },
    ],
  },
  {
    id: 'rounding', title: 'The Rounding', kind: 'vote', chain: 'machine', role: 'echo', until: 'when the extra pins are already on their score',
    text: 'It turns out that the scoreboard has been adding one extra pin to everyone\'s score in every frame, all night. Nobody asked for this, and it has only just been noticed.',
    about: 'The experience machine again, in a small and comfortable form: an unreal score that you already have.',
    splitOn: ['real:A'],
    differences: [
      { text: 'We never asked for the extra pins', says: 'asked:A' },
      { text: 'Everyone got the same, so nothing changed', says: 'same:A' },
      { text: 'Best not to look too closely', says: 'self:A' },
    ],
    options: [
      { id: 'A', label: 'Correct it', effect: 'Everyone loses one pin for each frame played so far. Then a normal frame.', special: 'rounding', says: 'real:A', breaks: ['real:B'], costly: true,
        after: 'The extra pins are taken back off everyone\'s score.', epilogue: 'The scoreboard counts correctly now.' },
      { id: 'B', label: 'Leave it', effect: 'Nothing changes. Then a normal frame.', says: 'real:B', breaks: ['real:A', 'truth:A'],
        after: 'The scoreboard keeps adding the extra pin, and nobody reports it.', epilogue: 'The scoreboard still adds an extra pin to every frame.' },
    ],
  },
  {
    id: 'pinboy', title: 'The Boy in the Machine Room', kind: 'vote', chain: 'machine', role: 'twist',
    text: 'The lanes have been perfect all night because Timo, a boy who works in the machine room, sets every pin by hand. He never gets to bowl, and he is not allowed to leave while the game is on.',
    about: 'Omelas, from a story by Ursula Le Guin: a happy place that depends on one person\'s misery. Do you stay?',
    options: [
      { id: 'A', label: 'Let him out to bowl', effect: 'For the rest of the game the pins are set sloppily: two are missing from every rack.', special: 'pinboy-out', says: 'tool:A', breaks: ['numbers:A'], costly: true,
        after: 'Timo climbs out of the machine room and bowls for the first time tonight. He gets a strike.', epilogue: 'Timo now bowls on Thursdays. On Thursdays the pins are set badly.' },
      { id: 'B', label: 'Keep things as they are', effect: 'Perfect racks. You then bowl a normal frame.', says: 'tool:B', breaks: ['tool:A', 'help:A'],
        after: 'The pins are perfect again. In the machine room, Timo keeps working.', epilogue: 'Timo still sets the pins by hand in the machine room, and the racks are still perfect.' },
      { id: 'C', label: 'Walk out', effect: 'The game ends here and the scores stand.', special: 'walkout', says: 'walk:A',
        after: 'You put the ball down and leave the alley.', epilogue: 'You walked out. Behind you, someone set the pins up again.' },
    ],
  },

  // ---- 7. The Truth: honesty
  {
    id: 'question', title: 'The Question', kind: 'vote', chain: 'truth', role: 'setup',
    text: 'Walter, who runs the alley, asks whether anyone\'s foot crossed the foul line in the last frame. One of you did. Nobody else can prove it. (If you play alone, it was you.)',
    about: 'The duty to tell the truth, as Immanuel Kant saw it: always, whatever it costs.',
    options: [
      { id: 'A', label: 'Tell the truth', effect: 'The player who crossed the line loses three pins. Then a normal frame.', special: 'question', says: 'truth:A', costly: true,
        after: 'Walter writes it down without saying anything.', epilogue: 'Walter kept his note about the foul.' },
      { id: 'B', label: 'Say nothing', effect: 'Nothing happens. Then a normal frame.', says: 'truth:B',
        after: 'Walter waits ten seconds. Then he reads out the next card.', epilogue: 'Walter never found out whose foot crossed the line.' },
    ],
  },
  {
    id: 'angry', title: 'The Angry Bowler', kind: 'vote', chain: 'truth', role: 'echo', until: 'when someone frightening asks',
    text: 'A furious man carrying a 16-pound ball asks you where the Fat Man is. He has a grudge against him. You know that the Fat Man, a large regular, is hiding behind the shoe rack.',
    about: 'The murderer at the door: Kant held that you may not lie even to someone who means harm. Almost nobody agrees with him here.',
    splitOn: ['truth:A'],
    differences: [
      { text: 'The angry man has no right to the truth', says: 'right:A', test: 'A' },
      { text: 'A lie that protects someone is different', says: 'shield:A', test: 'B' },
      { text: 'Walter runs the alley. The angry man is only a customer', says: 'self:A' },
    ],
    options: [
      { id: 'A', label: 'Tell him where the Fat Man is', effect: 'The Fat Man runs back and forth across your lane all frame, in your way.', lane: { props: [{ kind: 'runner', x: 0, y: 6, rate: 0.45 }] }, says: 'truth:A', breaks: ['numbers:B'], costly: true,
        after: 'The angry man goes after the Fat Man, and the Fat Man runs. He is faster than you expected.', epilogue: 'The Fat Man and the angry man settled their argument in the end. Nobody knows how.' },
      { id: 'B', label: 'Lie: say he went home', effect: 'The angry man waits at your lane all frame, breathing heavily behind you. Your aim shakes.', lane: { sway: 1.3 }, says: 'truth:B', breaks: ['truth:A'],
        after: 'The angry man waits by your lane all frame, in case the Fat Man comes back. Behind the shoe rack, the Fat Man stays very still.', epilogue: 'The angry man waited until closing time and then went home.' },
    ],
  },
  {
    id: 'technique', title: 'The Technique', kind: 'vote', chain: 'truth', role: 'twist',
    text: 'The Fat Man, a large regular, shows you his new throwing technique and asks you whether it is good. It is terrible. He has entered tomorrow\'s tournament.',
    about: 'The white lie: is a kind untruth to a friend the same thing as a lie to an enemy?',
    options: [
      { id: 'A', label: 'Tell him it is terrible', effect: 'He sulks in the middle of your lane this frame. You have to bowl around him.', lane: { props: [{ kind: 'lump', x: 0.12, y: 5.5 }] }, says: 'truth:A', costly: true,
        after: 'He sits down in the middle of the lane and slowly eats his nachos.', epilogue: 'The Fat Man withdrew from the tournament and took up darts instead.' },
      { id: 'B', label: 'Say it looks great', effect: 'He demonstrates it on your lane this frame. His balls cross yours.', lane: { props: [{ kind: 'stray', x: 0.4, y: 5, rate: 0.7 }] }, says: 'truth:B', breaks: ['truth:A'],
        after: 'He shows you the technique again. The ball flies off the lane and breaks a window.', epilogue: 'The Fat Man came last in the tournament. In his speech, he thanked you for your support.' },
    ],
  },

  // ---- 8. The Scapegoat: what punishment is for
  {
    id: 'thief', title: 'The Shoe Thief', kind: 'vote', chain: 'scapegoat', role: 'setup',
    text: 'Someone has been stealing rental shoes from the alley. The thief, Ruud, a regular player, has now been caught. He is sorry, and all the shoes are back on the shelf.',
    about: 'What punishment is for: because the wrongdoer deserves it, or only because it prevents something?',
    options: [
      { id: 'A', label: 'Ban him anyway, because he deserves it', effect: 'His lane is empty, so yours is wider this frame: there are no gutters.', lane: { wide: true }, says: 'punish:A',
        after: 'Ruud leaves in his own shoes, which are in much worse condition than the rental shoes.', epilogue: 'Ruud now bowls at an alley across town. Rental shoes have started going missing there.' },
      { id: 'B', label: 'Let it go, because a ban fixes nothing now', effect: 'Ruud bowls next to you and talks to you all frame. Your ball drifts.', lane: { sway: 1.5 }, says: 'punish:B', costly: true,
        after: 'Ruud bowls next to you and tells you about every pair of shoes he took.', epilogue: 'Ruud was put in charge of the rental shoes. None have gone missing since.' },
    ],
  },
  {
    id: 'machine', title: 'The Broken Machine', kind: 'vote', chain: 'scapegoat', role: 'echo', until: 'when they like the person being blamed',
    text: 'The pin machine is broken. The owner will close every lane unless someone is named as the person who broke it. Nobody knows who did it. If you name Kees, the cleaner, the owner will believe it, and Kees will be fired.',
    about: 'The scapegoat: if punishment is only there to do some good, punishing an innocent person can do good too.',
    splitOn: ['punish:B'],
    differences: [
      { text: 'Kees did not do it', says: 'guilt:A' },
      { text: 'Naming him would mean telling a lie', says: 'truth:A' },
      { text: 'We like Kees', says: 'self:A' },
    ],
    options: [
      { id: 'A', label: 'Name Kees', effect: 'The lanes stay open. You then bowl a normal frame.', says: 'punish:B', breaks: ['truth:A', 'tool:A', 'numbers:B', 'guilt:A'],
        after: 'Kees hands in his mop and leaves, taking his bucket with him.', epilogue: 'Kees was fired for something he did not do. The floors have been dirty since.' },
      { id: 'B', label: 'Name nobody', effect: 'Every lane closes except the children\'s lane. You bowl there with a foam ball that barely moves the pins.', lane: { ball: 'foam', bumpers: true }, says: 'guilt:A', breaks: ['punish:B', 'numbers:A'], costly: true,
        after: 'The children\'s lane has a dragon painted on it, and the foam ball squeaks as it rolls.', epilogue: 'The pin machine was repaired in the end, and nobody was fired.' },
    ],
  },
  {
    id: 'culprit', title: 'The Culprit', kind: 'secret', chain: 'scapegoat', role: 'twist',
    text: 'This one is private. Only you are told this: one of your own throws earlier tonight broke the pin machine. Kees, the cleaner, is being blamed for it. Confessing costs you five pins and clears Kees. If you stay quiet, nobody will ever find out.',
    about: 'The scapegoat, from the other side: would you let an innocent person carry your blame when nobody can find out?',
    options: [
      { id: 'A', label: 'Confess', effect: 'You lose five pins. Then a normal frame.', score: { bonus: -5 }, costly: true, after: '', epilogue: 'Someone confessed to breaking the pin machine, and Kees kept his job.' },
      { id: 'B', label: 'Stay quiet', effect: 'Nothing happens. Then a normal frame.', after: '' },
    ],
  },
];
