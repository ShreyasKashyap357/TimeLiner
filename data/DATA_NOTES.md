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

## Star Wars (Stage 6)

56 titles, 78 units, built with the generic pipeline (`scripts/bootstrap/star-wars.*`).

- **Continuities:**
  - `sw-canon`: Lucasfilm canon. Wikipedia (*Star Wars in other media*): after April 2014 "the only preexisting works to be considered canonical … would be the primary episodic films and the 2008 The Clone Wars film and TV series", plus everything made since.
  - `sw-legends`: the pre-2014 screen works Lucasfilm "renamed the Expanded Universe Star Wars Legends": the Holiday Special, the two Ewok TV films, *Droids*, *Ewoks*, and *Clone Wars* (2003).
  - `sw-visions` (standalone collection, tier adjacent): Wikipedia says its stories "were not required to adhere to the established Star Wars timeline".
  - `sw-lego` (standalone collection, tier adjacent): Wikipedia is silent on canon status; Wookieepedia tags these non-canon.
- **Calendar:** BBY/ABY (before/after the Battle of Yavin), stored as negative/positive years with a year 0 (the battle year, shown as "0 ABY").
- **Confidence (D-24):**
  - `stated`: the year is written in Wikipedia (*The Phantom Menace* 32 BBY, *Revenge of the Sith* 19 BBY, *Obi-Wan Kenobi* 9 BBY, *Andor* S1 5 BBY, *The Acolyte* 132 BBY), **or** Wookieepedia cites it to Lucasfilm's official reference books (*Star Wars: Timelines*, 2023; *Galactic Atlas*). The note on each unit names that chain.
  - `inferred`: Wookieepedia derives the year itself (*Bad Batch* S2–3, *Mandalorian* S3, *Ahsoka*, *Skeleton Crew*, the *Tales* anthologies, *Young Jedi Adventures*, every Legends year).
  - `disputed`: the Holiday Special (canon status ambiguous; Leland Chee via Wookieepedia "~1.5 ABY") and *Ewoks* (Wookieepedia 3.5–4 ABY vs Wikipedia "retroactively set before the original trilogy").
- **Order:** canon and Legends are ordered by start year, then by release. Within 1 BBY the seed sets an explicit story rank (Rebels S4 → *Rogue One* → *A New Hope*), because Wikipedia says *Rogue One* is "set directly before Episode IV". This uses a new optional `rank` in the generic seed kit. *The Clone Wars* S3 sorts before S2 because its episodes start in 22 BBY.
- **Unplaced:** *Ahsoka* S2 (2027-01-20), *Maul – Shadow Lord* S2 (2027), and *Starfighter* (2027-05-28; "set five years after … The Rise of Skywalker") stay unplaced until release, as for Marvel.
- **Not added:** the books, comics and games (D-18); *Forces of Destiny* is one relative entry because its shorts span eras; Rebels' pilot film and shorts are noted on S1.
- **Not verified:** Wookieepedia pages were read by a research agent and are cited, not cached. Episode counts for Rebels S4 conflict (16 vs 15).

## Additions after the combined decisions (2026-11-27)

- **Recommended MCU order for new viewers (D-14, R-25).** The guides consulted: Popverse (2026-04-06), SuperHeroHype (2026-06-15), JustWatch (2026-03-17), Screen Rant reporting the official Disney+ "Doomsday" list (2026-08-16), Rotten Tomatoes (2026-11-13), and Screen Rant's Doomsday guide (2026-05-03).
  - **Method:** release order as the backbone. A change of order needed support from at least two guides, and none had it (every reordering came from SuperHeroHype alone).
  - **Essentials:** a unit is an essential when at least two of the five selective guides recommend it; the other 81 are optional. SuperHeroHype lists nearly everything, so it is recorded but not counted.
  - **Left out:** unreleased titles, and the Fox X-Men films that Disney+ recommends (they belong to another continuity).
  - **Could not be read:** IGN, Polygon, The Verge, Esquire and Reddit blocked automated fetching.
