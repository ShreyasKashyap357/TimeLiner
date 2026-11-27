// Assassin's Creed: one continuity; the film is "set in the same universe as the video games".
// Generated from research (research-game-franchises.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'assassins-creed', name: "Assassin's Creed", short_name: "Assassin's Creed", order: 21, enabled: true,
  accent: { primary: '#E4E4E4', secondary: '#B22222' }, default_continuity: 'ac-main', data_dir: 'assassins-creed', last_verified: null,
  description: "Ubisoft's Assassin's Creed games with their historical settings and modern-day frame, the film and series.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "ac-main",
  "universe": "assassins-creed",
  "name": "Assassin's Creed",
  "short_name": "Assassin's Creed",
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
  "description": "One continuity. Games, the 2016 film, short films and the Netflix series all share the universe. Historical settings are viewed through Animus memories, with a modern-day frame story. Wikipedia: \"In most games, players control a historical Assassin while also playing as an Assassin Initiate or someone caught in the Assassin–Templar conflict in the present-day framing story. … The film is set in the same universe as the video games but features an original story.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Assassin%27s_Creed&oldid=1387140246",
   "https://en.wikipedia.org/w/index.php?title=Assassin%27s_Creed_%28film%29&oldid=1386986604"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "ubisoft-montreal",
  "label": "Ubisoft Montreal",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "gameloft-bucharest",
  "label": "Gameloft Bucharest",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "griptonite-games",
  "label": "Griptonite Games",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "ubiworkshop",
  "label": "Ubiworkshop",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "ubisoft-sofia",
  "label": "Ubisoft Sofia",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "climax-studios",
  "label": "Climax Studios",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "ubisoft-quebec",
  "label": "Ubisoft Quebec",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "studio-not-stated",
  "label": "Studio Not Stated",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "ubisoft-bordeaux",
  "label": "Ubisoft Bordeaux",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "ubisoft-singapore",
  "label": "Ubisoft Singapore",
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
  "id": "playstation-vita",
  "label": "PlayStation Vita",
  "kind": "game-platform",
  "note": ""
 },
 {
  "id": "macos",
  "label": "macOS",
  "kind": "game-platform",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["ac-main"];
