// Import a universe's map images from a manifest (data/sources/maps/<universe>.json) into the Atlas:
// downloads each image once (cache: .cache/maps/, not committed), drops byte-identical duplicates, converts small
// images to one WebP and cuts large ones into zoom tiles, then writes the entries into data/<universe>/maps.json
// (places already on a map are kept; maps not in the manifest, e.g. story-location maps, are kept after them).
// Download hashes and sizes go to data/sources/maps/<universe>.lock.json. Idempotent; --force re-encodes.
// Usage: tsx scripts/build/import-maps.ts <universe> [--force]
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
import { MapsFile, type WorldMap } from '../../src/domain/schema.ts';

interface Entry {
  id: string; title: string; group?: string; description?: string; url: string; source_url: string; source_title?: string;
  continuity?: string | null; author?: string; licence?: string; licence_url?: string; note?: string; fan_made?: boolean; removal_on_request?: boolean;
}
interface Manifest { universe: string; defaults: Omit<Entry, 'id' | 'title' | 'url' | 'source_url'>; maps: Entry[] }

const TILE_FROM = 4_000_000; // pixels; larger images are tiled
const [universe] = process.argv.slice(2);
const force = process.argv.includes('--force');
if (!universe) throw new Error('usage: import-maps.ts <universe> [--force]');
const man = JSON.parse(readFileSync(`data/sources/maps/${universe}.json`, 'utf8')) as Manifest;
const lockFile = `data/sources/maps/${universe}.lock.json`;
const lock: Record<string, { url: string; sha1: string; bytes: number; width: number; height: number; fetched: string }> =
  existsSync(lockFile) ? JSON.parse(readFileSync(lockFile, 'utf8')) : {};
const cache = `.cache/maps/${universe}`;
mkdirSync(cache, { recursive: true });
mkdirSync(`public/maps/${universe}`, { recursive: true });

const mapsFile = `data/${universe}/maps.json`;
const existing: WorldMap[] = existsSync(mapsFile) ? JSON.parse(readFileSync(mapsFile, 'utf8')) : [];
const byHash = new Map<string, string>();
const out: WorldMap[] = [];
for (const e of man.maps) {
  const d = { ...man.defaults, ...e };
  const file = `${cache}/${e.id}${e.url.match(/\.(png|jpe?g|webp)$/i)?.[0] ?? ''}`;
  if (!existsSync(file)) {
    const res = await fetch(e.url, { headers: { 'user-agent': 'TimeLiner-map-import/1.0' } });
    if (!res.ok) throw new Error(`${e.id}: HTTP ${res.status} for ${e.url}`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  }
  const buf = readFileSync(file);
  const sha1 = createHash('sha1').update(buf).digest('hex');
  if (byHash.has(sha1)) { console.warn(`skip ${e.id}: same image as ${byHash.get(sha1)}`); continue; }
  byHash.set(sha1, e.id);
  const meta = await sharp(buf, { limitInputPixels: false }).metadata();
  const width = meta.width!, height = meta.height!;
  const tiled = width * height > TILE_FROM;
  const fresh = lock[e.id]?.sha1 === sha1 && !force;
  let image: NonNullable<WorldMap['image']>;
  if (tiled) {
    const dir = `public/maps/${universe}/${e.id}`;
    const maxZoom = Math.ceil(Math.log2(Math.max(width, height) / 256));
    if (!fresh || !existsSync(`${dir}/preview.webp`)) {
      if (existsSync(dir)) rmSync(dir, { recursive: true });
      await sharp(buf, { limitInputPixels: false }).ensureAlpha().webp({ quality: 78 }).tile({ size: 256, layout: 'google', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toFile(dir);
      for (const f of ['vips-properties.xml', 'blank.png']) if (existsSync(`${dir}/${f}`)) rmSync(`${dir}/${f}`);
      await sharp(buf, { limitInputPixels: false }).resize({ width: 1200, height: 1200, fit: 'inside' }).webp({ quality: 75 }).toFile(`${dir}/preview.webp`);
    }
    image = { path: `maps/${universe}/${e.id}/preview.webp`, width, height, tiles: { max_zoom: maxZoom } };
  } else {
    const path = `maps/${universe}/${e.id}.webp`;
    if (!fresh || !existsSync(`public/${path}`)) await sharp(buf).webp({ quality: 85 }).toFile(`public/${path}`);
    image = { path, width, height };
  }
  lock[e.id] = { url: e.url, sha1, bytes: buf.length, width, height, fetched: lock[e.id]?.sha1 === sha1 ? lock[e.id]!.fetched : new Date().toISOString().slice(0, 10) };
  const prev = existing.find((m) => m.id === e.id);
  out.push({
    id: e.id, universe, title: e.title, group: d.group ?? '', description: d.description ?? '', kind: 'image', continuity: d.continuity ?? null, image,
    credit: {
      title: d.source_title ?? e.title, author: d.author!, licence: d.licence!, licence_url: d.licence_url!, source_url: e.source_url,
      modified: false, fan_made: d.fan_made ?? true, removal_on_request: d.removal_on_request ?? false, note: d.note ?? '',
    },
    places: prev?.places ?? [],
  });
  console.log(`${e.id}: ${width}x${height}${tiled ? ' (tiled)' : ''}`);
}
const ids = new Set(out.map((m) => m.id));
const merged = MapsFile.parse([...out, ...existing.filter((m) => !ids.has(m.id) && !man.maps.some((e) => e.id === m.id))]);
writeFileSync(mapsFile, JSON.stringify(merged, null, 2) + '\n');
writeFileSync(lockFile, JSON.stringify(lock, null, 2) + '\n');
console.log(`${universe}: ${out.length} map(s) imported, ${merged.length} in maps.json`);
