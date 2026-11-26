// Render verify-data --json output as a GitHub issue body. Prints NO_DRIFT when nothing to report.
import { readFileSync } from 'node:fs';
const [jsonFile, logFile] = process.argv.slice(2);
let r;
try { r = JSON.parse(readFileSync(jsonFile, 'utf8')); } catch {
  console.log(`## Data drift report\n\nverify-data failed to produce a report.\n\n\`\`\`\n${readFileSync(logFile, 'utf8').slice(-6000)}\n\`\`\``);
  process.exit(0);
}
const errors = r.issues.filter((i) => i.level === 'error');
if (!r.drift.length && !errors.length) { console.log('NO_DRIFT'); process.exit(0); }
const byKind = {};
for (const d of r.drift) (byKind[d.kind] ??= []).push(d);
const order = ['new-title', 'date-changed', 'timeline-moved', 'status-changed', 'missing-in-source', 'source-revision'];
const lines = [`## Data drift report`, '', `Run date: ${r.today} · ${r.counts}`, '',
  'Each item needs a human decision. Mechanical fixes (release dates, statuses) can be applied directly; in-universe placements, new titles and tier changes need a DATA_NOTES.md entry. Accepted exceptions go in `data/drift-ignore.json`.', ''];
if (errors.length) lines.push(`### Integrity errors (${errors.length})`, ...errors.map((e) => `- \`${e.code}\` **${e.where}**: ${e.message}`), '');
for (const k of order) if (byKind[k]) lines.push(`### ${k} (${byKind[k].length})`, ...byKind[k].map((d) => `- [ ] **${d.where}**: ${d.message}`), '');
console.log(lines.join('\n'));
