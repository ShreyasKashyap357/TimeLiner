// YRF Spy Universe: story order from each film's stated placement; years where the plots state them.
// Generated from research (research-w4-a.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'yrf-spy-universe', name: "YRF Spy Universe", short_name: "YRF Spy Universe", order: 66, enabled: true,
  accent: { primary: '#B71C1C', secondary: '#FBC02D' }, default_continuity: 'yrf-spy', data_dir: 'yrf-spy-universe', last_verified: null,
  description: "Yash Raj Films' spy films (Ek Tha Tiger, Tiger Zinda Hai, War, Pathaan, Tiger 3, War 2, Alpha) in one shared continuity.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "yrf-spy",
  "universe": "yrf-spy-universe",
  "name": "YRF Spy Universe",
  "short_name": "YRF Spy Universe",
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
  "description": "Yash Raj Films shared universe of Hindi-language spy films (Tiger, War, Pathaan and Alpha strands). In-universe order uses the per-film \"set after the events of\" statements in the film articles plus dated plot summaries. Wikipedia: \"The first three films in the universe - Ek Tha Tiger (2012), Tiger Zinda Hai (2017) and War (2019) - were released as standalone films before the universe was established through Pathaan (2023) after the success of War. … films = Ek Tha Tiger (2012) | Tiger Zinda Hai (2017) | War (2019) | Pathaan (2023) | Tiger 3 (2023) | War 2 (2025) | Alpha (2026)\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=YRF_Spy_Universe&oldid=1382183808"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "yash-raj-films",
  "label": "Yash Raj Films",
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
export const SORT_BY_YEAR = ["yrf-spy"];
