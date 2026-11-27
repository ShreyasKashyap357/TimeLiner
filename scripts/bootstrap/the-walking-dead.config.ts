// The Walking Dead: no source gives calendar years, so each continuity is in premiere order (inferred).
// Generated from research (research-w2-a.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'the-walking-dead', name: "The Walking Dead", short_name: "Walking Dead", order: 28, enabled: true,
  accent: { primary: '#8E1B1B', secondary: '#B8A66E' }, default_continuity: 'twd-tv', data_dir: 'the-walking-dead', last_verified: null,
  description: "The Walking Dead TV universe, the Image comic universe (with the Telltale and Overkill games), and the separate VR and Destinies games.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "twd-tv",
  "universe": "the-walking-dead",
  "name": "The Walking Dead (AMC television universe)",
  "short_name": "The Walking Dead",
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
  "description": "The AMC live-action shared universe: The Walking Dead, Fear the Walking Dead, World Beyond, Tales, Dead City, Daryl Dixon, The Ones Who Live, plus the TV-prequel game Survival Instinct. Wikipedia: \"The Walking Dead is an American zombie apocalypse media franchise centered on a number of television series based on the comic book of the same name. Set in one fictional shared universe, the franchise has developed into seven live-action television series … Survival Instinct: A first-person shooter which serves as a prequel to the main television series\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Walking_Dead_%28franchise%29&oldid=1388135749",
   "https://en.wikipedia.org/w/index.php?title=The_Walking_Dead%3A_Survival_Instinct&oldid=1387314481"
  ],
  "notes": ""
 },
 {
  "id": "twd-comic",
  "universe": "the-walking-dead",
  "name": "The Walking Dead (comic book universe)",
  "short_name": "The Walking Dead",
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
  "description": "The Image Comics series plus the games Wikipedia places in the comic universe: Telltale seasons 1–4 and Michonne, and Overkill's The Walking Dead. Wikipedia: \"The Walking Dead: From Telltale Games, a series of games which are set within the comic book universe … The game's events run concurrently to the comic … It is set in the same continuity of the comic book series … Despite being set in the comic series' universe, the game's four playable characters are original.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Walking_Dead_%28franchise%29&oldid=1388135749",
   "https://en.wikipedia.org/w/index.php?title=The_Walking_Dead_%28video_game_series%29&oldid=1384351517",
   "https://en.wikipedia.org/w/index.php?title=The_Walking_Dead%3A_The_Final_Season&oldid=1384387795",
   "https://en.wikipedia.org/w/index.php?title=Overkill%27s_The_Walking_Dead&oldid=1375995337"
  ],
  "notes": ""
 },
 {
  "id": "twd-saints-sinners",
  "universe": "the-walking-dead",
  "name": "The Walking Dead: Saints & Sinners (VR games)",
  "short_name": "The Walking Dead: Saints & Sinners",
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
  "description": "Skydance VR games set in a flooded New Orleans. Wikipedia only says they are \"based on\" the comic, not set in its continuity, so they stay separate. Wikipedia: \"It is based on the comic book series The Walking Dead by Robert Kirkman. … The game is set in the flooded New Orleans after an outbreak.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Walking_Dead%3A_Saints_%26_Sinners&oldid=1384351499"
  ],
  "notes": ""
 },
 {
  "id": "twd-destinies",
  "universe": "the-walking-dead",
  "name": "The Walking Dead: Destinies (alternate retelling)",
  "short_name": "The Walking Dead: Destinies",
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
  "description": "A choice-driven retelling of TV seasons 1–4 where outcomes can differ from the show, so it is not part of TV canon. Wikipedia: \"A third-person, narrative-driven action-adventure game in which the player can reshape the story of the first four seasons of the main series through their actions. … potentially differing from how things played out on the show.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Walking_Dead_%28franchise%29&oldid=1388135749"
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
 },
 {
  "id": "terminal-reality",
  "label": "Terminal Reality",
  "kind": "studio",
  "short_label": "Terminal Reality",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "image-comics",
  "label": "Image Comics",
  "kind": "publisher",
  "short_label": "Image Comics",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "telltale-games",
  "label": "Telltale Games",
  "kind": "studio",
  "short_label": "Telltale Games",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "overkill-software",
  "label": "Overkill Software",
  "kind": "studio",
  "short_label": "Overkill Software",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "skydance-interactive",
  "label": "Skydance Interactive",
  "kind": "studio",
  "short_label": "Skydance Interactive",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "flux-games",
  "label": "Flux Games",
  "kind": "studio",
  "short_label": "Flux Games",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [
 {
  "id": "print-comic",
  "label": "Print: comic issues",
  "kind": "print",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["twd-tv","twd-comic","twd-saints-sinners","twd-destinies"];
