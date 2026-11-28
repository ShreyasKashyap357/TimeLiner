// Usage: tsx scripts/build/galaxy-map.ts <universe>
// Applies data/sources/maps/<universe>.galaxy.json to data/<universe>/maps.json: one 'galaxy' map (drawn by the
// app from data, no image) whose places sit in the grid square and/or region the source gives:
//   { map: { id, title, group, description, continuity, galaxy, credit },
//     places: [{ id, name, grid?, region?, where: { source_url, quote }, links: [{ title_id, source_url, source_title, quote }] }],
//     not_placed: [...] }   (worlds left out, recorded for DATA_NOTES; not used here)
// The map with that id is replaced on each run (idempotent); other maps in the file are kept.
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { MapsFile, WorldMap, type MapPlace } from '../../src/domain/schema.ts';

type Link = { title_id: string; source_url: string; source_title: string; quote: string };
type Source = {
  map: Omit<WorldMap, 'kind' | 'universe' | 'places'>;
  places: { id: string; name: string; grid?: string; region?: string; where: { source_url: string; quote: string }; links: Link[] }[];
};

const id = process.argv[2];
if (!id) throw new Error('usage: galaxy-map.ts <universe>');
const universes = JSON.parse(await readFile('data/universes.json', 'utf8')) as { id: string; data_dir: string }[];
const u = universes.find((x) => x.id === id);
if (!u) throw new Error(`unknown universe ${id}`);
const src = JSON.parse(await readFile(`data/sources/maps/${id}.galaxy.json`, 'utf8')) as Source;
const file = path.join('data', u.data_dir, 'maps.json');
const maps = existsSync(file) ? MapsFile.parse(JSON.parse(await readFile(file, 'utf8'))) : [];
const titleList = JSON.parse(await readFile(path.join('data', u.data_dir, 'titles.json'), 'utf8')) as { id: string; continuity: string }[];
const order = new Map(titleList.map((t, i) => [t.id, i]));

const places: MapPlace[] = src.places.map((p) => {
  for (const l of p.links) {
    const t = titleList.find((x) => x.id === l.title_id);
    if (!t) throw new Error(`${p.id}: unknown title ${l.title_id}`);
    if (src.map.continuity && t.continuity !== src.map.continuity) throw new Error(`${p.id}: ${l.title_id} is outside ${src.map.continuity}`);
  }
  return {
    id: p.id, name: p.name, grid: p.grid, region: p.region,
    title_ids: [...new Set(p.links.map((l) => l.title_id))].sort((a, b) => order.get(a)! - order.get(b)!),
    note: [`${p.where.quote} (source linked below).`, ...p.links.map((l) => `${l.source_title}: ${l.quote}.`)].join(' '),
    source_url: p.where.source_url,
    confidence: 'stated',
  };
});
const map = WorldMap.parse({ ...src.map, universe: id, kind: 'galaxy', places });
const out = [...maps.filter((m) => m.id !== map.id), map];
await writeFile(file, JSON.stringify(MapsFile.parse(out), null, 2) + '\n');
console.log(`${file}: ${map.id} with ${places.length} places`);
