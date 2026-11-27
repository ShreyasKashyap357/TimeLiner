// Watch-order text cleanup: the research notes/criteria used internal jargon (0-based "source 2",
// "selective:true", "supported_by"). Rewrite them in plain English with [n] citations that match the
// numbered "Guides used" list (1-based). Idempotent: already-clean text is left alone.
import { readdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';

const CANONICAL =
  'An entry is essential when at least two curated guides (guides that pick a subset for newcomers, or mark some entries optional) recommend it, and no guide calls it skippable. ' +
  'Later seasons, books or films of an essential series are essential too, because they continue the same story (guides written before they came out cannot list them). ' +
  'Everything else that at least one guide lists is optional.';

const CUSTOM: Record<string, string> = {
  'monsterverse':
    'Only one guide [1] gives a curated newcomer list, so the usual two-guide rule would mark nothing essential. Instead, an entry is essential when it is on that list, at least one other guide also lists it, and no guide calls it skippable or disconnected. ' +
    'Later seasons of an essential series are essential too, because they continue the same story. Everything else is optional.',
};

const cite = (n: string) => `[${Number(n) + 1}]`;
/** "sources 0, 1 and 3" → "guides [1], [2] and [4]"; "sources 0-5" → "guides [1]–[6]"; "source 0" → "guide [1]". */
function citeSources(s: string): string {
  return s
    .replace(/\bsources (\d+)\s*[-–]\s*(\d+)/g, (_, a, b) => `guides ${cite(a)}–${cite(b)}`)
    .replace(/\b([Ss])ources ((?:\d+(?:, )?)+(?: and \d+)?)/g, (_, S: string, list: string) => (S === 'S' ? 'Guides ' : 'guides ') + list.replace(/\d+/g, cite))
    .replace(/\bsource (\d+)/g, (_, a) => `guide ${cite(a)}`)
    .replace(/\(guide (\[\d+\]), option (\d+)\)/g, '($1, option $2)');
}
function cleanNote(s: string): string {
  return citeSources(s)
    .replace(/^Recommended READING order\.\s*/, '')
    .replace(/\b(Backbone|Primary order) = /g, 'Based on ')
    .replace(/\s+/g, ' ')
    .trim();
}
const JARGON = /selective:|supported_by|\bindices\b|source \d|sources \d|sources \[/i;

let changed = 0;
for (const d of readdirSync('data')) {
  const f = `data/${d}/continuities.json`;
  if (!existsSync(f)) continue;
  const cs = JSON.parse(readFileSync(f, 'utf8'));
  let dirty = false;
  for (const c of cs) {
    for (const a of c.alt_orders ?? []) {
      if (a.kind !== 'recommended') continue;
      const note = cleanNote(a.note ?? '');
      if (note !== a.note) { a.note = note; dirty = true; }
      if (a.criteria && JARGON.test(a.criteria)) { a.criteria = CUSTOM[c.id] ?? CANONICAL; dirty = true; }
      if (JARGON.test(a.note)) console.warn(`still jargon in ${c.id} note: ${a.note}`);
    }
  }
  if (dirty) { writeFileSync(f, JSON.stringify(cs, null, 2) + '\n'); changed++; }
}
console.log(`order text cleaned in ${changed} file(s)`);

// One-off: the DCEU note was merged with the DCU's opening sentence by the research merge.
{
  const f = 'data/dc/continuities.json';
  const cs = JSON.parse(readFileSync(f, 'utf8'));
  const a = cs.find((c: any) => c.id === 'dceu')?.alt_orders.find((x: any) => x.id === 'recommended');
  if (a && a.note.startsWith('Based on the DCU (current continuity)')) {
    a.note = a.note.replace(/^Based on the DCU \(current continuity\) in release order\. DCEU in release order/, 'Based on DCEU release order');
    writeFileSync(f, JSON.stringify(cs, null, 2) + '\n');
  }
}
