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
- [x] Mister Miracle added (2028, year only)
- [ ] Split Arrowverse mid-season Earth switches if per-episode dates are added

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
- [ ] Stage 9: Wizarding World (Middle-earth done)
- [ ] Stage 10: Indian universes (YRF Spy, LCU, Maddock Horror Comedy, Cop Universe)
- [ ] Stage 11: Hollywood batch (Alien & Predator, Conjuring, Jurassic, Apes, F&F, M:I, John Wick, Bond, Transformers, Ghostbusters, Indiana Jones, Rocky/Creed, Matrix, Mad Max, Avatar)
- [ ] Stage 12: other superhero (The Boys, Spider-Verse, Invincible, Hellboy)
- [ ] Stage 13: horror batch (Scream, Saw, Evil Dead, Friday the 13th, Texas Chain Saw, Universal Monsters)
- [ ] Later: anime / tokusatsu (Gundam, Ultraman, Kamen Rider, Dragon Ball)

## Books (PLAN.md §8.1–8.2): needs the schema changes approved first (D-16)
- [x] Schema/app: book types, publishers, pages, `adapts` links, "Done" wording, Books toggle, spoiler-safe mode
- [x] B1: A Song of Ice and Fire + HBO Game of Thrones universe (AC calendar)
- [x] B2: The Wheel of Time (NE calendar) + Amazon series
- [x] B3: Rick Riordan books + films + Disney+ series
- [ ] B4+: Cosmere, Narnia, Dune, Witcher, Hunger Games, Shadowhunters, Discworld, Expanse, Dark Tower

## Combined decisions follow-ups (2026-11-27)
- [x] D-1 Marvel Television labels; D-4 bundle (no runtime Zod in prod, lazy views, current-universe first paint)
- [x] D-7 leak audit (e2e, 4 viewport shapes); decision codes kept out of UI text
- [x] D-14 recommended order for new viewers (MCU); essentials-only switch
- [x] D-14 recommended orders for Star Wars, Star Trek, DCU, DCEU, MonsterVerse, HBO Westeros (+ official StarWars.com / StarTrek.com)
- [x] D-15/D-30 Marvel Specials with Origin filter; D-19/D-32 Toho US re-edits
- [x] D-11 DC deferred titles (55)
- [x] D-16 word counts (WoT, ASOIAF 1–5) + reading time; spoiler-safe covers connection notes
- [x] D-21/D-22 calendar notes in the Key
- [x] D-29 cast & crew from Wikidata (top-billed cast, crew, authors) in the detail panel, search, and a Cast & crew filter
- [x] UI batch: pickers (width, full list, colour swatches, layering), phone layout, [year] titles, URL defaults

