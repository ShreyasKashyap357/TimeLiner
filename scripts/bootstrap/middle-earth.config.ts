// Middle-earth (Tolkien). One continuity per production (books, Jackson films, Rings of Power, Rankin/Bass,
// Bakshi, Khraniteli, Hobitit); never merged. Calendar: Tolkien's Ages, stored as one running year count.
// Age lengths from Wikipedia "History of Arda" (Appendix D: "S.A. 3442 became T.A. 1"): F.A. 590, S.A. 3441,
// T.A. 3021, then the Fourth Age. Generated from research on 2026-11-27.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

const main = { id: 'main', label: 'Main', marker: 'dot' as const, description: '', placeable: true, parent: null, diverges_at: null, merges_into: null, is_main: true };
const AGES = { kind: 'ages' as const, note: 'Years count from the start of each Age (Wikipedia, "History of Arda"). The Fourth Age is taken to begin after T.A. 3021 (Gondor reckoned it from 25 March 3021). Years of the Trees are not dated here.',
  ages: [{ label: 'F.A.', name: 'First Age', length: 590 }, { label: 'S.A.', name: 'Second Age', length: 3441 }, { label: 'T.A.', name: 'Third Age', length: 3021 }, { label: 'Fo.A.', name: 'Fourth Age', length: null }] };

export const UNIVERSE: Universe = {
  id: 'middle-earth', name: 'Middle-earth (Tolkien)', short_name: 'Middle-earth', order: 9, enabled: true,
  accent: { primary: '#D4AF37', secondary: '#7FA36B' },
  default_continuity: 'me-legendarium', data_dir: 'middle-earth', last_verified: null,
  description: "Tolkien's books and the adaptations: Peter Jackson's films, The Rings of Power, Rankin/Bass, Bakshi and more.",
  grouping_schemes: [],
};

export const CONTINUITIES: Continuity[] = [
 {
  "id": "me-legendarium",
  "universe": "middle-earth",
  "name": "Tolkien's legendarium (books)",
  "short_name": "Tolkien's legendarium",
  "order": 1,
  "kind": "shared",
  "calendar": AGES,
  "branches": [
   main
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "History of Arda: \"Tolkien situated the History of Arda as Earth's prehistory.\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/History_of_Arda"
  ],
  "notes": ""
 },
 {
  "id": "me-jackson",
  "universe": "middle-earth",
  "name": "Peter Jackson films (New Line / Warner Bros.)",
  "short_name": "Peter Jackson films",
  "order": 2,
  "kind": "shared",
  "calendar": AGES,
  "branches": [
   main
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "War of the Rohirrim: \"It is connected to the film trilogy's continuity\". Hunt for Gollum: \"set between the events of Peter Jackson's The Hobbit (2012–2014) and The Lord of the Rings (2001–2003) film trilogies\".",
  "source_urls": [
   "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings%3A_The_War_of_the_Rohirrim"
  ],
  "notes": ""
 },
 {
  "id": "me-rings-of-power",
  "universe": "middle-earth",
  "name": "The Rings of Power (Amazon)",
  "short_name": "The Rings of Power",
  "order": 3,
  "kind": "shared",
  "calendar": AGES,
  "branches": [
   main
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "\"These events take place over thousands of years in Tolkien's works but are condensed to a short time period for the series.\" Hunt for Gollum article: Warner \"wanted to distance future films from the Amazon series\".",
  "source_urls": [
   "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings%3A_The_Rings_of_Power"
  ],
  "notes": ""
 },
 {
  "id": "me-rankin-bass",
  "universe": "middle-earth",
  "name": "Rankin/Bass animated",
  "short_name": "Rankin/Bass animated",
  "order": 4,
  "kind": "shared",
  "calendar": AGES,
  "branches": [
   main
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "\"It is a sequel to The Hobbit (1977).\" / \"The film is often mistaken for a sequel to Ralph Bakshi's 1978 animated film\".",
  "source_urls": [
   "https://en.wikipedia.org/wiki/The_Return_of_the_King_(1980_film)"
  ],
  "notes": ""
 },
 {
  "id": "me-bakshi",
  "universe": "middle-earth",
  "name": "Ralph Bakshi animated",
  "short_name": "Ralph Bakshi animated",
  "order": 5,
  "kind": "shared",
  "calendar": AGES,
  "branches": [
   main
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "\"There was no official sequel to cover the remainder of the story\".",
  "source_urls": [
   "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings_(1978_film)"
  ],
  "notes": ""
 },
 {
  "id": "me-khraniteli",
  "universe": "middle-earth",
  "name": "Khraniteli (Leningrad TV, 1991)",
  "short_name": "Khraniteli",
  "order": 6,
  "kind": "shared",
  "calendar": AGES,
  "branches": [
   main
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "\"broadcast once in 1991 by Leningrad Television\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/Khraniteli"
  ],
  "notes": ""
 },
 {
  "id": "me-hobitit",
  "universe": "middle-earth",
  "name": "Hobitit (Yle, 1993)",
  "short_name": "Hobitit",
  "order": 7,
  "kind": "shared",
  "calendar": AGES,
  "branches": [
   main
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "\"based on a six-hour play, Taru sormusten herrasta\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/Hobitit"
  ],
  "notes": ""
 }
];

export const STUDIOS: Studio[] = [
 {
  "id": "george-allen-unwin",
  "label": "George Allen & Unwin",
  "short_label": null,
  "kind": "publisher",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "harpercollins",
  "label": "HarperCollins",
  "short_label": null,
  "kind": "publisher",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "new-line-cinema",
  "label": "New Line Cinema",
  "short_label": null,
  "kind": "studio",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "warner-bros-animation",
  "label": "Warner Bros. Animation",
  "short_label": null,
  "kind": "studio",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "amazon-mgm-studios",
  "label": "Amazon MGM Studios",
  "short_label": null,
  "kind": "studio",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "rankin-bass-productions",
  "label": "Rankin/Bass Productions",
  "short_label": null,
  "kind": "studio",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "fantasy-films",
  "label": "Fantasy Films (Saul Zaentz)",
  "short_label": null,
  "kind": "studio",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "leningrad-television",
  "label": "Leningrad Television",
  "short_label": null,
  "kind": "studio",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "yle",
  "label": "Yle",
  "short_label": null,
  "kind": "studio",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [
 {
  "id": "leningrad-television",
  "label": "Leningrad Television",
  "kind": "broadcast",
  "note": ""
 },
 {
  "id": "yle-tv1",
  "label": "Yle TV1",
  "kind": "broadcast",
  "note": ""
 }
];
const ch = (id: string, label: string): Tag => ({ id, label, kind: 'character', aliases: [] });
export const TAGS: Tag[] = [ch('frodo', 'Frodo Baggins'), ch('bilbo', 'Bilbo Baggins'), ch('gandalf', 'Gandalf'), ch('aragorn', 'Aragorn'), ch('galadriel', 'Galadriel'), ch('sauron', 'Sauron'), ch('gollum', 'Gollum')];
export const FANDOM_PREFIXES = { lotr: 'https://lotr.fandom.com/wiki/' };
export const SORT_BY_YEAR = ["me-legendarium","me-jackson","me-rings-of-power","me-rankin-bass","me-bakshi","me-khraniteli","me-hobitit"];
