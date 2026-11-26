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
    <section className="rounded-lg border border-border bg-card p-3" aria-label={title}>
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

export function ContinuitiesView({ rows }: { rows: Row[] }) {
  const { ds, update } = useApp();
  const lanes = continuityLanes(rows, ds);
  if (!rows.length) return <Empty />;
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">Each continuity has its own in-universe chronology. They are never merged; cross-continuity links appear in the Connections view.</p>
      {lanes.map((l) => (
        <section key={l.id} className="rounded-lg border border-border bg-card p-4" aria-label={l.label}>
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-heading text-lg font-bold" style={{ color: 'var(--u-primary)' }}>{l.label}</h2>
            <span className="text-sm text-muted-foreground">{l.count} entries · released {l.first}–{l.last}</span>
            <button type="button" className="text-sm underline" onClick={() => update({ view: 'spine', c: l.id }, true)}>Open in-universe timeline →</button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {l.branches.map((b) => (
              <div key={b.id} className={b.placeable ? '' : 'rounded-md border border-dashed border-border p-2'}>
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
