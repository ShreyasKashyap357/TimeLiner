// The Boys: story order from the seasons' stated placements (Gen V season 1 after The Boys season 3).
// Generated from research (research-w6-a.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'the-boys', name: "The Boys", short_name: "Boys", order: 81, enabled: true,
  accent: { primary: '#B71C1C', secondary: '#1565C0' }, default_continuity: 'the-boys-tv', data_dir: 'the-boys', last_verified: null,
  description: "The Boys, Gen V and Diabolical on Prime Video (one shared continuity), and Garth Ennis's comic as a separate continuity.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "the-boys-tv",
  "universe": "the-boys",
  "name": "The Boys (Prime Video series)",
  "short_name": "The Boys",
  "order": 1,
  "kind": "shared",
  "calendar": {
   "kind": "ordered-only"
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
  "description": "One shared continuity: The Boys, Gen V and the canon parts of The Boys Presents: Diabolical. Wikipedia gives no in-universe calendar years for the present-day seasons, so ordering only. Wikipedia: \"The third television series in The Boys franchise, its first season is set after the third season of The Boys, while its second season is set after the fourth season of The Boys. … The season shares continuity with the spin-off series Gen V and is set after the conclusion of its first season. … with further adaptations of the comic book series planned for spin-offs that would take place in the sam\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Gen_V&oldid=1387213899",
   "https://en.wikipedia.org/w/index.php?title=The_Boys_season_4&oldid=1378204142",
   "https://en.wikipedia.org/w/index.php?title=The_Boys_(TV_series)&oldid=1387498667"
  ],
  "notes": ""
 },
 {
  "id": "the-boys-comic",
  "universe": "the-boys",
  "name": "The Boys (Garth Ennis comic)",
  "short_name": "The Boys",
  "order": 2,
  "kind": "shared",
  "calendar": {
   "kind": "ordered-only"
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
  "description": "The original WildStorm/Dynamite comic, separate from the TV adaptation. Wikipedia: \"The Boys is an adult superhero comic book series co-created and written by Garth Ennis and co-created, designed, and illustrated by Darick Robertson.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Boys_(comics)&oldid=1385494717"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "studio-not-stated",
  "label": "Studio Not Stated",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "wildstorm",
  "label": "Wildstorm",
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
export const SORT_BY_YEAR = ["the-boys-tv","the-boys-comic"];
