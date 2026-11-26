// One pure transform per view. React components only render these results.
import { isoToNumber } from './dates.ts';
import { byInUniverse, byRelease, type Dataset, type Row } from './model.ts';
import type { FilterState, SortId } from './filters.ts';
import type { Branch } from './schema.ts';

// ---------------------------------------------------------------- ordering
export function sortRows(rows: Row[], sort: SortId, opts: { altOrder?: string[]; watched?: Set<string> } = {}): Row[] {
  const out = [...rows];
  switch (sort) {
    case 'in-universe': return out.sort(byInUniverse);
    case 'release': return out.sort(byRelease);
    case 'release-desc': return out.sort((a, b) => byRelease(b, a));
    case 'title': return out.sort((a, b) => (a.title.sort_title ?? a.title.title).localeCompare(b.title.sort_title ?? b.title.title) || byRelease(a, b));
    case 'runtime': return out.sort((a, b) => effectiveLength(a) - effectiveLength(b) || byRelease(a, b));
    case 'unwatched': {
      const w = opts.watched ?? new Set();
      return out.sort((a, b) => Number(w.has(a.key)) - Number(w.has(b.key)) || byInUniverse(a, b));
    }
    case 'alt': {
      const pos = new Map((opts.altOrder ?? []).map((id, i) => [id, i]));
      return out.sort((a, b) => (pos.get(a.key) ?? Infinity) - (pos.get(b.key) ?? Infinity) || byInUniverse(a, b));
    }
  }
}

/** Approximate minutes, for "short watches" sorting. Unknown lengths sort last. */
export function effectiveLength(r: Row): number {
  if (r.unit.runtime_min) return r.unit.runtime_min;
  if (r.unit.episode_count) return r.unit.episode_count * 45;
  return Number.MAX_SAFE_INTEGER;
}

// ---------------------------------------------------------------- 1. spine (in-universe, one continuity)
export interface SpineSection { id: string; label: string; startY: number | null; rows: Row[] }
export interface SpineResult { sections: SpineSection[]; unplaced: { lane: string; label: string; rows: Row[] }[] }

/** A unit sits on the spine if it has a calendar date, OR it is undated but its story position is known:
 *  released and on a placeable branch, in an order-only continuity or with explicit relative anchors. */
export function onSpine(r: Row): boolean {
  if (r.placed) return true;
  if (!r.branch.placeable || r.unit.status !== 'released') return false;
  return r.continuity.calendar.kind === 'ordered-only' || r.unit.in_universe.relative_to !== null;
}

export function spine(rows: Row[], sort: SortId, opts: { altOrder?: string[]; watched?: Set<string> } = {}): SpineResult {
  if (sort === 'alt' && opts.altOrder) return altSpine(rows, opts.altOrder);
  const placed = rows.filter(onSpine);
  const unplacedRows = rows.filter((r) => !onSpine(r));
  const sections: SpineSection[] = [];
  if (sort === 'in-universe' || sort === 'unwatched') {
    for (const r of sortRows(placed, 'in-universe')) {
      const label = r.placed ? r.unit.in_universe.label.replace(/\s*\(.*\)$/, '') : r.continuity.calendar.kind === 'ordered-only' ? '' : 'No year given';
      const last = sections.at(-1);
      if (last && last.label === label) last.rows.push(r);
      else sections.push({ id: `s${sections.length}`, label, startY: r.unit.in_universe.start?.y ?? null, rows: [r] });
    }
    if (sort === 'unwatched') for (const s of sections) s.rows = sortRows(s.rows, 'unwatched', opts);
  } else {
    sections.push({ id: 'all', label: '', startY: null, rows: sortRows(placed, sort, opts) });
  }
  // unplaced: per non-placeable branch, then "not placed by sources / unreleased"
  const lanes = new Map<string, { lane: string; label: string; rows: Row[] }>();
  for (const r of sortRows(unplacedRows, sort === 'in-universe' ? 'in-universe' : sort, opts)) {
    const key = !r.branch.placeable ? r.branch.id : r.unit.status === 'released' ? 'unplaced' : 'upcoming';
    const label = !r.branch.placeable ? r.branch.label : key === 'unplaced' ? 'No confirmed placement' : 'Not yet placed (unreleased)';
    if (!lanes.has(key)) lanes.set(key, { lane: key, label, rows: [] });
    lanes.get(key)!.rows.push(r);
  }
  return { sections, unplaced: [...lanes.values()] };
}

/** Alternate (e.g. Disney+) order: strictly that list's sequence, with a heading whenever the in-universe
 *  period changes, so the list reads like the timeline. Units not in the list go to their own lane. */
