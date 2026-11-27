import { useState } from 'react';
import { ChevronDown, EyeOff } from 'lucide-react';
import { useApp } from '@/app/context';
import { formatRelease } from '@/domain/dates';
import type { Unit } from '@/domain/schema';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tip } from './Tip';

/** Episodes shown before the list collapses. */
const SHORT_LIST = 8;
const fmt = (m: number) => m.toLocaleString('en-US', { maximumFractionDigits: 2 });

/** TV viewership (R-56): season average, the source's measure, a per-episode bar chart and the figures as a list.
 *  Episode titles follow spoiler-safe mode like the rest of the drawer. `cite` numbers a source like the drawer does. */
export function Viewership({ unit, unitKey, cite }: { unit: Unit; unitKey: string; cite: (url: string | null) => React.ReactNode }) {
  const { spoilerSafe, watched } = useApp();
  const [revealed, setRevealed] = useState(false);
  const [open, setOpen] = useState(false);
  const v = unit.viewership;
  if (!v) return null;
  const hideTitles = spoilerSafe && !revealed && !watched.set.has(unitKey);
  const eps = v.episodes;
  const max = Math.max(0, ...eps.map((e) => e.millions ?? 0));
  const epName = (e: (typeof eps)[number]) => (hideTitles || !e.title ? `Episode ${e.n}` : `${e.n}. ${e.title}`);
  const figure = (m: number | null) => (m === null ? 'not available' : `${fmt(m)} million`);
  const item = (e: (typeof eps)[number], i: number) => (
    <li key={i} className="flex items-baseline justify-between gap-3 border-b border-border/60 py-1 last:border-0">
      <span className="min-w-0 [overflow-wrap:anywhere]">
        {epName(e)}
        {e.date && <span className="text-xs text-muted-foreground"> · {formatRelease(e.date)}</span>}
      </span>
      <span className={`shrink-0 tabular-nums ${e.millions === null ? 'text-xs text-muted-foreground' : ''}`}>{e.millions === null ? 'not available' : fmt(e.millions)}</span>
    </li>
  );

  return (
    <section className="space-y-2">
      <Separator className="my-3" />
      <h3 className="text-sm font-semibold">Viewers</h3>
      <p className="text-sm">
        {v.season_average !== null ? (
          <>
            Season average: <span className="font-medium tabular-nums">{fmt(v.season_average)} million</span>
            {cite(v.average_source_url ?? v.source_url)}{' '}
            <span className="text-muted-foreground">({v.season_average_kind === 'stated' ? 'stated by the source' : 'average of the episode figures'})</span>
          </>
        ) : (
          <>Per-episode figures{cite(v.source_url)}</>
        )}
      </p>
      <p className="text-xs text-muted-foreground">Measure: {v.measure}{v.average_source_url && eps.length > 0 ? <>; episode figures{cite(v.source_url)}</> : null}</p>
      {v.note && <p className="text-xs leading-relaxed text-muted-foreground">{v.note}</p>}

      {eps.length > 0 && max > 0 && (
        <div role="img" aria-label={`Bar chart of ${v.measure} for ${eps.length} episodes. The figures are listed below.`} className="relative mt-1 flex h-24 items-end gap-0.5 border-b border-border">
          {v.season_average !== null && (
            <div aria-hidden className="pointer-events-none absolute inset-x-0 border-t border-dashed border-muted-foreground/60" style={{ bottom: `${(v.season_average / max) * 100}%` }} />
          )}
          {eps.map((e, i) => (
            <Tip key={i} content={<span>{epName(e)}<br />{figure(e.millions)}</span>}>
              <span className="flex h-full min-w-0 flex-1 items-end">
                {e.millions === null ? (
                  <span className="block h-1 w-full rounded-t-sm border border-dashed border-muted-foreground/60" />
                ) : (
                  <span className="block w-full rounded-t-sm opacity-80 hover:opacity-100" style={{ height: `${Math.max(2, (e.millions / max) * 100)}%`, background: 'var(--u-primary, var(--primary))' }} />
                )}
              </span>
            </Tip>
          ))}
        </div>
      )}
      {eps.length > 0 && v.season_average !== null && max > 0 && (
        <p className="text-xs text-muted-foreground">Dashed line: season average. Tallest bar: {fmt(max)} million.</p>
      )}

      {eps.length > 0 && (
        <>
          {hideTitles && eps.some((e) => e.title) && (
            <button type="button" onClick={() => setRevealed(true)} className="inline-flex items-center gap-1 text-xs text-muted-foreground underline decoration-dotted">
              <EyeOff className="size-3" aria-hidden /> Episode titles hidden (spoiler-safe mode). Reveal
            </button>
          )}
          <Collapsible open={open || eps.length <= SHORT_LIST} onOpenChange={setOpen}>
            <ol aria-label={`${v.measure}, by episode`} className="text-sm">
              {eps.slice(0, SHORT_LIST).map(item)}
            </ol>
            {eps.length > SHORT_LIST && (
              <>
                <CollapsibleContent asChild>
                  <ol aria-label={`${v.measure}, remaining episodes`} start={SHORT_LIST + 1} className="text-sm">
                    {eps.slice(SHORT_LIST).map((e, i) => item(e, i + SHORT_LIST))}
                  </ol>
                </CollapsibleContent>
                <CollapsibleTrigger className="mt-1 inline-flex items-center gap-1 text-xs text-primary underline">
                  <ChevronDown className={`size-3 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
                  {open ? 'Show fewer episodes' : `Show all ${eps.length} episodes`}
                </CollapsibleTrigger>
              </>
            )}
          </Collapsible>
        </>
      )}
    </section>
  );
}
