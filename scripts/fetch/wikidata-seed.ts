// Usage: tsx scripts/fetch/wikidata-seed.ts <universe>   Wikidata facts for every title in scripts/bootstrap/<universe>.seed.ts
import { cacheWikidata } from './wikidata.ts';
const universe = process.argv[2];
if (!universe) throw new Error('usage: wikidata-seed.ts <universe>');
const { SEED } = (await import(`../bootstrap/${universe}.seed.ts`)) as { SEED: { wiki: string | null }[] };
const facts = await cacheWikidata(universe, [...new Set(SEED.map((t) => t.wiki).filter((w): w is string => Boolean(w)))]);
console.log(`${universe}: ${facts.length} looked up, missing QID: ${facts.filter((f) => !f.qid).map((f) => f.enwiki).join('; ') || 'none'}`);
