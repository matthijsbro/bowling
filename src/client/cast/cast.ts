// The cast. Each function draws one pose in a 200 x 260 box, feet near y = 250.
import { INK, type Mood, dot, ell, eyes, ln, mouth, sh, sweat, txt } from './draw.ts';

const SKIN = '#f2c6a0';

/** Walter, who runs the alley: a tall heron. His three moods look almost the same. */
export const pinsetter = (m: Mood) => [
  ln('M100 184L96 220L99 250M99 250l-14 4M99 250l1 7M99 250l14 3M84 180L64 200L86 210M86 210l-9 7M86 210l1 9M86 210l9 5', 2.5),
  dot(96, 220, 3.5), dot(64, 200, 3.5),
  sh('M62 150L36 172L52 170L44 186L72 168z', '#7d8fa3'),
  sh(ell(96, 155, 40, 30), '#9fb0c2'),
  ln('M76 150q24 28 50 6M88 162q8 8 16 4M98 166q7 6 14 2', 2),
  sh('M112 134C130 110 92 96 104 70C108 60 111 54 115 49L128 56C120 64 118 73 122 85C128 104 143 117 128 141z', '#9fb0c2'),
  ln('M111 37q-17 -9 -28 -2M111 41q-14 -1 -22 7', 2.5),
  sh(ell(124, 44, 17, 14), '#9fb0c2'),
  sh('M138 39L192 50L138 53z', '#e8b33a'), ln('M141 46L178 49.5', 1.5),
  sh('M160 42l9 2l-2 10l-9 -2z', '#f6d2b0', 1.5), ln('M162 45l4 5M166 45l-4 5', 1),
  dot(128, 43, 2.6),
  ln(m === 'alarm' ? 'M120 35q8 -4 14 0' : 'M121 39q7 -3 13 1', 2.5),
  ln('M122 48q6 4 12 0M124 52q5 3 9 0', 1.5),
  m === 'glee' ? ln('M139 55q4 3 8 0', 1.5) : '',
  sh('M116 130l-15 -9v18zM116 130l15 -9v18z', '#d6402b'), dot(116, 130, 3.5),
  sh('M80 142h18v11h-18z', '#fffdf6', 1.5), ln('M83 146h11M83 150h7', 1),
].join('');

export const fatMan = (m: Mood) => [
  sh(ell(77, 250, 17, 7), '#7a4b2a'), sh(ell(125, 250, 17, 7), '#7a4b2a'),
  sh('M68 220h64l-3 26h-22l-7 -15l-7 15h-22z', '#4a5568'),
  sh(ell(100, 160, 68, 66), SKIN),
  dot(100, 208, 2.2), ln('M92 214q8 4 16 0', 1.5),
  sh('M40 150C36 100 70 92 100 92C130 92 164 100 160 150C162 170 156 184 150 191C120 176 80 176 50 191C44 184 38 170 40 150z', '#3aa6a0'),
  ln('M100 95V178', 2), dot(100, 114, 3, '#fffdf6'), dot(100, 138, 3, '#fffdf6'), dot(100, 162, 3, '#fffdf6'),
  ln('M93 138l-10 -4M107 138l10 -4M93 162l-11 -2M107 162l11 -2', 1.5),
  txt(72, 128, 'BIG', 11, -8, '#fffdf6'), txt(128, 150, '&#9733;', 14, 10, '#f0c040'),
  sh('M45 128q-24 14 -20 38l13 2q-1 -17 16 -24z', SKIN),
  sh('M155 128q24 10 24 32l-13 4q-2 -15 -17 -21z', SKIN),
  sh('M158 164h36l-5 17h-26z', '#fffdf6'), ln('M167 165l2 15M177 165v15M187 165l-2 15', 2.5, '#d6402b'),
  sh(m === 'alarm' ? 'M160 140l6 -14l6 14zM174 126l8 -18l6 18zM186 146l5 -10l5 10z' : 'M163 164l6 -14l6 14zM173 164l8 -19l6 19zM184 164l5 -11l5 11z', '#f0c040', 2),
  txt(31, 152, 'MOM', 9, -72, '#3f6fb0'),
  '<g transform="translate(100 94) scale(.72) translate(-100 -94)">',
  sh(ell(72, 68, 5, 7), SKIN, 2), sh(ell(128, 68, 5, 7), SKIN, 2),
  sh(ell(100, 66, 28, 27), SKIN),
  ln('M95 40q-2 -11 -9 -13M100 39q0 -12 2 -15M105 40q4 -9 11 -10', 2),
  `<circle cx="82" cy="74" r="6" fill="#e58a7a" opacity=".5"/><circle cx="118" cy="74" r="6" fill="#e58a7a" opacity=".5"/>`,
  eyes(90, 110, 62, m), ln('M100 64q5 6 -2 9', 2), mouth(100, 78, m, m === 'glee' ? 11 : 16), ln('M82 89q18 11 36 0', 2), ln('M112 80l17 -7', 1.5),
  '</g>',
  m === 'alarm' ? sweat(134, 44) : '',
].join('');

