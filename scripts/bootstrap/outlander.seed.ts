// Outlander seed, generated from research on 2026-11-27 (see DATA_NOTES).
import type { SeedTitle } from './seed-kit.ts';

export const SEED: SeedTitle[] = [
 {
  "id": "outlander-novel",
  "title": "Outlander",
  "type": "novel",
  "wiki": "Outlander (novel)",
  "continuity": "outlander-books",
  "studio": "delacorte-press",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "UK/AU/NZ title: Cross Stitch. pages = 850. Publisher in infobox: \"Delacorte Books\" (Delacorte Press).",
  "units": [
   {
    "key": "",
    "label": "Novel",
    "pages": 850,
    "iu": {
     "y": 1743,
     "label": "1946 (1945 in US editions) -> 1743",
     "precision": "year",
     "confidence": "stated",
     "note": "\"In 1946, after working apart during the Second World War ... \" (note: \"The edition published in the UK is set in 1946; however, the editions published in North America are set in 1945\") / \"The highlanders of 1743 see Claire as a Sassenach\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Outlander_%28novel%29&oldid=1384251722"
     ]
    },
    "rel": {
     "date": "1991-06-01",
     "end": null,
     "src": "Outlander (novel)",
     "note": "Wikipedia: Infobox: \"published = June 1, 1991\"; publisher Delacorte Books"
    }
   }
  ]
 },
 {
  "id": "dragonfly-in-amber",
  "title": "Dragonfly in Amber",
  "type": "novel",
  "wiki": "Dragonfly in Amber",
  "continuity": "outlander-books",
  "studio": "delacorte-press",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "pages = 752.",
  "links": [
   {
    "to": "outlander-novel",
    "kind": "sequel",
    "note": "book 2"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novel",
    "pages": 752,
    "iu": {
     "y": 1744,
     "y2": 1746,
     "label": "1744-1746 (frame 1968)",
     "precision": "range",
     "confidence": "stated",
     "note": "Section headings \"Scotland, 1968\", \"Paris, 1744\", \"Scotland, 1745 and the Rising\"; \"send Claire back through the stones to 1946\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Dragonfly_in_Amber&oldid=1384252703"
     ]
    },
    "rel": {
     "date": "1992-07-01",
     "end": null,
     "src": "Dragonfly in Amber",
     "note": "Wikipedia: Infobox: \"published = July 1, 1992\""
    }
   }
  ]
 },
 {
  "id": "voyager-novel",
  "title": "Voyager",
  "type": "novel",
  "wiki": "Voyager (novel)",
  "continuity": "outlander-books",
  "studio": "delacorte-press",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "pages = 870. Minor conflict: the book-series infobox list says (1994) while its publishing-history list and the novel infobox say 1993; the novel infobox date (December 1, 1993) is used.",
  "links": [
   {
    "to": "dragonfly-in-amber",
    "kind": "sequel",
    "note": "book 3"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novel",
    "pages": 870,
    "iu": {
     "y": 1746,
     "y2": 1766,
     "label": "1746-1766 (frame 1968)",
     "precision": "range",
     "confidence": "stated",
     "note": "Section headings \"1746\" and \"1766\"; \"On Halloween of 1968, Claire returns to Jamie's time.\" / \"evidence of Jamie writing an article printed in 1765\". Wikipedia categories on the article: \"Works set in 1746\", \"Works set in 1755\", \"Works set in 1756\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Voyager_%28novel%29&oldid=1384253464"
     ]
    },
    "rel": {
     "date": "1993-12-01",
     "end": null,
     "src": "Voyager (novel)",
     "note": "Wikipedia: Infobox: \"published = December 1, 1993\""
    }
   }
  ]
 },
 {
  "id": "drums-of-autumn",
  "title": "Drums of Autumn",
  "type": "novel",
  "wiki": "Drums of Autumn",
  "continuity": "outlander-books",
  "studio": "delacorte-press",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "pages = 880.",
  "links": [
   {
    "to": "voyager-novel",
    "kind": "sequel",
    "note": "book 4"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novel",
    "pages": 880,
    "iu": {
     "y": 1767,
     "y2": 1770,
     "label": "1767-1770",
     "precision": "range",
     "confidence": "inferred",
     "note": "\"Georgia coastline in 1766 ... Drums of Autumn picks up where Voyager left off.\" Wikipedia categories on the article: \"Works set in 1767\", \"Works set in 1768\", \"Works set in 1769\", \"Works set in 1770\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Drums_of_Autumn&oldid=1384253467"
     ]
    },
    "rel": {
     "date": "1996-12-30",
     "end": null,
     "src": "Drums of Autumn",
     "note": "Wikipedia: Infobox: \"published = December 30, 1996\""
    }
   }
  ]
 },
 {
  "id": "the-fiery-cross",
  "title": "The Fiery Cross",
  "type": "novel",
  "wiki": "The Fiery Cross (novel)",
  "continuity": "outlander-books",
  "studio": "delacorte-press",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "pages = 992.",
  "links": [
   {
    "to": "drums-of-autumn",
    "kind": "sequel",
    "note": "book 5, picks up exactly where book 4 ends"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novel",
    "pages": 992,
    "iu": {
     "y": 1770,
     "y2": 1772,
     "label": "1770-1772",
     "precision": "range",
     "confidence": "inferred",
     "note": "Wikipedia categories on the article: \"Works set in 1770\", \"Works set in 1771\", \"Works set in 1772\"; \"picks up the storyline exactly where it was left\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=The_Fiery_Cross_%28novel%29&oldid=1384253473"
     ]
    },
    "rel": {
     "date": "2001-11-06",
     "end": null,
     "src": "The Fiery Cross (novel)",
     "note": "Wikipedia: Infobox: \"published = November 6, 2001\""
    }
   }
  ]
 },
 {
  "id": "a-breath-of-snow-and-ashes",
  "title": "A Breath of Snow and Ashes",
  "type": "novel",
  "wiki": "A Breath of Snow and Ashes",
  "continuity": "outlander-books",
  "studio": "delacorte-press",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "pages = 1157.",
  "links": [
   {
    "to": "the-fiery-cross",
    "kind": "sequel",
    "note": "book 6"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novel",
    "pages": 1157,
    "iu": {
     "y": 1773,
     "y2": 1776,
     "label": "1773-1776",
     "precision": "range",
     "confidence": "inferred",
     "note": "Wikipedia categories on the article: \"Works set in 1773\", \"Works set in 1774\", \"Works set in 1775\", \"Works set in 1776\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=A_Breath_of_Snow_and_Ashes&oldid=1384253475"
     ]
    },
    "rel": {
     "date": "2005-09-27",
     "end": null,
     "src": "A Breath of Snow and Ashes",
     "note": "Wikipedia: Infobox: \"published = September 27, 2005\""
    }
   }
  ]
 },
 {
  "id": "an-echo-in-the-bone",
  "title": "An Echo in the Bone",
  "type": "novel",
  "wiki": "An Echo in the Bone",
  "continuity": "outlander-books",
  "studio": "delacorte-press",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "pages = 820.",
  "links": [
   {
    "to": "a-breath-of-snow-and-ashes",
    "kind": "sequel",
    "note": "book 7"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novel",
    "pages": 820,
    "iu": {
     "y": 1777,
     "y2": 1778,
     "label": "1777-1778",
     "precision": "range",
     "confidence": "inferred",
     "note": "Wikipedia categories on the article: \"Works set in 1777\", \"Works set in 1778\"; \"Roger's ancestor William Buchleigh \"Buck\" MacKenzie shows up at Lallybroch, having accidentally gone through the stones at Craigh na Dun in 1778.\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=An_Echo_in_the_Bone&oldid=1384338054"
     ]
    },
    "rel": {
     "date": "2009-09-22",
     "end": null,
     "src": "An Echo in the Bone",
     "note": "Wikipedia: \"First published and released in the United States on September 22, 2009\""
    }
   }
  ]
 },
 {
  "id": "written-in-my-own-hearts-blood",
  "title": "Written in My Own Heart's Blood",
  "type": "novel",
  "wiki": "Written in My Own Heart's Blood",
  "continuity": "outlander-books",
  "studio": "delacorte-press",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "pages = 825.",
  "links": [
   {
    "to": "an-echo-in-the-bone",
    "kind": "sequel",
    "note": "book 8"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novel",
    "pages": 825,
    "iu": {
     "y": 1778,
     "label": "1778 (evacuation of Philadelphia, Battle of Monmouth)",
     "precision": "year",
     "confidence": "inferred",
     "note": "\"The British evacuation of Philadelphia and the ensuing Battle of Monmouth are the major events from the book based on real history.\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Written_in_My_Own_Heart%27s_Blood&oldid=1384393999"
     ]
    },
    "rel": {
     "date": "2014-06-10",
     "end": null,
     "src": "Written in My Own Heart's Blood",
     "note": "Wikipedia: \"Published on June 10, 2014\""
    }
   }
  ]
 },
 {
  "id": "go-tell-the-bees-that-i-am-gone",
  "title": "Go Tell the Bees That I Am Gone",
  "type": "novel",
  "wiki": "Go Tell the Bees That I Am Gone",
  "continuity": "outlander-books",
  "studio": "delacorte-press",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "pages = 928. Book 10, A Blessing for a Warrior Going Out, is announced but unpublished (excluded).",
  "links": [
   {
    "to": "written-in-my-own-hearts-blood",
    "kind": "sequel",
    "note": "book 9"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novel",
    "pages": 928,
    "iu": {
     "y": 1779,
     "label": "1779",
     "precision": "year",
     "confidence": "inferred",
     "note": "Outlander Wiki (Fandom), book blurb: \"It is 1779 and Claire and Jamie are at last reunited with their daughter, Brianna, her husband, Roger, and their children on Fraser's Ridge.\"",
     "src": [
      "https://outlander.fandom.com/wiki/Go_Tell_the_Bees_That_I_Am_Gone"
     ]
    },
    "rel": {
     "date": "2021-11-23",
     "end": null,
     "src": "Go Tell the Bees That I Am Gone",
     "note": "Wikipedia: Infobox: \"published = November 23, 2021\"; series article: \"was released on November 23, 2021.\""
    }
   }
  ]
 },
 {
  "id": "lord-john-and-the-hellfire-club",
  "title": "Lord John and the Hellfire Club",
  "type": "novella",
  "wiki": "Lord John series",
  "continuity": "outlander-books",
  "studio": "headline-publishing",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "First published in the anthology Past Poisons; collected in Lord John and the Hand of Devils (2007). Release date is year-only.",
  "links": [
   {
    "to": "voyager-novel",
    "kind": "spinoff",
    "note": "Lord John series, set during Voyager (1756-1761)"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novella",
    "iu": {
     "y": 1756,
     "label": "1756",
     "precision": "year",
     "confidence": "stated",
     "note": "\"Set in 1756 London, the novella follows the adventures of Lord John\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Lord_John_series&oldid=1384393995"
     ]
    },
    "rel": {
     "date": "1998",
     "end": null,
     "src": "Lord John series",
     "note": "Wikipedia: \"The novella Lord John and the Hellfire Club was originally published in the 1998 British anthology Past Poisons\" (infobox publication_date = 1998, publisher Headline)"
    }
   }
  ]
 },
 {
  "id": "lord-john-and-the-private-matter",
  "title": "Lord John and the Private Matter",
  "type": "novel",
  "wiki": "Lord John series",
  "continuity": "outlander-books",
  "studio": "delacorte-press",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "First Lord John novel. pages = 320.",
  "links": [
   {
    "to": "voyager-novel",
    "kind": "spinoff",
    "note": "Lord John series, set during Voyager (1756-1761)"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novel",
    "pages": 320,
    "iu": {
     "y": 1757,
     "label": "1757",
     "precision": "year",
     "confidence": "stated",
     "note": "\"Set in 1757 England, the novel follows Lord John's attempt to resolve a delicate situation\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Lord_John_series&oldid=1384393995"
     ]
    },
    "rel": {
     "date": "2003-09-30",
     "end": null,
     "src": "Lord John series",
     "note": "Wikipedia: \"published by Delacorte Press on September 30, 2003.\""
    }
   }
  ]
 },
 {
  "id": "lord-john-and-the-succubus",
  "title": "Lord John and the Succubus",
  "type": "novella",
  "wiki": "Lord John series",
  "continuity": "outlander-books",
  "studio": "del-rey-books",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "First published in the anthology Legends II; collected in Hand of Devils. Year-only release date.",
  "links": [
   {
    "to": "voyager-novel",
    "kind": "spinoff",
    "note": "Lord John series, set during Voyager (1756-1761)"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novella",
    "iu": {
     "y": 1758,
     "label": "1758",
     "precision": "year",
     "confidence": "stated",
     "note": "\"Set in 1758, the story finds Lord John in Prussia\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Lord_John_series&oldid=1384393995"
     ]
    },
    "rel": {
     "date": "2003",
     "end": null,
     "src": "Lord John series",
     "note": "Wikipedia: \"originally published in the 2003 Del Rey Books anthology Legends II\" (publication_date = 2003)"
    }
   }
  ]
 },
 {
  "id": "lord-john-and-the-brotherhood-of-the-blade",
  "title": "Lord John and the Brotherhood of the Blade",
  "type": "novel",
  "wiki": "Lord John series",
  "continuity": "outlander-books",
  "studio": "delacorte-press",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "pages = 512.",
  "links": [
   {
    "to": "lord-john-and-the-private-matter",
    "kind": "sequel",
    "note": "second Lord John novel"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novel",
    "pages": 512,
    "iu": {
     "y": 1759,
     "label": "1759",
     "precision": "year",
     "confidence": "stated",
     "note": "\"In 1759, Lord John finds that someone has reawakened the long-forgotten scandal of his father's death 17 years earlier\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Lord_John_series&oldid=1384393995"
     ]
    },
    "rel": {
     "date": "2007-08-28",
     "end": null,
     "src": "Lord John series",
     "note": "Wikipedia: \"the 512-page Lord John and the Brotherhood of the Blade, was published by Delacorte Press on August 28, 2007.\""
    }
   }
  ]
 },
 {
  "id": "lord-john-and-the-haunted-soldier",
  "title": "Lord John and the Haunted Soldier",
  "type": "novella",
  "wiki": "Lord John series",
  "continuity": "outlander-books",
  "studio": "delacorte-press",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "First published in the collection Lord John and the Hand of Devils (2007). Year-only release date.",
  "links": [
   {
    "to": "lord-john-and-the-brotherhood-of-the-blade",
    "kind": "sequel",
    "note": "picks up right after Brotherhood of the Blade"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novella",
    "iu": {
     "y": 1759,
     "label": "1759",
     "precision": "year",
     "confidence": "stated",
     "note": "\"Picking up right after the events of Brotherhood of the Blade in 1759\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Lord_John_series&oldid=1384393995"
     ]
    },
    "rel": {
     "date": "2007",
     "end": null,
     "src": "Lord John series",
     "note": "Wikipedia: \"published in the 2007 Delacorte Press collection Lord John and the Hand of Devils\" (publication_date = 2007)"
    }
   }
  ]
 },
 {
  "id": "the-custom-of-the-army",
  "title": "The Custom of the Army",
  "type": "novella",
  "wiki": "Lord John series",
  "continuity": "outlander-books",
  "studio": "tor-books",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "First published in the anthology Warriors; collected in A Trail of Fire (2012). Year-only release date.",
  "links": [
   {
    "to": "voyager-novel",
    "kind": "spinoff",
    "note": "Lord John series, set during Voyager (1756-1761)"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novella",
    "iu": {
     "y": 1759,
     "label": "1759",
     "precision": "year",
     "confidence": "stated",
     "note": "\"In 1759, Lord John finds himself both about to be promoted within His Majesty's Army and fresh from a gentlemen's duel\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Lord_John_series&oldid=1384393995"
     ]
    },
    "rel": {
     "date": "2010",
     "end": null,
     "src": "Lord John series",
     "note": "Wikipedia: \"first published in the 2010 Tor Books fantasy anthology Warriors\" (publication_date = 2010)"
    }
   }
  ]
 },
 {
  "id": "the-scottish-prisoner",
  "title": "The Scottish Prisoner",
  "type": "novel",
  "wiki": "Lord John series",
  "continuity": "outlander-books",
  "studio": "delacorte-press",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "pages = 560. Also features Jamie Fraser.",
  "links": [
   {
    "to": "lord-john-and-the-brotherhood-of-the-blade",
    "kind": "sequel",
    "note": "third Lord John novel"
   },
   {
    "to": "voyager-novel",
    "kind": "spinoff",
    "note": "set during Voyager; Jamie co-lead"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novel",
    "pages": 560,
    "iu": {
     "y": 1760,
     "label": "1760",
     "precision": "year",
     "confidence": "stated",
     "note": "\"In 1760, Lord John and Jamie Fraser are reunited again as Grey seeks Jamie's help investigating a conspiracy\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Lord_John_series&oldid=1384393995"
     ]
    },
    "rel": {
     "date": "2011-11-29",
     "end": null,
     "src": "Lord John series",
     "note": "Wikipedia: \"the 560-page The Scottish Prisoner, was published by Delacorte Press on November 29, 2011.\""
    }
   }
  ]
 },
 {
  "id": "lord-john-and-the-plague-of-zombies",
  "title": "Lord John and the Plague of Zombies",
  "type": "novella",
  "wiki": "Lord John series",
  "continuity": "outlander-books",
  "studio": "ace-books",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "First published in the anthology Down These Strange Streets; collected in A Trail of Fire (2012). Year-only release date.",
  "links": [
   {
    "to": "voyager-novel",
    "kind": "spinoff",
    "note": "Lord John series, set during Voyager (1756-1761)"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novella",
    "iu": {
     "y": 1761,
     "label": "1761",
     "precision": "year",
     "confidence": "stated",
     "note": "\"In 1761, Lord John is sent to Jamaica in command of a battalion to put down a slave rebellion\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Lord_John_series&oldid=1384393995"
     ]
    },
    "rel": {
     "date": "2011",
     "end": null,
     "src": "Lord John series",
     "note": "Wikipedia: \"first published in the 2011 Ace Books urban fantasy anthology Down These Strange Streets\" (publication_date = 2011)"
    }
   }
  ]
 },
 {
  "id": "besieged",
  "title": "Besieged",
  "type": "novella",
  "wiki": "Lord John series",
  "continuity": "outlander-books",
  "studio": "delacorte-press",
  "platform": "print-hardcover",
  "chars": [],
  "notes": "First published in Seven Stones to Stand or Fall (2017). Year-only release date.",
  "links": [
   {
    "to": "voyager-novel",
    "kind": "spinoff",
    "note": "Lord John series, set during Voyager (1756-1761)"
   }
  ],
  "units": [
   {
    "key": "",
    "label": "Novella",
    "iu": {
     "y": 1762,
     "label": "1762",
     "precision": "year",
     "confidence": "stated",
     "note": "\"In 1762, Lord John is set to step down as temporary military governor of Jamaica when he learns that his mother is in Havana\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Lord_John_series&oldid=1384393995"
     ]
    },
    "rel": {
     "date": "2017",
     "end": null,
     "src": "Lord John series",
     "note": "Wikipedia: \"The novella Besieged was first published in the 2017 Gabaldon collection Seven Stones to Stand or Fall.\" (publication_date = 2017)"
    }
   }
  ]
 },
 {
  "id": "outlander-tv",
  "title": "Outlander",
  "type": "series",
  "wiki": "Outlander (TV series)",
  "continuity": "outlander-tv",
  "studio": "sony-pictures-television",
  "platform": "starz",
  "chars": [],
  "notes": "101 episodes, 8 seasons, 2014-2026. Developed by Ronald D. Moore; Sony Pictures Television and Left Bank Pictures for Starz. Season articles redirect to the episode list, so release data comes from the list.",
  "links": [
   {
    "to": "outlander-novel",
    "kind": "adapts",
    "note": "s1 adapts Outlander; s2 Dragonfly in Amber; s3 Voyager; s4 Drums of Autumn; s5 The Fiery Cross (+ start of ABOSAA); s6 ABOSAA; s7 end of ABOSAA, Echo, WIMOHB, parts of Bees; s8 Bees + parts of unpublished book 10"
   },
   {
    "to": "dragonfly-in-amber",
    "kind": "adapts",
    "note": "season 2"
   },
   {
    "to": "voyager-novel",
    "kind": "adapts",
    "note": "season 3"
   },
   {
    "to": "drums-of-autumn",
    "kind": "adapts",
    "note": "season 4"
   },
   {
    "to": "the-fiery-cross",
    "kind": "adapts",
    "note": "season 5"
   },
   {
    "to": "a-breath-of-snow-and-ashes",
    "kind": "adapts",
    "note": "seasons 5-7"
   },
   {
    "to": "an-echo-in-the-bone",
    "kind": "adapts",
    "note": "season 7"
   },
   {
    "to": "written-in-my-own-hearts-blood",
    "kind": "adapts",
    "note": "season 7"
   },
   {
    "to": "go-tell-the-bees-that-i-am-gone",
    "kind": "adapts",
    "note": "seasons 7-8"
   }
  ],
  "units": [
   {
    "key": "s1",
    "label": "Season 1",
    "season": 1,
    "episodes": 16,
    "iu": {
     "y": 1743,
     "label": "1945 -> 1743",
     "precision": "year",
     "confidence": "stated",
     "note": "\"In 1945, Claire Randall, a former WWII combat nurse, is visiting Inverness\" / \"Claire is presented to Colum MacKenzie, laird of Castle Leoch, where she learns she has landed in 1743.\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=List_of_Outlander_episodes&oldid=1387588513"
     ]
    },
    "rel": {
     "date": "2014-08-09",
     "end": "2015-05-30",
     "src": "Outlander (TV series)",
     "note": "Wikipedia: List of Outlander episodes, series overview, season 1: \"episodes1 = 16 | 1A: 8 eps 2014-08-09 to 2014-09-27 | 1B: 8 eps 2015-04-04 to 2015-05-30\""
    }
   },
   {
    "key": "s2",
    "label": "Season 2",
    "season": 2,
    "episodes": 13,
    "iu": {
     "y": 1744,
     "y2": 1746,
     "label": "1744-1746 (frames 1948 and 1968)",
     "precision": "range",
     "confidence": "stated",
     "note": "\"Claire awakes at Craigh Na Dun in 1948.\" / \"In 1744, Claire and Jamie have settled in Paris\" / \"Before the battle of Culloden in 1746\" / \"In 1968, fifty-year-old Claire is reunited with ... Roger\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=List_of_Outlander_episodes&oldid=1387588513"
     ]
    },
    "rel": {
     "date": "2016-04-09",
     "end": "2016-07-09",
     "src": "Outlander (TV series)",
     "note": "Wikipedia: List of Outlander episodes, series overview, season 2: \"episodes2 = 13 | start2 = 2016-04-09 | end2 = 2016-07-09\""
    }
   },
   {
    "key": "s3",
    "label": "Season 3",
    "season": 3,
    "episodes": 13,
    "iu": {
     "y": 1746,
     "y2": 1766,
     "label": "1746-1766 (frames 1948-1968)",
     "precision": "range",
     "confidence": "stated",
     "note": "\"In 1746, Jamie finally kills Jack Randall at the battle of Culloden.\" / \"In 1948, a pregnant Claire moves to Boston\" / \"In Edinburgh in 1765, Claire finds Jamie in a print shop.\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=List_of_Outlander_episodes&oldid=1387588513"
     ]
    },
    "rel": {
     "date": "2017-09-10",
     "end": "2017-12-10",
     "src": "Outlander (TV series)",
     "note": "Wikipedia: List of Outlander episodes, series overview, season 3: \"episodes3 = 13 | start3 = 2017-09-10 | end3 = 2017-12-10\""
    }
   },
   {
    "key": "s4",
    "label": "Season 4",
    "season": 4,
    "episodes": 13,
    "iu": {
     "y": 1769,
     "label": "c. 1767-1770 (frames 1970-1971)",
     "precision": "year",
     "confidence": "inferred",
     "note": "\"Back in 1970, Brianna and Roger reunite\" / \"In 1971, Roger learns of Jamie and Claire's settlement in North Carolina\" / \"Brianna, having arrived in 1769, makes her way across Scotland\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=List_of_Outlander_episodes&oldid=1387588513"
     ]
    },
    "rel": {
     "date": "2018-11-04",
     "end": "2019-01-27",
     "src": "Outlander (TV series)",
     "note": "Wikipedia: List of Outlander episodes, series overview, season 4: \"episodes4 = 13 | start4 = 2018-11-04 | end4 = 2019-01-27\""
    }
   },
   {
    "key": "s5",
    "label": "Season 5",
    "season": 5,
    "episodes": 12,
    "iu": {
     "y": 1770,
     "y2": 1771,
     "label": "1770-1771",
     "precision": "range",
     "confidence": "stated",
     "note": "\"In 1770, Roger and Brianna are formally married\" / \"In May 1771, Jamie turns 50.\" / \"In August 1771, Roger ...\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=List_of_Outlander_episodes&oldid=1387588513"
     ]
    },
    "rel": {
     "date": "2020-02-16",
     "end": "2020-05-10",
     "src": "Outlander (TV series)",
     "note": "Wikipedia: List of Outlander episodes, series overview, season 5: \"episodes5 = 12 | start5 = 2020-02-16 | end5 = 2020-05-10\""
    }
   },
   {
    "key": "s6",
    "label": "Season 6",
    "season": 6,
    "episodes": 8,
    "iu": {
     "label": "after season 5 (A Breath of Snow and Ashes)",
     "precision": "relative",
     "confidence": "inferred",
     "note": "\"The sixth season of 8 episodes, based on A Breath of Snow and Ashes, aired from March to May 2022.\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Outlander_%28TV_series%29&oldid=1387711260"
     ]
    },
    "rel": {
     "date": "2022-03-06",
     "end": "2022-05-01",
     "src": "Outlander (TV series)",
     "note": "Wikipedia: List of Outlander episodes, series overview, season 6: \"episodes6 = 8 | start6 = 2022-03-06 | end6 = 2022-05-01\""
    }
   },
   {
    "key": "s7",
    "label": "Season 7",
    "season": 7,
    "episodes": 16,
    "iu": {
     "label": "American Revolution (c. 1776-1778); 1739 and 1978-1980 threads",
     "precision": "relative",
     "confidence": "inferred",
     "note": "\"In 1978, Brianna and Roger open a chest that has been in storage for 200 years.\" / \"Roger and Buck return through the stones to 1739, not 1778.\" / \"Henry Clinton's New Jersey camp\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=List_of_Outlander_episodes&oldid=1387588513"
     ]
    },
    "rel": {
     "date": "2023-06-16",
     "end": "2025-01-17",
     "src": "Outlander (TV series)",
     "note": "Wikipedia: List of Outlander episodes, series overview, season 7: \"episodes7 = 16 | 7A: 8 eps 2023-06-16 to 2023-08-11 | 7B: 8 eps 2024-11-22 to 2025-01-17\""
    }
   },
   {
    "key": "s8",
    "label": "Season 8",
    "season": 8,
    "episodes": 10,
    "iu": {
     "y": 1779,
     "label": "1779",
     "precision": "year",
     "confidence": "stated",
     "note": "\"In Savannah, Georgia 1779, at Fergus Fraser & Sons, Jamie warns about printing seditious pamphlets\" / \"during the Siege of Savannah\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=List_of_Outlander_episodes&oldid=1387588513"
     ]
    },
    "rel": {
     "date": "2026-03-06",
     "end": "2026-05-15",
     "src": "Outlander (TV series)",
     "note": "Wikipedia: List of Outlander episodes, series overview, season 8: \"episodes8 = 10 | start8 = 2026-03-06 | end8 = 2026-05-15\""
    }
   }
  ]
 },
 {
  "id": "outlander-blood-of-my-blood",
  "title": "Outlander: Blood of My Blood",
  "type": "series",
  "wiki": "Outlander: Blood of My Blood",
  "continuity": "outlander-tv",
  "studio": "starz",
  "platform": "starz",
  "chars": [],
  "notes": "Starz prequel; developer/showrunner Matthew B. Roberts. Renewed for season 2 in June 2025.",
  "links": [
   {
    "to": "outlander-tv",
    "kind": "spinoff",
    "note": "prequel series about Jamie's and Claire's parents"
   }
  ],
  "units": [
   {
    "key": "s1",
    "label": "Season 1",
    "season": 1,
    "episodes": 10,
    "iu": {
     "label": "18th-century Scotland (Jamie's parents) and World War I England (Claire's parents)",
     "precision": "relative",
     "confidence": "inferred",
     "note": "\"how the parents of Jamie Fraser came together in 18th century Scotland and how the parents of Claire Beauchamp met during World War I in England.\"",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Outlander%3A_Blood_of_My_Blood&oldid=1388259857"
     ]
    },
    "rel": {
     "date": "2025-08-08",
     "end": "2025-10-10",
     "src": "Outlander: Blood of My Blood",
     "note": "Wikipedia: Series overview: \"episodes1 = 10 | start1 = 2025-08-08 | end1 = 2025-10-10\""
    }
   },
   {
    "key": "s2",
    "label": "Season 2",
    "season": 2,
    "episodes": 10,
    "iu": {
     "label": "after season 1",
     "precision": "relative",
     "confidence": "inferred",
     "note": "No in-universe year in the sources.",
     "src": [
      "https://en.wikipedia.org/w/index.php?title=Outlander%3A_Blood_of_My_Blood&oldid=1388259857"
     ]
    },
    "rel": {
     "date": "2026-09-18",
     "end": "2026-11-27",
     "src": "Outlander: Blood of My Blood",
     "note": "Wikipedia: Series overview: \"episodes2 = 10 | start2 = 2026-09-18 | end2 = 2026-11-27\""
    }
   }
  ]
 }
];
