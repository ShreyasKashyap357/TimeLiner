// Shared types and helpers for hand-curated universe seeds (used by scripts/bootstrap/universe.ts).
// A seed lists units in STORY ORDER per continuity (order_index follows seed order unless the
// continuity is listed in SORT_BY_YEAR). Every in-universe value cites `src` pages:
// a Wikipedia title, or "<fandom-prefix>:Page" (see srcUrl in universe.ts).
import type { CanonTier, TitleType } from '../../src/domain/schema.ts';

export type Conf = 'stated' | 'inferred' | 'disputed';
export type Prec = 'exact' | 'year' | 'approx' | 'range' | 'relative';
export interface SeedIU { y?: number; m?: number; y2?: number; label: string; precision: Prec; confidence: Conf; note: string; src: string[] }
export interface SeedUnit {
  key: string; label: string; season?: number; relTitle?: string; episodes?: number; pages?: number;
  branch?: string; tier?: CanonTier; platform?: string; iu: SeedIU; grp?: Record<string, string>;
  rel?: { date: string | null; end?: string | null; note?: string; src: string }; notes?: string;
}
export interface SeedTitle {
  id: string; title: string; type: TitleType; wiki: string; continuity: string; studio: string; label?: string; platform: string;
  tier?: CanonTier; chars?: string[]; teams?: string[]; units: SeedUnit[]; links?: { to: string; kind: string; note?: string }[];
  notes?: string; constituents?: string[]; extra_sources?: string[];
}

export const R = (label: string, note: string, src: string[], confidence: Conf = 'inferred'): SeedIU => ({ label, precision: 'relative', confidence, note, src });
export const Y = (y: number, label: string, confidence: Conf, note: string, src: string[], y2?: number, precision?: Prec): SeedIU =>
  ({ y, y2, label, confidence, note, src, precision: precision ?? (y2 !== undefined && y2 !== y ? 'range' : 'year') });
export const UNRELEASED = (note: string, src: string[]) => R('Not yet placed (unreleased)', note, src, 'disputed');
export const seasons = (n: number, iu: (s: number) => SeedIU, extra: (s: number) => Partial<SeedUnit> = () => ({})): SeedUnit[] =>
  Array.from({ length: n }, (_, i) => ({ key: `s${i + 1}`, label: `Season ${i + 1}`, season: i + 1, iu: iu(i + 1), ...extra(i + 1) }));
/** Single-unit title (film, novel, special…). */
export const single = (o: Omit<SeedTitle, 'units'> & { unitLabel: string; iu: SeedIU; grp?: Record<string, string>; unitBranch?: string; relTitle?: string; pages?: number; rel?: SeedUnit['rel']; unitNotes?: string }): SeedTitle => {
  const { unitLabel, iu, grp, unitBranch, relTitle, pages, rel, unitNotes, ...t } = o;
  return { ...t, units: [{ key: '', label: unitLabel, iu, grp, branch: unitBranch, relTitle, pages, rel, notes: unitNotes }] };
};
