import { describe, expect, it } from 'vitest';
import { CARDS } from '../shared/cards/index.ts';
import { EXCEPTIONS, PEOPLE, RULES } from '../shared/cards/rules.ts';
import { setLang, t } from './i18n.ts';
import { NL } from './nl.ts';

describe('Dutch', () => {
  it('has every card and rule text', () => {
    const texts = [
      ...Object.values(CARDS).flatMap((c) => [c.title, c.text, c.about, c.until, ...(c.differences ?? []).map((d) => d.text),
        ...c.options.flatMap((o) => [o.label, o.effect, o.after, o.epilogue])]),
      ...Object.values(RULES), ...Object.values(PEOPLE), ...Object.values(EXCEPTIONS).flat().map((d) => d.text),
    ].filter((x): x is string => !!x);
    expect(texts.filter((x) => NL[x] === undefined)).toEqual([]);
  });

  it('translates sentences the engine put together, parts included', () => {
    setLang('nl');
    expect(t('Anna drew the crooked lane, with bumpers.')).toBe('Anna trok de scheve baan, met bumpers.');
    expect(t('Anna and Bo and One of the geese all grabbed, so everyone got a wobbly ball.')).toBe('Anna en Bo en Een van de ganzen pakten allemaal, dus iedereen kreeg een wiebelige bal.');
    expect(t('Utilitarians, except when they would have to push someone')).toBe('Utilitaristen, behalve als ze iemand zouden moeten duwen');
    expect(t('At an earlier Split you gave the reason "We tell the truth". Your choice here goes against that reason, so it has been crossed off the board.'))
      .toBe('Bij een eerdere Split gaf je de reden "Wij zeggen de waarheid". Je keuze hier gaat tegen die reden in, dus die is van het bord doorgestreept.');
    expect(t('{0} pins', 7)).toBe('7 kegels');
    expect(t('Not a known sentence.')).toBe('Not a known sentence.');
    setLang('en');
    expect(t('{0} pins', 7)).toBe('7 pins');
  });
});
