// Usage: tsx scripts/fetch/run-fandom.ts "Page" ...  (MCU Fandom wiki; merges into manifest)
import { MCU_FANDOM, fetchPage, readManifest, writeManifest } from './mediawiki.ts';
const manifest = await readManifest();
for (const t of process.argv.slice(2)) {
  const e = await fetchPage(MCU_FANDOM, t);
  const i = manifest.findIndex((m) => m.site === e.site && m.resolved_title === e.resolved_title);
  if (i >= 0) manifest[i] = e; else manifest.push(e);
  console.log(`ok ${e.resolved_title} rev ${e.revid}`);
}
await writeManifest(manifest);
