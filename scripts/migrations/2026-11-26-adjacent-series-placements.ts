// Migration (applied 2026-11-26), user decision at Checkpoint 1: place the ABC / Hulu / Freeform
// seasons from sources and convey each source. Sources: Wikipedia season/series articles (tie-in
// statements, "Television series set in YYYY" categories) and MCU Fandom wiki year pages, whose
// dates are fan-reasoned from on-screen evidence. Hence nothing here is "stated" unless on-screen
// or in Wikipedia prose. All quotes were checked against the cached copies in data/sources/.
// Idempotent: units already dated are skipped.
import { readFile, writeFile } from 'node:fs/promises';
import { TitlesFile, type Title, type Unit } from '../../src/domain/schema.ts';

const WP = (t: string) => 'https://en.wikipedia.org/wiki/' + encodeURIComponent(t.replace(/ /g, '_')).replace(/%3A/g, ':').replace(/%2F/g, '/').replace(/%28/g, '(').replace(/%29/g, ')').replace(/%26/g, '&');
const FD = (t: string) => 'https://marvelcinematicuniverse.fandom.com/wiki/' + encodeURIComponent(t.replace(/ /g, '_')).replace(/%2F/g, '/');

interface P { y: number; y2: number; label: string; confidence: 'stated' | 'inferred' | 'disputed'; note: string; urls: string[] }
const PLACEMENTS: Record<string, P> = {
  'agents-of-shield-s1': { y: 2013, y2: 2014, label: '2013–2014', confidence: 'inferred',
    note: 'Wikipedia (season 1): "the episode "The Well" takes place directly after the events of Thor: The Dark World (2013)", with a Winter Soldier tie-in; article categories "Television series set in 2013/2014". MCU Fandom wiki (2013): an ID badge reads "2013SEP09", placing the opening episodes in September 2013.',
    urls: [WP('Agents of S.H.I.E.L.D. season 1'), FD('2013')] },
  'agents-of-shield-s2': { y: 2014, y2: 2015, label: '2014–2015', confidence: 'inferred',
    note: 'Wikipedia (season 2): Clark Gregg "stated that the season resumes months after the end of season one"; "The Dirty Half Dozen" leads "into the opening scene of Avengers: Age of Ultron" and "Scars" explores its aftermath. MCU Fandom wiki: opens "approximately late May or early June 2014"; "Scars" in May 2015.',
    urls: [WP('Agents of S.H.I.E.L.D. season 2'), FD('2014'), FD('2015')] },
  'agents-of-shield-s3': { y: 2015, y2: 2016, label: '2015–2016', confidence: 'inferred',
    note: 'Wikipedia (season 3): "set six months after the events that concluded the second season"; "Emancipation" "is set in the aftermath of Civil War". MCU Fandom wiki: first part "December 13, 2015 to January 24, 2016"; "Emancipation" shortly after Civil War\'s climax (2016).',
    urls: [WP('Agents of S.H.I.E.L.D. season 3'), FD('2015'), FD('2016')] },
  'agents-of-shield-s4': { y: 2017, y2: 2017, label: '2017', confidence: 'inferred',
    note: 'Wikipedia (season 4): affected by Civil War (2016); Guardians of the Galaxy Vol. 2 "takes place earlier in the MCU continuity than the season is set". MCU Fandom wiki: the season "ideally picks up in March 2017" (between-season events September 2016).',
    urls: [WP('Agents of S.H.I.E.L.D. season 4'), FD('2016'), FD('2017')] },
  'agents-of-shield-s5': { y: 2017, y2: 2018, label: '2017–2018 (part in 2091)', confidence: 'inferred',
    note: 'Wikipedia (season 5): "The last four episodes of the season are set during the events of Infinity War, taking place over a single day". MCU Fandom wiki: the team is sent "to the future, in the year 2091"; after returning, an on-screen monitor reads "12-06-2017".',
    urls: [WP('Agents of S.H.I.E.L.D. season 5'), FD('Agents of S.H.I.E.L.D./Season Five'), FD('2017'), FD('2018')] },
  'agents-of-shield-s6': { y: 2019, y2: 2019, label: '2019', confidence: 'disputed',
    note: 'Wikipedia (season 6): "The season begins one year after the end of the fifth season"; Endgame\'s five-year jump sets it "during a time that half of all life is still dead", and the producers acknowledged "the series no longer lined-up with the films\' timeline". MCU Fandom wiki: "space puff incident of 2019"; dated June 2019.',
    urls: [WP('Agents of S.H.I.E.L.D. season 6'), FD('2019')] },
  'agents-of-shield-s7': { y: 2019, y2: 2020, label: '2019–2020 (time travel 1931–1983)', confidence: 'disputed',
    note: 'Wikipedia (season 7): categories "Television series set in" 1931, 1955, 1973, 1976, 1982, 1983, 2019, 2020; epilogue "One year later". MCU Fandom wiki: returns to 2019; epilogue "July 4, 2020". Inherits season 6\'s conflict with Endgame.',
    urls: [WP('Agents of S.H.I.E.L.D. season 7'), FD('Agents of S.H.I.E.L.D./Season Seven'), FD('2019'), FD('2020')] },
  'inhumans-s1': { y: 2016, y2: 2016, label: '2016', confidence: 'inferred',
    note: 'Wikipedia gives no timing. MCU Fandom wiki (2016): after the Sokovia Accords (June 2016); "placing the show approximately around that date, from August 26-31, 2016".',
    urls: [WP('Inhumans (TV series)'), FD('2016')] },
  'runaways-s1': { y: 2017, y2: 2017, label: '2017', confidence: 'inferred',
    note: 'Wikipedia: characters "would not be concerned with the actions of the Avengers". MCU Fandom wiki (2017): "A majority of the evidence presented in the show suggests that the season takes place in October 2017."',
    urls: [WP('Runaways (TV series)'), FD('2017')] },
  'runaways-s2': { y: 2017, y2: 2017, label: '2017', confidence: 'inferred',
    note: 'MCU Fandom wiki (2017): picks up "a little over "24 hours" after the end of Season 1", October 23 to November 16, 2017.',
    urls: [WP('Runaways (TV series)'), FD('2017')] },
  'runaways-s3': { y: 2017, y2: 2018, label: '2017–2018', confidence: 'inferred',
    note: 'Wikipedia: includes a crossover with Cloak & Dagger. MCU Fandom wiki (2017): picks up "36 hours" later (November 18, 2017); "the present day events continue until May 26, 2018".',
    urls: [WP('Runaways (TV series)'), FD('2017'), FD('2018')] },
  'cloak-and-dagger-s1': { y: 2017, y2: 2017, label: '2017', confidence: 'disputed',
    note: 'Wikipedia (season 1): only "Eight years later". MCU Fandom wiki (2017): the evidence "is extremely contradictory" (2015–2018 considered); "February 2009/2017 comes out as the strongest option".',
    urls: [WP('Cloak & Dagger season 1'), FD('2017')] },
  'cloak-and-dagger-s2': { y: 2017, y2: 2017, label: '2017', confidence: 'inferred',
    note: 'Wikipedia (season 2): no timing. MCU Fandom wiki (2017): season 1\'s late events are "8 months" ago; main events "from October 28, 2017 to November 4, 2017".',
    urls: [WP('Cloak & Dagger season 2'), FD('2017')] },
  'helstrom-s1': { y: 2020, y2: 2020, label: '2020', confidence: 'disputed',
    note: 'Wikipedia: set in the MCU but would not cross over with the films. MCU Fandom wiki (2020): "the events of Helstrom Season 1 span from October 13-30, 2020", but that section is flagged as dubious on Fandom.',
    urls: [WP('Helstrom (TV series)'), FD('2020')] },
};

