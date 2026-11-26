# TODO

## Stage 0: Plan
- [x] Inspect reference image and repo
- [x] Draft PLAN.md (stack, schema, continuities)
- [x] CHECKPOINT 0 approved 2026-11-26

## Stage 1: Marvel data
- [ ] Scaffold repo (Vite/TS/React, zod schema, tsx scripts)
- [ ] Fetchers: Wikipedia (6 listed pages + extras), Fandom, Wikidata; cache to data/sources/
- [ ] Parsers → candidate rows + diff report
- [ ] Curate universes/continuities/titles.json for Marvel
- [ ] Reconcile against reference/mcu_timeline_current.png
- [ ] scripts/verify-data.ts (schema, dupes, ref integrity, re-fetch discrepancies)
- [ ] data/DATA_NOTES.md
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
- [ ] Stage 1: verify-data --refetch produces a drift report (new titles / date / status / revid changes)
- [ ] Stage 1: `aliases` map in schema for watched-state migration
- [ ] Stage 2: scheduled GitHub Action (weekly + manual) opening a "Data drift report" issue
- [ ] Stage 2: update:propose script → PR for mechanical fields only
