// Godzilla & Kong seed (Stage 5). Story order within each continuity. Sources: English Wikipedia
// (revision ids in data/sources/manifest.json and the Stage 5 research notes). Toho dates are Japanese
// releases (US dates in the release note); Hollywood dates are US releases.
import { R, Y, UNRELEASED, seasons, single, type SeedIU, type SeedTitle } from './seed-kit.ts';

const FR = 'Godzilla (franchise)';
const MV = 'Monsterverse';
const KF = 'King Kong (franchise)';
const rel = (date: string, src: string, note = '') => ({ date, src, note });
const film = (id: string, title: string, wiki: string, continuity: string, studio: string, iu: SeedIU, release: ReturnType<typeof rel>, chars: string[] = ['godzilla'], extra: Partial<SeedTitle> & { era?: string } = {}): SeedTitle => {
  const { era, ...rest } = extra;
  return single({ id, title, type: 'film', wiki, continuity, studio, platform: 'theatrical', chars, unitLabel: 'Film', iu, rel: release, grp: era ? { era } : undefined, ...rest });
};
const sh = (id: string, title: string, wiki: string, iu: SeedIU, date: string, us: string, chars: string[] = ['godzilla'], extra: Partial<SeedTitle> = {}) =>
  film(id, title, wiki, 'toho-showa', 'toho', iu, rel(date, wiki, us ? `Japanese release; US: ${us}.` : 'Japanese release.'), chars, { era: 'showa', ...extra });
const rs = (s: string) => R(s, 'No in-universe year in sources; Shōwa films follow one another.', [FR]);

// ================================================================ Monsterverse (story order)
const MONSTERVERSE: SeedTitle[] = [
  film('kong-skull-island', 'Kong: Skull Island', 'Kong: Skull Island', 'monsterverse', 'legendary',
    Y(1973, '1973 (prologue 1944)', 'stated', '"Set in 1973, the film follows…"; "In 1973, Bill Randa…"', ['Kong: Skull Island', MV]), rel('2017-03-10', 'Kong: Skull Island'), ['kong'], { teams: ['monarch'] }),
  { id: 'skull-island-series', title: 'Skull Island', type: 'animated-series', wiki: 'Skull Island (TV series)', continuity: 'monsterverse', studio: 'legendary', platform: 'netflix', chars: ['kong'],
    links: [{ to: 'kong-skull-island', kind: 'sequel' }],
    units: [{ key: 's1', label: 'Season 1', season: 1, episodes: 8, rel: rel('2023-06-22', 'Skull Island (TV series)'), iu: Y(1993, '1993', 'stated', '"In 1993 a group of explorers venture out to sea"; "a sequel to Kong: Skull Island".', ['Skull Island (TV series)']) }] },
  film('godzilla-2014', 'Godzilla', 'Godzilla (2014 film)', 'monsterverse', 'legendary',
    Y(2014, '2014 (flashbacks 1954, 1999)', 'stated', '"In 1954, Godzilla… is lured to Bikini Atoll… In 1999, Monarch scientists… In 2014, Joe and Sandra\'s son Ford…"', ['Godzilla (2014 film)']), rel('2014-05-16', 'Godzilla (2014 film)'), ['godzilla'], { teams: ['monarch'] }),
  { id: 'monarch-legacy-of-monsters', title: 'Monarch: Legacy of Monsters', type: 'series', wiki: 'Monarch: Legacy of Monsters', continuity: 'monsterverse', studio: 'legendary', platform: 'apple-tv-plus', chars: ['godzilla', 'kong'], teams: ['monarch'],
    units: [
      { key: 's1', label: 'Season 1', season: 1, rel: { date: '2023-11-17', end: '2024-01-12', src: 'Monarch: Legacy of Monsters' }, iu: Y(2015, '2015 (and the 1950s)', 'stated', '"In 2015, one year after the re-emergence of Godzilla…"; "In 1952, Shaw is assigned as Keiko\'s escort".', ['Monarch: Legacy of Monsters']) },
      { key: 's2', label: 'Season 2', season: 2, rel: { date: '2026-02-27', end: '2026-05-01', src: 'Monarch: Legacy of Monsters' }, iu: Y(2017, '2017', 'stated', '"In 2017, Kong attacks the Apex station on Skull Island".', ['Monarch: Legacy of Monsters']) },
    ] },
  film('godzilla-king-of-the-monsters', 'Godzilla: King of the Monsters', 'Godzilla: King of the Monsters (2019 film)', 'monsterverse', 'legendary',
    Y(2019, '2019', 'inferred', '"Five years after the revelation of giant monsters"; category "Films set in 2019".', ['Godzilla: King of the Monsters (2019 film)']), rel('2019-05-31', 'Godzilla: King of the Monsters (2019 film)'), ['godzilla', 'king-ghidorah', 'mothra', 'rodan'], { teams: ['monarch'] }),
  film('godzilla-vs-kong', 'Godzilla vs. Kong', 'Godzilla vs. Kong', 'monsterverse', 'legendary',
    Y(2024, '2024', 'inferred', '"Five years after… King Ghidorah… was defeated"; category "Films set in 2024".', ['Godzilla vs. Kong']), rel('2021-03-31', 'Godzilla vs. Kong', 'US release (also HBO Max); international 2021-03-24.'), ['godzilla', 'kong', 'mechagodzilla']),
  film('godzilla-x-kong-the-new-empire', 'Godzilla x Kong: The New Empire', 'Godzilla x Kong: The New Empire', 'monsterverse', 'legendary',
    Y(2027, '2027', 'inferred', '"Three years after defeating Mechagodzilla"; category "Films set in 2027".', ['Godzilla x Kong: The New Empire']), rel('2024-03-29', 'Godzilla x Kong: The New Empire'), ['godzilla', 'kong', 'mothra']),
  film('godzilla-x-kong-supernova', 'Godzilla x Kong: Supernova', 'Godzilla x Kong: Supernova', 'monsterverse', 'legendary',
    UNRELEASED('No placement published (unreleased).', ['Godzilla x Kong: Supernova']), rel('2027-03-26', 'Godzilla x Kong: Supernova'), ['godzilla', 'kong', 'spacegodzilla']),
];