- **Word counts (D-31).** Wheel of Time (15) and ASOIAF 1–5 come from Wikipedia's book tables (pinned oldids), which cite Accelerated Reader BookFinder. *The Princess and the Queen* uses George R. R. Martin's "30,000 word novella", an approximate figure. Where another source differs, the unit note says so; the biggest gap is *The Shadow Rising* (341,730 vs The Wertzone's 386,000). The Dunk & Egg novellas, *Fire & Blood* and the companions have no reliable count and stay blank. Reading time in the UI assumes 250 words per minute.
- **Toho US re-edits (D-32).** Seven titles, type `re-edit`, in the collection `toho-us-versions` (tier adjacent), each linked to its original with `re-edit-of`.
  - The four "localized" re-edits come from the Godzilla (franchise) table. *Godzilla vs. the Thing* and *Ghidrah* are what Wikipedia calls "American versions" (lighter cuts). *Godzilla 2000* is the TriStar re-edit and dub.
  - US release dates: 1956, 1963 and 1964 are single-city premieres (noted). *Gigantis* is 1959-05-21, with 1959-06-02 also reported.
  - Dub-only US releases are not listed.
- **Marvel Specials (D-15, D-30).** 48 titles in `marvel-specials` (standalone collection), each tagged with an Origin from Wikipedia at pinned revisions: Marvel Animated Features, Marvel Knights motion comics (new type `motion-comic`), anime films, Heroes United, Hulk: Where Monsters Dwell, Marvel Super Hero Adventures, Marvel Rising, LEGO Marvel, and *Phineas and Ferb: Mission Marvel*.
  - 10 titles are dated to the year only (9 LEGO titles and *Frost Fight!*), so no day was invented.
  - *Marvel Rising: Heart of Iron* has two dates (2019-04-03 vs 03-31); the article's date is used.
  - For the YouTube specials, the public release date is used rather than the convention premiere.
- **Calendar notes (D-21, D-22).** Every era calendar now says in the Key how its years count and whether it has a year 0.
- **DC deferred titles (D-11).** These had been held back only to keep the first DC release small. They are now added from English Wikipedia (pinned revisions, no fan wikis): 15 series (one more, *Creature Commandos*, was already in), the standalone DC Universe Animated Original Movies, and their tie-in films and specials. That is 55 titles. Placement:
  - *Constantine* (NBC) is in the Arrowverse on Earth-1, just before *Arrow* S4. Source: Ryan's role "retroactively established Constantine as part of the same continuity". No in-universe year is given.
  - *Batman: Gotham Knight* sits between *Batman Begins* and *The Dark Knight*, because it is set "specifically between" them.
  - *Batman and Harley Quinn* and *Justice League vs. the Fatal Five* go in the DCAU as adjacent and unplaced, because their DCAU canon status is open. The only years for them come from Wikipedia categories, so they are not used.
  - *Pennyworth* has its own continuity, linked to *Gotham* (D-27). *Kite Man* shares *Harley Quinn*'s continuity ("serves as a spin-off").
  - Several small continuities group sequels: Superman/Batman (*Public Enemies*, *Apocalypse*), *Crisis on Two Earths* with *Doom*, and the Arkhamverse (disputed).
  - Everything else is its own continuity. One-off films go in `dc-animated-standalone`.
  - *Lucifer* and *Swamp Thing* stay separate. Like *Titans* and *Doom Patrol*, *Crisis on Infinite Earths* only gives them Earth numbers through cameos.
  - Years are set only where prose states them: *Watchmen* (2019) "in 2019", and the *Watchmen* film (1985).
- **Conflicting release dates.** The film article's date is used and the list article's date is noted: *Superman: Doomsday*, *Under the Red Hood*, *Emerald Knights*, *The Killing Joke*, and *Knightfall* Part 2. *Knightfall* Part 3 is "2027" only.
- **Ids.** Tie-in films and specials without their own article get ids built from their titles (e.g. `teen-titans-go-to-the-movies`).

## Star Trek (Stage 7)

28 titles and 69 units, built with the generic pipeline (`scripts/bootstrap/star-trek.*`). Wikipedia revision ids: "Timeline of Star Trek" 1383643145, "List of Star Trek television series" 1381814313, "List of Star Trek films" 1387901605, and each season or film article (the revids are in the research report).

- **Continuities**
  - `st-prime`: every series plus the 1979–2002 films and *Section 31*. Source: Discovery "would be set in the 'Prime Timeline' alongside the previous Star Trek series, rather than in the alternate 'Kelvin Timeline'".
  - `st-kelvin`: the 2009, 2013 and 2016 films. The Okudas named the timeline in official reference guides; it begins with Nero's attack on the USS Kelvin in 2233.
  - `st-other`: *Very Short Treks*, "five non-canon shorts".
- **Years (D-33)**
  - Most years come from the settings table in "Timeline of Star Trek". That table is tagged "more citations needed", but Wikipedia does state the years, so they are rated `stated`.
  - Where Wikipedia contradicts itself, the year is `disputed`:
    - *The Motion Picture*: 2271 (Okuda) or 2273 (Ayers). 2271 is used.
    - *Discovery* S2: 2257–2258 or 2258–2259.
    - *Strange New Worlds* S2: 2259, but Memory Alpha dates the finale to 2261.
    - *Section 31*: 2324 or 2257. The film article says "early 24th century", so 2324 is used.
    - *Picard* S2: 2401 or 2400.
  - Memory Alpha years (from on-screen stardates) are `inferred`: *Lower Decks* S2–S5 and *Prodigy* S2. The *Lower Decks* S5 dating is weak.
  - TNG seasons follow Okuda's rule that each season is one year (2364–2370). DS9 (2369–2375) and Voyager (2371–2378) are dated the same way.
- **Order:** within the Prime timeline, units sort by start year, then by release date. *Discovery* S3–S5 sit in the 32nd century (3188–3191), after *Picard*, because "they travel to the 32nd century, which is the setting for subsequent seasons".
- **Short Treks** episodes are set in many eras (2232 to the 43rd century), so both seasons are relative entries with the episode years in the note.
- **Release-date conflicts:**
  - TOS premiere: 1966-09-08, or 09-06 per the series infobox.
  - DS9 finale: 1999-05-31 or 06-02.
  - *Starfleet Academy* premiere: 01-15 or 01-16.
  - *Into Darkness*: 2013-05-17, or 05-15 per the infobox.
- **Not added:**
  - "The Cage" (unaired pilot): no release date was captured.
  - *Star Trek: Scouts*: no Wikipedia article and no setting.
  - The untitled live-action comedy.
  - The cancelled *Star Trek 4*.
- **Upcoming:** *Strange New Worlds* S5 (TBA) and *Starfleet Academy* S2 (March 2027) stay unplaced until release.
- **Official viewing order (D-34):** StarTrek.com publishes a series-level "Viewing Order Guide" (2026-07-20). It was read only through a summarising fetch, so it has not been added as an official order yet.

## Cast & crew (D-29)

- **Source:** Wikidata (CC0), looked up by each title's English Wikipedia article. The properties used are author (P50), cast (P161, with character role P453 or P4633), director (P57), screenwriter (P58), producer (P162), executive producer (P1431), composer (P86) and creator (P170).
- **What is stored:** the first 10 cast members in Wikidata's statement order, which is usually billing order but not guaranteed, and up to 8 people per crew role.
- **What is left out:**
  - people with no English label;
  - titles whose article is shared with other titles (list pages such as the LEGO or Tales anthologies), since the article does not describe any one of them.
- **Credits are per title, not per season.** Wikidata rarely has season-level items.
- **Coverage on 2026-11-27:** 408 of 523 titles.
- **Refresh:** `npm run credits`.

## Combined decisions, round 2 (2026-11-27)

- **Marvel Disney XD shows (D-12).** There are two continuities:
  - `marvel-xd-2012`: *Ultimate Spider-Man*, *Hulk and the Agents of S.M.A.S.H.*, and *Avengers Assemble* S1–4.
  - `marvel-disney-xd`: *Guardians of the Galaxy* (2015), *Spider-Man* (2017), and *Avengers: Black Panther's Quest*.
  - Sources: Wikipedia's "Marvel Animation" ("would be a part of the same fictional universe", Marvel, May 2013), and "Spider-Man (2017 TV series)" citing writer Harrison Wilcox (2020-07-13): "Ultimate Spider-Man, Agents of SMASH, and Seasons 1-4 of Avengers are all in the same continuity. Guardians, Marvel's Spider-Man, and Black Panther's Quest are all in another continuity."
  - That is a writer's tweet, not an official Marvel statement.
  - Season dates come from the episode-list articles. Old series-level ids are aliased to the new season ids.
  - *Black Panther's Quest* is its own title, linked to *Avengers Assemble*.
- **More DC titles (D-11).** 21 added:
  - 14 DC Showcase shorts, from the DC Showcase table in DCUAOM (rev 1388055290). *Kamandi* goes in the Tomorrowverse and *Constantine: The House of Mystery* in the DCAMU, right after *Apokolips War*; both are sourced. *Catwoman* and *Death in the Family* get links.
  - *Lobo* (2000) is standalone, since its DCAU status is "still disputed". *Gotham Girls* is in the DCAU ("It takes place in the DC Animated Universe").
  - *Mister Miracle* is in the DCU, unreleased, with only the year (2028).
  - *DC Super Hero Girls* (2015 and 2019), *Batman: Caped Crusader* and *My Adventures with Superman* each have their own continuity, since no source places them in one.
- **Cast & crew (D-29 answer).**
  - Cast is no longer capped: every Wikidata cast member is kept, with Wikidata character ids, so the same character can be matched across titles and universes.
  - Cameos (D-35): Wikidata has no cameo qualifier on these items (checked: only P453, P4633, P1545 and P1810 are used). `scripts/fetch/cameos.ts` keeps each Wikipedia sentence that mentions "cameo", along with its linked names. A cast credit is flagged as a cameo only if that person, or their character, is linked in one of those sentences. No new people are added this way.
- **Watch orders.** Each new recommended order comes with its guides, their dates, a written criteria text, and the guides supporting each entry (`unit_sources`).
  - Release order is the backbone; a change needs at least 2 guides to agree.
  - Exceptions: Star Wars (saga films first, agreed by 2 guides); Star Trek (grouped by crew, agreed by 2); MonsterVerse (*Monarch* S1 after *Godzilla* 2014, agreed by 2).
  - The MonsterVerse essentials rule (D-36) and HotD S3 (D-37) are judgement calls.
  - Official orders:
    - StarWars.com "Star Wars Movies and Series Viewing Guide": 28 chronological entries, verbatim.
    - StarTrek.com, published 2026-07-20: series-level order, verbatim. Each series is shown in full in that order.
  - Orders never mix continuities (D-38).
- **Word counts (D-31).**
  - Counts now carry `word_count_source` and are shown with a numbered citation.
  - *The Wheel of Time Companion*: about 350,000. This is a pre-publication figure from editor Harriet McDougal, reported by The Wertzone (Worldcon 2014).
  - The Wheel of Time Wiki's books table (oldid 165374, uncited) gives different counts. These are noted on each book.
  - Not used: ReadingLength's "Guess" values (*Fire & Blood* 176,500; *The Hedge Knight* 42,000, comic edition) and a from-memory forum figure. No count was found for *The Sworn Sword*, *The Mystery Knight*, *The Rise of the Dragon*, *The Sons of the Dragon*, *The Rogue Prince* or *The World of Ice & Fire*.

## Rick Riordan (books universe B3)

40 titles and 42 units, built with the generic pipeline (`scripts/bootstrap/riordan.*`; the seed is generated from the 2026-11-27 research).

- **Continuities**
  - `riordanverse-books` is one shared continuity. Wikipedia says the Camp Half-Blood Chronicles, The Kane Chronicles and Magnus Chase are "the same fictional universe" (three articles agree). Each series is a **Series** grouping, filterable.
  - `percy-jackson-films`: the 2010 and 2013 films (20th Century Fox).
  - `percy-jackson-disney-plus`: the series, one book per season.
  - Screen and books are linked by `adapts` and never merged.
- **Calendar (D-40)**
  - Story order only. The Riordan Wiki: "Rick Riordan has stated that there is no specific year or timeline that the series takes place as book time is not tied to real time."
  - Order follows the wiki's Timeline page (revid 677864). For example, the Camp Half-Blood books fall between The Lightning Thief and The Sea of Monsters, and the Senior Year books between Heroes of Olympus and Trials of Apollo.
  - The wiki's "de facto" years (Important Dates, revid 680547: 2006–2011) appear in labels as "(fan-dated)" and are rated inferred. The Ship of the Dead is disputed, because the wiki notes its Ramadan scene implies 2014–2017.
- **Release dates**
  - US first publication, from each novel's infobox or lead.
  - Conflicts: The Lightning Thief is July 1, 2005, not the series infobox's June 28 (the audiobook date). The Throne of Fire is May 3, 2011, not the infobox's May 9. Chalice of the Gods is September 26, 2023, not September 23.
  - The Wild Zone (2026-09-29) lists Random House as its publisher. The Rite of Aphrodite (2027-03-30) is upcoming and has no article of its own.
- **Disney+ series**
  - Seasons 1 and 2, plus season 3, which started 2026-11-20 and finishes 2026-12-11.
  - Season 3 adapts The Titan's Curse.
- **Characters:** series protagonists only, from each series' Wikipedia premise.
- **Not added (D-41)**
  - Demigods of Olympus, an interactive ebook with no place on the wiki Timeline.
  - The graphic novels, The Ultimate Guide (not by Riordan), the musical and the video game.
  - Unannounced books, such as Senior Year 3 and Camp Half-Blood 3–4.

## Middle-earth (Tolkien)

25 titles and 38 units, built with the generic pipeline (`scripts/bootstrap/middle-earth.*`, generated from the 2026-11-27 research). Years come from Wikipedia, plus LOTR Fandom for inferred years. Tolkien Gateway was behind a Cloudflare challenge and could not be used.

- **Continuities (never merged).** One per production:
  - `me-legendarium` (the books);
  - `me-jackson`: Jackson's six films, *The War of the Rohirrim* ("connected to the film trilogy's continuity") and *The Hunt for Gollum* ("set between" the two trilogies; unreleased, 2027-12-17);
  - `me-rings-of-power`;
  - `me-rankin-bass`: the 1980 *Return of the King* "is a sequel to The Hobbit (1977)", not to Bakshi's film;
  - `me-bakshi`;
  - `me-khraniteli`;
  - `me-hobitit`.
- **Calendar (D-42).** A new `ages` calendar type:
  - Ages: F.A. (590 years), S.A. (3,441), T.A. (3,021), then the Fourth Age. Lengths are from Wikipedia's "History of Arda" ("S.A. 3442 became T.A. 1").
  - Storage: one running year count, so entries sort.
  - Display: always "T.A. 2941" and so on.
  - The Fourth Age starts after T.A. 3021. Gondor reckoned it from 25 March 3021.
- **Years.**
  - *The Hobbit* is T.A. 2941 (stated).
  - The Lord of the Rings volumes and the Silmarillion-derived books come from LOTR Fandom (inferred).
  - Screen adaptations take the book years (inferred), because none states a year on screen.
  - Jackson's *Return of the King* is disputed: its epilogue says "Four years later", but in the book Frodo leaves in 3021.
  - *The Rings of Power* is the Second Age only, no years. Wikipedia: the time is "condensed".
  - *The Silmarillion*, *Unfinished Tales* and *The History of Middle-earth* span the Ages, so they are relative.
- **`adapts` links.** *The Rings of Power*, *War of the Rohirrim* and *Hunt for Gollum* draw on the appendices, which are not a title of their own, so their links point to *The Return of the King* or *The Fellowship of the Ring*. These links are approximate.
- **Not added (D-43).**
  - The BBC radio dramas (1955–56, 1968 *The Hobbit*, 1981). There is no radio medium yet. The 1968 date is also disputed: the article says 1968, but its body says "autumn of 1969".
  - Release dates still missing: US dates for *The Hobbit* ("early in 1938"), *The Silmarillion*, *Unfinished Tales* and *The Fall of Númenor*; *Unfinished Tales* has only a year.

## James Bond and Fast & Furious

Both are built with the generic pipeline from the 2026-11-27 research. Every title has its Wikipedia revid in that research.

- **James Bond:** 49 titles and 56 units.
  - **Continuities:**
    - `bond-eon-classic`: 1962–2002. Wikipedia calls Casino Royale (2006) "the first Bond film not to be part of the franchise's original loose continuity". A "Bond actor" grouping (Connery to Brosnan) is filterable.
    - `bond-eon-craig`: the reboot.
    - Three single-title non-Eon productions: Climax! (1954), Casino Royale (1967) and Never Say Never Again.
    - `bond-fleming`: the novels, with collections split into one unit per story. The period-set continuation novels sit in the adjacent tier.
    - `bond-gardner-benson`: so far only Licence Renewed.
    - `bond-deaver`: Carte Blanche.
  - **Years:**
    - Films: years come only from "Films set in …" categories, so they are inferred. The rest are relative and anchored between their neighbours in story order.
    - Fleming books: "Fleming did not date the events". Years are from the Griswold and Chancellor chronologies as Wikipedia reports them. Where the two disagree, the year is marked disputed.
  - **The Bond novel *Solo*** has the id `solo-novel`, because ids are shared across universes.
- **Fast & Furious:** 15 titles and 20 units.
  - **`ff-main`** holds the story order: The Fast and the Furious, Turbo-Charged Prelude, 2 Fast 2 Furious, Los Bandoleros, Fast & Furious, Fast Five, 6, Tokyo Drift ("set between Fast & Furious 6 (2013) and Furious 7 (2015)"), 7, Fate, Hobbs & Shaw, F9, Fast X, then Fast Forever (unreleased, 2028-03-17).
  - **Years** come from the F&F wiki Timeline and categories, so they are inferred.
  - **The first film is disputed:** it is 2001 by release, but the "five years after" statements imply about 2004.
  - **Hobbs & Shaw vs F9:** both are "two years after" Fate, so release order decides between them.
  - **Spy Racers** is separate (D-44): no source places it in the film timeline.

## Cameos from fan wikis (D-35 answer)

The research checked these wikis: Marvel Database, MCU Wiki, DC Database, DCEU Wiki, Wookieepedia, Memory Alpha, Gojipedia, GoT Wiki and WoT Wiki.

- **Only three have an explicit cameo marker:** Marvel Database and DC Database (`{{Cameo}}` on Appearances entries) and Gojipedia (informal "(Cameo)").
- **The others use "cameo" only in prose or trivia.** They mark *uncredited* roles instead, which is not the same thing. Their prose mentions are not used automatically (too many false hits: cameos in other works, cut or planned cameos).
- **Kept:** `data/sources/fandom/cameos.json` holds 183 explicit markers, each pinned to the page revision. Organisations and speculative entries are dropped.
- **Matching:** `apply-credits` flags the cast credit playing the marked character. A marked character with no cast entry is still listed as a cameo, "actor not listed" (cameos count as characters).
- **Citations:** every cameo shows its source as a link. `[Wikipedia]` points to the article revision; `[marvel fan wiki]` and the like point to the fan-wiki page revision.
- **Totals on 2026-11-27:** 324 cameos, 241 via Wikipedia and 83 via fan wikis.
- **Not covered:** TV cameos are recorded on episode pages, which were not fetched.

## DC: classic and one-off titles (2026-11-27)

130 titles were added by `scripts/migrations/2026-11-27-dc-classic-titles.ts`, which brings DC to 307 titles in about 90 continuities. Gaps were found by checking every entry in "List of films based on DC Comics publications" (rev 1387967845) and "List of television series based on DC Comics publications" (rev 1378836384) against the dataset, then reading each article.

- **What was added:**
  - **Serials:** all 10 (Captain Marvel, Spy Smasher, Batman 1943/1949, Superman 1948/1950 and others).
  - **Live action, 1950s–2000s:** Superman and the Mole Men with Adventures of Superman; Batman '66 (series and film); Wonder Woman (1975–79); Shazam! and Isis; Swamp Thing (films and series); Superboy; The Flash (1990); Lois & Clark; Human Target (1992 and 2010); Birds of Prey (2002); Steel, Catwoman, Constantine (2005), Jonah Hex and Green Lantern; Powerless, Naomi and Gotham Knights.
  - **Animation:** the 17 Fleischer/Famous Superman shorts (one title, each short dated); the Filmation shows; all 7 Super Friends series; The Batman (2004); Krypto; Legion of Super Heroes; Green Lantern: TAS; Batwheels and later shows; Lego DC films; Batman Ninja; and others.
  - **DC imprint adaptations (D-47):** e.g. V for Vendetta, Stardust, The Sandman, Preacher, Sweet Tooth.
- **Continuities:**
  - Groupings with a source quote: Reeves Superman (Mole Men "subsequently edited into a two-part storyline"); Batman '66 (the film "takes place between the first and second seasons"); Super Friends (all 7 "considered … one continuous canon"); the serial pairs; Swamp Thing films; Batman Ninja; Batman Unlimited; Red; The Sandman with Dead Boy Detectives.
  - Inferred groupings (D-46): Filmation 1960s, Lego DC films.
  - Disputed, kept in the adjacent tier (D-48): the Batman '66 animated films, Swamp Thing (1990) as a continuation of the films, and the Aquaman (2006) pilot.
  - Linked, never merged: The Flash (1990) to the Arrowverse (Earth-90); Green Lantern: TAS to Young Justice ("canon 'adjacent'"); Aquaman: King of Atlantis to Aquaman (2018); Krypto Saves the Day! to Superman (2025); the Aquaman pilot to Smallville.
  - Everything else goes in "DC live action (standalone)" or "DC animation (other standalone)".
- **Dates:** US release or first air dates from infoboxes and series overviews.
  - Stamp Day for Superman has the year only (1954); Mole Men has the month only (1951-11).
  - For Super Friends, the dates are from its episode-list overview (the infobox's last date counts reruns).
- **Name clash:** the 1973 and 1980 "Super Friends" series use Wikipedia's disambiguated titles.
- **Excluded:** the cancelled Batgirl film, six rerun or package shows, and a toy line. Not researched: motion comics, small web series, unaired pilots and unscripted shows.

## Terminator, Halloween, Wizarding World (2026-11-27)

Generated with the generic research-to-seed generator. Revids are in the research files; the per-title source URLs are in the data.

- **Terminator (9 titles).**
  - **`terminator-main` is one continuity built from Wikipedia's "story chronology" table.** The trunk is The Terminator (1984, future war 2029), T2 (1995), T3 (2003) and Salvation (2018). Three branches leave after T2 (1995):
    - The Sarah Connor Chronicles ("disregarding the events of Terminator 3");
    - Dark Fate ("ignoring the events of T3, Salvation and Genisys");
    - T2-3D ("a mini-sequel to T2").
  - **Genisys (D-52)** is its own continuity. T2's events "are disregarded", and Wikipedia calls it a reboot, though a Skydance executive said "nor is it exactly a reboot".
  - **Terminator Zero (D-53)** is its own continuity ("an alternate 1997 Japan"), even though its showrunner "treats all of the prior films as canon".
  - **Date conflicts:**
    - The Sarah Connor Chronicles moves T2 to 1997 and the future war to 2027.
    - Judgment Day differs by branch (1997, 2003, 2011, 2017, early 2020s).
    - The Sarah Connor Chronicles S2 and T2-3D have no stated year.
- **Halloween (13 titles).** `halloween-myers`:
  - **Main line:** 1978, II (same night), 4 (1988), 5 (1989), 6 (1995).
  - **H20 branch:** H20 (1998) and Resurrection (2002). It "ignor[es] the Thorn Trilogy"; fans still debate this (D-54).
  - **2018 branch:** 2018, Kills and Ends (2022). It is a "direct sequel … ignoring the events of all previous films".
  - **Separate continuities:** Season of the Witch (1982) and Rob Zombie's films (2007, and II set in 2008).
  - **Disputed:** Halloween II (2009). Its plot says "Fifteen years later", but the 2007 film says "seventeen years later".
  - **Names:** the 1978, 2007 and 2018 films use Wikipedia's disambiguated titles.
- **Wizarding World (28 titles).**
  - **`wizarding-world-books`:** the 7 novels (UK Bloomsbury first editions; US Scholastic dates in the notes), the companion books, the 2016 e-books, and Cursed Child. Rowling: the play "should be considered canon". The play's first performance was 2016-06-07 and its official opening 2016-07-30. The script book is in the adjacent tier.
  - **`wizarding-world-films`:** the 8 Harry Potter films plus Fantastic Beasts ("the Wizarding World shared universe").
  - **`hbo-harry-potter`:** "a reboot". Season 1 is due 2026-12-25; season 2 has no date.
  - **Years:** stated in prose for Philosopher's Stone and Chamber of Secrets (1991–93), the films' years, Fantastic Beasts (1926, 1927) and Cursed Child (2017). The rest come from Wikipedia categories and the Harry Potter Wiki (inferred).
  - **Epilogues:** main-story years only; the 2017 epilogues are in the notes (D-55).
  - **Conflict:** Cursed Child's Broadway opening date (22 vs 21 April 2018); 22 April is used.

## Audio, stage and Riordan extras (2026-11-27)

`scripts/migrations/2026-11-27-audio-stage-riordan-extras.ts` adds these. Every production is its own continuity, linked with `adapts` or `shares-characters`. Sources are Wikipedia and the Riordan Wiki at pinned revisions.

- **Audio:**
  - Middle-earth: BBC *The Lord of the Rings* 1955–56 and 1981; *The Hobbit* 1968 (disputed against autumn 1969).
  - Star Wars: the NPR/KUSC radio dramas, 1981 and 1983, plus HighBridge in 1996 (`sw-radio`; called canon in 1994, Legends since 2014).
  - Marvel: *Wolverine* (Stitcher), *Marvels* (late 2019), *Wastelanders*.
  - DC: *Batman Unburied*, *Harley Quinn and The Joker: Sound Mind*, *The Sandman* (Audible).
  - Star Trek: *Khan*, which goes in `st-prime` at 2267–2285 (inferred), between "Space Seed" and *The Wrath of Khan*.
  - James Bond: BBC Radio 4's Toby Stephens adaptations (2008–2020), plus two other radio plays.
- **Stage:**
  - The Lord of the Rings musical: Toronto 2006, London 2007.
  - Spider-Man: Turn Off the Dark: first preview 2010-11-28, opened 2011-06-14.
  - Batman Live (2011).
  - Marvel Universe Live! (2014, 2017).
  - The Lightning Thief musical: Off-Broadway 2014/2017, Broadway 2019, London 2024–25.
- **Riordan (R-46, include all):**
  - 13 graphic novels, in `riordan-graphic-novels`, linked to each book. The Red Pyramid graphic novel is 2012-10-02, not Wikipedia's apparent copy error.
  - The Ultimate Guide and the Kane Chronicles Survival Guide, in the adjacent tier.
  - Demigods of Olympus, as its own continuity: a reader-created hero.
  - Singer of Apollo.
  - The Lightning Thief DS game, now that games are a medium.
  - The Demigod Files and The Demigod Diaries are split into one unit per story. Each is placed by the Riordan Wiki Timeline (inferred or disputed), and the old ids are aliased.

## Gundam and watch orders, batch 2 (2026-11-27)

- **Gundam (40 titles, 13 continuities).** Each calendar is its own continuity: U.C., the GQuuuuuuX alternate U.C., F.C., A.C., A.W., C.C., C.E., AD (Gundam 00), A.G., P.D., R.C., A.S., and the Build series (story order only).
  - Era calendars can now put the label before the year and zero-pad it ("U.C. 0079").
  - Years come from article prose. Where prose is silent, they come from the "Timeline and year" table in Wikipedia's Gundam franchise article.
  - Release dates are US where Wikipedia gives a full day, otherwise the Japanese premiere (the note says which).
  - Not included: SD Gundam, Twilight Axis, Silver Phantom, the 2027 titles, and the compilation films.
- **More watch orders (D-56, D-57).** Arrowverse, Riordan (reading order), Middle-earth films and books, Bond classic and Craig, Fast & Furious, and The Wheel of Time.
  - Same method as before: collated guides, essential/optional, and per-entry guide support.
  - Orders now expand split units through `aliases.json`. The Demigod Files and Diaries are listed story by story.
