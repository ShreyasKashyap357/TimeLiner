// Pure helpers for scripts/fetch/film-stats.ts (R-56): read runtime, budget and gross from an English Wikipedia
// film infobox, and pick values from Wikidata statements. No network here, so tests can use it directly.

export interface ParsedMoney { low: number; high: number | null; currency: string; text: string }

/** Raw value of an infobox field (`| name = …`), up to the next top-level `|` or the infobox's closing `}}`. */
export function infoboxField(wikitext: string, name: string): string | null {
  const lead = wikitext.split(/\n==[^=]/)[0] ?? '';
  const m = new RegExp(`\\n\\s*\\|\\s*${name}\\s*=`, 'i').exec(lead);
  if (!m) return null;
  let i = m.index + m[0].length;
  let depth = 0; // {{ }} and [[ ]] nesting
  const start = i;
  for (; i < lead.length; i++) {
    const two = lead.slice(i, i + 2);
    if (two === '{{' || two === '[[') { depth++; i++; continue; }
    if (two === '}}' || two === ']]') { if (depth === 0) break; depth--; i++; continue; }
    if (lead[i] === '|' && depth === 0) break;
  }
  const v = lead.slice(start, i).trim();
  return v || null;
}

/** Remove templates by name (case-insensitive), handling nesting. */
function dropTemplates(s: string, names: RegExp): string {
  let out = s;
  for (let guard = 0; guard < 50; guard++) {
    const m = new RegExp(`\\{\\{\\s*(?:${names.source})\\s*[|}]`, 'i').exec(out);
    if (!m) break;
    let depth = 0, j = m.index;
    for (; j < out.length; j++) {
      if (out.startsWith('{{', j)) { depth++; j++; } else if (out.startsWith('}}', j)) { depth--; j++; if (depth === 0) break; }
    }
    out = out.slice(0, m.index) + out.slice(j + 1);
  }
  return out;
}

const CURRENCY_TEMPLATES: Record<string, string> = { 'us\\$': '$', usd: 'US$', jpy: '¥', '¥': '¥', yen: '¥', gbp: '£', '£': '£', eur: '€', '€': '€', inr: '₹', cny: 'CN¥', rmb: 'CN¥', cad: 'CA$', aud: 'A$', hkd: 'HK$', krw: '₩' };

