import { beforeAll, describe, expect, it } from 'vitest';
import { loadDataset } from '../scripts/verify-data.ts';
import { buildRows, type Dataset, type Row } from '../src/domain/model.ts';
import { applyFilters, defaultState } from '../src/domain/filters.ts';
import { connectionsFor, describeConnection, groupings, spine } from '../src/domain/views.ts';
import { formatYear } from '../src/domain/dates.ts';

let ds: Dataset;
let rows: Row[];
beforeAll(async () => {
  const v = await loadDataset([]);
  ds = { ...v!, tags: Object.values(v!.tags).flat(), aliases: Object.assign({}, ...Object.values(v!.aliases)) };
  rows = buildRows(ds);
});
const scoped = (u: string, c: string | null, patch = {}) => applyFilters(rows, { ...defaultState(u, c), ...patch }, { scopeContinuity: Boolean(c), scopeUniverse: true });

describe('Godzilla & Kong', () => {
  it('Monsterverse story order: Skull Island (1973) before Godzilla (2014) before KotM', () => {
    const order = spine(scoped('godzilla-kong', 'monsterverse'), 'in-universe').sections.flatMap((s) => s.rows.map((r) => r.key));
    expect(order.indexOf('kong-skull-island')).toBeLessThan(order.indexOf('godzilla-2014'));
    expect(order.indexOf('godzilla-2014')).toBeLessThan(order.indexOf('godzilla-king-of-the-monsters'));
  });
  it('Toho eras are a grouping, not a continuity', () => {
    const tree = groupings(scoped('godzilla-kong', null), ds, 'godzilla-kong');
    expect(tree.map((n) => n.id)).toEqual(expect.arrayContaining(['showa', 'heisei', 'millennium', 'reiwa']));
  });
  it('GMK shares the TriStar continuity', () => {
    expect(ds.titles.find((t) => t.id === 'godzilla-mothra-and-king-ghidorah')!.continuity).toBe('tristar-gmk');
  });
});

describe('A Song of Ice and Fire (books pilot)', () => {
  it('formats the AC/BC calendar', () => {
    const cal = ds.continuities.find((c) => c.id === 'asoiaf-books')!.calendar;
    expect(formatYear(298, cal)).toBe('298 AC');
    expect(formatYear(-2, cal)).toBe('2 BC');
  });
  it('Books quick toggle returns only print titles', () => {
    const r = scoped('asoiaf', null, { quick: 'books' });
    expect(r.length).toBeGreaterThan(10);
    expect(r.every((x) => x.medium === 'print')).toBe(true);
  });
  it('books and HBO are separate continuities joined by adapts links (both directions)', () => {
    expect(ds.titles.find((t) => t.id === 'a-game-of-thrones')!.continuity).toBe('asoiaf-books');
    expect(ds.titles.find((t) => t.id === 'game-of-thrones')!.continuity).toBe('got-hbo');
    const fromBook = connectionsFor('a-game-of-thrones', ds).find((c) => c.titleId === 'game-of-thrones')!;
    expect(describeConnection(fromBook)).toBe('adapted as');
    const fromShow = connectionsFor('game-of-thrones', ds).find((c) => c.titleId === 'a-game-of-thrones')!;
    expect(describeConnection(fromShow)).toBe('adapts');
  });
  it('unpublished novels are upcoming with no date', () => {
    const w = ds.titles.find((t) => t.id === 'the-winds-of-winter')!.units[0]!;
    expect(w.status).toBe('upcoming');
    expect(w.release.date).toBeNull();
  });
  it('story order in the books starts with Fire & Blood (2 BC) and ends with the main series', () => {
    const order = spine(scoped('asoiaf', 'asoiaf-books'), 'in-universe').sections.flatMap((s) => s.rows.map((r) => r.key));
    expect(order[0]).toBe('fire-and-blood');
    expect(order.indexOf('the-hedge-knight')).toBeLessThan(order.indexOf('a-game-of-thrones'));
  });
});

