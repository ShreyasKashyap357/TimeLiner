// Usage: tsx scripts/fetch/tv-viewership.ts [--offline] [title-id…]
// R-56: viewers per episode and per season for TV series, from English Wikipedia episode tables
// ({{Episode table}} viewers column) and the {{Series overview}} season-average column.
// Raw wikitext is cached (uncommitted) in data/sources/tv-viewership-raw/; the parsed result, with the
// revision id of every page used, goes to data/sources/tv-viewership.json keyed by unit id (committed).
// scripts/migrations/2026-11-27-tv-viewership.ts writes it into data/*/titles.json.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { getJson, politePause } from './http.ts';
import { SOURCES_DIR, WIKIPEDIA, slugify } from './mediawiki.ts';
import { TitlesFile, UniversesFile, type Title, type Unit } from '../../src/domain/schema.ts';
import { episodeListLink, mean, overview, seasonsOfPage, type ParsedEpisode, type ParsedTable, type SeasonInfo } from '../build/viewership.ts';

const RAW_DIR = path.join(SOURCES_DIR, 'tv-viewership-raw');
export const CACHE_FILE = path.join(SOURCES_DIR, 'tv-viewership.json');
const SERIES_TYPES = new Set(['series', 'animated-series']);
const offline = process.argv.includes('--offline');
const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));

interface Page { title: string; revid: number; wikitext: string }
export interface CachedViewership {
  title_id: string;
  universe: string;
  page: { title: string; revid: number };
  average_page: { title: string; revid: number } | null;
  viewership: {
    measure: string;
    country: string | null;
    episodes: { n: number; title: string; date: string | null; millions: number | null }[];
    season_average: number | null;
    season_average_kind: 'stated' | 'computed' | null;
    source_url: string;
    average_source_url: string | null;
    note: string;
  };
}

const pageCache = new Map<string, Page | null>();
async function page(title: string): Promise<Page | null> {
  if (pageCache.has(title)) return pageCache.get(title)!;
  const file = path.join(RAW_DIR, `${slugify(title)}.json`);
  let p: Page | null = null;
  try {
    const cached = JSON.parse(await readFile(file, 'utf8'));
    p = cached.missing ? null : cached;
  } catch {
    if (offline) { pageCache.set(title, null); return null; }
    const q = new URLSearchParams({ action: 'parse', page: title, prop: 'wikitext|revid', redirects: '1', format: 'json', formatversion: '2' });
    const data = await getJson<{ parse?: { title: string; revid: number; wikitext: string } }>(`${WIKIPEDIA.api}?${q}`);
    await politePause(1000);
    p = data.parse ? { title: data.parse.title, revid: data.parse.revid, wikitext: data.parse.wikitext } : null;
    await mkdir(RAW_DIR, { recursive: true });
    await writeFile(file, JSON.stringify(p ?? { missing: true, requested: title }), 'utf8');
  }
  pageCache.set(title, p);
  return p;
}

const wikiUrl = (title: string) => WIKIPEDIA.pageBase + encodeURIComponent(title.replace(/ /g, '_'));

interface Candidate { page: Page; tables: ParsedTable[] }

/** Pick the episode rows for `count` episodes from the candidates (first that has a viewers column and fits). */
function choose(cands: Candidate[], expected: number | null, slice: [number, number] | null, seasonTotal: number | null): { page: Page; table: ParsedTable; episodes: ParsedEpisode[] } | string {
  const reasons: string[] = [];
  for (const c of cands) {
    const withViewers = c.tables.filter((t) => t.measure && t.episodes.length);
    if (!withViewers.length) { reasons.push(`${c.page.title}: no viewers column`); continue; }
    const options: ParsedTable[] = [withViewers[0]!];
    if (withViewers.length > 1 && withViewers.every((t) => t.measure === withViewers[0]!.measure)) {
      options.push({ ...withViewers[0]!, episodes: withViewers.flatMap((t) => t.episodes) });
    }
    // Rows without a number in the season (e.g. a Christmas special inside a series table) are kept apart in the data.
    for (const o of [...options]) if (o.episodes.some((e) => !e.numbered)) options.push({ ...o, episodes: o.episodes.filter((e) => e.numbered) });
    for (const t of options) {
      let eps = t.episodes;
      if (slice && seasonTotal !== null && eps.length !== seasonTotal) { reasons.push(`${c.page.title}: ${eps.length} rows, split entries expect ${seasonTotal}`); continue; }
      if (slice) eps = eps.slice(slice[0], slice[1]);
      else if (expected !== null && eps.length !== expected) { reasons.push(`${c.page.title}: ${eps.length} rows, expected ${expected}`); continue; }
      if (slice && eps.length !== slice[1] - slice[0]) { reasons.push(`${c.page.title}: slice out of range`); continue; }
      if (!eps.some((e) => e.millions !== null)) { reasons.push(`${c.page.title}: no figures`); continue; }
      return { page: c.page, table: t, episodes: eps };
    }
  }
  return reasons.join('; ') || 'no episode tables';
}

