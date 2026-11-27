// Jurassic Park: years worked back from Rebirth's stated 2027 and each film's 'N years after' (inferred).
// Generated from research (research-w5-a.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'jurassic-park', name: "Jurassic Park", short_name: "Jurassic Park", order: 78, enabled: true,
  accent: { primary: '#2E7D32', secondary: '#F9A825' }, default_continuity: 'jp-screen', data_dir: 'jurassic-park', last_verified: null,
  description: "The Jurassic Park and Jurassic World films with the canon animated series, and Michael Crichton's novels as a separate continuity.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "jp-screen",
  "universe": "jurassic-park",
  "name": "Jurassic Park / Jurassic World (films and animated series)",
  "short_name": "Jurassic Park / Jurassic World",
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
  "description": "The seven feature films, the short Battle at Big Rock, and the Netflix animated series Camp Cretaceous and Chaos Theory, which the franchise article places \"during the Jurassic World trilogy\". Wikipedia: \"DreamWorks Animation also produced two animated series for Netflix, Jurassic World Camp Cretaceous (2020–2022) and Jurassic World: Chaos Theory (2024–2025), both set during the Jurassic World trilogy.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Jurassic_Park_(franchise)&oldid=1388102810",
   "https://en.wikipedia.org/w/index.php?title=Jurassic_World&oldid=1388292504"
  ],
  "notes": ""
 },
 {
  "id": "jp-novels",
  "universe": "jurassic-park",
  "name": "Jurassic Park (Crichton novels)",
  "short_name": "Jurassic Park",
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
  "description": "Michael Crichton's two novels; a separate continuity from the films, which adapt them. Wikipedia: \"The book was successful, as was Steven Spielberg's 1993 film adaptation.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Jurassic_Park_(franchise)&oldid=1388102810"
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
 },
 {
  "id": "amblin-entertainment",
  "label": "Amblin Entertainment",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "alfred-a-knopf",
  "label": "Alfred A. Knopf",
  "kind": "publisher",
  "short_label": "Alfred A. Knopf",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["jp-screen","jp-novels"];
