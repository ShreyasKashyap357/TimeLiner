// Generic extractors over cached wikitext. Universe-specific scripts compose these.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { SOURCES_DIR, slugify } from '../fetch/mediawiki.ts';
import { cleanText, findTemplates, firstLinkTarget, parseDateTemplate, stripNoise } from './wikitext.ts';

export async function loadWikitext(title: string, site = 'wikipedia'): Promise<string> {
  return readFile(path.join(SOURCES_DIR, site, `${slugify(title)}.wikitext`), 'utf8');
}

export interface ReleaseRow {
  source_page: string;
  kind: 'film' | 'season' | 'special';
  title: string; // display title (series name for seasons)
  link: string | null; // wiki link target of the work (series article for seasons)
  season?: number;
  season_link?: string | null;
  episodes?: number | null;
  start: string | null; // ISO (possibly partial)
  end?: string | null;
  status_text?: string | null;
  label?: string | null; // infoA column (production label) when present
}

/** {{Film overview}}: title1/date1/status1 ... */
export function extractFilmOverview(src: string, page: string): ReleaseRow[] {
  const out: ReleaseRow[] = [];
  for (const t of findTemplates(stripNoise(src), /^Film overview$/i)) {
    for (let n = 1; n < 100; n++) {
      const raw = t.params[`title${n}`];
      if (raw === undefined) continue;
      out.push({
        source_page: page,
        kind: 'film',
        title: cleanText(raw),
        link: firstLinkTarget(raw),
        start: parseDateTemplate(t.params[`date${n}`]),
        status_text: t.params[`status${n}`] ? cleanText(t.params[`status${n}`]!) : null,
      });
    }
  }
  return out;
}

/** {{Series overview}} with `series=` (multiseries tables): one row per season index. */
export function extractSeriesOverview(src: string, page: string, fallbackSeries?: string): ReleaseRow[] {
  const out: ReleaseRow[] = [];
  for (const t of findTemplates(stripNoise(src), /^\^?\|?Series overview$/i)) {
    const seriesRaw = t.params['series'] ?? (fallbackSeries ? `[[${fallbackSeries}]]` : undefined);
    if (!seriesRaw) continue;
    for (let n = 1; n < 40; n++) {
      const start = t.params[`start${n}`] ?? t.params[`released${n}`];
      const eps = t.params[`episodes${n}`];
      if (start === undefined && eps === undefined) continue;
      out.push({
        source_page: page,
        kind: 'season',
        title: cleanText(seriesRaw),
        link: firstLinkTarget(seriesRaw),
        season: n,
        season_link: t.params[`link${n}`]?.trim() || null,
        episodes: eps && /^\d+$/.test(cleanText(eps)) ? Number(cleanText(eps)) : null,
        start: parseDateTemplate(start),
        end: parseDateTemplate(t.params[`end${n}`]) ?? null,
        status_text: start && !parseDateTemplate(start) ? cleanText(start) : null,
        label: t.params[`infoA${n}`] ? cleanText(t.params[`infoA${n}`]!) || null : null,
      });
    }
  }
  return out;
}

/** Wikitable rows of the form `! scope="row" | ''[[Title]]''` followed by a date cell. */
export function extractRowHeaderTable(src: string, page: string, kind: ReleaseRow['kind'], sectionName?: string): ReleaseRow[] {
  let s = stripNoise(src);
  if (sectionName) {
    const m = new RegExp(`<section begin="?${sectionName}"?\\s*/>([\\s\\S]*?)<section end="?${sectionName}"?\\s*/>`).exec(s);
    if (!m) return [];
    s = m[1]!;
  }
  const out: ReleaseRow[] = [];
  const rows = s.split(/\n\|-/);
  for (const row of rows) {
    const h = /^!\s*scope="row"[^|]*\|\s*(.+)$/m.exec(row);
    if (!h) continue;
    const date = parseDateTemplate(row.slice(h.index + h[0].length)) ?? null;
    out.push({ source_page: page, kind, title: cleanText(h[1]!), link: firstLinkTarget(h[1]!), start: date });
  }
  return out;
}

export interface TimelineRow {
  year_label: string;
  is_break: boolean;
  items: { text: string; link: string | null; multiverse: boolean; footnote: string | null }[];
}

