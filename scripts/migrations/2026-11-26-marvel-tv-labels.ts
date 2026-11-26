// Migration (applied 2026-11-26), user decision D-1: name the two Marvel Television entities
// "Marvel Television (2010–2019)" and "Marvel Television (Marvel Studios)". Ids are unchanged,
// so filters, URLs and watched state are unaffected. Idempotent.
import { readFile, writeFile } from 'node:fs/promises';
import { StudiosFile } from '../../src/domain/schema.ts';

const FILE = 'data/registry/studios.json';
const LABELS: Record<string, { label: string; short_label: string }> = {
  'marvel-television-division': { label: 'Marvel Television (2010–2019)', short_label: 'Marvel Television (2010–2019)' },
  'marvel-television-banner': { label: 'Marvel Television (Marvel Studios)', short_label: 'Marvel Television (Marvel Studios)' },
};

const studios = StudiosFile.parse(JSON.parse(await readFile(FILE, 'utf8')));
let changed = 0;
for (const s of studios) {
  const l = LABELS[s.id];
  if (l && (s.label !== l.label || s.short_label !== l.short_label)) { Object.assign(s, l); changed++; }
}
await writeFile(FILE, JSON.stringify(studios, null, 2) + '\n');
console.log(`marvel-tv-labels: ${changed} studio(s) relabelled`);
