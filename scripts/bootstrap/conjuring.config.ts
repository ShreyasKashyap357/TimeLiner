// The Conjuring Universe: ordered by the years each film is set in.
// Generated from research (research-w5-b.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'conjuring', name: "The Conjuring Universe", short_name: "Conjuring Universe", order: 73, enabled: true,
  accent: { primary: '#4A148C', secondary: '#B0BEC5' }, default_continuity: 'conjuring-main', data_dir: 'conjuring', last_verified: null,
  description: "The Conjuring, Annabelle and The Nun films in story order by their stated years (The Curse of La Llorona is set in the universe but not an official installment).", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "conjuring-main",
  "universe": "conjuring",
  "name": "The Conjuring Universe",
  "short_name": "The Conjuring Universe",
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
  "description": "One shared film continuity: the Conjuring main series, the Annabelle films and the Nun films. The Curse of La Llorona is included with a flag: Wikipedia says it is not an official installment but takes place within the universe. Wikipedia: \"The film was produced by James Wan through his Atomic Monster banner and, though not considered an installment in the franchise, takes place within The Conjuring Universe. … Although the film is not an official installment in The Conjuring Universe, it stars Tony Amendola, who reprises his role from Annabelle as Father Perez.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Curse_of_La_Llorona&oldid=1384043069",
   "https://en.wikipedia.org/w/index.php?title=The_Conjuring_Universe&oldid=1387761971"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "new-line-cinema",
  "label": "New Line Cinema",
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
export const SORT_BY_YEAR = ["conjuring-main"];
