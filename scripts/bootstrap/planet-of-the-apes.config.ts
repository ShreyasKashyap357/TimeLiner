// Planet of the Apes: years where stated; several are disputed between films.
// Generated from research (research-w5-a.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'planet-of-the-apes', name: "Planet of the Apes", short_name: "Planet of the Apes", order: 79, enabled: true,
  accent: { primary: '#6D4C41', secondary: '#FFB74D' }, default_continuity: 'apes-reboot', data_dir: 'planet-of-the-apes', last_verified: null,
  description: "The original films and TV series, the animated series, Tim Burton's 2001 film, the reboot series (Rise to Kingdom), and Pierre Boulle's novel, each its own continuity.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "apes-original",
  "universe": "planet-of-the-apes",
  "name": "Planet of the Apes (1968–1973 films and 1974 TV series)",
  "short_name": "Planet of the Apes",
  "order": 1,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   {
    "id": "main",
    "label": "Main",
    "marker": "dot",
    "description": "",
    "placeable": true,
    "parent": null,
    "diverges_at": null,
    "merges_into": null,
    "is_main": true
   }
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "The five original films (a closed time loop) and the 1974 CBS live-action series, which was conceived \"to follow the films\". The TV series is placed here on that basis; Wikipedia does not explicitly call it canon to the films. Wikipedia: \"To capitalize on this success, Arthur P. Jacobs conceived of an hour-long live-action television series to follow the films.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Planet_of_the_Apes&oldid=1386811298"
  ],
  "notes": ""
 },
 {
  "id": "apes-animated",
  "universe": "planet-of-the-apes",
  "name": "Return to the Planet of the Apes (1975 animated series)",
  "short_name": "Return to the Planet of the Apes",
  "order": 2,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   {
    "id": "main",
    "label": "Main",
    "marker": "dot",
    "description": "",
    "placeable": true,
    "parent": null,
    "diverges_at": null,
    "merges_into": null,
    "is_main": true
   }
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "NBC animated series with new astronauts. Kept separate: Wikipedia describes it only as an adaptation of Planet of the Apes that loosely borrows elements of the films. Wikipedia: \"In 1975, after the failure of the live-action television series, NBC and 20th Century Fox agreed to adapt Planet of the Apes for an animated series.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Planet_of_the_Apes&oldid=1386811298"
  ],
  "notes": ""
 },
 {
  "id": "apes-burton",
  "universe": "planet-of-the-apes",
  "name": "Planet of the Apes (2001)",
  "short_name": "Planet of the Apes",
  "order": 3,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   {
    "id": "main",
    "label": "Main",
    "marker": "dot",
    "description": "",
    "placeable": true,
    "parent": null,
    "diverges_at": null,
    "merges_into": null,
    "is_main": true
   }
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "Tim Burton's remake; its own continuity. Wikipedia: \"Plans for a film remake stalled in \"development hell\" for over 10 years before the 2001 release of Planet of the Apes, directed by Tim Burton.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Planet_of_the_Apes&oldid=1386811298"
  ],
  "notes": ""
 },
 {
  "id": "apes-reboot",
  "universe": "planet-of-the-apes",
  "name": "Planet of the Apes reboot series (2011–)",
  "short_name": "Planet of the Apes reboot series",
  "order": 4,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   {
    "id": "main",
    "label": "Main",
    "marker": "dot",
    "description": "",
    "placeable": true,
    "parent": null,
    "diverges_at": null,
    "merges_into": null,
    "is_main": true
   }
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "Rise, Dawn, War and Kingdom. Wikipedia: \"In August, it was confirmed that any future installments would be set in the same universe first established in Rise of the Planet of the Apes (2011).\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Kingdom_of_the_Planet_of_the_Apes&oldid=1387911458",
   "https://en.wikipedia.org/w/index.php?title=Planet_of_the_Apes&oldid=1386811298"
  ],
  "notes": ""
 },
 {
  "id": "apes-novel",
  "universe": "planet-of-the-apes",
  "name": "La Planète des singes (Boulle novel)",
  "short_name": "La Planète des singes",
  "order": 5,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   {
    "id": "main",
    "label": "Main",
    "marker": "dot",
    "description": "",
    "placeable": true,
    "parent": null,
    "diverges_at": null,
    "merges_into": null,
    "is_main": true
   }
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "Pierre Boulle's 1963 novel; its own continuity. Wikipedia: \"La Planète des singes, published in English as Planet of the Apes in the U.S. and Monkey Planet in the UK, is a 1963 science fiction novel by French author Pierre Boulle.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Planet_of_the_Apes_(novel)&oldid=1384224309"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "apjac-productions",
  "label": "APJAC Productions",
  "kind": "studio",
  "short_label": "APJAC Productions",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "20th-century-fox-television",
  "label": "20th Century Fox Television",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "depatie-freleng-enterprises",
  "label": "DePatie–Freleng Enterprises",
  "kind": "studio",
  "short_label": "DePatie–Freleng Enterprises",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "20th-century-studios",
  "label": "20th Century Studios",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "e-ditions-julliard",
  "label": "Éditions Julliard",
  "kind": "publisher",
  "short_label": "Éditions Julliard",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["apes-original","apes-animated","apes-burton","apes-reboot","apes-novel"];
