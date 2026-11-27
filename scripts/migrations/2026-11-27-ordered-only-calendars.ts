// Continuities whose sources give an order but no in-universe years: switch the calendar to ordered-only
// so the spine places them by order_index instead of dumping everything under "No confirmed placement".
// Idempotent. No dates are created or removed.
import { readFileSync, writeFileSync } from 'node:fs';

const TARGETS: Record<string, string[]> = {
  dc: ['lucifer', 'swamp-thing-2019', 'krypton', 'pennyworth', 'watchmen-2024', 'teen-titans-2003', 'teen-titans-go', 'young-justice',
    'harley-quinn-animated', 'batman-brave-and-the-bold', 'beware-the-batman', 'justice-league-action', 'superman-batman-dtv',
    'crisis-on-two-earths-doom', 'arkhamverse'],
  'wizarding-world': ['wizarding-world-other'],
  lego: ['lego-games', 'lego-standalone'],
};

for (const [dir, ids] of Object.entries(TARGETS)) {
  const f = `data/${dir}/continuities.json`;
  const cs = JSON.parse(readFileSync(f, 'utf8'));
  const tf = `data/${dir}/titles.json`;
  const ts = JSON.parse(readFileSync(tf, 'utf8'));
  let n = 0;
  for (const c of cs) {
    if (!ids.includes(c.id) || c.calendar.kind === 'ordered-only') continue;
    const units = ts.filter((t: any) => t.continuity === c.id).flatMap((t: any) => t.units);
    if (units.some((u: any) => u.in_universe.start)) { console.warn(`skip ${c.id}: has dated units`); continue; }
    c.calendar = { kind: 'ordered-only' };
    n++;
  }
  writeFileSync(f, JSON.stringify(cs, null, 2) + '\n');
  console.log(`${dir}: ${n} continuit(ies) set to ordered-only`);
}
