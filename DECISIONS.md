# Decisions log

Work continues stage to stage without stopping (user instruction, 2026-11-26). Open questions are collected here, each with the default I'm using until you answer. Defaults are chosen to be easy to reverse.

## Open: waiting on you

Defaults are in use until you answer. Answered items are under Resolved.

| # | Question | Default being used |
|---|---|---|
| D-44 | **Fast & Furious: Spy Racers.** No source places it in the films' timeline. | Separate continuity. |
| D-45 | **Bond continuation novels.** Only the period-set ones (Forever and a Day, Trigger Mortis, Colonel Sun, Devil May Care, Solo) sit in Fleming's timeline, as an adjacent tier. Of the Gardner/Benson and later novels, only Licence Renewed and Carte Blanche are in so far. | Add the rest of the continuation novels later from their articles. |
| D-46 | **DC groupings with no source.** The four 1960s Filmation DC cartoons and the 10 Lego DC films are grouped as one continuity each, based only on packaging and numbering. | Grouped, with a note that this is inferred. |
| D-47 | **DC imprint adaptations** (Vertigo and others: V for Vendetta, Stardust, The Sandman, Preacher, Sweet Tooth, iZombie, Y: The Last Man, Red…). These are DC publications but not DC superhero titles. | Included, each in its own continuity. Say if you want them dropped or in a separate "DC imprints" collection. |
| D-48 | **Disputed DC placements:** the Batman '66 animated films (a critic: "not a continuation of the TV series"), Swamp Thing (1990) as a continuation of the films, and the Aquaman (2006) pilot alongside Smallville. | Kept separate (linked, not merged) and in the adjacent tier. |
| D-40 | **Riordan books: story order only, no calendar.** Riordan says there is "no specific year or timeline"; the Riordan Wiki's 2006–2011 years are fan-derived. | Story order (wiki Timeline); fan years shown in labels as "(fan-dated)", rated inferred. |
| D-41 | **Riordan scope.** Left out: Demigods of Olympus (an interactive ebook with no timeline place), the graphic novels, the musical and the game. The Demigod Files / Diaries are one entry each, though their stories sit at different points. | As listed. Say if you want graphic novels or per-story entries. |
| D-42 | **Middle-earth calendar: Tolkien's Ages.** A new calendar type shows "F.A./S.A./T.A./Fo.A. year". The Fourth Age starts after T.A. 3021. | Applied. Each production (books, Jackson films, Rings of Power, Rankin/Bass, Bakshi, Soviet and Finnish TV) is its own continuity. |
| D-43 | **Radio dramas.** BBC radio's The Lord of the Rings (1955–56, 1981) and The Hobbit (1968) need a new "radio" medium. | Not added yet. Say if you want radio and audio dramas as a medium (it would also cover Star Wars, Doctor Who-style audio). |

## Resolved

