// The Witcher seed, generated from research on 2026-11-27 (see DATA_NOTES).
import type { SeedTitle } from './seed-kit.ts';

export const SEED: SeedTitle[] = [
 {
  "id": "the-last-wish",
  "title": "The Last Wish",
  "type": "anthology",
  "wiki": "The Last Wish",
  "continuity": "witcher-books",
  "studio": "andrzej-sapkowski",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "Collection (Ostatnie życzenie). Replaced the 1990 Reporter collection \"The Witcher\" as book 1. English translation by Danusia Stok (2007).",
  "units": [
   {
    "key": "",
    "label": "Book",
    "pages": 288,
    "iu": {
     "y": 1249,
     "y2": 1253,
     "label": "1249–1253 (frame story later)",
     "precision": "range",
     "confidence": "inferred",
     "note": "The short stories The Edge of the World and The Last Wish takes place … The short stories The Witcher and The Voice of Reason take place",
     "src": [
      "https://witcher.fandom.com/wiki/Timeline?oldid=645231"
     ]
    },
    "rel": {
     "date": "1993",
     "end": null,
     "src": "The Last Wish",
     "note": "Wikipedia: Published by SuperNowa in 1993, it was preceded by 1992's Sword of Destiny, but is officially considered the first entry in the series and Sword of Destiny the second."
    }
   }
  ]
 },
 {
  "id": "sword-of-destiny",
  "title": "Sword of Destiny",
  "type": "anthology",
  "wiki": "Sword of Destiny",
  "continuity": "witcher-books",
  "studio": "andrzej-sapkowski",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "Collection (Miecz przeznaczenia).",
  "links": [
   {
    "to": "the-last-wish",
    "kind": "sequel",
    "note": "officially book 2 though published first"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Book",
    "pages": 384,
    "iu": {
     "y": 1254,
     "y2": 1264,
     "label": "1254–1264",
     "precision": "range",
     "confidence": "inferred",
     "note": "The short story The Bounds of Reason takes place … The short story The Sword of Destiny takes place … The short story Something More takes place",
     "src": [
      "https://witcher.fandom.com/wiki/Timeline?oldid=645231"
     ]
    },
    "rel": {
     "date": "1992",
     "end": null,
     "src": "Sword of Destiny",
     "note": "Wikipedia: Although published in 1992, it is officially considered the second entry in the series, behind The Last Wish, which was published the following year."
    }
   }
  ]
 },
 {
  "id": "blood-of-elves",
  "title": "Blood of Elves",
  "type": "novel",
  "wiki": "Blood of Elves",
  "continuity": "witcher-books",
  "studio": "andrzej-sapkowski",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "Krew elfów. US edition 2009 (Orbit).",
  "links": [
   {
    "to": "sword-of-destiny",
    "kind": "sequel",
    "note": ""
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Book",
    "pages": 320,
    "iu": {
     "y": 1267,
     "label": "1267",
     "precision": "year",
     "confidence": "inferred",
     "note": "Major events in {{BoE}}, {{ToC}}, {{BoF}} and {{TTotS}} take place.",
     "src": [
      "https://witcher.fandom.com/wiki/Timeline?oldid=645231"
     ]
    },
    "rel": {
     "date": "1994",
     "end": null,
     "src": "Blood of Elves",
     "note": "Wikipedia: Blood of Elves () is the first novel in The Witcher series written by the Polish fantasy writer Andrzej Sapkowski, first published in Poland in 1994."
    }
   }
  ]
 },
 {
  "id": "time-of-contempt",
  "title": "Time of Contempt",
  "type": "novel",
  "wiki": "Time of Contempt",
  "continuity": "witcher-books",
  "studio": "andrzej-sapkowski",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "Czas pogardy. US edition August 27, 2013 (Orbit). Polish year from the infobox only.",
  "links": [
   {
    "to": "blood-of-elves",
    "kind": "sequel",
    "note": ""
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Book",
    "pages": 352,
    "iu": {
     "y": 1267,
     "label": "1267",
     "precision": "year",
     "confidence": "inferred",
     "note": "Major events in {{BoE}}, {{ToC}}, {{BoF}} and {{TTotS}} take place. … 1st July - Thanedd coup",
     "src": [
      "https://witcher.fandom.com/wiki/Timeline?oldid=645231"
     ]
    },
    "rel": {
     "date": "1995",
     "end": null,
     "src": "Time of Contempt",
     "note": "Wikipedia: 1995 (superNOWA) (Polish)"
    }
   }
  ]
 },
 {
  "id": "baptism-of-fire",
  "title": "Baptism of Fire",
  "type": "novel",
  "wiki": "Baptism of Fire (novel)",
  "continuity": "witcher-books",
  "studio": "andrzej-sapkowski",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "Chrzest ognia.",
  "links": [
   {
    "to": "time-of-contempt",
    "kind": "sequel",
    "note": ""
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Book",
    "pages": 352,
    "iu": {
     "y": 1267,
     "label": "1267",
     "precision": "year",
     "confidence": "inferred",
     "note": "Major events in {{BoE}}, {{ToC}}, {{BoF}} and {{TTotS}} take place.",
     "src": [
      "https://witcher.fandom.com/wiki/Timeline?oldid=645231"
     ]
    },
    "rel": {
     "date": "1996",
     "end": null,
     "src": "Baptism of Fire (novel)",
     "note": "Wikipedia: Baptism of Fire () is the third novel in the Witcher Saga written by Polish fantasy writer Andrzej Sapkowski, first published in 1996 in Polish and in English in 2014."
    }
   }
  ]
 },
 {
  "id": "the-tower-of-the-swallow",
  "title": "The Tower of the Swallow",
  "type": "novel",
  "wiki": "The Tower of the Swallow",
  "continuity": "witcher-books",
  "studio": "andrzej-sapkowski",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "Wieża Jaskółki. US title The Tower of Swallows.",
  "links": [
   {
    "to": "baptism-of-fire",
    "kind": "sequel",
    "note": ""
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Book",
    "pages": 464,
    "iu": {
     "y": 1267,
     "label": "1267",
     "precision": "year",
     "confidence": "inferred",
     "note": "Major events in {{BoE}}, {{ToC}}, {{BoF}} and {{TTotS}} take place.",
     "src": [
      "https://witcher.fandom.com/wiki/Timeline?oldid=645231"
     ]
    },
    "rel": {
     "date": "1997",
     "end": null,
     "src": "The Tower of the Swallow",
     "note": "Wikipedia: The Tower of the Swallow, published as The Tower of Swallows in the United States () is the fourth novel in the Witcher Saga written by Polish fantasy writer Andrzej Sapkowski, first published in Poland in 1997."
    }
   }
  ]
 },
 {
  "id": "the-lady-of-the-lake",
  "title": "The Lady of the Lake",
  "type": "novel",
  "wiki": "The Lady of the Lake (Sapkowski novel)",
  "continuity": "witcher-books",
  "studio": "andrzej-sapkowski",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "Pani Jeziora. Final novel of the saga.",
  "links": [
   {
    "to": "the-tower-of-the-swallow",
    "kind": "sequel",
    "note": ""
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Book",
    "pages": 544,
    "iu": {
     "y": 1268,
     "label": "1268",
     "precision": "year",
     "confidence": "inferred",
     "note": "Major events in {{TLotL}} take place",
     "src": [
      "https://witcher.fandom.com/wiki/Timeline?oldid=645231"
     ]
    },
    "rel": {
     "date": "1999",
     "end": null,
     "src": "The Lady of the Lake (Sapkowski novel)",
     "note": "Wikipedia: The Lady of the Lake () is the fifth novel in The Witcher series and the final in the original Witcher Saga, written by Polish fantasy writer Andrzej Sapkowski, first published in Poland in 1999."
    }
   }
  ]
 },
 {
  "id": "season-of-storms",
  "title": "Season of Storms",
  "type": "novel",
  "wiki": "Season of Storms",
  "continuity": "witcher-books",
  "studio": "andrzej-sapkowski",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "Sezon burz. Standalone prequel.",
  "links": [
   {
    "to": "the-last-wish",
    "kind": "shares-characters",
    "note": "set between stories of The Last Wish"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Book",
    "pages": 384,
    "iu": {
     "y": 1251,
     "label": "1251",
     "precision": "year",
     "confidence": "inferred",
     "note": "June-August - events of Season of Storms (calculation based on the rest of books)",
     "src": [
      "https://witcher.fandom.com/wiki/Timeline?oldid=645231"
     ]
    },
    "rel": {
     "date": "2013-11-06",
     "end": null,
     "src": "Season of Storms",
     "note": "Wikipedia: Season of Storms (Polish original title: Sezon burz) is the sixth novel and eighth overall book in the Witcher series  written by Polish fantasy writer Andrzej Sapkowski, first published in Poland on 6 November 2013."
    }
   }
  ]
 },
 {
  "id": "crossroads-of-ravens",
  "title": "Crossroads of Ravens",
  "type": "novel",
  "wiki": "Crossroads of Ravens",
  "continuity": "witcher-books",
  "studio": "andrzej-sapkowski",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "Rozdroże kruków.",
  "links": [
   {
    "to": "the-last-wish",
    "kind": "references",
    "note": "prequel to all Geralt stories"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Book",
    "pages": 292,
    "iu": {
     "label": "Geralt's youth (before all other stories)",
     "precision": "relative",
     "confidence": "inferred",
     "note": "Crossroads of Ravens is a prequel to all canonical stories about Geralt of Rivia published to date and tells the story of his youth.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Crossroads_of_Ravens&oldid=1387041023"
     ]
    },
    "rel": {
     "date": "2024-11-29",
     "end": null,
     "src": "Crossroads of Ravens",
     "note": "Wikipedia: Crossroads of Ravens was published in Poland on 29 November 2024 in a paperback, and on December 1 as e-book."
    }
   }
  ]
 },
 {
  "id": "the-witcher-2007",
  "title": "The Witcher",
  "type": "video-game",
  "wiki": "The Witcher (video game)",
  "continuity": "witcher-games",
  "studio": "cd-projekt-red",
  "platform": "windows",
  "chars": [],
  "notes": "Enhanced Edition 16 September 2008. Wikipedia gives Windows and Mac OS X as platforms.",
  "links": [
   {
    "to": "the-lady-of-the-lake",
    "kind": "continues",
    "note": "set about five years after the novels (separate continuity)"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Game",
    "iu": {
     "y": 1270,
     "label": "1270 (intro) or c. 1273 (book chronology)",
     "precision": "year",
     "confidence": "disputed",
     "note": "The game takes place around five years after the events of The Lady of the Lake. … In the game's intro, the date given is 1270, but according to the book it should be set in 1273 (five years after the end of Northern War II, which ended in 1268 and during the second Catriona outbreak, which started in 1272)",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=The_Witcher_%28video_game%29&oldid=1385167555",
      "https://witcher.fandom.com/wiki/The_Witcher_%28game%29?oldid=645270"
     ]
    },
    "rel": {
     "date": "2007-10-26",
     "end": null,
     "src": "The Witcher (video game)",
     "note": "Wikipedia: {{Video game release|EU|26 October 2007|NA|30 October 2007|AUS|9 November 2007}}"
    }
   }
  ]
 },
 {
  "id": "the-witcher-2",
  "title": "The Witcher 2: Assassins of Kings",
  "type": "video-game",
  "wiki": "The Witcher 2: Assassins of Kings",
  "continuity": "witcher-games",
  "studio": "cd-projekt-red",
  "platform": "windows",
  "chars": [],
  "notes": "Enhanced Edition: Windows/Xbox 360 17 April 2012.",
  "links": [
   {
    "to": "the-witcher-2007",
    "kind": "sequel",
    "note": ""
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Game",
    "iu": {
     "label": "after The Witcher",
     "precision": "relative",
     "confidence": "inferred",
     "note": "It is a sequel to the 2007 game, The Witcher and the second main installment in The Witchers video game series.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=The_Witcher_2%3A_Assassins_of_Kings&oldid=1386321998"
     ]
    },
    "rel": {
     "date": "2011-05-17",
     "end": null,
     "src": "The Witcher 2: Assassins of Kings",
     "note": "Wikipedia: The Witcher 2: Assassins of Kings was released for PC on 17 May 2011 at retail stores and digital distribution services such as GOG and Steam."
    }
   }
  ]
 },
 {
  "id": "the-witcher-3",
  "title": "The Witcher 3: Wild Hunt",
  "type": "video-game",
  "wiki": "The Witcher 3: Wild Hunt",
  "continuity": "witcher-games",
  "studio": "cd-projekt-red",
  "platform": "playstation-4",
  "chars": [],
  "notes": "Switch 15 October 2019; PS5/Series X/S \"Complete Edition\" 14 December 2022; Remastered 29 September 2026. A third expansion, Songs of the Past, is announced for 2027 (CD Projekt Red with Fool's Theory).",
  "links": [
   {
    "to": "the-witcher-2",
    "kind": "sequel",
    "note": ""
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Game",
    "iu": {
     "label": "after The Witcher 2",
     "precision": "relative",
     "confidence": "inferred",
     "note": "It is the sequel to the 2011 game The Witcher 2: Assassins of Kings and the third game in The Witcher video game series, played in an open world with a third-person perspective.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=The_Witcher_3%3A_Wild_Hunt&oldid=1387958478"
     ]
    },
    "rel": {
     "date": "2015-05-19",
     "end": null,
     "src": "The Witcher 3: Wild Hunt",
     "note": "Wikipedia: The Witcher 3: Wild Hunt was released worldwide on 19 May 2015."
    }
   }
  ]
 },
 {
  "id": "hearts-of-stone",
  "title": "The Witcher 3: Wild Hunt – Hearts of Stone",
  "type": "expansion",
  "wiki": "The Witcher 3: Wild Hunt – Hearts of Stone",
  "continuity": "witcher-games",
  "studio": "cd-projekt-red",
  "platform": "playstation-4",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "the-witcher-3",
    "kind": "continues",
    "note": "expansion"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Expansion",
    "iu": {
     "label": "during/after Wild Hunt (player-timed)",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "The Witcher 3: Wild Hunt – Hearts of Stone"
     ]
    },
    "rel": {
     "date": "2015-10-13",
     "end": null,
     "src": "The Witcher 3: Wild Hunt – Hearts of Stone",
     "note": "Wikipedia: Hearts of Stone was released on 13 October 2015."
    }
   }
  ]
 },
 {
  "id": "blood-and-wine",
  "title": "The Witcher 3: Wild Hunt – Blood and Wine",
  "type": "expansion",
  "wiki": "The Witcher 3: Wild Hunt – Blood and Wine",
  "continuity": "witcher-games",
  "studio": "cd-projekt-red",
  "platform": "playstation-4",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "the-witcher-3",
    "kind": "continues",
    "note": "expansion"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Expansion",
    "iu": {
     "label": "after Wild Hunt",
     "precision": "relative",
     "confidence": "inferred",
     "note": "Developed by CD Projekt Red, the expansion follows Geralt of Rivia as he travels to Toussaint, a duchy untouched by the war taking place in the base game, as he hopes to track down a mysterious beast terrorizing the region.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=The_Witcher_3%3A_Wild_Hunt_%E2%80%93_Blood_and_Wine&oldid=1379096106"
     ]
    },
    "rel": {
     "date": "2016-05-31",
     "end": null,
     "src": "The Witcher 3: Wild Hunt – Blood and Wine",
     "note": "Wikipedia: Blood and Wine was released on 31 May 2016."
    }
   }
  ]
 },
 {
  "id": "the-witcher-iv",
  "title": "The Witcher IV",
  "type": "video-game",
  "wiki": "The Witcher IV",
  "continuity": "witcher-games",
  "studio": "cd-projekt-red",
  "platform": "playstation-5",
  "chars": [],
  "notes": "Unreleased.",
  "links": [
   {
    "to": "the-witcher-3",
    "kind": "sequel",
    "note": ""
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Game",
    "iu": {
     "label": "after The Witcher 3",
     "precision": "relative",
     "confidence": "stated",
     "note": "The game is set after the events of The Witcher 3: Wild Hunt (2015).",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=The_Witcher_IV&oldid=1388202905"
     ]
    },
    "rel": {
     "date": null,
     "end": null,
     "src": "The Witcher IV",
     "note": "Wikipedia: The game is scheduled to release in 2028 for PlayStation 5, Windows, and Xbox Series X/S."
    }
   }
  ]
 },
 {
  "id": "the-witcher-netflix",
  "title": "The Witcher",
  "type": "series",
  "wiki": "The Witcher (TV series)",
  "continuity": "witcher-netflix",
  "studio": "netflix",
  "platform": "netflix",
  "chars": [],
  "notes": "Netflix gives no in-universe years on Wikipedia. Season 1 is non-linear. Production companies not checked.",
  "links": [
   {
    "to": "the-last-wish",
    "kind": "adapts",
    "note": "season 1 (with Sword of Destiny)"
   },
   {
    "to": "sword-of-destiny",
    "kind": "adapts",
    "note": "season 1"
   },
   {
    "to": "blood-of-elves",
    "kind": "adapts",
    "note": "season 2"
   },
   {
    "to": "time-of-contempt",
    "kind": "adapts",
    "note": "season 3"
   },
   {
    "to": "baptism-of-fire",
    "kind": "adapts",
    "note": "season 4"
   }
  ],
  "units": [
   {
    "key": "s1",
    "label": "Season 1",
    "season": 1,
    "episodes": 8,
    "iu": {
     "label": "non-linear (Geralt, Yennefer, Ciri timelines converge)",
     "precision": "relative",
     "confidence": "stated",
     "note": "The story begins with Geralt of Rivia, Crown Princess Cirilla of Cintra, and the quarter-elf sorceress Yennefer of Vengerberg at different points in time, exploring formative events that shape their characters throughout the first season, before eventually merging into a single timeline.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=The_Witcher_%28TV_series%29&oldid=1387261765"
     ]
    },
    "rel": {
     "date": "2019-12-20",
     "end": "2019-12-20",
     "src": "The Witcher (TV series)",
     "note": "Wikipedia: The first season, consisting of eight episodes, was released on Netflix on December 20, 2019, starring Cavill in the lead role."
    }
   },
   {
    "key": "s2",
    "label": "Season 2",
    "season": 2,
    "episodes": 8,
    "iu": {
     "label": "after season 1",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "The Witcher (TV series)"
     ]
    },
    "rel": {
     "date": "2021-12-17",
     "end": "2021-12-17",
     "src": "The Witcher (TV series)",
     "note": "Wikipedia: The second season, also consisting of eight episodes and based on the novel Blood of Elves, was released on December 17, 2021."
    }
   },
   {
    "key": "s3",
    "label": "Season 3",
    "season": 3,
    "episodes": 8,
    "iu": {
     "label": "after season 2",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "The Witcher (TV series)"
     ]
    },
    "rel": {
     "date": "2023-06-29",
     "end": "2023-07-27",
     "src": "The Witcher (TV series)",
     "note": "Wikipedia: The third season, which also consists of eight episodes and is based on the novel Time of Contempt, was released in two volumes on June 29 and July 27, 2023."
    }
   },
   {
    "key": "s4",
    "label": "Season 4",
    "season": 4,
    "episodes": 8,
    "iu": {
     "label": "after season 3",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "The Witcher (TV series)"
     ]
    },
    "rel": {
     "date": "2025-10-30",
     "end": "2025-10-30",
     "src": "The Witcher (TV series)",
     "note": "Wikipedia: Hemsworth took over the role of Geralt of Rivia in the fourth season, based on the novel Baptism of Fire, which was released on October 30, 2025, also with eight episodes."
    }
   },
   {
    "key": "s5",
    "label": "Season 5",
    "season": 5,
    "iu": {
     "label": "after season 4",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "The Witcher (TV series)"
     ]
    },
    "rel": {
     "date": null,
     "end": null,
     "src": "The Witcher (TV series)",
     "note": "Wikipedia: In the midst of filming the fourth season, Netflix renewed the series for a fifth and final season in April 2024."
    }
   }
  ]
 },
 {
  "id": "nightmare-of-the-wolf",
  "title": "The Witcher: Nightmare of the Wolf",
  "type": "animated-film",
  "wiki": "The Witcher: Nightmare of the Wolf",
  "continuity": "witcher-netflix",
  "studio": "studio-mir",
  "platform": "netflix",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "the-witcher-netflix",
    "kind": "references",
    "note": "Vesemir origin prequel"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Film",
    "iu": {
     "y": 1165,
     "label": "1165 (flashbacks to Vesemir's youth)",
     "precision": "year",
     "confidence": "stated",
     "note": "In 1165, the witcher Vesemir saves a child from a leshen in the forests of Kaedwen.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=The_Witcher%3A_Nightmare_of_the_Wolf&oldid=1386264329"
     ]
    },
    "rel": {
     "date": "2021-08-23",
     "end": null,
     "src": "The Witcher: Nightmare of the Wolf",
     "note": "Wikipedia: An animated origin story film, Nightmare of the Wolf, was released on August 23, 2021."
    }
   }
  ]
 },
 {
  "id": "blood-origin",
  "title": "The Witcher: Blood Origin",
  "type": "series",
  "wiki": "The Witcher: Blood Origin",
  "continuity": "witcher-netflix",
  "studio": "netflix",
  "platform": "netflix",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "the-witcher-netflix",
    "kind": "references",
    "note": "prequel"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Miniseries",
    "episodes": 4,
    "iu": {
     "label": "1,200 years before the main series",
     "precision": "relative",
     "confidence": "stated",
     "note": "Set 1,200 years before the events of The Witcher television series, Blood Origin depicts the creation of the first Witcher, as well as the events leading to the \"Conjunction of the Spheres\".",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=The_Witcher%3A_Blood_Origin&oldid=1387261771"
     ]
    },
    "rel": {
     "date": "2022-12-25",
     "end": "2022-12-25",
     "src": "The Witcher: Blood Origin",
     "note": "Wikipedia: The series premiered on Netflix on December 25, 2022, and consists of four episodes."
    }
   }
  ]
 },
 {
  "id": "sirens-of-the-deep",
  "title": "The Witcher: Sirens of the Deep",
  "type": "animated-film",
  "wiki": "The Witcher: Sirens of the Deep",
  "continuity": "witcher-netflix",
  "studio": "studio-mir",
  "platform": "netflix",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "sword-of-destiny",
    "kind": "adapts",
    "note": "loosely adapts \"A Little Sacrifice\""
   },
   {
    "to": "the-witcher-netflix",
    "kind": "shares-characters",
    "note": ""
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Film",
    "iu": {
     "label": "during season 1 era (Geralt and Jaskier)",
     "precision": "relative",
     "confidence": "inferred",
     "note": "The film is a loose adaptation of the short story \"A Little Sacrifice\" by Andrzej Sapkowski.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=The_Witcher%3A_Sirens_of_the_Deep&oldid=1378435053"
     ]
    },
    "rel": {
     "date": "2025-02-11",
     "end": null,
     "src": "The Witcher: Sirens of the Deep",
     "note": "Wikipedia: The film was delayed and eventually released on February 11, 2025."
    }
   }
  ]
 },
 {
  "id": "the-rats",
  "title": "The Rats: A Witcher Tale",
  "type": "special",
  "wiki": "The Witcher (TV series)",
  "continuity": "witcher-netflix",
  "studio": "netflix",
  "platform": "netflix",
  "chars": [],
  "notes": "Feature-length special; no dedicated article fetched.",
  "links": [
   {
    "to": "the-witcher-netflix",
    "kind": "spinoff",
    "note": "released alongside season 4"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Special",
    "iu": {
     "label": "unknown",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "The Witcher (TV series)"
     ]
    },
    "rel": {
     "date": "2025-10-30",
     "end": null,
     "src": "The Witcher (TV series)",
     "note": "Wikipedia: A feature-length special, The Rats: A Witcher Tale, was released on October 30, 2025."
    }
   }
  ]
 }
];
