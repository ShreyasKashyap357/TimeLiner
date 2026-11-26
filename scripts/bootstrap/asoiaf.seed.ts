// A Song of Ice and Fire / HBO seed (books pilot). Book in-universe years come from A Wiki of Ice and
// Fire (awoiaf), which cites but does not quote the books, so they are "inferred" (see DATA_NOTES).
// Years: negative = BC, positive = AC (no year 0). Books are listed in story order.
import { R, Y, UNRELEASED, single, type SeedIU, type SeedTitle, type SeedUnit } from './seed-kit.ts';

const ASOIAF = 'A Song of Ice and Fire';
const AW = (p: string) => `awoiaf:${p}`;
const book = (o: { id: string; title: string; wiki: string; type?: SeedTitle['type']; studio: string; platform?: string; date: string | null; dateNote?: string; dateSrc?: string; pages?: number; iu: SeedIU; series: string; chars?: string[]; teams?: string[]; notes?: string; tier?: SeedTitle['tier'] }): SeedTitle =>
  single({
    id: o.id, title: o.title, type: o.type ?? 'novel', wiki: o.wiki, continuity: 'asoiaf-books', studio: o.studio, platform: o.platform ?? 'print-hardcover',
    tier: o.tier, chars: o.chars, teams: o.teams, notes: o.notes, unitLabel: o.type === 'novella' ? 'Novella' : o.type === 'reference' ? 'Book' : 'Novel',
    iu: o.iu, pages: o.pages, grp: { 'book-series': o.series },
    rel: { date: o.date, note: o.dateNote ?? 'First publication.', src: o.dateSrc ?? o.wiki },
  });

