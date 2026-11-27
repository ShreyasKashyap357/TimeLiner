// Cop Universe: order from the films' cross-references; no years are stated.
// Generated from research (research-w4-a.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'cop-universe', name: "Cop Universe", short_name: "Cop Universe", order: 68, enabled: true,
  accent: { primary: '#0D47A1', secondary: '#FFD600' }, default_continuity: 'cop-main', data_dir: 'cop-universe', last_verified: null,
  description: "Rohit Shetty's Cop Universe films (Singham, Simmba, Sooryavanshi and sequels) and the Indian Police Force series.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "cop-main",
  "universe": "cop-universe",
  "name": "Rohit Shetty's Cop Universe",
  "short_name": "Rohit Shetty's Cop Universe",
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
  "description": "Rohit Shetty's shared universe of Hindi-language police action films and one Prime Video series. No in-universe years are sourced. The order comes from plot cross-references in the Wikipedia plot summaries. Wikipedia: \"Rohit Shetty's Cop Universe is an Indian media franchise and shared universe created by Rohit Shetty. Previously known simply as the Cop Universe, It consists of media focusing on police officers. The franchise includes films, animated series, video games and television series.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Rohit_Shetty%27s_Cop_Universe&oldid=1388183561"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "reliance-entertainment",
  "label": "Reliance Entertainment",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "rohit-shetty-picturez",
  "label": "Rohit Shetty Picturez",
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
export const SORT_BY_YEAR = ["cop-main"];
