# TimeLiner: Plan (Stage 0)

Status: **approved 2026-11-26.** Decisions:
1. MCU is one continuity with branches.
2. Marvel scope: MCU, Fox X-Men, SSU, Raimi, Webb, X-Men TAS/'97.
3. Netflix Defenders shows are core; the ABC/Hulu/Freeform shows are `adjacent`.
4. No TMDB; use Wikidata.
5. Data is CC BY-SA.

Sections 7–8 (scalability, future universes) were added after approval.

Nothing in this file is verified data. Every continuity and title list below is a proposal that Stage 1 (Marvel) and Stage 3 (DC) must confirm against sources.

## 1. Stack

**Vite + TypeScript + React 18, Vitest, Playwright, Zod.** Static build. Production is GitHub Pages, deployed by a GitHub Actions workflow on every push to `main`. Vercel is optional and adds a preview link for each PR. The Vite `base` path comes from an env var (`/TimeLiner/` on Pages, `/` on Vercel), so the same build works on both. There are no server features, so nothing ties the app to either host.

Why React over Svelte:
- Nine views share one filter/state model. React plus a small URL-state hook (no router needed) keeps that simple, and the derived data comes from pure TypeScript functions that are easy to unit test whichever framework renders them.
- The tooling is the most mature for what the brief asks for: Playwright, axe-core accessibility checks, and Testing Library.
- More people can contribute. Svelte would give a smaller bundle, but the dataset is small (a few hundred units), so bundle size is not the constraint.

Other choices:
- **Zod** for the schema. One definition is shared by the app, `scripts/verify-data.ts` and the tests, and JSON Schema files are generated from it for editors.
- **No charting library.** Views are hand-built HTML/SVG: the spine, swimlanes, the dual-axis scatter and connection arcs. If the connection view needs real graph layout, add `dagre` (small, MIT).
- **shadcn/ui** (Tailwind CSS + Radix primitives), chosen by the user. Radix provides keyboard navigation and ARIA. shadcn's CSS-variable theming fits the per-universe accents: `--primary` and `--accent` are set at runtime from `universes.json`.
- Components used:
  - `Tabs`: views
  - `Sheet`: detail drawer, and filters on mobile
  - `Command`: search / ⌘K
  - `ToggleGroup`: quick toggles
  - `Select`: universe and continuity pickers
  - `Popover`, `Checkbox`, `Switch`: filters
  - `Badge`: confidence and tier
  - `Progress`, `Tooltip`, `Dialog` (import/export), `Sonner` (toasts)
- **Data scripts** in TypeScript, run with `tsx`, Node 24.

## 2. Repo layout

```
data/
  universes.json        # index of universes
  registry/             # studios.json, platforms.json (shared open vocabularies)
  marvel/               # continuities.json, titles.json, characters.json
  dc/                   # (Stage 3)
  _template/            # copy to start a new universe
  DATA_NOTES.md
  sources/              # cached raw fetches (wikitext/HTML + revid + fetch date) for reproducibility
scripts/
  fetch/                # one fetcher per source (wikipedia.ts, fandom.ts, wikidata.ts)
  build/                # parsers that turn cached sources into candidate rows plus a diff report
  verify-data.ts
src/
  domain/               # schema.ts (zod), sorting, date math, filters, view transforms (pure, unit tested)
  state/                # URL query-param state, watched store (localStorage + import/export)
  views/                # Spine, Release, Platform, Studio, Groupings, Character, Continuities, DualAxis, Connections
  components/           # Drawer, Filters, Legend, Markers, ProgressBar, UniverseSwitcher, ContinuityPicker
tests/  e2e/
CLAUDE.md  README.md  TODO.md
```

The data pipeline is **fetch, then parse into candidates, then curate by hand into `titles.json`**. Parsers never overwrite curated data. They produce a diff report, and judgement calls go into `DATA_NOTES.md`. That keeps "never invent dates" auditable: every date links to a source URL and the cached revision.

## 3. Model

UNIVERSE → CONTINUITY → (BRANCH) → TITLE → UNIT

