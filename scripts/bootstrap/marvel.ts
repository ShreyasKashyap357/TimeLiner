// One-time bootstrap: seed + cached sources -> data/marvel/*.json, data/universes.json, data/registry/*.json
// After bootstrap, the JSON files are the canonical, hand-maintained dataset. Re-running requires --force.
// Usage: tsx scripts/bootstrap/marvel.ts [--force]
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { readManifest, WIKIPEDIA } from '../fetch/mediawiki.ts';
import { readWikidata, type WikidataFacts } from '../fetch/wikidata.ts';
import { extractInfobox, extractRowHeaderTable, loadWikitext, type ReleaseRow, type TimelineRow } from '../build/extract.ts';
import { MARVEL_SEED, type SeedTitle, type SeedUnit } from './marvel.seed.ts';
import { MARVEL_CONTINUITIES, MARVEL_UNIVERSE, PLATFORMS, STUDIOS, MARVEL_TAGS } from './marvel.config.ts';
import {
  ContinuitiesFile, PlatformsFile, StudiosFile, TagsFile, TitlesFile, UniversesFile,
  type Title, type Unit, type InUniverse, type Status,
} from '../../src/domain/schema.ts';

const TODAY = process.env.TIMELINER_TODAY ?? new Date().toISOString().slice(0, 10);
const force = process.argv.includes('--force');
if (existsSync('data/marvel/titles.json') && !force) {
  console.error('data/marvel/titles.json exists. Bootstrap is one-time; pass --force to overwrite curated data.');
  process.exit(1);
}

const wikiUrl = (t: string) => WIKIPEDIA.pageBase + encodeURIComponent(t.replace(/ /g, '_')).replace(/%3A/g, ':').replace(/%2F/g, '/').replace(/%28/g, '(').replace(/%29/g, ')').replace(/%2C/g, ',').replace(/%27/g, "'");

interface Candidates {
  releases: (ReleaseRow & { phase?: string })[];
  timeline: TimelineRow[];
  disney_plus_order: string[];
  official_timeline_book: { label: string; works: { text: string; note: string | null }[] }[];
}
const C: Candidates = JSON.parse(await readFile('data/candidates/marvel.json', 'utf8'));
const WD = new Map<string, WikidataFacts>((await readWikidata('marvel')).map((f) => [f.enwiki, f]));
const manifest = await readManifest();
const report: string[] = [];
const notes: { unit: string; kind: string; text: string }[] = [];

// ---------- supplementary release tables
const oneShotsRaw = await loadWikitext('Marvel One-Shots');
const oneShotBlock = /<onlyinclude>([\s\S]*?)<\/onlyinclude>/.exec(oneShotsRaw)?.[1] ?? '';
const ONE_SHOTS = extractRowHeaderTable(oneShotBlock, 'Marvel One-Shots', 'film');
const INFOBOX = new Map<string, Record<string, string>>();
for (const t of MARVEL_SEED) INFOBOX.set(t.wiki, extractInfobox(await loadWikitext(t.wiki).catch(() => "")));
const SSU = extractRowHeaderTable(await loadWikitext("Sony's Spider-Man Universe"), "Sony's Spider-Man Universe", 'film').filter((r) => r.start);

// ---------- in-universe sources
const yearsIn = (label: string): number[] => {
  const out: number[] = [];
  for (const m of label.matchAll(/(\d{3,4})(\s*BC)?/g)) out.push(m[2] ? -Number(m[1]) : Number(m[1]));
  return out;
};
const tlIndex = new Map<string, { row: TimelineRow; seq: number; item: TimelineRow['items'][number] }>();
let seq = 0;
for (const row of C.timeline) {
  if (row.is_break) continue;
  for (const item of row.items) {
    seq++;
    if (tlIndex.has(item.text)) report.push(`WARN duplicate timeline item text "${item.text}"`);
    tlIndex.set(item.text, { row, seq, item });
  }
}
const usedTl = new Set<string>();
const bookRowsFor = (key: string) =>
  C.official_timeline_book.filter((r) => r.works.some((w) => w.text === key || w.text.startsWith(key + ' episode') || w.text.startsWith(key + ' (')));
const usedBook = new Set<string>();

