// R-56: film runtime / budget / box office. Formatter and infobox parser are pure; the data checks read the
// committed cache (data/sources/film-stats.json) and, once the migration has run, data/*/titles.json.
import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { formatMoney, formatRuntime } from '../src/domain/money.ts';
import { cleanWikitext, grossScope, infoboxField, notGross, parseMoneyAll, parseRuntime } from '../scripts/fetch/film-stats-parse.ts';
import { TitlesFile } from '../src/domain/schema.ts';

describe('formatMoney', () => {
  it('formats billions and millions compactly', () => {
    expect(formatMoney({ low: 2_797_501_328, high: null, currency: 'USD' })).toBe('$2.8 billion');
    expect(formatMoney({ low: 356_000_000, high: null, currency: 'USD' })).toBe('$356 million');
    expect(formatMoney({ low: 2_250_000, high: null, currency: 'USD' })).toBe('$2.25 million');
  });
  it('keeps a range and shares the sign and scale word', () => {
    expect(formatMoney({ low: 150e6, high: 200e6, currency: 'USD' })).toBe('$150–200 million');
    expect(formatMoney({ low: 900e6, high: 1.2e9, currency: 'USD' })).toBe('$900 million – $1.2 billion');
  });
  it('handles non-USD currencies', () => {
    expect(formatMoney({ low: 1.5e9, high: null, currency: 'JPY' })).toBe('¥1.5 billion');
    expect(formatMoney({ low: 286_000, high: null, currency: 'GBP' })).toBe('£286 thousand');
    expect(formatMoney({ low: 700e6, high: 950e6, currency: 'JPY' })).toBe('¥700–950 million');
  });
});

describe('formatRuntime', () => {
  it('uses hours and minutes', () => {
    expect(formatRuntime(143)).toBe('2 h 23 min');
    expect(formatRuntime(45)).toBe('45 min');
    expect(formatRuntime(120)).toBe('2 h');
  });
});

describe('infobox parsing', () => {
  const wikitext = `{{Infobox film
| name = X
| runtime        = 107 minutes<ref>{{cite web|url=https://e.org|title=t}}</ref>
| budget         = {{¥|1 billion}} ({{US$|9.5 million|long=no}})<ref name="a"/>
| gross          = {{plainlist|
* {{US$|20 million}}+ (Japan)
* ¥1.45 billion (Japan rentals)
}}
}}
'''X''' is a film.`;
  it('reads fields and cleans templates', () => {
    expect(parseRuntime(cleanWikitext(infoboxField(wikitext, 'runtime')!))).toBe(107);
    const budget = parseMoneyAll(cleanWikitext(infoboxField(wikitext, 'budget')!));
    expect(budget[0]).toMatchObject({ low: 1e9, high: null, currency: 'JPY' });
    expect(budget[1]).toMatchObject({ low: 9.5e6, currency: 'USD' });
    const gross = cleanWikitext(infoboxField(wikitext, 'gross')!).split('\n');
    expect(gross.filter((l) => !notGross(l))).toEqual(['$20 million+ (Japan)']);
    expect(grossScope(gross[0]!)).toBe('other');
  });
  it('keeps ranges, never collapsing them', () => {
    expect(parseMoneyAll('$150–200 million')[0]).toMatchObject({ low: 150e6, high: 200e6, currency: 'USD' });
    expect(parseMoneyAll('$3.5-5 million')[0]).toMatchObject({ low: 3.5e6, high: 5e6 });
    expect(parseMoneyAll('$900 million – $1.2 billion')[0]).toMatchObject({ low: 900e6, high: 1.2e9 });
  });
  it('treats US$ as a currency, not a market', () => {
    expect(grossScope('US$572.5 million')).toBe('worldwide');
    expect(grossScope('$11.6 million (U.S.)')).toBe('domestic');
  });
  it('reads hours-and-minutes runtimes', () => {
    expect(parseRuntime('2 hours 23 minutes')).toBe(143);
  });
});

const cache = JSON.parse(readFileSync('data/sources/film-stats.json', 'utf8')) as { entries: Record<string, { budget: { low: number } | null; box_office: { low: number; currency: string; scope: string } | null }> };
describe('film-stats cache', () => {
  it('has Avengers: Endgame worldwide gross above $2.7 billion', () => {
    const e = cache.entries['avengers-endgame'];
    expect(e?.box_office).toMatchObject({ currency: 'USD', scope: 'worldwide' });
    expect(e!.box_office!.low).toBeGreaterThan(2.7e9);
  });
  it('has no implausibly small figures', () => {
    for (const e of Object.values(cache.entries)) for (const m of [e.budget, e.box_office]) if (m) expect(m.low).toBeGreaterThanOrEqual(1000);
  });
});

// Needs scripts/migrations/2026-11-27-film-stats.ts to have been applied.
describe('film stats in titles.json (after the migration)', () => {
  const units = readdirSync('data', { withFileTypes: true })
    .filter((d) => d.isDirectory() && !['sources', 'candidates', 'registry'].includes(d.name))
    .flatMap((d) => TitlesFile.parse(JSON.parse(readFileSync(`data/${d.name}/titles.json`, 'utf8'))).flatMap((t) => t.units));
  it('Avengers: Endgame shows its box office', () => {
    const u = units.find((x) => x.id === 'avengers-endgame');
    expect(u?.film_stats?.box_office?.low).toBeGreaterThan(2.7e9);
  });
  it('every film-stats figure and runtime citation is sourced', () => {
    for (const u of units) {
      const s = u.film_stats;
      if (!s) continue;
      if (s.runtime_source) expect(u.runtime_min).not.toBeNull();
      for (const m of [s.budget, s.box_office]) if (m) expect(m.source_url).toMatch(/^https:\/\/(www\.wikidata\.org|en\.wikipedia\.org)\/w\/index\.php\?title=.+&oldid=\d+$/);
    }
  });
});
