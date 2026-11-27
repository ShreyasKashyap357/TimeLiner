// GTA: three universes (2D, 3D, HD) that Wikipedia says are "considered to be separate continuities".
// Generated from research (research-game-franchises.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'grand-theft-auto', name: "Grand Theft Auto", short_name: "GTA", order: 16, enabled: true,
  accent: { primary: '#F7C948', secondary: '#4FB4E8' }, default_continuity: 'gta-hd', data_dir: 'grand-theft-auto', last_verified: null,
  description: "Rockstar's Grand Theft Auto series across its 2D, 3D and HD universes.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "gta-2d",
  "universe": "grand-theft-auto",
  "name": "2D universe",
  "short_name": "2D universe",
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
  "description": "The top-down games: Grand Theft Auto (1997), its two London expansion packs, and Grand Theft Auto 2. Wikipedia: \"The original Grand Theft Auto, its expansions and its sequel are considered the \"2D universe\". … Each universe is considered separate with only brands, place names and background characters shared between them.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Grand_Theft_Auto&oldid=1388100487"
  ],
  "notes": ""
 },
 {
  "id": "gta-3d",
  "universe": "grand-theft-auto",
  "name": "3D universe",
  "short_name": "3D universe",
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
  "description": "Grand Theft Auto III and the games in its continuity: Vice City, San Andreas, Advance, Liberty City Stories, Vice City Stories. Wikipedia: \"Grand Theft Auto III and its sequels are considered the \"3D universe\". … The universes share the names of cities, several brands, and background characters who never make physical appearances in the games (with a few exceptions), but are otherwise considered to be separate continuities.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Grand_Theft_Auto&oldid=1388100487"
  ],
  "notes": ""
 },
 {
  "id": "gta-hd",
  "universe": "grand-theft-auto",
  "name": "HD universe",
  "short_name": "HD universe",
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
  "description": "Grand Theft Auto IV onward: The Lost and Damned, The Ballad of Gay Tony, Chinatown Wars, V, Online, VI. Wikipedia: \"Grand Theft Auto IV, its expansions and its sequels are considered the \"HD universe\". … The new timeline established by Grand Theft Auto IV continues with two expansion packs, The Lost and Damned and The Ballad of Gay Tony, and a sequel, Grand Theft Auto V, as well as its online component, Grand Theft Auto Online.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Grand_Theft_Auto&oldid=1388100487",
   "https://en.wikipedia.org/w/index.php?title=Grand_Theft_Auto_IV&oldid=1388223718"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "dma-design",
  "label": "Dma Design",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "rockstar-canada",
  "label": "Rockstar Canada",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "rockstar-north",
  "label": "Rockstar North",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "digital-eclipse",
  "label": "Digital Eclipse",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "rockstar-leeds",
  "label": "Rockstar Leeds",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "rockstar-games",
  "label": "Rockstar Games",
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
  "id": "ms-dos",
  "label": "MS-DOS",
  "kind": "game-platform",
  "note": ""
 },
 {
  "id": "windows",
  "label": "Windows",
  "kind": "game-platform",
  "note": ""
 },
 {
  "id": "playstation",
  "label": "PlayStation",
  "kind": "game-platform",
  "note": ""
 },
 {
  "id": "playstation-2",
  "label": "PlayStation 2",
  "kind": "game-platform",
  "note": ""
 },
 {
  "id": "game-boy-advance",
  "label": "Game Boy Advance",
  "kind": "game-platform",
  "note": ""
 },
 {
  "id": "playstation-portable",
  "label": "PlayStation Portable",
  "kind": "game-platform",
  "note": ""
 },
 {
  "id": "playstation-3",
  "label": "PlayStation 3",
  "kind": "game-platform",
  "note": ""
 },
 {
  "id": "xbox-360",
  "label": "Xbox 360",
  "kind": "game-platform",
  "note": ""
 },
 {
  "id": "playstation-5",
  "label": "PlayStation 5",
  "kind": "game-platform",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["gta-2d","gta-3d","gta-hd"];
