// Rick Riordan (books universe B3). The Camp Half-Blood Chronicles, The Kane Chronicles and Magnus Chase share one
// world (Wikipedia, three articles), so the books are one continuity, with each series as a grouping. The Fox films
// and the Disney+ series are separate continuities linked to the books with "adapts".
// Calendar: story order only. Riordan "has stated that there is no specific year or timeline" (Riordan Wiki,
// Important Dates); the wiki's de facto 2006–2011 years are shown in labels and rated inferred.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

const W = 'https://en.wikipedia.org/wiki/';
const main = { id: 'main', label: 'Main', marker: 'dot' as const, description: '', placeable: true, parent: null, diverges_at: null, merges_into: null, is_main: true };
const ORDERED = { kind: 'ordered-only' as const };

export const UNIVERSE: Universe = {
  id: 'riordan', name: 'Rick Riordan (Riordanverse)', short_name: 'Riordan', order: 8, enabled: true,
  accent: { primary: '#4FC3F7', secondary: '#F4A340' },
  default_continuity: 'riordanverse-books', data_dir: 'riordan', last_verified: null,
  description: "Rick Riordan's novels (Percy Jackson, Heroes of Olympus, Trials of Apollo, Kane Chronicles, Magnus Chase and more), the Fox films and the Disney+ series.",
  grouping_schemes: [
    { id: 'series', label: 'Series', parent_scheme: null, values: [
      { id: 'percy-jackson-olympians', label: 'Percy Jackson & the Olympians', order: 1, parent: null },
      { id: 'heroes-of-olympus', label: 'The Heroes of Olympus', order: 2, parent: null },
      { id: 'senior-year-adventures', label: 'Percy Jackson: The Senior Year Adventures', order: 3, parent: null },
      { id: 'trials-of-apollo', label: 'The Trials of Apollo', order: 4, parent: null },
      { id: 'nico-di-angelo-adventures', label: 'The Nico di Angelo Adventures', order: 5, parent: null },
      { id: 'camp-half-blood', label: 'Camp Half-Blood', order: 6, parent: null },
      { id: 'kane-chronicles', label: 'The Kane Chronicles', order: 7, parent: null },
      { id: 'magnus-chase', label: 'Magnus Chase and the Gods of Asgard', order: 8, parent: null },
      { id: 'crossover', label: 'Crossovers', order: 9, parent: null },
    ] },
  ],
};

export const CONTINUITIES: Continuity[] = [
  { id: 'riordanverse-books', universe: 'riordan', name: 'Riordanverse (books)', short_name: 'Books', order: 1, kind: 'shared', calendar: ORDERED, branches: [main], grouping_schemes: ['series'], alt_orders: [],
    description: 'Wikipedia (Camp Half-Blood Chronicles): "The franchise takes place in the same fictional universe as two of Riordan\'s other series, The Kane Chronicles … and Magnus Chase and the Gods of Asgard". Story order follows the Riordan Wiki Timeline.',
    source_urls: [W + 'Camp_Half-Blood_Chronicles', W + 'The_Kane_Chronicles', W + 'Magnus_Chase_and_the_Gods_of_Asgard', 'https://riordan.fandom.com/wiki/Timeline'],
    notes: 'Riordan Wiki: "Rick Riordan has stated that there is no specific year or timeline that the series takes place as book time is not tied to real time." Its 2006–2011 "de facto timeline" years are shown in labels and rated inferred.' },
  { id: 'percy-jackson-films', universe: 'riordan', name: 'Percy Jackson films (20th Century Fox)', short_name: 'Films', order: 2, kind: 'shared', calendar: ORDERED, branches: [main], grouping_schemes: [], alt_orders: [],
    description: '"The series was distributed by 20th Century Fox and produced by 1492 Pictures." Two films; a third was not made.', source_urls: [W + 'Percy_Jackson_(film_series)'], notes: '' },
  { id: 'percy-jackson-disney-plus', universe: 'riordan', name: 'Percy Jackson and the Olympians (Disney+)', short_name: 'Disney+', order: 3, kind: 'shared', calendar: ORDERED, branches: [main], grouping_schemes: [], alt_orders: [],
    description: 'Disney+ series (2023–), one book per season.', source_urls: [W + 'Percy_Jackson_and_the_Olympians_(TV_series)'], notes: '' },
];

export const STUDIOS: Studio[] = [
  { id: 'miramax-books', label: 'Miramax Books', short_label: 'Miramax Books', kind: 'publisher', parent: null, group: null, active: null, note: '' },
  { id: 'hyperion-books-for-children', label: 'Hyperion Books for Children', short_label: 'Hyperion', kind: 'publisher', parent: null, group: null, active: null, note: '' },
  { id: 'disney-hyperion', label: 'Disney Hyperion', short_label: 'Disney Hyperion', kind: 'publisher', parent: null, group: null, active: null, note: 'Hyperion Books for Children, renamed.' },
  { id: 'random-house', label: 'Random House', short_label: 'Random House', kind: 'publisher', parent: null, group: null, active: null, note: '' },
  { id: '20th-television', label: '20th Television', short_label: '20th TV', kind: 'studio', parent: null, group: null, active: null, note: '' },
];
export const PLATFORMS: Platform[] = [];

const ch = (id: string, label: string): Tag => ({ id, label, kind: 'character', aliases: [] });
export const TAGS: Tag[] = [
  ch('percy-jackson', 'Percy Jackson'), ch('annabeth-chase', 'Annabeth Chase'), ch('grover-underwood', 'Grover Underwood'), ch('jason-grace', 'Jason Grace'),
  ch('piper-mclean', 'Piper McLean'), ch('leo-valdez', 'Leo Valdez'), ch('apollo', 'Apollo (Lester Papadopoulos)'), ch('nico-di-angelo', 'Nico di Angelo'),
  ch('carter-kane', 'Carter Kane'), ch('sadie-kane', 'Sadie Kane'), ch('magnus-chase', 'Magnus Chase'),
];
export const FANDOM_PREFIXES = { riordan: 'https://riordan.fandom.com/wiki/' };
