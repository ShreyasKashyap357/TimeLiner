// The Wheel of Time (books universe B2). Books and the Amazon series are separate continuities.
// Calendar: the in-world "NE" (New Era / Farede calendar) years; no year 0 (inferred, D-22).
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

const W = 'https://en.wikipedia.org/wiki/';
const NE = { kind: 'era' as const, label_position: 'after' as const, pad: 0, before_label: 'before NE', after_label: 'NE', has_year_zero: false, note: "New Era (Farede calendar) years. There is no year 0, and the series spans 998–1000 NE. Inferred from the Wheel of Time Wiki; Wikipedia gives no in-universe years." };
const main = { id: 'main', label: 'Main', marker: 'dot' as const, description: '', placeable: true, parent: null, diverges_at: null, merges_into: null, is_main: true };

export const UNIVERSE: Universe = {
  id: 'wheel-of-time', name: 'The Wheel of Time', short_name: 'Wheel of Time', order: 5, enabled: true,
  accent: { primary: '#B9A2FF', secondary: '#8C6BD8' },
  default_continuity: 'wot-books', data_dir: 'wheel-of-time', last_verified: null,
  description: "Robert Jordan's novels (completed by Brandon Sanderson) and the Amazon Prime Video series.",
  grouping_schemes: [
    { id: 'author', label: 'Author', parent_scheme: null, values: [
      { id: 'jordan', label: 'Robert Jordan', order: 1, parent: null },
      { id: 'jordan-sanderson', label: 'Robert Jordan & Brandon Sanderson', order: 2, parent: null },
    ] },
  ],
};

export const CONTINUITIES: Continuity[] = [
  { id: 'wot-books', universe: 'wheel-of-time', name: 'The Wheel of Time (books)', short_name: 'Books', order: 1, kind: 'shared', calendar: NE, branches: [main], grouping_schemes: ['author'], alt_orders: [],
    description: '14 novels plus the prequel New Spring, and two companion books.', source_urls: [W + 'The_Wheel_of_Time'],
    notes: 'Wikipedia gives no in-universe years; all NE years come from the Wheel of Time Wiki (Fandom) and are rated inferred.' },
  { id: 'wot-amazon', universe: 'wheel-of-time', name: 'The Wheel of Time (Prime Video)', short_name: 'Prime Video', order: 2, kind: 'shared', calendar: NE, branches: [main], grouping_schemes: [], alt_orders: [],
    description: 'Amazon series (2021–2025), cancelled after three seasons. An adaptation that departs from the books.', source_urls: [W + 'The_Wheel_of_Time_(TV_series)'], notes: '' },
  { id: 'wot-other', universe: 'wheel-of-time', name: 'Other adaptations', short_name: 'Other', order: 3, kind: 'standalone-collection', calendar: { kind: 'ordered-only' }, branches: [main], grouping_schemes: [], alt_orders: [],
    description: 'Winter Dragon (2015), a rights-retention pilot.', source_urls: [W + 'The_Wheel_of_Time'], notes: '' },
];

export const STUDIOS: Studio[] = [
  { id: 'tor-books', label: 'Tor Books', short_label: 'Tor', kind: 'publisher', parent: null, group: null, active: null, note: '' },
  { id: 'amazon-mgm-studios', label: 'Amazon MGM Studios / Sony Pictures Television', short_label: 'Amazon/Sony', kind: 'studio', parent: null, group: null, active: null, note: '' },
  { id: 'red-eagle-entertainment', label: 'Red Eagle Entertainment', short_label: 'Red Eagle', kind: 'studio', parent: null, group: null, active: null, note: '' },
];
export const PLATFORMS: Platform[] = [
  { id: 'print-hardcover', label: 'Print: hardcover first edition', kind: 'print', note: '' },
  { id: 'prime-video', label: 'Prime Video', kind: 'streaming', note: '' },
  { id: 'fxx', label: 'FXX (paid airtime)', kind: 'cable', note: '' },
];

const ch = (id: string, label: string, aliases: string[] = []): Tag => ({ id, label, kind: 'character', aliases });
export const TAGS: Tag[] = [
  ch('rand-althor', "Rand al'Thor", ['the Dragon Reborn']), ch('moiraine', 'Moiraine Damodred'), ch('egwene', "Egwene al'Vere"),
  ch('perrin', 'Perrin Aybara'), ch('mat-cauthon', 'Mat Cauthon'), ch('nynaeve', "Nynaeve al'Meara"), ch('lan', "al'Lan Mandragoran", ['Lan']),
  ch('siuan', 'Siuan Sanche'), { id: 'aes-sedai', label: 'Aes Sedai', kind: 'team', aliases: [] },
];
export const FANDOM_PREFIXES = { wotfandom: 'https://wot.fandom.com/wiki/' };
