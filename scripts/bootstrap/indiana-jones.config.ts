// Indiana Jones: ordered by the stated years (Temple of Doom 1935 comes before Raiders 1936).
// Generated from research (research-w5-c.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'indiana-jones', name: "Indiana Jones", short_name: "Indiana Jones", order: 71, enabled: true,
  accent: { primary: '#8D6E63', secondary: '#FFB300' }, default_continuity: 'indiana-jones-main', data_dir: 'indiana-jones', last_verified: null,
  description: "The five Indiana Jones films, The Young Indiana Jones Chronicles and The Great Circle game, in one continuity by their stated years.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "indiana-jones-main",
  "universe": "indiana-jones",
  "name": "Indiana Jones",
  "short_name": "Indiana Jones",
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
  "description": "The five films, The Young Indiana Jones Chronicles (Jones in his youth) and the Great Circle game (set between Raiders and Last Crusade). Wikipedia: \"In 1992, the franchise expanded to a television series with The Young Indiana Jones Chronicles, depicting Jones in his youth. … features an original narrative set between the events of Raiders of the Lost Ark (1981) and Indiana Jones and the Last Crusade (1989).\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Indiana_Jones&oldid=1384872391",
   "https://en.wikipedia.org/w/index.php?title=Indiana_Jones_and_the_Great_Circle&oldid=1386038224"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "lucasfilm",
  "label": "Lucasfilm",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "machinegames",
  "label": "MachineGames",
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
export const SORT_BY_YEAR = ["indiana-jones-main"];
