// Pure parsers for TV viewership (R-56): Wikipedia {{Episode table}} / {{Episode list}} rows and the
// {{Series overview}} season-average column. No network here; scripts/fetch/tv-viewership.ts drives it.
import { cleanText, findTemplates, parseDateTemplate, stripNoise } from './wikitext.ts';

export interface ParsedEpisode { n: number; numbered: boolean; title: string; date: string | null; millions: number | null; raw: string }
export interface ParsedTable { measure: string | null; country: string | null; episodes: ParsedEpisode[]; caption: string }
export interface Section { heading: string; level: number; season: number | null; special: boolean; body: string }
export interface SeasonInfo {
  tables: ParsedTable[];
  /** Season article named by {{Main}}, {{:Transclusion}} or a {{Series overview}} link, if any. */
  seasonPage: string | null;
}
export interface OverviewAverage { season: number; value: number; header: string }

const WORDS: Record<string, number> = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12 };

/** Season number named by a heading such as "Season 1 (2012–13)", "Series 4", "Season Two: Rebirth". */
export function seasonOfHeading(text: string): number | null {
  const m = /^\s*(?:season|series)\s+(\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\b/i.exec(text);
  if (!m) return null;
  const v = m[1]!.toLowerCase();
  return /^\d+$/.test(v) ? Number(v) : WORDS[v]!;
}

/** The page as it renders on its own: <includeonly> content is dropped (it only shows when transcluded). */
export function ownView(wikitext: string): string {
  return stripNoise(wikitext.replace(/<includeonly>[\s\S]*?<\/includeonly>/g, ''));
}

/** Split a page into heading sections; sub-sections inherit the season of their parent heading. */
export function sections(wikitext: string): Section[] {
  const src = ownView(wikitext);
  const out: Section[] = [];
  const re = /^(={2,5})\s*(.+?)\s*\1\s*$/gm;
  const heads: { level: number; text: string; start: number; end: number }[] = [];
  for (const m of src.matchAll(re)) heads.push({ level: m[1]!.length, text: cleanText(m[2]!), start: m.index!, end: m.index! + m[0].length });
  out.push({ heading: '', level: 1, season: null, special: false, body: src.slice(0, heads[0]?.start ?? src.length) });
  const stack: { level: number; season: number | null; special: boolean }[] = [];
  heads.forEach((h, i) => {
    while (stack.length && stack[stack.length - 1]!.level >= h.level) stack.pop();
    const parent = stack[stack.length - 1];
    const own = seasonOfHeading(h.text);
    const special = /special|short|webisode|pilot|minisode|unaired|web series|digital/i.test(h.text) || (parent?.special ?? false);
    const season = own ?? (special ? null : parent?.season ?? null);
    stack.push({ level: h.level, season, special });
    out.push({ heading: h.text, level: h.level, season, special, body: src.slice(h.end, heads[i + 1]?.start ?? src.length) });
  });
  return out;
}

/** Header text the Episode table module prints for its viewers column (Module:Episode table). */
export function viewersHeader(params: Record<string, string>): string | null {
  if (params.viewers === undefined && params.Viewers === undefined) return null;
  const custom = params.viewersT ?? params.ViewersT;
  if (custom) return cleanText(custom);
  const country = params.country ? cleanText(params.country) : '';
  const type = params.viewers_type === undefined ? 'millions' : params.viewers_type;
  return `${country ? `${country} viewers` : 'Viewers'}${type ? ` (${cleanText(type)})` : ''}`;
}

/** A viewers cell: plain number in millions, otherwise null ("N/A", "TBD", blank, unparseable). */
export function parseMillions(cell: string | undefined): number | null {
  if (!cell) return null;
  const t = cleanText(cell).replace(/ /g, ' ').trim();
  const m = /^(\d{1,3}(?:\.\d+)?)(?:\s*(?:million|m))?$/i.exec(t);
  return m ? Number(m[1]) : null;
}

const TABLE_RE = /^(?:#invoke:\s*)?Episode table$/i;
const ROW_RE = /^(?:#invoke:\s*)?Episode list(?:\/sublist)?$/i;

/** One {{Episode list}} row; multi-part rows (NumParts, e.g. classic Doctor Who serials) expand to one entry per part. */
function rowEpisodes(p: Record<string, string>, index: number, withViewers: boolean): ParsedEpisode[] {
  const parts = Number(cleanText(p.NumParts ?? '')) || 1;
  const base = cleanText(p.Title ?? p.RTitle ?? p.AltTitle ?? '').replace(/^"|"$/g, '');
  const out: ParsedEpisode[] = [];
  for (let k = 1; k <= parts; k++) {
    const get = (key: string) => (parts > 1 ? p[`${key}_${k}`] ?? p[key] : p[key]);
    const own = /^(\d+)/.exec(cleanText(p.EpisodeNumber2 ?? ''));
    const m = /^(\d+)/.exec(cleanText((parts > 1 ? p[`EpisodeNumber2_${k}`] : p.EpisodeNumber2) ?? ''));
    const partTitle = parts > 1 ? cleanText(p[`Aux1_${k}`] ?? '').replace(/^"|"$/g, '') : '';
    out.push({
      n: m ? Number(m[1]) : index + k,
      numbered: !!(m ?? own),
      title: parts > 1 ? (partTitle ? `${base}: ${partTitle}` : `${base} (part ${k})`) : base,
      date: parseDateTemplate(get('OriginalAirDate')),
      millions: withViewers ? parseMillions(get('Viewers')) : null,
      raw: withViewers ? cleanText(get('Viewers') ?? '') : '',
    });
  }
  return out;
}

/** Parse one {{Episode table}}. `rowsSrc` holds the rows when the table is left open (dontclose=y). */
export function parseEpisodeTable(raw: string, rowsSrc?: string): ParsedTable {
  const [t] = findTemplates(raw, TABLE_RE);
  const params = t?.params ?? {};
  const header = viewersHeader(params);
  const rows = findTemplates(params.episodes ?? rowsSrc ?? '', ROW_RE).filter((r) => r.params.Serial !== undefined || r.params.EpisodeNumber !== undefined || r.params.Title !== undefined || r.params.EpisodeNumber2 !== undefined || r.params.NumParts !== undefined);
  const episodes: ParsedEpisode[] = [];
  for (const r of rows) episodes.push(...rowEpisodes(r.params, episodes.length, !!header));
  const country = params.country ? cleanText(params.country) : null;
  return { measure: header, country, episodes, caption: cleanText(params.caption ?? '') };
}

/** Episode tables and season-article pointers per season number for one page. key 0 = page-level (no season heading). */
export function seasonsOfPage(wikitext: string): Map<number, SeasonInfo> {
  const out = new Map<number, SeasonInfo>();
  for (const s of sections(wikitext)) {
    if (s.special) continue;
    const key = s.season ?? 0;
    const info = out.get(key) ?? { tables: [], seasonPage: null };
    const tables = findTemplates(s.body, TABLE_RE);
    tables.forEach((t, i) => {
      const open = /\|\s*dontclose\s*=\s*y/i.test(t.raw) || t.params.episodes === undefined;
      info.tables.push(parseEpisodeTable(t.raw, open ? s.body.slice(t.offset + t.raw.length, tables[i + 1]?.offset ?? s.body.length) : undefined));
    });
    if (key && !info.seasonPage) {
      const main = findTemplates(s.body, /^(Main|Main article|Further)$/i)[0];
      const target = main ? cleanText((main.params['1'] ?? '').replace(/\{\{!\}\}.*$/, '')) : null;
      const transclusion = /\{\{\s*:\s*([^{}|]+?)\s*\}\}/.exec(s.body)?.[1] ?? null;
      const pick = transclusion ?? target;
      if (pick && /season|series/i.test(pick)) info.seasonPage = pick;
    }
    out.set(key, info);
  }
  return out;
}

/** Season-average column of {{Series overview}} (e.g. "Average viewers (in millions)") and season links. */
export function overview(wikitext: string): { averages: OverviewAverage[]; links: Map<number, string> } {
  const averages: OverviewAverage[] = [];
  const links = new Map<number, string>();
  for (const t of findTemplates(ownView(wikitext), /^Series overview$/i)) {
    const p = t.params;
    for (const [k, v] of Object.entries(p)) {
      const m = /^link(\d+)$/.exec(k);
      if (!m) continue;
      const target = cleanText(v).split('#')[0]!.trim();
      if (target && /season|series/i.test(target)) links.set(Number(m[1]), target);
    }
    for (const col of ['infoA', 'infoB', 'infoC', 'infoD']) {
      const header = p[col] ? cleanText(p[col]!) : '';
      if (!/av(?:era)?g/i.test(header) || !/viewers/i.test(header) || !/million/i.test(header)) continue;
      for (const [k, v] of Object.entries(p)) {
        const m = new RegExp(`^${col}(\\d+)$`).exec(k);
        if (!m) continue;
        const season = Number(m[1]);
        const label = p[`linkT${season}`];
        if (label && !new RegExp(`\\b${season}\\b`).test(cleanText(label))) continue;
        const value = parseMillions(v);
        if (value !== null) averages.push({ season, value, header });
      }
    }
  }
  return { averages, links };
}

/** First "List of … episodes" article named by the page ({{Main}} or a link), if any. */
export function episodeListLink(wikitext: string): string | null {
  const src = stripNoise(wikitext);
  for (const t of findTemplates(src, /^(Main|Main article|See also|Further)$/i)) {
    for (const v of Object.values(t.params)) {
      const target = v.replace(/\{\{!\}\}.*$/, '').trim();
      if (/^List of .+ episodes$/i.test(target)) return target;
    }
  }
  const m = /\[\[(List of [^\]|#]+ episodes)(?:[|#][^\]]*)?\]\]/i.exec(src);
  return m ? m[1]!.trim() : null;
}

export function mean(values: number[]): number {
  return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 100) / 100;
}