// ---------- release lookup
function releaseFor(t: SeedTitle, u: SeedUnit): { row?: ReleaseRow & { phase?: string }; page?: string; date: string | null; end: string | null; episodes: number | null; phase: string | null; status_text: string | null; note: string } {
  if (u.rel) return { date: u.rel.date, end: u.rel.end ?? null, episodes: null, phase: null, status_text: null, note: u.rel.note ?? '', page: u.rel.src };
  const rows = C.releases.filter((r) => r.link === t.wiki && (t.type === 'film' || t.type === 'one-shot' || t.type === 'special' ? r.kind !== 'season' : r.kind === 'season' && r.season === u.season));
  // prefer a phase-page row (carries phase), then any
  const row = rows.find((r) => r.phase) ?? rows[0];
  if (row) return { row, page: row.source_page, date: row.start, end: row.end ?? null, episodes: row.episodes ?? null, phase: row.phase ?? null, status_text: row.status_text ?? null, note: '' };
  const os = ONE_SHOTS.find((r) => r.title === t.title);
  if (os) return { page: 'Marvel One-Shots', date: os.start, end: null, episodes: null, phase: null, status_text: null, note: 'Home media (digital) release date.' };
  const ssu = SSU.find((r) => r.link === t.wiki);
  if (ssu) return { page: "Sony's Spider-Man Universe", date: ssu.start, end: null, episodes: null, phase: null, status_text: null, note: '' };
  const ib = INFOBOX.get(t.wiki) ?? {};
  const ibStart = ib.first_aired ?? ib.released;
  const fullIso = /^\d{4}-\d{2}-\d{2}$/;
  if (ibStart && fullIso.test(ibStart) && (u.key === 's1-5' || !u.season || u.season === 1)) {
    const ibEnd = ib.last_aired && fullIso.test(ib.last_aired) ? ib.last_aired : null;
    return { page: t.wiki, date: ibStart, end: ibEnd, episodes: ib.num_episodes && u.key === "s1-5" ? Number(ib.num_episodes) : null, phase: null, status_text: null, note: "From the article infobox (first/last aired)." };
  }
  const wd = WD.get(t.wiki);
  const us = wd?.publication_dates.filter((d) => d.place.includes('Q30') && d.precision >= 11).map((d) => d.date).sort()[0];
  if (us) return { page: `wikidata:${wd!.qid}`, date: us, end: null, episodes: null, phase: null, status_text: null, note: 'US release date from Wikidata (P577, place of publication = US).' };
  return { date: null, end: null, episodes: null, phase: null, status_text: null, note: 'No release row found.' };
}

function statusFor(date: string | null, statusText: string | null, override?: Status): Status {
  if (override) return override;
  if (date && date.length === 10 && date <= TODAY) return 'released';
  if (/cancel/i.test(statusText ?? '')) return 'cancelled';
  if (date) return 'upcoming';
  if (/production|filming/i.test(statusText ?? '')) return 'in-production';
  return 'upcoming';
}

// ---------- build titles
const titles: Title[] = [];
const unitsById = new Map<string, { title: Title; unit: Unit; seed: SeedUnit }>();
const groupingsSaga = new Map(MARVEL_UNIVERSE.grouping_schemes.find((g) => g.id === 'phase')!.values.map((v) => [v.id, v.parent]));

