// Doctor Who. The TV series and BBC spin-offs are one continuity ordered by the Doctor's regenerations, then broadcast; the Dalek films, K9 (2009) and Big Finish audio are separate.
// Generated from research (research-doctor-who.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'doctor-who', name: "Doctor Who", short_name: "Doctor Who", order: 22, enabled: true,
  accent: { primary: '#2F6FD0', secondary: '#E8C547' }, default_continuity: 'whoniverse', data_dir: 'doctor-who', last_verified: null,
  description: "Doctor Who on TV (1963–), the 1996 film and its spin-offs (Torchwood, The Sarah Jane Adventures, Class), the Peter Cushing Dalek films, K9, and Big Finish audio.", grouping_schemes: [{"id":"doctor","label":"Doctor","parent_scheme":null,"values":[{"id":"fugitive-doctor","label":"Fugitive Doctor (Jo Martin)","order":0,"parent":null},{"id":"first-doctor","label":"First Doctor (William Hartnell)","order":1,"parent":null},{"id":"second-doctor","label":"Second Doctor (Patrick Troughton)","order":2,"parent":null},{"id":"third-doctor","label":"Third Doctor (Jon Pertwee)","order":3,"parent":null},{"id":"fourth-doctor","label":"Fourth Doctor (Tom Baker)","order":4,"parent":null},{"id":"fifth-doctor","label":"Fifth Doctor (Peter Davison)","order":5,"parent":null},{"id":"sixth-doctor","label":"Sixth Doctor (Colin Baker)","order":6,"parent":null},{"id":"seventh-doctor","label":"Seventh Doctor (Sylvester McCoy)","order":7,"parent":null},{"id":"eighth-doctor","label":"Eighth Doctor (Paul McGann)","order":8,"parent":null},{"id":"war-doctor","label":"War Doctor (John Hurt)","order":8.5,"parent":null},{"id":"ninth-doctor","label":"Ninth Doctor (Christopher Eccleston)","order":9,"parent":null},{"id":"tenth-doctor","label":"Tenth Doctor (David Tennant)","order":10,"parent":null},{"id":"eleventh-doctor","label":"Eleventh Doctor (Matt Smith)","order":11,"parent":null},{"id":"twelfth-doctor","label":"Twelfth Doctor (Peter Capaldi)","order":12,"parent":null},{"id":"thirteenth-doctor","label":"Thirteenth Doctor (Jodie Whittaker)","order":13,"parent":null},{"id":"fourteenth-doctor","label":"Fourteenth Doctor (David Tennant)","order":14,"parent":null},{"id":"fifteenth-doctor","label":"Fifteenth Doctor (Ncuti Gatwa)","order":15,"parent":null}]}],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "whoniverse",
  "universe": "doctor-who",
  "name": "Whoniverse (BBC television)",
  "short_name": "Whoniverse",
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
  "grouping_schemes": [
   "doctor"
  ],
  "alt_orders": [],
  "description": "",
  "source_urls": [],
  "notes": "Doctor Who on TV (1963–1989, the 1996 film, 2005–2025) plus the BBC spin-offs that cross over on screen: Torchwood, The Sarah Jane Adventures, K-9 and Company, Class, The War Between the Land and the Sea and Tales of the TARDIS. The Doctor Who infobox has related = \"Whoniverse\". Suggested branches: doctor-who, torchwood, sarah-jane, class, unit."
 },
 {
  "id": "dalek-films",
  "universe": "doctor-who",
  "name": "Dalek films (1965–1966)",
  "short_name": "Dalek films",
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
  "description": "",
  "source_urls": [],
  "notes": "\"The film was not intended to form part of the ongoing story-lines of the television series.\" Peter Cushing's \"Dr. Who\" is a human inventor. The two films have their own order."
 },
 {
  "id": "k9-series",
  "universe": "doctor-who",
  "name": "K9 (2009–2010)",
  "short_name": "K9",
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
  "description": "",
  "source_urls": [],
  "notes": "Not a BBC production: \"direct references to Doctor Who were not legally allowed for rights reasons\", although the producers say this is the original K9 Mark I. Separate by default; a candidate for DECISIONS.md."
 },
 {
  "id": "big-finish",
  "universe": "doctor-who",
  "name": "Big Finish audio",
  "short_name": "Big Finish audio",
  "order": 4,
  "kind": "standalone-collection",
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
  "description": "",
  "source_urls": [],
  "notes": "Licensed audio dramas, 1998/1999 to the present. Separate by default; no in-universe placement recorded."
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "bbc",
  "label": "Bbc",
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
  "id": "bbc-wales",
  "label": "Bbc Wales",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "bbc-cymru-wales",
  "label": "Bbc Cymru Wales",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "bbc-pebble-mill",
  "label": "Bbc Pebble Mill",
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
  "id": "bad-wolf",
  "label": "Bad Wolf",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "aaru-productions",
  "label": "Aaru Productions",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "big-finish",
  "label": "Big Finish",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [];
export const TAGS: Tag[] = [{"id":"the-doctor","label":"The Doctor","kind":"character","aliases":[]},{"id":"daleks","label":"Daleks","kind":"team","aliases":[]},{"id":"cybermen","label":"Cybermen","kind":"team","aliases":[]},{"id":"the-master","label":"The Master","kind":"character","aliases":[]}];
export const FANDOM_PREFIXES = {};
export const SORT_BY_YEAR = ["whoniverse","dalek-films","k9-series"];
