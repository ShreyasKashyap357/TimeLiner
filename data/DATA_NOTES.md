# DATA_NOTES

This file records every judgement call, every disagreement between sources, and everything that could not be verified in the TimeLiner dataset. Sections are grouped by universe.

- **Status as of:** 2026-11-26. Statuses ("released" / "upcoming") are computed against that date.
- **Checks:** `npm run verify` re-checks everything below. `npm run verify -- --refetch` re-downloads the sources first.

---

## Marvel (Stage 1)

### 1. Summary

| | |
|---|---|
| Titles | 109 |
| Units (films, seasons, episode ranges) | 146 |
| Continuities | MCU 115 units · Fox X-Men 13 · SSU 6 · Raimi 3 · Webb 2 · X-Men TAS/'97 7 |
| Canon tier | core 115 · outside-set-date 9 · adjacent 16 · non-placeable 6 |
| In-universe confidence | stated 88 · inferred 32 · disputed 26 |
| Status | released 134 · upcoming 12 |
| `verify` result | 0 integrity errors, 0 warnings, 0 un-ignored drift items |

### 2. How the data was produced

1. **Fetch.** `scripts/fetch/*` downloaded 41 Wikipedia pages through the MediaWiki API on 2026-11-26. Wikitext and rendered HTML are cached in `data/sources/wikipedia/`, and each page's revision id is in `data/sources/manifest.json`. Wikidata facts (QIDs, US release dates, runtimes, TMDB/IMDb ids) were fetched with `wbgetentities` and cached in `data/sources/wikidata/marvel.json`. No API key was used, and TMDB was not called.
2. **Extract.** `scripts/build/marvel.ts` turns the cached pages into `data/candidates/marvel.json`. It reads:
   - the `{{Film overview}}` and `{{Series overview}}` tables on the six Phase pages, the film list, the two TV lists, the Netflix / ABC / young-adult pages, and the X-Men page;
   - the TV-specials tables;
   - the MCU timeline diagram (`{{Marvel Cinematic Universe timeline/row}}`);
   - the Disney+ timeline order list;
   - the *An Official Timeline* (2023) table.
3. **Curate.** `scripts/bootstrap/marvel.seed.ts` holds the classification decisions only: continuity, branch, tier, studio, platform and characters. It also holds a *key* for each unit, such as the exact diagram text "Born Again season 1 ep. 1". `scripts/bootstrap/marvel.ts` joins the seed to the candidates and writes `data/marvel/*.json`.
   - In-universe years are never typed by hand when a diagram row exists. They are copied from the row.
   - Where a value had to be entered by hand (Agent Carter TV, the Fox X-Men years), the note quotes the source sentence.
4. **From now on**, the JSON files are the canonical data, edited by hand and reviewed. The bootstrap refuses to overwrite them without `--force`.

**Source priority for in-universe placement** follows Wikipedia's own stated method:
1. Wikipedia's timeline diagram, which uses explicit on-screen or dialogue dates;
2. *The Marvel Cinematic Universe: An Official Timeline* (2023), as transcribed on Wikipedia;
3. the Disney+ timeline order, used only for relative position.

**Release date policy:**
- **Films:** the first general US release from the Wikipedia overview tables. Premieres and international dates are not used.
- **Series:** the first episode's date on the original platform, with `end_date` set to the last episode.
- **One-Shots:** the digital home-media date.
- **Fallbacks:** the article infobox, then Wikidata (P577 with place of publication = US).

### 3. Differences between the reference image and current sources

`reference/mcu_timeline_current.png` was transcribed to `reference/mcu_timeline_current.json` and is diffed automatically by `verify`. Every entry in the image exists in the dataset. Order within each year matches, and so do the markers (dot vs diamond). The differences:

| Entry | Reference image | Dataset (current sources) | Why |
|---|---|---|---|
| *Avengers: Doomsday* | 2028 | **Not yet placed** (upcoming, US release 2026-12-18) | Wikipedia's diagram has the 2028 row for it **commented out** until release. I won't invent a placement; it will be re-checked once released. |
| *Daredevil: Born Again* S3 | 2027 "(into 2028)" | **Not yet placed** (upcoming, release "March 2027") | Same: the row is commented out in Wikipedia's 2028 entry. |
| *VisionQuest* | Excluded (footnote: placement not yet revealed) | **2028**, Sacred Timeline | It released 2026-10-13 to 2026-11-10, and Wikipedia's diagram now places it in 2028 ("as of VisionQuest"). |
| *Agent Carter* (TV) S1 / S2 | Not shown | 1946 / 1947, tier **adjacent** | The image covers Marvel Studios and Netflix only, as Wikipedia's diagram does. The ABC series is included at tier `adjacent` (hidden by default), with years quoted from its article. |
| Year labels "1400 AD", "1896 AD" | "AD" suffix | "1400", "1896" | Cosmetic only. Wikipedia omits AD; the app can format it. |

