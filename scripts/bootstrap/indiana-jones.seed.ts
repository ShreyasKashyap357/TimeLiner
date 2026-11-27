// Indiana Jones seed, generated from research on 2026-11-27 (see DATA_NOTES).
import type { SeedTitle } from './seed-kit.ts';

export const SEED: SeedTitle[] = [
 {
  "id": "young-indiana-jones-chronicles",
  "title": "The Young Indiana Jones Chronicles",
  "type": "series",
  "wiki": "The Young Indiana Jones Chronicles",
  "continuity": "indiana-jones-main",
  "studio": "lucasfilm",
  "platform": "abc",
  "chars": [],
  "notes": "Season-level units; release dates from the episode list's series overview (seasons 1–2 on ABC, TV films on The Family Channel). Episode-title years overlap across seasons, so seasons are ordered by broadcast, not strictly by in-universe year. Harrison Ford appears in one episode as an older Jones narrating 1920 Chicago from 1950 Wyoming (framing only).",
  "links": [
   {
    "to": "indiana-jones-temple-of-doom",
    "kind": "references",
    "note": "Jones in his youth (1908–1920), before the films"
   }
  ],
  "units": [
   {
    "key": "s1",
    "rank": 1,
    "label": "Season 1",
    "season": 1,
    "episodes": 6,
    "iu": {
     "y": 1908,
     "y2": 1917,
     "label": "1908–1917",
     "precision": "range",
     "confidence": "stated",
     "note": "This feature-length episode consisted of \"Egypt 1908\" and \"Mexico, March 1916\". … Congo, January 1917",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=List_of_The_Young_Indiana_Jones_Chronicles_episodes&oldid=1325448520"
     ]
    },
    "rel": {
     "date": "1992-03-04",
     "end": "1992-04-08",
     "src": "The Young Indiana Jones Chronicles",
     "note": "Wikipedia: | start1 = {{Start date|1992|3|4}} | end1 = {{End date|1992|4|8}} | network1 = ABC"
    }
   },
   {
    "key": "s2",
    "rank": 2,
    "label": "Season 2",
    "season": 2,
    "episodes": 22,
    "iu": {
     "y": 1908,
     "y2": 1920,
     "label": "1908–1920",
     "precision": "range",
     "confidence": "stated",
     "note": "Vienna, November 1908 … Paris, September 1908 … This feature-length episode consisted of \"New York, June 1920\" and \"New York, July 1920.\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=List_of_The_Young_Indiana_Jones_Chronicles_episodes&oldid=1325448520"
     ]
    },
    "rel": {
     "date": "1992-09-21",
     "end": "1993-07-24",
     "src": "The Young Indiana Jones Chronicles",
     "note": "Wikipedia: | start2 = {{Start date|1992|9|21}} | end2 = {{End date|1993|7|24}}"
    }
   },
   {
    "key": "tv-films",
    "rank": 3,
    "label": "TV films (1994–96)",
    "episodes": 4,
    "iu": {
     "y": 1910,
     "y2": 1920,
     "label": "1910–1920",
     "precision": "range",
     "confidence": "stated",
     "note": "This television movie consisted of \"Russia 1910\" and \"Athens 1910\". … This television movie consisted of \"Hollywood, August 1920 (1)\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=List_of_The_Young_Indiana_Jones_Chronicles_episodes&oldid=1325448520"
     ]
    },
    "rel": {
     "date": "1994-10-15",
     "end": "1996-06-16",
     "src": "The Young Indiana Jones Chronicles",
     "note": "Wikipedia: | start2S = {{Start date|1994|10|15}} | end2S = {{End date|1996|6|16}} | network2S = The Family Channel"
    }
   }
  ]
 },
 {
  "id": "indiana-jones-temple-of-doom",
  "title": "Indiana Jones and the Temple of Doom",
  "type": "film",
  "wiki": "Indiana Jones and the Temple of Doom",
  "continuity": "indiana-jones-main",
  "studio": "lucasfilm",
  "platform": "theatrical",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "indiana-jones-raiders",
    "kind": "references",
    "note": "prequel: set a year before Raiders"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 4,
    "label": "Film",
    "iu": {
     "y": 1935,
     "label": "1935",
     "precision": "year",
     "confidence": "stated",
     "note": "In the film, set in 1935, Indiana Jones finds himself stranded in British India",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Indiana_Jones_and_the_Temple_of_Doom&oldid=1387220177"
     ]
    },
    "rel": {
     "date": "1984-05-23",
     "end": null,
     "src": "Indiana Jones and the Temple of Doom",
     "note": "Wikipedia: Indiana Jones and the Temple of Doom was released by Paramount Pictures on May 23, 1984"
    }
   }
  ]
 },
 {
  "id": "indiana-jones-raiders",
  "title": "Raiders of the Lost Ark",
  "type": "film",
  "wiki": "Raiders of the Lost Ark",
  "continuity": "indiana-jones-main",
  "studio": "lucasfilm",
  "platform": "theatrical",
  "chars": [],
  "notes": "",
  "units": [
   {
    "key": "",
    "rank": 5,
    "label": "Film",
    "iu": {
     "y": 1936,
     "label": "1936",
     "precision": "year",
     "confidence": "stated",
     "note": "Set in 1936, the film stars Harrison Ford as Indiana Jones",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Raiders_of_the_Lost_Ark&oldid=1385032772"
     ]
    },
    "rel": {
     "date": "1981-06-12",
     "end": null,
     "src": "Raiders of the Lost Ark",
     "note": "Wikipedia: In the United States (U.S.) and Canada, Raiders of the Lost Ark was released on June 12, 1981, in 1,078 theaters."
    }
   }
  ]
 },
 {
  "id": "indiana-jones-great-circle",
  "title": "Indiana Jones and the Great Circle",
  "type": "video-game",
  "wiki": "Indiana Jones and the Great Circle",
  "continuity": "indiana-jones-main",
  "studio": "machinegames",
  "platform": "windows",
  "chars": [],
  "notes": "PS5 April 17, 2025; Nintendo Switch 2 May 12, 2026 (infobox).",
  "links": [
   {
    "to": "indiana-jones-raiders",
    "kind": "continues",
    "note": "set between Raiders and Last Crusade"
   },
   {
    "to": "indiana-jones-last-crusade",
    "kind": "references",
    "note": "interquel before Last Crusade"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 6,
    "label": "Game",
    "iu": {
     "y": 1937,
     "label": "1937",
     "precision": "year",
     "confidence": "stated",
     "note": "The story follows archaeologist Indiana Jones in 1937 as he attempts to thwart various groups",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Indiana_Jones_and_the_Great_Circle&oldid=1386038224"
     ]
    },
    "rel": {
     "date": "2024-12-09",
     "end": null,
     "src": "Indiana Jones and the Great Circle",
     "note": "Wikipedia: Indiana Jones and the Great Circle was released on December 9, 2024, for Windows and Xbox Series X/S as a timed console exclusive."
    }
   }
  ]
 },
 {
  "id": "indiana-jones-last-crusade",
  "title": "Indiana Jones and the Last Crusade",
  "type": "film",
  "wiki": "Indiana Jones and the Last Crusade",
  "continuity": "indiana-jones-main",
  "studio": "lucasfilm",
  "platform": "theatrical",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "indiana-jones-raiders",
    "kind": "continues",
    "note": "narrative sequel to Raiders"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 7,
    "label": "Film",
    "iu": {
     "y": 1938,
     "label": "1938 (prologue 1912)",
     "precision": "year",
     "confidence": "stated",
     "note": "In the film, set in 1938, Indiana Jones searches for his father",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Indiana_Jones_and_the_Last_Crusade&oldid=1387402580"
     ]
    },
    "rel": {
     "date": "1989-05-24",
     "end": null,
     "src": "Indiana Jones and the Last Crusade",
     "note": "Wikipedia: Indiana Jones and the Last Crusade was released in the United States on May 24, 1989, by Paramount Pictures."
    }
   }
  ]
 },
 {
  "id": "indiana-jones-crystal-skull",
  "title": "Indiana Jones and the Kingdom of the Crystal Skull",
  "type": "film",
  "wiki": "Indiana Jones and the Kingdom of the Crystal Skull",
  "continuity": "indiana-jones-main",
  "studio": "lucasfilm",
  "platform": "theatrical",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "indiana-jones-last-crusade",
    "kind": "continues",
    "note": "sequel to Last Crusade"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 8,
    "label": "Film",
    "iu": {
     "y": 1957,
     "label": "1957",
     "precision": "year",
     "confidence": "stated",
     "note": "Set in 1957, it pits Indiana Jones (Harrison Ford) against Soviet KGB agents",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Indiana_Jones_and_the_Kingdom_of_the_Crystal_Skull&oldid=1387831587"
     ]
    },
    "rel": {
     "date": "2008-05-22",
     "end": null,
     "src": "Indiana Jones and the Kingdom of the Crystal Skull",
     "note": "Wikipedia: Indiana Jones and the Kingdom of the Crystal Skull had its premiere at the 61st Cannes Film Festival on May 18, 2008, and was released in the United States on May 22, by Paramount Pictures."
    }
   }
  ]
 },
 {
  "id": "indiana-jones-dial-of-destiny",
  "title": "Indiana Jones and the Dial of Destiny",
  "type": "film",
  "wiki": "Indiana Jones and the Dial of Destiny",
  "continuity": "indiana-jones-main",
  "studio": "lucasfilm",
  "platform": "theatrical",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "indiana-jones-crystal-skull",
    "kind": "continues",
    "note": "twelve years after Crystal Skull"
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 9,
    "label": "Film",
    "iu": {
     "y": 1969,
     "label": "1969 (prologue 1944)",
     "precision": "year",
     "confidence": "stated",
     "note": "Set in 1969, the film follows Jones and his estranged goddaughter, Helena … the opening sequence, set in 1944, is meant to contrast with the main plot, which takes place in 1969",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Indiana_Jones_and_the_Dial_of_Destiny&oldid=1387655208"
     ]
    },
    "rel": {
     "date": "2023-06-30",
     "end": null,
     "src": "Indiana Jones and the Dial of Destiny",
     "note": "Wikipedia: It was theatrically released in the United States on June 30, 2023, by Walt Disney Studios Motion Pictures"
    }
   }
  ]
 }
];
