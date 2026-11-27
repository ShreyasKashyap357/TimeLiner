// LEGO. Each LEGO world is its own continuity (The Lego Movie, Ninjago, Bionicle G1/G2, ...). Licensed LEGO titles of other franchises stay in those universes (Star Wars, Marvel, DC).
// Generated from research (research-lego.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'lego', name: "LEGO", short_name: "LEGO", order: 23, enabled: true,
  accent: { primary: '#F2C200', secondary: '#D01012' }, default_continuity: 'lego-movie', data_dir: 'lego', last_verified: null,
  description: "The Lego Movie franchise and LEGO's own worlds: Ninjago, Bionicle, Chima, Nexo Knights, Monkie Kid, Dreamzzz, Friends and more, plus LEGO's own games. LEGO versions of other franchises live in those universes.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "lego-movie",
  "universe": "lego",
  "name": "The Lego Movie",
  "short_name": "The Lego Movie",
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
  "description": "Wikipedia: \"'''''The Lego Movie''''' is an American [[media franchise]] and [[shared universe]] based on [[Lego]] [[construction toy]]s.\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/undefined"
  ],
  "notes": ""
 },
 {
  "id": "ninjago",
  "universe": "lego",
  "name": "Ninjago (TV)",
  "short_name": "Ninjago",
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
  "description": "Wikipedia: \"A sequel series titled ''[[Ninjago: Dragons Rising]]'', set in the same continuity, debuted on June 1, 2023.\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/undefined"
  ],
  "notes": ""
 },
 {
  "id": "legends-of-chima",
  "universe": "lego",
  "name": "Legends of Chima",
  "short_name": "Legends of Chima",
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
  "description": "",
  "source_urls": [
   "https://en.wikipedia.org/wiki/undefined"
  ],
  "notes": ""
 },
 {
  "id": "nexo-knights",
  "universe": "lego",
  "name": "Nexo Knights",
  "short_name": "Nexo Knights",
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
  "description": "",
  "source_urls": [
   "https://en.wikipedia.org/wiki/undefined"
  ],
  "notes": ""
 },
 {
  "id": "monkie-kid",
  "universe": "lego",
  "name": "Monkie Kid",
  "short_name": "Monkie Kid",
  "order": 5,
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
  "description": "",
  "source_urls": [
   "https://en.wikipedia.org/wiki/undefined"
  ],
  "notes": ""
 },
 {
  "id": "dreamzzz",
  "universe": "lego",
  "name": "Lego Dreamzzz",
  "short_name": "Lego Dreamzzz",
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
  "description": "",
  "source_urls": [
   "https://en.wikipedia.org/wiki/undefined"
  ],
  "notes": ""
 },
 {
  "id": "lego-city-adventures",
  "universe": "lego",
  "name": "Lego City Adventures",
  "short_name": "Lego City Adventures",
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
  "description": "",
  "source_urls": [
   "https://en.wikipedia.org/wiki/undefined"
  ],
  "notes": ""
 },
 {
  "id": "lego-friends-heartlake-city",
  "universe": "lego",
  "name": "Lego Friends (original cast, 2013–2022)",
  "short_name": "Lego Friends",
  "order": 8,
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
  "description": "Wikipedia: \"Animated series, TV specials, and Films based on Lego Friends have been released to accompany the product line. The story follows the adventures of the original cast in their hometown of Heartlake City.\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/undefined"
  ],
  "notes": ""
 },
 {
  "id": "lego-friends-next-chapter",
  "universe": "lego",
  "name": "Lego Friends: The Next Chapter",
  "short_name": "Lego Friends: The Next Chapter",
  "order": 9,
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
  "description": "Wikipedia: \"In October 2022, The Lego Group announced the relaunch of the brand, which introduced eight new characters in January 2023 named Aliya, Autumn, Leo, Liann, Nova, Olly, Paisley, and Zac. The lineup represents a new generation of characters accompanied by a new series.\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/undefined"
  ],
  "notes": ""
 },
 {
  "id": "lego-elves",
  "universe": "lego",
  "name": "Lego Elves (2015–2018)",
  "short_name": "Lego Elves",
  "order": 10,
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
  "description": "",
  "source_urls": [
   "https://en.wikipedia.org/wiki/undefined"
  ],
  "notes": ""
 },
 {
  "id": "lego-elves-secrets-of-elvendale",
  "universe": "lego",
  "name": "Lego Elves: Secrets of Elvendale",
  "short_name": "Lego Elves: Secrets of Elvendale",
  "order": 11,
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
  "description": "Wikipedia: \"The series is a more detailed retelling of the story featured in Season 3 of the webisodes (webisodes 18 - 33).\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/undefined"
  ],
  "notes": ""
 },
 {
  "id": "bionicle-g1",
  "universe": "lego",
  "name": "Bionicle (Generation 1)",
  "short_name": "Bionicle",
  "order": 12,
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
  "description": "Wikipedia: \"It is a prequel to the first film, ''[[Bionicle: Mask of Light]]''.\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/undefined"
  ],
  "notes": ""
 },
 {
  "id": "bionicle-g2",
  "universe": "lego",
  "name": "Bionicle (Generation 2)",
  "short_name": "Bionicle",
  "order": 13,
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
  "description": "Wikipedia: \"A reboot of the original story, the revival chronicles the adventures of six elemental Toa heroes who protect the bio-mechanical inhabitants of the mystical island of Okoto from Makuta and his minions.\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/undefined"
  ],
  "notes": ""
 },
 {
  "id": "hero-factory",
  "universe": "lego",
  "name": "Hero Factory",
  "short_name": "Hero Factory",
  "order": 14,
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
  "description": "",
  "source_urls": [
   "https://en.wikipedia.org/wiki/undefined"
  ],
  "notes": ""
 },
 {
  "id": "galidor",
  "universe": "lego",
  "name": "Galidor",
  "short_name": "Galidor",
  "order": 15,
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
  "description": "",
  "source_urls": [
   "https://en.wikipedia.org/wiki/undefined"
  ],
  "notes": ""
 },
 {
  "id": "lego-games",
  "universe": "lego",
  "name": "LEGO original games",
  "short_name": "LEGO original games",
  "order": 16,
  "kind": "standalone-collection",
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
  "description": "",
  "source_urls": [],
  "notes": ""
 },
 {
  "id": "lego-standalone",
  "universe": "lego",
  "name": "LEGO standalone films",
  "short_name": "LEGO standalone films",
  "order": 17,
  "kind": "standalone-collection",
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
  "description": "",
  "source_urls": [
   "https://en.wikipedia.org/wiki/undefined"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "warner-animation-group",
  "label": "Warner Animation Group",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "the-lego-group",
  "label": "The Lego Group",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "warner-bros",
  "label": "Warner Bros",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "wil-film-aps",
  "label": "Wil Film Aps",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "wildbrain-studios",
  "label": "Wildbrain Studios",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "flying-bark-productions",
  "label": "Flying Bark Productions",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "pure-imagination-studios",
  "label": "Pure Imagination Studios",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "circus",
  "label": "Circus",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "ja-film",
  "label": "Ja Film",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "studio-mir",
  "label": "Studio Mir",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "miramax-home-entertainment",
  "label": "Miramax Home Entertainment",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "tinseltown-toons",
  "label": "Tinseltown Toons",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "showrunners-mathieu-boucher-jean-franc-ois-tremblay",
  "label": "Showrunners Mathieu Boucher Jean Franc Ois Tremblay",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "threshold-animation-studios",
  "label": "Threshold Animation Studios",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "cine-groupe",
  "label": "Cine Groupe",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "universal-animation-studios",
  "label": "Universal Animation Studios",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "tt-fusion",
  "label": "Tt Fusion",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "travellers-tales",
  "label": "Travellers Tales",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "hellbent-games",
  "label": "Hellbent Games",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "tt-games-tt-fusion",
  "label": "Tt Games Tt Fusion",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "wb-games-montre-al",
  "label": "Wb Games Montre Al",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "mindscape",
  "label": "Mindscape",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "high-voltage-software",
  "label": "High Voltage Software",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "saffire",
  "label": "Saffire",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "argonaut-games",
  "label": "Argonaut Games",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "argonaut-games-argonaut-sheffield-mo-bius-entertainment",
  "label": "Argonaut Games Argonaut Sheffield Mo Bius Entertainment",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "travellers-tales-amaze-entertainment",
  "label": "Travellers Tales Amaze Entertainment",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "netdevil",
  "label": "Netdevil",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "red-games-co",
  "label": "Red Games Co",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "light-brick-studio",
  "label": "Light Brick Studio",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "gameloft",
  "label": "Gameloft",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "clockstone-studio",
  "label": "Clockstone Studio",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "visual-concepts",
  "label": "Visual Concepts",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "smg-studio",
  "label": "Smg Studio",
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
  "id": "amazon-kids",
  "label": "Amazon Kids+",
  "kind": "broadcast",
  "note": ""
 },
 {
  "id": "nickelodeon",
  "label": "Nickelodeon",
  "kind": "broadcast",
  "note": ""
 },
 {
  "id": "kidsclick",
  "label": "KidsClick",
  "kind": "broadcast",
  "note": ""
 },
 {
  "id": "youtube-and-peacock",
  "label": "YouTube and Peacock",
  "kind": "broadcast",
  "note": ""
 },
 {
  "id": "ps3",
  "label": "PS3",
  "kind": "broadcast",
  "note": ""
 },
 {
  "id": "switch",
  "label": "Switch",
  "kind": "game-platform",
  "note": ""
 },
 {
  "id": "ps-vita",
  "label": "PS Vita",
  "kind": "broadcast",
  "note": ""
 },
 {
  "id": "3ds",
  "label": "3DS",
  "kind": "broadcast",
  "note": ""
 },
 {
  "id": "gamecube",
  "label": "GameCube",
  "kind": "broadcast",
  "note": ""
 },
 {
  "id": "gba",
  "label": "GBA",
  "kind": "broadcast",
  "note": ""
 },
 {
  "id": "ios",
  "label": "iOS",
  "kind": "game-platform",
  "note": ""
 },
 {
  "id": "android",
  "label": "Android",
  "kind": "game-platform",
  "note": ""
 }
];
export const TAGS: Tag[] = [{"id":"emmet","label":"Emmet Brickowski","kind":"character","aliases":[]},{"id":"lloyd-garmadon","label":"Lloyd Garmadon","kind":"character","aliases":[]},{"id":"tahu","label":"Tahu","kind":"character","aliases":[]}];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["lego-movie","ninjago","legends-of-chima","nexo-knights","monkie-kid","dreamzzz","lego-city-adventures","lego-friends-heartlake-city","lego-friends-next-chapter","lego-elves","lego-elves-secrets-of-elvendale","bionicle-g1","bionicle-g2","hero-factory","galidor","lego-games","lego-standalone"];
