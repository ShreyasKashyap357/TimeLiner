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
| Units (films, seasons, episode ranges) | 142 |
| Continuities | MCU 115 units · Fox X-Men 13 · SSU 6 · Raimi 3 · Webb 2 · X-Men TAS/'97 3 |
| Canon tier | core 111 · outside-set-date 9 · adjacent 16 · non-placeable 6 |
| In-universe confidence | stated 88 · inferred 32 · disputed 22 |
| Status | released 130 · upcoming 12 |
| `verify` result | 0 integrity errors, 0 warnings, 0 un-ignored drift items |

### 2. How the data was produced

1. **Fetch.** `scripts/fetch/*` downloaded 36 Wikipedia pages through the MediaWiki API on 2026-11-26. Wikitext and rendered HTML are cached in `data/sources/wikipedia/`, and each page's revision id is in `data/sources/manifest.json`. Wikidata facts (QIDs, US release dates, runtimes, TMDB/IMDb ids) were fetched with `wbgetentities` and cached in `data/sources/wikidata/marvel.json`. No API key was used, and TMDB was not called.
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
  - Wikipedia's diagram and the Disney+ timeline both leave them out.
  - The series articles give no in-universe year for any season except *Agent Carter*: S1 "takes place in 1946"; S2 is "in 1947".
  - The rest are marked "Not placed by sources" and sit after all dated units, in release order.
  - **Not done:** these could be placed from the MCU Fandom wiki's episode-level dating. That is a sizeable research task, and the brief allows Fandom only for dating rationale, so I left them unplaced rather than guess. Tell me if you want it done.
- **Episode-range splits** follow Wikipedia's diagram exactly:
  - *Daredevil: Born Again* S1 is split into ep. 1 (2026) and eps. 2–9 (2027).
  - *Eyes of Wakanda* is split into eps. 1–4 (1260 BC, 1200 BC, 1400, 1896).
  - *I Am Groot* is split into "ep. 1" and "eps. 2–10". The diagram counts **across seasons**: S1 has 5 episodes and S2 has 5, so "eps. 2–10" = S1E2–S2E5. That unit's release date is S1's (2022-08-10), with `end_date` 2023-09-06 (S2). Its phase comes from S1 (Phase Four), although S2 is Phase Five. The book puts episodes 2–5 in "Fall 2014", consistent with the diagram's 2014.
- **Phases and sagas** come from each Phase page's tables.
  - The One-Shots, the Netflix shows and the ABC/Hulu/Freeform shows have **no phase**: no source assigns one. (The One-Shots appear on the Phase Two box set, which is not a phase assignment.)
  - Phase Seven has no published saga name, so its saga is `null`.
- **Studio vs label.** Wikipedia uses "Marvel Television" for two different things, so they are kept apart:
  - `marvel-television` is the 2010–2019 division (ABC, Netflix, Hulu, Freeform).
  - `marvel-television-label` is the banner Marvel Studios introduced in 2024 (*Agatha All Along*, *Daredevil: Born Again*, *VisionQuest*, *Zodiac*, *One Last Kill*).
  - Marvel Studios Animation, Marvel Animation and Marvel Spotlight are labels under Marvel Studios. The studio filter will match on either studio or label, so "Marvel Animation" works as expected.
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
  - TAS is **one unit** (S1–5, 76 episodes, 1992-10-31 to 1997-09-20, from its infobox). The article has no per-season table that the extractor can read. **TODO:** split it into seasons.
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

- **Fandom (MCU wiki).** The API was reachable, but its season pages have no structured in-universe dates. **No date in the dataset comes from Fandom.** All dating rationale is from Wikipedia (diagram, book table, Disney+ list, series articles).
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