export function altSpine(rows: Row[], altOrder: string[]): SpineResult {
  const pos = new Map(altOrder.map((id, i) => [id, i]));
  const inList = rows.filter((r) => pos.has(r.key)).sort((a, b) => pos.get(a.key)! - pos.get(b.key)!);
  const sections: SpineSection[] = [];
  for (const r of inList) {
    const label = r.placed ? r.unit.in_universe.label.replace(/\s*\(.*\)$/, '') : !r.branch.placeable ? r.branch.label : 'No confirmed placement';
    const last = sections.at(-1);
    if (last && last.label === label) last.rows.push(r);
    else sections.push({ id: `a${sections.length}`, label, startY: r.unit.in_universe.start?.y ?? null, rows: [r] });
  }
  const rest = sortRows(rows.filter((r) => !pos.has(r.key)), 'in-universe');
  return { sections, unplaced: rest.length ? [{ lane: 'not-in-order', label: 'Not part of this order', rows: rest }] : [] };
}

/** 1-based position of a unit in an alternate order, if any. */
export function altPosition(altOrder: string[] | undefined, key: string): number | null {
  if (!altOrder) return null;
  const i = altOrder.indexOf(key);
  return i < 0 ? null : i + 1;
}

// ---------------------------------------------------------------- 2. release order
export interface YearGroup { year: number | null; rows: Row[] }
export function groupByReleaseYear(rows: Row[]): YearGroup[] {
  const out: YearGroup[] = [];
  for (const r of rows) {
    const y = r.unit.release.year;
    const last = out.at(-1);
    if (last && last.year === y) last.rows.push(r);
    else out.push({ year: y, rows: [r] });
  }
  return out;
}
export function releaseLanes(rows: Row[], sort: SortId, byUniverse: boolean, ds: Pick<Dataset, 'universes'>): { lane: string; label: string; groups: YearGroup[] }[] {
  const sorted = sortRows(rows, sort === 'release-desc' ? 'release-desc' : 'release');
  if (!byUniverse) return [{ lane: 'all', label: 'All', groups: groupByReleaseYear(sorted) }];
  return ds.universes
    .filter((u) => sorted.some((r) => r.universe.id === u.id))
    .map((u) => ({ lane: u.id, label: u.name, groups: groupByReleaseYear(sorted.filter((r) => r.universe.id === u.id)) }));
}

// ---------------------------------------------------------------- 3/4. swimlanes by key
export interface Lane { id: string; label: string; rows: Row[] }
export function swimlanes(rows: Row[], key: (r: Row) => string, labelOf: (id: string) => string, order?: string[]): Lane[] {
  const map = new Map<string, Row[]>();
  for (const r of sortRows(rows, 'release')) {
    const k = key(r);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(r);
  }
  const lanes = [...map.entries()].map(([id, rs]) => ({ id, label: labelOf(id), rows: rs }));
  if (order) lanes.sort((a, b) => (order.indexOf(a.id) + 1 || 999) - (order.indexOf(b.id) + 1 || 999));
  else lanes.sort((a, b) => a.rows[0]!.releaseKey.localeCompare(b.rows[0]!.releaseKey));
  return lanes;
}
/** Studio view key: label when present (e.g. Marvel Spotlight) else studio, so both Marvel Televisions separate. */
export const studioKey = (r: Row) => r.label ?? r.studio;

// ---------------------------------------------------------------- 5. groupings (Phase / Saga / Chapter)
export interface GroupNode { id: string; label: string; rows: Row[]; children: GroupNode[] }
export function groupings(rows: Row[], ds: Dataset, universeId: string): GroupNode[] {
  const u = ds.universes.find((x) => x.id === universeId);
  if (!u || !u.grouping_schemes.length) return [];
  const leaf = u.grouping_schemes.find((g) => !u.grouping_schemes.some((o) => o.parent_scheme === g.id))!;
  const parent = leaf.parent_scheme ? u.grouping_schemes.find((g) => g.id === leaf.parent_scheme) : undefined;
  const sorted = sortRows(rows, 'release');
  const leafNodes = [...leaf.values].sort((a, b) => a.order - b.order).map((v) => ({
    id: v.id, label: v.label, parent: v.parent, rows: sorted.filter((r) => r.unit.groupings[leaf.id] === v.id), children: [] as GroupNode[],
  }));
  const none: GroupNode = { id: 'none', label: `No ${leaf.label.toLowerCase()}`, rows: sorted.filter((r) => !r.unit.groupings[leaf.id]), children: [] };
  let out: GroupNode[];
  if (parent) {
    out = [...parent.values].sort((a, b) => a.order - b.order).map((p) => ({
      id: p.id, label: p.label, rows: [], children: leafNodes.filter((l) => l.parent === p.id).filter((l) => l.rows.length).map(({ parent: _p, ...n }) => n),
    }));
    const orphans = leafNodes.filter((l) => !l.parent && l.rows.length).map(({ parent: _p, ...n }) => n);
    if (orphans.length) out.push({ id: 'unassigned-saga', label: `No ${parent.label.toLowerCase()} yet`, rows: [], children: orphans });
    out = out.filter((n) => n.children.length);
  } else {
    out = leafNodes.filter((l) => l.rows.length).map(({ parent: _p, ...n }) => n);
  }
  if (none.rows.length) out.push(none);
  return out;
}

