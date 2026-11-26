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
  /** "Title — Season 1" style display name. */
  name: string;
  animated: boolean;
  placed: boolean; // has in-universe calendar date
  releaseKey: string; // sortable ISO (partial dates padded to end of period)
  search: string; // lower-cased haystack
}

const ANIMATED: TitleType[] = ['animated-series', 'animated-film'];

export function unitDisplayName(t: Title, u: Unit): string {
  return t.units.length === 1 && /^(Film|Special|Short film|Miniseries|Season 1)$/.test(u.label) ? t.title : `${t.title} — ${u.label}`;
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
  for (const t of ds.titles) {
    const c = cont.get(t.continuity);
    const u = uni.get(t.universe);
    if (!c || !u) continue;
    for (const unit of t.units) {
      const branch = c.branches.find((b) => b.id === unit.timeline_branch) ?? c.branches[0]!;
      const name = unitDisplayName(t, unit);
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
        name,
        animated: ANIMATED.includes(t.type),
        placed: unit.in_universe.start !== null,
        releaseKey: releaseSortKey(unit.release.date),
        search: [name, t.sort_title ?? '', ...tagWords].join(' ').toLowerCase(),
      });
    }
  }
  return rows;
}

export const byRelease = (a: Row, b: Row) => a.releaseKey.localeCompare(b.releaseKey) || a.title.title.localeCompare(b.title.title) || (a.unit.season ?? 0) - (b.unit.season ?? 0) || a.key.localeCompare(b.key);
export const byInUniverse = (a: Row, b: Row) => a.unit.in_universe.order_index - b.unit.in_universe.order_index;
