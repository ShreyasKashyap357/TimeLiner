// Usage: tsx scripts/fetch/run.ts [universe ...]   Fetches and caches all sources for the universes.
import { SOURCES } from './sources.ts';
import { WIKIPEDIA, MCU_FANDOM, fetchPage, readManifest, writeManifest, type MediaWikiSite } from './mediawiki.ts';

const SITES: Record<string, MediaWikiSite> = { wikipedia: WIKIPEDIA, 'fandom-mcu': MCU_FANDOM };
const universes = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SOURCES);
const manifest = await readManifest();
const failures: string[] = [];
for (const u of universes) {
  for (const s of SOURCES[u] ?? []) {
    try {
      const e = await fetchPage(SITES[s.site]!, s.title);
      const i = manifest.findIndex((m) => m.site === e.site && m.resolved_title === e.resolved_title);
      if (i >= 0) manifest[i] = e; else manifest.push(e);
      console.log(`ok   ${s.site}  ${e.resolved_title}  rev ${e.revid}`);
    } catch (err) {
      failures.push(`${s.site} ${s.title}: ${(err as Error).message}`);
      console.error(`FAIL ${s.site}  ${s.title}: ${(err as Error).message}`);
    }
  }
}
await writeManifest(manifest);
if (failures.length) { console.error(`\n${failures.length} failure(s)`); process.exitCode = 1; }