// ================================================================ Toho Shōwa (release = story order)
const SHOWA: SeedTitle[] = [
  sh('godzilla-1954', 'Godzilla', 'Godzilla (1954 film)', Y(1954, '1954', 'inferred', 'Category "Films set in 1954" only.', ['Godzilla (1954 film)']), '1954-11-03', '1956-04-04 as the re-edited Godzilla, King of the Monsters!'),
  sh('godzilla-raids-again', 'Godzilla Raids Again', 'Godzilla Raids Again', R('Sequel to Godzilla (1954)', '"a sequel to Godzilla (1954)".', ['Godzilla Raids Again'], 'stated'), '1955-04-24', '1959 as Gigantis, the Fire Monster (the date is disputed: 1959-05-21 or 1959-06-02)', ['godzilla', 'anguirus']),
  sh('king-kong-vs-godzilla', 'King Kong vs. Godzilla', 'King Kong vs. Godzilla', Y(1960, '1960s', 'inferred', 'Godzilla "had been trapped within it since 1955"; category "Films set in the 1960s".', ['King Kong vs. Godzilla'], 1969, 'approx'), '1962-08-11', '1963-06-26 (Universal)', ['godzilla', 'kong']),
  sh('mothra-vs-godzilla', 'Mothra vs. Godzilla', 'Mothra vs. Godzilla', Y(1964, '1964', 'inferred', 'Category "Films set in 1964".', ['Mothra vs. Godzilla']), '1964-04-29', '1964-08-26 (AIP)', ['godzilla', 'mothra']),
  sh('ghidorah-the-three-headed-monster', 'Ghidorah, the Three-Headed Monster', 'Ghidorah, the Three-Headed Monster', rs('Shōwa sequel'), '1964-12-20', '1965-09-29', ['godzilla', 'king-ghidorah', 'mothra', 'rodan']),
  sh('invasion-of-astro-monster', 'Invasion of Astro-Monster', 'Invasion of Astro-Monster', Y(1960, '196X', 'inferred', '"In the year 196X, two astronauts…" (decade stated, year withheld).', ['Invasion of Astro-Monster'], 1969, 'approx'), '1965-12-19', '1970-07-29', ['godzilla', 'king-ghidorah', 'rodan']),
  sh('ebirah-horror-of-the-deep', 'Ebirah, Horror of the Deep', 'Ebirah, Horror of the Deep', rs('Shōwa sequel'), '1966-12-17', 'US television 1968'),
  sh('son-of-godzilla', 'Son of Godzilla', 'Son of Godzilla', rs('Shōwa sequel'), '1967-12-16', 'US television 1969', ['godzilla', 'minilla']),
  sh('destroy-all-monsters', 'Destroy All Monsters', 'Destroy All Monsters', Y(1999, 'End of the 20th century (1999)', 'inferred', '"At the end of the 20th century, all of the Earth\'s giant monsters have been collected…"; category "Films set in 1999". Set later than the films released after it.', ['Destroy All Monsters']), '1968-08-01', '1969-05-23 (AIP)', ['godzilla', 'king-ghidorah', 'mothra', 'rodan', 'anguirus', 'minilla']),
  sh('all-monsters-attack', 'All Monsters Attack', 'All Monsters Attack', rs('Shōwa sequel'), '1969-12-20', '1971', ['godzilla', 'minilla']),
  sh('godzilla-vs-hedorah', 'Godzilla vs. Hedorah', 'Godzilla vs. Hedorah', rs('Shōwa sequel'), '1971-07-24', ''),
  sh('godzilla-vs-gigan', 'Godzilla vs. Gigan', 'Godzilla vs. Gigan', rs('Shōwa sequel'), '1972-03-12', '1977', ['godzilla', 'gigan', 'anguirus', 'king-ghidorah']),
  sh('godzilla-vs-megalon', 'Godzilla vs. Megalon', 'Godzilla vs. Megalon', Y(1971, '1971', 'stated', '"In the first part of 1971, the second of a series of underground nuclear tests is conducted".', ['Godzilla vs. Megalon']), '1973-03-17', 'summer 1976', ['godzilla', 'gigan']),
  { id: 'zone-fighter', title: 'Zone Fighter', type: 'series', wiki: 'Zone Fighter', continuity: 'toho-showa', studio: 'toho', platform: 'nippon-tv', chars: ['godzilla', 'king-ghidorah', 'gigan'],
    units: [{ key: 's1', label: 'Series', season: 1, grp: { era: 'showa' }, rel: { date: '1973-04-02', end: '1973-09-24', src: 'Zone Fighter' },
      iu: R('Between Megalon and Mechagodzilla', '"Supplementary materials published by Toho have confirmed Zone Fighter to be part of the same continuity as the Showa era Godzilla series, taking place in between Godzilla vs. Megalon and Godzilla vs. Mechagodzilla."', ['Zone Fighter'], 'stated') }] },
  sh('godzilla-vs-mechagodzilla', 'Godzilla vs. Mechagodzilla', 'Godzilla vs. Mechagodzilla', rs('Shōwa sequel'), '1974-03-21', 'March 1977', ['godzilla', 'mechagodzilla']),
  sh('terror-of-mechagodzilla', 'Terror of Mechagodzilla', 'Terror of Mechagodzilla', R('Direct sequel to Godzilla vs. Mechagodzilla', '"serving as a direct sequel to the 1974 film Godzilla vs. Mechagodzilla".', ['Terror of Mechagodzilla'], 'stated'), '1975-03-15', 'March 1978', ['godzilla', 'mechagodzilla'], { links: [{ to: 'godzilla-vs-mechagodzilla', kind: 'sequel' }] }),
];

