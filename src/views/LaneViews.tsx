// Swimlane-style views: platform, studio, phase/saga, characters, continuities overview.
import { useApp } from '@/app/context';
import { continuityLanes, groupings, studioKey, swimlanes, tagIndex, sortRows, type GroupNode } from '@/domain/views';
import type { Row } from '@/domain/model';
import { UnitItem } from '@/components/UnitItem';
import { Badge } from '@/components/ui/badge';
import { Marker } from '@/components/Marker';
import { Empty } from './SpineView';

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

/** Schematic of how branches relate: branches that merge converge into their target; branches with a parent
 *  split off from it. Drawn only when a continuity has merges or splits. Text below says the same in words. */
function BranchMap({ branches }: { branches: LaneBranch[] }) {
  const merging = branches.filter((b) => b.merges_into && branches.some((t) => t.id === b.merges_into!.branch));
  const splitting = branches.filter((b) => b.parent && branches.some((t) => t.id === b.parent));
  if (!merging.length && !splitting.length) return null;
  const order = branches.map((b) => b.id);
  const rowH = 26, W = 640, mid = 360, H = order.length * rowH + 8;
  const y = (id: string) => 14 + order.indexOf(id) * rowH;
  const targets = new Set(merging.map((b) => b.merges_into!.branch));
  const color = (b: LaneBranch) => (b.placeable ? 'var(--u-secondary)' : 'var(--marker-unplaced)');
  const desc = [
    ...[...targets].map((t) => {
      const from = merging.filter((b) => b.merges_into!.branch === t);
      const tb = branches.find((b) => b.id === t)!;
      return `${from.map((b) => b.label).join(', ')} merge into ${tb.label}${from[0]!.merges_into!.at ? ` (${when(from[0]!.merges_into!.at)})` : ''}${from[0]!.merges_into!.note ? `: ${from[0]!.merges_into!.note}` : ''}.`;
    }),
    ...splitting.map((b) => `${b.label} splits off from ${branches.find((x) => x.id === b.parent)!.label}${b.diverges_at ? ` (${when(b.diverges_at)})` : ''}.`),
  ];
  return (
    <figure className="mb-3 rounded-md border border-dashed border-border p-2">
      <figcaption className="mb-1 text-sm font-semibold">How the branches connect</figcaption>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full min-w-[480px]" role="img" aria-label={desc.join(' ')}>
          {branches.map((b) => {
            const yy = y(b.id);
            const m = b.merges_into && targets.has(b.merges_into.branch) ? b.merges_into : null;
            const startsMid = targets.has(b.id) || splitting.includes(b);
            const x0 = startsMid ? mid : 150, x1 = m ? mid : W - 10;
            return (
              <g key={b.id}>
                <text x={4} y={yy + 4} className="fill-current text-[11px]">{b.label}</text>
                <line x1={x0} y1={yy} x2={x1 - (m ? 30 : 0)} y2={yy} stroke={color(b)} strokeWidth={3} strokeDasharray={b.placeable ? undefined : '4 4'} />
                {m && <path d={`M ${x1 - 30} ${yy} C ${x1 - 10} ${yy}, ${x1 - 10} ${y(m.branch)}, ${x1 + 6} ${y(m.branch)}`} fill="none" stroke={color(b)} strokeWidth={3} />}
                {b.parent && splitting.includes(b) && <path d={`M ${mid - 30} ${y(b.parent)} C ${mid - 10} ${y(b.parent)}, ${mid - 10} ${yy}, ${mid} ${yy}`} fill="none" stroke={color(b)} strokeWidth={3} />}
              </g>
            );
          })}
          <line x1={mid} y1={2} x2={mid} y2={H - 2} stroke="currentColor" strokeOpacity={0.25} strokeDasharray="2 3" />
        </svg>
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
          <BranchMap branches={l.branches} />
          <div className="grid gap-3 md:grid-cols-2">
            {l.branches.map((b) => (
              // Every branch box gets a dashed border so each scrollable list is visibly its own area (user request);
              // non-placeable branches are also tinted.
              <div key={b.id} className={`rounded-md border border-dashed border-border p-2 ${b.placeable ? '' : 'bg-muted/40'}`}>
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
