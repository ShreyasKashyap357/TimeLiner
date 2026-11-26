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
