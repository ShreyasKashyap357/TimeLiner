// Twin Peaks seed, generated from research on 2026-11-27 (see DATA_NOTES).
import type { SeedTitle } from './seed-kit.ts';

export const SEED: SeedTitle[] = [
 {
  "id": "twin-peaks-series",
  "title": "Twin Peaks",
  "type": "series",
  "wiki": "Twin Peaks",
  "continuity": "twin-peaks-main",
  "studio": "studio-not-stated",
  "platform": "abc",
  "chars": [],
  "notes": "Season 3 is \"Twin Peaks: The Return\" (Showtime). The list article also says the pilot \"was first released in September 1989\", which looks like an error (it premiered on ABC April 8, 1990) and is not used. Studio not checked.",
  "links": [
   {
    "to": "twin-peaks-fwwm",
    "kind": "continues",
    "note": "season 3 continues the series and the film"
   }
  ],
  "units": [
   {
    "key": "s1",
    "label": "Season 1",
    "season": 1,
    "episodes": 8,
    "iu": {
     "y": 1989,
     "label": "February 1989",
     "precision": "year",
     "confidence": "stated",
     "note": "In February 1989 in Twin Peaks, Washington, the corpse of homecoming queen Laura Palmer is discovered.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=List_of_Twin_Peaks_episodes&oldid=1387781169"
     ]
    },
    "rel": {
     "date": "1990-04-08",
     "end": "1990-05-23",
     "src": "Twin Peaks",
     "note": "Wikipedia: The first season originally aired on ABC in the United States between April 8 and May 23, 1990, consisting of eight episodes."
    }
   },
   {
    "key": "s2",
    "label": "Season 2",
    "season": 2,
    "episodes": 22,
    "iu": {
     "y": 1989,
     "label": "1989",
     "precision": "year",
     "confidence": "inferred",
     "note": "In Twin Peaks, a new clue leads members of the sheriff's office to reopen their inquiry into the 1989 murder of Laura Palmer … Laura tells Cooper that she will see him in 25 years",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Twin_Peaks_season_3&oldid=1385305923"
     ]
    },
    "rel": {
     "date": "1990-09-30",
     "end": "1991-06-10",
     "src": "Twin Peaks",
     "note": "Wikipedia: episodes2 = 22 | start2 = {{Start date|1990|9|30}} | end2 = {{End date|1991|6|10}}"
    }
   },
   {
    "key": "s3",
    "label": "Season 3",
    "season": 3,
    "episodes": 18,
    "iu": {
     "y": 2016,
     "label": "25 years later (2014 or 2016)",
     "precision": "year",
     "confidence": "disputed",
     "note": "Set 25 years after the events of the original Twin Peaks … [Fandom \"2016\" page] Events … All of them are prior to September 29 (events of Parts 1–18)",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Twin_Peaks_season_3&oldid=1385305923 | https://twinpeaks.fandom.com/wiki/2016?oldid=50836"
     ]
    },
    "rel": {
     "date": "2017-05-21",
     "end": "2017-09-03",
     "src": "Twin Peaks",
     "note": "Wikipedia: The show's third season, consisting of 18 episodes, was announced in October 2014 and premiered on Showtime on May 21, 2017. … end3 = {{End date|2017|9|3}}"
    }
   }
  ]
 },
 {
  "id": "twin-peaks-fwwm",
  "title": "Twin Peaks: Fire Walk with Me",
  "type": "film",
  "wiki": "Twin Peaks: Fire Walk with Me",
  "continuity": "twin-peaks-main",
  "studio": "ciby-pictures",
  "platform": "theatrical",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "twin-peaks-series",
    "kind": "continues",
    "note": "prequel to seasons 1–2"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Film",
    "iu": {
     "y": 1988,
     "y2": 1989,
     "label": "Teresa Banks murder, then one year later to February 1989",
     "precision": "range",
     "confidence": "inferred",
     "note": "It begins with the FBI's investigation into the murder of Teresa Banks (Pamela Gidley) before shifting to the last seven days of the life of Laura Palmer … One year later, Laura Palmer juggles her double life.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Twin_Peaks%3A_Fire_Walk_with_Me&oldid=1382545171"
     ]
    },
    "rel": {
     "date": "1992-05-16",
     "end": null,
     "src": "Twin Peaks: Fire Walk with Me",
     "note": "Wikipedia: released = {{Film date|1992|5|16|Cannes|1992|7|3|France|1992|8|28|United States}}"
    }
   }
  ]
 },
 {
  "id": "twin-peaks-missing-pieces",
  "title": "Twin Peaks: The Missing Pieces",
  "type": "film",
  "wiki": "Twin Peaks: The Missing Pieces",
  "continuity": "twin-peaks-main",
  "studio": "studio-not-stated",
  "platform": "home-media",
  "chars": [],
  "notes": "Produced for the Twin Peaks: The Entire Mystery Blu-ray box set (box set released July 29, 2014 per the episodes list).",
  "links": [
   {
    "to": "twin-peaks-fwwm",
    "kind": "spinoff",
    "note": "deleted/extended scenes from the film"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Film",
    "iu": {
     "y": 1988,
     "y2": 1989,
     "label": "alongside Fire Walk with Me (1988–1989)",
     "precision": "range",
     "confidence": "inferred",
     "note": "Twin Peaks: The Missing Pieces is a 2014 compilation of deleted and extended scenes from Twin Peaks: Fire Walk with Me … The deleted scenes principally concerned the FBI's investigation into the murder of Teresa Banks",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Twin_Peaks%3A_The_Missing_Pieces&oldid=1365688538"
     ]
    },
    "rel": {
     "date": "2014-07-16",
     "end": null,
     "src": "Twin Peaks: The Missing Pieces",
     "note": "Wikipedia: released = {{Film date|2014|07|16|Vista Theatre}} … To commemorate the box set, Paramount organized a special screening of The Missing Pieces at the Vista Theatre in Los Angeles on July 16, 2014."
    }
   }
  ]
 },
 {
  "id": "secret-diary-laura-palmer",
  "title": "The Secret Diary of Laura Palmer",
  "type": "novel",
  "wiki": "The Secret Diary of Laura Palmer",
  "continuity": "twin-peaks-main",
  "studio": "pocket-books",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "twin-peaks-series",
    "kind": "spinoff",
    "note": "official tie-in"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novel",
    "iu": {
     "y": 1984,
     "y2": 1989,
     "label": "1984–1989",
     "precision": "range",
     "confidence": "stated",
     "note": "The book begins on Laura's 12th birthday in 1984 … which ends with an undated entry in late 1989",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=The_Secret_Diary_of_Laura_Palmer&oldid=1384351116"
     ]
    },
    "rel": {
     "date": "1990-09-15",
     "end": null,
     "src": "The Secret Diary of Laura Palmer",
     "note": "Wikipedia: publication_date = 15 September 1990 … It was published between the airing of the first and second season."
    }
   }
  ]
 },
 {
  "id": "diane-twin-peaks-tapes",
  "title": "\"Diane...\" The Twin Peaks Tapes of Agent Cooper",
  "type": "audio-drama",
  "wiki": "Twin Peaks books",
  "continuity": "twin-peaks-main",
  "studio": "simon-schuster-audio",
  "platform": "audio-download",
  "chars": [],
  "notes": "No standalone article; sourced from Twin Peaks books.",
  "links": [
   {
    "to": "twin-peaks-series",
    "kind": "spinoff",
    "note": "audio-only tie-in; Kyle MacLachlan Grammy-nominated"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Audiobook",
    "iu": {
     "y": 1989,
     "label": "Cooper's trip to Twin Peaks to his recovery from being shot",
     "precision": "year",
     "confidence": "inferred",
     "note": "The tape begins with a prologue monologue in which Cooper discusses his impending trip to Twin Peaks, continues with the initial monologue heard in the pilot, and continues to a point after his recovery from being shot.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Twin_Peaks_books&oldid=1370208804"
     ]
    },
    "rel": {
     "date": "1990-10-01",
     "end": null,
     "src": "Twin Peaks books",
     "note": "Wikipedia: \"Diane...\" The Twin Peaks Tapes of Agent Cooper | Scott Frost | October 1, 1990"
    }
   }
  ]
 },
 {
  "id": "autobiography-dale-cooper",
  "title": "The Autobiography of F.B.I. Special Agent Dale Cooper: My Life, My Tapes",
  "type": "novel",
  "wiki": "Twin Peaks books",
  "continuity": "twin-peaks-main",
  "studio": "pocket-books",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "No standalone article; sourced from Twin Peaks books. Publisher Pocket Books per the books article lead (\"Pocket Books released three official tie-in books\").",
  "links": [
   {
    "to": "twin-peaks-series",
    "kind": "spinoff",
    "note": "official tie-in"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novel",
    "iu": {
     "label": "Cooper's childhood up to his assignment to the Laura Palmer case",
     "precision": "relative",
     "confidence": "inferred",
     "note": "The book begins with Cooper's childhood … The book ultimately concludes with the day he is assigned to Laura Palmer's murder.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Twin_Peaks_books&oldid=1370208804"
     ]
    },
    "rel": {
     "date": "1991-05-01",
     "end": null,
     "src": "Twin Peaks books",
     "note": "Wikipedia: The Autobiography of F.B.I. Special Agent Dale Cooper: My Life, My Tapes | Scott Frost | May 1, 1991"
    }
   }
  ]
 },
 {
  "id": "welcome-to-twin-peaks",
  "title": "Welcome to Twin Peaks: An Access Guide to the Town",
  "type": "reference",
  "wiki": "Twin Peaks books",
  "continuity": "twin-peaks-main",
  "studio": "pocket-books",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "No standalone article; sourced from Twin Peaks books.",
  "links": [
   {
    "to": "twin-peaks-series",
    "kind": "spinoff",
    "note": "in-universe guidebook"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Guide",
    "iu": {
     "label": "in-universe town guide, contemporary with the series",
     "precision": "relative",
     "confidence": "inferred",
     "note": "The book is a parody of a traveler's guide book, as published by the \"Twin Peaks Chamber of Commerce\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Twin_Peaks_books&oldid=1370208804"
     ]
    },
    "rel": {
     "date": "1991-06-01",
     "end": null,
     "src": "Twin Peaks books",
     "note": "Wikipedia: Welcome to Twin Peaks: An Access Guide to the Town | David Lynch, Mark Frost, Richard Saul Wurman | June 1, 1991"
    }
   }
  ]
 },
 {
  "id": "secret-history-of-twin-peaks",
  "title": "The Secret History of Twin Peaks",
  "type": "novel",
  "wiki": "The Secret History of Twin Peaks",
  "continuity": "twin-peaks-main",
  "studio": "flatiron-books",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "twin-peaks-series",
    "kind": "spinoff",
    "note": "dossier novel published ahead of the 2017 revival"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novel",
    "iu": {
     "label": "Lewis and Clark era (early 1800s) to the season 2 finale (1989)",
     "precision": "relative",
     "confidence": "disputed",
     "note": "The documents are presented in a roughly chronological order, beginning with the exploration of the area by the Lewis and Clark Expedition, correspondence with President Thomas Jefferson, and Meriwether Lewis's mysterious death in 1809.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=The_Secret_History_of_Twin_Peaks&oldid=1384432060"
     ]
    },
    "rel": {
     "date": "2016-10-18",
     "end": null,
     "src": "The Secret History of Twin Peaks",
     "note": "Wikipedia: publisher = Flatiron Books | publication_date = {{start date|2016|10|18}}"
    }
   }
  ]
 },
 {
  "id": "twin-peaks-final-dossier",
  "title": "Twin Peaks: The Final Dossier",
  "type": "novel",
  "wiki": "Twin Peaks: The Final Dossier",
  "continuity": "twin-peaks-main",
  "studio": "flatiron-books",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "secret-history-of-twin-peaks",
    "kind": "sequel",
    "note": ""
   },
   {
    "to": "twin-peaks-series",
    "kind": "continues",
    "note": "follows the 2017 revival"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novel",
    "iu": {
     "label": "the 25 years between seasons 2 and 3, and after season 3",
     "precision": "relative",
     "confidence": "disputed",
     "note": "The novel fills in details of the 25 years between the second and third seasons, and expands on some of the mysteries raised in the new episodes. … clarifying some apparent discrepancies between them.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Twin_Peaks_books&oldid=1370208804 | https://en.wikipedia.org/w/index.php?title=Twin_Peaks%3A_The_Final_Dossier&oldid=1384439755"
     ]
    },
    "rel": {
     "date": "2017-10-31",
     "end": null,
     "src": "Twin Peaks: The Final Dossier",
     "note": "Wikipedia: The book was initially released by Flatiron Books on {{start date|2017|10|31}}."
    }
   }
  ]
 }
];
