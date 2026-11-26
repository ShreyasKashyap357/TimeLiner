// Godzilla & Kong universe configuration (Stage 5). Continuities follow the sentences that establish them
// on Wikipedia (see data/DATA_NOTES.md). Toho eras are a grouping scheme, not continuities.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

const W = 'https://en.wikipedia.org/wiki/';

export const UNIVERSE: Universe = {
  id: 'godzilla-kong', name: 'Godzilla & Kong', short_name: 'Godzilla & Kong', order: 3, enabled: true,
  accent: { primary: '#7CDB8A', secondary: '#3FA9F5' },
  default_continuity: 'monsterverse', data_dir: 'godzilla-kong', last_verified: null,
  description: "Toho's Godzilla eras, Legendary's Monsterverse, TriStar's Godzilla and the King Kong films and series.",
  grouping_schemes: [
    { id: 'era', label: 'Toho era', parent_scheme: null, values: [
      { id: 'showa', label: 'Shōwa era (1954–1975)', order: 1, parent: null },
      { id: 'heisei', label: 'Heisei era (1984–1995)', order: 2, parent: null },
      { id: 'millennium', label: 'Millennium era (1999–2004)', order: 3, parent: null },
      { id: 'reiwa', label: 'Reiwa era (2016–)', order: 4, parent: null },
    ] },
  ],
};

type B = Continuity['branches'][number];
const main = (label = 'Main'): B => ({ id: 'main', label, marker: 'dot', description: '', placeable: true, parent: null, diverges_at: null, merges_into: null, is_main: true });
const C = (id: string, name: string, short: string, order: number, description: string, sources: string[], extra: Partial<Continuity> = {}): Continuity => ({
  id, universe: 'godzilla-kong', name, short_name: short, order, kind: 'shared', calendar: { kind: 'gregorian' },
  branches: [main()], grouping_schemes: [], alt_orders: [], description, source_urls: sources.map((s) => W + s), notes: '', ...extra,
});
const FR = 'Godzilla_(franchise)';
export const CONTINUITIES: Continuity[] = [
  C('monsterverse', 'Monsterverse (Legendary)', 'Monsterverse', 1, 'Legendary\'s shared universe: "five films and two television series" (plus announced titles).', ['Monsterverse']),
  C('toho-showa', 'Toho Shōwa series', 'Shōwa', 2, '"This Shōwa timeline spanned from 1954, with Godzilla, to 1975, with Terror of Mechagodzilla." Zone Fighter is placed inside it by Toho.', [FR, 'Zone_Fighter'], { grouping_schemes: ['era'] }),
  C('toho-heisei', 'Toho Heisei series', 'Heisei', 3, '"The Return of Godzilla serves as a direct sequel to the original 1954 film and ignores the subsequent events of the Shōwa series." "The Heisei films are set in a single, continuous timeline".', [FR], { grouping_schemes: ['era'] }),
  C('kiryu-duology', 'Kiryu duology (Millennium)', 'Kiryu', 4, '"…the only films in the Millennium era to share continuity with each other".', [FR], { grouping_schemes: ['era'] }),
  C('tristar-gmk', 'TriStar Godzilla & GMK', 'TriStar/GMK', 5, 'Godzilla (1998) and its sequel series; GMK "shares a standalone continuity with the 1998 American film".', ['Godzilla_(1998_film)', 'Godzilla,_Mothra_and_King_Ghidorah:_Giant_Monsters_All-Out_Attack'], { grouping_schemes: ['era'] }),
  C('godzilla-anime-trilogy', 'Godzilla anime trilogy (Polygon)', 'Anime trilogy', 6, '"Godzilla: The Planet Eater concludes the narrative of the anime trilogy".', ['Godzilla:_The_Planet_Eater'], { calendar: { kind: 'ordered-only' }, grouping_schemes: ['era'] }),
  C('godzilla-minus', 'Godzilla Minus One / Minus Zero', 'Minus', 7, 'Godzilla Minus Zero is "A sequel to Godzilla Minus One (2023)".', ['Godzilla_Minus_Zero'], { grouping_schemes: ['era'] }),
  C('godzilla-standalone', 'Standalone Godzilla titles', 'Standalone', 8, 'Each title is its own continuity (Millennium anthology films, Shin Godzilla, Singular Point, TV series).', [FR], { kind: 'standalone-collection', grouping_schemes: ['era'] }),
  C('kong-1933', 'King Kong (1933) line', 'Kong 1933', 9, 'King Kong (1933), The Son of Kong ("the sequel to King Kong") and Kong: The Animated Series ("a direct sequel to the 1933 film").', ['King_Kong_(franchise)']),
  C('kong-1976', 'King Kong (1976) line', 'Kong 1976', 10, 'King Kong (1976) and King Kong Lives ("a sequel to King Kong (1976) set ten years later").', ['King_Kong_Lives']),
  C('kong-standalone', 'Standalone King Kong titles', 'Kong standalone', 11, 'Each title is its own continuity.', ['King_Kong_(franchise)'], { kind: 'standalone-collection' }),
];

