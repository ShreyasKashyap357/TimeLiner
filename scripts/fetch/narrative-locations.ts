// Usage: tsx scripts/fetch/narrative-locations.ts <universe> [universe…]
// Real-world story locations from Wikidata (CC0): for every title with external_ids.wikidata, its
// "narrative location" (P840) statements, with each location's label and "coordinate location" (P625).
// Caches the raw rows to data/sources/wikidata/locations-<universe>.json; scripts/build/apply-locations.ts
// turns the cache into an 'osm' map in data/<universe>/maps.json.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ENDPOINT = 'https://query.wikidata.org/sparql';
// Generic client name: no personal or project contact details are sent.
const UA = 'TimeLinerLocations/1.0 (static timeline site; generic client)';
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface LocationRow { title_qid: string; location_qid: string; label: string; lat: number | null; lng: number | null }
export interface LocationsCache { universe: string; fetched: string; query_property: 'P840'; rows: LocationRow[] }

/** Parse a WKT "Point(lng lat)" literal (Wikidata P625). Returns null for anything else (e.g. other globes). */
export function parsePoint(wkt: string | undefined): { lat: number; lng: number } | null {
  if (!wkt) return null;
  if (wkt.startsWith('<')) return null; // non-Earth globe prefix, e.g. <http://www.wikidata.org/entity/Q405> Point(..)
  const m = /^Point\(\s*(-?[\d.]+(?:e-?\d+)?)\s+(-?[\d.]+(?:e-?\d+)?)\s*\)$/i.exec(wkt.trim());
  if (!m) return null;
  return { lng: Number(m[1]), lat: Number(m[2]) };
}

async function sparql(query: string): Promise<any[]> { // eslint-disable-line @typescript-eslint/no-explicit-any
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'User-Agent': UA, Accept: 'application/sparql-results+json', 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ query }).toString(),
    });
    if (res.ok) return ((await res.json()) as { results: { bindings: any[] } }).results.bindings; // eslint-disable-line @typescript-eslint/no-explicit-any
    if (attempt >= 3 || (res.status < 500 && res.status !== 429)) throw new Error(`SPARQL -> ${res.status} ${res.statusText}`);
    await sleep(2000 * 2 ** attempt);
  }
}

const qidOf = (uri: string) => uri.slice(uri.lastIndexOf('/') + 1);

export async function fetchLocations(qids: string[]): Promise<LocationRow[]> {
  const rows: LocationRow[] = [];
  for (let i = 0; i < qids.length; i += 40) {
    const chunk = qids.slice(i, i + 40);
    const q = `SELECT ?item ?loc ?locLabel (SAMPLE(?coord) AS ?c) WHERE {
  VALUES ?item { ${chunk.map((x) => `wd:${x}`).join(' ')} }
  ?item p:P840 ?st . ?st ps:P840 ?loc . FILTER NOT EXISTS { ?st wikibase:rank wikibase:DeprecatedRank }
  OPTIONAL { ?loc wdt:P625 ?coord . }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en,mul". }
} GROUP BY ?item ?loc ?locLabel`;
    for (const b of await sparql(q)) {
      const p = parsePoint(b.c?.value);
      rows.push({ title_qid: qidOf(b.item.value), location_qid: qidOf(b.loc.value), label: b.locLabel?.value ?? qidOf(b.loc.value), lat: p?.lat ?? null, lng: p?.lng ?? null });
    }
    await sleep(1500);
  }
  return rows.sort((a, b) => a.title_qid.localeCompare(b.title_qid) || a.location_qid.localeCompare(b.location_qid));
}

async function main() {
  const ids = process.argv.slice(2);
  if (!ids.length) { console.error('usage: tsx scripts/fetch/narrative-locations.ts <universe> […]'); process.exit(2); }
  const universes = JSON.parse(await readFile('data/universes.json', 'utf8')) as { id: string; data_dir: string }[];
  await mkdir('data/sources/wikidata', { recursive: true });
  for (const id of ids) {
    const u = universes.find((x) => x.id === id);
    if (!u) { console.error(`unknown universe ${id}`); continue; }
    const titles = JSON.parse(await readFile(path.join('data', u.data_dir, 'titles.json'), 'utf8')) as { external_ids: { wikidata?: string | null } }[];
    const qids = [...new Set(titles.map((t) => t.external_ids.wikidata).filter((q): q is string => !!q))];
    const rows = await fetchLocations(qids);
    const cache: LocationsCache = { universe: id, fetched: new Date().toISOString().slice(0, 10), query_property: 'P840', rows };
    await writeFile(`data/sources/wikidata/locations-${id}.json`, JSON.stringify(cache, null, 2) + '\n');
    console.log(`${id}: ${qids.length} titles, ${rows.length} location statements, ${rows.filter((r) => r.lat !== null).length} with coordinates`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]).endsWith('narrative-locations.ts')) await main();
