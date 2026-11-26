// Pure integrity checks over a loaded dataset. Used by scripts/verify-data.ts and tests.
import type { Continuity, Platform, Studio, Tag, Title, Universe } from './schema.ts';

export interface Dataset {
  universes: Universe[];
  continuities: Continuity[];
  titles: Title[];
  tags: Record<string, Tag[]>; // per universe
  studios: Studio[];
  platforms: Platform[];
  aliases: Record<string, Record<string, string[]>>; // per universe
}

export interface Issue {
  level: 'error' | 'warn';
  code: string;
  where: string;
  message: string;
}

export function checkIntegrity(ds: Dataset, today: string): Issue[] {
  const issues: Issue[] = [];
  const err = (code: string, where: string, message: string) => issues.push({ level: 'error', code, where, message });
  const warn = (code: string, where: string, message: string) => issues.push({ level: 'warn', code, where, message });

  const dupes = <T>(items: T[], key: (t: T) => string, code: string, what: string) => {
    const seen = new Set<string>();
    for (const it of items) {
      const k = key(it);
      if (seen.has(k)) err(code, k, `duplicate ${what} id`);
      seen.add(k);
    }
  };
  dupes(ds.universes, (u) => u.id, 'dup-universe', 'universe');
  dupes(ds.continuities, (c) => c.id, 'dup-continuity', 'continuity');
  dupes(ds.titles, (t) => t.id, 'dup-title', 'title');
  dupes(ds.studios, (s) => s.id, 'dup-studio', 'studio');
  dupes(ds.platforms, (p) => p.id, 'dup-platform', 'platform');
  const allUnits = ds.titles.flatMap((t) => t.units.map((u) => ({ t, u })));
  dupes(allUnits, (x) => x.u.id, 'dup-unit', 'unit');
  // duplicate titles by name within a continuity (likely accidental double entry)
  dupes(ds.titles, (t) => `${t.continuity}::${t.title.toLowerCase()}::${t.type}`, 'dup-title-name', 'title name+type in continuity');

  const universes = new Map(ds.universes.map((u) => [u.id, u]));
  const conts = new Map(ds.continuities.map((c) => [c.id, c]));
  const titles = new Map(ds.titles.map((t) => [t.id, t]));
  const units = new Map(allUnits.map((x) => [x.u.id, x]));
  const studios = new Map(ds.studios.map((s) => [s.id, s]));
  const platforms = new Set(ds.platforms.map((p) => p.id));

  for (const u of ds.universes) {
    const c = conts.get(u.default_continuity);
    if (!c || c.universe !== u.id) err('ref-default-continuity', u.id, `default_continuity "${u.default_continuity}" missing or not in universe`);
    const schemeIds = new Set(u.grouping_schemes.map((g) => g.id));
    for (const g of u.grouping_schemes) {
      if (g.parent_scheme && !schemeIds.has(g.parent_scheme)) err('ref-scheme', `${u.id}/${g.id}`, `parent_scheme "${g.parent_scheme}" unknown`);
      const parentVals = new Set(u.grouping_schemes.find((x) => x.id === g.parent_scheme)?.values.map((v) => v.id) ?? []);
      for (const v of g.values) if (v.parent && !parentVals.has(v.parent)) err('ref-scheme-value', `${u.id}/${g.id}/${v.id}`, `parent "${v.parent}" not in parent scheme`);
    }
    if (!ds.continuities.some((c) => c.universe === u.id)) warn('empty-universe', u.id, 'universe has no continuities');
  }

  for (const c of ds.continuities) {
    const u = universes.get(c.universe);
    if (!u) { err('ref-universe', c.id, `universe "${c.universe}" missing`); continue; }
    for (const s of c.grouping_schemes) if (!u.grouping_schemes.some((g) => g.id === s)) err('ref-scheme', c.id, `grouping scheme "${s}" not declared on universe`);
    const bids = new Set(c.branches.map((b) => b.id));
    if (c.branches.filter((b) => b.is_main).length !== 1) err('branch-main', c.id, 'exactly one branch must have is_main');
    // markers carry meaning by shape (never colour alone): the main branch's shape is unique to it, and the
    // triangle is reserved for the adjacent tier. Non-main branches may share a shape when they form one
    // category (e.g. MCU realities "outside the Sacred Timeline at a set timeframe"); the legend groups them.
    const main = c.branches.find((b) => b.is_main);
    for (const b of c.branches) {
      if (b.marker === 'triangle') err('marker-reserved', `${c.id}/${b.id}`, 'triangle is reserved for the adjacent tier');
      if (main && b !== main && b.marker === main.marker) err('marker-duplicate', `${c.id}/${b.id}`, `same marker "${b.marker}" as the main branch ${main.id}`);
    }
    for (const b of c.branches) {
      if (b.parent && !bids.has(b.parent)) err('ref-branch-parent', `${c.id}/${b.id}`, `parent "${b.parent}" missing`);
      if (b.merges_into && !bids.has(b.merges_into.branch)) err('ref-branch-merge', `${c.id}/${b.id}`, `merges_into "${b.merges_into.branch}" missing`);
    }
    for (const a of c.alt_orders) {
      const seen = new Set<string>();
      for (const id of a.unit_ids) {
        const x = units.get(id);
        if (!x) err('ref-alt-order', `${c.id}/${a.id}`, `unit "${id}" missing`);
        else if (x.t.continuity !== c.id) err('alt-order-cross-continuity', `${c.id}/${a.id}`, `unit "${id}" belongs to ${x.t.continuity}`);
        if (seen.has(id)) err('dup-alt-order', `${c.id}/${a.id}`, `unit "${id}" listed twice`);
        seen.add(id);
      }
      for (const id of a.optional_unit_ids) if (!seen.has(id)) err('alt-order-optional', `${c.id}/${a.id}`, `optional unit "${id}" is not in unit_ids`);
    }
    // order_index unique per continuity
    const idx = new Map<number, string>();
    for (const x of allUnits.filter((x) => x.t.continuity === c.id)) {
      const oi = x.u.in_universe.order_index;
      if (idx.has(oi)) err('dup-order-index', x.u.id, `order_index ${oi} also used by ${idx.get(oi)}`);
      idx.set(oi, x.u.id);
    }
  }

  for (const t of ds.titles) {
    const where = t.id;
    const u = universes.get(t.universe);
    const c = conts.get(t.continuity);
    if (!u) err('ref-universe', where, `universe "${t.universe}" missing`);
    if (!c) { err('ref-continuity', where, `continuity "${t.continuity}" missing`); continue; }
    if (c.universe !== t.universe) err('continuity-universe-mismatch', where, `continuity ${c.id} belongs to ${c.universe}`);
    if (!studios.has(t.studio_brand)) err('ref-studio', where, `studio "${t.studio_brand}" not in registry`);
    if (t.label) {
      const l = studios.get(t.label);
      if (!l) err('ref-label', where, `label "${t.label}" not in registry`);
      else if (l.kind !== 'label') warn('label-kind', where, `label "${t.label}" is a ${l.kind}`);
    }
    if (!platforms.has(t.platform_or_network)) err('ref-platform', where, `platform "${t.platform_or_network}" not in registry`);
    const tags = new Map((ds.tags[t.universe] ?? []).map((x) => [x.id, x]));
    for (const ch of t.characters) { const g = tags.get(ch); if (!g) err('ref-character', where, `character "${ch}" unknown`); else if (g.kind !== 'character') err('tag-kind', where, `"${ch}" is a ${g.kind}, not a character`); }
    for (const f of t.franchises) { const g = tags.get(f); if (!g) err('ref-franchise', where, `franchise "${f}" unknown`); else if (g.kind === 'character') err('tag-kind', where, `"${f}" is a character, not a franchise/team`); }
    for (const l of t.links) if (!titles.has(l.to)) err('ref-link', where, `link to unknown title "${l.to}"`);
    if (t.type === 'crossover-event') {
      if (!t.constituents.length) err('crossover-empty', where, 'crossover-event without constituents');
      for (const ref of t.constituents) {
        const [uid, ep] = ref.split('#e');
        const x = units.get(uid!);
        if (!x) err('ref-constituent', where, `constituent unit "${uid}" missing`);
        else if (x.t.continuity !== t.continuity) err('constituent-continuity', where, `constituent "${uid}" is in ${x.t.continuity}, event is in ${t.continuity}`);
        else if (ep && x.u.episode_count && Number(ep) > x.u.episode_count) err('constituent-episode', where, `episode ${ep} exceeds ${uid} episode_count ${x.u.episode_count}`);
      }
    } else if (t.constituents.length) warn('constituents-non-event', where, 'constituents on a non-crossover title');
    if (t.units.length && t.status !== 'released' && t.units.some((x) => x.status === 'released')) warn('status-rollup', where, 'title status not released but a unit is');

    for (const unit of t.units) {
      const w = unit.id;
      const branch = c.branches.find((b) => b.id === unit.timeline_branch);
      if (!branch) { err('ref-branch', w, `branch "${unit.timeline_branch}" not in ${c.id}`); continue; }
      const iu = unit.in_universe;
      if (Number.isNaN(iu.order_index)) err('order-index', w, 'order_index missing');
      if (c.calendar.kind === 'ordered-only' && iu.start) err('calendar', w, 'ordered-only continuity cannot have calendar dates');
      if (!branch.placeable && iu.start) err('non-placeable-dated', w, `branch ${branch.id} is non-placeable but unit has a date`);
      if ((iu.start === null) !== (iu.end === null)) err('iu-start-end', w, 'start and end must both be set or both null');
      if (iu.start === null && iu.precision !== 'relative') err('iu-precision', w, 'undated units must use precision "relative"');
      if (iu.start && iu.precision === 'relative') err('iu-precision', w, 'dated unit cannot use precision "relative"');
      if (iu.start && iu.end) {
        if (iu.start.y > iu.end.y) err('iu-order', w, 'start after end');
        if (iu.precision === 'year' && iu.start.y !== iu.end.y) err('iu-precision', w, 'precision "year" but start/end differ');
        if (iu.precision === 'range' && iu.start.y === iu.end.y && !iu.start.m) warn('iu-precision', w, 'precision "range" within one year');
        if (iu.start.y === 0 && c.calendar.kind === 'gregorian') err('iu-year-zero', w, 'gregorian calendar has no year 0');
      }
      if (iu.confidence !== 'stated' && !iu.note.trim()) err('iu-note', w, `confidence "${iu.confidence}" requires an explanatory note`);
      if (iu.relative_to) for (const r of [iu.relative_to.after, iu.relative_to.before]) if (r && !units.has(r)) err('ref-relative', w, `relative_to unit "${r}" missing`);
      if (unit.platform_or_network && !platforms.has(unit.platform_or_network)) err('ref-platform', w, `platform "${unit.platform_or_network}" unknown`);
      for (const [k, v] of Object.entries(unit.groupings)) {
        if (!c.grouping_schemes.includes(k)) err('ref-grouping', w, `grouping "${k}" not used by continuity ${c.id}`);
        else if (v && !u?.grouping_schemes.find((g) => g.id === k)?.values.some((x) => x.id === v)) err('ref-grouping-value', w, `"${v}" not a value of ${k}`);
      }
      // release / status
      const d = unit.release.date;
      if (d && unit.release.year !== Number(d.slice(0, 4))) err('release-year', w, 'release.year does not match release.date');
      if (unit.release.end_date && d && unit.release.end_date < d) err('release-end', w, 'end_date before date');
      if (unit.status === 'released' && (!d || d > today)) err('status-released', w, `status released but date ${d ?? 'null'} is not in the past (today ${today})`);
      if ((unit.status === 'upcoming' || unit.status === 'in-production') && d && d.length === 10 && d <= today) warn('status-stale', w, `status ${unit.status} but release date ${d} has passed`);
      if (!d && unit.status === 'released') err('release-missing', w, 'released unit without release date');
      if (!unit.source_urls.length) warn('unit-sources', w, 'unit has no source_urls (inherits title sources)');
      if (unit.episode_range) {
        const { from, to } = unit.episode_range;
        if (from.season > to.season || (from.season === to.season && from.episode > to.episode)) err('episode-range', w, 'episode_range from > to');
      }
    }
  }

  for (const [uid, map] of Object.entries(ds.aliases)) {
    for (const [oldId, targets] of Object.entries(map)) {
      if (units.has(oldId)) err('alias-live', `${uid}/${oldId}`, 'alias source id is still a live unit');
      for (const t of targets) if (!units.has(t)) err('ref-alias', `${uid}/${oldId}`, `alias target "${t}" missing`);
    }
  }
  return issues;
}
