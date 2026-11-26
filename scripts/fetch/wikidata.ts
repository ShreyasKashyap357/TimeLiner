// Wikidata lookups by English Wikipedia article title (no API key needed).
// Caches results to data/sources/wikidata/<universe>.json
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { getJson, politePause } from './http.ts';
import { SOURCES_DIR } from './mediawiki.ts';

export interface WikidataFacts {
  enwiki: string;
  qid: string | null;
  label: string | null;
  publication_dates: { date: string; precision: number; place: string[] }[]; // P577 (+P291 place qids)
  duration_min: number | null; // P2047
  episodes: number | null; // P1113
  seasons: number | null; // P2437
  tmdb_movie: string | null; // P4947
  tmdb_tv: string | null; // P4983
  imdb: string | null; // P345
  pages: number | null; // P1104 (books)
}

const API = 'https://www.wikidata.org/w/api.php';

function claimValues(entity: any, pid: string): any[] {
  return (entity.claims?.[pid] ?? []).filter((c: any) => c.rank !== 'deprecated');
}

function timeToIso(t: { time: string; precision: number }): string {
  // "+2008-05-02T00:00:00Z", precision 11=day, 10=month, 9=year
  const m = /^([+-]\d+)-(\d\d)-(\d\d)/.exec(t.time)!;
  const y = String(Number(m[1]));
  if (t.precision <= 9) return y;
  if (t.precision === 10) return `${y}-${m[2]}`;
  return `${y}-${m[2]}-${m[3]}`;
}

export async function lookupByEnwiki(titles: string[]): Promise<WikidataFacts[]> {
  const out: WikidataFacts[] = [];
  for (let i = 0; i < titles.length; i += 50) {
    const chunk = titles.slice(i, i + 50);
    const q = new URLSearchParams({
      action: 'wbgetentities', sites: 'enwiki', titles: chunk.join('|'), props: 'claims|sitelinks|labels',
      languages: 'en', sitefilter: 'enwiki', redirects: 'yes', format: 'json',
    });
    const j: any = await getJson(`${API}?${q}`);
    const bySite = new Map<string, any>();
    for (const e of Object.values<any>(j.entities ?? {})) {
      if (e.sitelinks?.enwiki?.title) bySite.set(e.sitelinks.enwiki.title, e);
    }
    for (const t of chunk) {
      const e = bySite.get(t) ?? [...bySite.values()].find((x) => x.sitelinks.enwiki.title.replace(/_/g, ' ') === t.replace(/_/g, ' '));
      if (!e) { out.push({ enwiki: t, qid: null, label: null, publication_dates: [], duration_min: null, episodes: null, seasons: null, tmdb_movie: null, tmdb_tv: null, imdb: null, pages: null }); continue; }
      const dur = claimValues(e, 'P2047')[0]?.mainsnak?.datavalue?.value;
      const num = (pid: string) => {
        const v = claimValues(e, pid)[0]?.mainsnak?.datavalue?.value;
        return v ? Number(v.amount) : null;
      };
      const str = (pid: string) => claimValues(e, pid)[0]?.mainsnak?.datavalue?.value ?? null;
      out.push({
        enwiki: t,
        qid: e.id,
        label: e.labels?.en?.value ?? null,
        publication_dates: claimValues(e, 'P577')
          .filter((c: any) => c.mainsnak?.datavalue)
          .map((c: any) => ({
            date: timeToIso(c.mainsnak.datavalue.value),
            precision: c.mainsnak.datavalue.value.precision,
            place: (c.qualifiers?.P291 ?? []).map((p: any) => p.datavalue?.value?.id).filter(Boolean),
          })),
        duration_min: dur && /Q7727$/.test(dur.unit) ? Number(dur.amount) : dur && /Q25235$/.test(dur.unit) ? Number(dur.amount) * 60 : null,
        episodes: num('P1113'),
        seasons: num('P2437'),
        tmdb_movie: str('P4947'),
        tmdb_tv: str('P4983'),
        imdb: str('P345'),
        pages: num('P1104'),
      });
    }
    await politePause(1000);
  }
  return out;
}

export async function cacheWikidata(universe: string, titles: string[]) {
  const facts = await lookupByEnwiki([...new Set(titles)]);
  const dir = path.join(SOURCES_DIR, 'wikidata');
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, `${universe}.json`);
  await writeFile(file, JSON.stringify({ fetched_at: new Date().toISOString(), license: 'CC0', facts }, null, 2) + '\n', 'utf8');
  return facts;
}

export async function readWikidata(universe: string): Promise<WikidataFacts[]> {
  try {
    return JSON.parse(await readFile(path.join(SOURCES_DIR, 'wikidata', `${universe}.json`), 'utf8')).facts;
  } catch {
    return [];
  }
}
