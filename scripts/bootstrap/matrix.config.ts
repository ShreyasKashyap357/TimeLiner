// The Matrix: story order from the stated placements; years approximate (disputed).
// Generated from research (research-w5-b.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'matrix', name: "The Matrix", short_name: "Matrix", order: 75, enabled: true,
  accent: { primary: '#1B5E20', secondary: '#76FF03' }, default_continuity: 'matrix-main', data_dir: 'matrix', last_verified: null,
  description: "The Matrix films with The Animatrix, Enter the Matrix and The Matrix Online (stated as canon); Path of Neo as a separate retelling.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "matrix-main",
  "universe": "matrix",
  "name": "The Matrix",
  "short_name": "The Matrix",
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
  "description": "The four films plus the tie-ins Wikipedia presents as part of the same story: The Animatrix, Enter the Matrix and The Matrix Online. The Matrix Awakens (tech demo) is excluded: no source calls it canon. Wikipedia: \"The video game Enter the Matrix connects the story of the Animatrix short \"Final Flight of the Osiris\" with the events of Reloaded, while the online video game The Matrix Online was a direct sequel to Revolutions. … This is to say the game itself is the official continuation of the universe, story and characters established in The Matrix series of fictional works including the film trilogy, The An\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Matrix_(franchise)&oldid=1387960713",
   "https://en.wikipedia.org/w/index.php?title=The_Matrix_Online&oldid=1370160582"
  ],
  "notes": ""
 },
 {
  "id": "matrix-path-of-neo",
  "universe": "matrix",
  "name": "The Matrix: Path of Neo",
  "short_name": "The Matrix: Path of Neo",
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
  "description": "Game retelling of the film trilogy with deviations and an alternate ending; kept separate because no source calls it canon. Wikipedia: \"Players control the character Neo, participating in scenes from the films. … Some levels imitate the scenes of the films, other extend them, or take entirely different directions. … The Wachowskis also sought to develop an alternate ending to the narrative to contrast with the pessimistic ending of The Matrix Revolutions.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Matrix%3A_Path_of_Neo&oldid=1383333540"
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
  "id": "village-roadshow-pictures",
  "label": "Village Roadshow Pictures",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "shiny-entertainment",
  "label": "Shiny Entertainment",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "monolith-productions",
  "label": "Monolith Productions",
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
export const SORT_BY_YEAR = ["matrix-main","matrix-path-of-neo"];
