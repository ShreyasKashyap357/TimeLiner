// Universal Monsters: release order; crossovers linked.
// Generated from research (research-w6-b.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'universal-monsters', name: "Universal Monsters", short_name: "Universal Monsters", order: 90, enabled: true,
  accent: { primary: '#37474F', secondary: '#9E9E9E' }, default_continuity: 'universal-monsters-classic', data_dir: 'universal-monsters', last_verified: null,
  description: "Universal's classic monster films (1931–1955) with their stated sequels and crossovers.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "universal-monsters-classic",
  "universe": "universal-monsters",
  "name": "Universal Monsters (classic, 1931–1955)",
  "short_name": "Universal Monsters",
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
  "description": "Standalone collection of Universal's Dracula, Frankenstein, Mummy, Invisible Man and Wolf Man films with their sequels and crossovers. Several sub-series with loose, sometimes retconned links; ordered by release only. Wikipedia: \"Frankenstein Meets the Wolf Man … follows The Ghost of Frankenstein (1942) and The Wolf Man (1941), though with a number of retcons.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Frankenstein_Meets_the_Wolf_Man&oldid=1382324186"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "universal-pictures",
  "label": "Universal Pictures",
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
export const SORT_BY_YEAR = ["universal-monsters-classic"];
