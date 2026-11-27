// The Dark Tower: no years; ordered by volume and stated relative timing.
// Generated from research (research-w2-d.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'the-dark-tower', name: "The Dark Tower", short_name: "Dark Tower", order: 36, enabled: true,
  accent: { primary: '#8C2F2F', secondary: '#C9B37E' }, default_continuity: 'dark-tower-novels', data_dir: 'the-dark-tower', last_verified: null,
  description: "Stephen King's Dark Tower novels, the Marvel comics, the 2017 film (a canonical sequel), and King's books tied to the series.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "dark-tower-novels",
  "universe": "the-dark-tower",
  "name": "The Dark Tower (novels)",
  "short_name": "The Dark Tower",
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
  "description": "Stephen King's eight Dark Tower novels plus the novella The Little Sisters of Eluria, ordered by the series' own volume numbering (0.5, 1-4, 4.5, 5-7). Wikipedia: \"\"The Dark Tower is a series of eight novels, one novella, and a children's book written by American author Stephen King.\" Main-series table numbers the volumes 0.5 (The Little Sisters of Eluria), 1, 2, 3, 4, 4.5 (The Wind Through the Keyhole), 5, 6, 7.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Dark_Tower_(series)&oldid=1385871996"
  ],
  "notes": ""
 },
 {
  "id": "dark-tower-marvel-comics",
  "universe": "the-dark-tower",
  "name": "The Dark Tower (Marvel comics)",
  "short_name": "The Dark Tower",
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
  "description": "Marvel (later Gallery 13) comics plotted by Robin Furth and scripted by Peter David: a prequel run (Beginnings), then adaptations of The Gunslinger and The Drawing of the Three with new material. Kept separate from the novels: it is an adaptation/expansion, not the novels themselves. Wikipedia: \"\"The Dark Tower, first published in 2007, is a series of comic books (originally published by Marvel Comics and later republished by Gallery 13) based on Stephen King's The Dark Tower series of novels.\" ... \"the remaining volumes ... contained mostly new/original content which expanded upon details and events more briefly referenced throughout the novels.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Dark_Tower_(comics)&oldid=1376232041"
  ],
  "notes": ""
 },
 {
  "id": "dark-tower-2017-film",
  "universe": "the-dark-tower",
  "name": "The Dark Tower (2017 film)",
  "short_name": "The Dark Tower",
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
  "description": "Sony/MRC film. Wikipedia calls it a canonical sequel to the novels (Roland's next cycle), but it is a separate screen canon with its own events, so it gets its own continuity with a 'continues' link to book 7. Wikipedia: \"Film article lead: \"The film is also a canonical sequel to the novels.\" Series article: \"The film combines elements from several novels in The Dark Tower series, serving as a canonical sequel to the novel series. ... In July 2016, director Nikolaj Arcel confirmed that The Dark Tower film would be a sequel to the novels as well as a direct adaptation, with Roland in the next cycle of his journey to\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Dark_Tower_(2017_film)&oldid=1387060214 ; https://en.wikipedia.org/w/index.php?title=The_Dark_Tower_(series)&oldid=1385871996"
  ],
  "notes": ""
 },
 {
  "id": "dark-tower-related-king",
  "universe": "the-dark-tower",
  "name": "Related Stephen King works",
  "short_name": "Related Stephen King works",
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
  "description": "Other Stephen King novels that Wikipedia names as tied to the Dark Tower. Each is its own story; they are NOT part of the Dark Tower sequence. Ordered by publication only (no shared in-universe ordering is claimed). Wikipedia: \"\"Some of the principal books that are tied to this series, or that this series references, include It, The Stand, 'Salem's Lot, Insomnia, Hearts in Atlantis, Black House, The Eyes of the Dragon, The Shining, and Cell.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Dark_Tower_(series)&oldid=1385871996"
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
  "id": "donald-m-grant-publisher",
  "label": "Donald M. Grant, Publisher",
  "kind": "publisher",
  "short_label": "Donald M. Grant, Publisher",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "marvel-comics",
  "label": "Marvel Comics",
  "kind": "publisher",
  "short_label": "Marvel Comics",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "columbia-pictures",
  "label": "Columbia Pictures",
  "kind": "studio",
  "short_label": "Columbia Pictures",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "doubleday",
  "label": "Doubleday",
  "kind": "publisher",
  "short_label": "Doubleday",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "philtrum-press",
  "label": "Philtrum Press",
  "kind": "publisher",
  "short_label": "Philtrum Press",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "viking",
  "label": "Viking",
  "kind": "publisher",
  "short_label": "Viking",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "scribner",
  "label": "Scribner",
  "kind": "publisher",
  "short_label": "Scribner",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "random-house",
  "label": "Random House",
  "kind": "publisher",
  "short_label": "Random House",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [
 {
  "id": "print-comic",
  "label": "Print: comic issues",
  "kind": "print",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["dark-tower-novels","dark-tower-marvel-comics","dark-tower-2017-film","dark-tower-related-king"];
