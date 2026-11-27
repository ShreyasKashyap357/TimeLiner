// Generic one-time bootstrap for a universe: scripts/bootstrap/<id>.seed.ts + <id>.config.ts + cached sources
// -> data/<id>/*.json, and appends the universe/registry entries to the shared files (never touches other universes).
// Usage: tsx scripts/bootstrap/universe.ts <id> [--force] [--enable]
//
// <id>.config.ts must export: UNIVERSE, CONTINUITIES, STUDIOS, PLATFORMS, TAGS, and optionally
//   SORT_BY_YEAR (continuity ids whose order is by start year then release, e.g. interleaved TV seasons)
//   FANDOM_PREFIXES ({ prefix: baseUrl } for "prefix:Page" sources)
// <id>.seed.ts must export SEED: SeedTitle[] (see seed-kit.ts).
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { readWikidata } from '../fetch/wikidata.ts';
import { extractInfobox, loadWikitext, type ReleaseRow } from '../build/extract.ts';
import type { SeedTitle, SeedUnit } from './seed-kit.ts';
import {
  ContinuitiesFile, PlatformsFile, StudiosFile, TagsFile, TitlesFile, UniversesFile,
  type Continuity, type InUniverse, type Platform, type Status, type Studio, type Tag, type Title, type Unit, type Universe,
} from '../../src/domain/schema.ts';
import { PRINT_TYPES } from '../../src/domain/model.ts';

const id = process.argv[2];
if (!id || id.startsWith('--')) throw new Error('usage: universe.ts <id> [--force] [--enable]');
const TODAY = process.env.TIMELINER_TODAY ?? new Date().toISOString().slice(0, 10);
if (existsSync(`data/${id}/titles.json`) && !process.argv.includes('--force')) {
  console.error(`data/${id}/titles.json exists. Bootstrap is one-time; pass --force to overwrite curated data.`);
  process.exit(1);
}
const enable = process.argv.includes('--enable');
const cfg = (await import(`./${id}.config.ts`)) as {
  UNIVERSE: Universe; CONTINUITIES: Continuity[]; STUDIOS: Studio[]; PLATFORMS: Platform[]; TAGS: Tag[];
  SORT_BY_YEAR?: string[]; FANDOM_PREFIXES?: Record<string, string>;
};
const { SEED } = (await import(`./${id}.seed.ts`)) as { SEED: SeedTitle[] };

