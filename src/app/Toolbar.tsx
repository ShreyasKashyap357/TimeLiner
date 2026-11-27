import { useApp } from './context';
import type { Row } from '@/domain/model';
import type { Quick, SortId } from '@/domain/filters';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { SlidersHorizontal, Film, Tv, Sparkles, LayoutList, ArrowRight, BookOpen, Radio, Theater } from 'lucide-react';
import { formatRelease } from '@/domain/dates';

const QUICK: { v: Quick; label: string; icon: React.ComponentType<{ className?: string }>; tip: string }[] = [
  { v: 'all', label: 'All', icon: LayoutList, tip: 'Show every type' },
  { v: 'movies', label: 'Movies only', icon: Film, tip: 'Films, one-shots and specials' },
  { v: 'series', label: 'Series only', icon: Tv, tip: 'Series seasons, episode ranges and crossover events' },
  { v: 'animated', label: 'Animated', icon: Sparkles, tip: 'Animated series and films only' },
  { v: 'books', label: 'Books', icon: BookOpen, tip: 'Novels, novellas, comics and other print' },
  { v: 'audio', label: 'Audio', icon: Radio, tip: 'Radio dramas, audio dramas and podcasts' },
  { v: 'stage', label: 'Stage', icon: Theater, tip: 'Plays, musicals and live shows' },
];
const QUICK_MEDIUM: Partial<Record<Quick, Row['medium']>> = { books: 'print', audio: 'audio', stage: 'stage' };

export function Toolbar({ sortOptions, prog, next, counts, filterPanel }: {
  sortOptions: { id: SortId; label: string; alt?: string }[];
  prog: { done: number; total: number; pct: number };
  next: Row | null;
  counts: { shown: number; total: number; released: number };
  filterPanel: React.ReactNode;
}) {
  const { state, update, rows } = useApp();
  // Medium toggles appear only when the current universe has titles in that medium.
  const hasMedium = (m: Row['medium']) => rows.some((r) => r.medium === m && (state.u === 'all' || r.universe.id === state.u));
  return (
    <div className="my-4 flex flex-col gap-4">
      {/* dashboard stats */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card size="sm">
          <CardHeader>
            <CardDescription>Entries in this view</CardDescription>
            <CardTitle className="text-2xl tabular-nums">{counts.shown}<span className="text-base font-normal text-muted-foreground"> / {counts.total}</span></CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">{counts.released} released · {counts.shown - counts.released} upcoming</CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardDescription id="progress-label">Done in this view (watched or read)</CardDescription>
            <CardTitle className="text-2xl tabular-nums">{prog.pct}%<span className="text-base font-normal text-muted-foreground"> · {prog.done} / {prog.total}</span></CardTitle>
          </CardHeader>
          <CardContent><Progress value={prog.pct} aria-labelledby="progress-label" /></CardContent>
        </Card>
        <Card size="sm" className="sm:col-span-2">
          <CardHeader>
            <CardDescription>What’s next in this order</CardDescription>
            {next ? (
              <CardTitle className="text-lg">
                <button type="button" className="inline-flex items-center gap-2 text-left hover:underline" onClick={() => update({ unit: next.key })} data-testid="next-up">
                  {next.name} <ArrowRight aria-hidden className="size-4" />
                </button>
              </CardTitle>
            ) : <CardTitle className="text-lg text-muted-foreground">All caught up</CardTitle>}
          </CardHeader>
          {next && <CardContent className="text-muted-foreground">{next.unit.in_universe.label} · released {formatRelease(next.unit.release.date)} · {next.continuity.short_name}</CardContent>}
        </Card>
      </div>
      {/* controls */}
      <div className="flex flex-wrap items-center gap-2">
        <ToggleGroup type="single" variant="outline" className="flex-wrap" value={state.quick} onValueChange={(v) => update({ quick: (v || 'all') as Quick })} aria-label="Quick type filter">
          {QUICK.filter((q) => !QUICK_MEDIUM[q.v] || hasMedium(QUICK_MEDIUM[q.v]!)).map((q) => (
            <ToggleGroupItem key={q.v} value={q.v}>
              {/* tooltip on an inner span: a TooltipTrigger on the item itself would overwrite its data-state="on" */}
              <Tooltip>
                <TooltipTrigger asChild><span className="inline-flex items-center gap-1"><q.icon className="size-4" aria-hidden />{q.label}</span></TooltipTrigger>
                <TooltipContent>{q.tip}</TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <SortSelect sortOptions={sortOptions} />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden"><SlidersHorizontal aria-hidden className="size-4" /> Filters</Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[90vw] overflow-y-auto bg-sidebar p-4 text-sidebar-foreground sm:max-w-sm">
            <SheetHeader className="px-0"><SheetTitle>Filters</SheetTitle><SheetDescription>Changes apply immediately.</SheetDescription></SheetHeader>
            {filterPanel}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

/** Sort order picker, shared by the toolbar and the filter sidebar. */
export function SortSelect({ sortOptions, className = 'w-64' }: { sortOptions: { id: SortId; label: string; alt?: string }[]; className?: string }) {
  const { state, update } = useApp();
  const sortValue = state.sort === 'alt' && state.alt ? `alt:${state.alt}` : state.sort;
  return (
    <Select value={sortValue} onValueChange={(v) => {
      if (v.startsWith('alt:')) update({ sort: 'alt', alt: v.slice(4) });
      else update({ sort: v as SortId, alt: null });
    }}>
      <SelectTrigger aria-label="Sort order" className={className}><SelectValue /></SelectTrigger>
      <SelectContent>
        {sortOptions.map((o) => <SelectItem key={o.alt ? `alt:${o.alt}` : o.id} value={o.alt ? `alt:${o.alt}` : o.id}>{o.label}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}
