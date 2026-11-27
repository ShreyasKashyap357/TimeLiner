// Terminator. One continuity whose trunk is the original timeline (T1, T2, T3, Salvation); The Sarah Connor Chronicles, Dark Fate and T2-3D branch off after T2 (Wikipedia's 'story chronology' table). Genisys and Zero are separate continuities.
// Generated from research (research-terminator-halloween.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'terminator', name: "Terminator", short_name: "Terminator", order: 12, enabled: true,
  accent: { primary: '#E03C31', secondary: '#7FB2E5' }, default_continuity: 'terminator-main', data_dir: 'terminator', last_verified: null,
  description: "The Terminator films, The Sarah Connor Chronicles, Terminator Zero and T2-3D, with the franchise's branching timelines.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "terminator-main",
  "universe": "terminator",
  "name": "Terminator (Cameron films and their sequels)",
  "short_name": "Terminator",
  "order": 1,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   {
    "id": "main",
    "label": "Original timeline",
    "marker": "dot",
    "description": "Trunk: The Terminator, T2, T3, Salvation. Wikipedia: \"Terminator 3: Rise of the Machines is a 2003 science fiction action film, the third installment in the Terminator franchise and a sequel to Terminator 2: Judgment Day (1991). | It is the fourth installment of the Terminator franchise, serving as a sequel to Terminator 3: Rise of the Machines (2003).\"",
    "placeable": true,
    "parent": null,
    "diverges_at": null,
    "merges_into": null,
    "is_main": true
   },
   {
    "id": "sarah-connor-chronicles",
    "label": "The Sarah Connor Chronicles",
    "marker": "diamond",
    "description": "The TV series continues from T2 and ignores T3 onwards. The divergence year is T2's 1995 setting (from the Wikipedia T2 article). TSCC itself places T2 in 1997 (see conflicts). Wikipedia: \"It is a spin-off from the Terminator film series, disregarding the events of Terminator 3: Rise of the Machines and picking up shortly after Terminator 2: Judgment Day. | It was also produced as a T2 sequel, taking place in an alternate timeline that ignores the third film and subsequent events.\"",
    "placeable": true,
    "parent": "main",
    "diverges_at": {
     "y": 1995
    },
    "merges_into": null,
    "is_main": false
   },
   {
    "id": "dark-fate",
    "label": "Dark Fate",
    "marker": "square",
    "description": "A direct sequel to T2 that ignores T3, Salvation and Genisys. Its 1998 prologue is \"three years after the destruction of Cyberdyne Systems\" (T2, 1995). Wikipedia: \"It is the sixth installment in the Terminator franchise and a sequel to The Terminator (1984) and Terminator 2: Judgment Day (1991), ignoring the events of Terminator 3: Rise of the Machines (2003), Terminator Salvation (2009) and Terminator Genisys (2015).\"",
    "placeable": true,
    "parent": "main",
    "diverges_at": {
     "y": 1995
    },
    "merges_into": null,
    "is_main": false
   },
   {
    "id": "battle-across-time",
    "label": "Battle Across Time",
    "marker": "hollow-square",
    "description": "A 1996 theme-park mini-sequel to T2. Wikipedia gives it its own \"Battle Across Time continuity\". Optional title. Wikipedia: \"The attraction is a mini-sequel to Terminator 2: Judgment Day | It was produced as the original sequel to T2 and reunited its main cast.\"",
    "placeable": true,
    "parent": "main",
    "diverges_at": {
     "y": 1995
    },
    "merges_into": null,
    "is_main": false
   }
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "",
  "source_urls": [],
  "notes": "Wikipedia's \"Terminator story chronology\" table (Terminator (franchise), revid 1387783640) lists these continuities: Original (T1, T2, T3, Terminator Salvation: The Machinima Series, Salvation), Battle Across Time (T1, T2, T2-3D), The Sarah Connor Chronicles (T1, T2, TSCC), Genisys (Genisys, Genisys: Future War), Dark Fate (T1, T2, Dark Fate), and Zero (all six films + Zero). PROPOSAL: one continuity whose trunk is the Original continuity. TSCC, Dark Fate and T2-3D are branches that share T1+T2 and diverge after T2. Genisys and Zero are separate continuities."
 },
 {
  "id": "terminator-genisys",
  "universe": "terminator",
  "name": "Terminator Genisys",
  "short_name": "Terminator Genisys",
  "order": 2,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   {
    "id": "main",
    "label": "Genisys timeline",
    "marker": "dot",
    "description": "Reboot: Kyle Reese is sent to 1984 and finds the timeline altered (Sarah has been raised by \"Pops\" since 1973). The events of T2 are disregarded; T3 and Salvation are ignored. Wikipedia: \"Terminator Genisys is a 2015 American science fiction action film serving as a reboot and the fifth installment in the Terminator franchise. | Concepts from the second movie, such as the T-1000, are featured, but its events are disregarded\"",
    "placeable": true,
    "parent": null,
    "diverges_at": null,
    "merges_into": null,
    "is_main": true
   }
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "",
  "source_urls": [],
  "notes": "Proposed as a separate continuity: Wikipedia's \"Genisys continuity\" lists only Genisys (and its game), not T1 or T2. Alternative: a branch of terminator-main diverging in 1973/1984. Franchise article: \"a reboot branching off from the timeline of the original film.\""
 },
 {
  "id": "terminator-zero",
  "universe": "terminator",
  "name": "Terminator Zero",
  "short_name": "Terminator Zero",
  "order": 3,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   {
    "id": "main",
    "label": "Zero timeline",
    "marker": "dot",
    "description": "An alternate 1997 Japan, where each trip back in time creates a new timeline. Wikipedia: \"In an alternate 1997 Japan where robots are increasingly common, ... | Tomlin has stated that the series treats all of the prior films as canon | whenever a human or machine travels back in time, a new timeline is created.\"",
    "placeable": true,
    "parent": null,
    "diverges_at": null,
    "merges_into": null,
    "is_main": true
   }
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "",
  "source_urls": [],
  "notes": "Proposed as a separate continuity. CONFLICT: the showrunner says all prior films are canon, and the Wikipedia table puts every film in the \"Zero continuity\". But the series is set in \"an alternate 1997 Japan\" with its own Judgment Day (1997) and future (2022), and no film characters appear. Because Genisys is also counted as canon, Zero cannot sit under a single parent branch, so it gets its own continuity with \"references\" links."
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "hemdale",
  "label": "Hemdale",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "carolco",
  "label": "Carolco",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "intermedia",
  "label": "Intermedia",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "halcyon",
  "label": "Halcyon",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "skydance",
  "label": "Skydance",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "warner-bros-television",
  "label": "Warner Bros. Television",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "production-ig",
  "label": "Production Ig",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "landmark-entertainment",
  "label": "Landmark Entertainment",
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
  "id": "theme-park",
  "label": "Theme park attraction",
  "kind": "venue",
  "note": ""
 }
];
export const TAGS: Tag[] = [{"id":"sarah-connor","label":"Sarah Connor","kind":"character","aliases":[]},{"id":"john-connor","label":"John Connor","kind":"character","aliases":[]},{"id":"t-800","label":"The Terminator (T-800)","kind":"character","aliases":[]},{"id":"skynet","label":"Skynet","kind":"team","aliases":[]}];
export const FANDOM_PREFIXES = {"terminator":"https://terminator.fandom.com/wiki/"};
export const SORT_BY_YEAR = ["terminator-main","terminator-genisys","terminator-zero"];
