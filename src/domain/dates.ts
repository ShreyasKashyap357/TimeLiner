// Calendar-aware formatting. Calendars are per continuity and never compared across continuities.
import type { Continuity, PartialDate } from './schema.ts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Running-count year → [age index, year within that age] for an 'ages' calendar. */
export function ageOf(y: number, ages: { length: number | null }[]): [number, number] {
  let start = 1;
  for (let i = 0; i < ages.length; i++) {
    const len = ages[i]!.length;
    if (len === null || y < start + len) return [i, y - start + 1];
    start += len;
  }
  return [ages.length - 1, y - start + 1];
}

export function formatYear(y: number, cal: Continuity['calendar']): string {
  if (cal.kind === 'ages') {
    const [i, yy] = ageOf(y, cal.ages);
    return `${cal.ages[i]!.label} ${yy}`;
  }
  if (cal.kind === 'era') {
    if (y < 0 || (!cal.has_year_zero && y === 0)) return `${Math.abs(y)} ${cal.before_label}`;
    return `${y} ${cal.after_label}`;
  }
  return y < 0 ? `${Math.abs(y)} BC` : String(y);
}

export function formatPartial(d: PartialDate, cal: Continuity['calendar']): string {
  const y = formatYear(d.y, cal);
  if (d.m && d.d) return `${MONTHS[d.m - 1]} ${d.d}, ${y}`;
  if (d.m) return `${MONTHS[d.m - 1]} ${y}`;
  return y;
}

/** Continuous numeric position for plotting (year + fraction). */
export function partialToNumber(d: PartialDate): number {
  return d.y + ((d.m ?? 1) - 1) / 12 + ((d.d ?? 1) - 1) / 365;
}

/** ISO (yyyy, yyyy-mm, yyyy-mm-dd) to a human release label. */
export function formatRelease(iso: string | null): string {
  if (!iso) return 'TBA';
  const [y, m, d] = iso.split('-');
  if (!m) return y!;
  if (!d) return `${MONTHS[Number(m) - 1]} ${y}`;
  return `${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`;
}

export function isoToNumber(iso: string | null): number | null {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  return partialToNumber({ y: y!, m: m || undefined, d: d || undefined });
}
