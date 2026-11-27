// Halo: core canon vs the TV series' separate "Silver Timeline".
// Generated from research (research-game-franchises.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'halo', name: "Halo", short_name: "Halo", order: 20, enabled: true,
  accent: { primary: '#5BA4CF', secondary: '#7CC242' }, default_continuity: 'halo-core', data_dir: 'halo', last_verified: null,
  description: "The Halo games and core novels, and the Paramount+ series (\"Silver Timeline\").", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "halo-core",
  "universe": "halo",
  "name": "Halo (core canon)",
  "short_name": "Halo",
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
  "description": "Games, novels, Forward Unto Dawn, Nightfall and Halo Legends (all but one Legends short are canon). Wikipedia: \"Six of the stories are officially part of the Halo canon, with the seventh, made by Toei, intended to be a parody of the universe. … In addition to providing input on the script, 343 Industries had a representative on set at all times to ensure that the series did not break canon.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Halo_%28franchise%29&oldid=1388156702",
   "https://en.wikipedia.org/w/index.php?title=Halo_4%3A_Forward_Unto_Dawn&oldid=1387889741"
  ],
  "notes": ""
 },
 {
  "id": "halo-silver",
  "universe": "halo",
  "name": "Silver Timeline (Paramount+ series)",
  "short_name": "Silver Timeline",
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
  "description": "The Paramount+ Halo series. A separate canon from the games. Wikipedia: \"Executive producer Kiki Wolfkill revealed that the series is a standalone story that takes place within its own \"Silver Timeline\" that is separate from and inspired by the core canon and lore of the transmedia franchise rather than a continuation, adaptation, prequel, or sequel, explaining that they wished to give the two Halo canons a chance to evolve individually to suit their media.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Halo_%28TV_series%29&oldid=1388268937"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "eric-nylund",
  "label": "Eric Nylund",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "bungie",
  "label": "Bungie",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "ensemble-studios",
  "label": "Ensemble Studios",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "343-industries",
  "label": "343 Industries",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "halo-studios",
  "label": "Halo Studios",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "studio-4-c",
  "label": "Studio 4 C",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "machinima",
  "label": "Machinima",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "scott-free-productions",
  "label": "Scott Free Productions",
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
  "id": "xbox",
  "label": "Xbox",
  "kind": "game-platform",
  "note": ""
 },
 {
  "id": "windows-8",
  "label": "Windows 8",
  "kind": "game-platform",
  "note": ""
 },
 {
  "id": "xbox-one",
  "label": "Xbox One",
  "kind": "game-platform",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["halo-core","halo-silver"];
