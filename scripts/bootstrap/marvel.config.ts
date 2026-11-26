// Marvel universe configuration: everything franchise-specific lives here as data.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

const W = 'https://en.wikipedia.org/wiki/';

export const MARVEL_UNIVERSE: Universe = {
  id: 'marvel', name: 'Marvel', short_name: 'Marvel', order: 1, enabled: true,
  accent: { primary: '#E8B64C', secondary: '#D2392B' },
  default_continuity: 'mcu', data_dir: 'marvel', last_verified: null,
  description: 'Marvel Cinematic Universe plus related Marvel film and animation continuities.',
  grouping_schemes: [
    { id: 'saga', label: 'Saga', parent_scheme: null, values: [
      { id: 'infinity-saga', label: 'The Infinity Saga', order: 1, parent: null },
      { id: 'multiverse-saga', label: 'The Multiverse Saga', order: 2, parent: null },
    ] },
    { id: 'phase', label: 'Phase', parent_scheme: 'saga', values: [
      { id: 'phase-1', label: 'Phase One', order: 1, parent: 'infinity-saga' },
      { id: 'phase-2', label: 'Phase Two', order: 2, parent: 'infinity-saga' },
      { id: 'phase-3', label: 'Phase Three', order: 3, parent: 'infinity-saga' },
      { id: 'phase-4', label: 'Phase Four', order: 4, parent: 'multiverse-saga' },
      { id: 'phase-5', label: 'Phase Five', order: 5, parent: 'multiverse-saga' },
      { id: 'phase-6', label: 'Phase Six', order: 6, parent: 'multiverse-saga' },
      { id: 'phase-7', label: 'Phase Seven', order: 7, parent: null },
    ] },
  ],
};

const ordered = (id: string, name: string, short: string, order: number, description: string, sources: string[]): Continuity => ({
  id, universe: 'marvel', name, short_name: short, order, kind: 'shared', calendar: { kind: 'ordered-only' },
  branches: [{ id: 'main', label: 'Main', marker: 'dot', description: '', placeable: true, parent: null, diverges_at: null, is_main: true }],
  grouping_schemes: [], alt_orders: [], description, source_urls: sources.map((s) => W + s), notes: '',
});

export const MARVEL_CONTINUITIES: Continuity[] = [
  {
    id: 'mcu', universe: 'marvel', name: 'Marvel Cinematic Universe', short_name: 'MCU', order: 1, kind: 'shared',
    calendar: { kind: 'gregorian' },
    description: "Marvel Studios' shared universe. Branches share one calendar; the Sacred Timeline is the main branch.",
    grouping_schemes: ['saga', 'phase'], alt_orders: [],
    source_urls: [W + 'Marvel_Cinematic_Universe_timeline', W + 'Marvel_Cinematic_Universe'],
    notes: 'Other realities that Wikipedia places at a set timeframe are branches. Titles with no set timeframe are on non-placeable branches.',
    branches: [
      { id: 'sacred-timeline', label: 'Sacred Timeline', marker: 'dot', description: "Occurs on the MCU's Sacred Timeline (Earth-616).", placeable: true, parent: null, diverges_at: null, is_main: true },
      { id: 'earth-828', label: 'Earth-828', marker: 'diamond', description: 'The Fantastic Four: First Steps reality.', placeable: true, parent: null, diverges_at: null, is_main: false },
      { id: 'earth-10005', label: 'Earth-10005 / the Void', marker: 'diamond', description: "Deadpool & Wolverine. Earth-10005 is Marvel's designation for the Fox X-Men film universe.", placeable: true, parent: null, diverges_at: null, is_main: false },
      { id: 'earth-86445', label: 'Earth-86445', marker: 'diamond', description: 'Your Friendly Neighborhood Spider-Man reality.', placeable: true, parent: null, diverges_at: null, is_main: false },
      { id: 'zombies-reality', label: 'Zombies reality', marker: 'diamond', description: 'Reality of What If...? "What If... Zombies?!" (Marvel Zombies).', placeable: true, parent: null, diverges_at: null, is_main: false },
      { id: 'outside-time', label: 'Outside time (TVA)', marker: 'hollow-square', description: 'Outside the timeline with no set timeframe (Loki).', placeable: false, parent: null, diverges_at: null, is_main: false },
      { id: 'multiverse', label: 'Multiverse (no set timeframe)', marker: 'hollow-diamond', description: 'Alternate realities with no set timeframe (What If...?).', placeable: false, parent: null, diverges_at: null, is_main: false },
    ],
  },
  {
    id: 'fox-x-men', universe: 'marvel', name: 'X-Men film series (20th Century Fox)', short_name: 'Fox X-Men', order: 2, kind: 'shared',
    calendar: { kind: 'gregorian' }, grouping_schemes: [], alt_orders: [],
    description: "Fox's X-Men films (2000–2020). Days of Future Past creates a revised timeline from 1973.",
    source_urls: [W + 'X-Men_(film_series)'],
    notes: "Wikipedia: continuity 'is not uniform'. Deadpool films, Logan and The New Mutants are flagged disputed.",
    branches: [
      { id: 'original', label: 'Original timeline', marker: 'dot', description: 'Through X-Men: Days of Future Past (future).', placeable: true, parent: null, diverges_at: null, is_main: true },
      { id: 'revised', label: 'Revised timeline', marker: 'triangle', description: 'Created in 1973 by Days of Future Past.', placeable: true, parent: 'original', diverges_at: { y: 1973 }, is_main: false },
    ],
  },
  ordered('ssu', "Sony's Spider-Man Universe", 'SSU', 3, "Sony's live-action films built around Spider-Man characters (2018–2024).", ["Sony's_Spider-Man_Universe"]),
  ordered('raimi-spider-man', 'Spider-Man trilogy (Raimi)', 'Raimi', 4, 'Sam Raimi’s Spider-Man films (2002–2007). Linked to the MCU only through No Way Home.', ['Spider-Man_in_film']),
  ordered('webb-spider-man', 'The Amazing Spider-Man (Webb)', 'Webb', 5, 'Marc Webb’s Amazing Spider-Man films (2012–2014). Linked to the MCU only through No Way Home.', ['Spider-Man_in_film']),
  ordered('x-men-animated', 'X-Men: The Animated Series / X-Men ’97', 'X-Men TAS', 6, 'The 1992–1997 animated series and its 2024 continuation X-Men ’97. Not part of the MCU.', ['X-Men:_The_Animated_Series', "X-Men_'97"]),
];

