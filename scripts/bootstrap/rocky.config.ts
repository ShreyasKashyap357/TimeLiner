// Rocky / Creed: ordered by stated or inferred years.
// Generated from research (research-w5-c.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'rocky', name: "Rocky", short_name: "Rocky", order: 72, enabled: true,
  accent: { primary: '#B71C1C', secondary: '#FFD54F' }, default_continuity: 'rocky-main', data_dir: 'rocky', last_verified: null,
  description: "The Rocky and Creed films in one continuity.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "rocky-main",
  "universe": "rocky",
  "name": "Rocky / Creed",
  "short_name": "Rocky / Creed",
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
  "description": "The six Rocky films and the Creed sequel films, one continuity. Wikipedia: \"Creed, was released in 2015 and started its own series. … Three years after his loss to \"Pretty\" Ricky Conlan, Adonis \"Donnie\" Creed, alongside his trainer Rocky Balboa\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Rocky_Balboa_(film)&oldid=1384177326",
   "https://en.wikipedia.org/w/index.php?title=Creed_II&oldid=1384987002"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "chartoff-winkler-productions",
  "label": "Chartoff-Winkler Productions",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "revolution-studios",
  "label": "Revolution Studios",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "metro-goldwyn-mayer",
  "label": "Metro-Goldwyn-Mayer",
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
export const SORT_BY_YEAR = ["rocky-main"];
