// One-time bootstrap for DC: seed + config + cached sources -> data/dc/*.json; appends DC to
// data/universes.json and new registry entries (never touches Marvel files). Re-run requires --force.
// Usage: tsx scripts/bootstrap/dc.ts [--force] [--enable]
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { readWikidata } from '../fetch/wikidata.ts';
import { extractInfobox, loadWikitext, type ReleaseRow } from '../build/extract.ts';
import { DC_SEED, type DcTitle, type DcUnit } from './dc.seed.ts';
import { DC_CONTINUITIES, DC_PLATFORMS, DC_STUDIOS, DC_TAGS, DC_UNIVERSE } from './dc.config.ts';
import { ContinuitiesFile, PlatformsFile, StudiosFile, TagsFile, TitlesFile, UniversesFile, type InUniverse, type Status, type Title, type Unit } from '../../src/domain/schema.ts';

const TODAY = process.env.TIMELINER_TODAY ?? new Date().toISOString().slice(0, 10);
if (existsSync('data/dc/titles.json') && !process.argv.includes('--force')) {
  console.error('data/dc/titles.json exists. Bootstrap is one-time; pass --force to overwrite curated data.');
  process.exit(1);
}
const enable = process.argv.includes('--enable');

const enc = (t: string) => encodeURIComponent(t.replace(/ /g, '_')).replace(/%3A/g, ':').replace(/%2F/g, '/').replace(/%28/g, '(').replace(/%29/g, ')').replace(/%2C/g, ',').replace(/%27/g, "'").replace(/%26/g, '&');
const srcUrl = (s: string) =>
  s.startsWith('arrowfandom:') ? 'https://arrow.fandom.com/wiki/' + enc(s.slice(12))
  : s.startsWith('dcfandom:') ? 'https://dc.fandom.com/wiki/' + enc(s.slice(9))
  : 'https://en.wikipedia.org/wiki/' + enc(s);

const C: { releases: ReleaseRow[] } = JSON.parse(await readFile('data/candidates/dc.json', 'utf8'));
const WD = new Map((await readWikidata('dc')).map((f) => [f.enwiki, f]));
const report: string[] = [];

async function releaseFor(t: DcTitle, u: DcUnit): Promise<{ date: string | null; end: string | null; episodes: number | null; page: string | null; note: string; status_text: string | null }> {
  if (u.rel) return { date: u.rel.date, end: u.rel.end ?? null, episodes: null, page: u.rel.src, note: u.rel.note ?? '', status_text: null };
  let rows = C.releases.filter((r) => r.link === t.wiki && (t.type.includes('film') ? r.kind !== 'season' : r.kind === 'season' && r.season === u.season));
  if (u.relTitle) rows = rows.filter((r) => r.title.includes(u.relTitle!));
  // prefer full dates, then overview tables over infobox fallbacks
  rows.sort((a, b) => (b.start?.length ?? 0) - (a.start?.length ?? 0) || Number(Boolean(a.status_text?.startsWith('infobox'))) - Number(Boolean(b.status_text?.startsWith('infobox'))));
  const row = rows[0];
  const wd = WD.get(t.wiki);
  const us = wd?.publication_dates.filter((d) => d.place.includes('Q30')).map((d) => d.date).sort()[0];
  // Films: the US general release (Wikidata) beats infobox premiere dates
  if (t.type === 'film' && us && (!row || row.status_text === 'infobox')) return { date: us, end: null, episodes: null, page: `wikidata:${wd!.qid}`, note: 'US release date from Wikidata (P577, place of publication = US).', status_text: null };
  if (row && row.start) return { date: row.start, end: row.end ?? null, episodes: row.episodes ?? null, page: row.source_page, note: row.status_text === 'infobox' ? 'From the article infobox.' : '', status_text: row.status_text ?? null };
  if (wd) {
    const any = us ?? wd.publication_dates.map((d) => d.date).sort()[0];
    if (any) return { date: any, end: null, episodes: null, page: `wikidata:${wd.qid}`, note: 'Release date from Wikidata (P577).', status_text: null };
  }
  const ib = extractInfobox(await loadWikitext(t.wiki).catch(() => ''));
  // infobox dates describe the whole work: only valid for films and first seasons
  const d = t.type.includes('film') || !u.season || u.season === 1 ? ib.released ?? ib.first_aired : undefined;
  if (d && /^\d{4}(-\d{2}){0,2}$/.test(d)) return { date: d, end: null, episodes: null, page: t.wiki, note: 'From the article infobox.', status_text: null };
  return { date: null, end: null, episodes: null, page: null, note: 'No release date found.', status_text: row?.status_text ?? null };
}

