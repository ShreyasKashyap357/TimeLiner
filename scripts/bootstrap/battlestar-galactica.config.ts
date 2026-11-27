// Battlestar Galactica: re-imagined continuity in story order from the stated offsets ("58 years before", "during season 2").
// Generated from research (research-w2-b.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'battlestar-galactica', name: "Battlestar Galactica", short_name: "Battlestar Galactica", order: 40, enabled: true,
  accent: { primary: '#9E2A2B', secondary: '#A7B1BC' }, default_continuity: 'bsg-reimagined', data_dir: 'battlestar-galactica', last_verified: null,
  description: "The original 1978 series with Galactica 1980, and the re-imagined continuity (2003 miniseries, 2004 series, Razor, The Plan, Caprica, Blood & Chrome).", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "bsg-original",
  "universe": "battlestar-galactica",
  "name": "Battlestar Galactica (original 1978 continuity)",
  "short_name": "Battlestar Galactica",
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
  "description": "Glen A. Larson's 1978–79 ABC series, its theatrical cut of the pilot (Saga of a Star World) and the sequel series Galactica 1980. Calendar: the series names only \"the seventh millennium of time\"; Galactica 1980 is set in Earth year 1980. Years are Earth (AD) years where given. Wikipedia: \"This was followed by a short-run sequel series, Galactica 1980 … Media table section … subtitle=Original continuity\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Battlestar_Galactica&oldid=1388019564"
  ],
  "notes": ""
 },
 {
  "id": "bsg-reimagined",
  "universe": "battlestar-galactica",
  "name": "Battlestar Galactica (re-imagined 2003 continuity)",
  "short_name": "Battlestar Galactica",
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
  "description": "Ronald D. Moore and David Eick's reboot: the 2003 miniseries, the 2004–09 series, the TV films Razor and The Plan, the prequel Caprica and Blood & Chrome. Calendar: no numbered year is ever given. Sources place events relative to the Cylon attack on the Twelve Colonies (the Fall) in the miniseries, the First Cylon War, and an epilogue 150,000 years before present-day Earth. Every unit is ordered relatively. Wikipedia: \"A \"re-imagined\" reboot aired as a two-part, three-hour miniseries developed by Ronald D. Moore and David Eick in 2003, followed by a 2004 television series, which aired until 2009. A prequel series, Caprica, aired in 2010. … Media table section … subtitle=New continuity\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Battlestar_Galactica&oldid=1388019564"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "universal-studios",
  "label": "Universal Studios",
  "kind": "studio",
  "short_label": "Universal Studios",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "glen-a-larson-productions",
  "label": "Glen A. Larson Productions",
  "kind": "studio",
  "short_label": "Glen A. Larson Productions",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "usa-cable-entertainment",
  "label": "USA Cable Entertainment",
  "kind": "studio",
  "short_label": "USA Cable Entertainment",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "david-eick-productions",
  "label": "David Eick Productions",
  "kind": "studio",
  "short_label": "David Eick Productions",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "universal-cable-productions",
  "label": "Universal Cable Productions",
  "kind": "studio",
  "short_label": "Universal Cable Productions",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [
 {
  "id": "sci-fi",
  "label": "Sci Fi Channel",
  "kind": "cable",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["bsg-original","bsg-reimagined"];
