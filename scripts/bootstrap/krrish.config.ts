// Krrish: films in story order by the stated gaps.
// Generated from research (research-w4-b.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'krrish', name: "Krrish", short_name: "Krrish", order: 64, enabled: true,
  accent: { primary: '#1565C0', secondary: '#C62828' }, default_continuity: 'krrish-films', data_dir: 'krrish', last_verified: null,
  description: "Koi... Mil Gaya and the Krrish films, plus the Kid Krrish TV films and J Bole Toh Jadoo as separate continuities.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "krrish-films",
  "universe": "krrish",
  "name": "Krrish (films)",
  "short_name": "Krrish",
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
  "description": "Koi... Mil Gaya, Krrish and Krrish 3: one story across three generations of the Mehra family. No absolute in-universe years are given. Wikipedia: \"The film series covers the story of three generations of the Mehra family. … Although Koi... Mil Gaya was originally conceived as a stand-alone film, it is the first installment in the Krrish franchise.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Krrish_%28franchise%29&oldid=1379561670",
   "https://en.wikipedia.org/w/index.php?title=Koi..._Mil_Gaya&oldid=1387731442"
  ],
  "notes": ""
 },
 {
  "id": "krrish-kid",
  "universe": "krrish",
  "name": "Kid Krrish (animated TV films)",
  "short_name": "Kid Krrish",
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
  "description": "Animated Cartoon Network TV films \"based on\" Krrish. Wikipedia only says they are part of the franchise, not that they fit the film continuity. Wikipedia: \"The first film of the series, Kid Krrish was released on 2 October 2013 which is a part of Krrish franchise, with its three sequels\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Kid_Krrish&oldid=1376750888"
  ],
  "notes": ""
 },
 {
  "id": "krrish-jadoo",
  "universe": "krrish",
  "name": "J Bole Toh Jadoo (TV spin-off)",
  "short_name": "J Bole Toh Jadoo",
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
  "description": "Nickelodeon India animation/live-action series about Jadoo, \"based on\" Koi... Mil Gaya. Canon status not stated. Wikipedia: \"It is based on the movie Koi... Mil Gaya, which itself is part of Krrish franchise.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=J_Bole_Toh_Jadoo&oldid=1365833975"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "filmkraft-productions",
  "label": "Filmkraft Productions",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "toonz-animation",
  "label": "Toonz Animation",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "graphiti-multimedia",
  "label": "Graphiti Multimedia",
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
  "id": "nickelodeon-india",
  "label": "Nickelodeon (India)",
  "kind": "cable",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["krrish-films","krrish-kid","krrish-jadoo"];