export const STUDIOS: Studio[] = [
  { id: 'toho', label: 'Toho', short_label: 'Toho', kind: 'studio', parent: null, group: null, active: null, note: '' },
  { id: 'legendary', label: 'Legendary Pictures / Legendary Television', short_label: 'Legendary', kind: 'studio', parent: null, group: null, active: null, note: 'Monsterverse films are distributed by Warner Bros.' },
  { id: 'tristar', label: 'TriStar Pictures (Centropolis)', short_label: 'TriStar', kind: 'studio', parent: null, group: null, active: null, note: '' },
  { id: 'polygon-pictures', label: 'Polygon Pictures / Toho Animation', short_label: 'Polygon', kind: 'studio', parent: null, group: null, active: null, note: '' },
  { id: 'bones', label: 'Bones / Orange', short_label: 'Bones', kind: 'studio', parent: null, group: null, active: null, note: '' },
  { id: 'hanna-barbera', label: 'Hanna-Barbera', short_label: 'Hanna-Barbera', kind: 'studio', parent: null, group: null, active: null, note: '' },
  { id: 'rko', label: 'RKO Radio Pictures', short_label: 'RKO', kind: 'studio', parent: null, group: null, active: null, note: '' },
  { id: 'de-laurentiis', label: 'Dino De Laurentiis', short_label: 'De Laurentiis', kind: 'studio', parent: null, group: null, active: null, note: 'Distributed by Paramount (1976).' },
  { id: 'universal-pictures', label: 'Universal Pictures', short_label: 'Universal', kind: 'studio', parent: null, group: null, active: null, note: '' },
  { id: 'rankin-bass', label: 'Rankin/Bass (Videocraft)', short_label: 'Rankin/Bass', kind: 'studio', parent: null, group: null, active: null, note: '' },
  { id: 'bkn', label: 'BKN', short_label: 'BKN', kind: 'studio', parent: null, group: null, active: null, note: '' },
  { id: 'arad-animation', label: '41 Entertainment / Arad Animation', short_label: '41 Ent.', kind: 'studio', parent: null, group: null, active: null, note: '' },
  { id: 'lana-productions', label: 'Lana Productions', short_label: 'Lana', kind: 'studio', parent: null, group: null, active: null, note: '' },
  { id: 'pie-in-the-sky', label: 'Pie in the Sky', short_label: 'Pie in the Sky', kind: 'studio', parent: null, group: null, active: null, note: '' },
];

export const PLATFORMS: Platform[] = [
  { id: 'apple-tv-plus', label: 'Apple TV+', kind: 'streaming', note: '' },
  { id: 'nippon-tv', label: 'Nippon Television', kind: 'broadcast', note: '' },
  { id: 'tv-tokyo', label: 'TV Tokyo', kind: 'broadcast', note: '' },
  { id: 'tokyo-mx', label: 'Tokyo MX', kind: 'broadcast', note: '' },
  { id: 'nbc', label: 'NBC', kind: 'broadcast', note: '' },
  { id: 'm6', label: 'M6 (France)', kind: 'broadcast', note: '' },
  { id: 'netflix', label: 'Netflix', kind: 'streaming', note: '' },
  { id: 'fox-kids', label: 'Fox (Fox Kids)', kind: 'broadcast', note: '' },
  { id: 'abc', label: 'ABC', kind: 'broadcast', note: '' },
];

const ch = (id: string, label: string, aliases: string[] = []): Tag => ({ id, label, kind: 'character', aliases });
export const TAGS: Tag[] = [
  ch('godzilla', 'Godzilla', ['Gojira']), ch('kong', 'King Kong', ['Kong']), ch('mothra', 'Mothra'), ch('king-ghidorah', 'King Ghidorah', ['Ghidorah']),
  ch('mechagodzilla', 'Mechagodzilla', ['Kiryu']), ch('rodan', 'Rodan'), ch('anguirus', 'Anguirus'), ch('spacegodzilla', 'SpaceGodzilla'),
  ch('destoroyah', 'Destoroyah'), ch('biollante', 'Biollante'), ch('gigan', 'Gigan'), ch('minilla', 'Minilla', ['Godzilla Junior']),
  { id: 'monarch', label: 'Monarch', kind: 'team', aliases: [] },
];
export const FANDOM_PREFIXES = {};
