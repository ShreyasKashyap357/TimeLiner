import { useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Check, ChevronDown } from 'lucide-react';
import { lastInputWasKeyboard, Swatch, type HeaderOption } from './HeaderSelect';

/**
 * Header picker with type-to-search, for long lists (the Universe list has 50+ entries). Same trigger look,
 * tooltip timing and keyboard behaviour as HeaderSelect. `pinned` options (e.g. "All universes") stay on top.
 */
export function SearchablePicker({ label, hint, value, options, onChange, pinned = [], noun }: {
  label: string; hint: string; value: string; options: HeaderOption[]; onChange: (v: string) => void; pinned?: string[]; noun: string;
}) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [kbd, setKbd] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const closedAt = useRef(0);
  const current = options.find((o) => o.value === value);
  const top = options.filter((o) => pinned.includes(o.value));
  const rest = options.filter((o) => !pinned.includes(o.value));
  const anyColor = options.some((o) => o.color);
  const item = (o: HeaderOption) => (
    <CommandItem key={o.value} value={`${o.label} ${o.value}`} onSelect={() => { onChange(o.value); setOpen(false); }}>
      <Check aria-hidden className={`size-4 shrink-0 ${o.value === value ? 'opacity-100' : 'opacity-0'}`} />
      <Swatch color={o.color} reserve={anyColor} />
      <span className="min-w-0 flex-1 [overflow-wrap:anywhere]">{o.label}</span>
    </CommandItem>
  );
  return (
    <Tooltip open={(hover || kbd) && !open} onOpenChange={(o) => { if (!o) { setHover(false); setKbd(false); } }}>
      <Popover open={open} onOpenChange={(o) => { setOpen(o); setHover(false); setKbd(false); if (!o) closedAt.current = Date.now(); }}>
        <TooltipTrigger asChild>
          <div className="min-w-0 shrink" style={{ minWidth: '8rem' }}
            onPointerEnter={() => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setHover(true), 350); }}
            onPointerLeave={() => { window.clearTimeout(timer.current); setHover(false); }}
            onPointerDown={() => { window.clearTimeout(timer.current); setHover(false); }}
            onFocus={() => setKbd(lastInputWasKeyboard() && Date.now() - closedAt.current > 500)}
            onBlur={() => setKbd(false)}>
            <PopoverTrigger asChild>
              <button type="button" role="combobox" aria-expanded={open} aria-label={label}
                className="flex h-8 w-full min-w-0 items-center justify-between gap-1.5 border border-input bg-transparent py-2 pr-2 pl-2.5 text-xs outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <Swatch color={current?.color} />
                {/* All labels stacked in one cell: natural width = the longest, so the button doesn't jump. */}
                <span className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)] text-left">
                  {options.map((o) => <span key={o.value} aria-hidden={o.value !== value} className={`col-start-1 row-start-1 truncate ${o.value === value ? '' : 'invisible'}`}>{o.label}</span>)}
                </span>
                <ChevronDown aria-hidden className="size-4 shrink-0 text-muted-foreground" />
              </button>
            </PopoverTrigger>
          </div>
        </TooltipTrigger>
        <PopoverContent align="start" className="w-[min(22rem,calc(100vw-1rem))] p-0">
          <Command>
            <CommandInput placeholder={`Search ${rest.length} ${noun}…`} />
            <CommandList className="max-h-[min(28rem,calc(100dvh-10rem))]">
              <CommandEmpty>No {noun.replace(/s$/, '')} matches.</CommandEmpty>
              {top.length > 0 && <CommandGroup>{top.map(item)}</CommandGroup>}
              <CommandGroup>{rest.map(item)}</CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <TooltipContent className="max-w-xs">{current ? <><strong className="font-semibold">{current.label}</strong><br /></> : null}{hint}</TooltipContent>
    </Tooltip>
  );
}
