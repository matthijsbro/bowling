// Review page (dev only): every character, three moods each.
import '@fontsource/patrick-hand/latin-400.css';
import { CAST } from './cast.ts';
import { type Mood, boilDefs, startBoil } from './draw.ts';

const moods: Mood[] = ['calm', 'alarm', 'glee'];
document.body.insertAdjacentHTML('beforeend', boilDefs + `<h1>Split Decision — cast sheet, first pass</h1><main>${CAST.map((c) => `
  <section><h2>${c.name}</h2><p>${c.note}</p>
    <svg viewBox="0 0 600 285" role="img" aria-label="${c.name}: calm, alarmed, delighted">
      ${moods.map((m, i) => `<g transform="translate(${i * 200} 0)"><g class="ink">${c.draw(m)}</g>
        <text x="100" y="280" text-anchor="middle" font-size="15" fill="#6b5f55">${m === 'alarm' ? 'alarmed' : m === 'glee' ? 'delighted' : 'calm'}</text></g>`).join('')}
    </svg></section>`).join('')}</main>`);
startBoil();