function statusFor(date: string | null, statusText: string | null): Status {
  if (date) {
    if (date.length === 10 ? date <= TODAY : Number(date.slice(0, 4)) < Number(TODAY.slice(0, 4))) return 'released';
    return 'upcoming';
  }
  if (/cancel/i.test(statusText ?? '')) return 'cancelled';
  if (/production|filming/i.test(statusText ?? '')) return 'in-production';
  return 'upcoming';
}

const titles: Title[] = [];
const byCont = new Map<string, { t: Title; u: Unit }[]>();
for (const st of DC_SEED) {
  const cont = DC_CONTINUITIES.find((c) => c.id === st.continuity);
  if (!cont) throw new Error(`unknown continuity ${st.continuity} (${st.id})`);
  const mainBranch = cont.branches.find((b) => b.is_main)!.id;
  const wd = WD.get(st.wiki);
  const pages = new Set<string>([st.wiki, ...(st.extra_sources ?? [])]);
  const units: Unit[] = [];
  for (const su of st.units) {
    const id = su.key ? `${st.id}-${su.key}` : st.id;
    const rel = await releaseFor(st, su);
    if (!rel.date) report.push(`MISSING release date: ${id}`);
    for (const s of su.iu.src) pages.add(s);
    const iuStart = su.iu.y !== undefined ? { y: su.iu.y, ...(su.iu.m ? { m: su.iu.m } : {}) } : null;
    const iu: InUniverse = {
      start: iuStart, end: iuStart ? { y: su.iu.y2 ?? su.iu.y! } : null,
      label: su.iu.label, precision: su.iu.precision, confidence: su.iu.confidence, note: su.iu.note,
      order_index: 0, relative_to: null,
    };
    const groupings: Record<string, string | null> = {};
    for (const g of cont.grouping_schemes) groupings[g] = su.grp?.[g] ?? null;
    const unit: Unit = {
      id, label: su.label, season: su.season ?? null, episode_range: null,
      episode_count: su.episodes ?? rel.episodes ?? null,
      runtime_min: st.type.includes('film') ? wd?.duration_min ?? null : null, pages: null, word_count: null,
      timeline_branch: su.branch ?? mainBranch, canon_tier: su.tier ?? null, in_universe: iu,
      release: { date: rel.date, end_date: rel.end, year: rel.date ? Number(rel.date.slice(0, 4)) : null, note: rel.note },
      status: statusFor(rel.date, rel.status_text), groupings, platform_or_network: su.platform ?? null,
      source_keys: su.season !== undefined && st.type !== 'film' ? { 'release-season': String(su.season) } : {},
      source_urls: [...new Set([rel.page && !rel.page.startsWith('wikidata:') ? srcUrl(rel.page) : null, ...su.iu.src.map(srcUrl)].filter(Boolean) as string[])],
      notes: su.notes ?? '',
    };
    units.push(unit);
  }
  const title: Title = {
    id: st.id, title: st.title, sort_title: /^(The|A|An)\s/.test(st.title) ? st.title.replace(/^(The|A|An)\s+/, '') : null,
    type: st.type, universe: 'dc', continuity: st.continuity, studio_brand: st.studio, label: st.label ?? null,
    platform_or_network: st.platform, canon_tier: st.tier ?? 'core',
    characters: (st.chars ?? []), franchises: (st.teams ?? []),
    status: units.some((u) => u.status === 'released') ? 'released' : units[0]!.status,
    external_ids: { enwiki: st.wiki, wikidata: wd?.qid ?? null, tmdb: wd?.tmdb_movie ?? wd?.tmdb_tv ?? null, imdb: wd?.imdb ?? null },
    source_urls: [...pages].map(srcUrl), notes: st.notes ?? '',
    units, links: (st.links ?? []).map((l) => ({ to: l.to, kind: l.kind as Title['links'][number]['kind'], note: l.note ?? '' })),
    constituents: st.constituents ?? [],
  };
  titles.push(title);
  for (const u of units) {
    if (!byCont.has(st.continuity)) byCont.set(st.continuity, []);
    byCont.get(st.continuity)!.push({ t: title, u });
  }
}

