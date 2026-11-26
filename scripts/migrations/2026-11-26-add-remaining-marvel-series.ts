// Migration (2026-11-26), user request: "each and every TV series". Adds the Marvel Television
// production-library series not yet in the data, Fox's X-Men TV series, and the non-MCU Marvel
// Animation / Marvel Studios Animation series. Release data from each article's season table or
// infobox (cached in data/sources). Continuity groupings only where Wikipedia states them.
// Idempotent: titles already present are skipped.
import { readFile, writeFile } from 'node:fs/promises';
import { extractInfobox, extractSeriesOverview, loadWikitext } from '../build/extract.ts';
import { findTemplates, parseDateTemplate } from '../build/wikitext.ts';

function animeParts(src: string, name: string) {
  const t = findTemplates(src, /^Infobox animanga\/Video$/).find((x) => x.params.title?.trim() === name);
  return t ? [{ label: 'Series', season: 1, episodes: 12, start: parseDateTemplate(t.params.first), end: parseDateTemplate(t.params.last) }] : [];
}
import { ContinuitiesFile, PlatformsFile, StudiosFile, TagsFile, TitlesFile, type Continuity, type Title, type Unit } from '../../src/domain/schema.ts';

const TODAY = process.env.TIMELINER_TODAY ?? new Date().toISOString().slice(0, 10);
const enc = (t: string) => 'https://en.wikipedia.org/wiki/' + encodeURIComponent(t.replace(/ /g, '_')).replace(/%3A/g, ':').replace(/%28/g, '(').replace(/%29/g, ')').replace(/%27/g, "'");
const rd = async (p: string) => JSON.parse(await readFile(p, 'utf8'));
const wr = (p: string, v: unknown) => writeFile(p, JSON.stringify(v, null, 2) + '\n', 'utf8');

// ---------------- registries
const studios = StudiosFile.parse(await rd('data/registry/studios.json'));
const addStudio = (s: (typeof studios)[number]) => { if (!studios.some((x) => x.id === s.id)) studios.push(s); };
addStudio({ id: 'marvel-animation-inc', label: 'Marvel Animation (production company, 2008–)', short_label: 'Marvel Animation (co.)', kind: 'studio', parent: null, group: 'Marvel Animation', active: { from: 2008, to: null },
  note: 'The company whose production library Wikipedia\'s "Marvel Animation" article lists (Disney XD era and earlier). Not the same as the 2024 Marvel Studios "Marvel Animation" label.' });
const mal = studios.find((s) => s.id === 'marvel-animation');
if (mal) { mal.label = 'Marvel Animation (Marvel Studios label, 2024–)'; mal.group = 'Marvel Animation'; }
const platforms = PlatformsFile.parse(await rd('data/registry/platforms.json'));
for (const p of [
  { id: 'abc-com', label: 'ABC.com (digital)', kind: 'streaming' as const, note: '' },
  { id: 'fx', label: 'FX', kind: 'cable' as const, note: '' },
  { id: 'disney-xd', label: 'Disney XD', kind: 'cable' as const, note: '' },
  { id: 'disney-jr', label: 'Disney Jr.', kind: 'cable' as const, note: '' },
  { id: 'disney-channel', label: 'Disney Channel', kind: 'cable' as const, note: '' },
  { id: 'nicktoons', label: 'Nicktoons', kind: 'cable' as const, note: '' },
  { id: 'animax', label: 'Animax (Japan)', kind: 'cable' as const, note: '' },
  { id: 'cartoon-network', label: 'Cartoon Network', kind: 'cable' as const, note: '' },
  { id: 'fox', label: 'Fox', kind: 'broadcast' as const, note: 'Fox broadcast network (not the 20th Century Fox studio).' },
]) if (!platforms.some((x) => x.id === p.id)) platforms.push(p);

