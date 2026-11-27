// Twin Peaks: ordered by stated years; Frost's books are disputed.
// Generated from research (research-w2-a.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'twin-peaks', name: "Twin Peaks", short_name: "Twin Peaks", order: 31, enabled: true,
  accent: { primary: '#7A1F2B', secondary: '#2E6B4E' }, default_continuity: 'twin-peaks-main', data_dir: 'twin-peaks', last_verified: null,
  description: "Twin Peaks on TV and film, The Missing Pieces, and the tie-in books (canon per Wikipedia, with contradictions).", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "twin-peaks-main",
  "universe": "twin-peaks",
  "name": "Twin Peaks",
  "short_name": "Twin Peaks",
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
  "description": "The ABC series, the prequel film Fire Walk with Me and its Missing Pieces, the 2017 Showtime revival, and the official tie-in books, which Wikipedia calls intended canon despite internal contradictions. Wikipedia: \"Frost emphasized that the new episodes were not a remake or reboot, but a continuation of the series and film … These books are intended to be canon to the franchise and expand upon the storylines portrayed in the series and film; they do contain some continuity errors and contradictions, however—some of which may be intentional.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Twin_Peaks&oldid=1387258567",
   "https://en.wikipedia.org/w/index.php?title=Twin_Peaks_books&oldid=1370208804"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "studio-not-stated",
  "label": "Studio not stated",
  "kind": "studio",
  "short_label": "Studio not stated",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "ciby-pictures",
  "label": "CiBy 2000",
  "kind": "studio",
  "short_label": "CiBy 2000",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "pocket-books",
  "label": "Pocket Books",
  "kind": "publisher",
  "short_label": "Pocket Books",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "simon-schuster-audio",
  "label": "Simon & Schuster Audio",
  "kind": "publisher",
  "short_label": "Simon & Schuster Audio",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "flatiron-books",
  "label": "Flatiron Books",
  "kind": "publisher",
  "short_label": "Flatiron Books",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["twin-peaks-main"];