/** {{Marvel Cinematic Universe timeline/row}}-style rows. Template name is passed in (data-driven). */
export function extractTimelineRows(src: string, rowTemplate: RegExp): TimelineRow[] {
  const clean = src.replace(/<!--[\s\S]*?-->/g, '').replace(/<ref[^>]*\/>/g, '').replace(/<ref[^>]*>[\s\S]*?<\/ref>/g, '');
  return findTemplates(clean, rowTemplate).map((t) => {
    const items: TimelineRow['items'] = [];
    for (let i = 1; t.params[String(i)] !== undefined; i++) {
      const raw = t.params[String(i)]!;
      const efn = findTemplates(raw, /^efn$/i)[0];
      items.push({
        text: cleanText(raw),
        link: firstLinkTarget(raw),
        multiverse: (t.params[`${i}_multiverse`] ?? '').trim() === 'y',
        footnote: efn ? cleanText(efn.params['1'] ?? '') : null,
      });
    }
    return { year_label: cleanText(t.params['year'] ?? ''), is_break: (t.params['break'] ?? '').trim() === 'y', items };
  });
}

/** Numbered list ("# item") inside a section whose heading matches. */
export function extractNumberedList(src: string, headingRe: RegExp): string[] {
  const s = stripNoise(src);
  const lines = s.split('\n');
  const start = lines.findIndex((l) => /^=+/.test(l) && headingRe.test(l));
  if (start < 0) return [];
  const out: string[] = [];
  for (let i = start + 1; i < lines.length && !/^=+[^=]/.test(lines[i]!); i++) {
    const m = /^#\s*(.+)$/.exec(lines[i]!);
    if (m) out.push(cleanText(m[1]!));
  }
  return out;
}

/** Wikitable whose row headers are labels (e.g. dates) and whose first data cell lists works. */
export function extractLabelledRows(src: string, headingRe: RegExp): { label: string; works: { text: string; note: string | null }[] }[] {
  const lines = src.split('\n');
  const start = lines.findIndex((l) => /^=+/.test(l) && headingRe.test(l));
  if (start < 0) return [];
  let end = lines.findIndex((l, i) => i > start && /^=+[^=]/.test(l));
  if (end < 0) end = lines.length;
  const block = lines.slice(start + 1, end).join('\n').split(/\n\|\}/)[0]!;
  const out: { label: string; works: { text: string; note: string | null }[] }[] = [];
  for (const row of block.split(/\n\|-/)) {
    const h = /^!\s*scope="row"[^|]*\|\s*(.+)$/m.exec(row);
    if (!h) continue;
    const cell = row.slice(h.index + h[0].length).replace(/^\s*\|\s*/, '');
    const rawWorks = cell.replace(/\{\{rp\|[^}]*\}\}/g, '').split(/,\s*(?=''|\[\[)|\s+&\s+(?='')/);
    const works = rawWorks.map((w) => {
      const note = /<!--([\s\S]*?)-->/.exec(w)?.[1]?.trim() ?? null;
      return { text: cleanText(w), note };
    }).filter((w) => w.text);
    out.push({ label: cleanText(h[1]!), works });
  }
  return out;
}

/** First {{Infobox ...}} params, cleaned. Dates parsed where they look like date templates. */
export function extractInfobox(src: string): Record<string, string> {
  const t = findTemplates(stripNoise(src), /^Infobox\b/i)[0];
  if (!t) return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(t.params)) {
    const d = /\{\{\s*(Start date|End date|Film date)/i.test(v) ? parseDateTemplate(v) : null;
    out[k] = d ?? cleanText(v);
  }
  return out;
}

/** Wikitable where the work is in the FIRST DATA CELL (not a row header) and the date in the next cell.
 *  `! colspan=…` rows are treated as group headers (e.g. story arcs). */
export function extractFirstCellTable(src: string, headingRe: RegExp, page: string): (ReleaseRow & { group: string | null })[] {
  const lines = stripNoise(src).split('\n');
  const start = lines.findIndex((l) => /^=+/.test(l) && headingRe.test(l));
  if (start < 0) return [];
  let end = lines.findIndex((l, i) => i > start && /^=+[^=]/.test(l));
  if (end < 0) end = lines.length;
  const block = lines.slice(start + 1, end).join('\n').split(/\n\|\}/)[0]!;
  const out: (ReleaseRow & { group: string | null })[] = [];
  let group: string | null = null;
  for (const row of block.split(/\n\|-/)) {
    const hdr = /^\s*!\s*colspan="?\d+"?\s*\|\s*(.+)$/m.exec(row);
    if (hdr) { group = cleanText(hdr[1]!); continue; }
    const cells = row.split('\n').filter((l) => l.startsWith('|') && !l.startsWith('|-') && !l.startsWith('|}') && !l.startsWith('|+'))
      .map((l) => l.replace(/^\|\s*(?:[^|[{]*?\|(?!\|))?/, ''));
    if (cells.length < 2) continue;
    const title = cells[0]!;
    if (!/\[\[|''/.test(title)) continue;
    out.push({ source_page: page, kind: 'film', title: cleanText(title), link: firstLinkTarget(title), start: parseDateTemplate(cells[1]), group });
  }
  return out;
}
