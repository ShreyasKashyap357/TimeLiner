// Breaking Bad: ordered by the years each season is set in.
// Generated from research (research-w2-a.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'breaking-bad', name: "Breaking Bad", short_name: "Breaking Bad", order: 30, enabled: true,
  accent: { primary: '#3B7D3B', secondary: '#E0C341' }, default_continuity: 'breaking-bad-main', data_dir: 'breaking-bad', last_verified: null,
  description: "Breaking Bad, Better Call Saul and El Camino in one continuity; the Slippin' Jimmy shorts separately.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "breaking-bad-main",
  "universe": "breaking-bad",
  "name": "Breaking Bad (shared continuity)",
  "short_name": "Breaking Bad",
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
  "description": "Breaking Bad, its prequel/sequel series Better Call Saul, and the sequel film El Camino. Wikipedia: \"Breaking Bad is an American neo-Western crime media franchise created by Vince Gilligan, primarily based on the two television series, Breaking Bad (2008–2013) and Better Call Saul (2015–2022), and the film El Camino: A Breaking Bad Movie (2019). … Part of the Breaking Bad franchise, it is a spin-off of Gilligan's previous series, Breaking Bad (2008–2013), to which it serves primarily as a prequel\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Breaking_Bad_%28franchise%29&oldid=1387835901",
   "https://en.wikipedia.org/w/index.php?title=Better_Call_Saul&oldid=1388234739"
  ],
  "notes": ""
 },
 {
  "id": "slippin-jimmy",
  "universe": "breaking-bad",
  "name": "Slippin' Jimmy (animated)",
  "short_name": "Slippin' Jimmy",
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
  "description": "Animated short-form spin-off; canonicity is not established on Wikipedia (one critic calls it non-canonical), so it is kept separate. Wikipedia: \"Better Call Saul Presents: Slippin' Jimmy … is an American animated short-form series and a spin-off of Better Call Saul … Noah Villaverde of /Film considered Slippin' Jimmy non-canonical to the Breaking Bad universe\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Slippin%27_Jimmy&oldid=1387250960"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "studio-not-stated",
  "label": "Studio not stated",
  "kind": "studio",
  "short_label": "Studio not stated",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "sony-pictures-television",
  "label": "Sony Pictures Television",
  "kind": "studio",
  "short_label": "Sony Pictures Television",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [
 {
  "id": "amc-plus",
  "label": "AMC+",
  "kind": "streaming",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["breaking-bad-main"];
