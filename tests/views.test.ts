import { beforeAll, describe, expect, it } from 'vitest';
import { loadDataset } from '../scripts/verify-data.ts';
import { buildRows, releaseSortKey, type Dataset, type Row } from '../src/domain/model.ts';
import { applyFilters, defaultState, fromQuery, toQuery } from '../src/domain/filters.ts';
import { connectionsFor, describeConnection, connections, continuityLanes, dualAxis, groupings, nextUp, progress, releaseLanes, sortRows, spine, studioKey, swimlanes, tagIndex } from '../src/domain/views.ts';
import { formatYear, formatRelease } from '../src/domain/dates.ts';
import { migrate, parseImport } from '../src/state/watched.ts';

let ds: Dataset;
let rows: Row[];
beforeAll(async () => {
  const issues: never[] = [];
  const v = await loadDataset(issues);
  ds = { ...v!, tags: Object.values(v!.tags).flat(), aliases: Object.assign({}, ...Object.values(v!.aliases)) };
  rows = buildRows(ds);
});
const mcu = () => applyFilters(rows, defaultState('marvel', 'mcu'), { scopeContinuity: true, scopeUniverse: true });

describe('URL state', () => {
  it('round-trips through the query string', () => {
    const s = { ...defaultState('marvel', 'mcu'), view: 'release' as const, sort: 'release-desc' as const, quick: 'movies' as const, q: 'spider', tags: ['spider-man'], iu: [2010, 2020] as [number, number], unit: 'iron-man' };
    expect(fromQuery(toQuery(s), 'marvel', 'mcu')).toEqual(s);
  });
  it('omits defaults to keep links short', () => {
    expect(toQuery(defaultState('marvel', 'mcu'))).toBe('u=marvel&c=mcu');
  });
  it('can encode an explicitly empty list (show all tiers)', () => {
    const s = { ...defaultState('marvel', 'mcu'), tiers: [] };
    expect(fromQuery(toQuery(s), 'marvel', 'mcu').tiers).toEqual([]);
  });
  it('ignores unknown views', () => {
    expect(fromQuery('u=marvel&view=bogus', 'marvel', 'mcu').view).toBe('spine');
  });
});

describe('filters', () => {
  it('shows every tier by default (Loki, What If, ABC series included)', () => {
    const r = mcu();
    for (const k of ['loki-s1', 'what-if-s1', 'agents-of-shield-s1', 'werewolf-by-night']) expect(r.some((x) => x.key === k)).toBe(true);
  });
  it('the Loki character finds the Loki series', () => {
    const r = applyFilters(rows, { ...defaultState('marvel', 'mcu'), tags: ['loki'] }, { scopeContinuity: false, scopeUniverse: true });
    expect(r.some((x) => x.title.id === 'loki')).toBe(true);
  });
  it('quick toggles: movies / series / animated', () => {
    const base = { ...defaultState('marvel', 'mcu'), tiers: [] };
    const o = { scopeContinuity: true, scopeUniverse: true };
    expect(applyFilters(rows, { ...base, quick: 'movies' }, o).every((r) => ['film', 'one-shot', 'special', 'animated-film'].includes(r.type))).toBe(true);
    expect(applyFilters(rows, { ...base, quick: 'series' }, o).some((r) => r.type === 'film')).toBe(false);
    expect(applyFilters(rows, { ...base, quick: 'animated' }, o).every((r) => r.animated)).toBe(true);
  });
  it('studio filter matches labels and keeps the two Marvel Televisions apart', () => {
    const o = { scopeContinuity: false, scopeUniverse: true };
    const division = applyFilters(rows, { ...defaultState('marvel', 'mcu'), tiers: [], studios: ['marvel-television-division'] }, o);
    const banner = applyFilters(rows, { ...defaultState('marvel', 'mcu'), tiers: [], studios: ['marvel-television-banner'] }, o);
    expect(division.some((r) => r.title.id === 'daredevil')).toBe(true);
    expect(division.some((r) => r.title.id === 'daredevil-born-again')).toBe(false);
    expect(banner.some((r) => r.title.id === 'daredevil-born-again')).toBe(true);
    expect(banner.some((r) => r.title.id === 'daredevil')).toBe(false);
  });
  it('search matches character aliases', () => {
    const r = applyFilters(rows, { ...defaultState('marvel', 'mcu'), tiers: [], q: 'matt murdock' }, { scopeContinuity: false, scopeUniverse: true });
    expect(r.some((x) => x.title.id === 'daredevil')).toBe(true);
  });
  it('watched filter', () => {
    const w = new Set(['iron-man']);
    const r = applyFilters(rows, { ...defaultState('marvel', 'mcu'), watched: 'watched' }, { scopeContinuity: true, scopeUniverse: true, watched: w });
    expect(r.map((x) => x.key)).toEqual(['iron-man']);
  });
});

