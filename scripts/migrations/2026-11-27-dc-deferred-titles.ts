// Migration (applied 2026-11-27), user question D-11 ("why deferred?"): add the DC titles deferred from the
// Stage 3 launch. Data: English Wikipedia via the MediaWiki API at the revisions recorded below (researched
// 2026-11-26); no fan wikis. Placement rules (DATA_NOTES "DC deferred titles"):
//  - Constantine (NBC) joins the Arrowverse on Earth-1, just before Arrow S4 (D-28). No in-universe year.
//  - Batman: Gotham Knight sits between Batman Begins and The Dark Knight ("specifically between …").
//  - Batman and Harley Quinn and Justice League vs. the Fatal Five join the DCAU as adjacent/disputed, unplaced.
//  - Pennyworth gets its own continuity linked to Gotham (D-27), Kite Man shares Harley Quinn's.
//  - Everything else gets its own continuity; one-off films go in a standalone collection.
// Release dates are US premieres. Years are only set where Wikipedia prose states them. Idempotent.
import { readFile, writeFile } from 'node:fs/promises';
import { ContinuitiesFile, PlatformsFile, TitlesFile, type Continuity, type Title, type Unit } from '../../src/domain/schema.ts';

/* eslint-disable @typescript-eslint/no-explicit-any */
const RAW: any[] = [
 {
  "id": "lucifer",
  "title": "Lucifer",
  "type": "series",
  "wiki_article": "Lucifer (TV series)",
  "season_source": {
   "article": "List of Lucifer episodes",
   "revid": 1378413855
  },
  "studio": "warner-bros-television",
  "studio_detail": "Jerry Bruckheimer Television, DC Entertainment, Warner Bros. Television",
  "platform": "fox",
  "continuity_proposal": "new own continuity \"lucifer\"",
  "continuity_quote": "Arrowverse: \"Lucifer (2016–2021 television series): Tom Ellis reprises his role as Lucifer Morningstar. This reality is designated Earth-666 in the pre-Crisis multiverse.\" Lucifer: \"Lucifer Morningstar makes a cameo appearance in The CW's Arrowverse crossover event \"Crisis on Infinite Earths\"\". This is a cameo designation, the same situation as Titans (Earth-9) and Doom Patrol, which the data keeps as separate continuities. Suggest a link to crisis-on-infinite-earths.",
  "seasons": [
   {
    "n": 1,
    "episodes": 13,
    "start": "2016-01-25",
    "end": "2016-04-25",
    "platform": "fox"
   },
   {
    "n": 2,
    "episodes": 18,
    "start": "2016-09-19",
    "end": "2017-05-29",
    "platform": "fox"
   },
   {
    "n": 3,
    "episodes": 26,
    "start": "2017-10-02",
    "end": "2018-05-28",
    "platform": "fox",
    "note": "24 episodes from 2017-10-02 to 2018-05-14, plus 2 episodes held back from season 3: \"both episodes were broadcast on Fox as a singular two-hour bonus episode on May 28\" (2018)."
   },
   {
    "n": 4,
    "episodes": 10,
    "start": "2019-05-08",
    "end": "2019-05-08",
    "platform": "netflix",
    "note": "all episodes released at once"
   },
   {
    "n": 5,
    "episodes": 16,
    "start": "2020-08-21",
    "end": "2021-05-28",
    "platform": "netflix",
    "note": "Part A (8 eps) released 2020-08-21; Part B (8 eps) released 2021-05-28"
   },
   {
    "n": 6,
    "episodes": 10,
    "start": "2021-09-10",
    "end": "2021-09-10",
    "platform": "netflix",
    "note": "all episodes released at once"
   }
  ],
  "in_universe": null,
  "notes": "Fox for seasons 1–3, then Netflix for seasons 4–6. 93 episodes in total (infobox).",
  "revid": 1387233057
 },
 {
  "id": "swamp-thing-2019",
  "title": "Swamp Thing",
  "type": "series",
  "wiki_article": "Swamp Thing (2019 TV series)",
  "studio": "warner-bros-television",
  "studio_detail": "Big Shoe Productions, Atomic Monster, DC Entertainment, Warner Bros. Television",
  "platform": "dc-universe-streaming",
  "continuity_proposal": "new own continuity \"swamp-thing-2019\"",
  "continuity_quote": "Swamp Thing (2019): \"The event depicts Swamp Thing as being set on the world of Earth-19.\" (Crisis on Infinite Earths, via archival footage); and \"Swamp Thing, as depicted in the series, makes a cameo appearance in the Titans episode \"Dude, Where's My Gar?\" via archival footage.\" These are archival cameos; no source merges the series into the Arrowverse or Titans.",
  "seasons": [
   {
    "n": 1,
    "episodes": 10,
    "start": "2019-05-31",
    "end": "2019-08-02",
    "platform": "dc-universe-streaming"
   }
  ],
  "in_universe": null,
  "notes": "One season. Candidate links: crisis-on-infinite-earths (cameo), titans (cameo). Unrelated to the upcoming DCU Swamp Thing film.",
  "revid": 1387254662
 },
 {
  "id": "krypton",
  "title": "Krypton",
  "type": "series",
  "wiki_article": "Krypton (TV series)",
  "studio": "warner-bros-television",
  "studio_detail": "Phantom Four Films, DC Entertainment, Warner Horizon Television",
  "platform": "syfy",
  "continuity_proposal": "new own continuity \"krypton\"",
  "continuity_quote": "No source read places it in any other continuity.",
  "seasons": [
   {
    "n": 1,
    "episodes": 10,
    "start": "2018-03-21",
    "end": "2018-05-23",
    "platform": "syfy"
   },
   {
    "n": 2,
    "episodes": 10,
    "start": "2019-06-12",
    "end": "2019-08-14",
    "platform": "syfy"
   }
  ],
  "in_universe": {
   "quote": "\"the series is set approximately 200 years before the birth of Superman and takes place on the eponymous fictional planet\""
  },
  "notes": "Relative placement only, with no calendar year. \"syfy\" is MISSING from data/registry/platforms.json. The article redirects from \"List of Krypton episodes\".",
  "revid": 1387228716
 },
 {
  "id": "pennyworth",
  "title": "Pennyworth",
  "type": "series",
  "wiki_article": "Pennyworth (TV series)",
  "studio": "warner-bros-television",
  "studio_detail": "Primrose Hill Productions, DC Entertainment, Warner Horizon Television (S1), Warner Bros. Television (S2–3)",
  "platform": "epix",
  "continuity_proposal": "existing \"gotham\" continuity, as a prequel placed before Gotham S1 (judgement call, see notes)",
  "continuity_quote": "Pennyworth: \"Jack Bannon stars as Pennyworth, a younger version of the iteration of the character previously portrayed by Sean Pertwee in Heller's and Cannon's Fox series Gotham (2014–2019), with the series serving as a prequel to both Gotham and V for Vendetta\". Gotham: \"A prequel series, Pennyworth, starring Jack Bannon as a younger version of the iteration of Alfred Pennyworth portrayed by Sean Pertwee in Gotham\". Premise: \"years before the events of Gotham\".",
  "seasons": [
   {
    "n": 1,
    "episodes": 10,
    "start": "2019-07-28",
    "end": "2019-09-29",
    "platform": "epix",
    "note": "\"The first episode was made available on July 21, 2019, to subscribers of Epix Now\""
   },
   {
    "n": 2,
    "episodes": 10,
    "start": "2020-12-13",
    "end": "2021-04-11",
    "platform": "epix",
    "note": "Part A (4 eps) 2020-12-13 to 2020-12-27; Part B (6 eps) 2021-03-07 to 2021-04-11"
   },
   {
    "n": 3,
    "episodes": 10,
    "start": "2022-10-06",
    "end": "2022-11-24",
    "platform": "max",
    "note": "HBO Max; marketed as \"Pennyworth: The Origin of Batman's Butler\""
   }
  ],
  "in_universe": {
   "quote": "\"an alternate history London, which combines aspects of the mid-1960s with invented events and practices inspired by V for Vendetta\" (no year is stated)"
  },
  "notes": "\"epix\" is MISSING from the platforms registry. Wikipedia calls it a prequel to Gotham, but it is set in an alternate-history London that is also a V for Vendetta prequel, so the user should decide (DECISIONS.md) between joining \"gotham\" and a separate continuity with a prequel link. Gotham in the data has no years, so a relative placement works either way.",
  "revid": 1387243474
 },
 {
  "id": "watchmen-2019",
  "title": "Watchmen",
  "type": "series",
  "wiki_article": "Watchmen (TV series)",
  "studio": "warner-bros-television",
  "studio_detail": "White Rabbit, Paramount Television, DC Entertainment, Warner Bros. Television",
  "platform": "hbo",
  "continuity_proposal": "new own continuity \"watchmen-hbo\", separate from the 2009 film",
  "continuity_quote": "\"The series is written as a sequel to the 1986 DC Comics series Watchmen\"; \"technically a sequel that takes place 34 years after the events of the comics within the same alternate reality\". It follows the comic, not Snyder's film (critics read the American Hero Story segments as a parody of the film, \"but Lindelof and Kassell asserted this was not their intent\").",
  "seasons": [
   {
    "n": 1,
    "episodes": 9,
    "start": "2019-10-20",
    "end": "2019-12-15",
    "platform": "hbo",
    "note": "limited series"
   }
  ],
  "in_universe": {
   "year": 2019,
   "quote": "\"The series is set in Tulsa, Oklahoma, in 2019, 34 years after the events of the comic series.\""
  },
  "notes": "Confidence \"stated\" for 2019.",
  "revid": 1387260066
 },
 {
  "id": "watchmen-2009",
  "title": "Watchmen",
  "type": "film",
  "wiki_article": "Watchmen (2009 film)",
  "studio": "warner-bros-pictures",
  "studio_detail": "Warner Bros. Pictures, Paramount Pictures, Legendary Pictures, DC Comics, Lawrence Gordon/Lloyd Levin Productions, Cruel and Unusual Films",
  "platform": "theatrical",
  "continuity_proposal": "new own continuity \"watchmen-2009\"",
  "continuity_quote": "No source read ties it to the HBO series or to the 2024 animated film.",
  "seasons": [],
  "release_date": "2009-03-06",
  "release_quote": "\"Following its world premiere at the Odeon Leicester Square in London on February 23, 2009, the film was released in the United States on March 6\"",
  "in_universe": {
   "year": 1985,
   "quote": "\"the film is set in an alternate history in the year 1985 at the height of the Cold War\"; Plot: \"In 1985, a man living in a Manhattan apartment...\""
  },
  "notes": "Absent from the data before. \"Watchmen (film)\" redirects to the disambiguation page \"Watchman\", so use \"Watchmen (2009 film)\". Director's cut July 2009; Ultimate Cut released November 10, 2009.",
  "revid": 1386908640
 },
 {
  "id": "constantine-2014",
  "title": "Constantine",
  "type": "series",
  "wiki_article": "Constantine (TV series)",
  "studio": "warner-bros-television",
  "studio_detail": "Ever After Productions, Phantom Four Films, Bonanza Productions, DC Entertainment, Warner Bros. Television",
  "platform": "nbc",
  "continuity_proposal": "existing \"arrowverse\" continuity, branch \"earth-1\"",
  "continuity_quote": "Constantine: \"Although the series was canceled after its first season, Ryan would reprise his role in the Arrowverse franchise, which retroactively established Constantine as part of the same continuity.\" Arrowverse (cast-table note): \"The Arrowverse version of the character is the same that had appeared in the NBC series.\" The Arrowverse infobox lists Constantine under \"Crossovers\".",
  "seasons": [
   {
    "n": 1,
    "episodes": 13,
    "start": "2014-10-24",
    "end": "2015-02-13",
    "platform": "nbc"
   }
  ],
  "in_universe": null,
  "notes": "Ordering evidence (not a date): Constantine then appears in Arrow S4 \"Haunted\"; the Legends of Tomorrow S3 appearance takes place \"chronologically after \"Haunted\"\". No in-universe year is stated, so the order is inferred. Branch \"earth-1\" is my inference, because Arrow and Legends are Earth-1 shows.",
  "revid": 1379405545
 },
 {
  "id": "teen-titans-2003",
  "title": "Teen Titans",
  "type": "animated-series",
  "wiki_article": "Teen Titans (TV series)",
  "season_source": {
   "article": "List of Teen Titans episodes",
   "revid": 1386644946
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation (credited as Warner Bros. Television Animation in eps 1–12); DC Comics (season 5)",
  "platform": "cartoon-network",
  "continuity_proposal": "new own continuity \"teen-titans-2003\"",
  "continuity_quote": "No source read places it in any other continuity. Teen Titans Go! vs. Teen Titans (2019) is a crossover film with Teen Titans Go!, so model it as a link.",
  "seasons": [
   {
    "n": 1,
    "episodes": 13,
    "start": "2003-07-19",
    "end": "2003-11-11"
   },
   {
    "n": 2,
    "episodes": 13,
    "start": "2004-01-10",
    "end": "2004-08-21"
   },
   {
    "n": 3,
    "episodes": 13,
    "start": "2004-08-28",
    "end": "2005-01-22"
   },
   {
    "n": 4,
    "episodes": 13,
    "start": "2005-01-17",
    "end": "2005-07-16"
   },
   {
    "n": 5,
    "episodes": 13,
    "start": "2005-09-24",
    "end": "2006-01-16"
   }
  ],
  "extra_units": [
   {
    "title": "Teen Titans: Trouble in Tokyo",
    "type": "tv-film",
    "release_date": "2006-09-15",
    "platform": "cartoon-network",
    "wiki_article": "Teen Titans: Trouble in Tokyo",
    "revid": 1384814955,
    "quote": "\"The series was concluded with a television movie titled Teen Titans: Trouble in Tokyo that premiered on September 15, 2006.\""
   },
   {
    "title": "The Lost Episode",
    "type": "special (online)",
    "release_date": "2005-01-03",
    "conflict": "The series overview says 2005-01-03, but the episode table on the same page says \"2005-01-10 (online) / February 6, 2007 (DVD)\"."
   }
  ],
  "in_universe": null,
  "notes": "Also aired on Kids' WB: \"began airing on Cartoon Network on July 19, 2003, and on Kids' WB on November 1\". In the source, S3 ends (2005-01-22) after S4 starts (2005-01-17).",
  "revid": 1387255614
 },
 {
  "id": "teen-titans-go",
  "title": "Teen Titans Go!",
  "type": "animated-series",
  "wiki_article": "Teen Titans Go!",
  "season_source": {
   "article": "List of Teen Titans Go! episodes",
   "revid": 1383922893
  },
  "studio": "warner-bros-animation",
  "studio_detail": "DC Entertainment, Warner Bros. Animation",
  "platform": "cartoon-network",
  "continuity_proposal": "new own continuity \"teen-titans-go\"",
  "continuity_quote": "No source read places it in any other continuity. Its crossovers with Young Justice (\"Let's Get Serious\") and Teen Titans (2003) are comedy crossovers; model them as links.",
  "seasons": [
   {
    "n": 1,
    "episodes": 52,
    "start": "2013-04-23",
    "end": "2014-06-05"
   },
   {
    "n": 2,
    "episodes": 52,
    "start": "2014-06-12",
    "end": "2015-07-30"
   },
   {
    "n": 3,
    "episodes": 53,
    "start": "2015-07-31",
    "end": "2016-10-13"
   },
   {
    "n": 4,
    "episodes": 52,
    "start": "2016-10-20",
    "end": "2018-06-25"
   },
   {
    "n": 5,
    "episodes": 52,
    "start": "2018-06-25",
    "end": "2020-04-04"
   },
   {
    "n": 6,
    "episodes": 52,
    "start": "2019-10-04",
    "end": "2021-05-01"
   },
   {
    "n": 7,
    "episodes": 52,
    "start": "2021-01-08",
    "end": "2022-09-16"
   },
   {
    "n": 8,
    "episodes": 42,
    "start": "2022-10-07",
    "end": "2024-11-30"
   },
   {
    "n": 9,
    "episodes": 52,
    "start": "2025-03-01",
    "end": "2026-11-28",
    "note": "The end date 2026-11-28 falls after today (2026-11-26), so it is a scheduled finale. Treat season 9 as still airing."
   }
  ],
  "extra_units": [
   {
    "title": "Teen Titans Go! To the Movies",
    "type": "film (theatrical)",
    "release_date": "2018-07-27",
    "quote": "\"A feature film, Teen Titans Go! To the Movies, was released in theaters on July 27, 2018.\""
   },
   {
    "title": "Teen Titans Go! vs. Teen Titans",
    "type": "animated-film (DTV)",
    "release_date": "2019-09-24",
    "wiki_article": "Teen Titans Go! vs. Teen Titans",
    "revid": 1382450478,
    "studio": "warner-bros-animation",
    "quote": "\"A second film titled Teen Titans Go! vs. Teen Titans was released directly to home media on September 24, 2019.\" (SDCC premiere 2019-07-21)"
   },
   {
    "title": "Teen Titans Go! See Space Jam",
    "type": "tv-film",
    "release_date": "2021-06-20",
    "quote": "\"aired on Cartoon Network on June 20, 2021\""
   },
   {
    "title": "Teen Titans Go! & DC Super Hero Girls: Mayhem in the Multiverse",
    "type": "animated-film (DTV)",
    "release_date": "2022-05-24",
    "quote": "\"was released directly to home media on May 24, 2022\""
   }
  ],
  "in_universe": null,
  "notes": "Ongoing: infobox num_seasons 9, num_episodes 456, last_aired \"present\"; \"A tenth season of the series is in development.\" The source shows the airing of S5/S6 and S6/S7 overlapping. Studios for To the Movies, See Space Jam and Mayhem were not checked.",
  "revid": 1387702737
 },
 {
  "id": "young-justice",
  "title": "Young Justice",
  "type": "animated-series",
  "wiki_article": "Young Justice (TV series)",
  "season_source": {
   "article": "List of Young Justice episodes",
   "revid": 1383594082
  },
  "studio": "warner-bros-animation",
  "studio_detail": "DC Entertainment, Warner Bros. Animation",
  "platform": "cartoon-network",
  "continuity_proposal": "new own continuity \"young-justice\" (Earth-16)",
  "continuity_quote": "\"Set within the DC Multiverse, specifically on Earth-16\"; Earth-16 was chosen for \"freeing the series and its franchise from established continuity restraints set by either the main DC Universe or other worlds in the Multiverse.\"",
  "seasons": [
   {
    "n": 1,
    "episodes": 26,
    "start": "2010-11-26",
    "end": "2012-04-21",
    "platform": "cartoon-network",
    "subtitle": "Young Justice"
   },
   {
    "n": 2,
    "episodes": 20,
    "start": "2012-04-28",
    "end": "2013-03-16",
    "platform": "cartoon-network",
    "subtitle": "Invasion"
   },
   {
    "n": 3,
    "episodes": 26,
    "start": "2019-01-04",
    "end": "2019-08-27",
    "platform": "dc-universe-streaming",
    "subtitle": "Outsiders",
    "note": "Part A (13 eps) 2019-01-04 to 2019-01-25; Part B (13 eps) 2019-07-02 to 2019-08-27"
   },
   {
    "n": 4,
    "episodes": 26,
    "start": "2021-10-16",
    "end": "2022-06-09",
    "platform": "max",
    "subtitle": "Phantoms",
    "note": "HBO Max. Part A (13 eps) 2021-10-16 to 2021-12-30; Part B (13 eps) 2022-03-31 to 2022-06-09"
   }
  ],
  "in_universe": {
   "quote": "\"each episode dated to reflect its place in the timeline\"; season 2 \"picks up five years after the first season ended\". The fetched sources give no calendar year."
  },
  "notes": "Relative placement only: S2 is S1 + 5 years (stated). Not cancelled, but \"no new season has been greenlit\".",
  "revid": 1387263122
 },
 {
  "id": "harley-quinn-2019",
  "title": "Harley Quinn",
  "type": "animated-series",
  "wiki_article": "Harley Quinn (TV series)",
  "season_source": {
   "article": "List of Harley Quinn episodes",
   "revid": 1367120548
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Yes, Norman Productions, Ehsugadee Productions, Delicious Non-Sequitur, Lorey Stories, DC Entertainment, DC Studios, Warner Bros. Animation",
  "platform": "dc-universe-streaming",
  "continuity_proposal": "new own continuity \"harley-quinn-animated\", shared with Kite Man: Hell Yeah!",
  "continuity_quote": "No source read places it in any other continuity. Kite Man: Hell Yeah!: \"The series serves as a spin-off of Harley Quinn\".",
  "seasons": [
   {
    "n": 1,
    "episodes": 13,
    "start": "2019-11-29",
    "end": "2020-02-21",
    "platform": "dc-universe-streaming"
   },
   {
    "n": 2,
    "episodes": 13,
    "start": "2020-04-03",
    "end": "2020-06-26",
    "platform": "dc-universe-streaming"
   },
   {
    "n": 3,
    "episodes": 10,
    "start": "2022-07-28",
    "end": "2022-09-15",
    "platform": "max",
    "note": "HBO Max"
   },
   {
    "n": 4,
    "episodes": 10,
    "start": "2023-07-27",
    "end": "2023-09-14",
    "platform": "max"
   },
   {
    "n": 5,
    "episodes": 10,
    "start": "2025-01-16",
    "end": "2025-03-20",
    "platform": "max"
   }
  ],
  "extra_units": [
   {
    "title": "Harley Quinn: A Very Problematic Valentine's Day Special",
    "type": "special",
    "release_date": "2023-02-09",
    "platform": "max",
    "quote": "\"A standalone holiday-themed special episode premiered on February 9, 2023.\""
   }
  ],
  "in_universe": null,
  "notes": "No season 6 renewal is stated; there are only Lorey interviews from March 2025 about a \"hypothetical season 6\".",
  "revid": 1387217945
 },
 {
  "id": "kite-man-hell-yeah",
  "title": "Kite Man: Hell Yeah!",
  "type": "animated-series",
  "wiki_article": "Kite Man: Hell Yeah!",
  "studio": "warner-bros-animation",
  "studio_detail": "Delicious Non-Sequitur, Yes, Norman Productions, Lorey Stories, DC Entertainment, Warner Bros. Animation",
  "platform": "max",
  "continuity_proposal": "same continuity as Harley Quinn (2019), \"harley-quinn-animated\"",
  "continuity_quote": "\"The series serves as a spin-off of Harley Quinn, where Kite Man was featured as a supporting character and ex-fiancé to Poison Ivy.\"",
  "seasons": [
   {
    "n": 1,
    "episodes": 10,
    "start": "2024-07-18",
    "end": "2024-09-12",
    "platform": "max"
   }
  ],
  "in_universe": null,
  "notes": "No source places it relative to the Harley Quinn seasons; order by release unless a source says otherwise.",
  "revid": 1387228333
 },
 {
  "id": "batman-the-brave-and-the-bold",
  "title": "Batman: The Brave and the Bold",
  "type": "animated-series",
  "wiki_article": "Batman: The Brave and the Bold",
  "season_source": {
   "article": "List of Batman: The Brave and the Bold episodes",
   "revid": 1379690670
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation; DC Comics (S1); DC Entertainment (S2–3)",
  "platform": "cartoon-network",
  "continuity_proposal": "new own continuity \"batman-brave-and-the-bold\"",
  "continuity_quote": "No source read places it in any other continuity.",
  "seasons": [
   {
    "n": 1,
    "episodes": 26,
    "start": "2008-11-14",
    "end": "2009-11-13"
   },
   {
    "n": 2,
    "episodes": 26,
    "start": "2009-11-20",
    "end": "2011-04-08"
   },
   {
    "n": 3,
    "episodes": 13,
    "start": "2011-03-25",
    "end": "2011-11-18"
   }
  ],
  "extra_units": [
   {
    "title": "Scooby-Doo! & Batman: The Brave and the Bold",
    "type": "animated-film (DTV)",
    "release_date": "2018-01-06",
    "quote": "Episode list page, \"Film (2018)\": OriginalAirDate 2018-01-06; \"This film is a crossover with the Scooby-Doo franchise.\""
   }
  ],
  "in_universe": null,
  "notes": "In the source, S2 ends (2011-04-08) after S3 starts (2011-03-25). Unrelated to the upcoming DCU film The Brave and the Bold.",
  "revid": 1387191734
 },
 {
  "id": "beware-the-batman",
  "title": "Beware the Batman",
  "type": "animated-series",
  "wiki_article": "Beware the Batman",
  "studio": "warner-bros-animation",
  "studio_detail": "DC Entertainment, Warner Bros. Animation",
  "platform": "cartoon-network",
  "continuity_proposal": "new own continuity \"beware-the-batman\"",
  "continuity_quote": "No source read places it in any other continuity.",
  "seasons": [
   {
    "n": 1,
    "episodes": 26,
    "start": "2013-07-13",
    "end": "2014-09-28",
    "platform": "cartoon-network",
    "platform_2": "adult-swim",
    "note": "11 eps on Cartoon Network from 2013-07-13 to 2013-10-05. The other 15 aired on Adult Swim's Toonami: \"the remaining episodes of the series began to air on Adult Swim's Toonami programming block, from July 27 to September 28, 2014\". The last 7 episode rows all read 2014-09-28. Conflict: the production section says \"Toonami first aired the series on May 11, 2014\"."
   }
  ],
  "in_universe": null,
  "notes": "\"adult-swim\" is MISSING from the platforms registry. The 11/15 split is counted from the episode-table dates.",
  "revid": 1387193009
 },
 {
  "id": "justice-league-action",
  "title": "Justice League Action",
  "type": "animated-series",
  "wiki_article": "Justice League Action",
  "studio": "warner-bros-animation",
  "studio_detail": "DC Entertainment, Warner Bros. Animation",
  "platform": "cartoon-network",
  "continuity_proposal": "new own continuity \"justice-league-action\"",
  "continuity_quote": "No source read places it in any other continuity.",
  "seasons": [
   {
    "n": 1,
    "episodes": 52,
    "start": "2016-12-16",
    "end": "2018-06-03",
    "platform": "cartoon-network",
    "note": "\"The show debuted on Cartoon Network UK on November 26, 2016, and premiered in the United States on Cartoon Network on December 16 the same year.\" The final episode \"She Wore Red Velvet\" aired in Poland on 2017-12-17 and in the US on 2018-06-03."
   }
  ],
  "extra_units": [
   {
    "title": "Justice League Action Shorts",
    "type": "shorts",
    "episodes": 22,
    "release_date": "2017-06-29",
    "end_date": "2017-12-21"
   }
  ],
  "in_universe": null,
  "notes": "One season (\"The first season concluded on June 3, 2018, marking an end to the series\").",
  "revid": 1387226933
 },
 {
  "id": "creature-commandos",
  "title": "Creature Commandos",
  "type": "animated-series",
  "wiki_article": "Creature Commandos (TV series)",
  "studio": "dc-studios",
  "studio_detail": "Troll Court Entertainment, The Safran Company, Lorey Stories, DC Studios, Warner Bros. Animation",
  "platform": "max",
  "already_present": true,
  "continuity_proposal": "ALREADY PRESENT in data/dc/titles.json as \"creature-commandos\" (continuity dcu). Do not add it again.",
  "continuity_quote": "\"It is the first entry in the DCU's Chapter One: Gods and Monsters.\"",
  "seasons": [
   {
    "n": 1,
    "episodes": 7,
    "start": "2024-12-05",
    "end": "2025-01-09",
    "platform": "max"
   }
  ],
  "in_universe": null,
  "notes": "The existing S1 unit matches the source. Season 2 is greenlit but undated: \"it was announced that Max had greenlit a second season in December 2024\"; Gunn said in January 2026 \"it would take place after the events of the second season of Peacemaker (2025)\", and in October 2026 confirmed \"the season will release in HBO Max after Man of Tomorrow (2027) comes out in theaters\". An undated, announced S2 unit could be added (placed after peacemaker-dcu S2).",
  "revid": 1387201223
 },
 {
  "id": "superman-doomsday",
  "title": "Superman: Doomsday",
  "type": "animated-film",
  "wiki_article": "Superman: Doomsday",
  "revid": 1381264867,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 1,
   "list_date": "September 21, 2007",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2007-09-18",
  "infobox_released": "{{Film date|2007|07|26|[[San Diego Comic-Con]]|2007|09|18|Home video}}",
  "in_universe": null,
  "conflict": "List: September 21, 2007. Article: \"released on DVD and Blu-Ray September 18, 2007, by Warner Home Video\" (SDCC screening 2007-07-26). Using the article date.",
  "notes": ""
 },
 {
  "id": "justice-league-the-new-frontier",
  "title": "Justice League: The New Frontier",
  "type": "animated-film",
  "wiki_article": "Justice League: The New Frontier",
  "revid": 1382159216,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 2,
   "list_date": "February 26, 2008",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Premiere DC Comics Warner Bros. Animation Animation outsourced to Dong Woo Animation",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2008-02-26",
  "infobox_released": "{{Film date|2008|2|26}}",
  "in_universe": {
   "confidence": "inferred",
   "quote": "Categories only: \"Films set in 1953 … 1960\"."
  },
  "notes": ""
 },
 {
  "id": "batman-gotham-knight",
  "title": "Batman: Gotham Knight",
  "type": "animated-film",
  "wiki_article": "Batman: Gotham Knight",
  "revid": 1379110953,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 3,
   "list_date": "July 8, 2008",
   "list_continuity": "The Dark Knight trilogy"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation, DC Comics, Studio 4°C, Production I.G, Bee Train, Madhouse (Warner Premiere label)",
  "platform": "home-media",
  "continuity_proposal": "nolan-dark-knight",
  "continuity_quote": "Article: \"Set within The Dark Knight trilogy, specifically between Batman Begins and The Dark Knight\". The list's Continuity column also says \"The Dark Knight trilogy\".",
  "seasons": [],
  "release_date": "2008-07-08",
  "infobox_released": "{{Film date|2008|7|8}}",
  "in_universe": {
   "quote": "\"specifically between Batman Begins and The Dark Knight\" (relative)"
  },
  "notes": ""
 },
 {
  "id": "wonder-woman-2009-animated",
  "title": "Wonder Woman",
  "type": "animated-film",
  "wiki_article": "Wonder Woman (2009 film)",
  "revid": 1383253747,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 4,
   "list_date": "March 3, 2009",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Premiere DC Comics Warner Bros. Animation",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2009-03-03",
  "infobox_released": "{{Film date|2009|3|3}}",
  "in_universe": null,
  "notes": ""
 },
 {
  "id": "green-lantern-first-flight",
  "title": "Green Lantern: First Flight",
  "type": "animated-film",
  "wiki_article": "Green Lantern: First Flight",
  "revid": 1378617229,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 5,
   "list_date": "July 28, 2009",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation Warner Premiere DC Comics Telecom Animation Film (Animation services)",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2009-07-28",
  "infobox_released": "{{Film date|2009|07|28}}",
  "in_universe": null,
  "notes": ""
 },
 {
  "id": "superman-batman-public-enemies",
  "title": "Superman/Batman: Public Enemies",
  "type": "animated-film",
  "wiki_article": "Superman/Batman: Public Enemies",
  "revid": 1370125915,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 6,
   "list_date": "September 29, 2009",
   "list_continuity": "Superman/Batman"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation Warner Premiere DC Entertainment Lotto Animation (Animation services)",
  "platform": "home-media",
  "continuity_proposal": "new \"superman-batman-dtv\" (with Apocalypse)",
  "continuity_quote": "List Continuity column: \"Superman/Batman\". Apocalypse article: \"is a standalone sequel to Superman/Batman: Public Enemies (2009)\".",
  "seasons": [],
  "release_date": "2009-09-29",
  "infobox_released": "{{Film date|2009|9|29|ref1=}}",
  "in_universe": null,
  "notes": ""
 },
 {
  "id": "justice-league-crisis-on-two-earths",
  "title": "Justice League: Crisis on Two Earths",
  "type": "animated-film",
  "wiki_article": "Justice League: Crisis on Two Earths",
  "revid": 1381032477,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 7,
   "list_date": "February 23, 2010",
   "list_continuity": "Crisis on Two Earths / Doom"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation Warner Premiere DC Entertainment",
  "platform": "home-media",
  "continuity_proposal": "new \"crisis-on-two-earths-doom\" (with Doom)",
  "continuity_quote": "List Continuity column: \"Crisis on Two Earths / Doom\". Doom article: \"A standalone sequel to Justice League: Crisis on Two Earths (2010)\".",
  "seasons": [],
  "release_date": "2010-02-23",
  "infobox_released": "{{Film date|2010|2|23}}",
  "in_universe": null,
  "notes": ""
 },
 {
  "id": "batman-under-the-red-hood",
  "title": "Batman: Under the Red Hood",
  "type": "animated-film",
  "wiki_article": "Batman: Under the Red Hood",
  "revid": 1372789295,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 8,
   "list_date": "July 7, 2010",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Premiere DC Entertainment Warner Bros. Animation",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2010-07-27",
  "infobox_released": "{{Film date|2010|07|27}}",
  "in_universe": null,
  "conflict": "List: July 7, 2010. Article: \"Batman: Under the Red Hood was released on July 27, 2010\" (and the infobox says 2010-07-27). Using the article date.",
  "notes": ""
 },
 {
  "id": "superman-batman-apocalypse",
  "title": "Superman/Batman: Apocalypse",
  "type": "animated-film",
  "wiki_article": "Superman/Batman: Apocalypse",
  "revid": 1379023967,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 9,
   "list_date": "September 28, 2010",
   "list_continuity": "Superman/Batman"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Premiere DC Entertainment Warner Bros. Animation MOI Animation (animation services)",
  "platform": "home-media",
  "continuity_proposal": "new \"superman-batman-dtv\" (with Public Enemies)",
  "continuity_quote": "\"a standalone sequel to Superman/Batman: Public Enemies (2009)\"",
  "seasons": [],
  "release_date": "2010-09-28",
  "infobox_released": "{{Film date|2010|09|28}}",
  "in_universe": null,
  "notes": ""
 },
 {
  "id": "all-star-superman",
  "title": "All-Star Superman",
  "type": "animated-film",
  "wiki_article": "All-Star Superman (film)",
  "revid": 1383591945,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 10,
   "list_date": "February 22, 2011",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Premiere DC Entertainment Warner Bros. Animation",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2011-02-22",
  "infobox_released": "{{Film date|2011|02|22}}",
  "in_universe": null,
  "notes": ""
 },
 {
  "id": "green-lantern-emerald-knights",
  "title": "Green Lantern: Emerald Knights",
  "type": "animated-film",
  "wiki_article": "Green Lantern: Emerald Knights",
  "revid": 1381026993,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 11,
   "list_date": "July 7, 2011",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Premiere DC Entertainment Warner Bros. Animation",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2011-06-07",
  "infobox_released": "{{Film date|2011|6|7}}",
  "in_universe": null,
  "conflict": "List: July 7, 2011. Article: \"It was released on June 7, 2011.\" (and the infobox says 2011-06-07). Using the article date.",
  "notes": "Article: \"While not a direct sequel to First Flight, the film uses the same character designs.\" Keep the films separate."
 },
 {
  "id": "batman-year-one-animated",
  "title": "Batman: Year One",
  "type": "animated-film",
  "wiki_article": "Batman: Year One (film)",
  "revid": 1368900628,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 12,
   "list_date": "October 18, 2011",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Premiere DC Entertainment Warner Bros. Animation MOI Animation (Animation services)",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2011-10-18",
  "infobox_released": "{{Film date|2011|10|18}}",
  "in_universe": {
   "year": 1987,
   "confidence": "inferred",
   "quote": "Only from Wikipedia categories \"Films set in 1970\" and \"Films set in 1987\"; no prose statement."
  },
  "notes": "Article revision 1387467740 edit summary: \"Batman: Year One and Dark Knight Returns movies aren't in the same continuity\" (citing dc.com). Keep them separate."
 },
 {
  "id": "justice-league-doom",
  "title": "Justice League: Doom",
  "type": "animated-film",
  "wiki_article": "Justice League: Doom",
  "revid": 1370256552,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 13,
   "list_date": "February 28, 2012",
   "list_continuity": "Crisis on Two Earths / Doom"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation Warner Premiere DC Entertainment",
  "platform": "home-media",
  "continuity_proposal": "new \"crisis-on-two-earths-doom\" (with Crisis on Two Earths)",
  "continuity_quote": "\"A standalone sequel to Justice League: Crisis on Two Earths (2010)\"",
  "seasons": [],
  "release_date": "2012-02-28",
  "infobox_released": "{{Film date|2012|02|28}}",
  "in_universe": null,
  "notes": ""
 },
 {
  "id": "superman-vs-the-elite",
  "title": "Superman vs. The Elite",
  "type": "animated-film",
  "wiki_article": "Superman vs. The Elite",
  "revid": 1381032508,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 14,
   "list_date": "June 12, 2012",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Premiere DC Entertainment Warner Bros. Animation",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2012-06-12",
  "infobox_released": "{{Film date|2012|6|12}}",
  "in_universe": null,
  "notes": ""
 },
 {
  "id": "batman-the-dark-knight-returns-animated",
  "title": "Batman: The Dark Knight Returns",
  "type": "animated-film",
  "wiki_article": "Batman: The Dark Knight Returns (film)",
  "revid": 1376439535,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 15,
   "list_date": "September 25, 2012",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Premiere DC Entertainment Warner Bros. Animation MOI Animation (Animation services)",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2012-09-25",
  "parts": [
   {
    "part": 1,
    "release_date": "2012-09-25"
   },
   {
    "part": 2,
    "release_date": "2013-01-29"
   }
  ],
  "infobox_released": "{{Film date|2012|09|25|Part 1|2013|01|29|Part 2|2013|10|08|Deluxe Edition}}",
  "in_universe": {
   "year": 1986,
   "confidence": "inferred",
   "quote": "Only from Wikipedia categories \"Films set in 1938\" (flashback) and \"Films set in 1986\"; no prose statement."
  },
  "notes": "One title with 2 units (as with Long Halloween). Deluxe Edition 2013-10-08."
 },
 {
  "id": "superman-unbound",
  "title": "Superman: Unbound",
  "type": "animated-film",
  "wiki_article": "Superman: Unbound",
  "revid": 1379023660,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 17,
   "list_date": "May 7, 2013",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Premiere <br /> Warner Bros. Animation <br /> DC Entertainment",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2013-05-07",
  "infobox_released": "{{Film date|2013|05|07}}",
  "in_universe": null,
  "notes": ""
 },
 {
  "id": "batman-assault-on-arkham",
  "title": "Batman: Assault on Arkham",
  "type": "animated-film",
  "wiki_article": "Batman: Assault on Arkham",
  "revid": 1373272659,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 21,
   "list_date": "July 29, 2014",
   "list_continuity": "Arkhamverse"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation DC Entertainment MOI Animation (Animation services)",
  "platform": "home-media",
  "continuity_proposal": "new \"arkhamverse\" (only screen entry; the games are out of scope)",
  "continuity_quote": "\"Assault on Arkham was announced as being set in the universe of the Batman: Arkham video game franchise, taking place after Arkham Origins, and two years before Arkham Asylum according to Jay Oliva.\" But: \"the 2024 video game Suicide Squad: Kill the Justice League ... directly conflicts with the continuity elements of the film.\" Mark it disputed.",
  "seasons": [],
  "release_date": "2014-07-29",
  "infobox_released": "{{Film date|2014|07|25|[[San Diego Comic-Con|San Diego]]|2014|07|29|Digital|2014|08|12|Physical}}",
  "in_universe": null,
  "notes": "Release: SDCC 2014-07-25, digital 2014-07-29, physical 2014-08-12."
 },
 {
  "id": "justice-league-gods-and-monsters",
  "title": "Justice League: Gods and Monsters",
  "type": "animated-film",
  "wiki_article": "Justice League: Gods and Monsters",
  "revid": 1379323863,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 24,
   "list_date": "July 28, 2015",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation | DC Entertainment |MOI Animation (Animation services)",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2015-07-28",
  "infobox_released": "{{Film date|2015|07|21|Digital|2015|07|28|Physical}}",
  "in_universe": null,
  "notes": "Digital 2015-07-21, physical 2015-07-28 (infobox). The list uses the physical date."
 },
 {
  "id": "batman-the-killing-joke-animated",
  "title": "Batman: The Killing Joke",
  "type": "animated-film",
  "wiki_article": "Batman: The Killing Joke (film)",
  "revid": 1364789526,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 27,
   "list_date": "July 22, 2016",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "DC Entertainment Warner Bros. Animation The Answer Studio",
  "platform": "theatrical",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2016-07-25",
  "infobox_released": "{{Film date|2016|7|22|[[San Diego Comic-Con]]|2016|7|25|United States}}",
  "in_universe": null,
  "conflict": "List: July 22, 2016 (the SDCC premiere). Article: \"released simultaneously in theaters and digitally on July 25, 2016\"; the Release section also says \"released digitally on July 26, 2016\" (an internal conflict). Using 2016-07-25.",
  "notes": ""
 },
 {
  "id": "batman-and-harley-quinn",
  "title": "Batman and Harley Quinn",
  "type": "animated-film",
  "wiki_article": "Batman and Harley Quinn",
  "revid": 1379224633,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 30,
   "list_date": "August 15, 2017",
   "list_continuity": "DCAU"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation <br /> DC Entertainment <br/> DR Movie (Animation services)",
  "platform": "home-media",
  "continuity_proposal": "dcau (disputed)",
  "continuity_quote": "Article: \"a successor to the TV shows Batman: The Animated Series and The New Batman Adventures\"; also: \"it is its own thing, kind of extrapolated.\" The list Continuity column says \"DCAU\", and the article is in \"Category:DC Animated Universe films\".",
  "seasons": [],
  "release_date": "2017-08-15",
  "infobox_released": "{{Film date|2017|7|21|[[San Diego Comic-Con]]|2017|8|14}}",
  "in_universe": {
   "confidence": "inferred",
   "quote": "Category \"Films set in 2005\" only."
  },
  "conflict": "Article: SDCC premiere July 21; \"released into participating theaters for one night only on August 14\"; \"released on digital on August 15\"; DVD/Blu-ray August 29. The list says August 15.",
  "notes": ""
 },
 {
  "id": "batman-gotham-by-gaslight",
  "title": "Batman: Gotham by Gaslight",
  "type": "animated-film",
  "wiki_article": "Batman: Gotham by Gaslight",
  "revid": 1384982916,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 31,
   "list_date": "January 23, 2018",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation <br /> DC Entertainment <br/> The Answer Studio (Animation services)",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2018-01-23",
  "infobox_released": "{{Film date|2018|1|12|[[Newseum]]|2018|1|23|Digital Download|2018|2|6|Blu-ray}}",
  "in_universe": null,
  "notes": "Newseum premiere 2018-01-12; digital 2018-01-23 (the list date); Blu-ray 2018-02-06."
 },
 {
  "id": "justice-league-vs-the-fatal-five",
  "title": "Justice League vs. the Fatal Five",
  "type": "animated-film",
  "wiki_article": "Justice League vs. the Fatal Five",
  "revid": 1380613804,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 36,
   "list_date": "March 30, 2019",
   "list_continuity": "DCAU"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation DC Entertainment",
  "platform": "home-media",
  "continuity_proposal": "dcau (disputed)",
  "continuity_quote": "\"While its canonicity with the DC Animated Universe (DCAU) is open-ended, executive producer Bruce Timm considers the film to be canon.\" The list Continuity column says \"DCAU\".",
  "seasons": [],
  "release_date": "2019-03-30",
  "infobox_released": "{{Film date|2019|3|29|[[WonderCon]] Anaheim|ref1=|2019|03|30|ref2=}}",
  "in_universe": {
   "confidence": "inferred",
   "quote": "Categories \"Films set in 2004\" and \"Films set in the 31st century\" only."
  },
  "notes": "WonderCon premiere 2019-03-29; release 2019-03-30."
 },
 {
  "id": "superman-red-son",
  "title": "Superman: Red Son",
  "type": "animated-film",
  "wiki_article": "Superman: Red Son (film)",
  "revid": 1386590955,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 39,
   "list_date": "February 25, 2020",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation DC Entertainment",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2020-02-25",
  "infobox_released": "{{film date|2020|2|25}}",
  "in_universe": {
   "confidence": "inferred",
   "quote": "Categories only: \"Films set in 1946, 1955, 1961, 1966, 1967, 1983\" (spans decades)."
  },
  "notes": ""
 },
 {
  "id": "batman-soul-of-the-dragon",
  "title": "Batman: Soul of the Dragon",
  "type": "animated-film",
  "wiki_article": "Batman: Soul of the Dragon",
  "revid": 1375266852,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 42,
   "list_date": "January 12, 2021",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation | DC Entertainment | Studio Mir (animation services)",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2021-01-12",
  "infobox_released": "{{Film date|2021|01|12}}",
  "in_universe": {
   "quote": "\"an original story not based on any comic, set in the 1970s\" (decade only; no year)"
  },
  "notes": ""
 },
 {
  "id": "injustice-2021",
  "title": "Injustice",
  "type": "animated-film",
  "wiki_article": "Injustice (2021 film)",
  "revid": 1387910964,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 46,
   "list_date": "October 19, 2021",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation DC Entertainment NetherRealm Studios",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2021-10-19",
  "infobox_released": "{{Film date|2021|10|19}}",
  "in_universe": null,
  "notes": ""
 },
 {
  "id": "catwoman-hunted",
  "title": "Catwoman: Hunted",
  "type": "animated-film",
  "wiki_article": "Catwoman: Hunted",
  "revid": 1372207503,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 47,
   "list_date": "February 8, 2022",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation DC Entertainment OLM Team Inoue (animation services)",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2022-02-08",
  "infobox_released": "{{Film date|2022|2|8}}",
  "in_universe": null,
  "notes": ""
 },
 {
  "id": "batman-and-superman-battle-of-the-super-sons",
  "title": "Batman and Superman: Battle of the Super Sons",
  "type": "animated-film",
  "wiki_article": "Batman and Superman: Battle of the Super Sons",
  "revid": 1359139773,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 49,
   "list_date": "October 18, 2022",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation | DC Entertainment | Studio Mir (animation services)",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2022-10-18",
  "infobox_released": "{{Film date|2022|10|07|[[New York Comic Con|NYCC]]|2022|10|18|Video}}",
  "in_universe": null,
  "notes": "NYCC premiere 2022-10-07; video 2022-10-18."
 },
 {
  "id": "batman-the-doom-that-came-to-gotham",
  "title": "Batman: The Doom That Came to Gotham",
  "type": "animated-film",
  "wiki_article": "Batman: The Doom That Came to Gotham (film)",
  "revid": 1379579541,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 51,
   "list_date": "March 28, 2023",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation | DC Entertainment",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2023-03-28",
  "infobox_released": "{{Film date|2023|03|28}}",
  "in_universe": {
   "confidence": "inferred",
   "quote": "Category \"Films set in the 1920s\" only."
  },
  "notes": ""
 },
 {
  "id": "watchmen-2024",
  "title": "Watchmen",
  "type": "animated-film",
  "wiki_article": "Watchmen (2024 film)",
  "revid": 1387816814,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 56,
   "list_date": "August 13, 2024",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Paramount Animation, Warner Bros. Animation, DC Entertainment",
  "platform": "home-media",
  "continuity_proposal": "new own continuity \"watchmen-2024\" (separate from watchmen-2009 and watchmen-hbo; no source links them)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2024-08-13",
  "parts": [
   {
    "part": 1,
    "label": "Chapter I",
    "release_date": "2024-08-13"
   },
   {
    "part": 2,
    "label": "Chapter II",
    "release_date": "2024-11-26"
   }
  ],
  "infobox_released": "{{Film date|2024|08|13|''Chapter I''|2024|11|26|''Chapter II''}}",
  "in_universe": null,
  "conflict": "The list numbers the chapters 56 and 57; the article lead says \"Chapter I is the 57th film, and Chapter II is the 58th film\".",
  "notes": ""
 },
 {
  "id": "aztec-batman-clash-of-empires",
  "title": "Aztec Batman: Clash of Empires",
  "type": "animated-film",
  "wiki_article": "Aztec Batman: Clash of Empires",
  "revid": 1369061750,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 58,
   "list_date": "September 19, 2025",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation, DC Entertainment, Ánima, Chatrone, Particular Crowd",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2025-09-19",
  "infobox_released": "{{Film date|2025|09|18|Mexico|2025|09|19|United States}}",
  "in_universe": null,
  "notes": "Infobox: Mexico 2025-09-18 (Cinépolis Distribución); United States 2025-09-19."
 },
 {
  "id": "batman-knightfall-animated",
  "title": "Batman: Knightfall",
  "type": "animated-film",
  "wiki_article": "Batman: Knightfall (film)",
  "revid": 1387824425,
  "list_source": {
   "article": "DC Universe Animated Original Movies",
   "revid": 1388055290,
   "list_no": 59,
   "list_date": "August 25, 2026",
   "list_continuity": "Standalone"
  },
  "studio": "warner-bros-animation",
  "studio_detail": "Warner Bros. Animation DC Entertainment",
  "platform": "home-media",
  "continuity_proposal": "standalone, in a new \"dc-animated-standalone\" collection (one continuity per film)",
  "continuity_quote": "List \"Continuity\" column: \"Standalone\". The list article says: \"In terms of continuity, the films are usually stand-alone\" (that sentence is tagged citation needed).",
  "seasons": [],
  "release_date": "2026-08-25",
  "parts": [
   {
    "part": 1,
    "label": "Part 1: Knightfall",
    "release_date": "2026-08-25"
   },
   {
    "part": 2,
    "label": "Part 2: Knightquest",
    "release_date": "2026-12-15",
    "status": "upcoming"
   },
   {
    "part": 3,
    "label": "Part 3: KnightsEnd",
    "release_date": null,
    "year": 2027,
    "status": "upcoming"
   }
  ],
  "status": "partly released",
  "infobox_released": "{{Film date|2026|06|23|[[2026 Annecy International Animation Film Festival|Annecy]]; ''Part 1''|2026|08|25|''Part 1''|2026|12|15|''Part 2''|2027|||''Part 3''}}",
  "in_universe": null,
  "conflict": "Part 2: the list says December 8, 2026, but the article says \"Part 2: Knightquest is planned to release later on December 15, 2026\" (and its infobox agrees). Using the article date. Edit 1380303499 changed the list to show \"a maintained continuity rather than three separate standalone films\", but the current list again says \"Standalone\" for each part: one title, 3 units.",
  "notes": "Annecy premiere of Part 1 2026-06-23; digital 2026-08-25; physical 2026-09-08."
 }
];
const TODAY = process.env.TIMELINER_TODAY ?? new Date().toISOString().slice(0, 10);
const W = (t: string) => 'https://en.wikipedia.org/wiki/' + encodeURIComponent(t.replace(/ /g, '_')).replace(/%3A/g, ':').replace(/%2C/g, ',').replace(/%21/g, '!').replace(/%28/g, '(').replace(/%29/g, ')').replace(/%26/g, '&').replace(/%27/g, "'");
const OLD = (rev: number | undefined) => (rev ? [`https://en.wikipedia.org/w/index.php?oldid=${rev}`] : []);
const save = (f: string, v: unknown) => writeFile(f, JSON.stringify(v, null, 2) + '\n');
const MAIN = { id: 'main', label: 'Main', marker: 'dot' as const, description: '', placeable: true, parent: null, diverges_at: null, merges_into: null, is_main: true };
const status = (d: string | null): Unit['status'] => (!d ? 'upcoming' : (d.length === 10 ? d <= TODAY : Number(d.slice(0, 4)) < Number(TODAY.slice(0, 4))) ? 'released' : 'upcoming');

// ---- target continuity per title (see header)
const CONT: Record<string, string> = {
  lucifer: 'lucifer', 'swamp-thing-2019': 'swamp-thing-2019', krypton: 'krypton', pennyworth: 'pennyworth',
  'watchmen-2019': 'watchmen-hbo', 'watchmen-2009': 'watchmen-2009', 'watchmen-2024': 'watchmen-2024',
  'constantine-2014': 'arrowverse', 'teen-titans-2003': 'teen-titans-2003', 'teen-titans-go': 'teen-titans-go',
  'young-justice': 'young-justice', 'harley-quinn-2019': 'harley-quinn-animated', 'kite-man-hell-yeah': 'harley-quinn-animated',
  'batman-the-brave-and-the-bold': 'batman-brave-and-the-bold', 'beware-the-batman': 'beware-the-batman', 'justice-league-action': 'justice-league-action',
  'batman-gotham-knight': 'nolan-dark-knight', 'superman-batman-public-enemies': 'superman-batman-dtv', 'superman-batman-apocalypse': 'superman-batman-dtv',
  'justice-league-crisis-on-two-earths': 'crisis-on-two-earths-doom', 'justice-league-doom': 'crisis-on-two-earths-doom', 'batman-assault-on-arkham': 'arkhamverse',
  'batman-and-harley-quinn': 'dcau', 'justice-league-vs-the-fatal-five': 'dcau',
};
const contOf = (id: string) => CONT[id] ?? 'dc-animated-standalone';
const NEW_CONTS: [string, string, string, Continuity['kind'], string][] = [
  ['lucifer', 'Lucifer (Fox / Netflix)', 'Lucifer', 'shared', 'Crisis on Infinite Earths labels it Earth-666 through a cameo, as with Titans and Doom Patrol; it is not merged into the Arrowverse.'],
  ['swamp-thing-2019', 'Swamp Thing (2019)', 'Swamp Thing', 'shared', 'Labelled Earth-19 in Crisis on Infinite Earths through archival footage only.'],
  ['krypton', 'Krypton (Syfy)', 'Krypton', 'shared', 'Set "approximately 200 years before" Superman\'s birth.'],
  ['pennyworth', 'Pennyworth (Epix / HBO Max)', 'Pennyworth', 'shared', 'Called a prequel to Gotham, but set in an alternate-history London; its own continuity, linked to Gotham.'],
  ['watchmen-hbo', 'Watchmen (HBO, 2019)', 'Watchmen (HBO)', 'shared', 'A sequel to the comic, not to the 2009 film.'],
  ['watchmen-2009', 'Watchmen (2009 film)', 'Watchmen (2009)', 'shared', ''],
  ['watchmen-2024', 'Watchmen (2024 animated)', 'Watchmen (2024)', 'shared', 'No source links it to the 2009 film or the HBO series.'],
  ['teen-titans-2003', 'Teen Titans (2003)', 'Teen Titans', 'shared', ''],
  ['teen-titans-go', 'Teen Titans Go!', 'Teen Titans Go!', 'shared', ''],
  ['young-justice', 'Young Justice (Earth-16)', 'Young Justice', 'shared', 'Season 2 "picks up five years after the first season ended"; no calendar years in the sources.'],
  ['harley-quinn-animated', 'Harley Quinn (2019) and Kite Man: Hell Yeah!', 'Harley Quinn', 'shared', 'Kite Man "serves as a spin-off of Harley Quinn".'],
  ['batman-brave-and-the-bold', 'Batman: The Brave and the Bold', 'Brave and the Bold', 'shared', ''],
  ['beware-the-batman', 'Beware the Batman', 'Beware the Batman', 'shared', ''],
  ['justice-league-action', 'Justice League Action', 'JL Action', 'shared', ''],
  ['superman-batman-dtv', 'Superman/Batman animated films', 'Superman/Batman', 'shared', 'Public Enemies and its sequel Apocalypse.'],
  ['crisis-on-two-earths-doom', 'Crisis on Two Earths / Doom', 'Two Earths / Doom', 'shared', 'Justice League: Doom follows Crisis on Two Earths.'],
  ['arkhamverse', 'Arkhamverse (screen)', 'Arkhamverse', 'shared', 'Assault on Arkham is the only screen entry; its canon status is disputed because Suicide Squad: Kill the Justice League (2024) contradicts it. The games are out of scope.'],
  ['dc-animated-standalone', 'DC Universe Animated Original Movies (standalone)', 'DC animated (standalone)', 'standalone-collection', 'Each film stands alone. DCAMU and Tomorrowverse films are in their own continuities.'],
];
const TYPE = (t: string): Title['type'] => (/film|movie/i.test(t) ? (/animated|tv-film|dtv/i.test(t) ? 'animated-film' : 'film') : /special|short/i.test(t) ? 'special' : t === 'series' ? 'series' : 'animated-series');

// ---- registries
const platforms = PlatformsFile.parse(JSON.parse(await readFile('data/registry/platforms.json', 'utf8')));
for (const p of [
  { id: 'syfy', label: 'Syfy', kind: 'cable' as const, note: '' },
  { id: 'epix', label: 'Epix (MGM+)', kind: 'cable' as const, note: '' },
  { id: 'adult-swim', label: 'Adult Swim', kind: 'cable' as const, note: '' },
]) if (!platforms.some((x) => x.id === p.id)) platforms.push(p);
await save('data/registry/platforms.json', platforms);
const PLAT = new Set(platforms.map((p) => p.id));
const plat = (p: string | undefined, fallback: string) => (p && PLAT.has(p) ? p : fallback);

// ---- continuities
const conts = ContinuitiesFile.parse(JSON.parse(await readFile('data/dc/continuities.json', 'utf8')));
let order = Math.max(...conts.map((c) => c.order));
for (const [id, name, short, kind, notes] of NEW_CONTS) {
  if (conts.some((c) => c.id === id)) continue;
  const srcTitle = RAW.find((r) => contOf(r.id) === id);
  conts.push({ id, universe: 'dc', name, short_name: short, order: ++order, kind, calendar: kind === 'standalone-collection' ? { kind: 'ordered-only' } : { kind: 'gregorian' },
    branches: [MAIN], grouping_schemes: [], alt_orders: [], description: notes, source_urls: srcTitle ? [W(srcTitle.wiki_article)] : [], notes: '' });
}
await save('data/dc/continuities.json', conts);

// ---- titles
const titles = TitlesFile.parse(JSON.parse(await readFile('data/dc/titles.json', 'utf8')));
const unitOrder = (cid: string) => titles.filter((t) => t.continuity === cid).flatMap((t) => t.units.map((u) => u.in_universe.order_index));
const freeBetween = (cid: string, lo: number, hi: number) => { const used = new Set(unitOrder(cid)); for (let i = Math.floor((lo + hi) / 2); i < hi; i++) if (!used.has(i)) return i; for (let i = lo + 1; i < hi; i++) if (!used.has(i)) return i; throw new Error(`no free index in ${cid} between ${lo} and ${hi}`); };
const iuFor = (r: any, cid: string): Unit['in_universe'] => {
  const q = r.in_universe?.quote ? ` Wikipedia: ${r.in_universe.quote}` : '';
  if (r.in_universe?.year && !r.in_universe.confidence && cid !== 'dc-animated-standalone') {
    return { start: { y: r.in_universe.year }, end: { y: r.in_universe.year }, label: String(r.in_universe.year), precision: 'year', confidence: 'stated', note: q.trim(), order_index: 0, relative_to: null };
  }
  return { start: null, end: null, label: cid === 'dc-animated-standalone' ? 'Standalone' : 'No year given', precision: 'relative', confidence: r.in_universe?.confidence === 'inferred' || cid === 'dcau' ? 'disputed' : 'inferred',
    note: (cid === 'dc-animated-standalone' ? 'Standalone story; listed by release.' : 'The sources give no in-universe year.') + q, order_index: 0, relative_to: null };
};
let added = 0;
const newUnits: Unit[] = [];
for (const r of RAW) {
  if (r.already_present || /ALREADY PRESENT/.test(r.continuity_proposal ?? '')) continue;
  const cid = contOf(r.id);
  const src = [...OLD(r.revid), W(r.wiki_article)];
  const mkTitle = (id: string, title: string, type: Title['type'], units: Unit[], extra: Partial<Omit<Title, "credits">> = {}): Title => ({
    id, title, sort_title: /^(The|A|An)\s/.test(title) ? title.replace(/^(The|A|An)\s+/, '') : null, type, universe: 'dc', continuity: cid,
    studio_brand: r.studio, label: null, platform_or_network: plat(r.platform, 'home-media'),
    canon_tier: cid === 'dcau' ? 'adjacent' : 'core', characters: [], franchises: [], status: units.some((u) => u.status === 'released') ? 'released' : 'upcoming',
    external_ids: { enwiki: r.wiki_article, wikidata: null, tmdb: null, imdb: null }, source_urls: src,
    notes: [r.studio_detail ? `Studios: ${r.studio_detail}.` : '', r.continuity_quote ? `Continuity: ${r.continuity_quote}` : '', r.notes ?? ''].filter(Boolean).join(' '),
    links: [], constituents: [], credits: [], units, ...extra,
  });
  const unit = (id: string, label: string, date: string | null, end: string | null, note: string, extra: Partial<Unit> = {}): Unit => {
    const u: Unit = { id, label, season: null, episode_range: null, episode_count: null, runtime_min: null, pages: null, word_count: null, timeline_branch: 'main', canon_tier: null,
      in_universe: iuFor(r, cid), release: { date, end_date: end, year: date ? Number(date.slice(0, 4)) : null, note }, status: status(date), groupings: {},
      platform_or_network: null, source_keys: {}, source_urls: src, notes: '', ...extra };
    newUnits.push(u);
    return u;
  };
  if (titles.some((t) => t.id === r.id)) continue;
  const type = TYPE(r.type);
  let units: Unit[];
  if (r.seasons?.length) {
    units = r.seasons.map((s: any) => unit(`${r.id}-s${s.n}`, s.subtitle ? `Season ${s.n}: ${s.subtitle}` : `Season ${s.n}`, s.start ?? null, s.end ?? null, s.note ?? '',
      { season: s.n, episode_count: s.episodes ?? null, platform_or_network: s.platform && s.platform !== r.platform ? plat(s.platform, r.platform) : null, source_keys: { 'release-season': String(s.n) } }));
  } else if (r.parts?.length) {
    units = r.parts.map((p: any) => unit(`${r.id}-part-${p.part}`, p.label ?? `Part ${p.part}`, p.release_date ?? (p.year ? String(p.year) : null), null, p.year && !p.release_date ? 'Year only.' : ''));
  } else {
    units = [unit(r.id, 'Film', r.release_date ?? null, null, [r.conflict ? `Dates differ: ${r.conflict}` : '', r.list_source ? `List article: ${typeof r.list_source === 'string' ? r.list_source : JSON.stringify(r.list_source)}` : ''].filter(Boolean).join(' '))];
  }
  const links: Title['links'] = [];
  if (r.id === 'pennyworth') links.push({ to: 'gotham', kind: 'shares-characters', note: 'Called a prequel to Gotham.' });
  if (r.id === 'kite-man-hell-yeah') links.push({ to: 'harley-quinn-2019', kind: 'spinoff', note: '' });
  if (r.id === 'superman-batman-apocalypse') links.push({ to: 'superman-batman-public-enemies', kind: 'sequel', note: '' });
  if (r.id === 'justice-league-doom') links.push({ to: 'justice-league-crisis-on-two-earths', kind: 'sequel', note: '' });
  if (r.id === 'constantine-2014') links.push({ to: 'arrow', kind: 'crossover', note: 'Matt Ryan reprises the role in the Arrowverse.' });
  titles.push(mkTitle(r.id, r.title, type, units, { links }));
  added++;
  // Tie-in films and specials become their own titles in the same continuity.
  for (const [k, e] of (r.extra_units ?? []).entries()) {
    if (!e.release_date) continue;
    // Ids are permanent: derive them from the title; short generic titles ("The Lost Episode") get the show's id as prefix.
    const slug = (s: string) => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/['’]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const eid = e.title.split(/\s+/).length < 4 ? `${r.id}-${slug(e.title)}` : slug(e.title);
    void k;
    if (titles.some((t) => t.id === eid)) continue;
    const esrc = e.wiki_article ? [...OLD(e.revid), W(e.wiki_article)] : src;
    const u = unit(eid, TYPE(e.type) === 'special' ? 'Special' : 'Film', e.release_date, e.end_date ?? null, [e.conflict ? `Dates differ: ${e.conflict}` : '', e.quote ? `Wikipedia: ${e.quote}` : ''].filter(Boolean).join(' '), { source_urls: esrc, episode_count: e.episodes ?? null });
    titles.push(mkTitle(eid, e.title, TYPE(e.type), [u], { source_urls: esrc, platform_or_network: plat(e.platform, plat(r.platform, 'home-media')), notes: '', links: [{ to: r.id, kind: /concluded/.test(e.quote ?? '') ? 'continues' : 'spinoff', note: '' }],
      external_ids: { enwiki: e.wiki_article ?? null, wikidata: null, tmdb: null, imdb: null } }));
    added++;
  }
}

// ---- order indices: new continuities by release date; insertions into existing ones at sourced points.
const byCont = new Map<string, Unit[]>();
for (const t of titles) for (const u of t.units) if (newUnits.includes(u)) { if (!byCont.has(t.continuity)) byCont.set(t.continuity, []); byCont.get(t.continuity)!.push(u); }
const idx = (cid: string, uid: string) => titles.find((t) => t.continuity === cid && t.units.some((u) => u.id === uid))!.units.find((u) => u.id === uid)!.in_universe.order_index;
for (const [cid, us] of byCont) {
  const isNew = NEW_CONTS.some(([id]) => id === cid);
  if (isNew) {
    const all = titles.filter((t) => t.continuity === cid).flatMap((t) => t.units);
    all.sort((a, b) => (a.release.date ?? '9999').localeCompare(b.release.date ?? '9999') || a.id.localeCompare(b.id)).forEach((u, i) => { u.in_universe.order_index = (i + 1) * 10; });
  } else if (cid === 'nolan-dark-knight') {
    for (const u of us) { u.in_universe.order_index = freeBetween(cid, idx(cid, 'batman-begins'), idx(cid, 'the-dark-knight')); u.in_universe.relative_to = { after: 'batman-begins', before: 'the-dark-knight' }; u.in_universe.label = 'Between Batman Begins and The Dark Knight'; u.in_universe.confidence = 'stated'; }
  } else if (cid === 'arrowverse') {
    const before = idx(cid, 'arrow-s4');
    const prev = Math.max(...unitOrder(cid).filter((o) => o < before && o > 0));
    for (const u of us) { u.timeline_branch = 'earth-1'; u.in_universe.order_index = freeBetween(cid, prev, before); u.in_universe.relative_to = { after: null, before: 'arrow-s4' }; u.in_universe.label = 'Before Arrow season 4'; u.in_universe.note = 'Wikipedia: Ryan\'s Arrowverse role "retroactively established Constantine as part of the same continuity"; he appears in Arrow S4 "Haunted". No in-universe year is given.'; }
  } else {
    let next = Math.max(0, ...unitOrder(cid)) + 10;
    for (const u of us.sort((a, b) => (a.release.date ?? '').localeCompare(b.release.date ?? ''))) { u.in_universe.order_index = next; next += 10; }
  }
}
await save('data/dc/titles.json', titles);
console.log(`dc-deferred: ${added} title(s) added`);
