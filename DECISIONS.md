# Decisions log

Work continues stage to stage without stopping (user instruction, 2026-11-26). Open questions are collected here, each with the default I'm using until you answer. Defaults are chosen to be easy to reverse.

## Open: waiting on you

| # | Stage | Question | Default being used |
|---|---|---|---|
| D-1 | 1 | **How to present the two "Marvel Television" studios.** They are now distinct registry entries (see below). Options: **(a)** one "Marvel Television" filter group with two clearly labelled checkboxes, "Division, 2010–2019 (ABC / Netflix / Hulu / Freeform)" and "Marvel Studios banner, 2024–"; **(b)** two unrelated filters with no grouping; **(c)** show only the parent studio (Marvel Studios) for the 2024 banner and hide the banner name. | **(a)**. Badges also differ: "Marvel TV ’10–’19" (outlined, archive style) vs "Marvel Studios › Marvel TV banner" (breadcrumb). Each has a tooltip explaining they are different entities. |

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
