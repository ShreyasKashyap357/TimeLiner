// Wizarding World. Books (with Cursed Child, which Rowling says 'should be considered canon'), the films (Harry Potter + Fantastic Beasts, 'the Wizarding World shared universe'), and the HBO series ('a reboot') are separate continuities linked with adapts.
// Generated from research (research-wizarding-world.json) on 2026-11-27 by the generic generator.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';

export const UNIVERSE: Universe = {
  id: 'wizarding-world', name: "Wizarding World (Harry Potter)", short_name: "Wizarding World", order: 14, enabled: true,
  accent: { primary: '#D3A625', secondary: '#AE0001' }, default_continuity: 'wizarding-world-books', data_dir: 'wizarding-world', last_verified: null,
  description: "J. K. Rowling's Harry Potter books and companions, Cursed Child, the Harry Potter and Fantastic Beasts films, and the HBO series.", grouping_schemes: [],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "wizarding-world-books",
  "universe": "wizarding-world",
  "name": "Harry Potter books",
  "short_name": "Harry Potter books",
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
  "description": "Rowling's novels, the companion in-universe books, the 2016 Pottermore Presents e-books, and (proposed) Harry Potter and the Cursed Child (stage play + script book), which Rowling calls canon. Wikipedia: \"\"There are debates within the fandom about whether the story should be considered canon ... Rowling has stated that the play should be considered canon.\" (Harry Potter and the Cursed Child). The Deathly Hallows infobox carries an editor comment: \"Do not add \\\"Cursed Child\\\" as followed_by. Rowling said it is a script, not a book.\"\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/Harry_Potter_and_the_Cursed_Child (revid 1388147890); https://en.wikipedia.org/wiki/Harry_Potter_and_the_Deathly_Hallows (revid 1388147847)"
  ],
  "notes": ""
 },
 {
  "id": "wizarding-world-films",
  "universe": "wizarding-world",
  "name": "Wizarding World films",
  "short_name": "Wizarding World films",
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
  "description": "Warner Bros. film continuity: the eight Harry Potter films (2001-2011) and the Fantastic Beasts prequel films (2016-2022). Wikipedia: \"\"Fantastic Beasts is a film series directed by David Yates and a spin-off prequel to the Harry Potter novel and film series. ... Following the 2001-11 film series directly adapting the Harry Potter books, Fantastic Beasts is the second film series in the Wizarding World shared universe media franchise.\" (Fantastic Beasts). Also: \"A spin-off prequel series started with Fantastic Beasts and Where to\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/Fantastic_Beasts (revid 1384330204); https://en.wikipedia.org/wiki/Harry_Potter_(film_series) (revid 1387217805)"
  ],
  "notes": ""
 },
 {
  "id": "hbo-harry-potter",
  "universe": "wizarding-world",
  "name": "Harry Potter (HBO series)",
  "short_name": "Harry Potter",
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
  "description": "HBO television reboot, one season per novel; separate from the film continuity. Wikipedia: \"\"It will be a reboot of the franchise, retelling the story of the novels with a season dedicated to each of the seven books, and will be produced over the course of ten years.\" (Wizarding World)\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/Wizarding_World (revid 1387861952)"
  ],
  "notes": ""
 },
 {
  "id": "wizarding-world-other",
  "universe": "wizarding-world",
  "name": "Documentaries and specials",
  "short_name": "Documentaries and specials",
  "order": 4,
  "kind": "standalone-collection",
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
  "description": "Retrospectives about the films; not part of the story.",
  "source_urls": [],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "bloomsbury",
  "label": "Bloomsbury (UK) / Scholastic (US)",
  "kind": "publisher",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "childrens-high-level-group",
  "label": "Childrens High Level Group",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "pottermore",
  "label": "Pottermore Publishing",
  "kind": "publisher",
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
  "id": "little-brown",
  "label": "Little, Brown / Scholastic",
  "kind": "publisher",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "warner-bros-pictures",
  "label": "Warner Bros. Pictures",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "hbo-entertainment",
  "label": "HBO",
  "kind": "studio",
  "short_label": null,
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "warner-bros-unscripted-television",
  "label": "Warner Bros Unscripted Television",
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
  "id": "print-paperback",
  "label": "Print: paperback first edition",
  "kind": "print",
  "note": ""
 },
 {
  "id": "ebook",
  "label": "E-book",
  "kind": "ebook",
  "note": ""
 },
 {
  "id": "theatre",
  "label": "Theatre (stage production)",
  "kind": "venue",
  "note": ""
 }
];
export const TAGS: Tag[] = [{"id":"harry-potter","label":"Harry Potter","kind":"character","aliases":[]},{"id":"hermione-granger","label":"Hermione Granger","kind":"character","aliases":[]},{"id":"ron-weasley","label":"Ron Weasley","kind":"character","aliases":[]},{"id":"albus-dumbledore","label":"Albus Dumbledore","kind":"character","aliases":[]},{"id":"lord-voldemort","label":"Lord Voldemort","kind":"character","aliases":[]},{"id":"newt-scamander","label":"Newt Scamander","kind":"character","aliases":[]}];
export const FANDOM_PREFIXES = {"hp":"https://harrypotter.fandom.com/wiki/"};
export const SORT_BY_YEAR = ["wizarding-world-books","wizarding-world-films","hbo-harry-potter","wizarding-world-other"];
