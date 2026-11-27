// Fallout: one continuity; the series "is canon within the Fallout continuity".
// Generated from research (research-game-franchises.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'fallout', name: "Fallout", short_name: "Fallout", order: 17, enabled: true,
  accent: { primary: '#F5D547', secondary: '#3E8E41' }, default_continuity: 'fallout-main', data_dir: 'fallout', last_verified: null,
  description: "The Fallout games and the Prime Video series (canon to the games).", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "fallout-main",
  "universe": "fallout",
  "name": "Fallout (games and TV series)",
  "short_name": "Fallout",
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
  "description": "One shared continuity: the Interplay/Black Isle and Bethesda/Obsidian games and the Prime Video series, which is canon to the games. Wikipedia: \"The series is canon within the Fallout continuity. … The show is canonical to the games, with its 2296 setting, making it the furthest along the timeline in the franchise.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Fallout_%28American_TV_series%29&oldid=1387209073",
   "https://en.wikipedia.org/w/index.php?title=Fallout_%28franchise%29&oldid=1387626979"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "interplay-productions",
  "label": "Interplay Productions",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "black-isle-studios",
  "label": "Black Isle Studios",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "micro-forte",
  "label": "Micro Forte",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "bethesda-game-studios",
  "label": "Bethesda Game Studios",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "obsidian-entertainment",
  "label": "Obsidian Entertainment",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "kilter-films",
  "label": "Kilter Films",
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
  "id": "playstation-4",
  "label": "PlayStation 4",
  "kind": "game-platform",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["fallout-main"];
