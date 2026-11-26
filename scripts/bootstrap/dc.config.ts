// DC universe configuration: everything DC-specific lives here as data.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

const W = 'https://en.wikipedia.org/wiki/';

export const DC_UNIVERSE: Universe = {
  id: 'dc', name: 'DC', short_name: 'DC', order: 2, enabled: true,
  accent: { primary: '#5DA9FF', secondary: '#2F7BEF' },
  default_continuity: 'dcu', data_dir: 'dc', last_verified: null,
  description: 'DC Universe (Gunn), DC Extended Universe, Arrowverse, Batman film continuities, DC live-action TV and DC animation.',
  grouping_schemes: [
    { id: 'chapter', label: 'Chapter', parent_scheme: null, values: [
      { id: 'chapter-1', label: 'Chapter One: Gods and Monsters', order: 1, parent: null },
    ] },
  ],
};

const main = (label = 'Main'): Continuity['branches'][number] => ({ id: 'main', label, marker: 'dot', description: '', placeable: true, parent: null, diverges_at: null, merges_into: null, is_main: true });
const C = (id: string, name: string, short: string, order: number, description: string, sources: string[], extra: Partial<Continuity> = {}): Continuity => ({
  id, universe: 'dc', name, short_name: short, order, kind: 'shared', calendar: { kind: 'gregorian' },
  branches: [main()], grouping_schemes: [], alt_orders: [], description, source_urls: sources.map((s) => W + s), notes: '', ...extra,
});

export const DC_CONTINUITIES: Continuity[] = [
  C('dcu', 'DC Universe (DC Studios)', 'DCU', 1, "James Gunn and Peter Safran's DC Studios shared universe (2024–).", ['DC_Universe_(franchise)'], { grouping_schemes: ['chapter'] }),
  C('dceu', 'DC Extended Universe', 'DCEU', 2, 'Warner Bros./DC Films shared universe (2013–2023).', ['DC_Extended_Universe']),
  C('arrowverse', 'Arrowverse', 'Arrowverse', 3, "The CW's shared universe of DC series (2012–2023), with a multiverse of Earths.", ['Arrowverse', 'List_of_Arrowverse_episodes']),
  C('batman-epic-crime-saga', 'The Batman Epic Crime Saga (Reeves)', 'Reeves', 4, "Matt Reeves' Batman films and spin-off series.", ['The_Batman_(film)', 'The_Penguin_(TV_series)']),
  C('nolan-dark-knight', 'The Dark Knight trilogy (Nolan)', 'Nolan', 5, "Christopher Nolan's Batman films (2005–2012).", ['Batman_in_film']),
  C('burton-schumacher', 'Batman 1989–1997 (Burton / Schumacher)', 'Burton/Schumacher', 6, 'Warner Bros. Batman films directed by Tim Burton and Joel Schumacher.', ['Batman_in_film']),
  C('joker-films', 'Joker films (Phillips)', 'Joker', 7, "Todd Phillips' standalone Joker films.", ['Joker_(2019_film)', 'Joker:_Folie_à_Deux']),
  C('reeve-superman', 'Superman films (1978–2006)', 'Reeve Superman', 8, 'Superman I–IV, Supergirl (1984) and Superman Returns (2006).', ['Superman_in_film']),
  C('smallville', 'Smallville', 'Smallville', 9, 'The WB / The CW series (2001–2011).', ['Smallville', 'List_of_Smallville_episodes']),
  C('gotham', 'Gotham', 'Gotham', 10, 'Fox series (2014–2019).', ['Gotham_(TV_series)', 'List_of_Gotham_episodes']),
  C('titans', 'Titans', 'Titans', 11, 'DC Universe / HBO Max series (2018–2023).', ['Titans_(2018_TV_series)']),
  C('doom-patrol', 'Doom Patrol', 'Doom Patrol', 12, 'DC Universe / HBO Max series (2019–2023). Wikipedia: a separate continuity from Titans.', ['Doom_Patrol_(TV_series)']),
  C('dcau', 'DC Animated Universe', 'DCAU', 13, 'Animated shared universe from Batman: The Animated Series (1992) to Justice League Unlimited (2006).', ['DC_Animated_Universe']),
  C('dcamu', 'DC Animated Movie Universe', 'DCAMU', 14, 'Direct-to-video animated films, "New 52" arc (2013–2020).', ['DC_Animated_Movie_Universe'], { calendar: { kind: 'ordered-only' } }),
  C('tomorrowverse', 'Tomorrowverse', 'Tomorrowverse', 15, 'Direct-to-video animated films (2020–2024), the second DCAMU-era arc.', ['DC_Animated_Movie_Universe'], { calendar: { kind: 'ordered-only' } }),
];

