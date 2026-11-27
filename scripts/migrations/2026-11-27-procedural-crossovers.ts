// Cross-franchise crossovers between Law & Order and One Chicago (Wikipedia, Chicago franchise article
// rev 1387031475). Links only: the universes and continuities stay separate. Idempotent.
import { readFileSync, writeFileSync } from 'node:fs';

const SRC = 'Wikipedia, Chicago franchise article';
const LINKS: { dir: string; from: string; to: string; kind: string; note: string }[] = [
  { dir: 'law-and-order', from: 'law-and-order-svu', to: 'chicago-pd', kind: 'crossover',
    note: `Two-part crossovers: "Comic Perversion" / "Conventions" (February 26, 2014) and "Nationwide Manhunt" / "The Song of Gregory William Yates" (February 10, 2016). Source: ${SRC}.` },
  { dir: 'one-chicago', from: 'chicago-fire', to: 'law-and-order-svu', kind: 'crossover',
    note: `Three-part crossovers with Chicago P.D.: "Nobody Touches Anything" / "Chicago Crossover" / "They'll Have to Go Through Me" (November 11–12, 2014) and "We Called Her Jellybean" / "The Number of Rats" / "Daydream Believer" (April 28–29, 2015). Source: ${SRC}.` },
  { dir: 'one-chicago', from: 'chicago-justice', to: 'law-and-order', kind: 'crossover',
    note: `"Uncertainty Principle" (March 5, 2017): Law & Order's Paul Robinette faces ASA Peter Stone, "the son of his former colleague Ben Stone". Source: ${SRC}.` },
  { dir: 'one-chicago', from: 'chicago-justice', to: 'law-and-order-svu', kind: 'shares-characters',
    note: `Peter Stone moves from Chicago Justice to Law & Order: Special Victims Unit. Source: ${SRC}.` },
];

const byDir = new Map<string, any[]>();
const load = (d: string) => byDir.get(d) ?? (byDir.set(d, JSON.parse(readFileSync(`data/${d}/titles.json`, 'utf8'))), byDir.get(d)!);
let added = 0;
for (const l of LINKS) {
  const t = load(l.dir).find((x: any) => x.id === l.from);
  if (!t) throw new Error(`missing ${l.from}`);
  if (t.links.some((x: any) => x.to === l.to && x.kind === l.kind)) continue;
  t.links.push({ to: l.to, kind: l.kind, note: l.note });
  added++;
}
for (const [d, ts] of byDir) writeFileSync(`data/${d}/titles.json`, JSON.stringify(ts, null, 2) + '\n');
console.log(`procedural crossovers: ${added} link(s) added`);