describe('Star Wars', () => {
  it('formats BBY/ABY', () => {
    const cal = ds.continuities.find((c) => c.id === 'sw-canon')!.calendar;
    expect(formatYear(-32, cal)).toBe('32 BBY');
    expect(formatYear(4, cal)).toBe('4 ABY');
  });
  it('canon, Legends and Visions are separate continuities', () => {
    const c = (id: string) => ds.titles.find((t) => t.id === id)!.continuity;
    expect(c('the-clone-wars')).toBe('sw-canon');
    expect(c('clone-wars-2003')).toBe('sw-legends');
    expect(c('star-wars-visions-vol-1')).toBe('sw-visions');
  });
  it('canon story order: Acolyte < Phantom Menace < Rebels S4 < Rogue One < A New Hope < Mandalorian', () => {
    const order = spine(scoped('star-wars', 'sw-canon'), 'in-universe').sections.flatMap((s) => s.rows.map((r) => r.key));
    const ix = (k: string) => order.indexOf(k);
    for (const k of ['the-acolyte', 'the-phantom-menace', 'star-wars-rebels-s4', 'rogue-one', 'a-new-hope', 'the-mandalorian-s1']) expect(ix(k)).toBeGreaterThanOrEqual(0);
    expect(ix('the-acolyte')).toBeLessThan(ix('the-phantom-menace'));
    expect(ix('star-wars-rebels-s4')).toBeLessThan(ix('rogue-one'));
    expect(ix('rogue-one')).toBeLessThan(ix('a-new-hope'));
    expect(ix('a-new-hope')).toBeLessThan(ix('the-mandalorian-s1'));
  });
});

describe('Recommended MCU order (D-14)', () => {
  it('is collated, release-ordered, and essentials-only moves optional units to their own lane', () => {
    const rec = ds.continuities.find((c) => c.id === 'mcu')!.alt_orders.find((a) => a.id === 'recommended')!;
    expect(rec.kind).toBe('recommended');
    expect(rec.sources.length).toBeGreaterThanOrEqual(4);
    expect(rec.unit_ids.indexOf('iron-man')).toBeLessThan(rec.unit_ids.indexOf('the-avengers'));
    const rows = scoped('marvel', 'mcu');
    const res = spine(rows, 'alt', { altOrder: rec.unit_ids, alt: { headings: 'release', optional: new Set(rec.optional_unit_ids), essentialsOnly: true } });
    const main = res.sections.flatMap((s) => s.rows.map((r) => r.key));
    expect(main).toContain('avengers-endgame');
    expect(main.some((k) => rec.optional_unit_ids.includes(k))).toBe(false);
    expect(res.unplaced.find((l) => l.lane === 'optional')!.rows.length).toBeGreaterThan(0);
  });
});

