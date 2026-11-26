// Star Trek seed (Stage 7). Researched 2026-11-26 from English Wikipedia and Memory Alpha (revids in
// DATA_NOTES). "stated" = a Wikipedia article gives the year (often only the "Timeline of Star Trek"
// settings table, which is tagged as needing citations); "inferred" = Memory Alpha's dating from on-screen
// stardates; "disputed" = Wikipedia contradicts itself. Release dates are US premieres.
import { R, Y, UNRELEASED, single, type SeedIU, type SeedTitle, type SeedUnit } from './seed-kit.ts';

const TL = 'Timeline of Star Trek';
const LTV = 'List of Star Trek television series';
const tl = (y: number, note: string, src: string[] = [], y2?: number) => Y(y, y2 !== undefined && y2 !== y ? `${y}–${y2}` : String(y), 'stated', note, [TL, ...src], y2);
const ma = (y: number, note: string, src: string[], y2?: number) => Y(y, y2 !== undefined && y2 !== y ? `${y}–${y2}` : String(y), 'inferred', `Memory Alpha: ${note}`, src, y2);
const ssn = (n: number, eps: number, date: string, end: string | null, iu: SeedIU, src: string, platform?: string, note = ''): SeedUnit =>
  ({ key: `s${n}`, label: `Season ${n}`, season: n, episodes: eps, iu, platform, rel: { date, end, src, note } });
const series = (id: string, title: string, wiki: string, type: SeedTitle['type'], studio: string, platform: string, units: SeedUnit[], chars: string[], extra: Partial<SeedTitle> = {}): SeedTitle =>
  ({ id, title, type, wiki, continuity: 'st-prime', studio, platform, chars, teams: ['starfleet'], units, ...extra });
const film = (id: string, title: string, wiki: string, date: string, iu: SeedIU, chars: string[], continuity = 'st-prime', extra: Partial<SeedTitle> = {}): SeedTitle =>
  single({ id, title, type: 'film', wiki, continuity, studio: 'paramount-pictures', platform: 'theatrical', chars, teams: ['starfleet'], unitLabel: 'Film', iu, rel: { date, src: wiki }, ...extra });

const ENT = 'Star Trek: Enterprise';
const DIS = 'Star Trek: Discovery';
const SNW = 'Star Trek: Strange New Worlds';
const TOS = 'Star Trek: The Original Series';
const TAS = 'Star Trek: The Animated Series';
const TNG = 'Star Trek: The Next Generation';
const DS9 = 'Star Trek: Deep Space Nine';
const VOY = 'Star Trek: Voyager';
const LD = 'Star Trek: Lower Decks';
const PRO = 'Star Trek: Prodigy';
const PIC = 'Star Trek: Picard';
const SFA = 'Star Trek: Starfleet Academy';
const ST = 'Star Trek: Short Treks';