- A **continuity** is the boundary for in-universe ordering. The app never computes an in-universe order across continuities.
- A **branch** is an optional sub-lane inside a continuity that shares its calendar, for example MCU Sacred Timeline vs Earth-828, or Arrowverse Earth-1 vs Earth-38. Branches are defined in data, with their own marker shape and label.
- A **title** is the work (a film, or a series as a whole).
- A **unit** is the thing placed on a timeline and ticked as watched: a film, a season, or an episode range. Splits like "Daredevil: Born Again S1 ep.1" vs "eps 2–9", or "Eyes of Wakanda ep.1…4", are separate units of one title. A film has exactly one unit.

The terms "Sacred Timeline", "Phase", "Saga" and "Chapter" exist only in data. Grouping schemes (Phase/Saga for Marvel, Chapter for the DCU) are declared per universe or continuity, and the app renders whatever schemes it finds.

### 3.1 Draft schema

`universes.json`
```jsonc
{ "id": "marvel", "name": "Marvel", "accent": {"primary": "#E8B64C", "secondary": "#D2392B"},
  "grouping_schemes": [ {"id": "phase", "label": "Phase"}, {"id": "saga", "label": "Saga"} ],
  "default_continuity": "mcu", "order": 1 }
```

`continuities.json`
```jsonc
{ "id": "mcu", "universe": "marvel", "name": "Marvel Cinematic Universe",
  "kind": "shared",                 // shared | standalone-collection (each title stands alone: release-only views)
  "calendar": "dated",              // dated | ordered-only (order_index, no years) | none
  "branches": [
    {"id": "sacred-timeline", "label": "Sacred Timeline", "marker": "dot",     "default": true},
    {"id": "earth-828",       "label": "Earth-828",       "marker": "diamond"},
    {"id": "earth-10005",     "label": "Earth-10005 / the Void", "marker": "diamond"},
    {"id": "outside-time",    "label": "Outside time / multiverse", "marker": "hollow-square", "placeable": false}
  ],
  "grouping_schemes": ["phase", "saga"], "source_urls": [], "notes": "" }
```

`titles.json` (one entry per title)
```jsonc
{
  "id": "daredevil-born-again", "title": "Daredevil: Born Again",
  "type": "series",       // film | series | one-shot | special | animated-series | animated-film | crossover-event
  "universe": "marvel", "continuity": "mcu",
  "studio_brand": "Marvel Studios", "platform_or_network": "Disney+",
  "canon_tier": "core",   // core | outside-set-date | multiverse-variant | adjacent | non-placeable
  "characters": ["daredevil", "kingpin", "punisher"], "franchises": ["defenders", "street-level"],
  "status": "released",   // released | upcoming | cancelled | in-production (title-level roll-up)
  "source_urls": ["https://en.wikipedia.org/wiki/..."], "notes": "",
  "external_ids": { "wikidata": "Q…", "tmdb": null },
  "units": [
    {
      "id": "daredevil-born-again-s1e1", "label": "Season 1, ep. 1",
      "season": 1, "episodes": {"from": 1, "to": 1}, "episode_count": 1,
      "timeline_branch": "sacred-timeline",
      "in_universe": {
        "start": {"y": 2026}, "end": {"y": 2026},   // partial dates {y, m?, d?}; negative y = BC (no year 0)
        "label": "2026", "precision": "year",        // exact | year | approx | range | relative
        "confidence": "stated",                      // stated | inferred | disputed
        "note": "", "order_index": 412               // ALWAYS present: position within the continuity
      },
      "release": {"date": "2025-03-04", "year": 2025}, "status": "released",
      "groupings": {"phase": "phase-5", "saga": "multiverse-saga"},  // keys = declared schemes, nullable
      "runtime_min": null, "platform_or_network": null,               // null = inherit from title
      "source_urls": [], "notes": ""
    }
  ],
  "links": [ {"to": "daredevil", "kind": "continues"} ],  // sequel | continues | spinoff | crossover | cameo | feeds-into
  "constituents": []   // crossover-event only: unit ids of the episodes it spans
}
```

