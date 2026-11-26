import { useState } from 'react';
import { useApp } from '@/app/context';
import { altPosition, spine } from '@/domain/views';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';
import type { Row } from '@/domain/model';
import { UnitItem } from '@/components/UnitItem';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { ConfidenceBadge } from '@/components/Badges';
import { formatRelease } from '@/domain/dates';
import { SpoilerText } from '@/components/SpoilerText';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

/** In-universe chronology of one continuity, drawn as a vertical spine (as in the reference image). */
export function SpineView({ rows }: { rows: Row[] }) {
  const { state, altOrder, alt, watched, ds } = useApp();
  const cont = ds.continuities.find((c) => c.id === state.c);
  const optional = new Set(state.sort === 'alt' ? alt?.optional_unit_ids ?? [] : []);
  const res = spine(rows, state.sort, { altOrder, watched: watched.set, alt: { headings: alt?.kind === 'recommended' ? 'release' : 'in-universe', optional, essentialsOnly: state.ess } });
  const calendarless = cont?.calendar.kind === 'ordered-only';
  if (!rows.length) return <Empty />;
  return (
    <div className="space-y-8">
      <WatchOrderCard />
      {calendarless && (
        <p className="border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
          {cont!.name} has no in-universe calendar in the sources, so entries are shown in story order only.
        </p>
      )}
      <ol className="relative ml-2 border-l-2 pl-6" style={{ borderColor: 'var(--u-secondary)' }} aria-label={`${cont?.name ?? 'Timeline'}: in-universe order`}>
        {res.sections.map((s) => (
          <li key={s.id} className="relative mb-4">
            <span aria-hidden className="absolute -left-[33px] top-1 size-4 rounded-full border-2 bg-background" style={{ borderColor: 'var(--u-secondary)' }} />
            {s.label && <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--u-primary)' }}>{s.label}</h3>}
            <ul className="mt-1 space-y-0.5">
              {s.rows.map((r) => <SpineEntry key={r.key} row={r} position={altPosition(state.sort === 'alt' ? altOrder : undefined, r.key)} optional={optional.has(r.key)} />)}
            </ul>
          </li>
        ))}
      </ol>
      {res.unplaced.map((lane) => (
        <section key={lane.lane} aria-labelledby={`lane-${lane.lane}`} className="border border-dashed border-border p-4">
          <h3 id={`lane-${lane.lane}`} className="font-heading text-base font-semibold text-muted-foreground">{lane.label}</h3>
          <p className="mb-2 text-xs text-muted-foreground">{lane.lane === 'not-in-order' ? 'These entries do not appear in the selected order (for example titles not available on that service).' : lane.lane === 'optional' ? 'The guides behind this order treat these as optional on a first watch. They are listed in order.' : 'No fixed point on this timeline. Shown in relative order where sources give one.'}</p>
          <ul className="space-y-0.5">{lane.rows.map((r) => <SpineEntry key={r.key} row={r} position={lane.lane === 'optional' ? altPosition(altOrder, r.key) : null} optional={lane.lane === 'optional'} />)}</ul>
        </section>
      ))}
    </div>
  );
}

function SpineEntry({ row, position = null, optional = false }: { row: Row; position?: number | null; optional?: boolean }) {
  const [open, setOpen] = useState(false);
  const iu = row.unit.in_universe;
  return (
    <Collapsible open={open} onOpenChange={setOpen} asChild>
      <li className="list-none">
        <div className="flex items-start">
          {position !== null && <Badge variant="secondary" className="mr-1 mt-0.5 min-w-9 justify-center tabular-nums" aria-label={`Position ${position}`}>#{position}</Badge>}
          <ul className="min-w-0 flex-1"><UnitItem row={row} meta={row.placed ? 'release' : 'in-universe'} /></ul>
          {optional && <Badge variant="outline" className="ml-1 mt-0.5 shrink-0 text-muted-foreground" title="Optional on a first watch, per the guides behind this order">Optional</Badge>}
          <CollapsibleTrigger className="ml-1 rounded p-1 text-muted-foreground hover:text-foreground" aria-label={`${open ? 'Hide' : 'Show'} details for ${row.name}`}>
            <ChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mb-2 ml-12 bg-muted/40 p-2 text-xs text-muted-foreground">
          <div className="mb-1 flex flex-wrap items-center gap-2 text-foreground">
            <span>{iu.label}</span><ConfidenceBadge c={iu.confidence} small /><span className="text-muted-foreground">Released {formatRelease(row.unit.release.date)}</span>
          </div>
          <SpoilerText unitKey={row.key}>{iu.note}</SpoilerText>
        </CollapsibleContent>
      </li>
    </Collapsible>
  );
}

export function Empty() {
  return <p className="py-12 text-center text-muted-foreground">Nothing matches the current filters.</p>;
}

/** Watch-order chooser: story order, release order and any official orders the continuity defines (with sources). */
function WatchOrderCard() {
  const { state, update, ds } = useApp();
  const cont = ds.continuities.find((c) => c.id === state.c);
  const alts = cont?.alt_orders ?? [];
  const value = state.sort === 'alt' && state.alt ? `alt:${state.alt}` : state.sort === 'release' ? 'release' : 'in-universe';
  const current = alts.find((a) => `alt:${a.id}` === value);
  const describe = value === 'release'
    ? 'Release order: the order in which the titles were first released.'
    : current?.kind === 'recommended' ? `${current.label}: collated from ${current.sources.length} published guides for new viewers. ${current.note}`
    : current ? `${current.label}: the official order published for this continuity. ${current.note}`
    : 'Story order: chronological by when events happen in-universe (this continuity only).';
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Watch order</CardTitle>
        <CardDescription>
          {describe}
          {current && current.kind !== 'recommended' && <> Source: <a className="underline" href={current.source_url} target="_blank" rel="noreferrer noopener">{new URL(current.source_url).hostname}</a> (as of {current.as_of}).</>}
          {current?.kind === 'recommended' && (
            <span className="mt-1 block">Sources (as of {current.as_of}):{' '}
              {current.sources.map((src, i) => <span key={src.url}>{i > 0 && ', '}<a className="underline" href={src.url} target="_blank" rel="noreferrer noopener" title={src.title}>{new URL(src.url).hostname.replace(/^www./, '')}</a></span>)}.
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ToggleGroup type="single" variant="outline" className="flex-wrap" value={value} aria-label="Watch order"
          onValueChange={(v) => { if (!v) return; if (v.startsWith('alt:')) update({ sort: 'alt', alt: v.slice(4) }); else update({ sort: v as 'release' | 'in-universe', alt: null }); }}>
          <ToggleGroupItem value="in-universe">Story (in-universe)</ToggleGroupItem>
          <ToggleGroupItem value="release">Release</ToggleGroupItem>
          {alts.map((a) => <ToggleGroupItem key={a.id} value={`alt:${a.id}`}>{a.label}</ToggleGroupItem>)}
        </ToggleGroup>
        {current && current.optional_unit_ids.length > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <Switch id="essentials-only" checked={state.ess} onCheckedChange={(v) => update({ ess: v })} />
            <Label htmlFor="essentials-only">Essentials only (hide {current.optional_unit_ids.length} optional)</Label>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