export const child = (m: Mood) => [
  ln('M90 205v38M110 205v38', 3), ln('M107 222h6M107 228h6M107 234h6', 2, '#d6402b'),
  sh(ell(86, 247, 10, 5), '#d6402b'), sh(ell(114, 247, 10, 5), '#3f7fbf'),
  sh('M100 128L66 208Q100 217 134 208z', '#f0c040'), dot(92, 180, 3, '#fffdf6'), dot(110, 196, 3, '#fffdf6'), dot(104, 164, 3, '#fffdf6'),
  ln('M84 160l-22 14', 3), dot(61, 175, 4, '#f6d2b0'), ln('M61 176v-30M56 146v9M61 145v10M66 146v9', 2),
  ln(m === 'alarm' ? 'M116 160l-8 -22' : 'M116 160l24 -18', 3),
  m === 'alarm' ? '' : ln('M140 142q14 -30 22 -58', 1.5) + sh(ell(164, 62, 18, 22), '#d6402b') + ln('M156 52q4 -8 10 -8', 1.5, '#fffdf6'),
  '<g transform="translate(100 132) scale(1.22) translate(-100 -132)">',
  sh(ell(62, 98, 8, 11), '#8a4b2a'), sh(ell(143, 94, 16, 21), '#8a4b2a'),
  sh(ell(100, 100, 32, 30), m === 'alarm' ? '#c9d2ea' : '#f6d2b0'),
  sh('M70 94q30 -32 60 0q-12 -8 -20 -2q-10 -8 -18 0q-10 -6 -22 2z', '#8a4b2a'),
  sh('M84 76L104 30L121 77z', '#6aa9e0'), ln('M90 62l22 4M95 50l13 3', 2.5, '#fffdf6'), dot(104, 28, 5.5, '#e07a8a'),
  eyes(88, 112, 100, m), dot(80, 108, 1.2), dot(84, 111, 1.2), dot(117, 110, 1.2), dot(121, 107, 1.2),
  mouth(100, 113, m, 12),
  m === 'glee' ? `<path d="M91 112h6v5h-6zM104 112h6v5h-6z" fill="#fffdf6" stroke="${INK}" stroke-width="1"/>` : '',
  m === 'calm' ? `<path d="M101 115h4v4h-4z" fill="${INK}"/>` : '',
  m === 'alarm' ? sh('M118 128l5 -9l5 9z', '#f0c040', 1.5) : '',
  '</g>',
].join('');