for (const t of MARVEL_SEED) {
  const cont = MARVEL_CONTINUITIES.find((c) => c.id === t.continuity)!;
  const mainBranch = cont.branches.find((b) => b.is_main)!.id;
  const wd = WD.get(t.wiki);
  const pagesUsed = new Set<string>([t.wiki, ...(t.extra_sources ?? [])]);
  const units: Unit[] = [];
  for (const su of t.units ?? []) {
    const id = su.key ? `${t.id}-${su.key}` : t.id;
    const rel = releaseFor(t, su);
    if (rel.page && !rel.page.startsWith('wikidata:')) pagesUsed.add(rel.page);
    const unitNotes: string[] = [];
    if (su.notes) unitNotes.push(su.notes);
    if (!rel.date) report.push(`MISSING release date: ${id}`);

    // in-universe
    let iu: InUniverse;
    const branch = su.branch ?? mainBranch;
    if (su.tl) {
      const hit = tlIndex.get(su.tl);
      if (!hit) throw new Error(`timeline item not found: "${su.tl}" (${id})`);
      usedTl.add(su.tl);
      pagesUsed.add('Marvel Cinematic Universe timeline');
      const ys = yearsIn(hit.row.year_label);
      const start = ys[0]!, end = ys.at(-1)!;
      if (hit.item.multiverse !== (branch !== mainBranch)) report.push(`WARN branch mismatch for ${id}: diagram multiverse=${hit.item.multiverse}, branch=${branch}`);
      let confidence: InUniverse['confidence'] = 'stated';
      const noteParts: string[] = [`Wikipedia MCU timeline diagram: ${hit.row.year_label}.`];
      if (hit.item.footnote) noteParts.push(hit.item.footnote);
      const book = su.book ? bookRowsFor(su.book) : [];
      if (book.length) {
        book.forEach((b) => usedBook.add(b.label));
        const bLabel = book.length === 1 ? book[0]!.label : `${book[0]!.label} – ${book.at(-1)!.label}`;
        const bYears = book.flatMap((b) => yearsIn(b.label));
        const bMin = Math.min(...bYears), bMax = Math.max(...bYears);
        noteParts.push(`An Official Timeline (2023): ${bLabel}.`);
        if (end < bMin || start > bMax) {
          confidence = 'disputed';
          notes.push({ unit: id, kind: 'disputed', text: `Diagram ${hit.row.year_label} vs An Official Timeline ${bLabel}` });
        }
      }
      iu = {
        start: { y: start }, end: { y: end }, label: hit.row.year_label.replace(/(\d{4})\s*–\s*(\d{4})/, '$1–$2'),
        precision: start === end ? 'year' : 'range', confidence, note: noteParts.join(' '), order_index: hit.seq * 10, relative_to: null,
      };
    } else if (su.iu) {
      pagesUsed.add(su.iu.src);
      iu = {
        start: su.iu.y !== undefined ? { y: su.iu.y } : null,
        end: su.iu.y !== undefined ? { y: su.iu.y2 ?? su.iu.y } : null,
        label: su.iu.label, precision: su.iu.precision, confidence: su.iu.confidence, note: su.iu.note,
        order_index: NaN, relative_to: null,
      };
    } else {
      throw new Error(`unit ${id} has neither tl nor iu`);
    }

    const phase = su.phase !== undefined ? su.phase : rel.phase;
    const groupings: Record<string, string | null> = {};
    if (cont.grouping_schemes.includes('phase')) {
      groupings.phase = phase ?? null;
      groupings.saga = phase ? groupingsSaga.get(phase) ?? null : null;
    }
    let releaseDate = rel.date;
    let endDate = rel.end;
    if (id === 'i-am-groot-ep2-10') {
      endDate = C.releases.find((r) => r.link === 'I Am Groot' && r.season === 2)?.start ?? null;
    }
    const unit: Unit = {
      id, label: su.label, season: su.season ?? null,
      episode_range: su.eps ? { from: { season: su.eps[0], episode: su.eps[1] }, to: { season: su.eps[2], episode: su.eps[3] } } : null,
      episode_count: su.episodes ?? rel.episodes ?? null,
      runtime_min: t.type === 'film' || t.type === 'one-shot' || t.type === 'special' ? wd?.duration_min ?? null : null, pages: null, word_count: null,
      timeline_branch: branch,
      canon_tier: su.tier ?? null,
      in_universe: iu,
      release: { date: releaseDate, end_date: endDate ?? null, year: releaseDate ? Number(releaseDate.slice(0, 4)) : null, note: rel.note },
      status: statusFor(releaseDate, rel.status_text, su.rel?.status),
      groupings,
      platform_or_network: null,
      source_keys: Object.fromEntries(Object.entries({ "mcu-timeline-diagram": su.tl, "official-timeline-book": su.book && bookRowsFor(su.book).length ? su.book : undefined, "disney-plus-order": su.disney || undefined, "release-season": su.season !== undefined && t.type !== "film" ? String(su.season) : undefined }).filter(([, v]) => v)) as Record<string, string>,
      source_urls: [...new Set([rel.page && !rel.page.startsWith('wikidata:') ? wikiUrl(rel.page) : null, su.tl ? wikiUrl('Marvel Cinematic Universe timeline') : null, su.iu ? wikiUrl(su.iu.src) : null].filter(Boolean) as string[])],
      notes: unitNotes.join(' '),
    };
    units.push(unit);
  }
  const first = units[0]!;
  const title: Title = {
    id: t.id, title: t.title, sort_title: t.title.replace(/^(The|A|An)\s+/i, '') !== t.title ? t.title.replace(/^(The|A|An)\s+/i, '') : null,
    type: t.type, universe: 'marvel', continuity: t.continuity,
    studio_brand: t.studio, label: t.label ?? null, platform_or_network: t.platform, canon_tier: t.tier,
    characters: (t.chars ?? []).filter((c) => MARVEL_TAGS.some((x) => x.id === c && x.kind === 'character')),
    franchises: (t.teams ?? []),
    status: units.some((u) => u.status === 'released') ? 'released' : first.status,
    external_ids: { enwiki: t.wiki, wikidata: wd?.qid ?? null, tmdb: wd?.tmdb_movie ?? wd?.tmdb_tv ?? null, imdb: wd?.imdb ?? null },
    source_urls: [...pagesUsed].map(wikiUrl),
    notes: t.notes ?? '',
    units,
    links: (t.links ?? []).map((l) => ({ to: l.to, kind: l.kind as Title['links'][number]['kind'], note: l.note ?? '' })),
    constituents: [],
  };
  for (const c of t.chars ?? []) if (!MARVEL_TAGS.some((x) => x.id === c)) report.push(`WARN unknown character tag ${c} on ${t.id}`);
  for (const c of t.teams ?? []) if (!MARVEL_TAGS.some((x) => x.id === c)) report.push(`WARN unknown franchise tag ${c} on ${t.id}`);
  titles.push(title);
  (t.units ?? []).forEach((su, i) => unitsById.set(units[i]!.id, { title, unit: units[i]!, seed: su }));
}

