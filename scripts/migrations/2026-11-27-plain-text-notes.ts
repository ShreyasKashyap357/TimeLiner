// Notes quoted straight from Wikipedia wikitext showed raw markup in the app ("{{Nobold|17 September 2013}}",
// "{{Start date|2013|9|17}}"). Convert every human-readable text field to plain text. Idempotent.
// Only prose fields are touched (note/notes/description/label/quote); ids, URLs and source_keys are left alone.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { plainWikitext } from '../../src/domain/wikitext.ts';

const PROSE = new Set(['note', 'notes', 'description', 'label', 'quote', 'criteria']);
let changed = 0;
function walk(v: any): any {
  if (Array.isArray(v)) return v.map(walk);
  if (v && typeof v === 'object') {
    for (const k of Object.keys(v)) {
      if (k === 'source_keys' || k === 'source_urls') continue;
      if (PROSE.has(k) && typeof v[k] === 'string') {
        const p = plainWikitext(v[k]);
        if (p !== v[k]) { v[k] = p; changed++; }
      } else v[k] = walk(v[k]);
    }
  }
  return v;
}
for (const d of readdirSync('data')) {
  for (const name of ['titles.json', 'continuities.json']) {
    const f = `data/${d}/${name}`;
    if (!existsSync(f)) continue;
    const before = readFileSync(f, 'utf8');
    const after = JSON.stringify(walk(JSON.parse(before)), null, 2) + '\n';
    if (after !== before) writeFileSync(f, after);
  }
}
console.log(`plain-text notes: ${changed} field(s) cleaned`);
