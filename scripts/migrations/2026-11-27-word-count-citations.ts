// Migration (applied 2026-11-27), user decision D-31 follow-up: cite word counts like Wikipedia does.
//  - Sets unit.word_count_source from the source already recorded for each count (Wikipedia book tables citing
//    Accelerated Reader; George R. R. Martin's Not a Blog).
//  - Adds The Wheel of Time Companion: about 350,000 words, a pre-publication figure from editor Harriet
//    McDougal (Worldcon 2014), reported by The Wertzone: "The book will be 350,000 words long".
//  - Notes the Wheel of Time Wiki's own counts (books table, oldid 165374, uncited) where they differ.
// Not used: ReadingLength "Guess" figures and a from-memory forum post (not real counts). Idempotent.
import { readFile, writeFile } from 'node:fs/promises';
import { TitlesFile } from '../../src/domain/schema.ts';

const WIKI_URL = "https://wot.fandom.com/wiki/The_Wheel_of_Time?oldid=165374";
const WIKI: Record<string, number> = {"new-spring":121815,"the-eye-of-the-world":305902,"the-great-hunt":267078,"the-dragon-reborn":251392,"the-shadow-rising":393823,"the-fires-of-heaven":354109,"lord-of-chaos":389264,"a-crown-of-swords":295028,"the-path-of-daggers":226687,"winters-heart":238789,"crossroads-of-twilight":271632,"knife-of-dreams":315163,"the-gathering-storm":303630,"towers-of-midnight":328000,"a-memory-of-light":357523};
const COMPANION = { unit: 'the-wheel-of-time-companion', words: 350000, url: 'http://thewertzone.blogspot.com/2014/08/details-on-wheel-of-time-companion.html' };
const fmt = (n: number) => n.toLocaleString('en-US');

for (const dir of ['wheel-of-time', 'asoiaf']) {
  const file = `data/${dir}/titles.json`;
  const titles = TitlesFile.parse(JSON.parse(await readFile(file, 'utf8')));
  for (const t of titles) for (const u of t.units) {
    if (u.id === COMPANION.unit && u.word_count === null) {
      u.word_count = COMPANION.words;
      u.source_urls.push(COMPANION.url);
      u.notes = `${u.notes ? u.notes + ' ' : ''}Word count: about ${fmt(COMPANION.words)}, a pre-publication figure from editor Harriet McDougal (Worldcon 2014), reported by The Wertzone.`;
    }
    if (u.word_count === null) continue;
    if (!u.word_count_source) u.word_count_source = u.source_urls.find((s) => /oldid=|grrm|georgerrmartin|thewertzone/.test(s)) ?? null;
    const w = WIKI[u.id];
    if (w && w !== u.word_count && !u.notes.includes('Wheel of Time Wiki')) {
      u.notes += ` The Wheel of Time Wiki's books table (uncited) gives ${fmt(w)}.`;
      if (!u.source_urls.includes(WIKI_URL)) u.source_urls.push(WIKI_URL);
    }
  }
  await writeFile(file, JSON.stringify(titles, null, 2) + '\n');
  console.log(`${dir}: word-count citations set`);
}
