// Star Wars seed (Stage 6). Years: negative = BBY, 0+ = ABY. "stated" = Wikipedia states it, or Lucasfilm's
// official reference books (Star Wars: Timelines 2023 / Galactic Atlas) as cited on Wookieepedia ("official");
// "inferred" = Wookieepedia derives it. Release dates are US premieres.
import { R, Y, UNRELEASED, single, type SeedIU, type SeedTitle, type SeedUnit } from './seed-kit.ts';

const TL = (page: string) => `wook:${page}`;
const off = (y: number, label: string, note: string, src: string[], y2?: number) => Y(y, label, 'stated', `${note} Year per Lucasfilm's official reference (Star Wars: Timelines / Galactic Atlas) as cited on Wookieepedia.`, src, y2);
const inf = (y: number, label: string, note: string, src: string[], y2?: number) => Y(y, label, 'inferred', note, src, y2);
const film = (id: string, title: string, wiki: string, date: string, era: string, iu: SeedIU, chars: string[], extra: Partial<SeedTitle> & { rank?: number } = {}, studio = 'lucasfilm'): SeedTitle =>
  single({ id, title, type: 'film', wiki, continuity: 'sw-canon', studio, platform: 'theatrical', chars, unitLabel: 'Film', grp: { era }, iu, rel: { date, src: wiki }, ...extra });
const ssn = (n: number, eps: number, date: string, end: string | null, era: string, iu: SeedIU, src: string, platform?: string, note = ''): SeedUnit =>
  ({ key: `s${n}`, label: `Season ${n}`, season: n, episodes: eps, grp: { era }, iu, platform, rel: { date, end, src, note } });
const series = (id: string, title: string, wiki: string, type: SeedTitle['type'], platform: string, units: SeedUnit[], chars: string[], extra: Partial<SeedTitle> & { rank?: number } = {}, studio = 'lucasfilm'): SeedTitle =>
  ({ id, title, type, wiki, continuity: 'sw-canon', studio, platform, chars, units, ...extra });