// ---------- Disney+ alternate order (MCU)
const disneyUnits: string[] = [];
const disneyUsed = new Set<string>();
for (const item of C.disney_plus_order) {
  const ids = [...unitsById.values()].filter((x) => x.seed.disney === item && x.title.continuity === 'mcu').map((x) => x.unit.id);
  if (!ids.length) report.push(`UNMAPPED Disney+ item: "${item}"`);
  for (const id of ids) if (!disneyUnits.includes(id)) disneyUnits.push(id);
  if (ids.length) disneyUsed.add(item);
}

// ---------- order_index for units without diagram placement
for (const cont of MARVEL_CONTINUITIES) {
  const inCont = [...unitsById.values()].filter((x) => x.title.continuity === cont.id);
  const placed = inCont.filter((x) => !Number.isNaN(x.unit.in_universe.order_index));
  const unplaced = inCont.filter((x) => Number.isNaN(x.unit.in_universe.order_index));
  if (cont.id === 'mcu') {
    // 1) Disney+-anchored units go right after their previous placed neighbour in the Disney+ order.
    const bump = new Map<number, number>();
    for (const x of unplaced) {
      const pos = disneyUnits.indexOf(x.unit.id);
      if (pos < 0) continue;
      const prev = disneyUnits.slice(0, pos).reverse().map((id) => unitsById.get(id)!).find((y) => !Number.isNaN(y.unit.in_universe.order_index) && y.seed.tl);
      const next = disneyUnits.slice(pos + 1).map((id) => unitsById.get(id)!).find((y) => !Number.isNaN(y.unit.in_universe.order_index) && y.seed.tl);
      const base = prev?.unit.in_universe.order_index ?? 0;
      const k = (bump.get(base) ?? 0) + 1;
      bump.set(base, k);
      x.unit.in_universe.order_index = base + k;
      x.unit.in_universe.relative_to = { after: prev?.unit.id ?? null, before: next?.unit.id ?? null };
      x.unit.in_universe.note += ` Relative position from the Disney+ timeline order (after ${prev?.title.title ?? 'start'}).`;
      if (!x.unit.source_urls.includes(wikiUrl('Marvel Cinematic Universe timeline'))) x.unit.source_urls.push(wikiUrl('Marvel Cinematic Universe timeline'));
    }
    // 2) Dated units without diagram row (Agent Carter series): after the last diagram unit with start <= year.
    for (const x of unplaced.filter((x) => Number.isNaN(x.unit.in_universe.order_index) && x.unit.in_universe.start)) {
      const y = x.unit.in_universe.start!.y;
      const prev = placed.filter((p) => p.unit.in_universe.start && p.unit.in_universe.start.y <= y).sort((a, b) => b.unit.in_universe.order_index - a.unit.in_universe.order_index)[0];
      const base = prev?.unit.in_universe.order_index ?? 0;
      const k = (bump.get(base) ?? 0) + 1;
      bump.set(base, k);
      x.unit.in_universe.order_index = base + k;
    }
    // 3) Remaining (upcoming, adjacent-unplaced): after everything, by release date.
    const rest = unplaced.filter((x) => Number.isNaN(x.unit.in_universe.order_index))
      .sort((a, b) => (a.unit.release.date ?? '9999').localeCompare(b.unit.release.date ?? '9999') || a.unit.id.localeCompare(b.unit.id));
    const max = Math.max(...inCont.map((x) => x.unit.in_universe.order_index).filter((n) => !Number.isNaN(n)));
    rest.forEach((x, i) => { x.unit.in_universe.order_index = Math.ceil(max / 10) * 10 + 10 * (i + 1); });
  } else {
    // other continuities: by start year where known, then release date
    const sorted = [...inCont].sort((a, b) =>
      (a.unit.in_universe.start?.y ?? Infinity) - (b.unit.in_universe.start?.y ?? Infinity) ||
      (a.unit.release.date ?? '9999').localeCompare(b.unit.release.date ?? '9999') || a.unit.id.localeCompare(b.unit.id));
    sorted.forEach((x, i) => { x.unit.in_universe.order_index = (i + 1) * 10; });
  }
}

