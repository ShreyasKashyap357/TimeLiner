import { useApp } from './context';
import type { Row } from '@/domain/model';
import type { Quick, SortId } from '@/domain/filters';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SlidersHorizontal } from 'lucide-react';

export function Toolbar({ sortOptions, prog, next, filterPanel }: {
  sortOptions: { id: SortId; label: string; alt?: string }[];
  prog: { done: number; total: number; pct: number };
  next: Row | null;
  filterPanel: React.ReactNode;
}) {
  const { state, update } = useApp();
  const sortValue = state.sort === 'alt' && state.alt ? `alt:${state.alt}` : state.sort;
  return (
    <div className="my-3 flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <ToggleGroup type="single" variant="outline" size="sm" value={state.quick} onValueChange={(v) => update({ quick: (v || 'all') as Quick })} aria-label="Quick type filter">
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="movies">Movies only</ToggleGroupItem>
          <ToggleGroupItem value="series">Series only</ToggleGroupItem>
          <ToggleGroupItem value="animated">Animated</ToggleGroupItem>
        </ToggleGroup>
        <Select value={sortValue} onValueChange={(v) => {
          if (v.startsWith('alt:')) update({ sort: 'alt', alt: v.slice(4) });
          else update({ sort: v as SortId, alt: null });
        }}>
          <SelectTrigger aria-label="Sort order" size="sm" className="w-60"><SelectValue /></SelectTrigger>
          <SelectContent>
            {sortOptions.map((o) => <SelectItem key={o.alt ? `alt:${o.alt}` : o.id} value={o.alt ? `alt:${o.alt}` : o.id}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="lg:hidden"><SlidersHorizontal aria-hidden className="size-4" /> Filters</Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[90vw] overflow-y-auto p-4 sm:max-w-sm">
            <SheetHeader className="px-0"><SheetTitle>Filters</SheetTitle><SheetDescription>Changes apply immediately.</SheetDescription></SheetHeader>
            {filterPanel}
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card px-3 py-2 text-sm">
        <span id="progress-label" className="whitespace-nowrap">Watched <strong>{prog.done}</strong> / {prog.total} in this view</span>
        <Progress value={prog.pct} aria-labelledby="progress-label" className="h-2 min-w-24 flex-1" />
        <span className="whitespace-nowrap text-muted-foreground">{prog.pct}%</span>
        {next && (
          <span className="w-full sm:w-auto">
            <span className="text-muted-foreground">What’s next: </span>
            <button type="button" className="font-medium underline" onClick={() => update({ unit: next.key })} data-testid="next-up">{next.name}</button>
          </span>
        )}
      </div>
    </div>
  );
}
