// Friday the 13th: years where stated; several disputed because the series contradicts itself.
// Generated from research (research-w6-b.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'friday-the-13th', name: "Friday the 13th", short_name: "Friday the 13th", order: 88, enabled: true,
  accent: { primary: '#263238', secondary: '#B71C1C' }, default_continuity: 'f13-main', data_dir: 'friday-the-13th', last_verified: null,
  description: "The twelve Friday the 13th films (with Jason X and Freddy vs. Jason) and Crystal Lake, and the 2009 remake as a separate continuity.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "f13-main",
  "universe": "friday-the-13th",
  "name": "Friday the 13th (original continuity)",
  "short_name": "Friday the 13th",
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
  "description": "The twelve films from 1980 to 2003 (incl. Jason X and the crossover Freddy vs. Jason), plus the prequel series Crystal Lake. Internal dating is notoriously inconsistent; see unit notes. Wikipedia: \"Among the twelve films was a crossover film featuring fellow horror icon Freddy Krueger from the A Nightmare on Elm Street franchise. … Crystal Lake is an American slasher television series … that serves as the prequel to the Friday the 13th franchise, set seven years before the original film, in 1972.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Friday_the_13th_(franchise)&oldid=1388138344",
   "https://en.wikipedia.org/w/index.php?title=Crystal_Lake_(TV_series)&oldid=1388217045"
  ],
  "notes": ""
 },
 {
  "id": "f13-2009",
  "universe": "friday-the-13th",
  "name": "Friday the 13th (2009 reboot)",
  "short_name": "Friday the 13th",
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
  "description": "The 2009 film restarted the continuity. Wikipedia: \"In 2009, a new Friday the 13th film which restarted the film series continuity was released.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Friday_the_13th_(franchise)&oldid=1388138344"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
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
  "id": "paramount-pictures",
  "label": "Paramount Pictures",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
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
export const SORT_BY_YEAR = ["f13-main","f13-2009"];
