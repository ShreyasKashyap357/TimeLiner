// Usage: tsx scripts/fetch/film-stats.ts [universe…]
// R-56: runtime, budget and box office for every film (types film, animated-film, re-edit), each cited.
// Wikidata first (P2047 duration, P2130 cost, P2142 box office; CC0), English Wikipedia infobox as fallback
// (`| runtime =`, `| budget =`, `| gross =`; CC BY-SA, permalinks with revids). Writes data/sources/film-stats.json,
// keyed by unit id; scripts/migrations/2026-11-27-film-stats.ts applies it to titles.json.
// Selection rules are recorded in data/DATA_NOTES.md ("Film stats").
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { getJson, politePause } from './http.ts';
import { SOURCES_DIR, WIKIPEDIA } from './mediawiki.ts';
import {
  cleanWikitext, grossScope, notGross, infoboxField, latestFirst, parseMoneyAll, parseRuntime, UNITED_STATES, wdMoney, wdQuantities, wdRuntime, WORLDWIDE,
  type ParsedMoney, type Scope, type WdQuantity,
} from './film-stats-parse.ts';

export const FILM_TYPES = ['film', 'animated-film', 're-edit'];
const WD_API = 'https://www.wikidata.org/w/api.php';

interface Money extends ParsedMoney { scope: Scope; source_url: string }
export interface FilmStatsEntry {
  title_id: string; universe: string; wikidata: string | null; enwiki: string | null;
  wikidata_revid: number | null; wikipedia_revid: number | null;
  /** Raw values as each source has them, for audit. */
  raw: { wd_runtime: number[]; wd_budget: (WdQuantity & { iso: string | null })[]; wd_box_office: (WdQuantity & { iso: string | null })[]; wp_runtime: string | null; wp_budget: string | null; wp_gross: string | null };
  runtime_min: number | null; runtime_source: string | null;
  /** Every runtime a source states (each Wikidata value, the infobox's first), so an existing value can still be cited. */
  runtime_alternatives: { min: number; source_url: string }[]; budget: Money | null; box_office: Money | null;
  notes: string[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const dataDirs = (await readdir('data', { withFileTypes: true })).filter((d) => d.isDirectory() && !['sources', 'candidates', 'registry'].includes(d.name)).map((d) => d.name);
const universes = process.argv.slice(2).length ? process.argv.slice(2) : dataDirs;

interface Film { unit: string; title: string; universe: string; qid: string | null; enwiki: string | null }
const MIN_AMOUNT = 1000; // smaller money figures are unit slips in the source (e.g. 7.386 for 7.386 million): not used
const films: Film[] = [];
const skipped: string[] = [];
for (const u of universes) {
  const titles = JSON.parse(await readFile(`data/${u}/titles.json`, 'utf8')) as any[];
  for (const t of titles) {
    if (!FILM_TYPES.includes(t.type)) continue;
    // A title's Wikidata item and article describe the whole work; a multi-part film gets nothing rather than a
    // whole-work figure pinned on one part.
    if (t.units.length !== 1) { skipped.push(`${t.id}: ${t.units.length} parts`); continue; }
    // Unreleased films: budgets are press estimates and articles may still be franchise pages.
    if (t.units[0].status !== 'released') continue;
    films.push({ unit: t.units[0].id, title: t.id, universe: u, qid: t.external_ids.wikidata, enwiki: t.external_ids.enwiki });
  }
}
// An item or article shared by several films (an anthology page, a re-edit described on the original's page) describes none of them alone.
const shared = (k: (f: Film) => string | null) => { const c = new Map<string, number>(); for (const f of films) { const v = k(f); if (v) c.set(v, (c.get(v) ?? 0) + 1); } return c; };
const qidCount = shared((f) => f.qid), wikiCount = shared((f) => f.enwiki);

// ---- Wikidata entities ----
const entities = new Map<string, any>();
const qids = [...new Set(films.map((f) => f.qid).filter((q): q is string => !!q))];
for (let i = 0; i < qids.length; i += 50) {
  const q = new URLSearchParams({ action: 'wbgetentities', ids: qids.slice(i, i + 50).join('|'), props: 'claims|info', format: 'json' });
  const j: any = await getJson(`${WD_API}?${q}`);
  for (const [id, e] of Object.entries<any>(j.entities ?? {})) entities.set(id, e);
  await politePause(1000);
}
// Currency items → ISO 4217 code (P498).
const currencyItems = new Set<string>();
for (const e of entities.values()) for (const p of ['P2130', 'P2142']) for (const q of wdQuantities(e, p)) currencyItems.add(q.unit);
const iso = new Map<string, string>();
const cur = [...currencyItems].filter((c) => /^Q\d+$/.test(c));
for (let i = 0; i < cur.length; i += 50) {
  const q = new URLSearchParams({ action: 'wbgetentities', ids: cur.slice(i, i + 50).join('|'), props: 'claims', format: 'json' });
  const j: any = await getJson(`${WD_API}?${q}`);
  for (const [id, e] of Object.entries<any>(j.entities ?? {})) {
    const code = e.claims?.P498?.find((c: any) => c.rank !== 'deprecated')?.mainsnak?.datavalue?.value;
    if (code) iso.set(id, code);
  }
  await politePause(1000);
}

// ---- Wikipedia infobox wikitext (lead section is enough; batched, with revids) ----
const wiki = new Map<string, { revid: number; title: string; text: string }>();
const articles = [...new Set(films.map((f) => f.enwiki).filter((w): w is string => !!w))];
for (let i = 0; i < articles.length; i += 20) {
  const chunk = articles.slice(i, i + 20);
  let cont: Record<string, string> = {};
  for (;;) {
    const q = new URLSearchParams({ action: 'query', prop: 'revisions', rvprop: 'ids|content', rvslots: 'main', titles: chunk.join('|'), redirects: '1', format: 'json', formatversion: '2', ...cont });
    const j: any = await getJson(`${WIKIPEDIA.api}?${q}`);
    const back = new Map<string, string>();
    for (const n of j.query?.normalized ?? []) back.set(n.to, n.from);
    for (const r of j.query?.redirects ?? []) back.set(r.to, back.get(r.from) ?? r.from);
    for (const p of j.query?.pages ?? []) {
      const rev = p.revisions?.[0];
      if (!rev?.slots?.main?.content) continue;
      const text = rev.slots.main.content.split(/\n==[^=]/)[0];
      const req = back.get(p.title) ?? p.title;
      wiki.set(req, { revid: rev.revid, title: p.title, text });
      wiki.set(p.title, { revid: rev.revid, title: p.title, text });
    }
    if (!j.continue) break;
    cont = j.continue;
    await politePause(1000);
  }
  await politePause(1500);
}
const wikiFor = (t: string) => wiki.get(t) ?? wiki.get(t.replace(/_/g, ' '));
const permalink = (title: string, revid: number) => `https://en.wikipedia.org/w/index.php?title=${encodeURIComponent(title.replace(/ /g, '_'))}&oldid=${revid}`;

// ---- Choose values ----
const out: Record<string, FilmStatsEntry> = {};
for (const f of films) {
  const notes: string[] = [];
  const e = f.qid && (qidCount.get(f.qid) ?? 0) === 1 ? entities.get(f.qid) : undefined;
  if (f.qid && !e) notes.push((qidCount.get(f.qid) ?? 0) > 1 ? 'Wikidata item shared with another film: not used.' : 'Wikidata item not found.');
  const w = f.enwiki && (wikiCount.get(f.enwiki) ?? 0) === 1 ? wikiFor(f.enwiki) : undefined;
  if (f.enwiki && !w) notes.push((wikiCount.get(f.enwiki) ?? 0) > 1 ? 'Wikipedia article shared with another film: not used.' : 'Wikipedia article not found.');
  const wdUrl = e ? `https://www.wikidata.org/w/index.php?title=${e.id}&oldid=${e.lastrevid}` : null;
  const wpUrl = w ? permalink(w.title, w.revid) : null;

  const field = (name: string) => { const v = w ? infoboxField(w.text, name) : null; return v ? cleanWikitext(v) : null; };
  const wpRuntime = field('runtime'), wpBudget = field('budget'), wpGross = field('gross') ?? field('box_office') ?? field('box office');
  const withIso = (qs: WdQuantity[]) => qs.map((q) => ({ ...q, iso: iso.get(q.unit) ?? null }));
  const wdBudget = withIso(e ? wdQuantities(e, 'P2130') : []), wdBox = withIso(e ? wdQuantities(e, 'P2142') : []);
  const rt = wdRuntime(e ? wdQuantities(e, 'P2047') : []);

  // Runtime: Wikidata when unambiguous, else the infobox's first-stated runtime.
  let runtime_min: number | null = null, runtime_source: string | null = null;
  const wpMin = wpRuntime ? parseRuntime(wpRuntime) : null;
  if (rt.value !== null) { runtime_min = rt.value; runtime_source = wdUrl; }
  else if (wpMin !== null) { runtime_min = wpMin; runtime_source = wpUrl; if (rt.candidates.length > 1) notes.push(`Wikidata lists several runtimes (${rt.candidates.join(', ')} min); used the infobox's.`); }
  else if (rt.candidates.length > 1) notes.push(`Wikidata lists several runtimes (${rt.candidates.join(', ')} min) and the infobox has none: left empty.`);

  // Budget: Wikidata (preferred rank, else one currency's statements; several differing values become their range), else infobox.
  let budget: Money | null = null;
  const wpBudgetAll = wpBudget ? parseMoneyAll(wpBudget).filter((m) => m.low >= MIN_AMOUNT) : [];
  let bq = wdBudget.filter((q) => q.iso && q.amount >= MIN_AMOUNT);
  if (wdBudget.some((q) => q.iso && q.amount < MIN_AMOUNT)) notes.push('Wikidata budget below 1,000: treated as a unit slip and not used.');
  // Currency disagreement with the article (e.g. a budget entered in the wrong currency): the article's figure wins.
  if (bq.length && wpBudgetAll[0] && !bq.some((q) => q.iso === wpBudgetAll[0]!.currency)) {
    notes.push(`Wikidata budget currency (${bq.map((q) => q.iso).join(', ')}) differs from the article's (${wpBudgetAll[0].currency}): used the article.`);
    bq = [];
  }
  const bPref = bq.filter((q) => q.rank === 'preferred');
  let bPick = bPref.length ? bPref : bq.filter((q) => q.iso === bq[0]?.iso);
  // The article states a range and Wikidata holds one end or a point inside it: keep the range rather than one number.
  const wpRange = wpBudgetAll[0]?.high ? wpBudgetAll[0] : null;
  if (wpRange && bPick.length && bPick.every((q) => q.iso === wpRange.currency && q.amount >= wpRange.low && q.amount <= wpRange.high!)) {
    notes.push(`Wikidata budget (${bPick.map((q) => q.amount).join(', ')}) lies within the article's range: used the range.`);
    bPick = [];
  }
  if (bPick.length === 1) budget = { ...wdMoney(bPick[0]!, bPick[0]!.iso!), scope: 'other', source_url: wdUrl! };
  else if (bPick.length > 1) {
    const vals = bPick.map((q) => q.amount).sort((a, b) => a - b);
    const lo = vals[0]!, hi = vals[vals.length - 1]!;
    budget = { low: lo, high: hi > lo ? hi : null, currency: bPick[0]!.iso!, text: vals.map((v) => `${v} ${bPick[0]!.iso}`).join('; '), scope: 'other', source_url: wdUrl! };
    if (hi > lo) notes.push('Wikidata gives several budget figures: shown as their range.');
  } else if (wpBudget) {
    const all = wpBudgetAll;
    if (all[0]) {
      budget = { low: all[0].low, high: all[0].high, currency: all[0].currency, text: all[0].line, scope: 'other', source_url: wpUrl! };
      if (all.length > 1) notes.push(`Infobox budget has several figures ("${wpBudget.replace(/\n/g, '; ')}"): used the first.`);
    } else notes.push(`Infobox budget not read: "${wpBudget}".`);
  }

  // Box office: Wikidata worldwide (latest) → infobox gross → Wikidata US (domestic). Wikidata figures with no
  // place qualifier are not used: for direct-to-video films they are often home-video sales.
  let box_office: Money | null = null;
  const bo = wdBox.filter((q) => q.iso && q.amount >= MIN_AMOUNT);
  const ww = bo.filter((q) => q.place === WORLDWIDE).sort(latestFirst)[0];
  const wpAll = wpGross ? parseMoneyAll(wpGross).filter((m) => m.low >= MIN_AMOUNT && !notGross(m.line)) : [];
  if (wpGross && notGross(wpGross)) notes.push(`Infobox gross includes rentals, video sales or admissions ("${wpGross.replace(/\n/g, '; ')}"): those lines not used.`);
  const wpPick = wpAll.find((m) => grossScope(m.line) === 'worldwide') ?? null;
  const us = bo.filter((q) => q.place === UNITED_STATES).sort(latestFirst)[0];
  if (ww) box_office = { ...wdMoney(ww, ww.iso!), scope: 'worldwide', source_url: wdUrl! };
  else if (wpPick) {
    box_office = { low: wpPick.low, high: wpPick.high, currency: wpPick.currency, text: wpPick.line, scope: 'worldwide', source_url: wpUrl! };
    if (wpAll.length > 1) notes.push(`Infobox gross has several figures ("${wpGross!.replace(/\n/g, '; ')}"): used the worldwide one.`);
  } else if (wpAll[0]) {
    box_office = { low: wpAll[0].low, high: wpAll[0].high, currency: wpAll[0].currency, text: wpAll[0].line, scope: grossScope(wpAll[0].line), source_url: wpUrl! };
  } else if (us) box_office = { ...wdMoney(us, us.iso!), scope: 'domestic', source_url: wdUrl! };
  else if (wpGross) notes.push(`Infobox gross not read: "${wpGross}".`);

  out[f.unit] = {
    title_id: f.title, universe: f.universe, wikidata: e?.id ?? null, enwiki: w?.title ?? null,
    wikidata_revid: e?.lastrevid ?? null, wikipedia_revid: w?.revid ?? null,
    raw: { wd_runtime: rt.candidates, wd_budget: wdBudget, wd_box_office: wdBox, wp_runtime: wpRuntime, wp_budget: wpBudget, wp_gross: wpGross },
    runtime_min, runtime_source,
    runtime_alternatives: [...(wdUrl ? rt.candidates.map((min) => ({ min, source_url: wdUrl })) : []), ...(wpUrl && wpMin !== null ? [{ min: wpMin, source_url: wpUrl }] : [])],
    budget, box_office, notes,
  };
}

const file = path.join(SOURCES_DIR, 'film-stats.json');
// Keep entries for universes not fetched this run.
let prev: { entries?: Record<string, FilmStatsEntry> } = {};
try { prev = JSON.parse(await readFile(file, 'utf8')); } catch { /* first run */ }
const entries = { ...Object.fromEntries(Object.entries(prev.entries ?? {}).filter(([, v]) => !universes.includes(v.universe))), ...out };
const sorted = Object.fromEntries(Object.entries(entries).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(file, JSON.stringify({ fetched_at: new Date().toISOString(), licenses: { wikidata: 'CC0', wikipedia: WIKIPEDIA.license }, skipped_multi_part: skipped, entries: sorted }, null, 1) + '\n', 'utf8');
const vals = Object.values(out);
console.log(`${vals.length} films: runtime ${vals.filter((v) => v.runtime_min !== null).length}, budget ${vals.filter((v) => v.budget).length}, box office ${vals.filter((v) => v.box_office).length}; skipped ${skipped.length} multi-part titles`);
