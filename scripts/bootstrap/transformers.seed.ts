// Transformers seed, generated from research on 2026-11-27 (see DATA_NOTES).
import type { SeedTitle } from './seed-kit.ts';

export const SEED: SeedTitle[] = [
 {
  "id": "tf-g1-series",
  "title": "The Transformers",
  "type": "series",
  "wiki": "The Transformers (TV series)",
  "continuity": "tf-g1",
  "studio": "sunbow-productions",
  "platform": "first-run-syndication",
  "chars": [],
  "notes": "Wikipedia lists the 3-episode 1984 miniseries separately from season 1, so it is its own unit (key \"mini\").",
  "units": [
   {
    "key": "mini",
    "rank": 1,
    "label": "Miniseries",
    "episodes": 3,
    "iu": {
     "y": 1984,
     "label": "1984",
     "precision": "year",
     "confidence": "stated",
     "note": "The story follows Optimus Prime's heroic Autobots and Megatron's evil Decepticons as they leave their metallic homeworld of Cybertron to search for new sources of energy to revitalize their war efforts, only to crash-land on Earth, where they remain entombed and offline for 4 million years. Awakening in the year of 1984, the Decepticons set about pillaging the energy sources of Earth",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=The_Transformers_%28TV_series%29&oldid=1388126615"
     ]
    },
    "rel": {
     "date": "1984-09-17",
     "end": "1984-09-19",
     "src": "The Transformers (TV series)",
     "note": "Wikipedia: | linkT0     = Miniseries … | episodes0  = 3 … | start0     = {{Start date|1984|9|17}} … | end0       = {{End date|1984|9|19}}"
    }
   },
   {
    "key": "s1",
    "rank": 2,
    "label": "Season 1",
    "season": 1,
    "episodes": 13,
    "iu": {
     "y": 1984,
     "label": "1984",
     "precision": "year",
     "confidence": "inferred",
     "note": "The story follows Optimus Prime's heroic Autobots and Megatron's evil Decepticons as they leave their metallic homeworld of Cybertron to search for new sources of energy to revitalize their war efforts, only to crash-land on Earth, where they remain entombed and offline for 4 million years. Awakening in the year of 1984, the Decepticons set about pillaging the energy sources of Earth",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=The_Transformers_%28TV_series%29&oldid=1388126615"
     ]
    },
    "rel": {
     "date": "1984-10-06",
     "end": "1984-12-29",
     "src": "The Transformers (TV series)",
     "note": "Wikipedia: | episodes1  = 13 … | start1     = {{Start date|1984|10|6}} … | end1       = {{End date|1984|12|29}}"
    }
   },
   {
    "key": "s2",
    "rank": 3,
    "label": "Season 2",
    "season": 2,
    "episodes": 49,
    "iu": {
     "y": 1985,
     "label": "c. 1985",
     "precision": "year",
     "confidence": "inferred",
     "note": "Set 20 years after the second season, in the year 2005, the film featured the deaths of many characters, including Optimus Prime",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=The_Transformers_%28TV_series%29&oldid=1388126615"
     ]
    },
    "rel": {
     "date": "1985-09-23",
     "end": "1986-01-09",
     "src": "The Transformers (TV series)",
     "note": "Wikipedia: | episodes2  = 49 … | start2     = {{Start date|1985|9|23}} … | end2       = {{End date|1986|1|9}}"
    }
   },
   {
    "key": "s3",
    "rank": 5,
    "label": "Season 3",
    "season": 3,
    "episodes": 30,
    "iu": {
     "y": 2005,
     "y2": 2006,
     "label": "2005–2006",
     "precision": "range",
     "confidence": "inferred",
     "note": "The series was supplemented by a feature film, The Transformers: The Movie (1986), taking place between the second and third seasons. … [[Category:Television series set in 2005]] [[Category:Television series set in 2006]] … |Title = The Big Broadcast of 2006",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=The_Transformers_%28TV_series%29&oldid=1388126615",
      "https://en.wikipedia.org/w/index.php?title=List_of_The_Transformers_episodes&oldid=1379525972"
     ]
    },
    "rel": {
     "date": "1986-09-15",
     "end": "1987-02-25",
     "src": "The Transformers (TV series)",
     "note": "Wikipedia: | episodes3  = 30 … | start3     = {{Start date|1986|9|15}} … | end3       = {{End date|1987|2|25}}"
    }
   },
   {
    "key": "s4",
    "rank": 6,
    "label": "Season 4: The Rebirth",
    "season": 4,
    "episodes": 3,
    "iu": {
     "label": "After season 3",
     "precision": "relative",
     "confidence": "inferred",
     "note": "The fourth season, consisting of a three-part finale miniseries named \"The Rebirth\", was broadcast in November 1987.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=The_Transformers_%28TV_series%29&oldid=1388126615"
     ]
    },
    "rel": {
     "date": "1987-11-09",
     "end": "1987-11-11",
     "src": "The Transformers (TV series)",
     "note": "Wikipedia: | episodes4  = 3 … | start4     = {{Start date|1987|11|9}} … | end4       = {{End date|1987|11|11}}"
    }
   }
  ]
 },
 {
  "id": "tf-g1-movie",
  "title": "The Transformers: The Movie",
  "type": "animated-film",
  "wiki": "The Transformers: The Movie",
  "continuity": "tf-g1",
  "studio": "sunbow-productions",
  "platform": "theatrical",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "tf-g1-series",
    "kind": "continues",
    "note": "takes place between seasons 2 and 3"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 4,
    "label": "Film",
    "iu": {
     "y": 2005,
     "label": "2005",
     "precision": "year",
     "confidence": "stated",
     "note": "The story is set in 2005, 20 years after the TV series' second season.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=The_Transformers%3A_The_Movie&oldid=1388035706"
     ]
    },
    "rel": {
     "date": "1986-08-08",
     "end": null,
     "src": "The Transformers: The Movie",
     "note": "Wikipedia: The Transformers: The Movie was released on August 8, 1986, to 990 screens in the United States"
    }
   }
  ]
 },
 {
  "id": "tf-beast-wars",
  "title": "Beast Wars: Transformers",
  "type": "series",
  "wiki": "Beast Wars: Transformers",
  "continuity": "tf-beast-era",
  "studio": "mainframe-entertainment",
  "platform": "first-run-syndication",
  "chars": [],
  "notes": "The action is on prehistoric Earth, reached from a time about 300 years after G1. No calendar year is sourced, so years are null.",
  "links": [
   {
    "to": "tf-g1-series",
    "kind": "continues",
    "note": "set 300 years after G1; Maximals and Predacons descend from the Autobots and Decepticons"
   }
  ],
  "units": [
   {
    "key": "s1",
    "rank": 7,
    "label": "Season 1",
    "season": 1,
    "episodes": 26,
    "iu": {
     "label": "Prehistoric Earth (Maximals from about 300 years after G1)",
     "precision": "relative",
     "confidence": "inferred",
     "note": "The series is set in the future of the \"original\" Transformers franchise, 300 years after the events of The Transformers … While engaged in battle, small teams from each faction crash land on an unknown planet, and must find a way to return home while continuing their war.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Beast_Wars%3A_Transformers&oldid=1387192068"
     ]
    },
    "rel": {
     "date": "1996-09-16",
     "end": "1997-04-01",
     "src": "Beast Wars: Transformers",
     "note": "Wikipedia: | episodes1 = 26 … | start1 = {{Start date|1996|9|16}} … | end1 = {{End date|1997|4|1}}"
    }
   },
   {
    "key": "s2",
    "rank": 8,
    "label": "Season 2",
    "season": 2,
    "episodes": 13,
    "iu": {
     "label": "Prehistoric Earth, after season 1",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Beast_Wars%3A_Transformers&oldid=1387192068"
     ]
    },
    "rel": {
     "date": "1997-10-26",
     "end": "1998-03-13",
     "src": "Beast Wars: Transformers",
     "note": "Wikipedia: | episodes2 = 13 … | start2 = {{Start date|1997|10|26}} … | end2 = {{End date|1998|3|13}}"
    }
   },
   {
    "key": "s3",
    "rank": 9,
    "label": "Season 3",
    "season": 3,
    "episodes": 13,
    "iu": {
     "label": "Prehistoric Earth, after season 2",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Beast_Wars%3A_Transformers&oldid=1387192068"
     ]
    },
    "rel": {
     "date": "1998-10-25",
     "end": "1999-05-07",
     "src": "Beast Wars: Transformers",
     "note": "Wikipedia: | episodes3 = 13 … | start3 = {{Start date|1998|10|25}} … | end3 = {{End date|1999|5|7}}"
    }
   }
  ]
 },
 {
  "id": "tf-beast-machines",
  "title": "Beast Machines: Transformers",
  "type": "series",
  "wiki": "Beast Machines: Transformers",
  "continuity": "tf-beast-era",
  "studio": "mainframe-entertainment",
  "platform": "fox-kids",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "tf-beast-wars",
    "kind": "continues",
    "note": "direct sequel"
   }
  ],
  "units": [
   {
    "key": "s1",
    "rank": 10,
    "label": "Season 1",
    "season": 1,
    "episodes": 13,
    "iu": {
     "label": "Cybertron, after Beast Wars",
     "precision": "relative",
     "confidence": "inferred",
     "note": "It was a direct sequel to Beast Wars, taking place within the continuity of the original Transformers series.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Beast_Machines%3A_Transformers&oldid=1387192062"
     ]
    },
    "rel": {
     "date": "1999-09-18",
     "end": "1999-12-18",
     "src": "Beast Machines: Transformers",
     "note": "Wikipedia: | episodes1 = 13 … | start1 = {{Start date|1999|9|18}} … | end1 = {{End date|1999|12|18}}"
    }
   },
   {
    "key": "s2",
    "rank": 11,
    "label": "Season 2: Battle for the Spark",
    "season": 2,
    "episodes": 13,
    "iu": {
     "label": "After season 1",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Beast_Machines%3A_Transformers&oldid=1387192062"
     ]
    },
    "rel": {
     "date": "2000-08-05",
     "end": "2000-11-18",
     "src": "Beast Machines: Transformers",
     "note": "Wikipedia: | episodes2 = 13 … | start2 = {{Start date|2000|8|5}} … | end2 = {{End date|2000|11|18}}"
    }
   }
  ]
 },
 {
  "id": "tf-film-bumblebee",
  "title": "Bumblebee",
  "type": "film",
  "wiki": "Bumblebee (film)",
  "continuity": "tf-live-action",
  "studio": "allspark-pictures",
  "platform": "theatrical",
  "chars": [],
  "notes": "Release date is the US theatrical date.",
  "links": [
   {
    "to": "tf-film-2007",
    "kind": "continues",
    "note": "prequel to the Bay films (\"A prequel to the film series titled Bumblebee\"); some details conflict with the earlier films"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 12,
    "label": "Film",
    "iu": {
     "y": 1987,
     "label": "1987",
     "precision": "year",
     "confidence": "stated",
     "note": "Set in 1987, the film follows Bumblebee being sent to Earth for refuge and befriending a teenage girl named Charlie.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Bumblebee_%28film%29&oldid=1387088977"
     ]
    },
    "rel": {
     "date": "2018-12-21",
     "end": null,
     "src": "Bumblebee (film)",
     "note": "Wikipedia: The film premiered on December 3, 2018, at the Sony Center in Berlin, and was released in the United States on December 21, by Paramount Pictures."
    }
   }
  ]
 },
 {
  "id": "tf-film-rise-of-the-beasts",
  "title": "Transformers: Rise of the Beasts",
  "type": "film",
  "wiki": "Transformers: Rise of the Beasts",
  "continuity": "tf-live-action",
  "studio": "skydance-media",
  "platform": "theatrical",
  "chars": [],
  "notes": "Release date is the US theatrical date.",
  "links": [
   {
    "to": "tf-film-bumblebee",
    "kind": "continues",
    "note": "sequel to Bumblebee"
   },
   {
    "to": "tf-beast-wars",
    "kind": "shares-characters",
    "note": "features the Maximals; Beast Wars \"reworked as a hybrid adaptation\" (separate continuity)"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 13,
    "label": "Film",
    "iu": {
     "y": 1994,
     "label": "1994",
     "precision": "year",
     "confidence": "stated",
     "note": "Set in 1994, the film follows ex-military electronics expert Noah Diaz and artifact researcher Elena Wallace as they help the Autobots and the Maximals protect an artifact known as the Transwarp Key from the villainous Terrorcons.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Transformers%3A_Rise_of_the_Beasts&oldid=1387177316"
     ]
    },
    "rel": {
     "date": "2023-06-09",
     "end": null,
     "src": "Transformers: Rise of the Beasts",
     "note": "Wikipedia: Transformers: Rise of the Beasts premiered at Marina Bay Sands in Singapore on May 27, 2023, and was theatrically released in the United States on June 9, 2023, by Paramount Pictures."
    }
   }
  ]
 },
 {
  "id": "tf-film-2007",
  "title": "Transformers",
  "type": "film",
  "wiki": "Transformers (film)",
  "continuity": "tf-live-action",
  "studio": "paramount-pictures",
  "platform": "theatrical",
  "chars": [],
  "notes": "Release date is the US theatrical date.",
  "units": [
   {
    "key": "",
    "rank": 14,
    "label": "Film",
    "iu": {
     "y": 2007,
     "label": "2007 (prologue 1897)",
     "precision": "year",
     "confidence": "inferred",
     "note": "Captain Archibald Witwicky and his crew of explorers stumbled upon Megatron in 1897. … [[Category:Films set in 2007]]",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Transformers_%28film%29&oldid=1386430649"
     ]
    },
    "rel": {
     "date": "2007-07-03",
     "end": null,
     "src": "Transformers (film)",
     "note": "Wikipedia: It premiered on June 10, 2007, at the N Seoul Tower in Seoul, South Korea, and released by Paramount Pictures in the United States on July 3."
    }
   }
  ]
 },
 {
  "id": "tf-film-revenge-of-the-fallen",
  "title": "Transformers: Revenge of the Fallen",
  "type": "film",
  "wiki": "Transformers: Revenge of the Fallen",
  "continuity": "tf-live-action",
  "studio": "dreamworks-pictures",
  "platform": "theatrical",
  "chars": [],
  "notes": "Release date is the US theatrical date.",
  "links": [
   {
    "to": "tf-film-2007",
    "kind": "continues",
    "note": "set two years later"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 15,
    "label": "Film",
    "iu": {
     "y": 2009,
     "label": "2009",
     "precision": "year",
     "confidence": "inferred",
     "note": "Set two years after the events of Transformers, the story recounts the battle between the Autobots, led by Optimus Prime (voiced by Peter Cullen), and the Decepticons, led by Megatron (voiced by Hugo Weaving). … [[Category:Films set in 2009]]",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Transformers%3A_Revenge_of_the_Fallen&oldid=1387056258"
     ]
    },
    "rel": {
     "date": "2009-06-24",
     "end": null,
     "src": "Transformers: Revenge of the Fallen",
     "note": "Wikipedia: It debuted on June 8, 2009, at Roppongi Hills in Tokyo, Japan and was released on June 24 by Paramount Pictures in the United States."
    }
   }
  ]
 },
 {
  "id": "tf-film-dark-of-the-moon",
  "title": "Transformers: Dark of the Moon",
  "type": "film",
  "wiki": "Transformers: Dark of the Moon",
  "continuity": "tf-live-action",
  "studio": "paramount-pictures",
  "platform": "theatrical",
  "chars": [],
  "notes": "Release date is the US theatrical date.",
  "links": [
   {
    "to": "tf-film-revenge-of-the-fallen",
    "kind": "continues",
    "note": "three years after the battle of Egypt"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 16,
    "label": "Film",
    "iu": {
     "y": 2012,
     "label": "2012 (prologue 1962–1969)",
     "precision": "year",
     "confidence": "inferred",
     "note": "In the present day, three years after the battle of Egypt, the Autobots help humanity prevent major conflicts. … [[Category:Films set in 2012]]",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Transformers%3A_Dark_of_the_Moon&oldid=1387056245"
     ]
    },
    "rel": {
     "date": "2011-06-29",
     "end": null,
     "src": "Transformers: Dark of the Moon",
     "note": "Wikipedia: The release date was moved from July 1 to June 29, in order to monitor an early response to footage."
    }
   }
  ]
 },
 {
  "id": "tf-film-age-of-extinction",
  "title": "Transformers: Age of Extinction",
  "type": "film",
  "wiki": "Transformers: Age of Extinction",
  "continuity": "tf-live-action",
  "studio": "paramount-pictures",
  "platform": "theatrical",
  "chars": [],
  "notes": "Release date is the US theatrical date.",
  "links": [
   {
    "to": "tf-film-dark-of-the-moon",
    "kind": "continues",
    "note": "four or five years after the Battle of Chicago"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 17,
    "label": "Film",
    "iu": {
     "y": 2017,
     "label": "c. 2016–2017",
     "precision": "year",
     "confidence": "disputed",
     "note": "Five years after the Battle of Chicago, humans view Transformers as hostile and terminate all joint operations with them. … The film was not a reboot but a sequel to Dark of the Moon, taking place four years later. … [[Category:Films set in 2017]]",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Transformers%3A_Age_of_Extinction&oldid=1387420100"
     ]
    },
    "rel": {
     "date": "2014-06-27",
     "end": null,
     "src": "Transformers: Age of Extinction",
     "note": "Wikipedia: The film was released in the United States on June 27, 2014, by Paramount Pictures."
    }
   }
  ]
 },
 {
  "id": "tf-film-the-last-knight",
  "title": "Transformers: The Last Knight",
  "type": "film",
  "wiki": "Transformers: The Last Knight",
  "continuity": "tf-live-action",
  "studio": "paramount-pictures",
  "platform": "theatrical",
  "chars": [],
  "notes": "Release date is the US theatrical date.",
  "links": [
   {
    "to": "tf-film-age-of-extinction",
    "kind": "continues",
    "note": "sequel"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 18,
    "label": "Film",
    "iu": {
     "y": 2019,
     "label": "2019 (prologue 484 AD)",
     "precision": "year",
     "confidence": "inferred",
     "note": "In 484 AD, Merlin finds the Knights of Iacon, a group of Transformers hiding on Earth … In the present day, following the events of Hong Kong, Optimus Prime arrives on the ruins of Cybertron … [[Category:Films set in 2019]]",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Transformers%3A_The_Last_Knight&oldid=1386312052"
     ]
    },
    "rel": {
     "date": "2017-06-21",
     "end": null,
     "src": "Transformers: The Last Knight",
     "note": "Wikipedia: Transformers: The Last Knight premiered on June 18, 2017, at the Odeon Luxe Leicester Square in London and was released in the United States on June 21, by Paramount Pictures."
    }
   }
  ]
 },
 {
  "id": "tf-prime",
  "title": "Transformers: Prime",
  "type": "series",
  "wiki": "Transformers: Prime",
  "continuity": "tf-aligned",
  "studio": "hasbro-studios",
  "platform": "the-hub",
  "chars": [],
  "notes": "",
  "units": [
   {
    "key": "s1",
    "rank": 19,
    "label": "Season 1",
    "season": 1,
    "episodes": 26,
    "iu": {
     "label": "Modern-day Earth",
     "precision": "relative",
     "confidence": "inferred",
     "note": "The series is notably the first work within this continuity to not focus on the Autobots and the Decepticons' war on their home planet of Cybertron (though glimpses of it are shown in various flashbacks), and instead takes place primarily on Earth during the modern era.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Transformers%3A_Prime&oldid=1387257859"
     ]
    },
    "rel": {
     "date": "2010-11-26",
     "end": "2011-10-15",
     "src": "Transformers: Prime",
     "note": "Wikipedia: | episodes1  = 26 … | start1     = {{Start date|2010|11|26}} … | end1       = {{End date|2011|10|15}}"
    }
   },
   {
    "key": "s2",
    "rank": 20,
    "label": "Season 2",
    "season": 2,
    "episodes": 26,
    "iu": {
     "label": "After season 1",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Transformers%3A_Prime&oldid=1387257859"
     ]
    },
    "rel": {
     "date": "2012-02-18",
     "end": "2012-11-02",
     "src": "Transformers: Prime",
     "note": "Wikipedia: | episodes2  = 26 … | start2     = {{Start date|2012|2|18}} … | end2       = {{End date|2012|11|2}}"
    }
   },
   {
    "key": "s3",
    "rank": 21,
    "label": "Season 3: Beast Hunters",
    "season": 3,
    "episodes": 13,
    "iu": {
     "label": "After season 2",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Transformers%3A_Prime&oldid=1387257859"
     ]
    },
    "rel": {
     "date": "2013-03-22",
     "end": "2013-07-26",
     "src": "Transformers: Prime",
     "note": "Wikipedia: | episodes3  = 13 … | start3     = {{Start date|2013|3|22}} … | end3       = {{End date|2013|7|26}}"
    }
   }
  ]
 },
 {
  "id": "tf-prime-predacons-rising",
  "title": "Transformers Prime Beast Hunters: Predacons Rising",
  "type": "film",
  "wiki": "Transformers Prime Beast Hunters: Predacons Rising",
  "continuity": "tf-aligned",
  "studio": "hasbro-studios",
  "platform": "the-hub",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "tf-prime",
    "kind": "continues",
    "note": "concludes the series"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 22,
    "label": "Film",
    "iu": {
     "label": "After Prime season 3",
     "precision": "relative",
     "confidence": "inferred",
     "note": "Transformers Prime Beast Hunters: Predacons Rising is a 2013 American animated action adventure television film that concludes the Transformers: Prime television series.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Transformers_Prime_Beast_Hunters%3A_Predacons_Rising&oldid=1378746058"
     ]
    },
    "rel": {
     "date": "2013-10-04",
     "end": null,
     "src": "Transformers Prime Beast Hunters: Predacons Rising",
     "note": "Wikipedia: It was first broadcast on Hub Network on October 4, 2013."
    }
   }
  ]
 },
 {
  "id": "tf-rid-2015",
  "title": "Transformers: Robots in Disguise",
  "type": "series",
  "wiki": "Transformers: Robots in Disguise (2015 TV series)",
  "continuity": "tf-aligned",
  "studio": "hasbro-studios",
  "platform": "cartoon-network",
  "chars": [],
  "notes": "Wikipedia lists a 6-episode 2016 miniseries between seasons 2 and 3 (key \"mini\"). Season 3 is subtitled Combiner Force. The 2001 series of the same name is not included.",
  "links": [
   {
    "to": "tf-prime-predacons-rising",
    "kind": "continues",
    "note": "stand-alone sequel, set three years after Prime"
   }
  ],
  "units": [
   {
    "key": "s1",
    "rank": 23,
    "label": "Season 1",
    "season": 1,
    "episodes": 26,
    "iu": {
     "label": "Three years after Prime",
     "precision": "relative",
     "confidence": "inferred",
     "note": "Three years after Megatron's exile, the Predacons' defeat, and life being restored to the planet Cybertron, a new generation of Transformers enjoy a new age of prosperity.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Transformers%3A_Robots_in_Disguise_%282015_TV_series%29&oldid=1387257874"
     ]
    },
    "rel": {
     "date": "2015-03-14",
     "end": "2015-09-12",
     "src": "Transformers: Robots in Disguise (2015 TV series)",
     "note": "Wikipedia: | episodes1  = 26 … | start1     = {{Start date|2015|3|14}} … | end1       = {{End date|2015|9|12}}"
    }
   },
   {
    "key": "s2",
    "rank": 24,
    "label": "Season 2",
    "season": 2,
    "episodes": 13,
    "iu": {
     "label": "After the previous season",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Transformers%3A_Robots_in_Disguise_%282015_TV_series%29&oldid=1387257874"
     ]
    },
    "rel": {
     "date": "2016-02-20",
     "end": "2016-05-14",
     "src": "Transformers: Robots in Disguise (2015 TV series)",
     "note": "Wikipedia: | episodes2  = 13 … | start2     = {{Start date|2016|2|20}} … | end2       = {{End date|2016|5|14}}"
    }
   },
   {
    "key": "mini",
    "rank": 25,
    "label": "Miniseries (2016)",
    "episodes": 6,
    "iu": {
     "label": "After the previous season",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Transformers%3A_Robots_in_Disguise_%282015_TV_series%29&oldid=1387257874"
     ]
    },
    "rel": {
     "date": "2016-10-22",
     "end": "2016-12-03",
     "src": "Transformers: Robots in Disguise (2015 TV series)",
     "note": "Wikipedia: | linkT3     = Miniseries … | episodes3  = 6 … | start3     = {{Start date|2016|10|22}} … | end3       = {{End date|2016|12|3}}"
    }
   },
   {
    "key": "s3",
    "rank": 26,
    "label": "Season 3: Combiner Force",
    "season": 3,
    "episodes": 26,
    "iu": {
     "label": "After the previous season",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Transformers%3A_Robots_in_Disguise_%282015_TV_series%29&oldid=1387257874"
     ]
    },
    "rel": {
     "date": "2017-04-29",
     "end": "2017-11-11",
     "src": "Transformers: Robots in Disguise (2015 TV series)",
     "note": "Wikipedia: | linkT4     = 3 … | episodes4  = 26 … | start4     = {{Start date|2017|4|29}} … | end4       = {{End date|2017|11|11}}"
    }
   }
  ]
 },
 {
  "id": "tf-one",
  "title": "Transformers One",
  "type": "animated-film",
  "wiki": "Transformers One",
  "continuity": "tf-one",
  "studio": "paramount-animation",
  "platform": "theatrical",
  "chars": [],
  "notes": "",
  "units": [
   {
    "key": "",
    "rank": 27,
    "label": "Film",
    "iu": {
     "label": "Cybertron, before the Autobot–Decepticon war",
     "precision": "relative",
     "confidence": "inferred",
     "note": "It depicts the origins of Optimus Prime and Megatron.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Transformers_One&oldid=1386284676"
     ]
    },
    "rel": {
     "date": "2024-09-20",
     "end": null,
     "src": "Transformers One",
     "note": "Wikipedia: Transformers One premiered in Sydney, Australia, on September 11, 2024, and was released by Paramount Pictures in the United States on September 20."
    }
   }
  ]
 },
 {
  "id": "tf-earthspark",
  "title": "Transformers: EarthSpark",
  "type": "series",
  "wiki": "Transformers: EarthSpark",
  "continuity": "tf-earthspark",
  "studio": "entertainment-one",
  "platform": "paramount-plus",
  "chars": [],
  "notes": "Season 1 came out in three batches (Nov 11, 2022; Mar 3, 2023; Jul 28, 2023), and release_end is the last batch. Season 4 is two specials, first released on Nickelodeon International.",
  "units": [
   {
    "key": "s1",
    "rank": 28,
    "label": "Season 1",
    "season": 1,
    "episodes": 26,
    "iu": {
     "label": "Fifteen years after the space bridge to Cybertron is destroyed",
     "precision": "relative",
     "confidence": "inferred",
     "note": "Fifteen years after the space bridge to Cybertron is destroyed, ending the civil war between the Autobots and the Decepticons, the Malto family relocates from Philadelphia to the small town of Witwicky, Pennsylvania.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Transformers%3A_EarthSpark&oldid=1387257846"
     ]
    },
    "rel": {
     "date": "2022-11-11",
     "end": "2023-07-28",
     "src": "Transformers: EarthSpark",
     "note": "Wikipedia: | episodes1  = 26 … | released1A  = {{Start date|2022|11|11}} … | episodes1C = 8 … | released1C  = {{Start date|2023|07|28}}"
    }
   },
   {
    "key": "s2",
    "rank": 29,
    "label": "Season 2",
    "season": 2,
    "episodes": 10,
    "iu": {
     "label": "After season 1",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Transformers%3A_EarthSpark&oldid=1387257846"
     ]
    },
    "rel": {
     "date": "2024-06-07",
     "end": "2024-06-07",
     "src": "Transformers: EarthSpark",
     "note": "Wikipedia: | episodes2 = 10 … | released2 = {{Start date|2024|06|07}}"
    }
   },
   {
    "key": "s3",
    "rank": 30,
    "label": "Season 3",
    "season": 3,
    "episodes": 8,
    "iu": {
     "label": "After season 2",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Transformers%3A_EarthSpark&oldid=1387257846"
     ]
    },
    "rel": {
     "date": "2024-10-25",
     "end": "2024-10-25",
     "src": "Transformers: EarthSpark",
     "note": "Wikipedia: | episodes3 = 8 … | released3 = {{Start date|2024|10|25}}"
    }
   },
   {
    "key": "s4",
    "rank": 31,
    "label": "Season 4",
    "season": 4,
    "episodes": 2,
    "iu": {
     "label": "After season 3",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Transformers%3A_EarthSpark&oldid=1387257846"
     ]
    },
    "rel": {
     "date": "2025-12-05",
     "end": "2025-12-05",
     "src": "Transformers: EarthSpark",
     "note": "Wikipedia: | episodes4 = 2 … | released4 = {{Start date|2025|12|5}}"
    }
   }
  ]
 }
];
