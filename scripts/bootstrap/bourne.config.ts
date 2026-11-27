// Bourne: films ordered by their stated offsets ('two years after', 'twelve years after'); novels in publication order.
// Generated from research (research-w3-a.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'bourne', name: "Bourne", short_name: "Bourne", order: 50, enabled: true,
  accent: { primary: '#3A3A3A', secondary: '#C9A227' }, default_continuity: 'bourne-films', data_dir: 'bourne', last_verified: null,
  description: "Robert Ludlum's Bourne novels and their continuations, the 1988 miniseries, and the film series with Treadstone.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "bourne-novels",
  "universe": "bourne",
  "name": "Bourne novels",
  "short_name": "Bourne novels",
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
  "description": "Robert Ludlum's three novels and the authorised continuations by Eric Van Lustbader (2004-2017) and Brian Freeman (2020-). Wikipedia: \"Bourne is a series of spy novels, originally written by American author Robert Ludlum, about the fictional spy Jason Bourne. After Ludlum's death in 2001, Eric Van Lustbader continued the series with several additional novels expanding Bourne's story.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Bourne_(novel_series)&oldid=1380272822"
  ],
  "notes": ""
 },
 {
  "id": "bourne-1988",
  "universe": "bourne",
  "name": "The Bourne Identity (1988 miniseries)",
  "short_name": "The Bourne Identity",
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
  "description": "ABC two-part miniseries with Richard Chamberlain. Wikipedia: \"The Bourne Identity is a 1988 American mystery action thriller miniseries adaptation of Robert Ludlum's 1980 novel The Bourne Identity.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Bourne_Identity_(1988_film)&oldid=1378779414"
  ],
  "notes": ""
 },
 {
  "id": "bourne-films",
  "universe": "bourne",
  "name": "Bourne films and Treadstone",
  "short_name": "Bourne films and Treadstone",
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
  "description": "Universal film series (2002-2016) incl. The Bourne Legacy, plus the USA Network series Treadstone, which Wikipedia places in the film continuity. Wikipedia: \"The franchise includes five films and a spin-off television series. It is part of the Bourne franchise and serves as both a prequel to The Bourne Identity (2002) and a sequel to Jason Bourne (2016).\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Treadstone&oldid=1387257946"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "richard-marek",
  "label": "Richard Marek Publishers",
  "kind": "publisher",
  "short_label": "Richard Marek Publishers",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "random-house",
  "label": "Random House",
  "kind": "studio",
  "short_label": "Random House",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "st-martins-press",
  "label": "St. Martin's Press",
  "kind": "publisher",
  "short_label": "St. Martin's Press",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "grand-central-publishing",
  "label": "Grand Central Publishing",
  "kind": "publisher",
  "short_label": "Grand Central Publishing",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "studio-not-stated",
  "label": "Studio Not Stated",
  "kind": "studio",
  "short_label": "Studio Not Stated",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "warner-bros-television",
  "label": "Warner Bros. Television",
  "kind": "studio",
  "short_label": "Warner Bros. Television",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "universal-pictures",
  "label": "Universal Pictures",
  "kind": "studio",
  "short_label": "Universal Pictures",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "universal-content-productions",
  "label": "Universal Content Productions",
  "kind": "studio",
  "short_label": "Universal Content Productions",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["bourne-novels","bourne-1988","bourne-films"];
