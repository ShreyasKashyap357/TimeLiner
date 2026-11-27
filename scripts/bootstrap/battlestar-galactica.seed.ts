// Battlestar Galactica seed, generated from research on 2026-11-27 (see DATA_NOTES).
import type { SeedTitle } from './seed-kit.ts';

export const SEED: SeedTitle[] = [
 {
  "id": "bsg-1978-film",
  "title": "Battlestar Galactica",
  "type": "film",
  "wiki": "Saga of a Star World",
  "continuity": "bsg-original",
  "studio": "universal-studios",
  "platform": "theatrical",
  "chars": [],
  "notes": "The Wikipedia title \"Battlestar Galactica (1978 film)\" redirects to \"Saga of a Star World\" (the pilot episode article, which covers the theatrical version). Universal per article: \"Universal Studios decided to release a re-edited version theatrically\". Distributor not stated in the infobox.",
  "links": [
   {
    "to": "bsg-1978",
    "kind": "adapts",
    "note": "Theatrical re-edit of the series pilot \"Saga of a Star World\"."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 1,
    "label": "Film",
    "iu": {
     "label": "start of the exodus (\"seventh millennium of time\")",
     "precision": "relative",
     "confidence": "inferred",
     "note": "The era in which this exodus took place is never clearly stated in the series itself. At the start of the series, it is mentioned as being \"the seventh millennium of time\", although it is unknown when this is in relation to Earth's history.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Battlestar_Galactica_(1978_TV_series)&oldid=1387191795"
     ]
    },
    "rel": {
     "date": "1978-07-08",
     "end": null,
     "src": "Saga of a Star World",
     "note": "Wikipedia: On July 8, 1978, two months before its U.S. television debut, the film was released in Canada on 75 screens. … (edited theatrical version released in cinemas July 8, 1978 (Canada) & May 18, 1979 (United States))"
    }
   }
  ]
 },
 {
  "id": "bsg-1978",
  "title": "Battlestar Galactica",
  "type": "series",
  "wiki": "Battlestar Galactica (1978 TV series)",
  "continuity": "bsg-original",
  "studio": "glen-a-larson-productions",
  "platform": "abc",
  "chars": [],
  "notes": "",
  "units": [
   {
    "key": "",
    "rank": 2,
    "label": "Season 1",
    "episodes": 24,
    "iu": {
     "label": "\"seventh millennium of time\"; after the 1969 Moon landing",
     "precision": "relative",
     "confidence": "inferred",
     "note": "At the start of the series, it is mentioned as being \"the seventh millennium of time\", although it is unknown when this is in relation to Earth's history. The final aired episode, \"The Hand of God\", indicates that the original series took place after the Apollo 11 Moon landing in 1969",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Battlestar_Galactica_(1978_TV_series)&oldid=1387191795"
     ]
    },
    "rel": {
     "date": "1978-09-17",
     "end": "1979-04-29",
     "src": "Battlestar Galactica (1978 TV series)",
     "note": "Wikipedia: | episodes1 = 24{{efn|The series consist of a three-hour pilot movie \"Saga of a Star World\"  plus 21 episodes. The pilot movie was split into three one-hour episodes for syndication.}} | start1 = {{Start date|1978|9|17}} | end1 = {{End date|1979|4|29}}"
    }
   }
  ]
 },
 {
  "id": "galactica-1980",
  "title": "Galactica 1980",
  "type": "series",
  "wiki": "Galactica 1980",
  "continuity": "bsg-original",
  "studio": "glen-a-larson-productions",
  "platform": "abc",
  "chars": [],
  "notes": "The release data comes from the combined episode list, where Galactica 1980 is row 2 of the series overview. Its key is renumbered s1 because it is its own series.",
  "links": [
   {
    "to": "bsg-1978",
    "kind": "sequel",
    "note": "Set 30 years after the original series."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 3,
    "label": "Season 1",
    "episodes": 10,
    "iu": {
     "label": "1980",
     "precision": "relative",
     "confidence": "stated",
     "note": "Set during the year 1980, and a generation after the original series … The later Galactica 1980 series is expressly set in 1980, after a 30-year voyage to Earth.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Galactica_1980&oldid=1387213399"
     ]
    },
    "rel": {
     "date": "1980-01-27",
     "end": "1980-05-04",
     "src": "Galactica 1980",
     "note": "Wikipedia: | episodes2 = 10 | start2 = {{Start date|1980|1|27}} | end2 = {{End date|1980|5|4}}"
    }
   }
  ]
 },
 {
  "id": "bsg-miniseries",
  "title": "Battlestar Galactica (miniseries)",
  "type": "series",
  "wiki": "Battlestar Galactica (miniseries)",
  "continuity": "bsg-reimagined",
  "studio": "usa-cable-entertainment",
  "platform": "sci-fi",
  "chars": [],
  "notes": "Backdoor pilot for the 2004 series. Modelled as its own title with a single \"Miniseries\" unit (season 0 in the episode list).",
  "units": [
   {
    "key": "",
    "rank": 6,
    "label": "Miniseries",
    "episodes": 2,
    "iu": {
     "label": "the Fall (40 years after the First Cylon War armistice)",
     "precision": "relative",
     "confidence": "inferred",
     "note": "After a 40-year armistice in a war between the Twelve Colonies of Kobol (the homeworlds populated by humans) and the Cylons (human-created robots), the Cylons launch a surprise nuclear attack",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Battlestar_Galactica_(miniseries)&oldid=1377054314"
     ]
    },
    "rel": {
     "date": "2003-12-08",
     "end": "2003-12-09",
     "src": "Battlestar Galactica (miniseries)",
     "note": "Wikipedia: The miniseries aired originally on Sci Fi in the United States starting on December 8, 2003. … | first_aired = {{Start date|2003|12|8}} | last_aired = {{End date|2003|12|9}}"
    }
   }
  ]
 },
 {
  "id": "bsg-2004",
  "title": "Battlestar Galactica",
  "type": "series",
  "wiki": "Battlestar Galactica (2004 TV series)",
  "continuity": "bsg-reimagined",
  "studio": "david-eick-productions",
  "platform": "sci-fi",
  "chars": [],
  "notes": "Infobox: first_aired 2003-12-08 (miniseries) to 2009-10-27 (The Plan). Seasons here exclude the miniseries and TV films, which are separate titles.",
  "links": [
   {
    "to": "bsg-miniseries",
    "kind": "sequel",
    "note": "Continues from the miniseries."
   },
   {
    "to": "bsg-1978",
    "kind": "remake",
    "note": "Re-imagining of the 1978 series (separate continuity)."
   }
  ],
  "units": [
   {
    "key": "s1",
    "rank": 7,
    "label": "Season 1",
    "season": 1,
    "episodes": 13,
    "iu": {
     "label": "immediately after the Fall",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=List_of_Battlestar_Galactica_(2004_TV_series)_episodes&oldid=1374313303"
     ]
    },
    "rel": {
     "date": "2004-10-18",
     "end": "2005-01-24",
     "src": "Battlestar Galactica (2004 TV series)",
     "note": "Wikipedia: | episodes1 = 13 | start1 = {{Start date|2004|10|18}} | end1 = {{End date|2005|01|24}}"
    }
   },
   {
    "key": "s2",
    "rank": 8,
    "label": "Season 2",
    "season": 2,
    "episodes": 20,
    "iu": {
     "label": "after season 1",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=List_of_Battlestar_Galactica_(2004_TV_series)_episodes&oldid=1374313303"
     ]
    },
    "rel": {
     "date": "2005-07-15",
     "end": "2006-03-10",
     "src": "Battlestar Galactica (2004 TV series)",
     "note": "Wikipedia: | episodes2 = 20 | start2A = {{Start date|2005|07|15}} | end2A = {{End date|2005|09|23}} | start2B = {{Start date|2006|01|06}} | end2B = {{End date|2006|03|10}}"
    }
   },
   {
    "key": "s3",
    "rank": 11,
    "label": "Season 3",
    "season": 3,
    "episodes": 20,
    "iu": {
     "label": "after season 2",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=List_of_Battlestar_Galactica_(2004_TV_series)_episodes&oldid=1374313303"
     ]
    },
    "rel": {
     "date": "2006-10-06",
     "end": "2007-03-25",
     "src": "Battlestar Galactica (2004 TV series)",
     "note": "Wikipedia: | episodes3 = 20 | start3 = {{Start date|2006|10|06}} | end3 = {{End date|2007|03|25}}"
    }
   },
   {
    "key": "s4",
    "rank": 12,
    "label": "Season 4",
    "season": 4,
    "episodes": 21,
    "iu": {
     "label": "after season 3; epilogue 150,000 years before present-day Earth",
     "precision": "relative",
     "confidence": "inferred",
     "note": "they talk about the technological advancements the humans have made since the Colonials and Humanoid Cylons first arrived on this Earth, over 150,000 years earlier.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Battlestar_Galactica_(2004_TV_series)&oldid=1387191800"
     ]
    },
    "rel": {
     "date": "2008-04-04",
     "end": "2009-03-20",
     "src": "Battlestar Galactica (2004 TV series)",
     "note": "Wikipedia: | episodes4 = 21 | start4A = {{Start date|2008|04|04}} | end4A = {{End date|2008|06|13}} | start4B = {{Start date|2009|01|16}} | end4B = {{End date|2009|03|20}}"
    }
   }
  ]
 },
 {
  "id": "bsg-razor",
  "title": "Battlestar Galactica: Razor",
  "type": "film",
  "wiki": "Battlestar Galactica: Razor",
  "continuity": "bsg-reimagined",
  "studio": "david-eick-productions",
  "platform": "sci-fi",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "bsg-2004",
    "kind": "continues",
    "note": "Broadcast between seasons 3 and 4; set during season 2."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 9,
    "label": "TV film",
    "iu": {
     "label": "during season 2 (flashbacks to the Fall and the First Cylon War)",
     "precision": "relative",
     "confidence": "inferred",
     "note": "Razor takes place during the first thirty days of Lee Adama's Pegasus command during the period originally covered in the second half of season 2, after the episode \"The Captain's Hand\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Battlestar_Galactica%3A_Razor&oldid=1385395591"
     ]
    },
    "rel": {
     "date": "2007-11-24",
     "end": null,
     "src": "Battlestar Galactica: Razor",
     "note": "Wikipedia: It premiered November 24, 2007 in the U.S. and December 18, 2007, in the UK, with a limited U.S. theatrical engagement in major cities … | released = {{Start date|2007|11|24}}"
    }
   }
  ]
 },
 {
  "id": "bsg-the-plan",
  "title": "Battlestar Galactica: The Plan",
  "type": "film",
  "wiki": "Battlestar Galactica: The Plan",
  "continuity": "bsg-reimagined",
  "studio": "david-eick-productions",
  "platform": "home-media",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "bsg-2004",
    "kind": "continues",
    "note": "Retells the miniseries and seasons 1–2 from the Cylon side."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 10,
    "label": "TV film",
    "iu": {
     "label": "the Fall through season 2 (retold)",
     "precision": "relative",
     "confidence": "inferred",
     "note": "The miniseries and first two seasons of Battlestar Galactica are retold with more emphasis on the Cylon",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Battlestar_Galactica%3A_The_Plan&oldid=1357826443"
     ]
    },
    "rel": {
     "date": "2009-10-27",
     "end": null,
     "src": "Battlestar Galactica: The Plan",
     "note": "Wikipedia: The film premiered exclusively on DVD, Blu-ray Disc and digital download on October 27, 2009. It premiered on January 10, 2010, on Syfy"
    }
   }
  ]
 },
 {
  "id": "caprica",
  "title": "Caprica",
  "type": "series",
  "wiki": "Caprica",
  "continuity": "bsg-reimagined",
  "studio": "universal-cable-productions",
  "platform": "syfy",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "bsg-2004",
    "kind": "sequel",
    "note": "Prequel spin-off set 58 years before the series."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 4,
    "label": "Season 1",
    "episodes": 19,
    "iu": {
     "label": "58 years before the Fall",
     "precision": "relative",
     "confidence": "inferred",
     "note": "Caprica is set 58 years before the main series, and shows how humanity first created the Cylon robots",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Caprica&oldid=1387197104"
     ]
    },
    "rel": {
     "date": "2010-01-22",
     "end": "2010-11-30",
     "src": "Caprica",
     "note": "Wikipedia: | first_aired = {{Start date|2010|01|22}} | last_aired = {{End date|2010|11|30}} | num_episodes = 19 … The remaining episodes were released on DVD in the U.S. on December 21, 2010 and aired on Syfy in a burn-off marathon on January 4, 2011."
    }
   }
  ]
 },
 {
  "id": "bsg-blood-and-chrome",
  "title": "Battlestar Galactica: Blood & Chrome",
  "type": "series",
  "wiki": "Battlestar Galactica: Blood & Chrome",
  "continuity": "bsg-reimagined",
  "studio": "universal-cable-productions",
  "platform": "machinima",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "caprica",
    "kind": "sequel",
    "note": "\"a sequel set during the First Cylon War after the events of Caprica\" (1978 series article)."
   },
   {
    "to": "bsg-2004",
    "kind": "sequel",
    "note": "Young William Adama."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 5,
    "label": "Season 1",
    "episodes": 10,
    "iu": {
     "label": "10th year of the First Cylon War",
     "precision": "relative",
     "confidence": "inferred",
     "note": "Set in the tenth year of the First Cylon War, the story follows William Adama, a young pilot just graduated from the Academy",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Battlestar_Galactica%3A_Blood_%26_Chrome&oldid=1383053090"
     ]
    },
    "rel": {
     "date": "2012-11-09",
     "end": "2012-12-07",
     "src": "Battlestar Galactica: Blood & Chrome",
     "note": "Wikipedia: On November 9, 2012 the Machinima network released the first two episodes of Blood and Chrome on its YouTube channel. It released two additional episodes each Friday, until the finale on December 7, 2012."
    }
   }
  ]
 }
];
