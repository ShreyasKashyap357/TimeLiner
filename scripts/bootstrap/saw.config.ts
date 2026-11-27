// Saw: the franchise's story chronology table; no years.
// Generated from research (research-w6-b.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'saw', name: "Saw", short_name: "Saw", order: 86, enabled: true,
  accent: { primary: '#5D4037', secondary: '#C62828' }, default_continuity: 'saw-main', data_dir: 'saw', last_verified: null,
  description: "The Saw films in the franchise's stated story chronology (Saw X is set between Saw and Saw II).", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "saw-main",
  "universe": "saw",
  "name": "Saw",
  "short_name": "Saw",
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
  "description": "All ten films share one continuity; the franchise article gives a story chronology including Saw X and Spiral. Wikipedia: \"Saw story chronology: Saw (2004) | Saw X (2023) | Saw II (2005) | Saw III (2006) | Saw IV (2007) | Saw V (2008) | Saw VI (2009) | Saw 3D (2010) | Jigsaw (2017) | Spiral (2021) … Spiral takes place an unknown amount of time after John's death, as another Jigsaw copycat creates their own games\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Saw_(franchise)&oldid=1385887251",
   "https://en.wikipedia.org/w/index.php?title=Spiral_(2021_film)&oldid=1386762808"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "lionsgate-films",
  "label": "Lionsgate Films",
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
export const SORT_BY_YEAR = ["saw-main"];
