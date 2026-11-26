# TimeLiner

An interactive, static web app for exploring fictional franchise universes through many "lenses" over **one canonical dataset**. It covers **Marvel** (MCU, Fox X-Men, Sony's Spider-Man Universe, Raimi and Webb Spider-Man, X-Men TAS / '97, and the other Marvel animated continuities) and **DC** (DCU, DCEU, Arrowverse with its Earths and crossover events, Reeves, Nolan, Burton/Schumacher, Joker, Reeve-era Superman, Smallville, Gotham, Titans, Doom Patrol, DCAU, DCAMU, Tomorrowverse). It also includes **Godzilla & Kong** (Toho eras, Monsterverse, TriStar, King Kong lines) and, as the first **books** universe, **A Song of Ice and Fire** (novels, novellas and HBO's Game of Thrones shows, on the in-world AC calendar). Choose "All universes" for a combined release order with side-by-side lanes.

> TimeLiner is an unofficial fan project, not affiliated with Marvel, Disney, DC or Warner Bros. Discovery. It contains no posters, logos or other artwork.

**Live site:** https://shreyaskashyap357.github.io/TimeLiner/ (GitHub Pages, deployed from `main`)

## Views

All nine views are derived from the same data. The view, filters and sort live in the URL, so any view can be shared as a link.

| View | What it shows |
|---|---|
| In-universe | Chronology of **one continuity**, drawn as a spine. Year headings, expandable notes, and separate lanes for titles with no fixed point. Alternate orders (e.g. Disney+) can be chosen from Sort. |
| Release order | Every title by release date, optionally in side-by-side lanes per universe. |
| Platform | Swimlanes by original platform/network. |
| Studio | Swimlanes by studio or label. Studios that share a name (the two "Marvel Television"s) are kept distinct. |
| Phase / Saga | Grouping schemes defined in the data (Saga → Phase for Marvel, Chapter for DC). |
| Characters | Every title featuring the chosen characters, teams or franchises, grouped by continuity. |
| Continuities | Continuities as lanes, with branches and non-placeable lanes. |
| Dual axis | In-universe year against release date for one continuity. Multi-year spans are bars; a data table is included. |
| Connections | Which titles feed into which (sequels, spin-offs, crossovers), drawn as an arc diagram plus a list. |

On every view:
- quick toggles: **Movies only / Series only / Animated**;
- filters: type, platform, studio/label, phase/saga, canon tier, branch, status, date confidence, watched, and in-universe/release year ranges;
- search (⌘K / Ctrl+K);
- a detail drawer for each title (in-universe date with a confidence badge and note, release, platform, runtime, continuity, sources);
- **watched tracking** stored in your browser (localStorage), with JSON export/import, a progress bar, and "What's next".

Markers are shape-coded, never colour alone:

| Marker | Meaning |
|---|---|
| ● | Main timeline (e.g. the Sacred Timeline) |
| ◆ | Another branch or reality at a set time |
| ◇ / ▢ (hollow) | No fixed point |
| ▲ | Adjacent tier (canon ambiguous) |

## The data model

```
UNIVERSE → CONTINUITY → (BRANCH) → TITLE → UNIT
```

- **Continuity**: the only scope in which in-universe order means anything. Continuities are **never merged**. Cross-continuity views use release date, platform, studio and so on, and cross-continuity *links* (e.g. *No Way Home* ↔ the Raimi films) are only links.
- **Branch**: a sub-lane of a continuity that shares its calendar, e.g. Sacred Timeline, Earth-828, or "outside time". Branches can nest (`parent`, `diverges_at`).
- **Unit**: the thing placed on a timeline and ticked as watched: a film, a season, or an episode range (e.g. *Daredevil: Born Again* S1 ep. 1 vs eps. 2–9).
- **Calendars** are per continuity: `gregorian` (BC/AD), `era` (e.g. BBY/ABY) or `ordered-only`.
- **In-universe** entries carry `precision` (exact / year / approx / range / relative) and `confidence` (stated / inferred / disputed), plus a note explaining the source.

Schema: [`src/domain/schema.ts`](src/domain/schema.ts) (Zod). Data: [`data/`](data/). Judgement calls: [`data/DATA_NOTES.md`](data/DATA_NOTES.md). Open questions: [`DECISIONS.md`](DECISIONS.md).

## Develop

```bash
npm install
npm run dev          # http://localhost:5173
npm run typecheck
npm test             # unit tests (Vitest)
npm run e2e          # Playwright smoke tests, desktop + mobile, with an axe WCAG AA scan
npm run verify       # data: schema, integrity, drift vs cached sources, reference-image diff
npm run verify -- --refetch   # re-download all sources first (network)
npm run build        # typecheck + production build to dist/
```

**Windows notes:**
- Run commands from `C:\…`, with an **upper-case** drive letter. A lower-case `c:\` working directory makes Vitest load modules twice. The Vite config already normalises paths.
- If `npx shadcn …` fails with `EALLOWSCRIPTS`, run the local binary instead: `./node_modules/.bin/shadcn add <component>`.

## Deploy

- **GitHub Pages (primary).** `.github/workflows/ci-deploy.yml` runs typecheck, data verification, unit tests and e2e tests, then builds with `BASE_PATH=/TimeLiner/` and deploys. One-time setup: repo **Settings → Pages → Source: GitHub Actions**.

## Keeping data current

`.github/workflows/data-drift.yml` runs weekly and on demand. It re-fetches every source, diffs it against the dataset, and opens or updates one **"Data drift report"** issue listing:
- new titles;
- moved release dates;
- timeline moves;
- statuses made stale by today's date;
- source revision changes.

**Cast & crew** come from Wikidata. Refresh them with `npm run credits`, which fetches into `data/sources/wikidata/credits-*.json` and then writes the top 10 cast and up to 8 people per crew role into each title. Titles whose Wikipedia article is a shared list page get no credits.

Nothing is changed automatically. In-universe placements, new titles and tier changes always need a human (or Claude) review and a `DATA_NOTES.md` entry. Accepted exceptions go in `data/drift-ignore.json`. Unit ids are permanent; if a unit is split, add the old id to `data/<universe>/aliases.json` so people's watched progress migrates.

## How to add a new universe

1. **Sources.** Add the universe's source pages to `scripts/fetch/sources.ts`, then run `npm run fetch:sources -- <universe>`.
2. **Extractor.** Write `scripts/build/<universe>.ts` using the generic extractors in `scripts/build/extract.ts` (`{{Film overview}}`, `{{Series overview}}`, row-header tables, timeline rows, infoboxes). It produces `data/candidates/<universe>.json`.
3. **Config + seed.** Write two files:
   - `scripts/bootstrap/<universe>.config.ts`, exporting `UNIVERSE` (accent colours, grouping schemes such as Phases or Chapters, default continuity), `CONTINUITIES` (with calendar and branches), `STUDIOS`, `PLATFORMS` and `TAGS`. Optional: `SORT_BY_YEAR`, `FANDOM_PREFIXES`.
   - `scripts/bootstrap/<universe>.seed.ts`, exporting `SEED`, built with the helpers in `seed-kit.ts`. Units are listed in story order, and every in-universe value cites its source.
4. **Wikidata.** Run `npx tsx scripts/fetch/wikidata-seed.ts <universe>` to cache QIDs, US release dates, runtimes and page counts.
5. **Bootstrap.** Run `npx tsx scripts/bootstrap/universe.ts <universe> --enable`. It writes `data/<universe>/*.json` and adds the universe and any new studios/platforms to the shared files. After this the JSON is canonical; later changes go through dated scripts in `scripts/migrations/`.
6. **Verify.** Run `npm run verify` and fix every error. Record every judgement call in `data/DATA_NOTES.md`.
7. **Done.** No app code changes are needed. The universe switcher, accent colour, continuity picker, filters and all nine views pick the new universe up from the data. Add a test or two in `tests/` for anything universe-specific.

## Licences and attribution

- **Code:** MIT ([LICENSE](LICENSE)).
- **Data** (`data/`): CC BY-SA 4.0 ([data/LICENSE](data/LICENSE)), derived from Wikipedia (CC BY-SA 4.0), Wikidata (CC0) and the Marvel Cinematic Universe Wiki on Fandom (CC BY-SA 3.0, adjacent-tier dating only).
