# Decisions log

Work continues stage to stage without stopping (user instruction, 2026-11-26). Open questions are collected here, each with the default I'm using until you answer. Defaults are chosen to be easy to reverse.

## Open: waiting on you

| # | Stage | Question | Default being used |
|---|---|---|---|
| D-1 | 1 | **How to present the two "Marvel Television" studios.** They are now distinct registry entries (see below). Options: **(a)** one "Marvel Television" filter group with two clearly labelled checkboxes, "Division, 2010–2019 (ABC / Netflix / Hulu / Freeform)" and "Marvel Studios banner, 2024–"; **(b)** two unrelated filters with no grouping; **(c)** show only the parent studio (Marvel Studios) for the 2024 banner and hide the banner name. | **(a)**. Badges also differ: "Marvel TV ’10–’19" (outlined, archive style) vs "Marvel Studios › Marvel TV banner" (breadcrumb). Each has a tooltip explaining they are different entities. |
| ~~D-2~~ | 2 | (superseded by R-13) **Default canon-tier filter.** The brief says "default: core only", but your reference image also shows the purple-diamond entries (FF: First Steps, Deadpool & Wolverine, YFNSM, Marvel Zombies), which are tier `outside-set-date`. | Default = **core + outside-set-date**, so the default view matches your image. Adjacent and non-placeable are off by default. |
| D-3 | 2 | **The brief's toggles "Marvel Television, adjacent, animated, non-placeable".** Netflix shows are Marvel Television (division) but `core`, and they appear in your image, so a "Marvel Television" toggle that is off by default would hide them. | Tier checkboxes for adjacent and non-placeable; the "Animated" quick toggle; Marvel Television (either entity) via the grouped Studio filter. Nothing Marvel-specific is hard-coded. |
| D-4 | 2 | **Bundle size.** The main JS chunk is about 200 KB gzipped (Zod validation and Radix). Data is already split per universe. | Leave as is for now. Optional later: skip runtime validation in production, or split views into lazy chunks. |
| D-5 | 2 | **GitHub Pages switch-on.** It needs the repo setting Pages → Source: GitHub Actions. | I'll try to enable it through the GitHub API. If that isn't permitted, you need to flip it once. |

### Stage 3: schema and app changes required by DC

All are backward compatible, and the Marvel data validates unchanged with 0 errors. Under R-10 I'm applying them with these defaults; any can be reverted.

| # | Change | Why |
|---|---|---|
| D-6 | **`Branch.merges_into` (optional)**: `{ branch, at, note }` | Arrowverse *Crisis on Infinite Earths* (Jan 2020) merges Earth-1, Earth-38 and others into Earth-Prime. Branches could already split (`parent` / `diverges_at`) but had no way to merge. |
| D-7 | **Episode-level crossover constituents**: `constituents` entries may be `"<unit id>#e<episode>"` | Arrowverse crossovers span single episodes inside season units (e.g. Arrow S8E8). Integrity checks that the unit exists, is in the same continuity, and that the episode number is within `episode_count`. Watched state stays on the event's own unit. Ticking an event does not tick whole seasons. |
| D-8 | **Removed Marvel defaults from app code** (`defaultState`/`fromQuery` fallbacks, connections colour) | Required by the "nothing Marvel-specific in app logic" rule. Universe and continuity defaults now come from `universes.json`. |
| D-9 | **New registry entries** (data only): DC Studios, DC Films, Warner Bros. Pictures/TV/Animation; The CW, The WB, Fox, Max/HBO Max, HBO, DC Universe streaming, Kids' WB, Cartoon Network, CW Seed | Open vocabularies, no code change. |
| D-10 | **Peacemaker split into two titles**: S1 → `dceu`, S2 → `dcu`, linked `continues` | Wikipedia says S2 is "set in the DCU continuity". A title belongs to exactly one continuity, and the alternative (a per-unit continuity override) would weaken the never-merge rule. |
| D-11 | **DC launch scope.** Included: DCU, DCEU, Arrowverse (+ Stargirl, Superman & Lois as determined by research), Reeves, Nolan, Burton/Schumacher, Joker, Reeve-era Superman films, Smallville, Gotham, Titans, Doom Patrol, DCAU, DCAMU, Tomorrowverse. **Deferred:** Lucifer, Swamp Thing (2019), Krypton, Pennyworth, Watchmen, Constantine (NBC, unless the research puts it in the Arrowverse), Teen Titans / Young Justice / Harley Quinn and other animation, and the standalone DC Universe Animated Original Movies. | Keeps Stage 3 reviewable. All deferred titles fit the existing model as `standalone-collection` continuities. |

### Added after Checkpoint 2 feedback

