// Display formatting for film stats (R-56): runtimes and compact money figures. Pure; unit-tested.
import type { Money } from './schema.ts';

/** 143 → "2 h 23 min"; 45 → "45 min"; 120 → "2 h". */
export function formatRuntime(min: number): string {
  const total = Math.round(min);
  const h = Math.floor(total / 60), m = total % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** "$", "¥", "£", "CA$"; an unknown or letter-only symbol becomes "ARS " (with a space). */
const symbol = (currency: string) => {
  try {
    const s = new Intl.NumberFormat('en-US', { style: 'currency', currency }).formatToParts(1).find((p) => p.type === 'currency')?.value ?? currency;
    return /[A-Z]$/i.test(s) ? `${s} ` : s;
  } catch {
    return `${currency} `;
  }
};
// Intl's compact currency style only has short forms ("$2.8B"), so the long scale word comes from plain compact notation.
const compact = (n: number, currency: string) =>
  symbol(currency) + new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'long', maximumFractionDigits: n >= 1e6 && n < 1e7 ? 2 : 1 }).format(n);

/** "$2.8 billion", "$150–200 million", "¥1.5 billion", "$900 million – $1.2 billion". A range is never collapsed. */
export function formatMoney(m: Pick<Money, 'low' | 'high' | 'currency'>): string {
  const lo = compact(m.low, m.currency);
  if (m.high === null || m.high === undefined || m.high === m.low) return lo;
  const hi = compact(m.high, m.currency);
  // Share the currency sign and the scale word when both ends have them: "$150 million" + "$200 million" → "$150–200 million".
  const split = (s: string) => /^(\D*?)([\d.,]+)(\D*)$/.exec(s);
  const a = split(lo), b = split(hi);
  if (a && b && a[1] === b[1] && a[3] === b[3]) return `${a[1]}${a[2]}–${b[2]}${a[3]}`;
  return `${lo} – ${hi}`;
}

export const scopeLabel = (s: Money['scope']) => ({ worldwide: 'Worldwide gross', domestic: 'Domestic gross only', other: 'Gross for one market or of unstated scope' } as const)[s];