const goose = (x: number, n: string, m: Mood, flip = false) =>
  `<g transform="translate(${x} 40) scale(${flip ? -0.84 : 0.84} 0.84)">${[
    ln('M-8 232v16M8 232v16', 2.5), sh('M-18 250l10 -8l10 8zM-2 250l10 -8l10 8z', '#e8963a', 2),
    sh(ell(0, 205, 26, 32), '#fffdf6'),
    sh('M-25 192q25 -15 50 0l2 27q-27 11 -54 0z', '#7a5cc0'),
    `<g transform="scale(${flip ? -1 : 1} 1)">${txt(0, 216, n, 20, 0, '#fffdf6')}</g>`,
    sh('M-7 184C-11 152 -9 132 -5 112L9 112C7 132 9 152 9 184z', '#fffdf6'),
    sh(ell(4, 104, 13, 11), '#fffdf6'), sh('M14 99l21 6l-21 6z', '#e8963a', 2),
    m === 'hurt' ? ln('M2 96l10 10M12 96l-10 10', 2.5) + ln('M-12 150l-12 -8M12 168l14 -6M-10 196l-14 4', 2)
      : m === 'alarm' ? `<circle cx="7" cy="101" r="5" fill="#fffdf6" stroke="${INK}" stroke-width="1.5"/>${dot(8, 102, 1.8)}`
      : m === 'glee' ? ln('M2 103q5 -7 10 0', 2) : dot(7, 101, 2.4),
    m === 'alarm' ? ln('M-4 86l-5 -9M4 84v-10M12 86l5 -9', 2) : '',
  ].join('')}</g>`;

const impostor = (x: number, m: Mood) =>
  `<g transform="translate(${x} 40) scale(0.84)">${[
    sh('M0 100c-9 1 -11 9 -9 18c2 9 3 14 -2 26c-7 16 -8 62 -2 104c1 6 25 6 26 0c6 -42 5 -88 -2 -104c-5 -12 -4 -17 -2 -26c2 -9 0 -17 -9 -18z', '#fffdf6'),
    ln('M-9 124h18M-9 131h18', 2.5, '#d6402b'),
    sh('M-25 192q25 -15 50 0l2 27q-27 11 -54 0z', '#7a5cc0'), txt(0, 216, '4', 20, 0, '#fffdf6'),
    sh('M8 108l19 4l-19 6z', '#e8963a', 1.5), ln('M3 104l9 14', 5, '#e9e2cf'), ln('M3 104l9 14', 1),
    dot(1, 110, 2.2), m === 'alarm' ? sweat(-16, 98) : '',
  ].join('')}</g>`;

/** The five geese at the end of lane 3. */
export const leagueFive = (m: Mood) =>
  [goose(30, '1', m), goose(66, '2', m), goose(100, '3', m), impostor(136, m), goose(170, '4', m)].join('')
  + txt(96, 104, m === 'glee' ? 'HONK' : '', 24, -6);

/** Kees's mop bucket. Sits at the bottom left of the box so Kees can stand next to it. */
export const gerald = (m: Mood) => [
  sh('M18 218h36l-4 32h-28z', '#c94f3a'), ln('M18 218q18 -24 36 0', 2), dot(30, 229, 2, '#fffdf6'), dot(42, 228, 2.6, '#fffdf6'),
  mouth(36, 235, m, 6), txt(36, 249, 'GERALD', 7, -3, '#fffdf6'),
].join('');

/** The runaway 16-pounder. It is not sorry. */
export const runaway = () => [
  ln('M30 150h-26M36 180h-30M30 210h-22', 4),
  sh(ell(110, 180, 70, 68), '#3a3a40'), ln('M70 140q14 -22 40 -24', 3, '#8a8a92'),
  dot(98, 150, 8), dot(128, 152, 8), dot(112, 178, 8),
  ln('M78 128l28 10M150 132l-26 8', 4), txt(112, 228, '16', 26, -6, '#fffdf6'),
].join('');

export const lever = () => [
  sh('M60 236h80l-8 16h-64z', '#7d8791'), ln('M100 238L128 150', 7, '#a8743a'), ln('M100 238L128 150', 1.5),
  sh(ell(130, 142, 13, 13), '#d6402b'), txt(100, 262, 'PULL?', 13, -3),
].join('');