const TCW = 'Star Wars: The Clone Wars';
const TALES = 'Star Wars Tales (TV anthology)';
export const CANON: SeedTitle[] = [
  film('the-phantom-menace', 'Star Wars: Episode I – The Phantom Menace', 'Star Wars: Episode I – The Phantom Menace', '1999-05-19', 'fall-of-the-jedi',
    Y(-32, '32 BBY', 'stated', 'Wikipedia: "The Phantom Menace is set in 32 BBY"; "set 32 years before the original trilogy".', ['Star Wars: Episode I – The Phantom Menace']), ['anakin-skywalker', 'obi-wan-kenobi', 'maul', 'palpatine', 'yoda'], { teams: ['jedi'] }),
  film('attack-of-the-clones', 'Star Wars: Episode II – Attack of the Clones', 'Star Wars: Episode II – Attack of the Clones', '2002-05-16', 'fall-of-the-jedi',
    off(-22, '22 BBY', 'Wikipedia: "set ten years after The Phantom Menace".', ['Star Wars: Episode II – Attack of the Clones', TL('Star Wars: Episode II Attack of the Clones')]), ['anakin-skywalker', 'obi-wan-kenobi', 'yoda', 'palpatine'], { teams: ['jedi', 'clone-troopers'] }),
  single({ id: 'the-clone-wars-film', title: 'Star Wars: The Clone Wars (film)', type: 'animated-film', wiki: 'Star Wars: The Clone Wars (film)', continuity: 'sw-canon', studio: 'lucasfilm-animation', platform: 'theatrical', chars: ['anakin-skywalker', 'ahsoka-tano', 'obi-wan-kenobi'], teams: ['clone-troopers', 'jedi'],
    unitLabel: 'Film', grp: { era: 'fall-of-the-jedi' }, rel: { date: '2008-08-15', src: 'Star Wars: The Clone Wars (film)' }, iu: off(-22, '22 BBY', 'Launches the series.', [TL('Star Wars: The Clone Wars (film)')]) }),
  series('the-clone-wars', 'Star Wars: The Clone Wars', TCW, 'animated-series', 'cartoon-network', [
    ssn(1, 22, '2008-10-03', '2009-03-20', 'fall-of-the-jedi', off(-22, '22–21 BBY', '"set between Attack of the Clones … and Revenge of the Sith".', [TCW], -21), TCW),
    ssn(2, 22, '2009-10-02', '2010-04-30', 'fall-of-the-jedi', off(-21, '21 BBY', '', [TL('Star Wars: The Clone Wars Season Two')]), TCW),
    ssn(3, 22, '2010-09-17', '2011-04-01', 'fall-of-the-jedi', off(-22, '22–20 BBY', 'Season episodes span the war.', [TL('Star Wars: The Clone Wars Season Three')], -20), TCW),
    ssn(4, 22, '2011-09-16', '2012-03-16', 'fall-of-the-jedi', off(-20, '20 BBY', '', [TL('Star Wars: The Clone Wars Season Four')]), TCW),
    ssn(5, 20, '2012-09-29', '2013-03-02', 'fall-of-the-jedi', off(-20, '20–19 BBY', '', [TL('Star Wars: The Clone Wars Season Five')], -19), TCW),
    ssn(6, 13, '2014-03-07', null, 'fall-of-the-jedi', off(-19, '19 BBY', '"The Lost Missions".', [TL('Star Wars: The Clone Wars Season Six')]), TCW, 'netflix', 'Released all at once on Netflix.'),
    ssn(7, 12, '2020-02-21', '2020-05-04', 'fall-of-the-jedi', off(-19, '19 BBY', '', [TL('Star Wars: The Clone Wars Season Seven')]), TCW, 'disney-plus'),
  ], ['anakin-skywalker', 'ahsoka-tano', 'obi-wan-kenobi', 'maul'], { teams: ['clone-troopers', 'jedi'], links: [{ to: 'the-clone-wars-film', kind: 'continues' }] }, 'lucasfilm-animation'),
  film('revenge-of-the-sith', 'Star Wars: Episode III – Revenge of the Sith', 'Star Wars: Episode III – Revenge of the Sith', '2005-05-19', 'fall-of-the-jedi',
    Y(-19, '19 BBY', 'stated', 'Wikipedia: "Revenge of the Sith is set 19 years before A New Hope (19 BBY)".', ['Star Wars: Episode III – Revenge of the Sith']), ['anakin-skywalker', 'obi-wan-kenobi', 'yoda', 'palpatine'], { teams: ['jedi', 'clone-troopers'] }),
  series('the-bad-batch', 'Star Wars: The Bad Batch', 'Star Wars: The Bad Batch', 'animated-series', 'disney-plus', [
    ssn(1, 16, '2021-05-04', '2021-08-13', 'reign-of-the-empire', off(-19, '19 BBY', '"set in the aftermath of the Clone Wars and following the events of Order 66".', ['Star Wars: The Bad Batch']), 'Star Wars: The Bad Batch'),
    ssn(2, 16, '2023-01-04', '2023-03-29', 'reign-of-the-empire', inf(-19, '19–18 BBY', 'Wookieepedia.', [TL('Star Wars: The Bad Batch Season Two')], -18), 'Star Wars: The Bad Batch'),
    ssn(3, 15, '2024-02-21', '2024-05-01', 'reign-of-the-empire', inf(-18, 'c. 18 BBY', 'Wookieepedia: during or after 18 BBY.', [TL('Star Wars: The Bad Batch Season Three')]), 'Star Wars: The Bad Batch'),
  ], [], { teams: ['clone-troopers'], links: [{ to: 'the-clone-wars', kind: 'spinoff' }] }, 'lucasfilm-animation'),
  series('maul-shadow-lord', 'Star Wars: Maul – Shadow Lord', 'Star Wars: Maul – Shadow Lord', 'animated-series', 'disney-plus', [
    ssn(1, 10, '2026-04-06', '2026-05-04', 'reign-of-the-empire', inf(-17, 'c. 17–13 BBY', 'Wikipedia: "around a year after Maul\'s defeat … at the end of the Clone Wars"; Wookieepedia: 17 to c. 13 BBY.', ['Star Wars: Maul – Shadow Lord', TL('Star Wars: Maul - Shadow Lord')], -13), 'Star Wars: Maul – Shadow Lord'),
    { key: 's2', label: 'Season 2', season: 2, grp: { era: 'reign-of-the-empire' }, iu: UNRELEASED('Announced for 2027.', ['Star Wars: Maul – Shadow Lord']), rel: { date: '2027', src: 'Star Wars: Maul – Shadow Lord', note: 'Year only.' } },
  ], ['maul'], {}, 'lucasfilm-animation'),
  film('solo', 'Solo: A Star Wars Story', 'Solo: A Star Wars Story', '2018-05-25', 'reign-of-the-empire',
    off(-10, '10 BBY (prologue 13 BBY)', '"ten years prior to the events of the first Star Wars film".', ['Solo: A Star Wars Story']), ['han-solo']),
  single({ id: 'obi-wan-kenobi-series', title: 'Obi-Wan Kenobi', type: 'series', wiki: 'Obi-Wan Kenobi (miniseries)', continuity: 'sw-canon', studio: 'lucasfilm', platform: 'disney-plus', chars: ['obi-wan-kenobi', 'anakin-skywalker', 'leia-organa'],
    unitLabel: 'Miniseries', grp: { era: 'reign-of-the-empire' }, rel: { date: '2022-05-27', end: '2022-06-22', src: 'Obi-Wan Kenobi (miniseries)' },
    iu: Y(-9, '9 BBY', 'stated', 'Wikipedia: "so Obi-Wan Kenobi is 9 BBY"; "Set ten years after…".', ['Star Wars: Episode III – Revenge of the Sith', 'Obi-Wan Kenobi (miniseries)']) }),
  series('andor', 'Andor', 'Andor', 'series', 'disney-plus', [
    ssn(1, 12, '2022-09-21', '2022-11-23', 'reign-of-the-empire', Y(-5, '5 BBY', 'stated', 'Wikipedia: "the first season of Andor takes place five years before the battle ("5 BBY")".', ['Star Wars']), 'Andor'),
    ssn(2, 12, '2025-04-22', '2025-05-13', 'reign-of-the-empire', inf(-4, '4–1 BBY', '"The second season covers the next four years and ends where the events of Rogue One begin".', ['Andor'], -1), 'Andor'),
  ], ['cassian-andor']),
  series('star-wars-rebels', 'Star Wars Rebels', 'Star Wars Rebels', 'animated-series', 'disney-xd', [
    ssn(1, 15, '2014-10-03', '2015-03-02', 'reign-of-the-empire', off(-5, '5–4 BBY', '"14 years after Revenge of the Sith and 5 years before A New Hope".', ['Star Wars Rebels'], -4), 'Star Wars Rebels', undefined, 'Pilot film on Disney Channel; four shorts 2014-08-11 to 09-01.'),
    ssn(2, 22, '2015-06-20', '2016-03-30', 'reign-of-the-empire', off(-4, '4–3 BBY', '', [TL('Star Wars Rebels Season Two')], -3), 'Star Wars Rebels'),
    ssn(3, 22, '2016-09-24', '2017-03-25', 'reign-of-the-empire', off(-2, '2 BBY', '', [TL('Star Wars Rebels Season Three')]), 'Star Wars Rebels'),
    { ...ssn(4, 16, '2017-10-16', '2018-03-05', 'reign-of-the-empire', off(-1, '1 BBY (epilogue c. 9 ABY)', 'Episode count 16 (Wikipedia) vs 15 (Wookieepedia).', [TL('Star Wars Rebels Season Four')]), 'Star Wars Rebels'), rank: 1 },
  ], ['hera-syndulla', 'ezra-bridger', 'ahsoka-tano'], {}, 'lucasfilm-animation'),
  film('rogue-one', 'Rogue One: A Star Wars Story', 'Rogue One', '2016-12-16', 'reign-of-the-empire',
    off(-1, '1 BBY (prologue 13 BBY)', '"set directly before Episode IV".', ['List of Star Wars films', TL('Rogue One: A Star Wars Story')]), ['cassian-andor'], { rank: 2, links: [{ to: 'a-new-hope', kind: 'feeds-into' }] }),
  film('a-new-hope', 'Star Wars (Episode IV – A New Hope)', 'Star Wars (film)', '1977-05-25', 'age-of-rebellion',
    off(-1, '1 BBY – 0 ABY', 'The Battle of Yavin is the epoch ("0").', [TL('Star Wars: Episode IV A New Hope'), TL('ABY-BBY dating system')], 0), ['luke-skywalker', 'leia-organa', 'han-solo', 'obi-wan-kenobi', 'anakin-skywalker', 'r2-d2', 'c-3po'], { rank: 3 }),
  film('the-empire-strikes-back', 'The Empire Strikes Back', 'The Empire Strikes Back', '1980-05-21', 'age-of-rebellion',
    off(3, '3 ABY', '"Set three years after the events of Star Wars".', ['The Empire Strikes Back']), ['luke-skywalker', 'leia-organa', 'han-solo', 'yoda', 'anakin-skywalker']),
  film('return-of-the-jedi', 'Return of the Jedi', 'Return of the Jedi', '1983-05-25', 'age-of-rebellion',
    off(4, '4 ABY', '"One year after Han Solo\'s capture".', ['Return of the Jedi']), ['luke-skywalker', 'leia-organa', 'han-solo', 'anakin-skywalker', 'palpatine', 'ewoks']),
  series('the-mandalorian', 'The Mandalorian', 'The Mandalorian', 'series', 'disney-plus', [
    ssn(1, 8, '2019-11-12', '2019-12-27', 'new-republic', off(9, '9 ABY', '"begins five years after the events of … Return of the Jedi".', ['The Mandalorian']), 'The Mandalorian'),
    ssn(2, 8, '2020-10-30', '2020-12-18', 'new-republic', off(9, '9 ABY', '', [TL('The Mandalorian Season Two')]), 'The Mandalorian'),
    ssn(3, 8, '2023-03-01', '2023-04-19', 'new-republic', inf(9, '9 ABY', 'Wookieepedia.', [TL('The Mandalorian Season Three')]), 'The Mandalorian'),
  ], ['din-djarin', 'grogu']),
  single({ id: 'the-book-of-boba-fett', title: 'The Book of Boba Fett', type: 'series', wiki: 'The Book of Boba Fett', continuity: 'sw-canon', studio: 'lucasfilm', platform: 'disney-plus', chars: ['boba-fett', 'din-djarin', 'grogu'],
    unitLabel: 'Season 1', grp: { era: 'new-republic' }, rel: { date: '2021-12-29', end: '2022-02-09', src: 'The Book of Boba Fett' },
    iu: off(9, '9 ABY', '"set within the timeline of The Mandalorian".', ['The Book of Boba Fett']) }),
  single({ id: 'skeleton-crew', title: 'Star Wars: Skeleton Crew', type: 'series', wiki: 'Star Wars: Skeleton Crew', continuity: 'sw-canon', studio: 'lucasfilm', platform: 'disney-plus', chars: [],
    unitLabel: 'Season 1', grp: { era: 'new-republic' }, rel: { date: '2024-12-02', end: '2025-01-14', src: 'Star Wars: Skeleton Crew' },
    iu: inf(9, 'c. 9 ABY', '"Roughly five years after the fall of the Galactic Empire".', ['Star Wars: Skeleton Crew']) }),
  series('ahsoka', 'Star Wars: Ahsoka', 'Star Wars: Ahsoka', 'series', 'disney-plus', [
    ssn(1, 8, '2023-08-22', '2023-10-03', 'new-republic', inf(9, '9 ABY', 'Star Wars Insider via Wookieepedia.', ['Star Wars: Ahsoka', TL('Ahsoka (television series)')]), 'Star Wars: Ahsoka'),
    { key: 's2', label: 'Season 2', season: 2, episodes: 8, grp: { era: 'new-republic' }, iu: UNRELEASED('Dated in the list article only.', ['List of Star Wars television series']), rel: { date: '2027-01-20', src: 'List of Star Wars television series' } },
  ], ['ahsoka-tano', 'hera-syndulla', 'ezra-bridger']),
  film('the-mandalorian-and-grogu', 'The Mandalorian and Grogu', 'The Mandalorian and Grogu', '2026-05-22', 'new-republic',
    inf(14, 'c. 14 ABY', 'Official podcast: "about ten years into" the 30-year gap after Return of the Jedi (Wookieepedia).', [TL('The Mandalorian and Grogu')]), ['din-djarin', 'grogu'], { links: [{ to: 'the-mandalorian', kind: 'continues' }] }),
  series('star-wars-resistance', 'Star Wars Resistance', 'Star Wars Resistance', 'animated-series', 'disney-channel', [
    ssn(1, 21, '2018-10-07', '2019-03-17', 'rise-of-the-first-order', off(34, '34 ABY', '"begins six months before The Force Awakens".', ['Star Wars Resistance']), 'Star Wars Resistance'),
    ssn(2, 19, '2019-10-06', '2020-01-26', 'rise-of-the-first-order', off(34, '34 ABY', 'One episode in 35 ABY.', [TL('Star Wars Resistance Season Two')]), 'Star Wars Resistance'),
  ], ['kylo-ren'], {}, 'lucasfilm-animation'),
  film('the-force-awakens', 'Star Wars: The Force Awakens', 'Star Wars: The Force Awakens', '2015-12-18', 'rise-of-the-first-order',
    off(34, '34 ABY', '"Set thirty years after Return of the Jedi".', ['Star Wars: The Force Awakens']), ['rey', 'kylo-ren', 'han-solo', 'leia-organa', 'luke-skywalker']),
  film('the-last-jedi', 'Star Wars: The Last Jedi', 'Star Wars: The Last Jedi', '2017-12-15', 'rise-of-the-first-order',
    off(34, '34 ABY', '"begins immediately after The Force Awakens".', ['Star Wars: The Last Jedi']), ['rey', 'kylo-ren', 'luke-skywalker', 'leia-organa']),
  film('the-rise-of-skywalker', 'Star Wars: The Rise of Skywalker', 'Star Wars: The Rise of Skywalker', '2019-12-20', 'rise-of-the-first-order',
    off(35, '35 ABY', '"A year after the Battle of Crait".', ['Star Wars: The Rise of Skywalker']), ['rey', 'kylo-ren', 'palpatine', 'leia-organa']),
  film('star-wars-starfighter', 'Star Wars: Starfighter', 'Star Wars: Starfighter', '2027-05-28', 'new-jedi-order',
    UNRELEASED('"set five years after the events of … The Rise of Skywalker" (c. 40 ABY); not placed until release.', ['Star Wars: Starfighter']), []),
  single({ id: 'the-acolyte', title: 'Star Wars: The Acolyte', type: 'series', wiki: 'Star Wars: The Acolyte', continuity: 'sw-canon', studio: 'lucasfilm', platform: 'disney-plus', chars: [], teams: ['jedi'],
    unitLabel: 'Season 1', grp: { era: 'high-republic' }, rel: { date: '2024-06-04', end: '2024-07-16', src: 'Star Wars: The Acolyte' },
    iu: Y(-132, '132 BBY (flashbacks 148 BBY)', 'stated', 'Wikipedia: "The Acolyte is set in 132 BBY"; "approximately 100 years before … The Phantom Menace".', ['Star Wars: Episode I – The Phantom Menace', 'Star Wars: The Acolyte']) }),
  series('young-jedi-adventures', 'Star Wars: Young Jedi Adventures', 'Star Wars: Young Jedi Adventures', 'animated-series', 'disney-plus', [
    ssn(1, 25, '2023-05-04', '2024-02-14', 'high-republic', inf(-233, 'c. 233–232 BBY', '"centuries before the events of the main Star Wars films".', ['Star Wars: Young Jedi Adventures', TL('Star Wars: Young Jedi Adventures Season One')], -232), 'Star Wars: Young Jedi Adventures', undefined, 'Also Disney Jr.; six shorts 2023-04-26.'),
    ssn(2, 23, '2024-08-14', '2025-03-19', 'high-republic', inf(-232, 'c. 232 BBY', 'Wookieepedia.', [TL('Star Wars: Young Jedi Adventures Season Two')]), 'Star Wars: Young Jedi Adventures'),
    ssn(3, 7, '2025-12-08', null, 'high-republic', inf(-232, '232–230 BBY', 'Wookieepedia.', [TL('Star Wars: Young Jedi Adventures Season Three')], -230), 'Star Wars: Young Jedi Adventures', undefined, 'Released all at once.'),
  ], [], { teams: ['jedi'] }, 'lucasfilm-animation'),
  single({ id: 'tales-of-the-jedi', title: 'Tales of the Jedi', type: 'animated-series', wiki: TALES, continuity: 'sw-canon', studio: 'lucasfilm-animation', platform: 'disney-plus', chars: ['ahsoka-tano'], teams: ['jedi'],
    unitLabel: 'Season 1', grp: { era: 'fall-of-the-jedi' }, rel: { date: '2022-10-26', src: TALES, note: 'Released all at once.' },
    iu: inf(-68, 'c. 68–19 BBY', 'Anthology; episodes span c. 68 to 19 BBY (Wookieepedia; some placements marked unknown).', [TL('Tales of the Jedi (television series)')], -19) }),
  single({ id: 'tales-of-the-empire', title: 'Tales of the Empire', type: 'animated-series', wiki: TALES, continuity: 'sw-canon', studio: 'lucasfilm-animation', platform: 'disney-plus', chars: [],
    unitLabel: 'Season 1', grp: { era: 'reign-of-the-empire' }, rel: { date: '2024-05-04', src: TALES },
    iu: inf(-20, '20 BBY – New Republic era', 'Anthology "set in different eras" (Wookieepedia: 20 BBY, c. 9–2 BBY, and later).', [TALES, TL('Tales of the Empire')], 9) }),
  single({ id: 'tales-of-the-underworld', title: 'Tales of the Underworld', type: 'animated-series', wiki: TALES, continuity: 'sw-canon', studio: 'lucasfilm-animation', platform: 'disney-plus', chars: [],
    unitLabel: 'Season 1', grp: { era: 'reign-of-the-empire' }, rel: { date: '2025-05-04', src: TALES },
    iu: inf(-62, 'c. 62 BBY onward', 'Anthology; episodes c. 62–33 BBY and 18 BBY onward (Wookieepedia).', [TL('Tales of the Underworld')], -18) }),
  series('forces-of-destiny', 'Star Wars Forces of Destiny', 'Star Wars Forces of Destiny', 'animated-series', 'youtube', [
    { key: 's1', label: 'Micro-series', season: 1, episodes: 32, iu: R('Various eras', 'Shorts set across many eras; no single placement.', ['Star Wars Forces of Destiny']), rel: { date: '2017-07-03', end: '2018-05-25', src: 'Star Wars Forces of Destiny' } },
  ], ['leia-organa', 'rey', 'ahsoka-tano'], {}, 'lucasfilm-animation'),
];

