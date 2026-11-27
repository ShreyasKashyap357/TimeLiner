// YRF Spy Universe seed, generated from research on 2026-11-27 (see DATA_NOTES).
import type { SeedTitle } from './seed-kit.ts';

export const SEED: SeedTitle[] = [
 {
  "id": "ek-tha-tiger",
  "title": "Ek Tha Tiger",
  "type": "film",
  "wiki": "Ek Tha Tiger",
  "continuity": "yrf-spy",
  "studio": "yash-raj-films",
  "platform": "theatrical",
  "chars": [],
  "notes": "First instalment; released as a standalone film before the shared universe was established.",
  "units": [
   {
    "key": "",
    "rank": 1,
    "label": "Film",
    "iu": {
     "y": 2012,
     "label": "c. 2012 (five years before Tiger Zinda Hai)",
     "precision": "year",
     "confidence": "inferred",
     "note": "In 2017, almost five years after the events of Ek Tha Tiger, an American journalist is killed by the ISC, a terrorist organisation, in Iraq",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Tiger_Zinda_Hai&oldid=1388164350"
     ]
    },
    "rel": {
     "date": "2012-08-15",
     "end": null,
     "src": "Ek Tha Tiger",
     "note": "Wikipedia: Ek Tha Tiger was released worldwide on 15 August 2012; the date coincided with Indian Independence Day."
    }
   }
  ]
 },
 {
  "id": "tiger-zinda-hai",
  "title": "Tiger Zinda Hai",
  "type": "film",
  "wiki": "Tiger Zinda Hai",
  "continuity": "yrf-spy",
  "studio": "yash-raj-films",
  "platform": "theatrical",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "ek-tha-tiger",
    "kind": "continues",
    "note": "Direct sequel; Tiger and Zoya now married and in hiding."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 2,
    "label": "Film",
    "iu": {
     "y": 2017,
     "y2": 2018,
     "label": "2017 (epilogue a year later)",
     "precision": "range",
     "confidence": "stated",
     "note": "In 2017, almost five years after the events of Ek Tha Tiger, an American journalist is killed by the ISC … A year later, on 15 August, Shenoy receives a call from Tiger, who is in Greece.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Tiger_Zinda_Hai&oldid=1388164350"
     ]
    },
    "rel": {
     "date": "2017-12-22",
     "end": null,
     "src": "Tiger Zinda Hai",
     "note": "Wikipedia: Tiger Zinda Hai was theatrically released worldwide on 22 December 2017, to positive reviews from critics."
    }
   }
  ]
 },
 {
  "id": "war-2019",
  "title": "War",
  "type": "film",
  "wiki": "War (2019 film)",
  "continuity": "yrf-spy",
  "studio": "yash-raj-films",
  "platform": "theatrical",
  "chars": [],
  "notes": "Released as a standalone film with no connection to the Tiger films; connected retroactively through Pathaan.",
  "units": [
   {
    "key": "",
    "rank": 3,
    "label": "Film",
    "iu": {
     "label": "after Tiger Zinda Hai",
     "precision": "relative",
     "confidence": "stated",
     "note": "It is the third installment in the YRF Spy Universe and set after the events of Ek Tha Tiger (2012) and Tiger Zinda Hai (2017)",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=War_%282019_film%29&oldid=1387570238"
     ]
    },
    "rel": {
     "date": "2019-10-02",
     "end": null,
     "src": "War (2019 film)",
     "note": "Wikipedia: War was theatrically released on 2 October 2019, with dubbed versions of Telugu and Tamil, coinciding with Gandhi Jayanti."
    }
   }
  ]
 },
 {
  "id": "pathaan",
  "title": "Pathaan",
  "type": "film",
  "wiki": "Pathaan (film)",
  "continuity": "yrf-spy",
  "studio": "yash-raj-films",
  "platform": "theatrical",
  "chars": [],
  "notes": "First film to establish crossovers between the strands.",
  "links": [
   {
    "to": "war-2019",
    "kind": "shares-characters",
    "note": "Colonel Luthra (Ashutosh Rana) returns from War; Jim is described as Kabir's former partner."
   },
   {
    "to": "tiger-zinda-hai",
    "kind": "crossover",
    "note": "Salman Khan cameo as Tiger, who rescues Pathaan from a train; mid-credits scene with Pathaan and Tiger."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 4,
    "label": "Film",
    "iu": {
     "y": 2022,
     "label": "2022 (prologue 2019; flashback 2020)",
     "precision": "year",
     "confidence": "stated",
     "note": "In 2019, the Indian Government revokes Article 370 … 2022: Pathaan, a RAW agent, captures arms dealer Raafe in Africa. … 2020: Following his recovery from a mission in Myanmar, Pathaan and Nandini establish the Joint Operations and Covert Research (J.O.C.R.) unit … 2022: Pathaan reunites with Nandini",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Pathaan_%28film%29&oldid=1387847405"
     ]
    },
    "rel": {
     "date": "2023-01-25",
     "end": null,
     "src": "Pathaan (film)",
     "note": "Wikipedia: It was theatrically released in India on 25 January 2023, coinciding with the Republic Day weekend."
    }
   }
  ]
 },
 {
  "id": "tiger-3",
  "title": "Tiger 3",
  "type": "film",
  "wiki": "Tiger 3",
  "continuity": "yrf-spy",
  "studio": "yash-raj-films",
  "platform": "theatrical",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "tiger-zinda-hai",
    "kind": "continues",
    "note": "Tiger sequel."
   },
   {
    "to": "pathaan",
    "kind": "crossover",
    "note": "Shah Rukh Khan cameo as Pathaan, who helps Tiger escape a Pakistani military prison."
   },
   {
    "to": "war-2019",
    "kind": "crossover",
    "note": "Post-credits scene: Luthra assigns Kabir (Hrithik Roshan) a mission, leading into War 2."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 5,
    "label": "Film",
    "iu": {
     "label": "after Pathaan (present day; flashbacks to 1999 and 2011)",
     "precision": "relative",
     "confidence": "stated",
     "note": "a circumquel to Ek Tha Tiger (2012) and Tiger Zinda Hai (2017), it is set after the events of War (2019) and Pathaan",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Tiger_3&oldid=1388026116"
     ]
    },
    "rel": {
     "date": "2023-11-12",
     "end": null,
     "src": "Tiger 3",
     "note": "Wikipedia: Tiger 3 was released on 12 November 2023 in standard, IMAX, 4DX and other premium formats, coinciding with Diwali."
    }
   }
  ]
 },
 {
  "id": "war-2",
  "title": "War 2",
  "type": "film",
  "wiki": "War 2 (film)",
  "continuity": "yrf-spy",
  "studio": "yash-raj-films",
  "platform": "theatrical",
  "chars": [],
  "notes": "Post-credits scene introduces the Alpha programme.",
  "links": [
   {
    "to": "war-2019",
    "kind": "continues",
    "note": "Sequel to War."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 6,
    "label": "Film",
    "iu": {
     "label": "after Tiger 3 (nearly six years after War; flashback 1999)",
     "precision": "relative",
     "confidence": "stated",
     "note": "it is the sixth installment in the YRF Spy Universe, circumquel to the 2019 film War and set after the events of Pathaan and Tiger 3 (both 2023). … Nearly six years after going rogue and eliminating Saurabh and Rizwan Ilyasi, Kabir works as a freelance mercenary",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=War_2_%28film%29&oldid=1387769306"
     ]
    },
    "rel": {
     "date": "2025-08-14",
     "end": null,
     "src": "War 2 (film)",
     "note": "Wikipedia: War 2 was released on 14 August 2025, coinciding with the Indian Independence Day weekend to mixed-to-negative reviews from critics"
    }
   }
  ]
 },
 {
  "id": "alpha-2026",
  "title": "Alpha",
  "type": "film",
  "wiki": "Alpha (2026 film)",
  "continuity": "yrf-spy",
  "studio": "yash-raj-films",
  "platform": "theatrical",
  "chars": [],
  "notes": "The YRF Spy Universe article cites a Bollywood Hungama headline 'Alpha locks July 10, 2026', but both articles' prose and the Alpha infobox say 3 July 2026. 3 July is used (review citations are dated 3 July 2026).",
  "links": [
   {
    "to": "war-2",
    "kind": "continues",
    "note": "Set after War 2; Vikrant Kaul is now R&AW chief; War 2 post-credits sets up the Alpha programme."
   },
   {
    "to": "war-2019",
    "kind": "shares-characters",
    "note": "Hrithik Roshan has an extended cameo as Kabir."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 7,
    "label": "Film",
    "iu": {
     "y": 2026,
     "label": "2026 (prologue 1999–2002)",
     "precision": "year",
     "confidence": "stated",
     "note": "Twenty-four years later, in 2026, Sita systematically assassinates the scientists and military officials associated with the Alpha program … led by Vikrant, who has succeeded his late friend Sunil Luthra as the agency's chief.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Alpha_%282026_film%29&oldid=1388113676"
     ]
    },
    "rel": {
     "date": "2026-07-03",
     "end": null,
     "src": "Alpha (2026 film)",
     "note": "Wikipedia: Alpha was released theatrically on 3 July 2026. … It was initially slated to release on 25 December 2025 … It was later postponed to 17 April 2026, due to post-production work on visual effects."
    }
   }
  ]
 }
];
