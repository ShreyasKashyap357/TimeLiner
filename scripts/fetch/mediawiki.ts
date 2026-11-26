// Fetch a page from any MediaWiki (Wikipedia, Fandom) and cache wikitext + rendered HTML
// to data/sources/<site>/<slug>.{wikitext,html} with a manifest entry recording the revision.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { getJson, politePause } from './http.ts';

export interface MediaWikiSite {
  id: string; // folder name, e.g. "wikipedia"
  api: string; // e.g. https://en.wikipedia.org/w/api.php
  pageBase: string; // e.g. https://en.wikipedia.org/wiki/
  license: string;
}

export const WIKIPEDIA: MediaWikiSite = {
  id: 'wikipedia',
  api: 'https://en.wikipedia.org/w/api.php',
  pageBase: 'https://en.wikipedia.org/wiki/',
  license: 'CC BY-SA 4.0',
};

export const MCU_FANDOM: MediaWikiSite = {
  id: 'fandom-mcu',
  api: 'https://marvelcinematicuniverse.fandom.com/api.php',
  pageBase: 'https://marvelcinematicuniverse.fandom.com/wiki/',
  license: 'CC BY-SA 3.0',
};

export interface ManifestEntry {
  site: string;
  requested_title: string;
  resolved_title: string;
  url: string;
  revid: number;
  fetched_at: string;
  license: string;
  files: { wikitext: string; html: string };
}

export const SOURCES_DIR = path.resolve('data/sources');

export function slugify(title: string): string {
  return title
    .normalize('NFKD')
    .replace(/[^\w\s()-]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 120);
}

interface ParseResponse {
  parse?: { title: string; revid: number; wikitext?: string; text?: string };
  error?: { code: string; info: string };
}

export async function fetchPage(site: MediaWikiSite, title: string): Promise<ManifestEntry> {
  const q = new URLSearchParams({
    action: 'parse',
    page: title,
    prop: 'wikitext|text|revid',
    redirects: '1',
    format: 'json',
    formatversion: '2',
    disableeditsection: '1',
    disablelimitreport: '1',
  });
  const data = await getJson<ParseResponse>(`${site.api}?${q}`);
  if (!data.parse) throw new Error(`${site.id}: "${title}" -> ${data.error?.code}: ${data.error?.info}`);
  const p = data.parse;
  const dir = path.join(SOURCES_DIR, site.id);
  await mkdir(dir, { recursive: true });
  const slug = slugify(p.title);
  const wikitextFile = `${slug}.wikitext`;
  const htmlFile = `${slug}.html`;
  await writeFile(path.join(dir, wikitextFile), p.wikitext ?? '', 'utf8');
  await writeFile(path.join(dir, htmlFile), p.text ?? '', 'utf8');
  await politePause();
  return {
    site: site.id,
    requested_title: title,
    resolved_title: p.title,
    url: site.pageBase + encodeURIComponent(p.title.replace(/ /g, '_')),
    revid: p.revid,
    fetched_at: new Date().toISOString(),
    license: site.license,
    files: { wikitext: `${site.id}/${wikitextFile}`, html: `${site.id}/${htmlFile}` },
  };
}

export async function readManifest(): Promise<ManifestEntry[]> {
  try {
    return JSON.parse(await readFile(path.join(SOURCES_DIR, 'manifest.json'), 'utf8'));
  } catch {
    return [];
  }
}

export async function writeManifest(entries: ManifestEntry[]) {
  entries.sort((a, b) => (a.site + a.resolved_title).localeCompare(b.site + b.resolved_title));
  await writeFile(path.join(SOURCES_DIR, 'manifest.json'), JSON.stringify(entries, null, 2) + '\n', 'utf8');
}
