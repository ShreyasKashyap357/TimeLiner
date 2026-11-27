// Maddock: order from the films' post-credit links; no years are stated.
// Generated from research (research-w4-a.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'maddock-horror-comedy', name: "Maddock Horror Comedy Universe", short_name: "Maddock Horror Comedy Universe", order: 69, enabled: true,
  accent: { primary: '#1B5E20', secondary: '#E65100' }, default_continuity: 'mhcu-main', data_dir: 'maddock-horror-comedy', last_verified: null,
  description: "Maddock Films' connected horror comedies: Stree, Bhediya, Munjya, Stree 2, Thamma.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "mhcu-main",
  "universe": "maddock-horror-comedy",
  "name": "Maddock Horror Comedy Universe",
  "short_name": "Maddock Horror Comedy Universe",
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
  "description": "Maddock Films' shared universe of Hindi horror comedies based on Indian folklore. No in-universe years are sourced for the present-day stories. Order comes from cross-film references in the plot summaries. Wikipedia: \"The universe-building began with Bhediya, in which characters from Stree appeared. This was followed by Munjya, where characters from Bhediya and Stree appeared. Stree 2 continued by featuring characters from Bhediya. Thamma features cameos from Bhediya, Stree, Munjya, and Stree 2, making Thamma the central link connecting all five films.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Maddock_Horror_Comedy_Universe&oldid=1388026456"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "jio-studios",
  "label": "Jio Studios",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "maddock-films",
  "label": "Maddock Films",
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
export const SORT_BY_YEAR = ["mhcu-main"];