The image's title says "as of *Spider-Man: Brand New Day*". Wikipedia's diagram is now "as of *VisionQuest*", which is why VisionQuest is the one new placement.

### 4. Disputed in-universe placements

Wikipedia's diagram is used for the year. Where *An Official Timeline* (2023) disagrees, the unit is marked `disputed` and both readings are given in its note.

| Unit | Wikipedia diagram | *An Official Timeline* (2023) |
|---|---|---|
| Iron Man | 2010 | Early–Spring 2008 |
| Iron Man 2 | 2011 | Spring 2010 |
| The Incredible Hulk | 2011 | Spring 2010 |
| Thor | 2011 | Spring 2010 |
| The Consultant (One-Shot) | 2011 | Summer 2010 |

The diagram's Phase One placements follow Wikipedia's stated method, which gives priority to explicit in-film date references, so they differ from the book. Your image follows the diagram.

The other `disputed` units:
- **Werewolf by Night:** Wikipedia: "does not indicate where it takes place". The book says late 2025 but calls it uncertain. It is not placed on the calendar, and its position comes from the Disney+ order.
- **Fox X-Men:** *Deadpool*, *Deadpool 2*, *The New Mutants* and *Logan* are disputed (see §6).
- **Unreleased titles:** the 12 upcoming titles listed in §8 are disputed by definition.

### 5. MCU modelling decisions

- **One MCU continuity with branches** (Stage 0 decision 1). The branches share one calendar:

  | Branch | Marker | Units |
  |---|---|---|
  | Sacred Timeline | ● dot | main |
  | Earth-828 | ◆ diamond | *The Fantastic Four: First Steps* (1964) |
  | Earth-10005 / the Void | ◆ diamond | *Deadpool & Wolverine* (2024) |
  | Earth-86445 | ◆ diamond | *Your Friendly Neighborhood Spider-Man* (Wikipedia footnote: "takes place on Earth-86445 around the events of *Civil War*") |
  | Zombies reality | ◆ diamond | *Marvel Zombies* (reality of *What If…?* "What If… Zombies?!") |
  | Outside time (TVA) | ◇ hollow square, non-placeable | *Loki* S1–2 |
  | Multiverse (no set timeframe) | ◇ hollow diamond, non-placeable | *What If…?* S1–3 |