// ---------------- continuities
const conts = ContinuitiesFile.parse(await rd('data/marvel/continuities.json'));
const ordered = (id: string, name: string, short: string, order: number, kind: Continuity['kind'], description: string, sources: string[], notes = ''): Continuity => ({
  id, universe: 'marvel', name, short_name: short, order, kind, calendar: { kind: 'ordered-only' },
  branches: [{ id: 'main', label: 'Main', marker: 'dot', description: '', placeable: true, parent: null, diverges_at: null, merges_into: null, is_main: true }],
  grouping_schemes: [], alt_orders: [], description, source_urls: sources.map(enc), notes,
});
for (const c of [
  ordered('marvel-disney-xd', 'Marvel Disney XD animated continuity', 'Disney XD', 7, 'shared', 'Avengers Assemble, Guardians of the Galaxy (TV) and Spider-Man (2017).', ['Spider-Man (2017 TV series)'],
    'Spider-Man (2017): "The series\' incarnation of Spider-Man makes guest appearances in Guardians of the Galaxy and the fifth season of Avengers Assemble, which are set in the same continuity." Whether Ultimate Spider-Man and Hulk and the Agents of S.M.A.S.H. share it is not stated in the fetched sources, so they are in the standalone collection.'),
  ordered('marvel-anime', 'Marvel Anime', 'Marvel Anime', 8, 'shared', 'Madhouse\'s four 12-episode series (2010–2011).', ['Marvel Anime'], '"It will create an entire parallel universe for Marvel" (Simon Philips, Marvel International).'),
  ordered('spidey-friends', 'Spidey and His Amazing Friends', 'Spidey', 9, 'shared', 'Disney Jr. preschool series and its spin-off.', ['Spidey and His Amazing Friends', 'Iron Man and His Awesome Friends']),
  ordered('marvel-animation-standalone', 'Other Marvel animated and adult animated series', 'Other animation', 10, 'standalone-collection', 'Each series is its own continuity; listed by release.', ['Marvel Animation', 'Marvel Television']),
]) if (!conts.some((x) => x.id === c.id)) conts.push(c);
const fox = conts.find((c) => c.id === 'fox-x-men')!;
if (!fox.branches.some((b) => b.id === 'gifted-timeline')) fox.branches.push({ id: 'gifted-timeline', label: 'The Gifted (alternate timeline)', marker: 'square', description: 'The Gifted "is set in an alternate timeline to the X-Men film series where the X-Men have disappeared."', placeable: true, parent: 'original', diverges_at: null, merges_into: null, is_main: false });

