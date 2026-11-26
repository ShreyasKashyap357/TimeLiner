// Usage: tsx scripts/build/apply-credits.ts [universe…]
// Writes cast & crew from the Wikidata cache (scripts/fetch/credits.ts) into data/<universe>/titles.json (D-29).
// Re-runnable: replaces each title's credits. Limits keep the data small: the first 10 cast members in
// Wikidata's statement order (usually billing order), and up to 8 people per crew role.
// Titles whose Wikipedia article is shared with other titles get no credits (the article is a list page).
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { TitlesFile, type Credit } from '../../src/domain/schema.ts';
import type { Role, TitleCredits } from '../fetch/credits.ts';

const CAST_LIMIT = 10;
const CREW_LIMIT = 8;
const ORDER: Role[] = ['author', 'creator', 'director', 'writer', 'producer', 'executive-producer', 'composer', 'cast'];

const dirs = (await readdir('data', { withFileTypes: true })).filter((d) => d.isDirectory() && !['sources', 'candidates', 'registry'].includes(d.name)).map((d) => d.name);
for (const u of process.argv.slice(2).length ? process.argv.slice(2) : dirs) {
  let cache: { credits: TitleCredits[]; labels: Record<string, string> };
  try { cache = JSON.parse(await readFile(`data/sources/wikidata/credits-${u}.json`, 'utf8')); } catch { console.log(`${u}: no credits cache, skipped`); continue; }
  const byWiki = new Map(cache.credits.map((c) => [c.enwiki, c]));
  const file = `data/${u}/titles.json`;
  const titles = TitlesFile.parse(JSON.parse(await readFile(file, 'utf8')));
  let withCredits = 0;
  for (const t of titles) {
    const c = t.external_ids.enwiki ? byWiki.get(t.external_ids.enwiki) : undefined;
    const out: Credit[] = [];
    for (const role of ORDER) {
      const seen = new Set<string>();
      for (const p of c?.roles[role] ?? []) {
        const name = cache.labels[p.qid];
        if (!name || seen.has(p.qid) || /^Q\d+$/.test(name)) continue; // no English name: leave out rather than show an id
        seen.add(p.qid);
        const character = role === 'cast' ? (p.character_qids.map((q) => cache.labels[q]).filter(Boolean).join(' / ') || p.character_text || null) : null;
        out.push({ role, name, qid: p.qid, character });
        if (seen.size >= (role === 'cast' ? CAST_LIMIT : CREW_LIMIT)) break;
      }
    }
    if (c?.qid && !t.external_ids.wikidata) t.external_ids.wikidata = c.qid;
    t.credits = out;
    if (out.length) withCredits++;
  }
  await writeFile(file, JSON.stringify(titles, null, 2) + '\n');
  console.log(`${u}: credits on ${withCredits}/${titles.length} titles`);
}
