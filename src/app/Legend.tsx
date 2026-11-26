import { useApp } from './context';
import type { Row } from '@/domain/model';
import { Marker, markerColor, markerMeaning, markerShape } from '@/components/Marker';
import { ConfidenceBadge } from '@/components/Badges';

/** Legend built from what is on screen: every marker shown also has a text meaning. */
export function Legend({ rows }: { rows: Row[] }) {
  const { ds, state } = useApp();
  const seen = new Map<string, Row>();
  for (const r of rows) {
    const k = `${markerShape(r)}|${markerColor(r)}|${markerMeaning(r)}`;
    if (!seen.has(k)) seen.set(k, r);
  }
  const cont = ds.continuities.find((c) => c.id === state.c);
  return (
    <section aria-labelledby="legend-h" className="mt-10 rounded-lg border border-border bg-card p-4 text-sm">
      <h2 id="legend-h" className="mb-2 font-semibold">Key</h2>
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {[...seen.values()].map((r) => (
          <li key={r.key} className="flex items-center gap-2">
            <Marker shape={markerShape(r)} color={markerColor(r)} size={14} />
            <span>{markerMeaning(r)}{r.continuity.id !== cont?.id && state.u === 'all' ? ` (${r.continuity.short_name})` : ''}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-muted-foreground">
        <span>In-universe date confidence:</span>
        <ConfidenceBadge c="stated" small /><ConfidenceBadge c="inferred" small /><ConfidenceBadge c="disputed" small />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Shapes, not just colours, distinguish branches and tiers. Hollow shapes have no fixed point; ▲ marks adjacent-tier titles.</p>
    </section>
  );
}
