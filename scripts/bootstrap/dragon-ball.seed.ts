// Dragon Ball seed, generated from research on 2026-11-27 (see DATA_NOTES).
import type { SeedTitle } from './seed-kit.ts';

export const SEED: SeedTitle[] = [
 {
  "id": "dragon-ball",
  "title": "Dragon Ball",
  "type": "series",
  "wiki": "Dragon Ball (TV series)",
  "continuity": "dragon-ball-main",
  "studio": "toei-animation",
  "platform": "fuji-tv",
  "chars": [],
  "notes": "Adapts the first 194 manga chapters.",
  "units": [
   {
    "key": "",
    "rank": 1,
    "label": "Series",
    "episodes": 153,
    "iu": {
     "y": 749,
     "y2": 756,
     "label": "Age 749–756",
     "precision": "range",
     "confidence": "inferred",
     "note": "*'''Age 749, September 1''' :Bulma, on her summer vacation searching for the Dragon Balls, meets Goku … *'''Age 756, May 8''' … Goku and Chi-Chi are married.",
     "src": [
      "https://dragonball.fandom.com/wiki/Dragon_Ball_Timeline?oldid=2276711"
     ]
    },
    "rel": {
     "date": "1986-02-26",
     "end": "1989-04-19",
     "src": "Dragon Ball (TV series)",
     "note": "Wikipedia: The series premiered in Japan on Fuji TV on February 26, 1986, and ran until April 19, 1989, lasting 153 episodes."
    }
   }
  ]
 },
 {
  "id": "dragon-ball-z",
  "title": "Dragon Ball Z",
  "type": "series",
  "wiki": "Dragon Ball Z",
  "continuity": "dragon-ball-main",
  "studio": "toei-animation",
  "platform": "fuji-tv",
  "chars": [],
  "notes": "Series-level unit; saga split not done.",
  "links": [
   {
    "to": "dragon-ball",
    "kind": "continues",
    "note": "picks up five years later"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 2,
    "label": "Series",
    "episodes": 291,
    "iu": {
     "y": 761,
     "y2": 784,
     "label": "Age 761–774 (epilogue Age 784)",
     "precision": "range",
     "confidence": "inferred",
     "note": "*'''Age 761''' … *'''Age 774, Circa November''' :Shenron erases everyone's memories of Majin Buu. … *'''Age 784, May 7''' :The 28th World Martial Arts Tournament takes place. Goku leaves with Uub to train him.",
     "src": [
      "https://dragonball.fandom.com/wiki/Dragon_Ball_Timeline?oldid=2276711"
     ]
    },
    "rel": {
     "date": "1989-04-26",
     "end": "1996-01-31",
     "src": "Dragon Ball Z",
     "note": "Wikipedia: It premiered in Japan on Fuji TV on April 26, 1989, taking over its predecessor's time slot, and ran for 291 episodes until its conclusion on January 31, 1996."
    }
   }
  ]
 },
 {
  "id": "dragon-ball-z-kai",
  "title": "Dragon Ball Z Kai",
  "type": "re-edit",
  "wiki": "Dragon Ball Z Kai",
  "continuity": "dragon-ball-reedits",
  "studio": "toei-animation",
  "platform": "fuji-tv",
  "chars": [],
  "notes": "\"a re-edited and remastered version of the Dragon Ball Z anime under the name Dragon Ball Kai\". It retells Z, so it duplicates Z's place in the timeline; the app may want to hide it from in-universe order. 159 episodes in Japan (167 internationally).",
  "links": [
   {
    "to": "dragon-ball-z",
    "kind": "adapts",
    "note": "re-edited, remastered version of Dragon Ball Z"
   }
  ],
  "units": [
   {
    "key": "kai",
    "rank": 28,
    "label": "Dragon Ball Kai (episodes 1–97/98)",
    "iu": {
     "label": "Age 761–767 (re-edit of Z: Saiyan–Cell arcs)",
     "precision": "relative",
     "confidence": "inferred",
     "note": "*'''Age 761''' … *'''Age 767, Between June and December'''",
     "src": [
      "https://dragonball.fandom.com/wiki/Dragon_Ball_Timeline?oldid=2276711"
     ]
    },
    "rel": {
     "date": "2009-04-05",
     "end": "2011-03-27",
     "src": "Dragon Ball Z Kai",
     "note": "Wikipedia: first_aired = {{Start date|2009|4|5}} | last_aired = {{End date|2011|3|27}} (#1–97) [efn: Episode 98 did not air on the original run due to news coverage regarding the 2011 Tōhoku earthquake and tsunami]"
    }
   },
   {
    "key": "final-chapters",
    "rank": 29,
    "label": "Dragon Ball Z Kai: The Final Chapters (episodes 99–159)",
    "iu": {
     "label": "Age 773–774 (Buu arc)",
     "precision": "relative",
     "confidence": "inferred",
     "note": "*'''Age 774, March 28''' … *'''Age 774, Circa November''' :Shenron erases everyone's memories of Majin Buu.",
     "src": [
      "https://dragonball.fandom.com/wiki/Dragon_Ball_Timeline?oldid=2276711"
     ]
    },
    "rel": {
     "date": "2014-04-06",
     "end": "2015-06-28",
     "src": "Dragon Ball Z Kai",
     "note": "Wikipedia: first_aired2 = {{Start date|2014|4|6}} | last_aired2 = {{End date|2015|6|28}} (#99–159)"
    }
   }
  ]
 },
 {
  "id": "dragon-ball-daima",
  "title": "Dragon Ball Daima",
  "type": "series",
  "wiki": "Dragon Ball Daima",
  "continuity": "dragon-ball-main",
  "studio": "toei-animation",
  "platform": "fuji-tv",
  "chars": [],
  "notes": "Akira Toriyama's last work.",
  "links": [
   {
    "to": "dragon-ball-z",
    "kind": "continues",
    "note": "set after the Majin Buu Saga"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 3,
    "label": "Series",
    "episodes": 20,
    "iu": {
     "y": 775,
     "label": "Age 775",
     "precision": "year",
     "confidence": "inferred",
     "note": "*'''Age 775''' :On Trunks' ninth birthday, Gomah, Degesu, and Neva travel to Earth and use its Dragon Balls to turn all those who fought Majin Buu and their friends into children or babies.",
     "src": [
      "https://dragonball.fandom.com/wiki/Dragon_Ball_Timeline?oldid=2276711"
     ]
    },
    "rel": {
     "date": "2024-10-11",
     "end": "2025-02-28",
     "src": "Dragon Ball Daima",
     "note": "Wikipedia: first_aired = {{Start date|2024|10|11}} | last_aired = {{End date|2025|2|28}} | num_episodes = 20"
    }
   }
  ]
 },
 {
  "id": "dbz-battle-of-gods",
  "title": "Dragon Ball Z: Battle of Gods",
  "type": "film",
  "wiki": "Dragon Ball Z: Battle of Gods",
  "continuity": "dragon-ball-main",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "Remade as the first arc of the Dragon Ball Super anime.",
  "links": [
   {
    "to": "dragon-ball-z",
    "kind": "continues",
    "note": "set after the Buu saga"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 4,
    "label": "Film",
    "iu": {
     "y": 778,
     "label": "Age 778",
     "precision": "year",
     "confidence": "inferred",
     "note": "*'''Age 778, August 18''' :The events of Dragon Ball Z: Battle of Gods take place.",
     "src": [
      "https://dragonball.fandom.com/wiki/Dragon_Ball_Timeline?oldid=2276711"
     ]
    },
    "rel": {
     "date": "2013-03-30",
     "end": null,
     "src": "Dragon Ball Z: Battle of Gods",
     "note": "Wikipedia: released = {{Film date|2013|03|30|Japan|}}"
    }
   }
  ]
 },
 {
  "id": "dbz-resurrection-f",
  "title": "Dragon Ball Z: Resurrection 'F'",
  "type": "film",
  "wiki": "Dragon Ball Z: Resurrection 'F'",
  "continuity": "dragon-ball-main",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "Remade as the second arc of the Dragon Ball Super anime.",
  "links": [
   {
    "to": "dbz-battle-of-gods",
    "kind": "continues",
    "note": "sequel film"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 5,
    "label": "Film",
    "iu": {
     "y": 779,
     "label": "Age 779",
     "precision": "year",
     "confidence": "inferred",
     "note": "*'''Age 779''' :The events of Dragon Ball Z: Resurrection ‘F’ take place.",
     "src": [
      "https://dragonball.fandom.com/wiki/Dragon_Ball_Timeline?oldid=2276711"
     ]
    },
    "rel": {
     "date": "2015-04-18",
     "end": null,
     "src": "Dragon Ball Z: Resurrection 'F'",
     "note": "Wikipedia: released = {{Film date|2015|04|18|Japan|ref1=}}"
    }
   }
  ]
 },
 {
  "id": "dragon-ball-super",
  "title": "Dragon Ball Super",
  "type": "series",
  "wiki": "Dragon Ball Super (TV series)",
  "continuity": "dragon-ball-main",
  "studio": "toei-animation",
  "platform": "fuji-tv",
  "chars": [],
  "notes": "Ordered after Resurrection 'F' since its later arcs follow it.",
  "links": [
   {
    "to": "dbz-resurrection-f",
    "kind": "continues",
    "note": "first two arcs retell Battle of Gods and Resurrection 'F'"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 6,
    "label": "Series",
    "episodes": 131,
    "iu": {
     "y": 778,
     "y2": 780,
     "label": "Age 778–780",
     "precision": "range",
     "confidence": "inferred",
     "note": "*'''Age 778''' … *'''Age 780''' :Goku goes to see Zeno to remind him about the All-Universe Tournament. Shortly after, the Tournament of Power is declared.",
     "src": [
      "https://dragonball.fandom.com/wiki/Dragon_Ball_Timeline?oldid=2276711"
     ]
    },
    "rel": {
     "date": "2015-07-05",
     "end": "2018-03-25",
     "src": "Dragon Ball Super (TV series)",
     "note": "Wikipedia: It debuted on July 5 of that year and ran as a weekly series at 9:00 am on Fuji TV on Sundays until its series finale on March 25, 2018, after 131 episodes."
    }
   }
  ]
 },
 {
  "id": "dbs-broly",
  "title": "Dragon Ball Super: Broly",
  "type": "film",
  "wiki": "Dragon Ball Super: Broly",
  "continuity": "dragon-ball-main",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "World premiere in Tokyo November 14, 2018 (films list); Japanese release December 14, 2018 used.",
  "links": [
   {
    "to": "dragon-ball-super",
    "kind": "continues",
    "note": "sequel film to the anime"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 7,
    "label": "Film",
    "iu": {
     "y": 780,
     "label": "Age 780 (film itself implies 773–775)",
     "precision": "year",
     "confidence": "disputed",
     "note": "Using the Ages listed in Daizenshuu 7, Dragon Ball SSSS, and the Xenoverse games, this film should occur around Age 780.",
     "src": [
      "https://dragonball.fandom.com/wiki/Dragon_Ball_Super:_Broly?oldid=2279723"
     ]
    },
    "rel": {
     "date": "2018-12-14",
     "end": null,
     "src": "Dragon Ball Super: Broly",
     "note": "Wikipedia: The film was released in Japan on December 14, 2018, by Toei and 20th Century Fox Japan."
    }
   }
  ]
 },
 {
  "id": "dbs-super-hero",
  "title": "Dragon Ball Super: Super Hero",
  "type": "film",
  "wiki": "Dragon Ball Super: Super Hero",
  "continuity": "dragon-ball-main",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "dbs-broly",
    "kind": "continues",
    "note": "sequel film"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 8,
    "label": "Film",
    "iu": {
     "y": 782,
     "y2": 783,
     "label": "Age 782–783",
     "precision": "range",
     "confidence": "inferred",
     "note": "*'''Age 782-783''' … Three months later, the events of Dragon Ball Super: Super Hero take place.",
     "src": [
      "https://dragonball.fandom.com/wiki/Dragon_Ball_Timeline?oldid=2276711"
     ]
    },
    "rel": {
     "date": "2022-06-11",
     "end": null,
     "src": "Dragon Ball Super: Super Hero",
     "note": "Wikipedia: released = {{Film date|2022|06|11|Japan}}"
    }
   }
  ]
 },
 {
  "id": "dbs-beerus",
  "title": "Dragon Ball Super: Beerus",
  "type": "re-edit",
  "wiki": "Dragon Ball Super: Beerus",
  "continuity": "dragon-ball-reedits",
  "studio": "toei-animation",
  "platform": "fuji-tv",
  "chars": [],
  "notes": "Still airing (7 episodes so far per infobox).",
  "links": [
   {
    "to": "dragon-ball-super",
    "kind": "adapts",
    "note": "remastered re-edit of the first three arcs"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 30,
    "label": "Series (airing)",
    "episodes": 7,
    "iu": {
     "label": "Age 778–779 (re-edit of Super's first three arcs)",
     "precision": "relative",
     "confidence": "inferred",
     "note": "*'''Age 778, August 18''' :The events of Dragon Ball Z: Battle of Gods take place. … *'''Age 779''' :The events of Dragon Ball Z: Resurrection ‘F’ take place.",
     "src": [
      "https://dragonball.fandom.com/wiki/Dragon_Ball_Timeline?oldid=2276711"
     ]
    },
    "rel": {
     "date": "2026-10-11",
     "end": null,
     "src": "Dragon Ball Super: Beerus",
     "note": "Wikipedia: Dragon Ball Super: Beerus premiered on Fuji Television on October 11, 2026. It is a re-edited and remastered version of the first three arcs of Dragon Ball Super with new animation."
    }
   }
  ]
 },
 {
  "id": "dragon-ball-gt",
  "title": "Dragon Ball GT",
  "type": "series",
  "wiki": "Dragon Ball GT",
  "continuity": "dragon-ball-gt",
  "studio": "toei-animation",
  "platform": "fuji-tv",
  "chars": [],
  "notes": "Not based on the manga; Toriyama called it a \"grand side story\". In-universe years assume it branches from the end of Z (Age 784).",
  "links": [
   {
    "to": "dragon-ball-z",
    "kind": "continues",
    "note": "anime-only sequel to Z (alternate continuity)"
   },
   {
    "to": "dragon-ball-super",
    "kind": "shares-characters",
    "note": "Super and Daima replace GT as the post-Z story in the main continuity"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 9,
    "label": "Series",
    "episodes": 64,
    "iu": {
     "y": 789,
     "y2": 790,
     "label": "Age 789–790 (epilogue Age 889)",
     "precision": "range",
     "confidence": "disputed",
     "note": "The Funimation dub places Dragon Ball GT ten years after the end of Dragon Ball Z, while the original Japanese dub and various guides state it to be five years. The Japanese dates are used here. *'''Age 789''' … *'''Age 790'''",
     "src": [
      "https://dragonball.fandom.com/wiki/Dragon_Ball_Timeline?oldid=2276711"
     ]
    },
    "rel": {
     "date": "1996-02-07",
     "end": "1997-11-19",
     "src": "Dragon Ball GT",
     "note": "Wikipedia: Dragon Ball GT premiered on Fuji TV on February 7, 1996, and ran until November 19, 1997, for 64 episodes."
    }
   }
  ]
 },
 {
  "id": "db-film-dragon-ball-curse-of-the-blood-rubies",
  "title": "Dragon Ball: Curse of the Blood Rubies",
  "type": "film",
  "wiki": "List of Dragon Ball films",
  "continuity": "dragon-ball-noncanon-films",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "Based on the original Dragon Ball anime.",
  "units": [
   {
    "key": "",
    "rank": 10,
    "label": "Film",
    "iu": {
     "label": "film 1 of 17",
     "precision": "relative",
     "confidence": "inferred",
     "note": "[ordering reason] Ordered by Japanese theatrical release; these films \"do not correlate with the continuity of the series\", so no in-universe placement is used.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884"
     ]
    },
    "rel": {
     "date": "1986-12-20",
     "end": null,
     "src": "List of Dragon Ball films",
     "note": "Wikipedia: ! scope=\"row\" | ''[[Dragon Ball: Curse of the Blood Rubies]]'' … | {{Start date|1986|12|20}} [Theatrical release column]"
    }
   }
  ]
 },
 {
  "id": "db-film-dragon-ball-sleeping-princess-in-devil-s-castle",
  "title": "Dragon Ball: Sleeping Princess in Devil's Castle",
  "type": "film",
  "wiki": "List of Dragon Ball films",
  "continuity": "dragon-ball-noncanon-films",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "Based on the original Dragon Ball anime.",
  "units": [
   {
    "key": "",
    "rank": 11,
    "label": "Film",
    "iu": {
     "label": "film 2 of 17",
     "precision": "relative",
     "confidence": "inferred",
     "note": "[ordering reason] Ordered by Japanese theatrical release; these films \"do not correlate with the continuity of the series\", so no in-universe placement is used.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884"
     ]
    },
    "rel": {
     "date": "1987-07-18",
     "end": null,
     "src": "List of Dragon Ball films",
     "note": "Wikipedia: ! scope=\"row\" | ''[[Dragon Ball: Sleeping Princess in Devil's Castle]]'' … | {{Start date|1987|7|18}} [Theatrical release column]"
    }
   }
  ]
 },
 {
  "id": "db-film-dragon-ball-mystical-adventure",
  "title": "Dragon Ball: Mystical Adventure",
  "type": "film",
  "wiki": "List of Dragon Ball films",
  "continuity": "dragon-ball-noncanon-films",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "Based on the original Dragon Ball anime.",
  "units": [
   {
    "key": "",
    "rank": 12,
    "label": "Film",
    "iu": {
     "label": "film 3 of 17",
     "precision": "relative",
     "confidence": "inferred",
     "note": "[ordering reason] Ordered by Japanese theatrical release; these films \"do not correlate with the continuity of the series\", so no in-universe placement is used.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884"
     ]
    },
    "rel": {
     "date": "1988-07-09",
     "end": null,
     "src": "List of Dragon Ball films",
     "note": "Wikipedia: ! scope=\"row\" | ''[[Dragon Ball: Mystical Adventure]]'' … | {{Start date|1988|7|9}} [Theatrical release column]"
    }
   }
  ]
 },
 {
  "id": "db-film-dead-zone",
  "title": "Dragon Ball Z: Dead Zone",
  "type": "film",
  "wiki": "List of Dragon Ball films",
  "continuity": "dragon-ball-noncanon-films",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "Based on Dragon Ball Z.",
  "units": [
   {
    "key": "",
    "rank": 13,
    "label": "Film",
    "iu": {
     "label": "film 4 of 17",
     "precision": "relative",
     "confidence": "inferred",
     "note": "[ordering reason] Ordered by Japanese theatrical release; these films \"do not correlate with the continuity of the series\", so no in-universe placement is used.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884"
     ]
    },
    "rel": {
     "date": "1989-07-15",
     "end": null,
     "src": "List of Dragon Ball films",
     "note": "Wikipedia: ! scope=\"row\" | ''[[Dragon Ball Z: Dead Zone]]'' … | {{Start date|1989|7|15}} [Theatrical release column]"
    }
   }
  ]
 },
 {
  "id": "db-film-the-world-s-strongest",
  "title": "Dragon Ball Z: The World's Strongest",
  "type": "film",
  "wiki": "List of Dragon Ball films",
  "continuity": "dragon-ball-noncanon-films",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "Based on Dragon Ball Z.",
  "units": [
   {
    "key": "",
    "rank": 14,
    "label": "Film",
    "iu": {
     "label": "film 5 of 17",
     "precision": "relative",
     "confidence": "inferred",
     "note": "[ordering reason] Ordered by Japanese theatrical release; these films \"do not correlate with the continuity of the series\", so no in-universe placement is used.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884"
     ]
    },
    "rel": {
     "date": "1990-03-10",
     "end": null,
     "src": "List of Dragon Ball films",
     "note": "Wikipedia: ! scope=\"row\" | ''[[Dragon Ball Z: The World's Strongest]]'' … | {{Start date|1990|3|10}} [Theatrical release column]"
    }
   }
  ]
 },
 {
  "id": "db-film-the-tree-of-might",
  "title": "Dragon Ball Z: The Tree of Might",
  "type": "film",
  "wiki": "List of Dragon Ball films",
  "continuity": "dragon-ball-noncanon-films",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "Based on Dragon Ball Z.",
  "units": [
   {
    "key": "",
    "rank": 15,
    "label": "Film",
    "iu": {
     "label": "film 6 of 17",
     "precision": "relative",
     "confidence": "inferred",
     "note": "[ordering reason] Ordered by Japanese theatrical release; these films \"do not correlate with the continuity of the series\", so no in-universe placement is used.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884"
     ]
    },
    "rel": {
     "date": "1990-07-07",
     "end": null,
     "src": "List of Dragon Ball films",
     "note": "Wikipedia: ! scope=\"row\" | ''[[Dragon Ball Z: The Tree of Might]]'' … | {{Start date|1990|7|7}} [Theatrical release column]"
    }
   }
  ]
 },
 {
  "id": "db-film-lord-slug",
  "title": "Dragon Ball Z: Lord Slug",
  "type": "film",
  "wiki": "List of Dragon Ball films",
  "continuity": "dragon-ball-noncanon-films",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "Based on Dragon Ball Z.",
  "units": [
   {
    "key": "",
    "rank": 16,
    "label": "Film",
    "iu": {
     "label": "film 7 of 17",
     "precision": "relative",
     "confidence": "inferred",
     "note": "[ordering reason] Ordered by Japanese theatrical release; these films \"do not correlate with the continuity of the series\", so no in-universe placement is used.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884"
     ]
    },
    "rel": {
     "date": "1991-03-09",
     "end": null,
     "src": "List of Dragon Ball films",
     "note": "Wikipedia: ! scope=\"row\" | ''[[Dragon Ball Z: Lord Slug]]'' … | {{Start date|1991|3|9}} [Theatrical release column]"
    }
   }
  ]
 },
 {
  "id": "db-film-cooler-s-revenge",
  "title": "Dragon Ball Z: Cooler's Revenge",
  "type": "film",
  "wiki": "List of Dragon Ball films",
  "continuity": "dragon-ball-noncanon-films",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "Based on Dragon Ball Z.",
  "units": [
   {
    "key": "",
    "rank": 17,
    "label": "Film",
    "iu": {
     "label": "film 8 of 17",
     "precision": "relative",
     "confidence": "inferred",
     "note": "[ordering reason] Ordered by Japanese theatrical release; these films \"do not correlate with the continuity of the series\", so no in-universe placement is used.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884"
     ]
    },
    "rel": {
     "date": "1991-07-20",
     "end": null,
     "src": "List of Dragon Ball films",
     "note": "Wikipedia: ! scope=\"row\" | ''[[Dragon Ball Z: Cooler's Revenge]]'' … | {{Start date|1991|7|20}} [Theatrical release column]"
    }
   }
  ]
 },
 {
  "id": "db-film-the-return-of-cooler",
  "title": "Dragon Ball Z: The Return of Cooler",
  "type": "film",
  "wiki": "List of Dragon Ball films",
  "continuity": "dragon-ball-noncanon-films",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "Based on Dragon Ball Z.",
  "units": [
   {
    "key": "",
    "rank": 18,
    "label": "Film",
    "iu": {
     "label": "film 9 of 17",
     "precision": "relative",
     "confidence": "inferred",
     "note": "[ordering reason] Ordered by Japanese theatrical release; these films \"do not correlate with the continuity of the series\", so no in-universe placement is used.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884"
     ]
    },
    "rel": {
     "date": "1992-03-07",
     "end": null,
     "src": "List of Dragon Ball films",
     "note": "Wikipedia: ! scope=\"row\" | ''[[Dragon Ball Z: The Return of Cooler]]'' … | {{Start date|1992|3|7}} [Theatrical release column]"
    }
   }
  ]
 },
 {
  "id": "db-film-super-android-13",
  "title": "Dragon Ball Z: Super Android 13!",
  "type": "film",
  "wiki": "List of Dragon Ball films",
  "continuity": "dragon-ball-noncanon-films",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "Based on Dragon Ball Z.",
  "units": [
   {
    "key": "",
    "rank": 19,
    "label": "Film",
    "iu": {
     "label": "film 10 of 17",
     "precision": "relative",
     "confidence": "inferred",
     "note": "[ordering reason] Ordered by Japanese theatrical release; these films \"do not correlate with the continuity of the series\", so no in-universe placement is used.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884"
     ]
    },
    "rel": {
     "date": "1992-07-11",
     "end": null,
     "src": "List of Dragon Ball films",
     "note": "Wikipedia: ! scope=\"row\" | ''[[Dragon Ball Z: Super Android 13!]]'' … | {{Start date|1992|7|11}} [Theatrical release column]"
    }
   }
  ]
 },
 {
  "id": "db-film-broly-the-legendary-super-saiyan",
  "title": "Dragon Ball Z: Broly – The Legendary Super Saiyan",
  "type": "film",
  "wiki": "List of Dragon Ball films",
  "continuity": "dragon-ball-noncanon-films",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "Based on Dragon Ball Z.",
  "units": [
   {
    "key": "",
    "rank": 20,
    "label": "Film",
    "iu": {
     "label": "film 11 of 17",
     "precision": "relative",
     "confidence": "inferred",
     "note": "[ordering reason] Ordered by Japanese theatrical release; these films \"do not correlate with the continuity of the series\", so no in-universe placement is used.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884"
     ]
    },
    "rel": {
     "date": "1993-03-06",
     "end": null,
     "src": "List of Dragon Ball films",
     "note": "Wikipedia: ! scope=\"row\" | ''[[Dragon Ball Z: Broly – The Legendary Super Saiyan]]'' … | {{Start date|1993|3|6}} [Theatrical release column]"
    }
   }
  ]
 },
 {
  "id": "db-film-bojack-unbound",
  "title": "Dragon Ball Z: Bojack Unbound",
  "type": "film",
  "wiki": "List of Dragon Ball films",
  "continuity": "dragon-ball-noncanon-films",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "Based on Dragon Ball Z.",
  "units": [
   {
    "key": "",
    "rank": 21,
    "label": "Film",
    "iu": {
     "label": "film 12 of 17",
     "precision": "relative",
     "confidence": "inferred",
     "note": "[ordering reason] Ordered by Japanese theatrical release; these films \"do not correlate with the continuity of the series\", so no in-universe placement is used.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884"
     ]
    },
    "rel": {
     "date": "1993-07-10",
     "end": null,
     "src": "List of Dragon Ball films",
     "note": "Wikipedia: ! scope=\"row\" | ''[[Dragon Ball Z: Bojack Unbound]]'' … | {{Start date|1993|7|10}} [Theatrical release column]"
    }
   }
  ]
 },
 {
  "id": "db-film-broly-second-coming",
  "title": "Dragon Ball Z: Broly – Second Coming",
  "type": "film",
  "wiki": "List of Dragon Ball films",
  "continuity": "dragon-ball-noncanon-films",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "Based on Dragon Ball Z.",
  "units": [
   {
    "key": "",
    "rank": 22,
    "label": "Film",
    "iu": {
     "label": "film 13 of 17",
     "precision": "relative",
     "confidence": "inferred",
     "note": "[ordering reason] Ordered by Japanese theatrical release; these films \"do not correlate with the continuity of the series\", so no in-universe placement is used.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884"
     ]
    },
    "rel": {
     "date": "1994-03-12",
     "end": null,
     "src": "List of Dragon Ball films",
     "note": "Wikipedia: ! scope=\"row\" | ''[[Dragon Ball Z: Broly – Second Coming]]'' … | {{Start date|1994|3|12}} [Theatrical release column]"
    }
   }
  ]
 },
 {
  "id": "db-film-bio-broly",
  "title": "Dragon Ball Z: Bio-Broly",
  "type": "film",
  "wiki": "List of Dragon Ball films",
  "continuity": "dragon-ball-noncanon-films",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "Based on Dragon Ball Z.",
  "units": [
   {
    "key": "",
    "rank": 23,
    "label": "Film",
    "iu": {
     "label": "film 14 of 17",
     "precision": "relative",
     "confidence": "inferred",
     "note": "[ordering reason] Ordered by Japanese theatrical release; these films \"do not correlate with the continuity of the series\", so no in-universe placement is used.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884"
     ]
    },
    "rel": {
     "date": "1994-07-09",
     "end": null,
     "src": "List of Dragon Ball films",
     "note": "Wikipedia: ! scope=\"row\" | ''[[Dragon Ball Z: Bio-Broly]]'' … | {{Start date|1994|7|9}} [Theatrical release column]"
    }
   }
  ]
 },
 {
  "id": "db-film-fusion-reborn",
  "title": "Dragon Ball Z: Fusion Reborn",
  "type": "film",
  "wiki": "List of Dragon Ball films",
  "continuity": "dragon-ball-noncanon-films",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "Based on Dragon Ball Z.",
  "units": [
   {
    "key": "",
    "rank": 24,
    "label": "Film",
    "iu": {
     "label": "film 15 of 17",
     "precision": "relative",
     "confidence": "inferred",
     "note": "[ordering reason] Ordered by Japanese theatrical release; these films \"do not correlate with the continuity of the series\", so no in-universe placement is used.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884"
     ]
    },
    "rel": {
     "date": "1995-03-04",
     "end": null,
     "src": "List of Dragon Ball films",
     "note": "Wikipedia: ! scope=\"row\" | ''[[Dragon Ball Z: Fusion Reborn]]'' … | {{Start date|1995|3|4}} [Theatrical release column]"
    }
   }
  ]
 },
 {
  "id": "db-film-wrath-of-the-dragon",
  "title": "Dragon Ball Z: Wrath of the Dragon",
  "type": "film",
  "wiki": "List of Dragon Ball films",
  "continuity": "dragon-ball-noncanon-films",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "Based on Dragon Ball Z.",
  "units": [
   {
    "key": "",
    "rank": 25,
    "label": "Film",
    "iu": {
     "label": "film 16 of 17",
     "precision": "relative",
     "confidence": "inferred",
     "note": "[ordering reason] Ordered by Japanese theatrical release; these films \"do not correlate with the continuity of the series\", so no in-universe placement is used.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884"
     ]
    },
    "rel": {
     "date": "1995-07-15",
     "end": null,
     "src": "List of Dragon Ball films",
     "note": "Wikipedia: ! scope=\"row\" | ''[[Dragon Ball Z: Wrath of the Dragon]]'' … | {{Start date|1995|7|15}} [Theatrical release column]"
    }
   }
  ]
 },
 {
  "id": "db-film-dragon-ball-the-path-to-power",
  "title": "Dragon Ball: The Path to Power",
  "type": "film",
  "wiki": "List of Dragon Ball films",
  "continuity": "dragon-ball-noncanon-films",
  "studio": "toei-animation",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "Based on the original Dragon Ball anime.",
  "units": [
   {
    "key": "",
    "rank": 26,
    "label": "Film",
    "iu": {
     "label": "film 17 of 17",
     "precision": "relative",
     "confidence": "inferred",
     "note": "[ordering reason] Ordered by Japanese theatrical release; these films \"do not correlate with the continuity of the series\", so no in-universe placement is used.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Dragon_Ball&oldid=1386322884"
     ]
    },
    "rel": {
     "date": "1996-03-04",
     "end": null,
     "src": "List of Dragon Ball films",
     "note": "Wikipedia: ! scope=\"row\" | ''[[Dragon Ball: The Path to Power]]'' … | {{Start date|1996|3|4}} [Theatrical release column]"
    }
   }
  ]
 },
 {
  "id": "dragonball-evolution",
  "title": "Dragonball Evolution",
  "type": "film",
  "wiki": "Dragonball Evolution",
  "continuity": "dragonball-evolution",
  "studio": "fox",
  "platform": "platform-not-stated",
  "chars": [],
  "notes": "First release Japan/Hong Kong March 10, 2009; US April 10, 2009. Directed by James Wong, produced by Stephen Chow.",
  "links": [
   {
    "to": "dragon-ball",
    "kind": "adapts",
    "note": "loose live-action adaptation"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 27,
    "label": "Film",
    "iu": {
     "label": "single film",
     "precision": "relative",
     "confidence": "inferred",
     "note": "[ordering reason: single unit]",
     "src": [
      "Dragonball Evolution"
     ]
    },
    "rel": {
     "date": "2009-03-10",
     "end": null,
     "src": "Dragonball Evolution",
     "note": "Wikipedia: released = {{Film date|2009|3|10|Japan, Hong Kong|2009|4|10|United States}}"
    }
   }
  ]
 }
];
