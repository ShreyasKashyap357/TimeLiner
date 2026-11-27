// Bhool Bhulaiyaa: standalone films; years where the films state them.
// Generated from research (research-w4-c.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'bhool-bhulaiyaa', name: "Bhool Bhulaiyaa", short_name: "Bhool Bhulaiyaa", order: 60, enabled: true,
  accent: { primary: '#6A1B9A', secondary: '#FFB300' }, default_continuity: 'manichitrathazhu', data_dir: 'bhool-bhulaiyaa', last_verified: null,
  description: "Bhool Bhulaiyaa (a remake of Manichitrathazhu) and its standalone sequels, each its own continuity.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "manichitrathazhu",
  "universe": "bhool-bhulaiyaa",
  "name": "Manichitrathazhu (Malayalam, 1993)",
  "short_name": "Manichitrathazhu",
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
  "description": "The Malayalam original. Bhool Bhulaiyaa (2007) is a remake of it, in its own continuity. Wikipedia: \"Manichitrathazhu was remade in four languages – in Kannada as Apthamitra (2004) … and in Hindi as Bhool Bhulaiyaa (2007)\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Manichitrathazhu&oldid=1388028701"
  ],
  "notes": ""
 },
 {
  "id": "bhool-bhulaiyaa-2007",
  "universe": "bhool-bhulaiyaa",
  "name": "Bhool Bhulaiyaa (2007)",
  "short_name": "Bhool Bhulaiyaa",
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
  "description": "Priyadarshan's Hindi remake of Manichitrathazhu. Wikipedia: \"It is a remake of the 1993 [[Malayalam]]-language film ''[[Manichitrathazhu]]''\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Bhool_Bhulaiyaa&oldid=1378827054"
  ],
  "notes": ""
 },
 {
  "id": "bhool-bhulaiyaa-2",
  "universe": "bhool-bhulaiyaa",
  "name": "Bhool Bhulaiyaa 2",
  "short_name": "Bhool Bhulaiyaa 2",
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
  "description": "A standalone sequel: new story and principal cast, with only Rajpal Yadav's Chhote Pandit rebooted. Wikipedia: \"The film spawned a [[standalone sequel]] titled ''[[Bhool Bhulaiyaa 2]]'' (2022) with a new principal cast and only Yadav returning in a reboot of his role. … It is a [[standalone sequel]] to the 2007 film ''[[Bhool Bhulaiyaa]]''.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Bhool_Bhulaiyaa&oldid=1378827054",
   "https://en.wikipedia.org/w/index.php?title=Bhool_Bhulaiyaa_2&oldid=1378915338"
  ],
  "notes": ""
 },
 {
  "id": "bhool-bhulaiyaa-3",
  "universe": "bhool-bhulaiyaa",
  "name": "Bhool Bhulaiyaa 3",
  "short_name": "Bhool Bhulaiyaa 3",
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
  "description": "A spiritual sequel, unrelated to the earlier films' stories. Kartik Aaryan's Ruhaan \"Rooh Baba\" Randhawa returns from Bhool Bhulaiyaa 2, and Vidya Balan plays \"an alternate version of her character\". It is a separate continuity because Wikipedia calls it unrelated; the Rooh Baba link is recorded as shares-characters. Wikipedia: \"The third part also serves as a spiritual sequel and is not related to the earlier films. … released in 2024 with Kartik Aaryan reprising his role as Rooh Baba from the sequel … A spiritual sequel, ''[[Bhool Bhulaiyaa 3]]'', starring Aaryan … was released on Diwali 2024.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Bhool_Bhulaiyaa&oldid=1378827054",
   "https://en.wikipedia.org/w/index.php?title=Bhool_Bhulaiyaa_2&oldid=1378915338"
  ],
  "notes": "Possibly disputed: Aaryan \"reprising his role as Rooh Baba from the sequel\" suggests a carried-over character, but \"not related to the earlier films\" means BB2 and BB3 are kept apart. Rooh Baba's introduction (\"Ruhaan, a conman posing as the ghostbuster\") reads as a reintroduction."
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "swargachitra-films",
  "label": "Swargachitra Films",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "t-series-films",
  "label": "T-Series Films",
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
export const SORT_BY_YEAR = ["manichitrathazhu","bhool-bhulaiyaa-2007","bhool-bhulaiyaa-2","bhool-bhulaiyaa-3"];