const file = 'data/marvel/titles.json';
const titles: Title[] = TitlesFile.parse(JSON.parse(await readFile(file, 'utf8')));
const mcu = titles.filter((t) => t.continuity === 'mcu').flatMap((t) => t.units.map((u) => ({ t, u })));
let changed = 0;
for (const { u } of mcu) {
  const p = PLACEMENTS[u.id];
  if (!p || u.in_universe.start) continue;
  u.in_universe = { ...u.in_universe, start: { y: p.y }, end: { y: p.y2 }, label: p.label, precision: p.y === p.y2 ? 'year' : 'range', confidence: p.confidence, note: p.note, relative_to: null, order_index: NaN };
  u.source_urls = [...new Set([...u.source_urls, ...p.urls])];
  changed++;
}
if (changed) {
  // Re-sequence the MCU: keep the existing order, insert each newly dated unit after the last
  // unit whose start year <= its start year (ties by release date), then renumber x10.
  const placedNew = mcu.filter((x) => Number.isNaN(x.u.in_universe.order_index)).sort((a, b) =>
    a.u.in_universe.start!.y - b.u.in_universe.start!.y || (a.u.release.date ?? '').localeCompare(b.u.release.date ?? ''));
  const seq: Unit[] = mcu.filter((x) => !Number.isNaN(x.u.in_universe.order_index)).sort((a, b) => a.u.in_universe.order_index - b.u.in_universe.order_index).map((x) => x.u);
  for (const { u } of placedNew) {
    let at = 0;
    seq.forEach((s, i) => { if (s.in_universe.start && s.in_universe.start.y <= u.in_universe.start!.y) at = i + 1; });
    seq.splice(at, 0, u);
  }
  seq.forEach((u, i) => { u.in_universe.order_index = (i + 1) * 10; });
  for (const t of titles) if (t.canon_tier === 'adjacent') t.notes = t.notes.replace("Not part of Wikipedia's MCU timeline diagram or the Disney+ timeline; canon status is ambiguous, so tier is 'adjacent'.", "Not part of Wikipedia's MCU timeline diagram or the Disney+ timeline; canon status is ambiguous, so tier is 'adjacent'. Placements come from Wikipedia tie-in statements and MCU Fandom wiki year pages (see each season's note).");
}
await writeFile(file, JSON.stringify(TitlesFile.parse(titles), null, 2) + '\n', 'utf8');
console.log(`placed ${changed} unit(s)`);