Key decisions in the schema:
1. **`order_index` is always present, not only as a fallback.** Your reference image orders titles within a year (2015: DD S1 → JJ S1 → AoU → Ant-Man → DD S2 → LC S1), and the calendar alone cannot reproduce that. The calendar drives the axes; `order_index` drives sequence.
2. **Phase, groupings, release date and status are per unit.** Loki S1 is Phase 4 and S2 is Phase 5, and DD: Born Again S1 and S2 differ in the same way.
3. **Ranges**: multi-year spans (1943–1945, "2025–2027") use start and end. The spine places a unit at its start and shows the span; the dual-axis view draws a bar.
4. **Non-placeable** units have `in_universe.start = null` and sit in their branch's lane, or in a "Non-placeable" lane if the branch has `placeable: false`.
5. **Crossover events** (e.g. Arrowverse "Crisis on Infinite Earths") are titles of type `crossover-event` whose `constituents` point to units owned by the series titles. Watched state lives on the constituent units, so ticking the event ticks all of them, and the reverse.
6. **Watched storage**: `localStorage["timeliner.watched.v1"] = {unitId: isoTimestamp}`. Export and import as JSON. Unknown ids are kept, not dropped, so the file survives data edits.
7. **Marker encoding** is resolved from data (branch marker, then the canon_tier fallback), never from colour alone. Every marker also has a shape and a text label in the legend.

## 4. Proposed continuities (to be confirmed by research)

### Marvel

| id | continuity | branches / notes |
|---|---|---|
| `mcu` | Marvel Cinematic Universe | branches: Sacred Timeline, Earth-828 (FF: First Steps), Earth-10005 / the Void (D&W), YFNSM's reality, Marvel Zombies' reality, outside-time / non-placeable (Loki, What If…?, Werewolf by Night?, VisionQuest?) |
| `fox-x-men` | 20th Century Fox X-Men films | includes Deadpool 1–2, Logan, The New Mutants; internal branches for the original and revised timelines after *Days of Future Past* |
| `ssu` | Sony's Spider-Man Universe | Venom trilogy, Morbius, Madame Web, Kraven; links to MCU (Let There Be Carnage / No Way Home) as connections only |
| `raimi-spider-man` | Raimi Spider-Man trilogy | proposed: linked to MCU only through No Way Home |
| `webb-spider-man` | The Amazing Spider-Man duology | proposed, as above |
| `x-men-animated` | X-Men: The Animated Series / X-Men '97 | Marvel Animation, not MCU |
| `marvel-tv-adjacent` | Marvel Television ABC/Hulu/Freeform series | AoS, Agent Carter, Inhumans, Runaways, Cloak & Dagger, Helstrom. Ambiguous canon, so modelled as `mcu` titles with tier `adjacent` (see open question 3) |
| `marvel-standalone` | Standalone-collection bucket | e.g. Spider-Verse, Fox FF films, Blade, Ghost Rider, Hulk (2003): only if you want them (open question 2) |

### DC

| id | continuity | notes |
|---|---|---|
| `dceu` | DC Extended Universe | Man of Steel → Aquaman and the Lost Kingdom; *Suicide Squad* (2021) and *Peacemaker* S1 straddle into the DCU (disputed, flagged) |
| `dcu` | DC Universe (Gunn) | Chapter 1 "Gods and Monsters": Creature Commandos, Superman (2025), Peacemaker S2, Supergirl, Lanterns… |
| `arrowverse` | Arrowverse | branches: Earth-1, Earth-38, Earth-2/X, Earth-Prime (post-Crisis); Black Lightning, Stargirl and Superman & Lois as branches or linked; crossover events modelled as events |
| `the-batman-reeves` | The Batman (Reeves) | The Batman, The Penguin, Part II |
| `nolan-dark-knight` | The Dark Knight trilogy | |
| `burton-schumacher` | Batman 1989–1997 | Burton's *Batman* also reappears in *The Flash* (2023), recorded as a connection |
| `joker-films` | Joker / Folie à Deux | |
| `smallville` | Smallville | Crisis cameo recorded as a connection, not a merge |
| `gotham` | Gotham | Pennyworth checked separately (probably standalone) |
| `titans-doom-patrol` | Titans + Doom Patrol | they share a backdoor pilot. Research whether they are one continuity or two |
| `dc-live-action-standalone` | Standalone collection | Stargirl (if not Arrowverse), Swamp Thing, Krypton, Lucifer, Watchmen, Superman 1978–2006 films, etc. Each title stands alone |
| `dcamu` | DC Animated Movie Universe (2013–2020) | |
| `tomorrowverse` | Tomorrowverse (2020–2024) | separate from the DCAMU |
| `dcau` | DC Animated Universe | Batman TAS → Justice League Unlimited, plus films |
| `dc-animated-other` | Other animated: standalone collection | Teen Titans, Young Justice, Harley Quinn, standalone animated films… |

