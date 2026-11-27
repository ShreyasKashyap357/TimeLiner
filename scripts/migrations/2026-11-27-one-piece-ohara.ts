// D-75: One Piece films. The Library of Ohara (thelibraryofohara.com, posts by NewWorld - Artur) publishes a
// canon-only timeline with no film/filler placements, so it is used for canon status; placements stay on the
// Wikipedia statements already in the data (Strong World, Film Z) and remain disputed otherwise.
// The two retelling films get links to the seasons they retell (separate continuity, no shared ordering). Idempotent.
import { readFileSync, writeFileSync } from 'node:fs';

const OHARA_TL = 'https://thelibraryofohara.com/the-one-piece-timeline/';
const NOTES: Record<string, { url: string; note: string }> = {
  'one-piece-film-red': { url: 'https://thelibraryofohara.com/2022/08/09/one-piece-film-red-review/',
    note: 'Library of Ohara (NewWorld - Artur, Film RED review, 2022-08-09): "Though the film\'s actual events in the timeline obviously aren\'t, Uta\'s character and backstory are all canon." Its timeline adds: "Film RED: confirms Shanks as a member of the Fegarland Family, an element Oda confirms as canon."' },
  'one-piece-stampede': { url: 'https://thelibraryofohara.com/2019/08/11/one-piece-stampede-review/',
    note: 'Library of Ohara (NewWorld - Artur, Stampede review, 2019-08-11): "While the movie isn\'t canon, it reveals certain canon things relative to the main series."' },
  'one-piece-film-z': { url: OHARA_TL,
    note: 'Library of Ohara (One Piece Timeline V5.0): "Though Zephyr isn\'t canon, the timeline of Sakazuki and Borsalino is, as confirmed in the Vivre Cards." Wikipedia: "the first One Piece film to take place in the New World, after the two-year time-skip."' },
};
const LINKS: { from: string; to: string; note: string }[] = [
  { from: 'one-piece-desert-princess', to: 'one-piece-anime', note: 'Retells the Alabasta arc (anime season 4), per Wikipedia. Not a separate event.' },
  { from: 'one-piece-episode-of-chopper-plus', to: 'one-piece-anime', note: 'Alternate retelling of the Drum Island arc (anime season 3), per Wikipedia.' },
];

const f = 'data/one-piece/titles.json';
const titles = JSON.parse(readFileSync(f, 'utf8'));
let changed = 0;
for (const [id, { url, note }] of Object.entries(NOTES)) {
  const t = titles.find((x: any) => x.id === id);
  if (!t) throw new Error(`missing ${id}`);
  const u = t.units[0];
  if (!String(u.in_universe.note).includes('Library of Ohara')) { u.in_universe.note = `${u.in_universe.note} ${note}`.trim(); changed++; }
  if (!u.source_urls.includes(url)) u.source_urls.push(url);
}
for (const l of LINKS) {
  const t = titles.find((x: any) => x.id === l.from);
  if (!t || !titles.some((x: any) => x.id === l.to)) throw new Error(`missing ${l.from} or ${l.to}`);
  if (!t.links.some((x: any) => x.to === l.to && x.kind === 'adapts')) { t.links.push({ to: l.to, kind: 'adapts', note: l.note }); changed++; }
}
writeFileSync(f, JSON.stringify(titles, null, 2) + '\n');
console.log(`one piece / Library of Ohara: ${changed} change(s)`);
