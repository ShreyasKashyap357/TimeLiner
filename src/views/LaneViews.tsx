// Swimlane-style views: platform, studio, phase/saga, characters, continuities overview.
import { useApp } from '@/app/context';
import { continuityLanes, groupings, studioKey, swimlanes, tagIndex, sortRows, type GroupNode } from '@/domain/views';
import type { Row } from '@/domain/model';
import { UnitItem } from '@/components/UnitItem';
import { Badge } from '@/components/ui/badge';
import { Marker } from '@/components/Marker';
import { Empty } from './SpineView';
import type { ReactNode } from 'react';
import type { Continuity } from '@/domain/schema';
import { formatYear } from '@/domain/dates';
import { markerColor, markerShape } from '@/components/Marker';
import { ChartTip, PointShape, RowTip, usePinnedTip } from '@/components/ChartTip';

function Lane({ title, subtitle, rows, meta = 'release' }: { title: string; subtitle?: string; rows: Row[]; meta?: 'release' | 'in-universe' | 'both' }) {
  return (
    <section className="border border-border bg-card p-3" aria-label={title}>
      <h3 className="font-heading text-base font-bold" style={{ color: 'var(--u-primary)' }}>{title} <span className="text-sm font-normal text-muted-foreground">({rows.length})</span></h3>
      {subtitle && <p className="mb-1 text-xs text-muted-foreground">{subtitle}</p>}
      <ul className="mt-1 space-y-0.5">{rows.map((r) => <UnitItem key={r.key} row={r} meta={meta} />)}</ul>
    </section>
  );
}

export function PlatformView({ rows }: { rows: Row[] }) {
  const { label, ds } = useApp();
  if (!rows.length) return <Empty />;
  const lanes = swimlanes(rows, (r) => r.platform, label.platform, ds.platforms.map((p) => p.id));
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{lanes.map((l) => <Lane key={l.id} title={l.label} rows={l.rows} />)}</div>;
}

export function StudioView({ rows }: { rows: Row[] }) {
  const { label, ds } = useApp();
  if (!rows.length) return <Empty />;
  const lanes = swimlanes(rows, studioKey, label.studio, ds.studios.map((s) => s.id));
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {lanes.map((l) => {
        const s = ds.studios.find((x) => x.id === l.id);
        const parent = s?.parent ? ds.studios.find((x) => x.id === s.parent) : undefined;
        const sub = [parent ? `${parent.label} › label/banner` : null, s?.note].filter(Boolean).join(' · ');
        return <Lane key={l.id} title={l.label} subtitle={sub} rows={l.rows} />;
      })}
    </div>
  );
}

export function GroupingsView({ rows }: { rows: Row[] }) {
  const { ds, state } = useApp();
  const tree = groupings(rows, ds, state.u === 'all' ? ds.universes[0]!.id : state.u);
  if (!rows.length) return <Empty />;
  if (!tree.length) return <p className="text-muted-foreground">This universe defines no Phase/Saga/Chapter groupings.</p>;
  const render = (n: GroupNode, depth: number) => (
    <section key={n.id} className={depth ? 'mt-3' : 'mb-8'} aria-label={n.label}>
      {depth === 0
        ? <h2 className="font-heading mb-2 border-b border-border pb-1 text-xl font-bold" style={{ color: 'var(--u-primary)' }}>{n.label}</h2>
        : null}
      {n.children.length ? <div className="grid gap-4 md:grid-cols-2">{n.children.map((c) => <Lane key={c.id} title={c.label} rows={c.rows} />)}</div>
        : depth === 0 ? <Lane title={n.label} rows={n.rows} /> : null}
    </section>
  );
  return <div>{tree.map((n) => render(n, 0))}</div>;
}