// ================================================================ Toho Heisei
const he = (id: string, title: string, wiki: string, iu: SeedIU, date: string, us: string, chars: string[] = ['godzilla'], extra: Partial<SeedTitle> = {}) =>
  film(id, title, wiki, 'toho-heisei', 'toho', iu, rel(date, wiki, `Japanese release; US: ${us}.`), chars, { era: 'heisei', ...extra });
const HEISEI: SeedTitle[] = [
  he('the-return-of-godzilla', 'The Return of Godzilla', 'The Return of Godzilla', Y(1985, '1985', 'inferred', 'Category "Films set in 1985"; Biollante\'s plot recalls "Godzilla\'s attack on Tokyo… in 1985". "a direct sequel to the original 1954 film".', ['The Return of Godzilla', 'Godzilla vs. Biollante']), '1984-12-15', '1985-08-23 as the re-edited Godzilla 1985'),
  he('godzilla-vs-biollante', 'Godzilla vs. Biollante', 'Godzilla vs. Biollante', Y(1990, '1990 (prologue 1985)', 'stated', '"Five years later, in 1990, Shiragami has returned to Japan".', ['Godzilla vs. Biollante']), '1989-12-16', 'direct-to-video 1992-11-25', ['godzilla', 'biollante']),
  he('godzilla-vs-king-ghidorah', 'Godzilla vs. King Ghidorah', 'Godzilla vs. King Ghidorah', Y(1992, '1992 (time travel to 1944)', 'stated', '"The Futurians… travel back to 1944… Returning to 1992".', ['Godzilla vs. King Ghidorah']), '1991-12-14', 'direct-to-video 1998', ['godzilla', 'king-ghidorah']),
  he('godzilla-vs-mothra', 'Godzilla vs. Mothra', 'Godzilla vs. Mothra', Y(1993, '1992–1993', 'inferred', '"Following the battle with Mecha-King Ghidorah in mid-1992… Six months later"; category 1993.', ['Godzilla vs. Mothra'], undefined, 'approx'), '1992-12-12', 'home video 1998-04-28', ['godzilla', 'mothra']),
  he('godzilla-vs-mechagodzilla-ii', 'Godzilla vs. Mechagodzilla II', 'Godzilla vs. Mechagodzilla II', Y(1994, '1994', 'inferred', '"Two years later and one year after Godzilla battled Mothra"; category 1994.', ['Godzilla vs. Mechagodzilla II']), '1993-12-11', 'pay-per-view 1998', ['godzilla', 'mechagodzilla', 'rodan']),
  he('godzilla-vs-spacegodzilla', 'Godzilla vs. SpaceGodzilla', 'Godzilla vs. SpaceGodzilla', Y(1995, '1995', 'inferred', 'Category "Films set in 1995" only.', ['Godzilla vs. SpaceGodzilla']), '1994-12-10', 'direct-to-video 1999', ['godzilla', 'spacegodzilla']),
  he('godzilla-vs-destoroyah', 'Godzilla vs. Destoroyah', 'Godzilla vs. Destoroyah', Y(1996, '1996', 'inferred', '"One year after the defeat of SpaceGodzilla"; category 1996.', ['Godzilla vs. Destoroyah']), '1995-12-09', 'direct-to-video 1999', ['godzilla', 'destoroyah']),
];

