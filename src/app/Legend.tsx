import { useApp } from './context';
import type { Row } from '@/domain/model';
import { Marker, markerColor, markerMeaning, markerShape } from '@/components/Marker';
import { ConfidenceBadge } from '@/components/Badges';

/** Legend built from what is on screen: every marker shown also has a text meaning. */
export function Legend({ rows }: { rows: Row[] }) {
  const { state, ds } = useApp();
  const cal = ds.continuities.find((c) => c.id === state.c)?.calendar;
  // One entry per marker (shape + colour); branches sharing a marker are listed together.
  const groups = new Map<string, { row: Row; meanings: string[] }>();
  for (const r of rows) {
    const k = `${markerShape(r)}|${markerColor(r)}`;
    const meaning = `${markerMeaning(r)}${state.u === 'all' ? ` (${r.continuity.short_name})` : ''}`;
    const g = groups.get(k);
    if (!g) groups.set(k, { row: r, meanings: [meaning] });
    else if (!g.meanings.includes(meaning)) g.meanings.push(meaning);
  }
  return (
    <section aria-labelledby="legend-h" className="mt-10 border border-border bg-card p-4 text-sm">
      <h2 id="legend-h" className="mb-2 font-semibold">Key</h2>
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {[...groups.values()].map((g) => (
          <li key={g.row.key} className="flex items-start gap-2">
            <span className="mt-0.5"><Marker shape={markerShape(g.row)} color={markerColor(g.row)} size={14} /></span>
            <span>{g.meanings.join(' / ')}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-muted-foreground">
        <span>In-universe date confidence:</span>
        <ConfidenceBadge c="stated" small /><ConfidenceBadge c="inferred" small /><ConfidenceBadge c="disputed" small />
      </div>
      {cal?.kind === 'era' && (
        <p className="mt-3 border-l-2 pl-3 text-sm" style={{ borderColor: 'var(--u-secondary)' }} data-testid="calendar-note">
          <strong className="font-semibold">Calendar ({cal.before_label} / {cal.after_label}):</strong>{' '}
          {cal.has_year_zero ? `has a year 0 (shown as 0 ${cal.after_label}).` : `no year 0: 1 ${cal.before_label} is followed directly by 1 ${cal.after_label}.`}
          {cal.note && <span className="text-muted-foreground"> {cal.note}</span>}
        </p>
      )}
      {cal?.kind === 'ages' && (
        <p className="mt-3 border-l-2 pl-3 text-sm" style={{ borderColor: 'var(--u-secondary)' }} data-testid="calendar-note">
          <strong className="font-semibold">Calendar (Ages):</strong>{' '}
          {cal.ages.map((a) => `${a.label} = ${a.name}${a.length ? ` (${a.length} years)` : ''}`).join('; ')}. Each Age counts its years from 1.
          {cal.note && <span className="text-muted-foreground"> {cal.note}</span>}
        </p>
      )}
      <p className="mt-2 text-xs text-muted-foreground">Shapes, not just colours, distinguish branches and tiers. Hollow shapes have no fixed point; ▲ marks adjacent-tier titles.</p>
    </section>
  );
}
