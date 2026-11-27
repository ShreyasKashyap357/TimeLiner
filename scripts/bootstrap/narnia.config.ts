// Narnia: books ordered by Lewis's Outline of Narnian history (Earth years; Narnian years in labels).
// Generated from research (research-w2-c.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'narnia', name: "The Chronicles of Narnia", short_name: "Chronicles of Narnia", order: 32, enabled: true,
  accent: { primary: '#C8A24A', secondary: '#3D6B8C' }, default_continuity: 'narnia-books', data_dir: 'narnia', last_verified: null,
  description: "C. S. Lewis's seven novels and the screen adaptations, each adaptation family its own continuity.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "narnia-books",
  "universe": "narnia",
  "name": "The Chronicles of Narnia (novels)",
  "short_name": "The Chronicles of Narnia",
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
  "description": "C. S. Lewis's seven novels (1950-1956). In-universe dates come from Lewis's \"Outline of Narnian History\", published by Walter Hooper; two calendars (Earth years and Narnian years from the Creation). Narnian calendar: Lewis's \"Outline of Narnian History\" (published by Hooper) gives Narnian years counted from the Creation (year 1) alongside Earth years. Here `year` holds the Earth year; the Narnian year is in the label and in narnian_year / narnian_year_end. Narnia article: \"The entire Narnian timeline, from its creation to its end (c. 1-2555), ran parallel to 49 Earth-years (c. 1900-1949)\". Wikipedia: \"\"Lewis provided a timeline of events related to The Chronicles of Narnia, in emulation of The Tale of the Years chronology in J. R. R. Tolkien's The Lord of the Rings. He gave an \"Outline of Narnian History\" in manuscript form to Walter Hooper, who included it in his essay Past Watchful Dragons ... The novels never explicitly mention the year or years in which events take place, so the timeline is\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Narnia&oldid=1385078102",
   "https://en.wikipedia.org/w/index.php?title=The_Chronicles_of_Narnia&oldid=1386402893"
  ],
  "notes": ""
 },
 {
  "id": "narnia-walden-films",
  "universe": "narnia",
  "name": "The Chronicles of Narnia (Walden Media films, 2005-2010)",
  "short_name": "The Chronicles of Narnia",
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
  "description": "Walden Media film series adapting LWW, Prince Caspian and Dawn Treader. Separate adaptation continuity. Wikipedia: \"\"From the seven books, three were adapted ... The Lion, the Witch and the Wardrobe (2005), Prince Caspian (2008), and The Voyage of the Dawn Treader (2010) ... All were produced by Walden Media.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Chronicles_of_Narnia_%28film_series%29&oldid=1386714022"
  ],
  "notes": ""
 },
 {
  "id": "narnia-bbc-1988",
  "universe": "narnia",
  "name": "The Chronicles of Narnia (BBC television, 1988-1990)",
  "short_name": "The Chronicles of Narnia",
  "order": 3,
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
  "description": "BBC live-action/animated serials adapting four of the books; own adaptation continuity. Wikipedia: \"\"The Chronicles of Narnia is a British live-action-animated BBC-produced television series that was aired from 13 November 1988 to 23 December 1990 and is based on four books of C. S. Lewis's The Chronicles of Narnia series.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Chronicles_of_Narnia_%28TV_series%29&oldid=1382576192"
  ],
  "notes": ""
 },
 {
  "id": "narnia-1979-animated",
  "universe": "narnia",
  "name": "The Lion, the Witch and the Wardrobe (1979 animated)",
  "short_name": "The Lion, the Witch and the Wardrobe",
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
  "description": "Bill Melendez animated TV adaptation for CBS; standalone continuity. Wikipedia: \"\"The Lion, the Witch and the Wardrobe is an animated television program that was broadcast in two parts on CBS on April 1 and 2, 1979, based on the 1950 novel ... It was adapted by animator Bill Melendez.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Lion%2C_the_Witch_and_the_Wardrobe_%281979_film%29&oldid=1383819808"
  ],
  "notes": ""
 },
 {
  "id": "narnia-netflix",
  "universe": "narnia",
  "name": "Narnia (Netflix / Greta Gerwig)",
  "short_name": "Narnia",
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
  "description": "Netflix reboot of the adaptations (2018 deal); first film is Gerwig's The Magician's Nephew (upcoming). Separate from the Walden films. Wikipedia: \"\"Plans for a fourth film in the Walden series were abandoned when it was announced in 2018 that new adaptations would be made for Netflix.\" / \"On 3 October 2018, it was announced that Netflix and The C. S. Lewis Company had made a multi-year agreement to develop a new series of film and TV adaptations\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Chronicles_of_Narnia_%28film_series%29&oldid=1386714022"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "the-bodley-head",
  "label": "The Bodley Head",
  "kind": "publisher",
  "short_label": "The Bodley Head",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "geoffrey-bles",
  "label": "Geoffrey Bles",
  "kind": "publisher",
  "short_label": "Geoffrey Bles",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "walden-media",
  "label": "Walden Media",
  "kind": "studio",
  "short_label": "Walden Media",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "netflix",
  "label": "Netflix",
  "kind": "studio",
  "short_label": "Netflix",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "bill-melendez-productions",
  "label": "Bill Melendez Productions",
  "kind": "studio",
  "short_label": "Bill Melendez Productions",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "bbc",
  "label": "BBC",
  "kind": "studio",
  "short_label": "BBC",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["narnia-books","narnia-walden-films"];
