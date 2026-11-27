// Yellowstone: Dutton shows ordered by stated years; present-day shows follow.
// Generated from research (research-w2-a.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'yellowstone', name: "Yellowstone", short_name: "Yellowstone", order: 29, enabled: true,
  accent: { primary: '#8B5A2B', secondary: '#D9B26F' }, default_continuity: 'yellowstone-main', data_dir: 'yellowstone', last_verified: null,
  description: "Taylor Sheridan's Dutton family saga (Yellowstone, 1883, 1923 and spin-offs), plus Lawmen: Bass Reeves and The Madison, which Wikipedia now places outside it.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "yellowstone-main",
  "universe": "yellowstone",
  "name": "Yellowstone (Duttonverse)",
  "short_name": "Yellowstone",
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
  "description": "The Dutton-family franchise: Yellowstone, its prequels 1883 and 1923 (and the in-development 1944), and the sequel spin-offs Marshals and Dutton Ranch. Wikipedia: \"It follows the Dutton family over the years … It has since spun-off into several further television series that include two prequel series and two sequel series … The series serves as both a spin-off and sequel to Yellowstone (2018–2024) and is the fourth television series in the Yellowstone franchise.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Yellowstone_%28franchise%29&oldid=1383478941",
   "https://en.wikipedia.org/w/index.php?title=Marshals_%28TV_series%29&oldid=1388009917"
  ],
  "notes": ""
 },
 {
  "id": "lawmen-bass-reeves",
  "universe": "yellowstone",
  "name": "Lawmen: Bass Reeves (stand-alone)",
  "short_name": "Lawmen: Bass Reeves",
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
  "description": "Former 1883 spin-off, confirmed as no longer in the Yellowstone universe. The franchise article still calls it \"set in the greater Duttonverse\" (conflict noted). Wikipedia: \"It was initially described as a spinoff of the series 1883, itself a prequel to Yellowstone, but has since been confirmed to no longer take place in the Yellowstone universe.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Lawmen%3A_Bass_Reeves&oldid=1387229821",
   "https://en.wikipedia.org/w/index.php?title=Yellowstone_%28franchise%29&oldid=1383478941"
  ],
  "notes": ""
 },
 {
  "id": "the-madison",
  "universe": "yellowstone",
  "name": "The Madison (stand-alone)",
  "short_name": "The Madison",
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
  "description": "Developed as a Yellowstone sequel spin-off, then confirmed as a stand-alone series not connected to the franchise. Wikipedia: \"When the trailer for the series was released, Paramount+ announced that The Madison would actually be a stand-alone series not connected to the Yellowstone franchise.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Madison_%28TV_series%29&oldid=1387325558"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "studio-not-stated",
  "label": "Studio not stated",
  "kind": "studio",
  "short_label": "Studio not stated",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [
 {
  "id": "paramount-network",
  "label": "Paramount Network",
  "kind": "cable",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["yellowstone-main","lawmen-bass-reeves","the-madison"];