export const goodBall = () => [
  sh(ell(100, 215, 36, 35), '#f0c040'), dot(92, 204, 4), dot(108, 205, 4), dot(100, 219, 4),
  ln('M70 196q8 -18 26 -20', 2.5, '#fffdf6'), ln('M146 178l10 -8M150 196h13M60 172l-9 -9', 2.5, '#f0c040'),
].join('');

export const fatManStaff = (m: Mood) => fatMan(m) + sh('M70 118h60v24h-60z', '#fffdf6', 2) + txt(100, 136, 'STAFF', 17, -3);

export const janitor = (m: Mood) => [
  sh('M130 200C172 196 178 158 160 138C156 150 158 176 128 184z', '#a9a9a9'),
  ln('M150 192l-4 -12M163 174l-10 -5M164 154l-8 2', 6, '#3a3a3a'),
  gerald(m),
  sh(ell(84, 250, 13, 6), '#3a3a3a'), sh(ell(116, 250, 13, 6), '#3a3a3a'),
  sh(ell(100, 152, 32, 34), '#c9c9c9'),
  sh('M68 162Q100 152 132 162L134 244H104L100 214L96 244H66z', '#3f6fb0'),
  sh('M84 164h32v-26h-32z', '#3f6fb0'), ln('M92 150h16v8h-16', 1.5),
  ln('M86 138L82 122M114 138L118 122', 5, '#3f6fb0'), ln('M86 138L82 122M114 138L118 122', 1.2), dot(86, 141, 3, '#f0c040'), dot(114, 141, 3, '#f0c040'),
  sh('M106 222h13v12h-13z', '#d6402b', 1.5), ln('M104 220l3 3M121 220l-3 3M104 236l3 -3M121 236l-3 -3', 1),
  sh('M70 138q-21 20 -17 46l11 0q-2 -19 14 -35z', '#a9a9a9'),
  ln('M158 58L150 236', 4.5, '#a8743a'), ln('M158 58L150 236', 1),
  ln('M150 236q-14 8 -16 17M150 236q-5 10 -3 19M150 236q7 8 13 15M150 236q-9 6 -8 17M150 236q3 9 8 18', 3.5, '#e9e2cf'),
  ln('M150 236q-14 8 -16 17M150 236q7 8 13 15', 1),
  sh('M130 138q23 10 27 31l-11 4q-4 -15 -21 -23z', '#a9a9a9'),
  sh('M70 74l-7 -22l21 11zM130 74l7 -22l-21 11z', '#a9a9a9'),
  sh('M64 96C60 70 80 58 100 58C120 58 140 70 136 96C134 116 118 124 100 124C82 124 66 116 64 96z', '#a9a9a9'),
  sh('M66 90C78 78 92 82 100 88C108 82 122 78 134 90C128 104 112 104 100 96C88 104 72 104 66 90z', '#3a3a3a', 2),
  ...[84, 116].map((x) => m === 'hurt' ? ln(`M${x - 5} 86l10 10M${x + 5} 86l-10 10`, 3, '#fffdf6') : m === 'glee' ? ln(`M${x - 6} ${93}q6 -8 12 0`, 2.5, '#fffdf6')
    : `<ellipse cx="${x}" cy="91" rx="5.5" ry="${m === 'alarm' ? 6 : 3}" fill="#fffdf6"/>${dot(x + 1, 91.5, 2)}`),
  sh(ell(100, 109, 14, 10), '#e9e2cf', 2), dot(100, 104, 4),
  m === 'alarm' ? `<path d="${ell(100, 114, 3, 4)}" fill="${INK}"/>` : ln(m === 'glee' ? 'M93 111q7 7 14 0' : 'M95 113h10', 2),
  ln('M131 64l10 -15', 3.5, '#f0c040'), ln('M139 52l2 -3', 3.5, '#e07a8a'),
  m === 'alarm' ? sweat(146, 80) : '',
].join('');

