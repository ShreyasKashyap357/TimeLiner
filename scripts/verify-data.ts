// Verify the TimeLiner dataset.
//   npm run verify                 schema + integrity + drift vs cached sources + reference-image diff
//   npm run verify -- --refetch    re-fetch all sources first (network), then the same checks
//   npm run verify -- --json out.json   also write a machine-readable report (used by CI drift issues)
// Exit code 1 on any error-level issue.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { z } from 'zod';
import {
  AliasesFile, ContinuitiesFile, PlatformsFile, StudiosFile, TagsFile, TitlesFile, UniversesFile,
  type Title, type Unit,
} from '../src/domain/schema.ts';
import { checkIntegrity, type Dataset, type Issue } from '../src/domain/integrity.ts';

const args = process.argv.slice(2);
const TODAY = process.env.TIMELINER_TODAY ?? new Date().toISOString().slice(0, 10);
const jsonOut = args.includes('--json') ? args[args.indexOf('--json') + 1] : null;

async function readJson<T>(file: string, schema: z.ZodType<T>, issues: Issue[]): Promise<T | null> {
  try {
    const raw = JSON.parse(await readFile(file, 'utf8'));
    const r = schema.safeParse(raw);
    if (!r.success) {
      for (const e of r.error.issues.slice(0, 50)) issues.push({ level: 'error', code: 'schema', where: `${file}:${e.path.join('.')}`, message: e.message });
      return null;
    }
    return r.data;
  } catch (e) {
    issues.push({ level: 'error', code: 'read', where: file, message: (e as Error).message });
    return null;
  }
}

export async function loadDataset(issues: Issue[]): Promise<Dataset | null> {
  const universes = await readJson('data/universes.json', UniversesFile, issues);
  const studios = await readJson('data/registry/studios.json', StudiosFile, issues);
  const platforms = await readJson('data/registry/platforms.json', PlatformsFile, issues);
  if (!universes || !studios || !platforms) return null;
  const ds: Dataset = { universes, studios, platforms, continuities: [], titles: [], tags: {}, aliases: {} };
  for (const u of universes) {
    const dir = path.join('data', u.data_dir);
    const c = await readJson(path.join(dir, 'continuities.json'), ContinuitiesFile, issues);
    const t = await readJson(path.join(dir, 'titles.json'), TitlesFile, issues);
    const g = await readJson(path.join(dir, 'tags.json'), TagsFile, issues);
    const a = existsSync(path.join(dir, 'aliases.json')) ? await readJson(path.join(dir, 'aliases.json'), AliasesFile, issues) : {};
    if (c) ds.continuities.push(...c);
    if (t) ds.titles.push(...t);
    ds.tags[u.id] = g ?? [];
    ds.aliases[u.id] = a ?? {};
  }
  return ds;
}

// ---------------------------------------------------------------- drift vs sources
interface Drift { kind: 'new-title' | 'date-changed' | 'timeline-moved' | 'status-changed' | 'missing-in-source' | 'source-revision'; where: string; message: string }

