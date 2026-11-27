// One Piece: anime in broadcast order; films beside their tie-in arcs (disputed).
// Generated from research (research-w3-d.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'one-piece', name: "One Piece", short_name: "One Piece", order: 47, enabled: true,
  accent: { primary: '#D62828', secondary: '#F2C14E' }, default_continuity: 'one-piece-anime', data_dir: 'one-piece', last_verified: null,
  description: "The One Piece anime with the tie-in films placed by their arcs (canon disputed), the manga, the older films, and the Netflix live-action series.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "one-piece-anime",
  "universe": "one-piece",
  "name": "One Piece anime (TV series and Oda-era films)",
  "short_name": "One Piece anime",
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
  "description": "Toei's 1999 TV anime, ordered by story/airing (seasons = Wikipedia story arcs, anime-original arcs where they air), plus the five films the brief treats as canon/semi-canon (Strong World, Z, Gold, Stampede, Red), each placed next to its TV tie-in arc. Wikipedia does NOT call these films canon (see film notes), so their placement is \"disputed\". No numbered years exist in the story. Wikipedia: \"| auxA5 = TV Original … With the release of films ten, twelve, thirteen, and fourteen, tie-in story arcs of the TV series were aired concurrently.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=List_of_One_Piece_episodes&oldid=1384009690",
   "https://en.wikipedia.org/w/index.php?title=List_of_One_Piece_films&oldid=1379420201"
  ],
  "notes": ""
 },
 {
  "id": "one-piece-manga",
  "universe": "one-piece",
  "name": "One Piece manga",
  "short_name": "One Piece manga",
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
  "description": "Eiichiro Oda's manga, the source text. Separate from the anime (which has anime-original arcs) and from the films (Oda \"does not connect the films to his manga\"). Wikipedia: \"He stated that he does not connect the films to his manga, as doing so would make outside material effectively obligatory\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=One_Piece_Film%3A_Strong_World&oldid=1380815820",
   "https://en.wikipedia.org/w/index.php?title=One_Piece&oldid=1386443140"
  ],
  "notes": ""
 },
 {
  "id": "one-piece-anime-films-noncanon",
  "universe": "one-piece",
  "name": "One Piece anime films (non-canon)",
  "short_name": "One Piece anime films",
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
  "description": "The ten earlier theatrical films (2000–2011) with original or retold stories. Wikipedia says the films cannot share one continuity, so they are ordered by release only. Wikipedia: \"They feature self-contained, completely original plots, or alternate retellings of story arcs with animation of a higher quality than that of the regular anime series. … The films themselves offer contradictions in both chronology and design that make them incompatible with a single continuity.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=One_Piece&oldid=1386443140"
  ],
  "notes": ""
 },
 {
  "id": "one-piece-netflix",
  "universe": "one-piece",
  "name": "One Piece (Netflix live-action)",
  "short_name": "One Piece",
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
  "description": "Netflix's live-action adaptation; its own continuity, retelling the manga from East Blue. Wikipedia: \"The series is a live-action adaptation of the 1997 Japanese manga series One Piece by Eiichiro Oda, who also serves as a creative consultant.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=One_Piece_(2023_TV_series)&oldid=1387550037"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "toei-animation",
  "label": "Toei Animation",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "shueisha",
  "label": "Shueisha",
  "kind": "publisher",
  "short_label": "Shueisha",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "tomorrow-studios",
  "label": "Tomorrow Studios",
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
  "id": "print-magazine-serial",
  "label": "Print: serialised in a magazine",
  "kind": "serialized",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["one-piece-anime","one-piece-manga","one-piece-anime-films-noncanon","one-piece-netflix"];
