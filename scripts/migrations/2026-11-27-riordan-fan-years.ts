// Riordanverse books: the Riordan Wiki dates most books ("Summer 2006", "June 2007"…). Those years were only in
// the labels, so the timeline had no year markers. Give them real (inferred / disputed, as already marked)
// years and anchor the undated books between their dated neighbours. Idempotent; order_index is unchanged.
import { readFileSync, writeFileSync } from 'node:fs';

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const cf = 'data/riordan/continuities.json';
const tf = 'data/riordan/titles.json';
const conts = JSON.parse(readFileSync(cf, 'utf8'));
const titles = JSON.parse(readFileSync(tf, 'utf8'));
const C = 'riordanverse-books';
const cont = conts.find((c: any) => c.id === C);
cont.calendar = { kind: 'gregorian' };
if (!String(cont.notes).includes('Riordan Wiki years')) cont.notes = `${cont.notes} Riordan Wiki years are used as in-universe years (inferred, per D-35); books without one are placed between their dated neighbours.`.trim();

const units = titles.filter((t: any) => t.continuity === C).flatMap((t: any) => t.units);
units.sort((a: any, b: any) => a.in_universe.order_index - b.in_universe.order_index);
let dated = 0;
for (const u of units) {
  const iu = u.in_universe;
  const m = /^(?:(\w+)(?:[–-]\w+)?\s+)?(\d{4})\b.*\(fan-dated\)/.exec(iu.label);
  if (m) {
    const mi = m[1] ? MONTHS.indexOf(m[1].toLowerCase()) : -1;
    iu.start = mi >= 0 ? { y: Number(m[2]), m: mi + 1 } : { y: Number(m[2]) };
    iu.end = { ...iu.start };
    iu.precision = 'year';
    iu.relative_to = null;
    if (iu.confidence === 'stated') iu.confidence = 'inferred';
    dated++;
  }
}
// undated books: between the nearest dated books in story order
for (let i = 0; i < units.length; i++) {
  const iu = units[i].in_universe;
  if (iu.start) continue;
  const before = units.slice(0, i).reverse().find((u: any) => u.in_universe.start);
  const after = units.slice(i + 1).find((u: any) => u.in_universe.start);
  iu.precision = 'relative';
  iu.relative_to = { after: before?.id ?? null, before: after?.id ?? null };
}
writeFileSync(cf, JSON.stringify(conts, null, 2) + '\n');
writeFileSync(tf, JSON.stringify(titles, null, 2) + '\n');
console.log(`riordan books: ${dated} dated from the Riordan Wiki, ${units.length - dated} anchored between them`);
