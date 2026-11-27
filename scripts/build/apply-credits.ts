// Usage: tsx scripts/build/apply-credits.ts [universe…]
// Writes cast & crew from the Wikidata cache (scripts/fetch/credits.ts) into data/<universe>/titles.json (D-29).
// Re-runnable: replaces each title's credits. Every cast member is kept, in Wikidata's statement order
// (usually billing order). Cameos: Wikidata has no cameo marker, so a cast credit is flagged as a cameo when
// the title's Wikipedia article links that person, or that character, in a sentence about a cameo
// (scripts/fetch/cameos.ts). Crew: up to 8 per role.
// Titles whose Wikipedia article is shared with other titles get no credits (the article is a list page).
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { TitlesFile, type Credit } from '../../src/domain/schema.ts';
import type { Role, TitleCredits } from '../fetch/credits.ts';

const CREW_LIMIT = 8;
const ORDER: Role[] = ['author', 'creator', 'director', 'writer', 'producer', 'executive-producer', 'composer', 'cast'];

const dirs = (await readdir('data', { withFileTypes: true })).filter((d) => d.isDirectory() && !['sources', 'candidates', 'registry'].includes(d.name)).map((d) => d.name);
for (const u of process.argv.slice(2).length ? process.argv.slice(2) : dirs) {
  let cache: { credits: TitleCredits[]; labels: Record<string, string> };
  try { cache = JSON.parse(await readFile(`data/sources/wikidata/credits-${u}.json`, 'utf8')); } catch { console.log(`${u}: no credits cache, skipped`); continue; }
  const byWiki = new Map(cache.credits.map((c) => [c.enwiki, c]));
  let cameoArticles: Record<string, { sentences: { links: string[] }[] }> = {};
  try { cameoArticles = JSON.parse(await readFile(`data/sources/wikidata/cameos-${u}.json`, 'utf8')).articles; } catch { /* no cameo cache */ }
  const norm = (s: string) => s.replace(/\s*\([^)]*\)\s*$/, '').trim().toLowerCase();
  const file = `data/${u}/titles.json`;
  const titles = TitlesFile.parse(JSON.parse(await readFile(file, 'utf8')));
  let withCredits = 0;
  for (const t of titles) {
    const c = t.external_ids.enwiki ? byWiki.get(t.external_ids.enwiki) : undefined;
    const out: Credit[] = [];
    const cameoLinks = new Set((t.external_ids.enwiki ? cameoArticles[t.external_ids.enwiki]?.sentences ?? [] : []).flatMap((s) => s.links.map(norm)));
    for (const role of ORDER) {
      const seen = new Set<string>();
      for (const p of c?.roles[role] ?? []) {
        const name = cache.labels[p.qid];
        if (!name || seen.has(p.qid) || /^Q\d+$/.test(name)) continue; // no English name: leave out rather than show an id
        seen.add(p.qid);
        const character = role === 'cast' ? (p.character_qids.map((q) => cache.labels[q]).filter(Boolean).join(' / ') || p.character_text || null) : null;
        const charNames = p.character_qids.map((q) => cache.labels[q]).filter((x): x is string => Boolean(x));
        const cameo = role === 'cast' && ((p.role_qids ?? []).some((q) => /cameo/i.test(cache.labels[q] ?? '')) || cameoLinks.has(norm(name)) || charNames.some((n) => cameoLinks.has(norm(n))));
        out.push({ role, name, qid: p.qid, character, character_qid: role === 'cast' ? p.character_qids[0] ?? null : null, cameo });
        if (role !== 'cast' && seen.size >= CREW_LIMIT) break;
      }
    }
    if (c?.qid && !t.external_ids.wikidata) t.external_ids.wikidata = c.qid;
    t.credits = out;
    if (out.length) withCredits++;
  }
  await writeFile(file, JSON.stringify(titles, null, 2) + '\n');
  console.log(`${u}: credits on ${withCredits}/${titles.length} titles`);
}
