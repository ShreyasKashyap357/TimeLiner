// Dhoom: release order; Dhoom 3 states 2013.
// Generated from research (research-w4-b.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'dhoom', name: "Dhoom", short_name: "Dhoom", order: 65, enabled: true,
  accent: { primary: '#212121', secondary: '#FF6F00' }, default_continuity: 'dhoom', data_dir: 'dhoom', last_verified: null,
  description: "The Dhoom films, one continuity with Jai and Ali throughout.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "dhoom",
  "universe": "dhoom",
  "name": "Dhoom",
  "short_name": "Dhoom",
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
  "description": "Yash Raj Films' Dhoom series: one continuity that follows police officers Jai Dixit and Ali Khan across all three films. Wikipedia: \"The series revolves around Assistant Commissioner of Police Jai Dixit (Abhishek Bachchan) and his sidekick Sub Inspector, later Inspector, Ali Akbar Fateh Khan (Uday Chopra), on missions to capture professional thieves. … Abhishek Bachchan and Uday Chopra reprise their roles as Jai Dixit and Ali Khan\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Dhoom_%28film_series%29&oldid=1378827983"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "yash-raj-films",
  "label": "Yash Raj Films",
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
export const SORT_BY_YEAR = ["dhoom"];