export function TagsView({ rows, allScoped }: { rows: Row[]; allScoped: Row[] }) {
  const { ds, state, update } = useApp();
  const index = tagIndex(allScoped, ds);
  const selected = state.tags;
  return (
    <div className="space-y-4">
      <div>
        <h2 className="mb-2 text-sm font-semibold">Pick characters, teams or franchises <span className="font-normal text-muted-foreground">(any match)</span></h2>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Characters and franchises">
          {index.map((t) => {
            const on = selected.includes(t.id);
            return (
              <button key={t.id} type="button" aria-pressed={on} onClick={() => update({ tags: on ? selected.filter((x) => x !== t.id) : [...selected, t.id] })}>
                <Badge variant={on ? 'default' : 'outline'} className="cursor-pointer">{t.kind !== 'character' ? '◆ ' : ''}{t.label} <span className="opacity-70">{t.count}</span></Badge>
              </button>
            );
          })}
        </div>
      </div>
      {!selected.length ? <p className="text-muted-foreground">Select one or more to list every title they appear in (release order, across continuities).</p>
        : !rows.length ? <Empty /> : (
          <div className="grid gap-4 md:grid-cols-2">
            {[...new Set(rows.map((r) => r.continuity.id))].map((cid) => {
              const c = ds.continuities.find((x) => x.id === cid)!;
              return <Lane key={cid} title={c.name} rows={sortRows(rows.filter((r) => r.continuity.id === cid), 'release')} meta="both" />;
            })}
          </div>
        )}
    </div>
  );
}

type LaneBranch = ReturnType<typeof continuityLanes>[number]['branches'][number];
const when = (d: { y: number; m?: number } | null | undefined) => (d ? `${d.m ? new Date(2000, d.m - 1).toLocaleString('en-US', { month: 'short' }) + ' ' : ''}${d.y}` : '');

/** Interactive graph of how a continuity's branches relate (drawn only when branches split or merge): one lane
 *  per placeable branch, each title a mark at its place in story order (so marks never overlap), year labels
 *  underneath, and curves where a branch splits off or merges. Hover or focus shows a summary; click pins it.
 *  The sentences below say the same in words. */
