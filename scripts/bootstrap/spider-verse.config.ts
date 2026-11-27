// Spider-Verse: Across is set sixteen months after Into.
// Generated from research (research-w6-a.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'spider-verse', name: "Spider-Verse", short_name: "Spider-Verse", order: 82, enabled: true,
  accent: { primary: '#E53935', secondary: '#00E5FF' }, default_continuity: 'spider-verse-animated', data_dir: 'spider-verse', last_verified: null,
  description: "Sony Pictures Animation's Spider-Verse films (the live-action Marvel Spider-Man is in the Marvel universe).", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "spider-verse-animated",
  "universe": "spider-verse",
  "name": "Spider-Verse (Sony Pictures Animation)",
  "short_name": "Spider-Verse",
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
  "description": "The animated Spider-Verse films; separate from live-action Spider-Man continuities. Wikipedia: \"Spider-Man: Across the Spider-Verse … sequel to Spider-Man: Into the Spider-Verse (2018) and the second film in the animated Spider-Verse franchise\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Spider-Man%3A_Across_the_Spider-Verse&oldid=1387949865"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "columbia-pictures",
  "label": "Columbia Pictures",
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
export const SORT_BY_YEAR = ["spider-verse-animated"];
