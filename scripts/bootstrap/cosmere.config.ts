// Cosmere: Sanderson's stated reading order across worlds; works with no sourced position follow in publication order (disputed).
// Generated from research (research-w2-d.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'cosmere', name: "Cosmere", short_name: "Cosmere", order: 38, enabled: true,
  accent: { primary: '#4A6FA5', secondary: '#C7A44A' }, default_continuity: 'cosmere', data_dir: 'cosmere', last_verified: null,
  description: "Brandon Sanderson's Cosmere books, grouped by world.", grouping_schemes: [{"id":"sub-series","label":"World","parent_scheme":null,"values":[{"id":"sel","label":"Sel","order":1,"parent":null},{"id":"scadrial","label":"Scadrial","order":2,"parent":null},{"id":"nalthis","label":"Nalthis","order":3,"parent":null},{"id":"roshar","label":"Roshar","order":4,"parent":null},{"id":"taldain","label":"Taldain","order":5,"parent":null},{"id":"threnody","label":"Threnody","order":6,"parent":null},{"id":"first-of-the-sun","label":"First of the Sun","order":7,"parent":null},{"id":"lumar","label":"Lumar","order":8,"parent":null},{"id":"komashi","label":"Komashi","order":9,"parent":null},{"id":"canticle","label":"Canticle","order":10,"parent":null},{"id":"multiple","label":"Multiple worlds","order":11,"parent":null}]}],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "cosmere",
  "universe": "cosmere",
  "name": "Cosmere",
  "short_name": "Cosmere",
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
  "grouping_schemes": [
   "sub-series"
  ],
  "alt_orders": [],
  "description": "One shared universe across Sanderson's Cosmere books. In-universe years are never given; order is relative and built from Sanderson's own confirmed chronology plus within-series statements on Wikipedia. Wikipedia: \"\"The Cosmere is the name of the universe in which Elantris, Mistborn, Warbreaker, The Stormlight Archive, White Sand, Tress of the Emerald Sea, Yumi and the Nightmare Painter, The Sunlit Man, Isles of the Emberdark, The Fires of December, and stories contained in Arcanum Unbounded: The Cosmere Collection are all set.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Brandon_Sanderson&oldid=1385401866"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "tor-books",
  "label": "Tor Books",
  "kind": "publisher",
  "short_label": "Tor Books",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "self-published",
  "label": "Self-published",
  "kind": "publisher",
  "short_label": "Self-published",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "tachyon-publications",
  "label": "Tachyon Publications",
  "kind": "publisher",
  "short_label": "Tachyon Publications",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "crafty-games",
  "label": "Crafty Games",
  "kind": "publisher",
  "short_label": "Crafty Games",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "dragonsteel-entertainment",
  "label": "Dragonsteel Entertainment",
  "kind": "publisher",
  "short_label": "Dragonsteel Entertainment",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "dynamite-entertainment",
  "label": "Dynamite Entertainment",
  "kind": "publisher",
  "short_label": "Dynamite Entertainment",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [
 {
  "id": "print-game-book",
  "label": "Print: role-playing game book",
  "kind": "print",
  "note": ""
 },
 {
  "id": "print-graphic-novel",
  "label": "Print: graphic novel",
  "kind": "print",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["cosmere"];
