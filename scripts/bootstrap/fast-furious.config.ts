// Fast & Furious (generated from research on 2026-11-27). The Fast Saga films, shorts and Hobbs & Shaw in story
// order (Tokyo Drift "is set between Fast & Furious 6 (2013) and Furious 7 (2015)"); Spy Racers separate.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';
const main = { id: 'main', label: 'Main', marker: 'dot' as const, description: '', placeable: true, parent: null, diverges_at: null, merges_into: null, is_main: true };
export const UNIVERSE: Universe = {
  id: 'fast-furious', name: 'Fast & Furious', short_name: 'Fast & Furious', order: 11, enabled: true,
  accent: { primary: '#FF7A1A', secondary: '#3FA9F5' }, default_continuity: 'ff-main', data_dir: 'fast-furious', last_verified: null,
  description: 'The Fast Saga films in story order, the short films, Hobbs & Shaw, and the animated Spy Racers.', grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "ff-main",
  "universe": "fast-furious",
  "name": "Fast & Furious films (The Fast Saga)",
  "short_name": "Fast & Furious films",
  "order": 1,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   main
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "Los Bandoleros article: \"Los Bandoleros is said to \"hold together the entire Fast & Furious timeline\" and to ensure a certain continuity in the franchise.\" Franchise article: \"Given the apparent death of the character in the third film, the timeline of the franchise was altered to account for his appearance.\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/Fast_%26_Furious%3B_Los_Bandoleros_(film)"
  ],
  "notes": ""
 },
 {
  "id": "ff-spy-racers",
  "universe": "fast-furious",
  "name": "Fast & Furious Spy Racers (animated)",
  "short_name": "Fast & Furious Spy Racers",
  "order": 2,
  "kind": "shared",
  "calendar": {
   "kind": "ordered-only"
  },
  "branches": [
   main
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "\"Fast & Furious Spy Racers is an American animated television series that premiered on Netflix on December 26, 2019, based on the Fast & Furious film series\"; franchise article: \"Vin Diesel reprises his role as Dominic Toretto, voicing the character in brief appearances.\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/Fast_%26_Furious_Spy_Racers%3B_Fast_%26_Furious"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "geronimo-film-productions",
  "label": "Geronimo Film Productions",
  "short_label": null,
  "kind": "studio",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "one-race-films",
  "label": "One Race Films",
  "short_label": null,
  "kind": "studio",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "universal-television",
  "label": "Universal Television",
  "short_label": null,
  "kind": "studio",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [];
export const TAGS: Tag[] = [{ id: 'dominic-toretto', label: 'Dominic Toretto', kind: 'character', aliases: ['Dom'] }, { id: 'brian-oconner', label: "Brian O'Conner", kind: 'character', aliases: [] }, { id: 'luke-hobbs', label: 'Luke Hobbs', kind: 'character', aliases: [] }, { id: 'han', label: 'Han Lue', kind: 'character', aliases: [] }];
