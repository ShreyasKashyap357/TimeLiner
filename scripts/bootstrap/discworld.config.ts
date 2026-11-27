// Discworld: the books "take place roughly in real time", so publication order is used (inferred).
// Generated from research (research-w2-d.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'discworld', name: "Discworld", short_name: "Discworld", order: 37, enabled: true,
  accent: { primary: '#E3A72F', secondary: '#5C3D8C' }, default_continuity: 'discworld-novels', data_dir: 'discworld', last_verified: null,
  description: "Terry Pratchett's 41 Discworld novels, grouped by sub-series, and the screen adaptations.", grouping_schemes: [{"id":"sub-series","label":"Sub-series","parent_scheme":null,"values":[{"id":"rincewind","label":"Rincewind","order":1,"parent":null},{"id":"witches","label":"Witches","order":2,"parent":null},{"id":"death","label":"Death","order":3,"parent":null},{"id":"city-watch","label":"City Watch","order":4,"parent":null},{"id":"tiffany-aching","label":"Tiffany Aching","order":5,"parent":null},{"id":"moist-von-lipwig","label":"Moist von Lipwig","order":6,"parent":null},{"id":"industrial-revolution","label":"Industrial Revolution","order":7,"parent":null},{"id":"ancient-civilisations","label":"Ancient Civilisations","order":8,"parent":null},{"id":"standalone","label":"Standalone","order":9,"parent":null}]}],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "discworld-novels",
  "universe": "discworld",
  "name": "Discworld (novels)",
  "short_name": "Discworld",
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
  "grouping_schemes": [
   "sub-series"
  ],
  "alt_orders": [],
  "description": "Terry Pratchett's 41 Discworld novels. No calendar years; the novels run roughly in real time in publication order, with Small Gods earlier. Wikipedia: \"\"The books take place roughly in real time and the characters' ages change to reflect the passing of years. ... The main exception is the stand-alone book Small Gods, which appears to take place at some point earlier than most of the other stories\" (Reading order section, tagged {{original research section}}).\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Discworld&oldid=1387370459"
  ],
  "notes": ""
 },
 {
  "id": "discworld-soul-music-1997",
  "universe": "discworld",
  "name": "Soul Music (1997 animated series)",
  "short_name": "Soul Music",
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
  "description": "Cosgrove Hall animated adaptation for Channel 4; its own screen continuity. Wikipedia: \"\"Soul Music is a seven-part animated television adaptation of the 1994 book by Terry Pratchett, produced by Channel 4 Television Corporation, Cosgrove Hall Films, ITEL, and Ventureworld Films.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Soul_Music_(TV_series)&oldid=1388285009"
  ],
  "notes": ""
 },
 {
  "id": "discworld-wyrd-sisters-1997",
  "universe": "discworld",
  "name": "Wyrd Sisters (1997 animated series)",
  "short_name": "Wyrd Sisters",
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
  "description": "Cosgrove Hall animated adaptation for Channel 4; its own screen continuity. Wikipedia: \"\"Wyrd Sisters is a six-part animated television adaptation of the Terry Pratchett novel, produced by Cosgrove Hall Films, and first broadcast on 18 May 1997.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Wyrd_Sisters_(TV_series)&oldid=1387311689"
  ],
  "notes": ""
 },
 {
  "id": "discworld-hogfather-2006",
  "universe": "discworld",
  "name": "Terry Pratchett's Hogfather (2006)",
  "short_name": "Terry Pratchett's Hogfather",
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
  "description": "Sky One two-part live-action adaptation by The Mob; own continuity (the Sky films share a producer and Pratchett cameos, but Wikipedia does not present them as one continuity). Wikipedia: \"\"Terry Pratchett's Hogfather is a 2006 two-part British Christmas-themed fantasy comedy television adaptation of Hogfather by Terry Pratchett, produced by The Mob ... it was the first live-action film adaptation of a Discworld novel.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Terry_Pratchett's_Hogfather&oldid=1387306583"
  ],
  "notes": ""
 },
 {
  "id": "discworld-colour-of-magic-2008",
  "universe": "discworld",
  "name": "Terry Pratchett's The Colour of Magic (2008)",
  "short_name": "Terry Pratchett's The Colour of Magic",
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
  "description": "Sky One two-part adaptation of the first two novels; own continuity. Wikipedia: \"\"Terry Pratchett's The Colour of Magic is a fantasy-comedy two-part British television adaptation of the bestselling novels The Colour of Magic (1983) and The Light Fantastic (1986) by Terry Pratchett.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Terry_Pratchett's_The_Colour_of_Magic&oldid=1387501236"
  ],
  "notes": ""
 },
 {
  "id": "discworld-going-postal-2010",
  "universe": "discworld",
  "name": "Terry Pratchett's Going Postal (2010)",
  "short_name": "Terry Pratchett's Going Postal",
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
  "description": "Sky One two-part adaptation; own continuity. Wikipedia: \"\"Terry Pratchett's Going Postal is a two-part television film adaptation of Going Postal by Terry Pratchett, adapted by Richard Kurti and Bev Doyle and produced by The Mob, which was first broadcast on Sky1 ... at the end of May 2010.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Terry_Pratchett's_Going_Postal&oldid=1387306572"
  ],
  "notes": ""
 },
 {
  "id": "discworld-amazing-maurice-film",
  "universe": "discworld",
  "name": "The Amazing Maurice (2022 film)",
  "short_name": "The Amazing Maurice",
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
  "description": "CGI-animated feature; own continuity. A sequel film is announced for 2027 (not released; excluded). Wikipedia: \"\"The Amazing Maurice is a 2022 animated fantasy comedy film ... based on the 2001 novel The Amazing Maurice and His Educated Rodents by Terry Pratchett.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Amazing_Maurice&oldid=1387958795"
  ],
  "notes": ""
 },
 {
  "id": "discworld-the-watch",
  "universe": "discworld",
  "name": "The Watch (2021 TV series)",
  "short_name": "The Watch",
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
  "description": "BBC America series \"inspired by\" the City Watch, a loose reimagining; own continuity. Wikipedia: \"\"The Watch is a fantasy police procedural television programme inspired by the Ankh-Morpork City Watch from the Discworld series of fantasy novels by Terry Pratchett.\" Discworld article: \"Rhianna Pratchett has since distanced herself from the adaptation.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Watch_(TV_series)&oldid=1383323942"
  ],
  "notes": ""
 },
 {
  "id": "discworld-troll-bridge-2019",
  "universe": "discworld",
  "name": "Troll Bridge (2019 short film)",
  "short_name": "Troll Bridge",
  "order": 9,
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
  "description": "Snowgum Films live-action/animated short adapting the Discworld short story; own continuity. Wikipedia: \"\"Troll Bridge (2019): A live-action / hand-animated short film by the Australian group Snowgum Films. It premiered at the Flickerfest International Film Festival in January 2019.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Troll_Bridge&oldid=1387966143"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "colin-smythe",
  "label": "Colin Smythe",
  "kind": "publisher",
  "short_label": "Colin Smythe",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "gollancz",
  "label": "Gollancz (Victor Gollancz Ltd)",
  "kind": "publisher",
  "short_label": "Gollancz (Victor Gollancz Ltd)",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "doubleday-london",
  "label": "Doubleday (London)",
  "kind": "publisher",
  "short_label": "Doubleday (London)",
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
  "id": "doubleday-childrens",
  "label": "Doubleday Children's",
  "kind": "publisher",
  "short_label": "Doubleday Children's",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "cosgrove-hall-films",
  "label": "Cosgrove Hall Films",
  "kind": "studio",
  "short_label": "Cosgrove Hall Films",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "the-mob",
  "label": "The Mob Film Company",
  "kind": "studio",
  "short_label": "The Mob Film Company",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "ulysses-filmproduktion",
  "label": "Ulysses Filmproduktion",
  "kind": "studio",
  "short_label": "Ulysses Filmproduktion",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "bbc-studios-drama-productions",
  "label": "BBC Studios Drama Productions",
  "kind": "studio",
  "short_label": "BBC Studios Drama Productions",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "snowgum-films",
  "label": "Snowgum Films",
  "kind": "studio",
  "short_label": "Snowgum Films",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [
 {
  "id": "channel-4",
  "label": "Channel 4",
  "kind": "broadcast",
  "note": ""
 },
 {
  "id": "sky-one",
  "label": "Sky One",
  "kind": "cable",
  "note": ""
 },
 {
  "id": "bbc-america",
  "label": "BBC America",
  "kind": "cable",
  "note": ""
 },
 {
  "id": "festival",
  "label": "Film festival premiere",
  "kind": "venue",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["discworld-novels","discworld-soul-music-1997","discworld-wyrd-sisters-1997","discworld-hogfather-2006","discworld-colour-of-magic-2008","discworld-going-postal-2010","discworld-amazing-maurice-film","discworld-the-watch","discworld-troll-bridge-2019"];
