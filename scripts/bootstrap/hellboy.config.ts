// Hellboy: each film series separate; years where stated.
// Generated from research (research-w6-a.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'hellboy', name: "Hellboy", short_name: "Hellboy", order: 84, enabled: true,
  accent: { primary: '#C62828', secondary: '#424242' }, default_continuity: 'hellboy-del-toro', data_dir: 'hellboy', last_verified: null,
  description: "Guillermo del Toro's Hellboy films, the 2019 reboot, The Crooked Man (2024), and the animated films, each its own continuity.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "hellboy-del-toro",
  "universe": "hellboy",
  "name": "Hellboy (Guillermo del Toro films)",
  "short_name": "Hellboy",
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
  "description": "Hellboy (2004) and its sequel Hellboy II: The Golden Army (2008). Wikipedia: \"In the present day, [efn: A year after the events depicted in Hellboy] Nuada begins gathering the pieces of the crown. … The franchise was rebooted in 2019\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Hellboy_II%3A_The_Golden_Army&oldid=1384982074"
  ],
  "notes": ""
 },
 {
  "id": "hellboy-2019",
  "universe": "hellboy",
  "name": "Hellboy (2019 reboot)",
  "short_name": "Hellboy",
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
  "description": "The Neil Marshall reboot. Wikipedia: \"The franchise was rebooted in 2019, with a new film simply titled Hellboy, and was released by Lionsgate.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Hellboy_II%3A_The_Golden_Army&oldid=1384982074"
  ],
  "notes": ""
 },
 {
  "id": "hellboy-crooked-man",
  "universe": "hellboy",
  "name": "Hellboy: The Crooked Man (2024 reboot)",
  "short_name": "Hellboy: The Crooked Man",
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
  "description": "Second reboot of the live-action film series. Wikipedia: \"it is the second reboot of the Hellboy film series and is the fourth live-action entry in the franchise.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Hellboy%3A_The_Crooked_Man&oldid=1387891566"
  ],
  "notes": ""
 },
 {
  "id": "hellboy-animated",
  "universe": "hellboy",
  "name": "Hellboy Animated",
  "short_name": "Hellboy Animated",
  "order": 4,
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
  "description": "The two Cartoon Network animated films. No source examined merges them with the live-action films. Wikipedia: \"Hellboy: Sword of Storms was released on DVD on October 28, 2006, and aired later that year on Cartoon Network. … It first aired on March 10, 2007 on Cartoon Network\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Hellboy%3A_Sword_of_Storms&oldid=1371800092",
   "https://en.wikipedia.org/w/index.php?title=Hellboy%3A_Blood_and_Iron&oldid=1361589323"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "revolution-studios",
  "label": "Revolution Studios",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "relativity-media",
  "label": "Relativity Media",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "millennium-media",
  "label": "Millennium Media",
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
export const PLATFORMS: Platform[] = [];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["hellboy-del-toro","hellboy-2019","hellboy-crooked-man","hellboy-animated"];
