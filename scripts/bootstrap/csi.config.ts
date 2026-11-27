// CSI: seasons in premiere order across the shared shows (no source gives story years; order inferred from airing).
// Generated from research (research-w2-e.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'csi', name: "CSI", short_name: "CSI", order: 26, enabled: true,
  accent: { primary: '#00A3A3', secondary: '#B0BEC5' }, default_continuity: 'csi-main', data_dir: 'csi', last_verified: null,
  description: "CSI and its spin-offs (Miami, NY, Cyber, Vegas) in one shared continuity.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "csi-main",
  "universe": "csi",
  "name": "CSI (shared universe)",
  "short_name": "CSI",
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
  "description": "CSI with its spin-offs and revival, handed on via crossover pilots. Wikipedia: \"Between the series the baton is passed to the new CSI series via a crossover/pilot where cases are overlapped and personnel are shared.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=CSI_%28franchise%29&oldid=1386814174"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "jerry-bruckheimer-television",
  "label": "Jerry Bruckheimer Television",
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
export const SORT_BY_YEAR = ["csi-main"];
