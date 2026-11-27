// Star Wars (Stage 6). Canon vs Legends per Lucasfilm's April 2014 rebranding; Visions and LEGO are
// non-canon collections. Calendar BBY/ABY: canon has no "0 BBY"; the Battle of Yavin starts 0 ABY (D-24).
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

const W = 'https://en.wikipedia.org/wiki/';
const YAVIN = { kind: 'era' as const, label_position: 'after' as const, pad: 0, before_label: 'BBY', after_label: 'ABY', has_year_zero: true, note: "Years before / after the Battle of Yavin (A New Hope). The battle year is shown as 0 ABY; there is no \"0 BBY\" in canon." };
const main = { id: 'main', label: 'Main', marker: 'dot' as const, description: '', placeable: true, parent: null, diverges_at: null, merges_into: null, is_main: true };

export const UNIVERSE: Universe = {
  id: 'star-wars', name: 'Star Wars', short_name: 'Star Wars', order: 6, enabled: true,
  accent: { primary: '#FFE81F', secondary: '#4DB8FF' },
  default_continuity: 'sw-canon', data_dir: 'star-wars', last_verified: null,
  description: 'Star Wars films and series: Lucasfilm canon, Legends, and the non-canon Visions and LEGO productions.',
  grouping_schemes: [
    { id: 'era', label: 'Era', parent_scheme: null, values: [
      { id: 'high-republic', label: 'The High Republic', order: 1, parent: null },
      { id: 'fall-of-the-jedi', label: 'Fall of the Jedi', order: 2, parent: null },
      { id: 'reign-of-the-empire', label: 'Reign of the Empire', order: 3, parent: null },
      { id: 'age-of-rebellion', label: 'Age of Rebellion', order: 4, parent: null },
      { id: 'new-republic', label: 'The New Republic', order: 5, parent: null },
      { id: 'rise-of-the-first-order', label: 'Rise of the First Order', order: 6, parent: null },
      { id: 'new-jedi-order', label: 'New Jedi Order', order: 7, parent: null },
    ] },
  ],
};

export const CONTINUITIES: Continuity[] = [
  { id: 'sw-canon', universe: 'star-wars', name: 'Star Wars canon (Lucasfilm)', short_name: 'Canon', order: 1, kind: 'shared', calendar: YAVIN, branches: [main], grouping_schemes: ['era'], alt_orders: [],
    description: '"the only preexisting works to be considered canonical within the franchise would be the primary episodic films and the 2008 The Clone Wars film and TV series", plus all later works.',
    source_urls: [W + 'Star_Wars_in_other_media', W + 'Star_Wars'], notes: 'Years from Lucasfilm\'s Star Wars: Timelines (2023) / Galactic Atlas as cited on Wookieepedia, unless Wikipedia states them. Eras from starwars.com/eras via Wikipedia.' },
  { id: 'sw-legends', universe: 'star-wars', name: 'Star Wars Legends (screen)', short_name: 'Legends', order: 2, kind: 'shared', calendar: YAVIN, branches: [main], grouping_schemes: [], alt_orders: [],
    description: '"On April 25, 2014, Lucasfilm… renamed the Expanded Universe Star Wars Legends and declared it non-canonical to the franchise."',
    source_urls: [W + 'Star_Wars_in_other_media'], notes: 'Years use Wookieepedia\'s Legends dating (inferred).' },
  { id: 'sw-visions', universe: 'star-wars', name: 'Star Wars: Visions (non-canon anthology)', short_name: 'Visions', order: 3, kind: 'standalone-collection', calendar: { kind: 'ordered-only' }, branches: [main], grouping_schemes: [], alt_orders: [],
    description: '"Star Wars: Visions\'s stories were not required to adhere to the established Star Wars timeline."', source_urls: [W + 'Star_Wars:_Visions'], notes: '' },
  { id: 'sw-lego', universe: 'star-wars', name: 'LEGO Star Wars (non-canon)', short_name: 'LEGO', order: 4, kind: 'standalone-collection', calendar: { kind: 'ordered-only' }, branches: [main], grouping_schemes: [], alt_orders: [],
    description: 'LEGO productions. Wikipedia is silent on canon status; Wookieepedia tags them non-canon.', source_urls: [W + 'Lego_Star_Wars'], notes: '' },
];

