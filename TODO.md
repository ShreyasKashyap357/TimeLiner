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
- [ ] Virtualise long lists (>500 rows) if scrolling gets slow (all-universe view is ~800 units now)
- [x] CHECKPOINT 2 delivered (continuing to Stage 3 per R-10)

## Stage 3: DC data
- [x] 39 DC sources cached; candidates via scripts/build/dc.ts; Wikidata film dates
- [x] In-universe research (Wikipedia first, Fandom only as inferred), DC seed + bootstrap
- [x] Schema additions: Branch.merges_into, episode-level crossover constituents (backward compatible)
- [x] DATA_NOTES DC section; verify-data drift for DC
- [x] CHECKPOINT 3 delivered (continuing per R-10)
- [ ] TODO: Mister Miracle (2028) once the DCU overview links an article; split Arrowverse mid-season Earth switches if per-episode dates are added

## Stage 4: DC in app
- [x] DC enabled (blue accent, continuity picker, Arrowverse Earth markers, crossover episodes in detail panel)
- [x] Combined Marvel + DC release order with per-universe lanes
- [x] DC unit tests + e2e (switch, Arrowverse, crossover panel, combined lanes, axe)
- [x] CHECKPOINT 4 delivered

## Later stages (proposed, each with a data checkpoint)
- [x] Stage 5: Godzilla & Kong (MonsterVerse + Toho eras)
- [x] Stage 6: Star Wars (Canon / Legends / Visions / LEGO, BBY/ABY calendar)
- [x] Stage 7: Star Trek (Prime / Kelvin / non-canon)
- [ ] Stage 8: Terminator, Halloween (branching / reboot timelines)
- [ ] Stage 9: Wizarding World, Middle-earth
- [ ] Stage 10: Indian universes (YRF Spy, LCU, Maddock Horror Comedy, Cop Universe)
- [ ] Stage 11: Hollywood batch (Alien & Predator, Conjuring, Jurassic, Apes, F&F, M:I, John Wick, Bond, Transformers, Ghostbusters, Indiana Jones, Rocky/Creed, Matrix, Mad Max, Avatar)
- [ ] Stage 12: other superhero (The Boys, Spider-Verse, Invincible, Hellboy)
- [ ] Stage 13: horror batch (Scream, Saw, Evil Dead, Friday the 13th, Texas Chain Saw, Universal Monsters)
- [ ] Later: anime / tokusatsu (Gundam, Ultraman, Kamen Rider, Dragon Ball)

## Books (PLAN.md §8.1–8.2): needs the schema changes approved first (D-16)
- [x] Schema/app: book types, publishers, pages, `adapts` links, "Done" wording, Books toggle, spoiler-safe mode
- [x] B1: A Song of Ice and Fire + HBO Game of Thrones universe (AC calendar)
- [x] B2: The Wheel of Time (NE calendar) + Amazon series
- [ ] B3: Rick Riordan books + films + Disney+ series
- [ ] B4+: Cosmere, Narnia, Dune, Witcher, Hunger Games, Shadowhunters, Discworld, Expanse, Dark Tower

## Combined decisions follow-ups (2026-11-27)
- [x] D-1 Marvel Television labels; D-4 bundle (no runtime Zod in prod, lazy views, current-universe first paint)
- [x] D-7 leak audit (e2e, 4 viewport shapes); decision codes kept out of UI text
- [x] D-14 recommended order for new viewers (MCU); essentials-only switch
- [ ] D-14 recommended orders for other universes (Star Wars, Star Trek, DC) from published guides
- [x] D-15/D-30 Marvel Specials with Origin filter; D-19/D-32 Toho US re-edits
- [x] D-11 DC deferred titles (55)
- [x] D-16 word counts (WoT, ASOIAF 1–5) + reading time; spoiler-safe covers connection notes
- [x] D-21/D-22 calendar notes in the Key
- [x] D-29 cast & crew from Wikidata (top-billed cast, crew, authors) in the detail panel, search, and a Cast & crew filter
- [x] UI batch: pickers (width, full list, colour swatches, layering), phone layout, [year] titles, URL defaults

## Revision workflow (see PLAN.md §9)
- [x] verify-data --refetch produces a drift report (new titles / date / status / revid changes)
- [x] `aliases` map in schema for watched-state migration
- [x] Scheduled GitHub Action (weekly + manual) opening a "Data drift report" issue
- [ ] update:propose script → PR for mechanical fields only

## Open follow-ups
- [ ] Re-check Avengers: Doomsday + Born Again S3 placement after release (Doomsday: 2026-12-18)
- [x] Windows: run vitest from `C:\` (documented in README/CLAUDE.md)
