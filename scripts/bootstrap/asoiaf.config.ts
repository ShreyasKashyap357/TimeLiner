// A Song of Ice and Fire / Game of Thrones (books pilot). Books and HBO screen works are separate
// continuities (D-20) on the in-world "AC/BC" calendar (D-21: no year 0; 1 AC = Aegon's coronation).
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

const W = 'https://en.wikipedia.org/wiki/';
const AC = { kind: 'era' as const, before_label: 'BC', after_label: 'AC', has_year_zero: false, note: "Years counted from Aegon's Conquest: 1 AC is the year of Aegon I's coronation, and the year before it is 1 BC (there is no year 0). Inferred from A Wiki of Ice and Fire; no source states the no-year-0 rule in words (D-21)." };

export const UNIVERSE: Universe = {
  id: 'asoiaf', name: 'A Song of Ice and Fire', short_name: 'Ice & Fire', order: 4, enabled: true,
  accent: { primary: '#FF7A66', secondary: '#C9A227' },
  default_continuity: 'asoiaf-books', data_dir: 'asoiaf', last_verified: null,
  description: "George R. R. Martin's novels and novellas, and HBO's Game of Thrones, House of the Dragon and A Knight of the Seven Kingdoms.",
  grouping_schemes: [
    { id: 'book-series', label: 'Series', parent_scheme: null, values: [
      { id: 'main-series', label: 'A Song of Ice and Fire (main series)', order: 1, parent: null },
      { id: 'dunk-and-egg', label: 'Tales of Dunk and Egg', order: 2, parent: null },
      { id: 'targaryen-histories', label: 'Targaryen histories', order: 3, parent: null },
      { id: 'game-of-thrones', label: 'Game of Thrones', order: 4, parent: null },
      { id: 'house-of-the-dragon', label: 'House of the Dragon', order: 5, parent: null },
      { id: 'akotsk', label: 'A Knight of the Seven Kingdoms', order: 6, parent: null },
    ] },
  ],
};

const main = { id: 'main', label: 'Main', marker: 'dot' as const, description: '', placeable: true, parent: null, diverges_at: null, merges_into: null, is_main: true };
export const CONTINUITIES: Continuity[] = [
  { id: 'asoiaf-books', universe: 'asoiaf', name: 'A Song of Ice and Fire (books)', short_name: 'Books', order: 1, kind: 'shared', calendar: AC,
    branches: [main], grouping_schemes: ['book-series'], alt_orders: [],
    description: 'Novels, novellas and in-world histories by George R. R. Martin. Wikipedia: "only the novels count as canon".',
    source_urls: [W + 'A_Song_of_Ice_and_Fire'], notes: 'Years are in the in-world calendar: AC = After the Conquest, BC = Before the Conquest.' },
  { id: 'got-hbo', universe: 'asoiaf', name: 'Game of Thrones (HBO)', short_name: 'HBO', order: 2, kind: 'shared', calendar: AC,
    branches: [main], grouping_schemes: ['book-series'], alt_orders: [],
    description: 'HBO\'s Game of Thrones, House of the Dragon and A Knight of the Seven Kingdoms. Kept separate from the books: the show "deviat[es] from the novels" and later seasons used original content.',
    source_urls: [W + 'Game_of_Thrones', W + 'House_of_the_Dragon', W + 'A_Knight_of_the_Seven_Kingdoms_(TV_series)'], notes: '' },
];

export const STUDIOS: Studio[] = [
  { id: 'bantam-spectra', label: 'Bantam Spectra (US)', short_label: 'Bantam Spectra', kind: 'publisher', parent: null, group: null, active: null, note: '' },
  { id: 'bantam-books', label: 'Bantam Books', short_label: 'Bantam', kind: 'publisher', parent: null, group: null, active: null, note: '' },
  { id: 'harpercollins-voyager', label: 'HarperCollins Voyager (UK)', short_label: 'Voyager', kind: 'publisher', parent: null, group: null, active: null, note: '' },
  { id: 'tor-books', label: 'Tor Books', short_label: 'Tor', kind: 'publisher', parent: null, group: null, active: null, note: '' },
  { id: 'ten-speed-press', label: 'Ten Speed Press', short_label: 'Ten Speed', kind: 'publisher', parent: null, group: null, active: null, note: '' },
  { id: 'publisher-not-stated', label: 'Publisher not stated in sources', short_label: 'Not stated', kind: 'publisher', parent: null, group: null, active: null, note: '' },
  { id: 'hbo-entertainment', label: 'HBO Entertainment', short_label: 'HBO', kind: 'studio', parent: null, group: null, active: null, note: '' },
];
export const PLATFORMS: Platform[] = [
  { id: 'print-hardcover', label: 'Print: hardcover first edition', kind: 'print', note: '' },
  { id: 'print-anthology', label: 'Print: in a multi-author anthology', kind: 'print', note: 'Novellas first published inside anthologies.' },
  { id: 'hbo', label: 'HBO', kind: 'cable', note: '' },
];

const ch = (id: string, label: string, aliases: string[] = []): Tag => ({ id, label, kind: 'character', aliases });
const house = (id: string, label: string): Tag => ({ id, label, kind: 'team', aliases: [] });
export const TAGS: Tag[] = [
  ch('jon-snow', 'Jon Snow'), ch('daenerys-targaryen', 'Daenerys Targaryen', ['Daenerys', 'Dany']), ch('tyrion-lannister', 'Tyrion Lannister'),
  ch('arya-stark', 'Arya Stark'), ch('sansa-stark', 'Sansa Stark'), ch('eddard-stark', 'Eddard Stark', ['Ned Stark']), ch('cersei-lannister', 'Cersei Lannister'),
  ch('jaime-lannister', 'Jaime Lannister'), ch('bran-stark', 'Bran Stark'), ch('rhaenyra-targaryen', 'Rhaenyra Targaryen'), ch('daemon-targaryen', 'Daemon Targaryen'),
  ch('alicent-hightower', 'Alicent Hightower'), ch('aegon-ii', 'Aegon II Targaryen'), ch('viserys-i', 'Viserys I Targaryen'),
  ch('dunk', 'Ser Duncan the Tall', ['Dunk']), ch('egg', 'Aegon V Targaryen', ['Egg']), ch('aegon-the-conqueror', 'Aegon I Targaryen', ['Aegon the Conqueror']), ch('maegor', 'Maegor the Cruel'),
  house('house-stark', 'House Stark'), house('house-lannister', 'House Lannister'), house('house-targaryen', 'House Targaryen'),
];
export const FANDOM_PREFIXES = { awoiaf: 'https://awoiaf.westeros.org/index.php/' };
// HBO seasons sort by start year (story order); books follow seed order.
export const SORT_BY_YEAR = ['got-hbo'];
