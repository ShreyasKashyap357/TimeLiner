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
