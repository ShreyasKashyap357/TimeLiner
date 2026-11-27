// Naruto: anime in story/broadcast order; The Last and the Boruto film placed where Wikipedia says.
// Generated from research (research-w3-d.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'naruto', name: "Naruto", short_name: "Naruto", order: 46, enabled: true,
  accent: { primary: '#F28C28', secondary: '#1F3A5F' }, default_continuity: 'naruto-anime', data_dir: 'naruto', last_verified: null,
  description: "The Naruto and Boruto anime with the canon films, the manga as a separate continuity, and the non-canon films.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "naruto-anime",
  "universe": "naruto",
  "name": "Naruto anime (TV series and canon films)",
  "short_name": "Naruto anime",
  "order": 1,
  "kind": "shared",
  "calendar": {
   "kind": "ordered-only"
  },
  "branches": [
   {
    "id": "main",
    "label": "Main",
    "marker": "dot",
    "description": "",
    "placeable": true,
    "parent": null,
    "diverges_at": null,
    "merges_into": null,
    "is_main": true
   }
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "The Pierrot TV anime (Naruto, Naruto: Shippuden, Boruto: Naruto Next Generations) plus the two films Wikipedia calls part of the canonical storyline (The Last, Boruto: Naruto the Movie). Kept apart from the manga because the anime adds original (filler) storylines. No calendar years exist; order is story order, with filler placed where it airs. Wikipedia: \"The episodes are based on the first twenty-seven volumes in Part I of the manga, while some episodes feature original, self-contained storylines. … [Boruto: Naruto the Movie] is the second film to be a part of the canonical Naruto storyline, being a sequel to the manga series.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=List_of_Naruto_episodes&oldid=1381669631",
   "https://en.wikipedia.org/w/index.php?title=Boruto%3A_Naruto_the_Movie&oldid=1379221049"
  ],
  "notes": ""
 },
 {
  "id": "naruto-manga",
  "universe": "naruto",
  "name": "Naruto manga",
  "short_name": "Naruto manga",
  "order": 2,
  "kind": "shared",
  "calendar": {
   "kind": "ordered-only"
  },
  "branches": [
   {
    "id": "main",
    "label": "Main",
    "marker": "dot",
    "description": "",
    "placeable": true,
    "parent": null,
    "diverges_at": null,
    "merges_into": null,
    "is_main": true
   }
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "Masashi Kishimoto's Naruto manga and its sequel manga Boruto (Naruto Next Generations, Two Blue Vortex). Separate from the anime, which adds filler and (for Boruto) an original prequel opening. Wikipedia: \"It is a spin-off and sequel to Kishimoto's manga series Naruto … Unlike the manga, which begins as a retelling of the Boruto film, the anime starts as a prequel set before Boruto and his friends become ninjas.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Boruto&oldid=1386477271"
  ],
  "notes": ""
 },
 {
  "id": "naruto-anime-films-noncanon",
  "universe": "naruto",
  "name": "Naruto anime films (non-canon)",
  "short_name": "Naruto anime films",
  "order": 3,
  "kind": "shared",
  "calendar": {
   "kind": "ordered-only"
  },
  "branches": [
   {
    "id": "main",
    "label": "Main",
    "marker": "dot",
    "description": "",
    "placeable": true,
    "parent": null,
    "diverges_at": null,
    "merges_into": null,
    "is_main": true
   }
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "The nine original-story theatrical films (2004–2012). Each is set \"after episode N\" of the anime, but none is part of the canonical storyline, so they are ordered only among themselves by that stated placement. Wikipedia: \"[Boruto: Naruto the Movie] is the second film to be a part of the canonical Naruto storyline … Naruto was adapted into 11 theatrical films. The first three films correspond to the first anime series, and the remaining eight correspond to the second.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Boruto%3A_Naruto_the_Movie&oldid=1379221049",
   "https://en.wikipedia.org/w/index.php?title=Naruto_(TV_series)&oldid=1388101187"
  ],
  "notes": "Wikipedia never uses the word \"non-canon\" for these nine films; the status is inferred from the Boruto film being \"the second film to be a part of the canonical Naruto storyline\" (the first being The Last), which leaves the other nine outside it."
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "pierrot",
  "label": "Studio Pierrot",
  "kind": "studio",
  "short_label": "Studio Pierrot",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "shueisha",
  "label": "Shueisha",
  "kind": "publisher",
  "short_label": "Shueisha",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [
 {
  "id": "print-magazine-serial",
  "label": "Print: serialised in a magazine",
  "kind": "serialized",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["naruto-anime","naruto-manga","naruto-anime-films-noncanon"];
