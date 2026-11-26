// The Wheel of Time seed. In-universe NE years come from the Wheel of Time Wiki (Fandom) Timeline
// ("Main Sequence"), which has no inline citations for them, so every year is "inferred".
import { R, Y, single, type SeedIU, type SeedTitle } from './seed-kit.ts';

const TL = 'wotfandom:Timeline';
const MAIN = ['rand-althor', 'moiraine', 'egwene', 'perrin', 'mat-cauthon', 'nynaeve', 'lan'];
const novel = (n: number | null, id: string, title: string, wiki: string, date: string, pages: number, iu: SeedIU, author: 'jordan' | 'jordan-sanderson', note = '', chars = MAIN): SeedTitle =>
  single({ id, title, type: 'novel', wiki, continuity: 'wot-books', studio: 'tor-books', platform: 'print-hardcover', chars, teams: ['aes-sedai'],
    unitLabel: 'Novel', pages, grp: { author }, iu, rel: { date, src: wiki, note: `First publication (Tor, US)${note ? `; ${note}` : ''}.` },
    notes: n ? `Book ${n} of 14.` : '' });
const ne = (y: number, books: string) => Y(y, `${y} NE`, 'inferred', `Wheel of Time Wiki Timeline ("Main Sequence"): "${y} NE: ${books}". No inline citation for the year.`, [TL]);
const Y998 = 'The Eye of the World, The Great Hunt';
const Y999 = 'The Dragon Reborn, The Shadow Rising, The Fires of Heaven, Lord of Chaos';
const Y1000 = 'A Crown of Swords … A Memory of Light';

export const BOOKS: SeedTitle[] = [
  novel(null, 'new-spring', 'New Spring', 'New Spring', '2004-01-06', 304,
    Y(978, '978–979 NE', 'inferred', 'Wikipedia: "Twenty years before the beginning of the series…". Wheel of Time Wiki Timeline: 978 NE "Gitara Moroso proclaims that the Dragon has been Reborn"; 979 NE "Moiraine and Siuan are raised to the shawl".', ['New Spring', TL], 979),
    'jordan', 'first published as a shorter novella in the anthology Legends on 1998-08-25', ['moiraine', 'lan', 'siuan']),
  novel(1, 'the-eye-of-the-world', 'The Eye of the World', 'The Eye of the World', '1990-01-15', 782, ne(998, Y998), 'jordan', 'UK: Orbit'),
  novel(2, 'the-great-hunt', 'The Great Hunt', 'The Great Hunt', '1990-11-15', 600, ne(998, Y998), 'jordan'),
  novel(3, 'the-dragon-reborn', 'The Dragon Reborn', 'The Dragon Reborn', '1991-10-15', 624, ne(999, Y999), 'jordan', 'the article\'s lead says September 15, 1991; infobox and series table say October 15'),
  novel(4, 'the-shadow-rising', 'The Shadow Rising', 'The Shadow Rising', '1992-09-15', 704, ne(999, Y999), 'jordan'),
  novel(5, 'the-fires-of-heaven', 'The Fires of Heaven', 'The Fires of Heaven', '1993-10-15', 704, ne(999, Y999), 'jordan'),
  novel(6, 'lord-of-chaos', 'Lord of Chaos', 'Lord of Chaos', '1994-10-15', 720, ne(999, Y999), 'jordan'),
  novel(7, 'a-crown-of-swords', 'A Crown of Swords', 'A Crown of Swords', '1996-05-15', 720, ne(1000, Y1000), 'jordan'),
  novel(8, 'the-path-of-daggers', 'The Path of Daggers', 'The Path of Daggers', '1998-10-20', 604, ne(1000, Y1000), 'jordan'),
  novel(9, 'winters-heart', "Winter's Heart", "Winter's Heart", '2000-11-07', 668, ne(1000, Y1000), 'jordan'),
  novel(10, 'crossroads-of-twilight', 'Crossroads of Twilight', 'Crossroads of Twilight', '2003-01-07', 704, ne(1000, Y1000), 'jordan'),
  novel(11, 'knife-of-dreams', 'Knife of Dreams', 'Knife of Dreams', '2005-10-11', 784, ne(1000, Y1000), 'jordan'),
  novel(12, 'the-gathering-storm', 'The Gathering Storm', 'The Gathering Storm (novel)', '2009-10-27', 783, ne(1000, Y1000), 'jordan-sanderson'),
  novel(13, 'towers-of-midnight', 'Towers of Midnight', 'Towers of Midnight', '2010-11-02', 863, ne(1000, Y1000), 'jordan-sanderson'),
  novel(14, 'a-memory-of-light', 'A Memory of Light', 'A Memory of Light', '2013-01-08', 909,
    Y(1000, '1000 NE', 'inferred', 'Wheel of Time Wiki: the Last Battle "was fought in 1000 NE".', ['wotfandom:Last Battle', TL]), 'jordan-sanderson'),
  single({ id: 'the-world-of-robert-jordans-the-wheel-of-time', title: "The World of Robert Jordan's The Wheel of Time", type: 'reference', wiki: "The World of Robert Jordan's The Wheel of Time", continuity: 'wot-books', studio: 'tor-books', platform: 'print-hardcover', tier: 'adjacent',
    unitLabel: 'Book', pages: 304, grp: { author: 'jordan' }, notes: 'Illustrated companion (Jordan & Teresa Patterson); not narrative.',
    rel: { date: '1997-11-06', src: "The World of Robert Jordan's The Wheel of Time", note: 'First publication (large-format hardback).' }, iu: R('Companion (no placement)', 'Non-narrative guide to the world.', ["The World of Robert Jordan's The Wheel of Time"], 'stated') }),
  single({ id: 'the-wheel-of-time-companion', title: 'The Wheel of Time Companion', type: 'reference', wiki: 'The Wheel of Time Companion', continuity: 'wot-books', studio: 'tor-books', platform: 'print-hardcover', tier: 'adjacent',
    unitLabel: 'Book', pages: 816, grp: { author: 'jordan' }, notes: 'Encyclopedic companion (McDougal, Romanczuk, Simons); not narrative.',
    rel: { date: '2015-11-03', src: 'The Wheel of Time Companion', note: 'First publication (Tor Books, hardback).' }, iu: R('Companion (no placement)', 'Non-narrative encyclopedia.', ['The Wheel of Time Companion'], 'stated') }),
];