// ---- order_index: seed order is story order. For dated continuities, events/crossovers are slotted by
// (start year, release date) among dated units; undated released units get relative_to anchors.
for (const [cid, list] of byCont) {
  let seq = list;
  if (cid === 'arrowverse') {
    seq = [...list].sort((a, b) => (a.u.in_universe.start?.y ?? 9999) - (b.u.in_universe.start?.y ?? 9999) || (a.u.release.date ?? '').localeCompare(b.u.release.date ?? ''));
  }
  seq.forEach((x, i) => { x.u.in_universe.order_index = (i + 1) * 10; });
  const cont = DC_CONTINUITIES.find((c) => c.id === cid)!;
  if (cont.calendar.kind !== 'ordered-only') {
    seq.forEach((x, i) => {
      if (x.u.in_universe.start || x.u.status !== 'released' || x.u.in_universe.relative_to) return;
      const sameBranchOrMain = (y: { u: Unit }) => y.u.status === 'released';
      const prev = seq.slice(0, i).reverse().find(sameBranchOrMain);
      const next = seq.slice(i + 1).find(sameBranchOrMain);
      x.u.in_universe.relative_to = { after: prev?.u.id ?? null, before: next?.u.id ?? null };
    });
  }
}

// ---- tags sanity
for (const t of titles) for (const c of [...t.characters, ...t.franchises]) if (!DC_TAGS.some((g) => g.id === c)) report.push(`WARN unknown tag ${c} on ${t.id}`);

// ---- write: DC files + append to shared index/registries (idempotent)
const universes = UniversesFile.parse(JSON.parse(await readFile('data/universes.json', 'utf8'))).filter((u) => u.id !== 'dc');
universes.push({ ...DC_UNIVERSE, enabled: enable, last_verified: TODAY });
const studios = StudiosFile.parse(JSON.parse(await readFile('data/registry/studios.json', 'utf8')));
for (const s of DC_STUDIOS) if (!studios.some((x) => x.id === s.id)) studios.push(s);
const platforms = PlatformsFile.parse(JSON.parse(await readFile('data/registry/platforms.json', 'utf8')));
for (const p of DC_PLATFORMS) if (!platforms.some((x) => x.id === p.id)) platforms.push(p);

const w = (p: string, v: unknown) => writeFile(p, JSON.stringify(v, null, 2) + '\n', 'utf8');
await mkdir('data/dc', { recursive: true });
await w('data/universes.json', UniversesFile.parse(universes));
await w('data/registry/studios.json', StudiosFile.parse(studios));
await w('data/registry/platforms.json', PlatformsFile.parse(platforms));
await w('data/dc/continuities.json', ContinuitiesFile.parse(DC_CONTINUITIES));
await w('data/dc/titles.json', TitlesFile.parse(titles));
await w('data/dc/tags.json', TagsFile.parse(DC_TAGS));
await w('data/dc/aliases.json', {});
await w('data/candidates/dc.bootstrap-report.json', { generated_at: new Date().toISOString(), today: TODAY, report });
console.log(`dc: titles ${titles.length}, units ${titles.reduce((n, t) => n + t.units.length, 0)}, enabled=${enable}`);
console.log(report.join('\n'));
