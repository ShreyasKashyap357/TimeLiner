// Lokesh Cinematic Universe seed, generated from research on 2026-11-27 (see DATA_NOTES).
import type { SeedTitle } from './seed-kit.ts';

export const SEED: SeedTitle[] = [
 {
  "id": "kaithi",
  "title": "Kaithi",
  "type": "film",
  "wiki": "Kaithi (2019 film)",
  "continuity": "lcu-main",
  "studio": "dream-warrior-pictures",
  "platform": "theatrical",
  "chars": [],
  "notes": "Membership: \"Kaithi serves as the first instalment in the planned Lokesh Cinematic Universe (LCU). In June 2022, Lokesh stated that the film was interlinked with the Kamal Haasan-starrer Vikram (2022).\"",
  "units": [
   {
    "key": "",
    "rank": 1,
    "label": "Film",
    "iu": {
     "y": 2019,
     "label": "2019 (one night)",
     "precision": "year",
     "confidence": "inferred",
     "note": "In the cinematic universe, the events in Kaithi unfold in the year 2019, followed by the events in Vikram, which transpire three months after the events in Kaithi. Subsequently, the events in Leo occur three years later in 2022.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Lokesh_Cinematic_Universe&oldid=1388025826"
     ]
    },
    "rel": {
     "date": "2019-10-25",
     "end": null,
     "src": "Kaithi (2019 film)",
     "note": "Wikipedia: Kaithi was released on October 25, 2019, ahead of the Diwali festival."
    }
   }
  ]
 },
 {
  "id": "vikram-2022",
  "title": "Vikram",
  "type": "film",
  "wiki": "Vikram (2022 film)",
  "continuity": "lcu-main",
  "studio": "raaj-kamal-films-international",
  "platform": "theatrical",
  "chars": [],
  "notes": "Membership: \"it is the second instalment in Lokesh Cinematic Universe. A spiritual successor to the 1986 film of the same name\". Cross-continuity: a spiritual successor to Vikram (1986), which is not part of the LCU here.",
  "links": [
   {
    "to": "kaithi",
    "kind": "continues",
    "note": "Bejoy, Anbu, Adaikalam and Stephen Raj return; Dilli is voice-only; references the Trichy drug bust."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 2,
    "label": "Film",
    "iu": {
     "y": 2019,
     "label": "2019, about three months after Kaithi (flashback 1991)",
     "precision": "year",
     "confidence": "inferred",
     "note": "In the cinematic universe, the events in Kaithi unfold in the year 2019, followed by the events in Vikram, which transpire three months after the events in Kaithi. Subsequently, the events in Leo occur three years later in 2022.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Lokesh_Cinematic_Universe&oldid=1388025826"
     ]
    },
    "rel": {
     "date": "2022-06-03",
     "end": null,
     "src": "Vikram (2022 film)",
     "note": "Wikipedia: Vikram was released worldwide on 3 June 2022 to positive reviews from critics."
    }
   }
  ]
 },
 {
  "id": "leo-2023",
  "title": "Leo",
  "type": "film",
  "wiki": "Leo (2023 Indian film)",
  "continuity": "lcu-main",
  "studio": "seven-screen-studio",
  "platform": "theatrical",
  "chars": [],
  "notes": "Membership: \"Produced by Seven Screen Studio, it is the third instalment in the Lokesh Cinematic Universe.\"",
  "links": [
   {
    "to": "kaithi",
    "kind": "shares-characters",
    "note": "George Maryan returns as Napoleon."
   },
   {
    "to": "vikram-2022",
    "kind": "crossover",
    "note": "Kamal Haasan voice cameo as Agent Vikram, who calls Parthiban at the end."
   }
  ],
  "units": [
   {
    "key": "",
    "rank": 3,
    "label": "Film",
    "iu": {
     "y": 2022,
     "label": "2022 (flashback 1999)",
     "precision": "year",
     "confidence": "inferred",
     "note": "In the cinematic universe, the events in Kaithi unfold in the year 2019, followed by the events in Vikram, which transpire three months after the events in Kaithi. Subsequently, the events in Leo occur three years later in 2022.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Lokesh_Cinematic_Universe&oldid=1388025826"
     ]
    },
    "rel": {
     "date": "2023-10-19",
     "end": null,
     "src": "Leo (2023 Indian film)",
     "note": "Wikipedia: Leo was released worldwide on 19 October 2023 in standard and IMAX formats to mixed-to-positive reviews from critics"
    }
   }
  ]
 }
];
