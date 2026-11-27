// Gundam. Each timeline (calendar) is its own continuity, never merged; GQuuuuuuX's alternate U.C. is separate from the U.C.
// Generated from research (research-gundam.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'gundam', name: "Gundam", short_name: "Gundam", order: 15, enabled: true,
  accent: { primary: '#E94F4F', secondary: '#2E6FD8' }, default_continuity: 'gundam-uc', data_dir: 'gundam', last_verified: null,
  description: "Mobile Suit Gundam across its separate timelines: Universal Century, Future Century, After Colony, Cosmic Era, Anno Domini, Post Disaster, Ad Stella and more.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "gundam-uc",
  "universe": "gundam",
  "name": "Universal Century",
  "short_name": "Universal Century",
  "order": 1,
  "kind": "shared",
  "calendar": {
   "kind": "era",
   "before_label": "before U.C.",
   "after_label": "U.C.",
   "has_year_zero": true,
   "note": "",
   "label_position": "before",
   "pad": 4
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
  "description": "Original Gundam timeline (1979 series onward). Years written U.C. 00xx. Wikipedia: \"The largest of these continuities is the Universal Century (UC), which began with the original show from 1979.\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/wikipedia%3AGundam%401384630646"
  ],
  "notes": ""
 },
 {
  "id": "gundam-gquuuuuux",
  "universe": "gundam",
  "name": "Universal Century (GQuuuuuuX alternate)",
  "short_name": "Universal Century",
  "order": 2,
  "kind": "shared",
  "calendar": {
   "kind": "era",
   "before_label": "before U.C.",
   "after_label": "U.C.",
   "has_year_zero": true,
   "note": "",
   "label_position": "before",
   "pad": 4
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
  "description": "Divergent alternate U.C. in which Zeon won the One Year War. Same calendar as U.C. but must not share ordering with the main U.C. (never merge). Wikipedia: \"The series is set in an alternate version of the Universal Century timeline, which diverges from the original Mobile Suit Gundam series' continuity, as Char Aznable seizes the RX-78-02 White Gundam alongside the Pegasus class ship White Base during his assault on Side 7.\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/wikipedia%3AMobile_Suit_Gundam_GQuuuuuuX%401387562008"
  ],
  "notes": ""
 },
 {
  "id": "gundam-fc",
  "universe": "gundam",
  "name": "Future Century",
  "short_name": "Future Century",
  "order": 3,
  "kind": "shared",
  "calendar": {
   "kind": "era",
   "before_label": "before F.C.",
   "after_label": "F.C.",
   "has_year_zero": true,
   "note": "",
   "label_position": "before",
   "pad": 0
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
  "description": "G Gundam's Gundam Fight world. Wikipedia: \"Unlike previous series in the Gundam franchise which are set in the \"Universal Century\" timeline, Mobile Fighter G Gundam takes place in an alternate \"Future Century\" universe.\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/wikipedia%3AMobile_Fighter_G_Gundam%401386317761"
  ],
  "notes": ""
 },
 {
  "id": "gundam-ac",
  "universe": "gundam",
  "name": "After Colony",
  "short_name": "After Colony",
  "order": 4,
  "kind": "shared",
  "calendar": {
   "kind": "era",
   "before_label": "before A.C.",
   "after_label": "A.C.",
   "has_year_zero": true,
   "note": "",
   "label_position": "before",
   "pad": 0
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
  "description": "Gundam Wing and Endless Waltz. Wikipedia: \"It is the sixth installment in the Gundam franchise, taking place in the \"After Colony\" timeline.\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/wikipedia%3AMobile_Suit_Gundam_Wing%401387097820"
  ],
  "notes": ""
 },
 {
  "id": "gundam-aw",
  "universe": "gundam",
  "name": "After War",
  "short_name": "After War",
  "order": 5,
  "kind": "shared",
  "calendar": {
   "kind": "era",
   "before_label": "before A.W.",
   "after_label": "A.W.",
   "has_year_zero": true,
   "note": "",
   "label_position": "before",
   "pad": 0
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
  "description": "Post-apocalyptic Gundam X timeline. Wikipedia: \"... but takes place in an alternate timeline called After War\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/wikipedia%3AAfter_War_Gundam_X%401381775591"
  ],
  "notes": ""
 },
 {
  "id": "gundam-cc",
  "universe": "gundam",
  "name": "Correct Century",
  "short_name": "Correct Century",
  "order": 6,
  "kind": "shared",
  "calendar": {
   "kind": "era",
   "before_label": "before C.C.",
   "after_label": "C.C.",
   "has_year_zero": true,
   "note": "",
   "label_position": "before",
   "pad": 0
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
  "description": "Turn A Gundam. Its 'Dark History' implies earlier series are its distant past; kept as its own continuity (links only). Wikipedia: \"Turn A Gundam takes place in the year Correct Century 2345 ... in a different calendar era than the previous Gundam projects.\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/wikipedia%3ATurn_A_Gundam%401385690287"
  ],
  "notes": ""
 },
 {
  "id": "gundam-ce",
  "universe": "gundam",
  "name": "Cosmic Era",
  "short_name": "Cosmic Era",
  "order": 7,
  "kind": "shared",
  "calendar": {
   "kind": "era",
   "before_label": "before C.E.",
   "after_label": "C.E.",
   "has_year_zero": true,
   "note": "",
   "label_position": "before",
   "pad": 0
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
  "description": "Gundam SEED timeline (Naturals vs Coordinators). Wikipedia: \"The series is the first of the Gundam franchise set in the \"Cosmic Era\" in which mankind is divided between normal Earth dwelling humans, known as \"Naturals\", and the genetically altered super-humans known as \"Coordinators\".\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/wikipedia%3AMobile_Suit_Gundam_SEED%401383999927"
  ],
  "notes": ""
 },
 {
  "id": "gundam-ad",
  "universe": "gundam",
  "name": "Anno Domini (Gundam 00)",
  "short_name": "Anno Domini",
  "order": 8,
  "kind": "shared",
  "calendar": {
   "kind": "era",
   "before_label": "before AD",
   "after_label": "AD",
   "has_year_zero": true,
   "note": "",
   "label_position": "after",
   "pad": 0
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
  "description": "Gundam 00; uses the real-world Gregorian AD calendar but is its own continuity. Wikipedia: \"Unlike the previous installments, the timeline that the series takes place in corresponds to the real life Gregorian calendar, in this case Anno Domini (AD).\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/wikipedia%3AMobile_Suit_Gundam_00%401380241767"
  ],
  "notes": ""
 },
 {
  "id": "gundam-ag",
  "universe": "gundam",
  "name": "Advanced Generation",
  "short_name": "Advanced Generation",
  "order": 9,
  "kind": "shared",
  "calendar": {
   "kind": "era",
   "before_label": "before A.G.",
   "after_label": "A.G.",
   "has_year_zero": true,
   "note": "",
   "label_position": "before",
   "pad": 0
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
  "description": "Gundam AGE (three generations of pilots). Wikipedia: \"In A.G. 101 (the 101st year of the Advanced Generation calendar) a mysterious entity known at the time only as \"UE\" ... attacks and destroys the space colony Angel.\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/wikipedia%3AMobile_Suit_Gundam_AGE%401386986073"
  ],
  "notes": ""
 },
 {
  "id": "gundam-pd",
  "universe": "gundam",
  "name": "Post Disaster",
  "short_name": "Post Disaster",
  "order": 10,
  "kind": "shared",
  "calendar": {
   "kind": "era",
   "before_label": "before P.D.",
   "after_label": "P.D.",
   "has_year_zero": true,
   "note": "",
   "label_position": "before",
   "pad": 0
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
  "description": "Iron-Blooded Orphans. Wikipedia: \"It is the year 323 P.D. (Post Disaster), more than 300 years after a disastrous, interplanetary conflict known as the \"Calamity War\".\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/wikipedia%3AMobile_Suit_Gundam%3A_Iron-Blooded_Orphans%401384001309"
  ],
  "notes": ""
 },
 {
  "id": "gundam-rc",
  "universe": "gundam",
  "name": "Regild Century",
  "short_name": "Regild Century",
  "order": 11,
  "kind": "shared",
  "calendar": {
   "kind": "era",
   "before_label": "before R.C.",
   "after_label": "R.C.",
   "has_year_zero": true,
   "note": "",
   "label_position": "before",
   "pad": 0
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
  "description": "Reconguista in G; stated to follow the end of the U.C. (cross-continuity link only, no shared ordering). Wikipedia: \"In Regild Century 1014, 1,014 years after the end of the Universal Century, ...\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/wikipedia%3AGundam_Reconguista_in_G%401377364818"
  ],
  "notes": ""
 },
 {
  "id": "gundam-as",
  "universe": "gundam",
  "name": "Ad Stella",
  "short_name": "Ad Stella",
  "order": 12,
  "kind": "shared",
  "calendar": {
   "kind": "era",
   "before_label": "before A.S.",
   "after_label": "A.S.",
   "has_year_zero": true,
   "note": "",
   "label_position": "before",
   "pad": 0
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
  "description": "The Witch from Mercury. Wikipedia: \"The series is set in the new calendar system dubbed the Ad Stella (AS).\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/wikipedia%3AMobile_Suit_Gundam%3A_The_Witch_from_Mercury%401387953385"
  ],
  "notes": ""
 },
 {
  "id": "gundam-build",
  "universe": "gundam",
  "name": "Gundam Build series (standalone, real-world)",
  "short_name": "Gundam Build series",
  "order": 13,
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
  "description": "Gunpla-battle shows set in a contemporary/near-future real world where Gundam is fiction. Franchise table labels them 'Our Century', which is not a numbered calendar. Use calendar kind ordered-only. Wikipedia: \"The story is set in the same universe of the Gundam Build series in an online metaverse space ...\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/wikipedia%3AGundam_Build_Metaverse%401353643876"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "nippon-sunrise",
  "label": "Nippon Sunrise",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "sunrise",
  "label": "Sunrise",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "sunrise-did",
  "label": "Sunrise Did",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "studio-khara",
  "label": "Studio Khara",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "sunrise-beyond",
  "label": "Sunrise Beyond",
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
  "id": "nagoya-tv",
  "label": "nagoya-tv",
  "kind": "broadcast",
  "note": ""
 },
 {
  "id": "tv-asahi",
  "label": "tv-asahi",
  "kind": "broadcast",
  "note": ""
 },
 {
  "id": "theatrical-event-screenings",
  "label": "theatrical event screenings",
  "kind": "theatrical",
  "note": ""
 },
 {
  "id": "streaming",
  "label": "streaming",
  "kind": "streaming",
  "note": ""
 },
 {
  "id": "fuji-tv",
  "label": "fuji-tv",
  "kind": "broadcast",
  "note": ""
 },
 {
  "id": "mbs",
  "label": "mbs",
  "kind": "broadcast",
  "note": ""
 }
];
export const TAGS: Tag[] = [{"id":"amuro-ray","label":"Amuro Ray","kind":"character","aliases":[]},{"id":"char-aznable","label":"Char Aznable","kind":"character","aliases":[]},{"id":"kira-yamato","label":"Kira Yamato","kind":"character","aliases":[]},{"id":"setsuna-f-seiei","label":"Setsuna F. Seiei","kind":"character","aliases":[]}];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["gundam-uc","gundam-gquuuuuux","gundam-fc","gundam-ac","gundam-aw","gundam-cc","gundam-ce","gundam-ad","gundam-ag","gundam-pd","gundam-rc","gundam-as"];
