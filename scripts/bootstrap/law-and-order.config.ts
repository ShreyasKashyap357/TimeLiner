// Law & Order: seasons in premiere order across the shared shows (no source gives story years; order inferred from airing).
// Generated from research (research-w2-e.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'law-and-order', name: "Law & Order", short_name: "Law & Order", order: 24, enabled: true,
  accent: { primary: '#2E5C8A', secondary: '#C9A227' }, default_continuity: 'law-and-order-main', data_dir: 'law-and-order', last_verified: null,
  description: "Dick Wolf's Law & Order franchise: the US series and Exiled in one shared continuity, the international adaptations separately.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "law-and-order-main",
  "universe": "law-and-order",
  "name": "Law & Order (US shared universe)",
  "short_name": "Law & Order",
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
  "description": "The American Law & Order series and the TV film Exiled, linked by shared characters, fictional institutions and crossovers. Wikipedia: \"Shared characters and fictional organizations, such as Hudson University and the New York Ledger tabloid newspaper, serve as connecting links between the shows. … Occasionally, crossovers of main characters or shared storylines between two of the shows will occur.\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Law_%26_Order_%28franchise%29&oldid=1387571388"
  ],
  "notes": ""
 },
 {
  "id": "law-and-order-international",
  "universe": "law-and-order",
  "name": "Law & Order international adaptations",
  "short_name": "Law & Order international adaptations",
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
  "description": "Foreign adaptations with their own casts (UK, France, Canada). Each remakes a US series and is not crossover-linked to the US shows. Ordered by release only. Wikipedia: \"| otherlabel1 = Foreign adaptations | otherdata1 = … Paris enquêtes criminelles … Law & Order: UK … Law & Order Toronto: Criminal Intent\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Law_%26_Order_%28franchise%29&oldid=1387571388"
  ],
  "notes": "Grouped as one ordered-only continuity per the brief, though each adaptation is really its own continuity. The two Russian adaptations exist only as sections of the SVU and Criminal Intent articles, so they are not included."
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "wolf-films",
  "label": "Wolf Films",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "universal-television",
  "label": "Universal Television",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "wolf-entertainment",
  "label": "Wolf Entertainment",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "studios-usa-pictures",
  "label": "Studios Usa Pictures",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "kudos",
  "label": "Kudos",
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
  "id": "lark-productions",
  "label": "Lark Productions",
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
  "id": "itv",
  "label": "ITV",
  "kind": "broadcast",
  "note": ""
 },
 {
  "id": "tf1",
  "label": "TF1",
  "kind": "broadcast",
  "note": ""
 },
 {
  "id": "citytv",
  "label": "Citytv",
  "kind": "broadcast",
  "note": ""
 }
];
export const TAGS: Tag[] = [];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["law-and-order-main"];
