// Filter state, URL (de)serialisation and the filter predicate. Pure and unit-tested.
import type { CanonTier, Status, TitleType } from './schema.ts';
import type { Row } from './model.ts';

export const VIEWS = ['spine', 'release', 'platform', 'studio', 'groupings', 'tags', 'continuities', 'dual', 'connections'] as const;
export type ViewId = (typeof VIEWS)[number];
export type Quick = 'all' | 'movies' | 'series' | 'animated';
export type SortId = 'in-universe' | 'release' | 'release-desc' | 'alt' | 'title' | 'runtime' | 'unwatched';
export type WatchedFilter = 'all' | 'unwatched' | 'watched';

export interface FilterState {
  u: string; // universe id ('all' allowed for cross-universe views)
  c: string | null; // continuity id (in-universe views)
  view: ViewId;
  sort: SortId;
  alt: string | null; // alternate order id when sort === 'alt'
  quick: Quick;
  q: string;
  types: TitleType[];
  tiers: CanonTier[];
  platforms: string[];
  studios: string[]; // matches studio_brand OR label
  groupings: string[]; // grouping value ids (any scheme)
  status: Status[];
  tags: string[];
  conf: ('stated' | 'inferred' | 'disputed')[];
  branches: string[];
  watched: WatchedFilter;
  iu: [number, number] | null; // in-universe year range
  rel: [number, number] | null; // release year range
  lanes: boolean; // release view: lanes per universe
  unit: string | null; // open detail drawer
}

export const DEFAULT_TIERS: CanonTier[] = ['core', 'outside-set-date'];

export function defaultState(u = 'marvel', c: string | null = 'mcu'): FilterState {
  return {
    u, c, view: 'spine', sort: 'in-universe', alt: null, quick: 'all', q: '',
    types: [], tiers: [...DEFAULT_TIERS], platforms: [], studios: [], groupings: [], status: [],
    tags: [], conf: [], branches: [], watched: 'all', iu: null, rel: null, lanes: false, unit: null,
  };
}

// ---- URL codec: short keys, omit defaults so links stay short.
const LIST_KEYS: [keyof FilterState, string][] = [
  ['types', 'type'], ['tiers', 'tier'], ['platforms', 'pf'], ['studios', 'st'], ['groupings', 'grp'],
  ['status', 'status'], ['tags', 'tag'], ['conf', 'conf'], ['branches', 'br'],
];

export function toQuery(s: FilterState, defaults = defaultState(s.u, s.c)): string {
  const p = new URLSearchParams();
  p.set('u', s.u);
  if (s.c) p.set('c', s.c);
  if (s.view !== 'spine') p.set('view', s.view);
  if (s.sort !== defaults.sort) p.set('sort', s.sort);
  if (s.alt) p.set('alt', s.alt);
  if (s.quick !== 'all') p.set('quick', s.quick);
  if (s.q) p.set('q', s.q);
  for (const [k, name] of LIST_KEYS) {
    const v = s[k] as string[];
    const d = defaults[k] as string[];
    if (v.join(',') !== d.join(',')) p.set(name, v.length ? v.join(',') : '-');
  }
  if (s.watched !== 'all') p.set('w', s.watched);
  if (s.iu) p.set('iu', s.iu.join('..'));
  if (s.rel) p.set('rel', s.rel.join('..'));
  if (s.lanes) p.set('lanes', '1');
  if (s.unit) p.set('unit', s.unit);
  return p.toString();
}

function range(v: string | null): [number, number] | null {
  if (!v) return null;
  const m = /^(-?\d+)\.\.(-?\d+)$/.exec(v);
  return m ? [Number(m[1]), Number(m[2])] : null;
}

export function fromQuery(qs: string, fallbackUniverse = 'marvel', fallbackContinuity: string | null = 'mcu'): FilterState {
  const p = new URLSearchParams(qs);
  const s = defaultState(p.get('u') ?? fallbackUniverse, p.has('c') ? p.get('c') : fallbackContinuity);
  const view = p.get('view');
  if (view && (VIEWS as readonly string[]).includes(view)) s.view = view as ViewId;
  const sort = p.get('sort');
  if (sort && ['in-universe', 'release', 'release-desc', 'alt', 'title', 'runtime', 'unwatched'].includes(sort)) s.sort = sort as SortId;
  s.alt = p.get('alt');
  const quick = p.get('quick');
  if (quick && ['all', 'movies', 'series', 'animated'].includes(quick)) s.quick = quick as Quick;
  s.q = p.get('q') ?? '';
  for (const [k, name] of LIST_KEYS) {
    const v = p.get(name);
    if (v === null) continue;
    (s as unknown as Record<string, string[]>)[k] = v === '-' || v === '' ? [] : v.split(',').filter(Boolean);
  }
  const w = p.get('w');
  if (w === 'watched' || w === 'unwatched') s.watched = w;
  s.iu = range(p.get('iu'));
  s.rel = range(p.get('rel'));
  s.lanes = p.get('lanes') === '1';
  s.unit = p.get('unit');
  return s;
}

// ---- predicate
const MOVIE_TYPES: TitleType[] = ['film', 'one-shot', 'special', 'animated-film'];
const SERIES_TYPES: TitleType[] = ['series', 'animated-series', 'crossover-event'];

export function quickMatches(r: Row, q: Quick): boolean {
  if (q === 'movies') return MOVIE_TYPES.includes(r.type);
  if (q === 'series') return SERIES_TYPES.includes(r.type);
  if (q === 'animated') return r.animated;
  return true;
}

export interface FilterOptions {
  scopeContinuity: boolean; // restrict to s.c (in-universe views)
  scopeUniverse: boolean; // restrict to s.u unless 'all'
  watched?: Set<string>;
}

export function applyFilters(rows: Row[], s: FilterState, o: FilterOptions): Row[] {
  const q = s.q.trim().toLowerCase();
  return rows.filter((r) => {
    if (o.scopeUniverse && s.u !== 'all' && r.universe.id !== s.u) return false;
    if (o.scopeContinuity && s.c && r.continuity.id !== s.c) return false;
    if (!quickMatches(r, s.quick)) return false;
    if (s.types.length && !s.types.includes(r.type)) return false;
    if (s.tiers.length && !s.tiers.includes(r.tier)) return false;
    if (s.platforms.length && !s.platforms.includes(r.platform)) return false;
    if (s.studios.length && !s.studios.includes(r.studio) && !(r.label && s.studios.includes(r.label))) return false;
    if (s.groupings.length && !Object.values(r.unit.groupings).some((v) => v && s.groupings.includes(v))) return false;
    if (s.status.length && !s.status.includes(r.unit.status)) return false;
    if (s.tags.length && !s.tags.some((t) => r.title.characters.includes(t) || r.title.franchises.includes(t))) return false;
    if (s.conf.length && !s.conf.includes(r.unit.in_universe.confidence)) return false;
    if (s.branches.length && !s.branches.includes(r.branch.id)) return false;
    if (s.iu) {
      const st = r.unit.in_universe.start, en = r.unit.in_universe.end;
      if (!st || !en || en.y < s.iu[0] || st.y > s.iu[1]) return false;
    }
    if (s.rel) {
      const y = r.unit.release.year;
      if (y === null || y < s.rel[0] || y > s.rel[1]) return false;
    }
    if (o.watched && s.watched !== 'all') {
      const w = o.watched.has(r.key);
      if (s.watched === 'watched' ? !w : w) return false;
    }
    if (q && !r.search.includes(q)) return false;
    return true;
  });
}
