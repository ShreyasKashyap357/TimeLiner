// Migration (applied 2026-11-27), user decision on D-11 ("do those and other deferred ones"): the remaining DC
// titles from DATA_NOTES / TODO. Data: English Wikipedia at the revisions below (researched 2026-11-27).
//  - DC Showcase shorts (14): "DC Universe Animated Original Movies" DC Showcase table, rev 1388055290.
//    Placements with sources: Kamandi → Tomorrowverse ("Jeremy Adams confirmed in 2022 that the short is part of
//    the Tomorrowverse"); Constantine: The House of Mystery → DCAMU ("Immediately following the ending of Justice
//    League Dark: Apokolips War"). Catwoman is "a continuation of her storyline in Batman: Year One"; Batman: Death
//    in the Family is "a sequel to Batman: Under the Red Hood" (links only). Others: standalone collection.
//  - Lobo (2000 web series): DCAU membership "is unclear … still disputed" (DC Animated Universe, rev 1383246396),
//    so it goes in the standalone collection. Gotham Girls: "It takes place in the DC Animated Universe" (rev 1377105572).
//  - Mister Miracle: "expected to be released in 2028" (DC Universe franchise article, rev 1388236376): year only.
//  - DC Super Hero Girls (2015 web series, 2019 series), Batman: Caped Crusader, My Adventures with Superman:
//    no continuity statement, so each is its own continuity.
// Idempotent.
import { readFile, writeFile } from 'node:fs/promises';
import { ContinuitiesFile, PlatformsFile, TitlesFile, type Continuity, type Title, type Unit } from '../../src/domain/schema.ts';

const TODAY = process.env.TIMELINER_TODAY ?? new Date().toISOString().slice(0, 10);
const W = (t: string) => 'https://en.wikipedia.org/wiki/' + encodeURIComponent(t.replace(/ /g, '_')).replace(/%3A/g, ':').replace(/%2C/g, ',').replace(/%21/g, '!').replace(/%28/g, '(').replace(/%29/g, ')');
const OLD = (rev: number) => `https://en.wikipedia.org/w/index.php?oldid=${rev}`;
const save = (f: string, v: unknown) => writeFile(f, JSON.stringify(v, null, 2) + '\n');
const status = (d: string | null): Unit['status'] => (!d ? 'upcoming' : (d.length === 10 ? d <= TODAY : Number(d.slice(0, 4)) < Number(TODAY.slice(0, 4))) ? 'released' : 'upcoming');
const MAIN = { id: 'main', label: 'Main', marker: 'dot' as const, description: '', placeable: true, parent: null, diverges_at: null, merges_into: null, is_main: true };

