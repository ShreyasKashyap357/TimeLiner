import { useApp } from '@/app/context';
import { releaseLanes } from '@/domain/views';
import type { Row } from '@/domain/model';
import { UnitItem } from '@/components/UnitItem';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Empty } from './SpineView';

export function ReleaseView({ rows }: { rows: Row[] }) {
  const { state, update, ds } = useApp();
  const lanes = releaseLanes(rows, state.sort, state.lanes, ds);
  const multi = new Set(rows.map((r) => r.universe.id)).size > 1 || ds.universes.length > 1;
  return (
    <div className="space-y-4">
      {multi && (
        <div className="flex items-center gap-2">
          <Switch id="lanes" checked={state.lanes} onCheckedChange={(v) => update({ lanes: v })} />
          <Label htmlFor="lanes">Side-by-side lanes per universe</Label>
        </div>
      )}
      {!rows.length ? <Empty /> : (
        <div className={lanes.length > 1 ? 'grid gap-6 md:grid-cols-2 xl:grid-cols-3' : ''}>
          {lanes.map((lane) => (
            <section key={lane.lane} aria-label={lane.label}>
              {lanes.length > 1 && <h2 className="font-heading mb-2 text-lg font-bold">{lane.label}</h2>}
              {lane.groups.map((g) => (
                <div key={String(g.year)} className="mb-4">
                  <h3 className="font-heading text-base font-bold" style={{ color: 'var(--u-primary)' }}>{g.year ?? 'TBA'}</h3>
                  <ul className="space-y-0.5">{g.rows.map((r) => <UnitItem key={r.key} row={r} meta="both" />)}</ul>
                </div>
              ))}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