| # | Stage | Decision | Answer |
|---|---|---|---|
| R-1 | 0 | MCU as one continuity with branches | Yes |
| R-2 | 0 | Marvel scope: MCU, Fox X-Men, SSU, Raimi, Webb, X-Men TAS/'97 | Yes |
| R-3 | 0 | Netflix shows `core`; ABC/Hulu/Freeform `adjacent` | Yes |
| R-4 | 0 | TMDB skipped (no key); Wikidata for ids | Yes |
| R-5 | 0 | Data licence CC BY-SA 4.0 | Yes |
| R-6 | 0 | UI library | shadcn/ui |
| R-7 | 0 | Hosting | GitHub Pages (Vercel later dropped, R-22) |
| R-8 | 1 | Two "Marvel Television"s: keep separate | Yes. Ids `marvel-television-division` and `marvel-television-banner`, plus `group`, `short_label` and `active` years (migration 2026-11-26) |
| R-9 | 1 | X-Men: The Animated Series | Split into seasons 1–5 from Wikipedia's episode list. The old combined id is aliased so watched progress carries over. |
| R-11 | 1 | ABC/Hulu/Freeform placement | Researched: 14 seasons placed from Wikipedia tie-ins and MCU Fandom year pages (inferred/disputed, quoted in DATA_NOTES §5). Tier stays `adjacent`. |
| R-10 | 1 | Workflow | Don't stop at checkpoints; batch decisions here |
| R-13 | 2 | Default filter | Every tier is shown by default, including non-placeable (Loki, What If…?) and adjacent; the tier checkboxes narrow it (user: "each and every TV series to be there"). Replaces D-2. |
| R-14 | 2 | Missing series | Added 21 (migration `2026-11-26-add-remaining-marvel-series`): *Slingshot*, *Legion*, *The Gifted*, *M.O.D.O.K.*, *Hit-Monkey*, the Disney XD shows, the Marvel Anime series, *Spidey*, *Iron Man and His Awesome Friends*, *Moon Girl*, *EMH*, *Super Hero Squad*, *Armored Adventures*, *Wolverine and the X-Men*. Unaired pilots (*Marvel's Most Wanted*, *New Warriors*) are excluded. |
| R-15 | 2 | Sidebar | Sort and a Characters & teams picker in the filter sidebar; active-filter chips above the results; themed scrollbars; readable Disney+ order with period headings and #positions. |
| R-16 | 3–4 | DC | Applied defaults D-6–D-11 (schema additions, Peacemaker split, launch scope). DC enabled in the app. *The People v. Gorilla Grodd* added (dated 2027). |
| R-17 | 5 | Godzilla & Kong | Built and enabled (60 titles, 11 continuities, Toho eras as a grouping). |
| R-18 | B1 | Books pilot | Book support built with the D-16 defaults; A Song of Ice and Fire / Game of Thrones built and enabled (19 titles). Separate book and HBO continuities (D-20), AC calendar without a year 0 (D-21). |
| R-19 | B2 | The Wheel of Time | Built and enabled (books, Amazon series, Winter Dragon). |
| R-12 | 2 | UI look | The user's shadcn preset (`b3JSApUsds`, style **radix-lyra**, base **mauve**, Roboto + JetBrains Mono). It owns surfaces, cards, colours, fonts and radius. Universe accents (Marvel gold/red, DC blue) are used only for timeline chrome: spine, year headings and the main-branch marker. Root font size is 112.5% for readability. The header and filters are sticky, the top of the page is dashboard-style stat cards, and charts have tooltip cards. |
| R-20 | 1 | D-1 Marvel Television naming | "Marvel Television (2010–2019)" and "Marvel Television (Marvel Studios)" (migration 2026-11-26-marvel-tv-labels). |
| R-21 | 2 | D-4 bundle size | Done: Zod validation skipped in production (CI and dev still validate), secondary views lazy-loaded. Main chunk 206 → 174 KB gzip. First paint loads only the current universe. |
| R-22 | 2 | D-5 Pages | Already enabled. Hosting is GitHub Pages only; Vercel dropped (user, 2026-11-26). |
| R-23 | 2 | D-7 crossover episode keys | OK, on condition nothing internal leaks to the UI. Added an e2e audit that fails on raw ids, "#e8"-style keys, "undefined", "NaN" or "[object Object]" in any view at four screen sizes. |
| R-24 | 3 | D-8, D-9, D-10, D-13, D-17, D-18, D-20, D-21, D-23 | Approved as proposed. |
| R-25 | 2 | D-14 watch order | Add a recommended order for new viewers, collated from several guides. Built for the MCU from six guides (Popverse, SuperHeroHype, JustWatch, Screen Rant ×2, Rotten Tomatoes): release order, with essentials vs optional and an "Essentials only" switch. |
| R-26 | 2 | D-15 specials | Add them under a Specials category with a filter for their origin (LEGO, Marvel Knights, etc.). See D-30. |
| R-27 | B | D-16 books | Approved. Also: word counts (D-31), and spoiler-safe mode applies site-wide. "GoT" means the HBO shows: Game of Thrones, House of the Dragon and A Knight of the Seven Kingdoms are all in (others get added once they have release dates). |
| R-28 | 5 | D-19 US re-edits | Add them, properly categorised by what they are. See D-32. |
| R-29 | B | D-21, D-22 calendars without a year 0 | OK, and say so clearly in the UI (shown in the Key and on the continuity). |
| R-30 | 2 | D-3 "Marvel Television" toggle | Agreed: it isn't a canon tier. Covered by the Studio filter, the tier checkboxes and the Animated button. |
| R-31 | 3 | D-6 branch merges | Done: each continuity shows a branch map (merging branches converge into their target), with the same facts in words. Every branch box now has a dashed border. |
| R-32 | 3 | D-11 deferred DC titles | Done: the first 55, then 21 more (14 DC Showcase shorts, Lobo, Gotham Girls, Mister Miracle, DC Super Hero Girls ×2, Batman: Caped Crusader, My Adventures with Superman). |
| R-33 | 2 | D-12 Disney XD shows | Two continuities, per Wikipedia citing writer Harrison Wilcox: Ultimate Spider-Man + S.M.A.S.H. + Avengers Assemble S1–4, and Guardians + Spider-Man (2017) + Black Panther's Quest (Avengers Assemble S5). All split per season (D-13 too). |
| R-34 | 6 | D-24 years from Lucasfilm books | Stated. The confidence badge tooltip now shows the source note (this applies everywhere). |
| R-35 | 6 | D-25, D-26, D-27, D-30, D-32 | Approved as proposed. Dubs are not re-edits. |
| R-36 | 3 | D-28 Constantine | Approved. Its placement ("Before Arrow season 4") and the quote are shown on the entry and in its tooltip. |
| R-37 | all | D-29 cast & crew | Full cast (not capped), with a Cameos section. Characters from cast lists, including cameos, are in the Characters picker and match across universes. "All universes" with a person or character shows an Appearances list instead of a timeline. |
| R-38 | B | D-31 word counts | Wikipedia-style [n] citations next to word counts. Added The Wheel of Time Companion (about 350,000, editor's figure). Fan-wiki counts are noted where they differ. ReadingLength "guesses" are not used. |
| R-39 | 7 | D-33, D-34 Star Trek | Contradictions are marked disputed, with both values shown in the badge tooltip. StarTrek.com's official chronological order is added. StarWars.com's official order is also added. |
| R-40 | all | Watch orders (D-14 follow-up) | Recommended orders for Star Wars, Star Trek (Prime, Kelvin), DCU, DCEU, MonsterVerse and HBO Westeros, each showing its criteria and, per entry, which guides support it. |
| R-41 | all | D-36, D-38, D-39 | Approved as proposed. |
| R-42 | all | D-37 later seasons | A later season of an essential series is essential too, as a general rule (guides written before a season came out can't list it). This applies to House of the Dragon S3, Strange New Worlds S4 and Monarch S2. |
| R-43 | DC | Continuity dropdown too long | Replaced with a searchable picker, grouped automatically (shared universes, animated, live-action films & series, collections), showing each continuity's title count and years. |
| R-44 | all | D-35 cameo sources | Fan wikis checked. Only Marvel Database, DC Database and Gojipedia mark cameos explicitly; those markers are used along with Wikipedia, and each cameo cites its source (page revision). |
