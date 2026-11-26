// Usage: tsx scripts/fetch/wikidata-run.ts marvel
import { cacheWikidata } from './wikidata.ts';
const universe = process.argv[2] ?? 'marvel';
const seed = (await import(`../bootstrap/${universe}.seed.ts`)) as { [k: string]: unknown };
const titles = (Object.values(seed).find((v) => Array.isArray(v) && (v as any[]).length > 50) as { wiki: string }[]).map((t) => t.wiki);
const facts = await cacheWikidata(universe, titles);
const missing = facts.filter((f) => !f.qid);
console.log(`wikidata: ${facts.length} looked up, ${missing.length} without QID: ${missing.map((m) => m.enwiki).join('; ')}`);
