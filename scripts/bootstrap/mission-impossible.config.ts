// Mission: Impossible: TV and films are separate; order by broadcast/release where no year is stated.
// Generated from research (research-w3-b.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'mission-impossible', name: "Mission: Impossible", short_name: "Mission: Impossible", order: 51, enabled: true,
  accent: { primary: '#C62828', secondary: '#E0E0E0' }, default_continuity: 'mi-tv', data_dir: 'mission-impossible', last_verified: null,
  description: "The 1966 series with its 1988 revival, and the film series (1996–2025) as a separate continuity.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "mi-tv",
  "universe": "mission-impossible",
  "name": "Mission: Impossible (TV series, 1966–1973 and 1988–1990)",
  "short_name": "Mission: Impossible",
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
  "description": "The original CBS series and the ABC revival, which Wikipedia calls a continuation of it (Jim Phelps returns; Barney Collier and Lisa Casey guest-star). Wikipedia: \"The show is a continuation of the 1966–1973 television series of the same name, and aired on ABC from October 23, 1988, to February 24, 1990. … The appearances of Barney Collier and Lisa Casey established continuity with the original series, while the episodes \"Spy\" and \"Reprisal\" established that Jim Phelps continued to work after the original series ended.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Mission%3A_Impossible_%281988_TV_series%29&oldid=1387237105",
   "https://en.wikipedia.org/w/index.php?title=Mission%3A_Impossible_%281966_TV_series%29&oldid=1387237096"
  ],
  "notes": ""
 },
 {
  "id": "mi-films",
  "universe": "mission-impossible",
  "name": "Mission: Impossible (film series, 1996–2025)",
  "short_name": "Mission: Impossible",
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
  "description": "The Tom Cruise / Ethan Hunt films. Wikipedia describes them as based on the TV series, not a continuation of it, so they form their own continuity. Wikipedia: \"Mission: Impossible is an American series of action spy films, based on the 1966 television series created by Bruce Geller. … Based on the 1966 television series of the same name and its 1988 sequel series, it is the first installment in the Mission: Impossible film series.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Mission%3A_Impossible_%28film_series%29&oldid=1387927042",
   "https://en.wikipedia.org/w/index.php?title=Mission%3A_Impossible_%28film%29&oldid=1385100403"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "desilu-productions",
  "label": "Desilu Productions",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "jeffrey-hayes-productions",
  "label": "Jeffrey Hayes Productions",
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
  "id": "skydance-productions",
  "label": "Skydance Productions",
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
export const SORT_BY_YEAR = ["mi-tv","mi-films"];
