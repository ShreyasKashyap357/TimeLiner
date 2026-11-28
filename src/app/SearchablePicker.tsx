import { useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Check, ChevronDown } from 'lucide-react';
import { lastInputWasKeyboard, Swatch, type HeaderOption } from './HeaderSelect';

/** `group` puts the option under a heading (groups keep the order of their first option); `detail` is a second,
 *  muted line that is also searched (e.g. "Percy Jackson" finds the Riordanverse). */
export interface PickerOption extends HeaderOption { group?: string; detail?: string }

const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
/** Plain substring search (cmdk's default fuzzy match finds "d…u…n…e" in nearly every long description):
 *  name and id matches rank above description-only matches. */
function pickerFilter(value: string, search: string, keywords?: string[]): number {
  const q = fold(search.trim());
  if (!q) return 1;
  const v = fold(value);
  if (v.startsWith(q)) return 1;
  if (v.includes(q)) return 0.8;
  return keywords?.some((k) => fold(k).includes(q)) ? 0.3 : 0;
}

/**
 * Header picker with type-to-search, for long lists (the Universe list has 50+ entries). Same trigger look,
 * tooltip timing and keyboard behaviour as HeaderSelect. `pinned` options (e.g. "All universes") stay on top;
 * the rest are grouped like the Continuity picker when options carry a `group`.
 */
export function SearchablePicker({ label, hint, value, options, onChange, pinned = [], noun }: {
  label: string; hint: string; value: string; options: PickerOption[]; onChange: (v: string) => void; pinned?: string[]; noun: string;
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
  const groups = [...new Set(rest.map((o) => o.group ?? ''))];
  const item = (o: PickerOption) => (
    <CommandItem key={o.value} value={`${o.label} ${o.value}`} keywords={o.detail ? [o.detail] : undefined} onSelect={() => { onChange(o.value); setOpen(false); }}
      className={o.detail ? 'items-start' : undefined}>
      <Check aria-hidden className={`size-4 shrink-0 ${o.detail ? 'mt-0.5 ' : ''}${o.value === value ? 'opacity-100' : 'opacity-0'}`} />
      <Swatch color={o.color} reserve={anyColor} />
      <span className="min-w-0 flex-1">
        <span className="block [overflow-wrap:anywhere]">{o.label}</span>
        {o.detail && <span className="line-clamp-1 text-xs text-muted-foreground">{o.detail}</span>}
      </span>
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
        <PopoverContent align="start" className="w-[min(26rem,calc(100vw-1rem))] p-0">
          <Command filter={pickerFilter}>
            <CommandInput placeholder={`Search ${rest.length} ${noun}…`} />
            <CommandList className="max-h-[min(28rem,calc(100dvh-10rem))]">
              <CommandEmpty>No {noun.replace(/s$/, '')} matches.</CommandEmpty>
              {top.length > 0 && <CommandGroup>{top.map(item)}</CommandGroup>}
              {groups.map((g) => {
                const items = rest.filter((o) => (o.group ?? '') === g);
                return <CommandGroup key={g} heading={g ? `${g} (${items.length})` : undefined}>{items.map(item)}</CommandGroup>;
              })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <TooltipContent className="max-w-xs">{current ? <><strong className="font-semibold">{current.label}</strong><br /></> : null}{hint}</TooltipContent>
    </Tooltip>
  );
}
