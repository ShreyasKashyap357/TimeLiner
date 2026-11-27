// Transformers: each continuity separate; years where Wikipedia states or categorises them.
// Generated from research (research-w3-b.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'transformers', name: "Transformers", short_name: "Transformers", order: 52, enabled: true,
  accent: { primary: '#B71C1C', secondary: '#5E35B1' }, default_continuity: 'tf-g1', data_dir: 'transformers', last_verified: null,
  description: "Major Transformers screen continuities: Generation 1, Beast Wars/Beast Machines, the live-action films (with Bumblebee and Rise of the Beasts), Aligned (Prime), Transformers One and EarthSpark.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "tf-g1",
  "universe": "transformers",
  "name": "Generation 1 (The Transformers, 1984–1987, and The Movie)",
  "short_name": "Generation 1",
  "order": 1,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
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
  "description": "The original Sunbow/Marvel animated series and its 1986 feature film, which takes place between seasons 2 and 3. Wikipedia: \"The term \"Generation 1\" (G1) covers both the animated television series The Transformers and the comic book series of the same name, which are further divided into Japanese, British and Canadian spin-offs. … The series was supplemented by a feature film, The Transformers: The Movie (1986), taking place between the second and third seasons.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Transformers&oldid=1388165025",
   "https://en.wikipedia.org/w/index.php?title=The_Transformers_%28TV_series%29&oldid=1388126615"
  ],
  "notes": ""
 },
 {
  "id": "tf-beast-era",
  "universe": "transformers",
  "name": "Beast Wars / Beast Machines",
  "short_name": "Beast Wars / Beast Machines",
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
  "description": "Beast Wars and its direct sequel Beast Machines. Wikipedia sets them in the future of G1, so they could be a branch of tf-g1. They are kept as their own continuity, as the brief asked, with a \"continues\" link to G1. Wikipedia: \"The series is set in the future of the \"original\" Transformers franchise, 300 years after the events of The Transformers … Sequels followed, such as the Generation 2 comic book and Beast Wars TV series, which became its own mini-universe. … It was a direct sequel to Beast Wars, taking place within the continuity of the original Transformers series.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Beast_Wars%3A_Transformers&oldid=1387192068",
   "https://en.wikipedia.org/w/index.php?title=Transformers&oldid=1388165025",
   "https://en.wikipedia.org/w/index.php?title=Beast_Machines%3A_Transformers&oldid=1387192062"
  ],
  "notes": ""
 },
 {
  "id": "tf-live-action",
  "universe": "transformers",
  "name": "Live-action film series (2007–2023)",
  "short_name": "Live-action film series",
  "order": 3,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
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
  "description": "The Michael Bay films, plus Bumblebee (a prequel kept in continuity with the Bay films) and its sequel Rise of the Beasts. Wikipedia: \"A live-action film series started in 2007, again distinct from previous incarnations … it is the sixth installment in the Transformers film series. … Knight originally included Megatron when storyboarding the opening battle scenes on Cybertron but used other characters instead to keep continuity with Michael Bay's Transformers. … It is the seventh installment in the Transformers film series, and a\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Transformers&oldid=1388165025",
   "https://en.wikipedia.org/w/index.php?title=Bumblebee_%28film%29&oldid=1387088977",
   "https://en.wikipedia.org/w/index.php?title=Transformers%3A_Rise_of_the_Beasts&oldid=1387177316"
  ],
  "notes": ""
 },
 {
  "id": "tf-aligned",
  "universe": "transformers",
  "name": "Aligned continuity (Prime and Robots in Disguise 2015)",
  "short_name": "Aligned continuity",
  "order": 4,
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
  "description": "Transformers: Prime, its closing TV film Predacons Rising, and the stand-alone sequel Robots in Disguise (2015). Rescue Bots and Rescue Bots Academy are also Aligned but are not included. Wikipedia: \"For most of the 2010s, in an attempt to mitigate the wave of reboots, the \"Aligned Continuity\" was established, which included four series: Transformers: Prime and Transformers: Robots in Disguise, along with the preschool-oriented Transformers: Rescue Bots and Rescue Bots Academy.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Transformers&oldid=1388165025",
   "https://en.wikipedia.org/w/index.php?title=Transformers%3A_Prime&oldid=1387257859"
  ],
  "notes": ""
 },
 {
  "id": "tf-one",
  "universe": "transformers",
  "name": "Transformers One (2024)",
  "short_name": "Transformers One",
  "order": 5,
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
  "description": "Animated origin film for Optimus Prime and Megatron, in a new continuity of its own. Wikipedia: \"The 2024 animated film, Transformers One, once again takes place in a new continuity, as does the animated YouTube web series Transformers: Cyberworld.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Transformers&oldid=1388165025"
  ],
  "notes": ""
 },
 {
  "id": "tf-earthspark",
  "universe": "transformers",
  "name": "Transformers: EarthSpark",
  "short_name": "Transformers: EarthSpark",
  "order": 6,
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
  "description": "Paramount+/Nickelodeon series, separate from earlier continuities. Wikipedia: \"Another series, Transformers: EarthSpark, debuted in 2022, again separate from previous continuities.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Transformers&oldid=1388165025"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "sunbow-productions",
  "label": "Sunbow Productions",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "mainframe-entertainment",
  "label": "Mainframe Entertainment",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "allspark-pictures",
  "label": "Allspark Pictures",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "skydance-media",
  "label": "Skydance Media",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "paramount-pictures",
  "label": "Paramount Pictures",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "dreamworks-pictures",
  "label": "DreamWorks Pictures",
  "kind": "studio",
  "short_label": "DreamWorks Pictures",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "hasbro-studios",
  "label": "Hasbro Studios",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "paramount-animation",
  "label": "Paramount Animation",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "entertainment-one",
  "label": "Entertainment One",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [
 {
  "id": "the-hub",
  "label": "The Hub (Hub Network)",
  "kind": "cable",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["tf-g1","tf-beast-era","tf-live-action","tf-aligned","tf-one","tf-earthspark"];
