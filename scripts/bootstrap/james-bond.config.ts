// James Bond (generated from research on 2026-11-27). Continuities: Eon "original loose continuity" (1962–2002),
// the Craig reboot, the three non-Eon productions, Fleming's books (with period-set continuation novels as an
// adjacent tier), Gardner's updated-timeframe novels and Deaver's reboot. Story order = seed order.
import type { Continuity, Platform, Studio, Tag, Universe } from '../../src/domain/schema.ts';
const main = { id: 'main', label: 'Main', marker: 'dot' as const, description: '', placeable: true, parent: null, diverges_at: null, merges_into: null, is_main: true };
export const UNIVERSE: Universe = {
  id: 'james-bond', name: 'James Bond', short_name: 'James Bond', order: 10, enabled: true,
  accent: { primary: '#E8E8E8', secondary: '#C9A227' }, default_continuity: 'bond-eon-classic', data_dir: 'james-bond', last_verified: null,
  description: "The Eon films (classic and Craig eras), the non-Eon films, and Ian Fleming's books with continuation novels.",
  grouping_schemes: [{ id: 'actor', label: 'Bond actor', parent_scheme: null, values: [
    { id: 'connery', label: 'Sean Connery', order: 1, parent: null }, { id: 'lazenby', label: 'George Lazenby', order: 2, parent: null }, { id: 'moore', label: 'Roger Moore', order: 3, parent: null },
    { id: 'dalton', label: 'Timothy Dalton', order: 4, parent: null }, { id: 'brosnan', label: 'Pierce Brosnan', order: 5, parent: null }] }],
};
export const CONTINUITIES: Continuity[] = [
 {
  "id": "bond-eon-classic",
  "universe": "james-bond",
  "name": "Eon films (Connery to Brosnan, 1962-2002)",
  "short_name": "Eon films",
  "order": 1,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   main
  ],
  "grouping_schemes": [
   "actor"
  ],
  "alt_orders": [],
  "description": "\"It is also the first Bond film not to be part of the franchise's original loose continuity. Following Die Another Day (2002), Eon decided to reboot the franchise\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/Casino_Royale_(2006_film)"
  ],
  "notes": ""
 },
 {
  "id": "bond-eon-craig",
  "universe": "james-bond",
  "name": "Eon films, Daniel Craig reboot (2006-2021)",
  "short_name": "Eon films, Daniel Craig reboot",
  "order": 2,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   main
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "\"Craig first played Bond in the 2006 film Casino Royale, an adaptation of Fleming's novel of the same name and a reboot of the Eon series, which saw Bond earn his 00 status.\" / \"The rebooted series spanned five films - Casino Royale (2006), Quantum of Solace (2008), Skyfall (2012), Spectre (2015), and No Time to Die (2021) - all starring Craig.\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/Portrayal_of_James_Bond_in_film%3B_James_Bond_(Daniel_Craig)"
  ],
  "notes": ""
 },
 {
  "id": "bond-climax-1954",
  "universe": "james-bond",
  "name": "Casino Royale (Climax!, 1954)",
  "short_name": "Casino Royale",
  "order": 3,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   main
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "\"Though the lead character is based on the literary Bond, Nelson's character is played as an American spy working for the \"Combined Intelligence Agency\" rather than as British\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/Casino_Royale_(Climax!)"
  ],
  "notes": ""
 },
 {
  "id": "bond-casino-royale-1967",
  "universe": "james-bond",
  "name": "Casino Royale (1967 parody)",
  "short_name": "Casino Royale",
  "order": 4,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   main
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "\"Casino Royale is a 1967 spy parody film originally distributed by Columbia Pictures.\" Never Say Never Again article quoting MSN's Norman Wilner: 1967's Casino Royale and Never Say Never Again \"exist outside the 'official' continuity\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/Casino_Royale_(1967_film)%3B_Never_Say_Never_Again"
  ],
  "notes": ""
 },
 {
  "id": "bond-nsna-1983",
  "universe": "james-bond",
  "name": "Never Say Never Again (1983)",
  "short_name": "Never Say Never Again",
  "order": 5,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   main
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "\"Never Say Never Again is the second and most recent James Bond film not to be produced by Eon Productions (the usual producer of the Bond series) but instead by Jack Schwartzman's Taliafilm.\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/Never_Say_Never_Again"
  ],
  "notes": ""
 },
 {
  "id": "bond-fleming",
  "universe": "james-bond",
  "name": "Ian Fleming's Bond books (1953-1966)",
  "short_name": "Ian Fleming's Bond books",
  "order": 6,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   main
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "\"Although Fleming did not date the events within his novels, John Griswold and Henry Chancellor - both of whom wrote books for Ian Fleming Publications - have identified different timelines based on episodes and situations within the novel series as a whole.\" List: \"This chronology differs from the publication sequence.\" ... Chancellor noted that \"Fleming was always vague about dates\", although the novels are supposed to be set in order of publication.",
  "source_urls": [
   "https://en.wikipedia.org/wiki/Dr._No_(novel)%3B_List_of_James_Bond_novels_and_short_stories"
  ],
  "notes": ""
 },
 {
  "id": "bond-gardner-benson",
  "universe": "james-bond",
  "name": "Continuation novels, Gardner/Benson updated timeframe (1981-2002)",
  "short_name": "Continuation novels, Gardner/Benson updated timeframe",
  "order": 7,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   main
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "\"Updating the time frame to the 1980s, Gardner's series picks up the career of James Bond some years after the Fleming novels ended.\" / \"Due to the time frame change Gardner's series suggests that Fleming's stories took place in the 1960s and 70s, rather than the 1950s and 60s.\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/Licence_Renewed"
  ],
  "notes": ""
 },
 {
  "id": "bond-deaver",
  "universe": "james-bond",
  "name": "Carte Blanche (2011 contemporary reboot)",
  "short_name": "Carte Blanche",
  "order": 8,
  "kind": "shared",
  "calendar": {
   "kind": "gregorian"
  },
  "branches": [
   main
  ],
  "grouping_schemes": [],
  "alt_orders": [],
  "description": "\"Carte Blanche is the thirty-seventh original James Bond novel and the first to have a contemporary setting since The Man with the Red Tattoo by Raymond Benson was published in 2002.\" / \"... implying that in Deaver's continuity Major Boothroyd (the Q of Fleming's Bond) is not the quartermaster of Q Branch.\"",
  "source_urls": [
   "https://en.wikipedia.org/wiki/Carte_Blanche_(novel)"
  ],
  "notes": ""
 }
];
export const STUDIOS: Studio[] = [
 {
  "id": "eon-productions",
  "label": "Eon Productions",
  "short_label": null,
  "kind": "studio",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "cbs",
  "label": "CBS",
  "short_label": null,
  "kind": "studio",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "famous-artists-productions",
  "label": "Famous Artists Productions",
  "short_label": null,
  "kind": "studio",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "taliafilm",
  "label": "Taliafilm",
  "short_label": null,
  "kind": "studio",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "jonathan-cape",
  "label": "Jonathan Cape",
  "short_label": null,
  "kind": "publisher",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "orion-publishing",
  "label": "Orion Publishing",
  "short_label": null,
  "kind": "publisher",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "penguin",
  "label": "Penguin Books",
  "short_label": null,
  "kind": "publisher",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 },
 {
  "id": "hodder-and-stoughton",
  "label": "Hodder & Stoughton",
  "short_label": null,
  "kind": "publisher",
  "parent": null,
  "group": null,
  "active": null,
  "note": ""
 }
];
export const PLATFORMS: Platform[] = [];
export const TAGS: Tag[] = [{ id: 'james-bond', label: 'James Bond', kind: 'character', aliases: ['007'] }, { id: 'm', label: 'M', kind: 'character', aliases: [] }, { id: 'q', label: 'Q', kind: 'character', aliases: [] }, { id: 'spectre', label: 'SPECTRE', kind: 'team', aliases: [] }];
