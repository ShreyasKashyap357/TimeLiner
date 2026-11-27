// Dragon Ball: Age years from the guidebooks via the Dragon Ball Wiki (inferred).
// Generated from research (research-w3-c.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'dragon-ball', name: "Dragon Ball", short_name: "Dragon Ball", order: 56, enabled: true,
  accent: { primary: '#F57C00', secondary: '#1565C0' }, default_continuity: 'dragon-ball-main', data_dir: 'dragon-ball', last_verified: null,
  description: "Dragon Ball, Z, Super and Daima with the canon films on the Age calendar; GT, the re-edits, the non-canon films and Dragonball Evolution separately.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "dragon-ball-main",
  "universe": "dragon-ball",
  "name": "Dragon Ball main continuity",
  "short_name": "Dragon Ball main continuity",
  "order": 1,
  "kind": "shared",
  "calendar": {
   "kind": "era",
   "label_position": "before",
   "pad": 0,
   "before_label": "Age",
   "after_label": "Age",
   "has_year_zero": true,
   "note": "\"Age\" years from the Dragon Ball guidebooks (via the Dragon Ball Wiki). Dragon Ball begins in Age 749."
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
  "description": "Dragon Ball, Dragon Ball Z (and its re-edit Kai), Daima, Super, and the four Toriyama-involved films (Battle of Gods, Resurrection 'F', Broly, Super Hero). Age calendar (\"Age 749\"); years from the Dragon Ball Wiki timeline (fan wiki, compiled from guidebooks and games), so inferred. Stored as plain numbers (Age 749 = 749). Wikipedia: \"Dragon Ball (1986–89), Dragon Ball Z (1989–96), Dragon Ball Super (2015–18) and Dragon Ball Daima (2024–25) are set in a uniform main continuity,[citation needed] … Battle of Gods and Resurrection 'F' were remade into the first and second arcs of the Dragon Ball Super anime, which told the same stories as the two films in expanded detail. … Two sequel films were released: Broly (2018) and Super He\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884",
   "https://en.wikipedia.org/w/index.php?title=Dragon_Ball_Super_%28TV_series%29&oldid=1380689066",
   "https://dragonball.fandom.com/wiki/Dragon_Ball_Timeline?oldid=2276711"
  ],
  "notes": "The Wikipedia continuity sentence carries a [citation needed] tag (September 2026)."
 },
 {
  "id": "dragon-ball-gt",
  "universe": "dragon-ball",
  "name": "Dragon Ball GT (alternate continuity)",
  "short_name": "Dragon Ball GT",
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
  "description": "Anime-only sequel to Z. Treated as its own continuity because Super/Daima continue from Z instead. Age calendar (\"Age 749\"); years from the Dragon Ball Wiki timeline (fan wiki, compiled from guidebooks and games), so inferred. Stored as plain numbers (Age 749 = 749). Wikipedia: \"… while Dragon Ball GT (1996–97) and Super Dragon Ball Heroes (2018–24) explore several alternate continuities.[citation needed] … [GT article] Chronologically, it is the last Dragon Ball series (taking place after Dragon Ball Z) and until the release of Dragon Ball Super (2015–2018), GT was the final televised series of the original Dragon Ball anime trilogy.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884",
   "https://en.wikipedia.org/w/index.php?title=Dragon_Ball_GT&oldid=1384719369"
  ],
  "notes": "Wikipedia does not say in so many words that Super \"supersedes\" GT; the Dragon Ball article calls GT an alternate continuity (citation needed), while the GT article only says it takes place after Z. Separate continuity is the default used; GT branches from the end of Z."
 },
 {
  "id": "dragon-ball-noncanon-films",
  "universe": "dragon-ball",
  "name": "Dragon Ball non-canon films (1986–1996)",
  "short_name": "Dragon Ball non-canon films",
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
  "description": "The 17 older animated films (Curse of the Blood Rubies to The Path to Power), mostly alternate retellings or side stories. Ordered by Japanese release. Wikipedia: \"These films are also mostly alternate re-tellings of certain story arcs (like The Path to Power), or extra side-stories that do not correlate with the continuity of the series.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884",
   "https://en.wikipedia.org/w/index.php?title=List_of_Dragon_Ball_films&oldid=1379441084"
  ],
  "notes": ""
 },
 {
  "id": "dragonball-evolution",
  "universe": "dragon-ball",
  "name": "Dragonball Evolution (2009 live-action)",
  "short_name": "Dragonball Evolution",
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
  "description": "20th Century Fox live-action adaptation. Wikipedia: \"The film only vaguely adapted elements from the franchise … the result was a movie, I couldn't even call Dragon Ball\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=List_of_Dragon_Ball_films&oldid=1379441084",
   "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884"
  ],
  "notes": ""
 },
 {
  "id": "dragon-ball-reedits",
  "universe": "dragon-ball",
  "name": "Dragon Ball re-edits (Kai, Super: Beerus)",
  "short_name": "Dragon Ball re-edits",
  "order": 5,
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
  "description": "Re-edited versions of earlier series. They retell Dragon Ball Z and Dragon Ball Super, so they are kept apart from the main story order to avoid listing the same events twice. Wikipedia: \"Toei Animation announcing that it would broadcast a re-edited and remastered version of the Dragon Ball Z anime under the name Dragon Ball Kai\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "toei-animation",
  "label": "Toei Animation",
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
export const SORT_BY_YEAR = ["dragon-ball-main","dragon-ball-gt","dragon-ball-noncanon-films","dragonball-evolution","dragon-ball-reedits"];
