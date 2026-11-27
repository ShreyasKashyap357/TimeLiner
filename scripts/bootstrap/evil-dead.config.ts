// Evil Dead: Ash films by stated or categorised years; the 2013 film and Rise separate.
// Generated from research (research-w6-b.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'evil-dead', name: "Evil Dead", short_name: "Evil Dead", order: 87, enabled: true,
  accent: { primary: '#33691E', secondary: '#B71C1C' }, default_continuity: 'evil-dead-ash', data_dir: 'evil-dead', last_verified: null,
  description: "The Ash trilogy with Ash vs Evil Dead, the 2013 soft reboot, and Evil Dead Rise with its sequel.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "evil-dead-ash",
  "universe": "evil-dead",
  "name": "Evil Dead (Ash Williams continuity)",
  "short_name": "Evil Dead",
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
  "description": "The Raimi trilogy and the Starz series, a direct sequel to it. Wikipedia: \"Evil Dead II … serves as a direct sequel to The Evil Dead, continuing from the events of its predecessor … in 2015, it was followed by the television series Ash vs Evil Dead, a direct sequel to the first three films.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Evil_Dead&oldid=1387526768",
   "https://en.wikipedia.org/w/index.php?title=Evil_Dead_II&oldid=1387215959"
  ],
  "notes": ""
 },
 {
  "id": "evil-dead-2013",
  "universe": "evil-dead",
  "name": "Evil Dead (2013)",
  "short_name": "Evil Dead",
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
  "description": "Soft reboot / \"standalone sequel\" following Mia Allen. Kept separate: Wikipedia files it under \"Standalone films\" and calls it a soft reboot, though it also says it is \"considered a continuation\". Wikipedia: \"Evil Dead is a standalone sequel to the previous three films. Unlike those films, it does not feature the character of Ash Williams in a major role; Ash appears only briefly in a post-credits scene. … It is considered a continuation of the franchise\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Evil_Dead&oldid=1387526768",
   "https://en.wikipedia.org/w/index.php?title=Evil_Dead_(2013_film)&oldid=1387654752"
  ],
  "notes": ""
 },
 {
  "id": "evil-dead-rise",
  "universe": "evil-dead",
  "name": "Evil Dead Rise / Burn",
  "short_name": "Evil Dead Rise / Burn",
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
  "description": "Evil Dead Rise and its sequel Evil Dead Burn, both under \"Standalone films\" in the franchise article. Wikipedia: \"It serves as a sequel to Evil Dead Rise (2023) and is the sixth installment in the Evil Dead film series.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Evil_Dead_Burn&oldid=1387494528",
   "https://en.wikipedia.org/w/index.php?title=Evil_Dead&oldid=1387526768"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
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
  "id": "rosebud-releasing-corporation",
  "label": "Rosebud Releasing Corporation",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
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
  "id": "studio-not-stated",
  "label": "Studio Not Stated",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "tristar-pictures",
  "label": "TriStar Pictures",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "warner-bros-pictures",
  "label": "Warner Bros. Pictures",
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
export const SORT_BY_YEAR = ["evil-dead-ash","evil-dead-2013","evil-dead-rise"];
