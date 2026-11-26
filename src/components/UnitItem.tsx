import { useApp } from '@/app/context';
import { formatRelease } from '@/domain/dates';
import type { Row } from '@/domain/model';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { RowMarker, markerMeaning } from './Marker';
import { ConfidenceBadge } from './Badges';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

/** One unit as a list item: marker, name (opens drawer), meta, watched checkbox. */
export function UnitItem({ row, meta = 'release', compact = false }: { row: Row; meta?: 'release' | 'in-universe' | 'both' | 'none'; compact?: boolean }) {
  const { update, watched, label } = useApp();
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
        aria-label={`Mark "${row.name}" as watched`}
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
        {!compact && (
          <span className="ml-2 text-xs text-muted-foreground">
            {metaText}
            {row.tier !== 'core' && row.tier !== 'outside-set-date' ? ` · ${row.tier}` : ''}
            {row.unit.status !== 'released' ? ` · ${row.unit.status}` : ''}
          </span>
        )}
      </button>
      {!compact && iu.confidence !== 'stated' && meta !== 'release' && <ConfidenceBadge c={iu.confidence} small />}
      {!compact && <span className="hidden text-xs text-muted-foreground md:inline">{label.platform(row.platform)}</span>}
    </li>
  );
}