/** Infobox value → plain text lines (refs, footnotes and comments dropped; links and list templates unwrapped). */
export function cleanWikitext(v: string): string {
  let s = v.replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<ref[^>]*\/>/gi, '').replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, '');
  s = dropTemplates(s, /efn|efn-ua|efn-lr|sfn|sfnp|refn|r|cn|citation needed|better source needed|nbsp|dubious|clarify|when|according to whom|failed verification|ill/);
  for (const [k, sym] of Object.entries(CURRENCY_TEMPLATES)) s = s.replace(new RegExp(`\\{\\{\\s*${k}\\s*\\|\\s*([^{}|]*?)\\s*(?:\\|[^{}]*)?\\}\\}`, 'gi'), (_m, amount: string) => sym + amount);
  s = s.replace(/\{\{\s*abbr\s*\|([^{}|]*)\|[^{}]*\}\}/gi, '$1');
  s = dropTemplates(s, /estimation|inflation-fn|ref label/);
  s = s.replace(/\{\{\s*(?:duration)\s*\|([^{}]*)\}\}/gi, (_m, args: string) => {
    const a = Object.fromEntries(args.split('|').map((x) => x.split('=').map((y) => y.trim())).filter((x) => x.length === 2));
    const min = Number(a.h ?? 0) * 60 + Number(a.m ?? 0) + Number(a.s ?? 0) / 60;
    return min ? `${min} minutes` : '';
  });
  // List templates: one item per line.
  for (let guard = 0; guard < 10; guard++) {
    const before = s;
    s = s.replace(/\{\{\s*(?:plainlist|plain list|unbulleted list|ubl|flatlist|flat list|hlist|bulleted list|ublist)\s*\|([^{}]*)\}\}/gi, (_m, body: string) => body.split('|').filter((x) => !/^\s*\w+\s*=/.test(x)).join('\n'));
    s = s.replace(/\{\{\s*(?:nowrap|nobr|small|nobold|no wrap)\s*\|([^{}]*)\}\}/gi, '$1');
    if (s === before) break;
  }
  s = s.replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1')
    .replace(/'''?/g, '').replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '')
    .replace(/&nbsp;|&#160;/g, ' ').replace(/&ndash;/g, '–').replace(/&mdash;/g, '—')
    .replace(/^\s*[*#]\s*/gm, '')
    .replace(/\(\s*[;,]?\s*\)/g, '').replace(/\(\s*[;,]\s*/g, '(');
  return s.split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean).join('\n');
}

/** First runtime in minutes ("143 minutes", "2 hours 23 minutes", "{{Duration|m=143}}"). */
export function parseRuntime(text: string): number | null {
  const hm = /(\d+)\s*(?:hours?|hrs?|h)\s*(?:and\s*)?(\d+)\s*(?:minutes?|mins?|m)\b/i.exec(text);
  const m = /(\d+(?:\.\d+)?)\s*(?:minutes?|mins?\.?)(?![a-z])/i.exec(text);
  if (hm && (!m || hm.index <= m.index)) return Number(hm[1]) * 60 + Number(hm[2]);
  return m ? Number(m[1]) : null;
}

const PREFIXES: [RegExp, string][] = [
  [/^(?:US\$|USD\s?|U\.S\.\s?\$)/, 'USD'], [/^(?:CA\$|C\$|CAD\s?)/, 'CAD'], [/^(?:A\$|AU\$|AUD\s?)/, 'AUD'], [/^(?:HK\$|HKD\s?)/, 'HKD'],
  [/^(?:NZ\$|NZD\s?)/, 'NZD'], [/^(?:NT\$|TWD\s?)/, 'TWD'], [/^(?:R\$|BRL\s?)/, 'BRL'], [/^(?:CN¥|RMB\s?|CNY\s?|元)/, 'CNY'], [/^(?:JP¥|JPY\s?)/, 'JPY'],
  [/^\$/, 'USD'], [/^(?:£|GBP\s?)/, 'GBP'], [/^(?:€|EUR\s?)/, 'EUR'], [/^¥/, 'JPY'], [/^(?:₹|Rs\.?\s?|INR\s?)/, 'INR'], [/^(?:₩|KRW\s?)/, 'KRW'],
];
const PREFIX_RE = /(?:US\$|U\.S\.\s?\$|USD\s?|CA\$|C\$|CAD\s?|A\$|AU\$|AUD\s?|HK\$|HKD\s?|NZ\$|NZD\s?|NT\$|TWD\s?|R\$|BRL\s?|CN¥|JP¥|RMB\s?|CNY\s?|JPY\s?|\$|£|GBP\s?|€|EUR\s?|¥|₹|Rs\.?\s?|INR\s?|₩|KRW\s?)/;
const SCALE: Record<string, number> = { thousand: 1e3, million: 1e6, mn: 1e6, m: 1e6, billion: 1e9, bn: 1e9, b: 1e9, lakh: 1e5, crore: 1e7 };
const SCALE_RE = '(?:\\s*(thousand|million|mn|billion|bn|lakh|crore|m|b)\\b)?';
const NUM = '(\\d[\\d,]*(?:\\.\\d+)?)';
const MONEY_RE = new RegExp(`(${PREFIX_RE.source})\\s*${NUM}${SCALE_RE}(?:\\s*(?:–|—|-|to)\\s*(?:${PREFIX_RE.source})?\\s*${NUM}${SCALE_RE})?`, 'gi');

/** Every money expression in a cleaned infobox value, in order. Ranges keep both ends. */
export function parseMoneyAll(text: string): (ParsedMoney & { line: string })[] {
  const out: (ParsedMoney & { line: string })[] = [];
  for (const line of text.split('\n')) {
    for (const m of line.matchAll(MONEY_RE)) {
      const [whole, prefix, n1, s1, n2, s2] = m;
      const currency = PREFIXES.find(([re]) => re.test(prefix!))?.[1];
      if (!currency) continue;
      const num = (n: string) => Number(n.replace(/,/g, ''));
      const lowScale = SCALE[(s1 ?? s2 ?? '').toLowerCase()] ?? 1;
      const low = num(n1!) * lowScale;
      const high = n2 ? num(n2) * (SCALE[(s2 ?? s1 ?? '').toLowerCase()] ?? 1) : null;
      if (!Number.isFinite(low) || low <= 0) continue;
      out.push({ low: round(low), high: high !== null && high > low ? round(high) : null, currency, text: whole!.trim(), line });
    }
  }
  return out;
}
const round = (n: number) => Math.round(n * 100) / 100;

/** Infobox `gross` lines that are not a box-office gross (distributor rentals, home-video sales, admissions). */
export const notGross = (line: string) => /rental|dvd|blu-?ray|home (?:video|media)|video sales|tickets|admissions/i.test(line);

export type Scope = 'worldwide' | 'domestic' | 'other';
/** Scope of a box-office line from its own wording. The infobox `gross` field is the worldwide gross by
 *  convention (Template:Infobox film), so an unlabelled figure counts as worldwide. */
export function grossScope(withMoney: string): Scope {
  const line = withMoney.replace(MONEY_RE, ''); // "US$" is a currency, not a market
  if (/worldwide|global|world-wide|total/i.test(line)) return 'worldwide';
  if (/domestic|north america|\bUS\b|U\.S\.|United States|Canada/i.test(line)) return 'domestic';
  const paren = /\(([^)]*)\)/.exec(line)?.[1];
  if (paren && !/est|approx|gross|original|re-?release|lifetime|includ|initial|combined|first run|\d{4}/i.test(paren)) return 'other';
  return 'worldwide';
}

// ---------- Wikidata ----------
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface WdQuantity { amount: number; lower: number | null; upper: number | null; unit: string; rank: string; place: string | null; time: string | null }
export const wdQuantities = (entity: any, pid: string): WdQuantity[] =>
  (entity?.claims?.[pid] ?? []).filter((c: any) => c.rank !== 'deprecated' && c.mainsnak?.datavalue?.value?.amount).map((c: any) => {
    const v = c.mainsnak.datavalue.value;
    return {
      amount: Number(v.amount), lower: v.lowerBound ? Number(v.lowerBound) : null, upper: v.upperBound ? Number(v.upperBound) : null,
      unit: String(v.unit).replace('http://www.wikidata.org/entity/', ''), rank: c.rank,
      place: c.qualifiers?.P3005?.[0]?.datavalue?.value?.id ?? null, time: c.qualifiers?.P585?.[0]?.datavalue?.value?.time ?? null,
    };
  });

const MINUTES_PER: Record<string, number> = { Q7727: 1, Q11574: 1 / 60, Q25235: 60 };
/** Runtime in minutes when Wikidata states one unambiguously (a single value, or a preferred one). */
export function wdRuntime(qs: WdQuantity[]): { value: number | null; candidates: number[] } {
  const all = qs.filter((q) => MINUTES_PER[q.unit]).map((q) => ({ ...q, min: Math.round(q.amount * MINUTES_PER[q.unit]! * 100) / 100 }));
  const candidates = [...new Set(all.map((q) => q.min))];
  const pref = all.filter((q) => q.rank === 'preferred');
  if (pref.length && new Set(pref.map((q) => q.min)).size === 1) return { value: pref[0]!.min, candidates };
  return { value: candidates.length === 1 ? candidates[0]! : null, candidates };
}

export const WORLDWIDE = 'Q13780930';
export const UNITED_STATES = 'Q30';
/** One quantity → money; Wikidata bounds count as a range only when they are a real spread (not ±1 precision). */
export function wdMoney(q: WdQuantity, iso: string): ParsedMoney {
  const ranged = q.lower !== null && q.upper !== null && q.upper - q.lower > 0.02 * q.amount;
  return ranged
    ? { low: q.lower!, high: q.upper!, currency: iso, text: `${q.lower}–${q.upper} ${iso}` }
    : { low: q.amount, high: null, currency: iso, text: `${q.amount} ${iso}` };
}
/** Latest statement first (by point in time), preferred rank breaking ties. */
export const latestFirst = (a: WdQuantity, b: WdQuantity) =>
  (b.time ?? '').localeCompare(a.time ?? '') || Number(b.rank === 'preferred') - Number(a.rank === 'preferred');