export const PRIME: SeedTitle[] = [
  series('enterprise', 'Star Trek: Enterprise', ENT, 'series', 'paramount-television', 'upn', [
    ssn(1, 26, '2001-09-26', '2002-05-22', tl(2151, 'Season 1: in-universe episode dates run 2151-04-16 to 2152-02-18; Timeline "2151–2152".', [`${ENT} season 1`], 2152), `${ENT} season 1`),
    ssn(2, 26, '2002-09-18', '2003-05-21', tl(2152, 'Episode dates 2152-04-12 to 2153-04-24; Timeline "2152–2153".', [`${ENT} season 2`], 2153), `${ENT} season 2`),
    ssn(3, 24, '2003-09-10', '2004-05-26', tl(2153, 'Episode dates 2153-12-06 to 2154-02-14; Timeline "2153–2154".', [`${ENT} season 3`], 2154), `${ENT} season 3`),
    ssn(4, 22, '2004-10-08', '2005-05-13', tl(2154, 'Episode dates 2154-05-17 to 2155-01-22. The finale "takes place in 2370" (a holodeck story about 2161).', [`${ENT} season 4`], 2155), `${ENT} season 4`),
  ], ['archer']),
  series('discovery', 'Star Trek: Discovery', DIS, 'series', 'cbs-studios', 'cbs-all-access', [
    ssn(1, 15, '2017-09-24', '2018-02-11', tl(2256, '"set a decade before Star Trek: The Original Series"; Timeline "2256–2257".', [`${DIS} season 1`], 2257), `${DIS} season 1`, undefined, 'Premiered on CBS, then moved to CBS All Access.'),
    ssn(2, 14, '2019-01-17', '2019-04-18', Y(2257, '2257–2258 (or 2258–2259)', 'disputed', 'Timeline of Star Trek contradicts itself: its list says "2257-2258 The events of Discovery season 2", its table "2258–2259". Memory Alpha dates the season 2257–2258.', [TL, `${DIS} season 2`, 'ma:Brother (episode)'], 2258), `${DIS} season 2`),
    // Seasons 3–5: "At the end of the second season, they travel to the 32nd century, which is the setting for subsequent seasons."
      ssn(3, 13, '2020-10-15', '2021-01-07', Y(3188, '3188–3189', 'stated', 'Burnham "arrives in the year 3188"; Timeline "3188-89".', [`${DIS} season 3`, TL], 3189), `${DIS} season 3`, 'cbs-all-access'),
      ssn(4, 13, '2021-11-18', '2022-03-17', tl(3190, 'The season article only says "in the 32nd century"; Timeline 3190; Memory Alpha "Kobayashi Maru" 3190.', [`${DIS} season 4`]), `${DIS} season 4`, 'paramount-plus'),
      ssn(5, 10, '2024-04-04', '2024-05-30', tl(3191, 'Timeline 3191 (epilogue c. 3225).', [`${DIS} season 5`]), `${DIS} season 5`, 'paramount-plus'),
  ], ['burnham', 'pike', 'spock', 'georgiou']),
  series('strange-new-worlds', 'Star Trek: Strange New Worlds', SNW, 'series', 'cbs-studios', 'paramount-plus', [
    ssn(1, 10, '2022-05-05', '2022-07-07', tl(2259, '"during the decade before Star Trek: The Original Series"; Timeline "2259".', [`${SNW} season 1`]), `${SNW} season 1`),
    ssn(2, 10, '2023-06-15', '2023-08-10', Y(2259, '2259 (finale 2261)', 'disputed', 'Timeline "2259"; Memory Alpha dates the finale "Hegemony" to 2261.', [TL, `${SNW} season 2`, 'ma:Hegemony (episode)'], 2261), `${SNW} season 2`),
    ssn(3, 10, '2025-07-17', '2025-09-11', tl(2261, 'Timeline "2261".', [`${SNW} season 3`]), `${SNW} season 3`),
    ssn(4, 10, '2026-07-23', '2026-09-24', tl(2262, 'Timeline "2262"; Memory Alpha dates the finale to 2262–2263.', [`${SNW} season 4`]), `${SNW} season 4`),
    { key: 's5', label: 'Season 5', season: 5, episodes: 6, iu: UNRELEASED('"in the 23rd century"; final season, in post-production.', [`${SNW} season 5`]), rel: { date: null, src: LTV, note: 'TBA.' } },
  ], ['pike', 'spock', 'uhura']),
  series('the-original-series', 'Star Trek: The Original Series', TOS, 'series', 'desilu-paramount-tv', 'nbc', [
    ssn(1, 29, '1966-09-08', '1967-04-13', tl(2266, 'Series "set … c. 2266–2269"; Timeline "2266–2267" ("Where No Man Has Gone Before" is 2265).', [`${TOS} season 1`], 2267), `${TOS} season 1`, undefined, 'The series infobox says 1966-09-06; the season article and the series list say 1966-09-08.'),
    ssn(2, 26, '1967-09-15', '1968-03-29', tl(2267, 'Timeline "2267–2268".', [`${TOS} season 2`], 2268), `${TOS} season 2`),
    ssn(3, 24, '1968-09-20', '1969-06-03', tl(2268, 'Timeline "2268–2269".', [`${TOS} season 3`], 2269), `${TOS} season 3`),
  ], ['kirk', 'spock', 'mccoy', 'uhura']),
  series('the-animated-series', 'Star Trek: The Animated Series', TAS, 'animated-series', 'filmation', 'nbc', [
    ssn(1, 16, '1973-09-08', '1974-01-12', tl(2269, '"Voyages of the Imagination dates the events of the series to 2269–2270"; the Okuda Chronology leaves TAS out.', [TAS], 2270), TAS),
    ssn(2, 6, '1974-09-07', '1974-10-12', tl(2270, 'Timeline "2270".', [TAS]), TAS),
  ], ['kirk', 'spock', 'mccoy', 'uhura']),
  film('the-motion-picture', 'Star Trek: The Motion Picture', 'Star Trek: The Motion Picture', '1979-12-07',
    Y(2271, '2270s (2271 or 2273)', 'disputed', '"set in the 2270s". Timeline of Star Trek: the Okuda Chronology says it takes place in 2271; Ayers says 2273 (its table uses 2273).', [TL, 'Star Trek: The Motion Picture']), ['kirk', 'spock', 'mccoy']),
  film('the-wrath-of-khan', 'Star Trek II: The Wrath of Khan', 'Star Trek II: The Wrath of Khan', '1982-06-04', Y(2285, '2285', 'stated', '"In 2285, Admiral James T. Kirk…".', ['Star Trek II: The Wrath of Khan']), ['kirk', 'spock', 'mccoy']),
  film('the-search-for-spock', 'Star Trek III: The Search for Spock', 'Star Trek III: The Search for Spock', '1984-06-01', tl(2285, 'Okuda: "Wrath of Khan and Search for Spock take place in 2285".'), ['kirk', 'spock', 'mccoy']),
  film('the-voyage-home', 'Star Trek IV: The Voyage Home', 'Star Trek IV: The Voyage Home', '1986-11-26', Y(2286, '2286 (and 1986 Earth)', 'stated', '"In 2286, an enormous cylindrical probe…".', ['Star Trek IV: The Voyage Home']), ['kirk', 'spock', 'mccoy']),
  film('the-final-frontier', 'Star Trek V: The Final Frontier', 'Star Trek V: The Final Frontier', '1989-06-09', tl(2287, 'Okuda: "take place in 2287".'), ['kirk', 'spock', 'mccoy']),
  film('the-undiscovered-country', 'Star Trek VI: The Undiscovered Country', 'Star Trek VI: The Undiscovered Country', '1991-12-06', Y(2293, '2293', 'stated', '"In 2293, the Federation starship Excelsior…".', ['Star Trek VI: The Undiscovered Country']), ['kirk', 'spock', 'mccoy']),
  single({ id: 'section-31', title: 'Star Trek: Section 31', type: 'film', wiki: 'Star Trek: Section 31', continuity: 'st-prime', studio: 'cbs-studios', platform: 'paramount-plus', chars: ['georgiou'], unitLabel: 'Film',
    rel: { date: '2025-01-24', src: 'Star Trek: Section 31', note: 'Streaming film.' },
    iu: Y(2324, 'Early 24th century (2324)', 'disputed', '"In the Prime Universe in the early 24th century…". Timeline of Star Trek: its table says "2324, stardate 1292.4", its list says 2257; Memory Alpha: "the movie is set in 2324".', ['Star Trek: Section 31', TL, 'ma:Star Trek: Section 31']) }),
  series('the-next-generation', 'Star Trek: The Next Generation', TNG, 'series', 'paramount-television', 'first-run-syndication',
    ([[1, 26, '1987-09-28', '1988-05-16'], [2, 22, '1988-11-21', '1989-07-17'], [3, 26, '1989-09-25', '1990-06-18'], [4, 26, '1990-09-24', '1991-06-17'], [5, 26, '1991-09-23', '1992-06-15'], [6, 26, '1992-09-21', '1993-06-21'], [7, 26, '1993-09-20', '1994-05-23']] as const)
      .map(([n, e, d, end]) => ssn(n, e, d, end, tl(2363 + n, `"(2364–2370)"; Timeline gives ${2363 + n} for season ${n} (Okuda: the stardate's first digits are the season).`, [LTV]), `${TNG} season ${n}`)),
    ['picard', 'data', 'worf']),
  series('deep-space-nine', 'Star Trek: Deep Space Nine', DS9, 'series', 'paramount-television', 'first-run-syndication',
    ([[1, 20, '1993-01-03', '1993-06-21'], [2, 26, '1993-09-27', '1994-06-13'], [3, 26, '1994-09-26', '1995-06-19'], [4, 26, '1995-10-02', '1996-06-17'], [5, 26, '1996-09-30', '1997-06-16'], [6, 26, '1997-09-29', '1998-06-15'], [7, 26, '1998-09-28', '1999-05-31']] as const)
      .map(([n, e, d, end]) => ssn(n, e, d, end, tl(2368 + n, `"(2369–2375)"; Timeline gives ${2368 + n} for season ${n}.`, [LTV]), DS9, undefined, n === 7 ? 'Last episode: the series list says 1999-05-31; the infobox and prose say 1999-06-02.' : '')),
    ['sisko', 'worf']),
  film('generations', 'Star Trek Generations', 'Star Trek Generations', '1994-11-18', Y(2371, '2371 (prologue 2293)', 'stated', '"In 2293, retired Starfleet officers…"; "In 2371, the crew of the USS Enterprise-D…".', ['Star Trek Generations']), ['picard', 'data', 'worf', 'kirk']),
  series('voyager', 'Star Trek: Voyager', VOY, 'series', 'paramount-television', 'upn',
    ([[1, 16, '1995-01-16', '1995-05-22'], [2, 26, '1995-08-28', '1996-05-20'], [3, 26, '1996-09-04', '1997-05-21'], [4, 26, '1997-09-03', '1998-05-20'], [5, 26, '1998-10-14', '1999-05-26'], [6, 26, '1999-09-22', '2000-05-24'], [7, 26, '2000-10-04', '2001-05-23']] as const)
      .map(([n, e, d, end]) => ssn(n, e, d, end, tl(2370 + n, `"(2371–2378)"; Timeline gives ${n === 7 ? '2377–2378' : 2370 + n} for season ${n}.`, [LTV], n === 7 ? 2378 : undefined), n === 4 ? `${VOY} season 4` : VOY)),
    ['janeway', 'seven-of-nine']),
  film('first-contact', 'Star Trek: First Contact', 'Star Trek: First Contact', '1996-11-22', tl(2373, '"travel back in time from the 24th century to the 21st century"; Timeline rows 2373 and 2063.', ['Star Trek: First Contact']), ['picard', 'data', 'worf']),
  film('insurrection', 'Star Trek: Insurrection', 'Star Trek: Insurrection', '1998-12-11', tl(2375, 'Timeline row 2375; the film article gives no year.'), ['picard', 'data', 'worf']),
  film('nemesis', 'Star Trek: Nemesis', 'Star Trek: Nemesis', '2002-12-13', tl(2379, '"2379 The events of Star Trek: Nemesis".'), ['picard', 'data', 'worf'], 'st-prime', { notes: 'Los Angeles premiere 2002-12-09.' }),
  series('lower-decks', 'Star Trek: Lower Decks', LD, 'animated-series', 'cbs-studios', 'paramount-plus', [
    ssn(1, 10, '2020-08-06', '2020-10-08', Y(2380, '2380', 'stated', '"The series is set in 2380, one year after the film Star Trek: Nemesis".', [`${LD} season 1`]), `${LD} season 1`, 'cbs-all-access'),
    ssn(2, 10, '2021-08-12', '2021-10-14', ma(2381, '"Strange Energies" and "First First Contact" are dated 2381.', [`${LD} season 2`, 'ma:Strange Energies (episode)']), `${LD} season 2`),
    ssn(3, 10, '2022-08-25', '2022-10-27', ma(2381, '"Grounded" and "The Stars at Night" are dated 2381.', [`${LD} season 3`, 'ma:Grounded (episode)']), `${LD} season 3`),
    ssn(4, 10, '2023-09-07', '2023-11-02', ma(2381, '"Twovix" and "Old Friends, New Planets" are dated 2381.', [`${LD} season 4`, 'ma:Twovix (episode)']), `${LD} season 4`),
    ssn(5, 10, '2024-10-24', '2024-12-19', ma(2381, 'weak: the sidebar dates are blank; one log says "2382"; the Timeline series span ends in 2382.', [`${LD} season 5`, 'ma:Dos Cerritos (episode)'], 2382), `${LD} season 5`),
  ], []),
  series('prodigy', 'Star Trek: Prodigy', PRO, 'animated-series', 'cbs-studios', 'paramount-plus', [
    ssn(1, 20, '2021-10-28', '2022-12-29', Y(2383, '2383–2384', 'stated', '"In 2383, five years after the USS Voyager returned…"; Memory Alpha dates the finale to 2384.', [PRO, 'ma:Supernova, Part 2 (episode)'], 2384), `${PRO} season 1`, undefined, 'Also on Nickelodeon from 2021-12-17; removed in June 2023 and added to Netflix on 2023-12-25.'),
    ssn(2, 20, '2024-07-01', null, ma(2384, '"Into the Breach, Part I" is 2384; "Ouroboros, Part II" is "April 5, 2385".', [`${PRO} season 2`, 'ma:Ouroboros, Part II (episode)'], 2385), `${PRO} season 2`, 'netflix', 'All episodes at once on Netflix.'),
  ], ['janeway']),
  series('short-treks', 'Star Trek: Short Treks', ST, 'series', 'cbs-studios', 'cbs-all-access', [
    { key: 's1', label: 'Season 1', season: 1, episodes: 4, iu: R('Various eras (2238 – 43rd century)', 'Anthology: "The Brightest Star" 2238 and "Calypso" in "the 43rd century or later" (Timeline); "Runaway" 2257 and "The Escape Artist" 2250s (Memory Alpha).', [TL, ST]), rel: { date: '2018-10-04', end: '2019-01-03', src: ST } },
    { key: 's2', label: 'Season 2', season: 2, episodes: 6, iu: R('Various eras (2232 – 2385)', 'Anthology: "The Girl Who Made the Stars" 2232, "Q&A" 2254, "Children of Mars" 2385 (Timeline); others 2250s–2280s (Memory Alpha).', [TL, ST]), rel: { date: '2019-10-05', end: '2020-01-09', src: ST } },
  ], []),
  series('picard', 'Star Trek: Picard', PIC, 'series', 'cbs-studios', 'paramount-plus', [
    ssn(1, 10, '2020-01-23', '2020-03-26', Y(2399, '2399', 'stated', '"The series begins in 2399, 20 years after…".', [PIC, `${PIC} season 1`]), `${PIC} season 1`, 'cbs-all-access'),
    ssn(2, 10, '2022-03-03', '2022-05-05', Y(2401, '2401 (and 2024 Los Angeles)', 'disputed', 'Season article: "Jean-Luc Picard in the year 2401", travelling "back to 2024 Los Angeles"; the Timeline table says 2400.', [`${PIC} season 2`, TL]), `${PIC} season 2`),
    ssn(3, 10, '2023-02-16', '2023-04-20', Y(2401, '2401 (epilogue 2402)', 'stated', '"in the year 2401"; Timeline "2401-2402".', [`${PIC} season 3`, TL], 2402), `${PIC} season 3`),
  ], ['picard', 'data', 'worf', 'seven-of-nine']),
  series('starfleet-academy', 'Star Trek: Starfleet Academy', SFA, 'series', 'cbs-studios', 'paramount-plus', [
    ssn(1, 10, '2026-01-15', '2026-03-12', tl(3195, '"Set in the 32nd century…"; Timeline "3195 … Starfleet Academy season 1". Memory Alpha: "3190s".'), SFA, undefined, 'The series overview says 2026-01-15; the list prose says 2026-01-16.'),
    { key: 's2', label: 'Season 2', season: 2, episodes: 10, iu: UNRELEASED('32nd century.', [LTV]), rel: { date: '2027-03', src: LTV, note: 'Dated to March 2027 only (Deadline, 2026-10-10).' } },
  ], ['burnham']),
];