async function driftMarvel(ds: Dataset): Promise<Drift[]> {
  const file = 'data/candidates/marvel.json';
  if (!existsSync(file)) return [];
  const C = JSON.parse(await readFile(file, 'utf8'));
  const drifts: Drift[] = [];
  const titles = ds.titles.filter((t) => t.universe === 'marvel');
  const byWiki = new Map<string, Title>();
  for (const t of titles) if (t.external_ids.enwiki) byWiki.set(t.external_ids.enwiki, t);

  // 1. timeline diagram: every item must be in the dataset with the same year label
  const tlItems = new Map<string, string>();
  for (const row of C.timeline) if (!row.is_break) for (const it of row.items) tlItems.set(it.text, row.year_label);
  const unitsByTl = new Map<string, { t: Title; u: Unit }>();
  for (const t of titles) for (const u of t.units) if (u.source_keys['mcu-timeline-diagram']) unitsByTl.set(u.source_keys['mcu-timeline-diagram']!, { t, u });
  for (const [text, label] of tlItems) {
    const hit = unitsByTl.get(text);
    if (!hit) { drifts.push({ kind: 'new-title', where: 'MCU timeline diagram', message: `"${text}" (${label}) is not mapped to any unit` }); continue; }
    const norm = (s: string) => s.replace(/\s/g, '').replace(/[-–]/g, '–');
    if (norm(hit.u.in_universe.label) !== norm(label)) drifts.push({ kind: 'timeline-moved', where: hit.u.id, message: `diagram now says ${label}; dataset says ${hit.u.in_universe.label}` });
  }
  for (const [text, x] of unitsByTl) if (!tlItems.has(text)) drifts.push({ kind: 'missing-in-source', where: x.u.id, message: `diagram item "${text}" no longer present` });

  // 2. release rows
  for (const r of C.releases as { kind: string; link: string | null; title: string; season?: number; start: string | null; status_text?: string | null; source_page: string }[]) {
    if (!r.link) continue;
    const t = byWiki.get(r.link);
    if (!t) { drifts.push({ kind: 'new-title', where: r.source_page, message: `${r.kind} "${r.title}"${r.season ? ` S${r.season}` : ''} (${r.start ?? 'no date'}) not in dataset` }); continue; }
    const units = r.kind === 'season' ? t.units.filter((u) => u.source_keys['release-season'] === String(r.season)) : t.units;
    if (!units.length) { drifts.push({ kind: 'new-title', where: t.id, message: `season ${r.season} (${r.start ?? 'no date'}) listed on ${r.source_page} but not in dataset` }); continue; }
    for (const u of units) {
      if (u.id === 'i-am-groot-ep2-10' && r.season === 2) continue; // documented cross-season unit
      if (r.start && u.release.date !== r.start && !u.release.note.includes('infobox')) drifts.push({ kind: 'date-changed', where: u.id, message: `${r.source_page}: ${r.start}; dataset: ${u.release.date}` });
    }
  }
  // 3. status drift (time passing)
  for (const t of titles) for (const u of t.units) {
    if (u.status !== 'released' && u.release.date && u.release.date.length === 10 && u.release.date <= TODAY) drifts.push({ kind: 'status-changed', where: u.id, message: `release date ${u.release.date} has passed; status still ${u.status}` });
  }
  // 4. Disney+ order items
  const disneyKeys = new Set(titles.flatMap((t) => t.units.map((u) => u.source_keys['disney-plus-order']).filter(Boolean)));
  for (const item of C.disney_plus_order as string[]) if (!disneyKeys.has(item)) drifts.push({ kind: 'new-title', where: 'Disney+ order', message: `"${item}" not mapped` });
  return drifts;
}

async function revisionDrift(): Promise<Drift[]> {
  // Compare cached manifest against the revision ids recorded when the dataset was last curated.
  const manifestFile = 'data/sources/manifest.json';
  const baselineFile = 'data/sources/curated-revisions.json';
  if (!existsSync(manifestFile) || !existsSync(baselineFile)) return [];
  const manifest: { resolved_title: string; revid: number; site: string }[] = JSON.parse(await readFile(manifestFile, 'utf8'));
  const baseline: Record<string, number> = JSON.parse(await readFile(baselineFile, 'utf8'));
  return manifest
    .filter((m) => baseline[`${m.site}:${m.resolved_title}`] !== undefined && baseline[`${m.site}:${m.resolved_title}`] !== m.revid)
    .map((m) => ({ kind: 'source-revision' as const, where: `${m.site}:${m.resolved_title}`, message: `revision ${baseline[`${m.site}:${m.resolved_title}`]} -> ${m.revid}` }));
}