/** Marga, who works at the shoe counter: a cat who never looks up, whatever the mood. */
export const counterLady = (m: Mood) => [
  sh('M138 178C162 170 162 140 150 130C162 150 150 166 136 166z', '#e8a45a'),
  sh('M62 192C60 152 76 130 100 130C124 130 140 152 138 192z', '#b0567a'), ln('M100 134v54', 1.5), dot(104, 150, 2.2, '#f0c040'), dot(104, 168, 2.2, '#f0c040'),
  sh(m === 'alarm' ? 'M72 80l-16 -12l26 0zM128 80l4 -27l-22 15z' : 'M72 80l-4 -27l22 15zM128 80l4 -27l-22 15z', '#e8a45a'),
  sh('M66 100C64 76 82 64 100 64C118 64 136 76 134 100C132 120 116 128 100 128C84 128 68 120 66 100z', '#e8a45a'),
  `<path d="${ell(100, 79, 10, m === 'calm' ? 6.5 : 9)}" fill="#fffdf6" stroke="${INK}" stroke-width="2"/>`, dot(100, m === 'calm' ? 81 : 77, 3.2),
  m === 'calm' ? `<path d="M90 79a10 6.5 0 0 1 20 0z" fill="#e8a45a" stroke="${INK}" stroke-width="2"/>` : ln('M92 70l-3 -5M100 68v-6M108 70l3 -5', 1.5),
  m === 'glee' ? ln('M95 76l-2 -2M105 76l2 -2', 1.5, '#fffdf6') : '',
  ln('M80 101q8 5 16 0M104 101q8 5 16 0', 2.5), ln('M80 101l-3 3M120 101l3 3', 1.5),
  ln(ell(88, 105, 12, 8), 2), ln(ell(112, 105, 12, 8), 2), ln('M100 104h0.5', 2),
  ln('M76 106q-14 22 -8 42M124 106q14 22 8 42', 1, '#a08a5a'),
  sh('M96 113h8l-4 5z', '#e07a8a', 1.5),
  ln(m === 'glee' ? 'M100 118q-6 7 -12 0M100 118q6 7 12 0' : 'M100 118q-4 4 -8 1M100 118q4 4 8 1', 2),
  ln('M78 116l-18 -3M78 120l-17 4M122 116l18 -3M122 120l17 4', 1.2),
  sh('M4 182H196V194H4z', '#c08a4a'), sh('M10 194H190V256H10z', '#a8743a'),
  ln('M24 212q40 6 80 0M96 232q40 -6 84 0M30 244h30', 1.2, '#7a4b2a'),
  sh('M150 182q0 -17 14 -17q14 0 14 17z', '#d9d9d9', 2), dot(164, 163, 3),
  sh('M22 150h40v32h-40z', '#fffdf6', 2), txt(42, 172, 'NO.', 15, -5),
  sh('M92 178l42 -5l4 10l-44 5z', '#fffdf6', 1.5), ln('M100 178l2 9M108 177l2 9M116 176l2 9M124 175l2 9M96 182l40 -5', 0.8),
  sh(ell(82, 183, 12, 7), '#e8a45a', 2), ln('M86 180l13 -24', 3.5, '#3f6fb0'), ln('M86 180l13 -24', 1),
].join('');

