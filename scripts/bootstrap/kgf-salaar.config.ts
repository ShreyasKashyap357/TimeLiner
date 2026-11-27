// KGF: 1951 to 1981 as stated; Salaar separate.
// Generated from research (research-w4-b.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'kgf-salaar', name: "KGF & Salaar", short_name: "KGF & Salaar", order: 63, enabled: true,
  accent: { primary: '#3E2723', secondary: '#FFB300' }, default_continuity: 'kgf', data_dir: 'kgf-salaar', last_verified: null,
  description: "Prashanth Neel's KGF films and Salaar, kept as separate continuities (no source says they share a universe).", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "kgf",
  "universe": "kgf-salaar",
  "name": "KGF",
  "short_name": "KGF",
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
  "description": "Prashanth Neel's KGF film series (Chapter 1 and Chapter 2), set in the Kolar Gold Fields from 1951 to 1981, with a present-day frame narration. Wikipedia: \"KGF is an Indian Kannada-language period action film series set mostly in the Kolar Gold Fields, which gives the series its name, created by Prashanth Neel and produced by Hombale Films\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=KGF_%28film_series%29&oldid=1388018186"
  ],
  "notes": ""
 },
 {
  "id": "salaar",
  "universe": "kgf-salaar",
  "name": "Salaar",
  "short_name": "Salaar",
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
  "description": "Salaar: Part 1 – Ceasefire (Part 2 not yet released). Kept separate from KGF: Wikipedia does not state that the films share a universe. Wikipedia: \"The film's initial storyline was pitched from Neel's 2014 Kannada-language debut film Ugramm and is the maiden part of a two-part film.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Salaar%3A_Part_1_%E2%80%93_Ceasefire&oldid=1387749777"
  ],
  "notes": "Shared-universe speculation is not recorded as fact on Wikipedia. The closest statements are producer Vijay Kiragandur's ambition in the KGF series article (\"Going forward, we are going to create a Marvel kind of universe. We want to bring different characters from different movies and create something like Doctor Strange.\") and the Salaar article's reception note on \"similarities with Ugramm and KGF\". Neither says the films share a continuity, so they are not merged and no link is recorded."
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "hombale-films",
  "label": "Hombale Films",
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
export const SORT_BY_YEAR = ["kgf","salaar"];