describe('Display titles (years in square brackets)', () => {
  it('moves parenthesised years into brackets and disambiguates same-name titles by year', async () => {
    const { displayTitles } = await import('../src/domain/model.ts');
    const names = displayTitles(ds.titles);
    expect(names.get('spider-man-2017-animated')).toBe('Spider-Man (animated series) [2017]');
    const supermen = ds.titles.filter((t) => t.title === 'Superman').map((t) => names.get(t.id));
    expect(supermen).toEqual(expect.arrayContaining(['Superman [1978]', 'Superman [2025]']));
    for (const n of names.values()) expect(n).not.toMatch(/\(\d{4}/);
  });
});

describe('Star Trek', () => {
  it('keeps Prime and Kelvin as separate continuities', () => {
    const c = (id: string) => ds.titles.find((t) => t.id === id)!.continuity;
    expect(c('the-original-series')).toBe('st-prime');
    expect(c('star-trek-2009')).toBe('st-kelvin');
    expect(c('very-short-treks')).toBe('st-other');
  });
  it('Prime story order: Enterprise < Discovery S1 < TOS < TNG < Picard < Discovery S3 (32nd century)', () => {
    const order = spine(scoped('star-trek', 'st-prime'), 'in-universe').sections.flatMap((s) => s.rows.map((r) => r.key));
    const ix = (k: string) => order.indexOf(k);
    const seq = ['enterprise-s1', 'discovery-s1', 'the-original-series-s1', 'the-next-generation-s1', 'picard-s1', 'discovery-s3'];
    for (const k of seq) expect(ix(k)).toBeGreaterThanOrEqual(0);
    for (let i = 1; i < seq.length; i++) expect(ix(seq[i - 1]!)).toBeLessThan(ix(seq[i]!));
  });
});

describe('Cast & crew (D-29)', () => {
  it('stores Wikidata credits and filters by person', () => {
    const im = ds.titles.find((t) => t.id === 'iron-man')!;
    expect(im.credits.some((c) => c.role === 'director' && c.name === 'Jon Favreau')).toBe(true);
    expect(im.credits.filter((c) => c.role === 'cast').length).toBeGreaterThan(10); // full cast (D-29 answer)
    const eg = ds.titles.find((t) => t.id === 'avengers-endgame')!;
    expect(eg.credits.some((c) => c.cameo && c.name === 'Stan Lee')).toBe(true);
    const favreau = im.credits.find((c) => c.name === 'Jon Favreau')!.qid!;
    const r = applyFilters(rows, { ...defaultState('marvel', null), people: [favreau] }, { scopeContinuity: false, scopeUniverse: true });
    expect(r.some((x) => x.title.id === 'iron-man')).toBe(true);
    expect(r.every((x) => x.title.credits.some((c) => c.qid === favreau))).toBe(true);
  });
});

describe('Watch orders (D-14, D-34)', () => {
  it('every recommended order states its criteria and per-entry guide support; official orders exist', () => {
    const orders = ds.continuities.flatMap((c) => c.alt_orders.map((a) => ({ c: c.id, a })));
    const rec = orders.filter((o) => o.a.kind === 'recommended');
    expect(rec.map((o) => o.c)).toEqual(expect.arrayContaining(['mcu', 'sw-canon', 'st-prime', 'st-kelvin', 'dcu', 'dceu', 'monsterverse', 'got-hbo']));
    for (const { a } of rec) {
      expect(a.criteria.length).toBeGreaterThan(20);
      for (const [u, idx] of Object.entries(a.unit_sources)) { expect(a.unit_ids).toContain(u); for (const i of idx) expect(i).toBeLessThan(a.sources.length); }
    }
    expect(orders.some((o) => o.a.id === 'startrek-com' && o.a.kind === 'official')).toBe(true);
    expect(orders.some((o) => o.a.id === 'starwars-com' && o.a.kind === 'official')).toBe(true);
  });
});

describe('Round 2 data (D-12, D-11, D-31)', () => {
  const t = (id: string) => ds.titles.find((x) => x.id === id)!;
  it('Disney XD shows form two continuities, Avengers Assemble split at season 5', () => {
    expect(t('ultimate-spider-man').continuity).toBe('marvel-xd-2012');
    expect(t('hulk-and-the-agents-of-smash').continuity).toBe('marvel-xd-2012');
    expect(t('avengers-assemble').continuity).toBe('marvel-xd-2012');
    expect(t('avengers-assemble').units.map((u) => u.id)).toEqual(['avengers-assemble-s1', 'avengers-assemble-s2', 'avengers-assemble-s3', 'avengers-assemble-s4']);
    expect(t('avengers-black-panthers-quest').continuity).toBe('marvel-disney-xd');
    expect(ds.aliases['avengers-assemble-series']).toEqual(expect.arrayContaining(['avengers-assemble-s1', 'avengers-black-panthers-quest']));
  });
  it('adds the remaining DC titles with sourced placements', () => {
    expect(t('dc-showcase-kamandi-the-last-boy-on-earth').continuity).toBe('tomorrowverse');
    const hom = t('dc-showcase-constantine-the-house-of-mystery').units[0]!.in_universe;
    expect(hom.relative_to?.after).toBe('justice-league-dark-apokolips-war');
    expect(t('gotham-girls').continuity).toBe('dcau');
    expect(t('mister-miracle').units[0]!.status).toBe('upcoming');
  });
  it('cites every word count', () => {
    const books = ds.titles.flatMap((x) => x.units).filter((u) => u.word_count !== null);
    expect(books.length).toBeGreaterThan(20);
    for (const u of books) expect(u.word_count_source, u.id).toBeTruthy();
  });
});

describe('Rick Riordan (B3)', () => {
  it('books share one continuity in Timeline order; screen adaptations are separate and linked', () => {
    const t = (id: string) => ds.titles.find((x) => x.id === id)!;
    expect(t('the-red-pyramid').continuity).toBe('riordanverse-books');
    expect(t('the-sword-of-summer').continuity).toBe('riordanverse-books');
    expect(t('percy-jackson-and-the-olympians-tv').continuity).toBe('percy-jackson-disney-plus');
    const order = spine(scoped('riordan', 'riordanverse-books'), 'in-universe').sections.flatMap((s) => s.rows.map((r) => r.key));
    expect(order.indexOf('the-lightning-thief')).toBeLessThan(order.indexOf('the-last-olympian'));
    expect(order.indexOf('the-last-olympian')).toBeLessThan(order.indexOf('the-lost-hero'));
    const fromBook = connectionsFor('the-lightning-thief', ds).map((c) => c.titleId);
    expect(fromBook).toEqual(expect.arrayContaining(['percy-jackson-the-lightning-thief-2010', 'percy-jackson-and-the-olympians-tv']));
  });
});
