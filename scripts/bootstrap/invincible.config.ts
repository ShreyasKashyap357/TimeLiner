// Invincible: seasons in order; the Atom Eve special before season 2.
// Generated from research (research-w6-a.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'invincible', name: "Invincible", short_name: "Invincible", order: 83, enabled: true,
  accent: { primary: '#F9A825', secondary: '#1565C0' }, default_continuity: 'invincible-tv', data_dir: 'invincible', last_verified: null,
  description: "The Invincible animated series with the Atom Eve special, and the Image comic as a separate continuity.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "invincible-tv",
  "universe": "invincible",
  "name": "Invincible (Prime Video series)",
  "short_name": "Invincible",
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
  "description": "The Amazon animated series and its Atom Eve special. Wikipedia: \"The season was preceded by a special episode, called \"Invincible: Atom Eve\", which was released on July 21, 2023.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Invincible_season_2&oldid=1381422996",
   "https://en.wikipedia.org/w/index.php?title=Invincible_(TV_series)&oldid=1387224166"
  ],
  "notes": ""
 },
 {
  "id": "invincible-comic",
  "universe": "invincible",
  "name": "Invincible (Image comic)",
  "short_name": "Invincible",
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
  "description": "Robert Kirkman's Image/Skybound comic, separate from the series adaptation. Wikipedia: \"Invincible is an American comic book series written by Robert Kirkman, illustrated by Cory Walker and Ryan Ottley, and published by Image Comics. Set in the Image Universe\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Invincible_(comics)&oldid=1388177495"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "skybound-entertainment",
  "label": "Skybound Entertainment",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "image-comics",
  "label": "Image Comics",
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
export const SORT_BY_YEAR = ["invincible-tv","invincible-comic"];
