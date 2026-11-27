// Avatar (James Cameron) seed, generated from research on 2026-11-27 (see DATA_NOTES).
import type { SeedTitle } from './seed-kit.ts';

export const SEED: SeedTitle[] = [
 {
  "id": "avatar",
  "title": "Avatar",
  "type": "film",
  "wiki": "Avatar (2009 film)",
  "continuity": "avatar-main",
  "studio": "fox",
  "platform": "theatrical",
  "chars": [],
  "notes": "US release; Odeon Leicester Square premiere 2009-12-10.",
  "units": [
   {
    "key": "",
    "rank": 1,
    "label": "Film",
    "iu": {
     "y": 2154,
     "label": "2154",
     "precision": "year",
     "confidence": "stated",
     "note": "In 2154, Earth suffers from resource exhaustion and ecological collapse.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Avatar_(2009_film)&oldid=1388156293"
     ]
    },
    "rel": {
     "date": "2009-12-18",
     "end": null,
     "src": "Avatar (2009 film)",
     "note": "Wikipedia: {{Film date|2009|12|10|[[Odeon Leicester Square]]|2009|12|18|United States}}"
    }
   }
  ]
 },
 {
  "id": "avatar-frontiers-of-pandora",
  "title": "Avatar: Frontiers of Pandora",
  "type": "video-game",
  "wiki": "Avatar: Frontiers of Pandora",
  "continuity": "avatar-main",
  "studio": "massive-entertainment",
  "platform": "playstation-5",
  "chars": [],
  "notes": "Video game. DLC \"From the Ashes\" (2025-12-19) not modelled.",
  "links": [
   {
    "to": "avatar",
    "kind": "continues",
    "note": "prologue overlaps the film's 2154 events"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 2,
    "label": "Game",
    "iu": {
     "y": 2162,
     "label": "2162 (prologue 2146–2154)",
     "precision": "year",
     "confidence": "stated",
     "note": "The students are awakened sixteen years later (2162) by Na'vi resistance fighters working with Alma. Prologue: \"In the year 2146, eight years before Jake Sully arrives on Pandora…\"; \"Eight years later (2154)…\". Main story from 2162, between Avatar (2154) and The Way of Water (2170, inferred).",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Avatar%3A_Frontiers_of_Pandora&oldid=1388296800"
     ]
    },
    "rel": {
     "date": "2023-12-07",
     "end": null,
     "src": "Avatar: Frontiers of Pandora",
     "note": "Wikipedia: The game is part of the Avatar franchise, and was released for PlayStation 5, Windows, and Xbox Series X/S on December 7, 2023."
    }
   }
  ]
 },
 {
  "id": "avatar-the-way-of-water",
  "title": "Avatar: The Way of Water",
  "type": "film",
  "wiki": "Avatar: The Way of Water",
  "continuity": "avatar-main",
  "studio": "lightstorm-entertainment",
  "platform": "theatrical",
  "chars": [],
  "notes": "US release; Odeon Luxe Leicester Square premiere 2022-12-06.",
  "links": [
   {
    "to": "avatar",
    "kind": "sequel",
    "note": "sixteen years later"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 3,
    "label": "Film",
    "iu": {
     "y": 2170,
     "label": "2170 (inferred)",
     "precision": "year",
     "confidence": "inferred",
     "note": "Sixteen years after the Na'vi repelled the Resources Development Administration (RDA) from Pandora, Jake Sully is chief of the Omatikaya clan. Avatar (2154, stated) + 16 = 2170.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Avatar%3A_The_Way_of_Water&oldid=1387979886"
     ]
    },
    "rel": {
     "date": "2022-12-16",
     "end": null,
     "src": "Avatar: The Way of Water",
     "note": "Wikipedia: {{Film date|2022|12|06|[[Odeon Luxe Leicester Square]]|2022|12|16|United States}}"
    }
   }
  ]
 },
 {
  "id": "avatar-fire-and-ash",
  "title": "Avatar: Fire and Ash",
  "type": "film",
  "wiki": "Avatar: Fire and Ash",
  "continuity": "avatar-main",
  "studio": "lightstorm-entertainment",
  "platform": "theatrical",
  "chars": [],
  "notes": "US release; Dolby Theatre premiere 2025-12-01.",
  "links": [
   {
    "to": "avatar-the-way-of-water",
    "kind": "sequel",
    "note": ""
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 4,
    "label": "Film",
    "iu": {
     "y": 2170,
     "label": "2170 (inferred; shortly after The Way of Water)",
     "precision": "year",
     "confidence": "inferred",
     "note": "Shortly after the death of Jake and Neytiri's eldest son Neteyam, the Sully family grieves amongst the Metkayina, with Neytiri developing a deeper hatred toward humans. Neteyam dies in The Way of Water (2170, inferred); \"shortly after\".",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Avatar%3A_Fire_and_Ash&oldid=1387792844"
     ]
    },
    "rel": {
     "date": "2025-12-19",
     "end": null,
     "src": "Avatar: Fire and Ash",
     "note": "Wikipedia: {{Film date|2025|12|1|[[Dolby Theatre]]|2025|12|19|United States}}"
    }
   }
  ]
 }
];
