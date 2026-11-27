// Mad Max: George Miller's suggested order; no years.
// Generated from research (research-w5-b.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'mad-max', name: "Mad Max", short_name: "Mad Max", order: 76, enabled: true,
  accent: { primary: '#E65100', secondary: '#5D4037' }, default_continuity: 'mad-max-main', data_dir: 'mad-max', last_verified: null,
  description: "The five Mad Max films, a loose continuity ('no strict chronology').", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "mad-max-main",
  "universe": "mad-max",
  "name": "Mad Max",
  "short_name": "Mad Max",
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
  "description": "One loose continuity of the five films, ordered by stated relative timing. Wikipedia says the franchise has no strict chronology and the later two films describe a different collapse from the first three; placing Furiosa and Fury Road after Beyond Thunderdome rests on Miller's \"probably\". Wikipedia: \"Because Mad Max films are generally told as folklore, the Mad Max franchise has historically been less concerned with continuity than most science fiction or fantasy franchises, like Star Wars or Star Trek. At least one critic has suggested that \"the franchise’s canon cannot be reconciled in any way — barring the introduction of time travel.\" … In the timeline of the first three films, the 1979 oi\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Mad_Max&oldid=1386780908"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "kennedy-miller",
  "label": "Kennedy Miller",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "kennedy-miller-mitchell",
  "label": "Kennedy Miller Mitchell",
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
export const SORT_BY_YEAR = ["mad-max-main"];