export const STUDIOS: Studio[] = [
  { id: 'marvel-studios', label: 'Marvel Studios', kind: 'studio', parent: null, note: '' },
  { id: 'marvel-television', label: 'Marvel Television (2010–2019 division)', kind: 'division', parent: null, note: 'The original division behind the ABC, Netflix, Hulu and Freeform series. Folded into Marvel Studios in 2019.' },
  { id: 'marvel-television-label', label: 'Marvel Television (Marvel Studios label)', kind: 'label', parent: 'marvel-studios', note: 'Banner introduced by Marvel Studios in 2024. Not the same as the 2010–2019 division.' },
  { id: 'marvel-studios-animation', label: 'Marvel Studios Animation', kind: 'label', parent: 'marvel-studios', note: '' },
  { id: 'marvel-animation', label: 'Marvel Animation', kind: 'label', parent: 'marvel-studios', note: 'Label used by Marvel Studios for animation from 2024.' },
  { id: 'marvel-spotlight', label: 'Marvel Spotlight', kind: 'label', parent: 'marvel-studios', note: 'Banner for more grounded, character-focused stories (2024–).' },
  { id: 'marvel-entertainment-group', label: 'Marvel Entertainment Group', kind: 'studio', parent: null, note: 'With Saban Entertainment, Graz Entertainment and AKOM for X-Men: The Animated Series.' },
  { id: 'fox', label: '20th Century Fox', kind: 'studio', parent: null, note: '' },
  { id: 'sony', label: 'Sony Pictures (Columbia)', kind: 'studio', parent: null, note: '' },
];

export const PLATFORMS: Platform[] = [
  { id: 'theatrical', label: 'Theatrical', kind: 'theatrical', note: '' },
  { id: 'disney-plus', label: 'Disney+', kind: 'streaming', note: '' },
  { id: 'netflix', label: 'Netflix', kind: 'streaming', note: '' },
  { id: 'hulu', label: 'Hulu', kind: 'streaming', note: '' },
  { id: 'abc', label: 'ABC', kind: 'broadcast', note: '' },
  { id: 'freeform', label: 'Freeform', kind: 'cable', note: '' },
  { id: 'fox-kids', label: 'Fox (Fox Kids)', kind: 'broadcast', note: '' },
  { id: 'home-media', label: 'Home media (Blu-ray / digital)', kind: 'home-media', note: 'Marvel One-Shots premiered as home-media bonus features.' },
];