const TV = 'The Wheel of Time (TV series)';
export const SCREEN: SeedTitle[] = [
  { id: 'the-wheel-of-time-series', title: 'The Wheel of Time (TV series)', type: 'series', wiki: TV, continuity: 'wot-amazon', studio: 'amazon-mgm-studios', platform: 'prime-video', chars: MAIN, teams: ['aes-sedai'],
    notes: '"On May 23, 2025, Amazon Prime Video canceled the series after three seasons". Reviews describe it as departing from the books, so it is a separate continuity.',
    links: [{ to: 'the-eye-of-the-world', kind: 'adapts', note: 'Season 1' }, { to: 'the-great-hunt', kind: 'adapts', note: 'Seasons 1–2' }, { to: 'the-dragon-reborn', kind: 'adapts', note: 'Seasons 1–2' }, { to: 'the-shadow-rising', kind: 'adapts', note: 'Season 3' }, { to: 'the-fires-of-heaven', kind: 'adapts', note: 'Season 3' }],
    units: [
      { key: 's1', label: 'Season 1', season: 1, episodes: 8, rel: { date: '2021-11-19', end: '2021-12-24', src: TV }, iu: R('Season 1', '"The first season is based on The Eye of the World (1990), with elements from The Great Hunt (1990) and The Dragon Reborn (1991)." No in-universe year given.', [TV]) },
      { key: 's2', label: 'Season 2', season: 2, episodes: 8, rel: { date: '2023-09-01', end: '2023-10-06', src: TV }, iu: R('Season 2', '"The second season is based on elements from both The Great Hunt and The Dragon Reborn."', [TV]) },
      { key: 's3', label: 'Season 3', season: 3, episodes: 8, rel: { date: '2025-03-13', end: '2025-04-17', src: TV }, iu: R('Season 3', '"The third season covers events from the fourth and fifth books, The Shadow Rising (1992) and The Fires of Heaven (1993)."', [TV]) },
    ] },
  single({ id: 'winter-dragon', title: 'Winter Dragon', type: 'special', wiki: 'The Wheel of Time', continuity: 'wot-other', studio: 'red-eagle-entertainment', platform: 'fxx', tier: 'adjacent',
    unitLabel: 'Pilot', notes: 'A 22-minute pilot "based on the prologue to The Eye of the World" that aired once, to retain the adaptation rights; not canon.',
    rel: { date: '2015-02', src: 'The Wheel of Time', note: 'Aired once on FXX in February 2015 (no day given).' }, iu: R('Pilot', 'Adapts the prologue of The Eye of the World; non-canon.', ['The Wheel of Time']) }),
];

export const SEED: SeedTitle[] = [...BOOKS, ...SCREEN];
