# Decisions log

Work continues stage to stage without stopping (user instruction, 2026-11-26). Open questions are collected here, each with the default I'm using until you answer. Defaults are chosen to be easy to reverse.

## Open: waiting on you

| # | Stage | Question | Default being used |
|---|---|---|---|
| D-1 | 1 | **How to present the two "Marvel Television" studios.** They are now distinct registry entries (see below). Options: **(a)** one "Marvel Television" filter group with two clearly labelled checkboxes, "Division, 2010–2019 (ABC / Netflix / Hulu / Freeform)" and "Marvel Studios banner, 2024–"; **(b)** two unrelated filters with no grouping; **(c)** show only the parent studio (Marvel Studios) for the 2024 banner and hide the banner name. | **(a)**. Badges also differ: "Marvel TV ’10–’19" (outlined, archive style) vs "Marvel Studios › Marvel TV banner" (breadcrumb). Each has a tooltip explaining they are different entities. |
| D-2 | 2 | **Default canon-tier filter.** The brief says "default: core only", but your reference image also shows the purple-diamond entries (FF: First Steps, Deadpool & Wolverine, YFNSM, Marvel Zombies), which are tier `outside-set-date`. | Default = **core + outside-set-date**, so the default view matches your image. Adjacent and non-placeable are off by default. |
| D-3 | 2 | **The brief's toggles "Marvel Television, adjacent, animated, non-placeable".** Netflix shows are Marvel Television (division) but `core`, and they appear in your image, so a "Marvel Television" toggle that is off by default would hide them. | Tier checkboxes for adjacent and non-placeable; the "Animated" quick toggle; Marvel Television (either entity) via the grouped Studio filter. Nothing Marvel-specific is hard-coded. |
| D-4 | 2 | **Bundle size.** The main JS chunk is about 200 KB gzipped (Zod validation and Radix). Data is already split per universe. | Leave as is for now. Optional later: skip runtime validation in production, or split views into lazy chunks. |
| D-5 | 2 | **GitHub Pages switch-on.** It needs the repo setting Pages → Source: GitHub Actions. | I'll try to enable it through the GitHub API. If that isn't permitted, you need to flip it once. |

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
