// Usage: tsx scripts/build/apply-locations.ts <universe> [universe…]
// Turns data/sources/wikidata/locations-<universe>.json (scripts/fetch/narrative-locations.ts) into an 'osm' map
// with one place per real-world narrative location, written into data/<universe>/maps.json. Other maps in the
// file are kept; the generated map (id STORY_MAP_ID) is replaced. Idempotent.
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { MapPlace, WorldMap } from '../../src/domain/schema.ts';
import type { LocationsCache } from '../fetch/narrative-locations.ts';

export const STORY_MAP_ID = 'story-locations';

const slugify = (s: string) => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/** Pure transform: cached Wikidata rows + the universe's titles → the 'osm' map (null when no place has coordinates). */
export function locationsToMap(cache: LocationsCache, titles: { id: string; external_ids: { wikidata?: string | null } }[]): WorldMap | null {
  const byQid = new Map<string, string[]>();
  for (const t of titles) if (t.external_ids.wikidata) byQid.set(t.external_ids.wikidata, [...(byQid.get(t.external_ids.wikidata) ?? []), t.id]);
  const places = new Map<string, MapPlace>();
  for (const r of cache.rows) {
    if (r.lat === null || r.lng === null) continue; // fictional or uncoordinated places are not drawn on a real-world map
    if (/^Q\d+$/.test(r.label)) continue; // no English label: never show a raw id
    const titleIds = byQid.get(r.title_qid) ?? [];
    if (!titleIds.length) continue;
    const p = places.get(r.location_qid) ?? {
      id: `${slugify(r.label) || 'place'}-${r.location_qid.toLowerCase()}`,
      name: r.label, lat: r.lat, lng: r.lng, title_ids: [],
      note: 'Wikidata lists this as a narrative location (where the story is set) of the linked titles; the point is the location item\'s coordinates, so a country or region is shown at its centre.',
      source_url: `https://www.wikidata.org/wiki/${r.location_qid}`, confidence: 'stated' as const,
    };
    for (const id of titleIds) if (!p.title_ids.includes(id)) p.title_ids.push(id);
    places.set(r.location_qid, p);
  }
  if (!places.size) return null;
  const titleOrder = new Map(titles.map((t, i) => [t.id, i]));
  for (const p of places.values()) p.title_ids.sort((a, b) => titleOrder.get(a)! - titleOrder.get(b)!);
  return {
    id: STORY_MAP_ID, universe: cache.universe, title: 'Real-world story locations', group: '', description: '', kind: 'osm', continuity: null,
    credit: {
      title: 'Wikidata: narrative location (P840) and coordinate location (P625)',
      author: 'Wikidata contributors',
      licence: 'CC0 1.0',
      licence_url: 'https://creativecommons.org/publicdomain/zero/1.0/',
      source_url: 'https://www.wikidata.org/wiki/Property:P840',
      modified: false, fan_made: false, removal_on_request: false,
      note: `Fetched from Wikidata on ${cache.fetched}. Only places with coordinates are shown; fictional places are left out. Map tiles © OpenStreetMap contributors.`,
    },
    places: [...places.values()].sort((a, b) => a.name.localeCompare(b.name)),
  };
}

async function main() {
  const universes = JSON.parse(await readFile('data/universes.json', 'utf8')) as { id: string; data_dir: string }[];
  for (const id of process.argv.slice(2)) {
    const u = universes.find((x) => x.id === id);
    const src = `data/sources/wikidata/locations-${id}.json`;
    if (!u || !existsSync(src)) { console.error(`${id}: no universe or no cache (${src})`); continue; }
    const cache = JSON.parse(await readFile(src, 'utf8')) as LocationsCache;
    const titles = JSON.parse(await readFile(path.join('data', u.data_dir, 'titles.json'), 'utf8'));
    const file = path.join('data', u.data_dir, 'maps.json');
    const existing: WorldMap[] = existsSync(file) ? JSON.parse(await readFile(file, 'utf8')) : [];
    const map = locationsToMap(cache, titles);
    const next = existing.filter((m) => m.id !== STORY_MAP_ID);
    if (map) next.push(map);
    if (!next.length) { console.log(`${id}: no located places; maps.json not written`); continue; }
    await writeFile(file, JSON.stringify(next, null, 2) + '\n');
    console.log(`${id}: ${map?.places.length ?? 0} places`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]).endsWith('apply-locations.ts')) await main();
