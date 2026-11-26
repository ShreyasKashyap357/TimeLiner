// Usage: tsx scripts/fetch/run-one.ts "Page title" ...  (Wikipedia only; merges into manifest)
import { WIKIPEDIA, fetchPage, readManifest, writeManifest } from './mediawiki.ts';
const manifest = await readManifest();
for (const t of process.argv.slice(2)) {
  const e = await fetchPage(WIKIPEDIA, t);
  const i = manifest.findIndex((m) => m.site === e.site && m.resolved_title === e.resolved_title);
  if (i >= 0) manifest[i] = e; else manifest.push(e);
  console.log(`ok ${e.resolved_title} rev ${e.revid}`);
}
await writeManifest(manifest);
