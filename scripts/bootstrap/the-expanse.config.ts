// The Expanse: no confirmed years; publication / premiere order (inferred).
// Generated from research (research-w2-b.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'the-expanse', name: "The Expanse", short_name: "The Expanse", order: 41, enabled: true,
  accent: { primary: '#2C6E8F', secondary: '#E07B39' }, default_continuity: 'expanse-books', data_dir: 'the-expanse', last_verified: null,
  description: "James S. A. Corey's novels and novellas, and the TV series (with the Telltale prequel game).", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "expanse-books",
  "universe": "the-expanse",
  "name": "The Expanse (novels and novellas)",
  "short_name": "The Expanse",
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
  "description": "James S. A. Corey's nine novels plus the novellas and short stories collected in Memory's Legion. Calendar: no calendar year is stated in the books' Wikipedia articles. The Expanse Wiki says no date except 2307 (a gin brand) is ever confirmed; 2350 is only its \"most likely\" start year, so units carry no numeric year and are ordered by the series table's \"Setting\" column. Wikipedia: \"The book series is made up of nine novels and nine novellas compiled in Memory's Legion. The series was adapted for television for Syfy, also under the title of The Expanse. … Expanse Wiki: \"Save for only one, no certain chronological parameter has ever been affirmed within the series. The only known certain date is 2307, the commencement production date of Ganymede Gin, a liquor brand. However, a\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Expanse_(novel_series)&oldid=1384305191",
   "https://expanse.fandom.com/wiki/Timeline_and_chronology?oldid=109004"
  ],
  "notes": ""
 },
 {
  "id": "expanse-tv",
  "universe": "the-expanse",
  "name": "The Expanse (television series continuity)",
  "short_name": "The Expanse",
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
  "description": "The Syfy/Prime Video adaptation (2015–2022) and the Telltale game, which Wikipedia calls a prequel to the TV series (not the books). The adaptation compresses and changes the novels, so it is kept separate and linked with \"adapts\". There is no on-screen calendar year in the sources. Wikipedia: \"it is based on the series of novels of the same name by James S. A. Corey … It is a prequel to Alcon Entertainment's television series The Expanse.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Expanse_(TV_series)&oldid=1387740288",
   "https://en.wikipedia.org/w/index.php?title=The_Expanse%3A_A_Telltale_Series&oldid=1368121074"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "orbit-books",
  "label": "Orbit Books",
  "kind": "publisher",
  "short_label": "Orbit Books",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "green-ronin-publishing",
  "label": "Green Ronin Publishing",
  "kind": "publisher",
  "short_label": "Green Ronin Publishing",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "alcon-television-group",
  "label": "Alcon Television Group",
  "kind": "studio",
  "short_label": "Alcon Television Group",
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
 }
];
export const PLATFORMS: Platform[] = [
 {
  "id": "multiple-game-platforms",
  "label": "Several game platforms at once",
  "kind": "game-platform",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["expanse-books","expanse-tv"];
