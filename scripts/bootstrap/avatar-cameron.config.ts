// Avatar: Avatar is set in 2154; later years inferred from stated gaps.
// Generated from research (research-w5-a.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'avatar-cameron', name: "Avatar (James Cameron)", short_name: "Avatar (James Cameron)", order: 80, enabled: true,
  accent: { primary: '#00838F', secondary: '#4FC3F7' }, default_continuity: 'avatar-main', data_dir: 'avatar-cameron', last_verified: null,
  description: "James Cameron's Avatar films and Frontiers of Pandora (made to 'strictly adhere to the canon').", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "avatar-main",
  "universe": "avatar-cameron",
  "name": "Avatar (films and canon games)",
  "short_name": "Avatar",
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
  "description": "James Cameron's Avatar films plus Avatar: Frontiers of Pandora, which was made to \"strictly adhere to the canon\". Avatar: The Game (2009) is described as non-canon and is excluded. Wikipedia: \"The developers had carte blanche from the film, leading to it becoming non-canon after the singular film became a franchise and the need to make Ubisoft´s followup Avatar: Frontiers of Pandora strictly adhere to the canon.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Avatar%3A_The_Game&oldid=1386308790"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "massive-entertainment",
  "label": "Massive Entertainment",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "lightstorm-entertainment",
  "label": "Lightstorm Entertainment",
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
export const SORT_BY_YEAR = ["avatar-main"];