export function BranchMap({ branches, calendar }: { branches: LaneBranch[]; calendar?: Continuity['calendar'] }) {
  const tip = usePinnedTip<{ row?: Row; text?: ReactNode }>();
  const { update } = useApp();
  const merging = branches.filter((b) => b.merges_into && branches.some((t) => t.id === b.merges_into!.branch));
  const splitting = branches.filter((b) => b.parent && branches.some((t) => t.id === b.parent));
  if (!merging.length && !splitting.length) return null;
  const lanes = branches.filter((b) => b.placeable && b.rows.length);
  const unplaced = branches.filter((b) => !b.placeable);
  const pts = lanes.flatMap((b) => b.rows.map((r) => ({ r, lane: b.id }))).sort((a, b) => a.r.unit.in_universe.order_index - b.r.unit.in_universe.order_index);
  const rank = new Map(pts.map((p, i) => [p.r.key, i]));
  const L = 168, step = 30, rowH = 44, top = 22;
  const W = Math.max(640, L + pts.length * step + 24), H = top + lanes.length * rowH + 34;
  const x = (i: number) => L + i * step + step / 2;
  const laneY = (id: string) => top + lanes.findIndex((b) => b.id === id) * rowH;
  const year = (y: number) => (calendar ? formatYear(y, calendar) : String(y));
  /** x just before the first title set in or after a given year (where a split or merge happens) */
  const atYear = (y: number) => { const i = pts.findIndex((p) => (p.r.unit.in_universe.start?.y ?? -Infinity) >= y); return i < 0 ? x(pts.length - 1) + step / 2 : x(i) - step / 2; };
  const span = (b: LaneBranch) => { const is = b.rows.map((r) => rank.get(r.key)!); return [x(Math.min(...is)), x(Math.max(...is))] as const; };
  const splitX = new Map(splitting.filter((b) => lanes.includes(b)).map((b) => [b.id, b.diverges_at ? atYear(b.diverges_at.y) : span(b)[0] - step / 2]));
  const mergeX = new Map(merging.filter((b) => lanes.includes(b)).map((b) => [b.id, b.merges_into!.at ? atYear(b.merges_into!.at.y) : span(b)[1] + step / 2]));
  // a parent lane runs at least as far as the points where children leave it or merge into it
  const reach = new Map(lanes.map((b) => [b.id, span(b)]));
  for (const b of lanes) {
    const sx = splitX.get(b.id); if (sx !== undefined && b.parent && reach.has(b.parent)) { const [a, c] = reach.get(b.parent)!; reach.set(b.parent, [Math.min(a, sx - 20), Math.max(c, sx - 20)]); }
    const mx = mergeX.get(b.id); if (mx !== undefined && reach.has(b.merges_into!.branch)) { const t = b.merges_into!.branch; const [a, c] = reach.get(t)!; reach.set(t, [Math.min(a, mx), Math.max(c, mx)]); }
  }
  // year labels under the axis wherever the year changes, spaced so they never collide
  const ticks: { x: number; label: string }[] = [];
  let lastY: number | null = null, lastX = -Infinity;
  pts.forEach((p, i) => {
    const y = p.r.unit.in_universe.start?.y;
    if (y === undefined || y === lastY) return;
    lastY = y;
    if (x(i) - lastX < 46) return;
    ticks.push({ x: x(i), label: year(y) }); lastX = x(i);
  });
  const desc = [
    ...merging.map((b) => { const t = branches.find((x) => x.id === b.merges_into!.branch)!; const m = b.merges_into!; return `${b.label} merges into ${t.label}${m.at ? ` (${when(m.at)})` : ''}${m.note ? `: ${m.note}` : ''}.`; }),
    ...splitting.map((b) => `${b.label} splits off from ${branches.find((x) => x.id === b.parent)!.label}${b.diverges_at ? ` (${when(b.diverges_at)})` : ''}.`),
    ...unplaced.map((b) => `${b.label}: no fixed point on this timeline (${b.rows.length} ${b.rows.length === 1 ? 'entry' : 'entries'}, listed below).`),
  ];
  const branchTip = (b: LaneBranch) => (
    <div className="space-y-1 text-sm">
      <div className="font-semibold">{b.label}</div>
      {b.description && <div className="text-muted-foreground">{b.description}</div>}
      <div className="text-xs text-muted-foreground">{b.rows.length} {b.rows.length === 1 ? 'entry' : 'entries'}</div>
    </div>
  );
  const color = (b: LaneBranch, i: number) => (i === 0 ? 'var(--marker-main)' : 'var(--u-secondary)');
  return (
    <figure className="mb-3 min-w-0 rounded-md border border-dashed border-border p-2" data-testid="branch-graph">
      <figcaption className="mb-1 text-sm font-semibold">How the branches connect <span className="font-normal text-muted-foreground">(story order, left to right; hover a mark for a summary, click to keep it open)</span></figcaption>
      <div className="overflow-x-auto">
        <div className="relative" style={{ width: W }}>
          <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="group" aria-label={`Branch graph. ${desc.join(' ')}`}>
            {lanes.map((b, li) => {
              const y = laneY(b.id), [x0, x1] = reach.get(b.id)!;
              const sx = splitX.get(b.id), mx = mergeX.get(b.id);
              const start = sx ?? x0 - 10, end = mx !== undefined ? mx - 20 : x1 + 10;
              const k = `lane:${b.id}`;
              return (
                <g key={b.id}>
                  <text x={4} y={y + 4} className="fill-current text-[11px]">{b.label.length > 26 ? b.label.slice(0, 25) + '…' : b.label}</text>
                  <g tabIndex={0} role="button" aria-label={`${b.label}${b.description ? `: ${b.description}` : ''}`} className="cursor-pointer focus:outline-none"
                    {...tip.mark({ key: k, x: (start + end) / 2, y, content: { text: branchTip(b) } })} onKeyDown={(e) => { if (e.key === 'Escape') tip.close(); }}>
                    <line x1={start} y1={y} x2={end} y2={y} stroke="transparent" strokeWidth={14} />
                    <line x1={start} y1={y} x2={end} y2={y} stroke={color(b, li)} strokeWidth={tip.active(k) ? 5 : 3} strokeLinecap="round" />
                    {sx !== undefined && b.parent && reach.has(b.parent) && <path d={`M ${sx - 20} ${laneY(b.parent)} C ${sx - 6} ${laneY(b.parent)}, ${sx - 14} ${y}, ${sx} ${y}`} fill="none" stroke={color(b, li)} strokeWidth={3} />}
                    {mx !== undefined && <path d={`M ${mx - 20} ${y} C ${mx - 6} ${y}, ${mx - 14} ${laneY(b.merges_into!.branch)}, ${mx} ${laneY(b.merges_into!.branch)}`} fill="none" stroke={color(b, li)} strokeWidth={3} />}
                  </g>
                </g>
              );
            })}
            {[...splitX].map(([id, sx]) => {
              const b = lanes.find((l) => l.id === id)!;
              if (!b.parent || !reach.has(b.parent)) return null;
              const k = `split:${id}`, py = laneY(b.parent);
              const text = <div className="space-y-1 text-sm"><div className="font-semibold">{b.label} splits off</div><div className="text-muted-foreground">From {branches.find((x) => x.id === b.parent)!.label}{b.diverges_at ? ` in ${when(b.diverges_at)}` : ''}.</div>{b.description && <div className="text-xs text-muted-foreground">{b.description}</div>}</div>;
              return (
                <g key={k} tabIndex={0} role="button" aria-label={`${b.label} splits off${b.diverges_at ? ` in ${when(b.diverges_at)}` : ''}`} className="cursor-pointer focus:outline-none"
                  {...tip.mark({ key: k, x: sx - 20, y: py, content: { text } })} onKeyDown={(e) => { if (e.key === 'Escape') tip.close(); }}>
                  <circle cx={sx - 20} cy={py} r={9} fill="transparent" />
                  <circle cx={sx - 20} cy={py} r={tip.active(k) ? 6 : 4} fill="var(--card)" stroke="var(--u-primary)" strokeWidth={2} />
                </g>
              );
            })}
            {pts.map((p, i) => {
              const k = p.r.key, cx = x(i), cy = laneY(p.lane);
              return (
                <g key={k} tabIndex={0} role="button" aria-label={`${p.r.name}: ${p.r.unit.in_universe.label}`} className="cursor-pointer focus:outline-none"
                  {...tip.mark({ key: k, x: cx, y: cy, content: { row: p.r } })}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); update({ unit: k }); } if (e.key === 'Escape') tip.close(); }}>
                  <circle cx={cx} cy={cy} r={12} fill="transparent" />
                  {tip.active(k) && <circle cx={cx} cy={cy} r={10} fill="none" stroke="var(--u-primary)" strokeWidth={2} />}
                  <PointShape shape={markerShape(p.r)} x={cx} y={cy} color={markerColor(p.r)} />
                </g>
              );
            })}
            <line x1={L} x2={W - 10} y1={H - 26} y2={H - 26} stroke="var(--border)" />
            {ticks.map((t) => <g key={t.x}><line x1={t.x} x2={t.x} y1={H - 30} y2={H - 22} stroke="var(--border)" /><text x={t.x} y={H - 8} textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">{t.label}</text></g>)}
          </svg>
          {tip.tip && <ChartTip x={tip.tip.x} y={tip.tip.y} w={W} h={H} pinned={tip.pinned} cardRef={tip.card}>
            {tip.tip.content.row ? <RowTip row={tip.tip.content.row} pinned={tip.pinned} /> : tip.tip.content.text}
          </ChartTip>}
        </div>
      </div>
      <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">{desc.map((d) => <li key={d}>{d}</li>)}</ul>
    </figure>
  );
}

