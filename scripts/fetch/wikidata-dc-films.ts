// Wikidata facts for DC titles whose release dates are not in a Wikipedia overview table.
import { cacheWikidata } from './wikidata.ts';
const TITLES = [
  'Batman (1989 film)', 'Batman Returns', 'Batman Forever', 'Batman & Robin (film)',
  'Batman Begins', 'The Dark Knight', 'The Dark Knight Rises',
  'The Batman (film)', 'The Batman: Part II', 'The Penguin (TV series)', 'Joker (2019 film)', 'Joker: Folie à Deux',
  'Superman (1978 film)', 'Superman II', 'Superman III', 'Supergirl (1984 film)', 'Superman IV: The Quest for Peace', 'Superman Returns',
  'Batman: Mask of the Phantasm', 'Batman & Mr. Freeze: SubZero', 'Batman Beyond: Return of the Joker', 'Batman: Mystery of the Batwoman',
  'Man of Steel (film)', 'Batman v Superman: Dawn of Justice', 'Suicide Squad (2016 film)', 'Wonder Woman (2017 film)', 'Justice League (film)', 'Aquaman (film)',
  'Shazam! (film)', 'Birds of Prey (2020 film)', 'Wonder Woman 1984', "Zack Snyder's Justice League", 'The Suicide Squad (film)', 'Black Adam (film)',
  'Shazam! Fury of the Gods', 'The Flash (film)', 'Blue Beetle (film)', 'Aquaman and the Lost Kingdom',
  'Superman (2025 film)', 'Supergirl (2026 film)', 'Clayface (film)', 'Man of Tomorrow (film)',
];
const facts = await cacheWikidata('dc', TITLES);
console.log(`dc wikidata: ${facts.length}, missing QID: ${facts.filter((f) => !f.qid).map((f) => f.enwiki).join('; ')}`);
for (const f of facts) console.log(f.enwiki, '|', f.qid, '|', f.duration_min, '|', f.publication_dates.filter((d) => d.place.includes('Q30')).map((d) => d.date).sort()[0] ?? f.publication_dates.map((d) => d.date).sort()[0]);