// ================================================================ Legends (screen)
const LEG = (id: string, title: string, wiki: string, type: SeedTitle['type'], studio: string, platform: string, units: SeedUnit[], chars: string[] = []): SeedTitle =>
  ({ id, title, type, wiki, continuity: 'sw-legends', studio, platform, chars, units });
export const LEGENDS: SeedTitle[] = [
  LEG('star-wars-holiday-special', 'Star Wars Holiday Special', 'Star Wars Holiday Special', 'special', 'smith-hemion', 'cbs', [{ key: '', label: 'Special', rel: { date: '1978-11-17', src: 'Star Wars Holiday Special' },
    iu: Y(1, 'c. 1 ABY', 'disputed', 'Wikipedia: "set between the events of the original film and … The Empire Strikes Back"; Wookieepedia cites Leland Chee: Life Day "fell at ~1.5 ABY". Canon status was ambiguous before 2014, and Abrams called it "definitely canon" in 2015.', ['Star Wars Holiday Special', TL('Star Wars Holiday Special')]) }], ['han-solo', 'luke-skywalker', 'leia-organa']),
  LEG('caravan-of-courage', 'Caravan of Courage: An Ewok Adventure', 'Caravan of Courage: An Ewok Adventure', 'special', 'lucasfilm', 'abc', [{ key: '', label: 'TV film', rel: { date: '1984-11-25', src: 'Caravan of Courage: An Ewok Adventure' },
    iu: Y(3, '3 ABY', 'inferred', '"set between the events of The Empire Strikes Back and Return of the Jedi"; 3 ABY per Behind the Magic (Wookieepedia).', ['List of Star Wars films', TL('Caravan of Courage: An Ewok Adventure')]) }], ['ewoks']),
  LEG('ewoks-the-battle-for-endor', 'Ewoks: The Battle for Endor', 'Ewoks: The Battle for Endor', 'special', 'lucasfilm', 'abc', [{ key: '', label: 'TV film', rel: { date: '1985-11-24', src: 'Ewoks: The Battle for Endor' },
    iu: Y(3, '3 ABY', 'inferred', 'As Caravan of Courage (Wookieepedia).', [TL('Ewoks: The Battle for Endor')]) }], ['ewoks']),
  LEG('star-wars-droids', 'Star Wars: Droids', 'Star Wars: Droids', 'animated-series', 'nelvana', 'abc', [{ key: 's1', label: 'Season 1', season: 1, episodes: 13, rel: { date: '1985-09-07', end: '1985-11-30', src: 'Star Wars: Droids', note: 'Plus the special "The Great Heep" (1986-06-07).' },
    iu: Y(-15, '15 BBY', 'inferred', '"retroactively placed 4 years after Revenge of the Sith and 15 years before … A New Hope".', ['Star Wars: Droids']) }], ['r2-d2', 'c-3po']),
  LEG('star-wars-ewoks', 'Star Wars: Ewoks', 'Star Wars: Ewoks', 'animated-series', 'nelvana', 'abc', [
    { key: 's1', label: 'Season 1', season: 1, episodes: 13, rel: { date: '1985-09-07', end: '1985-11-30', src: 'Star Wars: Ewoks' }, iu: Y(3, 'c. 3–4 ABY', 'disputed', 'Wookieepedia (Behind the Magic): 3.5–4 ABY; Wikipedia says the series was "retroactively set before the original trilogy".', [TL('Ewoks (television series)'), 'Star Wars: Ewoks'], 4) },
    { key: 's2', label: 'Season 2', season: 2, episodes: 13, rel: { date: '1986-09-13', end: '1986-12-13', src: 'Star Wars: Ewoks' }, iu: Y(3, 'c. 3–4 ABY', 'disputed', 'As season 1.', ['Star Wars: Ewoks'], 4) },
  ], ['ewoks']),
  LEG('clone-wars-2003', 'Star Wars: Clone Wars (2003)', 'Star Wars: Clone Wars', 'animated-series', 'cartoon-network-studios', 'cartoon-network', [
    { key: 's1', label: 'Season 1', season: 1, episodes: 10, rel: { date: '2003-11-07', end: '2003-11-20', src: 'Star Wars: Clone Wars' }, iu: Y(-22, '22–21 BBY', 'inferred', 'New Essential Chronology via Wookieepedia.', [TL('Clone Wars: Season One')], -21) },
    { key: 's2', label: 'Season 2', season: 2, episodes: 10, rel: { date: '2004-03-26', end: '2004-04-08', src: 'Star Wars: Clone Wars' }, iu: Y(-22, 'within 22–19 BBY', 'inferred', 'Wookieepedia (series as a whole).', [TL('Star Wars: Clone Wars (2003 TV series)')], -19) },
    { key: 's3', label: 'Season 3', season: 3, episodes: 5, rel: { date: '2005-03-22', end: '2005-03-25', src: 'Star Wars: Clone Wars', note: 'Last-episode date conflicts (03-25 vs 03-26).' }, iu: Y(-19, 'c. 19 BBY', 'inferred', 'Leads into Revenge of the Sith (Wookieepedia).', [TL('Star Wars: Clone Wars (2003 TV series)')]) },
  ], ['anakin-skywalker', 'obi-wan-kenobi']),
];

