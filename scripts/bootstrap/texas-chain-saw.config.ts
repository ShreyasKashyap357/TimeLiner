// Texas Chain Saw: each continuity separate, linked to the 1974 film.
// Generated from research (research-w6-b.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'texas-chain-saw', name: "The Texas Chain Saw Massacre", short_name: "Texas Chain Saw Massacre", order: 89, enabled: true,
  accent: { primary: '#4E342E', secondary: '#FF7043' }, default_continuity: 'tcm-original', data_dir: 'texas-chain-saw', last_verified: null,
  description: "The four Texas Chainsaw continuities as Wikipedia lays them out: the original sequels, the Platinum Dunes remake and prequel, the Millennium films, and the 2022 direct sequel.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "tcm-original",
  "universe": "texas-chain-saw",
  "name": "Original continuity",
  "short_name": "Original continuity",
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
  "description": "The 1974 film and its first three sequels, as grouped by the franchise article. The later alternate continuities each also follow the 1974 film; that is recorded as links, not shared ordering. Wikipedia: \"Original continuity: The Texas Chain Saw Massacre (1974) | The Texas Chainsaw Massacre 2 (1986) | Leatherface: The Texas Chainsaw Massacre III (1990) | The Return of the Texas Chainsaw Massacre\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Texas_Chainsaw_Massacre_(franchise)&oldid=1385727224"
  ],
  "notes": ""
 },
 {
  "id": "tcm-platinum-dunes",
  "universe": "texas-chain-saw",
  "name": "Platinum Dunes' remake continuity",
  "short_name": "Platinum Dunes' remake continuity",
  "order": 2,
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
  "description": "2003 remake and its 2006 prequel. Wikipedia: \"Platinum Dunes' remake continuity: The Texas Chainsaw Massacre: The Beginning (2006) | The Texas Chainsaw Massacre (2003)\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Texas_Chainsaw_Massacre_(franchise)&oldid=1385727224"
  ],
  "notes": ""
 },
 {
  "id": "tcm-millennium",
  "universe": "texas-chain-saw",
  "name": "Millennium Films' alternate continuity",
  "short_name": "Millennium Films' alternate continuity",
  "order": 3,
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
  "description": "Leatherface (2017) and Texas Chainsaw 3D (2013), both following the 1974 film. Wikipedia: \"Millennium Films' alternate continuity: Leatherface (2017) | The Texas Chain Saw Massacre (1974) | Texas Chainsaw 3D (2013) … The seventh film, Texas Chainsaw 3D (2013), is a direct sequel to the original 1974 film, and makes no reference to the events of the other sequels.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Texas_Chainsaw_Massacre_(franchise)&oldid=1385727224"
  ],
  "notes": ""
 },
 {
  "id": "tcm-legendary",
  "universe": "texas-chain-saw",
  "name": "Legendary Pictures' alternate continuity",
  "short_name": "Legendary Pictures' alternate continuity",
  "order": 4,
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
  "description": "The 2022 Netflix film, a sequel to the 1974 film set fifty years later. Wikipedia: \"Legendary Pictures' alternate continuity: The Texas Chain Saw Massacre (1974) | Texas Chainsaw Massacre (2022) — The film is a sequel to The Texas Chain Saw Massacre (1974) set fifty years later. … The Texas Chainsaw Massacre 2 and Texas Chainsaw Massacre (2022) are explicitly continuous with the original 1974 film, though not necessarily with one another.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Texas_Chainsaw_Massacre_(franchise)&oldid=1385727224",
   "https://en.wikipedia.org/w/index.php?title=Texas_Chainsaw_Massacre_(2022_film)&oldid=1385857493"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "bryanston-distributing-company",
  "label": "Bryanston Distributing Company",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "cannon-releasing",
  "label": "Cannon Releasing",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "new-line-cinema",
  "label": "New Line Cinema",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "cfp-distribution",
  "label": "CFP Distribution",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "lionsgate",
  "label": "Lionsgate",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "netflix",
  "label": "Netflix",
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
export const SORT_BY_YEAR = ["tcm-original","tcm-platinum-dunes","tcm-millennium","tcm-legendary"];
