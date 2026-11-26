// Migration (applied 2026-11-26), requested at Checkpoint 1:
//  1. Make the two "Marvel Television" entities unmistakable:
//       marvel-television        -> marvel-television-division (2010–2019 division)
//       marvel-television-label  -> marvel-television-banner   (Marvel Studios banner, 2024–)
//     Both get short_label / group / active years so the UI can show them side by side.
//  2. Split X-Men: The Animated Series into seasons 1–5 from
//     "List of X-Men: The Animated Series episodes" ({{Series overview}}), with an alias so
//     anyone who marked the old combined unit as watched keeps their progress.
// Idempotent: re-running is a no-op.
import { readFile, writeFile } from 'node:fs/promises';
import { extractSeriesOverview, loadWikitext } from '../build/extract.ts';
import { readManifest } from '../fetch/mediawiki.ts';
import { AliasesFile, StudiosFile, TitlesFile, type Title } from '../../src/domain/schema.ts';

const rd = async (p: string) => JSON.parse(await readFile(p, 'utf8'));
const wr = (p: string, v: unknown) => writeFile(p, JSON.stringify(v, null, 2) + '\n', 'utf8');

// ---- 1. studios
const studios = StudiosFile.parse(await rd('data/registry/studios.json'));
const RENAME: Record<string, string> = { 'marvel-television': 'marvel-television-division', 'marvel-television-label': 'marvel-television-banner' };
const PATCH: Record<string, Partial<(typeof studios)[number]>> = {
  'marvel-television-division': {
    label: 'Marvel Television (division, 2010–2019)', short_label: 'Marvel TV ’10–’19', group: 'Marvel Television', active: { from: 2010, to: 2019 },
    note: 'The original Marvel Entertainment division (ABC, Netflix, Hulu, Freeform series). Folded into Marvel Studios in December 2019. Not the same as the 2024 Marvel Studios banner.',
  },
  'marvel-television-banner': {
    label: 'Marvel Television (Marvel Studios banner, 2024–)', short_label: 'Marvel TV banner', group: 'Marvel Television', active: { from: 2024, to: null },
    note: 'Production banner Marvel Studios introduced in 2024 for its live-action series (e.g. Agatha All Along, Daredevil: Born Again). Shares a name with, but is not, the 2010–2019 division.',
  },
  'marvel-studios-animation': { short_label: 'Marvel Studios Animation', group: 'Marvel Animation' },
  'marvel-animation': { short_label: 'Marvel Animation', group: 'Marvel Animation', active: { from: 2024, to: null } },
  'marvel-spotlight': { short_label: 'Marvel Spotlight', active: { from: 2024, to: null } },
};
for (const s of studios) {
  if (RENAME[s.id]) s.id = RENAME[s.id]!;
  Object.assign(s, PATCH[s.id] ?? {});
}
await wr('data/registry/studios.json', StudiosFile.parse(studios));

// ---- titles
const titles: Title[] = TitlesFile.parse(await rd('data/marvel/titles.json'));
for (const t of titles) {
  if (RENAME[t.studio_brand]) t.studio_brand = RENAME[t.studio_brand]!;
  if (t.label && RENAME[t.label]) t.label = RENAME[t.label]!;
  t.notes = t.notes.replace('Marvel Television (legacy division).', 'Marvel Television (division, 2010–2019).');
}

// ---- 2. X-Men: The Animated Series seasons
const PAGE = 'List of X-Men: The Animated Series episodes';
const aliases = AliasesFile.parse(await rd('data/marvel/aliases.json'));
const tas = titles.find((t) => t.id === 'x-men-the-animated-series')!;
if (tas.units.length === 1 && tas.units[0]!.id === 'x-men-the-animated-series-s1-5') {
  const rows = extractSeriesOverview(await loadWikitext(PAGE), PAGE, 'X-Men: The Animated Series');
  if (rows.length !== 5) throw new Error(`expected 5 seasons, got ${rows.length}`);
  const old = tas.units[0]!;
  const url = 'https://en.wikipedia.org/wiki/List_of_X-Men:_The_Animated_Series_episodes';
  tas.units = rows.map((r) => ({
    ...structuredClone(old),
    id: `x-men-the-animated-series-s${r.season}`,
    label: `Season ${r.season}`,
    season: r.season!,
    episode_count: r.episodes ?? null,
    in_universe: { ...old.in_universe, label: `Season ${r.season}`, note: 'No calendar dates in sources; ordered by season.' },
    release: { date: r.start, end_date: r.end ?? null, year: r.start ? Number(r.start.slice(0, 4)) : null, note: '' },
    source_keys: { 'release-season': String(r.season) },
    source_urls: [url],
    notes: r.season === 3 ? 'Season 3 and season 4 air dates overlap (S3 ran to 1996-10-05; S4 began 1995-05-06), as listed on Wikipedia.' : '',
  }));
  tas.source_urls = [...new Set([...tas.source_urls, url])];
  tas.notes = 'Produced by Marvel Entertainment Group with Saban Entertainment, Graz Entertainment and AKOM (infobox). Seasons from the episode list.';
  aliases['x-men-the-animated-series-s1-5'] = tas.units.map((u) => u.id);
  // re-sequence the continuity: TAS S1–5, then X-Men '97
  const cont = titles.filter((t) => t.continuity === 'x-men-animated');
  const ordered = [...tas.units, ...cont.filter((t) => t.id !== tas.id).flatMap((t) => t.units)];
  ordered.forEach((u, i) => { u.in_universe.order_index = (i + 1) * 10; });
}
await wr('data/marvel/titles.json', TitlesFile.parse(titles));
await wr('data/marvel/aliases.json', aliases);

// ---- record curated revision of the new source
const manifest = await readManifest();
const curated = await rd('data/sources/curated-revisions.json');
for (const m of manifest) if (!(`${m.site}:${m.resolved_title}` in curated)) curated[`${m.site}:${m.resolved_title}`] = m.revid;
await wr('data/sources/curated-revisions.json', curated);
console.log('migration applied');
