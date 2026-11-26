import { describe, expect, it } from 'vitest';
import { loadDataset } from '../scripts/verify-data.ts';
import { checkIntegrity, type Dataset, type Issue } from '../src/domain/integrity.ts';

const TODAY = '2026-11-26';
async function fresh(): Promise<Dataset> {
  const issues: Issue[] = [];
  const ds = await loadDataset(issues);
  expect(issues).toEqual([]);
  return structuredClone(ds!);
}
const codes = (ds: Dataset) => checkIntegrity(ds, TODAY).filter((i) => i.level === 'error').map((i) => i.code);

describe('dataset integrity', () => {
  it('the committed dataset has no integrity errors', async () => {
    expect(codes(await fresh())).toEqual([]);
  });
  it('detects duplicate unit ids', async () => {
    const ds = await fresh();
    ds.titles[1]!.units[0]!.id = ds.titles[0]!.units[0]!.id;
    expect(codes(ds)).toContain('dup-unit');
  });
  it('detects a title pointing at a missing continuity', async () => {
    const ds = await fresh();
    ds.titles[0]!.continuity = 'nope';
    expect(codes(ds)).toContain('ref-continuity');
  });
  it('never allows calendar dates in an ordered-only continuity', async () => {
    const ds = await fresh();
    const t = ds.titles.find((t) => t.continuity === 'ssu')!;
    t.units[0]!.in_universe = { ...t.units[0]!.in_universe, start: { y: 2018 }, end: { y: 2018 }, precision: 'year' };
    expect(codes(ds)).toContain('calendar');
  });
  it('rejects dates on non-placeable branches', async () => {
    const ds = await fresh();
    const u = ds.titles.find((t) => t.id === 'loki')!.units[0]!;
    u.in_universe = { ...u.in_universe, start: { y: 2012 }, end: { y: 2012 }, precision: 'year' };
    expect(codes(ds)).toContain('non-placeable-dated');
  });
  it('requires a note when confidence is not "stated"', async () => {
    const ds = await fresh();
    const u = ds.titles.find((t) => t.id === 'iron-man')!.units[0]!;
    u.in_universe.note = '';
    expect(codes(ds)).toContain('iu-note');
  });
  it('flags a "released" unit whose date is in the future', async () => {
    const ds = await fresh();
    const u = ds.titles.find((t) => t.id === 'avengers-doomsday')!.units[0]!;
    u.status = 'released';
    expect(codes(ds)).toContain('status-released');
  });
  it('detects alternate orders that cross continuities', async () => {
    const ds = await fresh();
    ds.continuities.find((c) => c.id === 'mcu')!.alt_orders[0]!.unit_ids.push('venom');
    expect(codes(ds)).toContain('alt-order-cross-continuity');
  });
  it('detects duplicate order_index within a continuity', async () => {
    const ds = await fresh();
    const [a, b] = ds.titles.filter((t) => t.continuity === 'mcu');
    b!.units[0]!.in_universe.order_index = a!.units[0]!.in_universe.order_index;
    expect(codes(ds)).toContain('dup-order-index');
  });
});
