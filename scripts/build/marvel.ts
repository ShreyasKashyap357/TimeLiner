// Build Marvel candidate rows from cached sources -> data/candidates/marvel.json
// Candidates are NOT the curated dataset; they feed curation and the drift report.
import { mkdir, writeFile } from 'node:fs/promises';
import { readManifest } from '../fetch/mediawiki.ts';
import {
  extractFilmOverview, extractNumberedList, extractRowHeaderTable, extractSeriesOverview,
  extractLabelledRows, extractTimelineRows, loadWikitext, type ReleaseRow,
} from './extract.ts';

const PHASE_PAGES: Record<string, string> = {
  'Marvel Cinematic Universe: Phase One': 'phase-1',
  'Marvel Cinematic Universe: Phase Two': 'phase-2',
  'Marvel Cinematic Universe: Phase Three': 'phase-3',
  'Marvel Cinematic Universe: Phase Four': 'phase-4',
  'Marvel Cinematic Universe: Phase Five': 'phase-5',
  'Marvel Cinematic Universe: Phase Six': 'phase-6',
};

export async function buildMarvelCandidates() {
  const releases: (ReleaseRow & { phase?: string })[] = [];

  for (const [page, phase] of Object.entries(PHASE_PAGES)) {
    const src = await loadWikitext(page);
    for (const r of [
      ...extractFilmOverview(src, page),
      ...extractSeriesOverview(src, page),
      ...extractRowHeaderTable(src, page, 'special', 'TVSpecials'),
    ]) releases.push({ ...r, phase });
  }
  // Phase Seven films live on the film list page
  const filmList = await loadWikitext('List of Marvel Cinematic Universe films');
  for (const r of extractFilmOverview(filmList, 'List of Marvel Cinematic Universe films')) {
    if (!releases.some((x) => x.kind === 'film' && x.link === r.link)) releases.push({ ...r, phase: 'phase-7' });
  }
  const tvList = await loadWikitext('List of Marvel Cinematic Universe television series (Marvel Studios)');
  for (const r of extractSeriesOverview(tvList, 'List of Marvel Cinematic Universe television series (Marvel Studios)')) {
    if (!releases.some((x) => x.kind === 'season' && x.link === r.link && x.season === r.season)) releases.push(r);
  }
  for (const page of ["Marvel's Netflix television series", "Marvel's ABC television series", "Marvel's young adult television series"]) {
    releases.push(...extractSeriesOverview(await loadWikitext(page), page));
  }
  for (const page of ['X-Men (film series)']) {
    const src = await loadWikitext(page);
    releases.push(...extractFilmOverview(src, page), ...extractSeriesOverview(src, page));
  }
  releases.push(...extractSeriesOverview(await loadWikitext("X-Men '97"), "X-Men '97", "X-Men '97"));
  releases.push(...extractSeriesOverview(await loadWikitext('List of X-Men: The Animated Series episodes'), 'List of X-Men: The Animated Series episodes', 'X-Men: The Animated Series'));
  releases.push(...extractSeriesOverview(await loadWikitext('I Am Groot'), 'I Am Groot', 'I Am Groot'));
  releases.push(...extractSeriesOverview(await loadWikitext('Daredevil: Born Again'), 'Daredevil: Born Again', 'Daredevil: Born Again'));
  releases.push(...extractSeriesOverview(await loadWikitext('Loki (TV series)'), 'Loki (TV series)', 'Loki (TV series)'));
  releases.push(...extractSeriesOverview(await loadWikitext('What If...? (TV series)'), 'What If...? (TV series)', 'What If...? (TV series)'));

  const tl = await loadWikitext('Marvel Cinematic Universe timeline');
  const timeline = extractTimelineRows(tl, /^Marvel Cinematic Universe timeline\/row$/);
  const disneyOrder = extractNumberedList(tl, /Disney\+ timeline/);
  // Keep raw (unstripped) text: the book table's HTML comments carry page/scene notes.
  const officialTimelineBook = extractLabelledRows(tl, /An Official Timeline/);
  const manifest = await readManifest();

  return {
    generated_at: new Date().toISOString(),
    note: 'Machine-extracted candidates. Not curated. See data/marvel/*.json for the dataset.',
    source_revisions: Object.fromEntries(manifest.map((m) => [m.resolved_title, m.revid])),
    releases,
    timeline,
    disney_plus_order: disneyOrder,
    official_timeline_book: officialTimelineBook,
  };
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}` || process.argv[1]?.endsWith('marvel.ts')) {
  const c = await buildMarvelCandidates();
  await mkdir('data/candidates', { recursive: true });
  await writeFile('data/candidates/marvel.json', JSON.stringify(c, null, 2) + '\n', 'utf8');
  console.log(`releases: ${c.releases.length}, timeline rows: ${c.timeline.length}, disney+ order: ${c.disney_plus_order.length}`);
}
