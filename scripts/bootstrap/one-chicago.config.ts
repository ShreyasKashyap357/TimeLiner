// One Chicago: seasons in premiere order across the shared shows (no source gives story years; order inferred from airing).
// Generated from research (research-w2-e.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'one-chicago', name: "One Chicago", short_name: "One Chicago", order: 27, enabled: true,
  accent: { primary: '#C62828', secondary: '#1565C0' }, default_continuity: 'one-chicago-main', data_dir: 'one-chicago', last_verified: null,
  description: "Chicago Fire, P.D., Med and Justice: one shared continuity with regular crossovers.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "one-chicago-main",
  "universe": "one-chicago",
  "name": "One Chicago (shared universe)",
  "short_name": "One Chicago",
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
  "description": "Chicago Fire, P.D., Med and Justice: one interconnected universe with frequent crossovers. Wikipedia: \"A recurring and unifying theme of the four shows is Molly's, a small bar owned by three firefighters which has been frequented by characters from all four shows.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Chicago_%28franchise%29&oldid=1387031475"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "wolf-entertainment",
  "label": "Wolf Entertainment",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "wolf-films",
  "label": "Wolf Films",
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
export const SORT_BY_YEAR = ["one-chicago-main"];
