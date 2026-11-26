// Flattened, view-ready model built from the canonical dataset.
// Every view transform works on Row[]; nothing here knows about any specific franchise.
import type { Branch, CanonTier, Continuity, Platform, Studio, Tag, Title, TitleType, Unit, Universe } from './schema.ts';

export interface Dataset {
  universes: Universe[];
  continuities: Continuity[];
  titles: Title[];
  tags: Tag[];
  studios: Studio[];
  platforms: Platform[];
  aliases: Record<string, string[]>;
}

export interface Row {
  key: string; // unit id
  unit: Unit;
  title: Title;
  universe: Universe;
  continuity: Continuity;
  branch: Branch;
  tier: CanonTier;
  type: TitleType;
  platform: string; // registry id (unit override or title)
  studio: string;
  label: string | null;
  /** "Title — Season 1" style display name (uses titleName). */
  name: string;
  /** Title as shown: years in square brackets, same-name titles disambiguated by [first release year]. */
  titleName: string;
  animated: boolean;
  medium: 'screen' | 'print';
  placed: boolean; // has in-universe calendar date
  releaseKey: string; // sortable ISO (partial dates padded to end of period)
  search: string; // lower-cased haystack
}

const ANIMATED: TitleType[] = ['animated-series', 'animated-film', 'motion-comic'];
export const PRINT_TYPES: TitleType[] = ['novel', 'novella', 'short-story', 'anthology', 'comic', 'graphic-novel', 'reference'];
export const mediumOf = (t: TitleType): 'screen' | 'print' => (PRINT_TYPES.includes(t) ? 'print' : 'screen');
/** Verb for marking a unit done, by medium. */
export const doneVerb = (t: TitleType) => (mediumOf(t) === 'print' ? 'read' : 'watched');

export function unitDisplayName(t: Title, u: Unit, titleName = t.title): string {
  return t.units.length === 1 && /^(Film|Special|Short film|Miniseries|Season 1|Novel|Novella|Book|Short story|Anthology)$/.test(u.label) ? titleName : `${titleName} — ${u.label}`;
}

const YEAR_IN_PARENS = /\s*\((\d{4})\s*([^)]*)\)/;
/** Bare name used to detect same-name titles: parentheticals and bracketed years removed. */
export const baseTitle = (title: string) => title.replace(/\s*\([^)]*\)/g, '').replace(/\s*\[\d{4}\]/g, '').trim().toLowerCase();
const firstYear = (t: Title) => t.units.map((u) => u.release.year).filter((y): y is number => y !== null).sort((a, b) => a - b)[0];
/** Display titles (UI rule): a year written in parentheses moves into square brackets at the end
 *  ("Spider-Man (2017 animated series)" → "Spider-Man (animated series) [2017]"), and titles that share a
 *  bare name get their first release year in square brackets ("Superman [1978]" vs "Superman [2025]"). */
export function displayTitles(titles: Title[]): Map<string, string> {
  // A year only helps when same-name titles started in different years (split parts of one show don't need it).
  const years = new Map<string, Set<number | undefined>>();
  for (const t of titles) { const k = baseTitle(t.title); if (!years.has(k)) years.set(k, new Set()); years.get(k)!.add(firstYear(t)); }
  const out = new Map<string, string>();
  for (const t of titles) {
    let name = t.title;
    let year: string | null = null;
    const m = YEAR_IN_PARENS.exec(name);
    if (m) { year = m[1]!; name = name.replace(YEAR_IN_PARENS, m[2]!.trim() ? ` (${m[2]!.trim()})` : ''); }
    if (!year && (years.get(baseTitle(t.title))?.size ?? 0) > 1) {
      const first = firstYear(t);
      if (first !== undefined) year = String(first);
    }
    out.set(t.id, year ? `${name} [${year}]` : name);
  }
  return out;
}

/** Sort key for partial ISO dates: unknown parts sort after known ones in the same period. */
export function releaseSortKey(d: string | null): string {
  if (!d) return '9999-99-99';
  if (/^\d{4}$/.test(d)) return `${d}-99-99`;
  if (/^\d{4}-\d{2}$/.test(d)) return `${d}-99`;
  return d;
}

export function buildRows(ds: Dataset): Row[] {
  const uni = new Map(ds.universes.map((u) => [u.id, u]));
  const cont = new Map(ds.continuities.map((c) => [c.id, c]));
  const tagLabel = new Map(ds.tags.map((t) => [t.id, t]));
  const rows: Row[] = [];
  const titleNames = displayTitles(ds.titles);
  for (const t of ds.titles) {
    const c = cont.get(t.continuity);
    const u = uni.get(t.universe);
    if (!c || !u) continue;
    for (const unit of t.units) {
      const branch = c.branches.find((b) => b.id === unit.timeline_branch) ?? c.branches[0]!;
      const titleName = titleNames.get(t.id) ?? t.title;
      const name = unitDisplayName(t, unit, titleName);
      const tagWords = [...t.characters, ...t.franchises].flatMap((id) => {
        const g = tagLabel.get(id);
        return g ? [g.label, ...g.aliases] : [id];
      });
      rows.push({
        key: unit.id, unit, title: t, universe: u, continuity: c, branch,
        tier: unit.canon_tier ?? t.canon_tier,
        type: t.type,
        platform: unit.platform_or_network ?? t.platform_or_network,
        studio: t.studio_brand,
        label: t.label,
        name, titleName,
        animated: ANIMATED.includes(t.type),
        medium: mediumOf(t.type),
        placed: unit.in_universe.start !== null,
        releaseKey: releaseSortKey(unit.release.date),
        search: [name, t.title, t.sort_title ?? '', ...t.credits.map((c) => c.name), ...tagWords].join(' ').toLowerCase(),
      });
    }
  }
  return rows;
}

export const byRelease = (a: Row, b: Row) => a.releaseKey.localeCompare(b.releaseKey) || a.title.title.localeCompare(b.title.title) || (a.unit.season ?? 0) - (b.unit.season ?? 0) || a.key.localeCompare(b.key);
export const byInUniverse = (a: Row, b: Row) => a.unit.in_universe.order_index - b.unit.in_universe.order_index;

const nameCache = new WeakMap<Title[], Map<string, string>>();
/** Display title for a title id (see displayTitles), cached per titles array. */
export function titleLabel(titles: Title[], id: string): string {
  let m = nameCache.get(titles);
  if (!m) { m = displayTitles(titles); nameCache.set(titles, m); }
  return m.get(id) ?? titles.find((t) => t.id === id)?.title ?? id;
}
