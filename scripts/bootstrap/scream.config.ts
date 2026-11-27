// Scream: years worked out from the films' stated anniversaries.
// Generated from research (research-w6-b.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'scream', name: "Scream", short_name: "Scream", order: 85, enabled: true,
  accent: { primary: '#B71C1C', secondary: '#E0E0E0' }, default_continuity: 'scream-films', data_dir: 'scream', last_verified: null,
  description: "The seven Scream films (one continuity), the MTV series (not canon to the films) and its rebooted third season.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "scream-films",
  "universe": "scream",
  "name": "Scream (film series)",
  "short_name": "Scream",
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
  "description": "The seven theatrical films, one continuous storyline. Wikipedia: \"The film takes place eleven years after the previous film, and once again follows Sidney Prescott as she returns to Woodsboro … The plot takes place twenty-five years after the original Woodsboro murders from Scream (1996)\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Scream_(franchise)&oldid=1387759804",
   "https://en.wikipedia.org/w/index.php?title=Scream_(2022_film)&oldid=1386901427"
  ],
  "notes": ""
 },
 {
  "id": "scream-tv",
  "universe": "scream",
  "name": "Scream (MTV TV series, seasons 1–2)",
  "short_name": "Scream",
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
  "description": "MTV anthology series (Lakewood storyline), not canon to the films. Wikipedia: \"An anthology television series Scream, which followed new characters and settings and is not canon to the films, aired for three seasons from 2015 to 2016 on MTV and on VH1 in 2019.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Scream_(franchise)&oldid=1387759804",
   "https://en.wikipedia.org/w/index.php?title=Scream_(TV_series)&oldid=1388247846"
  ],
  "notes": ""
 },
 {
  "id": "scream-tv-resurrection",
  "universe": "scream",
  "name": "Scream: Resurrection (TV season 3)",
  "short_name": "Scream: Resurrection",
  "order": 3,
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
  "description": "Season 3 rebooted the TV series with a new cast, setting and timeline. Wikipedia: \"In April 2017, MTV announced that they were rebooting the series with the third season, with a new cast, setting, timeline, and production company.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Scream_(TV_series)&oldid=1388247846"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "dimension-films",
  "label": "Dimension Films",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "paramount-pictures",
  "label": "Paramount Pictures",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "studio-not-stated",
  "label": "Studio Not Stated",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [
 {
  "id": "mtv",
  "label": "MTV",
  "kind": "cable",
  "note": ""
 },
 {
  "id": "vh1",
  "label": "VH1",
  "kind": "cable",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["scream-films","scream-tv","scream-tv-resurrection"];