// ================================================================ Books (story order)
export const BOOKS: SeedTitle[] = [
  book({ id: 'fire-and-blood', title: 'Fire & Blood', wiki: 'Fire & Blood (novel)', studio: 'bantam-books', date: '2018-11-20', pages: 736, series: 'targaryen-histories', teams: ['house-targaryen'], chars: ['aegon-the-conqueror', 'maegor', 'rhaenyra-targaryen', 'daemon-targaryen'],
    notes: 'Chronicle-style history; contains expanded versions of The Rogue Prince and The Princess and the Queen.',
    iu: Y(-2, '2 BC – 136 AC', 'inferred', 'Wikipedia: "covers the history of Westeros from Aegon\'s Conquest up to and through the regency of the boy king Aegon III Targaryen"; the Conquest war is 2–1 BC and the regency ends in 136 AC (A Wiki of Ice and Fire).', ['Fire & Blood (novel)', AW('136 AC')], 136) }),
  book({ id: 'the-rise-of-the-dragon', title: 'The Rise of the Dragon', wiki: 'The Rise of the Dragon', type: 'reference', studio: 'ten-speed-press', date: '2022-10-25', pages: 352, series: 'targaryen-histories', teams: ['house-targaryen'], tier: 'adjacent',
    notes: 'Illustrated companion "written in a more encyclopedic style"; not a narrative work, so tier adjacent.',
    iu: Y(-2, '2 BC – c. 131 AC', 'inferred', '"describing the history of House Targaryen from Aegon Targaryen\'s conquest of Westeros to the Dance of the Dragons civil war".', ['The Rise of the Dragon'], 131) }),
  book({ id: 'the-sons-of-the-dragon', title: 'The Sons of the Dragon', wiki: 'The Sons of the Dragon', type: 'novella', studio: 'bantam-spectra', platform: 'print-anthology', date: '2017-10-10', dateNote: 'First published in the anthology The Book of Swords.', series: 'targaryen-histories', chars: ['aegon-the-conqueror', 'maegor'], teams: ['house-targaryen'],
    iu: Y(37, '37–48 AC', 'inferred', 'Wikipedia: "centers on the death of Aegon I … concludes with the death of Maegor"; A Wiki of Ice and Fire: "37 AC was the final year of Aegon the Conqueror\'s reign" and "In 48 AC Maegor the Cruel\'s reign crumbled".', ['The Sons of the Dragon', AW('The Sons of the Dragon')], 48) }),
  book({ id: 'the-rogue-prince', title: 'The Rogue Prince', wiki: 'The Rogue Prince', type: 'novella', studio: 'bantam-spectra', platform: 'print-anthology', date: '2014-06-17', dateNote: 'First published in the anthology Rogues.', series: 'targaryen-histories', chars: ['daemon-targaryen', 'viserys-i', 'rhaenyra-targaryen'], teams: ['house-targaryen'],
    iu: Y(103, '103–129 AC', 'inferred', 'A Wiki of Ice and Fire: "The story takes off in 103 AC with the death of King Jaehaerys I … and ends in 129 AC".', [AW('The Rogue Prince')], 129) }),
  book({ id: 'the-princess-and-the-queen', title: 'The Princess and the Queen', wiki: 'The Princess and the Queen', type: 'novella', studio: 'tor-books', platform: 'print-anthology', date: '2013-12-03', dateNote: 'First published in the anthology Dangerous Women.', series: 'targaryen-histories', chars: ['rhaenyra-targaryen', 'alicent-hightower', 'aegon-ii', 'daemon-targaryen'], teams: ['house-targaryen'],
    iu: Y(129, '129–131 AC', 'inferred', 'A Wiki of Ice and Fire: "The story begins on the third day of the third month of 129 AC"; the Dance lasts "almost two and a half years".', [AW('The Princess and the Queen')], 131) }),
  book({ id: 'the-hedge-knight', title: 'The Hedge Knight', wiki: 'Tales of Dunk and Egg', type: 'novella', studio: 'harpercollins-voyager', platform: 'print-anthology', date: '1998-08-25', dateNote: 'First published in the anthology Legends (ed. Silverberg). Publisher from A Wiki of Ice and Fire. Collected in A Knight of the Seven Kingdoms (2015).', series: 'dunk-and-egg', chars: ['dunk', 'egg'],
    iu: Y(209, '209 AC', 'inferred', 'A Wiki of Ice and Fire: "The story takes place in 209 AC"; Wikipedia: "some 90 years before the events of the novels".', [AW('The Hedge Knight'), 'Tales of Dunk and Egg']) }),
  book({ id: 'the-sworn-sword', title: 'The Sworn Sword', wiki: 'Tales of Dunk and Egg', type: 'novella', studio: 'publisher-not-stated', platform: 'print-anthology', date: '2003-12-30', dateNote: 'First published in the anthology Legends II.', series: 'dunk-and-egg', chars: ['dunk', 'egg'],
    iu: Y(211, '211 AC', 'inferred', 'A Wiki of Ice and Fire: "a year and a half after the events of The Hedge Knight"; the Timeline places it in 211 AC.', [AW('The Sworn Sword'), AW('Timeline of major events')]) }),
  book({ id: 'the-mystery-knight', title: 'The Mystery Knight', wiki: 'Tales of Dunk and Egg', type: 'novella', studio: 'tor-books', platform: 'print-anthology', date: '2010-03-16', dateNote: 'First published in the anthology Warriors.', series: 'dunk-and-egg', chars: ['dunk', 'egg'],
    iu: Y(212, '212 AC', 'disputed', 'Its A Wiki of Ice and Fire page: "It is the year 212 AC"; the same wiki\'s Timeline puts it in the 211 AC row.', [AW('The Mystery Knight'), AW('Timeline of major events')]) }),
  book({ id: 'the-world-of-ice-and-fire', title: 'The World of Ice & Fire', wiki: 'The World of Ice & Fire', type: 'reference', studio: 'bantam-books', date: '2014-10-28', pages: 326, series: 'targaryen-histories', tier: 'adjacent',
    notes: 'In-world encyclopedia narrated by a maester; not a narrative work, so tier adjacent.',
    iu: R('Dawn Age to just before the novels', '"details the fictional history of the Seven Kingdoms, from the pre-historic Dawn Age up to just before the main book series".', ['The World of Ice & Fire'], 'stated') }),
  book({ id: 'a-game-of-thrones', title: 'A Game of Thrones', wiki: 'A Game of Thrones', studio: 'bantam-spectra', date: '1996-08-01', dateNote: 'First publication (Bantam Spectra US; Voyager UK). Wikipedia\'s text says only "August 1996".', pages: 807, series: 'main-series',
    chars: ['eddard-stark', 'jon-snow', 'daenerys-targaryen', 'tyrion-lannister', 'arya-stark', 'sansa-stark', 'cersei-lannister', 'jaime-lannister', 'bran-stark'], teams: ['house-stark', 'house-lannister', 'house-targaryen'],
    iu: Y(297, '297–299 AC', 'inferred', 'A Wiki of Ice and Fire: "The Prologue of A Game of Thrones takes place in 297 AC"; "Nearly all chapters … take place during 298 AC"; the final chapters are in 299 AC.', [AW('Timeline of major events'), AW('Years after Aegon\'s Conquest')], 299) }),
  book({ id: 'a-clash-of-kings', title: 'A Clash of Kings', wiki: 'A Clash of Kings', studio: 'harpercollins-voyager', date: '1998-11-16', dateNote: 'First publication (Voyager UK); Bantam Spectra US 1999-02-02.', pages: 761, series: 'main-series',
    chars: ['jon-snow', 'daenerys-targaryen', 'tyrion-lannister', 'arya-stark', 'sansa-stark', 'bran-stark'], teams: ['house-stark', 'house-lannister'],
    iu: Y(299, '299 AC', 'inferred', 'A Wiki of Ice and Fire: "all chapters from A Clash of Kings … take place during 299 AC".', [AW('Years after Aegon\'s Conquest')]) }),
  book({ id: 'a-storm-of-swords', title: 'A Storm of Swords', wiki: 'A Storm of Swords', studio: 'harpercollins-voyager', date: '2000-08-08', dateNote: 'First publication (Voyager UK); Bantam Spectra US November 2000.', pages: 973, series: 'main-series',
    chars: ['jon-snow', 'daenerys-targaryen', 'tyrion-lannister', 'arya-stark', 'jaime-lannister'], teams: ['house-stark', 'house-lannister'],
    iu: Y(299, '299–300 AC', 'inferred', 'A Wiki of Ice and Fire: "most chapters of A Storm of Swords … 299 AC"; "The final chapters … take place in 300 AC".', [AW('Years after Aegon\'s Conquest')], 300) }),
  book({ id: 'a-feast-for-crows', title: 'A Feast for Crows', wiki: 'A Feast for Crows', studio: 'harpercollins-voyager', date: '2005-10', dateNote: 'First publication October 2005 (UK, Voyager); November 2005 (US). Exact days appear only in a hidden wikitext comment, so they are not used.', pages: 753, series: 'main-series',
    chars: ['cersei-lannister', 'jaime-lannister', 'arya-stark', 'sansa-stark'], teams: ['house-lannister'],
    iu: Y(299, '299–300 AC', 'inferred', 'A Wiki of Ice and Fire: "some chapters from A Feast for Crows take place during 299 AC"; "most of the chapters … 300 AC".', [AW('Years after Aegon\'s Conquest')], 300) }),
  book({ id: 'a-dance-with-dragons', title: 'A Dance with Dragons', wiki: 'A Dance with Dragons', studio: 'bantam-spectra', date: '2011-07-12', dateNote: 'First publication (US and UK same day).', pages: 1056, series: 'main-series',
    chars: ['jon-snow', 'daenerys-targaryen', 'tyrion-lannister', 'bran-stark'], teams: ['house-stark', 'house-targaryen'],
    iu: Y(300, '300 AC', 'inferred', 'A Wiki of Ice and Fire: "all chapters of A Dance with Dragons take place in 300 AC".', [AW('Years after Aegon\'s Conquest')]) }),
  book({ id: 'the-winds-of-winter', title: 'The Winds of Winter', wiki: 'The Winds of Winter', studio: 'bantam-spectra', date: null, series: 'main-series',
    notes: '"the planned sixth and penultimate novel … in the works since 2011"; publication date TBD.', iu: UNRELEASED('Unpublished; no placement.', ['The Winds of Winter']) }),
  book({ id: 'a-dream-of-spring', title: 'A Dream of Spring', wiki: ASOIAF, studio: 'bantam-spectra', date: null, series: 'main-series',
    notes: 'Planned final novel; "In May 2019, Martin reiterated he had not started writing A Dream of Spring".', iu: UNRELEASED('Unpublished; no placement.', [ASOIAF]) }),
];
// Unpublished books are upcoming with no date; the release note says so.
for (const t of BOOKS) if (!t.units[0]!.rel!.date) t.units[0]!.rel = { date: null, note: 'Unpublished; no date announced.', src: t.wiki };

