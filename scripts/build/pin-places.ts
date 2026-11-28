// Usage: tsx scripts/build/pin-places.ts <universe>
// Applies data/sources/maps/<universe>.places.json to the image maps in data/<universe>/maps.json:
//   { maps: { <map id>: { <place id>: [x, y] } },            pixel position in the full-size source image
//     places: [{ id, name, links: [{ title_id, source_url, source_title, quote }] }] }
// Every position was read from the label or symbol the map maker drew, so places are 'inferred' and their note
// says so; title links quote the source that sets a scene there. Places from this file are replaced on each
// run (idempotent); other places on a map are kept.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { MapsFile, type MapPlace } from '../../src/domain/schema.ts';

type Link = { title_id: string; source_url: string; source_title: string; quote: string };
type PlacesSource = { maps: Record<string, Record<string, [number, number]>>; places: { id: string; name: string; links: Link[] }[] };

const id = process.argv[2];
if (!id) throw new Error('usage: pin-places.ts <universe>');
const universes = JSON.parse(await readFile('data/universes.json', 'utf8')) as { id: string; data_dir: string }[];
const u = universes.find((x) => x.id === id);
if (!u) throw new Error(`unknown universe ${id}`);
const src = JSON.parse(await readFile(`data/sources/maps/${id}.places.json`, 'utf8')) as PlacesSource;
const file = path.join('data', u.data_dir, 'maps.json');
const maps = MapsFile.parse(JSON.parse(await readFile(file, 'utf8')));
const titleOrder = new Map((JSON.parse(await readFile(path.join('data', u.data_dir, 'titles.json'), 'utf8')) as { id: string }[]).map((t, i) => [t.id, i]));
const titles = new Set(titleOrder.keys());
const byId = new Map(src.places.map((p) => [p.id, p]));
const ours = new Set(byId.keys());

for (const [mapId, positions] of Object.entries(src.maps)) {
  const m = maps.find((x) => x.id === mapId);
  if (!m?.image) throw new Error(`${mapId}: no such image map`);
  const placed: MapPlace[] = [];
  for (const [pid, [x, y]] of Object.entries(positions)) {
    const p = byId.get(pid);
    if (!p) throw new Error(`${mapId}: unknown place ${pid}`);
    if (x < 0 || y < 0 || x > m.image.width || y > m.image.height) throw new Error(`${mapId}/${pid}: off the image`);
    for (const l of p.links) if (!titles.has(l.title_id)) throw new Error(`${pid}: unknown title ${l.title_id}`);
    const quotes = p.links.map((l) => `${l.source_title}: "${l.quote}"`);
    placed.push({
      id: pid, name: p.name, x, y,
      title_ids: [...new Set(p.links.map((l) => l.title_id))].sort((a, b) => titleOrder.get(a)! - titleOrder.get(b)!),
      note: [`Position read from the map image (the label or symbol drawn on "${m.title}").`, ...quotes].join(' '),
      source_url: p.links[0]?.source_url ?? m.credit.source_url,
      confidence: 'inferred',
    });
  }
  m.places = [...m.places.filter((p) => !ours.has(p.id)), ...placed].sort((a, b) => a.name.localeCompare(b.name));
  console.log(`${mapId}: ${placed.length} places (${placed.filter((p) => p.title_ids.length).length} linked to titles)`);
}
await writeFile(file, JSON.stringify(maps, null, 2) + '\n');
