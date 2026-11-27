// Usage: tsx scripts/fetch/game-releases.ts [--offline]
// Per-platform first release dates for every game (title.type video-game | expansion), from the English Wikipedia
// infobox `| released =` field at a recorded revision (R-52). Caches to data/sources/game-releases.json keyed by
// title id: article, revid, the raw infobox fields (so the parse can be audited and re-run with --offline) and the
// parsed per-platform list (earliest date per platform across regions, with that region).
// scripts/migrations/2026-11-27-game-platform-releases.ts writes the parsed lists into units.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { getJson, politePause } from './http.ts';
import { SOURCES_DIR } from './mediawiki.ts';
import { parseReleased, type PlatformRelease } from './game-releases-parse.ts';

export const CACHE_FILE = path.join(SOURCES_DIR, 'game-releases.json');
const API = 'https://en.wikipedia.org/w/api.php';

export interface GameReleaseEntry {
  universe: string;
  article: string | null;
  revid: number | null;
  /** Permanent link to the revision the dates come from. */
  source_url: string | null;
  fetched_at: string | null;
  /** Raw infobox fields, kept for auditing the parse. */
  released_wikitext: string | null;
  platforms_wikitext: string | null;
  releases: PlatformRelease[];
  /** Why nothing (or only part) could be used, e.g. "no per-platform detail". */
  problems: string[];
}
export type GameReleaseCache = Record<string, GameReleaseEntry>;

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Extract one top-level parameter of the first `{{Infobox video game…}}` (brace/bracket-depth aware). */
export function infoboxParam(wikitext: string, names: string[]): string | null {
  const start = wikitext.search(/\{\{\s*Infobox[ _]video[ _]game/i);
  if (start < 0) return null;
  // Walk the template, splitting on depth-1 pipes.
  let depth = 0, i = start, cur = '';
  const parts: string[] = [];
  for (; i < wikitext.length; i++) {
    const two = wikitext.slice(i, i + 2);
    if (two === '{{' || two === '[[') { depth++; cur += two; i++; continue; }
    if (two === '}}' || two === ']]') {
      depth--; if (depth === 0) { parts.push(cur); break; }
      cur += two; i++; continue;
    }
    if (wikitext[i] === '|' && depth === 1) { parts.push(cur); cur = ''; continue; }
    cur += wikitext[i];
  }
  for (const p of parts.slice(1)) {
    const m = /^\s*([^=]+?)\s*=([\s\S]*)$/.exec(p);
    if (m && names.includes(m[1]!.toLowerCase())) return m[2]!.replace(/<!--[\s\S]*?-->/g, '').trim() || null;
  }
  return null;
}

async function listGames(): Promise<{ id: string; universe: string; enwiki: string | null; oldid: number | null }[]> {
  const out = [];
  for (const d of await readdir('data', { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    let titles: any[];
    try { titles = JSON.parse(await readFile(path.join('data', d.name, 'titles.json'), 'utf8')); } catch { continue; }
    for (const t of titles) {
      if (t.type !== 'video-game' && t.type !== 'expansion') continue;
      const enwiki = t.external_ids?.enwiki ?? null;
      // Without an article title, fall back to a cited en.wikipedia permanent link.
      const oldidUrl = enwiki ? null : (t.source_urls as string[]).find((u) => /en\.wikipedia\.org\/w\/index\.php\?.*oldid=\d+/.test(u));
      out.push({ id: t.id, universe: d.name, enwiki, oldid: oldidUrl ? Number(/oldid=(\d+)/.exec(oldidUrl)![1]) : null });
    }
  }
  return out;
}

async function fetchLatest(titles: string[]): Promise<Map<string, { title: string; revid: number; content: string }>> {
  const out = new Map<string, { title: string; revid: number; content: string }>();
  for (let i = 0; i < titles.length; i += 50) {
    const chunk = titles.slice(i, i + 50);
    const q = new URLSearchParams({
      action: 'query', prop: 'revisions', rvprop: 'ids|content', rvslots: 'main', titles: chunk.join('|'),
      redirects: '1', format: 'json', formatversion: '2',
    });
    const j: any = await getJson(`${API}?${q}`);
    const alias = new Map<string, string>();
    for (const n of j.query?.normalized ?? []) alias.set(n.from, n.to);
    for (const r of j.query?.redirects ?? []) alias.set(r.from, r.to);
    const pages = new Map<string, any>();
    for (const p of j.query?.pages ?? []) pages.set(p.title, p);
    for (const t of chunk) {
      let k = t;
      for (let n = 0; n < 3 && alias.has(k); n++) k = alias.get(k)!;
      const p = pages.get(k);
      const rev = p?.revisions?.[0];
      if (rev) out.set(t, { title: p.title, revid: rev.revid, content: rev.slots.main.content });
    }
    await politePause(1000);
  }
  return out;
}

async function fetchOldid(oldid: number): Promise<{ title: string; revid: number; content: string } | null> {
  const q = new URLSearchParams({ action: 'query', prop: 'revisions', rvprop: 'ids|content', rvslots: 'main', revids: String(oldid), format: 'json', formatversion: '2' });
  const j: any = await getJson(`${API}?${q}`);
  const p = j.query?.pages?.[0];
  const rev = p?.revisions?.[0];
  await politePause(1000);
  return rev ? { title: p.title, revid: rev.revid, content: rev.slots.main.content } : null;
}

const permalink = (title: string, revid: number) =>
  `https://en.wikipedia.org/w/index.php?title=${encodeURIComponent(title.replace(/ /g, '_'))}&oldid=${revid}`;

export function parseEntry(e: GameReleaseEntry): void {
  e.problems = [];
  e.releases = [];
  if (!e.article) { e.problems.push('no English Wikipedia article'); return; }
  if (!e.released_wikitext) { e.problems.push('infobox has no released field'); return; }
  const r = parseReleased(e.released_wikitext, e.platforms_wikitext, e.source_url!);
  e.releases = r.releases;
  e.problems = r.problems;
}

async function main() {
  const offline = process.argv.includes('--offline');
  let cache: GameReleaseCache = {};
  try { cache = JSON.parse(await readFile(CACHE_FILE, 'utf8')); } catch { /* first run */ }
  const games = await listGames();
  if (!offline) {
    const latest = await fetchLatest(games.filter((g) => g.enwiki).map((g) => g.enwiki!));
    for (const g of games) {
      const page = g.enwiki ? latest.get(g.enwiki) ?? null : g.oldid ? await fetchOldid(g.oldid) : null;
      cache[g.id] = {
        universe: g.universe,
        article: page?.title ?? null,
        revid: page?.revid ?? null,
        source_url: page ? permalink(page.title, page.revid) : null,
        fetched_at: page ? new Date().toISOString() : null,
        released_wikitext: page ? infoboxParam(page.content, ['released', 'release', 'release date', 'released_date']) : null,
        platforms_wikitext: page ? infoboxParam(page.content, ['platforms', 'platform']) : null,
        releases: [],
        problems: [],
      };
    }
  }
  for (const e of Object.values(cache)) parseEntry(e);
  const sorted: GameReleaseCache = {};
  for (const k of Object.keys(cache).sort()) sorted[k] = cache[k]!;
  await writeFile(CACHE_FILE, JSON.stringify(sorted, null, 2) + '\n', 'utf8');
  const withData = Object.values(sorted).filter((e) => e.releases.length);
  console.log(`${Object.keys(sorted).length} games; ${withData.length} with per-platform dates; ${withData.reduce((n, e) => n + e.releases.length, 0)} entries`);
  for (const [id, e] of Object.entries(sorted)) if (e.problems.length) console.log(`  ${id}: ${e.problems.join('; ')}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) await main();