/** Timo, who sets the pins in the machine room: a mole. Nose and hands only. */
export const pinBoy = (m: Mood) => [
  sh('M10 40H190V252H10z', '#7d8791'),
  dot(22, 52, 3), dot(178, 52, 3), dot(22, 240, 3), dot(178, 240, 3),
  ln('M150 40v60q0 10 10 10h30', 7, '#5d6670'), ln('M146 40v62q0 12 14 12h30M154 40v58q0 6 6 6h30', 1.2),
  txt(92, 76, 'MACHINE ROOM', 17, -2, '#fffdf6'), txt(70, 96, 'do not feed', 11, 3, '#e9e2cf'),
  sh('M40 118H160V200H40z', '#1f1b19'),
  ln('M46 124l10 10M46 134l20 20M46 150l12 12', 1, '#4a433e'),
  sh('M30 206l11 -19l11 19z', '#f0c040', 2), txt(41, 204, '!', 12),
  sh('M84 152Q100 141 116 152L111 174H89z', '#5a4e44', 2),
  ln('M100 174l-20 -8M100 174l-22 2M100 174l-17 12M100 174l-6 17M100 174l7 17M100 174l18 11M100 174l22 1M100 174l19 -9', 3.5, '#f0a6a6'),
  sh(ell(100, 174, 10, 8), '#f0a6a6', 2), dot(96, 174, 1.8), dot(104, 174, 1.8),
  ln('M88 168l-16 -5M88 173l-17 2M112 168l16 -5M112 173l17 2', 1, '#cfc7bb'),
  m === 'alarm' || m === 'hurt' ? dot(93, 156, 2, '#fffdf6') + dot(107, 156, 2, '#fffdf6') + sweat(126, 136) : '',
  sh('M54 200q-3 -18 9 -18q12 0 9 18z', '#f0a6a6', 2.5), ln('M57 198v9M63 199v9M69 198v9', 2.5),
  sh('M40 150q16 -4 16 8q0 12 -16 9z', '#f0a6a6', 2.5), ln('M42 152h-9M41 158h-9M42 164h-9', 2.5),
  m === 'glee'
    ? sh('M138 128c-6 1 -7 7 -6 12c2 6 2 9 -1 16c-3 9 -2 20 3 24h10c5 -4 6 -15 3 -24c-3 -7 -3 -10 -1 -16c1 -5 0 -11 -8 -12z', '#fffdf6', 2)
      + ln('M132 142h13M132 147h13', 2, '#d6402b') + sh('M128 182q-3 -16 9 -16q12 0 9 16z', '#f0a6a6', 2.5)
    : sh('M128 200q-3 -18 9 -18q12 0 9 18z', '#f0a6a6', 2.5) + ln('M131 198v9M137 199v9M143 198v9', 2.5),
].join('');

/** The Angry Bowler: a bull with a 16-pounder and a grudge. */
export const angry = (m: Mood) => [
  sh(ell(78, 250, 16, 7), '#3a3a3a'), sh(ell(124, 250, 16, 7), '#3a3a3a'),
  sh('M72 214h58l-3 32h-20l-6 -16l-6 16h-20z', '#4a5568'),
  sh(ell(100, 168, 54, 60), '#b33a2e'), txt(100, 176, 'GRR', 22, -5, '#fffdf6'),
  sh('M48 140q-26 16 -20 44l13 0q-3 -20 14 -30z', '#c97a5a'),
  sh('M150 140q30 14 26 44l-13 2q0 -20 -18 -30z', '#c97a5a'),
  sh(ell(170, 200, 26, 25), '#3a3a40'), dot(162, 192, 3.5), dot(176, 192, 3.5), dot(169, 204, 3.5), txt(170, 222, '16', 12, 0, '#fffdf6'),
  sh('M72 68q-26 -6 -26 -34q12 16 32 16z', '#fffdf6', 2.5), sh('M128 68q26 -6 26 -34q-12 16 -32 16z', '#fffdf6', 2.5),
  sh(ell(100, 84, 36, 32), '#c97a5a'),
  ln('M72 62l24 11M128 62l-24 11', 4.5), eyes(86, 114, 80, m === 'glee' ? 'glee' : 'alarm'),
  sh(ell(100, 102, 20, 13), '#e8b9a0', 2), dot(92, 102, 3), dot(108, 102, 3), ln(ell(100, 113, 6, 6), 2.5, '#f0c040'),
  ln('M62 96q-14 -2 -18 -12M58 104q-16 4 -22 -4M138 96q14 -2 18 -12M142 104q16 4 22 -4', 2, '#8a9aa8'),
  m === 'alarm' ? sweat(140, 44) : '',
].join('');

