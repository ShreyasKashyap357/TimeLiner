import { useState } from 'react';
import { useApp } from '@/app/context';
import { releaseLanes, sortRows } from '@/domain/views';
import type { Row } from '@/domain/model';
import { UnitItem } from '@/components/UnitItem';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Empty } from './SpineView';

/** Release order, grouped by year or by a grouping scheme the universe defines (Phase, Chapter, …). */
export function ReleaseView({ rows }: { rows: Row[] }) {
  const { state, update, ds, label } = useApp();
  const [groupBy, setGroupBy] = useState<string>('year');
  const uni = ds.universes.find((u) => u.id === state.u);
  const schemes = uni?.grouping_schemes ?? [];
  const multi = ds.universes.length > 1;
  const lanes = releaseLanes(rows, state.sort, state.lanes, ds);
  const scheme = schemes.find((s) => s.id === groupBy);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        {schemes.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Group by</span>
            <ToggleGroup type="single" variant="outline" value={groupBy} onValueChange={(v) => v && setGroupBy(v)} aria-label="Group release order by">
              <ToggleGroupItem value="year">Year</ToggleGroupItem>
              {schemes.map((s) => <ToggleGroupItem key={s.id} value={s.id}>{s.label}</ToggleGroupItem>)}
            </ToggleGroup>
          </div>
        )}
        {multi && (
          <div className="flex items-center gap-2">
            <Switch id="lanes" checked={state.lanes} onCheckedChange={(v) => update({ lanes: v })} />
            <Label htmlFor="lanes">Side-by-side lanes per universe</Label>
          </div>
        )}
      </div>
      {!rows.length ? <Empty /> : (
        <div className={lanes.length > 1 ? 'grid gap-6 md:grid-cols-2 xl:grid-cols-3' : ''}>
          {lanes.map((lane) => {
            const flat = lane.groups.flatMap((g) => g.rows);
            const groups = scheme
              ? groupByScheme(sortRows(flat, state.sort === 'release-desc' ? 'release-desc' : 'release'), scheme.id, (id) => (id ? label.grouping(id) : `No ${scheme.label.toLowerCase()}`))
              : lane.groups.map((g) => ({ key: String(g.year), label: g.year === null ? 'TBA' : String(g.year), rows: g.rows }));
            return (
              <section key={lane.lane} aria-label={lane.label}>
                {lanes.length > 1 && <h2 className="font-heading mb-2 text-lg font-bold">{lane.label}</h2>}
                {/* Drawn as a vertical timeline (release dates), like the in-universe spine. */}
                <ol className="relative ml-2 border-l-2 pl-6" style={{ borderColor: 'var(--u-secondary)' }} aria-label={`${lane.label}: release order`}>
                  {groups.map((g) => (
                    <li key={g.key} className="relative mb-5">
                      <span aria-hidden className="absolute -left-[33px] top-1 size-4 rounded-full border-2 bg-background" style={{ borderColor: 'var(--u-secondary)' }} />
                      <h3 className="font-heading text-base font-bold" style={{ color: 'var(--u-primary)' }}>{g.label} <span className="text-sm font-normal text-muted-foreground">({g.rows.length})</span></h3>
                      <ul className="space-y-0.5">{g.rows.map((r) => <UnitItem key={r.key} row={r} meta="both" />)}</ul>
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Consecutive groups by a grouping scheme value, preserving release order (a phase can recur if release order interleaves). */
function groupByScheme(rows: Row[], schemeId: string, labelOf: (id: string | null) => string) {
  const out: { key: string; label: string; rows: Row[] }[] = [];
  for (const r of rows) {
    const v = r.unit.groupings[schemeId] ?? null;
    const last = out.at(-1);
    if (last && last.key.startsWith(`${v}|`)) last.rows.push(r);
    else out.push({ key: `${v}|${out.length}`, label: labelOf(v), rows: [r] });
  }
  return out;
}