describe('view transforms', () => {
  it('spine: in-universe order, year sections, unplaced lanes', () => {
    const res = spine(applyFilters(rows, { ...defaultState('marvel', 'mcu'), tiers: [] }, { scopeContinuity: true, scopeUniverse: true }), 'in-universe');
    expect(res.sections[0]!.label).toBe('1260 BC');
    const order = res.sections.flatMap((s) => s.rows.map((r) => r.key));
    expect(order.indexOf('iron-man')).toBeLessThan(order.indexOf('the-avengers'));
    expect(order.indexOf('daredevil-born-again-s1-e1')).toBeLessThan(order.indexOf('daredevil-born-again-s1-e2-9'));
    const lanes = Object.fromEntries(res.unplaced.map((l) => [l.lane, l.rows.map((r) => r.key)]));
    expect(lanes['outside-time']).toEqual(['loki-s1', 'loki-s2']);
    expect(lanes['upcoming']).toContain('avengers-doomsday');
  });
  it('spine with alternate (Disney+) order', () => {
    const alt = ds.continuities.find((c) => c.id === 'mcu')!.alt_orders[0]!.unit_ids;
    const res = spine(mcu(), 'alt', { altOrder: alt });
    expect(res.sections[0]!.rows[0]!.key).toBe('eyes-of-wakanda-ep1');
  });
  it('Disney+ order keeps list order, adds period headings, numbers entries', () => {
    const alt = ds.continuities.find((c) => c.id === 'mcu')!.alt_orders[0]!.unit_ids;
    const res = spine(mcu(), 'alt', { altOrder: alt });
    const flat = res.sections.flatMap((s) => s.rows.map((r) => r.key));
    expect(flat).toEqual(alt.filter((id) => flat.includes(id)));
    expect(res.sections[0]!.label).toBe('1260 BC');
    expect(res.sections.some((s) => s.label === 'Outside time (TVA)')).toBe(true);
    expect(res.unplaced[0]?.lane).toBe('not-in-order');
    expect(res.unplaced[0]!.rows.some((r) => r.key === 'spider-man-brand-new-day')).toBe(true);
  });
  it('spine never mixes continuities', () => {
    const res = spine(mcu(), 'in-universe');
    expect(res.sections.flatMap((s) => s.rows).every((r) => r.continuity.id === 'mcu')).toBe(true);
  });
  it('release order sorts partial dates after full dates of the same year', () => {
    expect(releaseSortKey('2028') > releaseSortKey('2028-12-15')).toBe(true);
    const lanes = releaseLanes(applyFilters(rows, defaultState('marvel', 'mcu'), { scopeContinuity: false, scopeUniverse: true }), 'release', false, ds);
    const years = lanes[0]!.groups.map((g) => g.year ?? 9999);
    expect([...years].sort((a, b) => a - b)).toEqual(years);
  });
  it('platform and studio swimlanes', () => {
    const r = applyFilters(rows, { ...defaultState('marvel', 'mcu'), tiers: [] }, { scopeContinuity: false, scopeUniverse: true });
    const pl = swimlanes(r, (x) => x.platform, (id) => id);
    expect(pl.find((l) => l.id === 'netflix')!.rows.every((x) => x.platform === 'netflix')).toBe(true);
    const st = swimlanes(r, studioKey, (id) => id);
    expect(st.map((l) => l.id)).toEqual(expect.arrayContaining(['marvel-television-division', 'marvel-television-banner', 'fox', 'sony']));
  });
  it('groupings: sagas contain phases; no-phase bucket', () => {
    const tree = groupings(applyFilters(rows, { ...defaultState('marvel', 'mcu'), tiers: [] }, { scopeContinuity: false, scopeUniverse: true }), ds, 'marvel');
    const infinity = tree.find((n) => n.id === 'infinity-saga')!;
    expect(infinity.children.map((c) => c.id)).toEqual(['phase-1', 'phase-2', 'phase-3']);
    expect(tree.at(-1)!.id).toBe('none');
  });
  it('tag index counts and character view', () => {
    const idx = tagIndex(rows, ds);
    expect(idx.find((t) => t.id === 'spider-man')!.count).toBeGreaterThan(5);
  });
  it('continuity lanes keep non-placeable branches separate', () => {
    const lanes = continuityLanes(applyFilters(rows, { ...defaultState('marvel', 'mcu'), tiers: [] }, { scopeContinuity: false, scopeUniverse: true }), ds);
    const m = lanes.find((l) => l.id === 'mcu')!;
    expect(m.branches.find((b) => b.id === 'outside-time')!.placeable).toBe(false);
    expect(lanes.map((l) => l.id)).toContain('fox-x-men');
  });
  it('dual axis excludes undated units and spans ranges', () => {
    const d = dualAxis(mcu());
    expect(d.excluded.some((r) => r.key === 'avengers-doomsday')).toBe(true);
    const cafa = d.points.find((p) => p.row.key === 'captain-america-the-first-avenger')!;
    expect(cafa.y0).toBe(1943);
    expect(cafa.y1).toBeGreaterThan(1945);
  });
  it('connections are de-duplicated and chronological', () => {
    const c = connections(applyFilters(rows, { ...defaultState('marvel', 'mcu'), tiers: [] }, { scopeContinuity: false, scopeUniverse: true }), ds);
    const nwh = c.edges.filter((e) => (e.from === 'venom-let-there-be-carnage' || e.to === 'venom-let-there-be-carnage') && (e.from === 'spider-man-no-way-home' || e.to === 'spider-man-no-way-home'));
    expect(nwh).toHaveLength(1);
    expect(nwh[0]!.from).toBe('venom-let-there-be-carnage');
  });
  it('connectionsFor finds links in both directions', () => {
    const nwh = connectionsFor('spider-man-no-way-home', ds);
    expect(nwh.map((c) => c.titleId)).toEqual(expect.arrayContaining(['spider-man-2002', 'the-amazing-spider-man', 'venom-let-there-be-carnage']));
    const raimi = connectionsFor('spider-man-2002', ds);
    const back = raimi.find((c) => c.titleId === 'spider-man-no-way-home')!;
    expect(back.direction).toBe('to-this');
    expect(describeConnection(back)).toBe('crosses over with');
    expect(describeConnection(connectionsFor('spider-man-2', ds).find((c) => c.titleId === 'spider-man-2002')!)).toBe('sequel to');
  });
  it('progress and what-is-next', () => {
    const ordered = sortRows(mcu(), 'in-universe');
    const w = new Set([ordered[0]!.key, ordered[1]!.key]);
    expect(progress(ordered, w).done).toBe(2);
    expect(nextUp(ordered, w)!.key).toBe(ordered[2]!.key);
  });
});

