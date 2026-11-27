// Ghostbusters: years from the films' stated gaps (thirty-two years after II).
// Generated from research (research-w5-c.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'ghostbusters', name: "Ghostbusters", short_name: "Ghostbusters", order: 70, enabled: true,
  accent: { primary: '#2E7D32', secondary: '#D32F2F' }, default_continuity: 'ghostbusters-original', data_dir: 'ghostbusters', last_verified: null,
  description: "The original Ghostbusters films with Afterlife and Frozen Empire (and the 2009 game, canon status disputed), the 2016 reboot, and the animated series.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "ghostbusters-original",
  "universe": "ghostbusters",
  "name": "Ghostbusters (original continuity)",
  "short_name": "Ghostbusters",
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
  "description": "The 1984 film, Ghostbusters II, the 2009 video game (by the film writers, set two years after II), Afterlife and Frozen Empire. Wikipedia: \"The series returned to the original canon with Ghostbusters: Afterlife (2021) and Ghostbusters: Frozen Empire (2024). … It is a sequel to Ghostbusters (1984) and Ghostbusters II (1989) and is the third mainline installment … Set thirty-two years after the events of Ghostbusters II\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ghostbusters_II&oldid=1387396201",
   "https://en.wikipedia.org/w/index.php?title=Ghostbusters%3A_Afterlife&oldid=1388133929"
  ],
  "notes": ""
 },
 {
  "id": "ghostbusters-2016",
  "universe": "ghostbusters",
  "name": "Ghostbusters (2016 reboot)",
  "short_name": "Ghostbusters",
  "order": 2,
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
  "description": "Paul Feig's 2016 reboot; Sony abandoned its sequel and continued the original canon instead. Wikipedia: \"it is a reboot of the Ghostbusters franchise, as well as serving as its third installment. … Sony abandoned plans for a sequel, opting instead to continue the original film canon with Ghostbusters: Afterlife (2021).\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Ghostbusters_(2016_film)&oldid=1387982389"
  ],
  "notes": ""
 },
 {
  "id": "ghostbusters-animated",
  "universe": "ghostbusters",
  "name": "Ghostbusters (animated series)",
  "short_name": "Ghostbusters",
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
  "description": "The Real Ghostbusters (1986–1991) and its sequel Extreme Ghostbusters (1997). Kept separate from the films: the show reworks the film concept and treats the 1984 film as a movie made about the team. Wikipedia: \"Although the Ghostbusters concept was tinkered with, the finalized show does feature many tie-ins from the films. In the season 1 episode \"Take Two\", the Ghostbusters fly to Hollywood to visit the set of a movie based on their adventures, which is revealed to be the 1984 movie at the end of the episode. … A sequel to The Real Ghostbusters, which aired from 1986 to 1991 on ABC, Extreme Ghostbusters\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Real_Ghostbusters&oldid=1387246012",
   "https://en.wikipedia.org/w/index.php?title=Extreme_Ghostbusters&oldid=1387208541"
  ],
  "notes": "The Real Ghostbusters lead also calls it \"a spin-off and sequel of the 1984 comedy film Ghostbusters\"; kept as its own continuity per the caller default (the 1984 film exists as an in-universe movie in \"Take Two\"). Recorded as a spinoff link."
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "columbia-pictures",
  "label": "Columbia Pictures",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "terminal-reality",
  "label": "Terminal Reality",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "dic-enterprises",
  "label": "DIC Enterprises",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "columbia-tristar-television",
  "label": "Columbia TriStar Television",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["ghostbusters-original","ghostbusters-2016","ghostbusters-animated"];