Cross-continuity appearances (No Way Home, The Flash, Crisis cameos) are **links**, never merges.

## 5. Sources (Marvel, Stage 1)

- The six Wikipedia pages you listed, fetched as wikitext and parsed HTML via the MediaWiki API (`action=parse`), with the revision id recorded.
- Also: Marvel One-Shots, Marvel Studios Special Presentation, Marvel Animation and "List of MCU animated series" pages, the Phase/Saga pages, Sony's Spider-Man Universe, and Marvel Cinematic Universe Wiki (Fandom MediaWiki API, CC BY-SA) for dating rationale.
- **Wikidata** (SPARQL, no key needed) for QIDs, release dates and runtimes.
- **TMDB is skipped** unless you provide a key.
- `reference/mcu_timeline_current.png` as the baseline. Every entry in it is reproduced, and every difference from the sources is flagged in DATA_NOTES.

## 6. App (Stage 2) summary

- **Global controls**: universe switcher, continuity picker, the view tabs, and quick toggles (Movies / Series / Animated).
- **Filter panel**: type, platform, studio, grouping, canon tier (default: core), released/upcoming.
- **Search**, plus a detail drawer.
- **URL state**: `?u=marvel&c=mcu&view=spine&tier=core&type=film,series&q=…&unit=…`
- **Views**: one pure transform per view (`src/domain/views/*.ts`) with unit tests; the React views only render.
- **Theme**: dark navy/gold/red from your image, plus an accent per universe. Contrast is checked with axe in Playwright.
- **Footer**: sources, last-verified date, Wikipedia CC BY-SA attribution, and an unofficial/unaffiliated disclaimer.
- **No images**: text and inline SVG only.

### 6.1 Sorting and filtering (all stored in the URL)

**Sort / order** (choices depend on the view):

| Sort | Available in | Notes |
|---|---|---|
| In-universe chronological | Spine, Dual-axis, Groupings, Character | Within one continuity only, by `order_index` |
| Release date (asc/desc) | every view | Default for cross-continuity views |
| Disney+ / official order | Spine (MCU) | Shown only when a continuity defines an alternative order list in data. The MCU has the Disney+ order and *An Official Timeline*. |
| Title A–Z | lists | |
| Runtime / episode count | lists | Finds short watches |
| Unwatched first | every view | For people working through a watch-through |

**Filters:**
- **Universe**
- **Continuity** (in-universe views)
- **Branch**: Sacred Timeline, Earth-828, Earth-10005, outside-time…
- **Canon tier**: core (default), outside-set-date, multiverse/variant, adjacent (e.g. ABC/Hulu/Freeform Marvel Television), non-placeable
- **Type**: film, series, one-shot, special, animated series, animated film, crossover event
- **Quick toggles**: Movies only, Series only, Animated
- **Studio / brand / label**: Marvel Studios, Marvel Television (the legacy division *and* the 2024 Marvel Studios label, kept distinct), Marvel Animation, Marvel Spotlight, Fox, Sony…
- **Original platform**: theatrical, Disney+, Netflix, ABC, Hulu, Freeform…
- **Grouping**: Phase 1–6 and Saga (Infinity, Multiverse)
- **Status**: released, upcoming, in production, cancelled
- **In-universe year range** (slider)
- **Release year range** (slider)
- **Characters / franchises**: multi-select, e.g. Spider-Man, Defenders, Avengers, X-Men, Guardians
- **Confidence**: show stated / inferred / disputed placements, to hide or highlight shaky dates
- **Watched**: all / unwatched / watched
- **Search** by title, character or alias (⌘K command palette)

