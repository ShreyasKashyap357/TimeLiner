import { useApp } from '@/app/context';
import { formatRelease } from '@/domain/dates';
import { doneVerb, type Row } from '@/domain/model';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { RowMarker, markerMeaning } from './Marker';
import { ConfidenceBadge } from './Badges';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { connectionsFor, describeConnection } from '@/domain/views';
import { Link2 } from 'lucide-react';
import { tierText } from '@/domain/labels';
import { useMemo } from 'react';

/** One unit as a list item: marker, name (opens drawer), meta, watched checkbox. */
export function UnitItem({ row, meta = 'release', compact = false }: { row: Row; meta?: 'release' | 'in-universe' | 'both' | 'none'; compact?: boolean }) {
  const { update, watched, label, ds, multiUniverse } = useApp();
  const conns = useMemo(() => (compact ? [] : connectionsFor(row.title.id, ds)), [row.title.id, ds, compact]);
  const isWatched = watched.set.has(row.key);
  const iu = row.unit.in_universe;
  const metaText = meta === 'none' ? null
    : meta === 'release' ? formatRelease(row.unit.release.date)
    : meta === 'in-universe' ? iu.label
    : `${iu.label} · ${formatRelease(row.unit.release.date)}`;
  return (
    <li className={cn('group flex items-start gap-2 px-1 py-0.5', isWatched && 'opacity-70')} data-unit={row.key}>
      <Checkbox
        checked={isWatched}
        onCheckedChange={(v) => watched.toggle(row.key, v === true)}
        aria-label={`Mark "${row.name}" as ${doneVerb(row.type)}`}
        className="mt-0.5"
      />
      <Tooltip>
        <TooltipTrigger asChild><span className="mt-[5px] cursor-help"><RowMarker row={row} /></span></TooltipTrigger>
        <TooltipContent>{markerMeaning(row)} · {row.continuity.short_name}</TooltipContent>
      </Tooltip>
      <span className="sr-only">{markerMeaning(row)}:</span>
      <button
        type="button"
        onClick={() => update({ unit: row.key })}
        className={cn('min-w-0 flex-1 text-left text-sm leading-snug hover:underline focus-visible:underline', isWatched && 'line-through decoration-muted-foreground/60')}
      >
        <span className="text-foreground">{row.name}</span>
        {multiUniverse && (
          <span className="ml-2 inline-flex items-center gap-1 border border-border px-1 align-middle text-[0.7rem] text-muted-foreground" data-universe={row.universe.id}>
            <span aria-hidden className="size-2 ring-1 ring-foreground/60" style={{ background: row.universe.accent.primary }} />
            {row.universe.short_name}
          </span>
        )}
        {!compact && (
          <span className="ml-2 text-xs text-muted-foreground">
            {metaText}
            {row.tier !== 'core' && row.tier !== 'outside-set-date' ? ` · ${tierText(row.tier).toLowerCase()}` : ''}
            {row.unit.status !== 'released' ? ` · ${row.unit.status}` : ''}
          </span>
        )}
      </button>
      {conns.length > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button" onClick={() => update({ unit: row.key })} className="mt-0.5 inline-flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground" aria-label={`${conns.length} connection${conns.length > 1 ? 's' : ''} – open details`}>
              <Link2 className="size-3.5" aria-hidden />{conns.length}
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-sm">
            <ul className="space-y-0.5">{conns.slice(0, 8).map((c, i) => <li key={i}>{describeConnection(c)} <strong>{c.title}</strong></li>)}</ul>
            {conns.length > 8 && <div>…and {conns.length - 8} more</div>}
          </TooltipContent>
        </Tooltip>
      )}
      {!compact && iu.confidence !== 'stated' && meta !== 'release' && <ConfidenceBadge c={iu.confidence} small note={iu.note} unitKey={row.key} />}
      {!compact && <span className="hidden text-xs text-muted-foreground md:inline">{label.platform(row.platform)}</span>}
    </li>
  );
}