/** Ruud, the shoe thief: a fox in rental shoes two sizes too big. */
export const thief = (m: Mood) => [
  sh('M124 204C170 208 182 170 164 150C162 170 150 186 122 188z', '#e07a2a'), sh('M164 150q10 12 6 26q-8 -6 -10 -16z', '#fffdf6', 2),
  sh('M60 238h44v14h-52q-2 -10 8 -14z', '#d6402b'), sh('M104 238h44q10 4 8 14h-52z', '#3f7fbf'), ln('M70 244h20M114 244h20', 1.5, '#fffdf6'),
  ln('M88 208v30M114 208v30', 5, '#e07a2a'), ln('M88 208v30M114 208v30', 1),
  sh(ell(100, 172, 30, 40), '#e07a2a'), sh(ell(100, 182, 16, 24), '#fffdf6', 2),
  sh('M74 152q-20 12 -16 34l10 0q-1 -16 12 -24z', '#e07a2a'), sh('M126 152q20 12 16 34l-10 0q1 -16 -12 -24z', '#e07a2a'),
  sh('M70 86l-10 -36l30 18zM130 86l10 -36l-30 18z', '#e07a2a'),
  sh('M62 102C60 78 82 68 100 68C118 68 140 78 138 102C130 124 112 136 100 138C88 136 70 124 62 102z', '#e07a2a'),
  sh('M78 108C88 104 96 112 100 138C104 112 112 104 122 108C118 126 108 134 100 138C92 134 82 126 78 108z', '#fffdf6', 2),
  eyes(86, 114, 98, m), dot(100, 132, 4.5), mouth(100, 138, m === 'alarm' ? 'alarm' : 'calm', 8),
  m === 'alarm' ? sweat(140, 60) : '',
].join('');

export const jar = () => [
  sh('M64 148h72v92q0 12 -12 12h-48q-12 0 -12 -12z', '#cfe3e8'), sh('M60 134h80v16h-80z', '#d6402b'),
  ln('M74 160v70', 2, '#fffdf6'), sh('M76 178h48v30h-48z', '#fffdf6', 1.5), txt(100, 198, 'far away', 13, -3),
  dot(88, 238, 5, '#f0c040'), dot(104, 242, 5, '#f0c040'), dot(116, 236, 5, '#f0c040'),
].join('');

export const curtain = () => [
  ln('M30 56h140', 6), sh('M38 58h124q-6 100 4 192h-132q10 -92 4 -192z', '#b0304a'),
  ln('M62 62q-6 96 0 184M86 62q6 96 -2 184M112 62q-6 96 2 184M138 62q6 96 -2 184', 2, '#7a1c30'),
  txt(100, 44, '?', 34, 6), dot(100, 60, 5, '#f0c040'),
].join('');

export const cake = () => [
  sh('M40 236h120v14h-120z', '#fffdf6', 2), sh('M54 196h92v40h-92z', '#f6d2b0'), sh('M70 166h60v32h-60z', '#e07a8a'),
  ln('M54 208q12 10 23 0q12 10 23 0q12 10 23 0q11 10 23 0', 2.5, '#fffdf6'),
  ln('M84 166v-16M100 166v-18M116 166v-16', 3, '#3f7fbf'), dot(84, 146, 3.5, '#f0c040'), dot(100, 144, 3.5, '#f0c040'), dot(116, 146, 3.5, '#f0c040'),
].join('');