export const DC_STUDIOS: Studio[] = [
  { id: 'dc-studios', label: 'DC Studios', short_label: 'DC Studios', kind: 'studio', parent: null, group: null, active: { from: 2022, to: null }, note: '' },
  { id: 'dc-films', label: 'DC Films', short_label: 'DC Films', kind: 'division', parent: null, group: null, active: { from: 2016, to: 2022 }, note: 'Warner Bros. division succeeded by DC Studios in 2022.' },
  { id: 'warner-bros-pictures', label: 'Warner Bros. Pictures', short_label: 'Warner Bros.', kind: 'studio', parent: null, group: null, active: null, note: '' },
  { id: 'warner-bros-television', label: 'Warner Bros. Television', short_label: 'WBTV', kind: 'studio', parent: null, group: null, active: null, note: '' },
  { id: 'warner-bros-animation', label: 'Warner Bros. Animation', short_label: 'WB Animation', kind: 'studio', parent: null, group: null, active: null, note: '' },
];

export const DC_PLATFORMS: Platform[] = [
  { id: 'the-cw', label: 'The CW', kind: 'broadcast', note: '' },
  { id: 'the-wb', label: 'The WB', kind: 'broadcast', note: '' },
  { id: 'fox', label: 'Fox', kind: 'broadcast', note: 'Fox broadcast network (not the 20th Century Fox studio).' },
  { id: 'max', label: 'Max / HBO Max', kind: 'streaming', note: '' },
  { id: 'hbo', label: 'HBO', kind: 'cable', note: '' },
  { id: 'dc-universe-streaming', label: 'DC Universe (streaming)', kind: 'streaming', note: '' },
  { id: 'kids-wb', label: "Kids' WB", kind: 'broadcast', note: '' },
  { id: 'cartoon-network', label: 'Cartoon Network', kind: 'cable', note: '' },
  { id: 'cw-seed', label: 'CW Seed', kind: 'streaming', note: '' },
];

const ch = (id: string, label: string, aliases: string[] = []): Tag => ({ id, label, kind: 'character', aliases });
const tm = (id: string, label: string, kind: 'team' | 'franchise' = 'team', aliases: string[] = []): Tag => ({ id, label, kind, aliases });
export const DC_TAGS: Tag[] = [
  ch('superman', 'Superman', ['Clark Kent', 'Kal-El']), ch('batman', 'Batman', ['Bruce Wayne']), ch('wonder-woman', 'Wonder Woman', ['Diana Prince']),
  ch('flash', 'The Flash', ['Barry Allen']), ch('green-arrow', 'Green Arrow', ['Oliver Queen']), ch('supergirl', 'Supergirl', ['Kara Zor-El', 'Kara Danvers']),
  ch('aquaman', 'Aquaman', ['Arthur Curry']), ch('cyborg', 'Cyborg', ['Victor Stone']), ch('shazam', 'Shazam', ['Billy Batson']),
  ch('joker', 'Joker', ['Arthur Fleck']), ch('harley-quinn', 'Harley Quinn'), ch('penguin', 'Penguin', ['Oswald Cobblepot', 'Oz Cobb']),
  ch('catwoman', 'Catwoman', ['Selina Kyle']), ch('peacemaker', 'Peacemaker', ['Christopher Smith']), ch('black-adam', 'Black Adam'),
  ch('blue-beetle', 'Blue Beetle', ['Jaime Reyes']), ch('green-lantern', 'Green Lantern', ['Hal Jordan', 'John Stewart', 'Guy Gardner']),
  ch('lois-lane', 'Lois Lane'), ch('lex-luthor', 'Lex Luthor'), ch('batwoman', 'Batwoman', ['Kate Kane', 'Ryan Wilder']),
  ch('black-lightning', 'Black Lightning', ['Jefferson Pierce']), ch('stargirl', 'Stargirl', ['Courtney Whitmore']), ch('atom', 'The Atom', ['Ray Palmer']),
  ch('james-gordon', 'James Gordon'), ch('robin', 'Robin', ['Dick Grayson', 'Damian Wayne', 'Tim Drake']), ch('clayface', 'Clayface'),
  ch('amanda-waller', 'Amanda Waller'), ch('static', 'Static', ['Virgil Hawkins']), ch('batman-beyond', 'Batman (Terry McGinnis)', ['Terry McGinnis']),
  tm('justice-league', 'Justice League'), tm('suicide-squad', 'Suicide Squad', 'team', ['Task Force X']), tm('teen-titans', 'Teen Titans / Titans'),
  tm('doom-patrol', 'Doom Patrol'), tm('justice-society', 'Justice Society of America'), tm('legends', 'Legends of Tomorrow'),
  tm('creature-commandos', 'Creature Commandos'), tm('batman-franchise', 'Batman (franchise)', 'franchise'), tm('superman-franchise', 'Superman (franchise)', 'franchise'),
];
