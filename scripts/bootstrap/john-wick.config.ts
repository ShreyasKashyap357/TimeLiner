// John Wick: story order from the stated relative timing.
// Generated from research (research-w5-b.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'john-wick', name: "John Wick", short_name: "John Wick", order: 74, enabled: true,
  accent: { primary: '#212121', secondary: '#C62828' }, default_continuity: 'john-wick-main', data_dir: 'john-wick', last_verified: null,
  description: "The John Wick films, Ballerina and The Continental.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "john-wick-main",
  "universe": "john-wick",
  "name": "John Wick",
  "short_name": "John Wick",
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
  "description": "One continuity: the four films, the spin-off film Ballerina and the prequel miniseries The Continental. Only The Continental has a stated period (the 1970s); the films are ordered by stated relative placement. Wikipedia: \"Various spin-offs expanded the franchise: the prequel comic book series John Wick: The Book of Rules (2017–2019), the prequel television miniseries The Continental (2023), and the spin-off film Ballerina (2025). … It is a spin-off installment within the John Wick film series, taking place between the events of John Wick: Chapter 3 – Parabellum (2019) and Chapter 4 (2023).\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=John_Wick&oldid=1387381899",
   "https://en.wikipedia.org/w/index.php?title=Ballerina_(2025_film)&oldid=1387383143"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "lionsgate-television",
  "label": "Lionsgate Television",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "thunder-road",
  "label": "Thunder Road",
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
  "id": "peacock",
  "label": "Peacock",
  "kind": "streaming",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["john-wick-main"];
