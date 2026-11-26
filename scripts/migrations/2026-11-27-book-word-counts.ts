// Migration (applied 2026-11-27), user decision D-16 / D-31: book word counts.
// Wheel of Time and ASOIAF 1–5: Wikipedia book tables (pinned oldids), which cite Accelerated Reader
// BookFinder (computed per edition). The Princess and the Queen: George R. R. Martin's blog ("a 30,000 word
// novella"), an author's round figure, so marked approximate. Other sources that differ are named in the note.
// Units with no reliable count stay null. Idempotent.
import { readFile, writeFile } from 'node:fs/promises';
import { TitlesFile } from '../../src/domain/schema.ts';

interface WC { unit: string; words: number; estimate: boolean; url: string; conflicts: unknown }
const COUNTS: WC[] = [
 {
  "unit": "new-spring",
  "words": 121816,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=The_Wheel_of_Time&oldid=1381755297",
  "conflicts": null
 },
 {
  "unit": "the-eye-of-the-world",
  "words": 310874,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=The_Wheel_of_Time&oldid=1381755297",
  "conflicts": null
 },
 {
  "unit": "the-great-hunt",
  "words": 258203,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=The_Wheel_of_Time&oldid=1381755297",
  "conflicts": null
 },
 {
  "unit": "the-dragon-reborn",
  "words": 242016,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=The_Wheel_of_Time&oldid=1381755297",
  "conflicts": null
 },
 {
  "unit": "the-shadow-rising",
  "words": 341730,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=The_Wheel_of_Time&oldid=1381755297",
  "conflicts": "The Wertzone (Adam Whitehead, 2021-10-24, says most counts come from ebooks) https://thewertzone.blogspot.com/2021/10/the-longest-sff-novels-series-of-all.html : \"The Shadow Rising, at 386,000.\" Large disagreement (~44k)."
 },
 {
  "unit": "the-fires-of-heaven",
  "words": 342005,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=The_Wheel_of_Time&oldid=1381755297",
  "conflicts": null
 },
 {
  "unit": "lord-of-chaos",
  "words": 391159,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=The_Wheel_of_Time&oldid=1381755297",
  "conflicts": "The Wertzone https://thewertzone.blogspot.com/2021/10/the-longest-sff-novels-series-of-all.html : \"Lord of Chaos is the sixth and longest Wheel of Time novel, clocking in at 395,000 words\"."
 },
 {
  "unit": "a-crown-of-swords",
  "words": 285958,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=The_Wheel_of_Time&oldid=1381755297",
  "conflicts": null
 },
 {
  "unit": "the-path-of-daggers",
  "words": 222185,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=The_Wheel_of_Time&oldid=1381755297",
  "conflicts": null
 },
 {
  "unit": "winters-heart",
  "words": 238423,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=The_Wheel_of_Time&oldid=1381755297",
  "conflicts": null
 },
 {
  "unit": "crossroads-of-twilight",
  "words": 264200,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=The_Wheel_of_Time&oldid=1381755297",
  "conflicts": null
 },
 {
  "unit": "knife-of-dreams",
  "words": 313674,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=The_Wheel_of_Time&oldid=1381755297",
  "conflicts": null
 },
 {
  "unit": "the-gathering-storm",
  "words": 294492,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=The_Wheel_of_Time&oldid=1381755297",
  "conflicts": null
 },
 {
  "unit": "towers-of-midnight",
  "words": 325636,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=The_Wheel_of_Time&oldid=1381755297",
  "conflicts": null
 },
 {
  "unit": "a-memory-of-light",
  "words": 352686,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=The_Wheel_of_Time&oldid=1381755297",
  "conflicts": null
 },
 {
  "unit": "a-game-of-thrones",
  "words": 292727,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=A_Song_of_Ice_and_Fire&oldid=1387274616",
  "conflicts": null
 },
 {
  "unit": "a-clash-of-kings",
  "words": 318903,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=A_Song_of_Ice_and_Fire&oldid=1387274616",
  "conflicts": null
 },
 {
  "unit": "a-storm-of-swords",
  "words": 414604,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=A_Song_of_Ice_and_Fire&oldid=1387274616",
  "conflicts": "The Wertzone https://thewertzone.blogspot.com/2021/10/the-longest-sff-novels-series-of-all.html : \"422,000 words • 2000\"; The Ringer (Ben Lindbergh, 2017-01-18) https://www.theringer.com/2017/1/18/16038338/books-tv-game-of-thrones-george-r-r-martin-word-count-tally-e6b13408a4c7 : \"ran 424,000 words\" (method unstated)."
 },
 {
  "unit": "a-feast-for-crows",
  "words": 295032,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=A_Song_of_Ice_and_Fire&oldid=1387274616",
  "conflicts": null
 },
 {
  "unit": "a-dance-with-dragons",
  "words": 414788,
  "estimate": false,
  "url": "https://en.wikipedia.org/w/index.php?title=A_Song_of_Ice_and_Fire&oldid=1387274616",
  "conflicts": "The Wertzone https://thewertzone.blogspot.com/2021/10/the-longest-sff-novels-series-of-all.html : \"420,000 words • 2011\"."
 },
 {
  "unit": "the-princess-and-the-queen",
  "words": 30000,
  "estimate": true,
  "url": "https://georgerrmartin.com/notablog/?p=1722",
  "conflicts": "Same post: \"The full 80,000 word account of the Dance will eventually appear in a book\" (the unabridged material later in Fire & Blood, not this novella). Reactor/Tor excerpt page (2014-09-08) https://reactormag.com/dangerous-women-the-princess-and-the-queen-or-the-blacks-and-the-greens-excerpt/ blurb: \"features an original 35,000 word novella by George R.R. Martin\" (ambiguous; not adopted)."
 }
];

const fmt = (n: number) => n.toLocaleString('en-US');
for (const dir of ['wheel-of-time', 'asoiaf']) {
  const file = `data/${dir}/titles.json`;
  const titles = TitlesFile.parse(JSON.parse(await readFile(file, 'utf8')));
  let n = 0;
  for (const t of titles) for (const u of t.units) {
    const c = COUNTS.find((x) => x.unit === u.id);
    if (!c || u.word_count === c.words) continue;
    u.word_count = c.words;
    if (!u.source_urls.includes(c.url)) u.source_urls.push(c.url);
    const src = c.estimate ? `about ${fmt(c.words)} words, the author's own round figure` : `${fmt(c.words)} words (Accelerated Reader, via Wikipedia's book table)`;
    const other = c.conflicts ? ` Other counts differ: ${typeof c.conflicts === 'string' ? c.conflicts : JSON.stringify(c.conflicts)}` : '';
    const line = `Word count: ${src}.${other}`;
    u.notes = u.notes ? (u.notes.includes('Word count:') ? u.notes : `${u.notes} ${line}`) : line;
    n++;
  }
  await writeFile(file, JSON.stringify(titles, null, 2) + '\n');
  console.log(`${dir}: ${n} word count(s)`);
}
