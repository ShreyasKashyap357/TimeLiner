// Migration (applied 2026-11-27), user decision D-19 / D-32: add the US re-edits of Toho films as their own
// titles, categorised as type "re-edit" in a separate "US versions" collection (so they never duplicate the
// Japanese originals on the timeline), each linked to its original with "re-edit-of". Data: English Wikipedia
// at the pinned revisions below (researched 2026-11-26). Gigantis' US date is disputed (1959-05-21 vs 06-02).
// Idempotent.
import { readFile, writeFile } from 'node:fs/promises';
import { ContinuitiesFile, StudiosFile, TitlesFile, type Title } from '../../src/domain/schema.ts';

const W = (t: string) => 'https://en.wikipedia.org/wiki/' + encodeURIComponent(t.replace(/ /g, '_')).replace(/%2C/g, ',').replace(/%21/g, '!').replace(/%28/g, '(').replace(/%29/g, ')');
const ITEMS = [
 {
  "id": "godzilla-king-of-the-monsters-1956",
  "title": "Godzilla, King of the Monsters!",
  "original": "godzilla-1954",
  "date": "1956-04-04",
  "studio": "trans-world-releasing",
  "distributor": "Trans World Releasing Corp. (US); studio credit Toho + Jewell Enterprises, Inc.",
  "runtime": 80,
  "quote": "It is a heavily re-edited American localization, or \"Americanization\", of the 1954 Japanese film Godzilla.",
  "wiki": "Godzilla, King of the Monsters!",
  "revid": 1387694987,
  "release_note": "Infobox: {{Film date|1956|4|4|New York City|1957|5|29|Japan}} (1957 date is the Japanese release of this version)"
 },
 {
  "id": "gigantis-the-fire-monster",
  "title": "Gigantis, the Fire Monster",
  "original": "godzilla-raids-again",
  "date": "1959-05-21",
  "studio": "warner-bros-pictures",
  "distributor": "Warner Bros. Pictures",
  "runtime": 78,
  "quote": "It is an American re-edited English dubbed version of Toho Co., Ltd.'s 1955 Japanese film Godzilla Raids Again",
  "wiki": "Gigantis, the Fire Monster",
  "revid": 1376937057,
  "release_note": ""
 },
 {
  "id": "king-kong-vs-godzilla-us",
  "title": "King Kong vs. Godzilla (American version)",
  "original": "king-kong-vs-godzilla",
  "date": "1963-06-26",
  "studio": "universal-pictures",
  "distributor": "Universal-International",
  "runtime": null,
  "quote": "A heavily re-edited \"Americanized\" version of the film was released theatrically in the United States by Universal International Inc. on June 26, 1963",
  "wiki": "King Kong vs. Godzilla",
  "revid": 1385112430,
  "release_note": "\"In North America, King Kong vs. Godzilla premiered in New York City on June 26, 1963.\""
 },
 {
  "id": "godzilla-vs-the-thing",
  "title": "Godzilla vs. the Thing",
  "original": "mothra-vs-godzilla",
  "date": "1964-08-26",
  "studio": "american-international-pictures",
  "distributor": "American International Pictures",
  "runtime": null,
  "quote": "The American version makes minimal cuts and is mostly faithful to the Japanese version; it also includes an additional sequence of the U.S. military launching missiles at Godzilla.",
  "wiki": "Mothra vs. Godzilla",
  "revid": 1383443611,
  "release_note": "\"AIP released the film as Godzilla vs. the Thing on August 26, 1964, when it premiered in Los Angeles.\" Wikipedia calls it an \"American version\" (Titra dub, minor cuts, Toho-shot extra sequence), not a heavy re-edit. Not in the franchise Localized releases table."
 },
 {
  "id": "ghidrah-the-three-headed-monster",
  "title": "Ghidrah, the Three-Headed Monster",
  "original": "ghidorah-the-three-headed-monster",
  "date": "1965-09-29",
  "studio": "continental-distributing",
  "distributor": "Continental Distributing (subsidiary of Walter Reade-Sterling, Inc.)",
  "runtime": 85,
  "quote": "The American version shifts some scenes and removes some outright, Akira Ifukube's score is replaced with library music during some of the Godzilla/Rodan battle scenes",
  "wiki": "Ghidorah, the Three-Headed Monster",
  "revid": 1383443790,
  "release_note": "\"The film was theatrically released in the United States on September 29, 1965, as Ghidrah, the Three-Headed Monster.\" Called the \"American version\". Not in the franchise Localized releases table."
 },
 {
  "id": "godzilla-1985",
  "title": "Godzilla 1985",
  "original": "the-return-of-godzilla",
  "date": "1985-08-23",
  "studio": "new-world-pictures",
  "distributor": "New World Pictures",
  "runtime": 87,
  "quote": "The film is a heavily re-edited American localization of the Japanese film The Return of Godzilla",
  "wiki": "Godzilla 1985",
  "revid": 1384240042,
  "release_note": ""
 },
 {
  "id": "godzilla-2000-us",
  "title": "Godzilla 2000",
  "original": "godzilla-2000-millennium",
  "date": "2000-08-18",
  "studio": "tristar",
  "distributor": "TriStar Pictures",
  "runtime": 99,
  "quote": "Sony spent approximately $300,000 to acquire the film, around $1 million to re-edit and dub the movie in English ... The English dubbed version of the film runs 99 minutes - 8 minutes shorter in comparison to the 107-minute Japanese version",
  "wiki": "Godzilla 2000",
  "revid": 1388009253,
  "release_note": "\"TriStar Pictures later distributed it throughout North America on August 18, 2000, under the title Godzilla 2000\" Extra: not in the requested list or the franchise table, but the article explicitly describes a re-edit."
 }
];

