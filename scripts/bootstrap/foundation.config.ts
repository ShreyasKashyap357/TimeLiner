// Foundation: books by year from a fan chronology (inferred/disputed) with Asimov's G.E./F.E. dates in the labels.
// Generated from research (research-w4-foundation.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'foundation', name: "Foundation", short_name: "Foundation", order: 57, enabled: true,
  accent: { primary: '#C9A227', secondary: '#2B4A7A' }, default_continuity: 'foundation-asimov', data_dir: 'foundation', last_verified: null,
  description: "Isaac Asimov's Robot, Galactic Empire and Foundation books (one universe, as Asimov merged them), the authorized Second Foundation trilogy, the Apple TV+ series and the 1973 BBC radio serial.", grouping_schemes: [{"id":"series","label":"Series","parent_scheme":null,"values":[{"id":"robot","label":"Robot","order":1,"parent":null},{"id":"empire","label":"Galactic Empire","order":2,"parent":null},{"id":"foundation","label":"Foundation","order":3,"parent":null},{"id":"second-foundation-trilogy","label":"Second Foundation trilogy","order":4,"parent":null}]}],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "foundation-asimov",
  "universe": "foundation",
  "name": "Asimov's Foundation universe (Robot, Galactic Empire and Foundation books)",
  "short_name": "Asimov's Foundation universe",
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
  "grouping_schemes": [
   "series"
  ],
  "alt_orders": [],
  "description": "One continuity: Asimov's Robot novels and collections, the three Galactic Empire novels and the seven Foundation novels, which Asimov merged into one future history in his later books, plus the estate-authorized Second Foundation trilogy (Benford, Bear, Brin), which Wikipedia places inside the Foundation timeline. order_index follows Asimov's own reading order from the Author's Note to Prelude to Foundation (1988), with Forward the Foundation and the Benford/Bear/Brin books inserted where Wikipedia places them. Wikipedia: \"Robot series: \"Later, Asimov merged the Robot series with his Foundation series.\" / Foundation universe: \"The Foundation universe describes a future history of humanity's colonization of the galaxy, spanning nearly 25,000 years, created through the gradual fusion of the Robot, Galactic Empire, and Foundation book series written by American author Isaac Asimov.\" … \"Asimov decided to merge the Found\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Robot_series&oldid=1386792921",
   "https://en.wikipedia.org/w/index.php?title=Foundation_universe&oldid=1387579607",
   "https://en.wikipedia.org/w/index.php?title=Foundation_(novel_series)&oldid=1385053714",
   "https://en.wikipedia.org/w/index.php?title=Galactic_Empire_series&oldid=1386797694",
   "https://en.wikipedia.org/w/index.php?title=Foundation%27s_Fear&oldid=1384228271",
   "https://neilrieck.net/links/cool_sci_fi.html#asimov-suggested-reading-order"
  ],
  "notes": ""
 },
 {
  "id": "foundation-apple-tv",
  "universe": "foundation",
  "name": "Foundation (Apple TV+ series)",
  "short_name": "Foundation",
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
  "description": "The Apple TV+ series is its own continuity: a loose adaptation that changes the books (Cleon clone dynasty, Demerzel as a robot ruling behind it, reworked Gaal Dornick and Salvor Hardin). It uses its own E.I. (Era Imperial) calendar. Wikipedia: \"Foundation (TV series): \"the \\\"genetic dynasty\\\" of clones of the long-deceased Emperor Cleon … has been surreptitiously administered for 400 years by the regal Lady Demerzel … secretly a unique, ageless humanoid robot\"; reception: Rob Bricken (Gizmodo): \"Honestly, after most of the second episode, the show and the books are pretty much unrecognizable\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=Foundation_(TV_series)&oldid=1387212099"
  ],
  "notes": ""
 },
 {
  "id": "foundation-bbc-radio-1973",
  "universe": "foundation",
  "name": "The Foundation Trilogy (BBC Radio 4, 1973)",
  "short_name": "The Foundation Trilogy",
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
  "description": "An eight-part BBC Radio 4 radio-drama adaptation of the original trilogy (1973), with some small date changes. Wikipedia: \"\"It is an adaptation of Isaac Asimov's Foundation trilogy of science fiction novels.\" … \"The conflict between The Foundation and Anacreon takes place 70 years into the Foundation era; in the novels it occurs in year 80 F.E.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/w/index.php?title=The_Foundation_Trilogy_(radio_series)&oldid=1358693564"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "gnome-press",
  "label": "Gnome Press",
  "kind": "publisher",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "doubleday",
  "label": "Doubleday",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "harperprism",
  "label": "HarperPrism",
  "kind": "publisher",
  "short_label": "HarperPrism",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "skydance-television",
  "label": "Skydance Television",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "bbc",
  "label": "Bbc",
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
export const SORT_BY_YEAR = ["foundation-asimov","foundation-apple-tv","foundation-bbc-radio-1973"];