## Queue (user go-ahead 2026-11-27): work through in waves, decisions batched
- [x] Media: audio, stage, games (types, wording, quick filters)
- [x] Games: earliest release per platform from Wikipedia infoboxes (R-52); 138 of 182 games. Open: D-66 (one date for several platforms)
- [x] Films: runtime, budget, box office from Wikidata / Wikipedia infobox (R-56); 408 / 281 / 276 films. Open: D-67
- [x] TV: viewers per episode and season from Wikipedia episode tables (R-56); 236 seasons in 64 series. Streaming-only series have no published figures. Open: D-68, D-69
- [x] No browser-native hover text: runtime e2e check over pages and the drawer (R-55)
- [ ] Wave 2 universes: research running 2026-11-27 (TWD, Yellowstone, Breaking Bad, Twin Peaks, Stargate, BSG, Expanse, Dune, Narnia, Hunger Games, Shadowhunters, Outlander, Dark Tower, Discworld, Cosmere, Law & Order, NCIS, CSI, One Chicago)
- [ ] Wave 1 (researching): Wizarding World; radio/stage + Riordan extras; watch orders (Arrowverse, Riordan, Middle-earth, Bond, F&F, WoT); Terminator + Halloween; games for existing universes; GTA / Assassin's Creed / Halo / Fallout / The Last of Us / The Witcher; LEGO; Doctor Who; Gundam
- [ ] Wave 2: The Walking Dead, Yellowstone (Sheridan), Stargate, Battlestar Galactica, Breaking Bad/BCS, Law & Order / NCIS / CSI / One Chicago, Twin Peaks, Dune, Narnia, Hunger Games, Shadowhunters, The Expanse, Outlander, The Dark Tower, Discworld, Cosmere
- [ ] Wave 3: Sherlock Holmes (D-51), Jack Ryan, Bourne, Mission: Impossible, Dragon Ball, Naruto/Boruto, One Piece, Pokémon, Ultraman, Kamen Rider, Super Sentai / Power Rangers, Avatar: The Last Airbender, Transformers, TMNT
- [ ] Wave 4: Indian (YRF Spy, LCU, Maddock, Cop Universe, Baahubali, KGF/Salaar, Dhoom, Krrish, Golmaal, Bhool Bhulaiyaa, Housefull, Drishyam), Jin Yong's Condor Trilogy; Hollywood batch; other superhero; horror batch
- [ ] Wave 5 (suggested 2026-11-27):
  - Games-led: Resident Evil (games, Anderson films, CG films and Netflix kept separate), Metal Gear, Kingdom Hearts (official order), Final Fantasy VII compilation, Zelda (official three-branch timeline), Mass Effect, Tomb Raider, Uncharted, Mortal Kombat, Sonic, Persona.
  - Screen: Alien/Predator, Planet of the Apes, Jurassic Park, Indiana Jones, Conjuring Universe, Evil Dead, X-Men (Fox), Spider-Verse, Pirates of the Caribbean, Toy Story/Pixar, Ghostbusters, Rocky/Creed, John Wick, The Boys, Westworld, Dexter.
  - Books-led: Stephen King (links to The Dark Tower), Asimov Foundation/Robots, Earthsea.
  - Anime: Evangelion (Rebuild separate), Fate (route branches), Attack on Titan, JoJo, Macross, Ghost in the Shell.
- [ ] LEGO tie-ins for universes not in the app yet (Jurassic, Indiana Jones, Horizon, Fortnite) once those universes exist.

## Previously deferred (now unpaused)
- [ ] New media types: radio / audio drama, live theatre (stage plays, musicals), and others needed (R-48). Then add:
  BBC LOTR radio (1955, 1981), The Hobbit radio (1968), The Lightning Thief musical, Harry Potter and the Cursed Child, etc.
- [ ] Riordan "include all" (R-46): Demigods of Olympus, graphic novels, companions, musical, per-story Demigod Files/Diaries.
- [ ] Middle-earth: state the Age convention in tooltips/notes where it matters (R-47).
- [ ] Wizarding World (Harry Potter books, films, Fantastic Beasts, Cursed Child, the HBO series).
- [ ] Stage 8 Terminator / Halloween; Stage 10 Indian universes; Stage 11 Hollywood batch (Alien & Predator, Conjuring,
  Jurassic, Apes, M:I, John Wick, Transformers, Ghostbusters, Indiana Jones, Rocky/Creed, Matrix, Mad Max, Avatar);
  Stage 12 superhero (The Boys, Spider-Verse, Invincible, Hellboy); Stage 13 horror; anime/tokusatsu; books B4+.
- [ ] Recommended watch orders for the newer universes (Riordan, Middle-earth, Bond, F&F, Arrowverse, Wheel of Time).
- [ ] Bond continuation novels beyond Licence Renewed / Carte Blanche (D-45).
- [ ] Per-season split for Guardians of the Galaxy (2015) and Spider-Man (2017) animated (episode lists not found yet).
- [ ] TV cameos at episode level (fan wikis record them on episode pages).
- [ ] Cameo-only characters from fan wikis in the Characters picker (they have no Wikidata id yet).
- [ ] DC not yet researched: motion comics, small web series, unaired pilots.
- [ ] Wheel of Time short stories (no publication dates found yet).
- [ ] Layout audit to cover every universe (currently Marvel, ASOIAF, Star Wars).
- [ ] CI: move workflow actions off deprecated Node 20.

## Revision workflow (see PLAN.md §9)
- [x] verify-data --refetch produces a drift report (new titles / date / status / revid changes)
- [x] `aliases` map in schema for watched-state migration
- [x] Scheduled GitHub Action (weekly + manual) opening a "Data drift report" issue
- [ ] update:propose script → PR for mechanical fields only

## Open follow-ups
- [ ] Re-check Avengers: Doomsday + Born Again S3 placement after release (Doomsday: 2026-12-18)
- [x] Windows: run vitest from `C:\` (documented in README/CLAUDE.md)