const NEW_STUDIOS = [
  { id: 'trans-world-releasing', label: 'Trans World Releasing Corp.', short_label: 'Trans World', kind: 'distributor' as const, parent: null, group: null, active: null, note: 'US distributor of Godzilla, King of the Monsters! (1956).' },
  { id: 'american-international-pictures', label: 'American International Pictures', short_label: 'AIP', kind: 'distributor' as const, parent: null, group: null, active: null, note: '' },
  { id: 'continental-distributing', label: 'Continental Distributing (Walter Reade-Sterling)', short_label: 'Continental', kind: 'distributor' as const, parent: null, group: null, active: null, note: '' },
  { id: 'new-world-pictures', label: 'New World Pictures', short_label: 'New World', kind: 'distributor' as const, parent: null, group: null, active: null, note: '' },
];

const sFile = 'data/registry/studios.json';
const studios = StudiosFile.parse(JSON.parse(await readFile(sFile, 'utf8')));
for (const s of NEW_STUDIOS) if (!studios.some((x) => x.id === s.id)) studios.push(s);
await writeFile(sFile, JSON.stringify(studios, null, 2) + '\n');

const cFile = 'data/godzilla-kong/continuities.json';
const conts = ContinuitiesFile.parse(JSON.parse(await readFile(cFile, 'utf8')));
if (!conts.some((c) => c.id === 'toho-us-versions')) conts.push({
  id: 'toho-us-versions', universe: 'godzilla-kong', name: 'US versions of Toho films (re-edits)', short_name: 'US re-edits',
  order: Math.max(...conts.map((c) => c.order)) + 1, kind: 'standalone-collection', calendar: { kind: 'ordered-only' },
  branches: [{ id: 'main', label: 'Main', marker: 'dot', description: '', placeable: true, parent: null, diverges_at: null, merges_into: null, is_main: true }],
  grouping_schemes: [], alt_orders: [],
  description: 'American re-edited versions released by US distributors. Each tells its original’s story (often with new footage), so it is listed here and linked to the original rather than placed on the Toho timeline. Dub-only US releases are not listed.',
  source_urls: [W('Godzilla (franchise)')], notes: '',
});
await writeFile(cFile, JSON.stringify(conts, null, 2) + '\n');

const tFile = 'data/godzilla-kong/titles.json';
const titles = TitlesFile.parse(JSON.parse(await readFile(tFile, 'utf8')));
let n = 0;
ITEMS.forEach((i, idx) => {
  if (titles.some((t) => t.id === i.id)) return;
  const orig = titles.find((t) => t.id === i.original);
  if (!orig) throw new Error(`original ${i.original} missing`);
  const src = [`https://en.wikipedia.org/w/index.php?oldid=${i.revid}`, W(i.wiki)];
  const t: Title = {
    id: i.id, title: i.title, sort_title: null, type: 're-edit', universe: 'godzilla-kong', continuity: 'toho-us-versions',
    studio_brand: i.studio, label: null, platform_or_network: 'theatrical', canon_tier: 'adjacent',
    characters: orig.characters, franchises: orig.franchises, status: 'released',
    external_ids: { enwiki: i.wiki, wikidata: null, tmdb: null, imdb: null }, source_urls: src,
    notes: `Wikipedia: "${i.quote}" US distributor: ${i.distributor}.`,
    links: [{ to: i.original, kind: 're-edit-of', note: '' }], constituents: [], credits: [],
    units: [{
      id: i.id, label: 'Film', season: null, episode_range: null, episode_count: null, runtime_min: i.runtime, pages: null, word_count: null,
      timeline_branch: 'main', canon_tier: null,
      in_universe: { start: null, end: null, label: `US version of ${orig.title}`, precision: 'relative', confidence: 'stated',
        note: 'Same story as the original; not placed separately on the Toho timeline.', order_index: (idx + 1) * 10, relative_to: null },
      release: { date: i.date, end_date: null, year: Number(i.date.slice(0, 4)), note: i.release_note || 'US release.' },
      status: 'released', groupings: {}, platform_or_network: null, source_keys: {}, source_urls: src, notes: '',
    }],
  };
  titles.push(t); n++;
});
await writeFile(tFile, JSON.stringify(titles, null, 2) + '\n');
console.log(`toho-us-reedits: ${n} title(s) added`);