// ================================================================ Millennium: Kiryu duology; TriStar + GMK
const KIRYU: SeedTitle[] = [
  film('godzilla-against-mechagodzilla', 'Godzilla Against Mechagodzilla', 'Godzilla Against Mechagodzilla', 'kiryu-duology', 'toho',
    Y(2003, '2003 (prologue 1999)', 'inferred', '"Forty-five years after the first Godzilla\'s attack and death… Four years later"; categories 1999 and 2003.', ['Godzilla Against Mechagodzilla']), rel('2002-12-14', 'Godzilla Against Mechagodzilla', 'Japanese release; US one-day Fathom showing 2022-11-03.'), ['godzilla', 'mechagodzilla'], { era: 'millennium' }),
  film('godzilla-tokyo-sos', 'Godzilla: Tokyo S.O.S.', 'Godzilla: Tokyo S.O.S.', 'kiryu-duology', 'toho',
    Y(2004, '2004', 'inferred', '"Set one year after the events of the previous film"; category 2004.', ['Godzilla: Tokyo S.O.S.']), rel('2003-12-13', 'Godzilla: Tokyo S.O.S.', 'Japanese release.'), ['godzilla', 'mechagodzilla', 'mothra'], { era: 'millennium', links: [{ to: 'godzilla-against-mechagodzilla', kind: 'sequel' }] }),
];
const TRISTAR: SeedTitle[] = [
  film('godzilla-1998', 'Godzilla', 'Godzilla (1998 film)', 'tristar-gmk', 'tristar',
    Y(1998, '1998', 'inferred', 'Category "Films set in 1998" only.', ['Godzilla (1998 film)']), rel('1998-05-20', 'Godzilla (1998 film)')),
  { id: 'godzilla-the-series', title: 'Godzilla: The Series', type: 'animated-series', wiki: 'Godzilla: The Series', continuity: 'tristar-gmk', studio: 'tristar', platform: 'fox-kids', chars: ['godzilla'],
    links: [{ to: 'godzilla-1998', kind: 'sequel' }],
    units: [{ key: 's1-2', label: 'Seasons 1–2', season: 1, rel: { date: '1998-09-12', end: '2000-04-22', src: 'Godzilla: The Series' },
      iu: R('After Godzilla (1998)', '"is a sequel to Godzilla (1998)"; monsters "appear in the wake of the events depicted in the 1998 film".', ['Godzilla: The Series'], 'stated') }] },
  film('godzilla-mothra-and-king-ghidorah', 'Godzilla, Mothra and King Ghidorah: Giant Monsters All-Out Attack', 'Godzilla, Mothra and King Ghidorah: Giant Monsters All-Out Attack', 'tristar-gmk', 'toho',
    Y(2002, '2002', 'stated', '"In 2002, during a JSDF briefing…"; it "shares a standalone continuity with the 1998 American film, ignoring the events of every other installment".', ['Godzilla, Mothra and King Ghidorah: Giant Monsters All-Out Attack']),
    rel('2001-12-15', 'Godzilla, Mothra and King Ghidorah: Giant Monsters All-Out Attack', 'Japanese release; US premiere 2003-07-19 (G-Fest).'), ['godzilla', 'mothra', 'king-ghidorah'], { era: 'millennium' }),
];

