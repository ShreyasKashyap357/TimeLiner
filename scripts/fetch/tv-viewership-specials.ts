// D-68: viewers for TV specials that have no season number (Doctor Who Christmas / New Year specials, the
// 2008–2010, 2013, 2022 and 2023 specials, Sarah Jane specials). The episode-list pages transclude the series
// articles; every episode table on those pages is parsed and the rows cached here with page revids.
// Usage: tsx scripts/fetch/tv-viewership-specials.ts   → data/sources/tv-viewership-specials.json
import { writeFileSync } from 'node:fs';
import { getJson, politePause } from './http.ts';
import { WIKIPEDIA } from './mediawiki.ts';
import { parseEpisodeTable } from '../build/viewership.ts';

const LISTS = ['List of Doctor Who episodes (2005–present)', 'List of Doctor Who episodes (1963–1989)', 'List of The Sarah Jane Adventures episodes'];

async function page(title: string): Promise<{ title: string; revid: number; wikitext: string } | null> {
  const q = new URLSearchParams({ action: 'parse', page: title, prop: 'wikitext|revid', redirects: '1', format: 'json', formatversion: '2' });
  const d = await getJson<{ parse?: { title: string; revid: number; wikitext: string } }>(`${WIKIPEDIA.api}?${q}`);
  await politePause(800);
  return d.parse ?? null;
}

const rows: { page: string; revid: number; title: string; date: string | null; millions: number | null; measure: string | null }[] = [];
const seen = new Set<string>();
for (const list of LISTS) {
  const lp = await page(list);
  if (!lp) continue;
  const pages = [lp];
  for (const m of lp.wikitext.matchAll(/\{\{:([^}|]+)/g)) {
    const p = await page(m[1]!.trim());
    if (p) pages.push(p);
  }
  for (const p of pages) {
    for (const chunk of p.wikitext.split(/(?=\{\{\s*(?:Episode table|#invoke:Episode table))/i).slice(1)) {
      let t;
      try { t = parseEpisodeTable(chunk); } catch { continue; }
      if (!t.measure || !/million/i.test(t.measure)) continue;
      for (const e of t.episodes) {
        const k = `${e.title}|${e.date}`;
        if (seen.has(k)) continue;
        seen.add(k);
        rows.push({ page: p.title, revid: p.revid, title: e.title, date: e.date, millions: e.millions, measure: t.measure });
      }
    }
  }
}
writeFileSync('data/sources/tv-viewership-specials.json', JSON.stringify({ fetched_at: new Date().toISOString(), license: 'CC BY-SA 4.0 (Wikipedia)', rows }, null, 1) + '\n');
console.log(`specials cache: ${rows.length} episode rows from ${new Set(rows.map((r) => r.page)).size} pages`);
