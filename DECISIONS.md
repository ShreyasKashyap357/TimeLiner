# Decisions log

Work continues stage to stage without stopping (user instruction, 2026-11-26). Open questions are collected here, each with the default I'm using until you answer. Defaults are chosen to be easy to reverse.

## Open: waiting on you

Defaults are in use until you answer. Answered items are under Resolved (R-20 onward).

| # | Question | Default being used |
|---|---|---|
| D-3 | **Plain version:** your brief asked for on/off switches named "Marvel Television", "adjacent", "animated" and "non-placeable". A "Marvel Television" switch is awkward: Daredevil, Jessica Jones and the other Netflix shows were made by Marvel Television *and* are fully part of the MCU timeline in your reference image, so switching "Marvel Television" off would also hide them. Is it fine that these are covered by the existing controls instead? | Yes, covered by: the **Canon tier** checkboxes (Adjacent, Non-placeable), the **Animated** quick button, and the **Studio** filter (pick either Marvel Television). No separate switch. |
| D-6 | Branch merges (Arrowverse *Crisis*): you said OK, with no ideas for improving it. | Kept as is. One possible improvement later: draw the merge as a converging line in the Continuities view. Say if you want it. |
| D-11 | **Why some DC titles were deferred:** only to keep the first DC release small enough to check; there was no data problem. | Now being added (researched 2026-11-26): Lucifer, Swamp Thing, Krypton, Pennyworth, Watchmen, Constantine, Teen Titans, Teen Titans Go!, Young Justice, Harley Quinn, Kite Man, Brave and the Bold, Beware the Batman, Justice League Action, and the standalone animated films. |
| D-12 | ***Ultimate Spider-Man* (2012–17) and *Hulk and the Agents of S.M.A.S.H.* (2013–15)** are Disney XD cartoons. Marvel later linked *Avengers Assemble*, *Guardians of the Galaxy* (2015) and *Spider-Man* (2017) to them as one shared cartoon world, but the sources only say so for those three. | Both stay in the standalone collection until a source says they share that world. |
| D-24 | **Star Wars years from Lucasfilm reference books.** Wookieepedia cites many years to official books (*Star Wars: Timelines*, 2023; *Galactic Atlas*). Should those count as stated? | Yes: `stated`, with the book-via-Wookieepedia chain in the note. Years Wookieepedia works out itself are `inferred`. |
| D-25 | **Star Wars Holiday Special.** Lucasfilm put it in Legends in 2014, but J. J. Abrams later called it canon. | In Legends, with the date marked disputed. |
| D-26 | **LEGO Star Wars and Visions.** Wikipedia is silent on LEGO canon; Visions was "not required to adhere" to the timeline. | Two separate non-canon collections (tier adjacent), not placed on the BBY/ABY timeline. |
| D-27 | **Pennyworth** is called a prequel to *Gotham*, but is also set in an alternate-history London (a *V for Vendetta* prequel). | Its own continuity, linked to *Gotham*, rather than inside the Gotham continuity. |
| D-28 | **Constantine (NBC, 2014).** Wikipedia: Matt Ryan's role in the Arrowverse "retroactively established Constantine as part of the same continuity". | Placed in the Arrowverse (Earth-1), before *Arrow* S4 "Haunted"; the in-universe year stays unstated. |
| D-29 | **Cast and crew (your request).** Source: Wikidata (cast P161, director P57, producer P162, screenwriter P58, composer P86, based-on P144), the same source already used for ids and dates. Big casts would make the data much larger. | Store the top-billed 10 cast members and all directors, writers, producers and composers per title. Show them in the detail panel, searchable, with a People filter. Per-season credits only where Wikidata has season items. |
| D-30 | **Marvel animated specials (D-15).** Origin lines: Marvel Animated Features (Lionsgate), Marvel Knights motion comics, Marvel anime films, Heroes United, Hulk: Where Monsters Dwell, Marvel Rising, LEGO Marvel, and Phineas and Ferb: Mission Marvel. | One "Specials" collection with an **Origin** filter. 10 LEGO/other entries have only a year (no day), kept year-only. The motion comics use a new `motion-comic` type. |
| D-31 | **Word counts.** Wikipedia's tables (citing Accelerated Reader) give counts for the 15 Wheel of Time books and ASOIAF 1–5. *The Princess and the Queen* is about 30,000 words (George R. R. Martin's blog). Nothing reliable was found for the Dunk & Egg novellas, *Fire & Blood* or the companions. | Use the Accelerated Reader counts, note where other sources differ (e.g. *The Shadow Rising*: 341,730 vs 386,000), and leave the rest blank. |
| D-32 | **Toho US re-edits (D-19 categorisation).** | A new title type, **"Re-edit (US version)"**, linked to the original with a new `re-edit-of` link kind. 7 titles, including *Godzilla 2000* (US). Dub-only US releases are not listed separately. |
| D-33 | **Star Trek years from Wikipedia's "Timeline of Star Trek" table.** The table states years per season and film, but is tagged as needing citations, and contradicts itself in five places. | Rated stated where it is consistent; the five conflicts are marked disputed (both values in the note). Memory Alpha stardate datings are inferred. |
| D-34 | **StarTrek.com's official viewing order** (series level, 11 series, no films). I could read it only through a summarising fetch, so its exact wording is unchecked. | Not added yet. Please confirm whether you want it as an official order. If yes, I'll check it against the live page and add it alongside a collated "recommended for new viewers" order. |

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
