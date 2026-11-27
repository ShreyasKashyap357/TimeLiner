import { useMemo, useRef, useState } from 'react';
import type { Continuity } from '@/domain/schema';
import type { Dataset } from '@/domain/model';
import { PRINT_TYPES } from '@/domain/model';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Check, ChevronDown } from 'lucide-react';
import { lastInputWasKeyboard } from './HeaderSelect';

interface Info { c: Continuity; titles: number; first: number | null; last: number | null; group: string }
const GROUPS = ['Shared universes', 'Animated', 'Live-action films & series', 'Books', 'Collections'] as const;

/** Groups are derived from the data (no franchise names in code): collections by kind, then by medium and size. */
function describe(ds: Dataset, conts: Continuity[]): Info[] {
  return conts.map((c) => {
    const ts = ds.titles.filter((t) => t.continuity === c.id);
    const years = ts.flatMap((t) => t.units.map((u) => u.release.year)).filter((y): y is number => y !== null);
    const animated = ts.filter((t) => t.type.startsWith('animated') || t.type === 'motion-comic').length;
    const print = ts.filter((t) => PRINT_TYPES.includes(t.type)).length;
    const group = c.kind === 'standalone-collection' ? 'Collections'
      : print > ts.length / 2 ? 'Books'
      : ts.length >= 3 && animated <= ts.length / 2 ? 'Shared universes'
      : animated > ts.length / 2 ? 'Animated' : 'Live-action films & series';
    return { c, titles: ts.length, first: years.length ? Math.min(...years) : null, last: years.length ? Math.max(...years) : null, group };
  });
}
const span = (i: Info) => (i.first === null ? '' : i.first === i.last ? `${i.first}` : `${i.first}–${i.last}`);

/**
 * Continuity picker for universes with many continuities (DC has ~40): a searchable list grouped into shared
 * universes, animation, live-action one-offs and collections, each with its title count and years.
 * Sized like the other header picker: as wide as the longest name, shrinking (with ellipsis) when space is short.
 */
export function ContinuityPicker({ ds, conts, value, onChange, disabled, placeholder }: {
  ds: Dataset; conts: Continuity[]; value: string; onChange: (id: string) => void; disabled?: boolean; placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [kbd, setKbd] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const closedAt = useRef(0);
  const infos = useMemo(() => describe(ds, conts), [ds, conts]);
  const current = infos.find((i) => i.c.id === value);
  const hint = disabled ? 'Pick a single universe to choose a continuity.' : 'Continuity used by the In-universe and Dual-axis views. In-universe order only exists within one continuity.';
  return (
    <Tooltip open={(hover || kbd) && !open} onOpenChange={(o) => { if (!o) { setHover(false); setKbd(false); } }}>
      <Popover open={open} onOpenChange={(o) => { setOpen(o); setHover(false); setKbd(false); if (!o) closedAt.current = Date.now(); }}>
        <TooltipTrigger asChild>
          <div className="min-w-0 shrink" style={{ minWidth: '9rem' }}
            onPointerEnter={() => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setHover(true), 350); }}
            onPointerLeave={() => { window.clearTimeout(timer.current); setHover(false); }}
            onPointerDown={() => { window.clearTimeout(timer.current); setHover(false); }}
            onFocus={() => setKbd(lastInputWasKeyboard() && Date.now() - closedAt.current > 500)}
            onBlur={() => setKbd(false)}>
            <PopoverTrigger asChild>
              <button type="button" role="combobox" aria-expanded={open} aria-label="Continuity (in-universe views)" disabled={disabled}
                className="flex h-8 w-full min-w-0 items-center justify-between gap-1.5 border border-input bg-transparent py-2 pr-2 pl-2.5 text-xs outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                {/* All names stacked in one cell: natural width = the longest, so the button doesn't jump. */}
                <span className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)] text-left">
                  {infos.map((i) => <span key={i.c.id} aria-hidden={i.c.id !== value} className={`col-start-1 row-start-1 truncate ${i.c.id === value ? '' : 'invisible'}`}>{i.c.name}</span>)}
                  {!current && <span className="col-start-1 row-start-1 truncate text-muted-foreground">{placeholder}</span>}
                </span>
                <ChevronDown aria-hidden className="size-4 shrink-0 text-muted-foreground" />
              </button>
            </PopoverTrigger>
          </div>
        </TooltipTrigger>
        <PopoverContent align="start" className="w-[min(30rem,calc(100vw-1rem))] p-0">
          <Command>
            <CommandInput placeholder={`Search ${infos.length} continuities…`} />
            <CommandList className="max-h-[min(28rem,calc(100dvh-10rem))]">
              <CommandEmpty>No continuity matches.</CommandEmpty>
              {GROUPS.map((g) => {
                const items = infos.filter((i) => i.group === g);
                if (!items.length) return null;
                return (
                  <CommandGroup key={g} heading={`${g} (${items.length})`}>
                    {items.map((i) => (
                      <CommandItem key={i.c.id} value={`${i.c.name} ${i.c.short_name} ${i.c.id}`} onSelect={() => { onChange(i.c.id); setOpen(false); }}>
                        <Check aria-hidden className={`size-4 shrink-0 ${i.c.id === value ? 'opacity-100' : 'opacity-0'}`} />
                        <span className="min-w-0 flex-1 [overflow-wrap:anywhere]">{i.c.name}</span>
                        <span className="shrink-0 text-muted-foreground tabular-nums">{i.titles} · {span(i)}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                );
              })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <TooltipContent className="max-w-xs">{current ? <><strong className="font-semibold">{current.c.name}</strong><br /></> : null}{hint}</TooltipContent>
    </Tooltip>
  );
}