## 7. Scalability: adding universes, multiverses and timelines

Adding a universe should mean adding data, with no app code changes. To make that true beyond Marvel and DC:

1. **Data split per universe.** `data/universes.json` is the index. Each universe gets its own folder (`data/marvel/continuities.json`, `data/marvel/titles.json`, `data/dc/…`). The app lazy-loads one universe's chunk at a time; cross-universe views (release order) load the chunks they need. `verify-data` validates each folder separately and then checks references across folders.
2. **Open vocabularies, not hard-coded enums.** Studios, platforms/networks, characters and franchises live in registries (`data/registry/studios.json`, `platforms.json`, and `data/<universe>/characters.json`). The schema checks that ids exist rather than matching a fixed list, so Lucasfilm, Legendary, Toho or Paramount+ are just new rows. The canon tiers and title types stay fixed: they drive filtering semantics, and new ones would be a deliberate schema change.
3. **Calendars defined per continuity.** Each continuity declares its calendar:
   - `gregorian` (AD/BC) for Marvel and DC.
   - `era` with named epochs, for example Star Wars BBY/ABY (which has a year 0) or Middle-earth Ages.
   - `ordered-only` (no years, just `order_index`).

   Units store a number on the continuity's own scale, and a formatter shows it as "1260 BC" or "19 BBY". Calendars are never compared across continuities, which is consistent with the never-merge rule.
