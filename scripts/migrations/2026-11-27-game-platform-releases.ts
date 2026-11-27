// Migration (2026-11-27), user decision R-52: per-platform first release dates for games.
// Source: data/sources/game-releases.json (scripts/fetch/game-releases.ts), parsed from the English Wikipedia
// infobox `| released =` field at the revision recorded per game. Writes `platform_releases` on the FIRST unit of
// each video-game / expansion title (multi-unit titles: first unit only), and adds the revision permalink to the
// unit's source_urls so the drawer can cite it. Never changes release.date: when the cache
// shows a date earlier than the recorded one it is only logged (see DATA_NOTES "Per-platform release dates").
// Edits the raw JSON (only the game units change); the result is validated with the schema before writing. Idempotent.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { PlatformsFile, TitlesFile } from '../../src/domain/schema.ts';
import type { GameReleaseCache } from '../fetch/game-releases.ts';
import { endKey } from '../fetch/game-releases-parse.ts';

/* eslint-disable @typescript-eslint/no-explicit-any */
const cache: GameReleaseCache = JSON.parse(await readFile('data/sources/game-releases.json', 'utf8'));
const platforms = new Set(PlatformsFile.parse(JSON.parse(await readFile('data/registry/platforms.json', 'utf8'))).map((p) => p.id));

/** Insert `platform_releases` right after `platform_or_network` so the key order matches the schema. */
function withField(unit: any, value: unknown): any {
  if ('platform_releases' in unit) return { ...unit, platform_releases: value };
  const out: any = {};
  for (const [k, v] of Object.entries(unit)) {
    out[k] = v;
    if (k === 'platform_or_network') out.platform_releases = value;
  }
  if (!('platform_releases' in out)) out.platform_releases = value;
  return out;
}

let changed = 0, games = 0, entries = 0;
const earlier: string[] = [];
for (const d of await readdir('data', { withFileTypes: true })) {
  if (!d.isDirectory()) continue;
  const file = path.join('data', d.name, 'titles.json');
  let raw: any[];
  try { raw = JSON.parse(await readFile(file, 'utf8')); } catch { continue; }
  let fileChanged = false;
  for (const t of raw) {
    if (t.type !== 'video-game' && t.type !== 'expansion') continue;
    const e = cache[t.id];
    if (!e || !e.releases.length) continue;
    const value = e.releases.map((r) => ({ platform: r.platform, date: r.date, region: r.region, source_url: r.source_url }));
    for (const r of value) if (!platforms.has(r.platform)) throw new Error(`${t.id}: platform "${r.platform}" not in data/registry/platforms.json`);
    games++; entries += value.length;
    const unit = t.units[0];
    const first = value.reduce((a, b) => (endKey(b.date) < endKey(a.date) ? b : a));
    if (unit.release?.date && endKey(first.date) < endKey(unit.release.date)) {
      earlier.push(`${t.id}: recorded ${unit.release.date}, ${first.platform} ${first.date}${first.region ? ` (${first.region})` : ''}`);
    }
    // The drawer cites each date from the unit's numbered source list, so the revision must be listed there.
    const urls = [...new Set(value.map((r) => r.source_url))].filter((u) => !(unit.source_urls ?? []).includes(u));
    if (JSON.stringify(unit.platform_releases ?? null) === JSON.stringify(value) && !urls.length) continue;
    t.units[0] = withField({ ...unit, source_urls: [...(unit.source_urls ?? []), ...urls] }, value);
    fileChanged = true; changed++;
  }
  if (!fileChanged) continue;
  TitlesFile.parse(raw); // validate before writing
  await writeFile(file, JSON.stringify(raw, null, 2) + '\n');
}
console.log(`${games} game(s) with per-platform dates (${entries} entries); ${changed} unit(s) updated`);
if (earlier.length) {
  console.log(`${earlier.length} game(s) where a platform date is earlier than release.date (release.date NOT changed):`);
  for (const l of earlier) console.log('  ' + l);
}
