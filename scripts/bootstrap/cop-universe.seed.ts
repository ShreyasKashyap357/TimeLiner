// Cop Universe seed, generated from research on 2026-11-27 (see DATA_NOTES).
import type { SeedTitle } from './seed-kit.ts';

export const SEED: SeedTitle[] = [
 {
  "id": "singham",
  "title": "Singham",
  "type": "film",
  "wiki": "Singham",
  "continuity": "cop-main",
  "studio": "reliance-entertainment",
  "platform": "theatrical",
  "chars": [],
  "notes": "Hindi remake of the Tamil film Singam (2010).",
  "units": [
   {
    "key": "",
    "rank": 1,
    "label": "Film",
    "iu": {
     "label": "first (Bajirao Singham as Inspector in Shivgad/Goa)",
     "precision": "relative",
     "confidence": "inferred",
     "note": "The first two films, Singham (2011) and Singham Returns (2014) focus on Bajirao Singham, a law-abiding DCP from Shivgarh who fights for justice.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Rohit_Shetty%27s_Cop_Universe&oldid=1388183561"
     ]
    },
    "rel": {
     "date": "2011-07-22",
     "end": null,
     "src": "Singham",
     "note": "Wikipedia: It was theatrically released in India on 22 July 2011 with generally positive reviews from the critics"
    }
   }
  ]
 },
 {
  "id": "singham-returns",
  "title": "Singham Returns",
  "type": "film",
  "wiki": "Singham Returns",
  "continuity": "cop-main",
  "studio": "reliance-entertainment",
  "platform": "theatrical",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "singham",
    "kind": "continues",
    "note": "Sequel."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 2,
    "label": "Film",
    "iu": {
     "label": "after Singham",
     "precision": "relative",
     "confidence": "inferred",
     "note": "Bajirao Singham, who is now a DCP, gets transferred to Mumbai",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Singham_Returns&oldid=1388001268"
     ]
    },
    "rel": {
     "date": "2014-08-15",
     "end": null,
     "src": "Singham Returns",
     "note": "Wikipedia: The film was released theatrically worldwide on 15 August 2014, during India's Independence Day."
    }
   }
  ]
 },
 {
  "id": "simmba",
  "title": "Simmba",
  "type": "film",
  "wiki": "Simmba",
  "continuity": "cop-main",
  "studio": "reliance-entertainment",
  "platform": "theatrical",
  "chars": [],
  "notes": "Release date uses India (28 Dec 2018). The GCC release was on 27 Dec 2018. It is a remake of the Telugu film Temper (2015).",
  "links": [
   {
    "to": "singham-returns",
    "kind": "crossover",
    "note": "Ajay Devgn cameo as DCP Bajirao Singham."
   },
   {
    "to": "sooryavanshi",
    "kind": "crossover",
    "note": "Akshay Kumar cameo as Veer Sooryavanshi (post-credits)."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 3,
    "label": "Film",
    "iu": {
     "label": "after Singham Returns; before Sooryavanshi",
     "precision": "relative",
     "confidence": "inferred",
     "note": "Suddenly, DCP Bajirao Singham arrives to rescue him … in a post-credits scene, he chats with DCP Veer Sooryavanshi on the phone. and also congratulates him on his new post as the ATS chief.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Simmba&oldid=1388001255"
     ]
    },
    "rel": {
     "date": "2018-12-28",
     "end": null,
     "src": "Simmba",
     "note": "Wikipedia: Simmba was released in countries of the Gulf Cooperation Council on 27 December 2018. The film was released in India and other international territories on the following day"
    }
   }
  ]
 },
 {
  "id": "sooryavanshi",
  "title": "Sooryavanshi",
  "type": "film",
  "wiki": "Sooryavanshi",
  "continuity": "cop-main",
  "studio": "rohit-shetty-picturez",
  "platform": "theatrical",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "simmba",
    "kind": "crossover",
    "note": "Ranveer Singh as Simmba."
   },
   {
    "to": "singham",
    "kind": "crossover",
    "note": "Ajay Devgn as Singham joins the climax."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 4,
    "label": "Film",
    "iu": {
     "label": "after Simmba (backstory from 1993)",
     "precision": "relative",
     "confidence": "inferred",
     "note": "Simmba tells Surya that 7 bombs are to be planted at 7 locations in Mumbai. … Surya's friend DCP Bajirao Singham arrives and they defuse the bomb",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Sooryavanshi&oldid=1388001286"
     ]
    },
    "rel": {
     "date": "2021-11-05",
     "end": null,
     "src": "Sooryavanshi",
     "note": "Wikipedia: After several delays, it finally released theatrically on 5 November 2021 coinciding with Diwali."
    }
   }
  ]
 },
 {
  "id": "indian-police-force",
  "title": "Indian Police Force",
  "type": "series",
  "wiki": "Indian Police Force (TV series)",
  "continuity": "cop-main",
  "studio": "rohit-shetty-picturez",
  "platform": "prime-video",
  "chars": [],
  "notes": "All 7 episodes have OriginalAirDate 19 January 2024 in the episode table. num_seasons = 1.",
  "units": [
   {
    "key": "",
    "rank": 5,
    "label": "Season 1",
    "episodes": 7,
    "iu": {
     "label": "unplaced (no source links it to the films)",
     "precision": "relative",
     "confidence": "inferred",
     "note": "Set in the Cop Universe, it is produced by Shetty under the banner of Rohit Shetty Picturez and Reliance Entertainment.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Indian_Police_Force_%28TV_series%29&oldid=1387996311"
     ]
    },
    "rel": {
     "date": "2024-01-19",
     "end": "2024-01-19",
     "src": "Indian Police Force (TV series)",
     "note": "Wikipedia: The series premiered on Amazon Prime Video on January 19, 2024 and has seven episodes."
    }
   }
  ]
 },
 {
  "id": "singham-again",
  "title": "Singham Again",
  "type": "film",
  "wiki": "Singham Again",
  "continuity": "cop-main",
  "studio": "rohit-shetty-picturez",
  "platform": "theatrical",
  "chars": [],
  "notes": "Membership: \"A sequel to Singham (2011) and Singham Returns (2014), it is the fifth installment of Shetty's Cop Universe franchise.\" Post-credits cameo: Salman Khan as Chulbul Pandey (Dabangg). That is a cross-franchise cameo, so no link is recorded.",
  "links": [
   {
    "to": "singham-returns",
    "kind": "continues",
    "note": "Sequel to Singham and Singham Returns (Avni returns)."
   },
   {
    "to": "sooryavanshi",
    "kind": "crossover",
    "note": "Sooryavanshi and Omar Hafeez return."
   },
   {
    "to": "simmba",
    "kind": "crossover",
    "note": "Simmba (Ranveer Singh) appears."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 6,
    "label": "Film",
    "iu": {
     "label": "after Sooryavanshi (main story two years after the opening)",
     "precision": "relative",
     "confidence": "inferred",
     "note": "he is attacked by the Chief of Lashkar, Omar Hafeez, who had fled from Pakistan to Sri Lanka and started selling drugs after his late sons, Riyaaz and Raza's plans were thwarted. [note: As shown in Sooryavanshi (2021)] … Two years later, Avni is hosting a theatre production of Ramlila",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Singham_Again&oldid=1388070037"
     ]
    },
    "rel": {
     "date": "2024-11-01",
     "end": null,
     "src": "Singham Again",
     "note": "Wikipedia: Singham Again was released on 1 November 2024, coinciding with Diwali, in standard and IMAX formats."
    }
   }
  ]
 }
];
