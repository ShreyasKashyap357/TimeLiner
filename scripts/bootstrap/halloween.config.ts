// Halloween. The Michael Myers films are one continuity: the original timeline (1978, II, 4–6), with the H20 branch (ignores 4–6) and the 2018 branch (ignores everything after 1978). Season of the Witch and Rob Zombie's films are separate.
// Generated from research (research-terminator-halloween.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'halloween', name: "Halloween", short_name: "Halloween", order: 13, enabled: true,
  accent: { primary: '#FF8C1A', secondary: '#B0B0B0' }, default_continuity: 'halloween-myers', data_dir: 'halloween', last_verified: null,
  description: "The Halloween films: the original timeline and its H20 and 2018 branches, Season of the Witch, and Rob Zombie's remakes.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "halloween-myers",
  "universe": "halloween",
  "name": "Halloween (Michael Myers films)",
  "short_name": "Halloween",
  "order": 1,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   {
    "id": "main",
    "label": "Original timeline",
    "marker": "dot",
    "description": "Trunk: 1978, then II (1981, the same night), 4 (1988), 5 (1989) and 6 (1995). 4–6 form the \"Thorn Trilogy\". Wikipedia: \"It is the second installment in the Halloween film series and serves as a direct sequel to Halloween (1978).\"",
    "placeable": true,
    "parent": null,
    "diverges_at": null,
    "merges_into": null,
    "is_main": true
   },
   {
    "id": "h20",
    "label": "H20 timeline",
    "marker": "diamond",
    "description": "H20 follows Halloween II and ignores 4–6. Resurrection continues it. Wikipedia: \"It is the seventh installment in the Halloween franchise and a sequel to Halloween (1978) and Halloween II (1981), ignoring the Thorn Trilogy story arc of the previous three installments. | This was the final installment of the H20 timeline of the Halloween franchise\"",
    "placeable": true,
    "parent": "main",
    "diverges_at": {
     "y": 1978
    },
    "merges_into": null,
    "is_main": false
   },
   {
    "id": "blumhouse",
    "label": "2018 timeline",
    "marker": "square",
    "description": "A direct sequel to the 1978 film that ignores every other film and retcons the original ending (Michael is arrested in 1978). The divergence falls inside 31 Oct 1978, after the events of the 1978 film. Wikipedia: \"It is the eleventh installment in the Halloween film series and a direct sequel to Halloween (1978), ignoring the events of all previous films in the franchise. | An eleventh installment was released in 2018, as a direct sequel to the original film, disregarding the previous sequels, and retconning \"",
    "placeable": true,
    "parent": "main",
    "diverges_at": {
     "y": 1978
    },
    "merges_into": null,
    "is_main": false
   }
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "",
  "source_urls": [],
  "notes": "Wikipedia's \"Halloween story chronology\" table (Halloween (franchise), revid 1386888007) lists: Original continuity (1978, II, 4, 5, 6); Anthology continuity (III); Dimension Films continuity (1978, II, H20, Resurrection); Remake continuity (2007, 2009); Blumhouse continuity (1978, 2018, Kills, Ends). PROPOSAL: one continuity for the three timelines that share Halloween (1978), with the original sequels as the trunk and two branches. III and the Rob Zombie films are separate continuities."
 },
 {
  "id": "halloween-season-of-the-witch",
  "universe": "halloween",
  "name": "Halloween III: Season of the Witch",
  "short_name": "Halloween III: Season of the Witch",
  "order": 2,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   {
    "id": "main",
    "label": "Anthology",
    "marker": "dot",
    "description": "Standalone. Wikipedia: \"Carpenter and Hill agreed to participate in the new project only if it was not a direct sequel to Halloween II, which meant Michael Myers would not be the focus of the film. | the plot of which is unrelated to the other films in the series due to the absence of Michael Myers.\"",
    "placeable": true,
    "parent": null,
    "diverges_at": null,
    "merges_into": null,
    "is_main": true
   }
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "",
  "source_urls": [],
  "notes": "Separate continuity: an unrelated anthology entry with no Michael Myers (Wikipedia's \"Anthology continuity\")."
 },
 {
  "id": "halloween-rob-zombie",
  "universe": "halloween",
  "name": "Halloween (Rob Zombie)",
  "short_name": "Halloween",
  "order": 3,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   {
    "id": "main",
    "label": "Remake",
    "marker": "dot",
    "description": "A remake of the 1978 film and its own sequel. Wikipedia: \"It is a remake of John Carpenter's 1978 film, and the ninth installment in the Halloween franchise. | the sequel to Zombie's 2007 remake of Halloween (1978), though it is not a remake of the 1981 sequel of the same name.\"",
    "placeable": true,
    "parent": null,
    "diverges_at": null,
    "merges_into": null,
    "is_main": true
   }
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "",
  "source_urls": [],
  "notes": "Separate continuity: the remakes (Wikipedia's \"Remake continuity\")."
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "compass-international",
  "label": "Compass International",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "dino-de-laurentiis-corporation",
  "label": "Dino De Laurentiis Corporation",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "trancas-international",
  "label": "Trancas International",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "magnum-pictures",
  "label": "Magnum Pictures",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "nightfall-productions",
  "label": "Nightfall Productions",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "dimension-films",
  "label": "Dimension Films",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "miramax",
  "label": "Miramax",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [];
export const TAGS: Tag[] = [{"id":"michael-myers","label":"Michael Myers","kind":"character","aliases":[]},{"id":"laurie-strode","label":"Laurie Strode","kind":"character","aliases":[]},{"id":"dr-loomis","label":"Dr. Sam Loomis","kind":"character","aliases":[]}];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["halloween-myers","halloween-season-of-the-witch","halloween-rob-zombie"];