export function ContinuitiesView({ rows }: { rows: Row[] }) {
  const { ds, update } = useApp();
  const lanes = continuityLanes(rows, ds);
  if (!rows.length) return <Empty />;
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">Each continuity has its own in-universe chronology. They are never merged; cross-continuity links appear in the Connections view.</p>
      {lanes.map((l) => (
        <section key={l.id} className="border border-border bg-card p-4" aria-label={l.label}>
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-heading text-lg font-bold" style={{ color: 'var(--u-primary)' }}>{l.label}</h2>
            <span className="text-sm text-muted-foreground">{l.count} entries · released {l.first}–{l.last}</span>
            <button type="button" className="text-sm underline" onClick={() => update({ view: 'spine', c: l.id }, true)}>Open in-universe timeline →</button>
          </div>
          <BranchMap branches={l.branches} calendar={ds.continuities.find((c) => c.id === l.id)?.calendar} />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {l.branches.map((b) => (
              // Every branch box gets a dashed border so each scrollable list is visibly its own area (user request);
              // non-placeable branches are also tinted.
              <div key={b.id} className={`min-w-0 rounded-md border border-dashed border-border p-2 [overflow-wrap:anywhere] ${b.placeable ? '' : 'bg-muted/40'}`}>
                <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold">
                  <Marker shape={b.marker} color={b.placeable ? (l.branches[0]?.id === b.id ? 'var(--marker-main)' : 'var(--marker-variant)') : 'var(--marker-unplaced)'} />
                  {b.label}{!b.placeable && <span className="font-normal text-muted-foreground"> (non-placeable)</span>}
                  <span className="font-normal text-muted-foreground">({b.rows.length})</span>
                </h3>
                <ul className="max-h-72 space-y-0.5 overflow-y-auto pr-1">{sortRows(b.rows, 'in-universe').map((r) => <UnitItem key={r.key} row={r} meta="in-universe" />)}</ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
