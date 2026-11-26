// Build DC candidate rows from cached sources -> data/candidates/dc.json (machine output, not canonical).
import { mkdir, writeFile } from 'node:fs/promises';
import { readManifest } from '../fetch/mediawiki.ts';
import { extractFirstCellTable, extractFilmOverview, extractInfobox, extractRowHeaderTable, extractSeriesOverview, loadWikitext, type ReleaseRow } from './extract.ts';

const OVERVIEW_PAGES = ['DC Universe (franchise)', 'DC Extended Universe', 'Arrowverse', 'DC Animated Universe'];
const TABLE_PAGES = ['Superman in film'];
const SERIES_PAGES: [string, string][] = [
  ['Smallville', 'Smallville'], ['Gotham (TV series)', 'Gotham (TV series)'], ['Titans (2018 TV series)', 'Titans (2018 TV series)'],
  ['Doom Patrol (TV series)', 'Doom Patrol (TV series)'], ['Stargirl (TV series)', 'Stargirl (TV series)'], ['Superman & Lois', 'Superman & Lois'],
  ['Peacemaker (TV series)', 'Peacemaker (TV series)'], ['Creature Commandos (TV series)', 'Creature Commandos (TV series)'],
  ['The Penguin (TV series)', 'The Penguin (TV series)'], ['Black Lightning (TV series)', 'Black Lightning (TV series)'], ['Batwoman (TV series)', 'Batwoman (TV series)'],
  ['Legends of Tomorrow', 'Legends of Tomorrow'], ['The Flash (2014 TV series)', 'The Flash (2014 TV series)'], ['Arrow (TV series)', 'Arrow (TV series)'],
  ['Supergirl (TV series)', 'Supergirl (TV series)'], ['Batman: The Animated Series', 'Batman: The Animated Series'], ['Justice League Unlimited', 'Justice League Unlimited'],
];
const FILM_INFOBOX = ['The Batman (film)', 'The Batman: Part II', 'Joker (2019 film)', 'Joker: Folie à Deux', 'Superman (2025 film)', 'Clayface (film)', 'Lanterns (TV series)'];

export async function buildDcCandidates() {
  const releases: ReleaseRow[] = [];
  for (const page of OVERVIEW_PAGES) {
    const src = await loadWikitext(page);
    releases.push(...extractFilmOverview(src, page), ...extractSeriesOverview(src, page));
  }
  for (const page of TABLE_PAGES) {
    releases.push(...extractRowHeaderTable(await loadWikitext(page), page, 'film').filter((r) => r.start));
  }
  releases.push(...extractFirstCellTable(await loadWikitext('DC Animated Movie Universe'), /^== Films ==/, 'DC Animated Movie Universe'));
  for (const [page, list] of [['Smallville', 'List of Smallville episodes'], ['Gotham (TV series)', 'List of Gotham episodes']] as const) {
    releases.push(...extractSeriesOverview(await loadWikitext(list), list, page));
  }
  for (const [page, series] of SERIES_PAGES.filter(([p]) => !['Smallville', 'Gotham (TV series)'].includes(p))) {
    const src = await loadWikitext(page);
    const rows = extractSeriesOverview(src, page, series);
    if (rows.length) releases.push(...rows);
    else {
      const ib = extractInfobox(src);
      releases.push({ source_page: page, kind: 'season', title: series, link: series, season: 1, episodes: ib.num_episodes ? Number(ib.num_episodes) : null, start: ib.first_aired ?? ib.released ?? null, end: ib.last_aired ?? null, status_text: 'infobox (series-level)' });
    }
  }
  for (const page of FILM_INFOBOX) {
    const ib = extractInfobox(await loadWikitext(page));
    releases.push({ source_page: page, kind: page.includes('TV series') ? 'season' : 'film', title: page.replace(/ \((film|TV series)\)$/, ''), link: page, start: ib.released ?? ib.first_aired ?? null, status_text: 'infobox' });
  }
  const manifest = await readManifest();
  return {
    generated_at: new Date().toISOString(),
    note: 'Machine-extracted DC candidates. Not curated.',
    source_revisions: Object.fromEntries(manifest.filter((m) => [...OVERVIEW_PAGES, ...TABLE_PAGES, ...SERIES_PAGES.map((s) => s[0]), ...FILM_INFOBOX].includes(m.resolved_title)).map((m) => [m.resolved_title, m.revid])),
    releases,
  };
}

if (process.argv[1]?.replace(/\\/g, '/').endsWith('scripts/build/dc.ts')) {
  const c = await buildDcCandidates();
  await mkdir('data/candidates', { recursive: true });
  await writeFile('data/candidates/dc.json', JSON.stringify(c, null, 2) + '\n', 'utf8');
  console.log(`releases: ${c.releases.length}`);
}