// ================================================================ Non-canon: Visions, LEGO
const VIS = 'Star Wars: Visions';
export const VISIONS: SeedTitle[] = [
  ...([[1, '2021-09-22'], [2, '2023-05-04'], [3, '2025-10-29']] as const).map(([v, d]): SeedTitle => single({
    id: `star-wars-visions-vol-${v}`, title: `Star Wars: Visions – Volume ${v}`, type: 'animated-series', wiki: VIS, continuity: 'sw-visions', studio: 'lucasfilm', platform: 'disney-plus', tier: 'adjacent',
    unitLabel: 'Volume', rel: { date: d, src: VIS, note: '9 shorts by different studios; released all at once.' }, iu: R(`Volume ${v}`, 'Not on the canonical timeline.', [VIS]) })),
  single({ id: 'visions-presents-the-ninth-jedi', title: 'Star Wars: Visions Presents – The Ninth Jedi', type: 'animated-series', wiki: 'Star Wars: Visions Presents', continuity: 'sw-visions', studio: 'lucasfilm', platform: 'disney-plus', tier: 'adjacent',
    unitLabel: 'Series', rel: { date: '2026-08-05', src: 'Star Wars: Visions Presents' }, iu: R('Series', 'Wookieepedia tags it non-canon.', [TL('Star Wars: Visions Presents')]) }),
];
const LEGO = 'Lego Star Wars';
const lego = (id: string, title: string, type: SeedTitle['type'], date: string, platform: string, note = ''): SeedTitle =>
  single({ id, title, type, wiki: LEGO, continuity: 'sw-lego', studio: 'lucasfilm', platform, tier: 'adjacent', unitLabel: type === 'special' ? 'Special' : 'Series',
    rel: { date, src: LEGO, note }, iu: R(type === 'special' ? 'Special' : 'Series', 'Non-canon per Wookieepedia; Wikipedia is silent.', [LEGO]) });
