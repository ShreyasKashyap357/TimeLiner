// NCIS: Origins is "a prequel to NCIS" set in 1991 (stated) / "the 1990s". Premiere order put it in 2024;
// in story order it belongs before NCIS season 1. Its position relative to JAG is not sourced, so it goes
// directly before NCIS s1 (after JAG's backdoor-pilot season). Idempotent: renumbers the continuity by 10s.
import { readFileSync, writeFileSync } from 'node:fs';

const f = 'data/ncis/titles.json';
const titles = JSON.parse(readFileSync(f, 'utf8'));
const units = titles.filter((t: any) => t.continuity === 'ncis-main').flatMap((t: any) => t.units.map((u: any) => ({ t, u })));
units.sort((a: any, b: any) => a.u.in_universe.order_index - b.u.in_universe.order_index);
const origins = units.filter((x: any) => x.t.id === 'ncis-origins');
const rest = units.filter((x: any) => x.t.id !== 'ncis-origins');
const at = rest.findIndex((x: any) => x.u.id === 'ncis-s1');
if (at < 0) throw new Error('ncis-s1 not found');
const ordered = [...rest.slice(0, at), ...origins, ...rest.slice(at)];
let changed = 0;
ordered.forEach((x: any, i: number) => {
  const idx = (i + 1) * 10;
  if (x.u.in_universe.order_index !== idx) { x.u.in_universe.order_index = idx; changed++; }
});
for (const x of origins) {
  const n = x.u.in_universe.note as string;
  if (!n.includes('Placed before NCIS season 1')) x.u.in_universe.note = `${n} Placed before NCIS season 1 because it is a prequel; its order relative to JAG is not stated.`;
}
writeFileSync(f, JSON.stringify(titles, null, 2) + '\n');
console.log(`ncis-main renumbered (${changed} change(s))`);
