// Avatar: in AG/BG years from the Avatar Wiki (inferred), backed by Wikipedia's relative statements.
// Generated from research (research-w3-c.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'avatar-tla', name: "Avatar: The Last Airbender", short_name: "Avatar: The Last Airbender", order: 54, enabled: true,
  accent: { primary: '#E0912F', secondary: '#2F7FA8' }, default_continuity: 'avatarverse', data_dir: 'avatar-tla', last_verified: null,
  description: "The Avatarverse (ATLA, Korra, the novels, comics and new series) on its AG/BG calendar, plus the 2010 film and the Netflix series.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "avatarverse",
  "universe": "avatar-tla",
  "name": "Avatarverse (animated canon)",
  "short_name": "Avatarverse",
  "order": 1,
  "kind": "shared",
  "calendar": {
   "kind": "era",
   "label_position": "after",
   "pad": 0,
   "before_label": "BG",
   "after_label": "AG",
   "has_year_zero": true,
   "note": "Years before / after the Air Nomad Genocide (BG / AG), as used by the Avatar Wiki. 0 AG is the year of the genocide."
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
  "description": "The animated series Avatar: The Last Airbender and The Legend of Korra, their sequel comics, the Chronicles of the Avatar novels, the 2026 film Avatar Aang: The Last Airbender and Avatar: Seven Havens. Avatar calendar: years after (AG) / before (BG) the Air Nomad Genocide; BG stored as negative numbers (296 BG = -296). Absolute years come from the Avatar Wiki timeline (fan wiki), so they are inferred. Wikipedia: \"A sequel animated series to ''Avatar: The Last Airbender'', ''The Legend of Korra'', ran from 2012 to 2014. The storylines of both animated series have been continued in comic book form. … [Avatar Aang] A continuation of the animated television series ''Avatar: The Last Airbender'' (2005–2008) … [Seven Havens] It serves as a sequel series to ''Avatar: The Last Airbender'' (2005–2008) and ''The Leg\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Avatar%3A_The_Last_Airbender_%28franchise%29&oldid=1386679969",
   "https://en.wikipedia.org/w/index.php?title=Avatar_Aang%3A_The_Last_Airbender&oldid=1388232362",
   "https://en.wikipedia.org/w/index.php?title=Avatar%3A_Seven_Havens&oldid=1388063234",
   "https://avatar.fandom.com/wiki/History_of_the_World_of_Avatar?oldid=3058577"
  ],
  "notes": ""
 },
 {
  "id": "atla-2010-film",
  "universe": "avatar-tla",
  "name": "The Last Airbender (2010 film)",
  "short_name": "The Last Airbender",
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
  "description": "M. Night Shyamalan live-action film adapting Book One; standalone adaptation, not part of the animated canon. Wikipedia: \"Adaptation of ''The Last Airbender'' [franchise novelization entry] … The film was universally panned by critics, audiences, and fans of the animated series\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Last_Airbender_%28film%29&oldid=1387552464",
   "https://en.wikipedia.org/w/index.php?title=Avatar%3A_The_Last_Airbender_%28franchise%29&oldid=1386679969"
  ],
  "notes": ""
 },
 {
  "id": "atla-netflix",
  "universe": "avatar-tla",
  "name": "Avatar: The Last Airbender (Netflix live-action series)",
  "short_name": "Avatar: The Last Airbender",
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
  "description": "Netflix \"reimagined\" live-action remake; its own continuity. Wikipedia: \"In 2018, Netflix announced that a \"reimagined\" live-action remake of ''Avatar'' was to start production in 2019.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Avatar%3A_The_Last_Airbender_%282024_TV_series%29&oldid=1387190733"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "amulet-books",
  "label": "Amulet Books",
  "kind": "publisher",
  "short_label": "Amulet Books",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "nickelodeon-animation-studio",
  "label": "Nickelodeon Animation Studio",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "dark-horse-comics",
  "label": "Dark Horse Comics",
  "kind": "publisher",
  "short_label": "Dark Horse Comics",
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
  "id": "avatar-studios",
  "label": "Avatar Studios",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "nickelodeon-movies",
  "label": "Nickelodeon Movies",
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
 }
];
export const PLATFORMS: Platform[] = [];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["avatarverse","atla-2010-film","atla-netflix"];
