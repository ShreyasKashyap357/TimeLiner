// Middle-earth seed, generated from research on 2026-11-27 (Wikipedia; LOTR Fandom for inferred years).
// Years use the running Age count (F.A. 1 = 1, S.A. 1 = 591, T.A. 1 = 4032, Fo.A. 1 = 7053).
// Not included yet: the BBC radio dramas (1955, 1968, 1981), pending a radio medium.
import type { SeedTitle } from './seed-kit.ts';

export const SEED: SeedTitle[] = [
 {
  "id": "the-hobbit",
  "title": "The Hobbit",
  "type": "novel",
  "wiki": "The Hobbit",
  "continuity": "me-legendarium",
  "studio": "george-allen-unwin",
  "platform": "print-hardcover",
  "chars": [
   "bilbo",
   "gandalf"
  ],
  "notes": "US: Houghton Mifflin, no exact date in the article: \"Houghton Mifflin of Boston and New York reset type for an American edition, to be released early in 1938\". Pages are the first edition.",
  "links": [],
  "units": [
   {
    "key": "",
    "label": "Novel",
    "pages": 310,
    "iu": {
     "y": 6972,
     "label": "T.A. 2941",
     "precision": "year",
     "confidence": "stated",
     "note": "History of Arda: \"The main events of ''The Hobbit'' occur in {{ME-date|TA|2941}}.\" (cites Tolkien, Appendix B \"The Third Age\")",
     "src": [
      "https://en.wikipedia.org/wiki/History_of_Arda"
     ]
    },
    "rel": {
     "date": "1937-09-21",
     "end": null,
     "src": "The Hobbit",
     "note": "Wikipedia: Infobox: \"|publisher = [[George Allen & Unwin]] (UK) |publication_date = 21 September 1937 |pages = 310 (first edition)\""
    }
   }
  ]
 },
 {
  "id": "the-fellowship-of-the-ring",
  "title": "The Fellowship of the Ring",
  "type": "novel",
  "wiki": "The Fellowship of the Ring",
  "continuity": "me-legendarium",
  "studio": "george-allen-unwin",
  "platform": "print-hardcover",
  "chars": [
   "frodo",
   "gandalf",
   "aragorn",
   "gollum"
  ],
  "notes": "US first publication (Houghton Mifflin): 1954-10-21. LOTR article: \"In the United States, Houghton Mifflin published The Fellowship of the Ring on 21 October 1954, The Two Towers on 21 April 1955, and The Return of the King on 5 January 1956.\" Book I opens with the party (3001); 17-year gap to 3018.",
  "links": [],
  "units": [
   {
    "key": "",
    "label": "Volume",
    "pages": 423,
    "iu": {
     "y": 7032,
     "y2": 7050,
     "label": "T.A. 3001–3019",
     "precision": "range",
     "confidence": "inferred",
     "note": "LOTR Fandom \"TA 3001\": \"September 22: Bilbo's Farewell Birthday Party is held.\" LOTR Fandom \"Breaking of the Fellowship\": \"Dated at February 26, 3019, it occurred at the end of The Fellowship of the Ring and at the very beginning of The Two Towers\". Main journey starts T.A. 3018 (Fandom \"TA 3018\": \"April 12: Gandalf tells Frodo that he must leave the Shire\").",
     "src": [
      "https://lotr.fandom.com/wiki/TA_3001",
      "https://lotr.fandom.com/wiki/Breaking_of_the_Fellowship",
      "https://lotr.fandom.com/wiki/TA_3018"
     ]
    },
    "rel": {
     "date": "1954-07-29",
     "end": null,
     "src": "The Fellowship of the Ring",
     "note": "Wikipedia: Infobox: \"|publisher = [[George Allen & Unwin]] |publication_date = 29 July 1954 |pages = 423 (first edition)\""
    }
   }
  ]
 },
 {
  "id": "the-two-towers",
  "title": "The Two Towers",
  "type": "novel",
  "wiki": "The Two Towers",
  "continuity": "me-legendarium",
  "studio": "george-allen-unwin",
  "platform": "print-hardcover",
  "chars": [
   "frodo",
   "gandalf",
   "aragorn",
   "gollum"
  ],
  "notes": "US first publication (Houghton Mifflin): 1955-04-21. LOTR article: \"In the United States, Houghton Mifflin published The Fellowship of the Ring on 21 October 1954, The Two Towers on 21 April 1955, and The Return of the King on 5 January 1956.\"",
  "links": [],
  "units": [
   {
    "key": "",
    "label": "Volume",
    "pages": 352,
    "iu": {
     "y": 7050,
     "label": "T.A. 3019",
     "precision": "year",
     "confidence": "inferred",
     "note": "LOTR Fandom \"Breaking of the Fellowship\": \"Dated at February 26, 3019, it occurred at the end of The Fellowship of the Ring and at the very beginning of The Two Towers\". War of the Ring infobox: \"date = February - November TA 3019\".",
     "src": [
      "https://lotr.fandom.com/wiki/Breaking_of_the_Fellowship",
      "https://lotr.fandom.com/wiki/War_of_the_Ring"
     ]
    },
    "rel": {
     "date": "1954-11-11",
     "end": null,
     "src": "The Two Towers",
     "note": "Wikipedia: Infobox: \"|publication_date = 11 November 1954 |pages = 352 (first edition)\""
    }
   }
  ]
 },
 {
  "id": "the-return-of-the-king",
  "title": "The Return of the King",
  "type": "novel",
  "wiki": "The Return of the King",
  "continuity": "me-legendarium",
  "studio": "george-allen-unwin",
  "platform": "print-hardcover",
  "chars": [
   "frodo",
   "gandalf",
   "aragorn",
   "gollum"
  ],
  "notes": "US first publication (Houghton Mifflin): 1956-01-05. LOTR article: \"In the United States, Houghton Mifflin published The Fellowship of the Ring on 21 October 1954, The Two Towers on 21 April 1955, and The Return of the King on 5 January 1956.\" Includes the Appendices (Tale of Years = the source for most T.A. dates).",
  "links": [],
  "units": [
   {
    "key": "",
    "label": "Volume",
    "pages": 416,
    "iu": {
     "y": 7050,
     "y2": 7052,
     "label": "T.A. 3019–3021",
     "precision": "range",
     "confidence": "inferred",
     "note": "LOTR Fandom \"Battle of the Pelennor Fields\": \"date= March 15, TA 3019\". LOTR Fandom \"TA 3021\": \"September 29: Departure of the Ring-bearers ... The Third Age ends.\" Wikipedia History of Arda: \"As the age ends, Gandalf, Frodo and Bilbo Baggins ... sail from the Grey Havens\".",
     "src": [
      "https://lotr.fandom.com/wiki/Battle_of_the_Pelennor_Fields",
      "https://lotr.fandom.com/wiki/TA_3021",
      "https://en.wikipedia.org/wiki/History_of_Arda"
     ]
    },
    "rel": {
     "date": "1955-10-20",
     "end": null,
     "src": "The Return of the King",
     "note": "Wikipedia: Infobox: \"|publication_date = 20 October 1955 |pages = 416 (first edition)\""
    }
   }
  ]
 },
 {
  "id": "the-silmarillion",
  "title": "The Silmarillion",
  "type": "novel",
  "wiki": "The Silmarillion",
  "continuity": "me-legendarium",
  "studio": "george-allen-unwin",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "Edited by Christopher Tolkien (with Guy Gavriel Kay); posthumous. Spans all ages; place first (relative, precision \"relative\"). No US date in article. Five parts: Ainulindalë, Valaquenta, Quenta Silmarillion, Akallabêth, Of the Rings of Power and the Third Age.",
  "links": [],
  "units": [
   {
    "key": "",
    "label": "Book",
    "pages": 365,
    "iu": {
     "label": "Creation of the world to the end of the Third Age (mainly the First Age)",
     "precision": "relative",
     "confidence": "inferred",
     "note": "History of Arda table row: \"First Age (cont'd) || 590 || '''''Quenta Silmarillion'''''\"; and \"The events of the ensuing War of the Ring leading to the end of the Third Age is the subject of The Lord of the Rings, and summarized in ''Of the Rings of Power and the Third Age''\".",
     "src": [
      "https://en.wikipedia.org/wiki/History_of_Arda"
     ]
    },
    "rel": {
     "date": "1977-09-15",
     "end": null,
     "src": "The Silmarillion",
     "note": "Wikipedia: Infobox: \"|publisher = [[George Allen & Unwin]] (UK) |publication_date = 15 September 1977 |pages = 365\""
    }
   }
  ]
 },
 {
  "id": "unfinished-tales",
  "title": "Unfinished Tales",
  "type": "anthology",
  "wiki": "Unfinished Tales",
  "continuity": "me-legendarium",
  "studio": "george-allen-unwin",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "Full title \"Unfinished Tales of Númenor and Middle-earth\". Year only; no day or page count in the article (gap).",
  "links": [],
  "units": [
   {
    "key": "",
    "label": "Book",
    "iu": {
     "label": "First, Second and Third Ages (collection)",
     "precision": "relative",
     "confidence": "inferred",
     "note": "Lead: \"Many of the tales within are retold in The Silmarillion ... the work also contains a summary of the events of The Lord of the Rings told from a less personal point of view\".",
     "src": [
      "https://en.wikipedia.org/wiki/Unfinished_Tales"
     ]
    },
    "rel": {
     "date": "1980",
     "end": null,
     "src": "Unfinished Tales",
     "note": "Wikipedia: Infobox: \"|publisher = [[George Allen & Unwin]] |publication_date = 1980 |pages = \" (blank). Lead: \"edited by his son Christopher Tolkien and published in 1980\"."
    }
   }
  ]
 },
 {
  "id": "the-history-of-middle-earth",
  "title": "The History of Middle-earth",
  "type": "reference",
  "wiki": "The History of Middle-earth",
  "continuity": "me-legendarium",
  "studio": "george-allen-unwin",
  "platform": "print-hardcover",
  "tier": "adjacent",
  "chars": [],
  "notes": "12-volume series of drafts edited by Christopher Tolkien; infobox publisher \"George Allen & Unwin (UK) / Houghton Mifflin (US)\". Non-narrative: recommend tier adjacent, one title with 12 units. Volume years only (no days/pages per volume).",
  "links": [],
  "units": [
   {
    "key": "the-book-of-lost-tales-1",
    "label": "1. The Book of Lost Tales, Part I",
    "iu": {
     "label": "Drafts and commentary (no placement)",
     "precision": "relative",
     "confidence": "stated",
     "note": "Infobox: \"|editor = [[Christopher Tolkien]] |publication_date = 1983 to 1996 |pages = 12 volumes\"",
     "src": [
      "https://en.wikipedia.org/wiki/The_History_of_Middle-earth"
     ]
    },
    "rel": {
     "date": "1983",
     "end": null,
     "src": "The History of Middle-earth",
     "note": "Wikipedia: Volumes table: \"1. ''The Book of Lost Tales, Part I'' (1983)\""
    }
   },
   {
    "key": "the-book-of-lost-tales-2",
    "label": "2. The Book of Lost Tales, Part II",
    "iu": {
     "label": "Drafts and commentary (no placement)",
     "precision": "relative",
     "confidence": "stated",
     "note": "Infobox: \"|editor = [[Christopher Tolkien]] |publication_date = 1983 to 1996 |pages = 12 volumes\"",
     "src": [
      "https://en.wikipedia.org/wiki/The_History_of_Middle-earth"
     ]
    },
    "rel": {
     "date": "1984",
     "end": null,
     "src": "The History of Middle-earth",
     "note": "Wikipedia: Volumes table: \"2. ''The Book of Lost Tales, Part II'' (1984)\""
    }
   },
   {
    "key": "the-lays-of-beleriand",
    "label": "3. The Lays of Beleriand",
    "iu": {
     "label": "Drafts and commentary (no placement)",
     "precision": "relative",
     "confidence": "stated",
     "note": "Infobox: \"|editor = [[Christopher Tolkien]] |publication_date = 1983 to 1996 |pages = 12 volumes\"",
     "src": [
      "https://en.wikipedia.org/wiki/The_History_of_Middle-earth"
     ]
    },
    "rel": {
     "date": "1985",
     "end": null,
     "src": "The History of Middle-earth",
     "note": "Wikipedia: Volumes table: \"3. ''The Lays of Beleriand'' (1985)\""
    }
   },
   {
    "key": "the-shaping-of-middle-earth",
    "label": "4. The Shaping of Middle-earth",
    "iu": {
     "label": "Drafts and commentary (no placement)",
     "precision": "relative",
     "confidence": "stated",
     "note": "Infobox: \"|editor = [[Christopher Tolkien]] |publication_date = 1983 to 1996 |pages = 12 volumes\"",
     "src": [
      "https://en.wikipedia.org/wiki/The_History_of_Middle-earth"
     ]
    },
    "rel": {
     "date": "1986",
     "end": null,
     "src": "The History of Middle-earth",
     "note": "Wikipedia: Volumes table: \"4. ''The Shaping of Middle-earth'' (1986)\""
    }
   },
   {
    "key": "the-lost-road",
    "label": "5. The Lost Road and Other Writings",
    "iu": {
     "label": "Drafts and commentary (no placement)",
     "precision": "relative",
     "confidence": "stated",
     "note": "Infobox: \"|editor = [[Christopher Tolkien]] |publication_date = 1983 to 1996 |pages = 12 volumes\"",
     "src": [
      "https://en.wikipedia.org/wiki/The_History_of_Middle-earth"
     ]
    },
    "rel": {
     "date": "1987",
     "end": null,
     "src": "The History of Middle-earth",
     "note": "Wikipedia: Volumes table: \"5. ''The Lost Road and Other Writings'' (1987)\""
    }
   },
   {
    "key": "the-return-of-the-shadow",
    "label": "6. The Return of the Shadow",
    "iu": {
     "label": "Drafts and commentary (no placement)",
     "precision": "relative",
     "confidence": "stated",
     "note": "Infobox: \"|editor = [[Christopher Tolkien]] |publication_date = 1983 to 1996 |pages = 12 volumes\"",
     "src": [
      "https://en.wikipedia.org/wiki/The_History_of_Middle-earth"
     ]
    },
    "rel": {
     "date": "1988",
     "end": null,
     "src": "The History of Middle-earth",
     "note": "Wikipedia: Volumes table: \"6. ''The Return of the Shadow'' (1988)\""
    }
   },
   {
    "key": "the-treason-of-isengard",
    "label": "7. The Treason of Isengard",
    "iu": {
     "label": "Drafts and commentary (no placement)",
     "precision": "relative",
     "confidence": "stated",
     "note": "Infobox: \"|editor = [[Christopher Tolkien]] |publication_date = 1983 to 1996 |pages = 12 volumes\"",
     "src": [
      "https://en.wikipedia.org/wiki/The_History_of_Middle-earth"
     ]
    },
    "rel": {
     "date": "1989",
     "end": null,
     "src": "The History of Middle-earth",
     "note": "Wikipedia: Volumes table: \"7. ''The Treason of Isengard'' (1989)\""
    }
   },
   {
    "key": "the-war-of-the-ring",
    "label": "8. The War of the Ring",
    "iu": {
     "label": "Drafts and commentary (no placement)",
     "precision": "relative",
     "confidence": "stated",
     "note": "Infobox: \"|editor = [[Christopher Tolkien]] |publication_date = 1983 to 1996 |pages = 12 volumes\"",
     "src": [
      "https://en.wikipedia.org/wiki/The_History_of_Middle-earth"
     ]
    },
    "rel": {
     "date": "1990",
     "end": null,
     "src": "The History of Middle-earth",
     "note": "Wikipedia: Volumes table: \"8. ''The War of the Ring'' (1990)\""
    }
   },
   {
    "key": "sauron-defeated",
    "label": "9. Sauron Defeated",
    "iu": {
     "label": "Drafts and commentary (no placement)",
     "precision": "relative",
     "confidence": "stated",
     "note": "Infobox: \"|editor = [[Christopher Tolkien]] |publication_date = 1983 to 1996 |pages = 12 volumes\"",
     "src": [
      "https://en.wikipedia.org/wiki/The_History_of_Middle-earth"
     ]
    },
    "rel": {
     "date": "1992",
     "end": null,
     "src": "The History of Middle-earth",
     "note": "Wikipedia: Volumes table: \"9. ''Sauron Defeated'' (1992)\""
    }
   },
   {
    "key": "morgoths-ring",
    "label": "10. Morgoth's Ring",
    "iu": {
     "label": "Drafts and commentary (no placement)",
     "precision": "relative",
     "confidence": "stated",
     "note": "Infobox: \"|editor = [[Christopher Tolkien]] |publication_date = 1983 to 1996 |pages = 12 volumes\"",
     "src": [
      "https://en.wikipedia.org/wiki/The_History_of_Middle-earth"
     ]
    },
    "rel": {
     "date": "1993",
     "end": null,
     "src": "The History of Middle-earth",
     "note": "Wikipedia: Volumes table: \"10. ''Morgoth's Ring'' (1993)\""
    }
   },
   {
    "key": "the-war-of-the-jewels",
    "label": "11. The War of the Jewels",
    "iu": {
     "label": "Drafts and commentary (no placement)",
     "precision": "relative",
     "confidence": "stated",
     "note": "Infobox: \"|editor = [[Christopher Tolkien]] |publication_date = 1983 to 1996 |pages = 12 volumes\"",
     "src": [
      "https://en.wikipedia.org/wiki/The_History_of_Middle-earth"
     ]
    },
    "rel": {
     "date": "1994",
     "end": null,
     "src": "The History of Middle-earth",
     "note": "Wikipedia: Volumes table: \"11. ''The War of the Jewels'' (1994)\""
    }
   },
   {
    "key": "the-peoples-of-middle-earth",
    "label": "12. The Peoples of Middle-earth",
    "iu": {
     "label": "Drafts and commentary (no placement)",
     "precision": "relative",
     "confidence": "stated",
     "note": "Infobox: \"|editor = [[Christopher Tolkien]] |publication_date = 1983 to 1996 |pages = 12 volumes\"",
     "src": [
      "https://en.wikipedia.org/wiki/The_History_of_Middle-earth"
     ]
    },
    "rel": {
     "date": "1996",
     "end": null,
     "src": "The History of Middle-earth",
     "note": "Wikipedia: Volumes table: \"12. ''The Peoples of Middle-earth'' (1996)\""
    }
   }
  ]
 },
 {
  "id": "the-children-of-hurin",
  "title": "The Children of Húrin",
  "type": "novel",
  "wiki": "The Children of Húrin",
  "continuity": "me-legendarium",
  "studio": "harpercollins",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "Edited by Christopher Tolkien; illustrated by Alan Lee. One date for UK/US in infobox.",
  "links": [],
  "units": [
   {
    "key": "",
    "label": "Novel",
    "pages": 320,
    "iu": {
     "y": 464,
     "y2": 499,
     "label": "F.A. 464–499 (Túrin's life)",
     "precision": "range",
     "confidence": "inferred",
     "note": "Wikipedia: \"one of Tolkien's three 'great tales' set in the First Age\". LOTR Fandom \"Túrin\": \"birth = FA 464 ... death = FA 499 (aged 35)\".",
     "src": [
      "https://en.wikipedia.org/wiki/The_Children_of_H%C3%BArin",
      "https://lotr.fandom.com/wiki/T%C3%BArin"
     ]
    },
    "rel": {
     "date": "2007-04-17",
     "end": null,
     "src": "The Children of Húrin",
     "note": "Wikipedia: Infobox: \"|publisher = HarperCollins (UK) * Houghton Mifflin (US) |publication_date = 17 April 2007 |pages = 320\""
    }
   }
  ]
 },
 {
  "id": "beren-and-luthien",
  "title": "Beren and Lúthien",
  "type": "novel",
  "wiki": "Beren and Lúthien",
  "continuity": "me-legendarium",
  "studio": "harpercollins",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "Compilation of versions of the tale, ed. Christopher Tolkien. Day not in article text; 2017-06-01 is the date of the cited BBC report of publication (usable with a note).",
  "links": [],
  "units": [
   {
    "key": "",
    "label": "Book",
    "pages": 297,
    "iu": {
     "y": 464,
     "y2": 466,
     "label": "F.A. 464–466 (Quest for the Silmaril)",
     "precision": "range",
     "confidence": "inferred",
     "note": "LOTR Fandom \"Quest for the Silmaril\": \"date=FA 464 - FA 466\".",
     "src": [
      "https://lotr.fandom.com/wiki/Quest_for_the_Silmaril"
     ]
    },
    "rel": {
     "date": "2017",
     "end": null,
     "src": "Beren and Lúthien",
     "note": "Wikipedia: Infobox: \"|publisher = HarperCollins (UK) * Houghton Mifflin (US) |published = 2017 |pages = 297\". Cited BBC News piece \"JRR Tolkien book Beren and Lúthien published after 100 years\" is dated 1 June 2017."
    }
   }
  ]
 },
 {
  "id": "the-fall-of-gondolin",
  "title": "The Fall of Gondolin",
  "type": "novel",
  "wiki": "The Fall of Gondolin",
  "continuity": "me-legendarium",
  "studio": "harpercollins",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "Last of the three Great Tales. Day not in article text; 2018-08-30 is the cited Tolkien Society publication notice date.",
  "links": [],
  "units": [
   {
    "key": "",
    "label": "Book",
    "pages": 304,
    "iu": {
     "y": 510,
     "label": "F.A. 510",
     "precision": "year",
     "confidence": "inferred",
     "note": "LOTR Fandom \"Fall of Gondolin\": \"|date= [[FA 510]] |result = The demise of the city of Gondolin and death of Turgon\".",
     "src": [
      "https://lotr.fandom.com/wiki/Fall_of_Gondolin"
     ]
    },
    "rel": {
     "date": "2018",
     "end": null,
     "src": "The Fall of Gondolin",
     "note": "Wikipedia: Infobox: \"|publisher = HarperCollins (UK) * Houghton Mifflin (US) |published = 2018 |pages = 304\". Cited Tolkien Society post \"The Fall of Gondolin published\" is dated 30 August 2018."
    }
   }
  ]
 },
 {
  "id": "the-fall-of-numenor",
  "title": "The Fall of Númenor",
  "type": "anthology",
  "wiki": "The Fall of Númenor",
  "continuity": "me-legendarium",
  "studio": "harpercollins",
  "platform": "print-hardcover",
  "chars": [
   "galadriel",
   "sauron"
  ],
  "notes": "Edited by Brian Sibley, illustrated by Alan Lee. Full title \"The Fall of Númenor: And Other Tales from the Second Age of Middle-Earth\". No US date given.",
  "links": [],
  "units": [
   {
    "key": "",
    "label": "Book",
    "pages": 332,
    "iu": {
     "y": 591,
     "y2": 4031,
     "label": "Second Age (S.A. 1–3441)",
     "precision": "range",
     "confidence": "inferred",
     "note": "Lead: \"an edited 2022 collection of J. R. R. Tolkien's Second Age writings ... uses extracts from 'The Tale of Years' ... as a framework\". History of Arda table: \"Second Age || 3,441\". LOTR Fandom \"Downfall of Númenor\": \"the island's destruction ... in SA 3319\".",
     "src": [
      "https://en.wikipedia.org/wiki/The_Fall_of_N%C3%BAmenor",
      "https://en.wikipedia.org/wiki/History_of_Arda",
      "https://lotr.fandom.com/wiki/Downfall_of_N%C3%BAmenor"
     ]
    },
    "rel": {
     "date": "2022-11-15",
     "end": null,
     "src": "The Fall of Númenor",
     "note": "Wikipedia: Infobox: \"|publisher = [[HarperCollins]] |published = 15 November 2022 |pages = 332\""
    }
   }
  ]
 },
 {
  "id": "lotr-the-fellowship-of-the-ring",
  "title": "The Lord of the Rings: The Fellowship of the Ring",
  "type": "film",
  "wiki": "The Lord of the Rings: The Fellowship of the Ring",
  "continuity": "me-jackson",
  "studio": "new-line-cinema",
  "platform": "theatrical",
  "chars": [
   "frodo",
   "gandalf",
   "aragorn",
   "gollum"
  ],
  "notes": "US release used; premiere 2001-12-10 (London). Extended edition: \"On 12 November 2002, an extended edition was released on VHS and DVD, with 30 minutes of new material ... totalling 228 minutes.\" Film compresses the 17-year gap between party and departure.",
  "links": [
   {
    "to": "the-fellowship-of-the-ring",
    "kind": "adapts"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Film",
    "iu": {
     "y": 7032,
     "y2": 7050,
     "label": "Prologue in the Second Age; main story T.A. 3001–3019",
     "precision": "range",
     "confidence": "inferred",
     "note": "Plot: \"In the Second Age of Middle-earth, the lords of Elves, Dwarves, and Men each receive Rings of Power ... marking the beginning of the Third Age.\" Years follow the novel (see the-fellowship-of-the-ring); the film states no year.",
     "src": [
      "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings%3A_The_Fellowship_of_the_Ring"
     ]
    },
    "rel": {
     "date": "2001-12-19",
     "end": null,
     "src": "The Lord of the Rings: The Fellowship of the Ring",
     "note": "Wikipedia: Infobox: \"released = {{Film date|df=yes|2001|12|10|[[Odeon Leicester Square]]|2001|12|19|United States|2001|12|20|New Zealand}} | runtime = 178 minutes\""
    }
   }
  ]
 },
 {
  "id": "lotr-the-two-towers",
  "title": "The Lord of the Rings: The Two Towers",
  "type": "film",
  "wiki": "The Lord of the Rings: The Two Towers",
  "continuity": "me-jackson",
  "studio": "new-line-cinema",
  "platform": "theatrical",
  "chars": [
   "frodo",
   "gandalf",
   "aragorn",
   "gollum"
  ],
  "notes": "Extended edition released on home video \"a year after its release in cinemas\" (film-series article); no exact date fetched.",
  "links": [
   {
    "to": "the-two-towers",
    "kind": "adapts"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Film",
    "iu": {
     "y": 7050,
     "label": "T.A. 3019",
     "precision": "year",
     "confidence": "inferred",
     "note": "Follows the novel The Two Towers (T.A. 3019; LOTR Fandom \"Breaking of the Fellowship\": \"Dated at February 26, 3019 ... at the very beginning of The Two Towers\"); the film states no year.",
     "src": [
      "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings%3A_The_Two_Towers",
      "https://lotr.fandom.com/wiki/Breaking_of_the_Fellowship"
     ]
    },
    "rel": {
     "date": "2002-12-18",
     "end": null,
     "src": "The Lord of the Rings: The Two Towers",
     "note": "Wikipedia: Infobox: \"released = {{Film date|df=yes|2002|12|5|[[Ziegfeld Theatre (1969)|Ziegfeld Theatre]]|2002|12|18|United States|2002|12|19|New Zealand}} | runtime = 179 minutes\""
    }
   }
  ]
 },
 {
  "id": "lotr-the-return-of-the-king",
  "title": "The Lord of the Rings: The Return of the King",
  "type": "film",
  "wiki": "The Lord of the Rings: The Return of the King",
  "continuity": "me-jackson",
  "studio": "new-line-cinema",
  "platform": "theatrical",
  "chars": [
   "frodo",
   "gandalf",
   "aragorn",
   "gollum"
  ],
  "notes": "Film epilogue timing (\"four years later\") conflicts with the book (3019 -> 3021); year_end left null.",
  "links": [
   {
    "to": "the-return-of-the-king",
    "kind": "adapts"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Film",
    "iu": {
     "y": 7050,
     "label": "T.A. 3019 (epilogue some years later)",
     "precision": "year",
     "confidence": "disputed",
     "note": "Plot: \"The hobbits return to the Shire, where Sam marries Rosie Cotton. Four years later, Frodo ...\" In the novel Frodo sails in T.A. 3021, two years after 3019 (LOTR Fandom \"TA 3021\"), so the film epilogue does not match book chronology.",
     "src": [
      "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings%3A_The_Return_of_the_King",
      "https://lotr.fandom.com/wiki/TA_3021"
     ]
    },
    "rel": {
     "date": "2003-12-17",
     "end": null,
     "src": "The Lord of the Rings: The Return of the King",
     "note": "Wikipedia: Infobox: \"released = {{Film date|df=yes|2003|12|1|[[Embassy Theatre, Wellington|Embassy Theatre]]|2003|12|17|United States|2003|12|18|New Zealand}} | runtime = 201 minutes\""
    }
   }
  ]
 },
 {
  "id": "the-hobbit-an-unexpected-journey",
  "title": "The Hobbit: An Unexpected Journey",
  "type": "film",
  "wiki": "The Hobbit: An Unexpected Journey",
  "continuity": "me-jackson",
  "studio": "new-line-cinema",
  "platform": "theatrical",
  "chars": [
   "bilbo",
   "gandalf"
  ],
  "notes": "Also draws on the appendices of The Return of the King (\"portions of the film are adapted from the appendices\"). Frame story on Bilbo's 111th birthday (T.A. 3001). Extended editions exist (series total \"532 minutes (Extended edition)\" vs 474 theatrical).",
  "links": [
   {
    "to": "the-hobbit",
    "kind": "adapts"
   },
   {
    "to": "the-return-of-the-king",
    "kind": "adapts"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Film",
    "iu": {
     "y": 6972,
     "label": "T.A. 2941",
     "precision": "year",
     "confidence": "inferred",
     "note": "Wikipedia: \"The story is set in Middle-earth sixty years before the main events of The Lord of the Rings\". LOTR Fandom \"Quest of Erebor\": \"date = April 27 - November 23, TA 2941\".",
     "src": [
      "https://en.wikipedia.org/wiki/The_Hobbit%3A_An_Unexpected_Journey",
      "https://lotr.fandom.com/wiki/Quest_of_Erebor"
     ]
    },
    "rel": {
     "date": "2012-12-14",
     "end": null,
     "src": "The Hobbit: An Unexpected Journey",
     "note": "Wikipedia: Infobox: \"released = {{Film date|df=yes|2012|11|28|Wellington premiere|2012|12|12|New Zealand|2012|12|14|United States}} | runtime = 169 minutes\""
    }
   }
  ]
 },
 {
  "id": "the-hobbit-the-desolation-of-smaug",
  "title": "The Hobbit: The Desolation of Smaug",
  "type": "film",
  "wiki": "The Hobbit: The Desolation of Smaug",
  "continuity": "me-jackson",
  "studio": "new-line-cinema",
  "platform": "theatrical",
  "chars": [
   "bilbo",
   "gandalf"
  ],
  "notes": "",
  "links": [
   {
    "to": "the-hobbit",
    "kind": "adapts"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Film",
    "iu": {
     "y": 6972,
     "label": "T.A. 2941",
     "precision": "year",
     "confidence": "inferred",
     "note": "LOTR Fandom \"Quest of Erebor\": \"date = April 27 - November 23, TA 2941\"; LOTR Fandom \"TA 2941\": \"Most events of The Hobbit take place in this year.\"",
     "src": [
      "https://lotr.fandom.com/wiki/Quest_of_Erebor",
      "https://lotr.fandom.com/wiki/TA_2941"
     ]
    },
    "rel": {
     "date": "2013-12-13",
     "end": null,
     "src": "The Hobbit: The Desolation of Smaug",
     "note": "Wikipedia: Infobox: \"released = {{Film date|df=yes|2013|12|02|Los Angeles premiere|2013|12|12|New Zealand|2013|12|13|United States}} | runtime = 161 minutes\""
    }
   }
  ]
 },
 {
  "id": "the-hobbit-the-battle-of-the-five-armies",
  "title": "The Hobbit: The Battle of the Five Armies",
  "type": "film",
  "wiki": "The Hobbit: The Battle of the Five Armies",
  "continuity": "me-jackson",
  "studio": "new-line-cinema",
  "platform": "theatrical",
  "chars": [
   "bilbo",
   "gandalf"
  ],
  "notes": "",
  "links": [
   {
    "to": "the-hobbit",
    "kind": "adapts"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Film",
    "iu": {
     "y": 6972,
     "label": "T.A. 2941 (coda in T.A. 3001)",
     "precision": "year",
     "confidence": "inferred",
     "note": "LOTR Fandom \"TA 2941\": \"The Battle of Five Armies takes place.\" Plot: \"Sixty years later, Bilbo happily receives a visit from Gandalf on his 111th birthday.\"",
     "src": [
      "https://lotr.fandom.com/wiki/TA_2941",
      "https://en.wikipedia.org/wiki/The_Hobbit%3A_The_Battle_of_the_Five_Armies"
     ]
    },
    "rel": {
     "date": "2014-12-17",
     "end": null,
     "src": "The Hobbit: The Battle of the Five Armies",
     "note": "Wikipedia: Infobox: \"released = {{Film date|df=yes|2014|12|01|London premiere|2014|12|11|New Zealand|2014|12|17|United States}} | runtime = 144 minutes\""
    }
   }
  ]
 },
 {
  "id": "lotr-the-war-of-the-rohirrim",
  "title": "The Lord of the Rings: The War of the Rohirrim",
  "type": "film",
  "wiki": "The Lord of the Rings: The War of the Rohirrim",
  "continuity": "me-jackson",
  "studio": "warner-bros-animation",
  "platform": "theatrical",
  "chars": [
   "frodo",
   "gandalf",
   "aragorn",
   "gollum"
  ],
  "notes": "Anime film (Kenji Kamiyama). Based on LOTR Appendix A: \"based on details in the appendices of Tolkien's novel The Lord of the Rings ... covering the history of Rohan's rulers.\" Continuity: \"It is connected to the film trilogy's continuity\". Infobox date 2024-12-03 is the London premiere; US release used.",
  "links": [
   {
    "to": "the-return-of-the-king",
    "kind": "adapts"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Film",
    "iu": {
     "y": 6789,
     "y2": 6790,
     "label": "T.A. 2758–2759",
     "precision": "range",
     "confidence": "inferred",
     "note": "Wikipedia (Rohan, Middle-earth): \"In 2758, Rohan was invaded by Dunlendings under Wulf, son of Freca ... The King, Helm Hammerhand, took refuge\". LOTR Fandom \"Helm Hammerhand\": \"death = TA 2759\". Film article only says \"Set around 200 years before\" the Jackson trilogies.",
     "src": [
      "https://en.wikipedia.org/wiki/Rohan%2C_Middle-earth",
      "https://lotr.fandom.com/wiki/Helm_Hammerhand",
      "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings%3A_The_War_of_the_Rohirrim"
     ]
    },
    "rel": {
     "date": "2024-12-13",
     "end": null,
     "src": "The Lord of the Rings: The War of the Rohirrim",
     "note": "Wikipedia: \"premiered on 3 December 2024, and was released theatrically by Warner Bros. Pictures in international markets from 5 December and in the United States on 13 December.\" Infobox: \"runtime = 134 minutes\""
    }
   }
  ]
 },
 {
  "id": "lotr-the-hunt-for-gollum",
  "title": "The Lord of the Rings: The Hunt for Gollum",
  "type": "film",
  "wiki": "The Lord of the Rings: The Hunt for Gollum",
  "continuity": "me-jackson",
  "studio": "new-line-cinema",
  "platform": "theatrical",
  "chars": [
   "frodo",
   "gandalf",
   "aragorn",
   "gollum"
  ],
  "notes": "Directed by Andy Serkis; filmed July–November 2026. No year assigned: sources conflict on when Aragorn caught Gollum (LOTR Fandom \"TA 3009\": \"According to Unfinished Tales, 352, this occurred in 3017 or early 3018\"; \"TA 3017\" puts the capture in 3017). Place relative: after BotFA, overlapping FotR. \"adapts\" is approximate (commentators expected \"material from the appendices\").",
  "links": [
   {
    "to": "the-fellowship-of-the-ring",
    "kind": "adapts"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Film",
    "iu": {
     "label": "Between the Hobbit and LOTR trilogies, overlapping The Fellowship of the Ring",
     "precision": "relative",
     "confidence": "inferred",
     "note": "\"The Hunt for Gollum is set between the events of Peter Jackson's The Hobbit (2012–2014) and The Lord of the Rings (2001–2003) film trilogies, and during the events of the film The Lord of the Rings: The Fellowship of the Ring (2001) leading up to the Company of the Ring entering the Mines of Moria.\" Placed between the Hobbit and Lord of the Rings trilogies once released.",
     "src": [
      "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings%3A_The_Hunt_for_Gollum"
     ]
    },
    "rel": {
     "date": "2027-12-17",
     "end": null,
     "src": "The Lord of the Rings: The Hunt for Gollum",
     "note": "Wikipedia: \"is scheduled to be released theatrically by Warner Bros. Pictures in the United States on 17 December 2027.\" Infobox: \"released = {{Film date|2027|12|17|df=y}}\""
    }
   }
  ]
 },
 {
  "id": "the-rings-of-power",
  "title": "The Lord of the Rings: The Rings of Power",
  "type": "series",
  "wiki": "The Lord of the Rings: The Rings of Power",
  "continuity": "me-rings-of-power",
  "studio": "amazon-mgm-studios",
  "platform": "prime-video",
  "chars": [
   "frodo",
   "gandalf",
   "aragorn",
   "gollum"
  ],
  "notes": "Infobox: \"based_on = The Lord of the Rings and appendices\" (Second Age history is in the RotK appendices). Wikipedia: \"These events take place over thousands of years in Tolkien's works but are condensed to a short time period for the series.\" So no S.A. years — order by season only. A fourth season \"had not been officially greenlit\" (May 2026).",
  "links": [
   {
    "to": "the-return-of-the-king",
    "kind": "adapts"
   }
  ],
  "units": [
   {
    "key": "s1",
    "label": "Season 1",
    "season": 1,
    "episodes": 8,
    "iu": {
     "label": "Second Age",
     "precision": "relative",
     "confidence": "stated",
     "note": "Season 1 article: \"Set thousands of years before the novel in Middle-earth's Second Age, the series begins in a time of relative peace\".",
     "src": [
      "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings%3A_The_Rings_of_Power_season_1"
     ]
    },
    "rel": {
     "date": "2022-09-01",
     "end": "2022-10-14",
     "src": "The Lord of the Rings: The Rings of Power",
     "note": "Wikipedia: Series overview: \"episodes1 = 8 | start1 = {{Start date|2022|9|1}} | end1 = {{End date|2022|10|14}}\""
    }
   },
   {
    "key": "s2",
    "label": "Season 2",
    "season": 2,
    "episodes": 8,
    "iu": {
     "label": "Second Age",
     "precision": "relative",
     "confidence": "stated",
     "note": "Season 2 article: \"Set thousands of years before the novel in Middle-earth's Second Age, the season depicts the rise of the Dark Lord Sauron\". Episode 1 opens \"At the dawn of the Second Age\" (flashback).",
     "src": [
      "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings%3A_The_Rings_of_Power_season_2"
     ]
    },
    "rel": {
     "date": "2024-08-29",
     "end": "2024-10-03",
     "src": "The Lord of the Rings: The Rings of Power",
     "note": "Wikipedia: Series overview: \"episodes2 = 8 | start2 = {{Start date|2024|8|29}} | end2 = {{End date|2024|10|3}}\""
    }
   },
   {
    "key": "s3",
    "label": "Season 3",
    "season": 3,
    "episodes": 8,
    "iu": {
     "label": "Second Age, five years after Season 2",
     "precision": "relative",
     "confidence": "stated",
     "note": "Season 3 article: \"the season takes place five years after the second at the height of a war between the Elves and the Dark Lord Sauron\".",
     "src": [
      "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings%3A_The_Rings_of_Power_season_3"
     ]
    },
    "rel": {
     "date": "2026-11-11",
     "end": "2026-11-24",
     "src": "The Lord of the Rings: The Rings of Power",
     "note": "Wikipedia: Season 3 article: \"The season premiered on the streaming service Amazon Prime Video on November 11, 2026, with its first four episodes. The next two episodes were released on November 18 and the final two on November 24.\""
    }
   }
  ]
 },
 {
  "id": "the-hobbit-1977",
  "title": "The Hobbit",
  "type": "animated-film",
  "wiki": "The Hobbit (1977 film)",
  "continuity": "me-rankin-bass",
  "studio": "rankin-bass-productions",
  "platform": "nbc",
  "chars": [
   "bilbo",
   "gandalf"
  ],
  "notes": "Animated TV film; same-name title -> display \"The Hobbit [1977]\". Runtime note: \"several Internet sites list the full 90 minute air time\".",
  "links": [
   {
    "to": "the-hobbit",
    "kind": "adapts"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "TV film",
    "iu": {
     "y": 6972,
     "label": "T.A. 2941",
     "precision": "year",
     "confidence": "inferred",
     "note": "Adapts The Hobbit, whose \"main events ... occur in TA 2941\" (History of Arda); the film states no year.",
     "src": [
      "https://en.wikipedia.org/wiki/The_Hobbit_(1977_film)",
      "https://en.wikipedia.org/wiki/History_of_Arda"
     ]
    },
    "rel": {
     "date": "1977-11-27",
     "end": null,
     "src": "The Hobbit (1977 film)",
     "note": "Wikipedia: \"it was first broadcast on NBC in the United States on Sunday, November 27, 1977.\" Infobox: \"runtime = 78 minutes ... network = [[NBC]]\""
    }
   }
  ]
 },
 {
  "id": "the-return-of-the-king-1980",
  "title": "The Return of the King",
  "type": "animated-film",
  "wiki": "The Return of the King (1980 film)",
  "continuity": "me-rankin-bass",
  "studio": "rankin-bass-productions",
  "platform": "abc",
  "chars": [
   "frodo",
   "gandalf",
   "aragorn",
   "gollum"
  ],
  "notes": "NOT a sequel to Bakshi: \"The film is often mistaken for a sequel to Ralph Bakshi's 1978 animated film ... Rankin/Bass had always planned on making The Return of the King as a follow-up to their production of The Hobbit, even before the release of Bakshi's film.\" Warner later marketed the three as a trilogy on home video only. Infobox based_on: \"The Hobbit and The Return of the King\".",
  "links": [
   {
    "to": "the-return-of-the-king",
    "kind": "adapts"
   },
   {
    "to": "the-hobbit",
    "kind": "adapts"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "TV film",
    "iu": {
     "y": 7050,
     "label": "T.A. 3019 (frame at Rivendell)",
     "precision": "year",
     "confidence": "inferred",
     "note": "Wikipedia: \"It is a sequel to The Hobbit (1977). The film is an adaptation of The Return of the King, the third and final volume\". Year follows the novel (T.A. 3019); the film states none.",
     "src": [
      "https://en.wikipedia.org/wiki/The_Return_of_the_King_(1980_film)"
     ]
    },
    "rel": {
     "date": "1980-05-11",
     "end": null,
     "src": "The Return of the King (1980 film)",
     "note": "Wikipedia: Infobox: \"runtime = 98 minutes ... network = [[American Broadcasting Company|ABC]] | released = {{Start date|1980|05|11}}\""
    }
   }
  ]
 },
 {
  "id": "the-lord-of-the-rings-1978",
  "title": "The Lord of the Rings",
  "type": "animated-film",
  "wiki": "The Lord of the Rings (1978 film)",
  "continuity": "me-bakshi",
  "studio": "fantasy-films",
  "platform": "theatrical",
  "chars": [
   "frodo",
   "gandalf",
   "aragorn",
   "gollum"
  ],
  "notes": "Ralph Bakshi, animated; produced by Saul Zaentz. \"There was no official sequel to cover the remainder of the story\". Same-name title -> \"The Lord of the Rings [1978]\".",
  "links": [
   {
    "to": "the-fellowship-of-the-ring",
    "kind": "adapts"
   },
   {
    "to": "the-two-towers",
    "kind": "adapts"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Film",
    "iu": {
     "y": 7032,
     "y2": 7050,
     "label": "T.A. 3001–3019",
     "precision": "range",
     "confidence": "inferred",
     "note": "\"adapting from the volumes The Fellowship of the Ring and The Two Towers\" ... \"covering only some of The Two Towers and none of The Return of the King\". Years follow the novel volumes.",
     "src": [
      "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings_(1978_film)"
     ]
    },
    "rel": {
     "date": "1978-11-15",
     "end": null,
     "src": "The Lord of the Rings (1978 film)",
     "note": "Wikipedia: Infobox: \"released = {{Film date|1978|11|15|United States|1979|7|5|United Kingdom}} | runtime = 133 minutes\""
    }
   }
  ]
 },
 {
  "id": "khraniteli",
  "title": "Khraniteli",
  "type": "special",
  "wiki": "Khraniteli",
  "continuity": "me-khraniteli",
  "studio": "leningrad-television",
  "platform": "leningrad-television",
  "chars": [
   "frodo",
   "gandalf",
   "aragorn",
   "gollum"
  ],
  "notes": "Soviet TV play (Russian). Year only.",
  "links": [
   {
    "to": "the-fellowship-of-the-ring",
    "kind": "adapts"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Two parts",
    "episodes": 2,
    "iu": {
     "y": 7032,
     "y2": 7050,
     "label": "T.A. 3001–3019",
     "precision": "range",
     "confidence": "inferred",
     "note": "\"based on Tolkien's The Fellowship of the Ring\"; years follow the novel.",
     "src": [
      "https://en.wikipedia.org/wiki/Khraniteli"
     ]
    },
    "rel": {
     "date": "1991",
     "end": null,
     "src": "Khraniteli",
     "note": "Wikipedia: Infobox: \"runtime = 115 minutes (2 episodes) | company = [[Leningrad Television]] | released = {{Start date|1991}}\". \"It was broadcast once in 1991 by Leningrad Television and then thought lost before being rediscovered in 2021.\""
    }
   }
  ]
 },
 {
  "id": "hobitit",
  "title": "Hobitit",
  "type": "series",
  "wiki": "Hobitit",
  "continuity": "me-hobitit",
  "studio": "yle",
  "platform": "yle-tv1",
  "chars": [
   "frodo",
   "gandalf",
   "aragorn",
   "gollum"
  ],
  "notes": "Finnish miniseries; despite the name it adapts LOTR.",
  "links": [
   {
    "to": "the-fellowship-of-the-ring",
    "kind": "adapts"
   },
   {
    "to": "the-two-towers",
    "kind": "adapts"
   },
   {
    "to": "the-return-of-the-king",
    "kind": "adapts"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Miniseries",
    "season": 1,
    "episodes": 9,
    "iu": {
     "y": 7032,
     "y2": 7052,
     "label": "T.A. 3001–3021",
     "precision": "range",
     "confidence": "inferred",
     "note": "\"It is based on a six-hour play, Taru sormusten herrasta (The Lord of the Rings), put on by Ryhmäteatteri\"; years follow the novel.",
     "src": [
      "https://en.wikipedia.org/wiki/Hobitit"
     ]
    },
    "rel": {
     "date": "1993-03-29",
     "end": "1993-05-24",
     "src": "Hobitit",
     "note": "Wikipedia: Infobox: \"num_episodes = 9 | runtime = 9 × 30 minutes | channel = [[Yle TV1]] | first_aired = {{Start date|1993|03|29|df=yes}} | last_aired = {{End date|1993|05|24|df=yes}}\""
    }
   }
  ]
 }
];