// Kelvin timeline. The 2009 film's prologue (2233) is the split point.
export const KELVIN: SeedTitle[] = [
  film('star-trek-2009', 'Star Trek (2009)', 'Star Trek (2009 film)', '2009-05-08', Y(2258, '2258 (prologue 2233)', 'stated', '"In 2233…"; Timeline: "2258 (alternate timeline) The events of Star Trek take place" (its table says 2258–2259).', ['Star Trek (2009 film)', TL]), ['kirk', 'spock', 'mccoy', 'uhura'], 'st-kelvin', { notes: 'Sydney premiere 2009-04-07.' }),
  film('star-trek-into-darkness', 'Star Trek Into Darkness', 'Star Trek Into Darkness', '2013-05-17', Y(2259, '2259', 'stated', '"In 2259, Captain James T. Kirk is removed from command…".', ['Star Trek Into Darkness']), ['kirk', 'spock', 'mccoy', 'uhura'], 'st-kelvin', { links: [{ to: 'star-trek-2009', kind: 'sequel' }], notes: 'The list of films gives 2013-05-17; the infobox gives 2013-05-15 (US).' }),
  film('star-trek-beyond', 'Star Trek Beyond', 'Star Trek Beyond', '2016-07-22', tl(2263, 'Timeline "2263 Star Trek Beyond"; on screen: "stardate 2263.2. Today is our 966th day in deep space".', ['Star Trek Beyond', 'ma:Star Trek Beyond']), ['kirk', 'spock', 'mccoy', 'uhura'], 'st-kelvin', { links: [{ to: 'star-trek-into-darkness', kind: 'sequel' }] }),
];

export const OTHER: SeedTitle[] = [
  single({ id: 'very-short-treks', title: 'Star Trek: Very Short Treks', type: 'animated-series', wiki: 'Star Trek: Very Short Treks', continuity: 'st-other', studio: 'cbs-studios', platform: 'youtube', tier: 'adjacent', chars: [],
    unitLabel: 'Series', rel: { date: '2023-09-08', end: '2023-10-04', src: 'Star Trek: Very Short Treks', note: '5 shorts on StarTrek.com and YouTube.' },
    iu: R('Non-canon', '"five non-canon shorts".', ['Star Trek: Very Short Treks'], 'stated') }),
];

export const SEED: SeedTitle[] = [...PRIME, ...KELVIN, ...OTHER];