- **Earth-10005 and the Fox films.** Wikipedia says Marvel designates the Fox X-Men film universe as Earth-10005. *Deadpool & Wolverine* still belongs to the MCU continuity: it is a Marvel Studios Phase Five film placed on the MCU calendar. It links to the separate `fox-x-men` continuity (`sequel` of *Deadpool 2*, `feeds-into` from *Logan*). Continuities are never merged.
- **Non-placeable titles** (*Loki*, *What If…?*, *Werewolf by Night*) have no calendar date.
  - Their `order_index` puts them right after the previous dated unit in the Disney+ order, and `relative_to` names the units on either side.
  - Disney+ places *Loki* S1 and *What If…?* S1 between *Endgame* and *WandaVision*, and their S2s after *The Marvels*. *What If…?* S3 sits between *Agatha All Along* and *Born Again*, and *Werewolf by Night* after *Ironheart* (Wikipedia's Disney+ list).
- **Netflix series are `core`** on the Sacred Timeline (Stage 0 decision 3). Wikipedia's diagram and the Disney+ timeline both place them by season.
- **ABC / Hulu / Freeform series are `adjacent`.** This covers *Agents of S.H.I.E.L.D.* (7 seasons), *Inhumans*, *Runaways* (3), *Cloak & Dagger* (2), *Helstrom* and *Agent Carter* (2).
  - Wikipedia's diagram and the Disney+ timeline both leave them out. They stay `adjacent`, hidden by default.
  - *Agent Carter*'s years are **stated** in its Wikipedia article: S1 "takes place in 1946"; S2 is "in 1947".
  - The other 14 seasons are placed from research done at the user's request (Checkpoint 1, decision D-2). Every quote was checked against the cached pages in `data/sources/`. Each unit's note quotes its sources, and `source_urls` lists them.
    - **Wikipedia** season and series articles give *relative* anchors: tie-in episodes, "six months after", and "Television series set in YYYY" categories (AoS S1 and S7 only).
    - **The MCU Fandom wiki year pages** (2013–2020, revisions in `data/sources/manifest.json`) give calendar dates. Fandom reasons these from on-screen props and dialogue, so they are rated `inferred`, never `stated`.

    | Season | Placed | Confidence | Basis |
    |---|---|---|---|
    | AoS S1 | 2013–2014 | inferred | WP: "The Well" "takes place directly after the events of *Thor: The Dark World*", plus a Winter Soldier tie-in; Fandom: ID badge "2013SEP09" |
    | AoS S2 | 2014–2015 | inferred | WP: "resumes months after the end of season one", leads into *Age of Ultron*; Fandom: "late May or early June 2014", "Scars" May 2015 |
    | AoS S3 | 2015–2016 | inferred | WP: "six months after" S2, "Emancipation" "in the aftermath of *Civil War*"; Fandom: "December 13, 2015 to January 24, 2016" |
    | AoS S4 | 2017 | inferred | WP: *GotG Vol. 2* "takes place earlier in the MCU continuity than the season is set"; Fandom: "picks up in March 2017" |
    | AoS S5 | 2017–2018 (part in 2091) | inferred | WP: last four episodes "set during the events of *Infinity War*"; Fandom: on-screen "12-06-2017"; the year 2091 |
    | AoS S6 | 2019 | **disputed** | WP: "one year after" S5, and the producers acknowledged it "no longer lined-up with the films' timeline" (Endgame's five-year Blip) |
    | AoS S7 | 2019–2020 (time travel 1931–1983) | **disputed** | WP categories 1931…2020; Fandom: epilogue "July 4, 2020". Inherits S6's conflict |
    | Inhumans | 2016 | inferred | Wikipedia: no timing. Fandom: after the Sokovia Accords, "August 26-31, 2016" |
    | Runaways S1 / S2 / S3 | 2017 / 2017 / 2017–2018 | inferred | Fandom: "October 2017"; then "24 hours" later; then "36 hours" later through "May 26, 2018" |
    | Cloak & Dagger S1 | 2017 | **disputed** | Fandom: evidence "extremely contradictory" (2015–2018 considered); 2017 "the strongest option" |
    | Cloak & Dagger S2 | 2017 | inferred | Fandom: "October 28, 2017 to November 4, 2017" |
    | Helstrom | 2020 | **disputed** | Fandom: "October 13-30, 2020", but the section is flagged dubious on Fandom itself |

  - These units are slotted into the MCU order after the last unit with the same or an earlier start year (ties broken by release date).
- **Episode-range splits** follow Wikipedia's diagram exactly:
  - *Daredevil: Born Again* S1 is split into ep. 1 (2026) and eps. 2–9 (2027).
  - *Eyes of Wakanda* is split into eps. 1–4 (1260 BC, 1200 BC, 1400, 1896).
  - *I Am Groot* is split into "ep. 1" and "eps. 2–10". The diagram counts **across seasons**: S1 has 5 episodes and S2 has 5, so "eps. 2–10" = S1E2–S2E5. That unit's release date is S1's (2022-08-10), with `end_date` 2023-09-06 (S2). Its phase comes from S1 (Phase Four), although S2 is Phase Five. The book puts episodes 2–5 in "Fall 2014", consistent with the diagram's 2014.
- **Phases and sagas** come from each Phase page's tables.
  - The One-Shots, the Netflix shows and the ABC/Hulu/Freeform shows have **no phase**: no source assigns one. (The One-Shots appear on the Phase Two box set, which is not a phase assignment.)
  - Phase Seven has no published saga name, so its saga is `null`.
- **Two different "Marvel Television"s** (decision R-8). Wikipedia uses the name for two separate entities, and the dataset keeps them apart:
  - `marvel-television-division`: "Marvel Television (division, 2010–2019)". Marvel Entertainment's TV division, founded 2010-06-28 and "folded into Marvel Studios" on 2019-12-10 (Wikipedia, *Marvel Television*). It made the ABC, Netflix, Hulu and Freeform series.
  - `marvel-television-banner`: "Marvel Television (Marvel Studios banner, 2024–)". Wikipedia: "a new 'Marvel Television' banner, separate from the Marvel Television division, starting with *Agatha All Along*". Used for *Agatha All Along*, *Daredevil: Born Again*, *VisionQuest*, *Zodiac* and *One Last Kill*.
  - Both carry `group: "Marvel Television"`, a distinct `short_label` and `active` years, so the UI can show them side by side without confusing them (presentation: D-1 in [DECISIONS.md](../DECISIONS.md)).
  - Marvel Studios Animation, Marvel Animation and Marvel Spotlight are labels under Marvel Studios. The studio filter matches on either studio or label.
- ***Wonder Man*** is listed by Wikipedia under both "Marvel Television" and "Marvel Spotlight". It is recorded as Marvel Spotlight.
- ***Echo*** was released on Disney+ and Hulu at the same time. Disney+ is recorded as the original platform.
- ***Endgame*** opens in 2018 but is placed in 2023, where most of it happens (Wikipedia's rule: "majority of the project").
- **Spider-Man MCU films** (*Homecoming*, *Far From Home*, *No Way Home*, *Brand New Day*) are co-productions with Sony/Columbia. They are recorded under Marvel Studios. *Brand New Day* is not on the Disney+ timeline (Sony distribution).

### 6. Other Marvel continuities

- **Fox X-Men** (`fox-x-men`) has two branches, both from the franchise article's Timeline section:
  - *Original*: Origins, First Class, X-Men, X2, The Last Stand, The Wolverine, and the future of DoFP.
  - *Revised*: created in 1973 by *Days of Future Past*.

  How the years were set:
  - *Origins* (1845–1979), *First Class* (1962), *DoFP* (1973, with a future in 2023), *Apocalypse* (1983) and *Dark Phoenix* (1992) are **stated** in the article.
  - *X-Men*, *X2*, *The Last Stand* and *The Wolverine* are **inferred** as c. their release year. The article says the settings are "mostly contemporaneous", and its timeline chart spans 2000–2006 and 2013.
  - *Deadpool*, *Deadpool 2*, *The New Mutants* and *Logan* are **disputed**. The chart places them (2016, 2018, 2020, 2029), but the article says continuity "is not uniform": Jackman calls *Logan* an alternate timeline, and *The New Mutants* "bears no obvious relationship".
  - *Origins* and *First Class* are on the *original* branch. They are shared history before the 1973 divergence, and the app should show them as common to both branches.
  - Fox's *Legion* and *The Gifted* are out of scope (Stage 0 decision 2), as is Fox's Fantastic Four.
- **SSU, Raimi and Webb Spider-Man** are `ordered-only`. Sources give no in-universe years, so `order_index` follows release order (sequels) and `precision` is `relative`. Connections to the MCU are links only:
  - *No Way Home* is linked to Raimi, Webb and *Let There Be Carnage*.
  - SSU release dates come from the SSU page table. Raimi and Webb dates come from Wikidata (US date).
- **X-Men: The Animated Series / X-Men '97** (`x-men-animated`) is `ordered-only`.
  - TAS is split into **seasons 1–5** (13, 13, 19, 21 and 10 episodes) from the `{{Series overview}}` on *List of X-Men: The Animated Series episodes* (decision R-9). Season 3's and season 4's air dates overlap, as Wikipedia lists them. The old combined id `x-men-the-animated-series-s1-5` is in `data/marvel/aliases.json`, so watched progress migrates.
  - X-Men '97 S1–S2 come from its Series overview.

### 7. Excluded or out of scope (kept visible in the drift report via `data/drift-ignore.json`)

| Item | Reason |
|---|---|
| *Armor Wars* | "In development", no date. Titles are added once they are dated or in production. |
| Untitled Nova film, *Shang-Chi* sequel, other "Future" items | Same rule. |
| *Legion*, *The Gifted* | Fox TV, out of scope. |
| Spider-Verse films, Fox *Fantastic Four*, *Blade*, *Ghost Rider* (2007), *Hulk* (2003), *Daredevil* (2003), *Elektra*, *Punisher* films | Out of scope (Stage 0 decision 2). Can be added later as `standalone-collection` continuities. |
| LEGO Marvel specials, *Spidey and His Amazing Friends*, *Marvel Studios: Assembled*, other documentaries | Not narrative MCU content. Not reviewed in detail. |

### 8. Upcoming titles (status as of 2026-11-26)

None of these are placed on the calendar ("Not yet placed (unreleased)", `disputed`). Status is `upcoming` whenever a date exists; Wikipedia's production status is shown for information.

| Unit | Release | Wikipedia status / note |
|---|---|---|
| *Avengers: Doomsday* | 2026-12-18 (US; premiere 2026-12-14) | Post-production |
| *Your Friendly Neighborhood Spider-Man* S2 | 2027-01-13 | |
| *Daredevil: Born Again* S3 | 2027-03 (month only) | |
| *Avengers: Secret Wars* | 2027-12-17 | Pre-production |
| *Your Friendly Neighborhood Spider-Man* S3 | 2028 (year only) | In production. Wikipedia tags the date **"better source needed"**. |
| *Zodiac* S1 | 2028 (year only) | Pre-production |
| Untitled X-Men film | 2028-05-05 | Pre-production. No Wikidata item found. |
| *Ghost Rider* | 2028-07-28 | |
| *Marvel Zombies: The Fist of Khonshu* | 2028-10 | Listed in Wikipedia's Series overview as "season 3" (2 episodes). Modelled as a named unit. |
| *Black Panther III* | 2028-12-15 | In development. No Wikidata item found. |
| *Your Friendly Neighborhood Spider-Man* S4 | 2029 (year only) | Wikipedia tags the date **"better source needed"**. |
| *Marvel Zombies: The Last Guardian* | 2029-10 | "Season 4" (2 episodes). |

*Spider-Man: Brand New Day* is **released**: US 2026-07-31; its infobox gives a 2026-07-27 premiere. *VisionQuest* is **released** (2026-10-13 to 2026-11-10).

### 9. What could not be verified

- **Fandom (MCU wiki)** is used **only** for the 14 adjacent-tier ABC/Hulu/Freeform seasons (see §5), and always as `inferred` or `disputed`. Every Marvel Studios and Netflix placement comes from Wikipedia.
- ***An Official Timeline*** was read only as transcribed on Wikipedia, not from the book itself. The same goes for the Disney+ order (Wikipedia cites Marvel.com, 2026-10-22).
- **TMDB.** No API key, so TMDB was never called. The `tmdb` ids are Wikidata's P4947/P4983 values and were not cross-checked.
- **Wikidata gaps.** There is no QID for the Untitled X-Men film, *Black Panther III* or *Zodiac*. Runtimes are filled for films, One-Shots and specials only. Wikidata's series runtimes are per episode and inconsistent, so `runtime_min` is `null` for series and `episode_count` is given instead.
- **X-Men (2000).** Wikidata lists odd US dates (2000-11-21, 2009-04-21; home-media rows). The Wikipedia table (2000-07-14) is used.
- **Release dates for the One-Shots** are digital-release dates from the One-Shots table. Physical releases came weeks later.

### 10. Maintenance

- `npm run verify`: schema, duplicates, referential integrity, in-universe rules, release/status consistency, drift against the cached sources, and the reference-image diff.
- `npm run verify -- --refetch`: re-downloads every source, rebuilds the candidates, and reports:
  - new titles and seasons;
  - moved release dates;
  - diagram moves;
  - Disney+ order changes;
  - statuses made stale by today's date;
  - source revision changes against `data/sources/curated-revisions.json`.
- Accepted, documented exceptions live in `data/drift-ignore.json`. Each has a reason.

### 11. Series added after Checkpoint 2 (user request: "each and every TV series")

Added by `scripts/migrations/2026-11-26-add-remaining-marvel-series.ts`. Release data comes from each Wikipedia article's season table, or from its infobox where there is no table. Continuity groupings are used only where Wikipedia states them:

| Series | Continuity / tier | Basis |
|---|---|---|
| *Agents of S.H.I.E.L.D.: Slingshot* (ABC.com, 2016) | MCU, adjacent, no year | "set in the Marvel Cinematic Universe … a supplement to Agents of S.H.I.E.L.D." Placed beside AoS S4. |
| *Legion* S1–3 (FX) | Fox X-Men, adjacent, unplaced | Hawley: the character's "subjective reality"; no placement given. |
| *The Gifted* S1–2 (Fox) | Fox X-Men, new branch "The Gifted (alternate timeline)" | "set in an alternate timeline to the X-Men film series where the X-Men have disappeared." |
| *Avengers Assemble*, *Guardians of the Galaxy* (TV), *Spider-Man* (2017) | New continuity `marvel-disney-xd` (order only) | Spider-Man (2017): "…which are set in the same continuity." GotG: "not a part of the Marvel Cinematic Universe." |
| *Marvel Anime*: Iron Man, Wolverine, X-Men, Blade | New continuity `marvel-anime` | "It will create an entire parallel universe for Marvel." Air dates from the four infoboxes. |
| *Spidey and His Amazing Friends*, *Iron Man and His Awesome Friends* | New continuity `spidey-friends` | "…as a spin-off of Spidey and His Amazing Friends". |
| *Ultimate Spider-Man*, *Hulk and the Agents of S.M.A.S.H.*, *EMH*, *Super Hero Squad*, *Iron Man: Armored Adventures*, *Wolverine and the X-Men*, *Moon Girl and Devil Dinosaur*, *M.O.D.O.K.*, *Hit-Monkey* | `marvel-animation-standalone` (each its own continuity) | No shared continuity stated in the fetched sources (decision D-12). |

**Studios:**
- These series are credited to the 2010–2019 Marvel Television division or to the Marvel Animation production company.
- The Marvel Animation company is a new registry entry, `marvel-animation-inc`. It is grouped with, but kept distinct from, the 2024 Marvel Studios "Marvel Animation" label. This is the same treatment as the two Marvel Televisions.

**Not added:** unaired pilots (*Marvel's Most Wanted*, *New Warriors*), and non-MCU animated features and specials (decision D-15).

---

## DC (Stage 3)

### 1. Summary

| | |
|---|---|
| Titles / units | 100 / 172 |
| Continuities | DCU 7 · DCEU 17 · Arrowverse 57 (incl. 9 crossover events) · Reeves 3 · Nolan 3 · Burton/Schumacher 4 · Joker 2 · Reeve-era Superman 6 · Smallville 10 · Gotham 5 · Titans 4 · Doom Patrol 4 · DCAU 24 · DCAMU 16 · Tomorrowverse 10 |
| In-universe confidence | stated 41 · inferred 120 · disputed 11 |
| Canon tier | core 168 · adjacent 4 (*Superman & Lois*) |
| Status (2026-11-26) | released 170 · upcoming 2 (*Man of Tomorrow* 2027-07-09, *The Batman: Part II* 2028-02-18) |

**Method:**
- `scripts/fetch` cached 39 DC Wikipedia pages (plus the Smallville and Gotham episode lists).
- `scripts/build/dc.ts` extracted the release tables: `{{Film overview}}`, `{{Series overview}}` (including split seasons such as "4A/4B"), the DCAMU first-cell table, and infoboxes.
- Wikidata supplied US release dates for films outside the overview tables.
- `scripts/bootstrap/dc.seed.ts` holds the curated decisions, and `scripts/bootstrap/dc.ts` writes `data/dc/`.
- In-universe research was done against Wikipedia (revision ids recorded in the research), with the Arrowverse Wiki and DC Database (Fandom) used only where Wikipedia is silent, and rated `inferred` at most. Every unit's note quotes its source.

**Unlike the MCU, DC has no single Wikipedia timeline diagram.** The DCEU and DCU pages each have a "Timeline" section, and everything else is assembled from article prose and categories.

### 2. Continuity decisions

- **DCU vs DCEU are separate continuities** (never merged).
  - **Peacemaker** is split into two titles (D-10): S1 → `dceu`, S2 → `dcu`, linked `continues`. The DCU page says "The majority of Peacemaker's first season is canon to the DCU, except for the cameo appearance of the DCEU Justice League".
  - **The Suicide Squad** stays DCEU (2021). Its note records Gunn's October 2026 statement that it is mostly DCU-canon but "would need to occur around 2023 or 2024".
  - **Blue Beetle** stays DCEU ("the final film in the DCEU timeline"). Its note records that the DCU only confirms the character.
- **DCEU branches:**
  - *Zack Snyder's Justice League* is on a "Snyder Cut (slightly alternate)" branch: Snyder said it "takes place in a slightly alternate universe".
  - *The Flash* (2023) stays on the main branch with a disputed note: it is set "in 2023 and 2013 of an alternative timeline".
- **Arrowverse Earths** are branches:

  | Branch | Notes |
  |---|---|
  | Earth-1 | main |
  | Earth-38 | Supergirl |
  | Jefferson's Earth | Black Lightning |
  | Earth-X | The Ray |
  | Earth-Prime | created at Crisis |
  | Earth-2 (post-Crisis) | Stargirl |
  | Earth adjacent to Earth-Prime | Superman & Lois, tier `adjacent` |

  - Earth-1, Earth-38 and Jefferson's Earth carry `merges_into: earth-prime` at December 2019. Source: *Crisis on Infinite Earths* (Arrowverse): they "were merged into Earth-Prime".
  - Seasons that switch Earth mid-season (Arrow S8 after E8, Flash S6 from E10, Supergirl S5 and Batwoman S1 after E9, Black Lightning S3 after E9) are kept on their pre-Crisis branch, with the switch in the unit note. Splitting them would need per-episode air dates.
- **Arrowverse crossover events** are watchable units of type `crossover-event`, with episode-level constituents (D-7): Flash vs. Arrow, Heroes Join Forces, Worlds Finest, Invasion!, Duet, Crisis on Earth-X, Elseworlds, Crisis on Infinite Earths, Armageddon. Crisis Part Five (a Legends special outside LoT S5 numbering) and the Black Lightning tie-in are mentioned in the note, not as constituents.
- **Titans and Doom Patrol are separate continuities.** Source: "Doom Patrol occupies a separate continuity from Titans". They are linked as `shares-characters`.
- **Reeve-era Superman** has two branches:
  - I → II → III → *Supergirl* (1984) → IV;
  - I → II → *Superman Returns*, which ignores "the events of Superman III, Supergirl, and Superman IV".
- **DCAMU and Tomorrowverse** are separate, order-only continuities. Tomorrowverse is "set after … Apokolips War, which ends the first story arc with a universal reset". Wikipedia gives no story order separate from release order. Category years exist for some DCAMU films but are not used.

### 3. Dating rules applied

- **Stated:** a sentence gives the year. Examples:
  - Wonder Woman 1918
  - Joker 1981
  - Shazam! "Christmas season of 2018"
  - Birds of Prey 2020
  - The Suicide Squad 2021
  - Superman "mid-2025"
  - Lanterns 2016/2026
  - The Penguin "November 2022"
  - Batman Beyond 2039
  - Arrow S1 2012, Flash S5 2018–19, Flash S8 2021–22, Flash S9 2023, LoT 2016–2020
- **Inferred:** year only from a "Films/Television series set in YYYY" category, from relative arithmetic, or from Fandom.
  - Arrowverse seasons without a stated year are "assumed contemporaneous with broadcast". The stated anchors all match broadcast years, which supports this.
  - Smallville S2–S9 are inferred the same way, between the S1 (2001) and finale (c. 2011) anchors.
- **Disputed:**
  - Zack Snyder's Justice League
  - Aquaman ("right after" vs "one year after")
  - Shazam! Fury of the Gods ("four years" vs "about two years")
  - The Flash (2023 vs categories)
  - Batwoman S1 (Fandom arithmetic gives 2018)
  - Superman & Lois (Earth retconned)
  - the two unreleased films
- **No year at all** (relative, ordered by sequel statements or release): Burton/Schumacher films, Superman I–II and Returns, Gotham, Titans, Doom Patrol, most of the DCAU, the DCAMU and the Tomorrowverse.

### 4. Not included (D-11)

- Lucifer, Swamp Thing (2019), Krypton, Pennyworth, Watchmen, Constantine (NBC; the research found it was retroactively folded into the Arrowverse via Matt Ryan's appearances), Teen Titans, Young Justice, Harley Quinn, the Lobo and Gotham Girls web shorts, and the standalone DC Universe Animated Original Movies.
- Upcoming DCU titles without a release date (*The Brave and the Bold*, *Swamp Thing*, Wonder Woman, Teen Titans, *Booster Gold*, …). *The People v. Gorilla Grodd* (2027) and *Mister Miracle* (2028) were not added because the overview row lacked an article link; this is a TODO.

### 5. Not verified

- Wikipedia revision ids for pages fetched only by the research agents (season articles, film articles) are recorded in the research but not cached in `data/sources/`. Their quotes were spot-checked where the page is cached: the DCEU, DCU, Joker and The Penguin quotes all matched.
- Gunn's October 2026 statements are very recent, and those pages may change. The weekly drift check will flag them.

---

## Godzilla & Kong (Stage 5)

60 titles, 61 units, 11 continuities, built with the generic pipeline (`scripts/bootstrap/godzilla-kong.*`).

- **Sources:** English Wikipedia, with revisions recorded in the research. Key pages are cached (Godzilla (franchise), Monsterverse, King Kong (franchise), and the main film articles). Wikidata supplies QIDs and runtimes. Wikizilla was not used.
- **Spot-check:** nine quotes were checked against the cached pages, and all matched (two differ only by link markup).

**Continuities**, each established by a quoted sentence:

| Continuity | What it contains |
|---|---|
| Monsterverse | Legendary's films and series |
| Toho Shōwa | "1954 … to 1975", plus *Zone Fighter*, which Toho places between *Megalon* and *Mechagodzilla* |
| Toho Heisei | "a direct sequel to the original 1954 film and ignores the subsequent events of the Shōwa series" |
| Kiryu duology | "the only films in the Millennium era to share continuity with each other" |
| TriStar 1998 + *Godzilla: The Series* + *GMK* | GMK "shares a standalone continuity with the 1998 American film" |
| Polygon anime trilogy | order only |
| *Minus One* / *Minus Zero* | "A sequel to Godzilla Minus One" |
| Standalone Godzilla titles | collection: Millennium anthology films, *Shin Godzilla* ("no ties to Legendary's MonsterVerse"), *Singular Point* ("no relation to Polygon's anime film trilogy"), the Hanna-Barbera series, *Godzilland*, *Godzilla Island*, *Chibi Godzilla* |
| King Kong 1933 line | 1933, *Son of Kong*, *Kong: The Animated Series* |
| King Kong 1976 line | 1976, *King Kong Lives* |
| Standalone King Kong titles | collection: 2005, *King Kong Escapes*, *The King Kong Show*, *The Mighty Kong*, *Kong: King of the Apes* |

- **Toho eras** are a grouping scheme (Shōwa / Heisei / Millennium / Reiwa), not continuities.
- **Release dates:** Toho titles use the Japanese release, with the US date (often a re-edited or retitled cut) in the release note. Hollywood titles use the US release.
- **In-universe years:**
  - **Stated:** e.g. Kong: Skull Island 1973, Godzilla (2014), Monarch (2015 and 2017), Megalon 1971, Biollante 1990, King Ghidorah 1992, GMK 2002, Shin Godzilla 2016, Singular Point 2030, Minus One 1945–47, Minus Zero 1949.
  - **Inferred:** where a year comes only from a "Films set in YYYY" category or from arithmetic.
  - **Relative:** many Shōwa films, the Kong lines.
  - **Disputed:** *Planet of the Monsters* ("20,000 years" vs a "2040s" category).
  - *Destroy All Monsters* is set in 1999, so it is later in-universe than the Shōwa films released after it. Seed order follows release; the year label shows the jump.
- **Not added:**
  - The US re-edits (*Godzilla, King of the Monsters!*, *Gigantis*, *Godzilla 1985*) are noted on their originals rather than added as separate titles (D-19).
  - Excluded: undated projects (the Lee Shaw spin-off, the Disney+ King Kong series), and titles without a Wikipedia article (*Godziban*, *Godziburst*, BKN's Kong direct-to-video sequels).
  - *Godzilla x Kong: Supernova* (2027-03-26) is upcoming and not placed.
- **Conflicts kept in notes:**
  - US date of *Gigantis* (1959-05-21 vs 06-02);
  - *Final Wars* US date;
  - *Kong: The Animated Series* air dates (franchise page vs series article).

---

## A Song of Ice and Fire / Game of Thrones (books pilot)

19 titles, 30 units, built with the generic pipeline (`scripts/bootstrap/asoiaf.*`).

- **Two continuities, never merged** (D-20):
  - `asoiaf-books`: novels, novellas, Fire & Blood, and two in-world histories.
  - `got-hbo`: Game of Thrones S1–8, House of the Dragon S1–4, A Knight of the Seven Kingdoms S1–2.
  - They are joined only by `adapts` links (e.g. GoT ↔ the five novels, HotD ↔ Fire & Blood / The Rogue Prince / The Princess and the Queen, AKOTSK ↔ The Hedge Knight / The Sworn Sword).
  - No source uses the word "continuity". The basis for the split is Wikipedia: "only the novels count as canon", and the show "deviat[es] from the novels" and used original content from season 6.
- **Calendar:** in-world AC/BC, with no year 0 (D-21). 1 AC is Aegon's coronation, and the Conquest war is 2–1 BC (A Wiki of Ice and Fire). BC years are stored as negative numbers.
- **In-universe years:**
  - Books: from A Wiki of Ice and Fire (awoiaf.westeros.org), which cites the books but doesn't quote them, so every book year is **inferred**.
  - *The Mystery Knight* is **disputed** (212 AC on its own page vs the 211 AC Timeline row).
  - TV years are inferred from what each season adapts (e.g. GoT S1 adapts A Game of Thrones, which is mostly 298 AC). GoT S5–8 have no year: they are mostly original content.
  - HotD S1 years (101 → 129 AC) match the episode summaries to wiki dates; Wikipedia never prints the numbers.
- **Release dates:**
  - Books use the first publication anywhere. For example, A Clash of Kings uses the UK Voyager edition (1998-11-16), with the US date in the note.
  - A Feast for Crows is month-only (2005-10); the exact days appear only in a hidden wikitext comment.
  - Novellas use the date of the anthology that first printed them (platform "Print: in a multi-author anthology"). The Sworn Sword's publisher is not stated in the sources.
- **Unpublished:** The Winds of Winter and A Dream of Spring are `upcoming` with no date or placement. HotD S4 (expected 2028) and AKOTSK S2 (expected 2027) are upcoming with year-only dates.
- **Lore books:** The World of Ice & Fire and The Rise of the Dragon are type `reference` and tier `adjacent` (in-world histories, not narrative).
- **Not added:**
  - the 2015 collection *A Knight of the Seven Kingdoms* (it contains the three novellas, which are already listed);
  - the announced film *Aegon's Conquest* (no date).
- **Spot-check:** several quotes were checked against the cached pages, and all matched modulo link markup (e.g. "only the novels count as [[canon (fiction)|canon]]").

---

## The Wheel of Time (books universe B2)

19 titles, 21 units, built with the generic pipeline (`scripts/bootstrap/wheel-of-time.*`).

- **Continuities:**
  - `wot-books`: 14 novels, the prequel *New Spring*, and two companions (`reference`, tier adjacent).
  - `wot-amazon`: Prime Video series S1–3, "canceled … after three seasons" on 2025-05-23.
  - `wot-other`: *Winter Dragon* (2015), a non-canon rights-retention pilot.
  - Books and series are linked only by `adapts`. The show departing from the books is a judgement from reviews; no source says "separate continuity" (D-23).
- **Calendar:** in-world NE years (the "Farede calendar"), with no year 0 (inferred from the wiki's 1–1000 NE ranges; D-22).
- **In-universe years:**
  - **Wikipedia gives none.** All NE years come from the Wheel of Time Wiki (Fandom) Timeline "Main Sequence" (998 NE: books 1–2; 999 NE: books 3–6; 1000 NE: books 7–14), which has no inline citations, so every year is **inferred**.
  - *New Spring* is 978–979 NE (Wikipedia: "Twenty years before the beginning of the series").
  - TV seasons have no year (relative only).
- **Release dates:**
  - US first publication (Tor). *The Dragon Reborn* uses 1991-10-15 (infobox and series table); its lead says September 15.
  - The *New Spring* novella (anthology *Legends*, 1998-08-25) is noted on the novel rather than listed separately.
  - Page counts come from each novel's infobox. They disagree with the series table, and neither gives the edition.
- **Not added:**
  - short stories ("The Strike at Shayol Ghul", "River of Souls", the non-canon "A Fire Within the Ways"): no publication dates were extracted (TODO);
  - *Origins of The Wheel of Time* (2022);
  - announced films with no dates (*The White Tower*, *The Age of Legends*).