export const LEGO_TITLES: SeedTitle[] = [
  lego('lego-revenge-of-the-brick', 'Lego Star Wars: Revenge of the Brick', 'special', '2005-05-08', 'cartoon-network'),
  lego('lego-the-quest-for-r2-d2', 'Lego Star Wars: The Quest for R2-D2', 'special', '2009-08-27', 'cartoon-network'),
  lego('lego-the-padawan-menace', 'Lego Star Wars: The Padawan Menace', 'special', '2011-07-07', 'platform-not-stated'),
  lego('lego-the-empire-strikes-out', 'Lego Star Wars: The Empire Strikes Out', 'special', '2012-09-26', 'cartoon-network'),
  lego('lego-the-yoda-chronicles', 'Lego Star Wars: The Yoda Chronicles', 'animated-series', '2013', 'platform-not-stated', 'Year only (2013–2014).'),
  lego('lego-droid-tales', 'Lego Star Wars: Droid Tales', 'animated-series', '2015-07-06', 'disney-xd'),
  lego('lego-the-resistance-rises', 'Lego Star Wars: The Resistance Rises', 'animated-series', '2016-02-15', 'disney-xd'),
  lego('lego-the-freemaker-adventures', 'Lego Star Wars: The Freemaker Adventures', 'animated-series', '2016-06-20', 'disney-xd', '2 seasons, to 2017-08-16.'),
  lego('lego-all-stars', 'Lego Star Wars: All-Stars', 'animated-series', '2018-10-29', 'disney-xd'),
  lego('the-lego-star-wars-holiday-special', 'The Lego Star Wars Holiday Special', 'special', '2020-11-17', 'disney-plus'),
  lego('lego-terrifying-tales', 'Lego Star Wars: Terrifying Tales', 'special', '2021-10-01', 'disney-plus'),
  lego('lego-summer-vacation', 'Lego Star Wars: Summer Vacation', 'special', '2022-08-05', 'disney-plus'),
  lego('lego-rebuild-the-galaxy', 'Lego Star Wars: Rebuild the Galaxy', 'animated-series', '2024-09-13', 'disney-plus'),
  lego('lego-rebuild-the-galaxy-pieces-of-the-past', 'Lego Star Wars: Rebuild the Galaxy – Pieces of the Past', 'animated-series', '2025-09-19', 'disney-plus'),
  lego('lego-star-wars-the-mandalorian', 'Lego Star Wars: The Mandalorian', 'special', '2026-09-02', 'disney-plus'),
];

export const SEED: SeedTitle[] = [...CANON, ...LEGENDS, ...VISIONS, ...LEGO_TITLES];
