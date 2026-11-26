// Usage: tsx scripts/fetch/credits.ts [universe…]
// Cast and crew from Wikidata (CC0), per title, keyed by the title's English Wikipedia article (D-29).
// Cast keeps Wikidata's statement order (usually billing order) and the "character role" qualifier (P453).
// Caches to data/sources/wikidata/credits-<universe>.json; scripts/migrations/*-credits.ts writes them into titles.
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { getJson, politePause } from './http.ts';
import { SOURCES_DIR } from './mediawiki.ts';

const API = 'https://www.wikidata.org/w/api.php';
/** Wikidata property → credit role stored in the data. */
export const ROLES = {
  P50: 'author', P161: 'cast', P57: 'director', P58: 'writer', P162: 'producer', P1431: 'executive-producer', P86: 'composer', P170: 'creator',
} as const;
export type Role = (typeof ROLES)[keyof typeof ROLES];
export interface CreditPerson { qid: string; character_qids: string[]; character_text: string | null }
export interface TitleCredits { enwiki: string; qid: string | null; roles: Partial<Record<Role, CreditPerson[]>> }

/* eslint-disable @typescript-eslint/no-explicit-any */
const vals = (e: any, pid: string): any[] => (e.claims?.[pid] ?? []).filter((c: any) => c.rank !== 'deprecated' && c.mainsnak?.datavalue);

async function fetchCredits(enwikis: string[]): Promise<TitleCredits[]> {
  const out: TitleCredits[] = [];
  for (let i = 0; i < enwikis.length; i += 50) {
    const chunk = enwikis.slice(i, i + 50);
    const q = new URLSearchParams({ action: 'wbgetentities', sites: 'enwiki', titles: chunk.join('|'), props: 'claims|sitelinks', sitefilter: 'enwiki', redirects: 'yes', format: 'json' });
    const j: any = await getJson(`${API}?${q}`);
    const bySite = new Map<string, any>();
    for (const e of Object.values<any>(j.entities ?? {})) if (e.sitelinks?.enwiki?.title) bySite.set(e.sitelinks.enwiki.title.replace(/_/g, ' '), e);
    for (const t of chunk) {
      const e = bySite.get(t.replace(/_/g, ' '));
      if (!e) { out.push({ enwiki: t, qid: null, roles: {} }); continue; }
      const roles: TitleCredits['roles'] = {};
      for (const [pid, role] of Object.entries(ROLES)) {
        const people = vals(e, pid).map((c: any) => ({
          qid: c.mainsnak.datavalue.value.id as string,
          character_qids: (c.qualifiers?.P453 ?? []).map((x: any) => x.datavalue?.value?.id).filter(Boolean),
          character_text: c.qualifiers?.P4633?.[0]?.datavalue?.value ?? null, // "name of the character role"
        })).filter((p: CreditPerson) => p.qid);
        if (people.length) roles[role] = people;
      }
      out.push({ enwiki: t, qid: e.id, roles });
    }
    await politePause(1000);
  }
  return out;
}

/** English labels for people and characters. */
async function fetchLabels(qids: string[]): Promise<Record<string, string>> {
  const labels: Record<string, string> = {};
  for (let i = 0; i < qids.length; i += 50) {
    const q = new URLSearchParams({ action: 'wbgetentities', ids: qids.slice(i, i + 50).join('|'), props: 'labels', languages: 'en', languagefallback: '1', format: 'json' });
    const j: any = await getJson(`${API}?${q}`);
    for (const [id, e] of Object.entries<any>(j.entities ?? {})) if (e.labels?.en?.value) labels[id] = e.labels.en.value;
    await politePause(700);
  }
  return labels;
}

const dataDirs = (await readdir('data', { withFileTypes: true })).filter((d) => d.isDirectory() && !['sources', 'candidates', 'registry'].includes(d.name)).map((d) => d.name);
const universes = process.argv.slice(2).length ? process.argv.slice(2) : dataDirs;
for (const u of universes) {
  const titles = JSON.parse(await readFile(`data/${u}/titles.json`, 'utf8')) as { external_ids: { enwiki: string | null } }[];
  // An article shared by several titles (a list or franchise page) does not describe any one of them: skip it.
  const count = new Map<string, number>();
  for (const t of titles) if (t.external_ids.enwiki) count.set(t.external_ids.enwiki, (count.get(t.external_ids.enwiki) ?? 0) + 1);
  const enwikis = [...count].filter(([, n]) => n === 1).map(([w]) => w);
  const credits = await fetchCredits(enwikis);
  const qids = [...new Set(credits.flatMap((c) => Object.values(c.roles).flat().flatMap((p) => [p!.qid, ...p!.character_qids])))];
  const labels = await fetchLabels(qids);
  const dir = path.join(SOURCES_DIR, 'wikidata');
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, `credits-${u}.json`), JSON.stringify({ fetched_at: new Date().toISOString(), license: 'CC0', credits, labels }, null, 1) + '\n', 'utf8');
  console.log(`${u}: ${credits.filter((c) => Object.keys(c.roles).length).length}/${enwikis.length} titles with credits, ${qids.length} people/characters`);
}
