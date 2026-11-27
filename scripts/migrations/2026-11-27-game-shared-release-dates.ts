// D-66: games whose infobox gave one date for several platforms. Only dates the article TEXT ties to named
// platforms are recorded (data/sources/game-releases-shared.json, each with its quote); games the text does
// not resolve stay empty. Idempotent: only fills units that have no per-platform releases yet.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';

const results = JSON.parse(readFileSync('data/sources/game-releases-shared.json', 'utf8')) as Record<string, {
  source_url: string; releases: { platform: string | null; platform_name: string; date: string; region: string | null; quote: string }[];
  shared_date_note: string | null; unresolved: string | null;
}>;
const known = new Set(JSON.parse(readFileSync('data/registry/platforms.json', 'utf8')).map((p: { id: string }) => p.id));
let filled = 0, entries = 0;
for (const d of readdirSync('data')) {
  const f = `data/${d}/titles.json`;
  if (!existsSync(f)) continue;
  const titles = JSON.parse(readFileSync(f, 'utf8'));
  let dirty = false;
  for (const t of titles) {
    const r = results[t.id];
    if (!r) continue;
    const rel = r.releases.filter((x) => x.platform && known.has(x.platform) && /^\d{4}(-\d{2}(-\d{2})?)?$/.test(x.date));
    const u = t.units[0];
    if (!u || !rel.length || (u.platform_releases ?? []).length) continue;
    u.platform_releases = rel.map((x) => ({ platform: x.platform!, date: x.date, region: x.region, source_url: r.source_url }));
    if (!u.source_urls.includes(r.source_url)) u.source_urls.push(r.source_url);
    if (r.shared_date_note && !String(u.release.note).includes(r.shared_date_note)) u.release.note = `${u.release.note} ${r.shared_date_note}.`.trim();
    filled++; entries += rel.length; dirty = true;
  }
  if (dirty) writeFileSync(f, JSON.stringify(titles, null, 2) + '\n');
}
console.log(`shared release dates: ${filled} game(s), ${entries} platform entries`);