export const tray = () => [
  sh('M40 214h120l-12 36h-96z', '#fffdf6'), ln('M62 216l6 32M84 216l3 32M106 216v32M128 216l-4 32M146 216l-7 32', 3, '#d6402b'),
  sh('M48 214l14 -30l14 30zM72 214l18 -40l14 40zM100 214l16 -34l16 34zM128 214l12 -24l12 24z', '#f0c040', 2),
].join('');

/** The scoreboard, which is not to be trusted. */
export const board = () => [
  ln('M70 250v-70M130 250v-70', 5), sh('M26 70h148v112h-148z', '#2a3a34'),
  txt(100, 108, 'SCORE', 24, -2, '#9be28a'), txt(100, 146, '1 0 ? 7', 28, 2, '#9be28a'), txt(100, 170, '(probably)', 12, 0, '#9be28a'),
  dot(160, 82, 2.5, '#d6402b'),
].join('');

/** The 1987 originals: the same five, eighty years old. */
export const oldFive = (m: Mood) => leagueFive(m) + ln('M18 250v-70q0 -10 10 -8M186 250v-60', 3.5, '#a8743a') + txt(100, 104, '1987', 26, -5);

/** The pigeon. It lives here. Nobody has asked it to leave. */
export const pigeon = () => [
  ln('M92 222v26l-10 4M92 248l8 4M112 222v26l-8 4M112 248l10 4', 3, '#d6402b'),
  sh('M40 196L14 214L44 210L30 226L66 208z', '#8a8f99'),
  sh(ell(96, 190, 46, 36), '#a9aeb8'), ln('M70 184q26 24 54 4M84 198q12 8 24 2', 2.5),
  sh('M120 172C136 150 126 130 138 112L158 122C150 140 156 160 136 186z', '#7d9a8f'),
  sh(ell(150, 104, 20, 18), '#a9aeb8'), sh('M168 100l24 8l-24 6z', '#e8b33a', 2),
  `<circle cx="154" cy="100" r="7" fill="#e8963a" stroke="${INK}" stroke-width="2"/>`, dot(155, 100, 2.6),
].join('');

/** The vending machine. It sells nothing, with confidence. */
export const vending = () => [
  sh('M40 20h120v232h-120z', '#c94f3a'), sh('M54 36h70v120h-70z', '#2a3a34'),
  ...[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => ln(`M${62 + c * 22} ${58 + r * 36}h14`, 3, '#55665e'))),
  sh('M134 40h16v40h-16z', '#e9e2cf', 2), dot(142, 96, 5, '#f0c040'), ln('M136 112h12M136 120h12', 2),
  sh('M58 176h64v36h-64z', '#1f1b19', 2), txt(100, 236, 'SNACKS', 17, -2, '#fffdf6'), txt(90, 30, 'soon', 11, 4, '#fffdf6'),
].join('');

export const CAST: { name: string; note: string; draw: (m: Mood) => string }[] = [
  { name: 'Walter', note: 'A heron who runs the alley. He reads out each dilemma and calls the Splits.', draw: pinsetter },
  { name: 'The Fat Man', note: 'A large, cheerful regular who often stands too close to the lanes. Hitting him knocks down nine pins.', draw: fatMan },
  { name: 'Lotte', note: 'A girl having her eighth birthday party at lane 4. There is a cake.', draw: child },
  { name: 'The five geese', note: 'Five geese who sit at the end of lane 3 and untangle the pins.', draw: leagueFive },
  { name: 'Kees', note: 'A raccoon who works as the cleaner. He carries a mop and a bucket.', draw: janitor },
  { name: 'Marga', note: 'A cat who works at the shoe counter. She predicts what customers will choose and has never been wrong.', draw: counterLady },
  { name: 'The angry man', note: 'A bull with a 16-pound ball and a grudge against the Fat Man.', draw: angry },
  { name: 'Ruud', note: 'A fox and a regular player, who stole rental shoes and is sorry about it.', draw: thief },
  { name: 'Timo', note: 'A mole who sets the pins by hand in the machine room.', draw: pinBoy },
];