const DCUAOM = { article: 'DC Universe Animated Original Movies', rev: 1388055290 };
type Short = [title: string, date: string, continuity: string, bundledWith: string];
const SHORTS: Short[] = [
  ['DC Showcase: The Spectre', '2010-02-23', 'dc-animated-standalone', 'Justice League: Crisis on Two Earths'],
  ['DC Showcase: Jonah Hex', '2010-07-27', 'dc-animated-standalone', 'Batman: Under the Red Hood'],
  ['DC Showcase: Green Arrow', '2010-09-28', 'dc-animated-standalone', 'Superman/Batman: Apocalypse'],
  ['Superman/Shazam!: The Return of Black Adam', '2010-11-09', 'dc-animated-standalone', 'DC Showcase Original Shorts Collection'],
  ['DC Showcase: Catwoman', '2011-10-18', 'dc-animated-standalone', 'Batman: Year One'],
  ['DC Showcase: Sgt. Rock', '2019-08-06', 'dc-animated-standalone', 'Batman: Hush'],
  ['DC Showcase: Death', '2019-10-22', 'dc-animated-standalone', 'Wonder Woman: Bloodlines'],
  ['DC Showcase: The Phantom Stranger', '2020-03-17', 'dc-animated-standalone', 'Superman: Red Son'],
  ['DC Showcase: Adam Strange', '2020-05-19', 'dc-animated-standalone', 'Justice League Dark: Apokolips War'],
  ['Batman: Death in the Family', '2020-10-13', 'dc-animated-standalone', 'released on its own (interactive)'],
  ['DC Showcase: Kamandi: The Last Boy on Earth!', '2021-04-27', 'tomorrowverse', 'Justice Society: World War II'],
  ['DC Showcase: The Losers', '2021-06-22', 'dc-animated-standalone', 'Batman: The Long Halloween, Part One'],
  ['DC Showcase: Blue Beetle', '2021-07-27', 'dc-animated-standalone', 'Batman: The Long Halloween, Part Two'],
  ['DC Showcase: Constantine: The House of Mystery', '2022-05-03', 'dcamu', 'its own release'],
];
type Season = [n: number, eps: number, start: string | null, end: string | null];
interface Series { id: string; title: string; continuity: string; platform: string; studio: string; article: string; rev: number; seasons?: Season[]; single?: { date: string | null; end?: string | null; eps?: number; note?: string }; notes: string; links?: Title['links'] }
const SERIES: Series[] = [
  { id: 'lobo-web-series', title: 'Lobo (web series)', continuity: 'dc-animated-standalone', platform: 'warnerbros-com', studio: 'warner-bros-animation', article: 'DC Animated Universe', rev: 1383246396,
    single: { date: '2000-06-15', end: '2000-09-14', eps: 14 }, notes: 'Wikipedia: whether it belongs to the DC Animated Universe "is unclear … still disputed", so it is not placed there.' },
  { id: 'gotham-girls', title: 'Gotham Girls', continuity: 'dcau', platform: 'warnerbros-com', studio: 'warner-bros-animation', article: 'Gotham Girls', rev: 1377105572,
    seasons: [[1, 10, '2000-07-27', '2000-12-14'], [2, 10, '2001-06-05', '2001-10-09'], [3, 10, '2002-07-16', '2002-11-19']], notes: 'Wikipedia: "It takes place in the DC Animated Universe." The DC Animated Universe article says season 1 had 11 episodes; the Gotham Girls article lists 10.' },
  { id: 'mister-miracle', title: 'Mister Miracle', continuity: 'dcu', platform: 'platform-not-stated', studio: 'dc-studios', article: 'DC Universe (franchise)', rev: 1388236376,
    single: { date: '2028', eps: 8, note: 'Year only: "expected to be released in 2028" (Collider, 2026-10-15). Network TBA.' }, notes: 'A DCU animated series.' },
  { id: 'dc-super-hero-girls-2015', title: 'DC Super Hero Girls (2015 web series)', continuity: 'dc-super-hero-girls-2015', platform: 'youtube', studio: 'warner-bros-animation', article: 'DC Super Hero Girls (2015 web series)', rev: 0,
    seasons: [[1, 13, '2015-10-01', '2016-02-25'], [2, 26, '2016-04-21', '2017-01-12'], [3, 26, '2017-01-26', '2017-11-30'], [4, 24, '2018-01-18', '2018-06-28'], [5, 23, '2018-08-02', '2018-12-27']], notes: '' },
  { id: 'dc-super-hero-girls-2019', title: 'DC Super Hero Girls (2019 TV series)', continuity: 'dc-super-hero-girls-2019', platform: 'cartoon-network', studio: 'warner-bros-animation', article: 'DC Super Hero Girls (TV series)', rev: 0,
    seasons: [[1, 52, '2019-03-08', '2020-12-27'], [2, 26, '2021-06-06', '2021-10-24']], notes: 'A separate series from the 2015 web series.',
    links: [{ to: 'teen-titans-go-dc-super-hero-girls-mayhem-in-the-multiverse', kind: 'crossover', note: 'Crossover film with Teen Titans Go!' }] },
  { id: 'batman-caped-crusader', title: 'Batman: Caped Crusader', continuity: 'batman-caped-crusader', platform: 'prime-video', studio: 'warner-bros-animation', article: 'Batman: Caped Crusader', rev: 1387869955,
    seasons: [[1, 10, '2024-08-01', null], [2, 10, '2026-07-31', null]], notes: 'Called a "spiritual successor" to Batman: The Animated Series; not placed in the DCAU. Each season was released all at once.' },
  { id: 'my-adventures-with-superman', title: 'My Adventures with Superman', continuity: 'my-adventures-with-superman', platform: 'adult-swim', studio: 'warner-bros-animation', article: 'My Adventures with Superman', rev: 1387979384,
    seasons: [[1, 10, '2023-07-07', '2023-09-01'], [2, 10, '2024-05-26', '2024-07-21'], [3, 10, '2026-06-14', '2026-08-16']], notes: '' },
];
const NEW_CONTS: [string, string, string][] = [
  ['dc-super-hero-girls-2015', 'DC Super Hero Girls (2015 web series)', 'DCSHG 2015'],
  ['dc-super-hero-girls-2019', 'DC Super Hero Girls (2019 series)', 'DCSHG 2019'],
  ['batman-caped-crusader', 'Batman: Caped Crusader', 'Caped Crusader'],
  ['my-adventures-with-superman', 'My Adventures with Superman', 'MAWS'],
];
const slug = (s: string) => s.normalize('NFKD').replace(/['’!]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const platforms = PlatformsFile.parse(JSON.parse(await readFile('data/registry/platforms.json', 'utf8')));
if (!platforms.some((p) => p.id === 'warnerbros-com')) platforms.push({ id: 'warnerbros-com', label: 'warnerbros.com (web)', kind: 'streaming', note: 'Early-2000s web animation on the Warner Bros. website.' });
await save('data/registry/platforms.json', platforms);

const conts = ContinuitiesFile.parse(JSON.parse(await readFile('data/dc/continuities.json', 'utf8')));
let order = Math.max(...conts.map((c) => c.order));
for (const [id, name, short] of NEW_CONTS) if (!conts.some((c) => c.id === id)) {
  const s = SERIES.find((x) => x.continuity === id)!;
  const c: Continuity = { id, universe: 'dc', name, short_name: short, order: ++order, kind: 'shared', calendar: { kind: 'ordered-only' }, branches: [MAIN], grouping_schemes: [], alt_orders: [], description: s.notes, source_urls: [W(s.article)], notes: '' };
  conts.push(c);
}
await save('data/dc/continuities.json', conts);

const titles = TitlesFile.parse(JSON.parse(await readFile('data/dc/titles.json', 'utf8')));
const used = (cid: string) => new Set(titles.filter((t) => t.continuity === cid).flatMap((t) => t.units.map((u) => u.in_universe.order_index)));
const nextIdx = (cid: string) => Math.max(0, ...used(cid)) + 10;
const iuUnplaced = (note: string, idx: number): Unit['in_universe'] => ({ start: null, end: null, label: 'No confirmed placement', precision: 'relative', confidence: 'inferred', note, order_index: idx, relative_to: null });
const unit = (id: string, label: string, date: string | null, end: string | null, src: string[], iu: Unit['in_universe'], extra: Partial<Unit> = {}): Unit => ({
  id, label, season: null, episode_range: null, episode_count: null, runtime_min: null, pages: null, word_count: null, word_count_source: null, timeline_branch: 'main', canon_tier: null,
  in_universe: iu, release: { date, end_date: end, year: date ? Number(date.slice(0, 4)) : null, note: '' }, status: status(date), groupings: {},
  platform_or_network: null, source_keys: {}, source_urls: src, notes: '', ...extra,
});
const title = (id: string, name: string, type: Title['type'], continuity: string, studio: string, platform: string, enwiki: string | null, src: string[], units: Unit[], notes: string, links: Title['links'] = []): Title => ({
  id, title: name, sort_title: null, type, universe: 'dc', continuity, studio_brand: studio, label: null, platform_or_network: platform,
  canon_tier: 'core', characters: [], franchises: [], status: units.some((u) => u.status === 'released') ? 'released' : 'upcoming',
  external_ids: { enwiki, wikidata: null, tmdb: null, imdb: null }, source_urls: src, notes, units, links, constituents: [], credits: [],
});
let added = 0;
for (const [name, date, cid, bundled] of SHORTS) {
  const id = slug(name);
  if (titles.some((t) => t.id === id)) continue;
  const src = [OLD(DCUAOM.rev), W(DCUAOM.article)];
  let iu: Unit['in_universe'];
  if (id === 'dc-showcase-constantine-the-house-of-mystery') {
    const after = titles.find((t) => t.id === 'justice-league-dark-apokolips-war')!.units[0]!.in_universe.order_index;
    let idx = after + 5; while (used(cid).has(idx)) idx++;
    iu = { start: null, end: null, label: 'Right after Apokolips War', precision: 'relative', confidence: 'stated', note: 'Wikipedia: "Immediately following the ending of Justice League Dark: Apokolips War".', order_index: idx, relative_to: { after: 'justice-league-dark-apokolips-war', before: null } };
  } else iu = cid === 'dc-animated-standalone'
    ? { start: null, end: null, label: 'Standalone', precision: 'relative', confidence: 'stated', note: 'Standalone short; listed by release.', order_index: nextIdx(cid), relative_to: null }
    : iuUnplaced('Wikipedia: "Jeremy Adams confirmed in 2022 that the short is part of the Tomorrowverse." No placement within it is given.', nextIdx(cid));
  const links: Title['links'] = id === 'dc-showcase-catwoman' ? [{ to: 'batman-year-one-animated', kind: 'continues', note: 'A continuation of her storyline in Batman: Year One' }]
    : id === 'batman-death-in-the-family' ? [{ to: 'batman-under-the-red-hood', kind: 'sequel', note: '' }] : [];
  titles.push(title(id, name, 'special', cid, 'warner-bros-animation', 'home-media', null, src,
    [unit(id, 'Short', date, null, src, iu, { release: { date, end_date: null, year: Number(date.slice(0, 4)), note: `Home-media release, bundled with ${bundled}.` } })],
    'DC Showcase animated short.', links));
  added++;
}
for (const s of SERIES) {
  if (titles.some((t) => t.id === s.id)) continue;
  const src = [...(s.rev ? [OLD(s.rev)] : []), W(s.article)];
  const existing = !NEW_CONTS.some(([id]) => id === s.continuity);
  const iuFor = (k: number): Unit['in_universe'] => s.continuity === 'dc-animated-standalone'
    ? { start: null, end: null, label: 'Standalone', precision: 'relative', confidence: 'stated', note: 'Standalone; listed by release.', order_index: nextIdx(s.continuity) + k * 10, relative_to: null }
    : existing
    ? iuUnplaced(s.continuity === 'dcu' ? 'Unreleased; not placed until release.' : 'The sources give no in-universe year.', nextIdx(s.continuity) + k * 10)
    : { start: null, end: null, label: 'Story order (no calendar)', precision: 'relative', confidence: 'stated', note: 'Listed by release.', order_index: (k + 1) * 10, relative_to: null };
  const units = s.seasons
    ? s.seasons.map(([n, eps, start, end], k) => unit(`${s.id}-s${n}`, `Season ${n}`, start, end, src, iuFor(k), { season: n, episode_count: eps, source_keys: { 'release-season': String(n) } }))
    : [unit(s.id, 'Series', s.single!.date, s.single!.end ?? null, src, iuFor(0), { episode_count: s.single!.eps ?? null, release: { date: s.single!.date, end_date: s.single!.end ?? null, year: s.single!.date ? Number(s.single!.date.slice(0, 4)) : null, note: s.single!.note ?? '' } })];
  if (s.continuity === 'dcu') units[0]!.in_universe = { ...units[0]!.in_universe, label: 'Not yet placed (unreleased)', confidence: 'disputed' };
  titles.push(title(s.id, s.title, 'animated-series', s.continuity, s.studio, s.platform, s.article.includes('(franchise)') || s.article === 'DC Animated Universe' ? null : s.article, src, units, s.notes, s.links ?? []));
  added++;
}
await save('data/dc/titles.json', titles);
console.log(`dc-remaining: ${added} title(s) added`);
