// Star Trek (Stage 7). Two timelines, never merged: the Prime timeline (all series and the 1979–2002 films,
// plus Section 31) and the Kelvin timeline (2009, 2013, 2016 films), which branches off in 2233 when Nero
// attacks the USS Kelvin. Calendar: Gregorian years (CE). Non-canon shorts are a separate collection.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

const W = 'https://en.wikipedia.org/wiki/';
const main = { id: 'main', label: 'Main', marker: 'dot' as const, description: '', placeable: true, parent: null, diverges_at: null, merges_into: null, is_main: true };

export const UNIVERSE: Universe = {
  id: 'star-trek', name: 'Star Trek', short_name: 'Star Trek', order: 7, enabled: true,
  accent: { primary: '#F2C14E', secondary: '#4C8DDB' },
  default_continuity: 'st-prime', data_dir: 'star-trek', last_verified: null,
  description: 'Star Trek films and series: the Prime timeline, the Kelvin timeline films, and non-canon shorts.',
  grouping_schemes: [],
};

export const CONTINUITIES: Continuity[] = [
  { id: 'st-prime', universe: 'star-trek', name: 'Prime timeline', short_name: 'Prime', order: 1, kind: 'shared', calendar: { kind: 'gregorian' }, branches: [main], grouping_schemes: [], alt_orders: [],
    description: 'The original continuity: every series from The Original Series to Starfleet Academy, the ten films from 1979 to 2002, and Section 31. Wikipedia: Discovery "would be set in the \'Prime Timeline\' alongside the previous Star Trek series, rather than in the alternate \'Kelvin Timeline\'".',
    source_urls: [W + 'Timeline_of_Star_Trek', W + 'Star_Trek', W + 'Star_Trek:_Discovery_season_1'],
    notes: 'Most years come from the settings table in Wikipedia\'s "Timeline of Star Trek", which is tagged as needing citations. They are rated stated, with conflicts marked disputed. Memory Alpha years (from on-screen stardates) are rated inferred.' },
  { id: 'st-kelvin', universe: 'star-trek', name: 'Kelvin timeline (2009–2016 films)', short_name: 'Kelvin', order: 2, kind: 'shared', calendar: { kind: 'gregorian' }, branches: [main], grouping_schemes: [], alt_orders: [],
    description: 'Wikipedia: "a narrative continuation set in an alternate timeline called the \'Kelvin Timeline\'", named "by Michael and Denise Okuda for use in official Star Trek reference guides". It begins in 2233, when Nero\'s attack on the USS Kelvin "creates the Kelvin Timeline".',
    source_urls: [W + 'List_of_Star_Trek_films', W + 'Timeline_of_Star_Trek'], notes: '' },
  { id: 'st-other', universe: 'star-trek', name: 'Non-canon shorts', short_name: 'Non-canon', order: 3, kind: 'standalone-collection', calendar: { kind: 'ordered-only' }, branches: [main], grouping_schemes: [], alt_orders: [],
    description: 'Very Short Treks: "five non-canon shorts".', source_urls: [W + 'Star_Trek:_Very_Short_Treks'], notes: '' },
];

export const STUDIOS: Studio[] = [
  { id: 'paramount-pictures', label: 'Paramount Pictures', short_label: 'Paramount', kind: 'studio', parent: null, group: null, active: null, note: '' },
  { id: 'desilu-paramount-tv', label: 'Desilu Productions / Paramount Television', short_label: 'Desilu / Paramount TV', kind: 'studio', parent: null, group: null, active: null, note: 'The Original Series (with Norway Corporation).' },
  { id: 'filmation', label: 'Filmation (with Paramount Television)', short_label: 'Filmation', kind: 'studio', parent: null, group: null, active: null, note: '' },
  { id: 'paramount-television', label: 'Paramount Television (Domestic / Network)', short_label: 'Paramount TV', kind: 'studio', parent: null, group: null, active: null, note: 'Paramount Domestic Television (The Next Generation, Deep Space Nine) and Paramount Network Television (Voyager, Enterprise).' },
  { id: 'cbs-studios', label: 'CBS Studios (with Secret Hideout and Roddenberry Entertainment)', short_label: 'CBS Studios', kind: 'studio', parent: null, group: null, active: null, note: 'Series from Discovery (2017) on; animation via CBS Eye Animation, Titmouse and Nickelodeon Animation.' },
];
export const PLATFORMS: Platform[] = [
  { id: 'first-run-syndication', label: 'First-run syndication', kind: 'broadcast', note: '' },
  { id: 'upn', label: 'UPN', kind: 'broadcast', note: '' },
  { id: 'cbs-all-access', label: 'CBS All Access', kind: 'streaming', note: 'Renamed Paramount+ on 2021-03-04.' },
  { id: 'paramount-plus', label: 'Paramount+', kind: 'streaming', note: '' },
];

const ch = (id: string, label: string, aliases: string[] = []): Tag => ({ id, label, kind: 'character', aliases });
export const TAGS: Tag[] = [
  ch('kirk', 'James T. Kirk'), ch('spock', 'Spock'), ch('mccoy', 'Leonard McCoy'), ch('uhura', 'Nyota Uhura'), ch('pike', 'Christopher Pike'),
  ch('picard', 'Jean-Luc Picard'), ch('data', 'Data'), ch('worf', 'Worf'), ch('sisko', 'Benjamin Sisko'), ch('janeway', 'Kathryn Janeway'),
  ch('seven-of-nine', 'Seven of Nine'), ch('archer', 'Jonathan Archer'), ch('burnham', 'Michael Burnham'), ch('georgiou', 'Philippa Georgiou'),
  { id: 'starfleet', label: 'Starfleet', kind: 'team', aliases: [] },
];
export const FANDOM_PREFIXES = { ma: 'https://memory-alpha.fandom.com/wiki/' };
// Both timelines are ordered by in-universe start year (then release).
export const SORT_BY_YEAR = ['st-prime', 'st-kelvin'];
