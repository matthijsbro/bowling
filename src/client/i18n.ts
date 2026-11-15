// The player's language. English is the source text everywhere; Dutch is looked up by that English text,
// so the engine, the saved games and the server keep working in English and each player reads their own language.
import { NL } from './nl.ts';

export type Lang = 'en' | 'nl';
const saved = (() => { try { return localStorage.getItem('sd.lang'); } catch { return null; } })();
export let lang: Lang = saved === 'nl' || saved === 'en' ? saved : navigator.language.toLowerCase().startsWith('nl') ? 'nl' : 'en';
export function setLang(l: Lang) {
  lang = l;
  try { localStorage.setItem('sd.lang', l); } catch { /* the choice just lasts this visit */ }
}

const fill = (s: string, args: unknown[]) => s.replace(/\{(\d)\}/g, (_, i) => String(args[Number(i)]));
// Sentences the engine has already put together ("Anna drew the perfect lane.") are matched against the templates.
// Longest first, so "{0} and {1}" never wins over a more specific sentence.
const PATTERNS = Object.keys(NL).filter((k) => k.includes('{0}')).sort((a, b) => b.length - a.length).map((k) => ({
  re: new RegExp(`^${k.replace(/[.*+?^$()|[\]\\]/g, '\\$&').replace(/\{\d\}/g, '(.*?)')}$`, 's'),
  nl: NL[k],
}));

/**
 * The text in the player's language. With arguments, `en` is a template with {0}, {1}…
 * Without, it may be a finished English sentence; the parts it was built from are translated too.
 * ponytail: a player name that is also an English word in the table (say "Share") gets translated inside such sentences.
 */
export function t(en: string, ...args: unknown[]): string {
  if (lang === 'en') return fill(en, args);
  if (NL[en] !== undefined) return fill(NL[en], args);
  if (args.length) return fill(en, args);
  for (const p of PATTERNS) {
    const m = p.re.exec(en);
    if (m) return fill(p.nl, m.slice(1).map((x) => t(x)));
  }
  return en;
}
