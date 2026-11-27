// Dune: books by AG/BG year where stated (mostly inferred from the Dune Wiki); screen continuities in story order.
// Generated from research (research-w2-b.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'dune', name: "Dune", short_name: "Dune", order: 42, enabled: true,
  accent: { primary: '#D08C3A', secondary: '#3F5E7A' }, default_continuity: 'dune-books', data_dir: 'dune', last_verified: null,
  description: "Frank Herbert's novels with the Brian Herbert and Kevin J. Anderson books, and each screen adaptation family as its own continuity.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "dune-books",
  "universe": "dune",
  "name": "Dune (novels)",
  "short_name": "Dune",
  "order": 1,
  "kind": "shared",
  "calendar": {
   "kind": "era",
   "label_position": "after",
   "pad": 0,
   "before_label": "BG",
   "after_label": "AG",
   "has_year_zero": false,
   "note": "Years Before / After the Guild (the Spacing Guild's founding). Dune is set in 10,191 AG."
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
  "description": "Frank Herbert's six novels plus the Brian Herbert / Kevin J. Anderson prequels and sequels. Wikipedia places all of them in one Dune universe timeline and calls Hunters and Sandworms the books that \"complete the original series\", so they share this continuity. The BH/KJA books' claimed basis in Frank Herbert's notes and their canonicity are debated by readers; Wikipedia flags the notes with a template, but the fetched text has no explicit canon ruling. Calendar: Imperial years After Guild (AG) and Before Guild (BG), counted from the founding of the Spacing Guild. Years are stored as signed integers: AG positive (10191 AG = 10191), BG negative (108 BG = -108). Labels use the source wording. Wikipedia: \"Creative works set in the Dune universe can be said to fall into five general time periods … The sequels Hunters of Dune (2006) and Sandworms of Dune (2007) by Brian Herbert and Kevin J. Anderson complete the original series and wrap up storylines that began with Heretics of Dune.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Dune_(franchise)&oldid=1387982845"
  ],
  "notes": ""
 },
 {
  "id": "dune-lynch",
  "universe": "dune",
  "name": "Dune (1984 film)",
  "short_name": "Dune",
  "order": 2,
  "kind": "shared",
  "calendar": {
   "kind": "era",
   "label_position": "after",
   "pad": 0,
   "before_label": "BG",
   "after_label": "AG",
   "has_year_zero": false,
   "note": "Years Before / After the Guild (the Spacing Guild's founding). Dune is set in 10,191 AG."
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
  "description": "David Lynch's film adaptation of the first novel. It is a standalone adaptation, separate from the books and from the other screen versions. Calendar: Imperial years After Guild (AG) and Before Guild (BG), counted from the founding of the Spacing Guild. Years are stored as signed integers: AG positive (10191 AG = 10191), BG negative (108 BG = -108). Labels use the source wording. Wikipedia: \"In the year 10,191, the known universe is ruled by the Padishah Emperor Shaddam IV.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Dune_(1984_film)&oldid=1388292494"
  ],
  "notes": ""
 },
 {
  "id": "dune-scifi",
  "universe": "dune",
  "name": "Dune (Sci Fi Channel miniseries)",
  "short_name": "Dune",
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
  "description": "John Harrison's 2000 miniseries and its 2003 sequel Children of Dune (adapting Dune Messiah and Children of Dune). Wikipedia: \"Children of Dune is the sequel to the 2000 miniser\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Frank_Herbert's_Children_of_Dune&oldid=1383911045",
   "https://en.wikipedia.org/w/index.php?title=Frank_Herbert's_Dune&oldid=1384874290"
  ],
  "notes": ""
 },
 {
  "id": "dune-villeneuve",
  "universe": "dune",
  "name": "Dune (Legendary film and television continuity)",
  "short_name": "Dune",
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
  "description": "Denis Villeneuve's films and the HBO prequel series Dune: Prophecy, which Wikipedia calls a prequel to those films and Legendary ordered as a spin-off from them. Calendar: Imperial years After Guild (AG) and Before Guild (BG), counted from the founding of the Spacing Guild. Years are stored as signed integers: AG positive (10191 AG = 10191), BG negative (108 BG = -108). Labels use the source wording. Wikipedia: \"Dune: Prophecy is a prequel to the Denis Villeneuve films Dune (2021) and Dune: Part Two (2024), taking place approximately 10,000 years earlier. … Legendary Television ordered the series in 2019 as a spin-off project from Villeneuve's films.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Dune%3A_Prophecy&oldid=1387206308"
  ],
  "notes": ""
 },
 {
  "id": "dune-awakening",
  "universe": "dune",
  "name": "Dune: Awakening (alternate timeline)",
  "short_name": "Dune: Awakening",
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
  "description": "Funcom's 2025 game is set in an alternate timeline where Paul Atreides is never born, so it is its own continuity. Wikipedia: \"The opening cinematic is narrated by Paul Atreides, in which he reveals a vision of an alternate timeline in which he is never born\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Dune%3A_Awakening&oldid=1388104025"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "chilton-books",
  "label": "Chilton Books",
  "kind": "publisher",
  "short_label": "Chilton Books",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "g-p-putnams-sons",
  "label": "G. P. Putnam's Sons",
  "kind": "publisher",
  "short_label": "G. P. Putnam's Sons",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "bantam-spectra",
  "label": "Bantam Spectra",
  "kind": "publisher",
  "short_label": "Bantam Spectra",
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
  "id": "dino-de-laurentiis-corporation",
  "label": "Dino De Laurentiis Corporation",
  "kind": "studio",
  "short_label": "Dino De Laurentiis Corporation",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "new-amsterdam-entertainment",
  "label": "New Amsterdam Entertainment",
  "kind": "studio",
  "short_label": "New Amsterdam Entertainment",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "blixa-film-produktion",
  "label": "Blixa Film Produktion",
  "kind": "studio",
  "short_label": "Blixa Film Produktion",
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
  "id": "legendary-television",
  "label": "Legendary Television",
  "kind": "studio",
  "short_label": "Legendary Television",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "funcom",
  "label": "Funcom",
  "kind": "studio",
  "short_label": "Funcom",
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
export const SORT_BY_YEAR = ["dune-books","dune-lynch","dune-scifi","dune-villeneuve","dune-awakening"];
