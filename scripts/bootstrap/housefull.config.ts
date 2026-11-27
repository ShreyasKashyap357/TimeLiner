// Housefull: each film stands alone.
// Generated from research (research-w4-c.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'housefull', name: "Housefull", short_name: "Housefull", order: 59, enabled: true,
  accent: { primary: '#E91E63', secondary: '#FFC107' }, default_continuity: 'housefull-2010', data_dir: 'housefull', last_verified: null,
  description: "The Housefull comedies. 'Each film starts with a fresh story unrelated with the preceding film's story', so each is its own continuity.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "housefull-2010",
  "universe": "housefull",
  "name": "Housefull (2010)",
  "short_name": "Housefull",
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
  "description": "Standalone story. The Housefull series article says: \"Each film starts with a fresh story unrelated with the preceding film's story.\" Wikipedia: \"Each film starts with a fresh story unrelated with the preceding film's story.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Housefull_%28film_series%29&oldid=1383849343"
  ],
  "notes": ""
 },
 {
  "id": "housefull-2",
  "universe": "housefull",
  "name": "Housefull 2",
  "short_name": "Housefull 2",
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
  "description": "Standalone story. The Housefull series article says: \"Each film starts with a fresh story unrelated with the preceding film's story.\" Wikipedia: \"Each film starts with a fresh story unrelated with the preceding film's story. … is a [[standalone sequel]] to ''[[Housefull (2010 film)|Housefull]]'' (2010).\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Housefull_%28film_series%29&oldid=1383849343",
   "https://en.wikipedia.org/w/index.php?title=Housefull_2&oldid=1388284288"
  ],
  "notes": ""
 },
 {
  "id": "housefull-3",
  "universe": "housefull",
  "name": "Housefull 3",
  "short_name": "Housefull 3",
  "order": 3,
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
  "description": "Standalone story. The Housefull series article says: \"Each film starts with a fresh story unrelated with the preceding film's story.\" Wikipedia: \"Each film starts with a fresh story unrelated with the preceding film's story.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Housefull_%28film_series%29&oldid=1383849343"
  ],
  "notes": ""
 },
 {
  "id": "housefull-4",
  "universe": "housefull",
  "name": "Housefull 4",
  "short_name": "Housefull 4",
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
  "description": "Standalone story. The Housefull series article says: \"Each film starts with a fresh story unrelated with the preceding film's story.\" Wikipedia: \"Each film starts with a fresh story unrelated with the preceding film's story.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Housefull_%28film_series%29&oldid=1383849343"
  ],
  "notes": ""
 },
 {
  "id": "housefull-5",
  "universe": "housefull",
  "name": "Housefull 5 (5A and 5B)",
  "short_name": "Housefull 5",
  "order": 5,
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
  "description": "Standalone story. The Housefull series article says: \"Each film starts with a fresh story unrelated with the preceding film's story.\" Wikipedia: \"Each film starts with a fresh story unrelated with the preceding film's story.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Housefull_%28film_series%29&oldid=1383849343"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "nadiadwala-grandson-entertainment",
  "label": "Nadiadwala Grandson Entertainment",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "fox-star-studios",
  "label": "Fox Star Studios",
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
export const SORT_BY_YEAR = ["housefull-2010","housefull-2","housefull-3","housefull-4","housefull-5"];
