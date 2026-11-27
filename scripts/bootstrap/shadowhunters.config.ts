// Shadowhunters: books ordered by the years they are set in (several inferred or disputed).
// Generated from research (research-w2-c.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'shadowhunters', name: "Shadowhunters", short_name: "Shadowhunters", order: 34, enabled: true,
  accent: { primary: '#3F51B5', secondary: '#B0BEC5' }, default_continuity: 'shadowhunters-books', data_dir: 'shadowhunters', last_verified: null,
  description: "Cassandra Clare's Shadowhunter Chronicles, the 2013 film and the Freeform series, as separate continuities.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "shadowhunters-books",
  "universe": "shadowhunters",
  "name": "The Shadowhunter Chronicles (books)",
  "short_name": "The Shadowhunter Chronicles",
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
  "description": "Cassandra Clare's novels and novella collections (2007-present), one shared timeline from 1878 to 2016+ (Clare publishes an official timeline). Wikipedia: \"\"The following books are arranged in order of their respective timelines.\" / \"Each book is set at different points in the franchise's timeline\" (citing Clare, \"The Shadowhunters Timeline\", cassandraclare.com)\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Shadowhunter_Chronicles&oldid=1384085140"
  ],
  "notes": ""
 },
 {
  "id": "shadowhunters-film-2013",
  "universe": "shadowhunters",
  "name": "The Mortal Instruments: City of Bones (2013 film)",
  "short_name": "The Mortal Instruments: City of Bones",
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
  "description": "Screen Gems / Constantin film; planned franchise cancelled after one film. Own continuity. Wikipedia: \"\"Production on a film adaptation of the second book, City of Ashes, was due to start in September 2013, but was delayed to 2014, and eventually cancelled, after the first film failed to recoup its budget.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Shadowhunter_Chronicles&oldid=1384085140"
  ],
  "notes": ""
 },
 {
  "id": "shadowhunters-tv",
  "universe": "shadowhunters",
  "name": "Shadowhunters (Freeform series)",
  "short_name": "Shadowhunters",
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
  "description": "Freeform TV series (2016-2019), a reboot of the 2013 film; own continuity. Wikipedia: \"\"Produced by Constantin Film, it serves as a reboot of the 2013 film adaptation of the novels, The Mortal Instruments: City of Bones.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Shadowhunters&oldid=1388004093"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "margaret-k-mcelderry-books",
  "label": "Margaret K. McElderry Books",
  "kind": "publisher",
  "short_label": "Margaret K. McElderry Books",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "simon-and-schuster",
  "label": "Simon & Schuster",
  "kind": "publisher",
  "short_label": "Simon & Schuster",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "constantin-film",
  "label": "Constantin Film",
  "kind": "studio",
  "short_label": "Constantin Film",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["shadowhunters-books","shadowhunters-tv"];