// ---------------- titles
interface Spec { id: string; title: string; wiki: string; type: Title['type']; continuity: string; studio: string; label?: string; platform: string; tier?: Title['canon_tier']; branch?: string; chars?: string[]; teams?: string[]; note: string; links?: Title['links']; seasons?: 'table' | 'series'; anime?: string }
const SPECS: Spec[] = [
  { id: 'agents-of-shield-slingshot', title: 'Agents of S.H.I.E.L.D.: Slingshot', wiki: 'Agents of S.H.I.E.L.D.: Slingshot', type: 'series', continuity: 'mcu', studio: 'marvel-television-division', platform: 'abc-com', tier: 'adjacent', branch: 'sacred-timeline', teams: ['shield'],
    note: '"It is set in the Marvel Cinematic Universe (MCU) … it is a supplement to Agents of S.H.I.E.L.D." Six-episode digital series; not placed by year.', links: [{ to: 'agents-of-shield', kind: 'spinoff', note: 'Digital supplement' }] },
  { id: 'legion', title: 'Legion', wiki: 'Legion (TV series)', type: 'series', continuity: 'fox-x-men', studio: 'marvel-television-division', platform: 'fx', tier: 'adjacent', teams: ['x-men'], seasons: 'table',
    note: 'Showrunner Hawley: depicts the title character\'s "subjective reality" and would not have to address connections to the films. No in-universe year or placement given.' },
  { id: 'the-gifted', title: 'The Gifted', wiki: 'The Gifted (American TV series)', type: 'series', continuity: 'fox-x-men', studio: 'marvel-television-division', platform: 'fox', tier: 'adjacent', branch: 'gifted-timeline', teams: ['x-men'], seasons: 'table',
    note: '"it is set in an alternate timeline to the X-Men film series where the X-Men have disappeared." No year given.' },
  { id: 'avengers-assemble', title: 'Avengers Assemble', wiki: 'Avengers Assemble (TV series)', type: 'animated-series', continuity: 'marvel-disney-xd', studio: 'marvel-animation-inc', platform: 'disney-xd', chars: ['iron-man', 'captain-america', 'thor', 'hulk', 'black-widow', 'hawkeye'], teams: ['avengers'], note: 'Release order (shared Disney XD continuity).' },
  { id: 'guardians-of-the-galaxy-animated', title: 'Guardians of the Galaxy (animated series)', wiki: 'Guardians of the Galaxy (TV series)', type: 'animated-series', continuity: 'marvel-disney-xd', studio: 'marvel-animation-inc', platform: 'disney-xd', chars: ['star-lord', 'groot'], teams: ['guardians-of-the-galaxy'], note: '"features the same main characters as the film of the same name, although it is not a part of the Marvel Cinematic Universe."' },
  { id: 'spider-man-2017-animated', title: 'Spider-Man (2017 animated series)', wiki: 'Spider-Man (2017 TV series)', type: 'animated-series', continuity: 'marvel-disney-xd', studio: 'marvel-animation-inc', platform: 'disney-xd', chars: ['spider-man'], teams: ['spider-man-franchise'], note: 'Release order (shared Disney XD continuity).' },
  ...(['Iron Man', 'Wolverine', 'X-Men', 'Blade'] as const).map((a): Spec => ({ id: `marvel-anime-${a.toLowerCase().replace(/\W+/g, '-')}`, title: `Marvel Anime: ${a}`, wiki: 'Marvel Anime', type: 'animated-series', continuity: 'marvel-anime', studio: 'marvel-animation-inc', platform: 'animax',
    chars: a === 'Iron Man' ? ['iron-man'] : a === 'Wolverine' ? ['wolverine'] : a === 'X-Men' ? ['professor-x', 'wolverine'] : [], teams: a === 'X-Men' ? ['x-men'] : [], anime: a, note: 'One of four 12-episode Madhouse series; release order.' })),
  { id: 'spidey-and-his-amazing-friends', title: 'Spidey and His Amazing Friends', wiki: 'Spidey and His Amazing Friends', type: 'animated-series', continuity: 'spidey-friends', studio: 'marvel-studios', label: 'marvel-studios-animation', platform: 'disney-jr', chars: ['spider-man'], teams: ['spider-man-franchise'], note: 'Preschool series; release order.' },
  { id: 'iron-man-and-his-awesome-friends', title: 'Iron Man and His Awesome Friends', wiki: 'Iron Man and His Awesome Friends', type: 'animated-series', continuity: 'spidey-friends', studio: 'marvel-studios', label: 'marvel-studios-animation', platform: 'disney-jr', chars: ['iron-man'],
    note: '"Produced by Marvel Studios Animation and Atomic Cartoons as a spin-off of Spidey and His Amazing Friends".', links: [{ to: 'spidey-and-his-amazing-friends', kind: 'spinoff', note: '' }] },
  ...([
    ['the-super-hero-squad-show', 'The Super Hero Squad Show', 'The Super Hero Squad Show', 'cartoon-network', [], ['avengers']],
    ['iron-man-armored-adventures', 'Iron Man: Armored Adventures', 'Iron Man: Armored Adventures', 'nicktoons', ['iron-man'], []],
    ['wolverine-and-the-x-men', 'Wolverine and the X-Men', 'Wolverine and the X-Men (TV series)', 'nicktoons', ['wolverine', 'professor-x'], ['x-men']],
    ['the-avengers-earths-mightiest-heroes', "The Avengers: Earth's Mightiest Heroes", "The Avengers: Earth's Mightiest Heroes", 'disney-xd', ['iron-man', 'captain-america', 'thor', 'hulk'], ['avengers']],
    ['ultimate-spider-man', 'Ultimate Spider-Man', 'Ultimate Spider-Man (TV series)', 'disney-xd', ['spider-man', 'nick-fury'], ['spider-man-franchise', 'shield']],
    ['hulk-and-the-agents-of-smash', 'Hulk and the Agents of S.M.A.S.H.', 'Hulk and the Agents of S.M.A.S.H.', 'disney-xd', ['hulk', 'she-hulk'], []],
    ['moon-girl-and-devil-dinosaur', 'Moon Girl and Devil Dinosaur', 'Moon Girl and Devil Dinosaur', 'disney-channel', [], []],
  ] as const).map(([id, title, wiki, platform, chars, teams]): Spec => ({ id, title, wiki, type: 'animated-series', continuity: 'marvel-animation-standalone', studio: 'marvel-animation-inc', platform, chars: [...chars], teams: [...teams], seasons: id === 'moon-girl-and-devil-dinosaur' ? 'table' : 'series', note: 'Standalone continuity; listed by release.' })),
  { id: 'modok', title: 'M.O.D.O.K.', wiki: 'M.O.D.O.K. (TV series)', type: 'animated-series', continuity: 'marvel-animation-standalone', studio: 'marvel-television-division', platform: 'hulu', note: 'Reviews describe it as "outside the Marvel Cinematic Universe"; standalone.' },
  { id: 'hit-monkey', title: 'Hit-Monkey', wiki: 'Hit-Monkey (TV series)', type: 'animated-series', continuity: 'marvel-animation-standalone', studio: 'marvel-television-division', platform: 'hulu', seasons: 'table', note: 'Standalone adult animated series; listed by release.' },
];