export const STUDIOS: Studio[] = [
  { id: 'lucasfilm', label: 'Lucasfilm', short_label: 'Lucasfilm', kind: 'studio', parent: null, group: null, active: null, note: '' },
  { id: 'lucasfilm-animation', label: 'Lucasfilm Animation', short_label: 'Lucasfilm Animation', kind: 'label', parent: 'lucasfilm', group: null, active: null, note: '' },
  { id: 'nelvana', label: 'Nelvana (with Lucasfilm)', short_label: 'Nelvana', kind: 'studio', parent: null, group: null, active: null, note: '' },
  { id: 'cartoon-network-studios', label: 'Cartoon Network Studios (with Lucasfilm)', short_label: 'CN Studios', kind: 'studio', parent: null, group: null, active: null, note: '' },
  { id: 'smith-hemion', label: 'Smith-Hemion Productions', short_label: 'Smith-Hemion', kind: 'studio', parent: null, group: null, active: null, note: '' },
];
export const PLATFORMS: Platform[] = [
  { id: 'youtube', label: 'YouTube', kind: 'streaming', note: '' },
  { id: 'disney-plus', label: 'Disney+', kind: 'streaming', note: '' },
  { id: 'disney-xd', label: 'Disney XD', kind: 'cable', note: '' },
  { id: 'disney-channel', label: 'Disney Channel', kind: 'cable', note: '' },
  { id: 'disney-jr', label: 'Disney Jr.', kind: 'cable', note: '' },
  { id: 'cartoon-network', label: 'Cartoon Network', kind: 'cable', note: '' },
  { id: 'cbs', label: 'CBS', kind: 'broadcast', note: '' },
  { id: 'platform-not-stated', label: 'Platform not stated', kind: 'other', note: 'The source gives no first-release platform.' },
];

const ch = (id: string, label: string, aliases: string[] = []): Tag => ({ id, label, kind: 'character', aliases });
export const TAGS: Tag[] = [
  ch('luke-skywalker', 'Luke Skywalker'), ch('anakin-skywalker', 'Anakin Skywalker', ['Darth Vader']), ch('obi-wan-kenobi', 'Obi-Wan Kenobi'), ch('leia-organa', 'Leia Organa'),
  ch('han-solo', 'Han Solo'), ch('yoda', 'Yoda'), ch('palpatine', 'Palpatine', ['Darth Sidious', 'the Emperor']), ch('rey', 'Rey'), ch('kylo-ren', 'Kylo Ren', ['Ben Solo']),
  ch('ahsoka-tano', 'Ahsoka Tano'), ch('din-djarin', 'Din Djarin', ['The Mandalorian']), ch('grogu', 'Grogu'), ch('cassian-andor', 'Cassian Andor'), ch('boba-fett', 'Boba Fett'),
  ch('maul', 'Maul', ['Darth Maul']), ch('hera-syndulla', 'Hera Syndulla'), ch('ezra-bridger', 'Ezra Bridger'), ch('r2-d2', 'R2-D2'), ch('c-3po', 'C-3PO'), ch('ewoks', 'Ewoks'),
  { id: 'clone-troopers', label: 'Clone troopers', kind: 'team', aliases: ['Clone Force 99', 'The Bad Batch'] }, { id: 'jedi', label: 'Jedi Order', kind: 'team', aliases: [] },
];
export const FANDOM_PREFIXES = { wook: 'https://starwars.fandom.com/wiki/' };
// Canon is ordered by in-universe start year (then release); undated items fall to the end.
export const SORT_BY_YEAR = ['sw-canon', 'sw-legends'];