// ---------------------------------------------------------------- reference image diff
interface RefDiff { unit: string; message: string }
async function referenceDiff(ds: Dataset): Promise<RefDiff[]> {
  const file = 'reference/mcu_timeline_current.json';
  if (!existsSync(file)) return [];
  const ref: { rows: { label: string; units: [string, string][] }[]; excluded_footer: string[] } = JSON.parse(await readFile(file, 'utf8'));
  const units = new Map(ds.titles.flatMap((t) => t.units.map((u) => [u.id, { t, u }] as const)));
  const mcu = ds.continuities.find((c) => c.id === 'mcu')!;
  const out: RefDiff[] = [];
  const norm = (s: string) => s.replace(/\s*AD$/, '').replace(/\s/g, '').replace(/[-–]/g, '–');
  const refIds = new Set<string>();
  let lastIdx = -Infinity;
  for (const row of ref.rows) {
    for (const [id, marker] of row.units) {
      refIds.add(id);
      const x = units.get(id);
      if (!x) { out.push({ unit: id, message: 'in reference image but not in dataset' }); continue; }
      const iu = x.u.in_universe;
      if (!iu.start) out.push({ unit: id, message: `reference: ${row.label}; dataset: not placed ("${iu.label}")` });
      else if (norm(iu.label) !== norm(row.label)) out.push({ unit: id, message: `reference: ${row.label}; dataset: ${iu.label}` });
      const isMain = mcu.branches.find((b) => b.id === x.u.timeline_branch)?.is_main;
      if ((marker === 'dot') !== Boolean(isMain)) out.push({ unit: id, message: `reference marker ${marker}; dataset branch ${x.u.timeline_branch}` });
      if (iu.start && iu.order_index < lastIdx) out.push({ unit: id, message: 'order differs from reference within the timeline' });
      if (iu.start) lastIdx = iu.order_index;
    }
  }
  for (const id of ref.excluded_footer) {
    const x = units.get(id);
    if (x?.u.in_universe.start) out.push({ unit: id, message: `reference excludes it (no fixed point); dataset places it at ${x.u.in_universe.label}` });
  }
  // dataset units on the MCU with a date that the reference does not show
  for (const [id, x] of units) {
    if (x.t.continuity !== 'mcu' || !x.u.in_universe.start || refIds.has(id)) continue;
    const tier = x.u.canon_tier ?? x.t.canon_tier;
    if (tier === 'adjacent') continue; // the reference image (like Wikipedia's diagram) covers Marvel Studios + Netflix only
    out.push({ unit: id, message: `dated in dataset (${x.u.in_universe.label}, tier ${tier}) but absent from reference image` });
  }
  return out;
}

// ---------------------------------------------------------------- main
async function main() {
  if (args.includes('--refetch')) {
    console.log('Re-fetching sources…');
    execFileSync(process.execPath, ['--import', 'tsx', 'scripts/fetch/run.ts'], { stdio: 'inherit' });
    execFileSync(process.execPath, ['--import', 'tsx', 'scripts/build/marvel.ts'], { stdio: 'inherit' });
  }
  const issues: Issue[] = [];
  const ds = await loadDataset(issues);
  if (ds) issues.push(...checkIntegrity(ds, TODAY));
  const ignore: { match: string; reason: string }[] = existsSync("data/drift-ignore.json") ? JSON.parse(await readFile("data/drift-ignore.json", "utf8")) : [];
  const allDrift = ds ? [...(await driftMarvel(ds)), ...(await revisionDrift())] : [];
  const drift = allDrift.filter((d) => !ignore.some((i) => `${d.where}: ${d.message}`.includes(i.match)));
  const ignored = allDrift.length - drift.length;
  const ref = ds ? await referenceDiff(ds) : [];

  const errors = issues.filter((i) => i.level === 'error');
  const warns = issues.filter((i) => i.level === 'warn');
  const counts = ds ? `${ds.universes.length} universes, ${ds.continuities.length} continuities, ${ds.titles.length} titles, ${ds.titles.reduce((n, t) => n + t.units.length, 0)} units` : 'dataset failed to load';
  console.log(`\nTimeLiner verify (today=${TODAY}): ${counts}`);
  console.log(`  integrity: ${errors.length} error(s), ${warns.length} warning(s)`);
  for (const i of [...errors, ...warns]) console.log(`  [${i.level}] ${i.code} @ ${i.where}: ${i.message}`);
  console.log(`  drift vs sources: ${drift.length} (${ignored} ignored via data/drift-ignore.json)`);
  for (const d of drift) console.log(`  [drift:${d.kind}] ${d.where}: ${d.message}`);
  console.log(`  reference image diff: ${ref.length}`);
  for (const r of ref) console.log(`  [ref] ${r.unit}: ${r.message}`);
  if (jsonOut) await writeFile(jsonOut, JSON.stringify({ today: TODAY, counts, issues, drift, reference: ref }, null, 2));
  if (errors.length) process.exitCode = 1;
}

if (process.argv[1]?.replace(/\\/g, '/').endsWith('scripts/verify-data.ts')) await main();
