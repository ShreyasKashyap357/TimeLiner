# TODO

## Stage 0: Plan
- [x] Inspect reference image and repo
- [x] Draft PLAN.md (stack, schema, continuities)
- [x] CHECKPOINT 0 approved 2026-11-26

## Stage 1: Marvel data
- [x] Scaffold (TS, zod schema, tsx scripts)
- [x] Fetchers: Wikipedia, Wikidata, MCU Fandom; cached in data/sources/ with revision ids
- [x] Parsers → data/candidates/marvel.json
- [x] Curate Marvel dataset (seed + bootstrap → data/marvel/*.json)
- [x] Reconcile against reference image (reference/mcu_timeline_current.json + verify diff)
- [x] scripts/verify-data.ts (schema, dupes, ref integrity, drift, --refetch)
- [x] data/DATA_NOTES.md
- [x] CHECKPOINT 1 reviewed; follow-ups applied (Marvel TV split, TAS seasons, adjacent placements)

## Stage 2: Marvel app
- [x] Vite + React + TS + Tailwind v4 + shadcn/ui (radix-nova), dark navy/gold/red theme, per-universe accent
- [x] Domain transforms for all 9 views (src/domain/views.ts) + URL codec + filters, unit-tested
- [x] Views: in-universe spine, release (lanes), platform, studio, phase/saga, characters, continuities, dual axis, connections
- [x] Detail drawer, legend (shape-coded), search (⌘K), watched tracking + export/import + progress + what's next
- [x] Playwright smoke (desktop + mobile) incl. axe WCAG 2.1 AA
- [x] README, CLAUDE.md, CI + Pages deploy workflow, weekly data-drift workflow
- [ ] update:propose script (auto PR for mechanical drift fixes)
- [ ] Virtualise long lists (>500 rows) once Star Wars-scale data lands
- [x] CHECKPOINT 2 delivered (continuing to Stage 3 per R-10)

## Stage 3: DC data
- [ ] **CHECKPOINT 3**

## Stage 4: DC in app
- [ ] **CHECKPOINT 4**

## Later stages (proposed, each with a data checkpoint)
- [ ] Stage 5: Godzilla & Kong (MonsterVerse + Toho eras)
- [ ] Stage 6: Star Wars (Canon / Legends, BBY/ABY calendar)
- [ ] Candidates: Star Trek, Wizarding World, Middle-earth, Alien & Predator, Conjuring, Transformers

## Revision workflow (see PLAN.md §9)
- [x] verify-data --refetch produces a drift report (new titles / date / status / revid changes)
- [x] `aliases` map in schema for watched-state migration
- [x] Scheduled GitHub Action (weekly + manual) opening a "Data drift report" issue
- [ ] update:propose script → PR for mechanical fields only

## Open follow-ups
- [ ] Re-check Avengers: Doomsday + Born Again S3 placement after release (Doomsday: 2026-12-18)
- [x] Windows: run vitest from `C:\` (documented in README/CLAUDE.md)