| # | Question | Default being used |
|---|---|---|
| D-12 | **Do *Ultimate Spider-Man* and *Hulk and the Agents of S.M.A.S.H.* share the Disney XD continuity** with *Avengers Assemble*, *Guardians of the Galaxy* and *Spider-Man* (2017)? The fetched sources only state it for the last three. | Kept in the standalone collection until a source states it. |
| D-13 | **Per-season split for the Disney XD-era cartoons.** Their articles have no season table, so each is one "Series" entry. | Fine for now; split later from their episode-list pages. |
| D-14 | **"Recommended watch order".** No source names a single recommended order. Marvel publishes its Disney+ timeline order, which is in the data. | The Watch order card offers Story, Release and official orders (with source), and doesn't call any one of them "recommended". |
| D-15 | **Non-MCU animated features and specials** (e.g. *Planet Hulk*, *Hulk vs.*, LEGO Marvel specials, Marvel Knights Animation) and the anime films. | Not added yet. They fit as `standalone-collection` entries; say if you want them. |

### Expansion: other universes and books

| # | Question | Default being used |
|---|---|---|
| D-16 | **Approve the book-support changes** in PLAN.md §8.2: book types, publishers, pages, `adapts` links, "Done" wording with read/watched, a Books toggle, and a spoiler-safe mode. | Not built until you approve. Then: schema first, then ASOIAF/GoT as the pilot (B1). |
| D-17 | **Order after DC.** Proposed: Godzilla & Kong → Star Wars → books pilot (ASOIAF/GoT) → Star Trek → Terminator/Halloween → Wizarding World/Middle-earth → Wheel of Time → Riordan → Indian universes → batches. | This order, unless you reprioritise. |
| D-18 | **Games** (The Witcher, Halo, Mass Effect, Star Wars games) as a third medium. | Out of scope for now. The book changes are designed so a "game" medium could be added the same way. |

## Resolved

| # | Stage | Decision | Answer |
|---|---|---|---|
| R-1 | 0 | MCU as one continuity with branches | Yes |
| R-2 | 0 | Marvel scope: MCU, Fox X-Men, SSU, Raimi, Webb, X-Men TAS/'97 | Yes |
| R-3 | 0 | Netflix shows `core`; ABC/Hulu/Freeform `adjacent` | Yes |
| R-4 | 0 | TMDB skipped (no key); Wikidata for ids | Yes |
| R-5 | 0 | Data licence CC BY-SA 4.0 | Yes |
| R-6 | 0 | UI library | shadcn/ui |
| R-7 | 0 | Hosting | GitHub Pages primary, Vercel optional |
| R-8 | 1 | Two "Marvel Television"s: keep separate | Yes. Ids `marvel-television-division` and `marvel-television-banner`, plus `group`, `short_label` and `active` years (migration 2026-11-26) |
| R-9 | 1 | X-Men: The Animated Series | Split into seasons 1–5 from Wikipedia's episode list. The old combined id is aliased so watched progress carries over. |
| R-11 | 1 | ABC/Hulu/Freeform placement | Researched: 14 seasons placed from Wikipedia tie-ins and MCU Fandom year pages (inferred/disputed, quoted in DATA_NOTES §5). Tier stays `adjacent`. |
| R-10 | 1 | Workflow | Don't stop at checkpoints; batch decisions here |
| R-13 | 2 | Default filter | Every tier is shown by default, including non-placeable (Loki, What If…?) and adjacent; the tier checkboxes narrow it (user: "each and every TV series to be there"). Replaces D-2. |
| R-14 | 2 | Missing series | Added 21 (migration `2026-11-26-add-remaining-marvel-series`): *Slingshot*, *Legion*, *The Gifted*, *M.O.D.O.K.*, *Hit-Monkey*, the Disney XD shows, the Marvel Anime series, *Spidey*, *Iron Man and His Awesome Friends*, *Moon Girl*, *EMH*, *Super Hero Squad*, *Armored Adventures*, *Wolverine and the X-Men*. Unaired pilots (*Marvel's Most Wanted*, *New Warriors*) are excluded. |
| R-15 | 2 | Sidebar | Sort and a Characters & teams picker in the filter sidebar; active-filter chips above the results; themed scrollbars; readable Disney+ order with period headings and #positions. |
| R-16 | 3–4 | DC | Applied defaults D-6–D-11 (schema additions, Peacemaker split, launch scope). DC enabled in the app. *The People v. Gorilla Grodd* added (dated 2027). |
| R-12 | 2 | UI look | The user's shadcn preset (`b3JSApUsds`, style **radix-lyra**, base **mauve**, Roboto + JetBrains Mono). It owns surfaces, cards, colours, fonts and radius. Universe accents (Marvel gold/red, DC blue) are used only for timeline chrome: spine, year headings and the main-branch marker. Root font size is 112.5% for readability. The header and filters are sticky, the top of the page is dashboard-style stat cards, and charts have tooltip cards. |
