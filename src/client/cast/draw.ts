// Pen-and-cheap-print helpers for the SVG cast. Shapes are drawn rough on purpose;
// the "boil" filter (see boilDefs) adds the hand wobble on top.
export const INK = '#2a2420';
export type Mood = 'calm' | 'alarm' | 'glee' | 'hurt';

const pen = 'stroke-linecap="round" stroke-linejoin="round"';
/** Outlined shape whose colour sits a little off the line. */
export const sh = (d: string, fill: string, sw = 3) =>
  `<path d="${d}" fill="${fill}" transform="translate(5 3.5)"/><path d="${d}" fill="url(#scrib)" transform="translate(5 3.5)"/>`
  + `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${sw}" ${pen}/>`
  // the line is gone over a second time and misses
  + `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${sw * 0.4}" opacity=".75" transform="translate(1.8 -1.2) rotate(-1.4 100 130)" ${pen}/>`;
export const ln = (d: string, sw = 3, c = INK) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${sw}" ${pen}/>`;
export const dot = (x: number, y: number, r = 3, c = INK) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
export const ell = (cx: number, cy: number, rx: number, ry: number) =>
  `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0z`;
export const txt = (x: number, y: number, s: string, size = 12, rot = 0, c = INK) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${c}" text-anchor="middle" transform="rotate(${rot} ${x} ${y})" font-family="'Patrick Hand', cursive">${s}</text>`;

export const eyes = (x1: number, x2: number, y: number, m: Mood) =>
  // never a matching pair: the second eye is bigger and looks somewhere else
  [x1, x2].map((x, i) =>
    m === 'hurt' ? ln(`M${x - 6} ${y - 6}l12 12M${x + 6} ${y - 6}l-12 12`, 3.2)
    : m === 'calm' ? `<circle cx="${x}" cy="${y - i}" r="${5 + i * 2.5}" fill="#fffdf6" stroke="${INK}" stroke-width="1.8"/>${dot(x + (i ? -2 : 1.5), y + (i ? 1 : -1), 2.2)}`
    : m === 'alarm' ? `<circle cx="${x}" cy="${y - i * 2}" r="${7 + i * 4}" fill="#fffdf6" stroke="${INK}" stroke-width="2"/>${dot(x + (i ? 3 : -2), y + (i ? -3 : 2), 2 + i * 0.6)}`
    : ln(`M${x - 6} ${y + 2}q${6 + i} ${-9 - i * 4} 12 0`, 2.5)).join('');

export const mouth = (x: number, y: number, m: Mood, w = 14) =>
  m === 'hurt' ? ln(`M${x - w} ${y + 2}q${w / 2} -7 ${w} 0q${w / 2} 7 ${w} 0`, 2.5) + `<path d="M${x + 2} ${y + 3}q1 13 7 12q7 -1 4 -13z" fill="#e07a8a" stroke="${INK}" stroke-width="2"/>`
  : m === 'calm' ? ln(`M${x - w / 2} ${y}q${w / 2} 6 ${w} 0`, 2.5)
  : m === 'alarm' ? `<path d="${ell(x, y + 3, w * 0.35, w * 0.5)}" fill="#5a2020" stroke="${INK}" stroke-width="2"/>`
  : `<path d="M${x - w} ${y - 2}q${w} ${w * 1.5} ${2 * w} 0z" fill="#8a2a2a" stroke="${INK}" stroke-width="2.5" ${pen}/>`;

export const sweat = (x: number, y: number) => ln(`M${x} ${y}q-5 8 0 11q5 -3 0 -11`, 1.5, '#3f7fbf') + ln(`M${x + 12} ${y - 10}q-4 6 0 8q4 -2 0 -8`, 1.5, '#3f7fbf');

/** Three displacement filters; cycling them makes every line boil. */
const gore = (d: string) => sh(d, '#c0281c', 2);
/** Drawn over anyone who has been hit: dizzy stars, a plaster, and rather a lot of red. */
export const hurtMarks = `<g class="dizzy">${[0, 120, 240].map((a) => `<text x="100" y="18" font-size="26" fill="#f0c040" stroke="${INK}" stroke-width="1.2" text-anchor="middle" transform="rotate(${a} 100 46)">&#9733;</text>`).join('')}</g>`
  + gore('M64 118q7 18 0 30q-8 -12 0 -30z') + gore('M134 150q6 16 0 26q-7 -10 0 -26z') + gore('M92 196q6 14 0 24q-7 -10 0 -24z')
  + gore('M40 246q20 -12 44 -2q26 -8 44 2q20 -6 34 4q-60 10 -122 0z')
  + `<path d="M108 100l26 -10l5 12l-26 10z" fill="#f6d2b0" stroke="${INK}" stroke-width="2"/>` + ln('M116 100l6 8M122 98l6 8', 1.2);

// A slow fixed warp makes every shape lopsided; a fine jitter on top is what boils.
export const DEFS = `<pattern id="scrib" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)"><path d="M0 2h7M0 5.5h4" stroke="${INK}" stroke-width="1.1" opacity=".16"/></pattern>
  ${[3, 11, 27].map((seed, i) =>
  `<filter id="boil${i}" x="-12%" y="-12%" width="124%" height="124%">
    <feTurbulence type="fractalNoise" baseFrequency="0.013" numOctaves="1" seed="8" result="warp"/>
    <feDisplacementMap in="SourceGraphic" in2="warp" scale="20" xChannelSelector="R" yChannelSelector="G" result="bent"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.075" numOctaves="2" seed="${seed}" result="jit"/>
    <feDisplacementMap in="bent" in2="jit" scale="6" xChannelSelector="R" yChannelSelector="G"/></filter>`).join('')}`;
export const boilDefs = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${DEFS}</defs></svg>`;

export function startBoil() {
  const set = (n: number) => document.documentElement.style.setProperty('--boil', `url(#boil${n})`);
  set(0);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let n = 0;
  setInterval(() => set((n = (n + 1) % 3)), 170);
}