async function main() {
  const universes = UniversesFile.parse(JSON.parse(await readFile('data/universes.json', 'utf8')));
  let previous: { units: Record<string, CachedViewership> } = { units: {} };
  try { previous = JSON.parse(await readFile(CACHE_FILE, 'utf8')); } catch { /* first run */ }
  const units: Record<string, CachedViewership> = only.length ? previous.units : {};
  const skipped: Record<string, string> = only.length ? { ...((previous as { skipped?: Record<string, string> }).skipped ?? {}) } : {};
  const all: { uni: string; t: Title }[] = [];
  for (const u of universes) {
    const titles = TitlesFile.parse(JSON.parse(await readFile(`data/${u.data_dir}/titles.json`, 'utf8')));
    for (const t of titles) if (SERIES_TYPES.has(t.type)) all.push({ uni: u.id, t });
  }
  const enwikiUse = new Map<string, number>();
  for (const { t } of all) if (t.external_ids.enwiki) enwikiUse.set(t.external_ids.enwiki, (enwikiUse.get(t.external_ids.enwiki) ?? 0) + 1);

  for (const { uni, t } of all) {
    if (only.length && !only.includes(t.id)) continue;
    for (const k of Object.keys(units)) if (units[k]!.title_id === t.id) delete units[k];
    delete skipped[t.id];
    const enwiki = t.external_ids.enwiki;
    if (!enwiki) { skipped[t.id] = 'no English Wikipedia article'; continue; }
    const shared = (enwikiUse.get(enwiki) ?? 0) > 1;
    const main = await page(enwiki);
    if (!main) { skipped[t.id] = `article not found: ${enwiki}`; continue; }
    const pages: Page[] = [];
    const listTitle = episodeListLink(main.wikitext);
    if (listTitle && listTitle !== main.title) { const l = await page(listTitle); if (l) pages.push(l); }
    pages.push(main);
    const infos = pages.map((p) => ({ p, seasons: seasonsOfPage(p.wikitext), ov: overview(p.wikitext) }));

    const released = t.units.filter((u) => u.status === 'released');
    const bySeason = new Map<number, Unit[]>();
    for (const u of released) if (u.season !== null) bySeason.set(u.season, [...(bySeason.get(u.season) ?? []), u]);
    const reasons: string[] = [];

    const jobs: { unit: Unit; season: number | null; slice: [number, number] | null; total: number | null }[] = [];
    for (const [s, us] of bySeason) {
      if (us.length === 1 && !us[0]!.episode_range) { jobs.push({ unit: us[0]!, season: s, slice: null, total: null }); continue; }
      // Split seasons: explicit episode ranges, otherwise consecutive slices by episode_count in data order.
      let at = 0;
      const total = us.every((u) => !u.episode_range && u.episode_count) ? us.reduce((n, u) => n + u.episode_count!, 0) : null;
      for (const u of us) {
        if (u.episode_range && u.episode_range.from.season === s && u.episode_range.to.season === s) {
          jobs.push({ unit: u, season: s, slice: [u.episode_range.from.episode - 1, u.episode_range.to.episode], total: null });
        } else if (!u.episode_range && u.episode_count) {
          jobs.push({ unit: u, season: s, slice: [at, at + u.episode_count], total });
        } else reasons.push(`${u.id}: episode range spans seasons`);
        at += u.episode_count ?? 0;
      }
    }
    if (!shared && released.length === 1 && released[0]!.season === null) jobs.push({ unit: released[0]!, season: null, slice: null, total: null });
    for (const u of released) if (u.season === null && !(released.length === 1 && !shared)) reasons.push(`${u.id}: no season number`);

    for (const job of jobs) {
      const s = job.season;
      const cands: Candidate[] = [];
      if (s !== null) {
        const seasonTitle = infos.map((i) => i.seasons.get(s)?.seasonPage).find(Boolean) ?? infos.map((i) => i.ov.links.get(s)).find((l) => l && l !== main.title && !pages.some((p) => p.title === l));
        if (seasonTitle) {
          const sp = await page(seasonTitle);
          if (sp) {
            const si = seasonsOfPage(sp.wikitext);
            cands.push({ page: sp, tables: [...(si.get(0)?.tables ?? []), ...(si.get(s)?.tables ?? [])] });
          }
        }
        for (const i of infos) {
          const info = i.seasons.get(s);
          if (info?.tables.length) cands.push({ page: i.p, tables: info.tables });
        }
        // A single-season series whose article has no season headings.
        if (bySeason.size === 1 && s === 1) for (const i of infos) { const info = i.seasons.get(0); if (info?.tables.length) cands.push({ page: i.p, tables: info.tables }); }
      } else {
        for (const i of infos) {
          const page0 = i.seasons.get(0);
          if (page0?.tables.length) cands.push({ page: i.p, tables: page0.tables });
          const numbered = [...i.seasons.entries()].filter(([k]) => k > 0).sort((a, b) => a[0] - b[0]).map(([, v]) => v as SeasonInfo);
          const tables = numbered.flatMap((v) => v.tables.filter((tb) => tb.measure).slice(0, 1));
          if (tables.length && tables.every((tb) => tb.measure === tables[0]!.measure)) cands.push({ page: i.p, tables: [{ ...tables[0]!, episodes: tables.flatMap((tb) => tb.episodes) }] });
        }
      }
      const expected = job.unit.episode_count;
      const picked = choose(cands, expected, job.slice, job.total);
      const stated = s !== null && !job.slice ? infos.flatMap((i) => i.ov.averages.filter((a) => a.season === s).map((a) => ({ ...a, p: i.p })))[0] : undefined;
      if (typeof picked === 'string') {
        if (stated) {
          units[job.unit.id] = {
            title_id: t.id, universe: uni, page: { title: stated.p.title, revid: stated.p.revid }, average_page: null,
            viewership: { measure: stated.header, country: null, episodes: [], season_average: stated.value, season_average_kind: 'stated', source_url: wikiUrl(stated.p.title), average_source_url: null, note: `Season average from the "${stated.header}" column of the series overview; Wikipedia gives no per-episode figures for this season (${picked}).` },
          };
        } else reasons.push(`${job.unit.id}: ${picked}`);
        continue;
      }
      const { page: src, table, episodes } = picked;
      const relDate = job.unit.release.date;
      const firstDate = episodes[0]?.date;
      if (!job.slice && relDate && /^\d{4}-\d\d-\d\d$/.test(relDate) && firstDate && /^\d{4}-\d\d-\d\d$/.test(firstDate) && relDate !== firstDate) {
        reasons.push(`${job.unit.id}: first episode aired ${firstDate} but the unit's release date is ${relDate}`);
        continue;
      }
      const figures = episodes.map((e) => e.millions).filter((m): m is number => m !== null);
      const notes: string[] = [];
      const missing = episodes.length - figures.length;
      let average: number | null = null;
      let kind: 'stated' | 'computed' | null = null;
      if (stated) {
        average = stated.value; kind = 'stated';
        notes.push(`Season average from the "${stated.header}" column of the series overview in ${stated.p.title}.`);
      } else if (figures.length >= Math.ceil(episodes.length / 2)) {
        average = mean(figures); kind = 'computed';
        notes.push(`Wikipedia states no season average; this is the mean of ${missing ? `the ${figures.length} of ${episodes.length}` : `all ${figures.length}`} episode figures.`);
      }
      if (missing) notes.push(`${missing} episode${missing > 1 ? 's have' : ' has'} no figure in the source (shown as not available).`);
      if (job.slice) notes.push(`Episodes ${job.slice[0] + 1}–${job.slice[1]} of the season's table (this entry covers part of the season).`);
      if (expected === null) notes.push('Episode count not recorded for this entry, so the row count was not cross-checked.');
      units[job.unit.id] = {
        title_id: t.id, universe: uni,
        page: { title: src.title, revid: src.revid },
        average_page: stated && stated.p.title !== src.title ? { title: stated.p.title, revid: stated.p.revid } : null,
        viewership: {
          measure: table.measure!, country: table.country,
          episodes: episodes.map(({ n, title, date, millions }) => ({ n, title, date, millions })),
          season_average: average, season_average_kind: kind,
          source_url: wikiUrl(src.title),
          average_source_url: stated && stated.p.title !== src.title ? wikiUrl(stated.p.title) : null,
          note: notes.join(' '),
        },
      };
    }
    if (reasons.length) skipped[t.id] = reasons.join(' | ');
  }
  const sorted = Object.fromEntries(Object.entries(units).sort(([a], [b]) => a.localeCompare(b)));
  const sortedSkipped = Object.fromEntries(Object.entries(skipped).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(CACHE_FILE, JSON.stringify({ fetched_at: new Date().toISOString().slice(0, 10), license: WIKIPEDIA.license, units: sorted, skipped: sortedSkipped }, null, 2) + '\n', 'utf8');
  const eps = Object.values(sorted).reduce((n, v) => n + v.viewership.episodes.filter((e) => e.millions !== null).length, 0);
  console.log(`${Object.keys(sorted).length} units with viewership (${new Set(Object.values(sorted).map((v) => v.title_id)).size} series, ${eps} episode figures); ${Object.keys(sortedSkipped).length} series with skipped units`);
}

await main();