// ================================================================ Reiwa: anime trilogy; Minus duology
const ANIME: SeedTitle[] = [
  single({ id: 'godzilla-planet-of-the-monsters', title: 'Godzilla: Planet of the Monsters', type: 'animated-film', wiki: 'Godzilla: Planet of the Monsters', continuity: 'godzilla-anime-trilogy', studio: 'polygon-pictures', platform: 'theatrical', chars: ['godzilla'], unitLabel: 'Film', grp: { era: 'reiwa' },
    rel: rel('2017-11-17', 'Godzilla: Planet of the Monsters', 'Japanese theatrical release; Netflix worldwide 2018-01-17.'),
    iu: R('Part 1', 'Backstory "last summer of the 20th century"; "almost 20,000 years have elapsed due to relativistic effects" (the page is also in the category "Animated films set in the 2040s": disputed).', ['Godzilla: Planet of the Monsters'], 'disputed') }),
  single({ id: 'godzilla-city-on-the-edge-of-battle', title: 'Godzilla: City on the Edge of Battle', type: 'animated-film', wiki: 'Godzilla: City on the Edge of Battle', continuity: 'godzilla-anime-trilogy', studio: 'polygon-pictures', platform: 'theatrical', chars: ['godzilla', 'mechagodzilla'], unitLabel: 'Film', grp: { era: 'reiwa' },
    rel: rel('2018-05-18', 'Godzilla: City on the Edge of Battle', 'Japanese release; Netflix 2018-07-18.'), iu: R('Part 2', '"A sequel to the 2017 film Godzilla: Planet of the Monsters".', ['Godzilla: City on the Edge of Battle'], 'stated'),
    links: [{ to: 'godzilla-planet-of-the-monsters', kind: 'sequel' }] }),
  single({ id: 'godzilla-the-planet-eater', title: 'Godzilla: The Planet Eater', type: 'animated-film', wiki: 'Godzilla: The Planet Eater', continuity: 'godzilla-anime-trilogy', studio: 'polygon-pictures', platform: 'theatrical', chars: ['godzilla', 'king-ghidorah'], unitLabel: 'Film', grp: { era: 'reiwa' },
    rel: rel('2018-11-09', 'Godzilla: The Planet Eater', 'Japanese release (TIFF premiere 2018-11-03); Netflix.'), iu: R('Part 3', '"concludes the narrative of the anime trilogy".', ['Godzilla: The Planet Eater'], 'stated'),
    links: [{ to: 'godzilla-city-on-the-edge-of-battle', kind: 'sequel' }] }),
];
const MINUS: SeedTitle[] = [
  film('godzilla-minus-one', 'Godzilla Minus One', 'Godzilla Minus One', 'godzilla-minus', 'toho',
    Y(1945, '1945–1947', 'stated', '"In 1945, near the end of World War II…"; "In May 1947, Kōichi and his minesweeper crew…"', ['Godzilla Minus One'], 1947), rel('2023-11-03', 'Godzilla Minus One', 'Japanese release; US 2023-12-01.'), ['godzilla'], { era: 'reiwa' }),
  film('godzilla-minus-zero', 'Godzilla Minus Zero', 'Godzilla Minus Zero', 'godzilla-minus', 'toho',
    Y(1949, '1949', 'stated', '"In 1949, two years after Godzilla\'s apparent death in Sagami Bay".', ['Godzilla Minus Zero']), rel('2026-11-03', 'Godzilla Minus Zero', 'Japanese release (NYFF premiere 2026-09-26); US 2026-11-06 (GKIDS).'), ['godzilla'], { era: 'reiwa', links: [{ to: 'godzilla-minus-one', kind: 'sequel' }] }),
];

