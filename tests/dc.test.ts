import { beforeAll, describe, expect, it } from 'vitest';
import { loadDataset } from '../scripts/verify-data.ts';
import { buildRows, type Dataset, type Row } from '../src/domain/model.ts';
import { applyFilters, defaultState } from '../src/domain/filters.ts';
import { groupings, releaseLanes, spine, connectionsFor } from '../src/domain/views.ts';

let ds: Dataset;
let rows: Row[];
beforeAll(async () => {
  const v = await loadDataset([]);
  ds = { ...v!, tags: Object.values(v!.tags).flat(), aliases: Object.assign({}, ...Object.values(v!.aliases)) };
  rows = buildRows(ds);
});

describe('DC universe', () => {
  it('is enabled with its own accent and default continuity', () => {
    const dc = ds.universes.find((u) => u.id === 'dc')!;
    expect(dc.enabled).toBe(true);
    expect(dc.accent.primary).not.toBe(ds.universes.find((u) => u.id === 'marvel')!.accent.primary);
    expect(dc.default_continuity).toBe('dcu');
  });
  it('Arrowverse Earths merge into Earth-Prime', () => {
    const av = ds.continuities.find((c) => c.id === 'arrowverse')!;
    for (const b of ['earth-1', 'earth-38', 'jeffersons-earth']) expect(av.branches.find((x) => x.id === b)!.merges_into?.branch).toBe('earth-prime');
  });
  it('Crisis on Infinite Earths lists its episodes and connects to its series', () => {
    const coie = ds.titles.find((t) => t.id === 'crisis-on-infinite-earths')!;
    expect(coie.constituents).toEqual(expect.arrayContaining(['arrow-s8#e8', 'the-flash-2014-s6#e9']));
    expect(connectionsFor('arrow', ds).some((c) => c.titleId === 'crisis-on-infinite-earths' && c.direction === 'event')).toBe(true);
  });
  it('DCU groups by Chapter', () => {
    const r = applyFilters(rows, defaultState('dc', 'dcu'), { scopeContinuity: false, scopeUniverse: true });
    const tree = groupings(r, ds, 'dc');
    expect(tree[0]!.label).toBe('Chapter One: Gods and Monsters');
    expect(tree[0]!.rows.some((x) => x.key === 'superman-2025')).toBe(true);
  });
  it('DCU story order puts Clayface before Superman (relative placement inline)', () => {
    const r = applyFilters(rows, defaultState('dc', 'dcu'), { scopeContinuity: true, scopeUniverse: true });
    const order = spine(r, 'in-universe').sections.flatMap((s) => s.rows.map((x) => x.key));
    expect(order.indexOf('clayface')).toBeGreaterThanOrEqual(0);
    expect(order.indexOf('clayface')).toBeLessThan(order.indexOf('superman-2025'));
  });
  it('never merges DCEU and DCU: Peacemaker is two titles in two continuities', () => {
    expect(ds.titles.find((t) => t.id === 'peacemaker-dceu')!.continuity).toBe('dceu');
    expect(ds.titles.find((t) => t.id === 'peacemaker-dcu')!.continuity).toBe('dcu');
  });
  it('combined Marvel + DC release order has one lane per universe', () => {
    const r = applyFilters(rows, defaultState('all', null), { scopeContinuity: false, scopeUniverse: true });
    const lanes = releaseLanes(r, 'release', true, ds);
    expect(lanes.map((l) => l.lane)).toEqual(expect.arrayContaining(['dc', 'marvel']));
    const flat = releaseLanes(r, 'release', false, ds)[0]!.groups.flatMap((g) => g.rows);
    expect([...new Set(flat.map((x) => x.universe.id))]).toEqual(expect.arrayContaining(['marvel', 'dc']));
  });
});

describe('DC deferred titles (D-11)', () => {
  it('places Constantine on Arrowverse Earth-1 before Arrow S4, and Gotham Knight between Begins and The Dark Knight', () => {
    const units = ds.titles.flatMap((t) => t.units.map((u) => ({ u, c: t.continuity })));
    const unit = (id: string) => units.find((x) => x.u.id === id)!;
    const con = unit('constantine-2014-s1');
    expect(con.c).toBe('arrowverse');
    expect(con.u.timeline_branch).toBe('earth-1');
    expect(con.u.in_universe.order_index).toBeLessThan(unit('arrow-s4').u.in_universe.order_index);
    const gk = unit('batman-gotham-knight').u.in_universe.order_index;
    expect(gk).toBeGreaterThan(unit('batman-begins').u.in_universe.order_index);
    expect(gk).toBeLessThan(unit('the-dark-knight').u.in_universe.order_index);
    expect(ds.titles.find((t) => t.id === 'pennyworth')!.continuity).toBe('pennyworth');
    expect(ds.titles.some((t) => /-extra-\d+$/.test(t.id))).toBe(false);
  });
});
