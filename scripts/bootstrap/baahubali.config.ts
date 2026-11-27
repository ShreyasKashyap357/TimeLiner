// Baahubali: no years are given; ordered by the stated prequel relationships.
// Generated from research (research-w4-b.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'baahubali', name: "Baahubali", short_name: "Baahubali", order: 62, enabled: true,
  accent: { primary: '#B8860B', secondary: '#8B0000' }, default_continuity: 'baahubali-main', data_dir: 'baahubali', last_verified: null,
  description: "The Baahubali films, the prequel novels and animated series, and the 2025 re-edit, in one continuity in story order.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "baahubali-main",
  "universe": "baahubali",
  "name": "Baahubali (films, animated series, prequel novels)",
  "short_name": "Baahubali",
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
  "description": "One continuity: the two Rajamouli films (and their re-edit), the two animated prequel series and Anand Neelakantan's prequel novel trilogy. Wikipedia frames every one of these as part of the franchise and as prequels to the films. No absolute in-universe years are given anywhere, so the order is relative only. Wikipedia: \"S. S. Rajamouli approached Indian novelist Anand Neelakantan to write a prequel trilogy of novels for the Baahubali film franchise. … The series serves as a prologue to Baahubali: The Beginning and Baahubali 2: The Conclusion. … Set before the events of the films, this prequel follows Baahubali and Bhallaladeva\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Baahubali_%28franchise%29&oldid=1387980366",
   "https://en.wikipedia.org/w/index.php?title=The_Rise_of_Sivagami&oldid=1388080087",
   "https://en.wikipedia.org/w/index.php?title=Baahubali%3A_The_Lost_Legends&oldid=1378488962",
   "https://en.wikipedia.org/w/index.php?title=Baahubali%3A_Crown_of_Blood&oldid=1387666729"
  ],
  "notes": "Wikipedia never says whether the novels, The Lost Legends and Crown of Blood agree with one another; each is only tied to the films. Kept in one continuity per the instruction (Wikipedia ties the novels to the film continuity); a stricter reading would split the tie-ins into their own continuities."
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "westland-books",
  "label": "Westland Books",
  "kind": "publisher",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "arka-media-works",
  "label": "Arka Media Works",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "graphic-india",
  "label": "Graphic India",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [
 {
  "id": "print-paperback",
  "label": "Print: paperback first edition",
  "kind": "print",
  "note": ""
 },
 {
  "id": "disney-plus-hotstar",
  "label": "Disney+ Hotstar",
  "kind": "streaming",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["baahubali-main"];
