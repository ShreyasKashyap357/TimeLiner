// Ultraman: each continuity in stated or broadcast order; series with no stated link stand alone.
// Generated from research (research-w3-e.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'ultraman', name: "Ultraman", short_name: "Ultraman", order: 43, enabled: true,
  accent: { primary: '#D7263D', secondary: '#C0C7CF' }, default_continuity: 'ultra-showa', data_dir: 'ultraman', last_verified: null,
  description: "Tsuburaya's Ultraman TV series from Ultra Q (1966) on, with Shin Ultraman and Ultraman: Rising. Showa is one shared continuity; most later series stand alone.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "ultra-showa",
  "universe": "ultraman",
  "name": "Ultraman: Showa continuity (Land of Light)",
  "short_name": "Ultraman: Showa continuity",
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
  "description": "The shared Showa-era continuity: Ultra Q through Ultraman 80, plus Ultraman Mebius (2006), which is set in the same world 40 years after Ultraman. Wikipedia: \"Prior to the series' release, Ultra Q, Ultraman, and Ultraseven were stand-alone titles however, Return of Ultraman is the first installment to unite the first three shows into an interconnected universe. … Following the end of the 1979-80 anime The Ultraman, Ultraman 80 returns to the setting of the main Showa continuity, taking place after 5 years of peace since the end of Ultraman Leo. … The se\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Return_of_Ultraman&oldid=1373718198",
   "https://en.wikipedia.org/w/index.php?title=Ultraman_80&oldid=1385321309",
   "https://en.wikipedia.org/w/index.php?title=Ultraman_Mebius&oldid=1376335202"
  ],
  "notes": ""
 },
 {
  "id": "ultra-tiga-dyna",
  "universe": "ultraman",
  "name": "Ultraman Tiga and Dyna",
  "short_name": "Ultraman Tiga and Dyna",
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
  "description": "Tiga is set in a universe separate from the Showa series; Dyna is its direct sequel. Wikipedia: \"It was broadcast after a franchise hiatus of over 15 years, set in a universe different from all previous series and updated with a new look and feel. … It is a direct sequel to the previous Ultraman series, Ultraman Tiga and the ninth entry (thirteenth overall) to the Ultra Series.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraman_Tiga&oldid=1381486668",
   "https://en.wikipedia.org/w/index.php?title=Ultraman_Dyna&oldid=1375414475"
  ],
  "notes": ""
 },
 {
  "id": "ultra-gaia",
  "universe": "ultraman",
  "name": "Ultraman Gaia",
  "short_name": "Ultraman Gaia",
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
  "description": "Its own universe, separate from both the Showa and Tiga/Dyna worlds. Wikipedia: \"Ultraman Gaia takes place in yet another universe, one that is different from the world of the Shōwa era Ultramen (Ultraman to Ultraman 80), as well as the world of Ultraman Tiga and Ultraman Dyna.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraman_Gaia&oldid=1377844737"
  ],
  "notes": ""
 },
 {
  "id": "ultra-neos",
  "universe": "ultraman",
  "name": "Ultraman Neos",
  "short_name": "Ultraman Neos",
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
  "description": "Set in an alternate universe (stated). Wikipedia: \"In spite of the appearance of similar designs and a cameo by Zoffy, the series is set in an alternate universe.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraman_Neos&oldid=1374297767"
  ],
  "notes": ""
 },
 {
  "id": "ultra-cosmos",
  "universe": "ultraman",
  "name": "Ultraman Cosmos",
  "short_name": "Ultraman Cosmos",
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
  "description": "Wikipedia does not place this series in a shared continuity with any other Ultra series; it is kept separate under the never-merge rule. The film Ultraman Cosmos: The First Contact is its prequel (not included). Wikipedia: \"Ultraman Cosmos is a Japanese tokusatsu TV series being the twelfth entry (seventeenth overall) show in the Ultra Series.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraman_Cosmos&oldid=1381690820"
  ],
  "notes": ""
 },
 {
  "id": "ultra-nexus",
  "universe": "ultraman",
  "name": "Ultraman Nexus (with Ultraman: The Next)",
  "short_name": "Ultraman Nexus",
  "order": 6,
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
  "description": "Nexus follows the 2004 film Ultraman: The Next (film not included); Wikipedia gives no link to other Ultra series. Wikipedia: \"Taking place four years after the events of Ultraman: The Next (2008, the series progresses into 2009 before the finale), Nexus focuses on the viewpoint of Night Raider rookie Kazuki Komon in the fight against Space Beast threats.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraman_Nexus&oldid=1386634929"
  ],
  "notes": ""
 },
 {
  "id": "ultra-max",
  "universe": "ultraman",
  "name": "Ultraman Max",
  "short_name": "Ultraman Max",
  "order": 7,
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
  "description": "Wikipedia does not place this series in a shared continuity with any other Ultra series; it is kept separate under the never-merge rule. Wikipedia: \"Released as the fourteenth entry (twentieth overall) in the Ultra Series, it aired from July 2, 2005, until April 1, 2006.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraman_Max&oldid=1374303476"
  ],
  "notes": ""
 },
 {
  "id": "ultra-seven-x",
  "universe": "ultraman",
  "name": "Ultraseven X",
  "short_name": "Ultraseven X",
  "order": 8,
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
  "description": "A revival (reimagining) of Ultraseven, not a continuation; kept as its own continuity. Wikipedia: \"It is a revival of the 1967 series Ultraseven, and is the second in Tsuburaya Productions' Ultra hero series to be exclusively for an adult audience after Ultraman Nexus and the first to be in a wide screen high-definition format.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraseven_X&oldid=1374305378"
  ],
  "notes": ""
 },
 {
  "id": "ultra-ginga",
  "universe": "ultraman",
  "name": "Ultraman Ginga",
  "short_name": "Ultraman Ginga",
  "order": 9,
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
  "description": "Ultraman Ginga and its sequel Ginga S. Part of the \"New Generation Heroes\" lineup, which Wikipedia uses as a production/branding era, not as a stated shared continuity. Wikipedia: \"{{nihongo4|Ultraman Ginga S|ウルトラマンギンガS|Urutoraman Ginga Esu}} is a Japanese television series produced by Tsuburaya Productions and a sequel to Ultraman Ginga, as well as part of the New Ultraman Retsuden programming block on TV Tokyo.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraman_Ginga_S&oldid=1374313907"
  ],
  "notes": ""
 },
 {
  "id": "ultra-x",
  "universe": "ultraman",
  "name": "Ultraman X",
  "short_name": "Ultraman X",
  "order": 10,
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
  "description": "Wikipedia does not place this series in a shared continuity with any other Ultra series; it is kept separate under the never-merge rule. Part of the \"New Generation Heroes\" lineup, which Wikipedia uses as a production/branding era, not as a stated shared continuity. Wikipedia: \"It is the 19th entry (28th overall) in the Ultra Series and is currently the last series to air as part of the New Ultraman Retsuden programming block on TV Tokyo.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraman_X&oldid=1379908030"
  ],
  "notes": ""
 },
 {
  "id": "ultra-orb",
  "universe": "ultraman",
  "name": "Ultraman Orb",
  "short_name": "Ultraman Orb",
  "order": 11,
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
  "description": "Ultraman Orb and its prequel The Origin Saga. Part of the \"New Generation Heroes\" lineup, which Wikipedia uses as a production/branding era, not as a stated shared continuity. Wikipedia: \"{{nihongo4|Ultraman Orb: The Origin Saga|ウルトラマンオーブ THE ORIGIN SAGA|Urutoraman Ōbu Ji Orijin Sāga}} is a 2016 Japanese tokusatsu series, serving as a prequel to Ultraman Orb and the 21st entry (30th overall) in the Ultra Series.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraman_Orb%3A_The_Origin_Saga&oldid=1374313756"
  ],
  "notes": ""
 },
 {
  "id": "ultra-geed",
  "universe": "ultraman",
  "name": "Ultraman Geed",
  "short_name": "Ultraman Geed",
  "order": 12,
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
  "description": "Wikipedia does not place this series in a shared continuity with any other Ultra series; it is kept separate under the never-merge rule. Part of the \"New Generation Heroes\" lineup, which Wikipedia uses as a production/branding era, not as a stated shared continuity. Wikipedia: \"{{nihongo4|Ultraman Geed|ウルトラマンジード|Urutoraman Jīdo}} is a Japanese tokusatsu drama produced by Tsuburaya Productions and the 22nd entry (31st overall) to the Ultra Series.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraman_Geed&oldid=1387851692"
  ],
  "notes": ""
 },
 {
  "id": "ultra-rb",
  "universe": "ultraman",
  "name": "Ultraman R/B",
  "short_name": "Ultraman R/B",
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
  "description": "Wikipedia does not place this series in a shared continuity with any other Ultra series; it is kept separate under the never-merge rule. Part of the \"New Generation Heroes\" lineup, which Wikipedia uses as a production/branding era, not as a stated shared continuity. Wikipedia: \"It is the 23rd entry (32nd overall) in the Ultra Series overall, the seventh entry in the \"New Generation Heroes\" lineup and the last entry in the series released in the Heisei era.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraman_R%2FB&oldid=1374309372"
  ],
  "notes": ""
 },
 {
  "id": "ultra-taiga",
  "universe": "ultraman",
  "name": "Ultraman Taiga",
  "short_name": "Ultraman Taiga",
  "order": 14,
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
  "description": "Wikipedia does not place this series in a shared continuity with any other Ultra series; it is kept separate under the never-merge rule. Part of the \"New Generation Heroes\" lineup, which Wikipedia uses as a production/branding era, not as a stated shared continuity. Wikipedia: \"It is the 24th entry (34th overall) in the Ultra Series, the eighth entry in the \"New Generation Heroes\" lineup and the first series released in the Reiwa era.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraman_Taiga&oldid=1374309603"
  ],
  "notes": ""
 },
 {
  "id": "ultra-z",
  "universe": "ultraman",
  "name": "Ultraman Z",
  "short_name": "Ultraman Z",
  "order": 15,
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
  "description": "Wikipedia does not place this series in a shared continuity with any other Ultra series; it is kept separate under the never-merge rule. Part of the \"New Generation Heroes\" lineup, which Wikipedia uses as a production/branding era, not as a stated shared continuity. Wikipedia: \"It is the 25th entry (35th overall) in the Ultra Series, the ninth entry to the \"New Generation Heroes\" lineup and the second series released in the Reiwa era, celebrating the 10th anniversary of Ultraman Zero.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraman_Z&oldid=1374310632"
  ],
  "notes": ""
 },
 {
  "id": "ultra-blazar",
  "universe": "ultraman",
  "name": "Ultraman Blazar",
  "short_name": "Ultraman Blazar",
  "order": 16,
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
  "description": "Wikipedia does not place this series in a shared continuity with any other Ultra series; it is kept separate under the never-merge rule. The Blazar article stresses it is not tied to the M78 Nebula. Part of the \"New Generation Heroes\" lineup, which Wikipedia uses as a production/branding era, not as a stated shared continuity. Wikipedia: \"It is the 28th entry (38th overall) in the Ultra Series, the fifth installment in the Reiwa era and the first series to lean towards serious hard science fiction since Ultraman Gaia and Ultraman Nexus. … His concept on Blazar is also different to that of other Ultras, as it is not related to the M78 Nebula but as a character born in a different galaxy.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraman_Blazar&oldid=1374311773"
  ],
  "notes": ""
 },
 {
  "id": "ultra-arc",
  "universe": "ultraman",
  "name": "Ultraman Arc",
  "short_name": "Ultraman Arc",
  "order": 17,
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
  "description": "Wikipedia does not place this series in a shared continuity with any other Ultra series; it is kept separate under the never-merge rule. Part of the \"New Generation Heroes\" lineup, which Wikipedia uses as a production/branding era, not as a stated shared continuity. Wikipedia: \"It is the 29th entry (39th overall) in the Ultra Series, released to both commemorate the 15th anniversary of Ultraman Zero and the 10th anniversary of the New Generation Heroes series.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraman_Arc&oldid=1374312370"
  ],
  "notes": ""
 },
 {
  "id": "ultra-omega",
  "universe": "ultraman",
  "name": "Ultraman Omega",
  "short_name": "Ultraman Omega",
  "order": 18,
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
  "description": "Wikipedia does not place this series in a shared continuity with any other Ultra series; it is kept separate under the never-merge rule. Part of the \"New Generation Heroes\" lineup, which Wikipedia uses as a production/branding era, not as a stated shared continuity. Wikipedia: \"It is the 30th entry (40th overall) in the Ultra Series, The series began airing on all TXN-affiliated networks in Japan on July 5, 2025.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraman_Omega&oldid=1362490572"
  ],
  "notes": ""
 },
 {
  "id": "ultra-trigger-decker",
  "universe": "ultraman",
  "name": "Ultraman Trigger and Decker",
  "short_name": "Ultraman Trigger and Decker",
  "order": 19,
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
  "description": "Trigger (a modern retelling of Tiga, not a continuation) and its sequel Decker. Part of the \"New Generation Heroes\" lineup, which Wikipedia uses as a production/branding era, not as a stated shared continuity. Wikipedia: \"the show presents itself as a modern retelling of Ultraman Tiga, while also celebrating its 25th anniversary and commemorate its 55th anniversary of the franchise. … Decker serves as the sequel to Ultraman Trigger: New Generation Tiga and celebrating the 25th anniversary of Ultraman Dyna The series aired on TV Tokyo on July 9, 2022.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraman_Trigger%3A_New_Generation_Tiga&oldid=1374312977",
   "https://en.wikipedia.org/w/index.php?title=Ultraman_Decker&oldid=1386581496"
  ],
  "notes": ""
 },
 {
  "id": "ultra-teo",
  "universe": "ultraman",
  "name": "Ultraman Teo",
  "short_name": "Ultraman Teo",
  "order": 20,
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
  "description": "Wikipedia does not place this series in a shared continuity with any other Ultra series; it is kept separate under the never-merge rule. Part of the \"New Generation Heroes\" lineup, which Wikipedia uses as a production/branding era, not as a stated shared continuity. Wikipedia: \"It is the 31st entry (41st overall) in the Ultra Series, released to commemorate the 60th anniversary for the franchise.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraman_Teo&oldid=1388056055"
  ],
  "notes": ""
 },
 {
  "id": "ultra-shin",
  "universe": "ultraman",
  "name": "Shin Ultraman",
  "short_name": "Shin Ultraman",
  "order": 21,
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
  "description": "A reimagining of the 1966 series; its own continuity. Wikipedia: \"A reimagining of the 1966 television series Ultraman, the film is a co-production between Toho Studios and Cine Bazar, and presented by Tsuburaya Productions, Toho Co., Ltd., and Khara, Inc.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Shin_Ultraman&oldid=1388009396"
  ],
  "notes": ""
 },
 {
  "id": "ultra-rising",
  "universe": "ultraman",
  "name": "Ultraman: Rising",
  "short_name": "Ultraman: Rising",
  "order": 22,
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
  "description": "Netflix animated film; its own continuity. Wikipedia: \"Ultraman: Rising is a 2024 animated superhero film based on Tsuburaya Productions' Ultraman franchise.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ultraman%3A_Rising&oldid=1382805513"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "tsuburaya-productions",
  "label": "Tsuburaya Productions",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "toho-studios",
  "label": "Toho Studios",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "netflix-animation-studios",
  "label": "Netflix Animation Studios",
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
  "id": "jnn",
  "label": "JNN (TBS network)",
  "kind": "broadcast",
  "note": ""
 },
 {
  "id": "cbc",
  "label": "CBC (Chubu-Nippon Broadcasting)",
  "kind": "broadcast",
  "note": ""
 },
 {
  "id": "txn",
  "label": "TX Network (TV Tokyo)",
  "kind": "broadcast",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["ultra-showa","ultra-tiga-dyna","ultra-gaia","ultra-neos","ultra-cosmos","ultra-nexus","ultra-max","ultra-seven-x","ultra-ginga","ultra-x","ultra-orb","ultra-geed","ultra-rb","ultra-taiga","ultra-z","ultra-blazar","ultra-arc","ultra-omega","ultra-trigger-decker","ultra-teo","ultra-shin","ultra-rising"];
