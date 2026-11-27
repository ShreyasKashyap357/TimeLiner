// D-68: map viewer figures onto special units that have no season number (Doctor Who, The Sarah Jane
// Adventures). A unit gets the cached episode rows that aired inside its release window; it is only filled
// when that row count equals the unit's episode_count. Idempotent: units that already have figures are skipped.
import { readFileSync, writeFileSync } from 'node:fs';

const cache = JSON.parse(readFileSync('data/sources/tv-viewership-specials.json', 'utf8')) as {
  rows: { page: string; revid: number; title: string; date: string | null; millions: number | null; measure: string | null }[];
};
const permalink = (page: string, revid: number) => `https://en.wikipedia.org/w/index.php?title=${encodeURIComponent(page.replace(/ /g, '_'))}&oldid=${revid}`;
const f = 'data/doctor-who/titles.json';
const titles = JSON.parse(readFileSync(f, 'utf8'));
let filled = 0;
const skipped: string[] = [];
for (const t of titles) for (const u of t.units) {
  if (!/^(doctor-who-1963|doctor-who-2005|the-sarah-jane-adventures)$/.test(t.id)) continue;
  if (u.viewership || u.season != null || !u.episode_count || !u.release?.date || u.status !== 'released') continue;
  const from = u.release.date as string, to = (u.release.end_date ?? u.release.date) as string;
  if (from.length < 10 || to.length < 10) { skipped.push(`${u.id}: partial dates`); continue; }
  const rows = cache.rows.filter((r) => r.date && r.date >= from && r.date <= to)
    .filter((r) => (t.id.startsWith('the-sarah-jane') ? /Sarah Jane/i.test(r.page) : !/Sarah Jane/i.test(r.page)))
    .sort((a, b) => String(a.date).localeCompare(String(b.date)));
  if (rows.length !== u.episode_count) { skipped.push(`${u.id}: ${rows.length} rows in window vs ${u.episode_count} episodes`); continue; }
  const vals = rows.map((r) => r.millions).filter((m): m is number => m !== null);
  const src = permalink(rows[0]!.page, rows[0]!.revid);
  u.viewership = {
    measure: rows[0]!.measure ?? 'Viewers (millions)',
    country: /UK/.test(rows[0]!.measure ?? '') ? 'UK' : null,
    episodes: rows.map((r, i) => ({ n: i + 1, title: r.title, date: r.date, millions: r.millions })),
    season_average: vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100) / 100 : null,
    season_average_kind: vals.length ? 'computed' : null,
    average_source_url: null,
    source_url: src,
    note: 'Special without a season number: figures matched to its air dates in the episode table (D-68).',
  };
  if (!u.source_urls.includes(src)) u.source_urls.push(src);
  filled++;
}
writeFileSync(f, JSON.stringify(titles, null, 2) + '\n');
console.log(`specials viewership: ${filled} unit(s) filled`);
for (const s of skipped) console.log('  skipped', s);