const enc = (t: string) => encodeURIComponent(t.replace(/ /g, '_')).replace(/%3A/g, ':').replace(/%2F/g, '/').replace(/%28/g, '(').replace(/%29/g, ')').replace(/%2C/g, ',').replace(/%27/g, "'").replace(/%26/g, '&');
const srcUrl = (s: string) => {
  const m = /^([a-z]+):(.+)$/.exec(s);
  if (m && cfg.FANDOM_PREFIXES?.[m[1]!]) return cfg.FANDOM_PREFIXES[m[1]!] + enc(m[2]!);
  if (/^https?:\/\//.test(s)) return s;
  return 'https://en.wikipedia.org/wiki/' + enc(s);
};

const C: { releases: ReleaseRow[] } = existsSync(`data/candidates/${id}.json`) ? JSON.parse(await readFile(`data/candidates/${id}.json`, 'utf8')) : { releases: [] };
const WD = new Map((await readWikidata(id)).map((f) => [f.enwiki, f]));
const report: string[] = [];
/** Optional within-year story rank from the seed (SeedUnit.rank); a sourced judgement, see DATA_NOTES. */
const RANK = new Map<Unit, number>();
const isFilmLike = (t: SeedTitle) => t.type.includes('film') || t.type === 'special' || t.type === 'one-shot';
const isPrint = (t: SeedTitle) => PRINT_TYPES.includes(t.type);

async function releaseFor(t: SeedTitle, u: SeedUnit) {
  if (u.rel) return { date: u.rel.date, end: u.rel.end ?? null, episodes: null as number | null, page: u.rel.src as string | null, note: u.rel.note ?? '', status_text: null as string | null };
  let rows = C.releases.filter((r) => r.link === t.wiki && (isFilmLike(t) || isPrint(t) ? r.kind !== 'season' : r.kind === 'season' && r.season === u.season));
  if (u.relTitle) rows = rows.filter((r) => r.title.includes(u.relTitle!));
  rows.sort((a, b) => (b.start?.length ?? 0) - (a.start?.length ?? 0));
  const row = rows[0];
  if (row?.start) return { date: row.start, end: row.end ?? null, episodes: row.episodes ?? null, page: row.source_page, note: '', status_text: row.status_text ?? null };
  const wd = t.wiki ? WD.get(t.wiki) : undefined;
  if (wd && (isFilmLike(t) || isPrint(t) || !u.season || u.season === 1) && t.units.length === 1) {
    const us = wd.publication_dates.filter((d) => d.place.includes('Q30')).map((d) => d.date).sort()[0];
    const any = us ?? wd.publication_dates.map((d) => d.date).sort()[0];
    if (any) return { date: any, end: null, episodes: null, page: `wikidata:${wd.qid}`, note: us ? 'US release date from Wikidata (P577).' : 'Earliest publication date from Wikidata (P577).', status_text: null };
  }
  if (isFilmLike(t) || isPrint(t) || !u.season || u.season === 1) {
    const ib = extractInfobox(t.wiki ? await loadWikitext(t.wiki).catch(() => '') : '');
    const d = ib.released ?? ib.first_aired ?? ib.pub_date ?? ib.published;
    if (d && /^\d{4}(-\d{2}){0,2}$/.test(d)) return { date: d, end: null, episodes: null, page: t.wiki, note: 'From the article infobox.', status_text: null };
  }
  return { date: null, end: null, episodes: null, page: null, note: 'No release date found.', status_text: row?.status_text ?? null };
}

const statusFor = (date: string | null, statusText: string | null): Status => {
  if (date) return (date.length === 10 ? date <= TODAY : Number(date.slice(0, 4)) < Number(TODAY.slice(0, 4))) ? 'released' : 'upcoming';
  if (/cancel/i.test(statusText ?? '')) return 'cancelled';
  if (/production|filming/i.test(statusText ?? '')) return 'in-production';
  return 'upcoming';
};

const titles: Title[] = [];
const byCont = new Map<string, Unit[]>();
for (const st of SEED) {
  const cont = cfg.CONTINUITIES.find((c) => c.id === st.continuity);
  if (!cont) throw new Error(`unknown continuity ${st.continuity} (${st.id})`);
  const mainBranch = cont.branches.find((b) => b.is_main)!.id;
  const wd = st.wiki ? WD.get(st.wiki) : undefined;
  const pages = new Set<string | null>([st.wiki, ...(st.extra_sources ?? [])]);
  const units: Unit[] = [];
  for (const su of st.units) {
    const uid = su.key ? `${st.id}-${su.key}` : st.id;
    const rel = await releaseFor(st, su);
    if (!rel.date) report.push(`MISSING release date: ${uid}`);
    for (const s of su.iu.src) pages.add(s);
    const start = su.iu.y !== undefined ? { y: su.iu.y, ...(su.iu.m ? { m: su.iu.m } : {}) } : null;
    const iu: InUniverse = {
      start, end: start ? { y: su.iu.y2 ?? su.iu.y! } : null, label: su.iu.label, precision: su.iu.precision,
      confidence: su.iu.confidence, note: su.iu.note, order_index: 0, relative_to: null,
    };
    const unit: Unit = {
      id: uid, label: su.label, season: su.season ?? null, episode_range: null,
      episode_count: su.episodes ?? rel.episodes ?? null,
      runtime_min: isFilmLike(st) && st.units.length === 1 ? wd?.duration_min ?? null : null,
      pages: su.pages ?? (isPrint(st) && st.units.length === 1 ? wd?.pages ?? null : null), word_count: null, word_count_source: null,
      timeline_branch: su.branch ?? mainBranch, canon_tier: su.tier ?? null, in_universe: iu,
      release: { date: rel.date, end_date: rel.end, year: rel.date ? Number(rel.date.slice(0, 4)) : null, note: rel.note },
      status: statusFor(rel.date, rel.status_text),
      groupings: Object.fromEntries(cont.grouping_schemes.map((g) => [g, su.grp?.[g] ?? null])),
      platform_or_network: su.platform ?? null,
      source_keys: su.season !== undefined && !isFilmLike(st) && !isPrint(st) ? { 'release-season': String(su.season) } : {},
      source_urls: [...new Set([rel.page && !rel.page.startsWith('wikidata:') ? srcUrl(rel.page) : null, ...su.iu.src.map(srcUrl)].filter(Boolean) as string[])],
      notes: su.notes ?? '',
    };
    units.push(unit);
    if (su.rank !== undefined) RANK.set(unit, su.rank);
    if (!byCont.has(st.continuity)) byCont.set(st.continuity, []);
    byCont.get(st.continuity)!.push(unit);
  }
  for (const c of [...(st.chars ?? []), ...(st.teams ?? [])]) if (!cfg.TAGS.some((g) => g.id === c)) report.push(`WARN unknown tag ${c} on ${st.id}`);
  titles.push({
    id: st.id, title: st.title, sort_title: /^(The|A|An)\s/.test(st.title) ? st.title.replace(/^(The|A|An)\s+/, '') : null,
    type: st.type, universe: id, continuity: st.continuity, studio_brand: st.studio, label: st.label ?? null,
    platform_or_network: st.platform, canon_tier: st.tier ?? 'core', characters: st.chars ?? [], franchises: st.teams ?? [],
    status: units.some((u) => u.status === 'released') ? 'released' : units[0]!.status,
    external_ids: { enwiki: st.wiki, wikidata: wd?.qid ?? null, tmdb: wd?.tmdb_movie ?? wd?.tmdb_tv ?? null, imdb: wd?.imdb ?? null },
    source_urls: [...pages].filter((p): p is string => Boolean(p)).map(srcUrl), notes: st.notes ?? '', units,
    links: (st.links ?? []).map((l) => ({ to: l.to, kind: l.kind as Title['links'][number]['kind'], note: l.note ?? '' })),
    constituents: st.constituents ?? [], credits: [],
  });
}

// order_index: seed order = story order; SORT_BY_YEAR continuities sort by (start year, seed `rank`, release).
for (const [cid, list] of byCont) {
  const seq = cfg.SORT_BY_YEAR?.includes(cid)
    ? [...list].sort((a, b) => (a.in_universe.start?.y ?? 99999) - (b.in_universe.start?.y ?? 99999) || (RANK.get(a) ?? 0) - (RANK.get(b) ?? 0) || (a.release.date ?? '').localeCompare(b.release.date ?? ''))
    : list;
  seq.forEach((u, i) => { u.in_universe.order_index = (i + 1) * 10; });
  const cont = cfg.CONTINUITIES.find((c) => c.id === cid)!;
  if (cont.calendar.kind !== 'ordered-only' && cont.kind !== 'standalone-collection') {
    seq.forEach((u, i) => {
      if (u.in_universe.start || u.status !== 'released') return;
      const prev = seq.slice(0, i).reverse().find((y) => y.status === 'released');
      const next = seq.slice(i + 1).find((y) => y.status === 'released');
      u.in_universe.relative_to = { after: prev?.id ?? null, before: next?.id ?? null };
    });
  }
}

const universes = UniversesFile.parse(JSON.parse(await readFile('data/universes.json', 'utf8'))).filter((u) => u.id !== id);
universes.push({ ...cfg.UNIVERSE, enabled: enable, last_verified: TODAY });
universes.sort((a, b) => a.order - b.order);
const studios = StudiosFile.parse(JSON.parse(await readFile('data/registry/studios.json', 'utf8')));
for (const s of cfg.STUDIOS) if (!studios.some((x) => x.id === s.id)) studios.push(s);
const platforms = PlatformsFile.parse(JSON.parse(await readFile('data/registry/platforms.json', 'utf8')));
for (const p of cfg.PLATFORMS) if (!platforms.some((x) => x.id === p.id)) platforms.push(p);

const w = (p: string, v: unknown) => writeFile(p, JSON.stringify(v, null, 2) + '\n', 'utf8');
await mkdir(`data/${id}`, { recursive: true });
await mkdir('data/candidates', { recursive: true });
await w('data/universes.json', UniversesFile.parse(universes));
await w('data/registry/studios.json', StudiosFile.parse(studios));
await w('data/registry/platforms.json', PlatformsFile.parse(platforms));
await w(`data/${id}/continuities.json`, ContinuitiesFile.parse(cfg.CONTINUITIES));
await w(`data/${id}/titles.json`, TitlesFile.parse(titles));
await w(`data/${id}/tags.json`, TagsFile.parse(cfg.TAGS));
if (!existsSync(`data/${id}/aliases.json`)) await w(`data/${id}/aliases.json`, {});
await w(`data/candidates/${id}.bootstrap-report.json`, { generated_at: new Date().toISOString(), today: TODAY, report });
console.log(`${id}: titles ${titles.length}, units ${titles.reduce((n, t) => n + t.units.length, 0)}, enabled=${enable}`);
if (report.length) console.log(report.join('\n'));