// ---------------------------------------------------------------- 6. characters / franchises
export function tagIndex(rows: Row[], ds: Dataset): { id: string; label: string; kind: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const r of rows) for (const t of new Set([...r.title.characters, ...r.title.franchises])) counts.set(t, (counts.get(t) ?? 0) + 1);
  return ds.tags.filter((t) => counts.has(t.id)).map((t) => ({ id: t.id, label: t.label, kind: t.kind, count: counts.get(t.id)! }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

// ---------------------------------------------------------------- 7. continuities overview
export interface ContinuityLane { id: string; label: string; universe: string; branches: { id: string; label: string; marker: Branch['marker']; placeable: boolean; rows: Row[] }[]; first: number | null; last: number | null; count: number }
export function continuityLanes(rows: Row[], ds: Dataset): ContinuityLane[] {
  return ds.continuities
    .map((c) => {
      const rs = sortRows(rows.filter((r) => r.continuity.id === c.id), 'release');
      const years = rs.map((r) => r.unit.release.year).filter((y): y is number => y !== null);
      return {
        id: c.id, label: c.name, universe: c.universe,
        branches: c.branches.map((b) => ({ id: b.id, label: b.label, marker: b.marker, placeable: b.placeable, rows: rs.filter((r) => r.branch.id === b.id) })).filter((b) => b.rows.length),
        first: years.length ? Math.min(...years) : null, last: years.length ? Math.max(...years) : null, count: rs.length,
      };
    })
    .filter((l) => l.count)
    .sort((a, b) => (ds.continuities.find((c) => c.id === a.id)!.order - ds.continuities.find((c) => c.id === b.id)!.order));
}

// ---------------------------------------------------------------- 8. dual axis
export interface DualPoint { row: Row; x: number; y0: number; y1: number }
export function dualAxis(rows: Row[]): { points: DualPoint[]; excluded: Row[]; xDomain: [number, number]; yDomain: [number, number] } {
  const points: DualPoint[] = [];
  const excluded: Row[] = [];
  for (const r of rows) {
    const x = isoToNumber(r.unit.release.date);
    const iu = r.unit.in_universe;
    if (x === null || !iu.start || !iu.end) { excluded.push(r); continue; }
    points.push({ row: r, x, y0: iu.start.y, y1: iu.end.y + (iu.start.y === iu.end.y ? 0.9 : 0.9) });
  }
  const xs = points.map((p) => p.x), ys = points.flatMap((p) => [p.y0, p.y1]);
  return {
    points, excluded,
    xDomain: xs.length ? [Math.floor(Math.min(...xs)), Math.ceil(Math.max(...xs))] : [0, 1],
    yDomain: ys.length ? [Math.floor(Math.min(...ys)), Math.ceil(Math.max(...ys))] : [0, 1],
  };
}

// ---------------------------------------------------------------- 9. connections
export interface Edge { from: string; to: string; kind: string; note: string }
export function connections(rows: Row[], ds: Dataset): { nodes: { id: string; label: string; year: number | null; continuity: string }[]; edges: Edge[] } {
  const titleIds = new Set(rows.map((r) => r.title.id));
  const titles = ds.titles.filter((t) => titleIds.has(t.id));
  const edges: Edge[] = [];
  for (const t of titles) {
    for (const l of t.links) if (titleIds.has(l.to)) edges.push({ from: l.to, to: t.id, kind: l.kind, note: l.note });
    for (const ref of t.constituents) {
      const c = ref.split('#e')[0];
      const owner = ds.titles.find((x) => x.units.some((u) => u.id === c));
      if (owner && titleIds.has(owner.id)) edges.push({ from: owner.id, to: t.id, kind: 'crossover', note: '' });
    }
  }
  // De-duplicate links recorded on both titles (A→B and B→A of the same kind); keep chronological direction.
  const year = new Map(titles.map((t) => [t.id, t.units[0]?.release.date ?? '9999']));
  const seen = new Set<string>();
  const unique: Edge[] = [];
  for (const e of edges) {
    const [a, b] = (year.get(e.from)! <= year.get(e.to)!) ? [e.from, e.to] : [e.to, e.from];
    const k = `${a}|${b}|${e.kind}`;
    if (seen.has(k)) continue;
    seen.add(k);
    unique.push({ ...e, from: a, to: b });
  }
  edges.splice(0, edges.length, ...unique);
  const linked = new Set(edges.flatMap((e) => [e.from, e.to]));
  const nodes = titles.filter((t) => linked.has(t.id)).map((t) => ({
    id: t.id, label: t.title, year: t.units[0]?.release.year ?? null, continuity: t.continuity,
  })).sort((a, b) => (a.year ?? 9999) - (b.year ?? 9999) || a.label.localeCompare(b.label));
  return { nodes, edges };
}

// ---------------------------------------------------------------- progress & what's next
export function progress(rows: Row[], watched: Set<string>): { done: number; total: number; pct: number } {
  const total = rows.length;
  const done = rows.filter((r) => watched.has(r.key)).length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}
export function nextUp(ordered: Row[], watched: Set<string>): Row | null {
  return ordered.find((r) => !watched.has(r.key) && r.unit.status === 'released') ?? null;
}

/** Rows as displayed by the current view, in order (used for progress + "what's next"). */
export function orderedForView(rows: Row[], s: FilterState, altOrder?: string[], watched?: Set<string>): Row[] {
  if (s.view === 'spine' || s.view === 'dual') {
    const sort = s.sort === 'release' || s.sort === 'release-desc' || s.sort === 'alt' || s.sort === 'title' || s.sort === 'runtime' || s.sort === 'unwatched' ? s.sort : 'in-universe';
    return sortRows(rows, sort, { altOrder, watched });
  }
  return sortRows(rows, s.sort === 'in-universe' ? 'release' : s.sort, { altOrder, watched });
}

// ---------------------------------------------------------------- per-title connections (both directions)
export interface TitleConnection { titleId: string; title: string; kind: string; note: string; direction: 'from-this' | 'to-this' | 'event' }
/** Everything a title is connected to: links it records, links other titles record to it, and crossover
 *  events that include one of its units. */
export function connectionsFor(titleId: string, ds: Pick<Dataset, 'titles'>): TitleConnection[] {
  const t = ds.titles.find((x) => x.id === titleId);
  if (!t) return [];
  const out: TitleConnection[] = [];
  for (const l of t.links) {
    const o = ds.titles.find((x) => x.id === l.to);
    if (o) out.push({ titleId: o.id, title: o.title, kind: l.kind, note: l.note, direction: 'from-this' });
  }
  const unitIds = new Set(t.units.map((u) => u.id));
  for (const o of ds.titles) {
    if (o.id === t.id) continue;
    for (const l of o.links) if (l.to === t.id && !out.some((c) => c.titleId === o.id && c.kind === l.kind)) out.push({ titleId: o.id, title: o.title, kind: l.kind, note: l.note, direction: 'to-this' });
    if (o.constituents.some((ref) => unitIds.has(ref.split('#e')[0]!))) out.push({ titleId: o.id, title: o.title, kind: 'crossover event', note: '', direction: 'event' });
    if (t.constituents.length && t.constituents.some((ref) => o.units.some((u) => u.id === ref.split('#e')[0]))) out.push({ titleId: o.id, title: o.title, kind: 'part of this event', note: '', direction: 'event' });
  }
  return out;
}

/** Human phrasing of a connection from the viewpoint of the current title. */
export function describeConnection(c: TitleConnection): string {
  const inverse: Record<string, string> = { sequel: 'followed by', continues: 'continued by', spinoff: 'spun off into', crossover: 'crosses over with', cameo: 'has a cameo in', 'feeds-into': 'leads into', remake: 'remade as', 'shares-characters': 'shares characters with' };
  const forward: Record<string, string> = { sequel: 'sequel to', continues: 'continues', spinoff: 'spin-off of', crossover: 'crosses over with', cameo: 'cameo from', 'feeds-into': 'follows on from', remake: 'remake of', 'shares-characters': 'shares characters with' };
  if (c.direction === 'event') return c.kind;
  return (c.direction === 'from-this' ? forward : inverse)[c.kind] ?? c.kind;
}
