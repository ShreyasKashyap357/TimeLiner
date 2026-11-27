// LCU: Wikipedia's timeline section (no official timeline exists, so inferred).
// Generated from research (research-w4-a.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'lcu', name: "Lokesh Cinematic Universe", short_name: "Lokesh Cinematic Universe", order: 67, enabled: true,
  accent: { primary: '#4E342E', secondary: '#FF8F00' }, default_continuity: 'lcu-main', data_dir: 'lcu', last_verified: null,
  description: "Lokesh Kanagaraj's connected Tamil films: Kaithi, Vikram and Leo.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "lcu-main",
  "universe": "lcu",
  "name": "Lokesh Cinematic Universe",
  "short_name": "Lokesh Cinematic Universe",
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
  "description": "Shared universe of Tamil-language action thrillers created by Lokesh Kanagaraj. Years come from the universe article's Timeline section, which says no official timeline exists. Wikipedia: \"The first film in the universe was Kaithi (2019), followed by Vikram (2022) and Leo (2023). It is set to continue with Benz, the first LCU film not to be directed by Lokesh, and Kaithi 2. … An official timeline has not been released by the makers, but the films indicate this.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Lokesh_Cinematic_Universe&oldid=1388025826"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "dream-warrior-pictures",
  "label": "Dream Warrior Pictures",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "raaj-kamal-films-international",
  "label": "Raaj Kamal Films International",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "seven-screen-studio",
  "label": "Seven Screen Studio",
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
export const SORT_BY_YEAR = ["lcu-main"];
