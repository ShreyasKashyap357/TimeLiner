// Migration (R-56): film runtime, budget and box office, each cited, from data/sources/film-stats.json
// (built by scripts/fetch/film-stats.ts from Wikidata and English Wikipedia infoboxes).
//  - runtime_min: filled when empty. An existing value is never overwritten: it is cited when a source states the same
//    figure, otherwise the disagreement is logged and the value stays uncited.
//  - film_stats: { runtime_source, budget, box_office } replaced from the cache on every run. Idempotent.
// Usage: tsx scripts/migrations/2026-11-27-film-stats.ts
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { TitlesFile } from '../../src/domain/schema.ts';
import type { FilmStatsEntry } from '../fetch/film-stats.ts';

const cache = JSON.parse(await readFile('data/sources/film-stats.json', 'utf8')) as { entries: Record<string, FilmStatsEntry> };
const dirs = (await readdir('data', { withFileTypes: true })).filter((d) => d.isDirectory() && !['sources', 'candidates', 'registry'].includes(d.name)).map((d) => d.name);
const conflicts: string[] = [];
let filled = 0, cited = 0, budgets = 0, grosses = 0;

for (const dir of dirs) {
  const file = `data/${dir}/titles.json`;
  const titles = TitlesFile.parse(JSON.parse(await readFile(file, 'utf8')));
  let changed = false;
  for (const t of titles) for (const u of t.units) {
    const e = cache.entries[u.id];
    if (!e) continue;
    let runtime_source: string | null = null;
    if (u.runtime_min === null && e.runtime_min !== null) { u.runtime_min = e.runtime_min; runtime_source = e.runtime_source; filled++; changed = true; }
    else if (u.runtime_min !== null) {
      runtime_source = (e.runtime_min === u.runtime_min ? e.runtime_source : null) ?? e.runtime_alternatives.find((a) => a.min === u.runtime_min)?.source_url ?? null;
      if (!runtime_source && e.runtime_min !== null) conflicts.push(`${u.id}: data has ${u.runtime_min} min; sources say ${[...new Set(e.runtime_alternatives.map((a) => a.min))].join(' / ')} min (kept ${u.runtime_min}, uncited)`);
    }
    if (runtime_source && u.runtime_min !== null) cited++;
    const stats = { runtime_source: u.runtime_min !== null ? runtime_source : null, budget: e.budget, box_office: e.box_office };
    const next = stats.runtime_source || stats.budget || stats.box_office ? stats : null;
    if (JSON.stringify(next) !== JSON.stringify(u.film_stats ?? null)) { u.film_stats = next; changed = true; }
    if (e.budget) budgets++;
    if (e.box_office) grosses++;
  }
  if (changed) await writeFile(file, JSON.stringify(TitlesFile.parse(titles), null, 2) + '\n');
}
console.log(`runtime filled ${filled}, runtime cited ${cited}, budget ${budgets}, box office ${grosses}`);
if (conflicts.length) console.log(`Runtime conflicts (${conflicts.length}):\n  ${conflicts.join('\n  ')}`);