describe('dates and watched store', () => {
  it('formats BC and era calendars', () => {
    expect(formatYear(-1260, { kind: 'gregorian' })).toBe('1260 BC');
    expect(formatYear(-19, { kind: 'era', before_label: 'BBY', after_label: 'ABY', has_year_zero: true, note: '', label_position: 'after', pad: 0 })).toBe('19 BBY');
    expect(formatRelease('2027-03')).toBe('Mar 2027');
  });
  it('migrates watched ids through aliases and keeps unknown ids', () => {
    const out = migrate({ 'x-men-the-animated-series-s1-5': 't', 'mystery-id': 't' }, ds.aliases);
    expect(Object.keys(out)).toEqual(expect.arrayContaining(['x-men-the-animated-series-s1', 'x-men-the-animated-series-s5', 'mystery-id']));
  });
  it('parses exported files and bare maps, rejects junk ids', () => {
    expect(parseImport('{"app":"timeliner","version":1,"watched":{"iron-man":"2026-01-01"}}')).toEqual({ 'iron-man': '2026-01-01' });
    expect(Object.keys(parseImport('{"thor":"x","<script>":"y"}'))).toEqual(['thor']);
  });
});

describe('media (R-48)', () => {
  it('derives audio and stage media and their wording', async () => {
    const { mediumOf, doneVerb, releaseWord } = await import('../src/domain/model.ts');
    expect(mediumOf('radio-drama')).toBe('audio');
    expect(mediumOf('musical')).toBe('stage');
    expect(doneVerb('podcast')).toBe('listened to');
    expect(doneVerb('stage-play')).toBe('seen');
    expect(releaseWord('musical')).toBe('First performance');
    expect(releaseWord('novel')).toBe('Published');
    expect(mediumOf('video-game')).toBe('game');
    expect(doneVerb('video-game')).toBe('played');
  });
});