const status = (d: string | null) => (d && (d.length === 10 ? d <= TODAY : Number(d.slice(0, 4)) < Number(TODAY.slice(0, 4))) ? 'released' : 'upcoming') as Unit['status'];
const titles: Title[] = TitlesFile.parse(await rd('data/marvel/titles.json'));
let added = 0;
for (const s of SPECS) {
  if (titles.some((t) => t.id === s.id)) continue;
  const src = await loadWikitext(s.wiki);
  const ib = extractInfobox(src);
  const cont = conts.find((c) => c.id === s.continuity)!;
  const branch = s.branch ?? cont.branches.find((b) => b.is_main)!.id;
  let parts: { label: string; season: number | null; episodes: number | null; start: string | null; end: string | null }[] = [];
  if (s.anime) {
    const box = /\{\{Infobox animanga\/Video\s*\|\s*title\s*=\s*([^\n]+)\n\|\s*first\s*=\s*([^\n]+)\n\|\s*last\s*=\s*([^\n]+)/g;
    for (const m of src.matchAll(box)) if (m[1]!.trim() === s.anime) parts = [{ label: 'Series', season: 1, episodes: 12, start: parseDateTemplate(m[2]!), end: parseDateTemplate(m[3]!) }];
  } else if (s.seasons === 'table') {
    parts = extractSeriesOverview(src, s.wiki, s.wiki).map((r) => ({ label: `Season ${r.season}`, season: r.season!, episodes: r.episodes ?? null, start: r.start, end: r.end ?? null }));
  }
  if (!parts.length) {
    const n = ib.num_seasons ? Number(ib.num_seasons) : null;
    parts = [{ label: n && n > 1 ? `Series (seasons 1–${n})` : 'Series', season: 1, episodes: ib.num_episodes ? Number(ib.num_episodes) : null, start: ib.first_aired ?? ib.released ?? null, end: ib.last_aired && /^\d{4}/.test(ib.last_aired) ? ib.last_aired : null }];
  }
  const units: Unit[] = parts.map((p) => ({
    id: parts.length === 1 && p.label.startsWith('Series') ? `${s.id}-series` : `${s.id}-s${p.season}`,
    label: p.label, season: p.season, episode_range: null, episode_count: p.episodes, runtime_min: null,
    timeline_branch: branch, canon_tier: null,
    in_universe: { start: null, end: null, label: p.label, precision: 'relative', confidence: 'inferred', note: s.note, order_index: 0, relative_to: null },
    release: { date: p.start, end_date: p.end, year: p.start ? Number(p.start.slice(0, 4)) : null, note: p.label.startsWith('Series (') ? 'Series-level dates from the article infobox; per-season split is a TODO.' : '' },
    status: status(p.start), groupings: Object.fromEntries(cont.grouping_schemes.map((g) => [g, null])), platform_or_network: null,
    source_keys: { 'release-season': String(p.season ?? 1) }, source_urls: [enc(s.wiki)], notes: '',
  }));
  titles.push({
    id: s.id, title: s.title, sort_title: s.title.startsWith('The ') ? s.title.slice(4) : null, type: s.type, universe: 'marvel', continuity: s.continuity,
    studio_brand: s.studio, label: s.label ?? null, platform_or_network: s.platform, canon_tier: s.tier ?? 'core',
    characters: s.chars ?? [], franchises: s.teams ?? [], status: units.some((u) => u.status === 'released') ? 'released' : 'upcoming',
    external_ids: { enwiki: s.wiki, wikidata: null, tmdb: null, imdb: null }, source_urls: [enc(s.wiki)], notes: '', units, links: s.links ?? [], constituents: [],
  });
  added++;
}

// repair: anime units created before the infobox parser fix
const animeSrc = await loadWikitext('Marvel Anime');
for (const t of titles.filter((x) => x.continuity === 'marvel-anime')) {
  const u = t.units[0]!;
  if (u.release.date) continue;
  const p = animeParts(animeSrc, t.title.replace('Marvel Anime: ', ''))[0];
  if (p) { u.release = { date: p.start, end_date: p.end, year: p.start ? Number(p.start.slice(0, 4)) : null, note: '' }; u.status = status(p.start); t.status = u.status; u.episode_count = 12; }
}

// ---------------- order_index for affected continuities (release order; MCU insert after AoS S4)
for (const cid of ['marvel-disney-xd', 'marvel-anime', 'spidey-friends', 'marvel-animation-standalone']) {
  const us = titles.filter((t) => t.continuity === cid).flatMap((t) => t.units).sort((a, b) => (a.release.date ?? '9999').localeCompare(b.release.date ?? '9999'));
  us.forEach((u, i) => { u.in_universe.order_index = (i + 1) * 10; });
}
const mcuUnits = titles.filter((t) => t.continuity === 'mcu').flatMap((t) => t.units);
const sl = mcuUnits.find((u) => u.id === 'agents-of-shield-slingshot-series');
if (sl && sl.in_universe.order_index === 0) {
  const anchor = mcuUnits.find((u) => u.id === 'agents-of-shield-s4')!;
  sl.in_universe.order_index = anchor.in_universe.order_index + 1;
  sl.in_universe.relative_to = { after: 'agents-of-shield-s3', before: 'agents-of-shield-s4' };
  sl.in_universe.note += ' Released between seasons 3 and 4 (December 2016); placed alongside season 4.';
}
const foxUnits = titles.filter((t) => t.continuity === 'fox-x-men').flatMap((t) => t.units);
let maxFox = Math.max(...foxUnits.map((u) => u.in_universe.order_index));
for (const u of foxUnits.filter((u) => u.in_universe.order_index === 0).sort((a, b) => (a.release.date ?? '').localeCompare(b.release.date ?? ''))) u.in_universe.order_index = (maxFox += 10);

// tags
const tags = TagsFile.parse(await rd('data/marvel/tags.json'));
await wr('data/registry/studios.json', StudiosFile.parse(studios));
await wr('data/registry/platforms.json', PlatformsFile.parse(platforms));
await wr('data/marvel/continuities.json', ContinuitiesFile.parse(conts));
await wr('data/marvel/titles.json', TitlesFile.parse(titles));
await wr('data/marvel/tags.json', tags);
console.log(`added ${added} titles`);
