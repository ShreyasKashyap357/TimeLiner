// Generator-built universes: where the research gave an explicit story order (in_universe.order_index for every
// unit of a continuity), use it as the timeline order. The year sort had pushed undated entries after every
// dated one (Ultra Q after Ultraman 80; TMNT 2003 seasons after the 2105 season; M:I films 1–7 after
// Final Reckoning). Years and labels are unchanged. Idempotent.
// Usage: tsx scripts/migrations/2026-11-28-research-story-order.ts data/sources/research/*.json
// (the research files, with their quotes and revision permalinks, are archived in data/sources/research/)
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const files = process.argv.slice(2);
let changed = 0;
for (const file of files) {
  const research = JSON.parse(readFileSync(file, 'utf8'));
  for (const [uni, R] of Object.entries<any>(research)) {
    if (!R?.continuities || !existsSync(`data/${uni}/titles.json`)) continue;
    const conts = JSON.parse(readFileSync(`data/${uni}/continuities.json`, 'utf8'));
    const tf = `data/${uni}/titles.json`;
    const titles = JSON.parse(readFileSync(tf, 'utf8'));
    const unitOf = (tid: string, key: string) => {
      const t = titles.find((x: any) => x.id === tid);
      if (!t) return null;
      return t.units.find((u: any) => u.id === `${tid}-${key}`) ?? (t.units.length === 1 ? t.units[0] : null);
    };
    for (const c of R.continuities) {
      const dc = conts.find((x: any) => x.id === c.id);
      if (!dc || dc.calendar.kind === 'ordered-only') continue; // ordered-only already follows the research order
      const rows = R.titles.filter((t: any) => t.continuity === c.id).flatMap((t: any) => t.units.map((u: any) => ({ oi: u.in_universe?.order_index, unit: unitOf(t.id, u.key) })));
      if (!rows.length || rows.some((r: any) => typeof r.oi !== 'number' || !r.unit)) continue; // incomplete: leave as is
      rows.sort((a: any, b: any) => a.oi - b.oi);
      rows.forEach((r: any, i: number) => {
        const idx = (i + 1) * 10;
        if (r.unit.in_universe.order_index !== idx) { r.unit.in_universe.order_index = idx; changed++; }
      });
    }
    writeFileSync(tf, JSON.stringify(titles, null, 2) + '\n');
  }
}
console.log(`research story order: ${changed} order_index change(s)`);
