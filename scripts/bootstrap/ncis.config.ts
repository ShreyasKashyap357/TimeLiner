// NCIS: seasons in premiere order across the shared shows (no source gives story years; order inferred from airing).
// Generated from research (research-w2-e.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'ncis', name: "NCIS", short_name: "NCIS", order: 25, enabled: true,
  accent: { primary: '#1F3A93', secondary: '#D4AF37' }, default_continuity: 'ncis-main', data_dir: 'ncis', last_verified: null,
  description: "JAG, NCIS and its spin-offs in one shared continuity (NCIS began as a JAG backdoor pilot).", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "ncis-main",
  "universe": "ncis",
  "name": "NCIS (shared universe, incl. JAG)",
  "short_name": "NCIS",
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
  "description": "JAG and the NCIS series, linked by backdoor pilots, spin-offs and crossovers. Wikipedia: \"In 2003, NCIS was introduced via a backdoor pilot from the TV show JAG. Over the years, NCIS itself has spawned several spin-offs: NCIS: Los Angeles (2009), NCIS: New Orleans (2014), NCIS: Hawaiʻi (2021), NCIS: Sydney (2023), NCIS: Origins (2024), NCIS: Tony & Ziva (2025) and NCIS: New York (2026).\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=NCIS_%28franchise%29&oldid=1383305510"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "belisarius-productions",
  "label": "Belisarius Productions",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "shane-brennan-productions",
  "label": "Shane Brennan Productions",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "cbs-studios",
  "label": "Cbs Studios",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "endemol-shine-australia",
  "label": "Endemol Shine Australia",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "wings-productions",
  "label": "Wings Productions",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "ll-cool-j-incorporated",
  "label": "Ll Cool J Incorporated",
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
export const SORT_BY_YEAR = ["ncis-main"];
