// Usage: tsx scripts/fetch/cameos.ts [universe…]
// Wikidata has no cameo marker on cast statements, so cameos come from the English Wikipedia article text:
// every sentence that mentions "cameo" is kept with the people it links ([[Person]] or [[Person|name]]).
// scripts/build/apply-credits.ts flags a cast credit as a cameo only when that person is linked in such a
// sentence of the same title's article (no new people are added). Caches to data/sources/wikidata/cameos-<u>.json.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { getJson, politePause } from './http.ts';

const API = 'https://en.wikipedia.org/w/api.php';
export interface CameoSentence { text: string; links: string[] }

/* eslint-disable @typescript-eslint/no-explicit-any */
async function wikitexts(titles: string[]): Promise<Map<string, { revid: number; text: string }>> {
  const out = new Map<string, { revid: number; text: string }>();
  for (let i = 0; i < titles.length; i += 20) {
    const q = new URLSearchParams({ action: 'query', prop: 'revisions', rvprop: 'content|ids', rvslots: 'main', titles: titles.slice(i, i + 20).join('|'), redirects: '1', format: 'json', formatversion: '2' });
    const j: any = await getJson(`${API}?${q}`);
    const back = new Map<string, string>();
    for (const r of [...(j.query?.normalized ?? []), ...(j.query?.redirects ?? [])]) back.set(r.to, back.get(r.from) ?? r.from);
    for (const p of j.query?.pages ?? []) {
      const rev = p.revisions?.[0];
      if (!rev) continue;
      out.set(back.get(p.title) ?? p.title, { revid: rev.revid, text: rev.slots.main.content });
    }
    await politePause(1200);
  }
  return out;
}

export function cameoSentences(wikitext: string): CameoSentence[] {
  const plain = wikitext.replace(/<ref[^>]*\/>/g, '').replace(/<ref[\s\S]*?<\/ref>/g, '').replace(/\{\{[^{}]*\}\}/g, '');
  return plain.split(/(?<=[.!?])\s+|\n+/).filter((s) => /\bcameo/i.test(s)).map((s) => ({
    text: s.replace(/\[\[(?:[^|\]]*\|)?([^\]]*)\]\]/g, '$1').replace(/'{2,}/g, '').trim().slice(0, 400),
    links: [...s.matchAll(/\[\[([^|\]#]+)(?:\|[^\]]*)?\]\]/g)].map((m) => m[1]!.trim()),
  }));
}

const dirs = (await readdir('data', { withFileTypes: true })).filter((d) => d.isDirectory() && !['sources', 'candidates', 'registry'].includes(d.name)).map((d) => d.name);
for (const u of process.argv.slice(2).length ? process.argv.slice(2) : dirs) {
  const titles = JSON.parse(await readFile(`data/${u}/titles.json`, 'utf8')) as { external_ids: { enwiki: string | null } }[];
  const count = new Map<string, number>();
  for (const t of titles) if (t.external_ids.enwiki) count.set(t.external_ids.enwiki, (count.get(t.external_ids.enwiki) ?? 0) + 1);
  const articles = [...count].filter(([, n]) => n === 1).map(([w]) => w);
  const texts = await wikitexts(articles);
  const result: Record<string, { revid: number; sentences: CameoSentence[] }> = {};
  for (const [title, { revid, text }] of texts) {
    const sentences = cameoSentences(text);
    if (sentences.length) result[title] = { revid, sentences };
  }
  await writeFile(`data/sources/wikidata/cameos-${u}.json`, JSON.stringify({ fetched_at: new Date().toISOString(), license: 'CC BY-SA 4.0 (Wikipedia text excerpts)', articles: result }, null, 1) + '\n');
  console.log(`${u}: ${Object.keys(result).length}/${articles.length} articles mention cameos`);
}