// ================================================================ Standalone Godzilla titles (release order)
const STANDALONE: SeedTitle[] = [
  { id: 'godzilla-hanna-barbera', title: 'Godzilla (1978 animated series)', type: 'animated-series', wiki: 'Godzilla (1978 TV series)', continuity: 'godzilla-standalone', studio: 'hanna-barbera', platform: 'nbc', chars: ['godzilla'],
    units: [{ key: 's1-2', label: 'Seasons 1–2', season: 1, episodes: 26, rel: { date: '1978-09-09', end: '1979-12-08', src: 'Godzilla (1978 TV series)' }, iu: R('Standalone', 'No continuity or year stated.', [FR]) }] },
  { id: 'godzilland', title: 'Godzilland', type: 'animated-series', wiki: 'Godzilland', continuity: 'godzilla-standalone', studio: 'toho', platform: 'tv-tokyo', chars: ['godzilla'],
    units: [{ key: 's1', label: 'Series', season: 1, grp: { era: 'heisei' }, rel: { date: '1992', end: '1996', src: 'Godzilland', note: 'Years only (1992–1996).' }, iu: R('Standalone', 'Kids\' series; no continuity stated.', ['Godzilland']) }] },
  { id: 'godzilla-island', title: 'Godzilla Island', type: 'series', wiki: 'Godzilla Island', continuity: 'godzilla-standalone', studio: 'toho', platform: 'tv-tokyo', chars: ['godzilla'],
    units: [{ key: 's1', label: 'Series', season: 1, grp: { era: 'heisei' }, rel: { date: '1997-10-06', end: '1998-09-30', src: 'Godzilla Island' }, iu: Y(2097, '2097', 'stated', '"Set in 2097".', ['Godzilla Island']) }] },
  film('godzilla-2000-millennium', 'Godzilla 2000: Millennium', 'Godzilla 2000', 'godzilla-standalone', 'toho',
    Y(2000, '2000', 'inferred', 'It "ignores the events of the previous installment, as well as every other entry… aside from the original 1954 film"; category 2000.', ['Godzilla 2000']), rel('1999-12-11', 'Godzilla 2000', 'Japanese release; US 2000-08-18 (TriStar).'), ['godzilla'], { era: 'millennium' }),
  film('godzilla-vs-megaguirus', 'Godzilla vs. Megaguirus', 'Godzilla vs. Megaguirus', 'godzilla-standalone', 'toho',
    Y(2001, '2001 (flashbacks 1954, 1966, 1996)', 'stated', '"In 2001, the G-Graspers… have developed…"', ['Godzilla vs. Megaguirus']), rel('2000-12-16', 'Godzilla vs. Megaguirus', 'Japanese release.'), ['godzilla'], { era: 'millennium' }),
  film('godzilla-final-wars', 'Godzilla: Final Wars', 'Godzilla: Final Wars', 'godzilla-standalone', 'toho',
    R('Standalone', '"the events of the 1954 film are ignored here"; backstory "Over the course of the 20th century…"; no year stated.', ['Godzilla: Final Wars', FR], 'stated'), rel('2004-12-04', 'Godzilla: Final Wars', 'Japanese release; US premiere date disputed (LA 2004-11-29).'), ['godzilla', 'gigan', 'king-ghidorah', 'mothra', 'rodan', 'anguirus', 'minilla'], { era: 'millennium' }),
  film('shin-godzilla', 'Shin Godzilla', 'Shin Godzilla', 'godzilla-standalone', 'toho',
    Y(2016, '2016', 'stated', '"In 2016, the Japan Coast Guard investigates an abandoned yacht in Tokyo Bay." A reboot with "no ties to Legendary\'s MonsterVerse".', ['Shin Godzilla']), rel('2016-07-29', 'Shin Godzilla', 'Japanese release; US limited 2016-10-11.'), ['godzilla'], { era: 'reiwa' }),
  { id: 'godzilla-singular-point', title: 'Godzilla Singular Point', type: 'animated-series', wiki: 'Godzilla Singular Point', continuity: 'godzilla-standalone', studio: 'bones', platform: 'netflix', chars: ['godzilla', 'rodan', 'anguirus'],
    units: [{ key: 's1', label: 'Series', season: 1, grp: { era: 'reiwa' }, rel: { date: '2021-03-25', end: '2021-06-24', src: 'Godzilla Singular Point', note: 'Netflix Japan; TV broadcast 2021-04-01 to 06-24.' },
      iu: Y(2030, '2030', 'stated', '"In Nigashio City, Chiba Prefecture in the year 2030…"; "no relation to Polygon\'s anime film trilogy".', ['Godzilla Singular Point', FR]) }] },
  { id: 'chibi-godzilla-raids-again', title: 'Chibi Godzilla Raids Again', type: 'animated-series', wiki: 'Chibi Godzilla Raids Again', continuity: 'godzilla-standalone', studio: 'pie-in-the-sky', platform: 'tv-tokyo', chars: ['godzilla'],
    units: [{ key: 's1', label: 'Series', season: 1, grp: { era: 'reiwa' }, rel: { date: '2023-04', src: 'Chibi Godzilla Raids Again', note: 'Season 1 April–June 2023; season 4 premiered 2026-04-01.' }, iu: R('Standalone', 'Comedy shorts; no continuity stated.', ['Chibi Godzilla Raids Again']) }] },
];