const ch = (id: string, label: string, aliases: string[] = []): Tag => ({ id, label, kind: 'character', aliases });
const tm = (id: string, label: string, kind: 'team' | 'franchise' = 'team', aliases: string[] = []): Tag => ({ id, label, kind, aliases });
export const MARVEL_TAGS: Tag[] = [
  ch('iron-man', 'Iron Man', ['Tony Stark']), ch('hulk', 'Hulk', ['Bruce Banner']), ch('black-widow', 'Black Widow', ['Natasha Romanoff']),
  ch('nick-fury', 'Nick Fury'), ch('thor', 'Thor'), ch('loki', 'Loki'), ch('captain-america', 'Captain America', ['Steve Rogers', 'Sam Wilson']),
  ch('peggy-carter', 'Peggy Carter'), ch('bucky-barnes', 'Bucky Barnes', ['Winter Soldier']), ch('hawkeye', 'Hawkeye', ['Clint Barton']),
  ch('falcon', 'Falcon', ['Sam Wilson']), ch('star-lord', 'Star-Lord', ['Peter Quill']), ch('groot', 'Groot'),
  ch('scarlet-witch', 'Scarlet Witch', ['Wanda Maximoff']), ch('vision', 'Vision'), ch('ant-man', 'Ant-Man', ['Scott Lang']),
  ch('wasp', 'Wasp', ['Hope van Dyne']), ch('black-panther', 'Black Panther', ["T'Challa", 'Shuri']), ch('spider-man', 'Spider-Man', ['Peter Parker']),
  ch('doctor-strange', 'Doctor Strange', ['Stephen Strange']), ch('thanos', 'Thanos'), ch('captain-marvel', 'Captain Marvel', ['Carol Danvers']),
  ch('yelena-belova', 'Yelena Belova'), ch('shang-chi', 'Shang-Chi'), ch('ironheart', 'Ironheart', ['Riri Williams']), ch('kang', 'Kang', ['He Who Remains']),
  ch('ms-marvel', 'Ms. Marvel', ['Kamala Khan']), ch('monica-rambeau', 'Monica Rambeau'), ch('deadpool', 'Deadpool', ['Wade Wilson']),
  ch('wolverine', 'Wolverine', ['Logan']), ch('doctor-doom', 'Doctor Doom'), ch('ghost-rider', 'Ghost Rider'), ch('phil-coulson', 'Phil Coulson'),
  ch('werewolf-by-night', 'Werewolf by Night', ['Jack Russell']), ch('punisher', 'Punisher', ['Frank Castle']), ch('agatha-harkness', 'Agatha Harkness'),
  ch('the-watcher', 'The Watcher', ['Uatu']), ch('kate-bishop', 'Kate Bishop'), ch('kingpin', 'Kingpin', ['Wilson Fisk']), ch('echo', 'Echo', ['Maya Lopez']),
  ch('moon-knight', 'Moon Knight', ['Marc Spector']), ch('she-hulk', 'She-Hulk', ['Jennifer Walters']), ch('daredevil', 'Daredevil', ['Matt Murdock']),
  ch('wonder-man', 'Wonder Man', ['Simon Williams']), ch('jessica-jones', 'Jessica Jones'), ch('luke-cage', 'Luke Cage'), ch('iron-fist', 'Iron Fist', ['Danny Rand']),
  ch('cloak-and-dagger', 'Cloak & Dagger'), ch('helstrom', 'Helstrom'), ch('professor-x', 'Professor X', ['Charles Xavier']), ch('magneto', 'Magneto', ['Erik Lehnsherr']),
  ch('jean-grey', 'Jean Grey', ['Phoenix']), ch('venom', 'Venom', ['Eddie Brock']), ch('morbius', 'Morbius'), ch('madame-web', 'Madame Web'), ch('kraven', 'Kraven the Hunter'),
  tm('avengers', 'Avengers'), tm('shield', 'S.H.I.E.L.D.'), tm('guardians-of-the-galaxy', 'Guardians of the Galaxy'), tm('wakanda', 'Wakanda', 'franchise'),
  tm('eternals', 'Eternals'), tm('x-men', 'X-Men'), tm('thunderbolts', 'Thunderbolts'), tm('fantastic-four', 'Fantastic Four'), tm('tva', 'Time Variance Authority'),
  tm('defenders', 'Defenders'), tm('inhumans', 'Inhumans'), tm('runaways', 'Runaways'), tm('spider-man-franchise', 'Spider-Man (franchise)', 'franchise'),
];
