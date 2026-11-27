// Migration (2026-11-27), user decision R-56: record viewers per episode and per season for TV series.
// Copies data/sources/tv-viewership.json (built by scripts/fetch/tv-viewership.ts from English Wikipedia
// episode tables and series overviews) into unit.viewership, and adds the pages it cites to unit.source_urls
// so the drawer can number them. Units missing from the cache are left as they are. Idempotent.
import { readFile, writeFile } from 'node:fs/promises';
import { TitlesFile, UniversesFile, Unit } from '../../src/domain/schema.ts';
import type { CachedViewership } from '../fetch/tv-viewership.ts';

const cache = JSON.parse(await readFile('data/sources/tv-viewership.json', 'utf8')) as { units: Record<string, CachedViewership> };
const universes = UniversesFile.parse(JSON.parse(await readFile('data/universes.json', 'utf8')));
const seen = new Set<string>();
for (const uni of universes) {
  const file = `data/${uni.data_dir}/titles.json`;
  const titles = TitlesFile.parse(JSON.parse(await readFile(file, 'utf8')));
  let n = 0;
  for (const t of titles) for (const u of t.units) {
    const c = cache.units[u.id];
    if (!c) continue;
    seen.add(u.id);
    const v = Unit.shape.viewership.parse(c.viewership);
    if (JSON.stringify(u.viewership) !== JSON.stringify(v)) { u.viewership = v; n++; }
    for (const url of [v!.source_url, v!.average_source_url]) if (url && !u.source_urls.includes(url)) u.source_urls.push(url);
  }
  await writeFile(file, JSON.stringify(titles, null, 2) + '\n');
  if (n) console.log(`${uni.id}: ${n} unit(s) with viewership`);
}
const orphans = Object.keys(cache.units).filter((id) => !seen.has(id));
if (orphans.length) console.warn(`Cache entries with no matching unit: ${orphans.join(', ')}`);