// ================================================================ King Kong
const KONG: SeedTitle[] = [
  film('king-kong-1933', 'King Kong', 'King Kong (1933 film)', 'kong-1933', 'rko', R('First film', 'No year stated (no year category).', ['King Kong (1933 film)'], 'stated'), rel('1933-04-07', 'King Kong (1933 film)', 'US general release (NYC premiere 1933-03-02).'), ['kong']),
  film('the-son-of-kong', 'The Son of Kong', 'Son of Kong', 'kong-1933', 'rko', R('A month after King Kong', '"A month after the destruction in New York City by Kong"; "the sequel to King Kong".', ['Son of Kong'], 'stated'), rel('1933-12-22', 'Son of Kong'), ['kong'], { links: [{ to: 'king-kong-1933', kind: 'sequel' }] }),
  { id: 'kong-the-animated-series', title: 'Kong: The Animated Series', type: 'animated-series', wiki: 'Kong: The Animated Series', continuity: 'kong-1933', studio: 'bkn', platform: 'm6', chars: ['kong'], links: [{ to: 'king-kong-1933', kind: 'sequel' }],
    units: [{ key: 's1', label: 'Series', season: 1, episodes: 40, rel: { date: '2000-09-09', end: '2001-03-26', src: 'King Kong (franchise)', note: 'Disputed: the franchise page gives 2000-09-09 to 2001-03-26 on M6; the series article gives a 2001 French premiere.' },
      iu: R('Many years after 1933', '"a direct sequel to the 1933 film"; "When King Kong fell… in 1933… Many years later…"', [KF, 'Kong: The Animated Series'], 'stated') }] },
  film('king-kong-1976', 'King Kong', 'King Kong (1976 film)', 'kong-1976', 'de-laurentiis', R('First film', 'No year stated.', ['King Kong (1976 film)'], 'stated'), rel('1976-12-17', 'King Kong (1976 film)'), ['kong']),
  film('king-kong-lives', 'King Kong Lives', 'King Kong Lives', 'kong-1976', 'de-laurentiis', R('Ten years later', '"a sequel to King Kong (1976) set ten years later".', ['King Kong Lives'], 'stated'), rel('1986-12-19', 'King Kong Lives'), ['kong'], { links: [{ to: 'king-kong-1976', kind: 'sequel' }] }),
  { id: 'the-king-kong-show', title: 'The King Kong Show', type: 'animated-series', wiki: 'The King Kong Show', continuity: 'kong-standalone', studio: 'rankin-bass', platform: 'abc', chars: ['kong'],
    units: [{ key: 's1', label: 'Series', season: 1, episodes: 25, rel: { date: '1966-09-06', end: '1967-03-04', src: 'The King Kong Show' }, iu: R('Standalone', 'No continuity stated.', ['The King Kong Show']) }] },
  film('king-kong-escapes', 'King Kong Escapes', 'King Kong Escapes', 'kong-standalone', 'toho', R('Standalone', '"loosely based on… The King Kong Show"; no link to King Kong vs. Godzilla is stated (standalone is an inference).', ['King Kong Escapes']), rel('1967-07-22', 'King Kong Escapes', 'Japanese release; US 1968-06-19.'), ['kong'], { era: 'showa' }),
  single({ id: 'the-mighty-kong', title: 'The Mighty Kong', type: 'animated-film', wiki: 'The Mighty Kong', continuity: 'kong-standalone', studio: 'lana-productions', platform: 'home-media', chars: ['kong'], unitLabel: 'Film',
    rel: rel('1998-06-16', 'The Mighty Kong', 'VHS release (LA screening 1998-05-29).'), iu: Y(1933, '1933', 'inferred', '"an adaptation of the classic King Kong story"; category "Films set in 1933".', ['The Mighty Kong']) }),
  film('king-kong-2005', 'King Kong', 'King Kong (2005 film)', 'kong-standalone', 'universal-pictures', Y(1933, '1933', 'stated', '"Set in 1933, it follows…"; "the second remake of the 1933 film".', ['King Kong (2005 film)']), rel('2005-12-14', 'King Kong (2005 film)'), ['kong'], { links: [{ to: 'king-kong-1933', kind: 'remake' }] }),
  { id: 'kong-king-of-the-apes', title: 'Kong: King of the Apes', type: 'animated-series', wiki: 'Kong: King of the Apes', continuity: 'kong-standalone', studio: 'arad-animation', platform: 'netflix', chars: ['kong'],
    units: seasons(1, () => Y(2050, '2050', 'stated', '"Set in 2050, Kong becomes a wanted fugitive…"', ['Kong: King of the Apes']), () => ({ label: 'Seasons 1–2', episodes: 23, rel: { date: '2016-04-15', end: '2018-05-04', src: 'Kong: King of the Apes' } })) },
];
// fix: the 1976 film is a remake too
KONG.find((t) => t.id === 'king-kong-1976')!.links = [{ to: 'king-kong-1933', kind: 'remake' }];
// era tag for Showa/Heisei Toho Kong entry kept on KKvG (in SHOWA)

export const SEED: SeedTitle[] = [...MONSTERVERSE, ...SHOWA, ...HEISEI, ...KIRYU, ...TRISTAR, ...ANIME, ...MINUS, ...STANDALONE, ...KONG];
