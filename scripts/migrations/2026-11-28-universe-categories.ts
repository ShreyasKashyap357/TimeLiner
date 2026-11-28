// Universe categories for the searchable Universe picker (90+ universes). Categories are data; the picker groups by
// them in the order of each category's first universe. Judgement calls are in data/DATA_NOTES.md. Idempotent.
import { readFileSync, writeFileSync } from 'node:fs';

const CATEGORIES: Record<string, string[]> = {
  'Superheroes': ['marvel', 'dc', 'the-boys', 'spider-verse', 'invincible', 'hellboy'],
  'Science fiction': ['godzilla-kong', 'star-wars', 'star-trek', 'terminator', 'doctor-who', 'stargate', 'battlestar-galactica', 'the-expanse', 'dune', 'foundation', 'hunger-games', 'matrix', 'mad-max', 'alien-predator', 'jurassic-park', 'planet-of-the-apes', 'avatar-cameron', 'ghostbusters'],
  'Fantasy': ['asoiaf', 'wheel-of-time', 'riordan', 'middle-earth', 'wizarding-world', 'the-witcher', 'narnia', 'shadowhunters', 'outlander', 'the-dark-tower', 'discworld', 'cosmere'],
  'Action, spy & adventure': ['james-bond', 'fast-furious', 'sherlock-holmes', 'jack-ryan', 'bourne', 'mission-impossible', 'indiana-jones', 'rocky', 'john-wick'],
  'Horror': ['halloween', 'the-walking-dead', 'conjuring', 'scream', 'saw', 'evil-dead', 'friday-the-13th', 'texas-chain-saw', 'universal-monsters'],
  'Video games': ['grand-theft-auto', 'fallout', 'the-last-of-us', 'halo', 'assassins-creed'],
  'TV drama & procedurals': ['law-and-order', 'ncis', 'csi', 'one-chicago', 'yellowstone', 'breaking-bad', 'twin-peaks'],
  'Anime & tokusatsu': ['gundam', 'ultraman', 'kamen-rider', 'super-sentai', 'naruto', 'one-piece', 'pokemon', 'dragon-ball'],
  'Animation & toys': ['lego', 'transformers', 'tmnt', 'avatar-tla'],
  'Indian cinema': ['golmaal', 'housefull', 'bhool-bhulaiyaa', 'drishyam', 'baahubali', 'kgf-salaar', 'krrish', 'dhoom', 'yrf-spy-universe', 'lcu', 'cop-universe', 'maddock-horror-comedy'],
};
const of = new Map(Object.entries(CATEGORIES).flatMap(([c, ids]) => ids.map((id) => [id, c] as const)));
const f = 'data/universes.json';
const unis = JSON.parse(readFileSync(f, 'utf8'));
const missing = unis.filter((u: any) => !of.has(u.id)).map((u: any) => u.id);
if (missing.length) throw new Error(`no category for: ${missing.join(', ')}`);
let changed = 0;
const out = unis.map((u: any) => {
  if (u.category === of.get(u.id)) return u;
  changed++;
  const { description, last_verified, ...rest } = u;
  delete rest.category;
  return { ...rest, category: of.get(u.id), description, last_verified };
});
writeFileSync(f, JSON.stringify(out, null, 2) + '\n');
console.log(`universe categories: ${changed} change(s)`);