// ================================================================ HBO (story order via SORT_BY_YEAR)
const hbo = (id: string, title: string, wiki: string, series: string, units: SeedUnit[], adapts: { to: string; note?: string }[], chars: string[] = [], teams: string[] = []): SeedTitle =>
  ({ id, title, type: 'series', wiki, continuity: 'got-hbo', studio: 'hbo-entertainment', platform: 'hbo', chars, teams, units: units.map((u) => ({ ...u, grp: { 'book-series': series } })),
    links: adapts.map((a) => ({ to: a.to, kind: 'adapts', note: a.note ?? '' })) });
const s = (n: number, eps: number | undefined, date: string | null, end: string | null, iu: SeedIU, src: string, note = ''): SeedUnit =>
  ({ key: `s${n}`, label: `Season ${n}`, season: n, episodes: eps, iu, rel: { date, end, src, note } });
const GOT = (n: number) => `Game of Thrones season ${n}`;

export const HBO: SeedTitle[] = [
  hbo('house-of-the-dragon', 'House of the Dragon', 'House of the Dragon', 'house-of-the-dragon', [
    s(1, 10, '2022-08-21', '2022-10-23', Y(101, '101–129 AC', 'inferred', 'Episode 1 opens with "old King Jaehaerys I Targaryen convenes a Great Council" (A Wiki of Ice and Fire: "The Great Council of 101 AC"); episode 10 opens on Viserys\'s death (129 AC). Wikipedia never prints the years.', ['House of the Dragon season 1', AW('Great Council of 101 AC')], 129), 'House of the Dragon season 1'),
    s(2, 8, '2024-06-16', '2024-08-04', Y(129, '129–131 AC', 'inferred', '"covers the events of the book Fire & Blood"; the Dance of the Dragons is 129–131 AC (A Wiki of Ice and Fire).', ['House of the Dragon season 2'], 131), 'House of the Dragon season 2'),
    s(3, 8, '2026-06-21', '2026-08-09', Y(129, '129–131 AC', 'inferred', '"the war known as the \'Dance of Dragons\' … continues".', ['House of the Dragon season 3'], 131), 'House of the Dragon season 3'),
    s(4, undefined, '2028', null, UNRELEASED('"A fourth and final season is in development and expected to be released in 2028".', ['House of the Dragon']), 'House of the Dragon', 'Expected 2028 (year only).'),
  ], [{ to: 'fire-and-blood', note: 'The second half of the first volume' }, { to: 'the-rogue-prince' }, { to: 'the-princess-and-the-queen' }],
  ['rhaenyra-targaryen', 'daemon-targaryen', 'alicent-hightower', 'aegon-ii', 'viserys-i'], ['house-targaryen']),
  hbo('a-knight-of-the-seven-kingdoms', 'A Knight of the Seven Kingdoms', 'A Knight of the Seven Kingdoms (TV series)', 'akotsk', [
    s(1, 6, '2026-01-18', '2026-02-22', Y(209, '209 AC', 'inferred', '"taking place 90 years before A Song of Ice and Fire", with "the first season covering the events of The Hedge Knight" (209 AC per A Wiki of Ice and Fire).', ['A Knight of the Seven Kingdoms (TV series)']), 'A Knight of the Seven Kingdoms (TV series)'),
    s(2, undefined, '2027', null, UNRELEASED('"renewed for a second season, which will be based on The Sworn Sword and is expected to be released in 2027".', ['A Knight of the Seven Kingdoms (TV series)']), 'A Knight of the Seven Kingdoms (TV series)', 'Expected 2027 (year only).'),
  ], [{ to: 'the-hedge-knight', note: 'Season 1' }, { to: 'the-sworn-sword', note: 'Season 2 (announced)' }], ['dunk', 'egg']),
  hbo('game-of-thrones', 'Game of Thrones', 'Game of Thrones', 'game-of-thrones', [
    s(1, 10, '2011-04-17', '2011-06-19', Y(298, 'c. 298 AC', 'inferred', '"The series is based on A Game of Thrones" (mostly 298 AC in the books). The show gives no year.', [GOT(1)], undefined, 'approx'), GOT(1)),
    s(2, 10, '2012-04-01', '2012-06-03', Y(299, 'c. 299 AC', 'inferred', '"The season mostly covers the events of A Clash of Kings" (299 AC in the books).', [GOT(2)], undefined, 'approx'), GOT(2)),
    s(3, 10, '2013-03-31', '2013-06-09', Y(299, 'c. 299 AC', 'inferred', '"based roughly on the first half of A Storm of Swords" (299 AC in the books).', [GOT(3)], undefined, 'approx'), GOT(3)),
    s(4, 10, '2014-04-06', '2014-06-15', Y(299, 'c. 299–300 AC', 'inferred', '"adapted primarily from the second half of A Storm of Swords, along with elements of A Feast for Crows and A Dance with Dragons".', [GOT(4)], 300, 'approx'), GOT(4)),
    s(5, 10, '2015-04-12', '2015-06-14', R('After season 4', '"takes loose inspiration from A Feast for Crows and A Dance with Dragons … also contains original content"; no year.', [GOT(5)]), GOT(5)),
    s(6, 10, '2016-04-24', '2016-06-26', R('After season 5', '"Much of the season\'s storyline is derived from content not yet published"; no year.', [GOT(6)]), GOT(6)),
    s(7, 7, '2017-07-16', '2017-08-27', R('After season 6', '"largely consisted of original content"; no year.', [GOT(7)]), GOT(7)),
    s(8, 6, '2019-04-14', '2019-05-19', R('After season 7', '"largely consists of original content … incorporating material that Martin has revealed"; no year.', [GOT(8)]), GOT(8)),
  ], [{ to: 'a-game-of-thrones', note: 'Season 1' }, { to: 'a-clash-of-kings', note: 'Season 2' }, { to: 'a-storm-of-swords', note: 'Seasons 3–4' }, { to: 'a-feast-for-crows', note: 'Seasons 4–5, loosely' }, { to: 'a-dance-with-dragons', note: 'Seasons 4–5, loosely' }],
  ['jon-snow', 'daenerys-targaryen', 'tyrion-lannister', 'arya-stark', 'sansa-stark', 'eddard-stark', 'cersei-lannister', 'jaime-lannister', 'bran-stark'], ['house-stark', 'house-lannister', 'house-targaryen']),
];

export const SEED: SeedTitle[] = [...BOOKS, ...HBO];
