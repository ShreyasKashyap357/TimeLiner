# Decisions log

Work continues stage to stage without stopping (user instruction, 2026-11-26). Open questions are collected here, each with the default I'm using until you answer. Defaults are chosen to be easy to reverse.

## Open: waiting on you

Defaults are in use until you answer. Answered items are under Resolved.

| # | Question | Default being used |
|---|---|---|
| | Nothing open. | |

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
| R-45 | B3 | D-40 Riordan calendar | Approved: story order only, fan years shown as "(fan-dated)". |
| R-46 | B3 | D-41 Riordan scope | **Include everything**: Demigods of Olympus, the graphic novels, The Ultimate Guide, the Kane Survival Guide and the other companions, the musical (theatre), and Demigod Files / Diaries split into one entry per story. *Deferred until the user says go.* |
| R-47 | 9 | D-42 Ages calendar | Approved. The Age convention must be stated wherever it matters (the Key already does this; also add it to Middle-earth tooltips and notes). |
| R-48 | all | D-43 media | **Add radio, live / theatre and other needed media** (stage musicals and plays, audio dramas, podcasts if relevant). *Deferred until the user says go.* |
| R-49 | all | D-44–D-48 | Approved as proposed (Spy Racers separate; Bond continuation novels later; inferred DC groupings; DC imprints included; disputed DC placements adjacent and linked). |
| R-50 | all | Games, LEGO, more franchises | User: add the suggested franchises, games (incl. GTA), and LEGO films. Games are now a medium ("played"). |
| R-51 | all | D-49, D-51, D-55–D-65 | Approved as proposed. |
| R-52 | games | D-50 | **Changed:** record the earliest release on **every** platform (e.g. GTA V on PS3/360 2013, PS4/Xbox One/PC 2014–15, PS5/Series X 2022), not one date per game. |
| R-53 | Terminator | D-52, D-53 | Approved, but the reasoning and sources must be shown in the app wherever they apply. |
| R-54 | Halloween | D-54 | Approved; the branch and its sources must be visible in the app (the current layout is fine). |
| R-55 | UI | Popovers | Never use the browser's native hover text anywhere; use the app's own tooltips and popovers. |
| R-56 | data | Film and TV stats | Films: runtime, budget and box office. TV: viewers per episode and per season. |
| R-57 | games | D-66 | Confirm shared dates from the article text and name the platforms each date applies to. Done for 31 games (102 entries); 13 games have no text tying dates to platforms and stay empty. |
| R-58 | data | D-67, D-69, D-70, D-71, D-72, D-73, D-74, D-76 | Approved as proposed. |
| R-59 | TV | D-68 | Map specials' viewer figures. Done by air date for 8 Doctor Who / Sarah Jane specials; the other Christmas specials are not in the parsed tables yet (TODO). |
| R-60 | anime | D-75 | Approved. Non-canon anime material to be placed using the Library of Ohara timeline, credited. |
| R-61 | UI | Release order | Release order must be grouped by year everywhere (the timeline's Release toggle was flat; fixed). Undated timelines show their own in-universe labels as headings. |
| R-62 | data | Riordanverse | Year markers like other universes: Riordan Wiki years used (inferred). |
| R-63 | anime | D-77 | Approved: keep the current One Piece film positions (disputed), with the Library of Ohara's canon statements credited. |
| R-64 | UI | D-78 | Approved: interactive maps. Licensed maps as zoomable images, schematic maps where nothing is licensed, OpenStreetMap for real-world places, all with credits. |
| R-65 | maps | D-79 | Don't stream tiles from `tile.openstreetmap.org`: download the base map once and serve the downloaded copy with the site. Note: OSM's tile usage policy forbids bulk-downloading its tiles, so the plan is to bundle an open vector base map (Natural Earth, public domain; OSM-derived extracts only where the licence allows) under `public/`, rendered by Leaflet with no third-party requests. Queued until development resumes. |
| R-66 | maps | D-80 | Approved: keep countries and regions, noted as shown at their centre. |
| R-67 | data | D-81 | Approved: Alien, Predator and AVP stay separate continuities; Badlands has a crossover link. |
| R-68 | data | D-82 | Approved: La Llorona stays in the main Conjuring continuity, noted. |
| R-69 | data | D-83 | Approved: Scream TV season 3 is its own continuity. |
