// YRF Spy Universe: War, Tiger 3 and War 2 have a stated placement but no stated year, and the year sort put
// them after Alpha (2026). Each film article states the order: War "set after the events of Ek Tha Tiger and
// Tiger Zinda Hai", Pathaan after War, Tiger 3 "after the events of War and Pathaan", War 2 "after the events
// of Pathaan and Tiger 3", Alpha "after the events of War 2". Renumber to that order and anchor the undated
// films between their neighbours. Idempotent.
import { readFileSync, writeFileSync } from 'node:fs';

const ORDER = ['ek-tha-tiger', 'tiger-zinda-hai', 'war-2019', 'pathaan', 'tiger-3', 'war-2', 'alpha-2026'];
const f = 'data/yrf-spy-universe/titles.json';
const titles = JSON.parse(readFileSync(f, 'utf8'));
const byId = new Map(titles.map((t: any) => [t.id, t]));
const missing = ORDER.filter((id) => !byId.has(id));
if (missing.length) throw new Error(`missing titles: ${missing.join(', ')} (have: ${titles.map((t: any) => t.id).join(', ')})`);
ORDER.forEach((id, i) => {
  const u = (byId.get(id) as any).units[0];
  u.in_universe.order_index = (i + 1) * 10;
  if (!u.in_universe.start) {
    u.in_universe.precision = 'relative';
    u.in_universe.relative_to = { after: (byId.get(ORDER[i - 1]!) as any)?.units[0].id ?? null, before: (byId.get(ORDER[i + 1]!) as any)?.units[0].id ?? null };
  }
});
writeFileSync(f, JSON.stringify(titles, null, 2) + '\n');
console.log('yrf spy order applied');
