// The Hunger Games: ordered by Games number (10th, 50th, 74th, 75th); no calendar years exist.
// Generated from research (research-w2-c.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'hunger-games', name: "The Hunger Games", short_name: "Hunger Games", order: 33, enabled: true,
  accent: { primary: '#D4572A', secondary: '#C9A227' }, default_continuity: 'hunger-games-books', data_dir: 'hunger-games', last_verified: null,
  description: "Suzanne Collins's novels and the film series, as separate continuities.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "hunger-games-books",
  "universe": "hunger-games",
  "name": "The Hunger Games (novels)",
  "short_name": "The Hunger Games",
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
  "description": "Suzanne Collins's five novels. The anchor is the Games number (e.g. 74th Hunger Games); sources give no calendar years, so year is null and order comes from Games numbers and \"N years before\" statements. Wikipedia: \"\"It is a prequel to the original The Hunger Games trilogy, set 64 years before the events of the first novel.\" (Ballad) / \"Set 24 years before the events of the first novel ... centers on the 50th Hunger Games\" (Sunrise on the Reaping)\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Ballad_of_Songbirds_and_Snakes&oldid=1387777714",
   "https://en.wikipedia.org/w/index.php?title=Sunrise_on_the_Reaping&oldid=1388152366"
  ],
  "notes": ""
 },
 {
  "id": "hunger-games-films",
  "universe": "hunger-games",
  "name": "The Hunger Games (Lionsgate films)",
  "short_name": "The Hunger Games",
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
  "description": "Lionsgate/Color Force film adaptations (2012-2026). Separate continuity from the novels. Wikipedia: \"\"Each was adapted into a film, forming The Hunger Games film series, with Mockingjay split into two feature-length motion pictures.\" / \"Color Force and Lionsgate collaborated on all four films.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Hunger_Games&oldid=1388224896",
   "https://en.wikipedia.org/w/index.php?title=The_Hunger_Games_%28franchise%29&oldid=1388305651"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "scholastic",
  "label": "Scholastic",
  "kind": "publisher",
  "short_label": "Scholastic",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "color-force",
  "label": "Color Force",
  "kind": "studio",
  "short_label": "Color Force",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["hunger-games-books","hunger-games-films"];
