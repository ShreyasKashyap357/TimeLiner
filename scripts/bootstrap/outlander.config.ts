// Outlander: ordered by the years each book and season is set in.
// Generated from research (research-w2-c.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'outlander', name: "Outlander", short_name: "Outlander", order: 35, enabled: true,
  accent: { primary: '#4E7D5B', secondary: '#B5895A' }, default_continuity: 'outlander-books', data_dir: 'outlander', last_verified: null,
  description: "Diana Gabaldon's Outlander novels and Lord John books, and the Starz series with Blood of My Blood.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "outlander-books",
  "universe": "outlander",
  "name": "Outlander (novels and Lord John series)",
  "short_name": "Outlander",
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
  "description": "Diana Gabaldon's main Outlander novels plus the Lord John spin-off novels and novellas, which take place inside the main timeline (1756-1762, during Voyager). Wikipedia: \"\"The spin-off series consists of five novellas and three novels, which all take place between 1756 and 1761, during the events of Gabaldon's Voyager.\" (Outlander book series) / \"To date, the Lord John works all take place between 1756 and 1761, during the events of Gabaldon's Voyager.\" (Lord John series)\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Outlander_%28book_series%29&oldid=1379743058",
   "https://en.wikipedia.org/w/index.php?title=Lord_John_series&oldid=1384393995"
  ],
  "notes": ""
 },
 {
  "id": "outlander-tv",
  "universe": "outlander",
  "name": "Outlander (Starz television)",
  "short_name": "Outlander",
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
  "description": "Starz series (2014-2026) and its prequel Outlander: Blood of My Blood (2025-). TV continuity, separate from the novels (e.g. the TV frame year is 1945, the UK novel says 1946). Wikipedia: \"\"Outlander: Blood of My Blood is an historical romance drama television series that serves as a prequel to the television series Outlander (2014-2026), which is based on the book series of the same name by Diana Gabaldon.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Outlander%3A_Blood_of_My_Blood&oldid=1388259857",
   "https://en.wikipedia.org/w/index.php?title=Outlander_%28TV_series%29&oldid=1387711260"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "delacorte-press",
  "label": "Delacorte Press",
  "kind": "publisher",
  "short_label": "Delacorte Press",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "headline-publishing",
  "label": "Headline Publishing",
  "kind": "publisher",
  "short_label": "Headline Publishing",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "del-rey-books",
  "label": "Del Rey Books",
  "kind": "publisher",
  "short_label": "Del Rey Books",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "tor-books",
  "label": "Tor Books",
  "kind": "publisher",
  "short_label": "Tor Books",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "ace-books",
  "label": "Ace Books",
  "kind": "publisher",
  "short_label": "Ace Books",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "sony-pictures-television",
  "label": "Sony Pictures Television",
  "kind": "studio",
  "short_label": "Sony Pictures Television",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "starz",
  "label": "Starz",
  "kind": "studio",
  "short_label": "Starz",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [
 {
  "id": "starz",
  "label": "Starz",
  "kind": "cable",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["outlander-books","outlander-tv"];
