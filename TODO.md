# TODO

## Stage 0: Plan
- [x] Inspect reference image and repo
- [x] Draft PLAN.md (stack, schema, continuities)
- [x] CHECKPOINT 0 approved 2026-11-26

## Stage 1: Marvel data
- [x] Scaffold (TS, zod schema, tsx scripts; Vite/React/shadcn in Stage 2)
- [x] Fetchers: Wikipedia (36 pages), Wikidata; cached in data/sources/ (Fandom reachable but not used for dates)
- [x] Parsers → data/candidates/marvel.json
- [x] Curate Marvel dataset (seed + bootstrap → data/marvel/*.json)
- [x] Reconcile against reference image (reference/mcu_timeline_current.json + verify diff)
- [x] scripts/verify-data.ts (schema, dupes, ref integrity, drift, --refetch)
- [x] data/DATA_NOTES.md
- [ ] **CHECKPOINT 1**

## Stage 2: Marvel app
- [ ] **CHECKPOINT 2**

## Stage 3: DC data
- [ ] **CHECKPOINT 3**

## Stage 4: DC in app
- [ ] **CHECKPOINT 4**

## Later stages (proposed, each with a data checkpoint)
- [ ] Stage 5: Godzilla & Kong (MonsterVerse + Toho eras)
- [ ] Stage 6: Star Wars (Canon / Legends, BBY/ABY calendar)
- [ ] Candidates: Star Trek, Wizarding World, Middle-earth, Alien & Predator, Conjuring, Transformers

## Revision workflow (see PLAN.md §9)
- [x] Stage 1: verify-data --refetch produces a drift report (new titles / date / status / revid changes)
- [x] Stage 1: `aliases` map in schema for watched-state migration
- [ ] Stage 2: scheduled GitHub Action (weekly + manual) opening a "Data drift report" issue
- [ ] Stage 2: update:propose script → PR for mechanical fields only

## Open follow-ups from Stage 1
- [ ] Split X-Men: The Animated Series into seasons (needs a per-season source)
- [ ] Optional: place ABC/Hulu/Freeform seasons using MCU Fandom episode dating (awaiting user decision)
- [ ] Re-check Avengers: Doomsday + Born Again S3 placement after release
- [ ] Windows note: run vitest from `C:\` (uppercase drive); lowercase `c:\` cwd breaks vitest module resolution