4. **Branches can nest.** A branch can have `parent` and `diverges_at` (e.g. Star Trek Prime → Kelvin; X-Men original vs revised after DoFP; Loki's branches). The spine draws child branches as offshoots from their divergence point. Multiverses are therefore branches when they share a calendar, and separate continuities when they don't.
5. **Theme from data.** Each universe supplies its accent colour pair. CSS tokens are derived from it at runtime and checked against WCAG AA by a test, so a new universe can't ship unreadable colours.
6. **Performance headroom.** The spine and release lists are virtualised above roughly 500 rows. Search uses a small prebuilt index per universe. Star Wars with The Clone Wars season by season, plus Legends, is the stress case to design against (low thousands of units).
7. **README "how to add a universe" checklist**, plus a template folder `data/_template/`.

## 8. Future universes (after Stage 4, each its own data stage + checkpoint)

| Stage | Universe | Likely continuities (to research) | Model stress it adds |
|---|---|---|---|
| 5 | Godzilla & Kong | Legendary MonsterVerse (films, Monarch: Legacy of Monsters, Skull Island); Toho Shōwa / Heisei / Millennium (mostly standalone) / Reiwa (Shin Godzilla, Minus One, anime trilogy); standalone King Kong films | standalone-collection continuities, Japanese release vs US release dates |
| 6 | Star Wars | Canon (Disney-era plus the grandfathered films and The Clone Wars); Legends; non-canon anthology (Visions) | era calendar BBY/ABY, very large episode-level data |
| 7 | Star Trek | Prime, Kelvin, other timelines; stardates | nested branches |
| 8 | Terminator, Halloween | multiple mutually exclusive timelines / sequel reboots | branching, never-merge |
| 9 | Wizarding World, Middle-earth | WW: films + HBO reboot series; ME: Third/Second Age calendar | era calendars |
| 10 | Indian universes | YRF Spy Universe, Lokesh Cinematic Universe, Maddock Horror Comedy Universe, Rohit Shetty Cop Universe | small, quick |
| 11 | Hollywood batch | Alien & Predator, Conjuring, Jurassic, Planet of the Apes (2 continuities), Fast & Furious, Mission: Impossible, John Wick, Bond (Craig reboot), Transformers, Ghostbusters, Indiana Jones, Rocky/Creed, Matrix, Mad Max, Avatar | release-vs-story disorder |
| 12 | Superhero (other) | The Boys universe, Spider-Verse (Sony animation), Invincible, Hellboy (3 continuities) | |
| 13 | Horror batch | Scream, Saw, Evil Dead, Friday the 13th, Texas Chain Saw, Universal Monsters | reboots that ignore sequels |
| later | Anime / tokusatsu | Gundam, Ultraman, Kamen Rider, Dragon Ball | very large; standalone collections |

### 8.1 Books (proposed: needs the schema changes in §8.2 first)

| Stage | Universe | Continuities | Notes |
|---|---|---|---|
| B1 | A Song of Ice and Fire / Game of Thrones | Books (5 novels, Dunk & Egg novellas, Fire & Blood); HBO shows (GoT, House of the Dragon, A Knight of the Seven Kingdoms) | Era calendar "AC" (After Aegon's Conquest). The books and the shows are separate continuities, joined by `adapts` links. Unfinished books are `upcoming` with no date. |
| B2 | The Wheel of Time | 14 novels + New Spring; Amazon series | "NE" calendar; prequel published late (alternate orders) |
| B3 | Rick Riordan (Camp Half-Blood and beyond) | Book universe (PJO, HoO, ToA, Kane, Magnus Chase, crossover novellas); 2010/2013 films; Disney+ series | Interleaving series, crossover novellas like Arrowverse events |
| B4+ | Candidates | Cosmere (Sanderson), Narnia (publication vs chronological order), Dune (books + films + Prophecy), The Witcher (books / games / Netflix), Hunger Games, Shadowhunters, Discworld, The Expanse, Stephen King / Dark Tower | |

### 8.2 Schema / app changes required for books (to approve before building; all backward compatible)

1. **Title types:** `novel`, `novella`, `short-story`, `anthology`, `comic`, `graphic-novel`; a derived `medium` (screen / print). Quick toggle "Books".
2. **Registries:** publishers and imprints, as `studios` kinds `publisher` and `imprint`. Platforms get kinds `print`, `ebook` and `serialized` (magazines) for the first-edition format.
3. **Unit length:** add `pages` (optional `word_count`) next to `runtime_min`.
4. **Links:** add `adapts` (book → screen). Adaptations stay separate continuities.
5. **Progress wording:** "Watched" becomes "Done", with per-medium verbs (read / watched) and per-medium progress.
6. **Sources:** Wikipedia + Wikidata (P577 publication date, P1104 pages, P50 author), Open Library API and ISFDB (free, no key), and the relevant fan wikis for in-universe dates (rated `inferred` at most).
7. **Spoiler-safe mode (recommended):** hide notes, and optionally later entries, for anything not yet marked done.

Marvel and DC stay first, as the brief requires. The schema items above (per-universe folders, registries, calendars, nested branches) are built into Stage 1, so later universes don't force migrations.

## 9. Keeping the data current (revision workflow)

1. **Detect.** A scheduled GitHub Action (weekly, plus a manual "run now" button) runs `npm run verify:remote`. It re-fetches every source in `scripts/fetch/sources.ts`, re-parses it, and diffs it against the curated data. If anything changed, it opens or updates a single GitHub issue, "Data drift report", grouped by severity:
   - **new title found**: a new row in a list or timeline page
   - **date changed**: a release date moved, or a title moved on the in-universe timeline
   - **status changed**: e.g. upcoming → released, or cancelled
   - **source changed, no data impact**: only the revision id moved
2. **Propose.** `npm run update:propose` writes the mechanical, low-risk changes to a branch and opens a PR: release dates and status of titles already in the data, revision ids, `last_verified`.
3. **Review by hand.** In-universe placement, new titles, canon tier and continuity changes are never auto-applied. Each needs a human, or a Claude session, to edit the data and add a `DATA_NOTES.md` entry, because "never invent dates / flag uncertainty" can't be automated safely.
4. **Ship.** Merge, CI runs `verify` and the tests, and Pages redeploys. The footer's "last verified" date comes from the data, not the build date.

**Stability guarantees across revisions:**
- Unit ids are permanent. If a split changes (e.g. "S1" becomes "S1 ep.1" + "eps 2–9"), the old id goes into an `aliases` map, so people's watched progress migrates instead of vanishing.
- The cached sources in `data/sources/` (with revision ids) mean every past decision can be re-checked against exactly what the source said at the time.

## 10. Licensing note

Code stays MIT (existing LICENSE). Data derived from Wikipedia and Fandom is CC BY-SA 4.0, so `data/` gets its own `data/LICENSE` (CC BY-SA 4.0) with attribution.
