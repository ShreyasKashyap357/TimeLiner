// Migration (applied 2026-11-27), user question D-12 ("are they in the same world or not?") and D-13 (per-season
// split). Sources (English Wikipedia, revisions in data/sources/manifest.json):
//  - "Marvel Animation": "Marvel announced in May 2013, that the new shows, Avengers Assemble and Hulk and the
//    Agents of S.M.A.S.H., would be shown on Disney XD as part of the "Marvel Universe" block and would be a part of
//    the same fictional universe."
//  - "Spider-Man (2017 TV series)", citing writer Harrison Wilcox (2020-07-13): "Ultimate Spider-Man, Agents of
//    SMASH, and Seasons 1-4 of Avengers are all in the same continuity. Guardians, Marvel's Spider-Man, and Black
//    Panther's Quest are all in another continuity."
// So: two continuities. Avengers Assemble is split: seasons 1–4 join the 2012 continuity; season 5 (Black
// Panther's Quest) becomes its own title in the existing one. Season dates come from the episode-list articles.
// Old series-level unit ids are aliased to the new season ids, so watched progress carries over. Idempotent.
import { readFile, writeFile } from 'node:fs/promises';
import { AliasesFile, ContinuitiesFile, TitlesFile, type Title, type Unit } from '../../src/domain/schema.ts';

const W = (t: string) => 'https://en.wikipedia.org/wiki/' + encodeURIComponent(t.replace(/ /g, '_')).replace(/%28/g, '(').replace(/%29/g, ')').replace(/%2C/g, ',');
const save = (f: string, v: unknown) => writeFile(f, JSON.stringify(v, null, 2) + '\n');
const NEW = 'marvel-xd-2012';
const OLD = 'marvel-disney-xd';
const WILCOX = 'Ultimate Spider-Man, Agents of SMASH, and Seasons 1-4 of Avengers are all in the same continuity. Guardians, Marvel\'s Spider-Man, and Black Panther\'s Quest are all in another continuity.';

type S = [n: number, eps: number, start: string, end: string, label?: string];
const SEASONS: Record<string, { list: string; seasons: S[] }> = {
  'ultimate-spider-man': { list: 'List of Ultimate Spider-Man episodes', seasons: [[1, 26, '2012-04-01', '2012-10-28'], [2, 26, '2013-01-21', '2013-11-21'], [3, 26, '2014-03-13', '2015-10-24', 'Season 3: Web Warriors'], [4, 26, '2016-02-21', '2017-01-07', 'Season 4: vs. the Sinister 6']] },
  'hulk-and-the-agents-of-smash': { list: 'List of Hulk and the Agents of S.M.A.S.H. episodes', seasons: [[1, 26, '2013-08-11', '2014-12-03'], [2, 26, '2014-10-12', '2015-06-28']] },
  'avengers-assemble': { list: 'List of Avengers Assemble episodes', seasons: [[1, 26, '2013-05-26', '2014-05-25'], [2, 26, '2014-09-28', '2015-09-20'], [3, 26, '2016-03-13', '2017-01-28', 'Season 3: Ultron Revolution'], [4, 26, '2017-06-17', '2018-03-11', 'Season 4: Secret Wars']] },
};
const BPQ: S = [5, 23, '2018-09-23', '2019-02-24'];

