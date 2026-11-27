// Alien & Predator: Alien by its stated chronology; Predator by stated years and placements; AVP separate.
// Generated from research (research-w5-a.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'alien-predator', name: "Alien & Predator", short_name: "Alien & Predator", order: 77, enabled: true,
  accent: { primary: '#263238', secondary: '#76FF03' }, default_continuity: 'alien', data_dir: 'alien-predator', last_verified: null,
  description: "The Alien films and Alien: Earth (by the franchise's stated story chronology), the Predator films, and the two Alien vs. Predator films as a separate continuity (their canon is contested).", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "alien",
  "universe": "alien-predator",
  "name": "Alien (films and Alien: Earth)",
  "short_name": "Alien",
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
  "description": "The Alien film series (including the Prometheus prequels and Alien: Romulus) and the Alien: Earth TV series, ordered by the Alien franchise article's story chronology table. Wikipedia: \"''Alien'' story chronology … 2093 — ''[[Prometheus (2012 film)|Prometheus]]'' (2012) … 2120 — ''[[Alien: Earth]]'' (2025) … 2122 — ''[[Alien (film)|Alien]]'' (1979) … 2381 — ''[[Alien Resurrection]]'' (1997)\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Alien_(franchise)&oldid=1388333020"
  ],
  "notes": ""
 },
 {
  "id": "predator",
  "universe": "alien-predator",
  "name": "Predator films",
  "short_name": "Predator films",
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
  "description": "The Predator films from Predator (1987) to Predator: Badlands (2025). Kept separate from the Alien continuity: the films reference each other (Weyland-Yutani appears in Badlands) but Wikipedia gives no shared chronology, and Badlands' placement after the Alien films is a director statement. Wikipedia: \"In October 2025, Trachtenberg stated in an interview with IGN that Predator: Badlands is set in the far future after the events of all the previous Alien and Alien vs. Predator films and the Alien: Earth TV-series so as to avoid any potential continuity conflicts, considering Romulus and Earth were still in production when Badlands was being produced.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Predator_(franchise)&oldid=1386399210"
  ],
  "notes": ""
 },
 {
  "id": "avp",
  "universe": "alien-predator",
  "name": "Alien vs. Predator films",
  "short_name": "Alien vs. Predator films",
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
  "description": "The two crossover films. Their canon relative to the Alien series is contested: they were intended as a Predator sequel and Alien prequel, but the Alien franchise's story chronology omits them, and unused endings of The Predator (2018) tied the franchises together \"in a manner separate from the pre-existing Alien vs. Predator\" films. Kept as their own continuity, linked to both. Wikipedia: \"Alien vs. Predator was intended to be a sequel to the Predator films and prequel to the Alien series, Anderson was cautious of contradicting continuity in the franchises.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Alien_vs._Predator_(film)&oldid=1384246835",
   "https://en.wikipedia.org/w/index.php?title=Alien_(franchise)&oldid=1388333020"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "26-keys-productions",
  "label": "26 Keys Productions",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "20th-century-studios",
  "label": "20th Century Studios",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "20th-century-animation",
  "label": "20th Century Animation",
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
export const SORT_BY_YEAR = ["alien","predator","avp"];
