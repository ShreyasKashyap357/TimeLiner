// The Last of Us: games and HBO series are separate continuities (the show moved the outbreak from 2013 to 2003).
// Generated from research (research-game-franchises.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'the-last-of-us', name: "The Last of Us", short_name: "The Last of Us", order: 18, enabled: true,
  accent: { primary: '#8FB573', secondary: '#C9A227' }, default_continuity: 'tlou-games', data_dir: 'the-last-of-us', last_verified: null,
  description: "Naughty Dog's games and the HBO series (which moves the dates).", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "tlou-games",
  "universe": "the-last-of-us",
  "name": "The Last of Us (games)",
  "short_name": "The Last of Us",
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
  "description": "Naughty Dog games: The Last of Us, Left Behind, the Part I remake and Part II. Outbreak 2013, main story 2033. Wikipedia: \"The game's outbreak takes place in 2013 with its post-apocalyptic narrative in 2033\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Last_of_Us_%28TV_series%29&oldid=1387229405"
  ],
  "notes": ""
 },
 {
  "id": "tlou-hbo",
  "universe": "the-last-of-us",
  "name": "The Last of Us (HBO series)",
  "short_name": "The Last of Us",
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
  "description": "HBO adaptation with its own dates: outbreak 2003, main story 2023. Same characters, different timeline. Wikipedia: \"The game's outbreak takes place in 2013 with its post-apocalyptic narrative in 2033; this was changed to 2003 and 2023 as the writers felt events occurring simultaneously with broadcast was more interesting and did not fundamentally change the story. … Mazin compared the process to adapting a novel, with identical emotional beats despite different events.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Last_of_Us_%28TV_series%29&oldid=1387229405"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "naughty-dog",
  "label": "Naughty Dog",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "sony-pictures-television",
  "label": "Sony Pictures Television",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["tlou-games","tlou-hbo"];
