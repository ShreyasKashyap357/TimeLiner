# TimeLiner: notes for Claude

Static React app (Vite + TypeScript + shadcn/ui + Tailwind v4) over one canonical JSON dataset of fictional-franchise titles. No backend; deployed to GitHub Pages.

## Non-negotiable data rules
1. **Never invent dates.** Every in-universe or release date must come from a cited source (`source_urls`, and a note quoting it when it was entered by hand). If sources are silent, leave `in_universe.start` null with `precision: "relative"`.
2. **Flag uncertainty.** `confidence` is `stated` only when a source gives the date explicitly. Derived dates are `inferred`; conflicting or shaky ones are `disputed`. Non-`stated` units need an explanatory `note`, and verify enforces this.
3. **Never merge continuities.** In-universe order is only computed within one continuity. Cross-continuity relations are `links`, never shared ordering. Calendars are per continuity.
4. Record every judgement call in `data/DATA_NOTES.md`. Record open questions for the user in `DECISIONS.md` with the default being used (the user batches decisions; keep working through stages).
5. Nothing franchise-specific in app code. Phases/sagas/chapters, branches, studios, platforms, accents and calendars are all data.

## Model
`UNIVERSE → CONTINUITY → (BRANCH) → TITLE → UNIT`. Schema: `src/domain/schema.ts` (Zod, shared by app, scripts and tests).
- `data/universes.json`: index of universes (accent, grouping schemes, `data_dir`).
- `data/<universe>/{continuities,titles,tags,aliases}.json`: per-universe data, lazy-loaded by the app.
- `data/registry/{studios,platforms}.json`: open vocabularies shared across universes.
- A unit is a film, season or episode range. Its `id` is **permanent** (watched state keys on it); renamed or split ids go in `aliases.json`.
- `in_universe.order_index` is always present and unique per continuity. It is the in-universe sequence, not the calendar.
- `source_keys` on units map to source naming (e.g. the MCU timeline diagram text) for drift detection.

## Layout
- `scripts/fetch/`: MediaWiki/Wikidata fetchers. They cache into `data/sources/` (with revids in `manifest.json`).
- `scripts/build/`: wikitext extractors → `data/candidates/<universe>.json` (machine output, not canonical).
- `scripts/bootstrap/`: one-time generators (seed + config). The JSON in `data/` is canonical after bootstrap, so **don't re-run the bootstrap with `--force`**.
- `scripts/migrations/`: dated, idempotent scripts for data changes made after bootstrap.
- `scripts/verify-data.ts`: schema + integrity (`src/domain/integrity.ts`), drift vs sources, and the reference-image diff. `--refetch` hits the network.
- `src/domain/`: pure logic (model, filters + URL codec, per-view transforms in `views.ts`, dates). Unit-tested in `tests/`.
- `src/app`, `src/views`, `src/components`: React UI. `src/components/ui` is shadcn-generated.
- `e2e/`: Playwright smoke tests (desktop + mobile + axe).

## Commands
`npm run dev | build | typecheck | test | e2e | verify`. On Windows, run from `C:\` with an upper-case drive letter, or Vitest breaks. Use `./node_modules/.bin/shadcn`, not `npx shadcn`, because of an npm allow-scripts quirk.

## UI text rules
- Nothing internal reaches the UI: no raw ids, no `#e8` keys, no decision codes like "(D-21)". `e2e/layout.spec.ts` fails on these at four viewport sizes.
- Titles use `Row.titleName`/`titleLabel()`: years go in square brackets, and same-name titles get `[first year]`.

## Working style
Small commits. Keep `TODO.md` and `DECISIONS.md` current. Be explicit about anything not verified.

## Adding universes / books
- New universes use the generic pipeline: `scripts/bootstrap/<id>.config.ts` + `<id>.seed.ts` (helpers in `seed-kit.ts`), then `scripts/fetch/wikidata-seed.ts <id>`, `scripts/bootstrap/universe.ts <id> --enable`, and `npm run credits` (cast & crew from Wikidata; bootstraps write empty credits). Marvel and DC keep their own original bootstraps.
- Books are first-class: print title types (novel … reference), publishers/imprints in the studios registry, `pages`, `adapts` links (book ↔ screen stay separate continuities), "Done" with per-medium verbs, and spoiler-safe mode.
