import { useState } from 'react';
import { useApp } from '@/app/context';
import { spine } from '@/domain/views';
import type { Row } from '@/domain/model';
import { UnitItem } from '@/components/UnitItem';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { ConfidenceBadge } from '@/components/Badges';
import { formatRelease } from '@/domain/dates';

/** In-universe chronology of one continuity, drawn as a vertical spine (as in the reference image). */
export function SpineView({ rows }: { rows: Row[] }) {
  const { state, altOrder, watched, ds } = useApp();
  const cont = ds.continuities.find((c) => c.id === state.c);
  const res = spine(rows, state.sort, { altOrder, watched: watched.set });
  const calendarless = cont?.calendar.kind === 'ordered-only';
  if (!rows.length) return <Empty />;
  return (
    <div className="space-y-8">
      {calendarless && (
        <p className="rounded-md border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
          {cont!.name} has no in-universe calendar in the sources, so entries are shown in story order only.
        </p>
      )}
      <ol className="relative ml-2 border-l-2 pl-6" style={{ borderColor: 'var(--u-secondary)' }} aria-label={`${cont?.name ?? 'Timeline'}: in-universe order`}>
        {res.sections.map((s) => (
          <li key={s.id} className="relative mb-4">
            <span aria-hidden className="absolute -left-[33px] top-1 size-4 rounded-full border-2 bg-background" style={{ borderColor: 'var(--u-secondary)' }} />
            {s.label && <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--u-primary)' }}>{s.label}</h3>}
            <ul className="mt-1 space-y-0.5">
              {s.rows.map((r) => <SpineEntry key={r.key} row={r} />)}
            </ul>
          </li>
        ))}
      </ol>
      {res.unplaced.map((lane) => (
        <section key={lane.lane} aria-labelledby={`lane-${lane.lane}`} className="rounded-lg border border-dashed border-border p-4">
          <h3 id={`lane-${lane.lane}`} className="font-heading text-base font-semibold text-muted-foreground">{lane.label}</h3>
          <p className="mb-2 text-xs text-muted-foreground">No fixed point on this timeline. Shown in relative order where sources give one.</p>
          <ul className="space-y-0.5">{lane.rows.map((r) => <SpineEntry key={r.key} row={r} />)}</ul>
        </section>
      ))}
    </div>
  );
}

function SpineEntry({ row }: { row: Row }) {
  const [open, setOpen] = useState(false);
  const iu = row.unit.in_universe;
  return (
    <Collapsible open={open} onOpenChange={setOpen} asChild>
      <li className="list-none">
        <div className="flex items-start">
          <ul className="min-w-0 flex-1"><UnitItem row={row} meta={row.placed ? 'release' : 'in-universe'} /></ul>
          <CollapsibleTrigger className="ml-1 rounded p-1 text-muted-foreground hover:text-foreground" aria-label={`${open ? 'Hide' : 'Show'} details for ${row.name}`}>
            <ChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mb-2 ml-12 rounded-md bg-muted/40 p-2 text-xs text-muted-foreground">
          <div className="mb-1 flex flex-wrap items-center gap-2 text-foreground">
            <span>{iu.label}</span><ConfidenceBadge c={iu.confidence} small /><span className="text-muted-foreground">Released {formatRelease(row.unit.release.date)}</span>
          </div>
          {iu.note}
        </CollapsibleContent>
      </li>
    </Collapsible>
  );
}

export function Empty() {
  return <p className="py-12 text-center text-muted-foreground">Nothing matches the current filters.</p>;
}
