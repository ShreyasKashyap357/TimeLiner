// Sherlock Holmes: Doyle's canon by stated years where given; contemporary adaptations in broadcast order.
// Generated from research (research-w3-a.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'sherlock-holmes', name: "Sherlock Holmes", short_name: "Sherlock Holmes", order: 48, enabled: true,
  accent: { primary: '#8B6F47', secondary: '#2F4F4F' }, default_continuity: 'sherlock-holmes-canon', data_dir: 'sherlock-holmes', last_verified: null,
  description: "Arthur Conan Doyle's stories and the most notable adaptations (Rathbone films, Granada with Jeremy Brett, BBC Sherlock, Elementary, the Ritchie films, Enola Holmes), each its own continuity.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "sherlock-holmes-canon",
  "universe": "sherlock-holmes",
  "name": "Arthur Conan Doyle canon",
  "short_name": "Arthur Conan Doyle canon",
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
  "description": "The four novels and five short-story collections by Arthur Conan Doyle (the 60 canonical stories). Wikipedia: \"Traditionally, the canon of Sherlock Holmes consists of the 56 short stories and four novels written by the British writer and physician Sir Arthur Conan Doyle.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Canon_of_Sherlock_Holmes&oldid=1386610419"
  ],
  "notes": ""
 },
 {
  "id": "sherlock-holmes-rathbone",
  "universe": "sherlock-holmes",
  "name": "Basil Rathbone films (1939-1946)",
  "short_name": "Basil Rathbone films",
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
  "description": "14 films with Basil Rathbone and Nigel Bruce: two Victorian-set Fox films, then twelve Universal films updated to the then-present Second World War era. Wikipedia: \"A series of fourteen films based on Sir Arthur Conan Doyle's Sherlock Holmes stories was released between 1939 and 1946; the British actors Basil Rathbone and Nigel Bruce played Holmes and Dr. John Watson, respectively. The two films from Fox had large budgets, high production values and were set in the Victorian era.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Sherlock_Holmes_(1939_film_series)&oldid=1382952942"
  ],
  "notes": ""
 },
 {
  "id": "sherlock-holmes-granada",
  "universe": "sherlock-holmes",
  "name": "Granada Sherlock Holmes (Jeremy Brett, 1984-1994)",
  "short_name": "Granada Sherlock Holmes",
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
  "description": "Granada Television adaptations for ITV, four named series. Wikipedia: \"Sherlock Holmes is the overall title given to the series of Sherlock Holmes adaptations produced by the British television company Granada Television between 24 April 1984 and 11 April 1994.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Sherlock_Holmes_(1984_TV_series)&oldid=1387302905"
  ],
  "notes": ""
 },
 {
  "id": "sherlock-bbc",
  "universe": "sherlock-holmes",
  "name": "Sherlock (BBC, 2010-2017)",
  "short_name": "Sherlock",
  "order": 4,
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
  "description": "Moffat/Gatiss contemporary adaptation, four series plus the Victorian-set special The Abominable Bride. Wikipedia: \"The series is set in the present day. The one-off special features a Victorian-period fantasy resembling the original Holmes stories. Sherlock is a mystery crime drama television series that presents a contemporary adaptation of Sir Arthur Conan Doyle's Sherlock Holmes detective stories.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Sherlock_(TV_series)&oldid=1387302901"
  ],
  "notes": ""
 },
 {
  "id": "sherlock-elementary",
  "universe": "sherlock-holmes",
  "name": "Elementary (CBS, 2012-2019)",
  "short_name": "Elementary",
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
  "description": "CBS contemporary update set in New York City. Wikipedia: \"Elementary is an American procedural comedy-drama television series that presented a contemporary update of Arthur Conan Doyle's character Sherlock Holmes. The series was set and filmed primarily in New York City.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Elementary_(TV_series)&oldid=1388003299"
  ],
  "notes": ""
 },
 {
  "id": "sherlock-holmes-ritchie",
  "universe": "sherlock-holmes",
  "name": "Guy Ritchie films (2009-2011)",
  "short_name": "Guy Ritchie films",
  "order": 6,
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
  "description": "Warner Bros. films with Robert Downey Jr. and Jude Law. Wikipedia: \"In 1891, a series of bombings blamed on political radicals bring France and Germany to the brink of war.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Sherlock_Holmes%3A_A_Game_of_Shadows&oldid=1388287168"
  ],
  "notes": ""
 },
 {
  "id": "enola-holmes-films",
  "universe": "sherlock-holmes",
  "name": "Enola Holmes films (Netflix)",
  "short_name": "Enola Holmes films",
  "order": 7,
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
  "description": "Netflix films with Millie Bobby Brown, based on (the first) / inspired by Nancy Springer's The Enola Holmes Mysteries. Springer's novels themselves are out of scope. Wikipedia: \"Enola Holmes 2 is a 2022 mystery film and the sequel to the 2020 film Enola Holmes, both of which star Millie Bobby Brown as the title character, the teenage sister of the already-famous Victorian-era detective Sherlock Holmes (portrayed by Henry Cavill). The film is directed by Harry Bradbeer from an original screenplay by Jack\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Enola_Holmes_2&oldid=1388046534"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "ward-lock-co",
  "label": "Ward Lock & Co",
  "kind": "publisher",
  "short_label": "Ward Lock & Co",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "spencer-blackett",
  "label": "Spencer Blackett",
  "kind": "publisher",
  "short_label": "Spencer Blackett",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "george-newnes",
  "label": "George Newnes Ltd",
  "kind": "publisher",
  "short_label": "George Newnes Ltd",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "mcclure-phillips-co",
  "label": "McClure, Phillips & Co.",
  "kind": "publisher",
  "short_label": "McClure, Phillips & Co.",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "george-h-doran-company",
  "label": "George H. Doran Company",
  "kind": "publisher",
  "short_label": "George H. Doran Company",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "john-murray",
  "label": "John Murray",
  "kind": "publisher",
  "short_label": "John Murray",
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
  "id": "granada-television",
  "label": "Granada Television",
  "kind": "studio",
  "short_label": "Granada Television",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "hartswood-films",
  "label": "Hartswood Films",
  "kind": "studio",
  "short_label": "Hartswood Films",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "village-roadshow-pictures",
  "label": "Village Roadshow Pictures",
  "kind": "studio",
  "short_label": "Village Roadshow Pictures",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "legendary-pictures",
  "label": "Legendary Pictures",
  "kind": "studio",
  "short_label": "Legendary Pictures",
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
 }
];
export const PLATFORMS: Platform[] = [];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["sherlock-holmes-canon","sherlock-holmes-rathbone","sherlock-holmes-granada","sherlock-bbc","sherlock-elementary","sherlock-holmes-ritchie","enola-holmes-films"];
