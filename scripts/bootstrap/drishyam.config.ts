// Drishyam: each language's series is its own continuity; years from the films' stated dates.
// Generated from research (research-w4-c.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'drishyam', name: "Drishyam", short_name: "Drishyam", order: 61, enabled: true,
  accent: { primary: '#37474F', secondary: '#FF7043' }, default_continuity: 'drishyam-malayalam', data_dir: 'drishyam', last_verified: null,
  description: "The Malayalam Drishyam films and each language's remakes as separate continuities.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "drishyam-malayalam",
  "universe": "drishyam",
  "name": "Drishyam (Malayalam original series)",
  "short_name": "Drishyam",
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
  "description": "Jeethu Joseph's Malayalam original trilogy about Georgekutty and his family. Wikipedia: \"''Drishyam'' is an Indian [[Malayalam]]-language [[Crime thriller film|crime thriller]] [[film series]], written and directed by [[Jeethu Joseph]] … films = Drishyam (2013), Drishyam 2 (2021), Drishyam 3 (2026)\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Drishyam_%28film_series%29&oldid=1387997708"
  ],
  "notes": ""
 },
 {
  "id": "drishyam-hindi",
  "universe": "drishyam",
  "name": "Drishyam (Hindi remake series)",
  "short_name": "Drishyam",
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
  "description": "The Hindi remakes, with Ajay Devgn as Vijay Salgaonkar. Drishyam: The Conclusion (2026) is a Hindi sequel with an original story, not a remake of the Malayalam Drishyam 3. Wikipedia: \"Unlike its predecessors, the film features an original story and is not narratively connected to its [[Drishyam 3|Malayalam counterpart]].\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Drishyam%3A_The_Conclusion&oldid=1388240019",
   "https://en.wikipedia.org/w/index.php?title=Drishyam_%28film_series%29&oldid=1387997708"
  ],
  "notes": ""
 },
 {
  "id": "drishyam-telugu",
  "universe": "drishyam",
  "name": "Drushyam (Telugu remake series)",
  "short_name": "Drushyam",
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
  "description": "Telugu remakes with Venkatesh as Rambabu. Wikipedia: \"It is a remake of his 2021 [[Malayalam]] film ''[[Drishyam 2]]'' and sequel to ''[[Drushyam]]'' (2014).\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Drushyam_2&oldid=1387994189"
  ],
  "notes": ""
 },
 {
  "id": "drishyam-kannada",
  "universe": "drishyam",
  "name": "Drishya (Kannada remake series)",
  "short_name": "Drishya",
  "order": 4,
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
  "description": "Kannada remakes by P. Vasu with Ravichandran as Rajendra. Wikipedia: \"It is a remake of the 2021 Malayalam film ''[[Drishyam 2]]'' (2021) and a sequel to ''[[Drishya]]'' (2014).\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Drishya_2&oldid=1384301632"
  ],
  "notes": ""
 },
 {
  "id": "drishyam-tamil",
  "universe": "drishyam",
  "name": "Papanasam (Tamil remake)",
  "short_name": "Papanasam",
  "order": 5,
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
  "description": "Jeethu Joseph's own Tamil remake. Drishyam 2 got no Tamil remake (\"Jeethu had plans to direct a Tamil remake\"). Wikipedia: \"A remake of Jeethu's own 2013 [[Malayalam]] film ''[[Drishyam]]''\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Papanasam_%28film%29&oldid=1388006997",
   "https://en.wikipedia.org/w/index.php?title=Drishyam_%28film_series%29&oldid=1387997708"
  ],
  "notes": ""
 },
 {
  "id": "drishyam-sinhala",
  "universe": "drishyam",
  "name": "Dharmayuddhaya (Sinhala remake series)",
  "short_name": "Dharmayuddhaya",
  "order": 6,
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
  "description": "Sri Lankan Sinhala remakes. Wikipedia: \"It is the sequel to the 2017 ''[[Dharmayuddhaya]]'' and is a remake of the Indian [[Malayalam language|Malayalam]] film ''[[Drishyam 2]]'' (2021).\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Dharmayuddhaya_2&oldid=1382958969",
   "https://en.wikipedia.org/w/index.php?title=Dharmayuddhaya&oldid=1378725941"
  ],
  "notes": ""
 },
 {
  "id": "drishyam-chinese",
  "universe": "drishyam",
  "name": "Sheep Without a Shepherd (Chinese remake)",
  "short_name": "Sheep Without a Shepherd",
  "order": 7,
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
  "description": "An official Mandarin Chinese remake of Drishyam (2013). Wikipedia: \"It is an official remake of the 2013 Indian [[Malayalam film|Malayalam]] film ''[[Drishyam]]''.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Sheep_Without_a_Shepherd&oldid=1376984213"
  ],
  "notes": ""
 },
 {
  "id": "drishyam-indonesian",
  "universe": "drishyam",
  "name": "Ayah, Aku Mau Cerita... (Indonesian remake)",
  "short_name": "Ayah, Aku Mau Cerita...",
  "order": 8,
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
  "description": "An Indonesian remake of Drishyam (2013). It has no English Wikipedia article. Wikipedia: \"|[[Indonesian language|Indonesian]] |''Ayah, Aku Mau Cerita...'' (2026) |[[Vino G. Bastian]], Niken Anjani, [[Marsha Timothy]] |Danial Rifki\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Drishyam_%28film_series%29&oldid=1387997708",
   "https://en.wikipedia.org/w/index.php?title=Drishyam&oldid=1387997704"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "aashirvad-cinemas",
  "label": "Aashirvad Cinemas",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "panorama-studios",
  "label": "Panorama Studios",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "suresh-productions",
  "label": "Suresh Productions",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "e4-entertainment",
  "label": "E4 Entertainment",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "wide-angle-creations",
  "label": "Wide Angle Creations",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "mtv-channel",
  "label": "MTV Channel (Sri Lanka)",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "perfect-sky-pictures",
  "label": "Perfect Sky Pictures",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "studio-not-stated",
  "label": "Studio Not Stated",
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
export const SORT_BY_YEAR = ["drishyam-malayalam","drishyam-hindi","drishyam-telugu","drishyam-kannada","drishyam-tamil","drishyam-sinhala","drishyam-chinese","drishyam-indonesian"];
