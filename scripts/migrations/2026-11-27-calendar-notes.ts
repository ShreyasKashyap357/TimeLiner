// Migration (applied 2026-11-27), user decision on D-21/D-22: say clearly in the UI how era calendars
// count years and that AC and NE have no year 0. Adds calendar.note to every era calendar. Idempotent.
import { readFile, writeFile } from 'node:fs/promises';
import { ContinuitiesFile } from '../../src/domain/schema.ts';

const NOTES: Record<string, string> = {
  "BC": "Years counted from Aegon's Conquest: 1 AC is the year of Aegon I's coronation, and the year before it is 1 BC (there is no year 0). Inferred from A Wiki of Ice and Fire; no source states the no-year-0 rule in words (D-21).",
  "NE": "New Era (Farede calendar) years. There is no year 0, and the series spans 998–1000 NE. Inferred from the Wheel of Time Wiki; Wikipedia gives no in-universe years (D-22).",
  "BBY": "Years before / after the Battle of Yavin (A New Hope). The battle year is shown as 0 ABY; there is no \"0 BBY\" in canon."
};
for (const dir of ['asoiaf', 'wheel-of-time', 'star-wars']) {
  const file = `data/${dir}/continuities.json`;
  const conts = ContinuitiesFile.parse(JSON.parse(await readFile(file, 'utf8')));
  let n = 0;
  for (const c of conts) {
    if (c.calendar.kind !== 'era') continue;
    const note = NOTES[c.calendar.after_label === 'NE' ? 'NE' : c.calendar.before_label];
    if (note && c.calendar.note !== note) { c.calendar.note = note; n++; }
  }
  await writeFile(file, JSON.stringify(conts, null, 2) + '\n');
  console.log(`${dir}: ${n} calendar note(s)`);
}
