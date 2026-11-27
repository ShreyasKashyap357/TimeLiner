// Maddock Horror Comedy Universe seed, generated from research on 2026-11-27 (see DATA_NOTES).
import type { SeedTitle } from './seed-kit.ts';

export const SEED: SeedTitle[] = [
 {
  "id": "stree",
  "title": "Stree",
  "type": "film",
  "wiki": "Stree (2018 film)",
  "continuity": "mhcu-main",
  "studio": "jio-studios",
  "platform": "theatrical",
  "chars": [],
  "notes": "Full title \"Stree: Mard Ko Dard Hoga\". Originally produced with Raj & DK.",
  "units": [
   {
    "key": "",
    "rank": 1,
    "label": "Film",
    "iu": {
     "label": "first (epilogue a year later)",
     "precision": "relative",
     "confidence": "inferred",
     "note": "After Stree ceases haunting Chanderi, a headless demon named Sarkata emerges and abducts an unaccompanied woman. A few years later, the townsfolk of Chanderi worship Stree",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Stree_2&oldid=1387758089"
     ]
    },
    "rel": {
     "date": "2018-08-31",
     "end": null,
     "src": "Stree (2018 film)",
     "note": "Wikipedia: Stree was theatrically released worldwide on 31 August 2018 and received positive reviews from critics."
    }
   }
  ]
 },
 {
  "id": "bhediya",
  "title": "Bhediya",
  "type": "film",
  "wiki": "Bhediya",
  "continuity": "mhcu-main",
  "studio": "maddock-films",
  "platform": "theatrical",
  "chars": [],
  "notes": "Full title \"Bhediya: Jungle Mein Kaand\".",
  "links": [
   {
    "to": "stree",
    "kind": "crossover",
    "note": "Cameos by Rajkummar Rao, Shraddha Kapoor and Aparshakti Khurana; Abhishek Banerjee as Jana."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 2,
    "label": "Film",
    "iu": {
     "label": "after Stree; before Stree 2",
     "precision": "relative",
     "confidence": "inferred",
     "note": "In the post-credits scene, as Jana chains Bhaskar up to contain his transformations, his friends Vicky and Bittu pay him a visit and plead with him to return home, seeking his help with a new issue and asking for his assistance in finding Stree.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Bhediya&oldid=1388269001"
     ]
    },
    "rel": {
     "date": "2022-11-25",
     "end": null,
     "src": "Bhediya",
     "note": "Wikipedia: Bhediya was theatrically released on 25 November 2022, garnering positive reviews."
    }
   }
  ]
 },
 {
  "id": "munjya",
  "title": "Munjya",
  "type": "film",
  "wiki": "Munjya (film)",
  "continuity": "mhcu-main",
  "studio": "maddock-films",
  "platform": "theatrical",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "bhediya",
    "kind": "crossover",
    "note": "Post-credits cameo by Varun Dhawan (Bhaskar) and Abhishek Banerjee (Jana)."
   },
   {
    "to": "stree-2",
    "kind": "shares-characters",
    "note": "Post-credits scene is the same scene as in Stree 2's post-credits."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 3,
    "label": "Film",
    "iu": {
     "label": "present day (prologue 1952); post-credits after Stree 2",
     "precision": "relative",
     "confidence": "inferred",
     "note": "In 1952, in a village in Konkan, a boy named Gotya is obsessed with Munni … In present-day Pune, timid young Bittu works at his mother Pammi's beauty salon … In the post-credits scene, Bhaskar is seen stranded naked in the forest. Jana brings him clothes",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Munjya_%28film%29&oldid=1388036008"
     ]
    },
    "rel": {
     "date": "2024-06-07",
     "end": null,
     "src": "Munjya (film)",
     "note": "Wikipedia: Munjya was theatrically released worldwide on 7 June 2024, garnering mixed-to-positive reviews from critics."
    }
   }
  ]
 },
 {
  "id": "stree-2",
  "title": "Stree 2",
  "type": "film",
  "wiki": "Stree 2",
  "continuity": "mhcu-main",
  "studio": "maddock-films",
  "platform": "theatrical",
  "chars": [],
  "notes": "Full title \"Stree 2: Sarkate Ka Aatank\".",
  "links": [
   {
    "to": "stree",
    "kind": "continues",
    "note": "Direct sequel."
   },
   {
    "to": "bhediya",
    "kind": "crossover",
    "note": "Bhaskar (Varun Dhawan) joins the fight against Sarkata."
   },
   {
    "to": "thamma",
    "kind": "shares-characters",
    "note": "Post-credits scene teases the vampire in Delhi (Thamma)."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 4,
    "label": "Film",
    "iu": {
     "label": "a few years after Stree",
     "precision": "relative",
     "confidence": "inferred",
     "note": "After Stree ceases haunting Chanderi, a headless demon named Sarkata emerges and abducts an unaccompanied woman. A few years later, the townsfolk of Chanderi worship Stree",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Stree_2&oldid=1387758089"
     ]
    },
    "rel": {
     "date": "2024-08-15",
     "end": null,
     "src": "Stree 2",
     "note": "Wikipedia: Stree 2 was theatrically released worldwide on 15 August 2024, coinciding with Independence Day, and received positive reviews from critics."
    }
   }
  ]
 },
 {
  "id": "thamma",
  "title": "Thamma",
  "type": "film",
  "wiki": "Thamma",
  "continuity": "mhcu-main",
  "studio": "maddock-films",
  "platform": "theatrical",
  "chars": [],
  "notes": "",
  "links": [
   {
    "to": "stree-2",
    "kind": "continues",
    "note": "Picks up Bhaskar's injury from the Sarkata fight."
   },
   {
    "to": "bhediya",
    "kind": "crossover",
    "note": "Bhaskar fights Alok."
   },
   {
    "to": "munjya",
    "kind": "shares-characters",
    "note": "Elvis Karim Prabhakar (Sathyaraj) cameo."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 5,
    "label": "Film",
    "iu": {
     "label": "after Stree 2",
     "precision": "relative",
     "confidence": "inferred",
     "note": "Janardhan \"Jana\" is also with Prabhakar, seeking help for his werewolf cousin Bhaskar, who was severely injured during the fight with Sarkata, a headless monster. [note: As depicted in Stree 2]",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Thamma&oldid=1381082962"
     ]
    },
    "rel": {
     "date": "2025-10-21",
     "end": null,
     "src": "Thamma",
     "note": "Wikipedia: Thamma was theatrically released on 21 October 2025, coinciding with Diwali, in standard, IMAX, 4DX and D-Box formats."
    }
   }
  ]
 }
];