const conts = ContinuitiesFile.parse(JSON.parse(await readFile('data/marvel/continuities.json', 'utf8')));
const old = conts.find((c) => c.id === OLD)!;
if (!conts.some((c) => c.id === NEW)) {
  conts.push({
    ...old, id: NEW, name: 'Marvel Universe block continuity (Disney XD, 2012–2018)', short_name: 'Disney XD 2012', order: old.order,
    description: 'Ultimate Spider-Man, Hulk and the Agents of S.M.A.S.H. and Avengers Assemble seasons 1–4. Marvel (May 2013): the shows "would be a part of the same fictional universe".',
    source_urls: [W('Marvel Animation'), W('Spider-Man (2017 TV series)')], alt_orders: [],
    notes: `Writer Harrison Wilcox, cited by Wikipedia: "${WILCOX}"`,
  });
  old.order += 0.5;
}
old.name = 'Marvel Disney XD continuity (2015–2020)';
old.short_name = 'Disney XD 2015';
old.description = 'Guardians of the Galaxy (2015), Spider-Man (2017) and Avengers: Black Panther\'s Quest (Avengers Assemble season 5).';
old.notes = `Spider-Man (2017): "…Guardians of the Galaxy and the fifth season of Avengers Assemble, which are set in the same continuity." Writer Harrison Wilcox, cited by Wikipedia: "${WILCOX}"`;
// Continuity order values must stay integers-compatible for sorting only; renumber all.
conts.sort((a, b) => a.order - b.order).forEach((c, i) => { c.order = i + 1; });
await save('data/marvel/continuities.json', conts);

const titles = TitlesFile.parse(JSON.parse(await readFile('data/marvel/titles.json', 'utf8')));
const aliases = AliasesFile.parse(JSON.parse(await readFile('data/marvel/aliases.json', 'utf8')));
const seasonUnits = (t: Title, list: string, seasons: S[]): Unit[] => seasons.map(([n, eps, start, end, label]) => ({
  ...t.units[0]!, id: `${t.id}-s${n}`, label: label ?? `Season ${n}`, season: n, episode_count: eps,
  release: { date: start, end_date: end, year: Number(start.slice(0, 4)), note: '' }, status: 'released',
  in_universe: { ...t.units[0]!.in_universe, label: 'Story order (no calendar)', note: 'No in-universe dates in the sources; listed by release.' },
  source_keys: { 'release-season': String(n) }, source_urls: [W(list), ...t.units[0]!.source_urls.filter((u) => !u.includes('episodes'))],
}));
for (const [id, { list, seasons }] of Object.entries(SEASONS)) {
  const t = titles.find((x) => x.id === id)!;
  if (t.units.length === 1 && t.units[0]!.id.endsWith('-series')) {
    const oldId = t.units[0]!.id;
    t.units = seasonUnits(t, list, seasons);
    aliases[oldId] = [...t.units.map((u) => u.id), ...(id === 'avengers-assemble' ? ['avengers-black-panthers-quest'] : [])];
  }
  t.continuity = NEW;
  t.canon_tier = 'core';
}
if (!titles.some((t) => t.id === 'avengers-black-panthers-quest')) {
  const aa = titles.find((x) => x.id === 'avengers-assemble')!;
  const [n, eps, start, end] = BPQ;
  titles.push({
    ...aa, id: 'avengers-black-panthers-quest', title: 'Avengers: Black Panther\'s Quest', sort_title: null, continuity: OLD,
    notes: 'Season 5 of Avengers Assemble, retitled. It is set in the Guardians of the Galaxy / Spider-Man (2017) continuity, not the earlier seasons\' one (Wilcox, cited by Wikipedia).',
    links: [{ to: 'avengers-assemble', kind: 'continues', note: 'Season 5 of the same series, in a different continuity' }], credits: [],
    external_ids: { enwiki: null, wikidata: null, tmdb: null, imdb: null },
    units: [{ ...aa.units[0]!, id: 'avengers-black-panthers-quest', label: 'Season 5', season: n, episode_count: eps,
      release: { date: start, end_date: end, year: 2018, note: '' }, source_keys: { 'release-season': String(n) }, source_urls: [W('List of Avengers Assemble episodes')] }],
  });
}
// order_index: release order inside each of the two continuities.
for (const cid of [NEW, OLD]) {
  titles.filter((t) => t.continuity === cid).flatMap((t) => t.units)
    .sort((a, b) => (a.release.date ?? '9999').localeCompare(b.release.date ?? '9999'))
    .forEach((u, i) => { u.in_universe.order_index = (i + 1) * 10; });
}
await save('data/marvel/titles.json', titles);
await save('data/marvel/aliases.json', aliases);
console.log('marvel disney xd: two continuities, seasons split');
