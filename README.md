# TimeLiner

An interactive, static web app for exploring fictional franchise universes through many "lenses" over **one canonical dataset**. It covers **Marvel** (MCU, Fox X-Men, Sony's Spider-Man Universe, Raimi and Webb Spider-Man, X-Men TAS / '97, and the other Marvel animated continuities) and **DC** (DCU, DCEU, Arrowverse with its Earths and crossover events, Reeves, Nolan, Burton/Schumacher, Joker, Reeve-era Superman, Smallville, Gotham, Titans, Doom Patrol, DCAU, DCAMU, Tomorrowverse). Choose "All universes" for a combined Marvel + DC release order with side-by-side lanes.

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
- **Vercel (optional).** Import the repo; the defaults work (`npm run build`, output `dist`, base path `/`). Each PR gets a preview URL.

## Keeping data current

`.github/workflows/data-drift.yml` runs weekly and on demand. It re-fetches every source, diffs it against the dataset, and opens or updates one **"Data drift report"** issue listing:
- new titles;
- moved release dates;
- timeline moves;
- statuses made stale by today's date;
- source revision changes.

Nothing is changed automatically. In-universe placements, new titles and tier changes always need a human (or Claude) review and a `DATA_NOTES.md` entry. Accepted exceptions go in `data/drift-ignore.json`. Unit ids are permanent; if a unit is split, add the old id to `data/<universe>/aliases.json` so people's watched progress migrates.

## How to add a new universe

1. **Sources.** Add the universe's source pages to `scripts/fetch/sources.ts`, then run `npm run fetch:sources -- <universe>`.
2. **Extractor.** Write `scripts/build/<universe>.ts` using the generic extractors in `scripts/build/extract.ts` (`{{Film overview}}`, `{{Series overview}}`, row-header tables, timeline rows, infoboxes). It produces `data/candidates/<universe>.json`.
3. **Data.** Create `data/<universe>/` with `continuities.json`, `titles.json`, `tags.json` and `aliases.json` (`{}`). Start from a seed and bootstrap script like `scripts/bootstrap/marvel.*`, or write the files by hand. Add any new studios/platforms to `data/registry/*.json`.
4. **Register.** Add the universe to `data/universes.json`: id, name, `accent` colours, `default_continuity`, `grouping_schemes` (e.g. DC's Chapters), `data_dir`, and `enabled: true`.
5. **Verify.** Run `npm run verify` and fix every error. Record every judgement call in `data/DATA_NOTES.md`.
6. **Done.** No app code changes are needed. The universe switcher, accent colour, continuity picker, filters and all nine views pick the new universe up from the data. Add a test or two in `tests/` for anything universe-specific.

## Licences and attribution

- **Code:** MIT ([LICENSE](LICENSE)).
- **Data** (`data/`): CC BY-SA 4.0 ([data/LICENSE](data/LICENSE)), derived from Wikipedia (CC BY-SA 4.0), Wikidata (CC0) and the Marvel Cinematic Universe Wiki on Fandom (CC BY-SA 3.0, adjacent-tier dating only).