// ---------- continuities with alt order
const continuities = MARVEL_CONTINUITIES.map((c) =>
  c.id === 'mcu'
    ? { ...c, alt_orders: [{ id: 'disney-plus', label: 'Disney+ timeline order', source_url: wikiUrl('Marvel Cinematic Universe timeline'), as_of: TODAY, note: 'As transcribed on Wikipedia ("as of VisionQuest"). Season-level entries expanded to all units of that season.', unit_ids: disneyUnits }] }
    : c);

// ---------- report on source coverage
for (const [text] of tlIndex) if (!usedTl.has(text)) report.push(`UNUSED diagram item: "${text}"`);
for (const r of C.official_timeline_book) if (!usedBook.has(r.label)) report.push(`UNUSED Official Timeline row: "${r.label}" (${r.works.map((w) => w.text).join(', ')})`);
const seedWikis = new Set(MARVEL_SEED.map((t) => t.wiki));
for (const r of C.releases) if (r.link && !seedWikis.has(r.link)) report.push(`OUT OF SCOPE release row: ${r.kind} "${r.title}"${r.season ? ' S' + r.season : ''} (${r.source_page})`);

// ---------- validate & write
const out = {
  universes: UniversesFile.parse([{ ...MARVEL_UNIVERSE, last_verified: TODAY }]),
  continuities: ContinuitiesFile.parse(continuities),
  titles: TitlesFile.parse(titles),
  tags: TagsFile.parse(MARVEL_TAGS),
  studios: StudiosFile.parse(STUDIOS),
  platforms: PlatformsFile.parse(PLATFORMS),
};
await mkdir('data/marvel', { recursive: true });
await mkdir('data/registry', { recursive: true });
const w = (p: string, v: unknown) => writeFile(p, JSON.stringify(v, null, 2) + '\n', 'utf8');
await w('data/universes.json', out.universes);
await w('data/marvel/continuities.json', out.continuities);
await w('data/marvel/titles.json', out.titles);
await w('data/marvel/tags.json', out.tags);
await w('data/marvel/aliases.json', {});
await w('data/registry/studios.json', out.studios);
await w('data/registry/platforms.json', out.platforms);
await w('data/candidates/marvel.bootstrap-report.json', { generated_at: new Date().toISOString(), today: TODAY, report, disputed: notes, manifest_revisions: manifest.length });
console.log(`titles ${titles.length}, units ${[...unitsById.keys()].length}`);
console.log(report.join('\n'));
console.log('\nDISPUTED:\n' + notes.map((n) => `${n.unit}: ${n.text}`).join('\n'));
