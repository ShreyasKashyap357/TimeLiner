import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export interface HeaderOption { value: string; label: string; color?: string }

/** Colour swatch with an outline in the foreground colour, so it reads on any background and the
 *  label text keeps the theme's foreground colour (contrast never depends on the accent). */
export function Swatch({ color, reserve = false }: { color?: string; reserve?: boolean }) {
  if (!color) return reserve ? <span aria-hidden className="size-3 shrink-0" /> : null;
  return <span aria-hidden className="size-3 shrink-0 ring-1 ring-foreground/60" style={{ background: color }} />;
}

/**
 * Header picker. Its natural width is the widest option (all labels are stacked in one grid cell, only
 * the selected one visible). In a crowded row it shrinks, the widest first (flex-shrink is proportional to
 * width), down to `minRem`; the shown value then ellipsises and the tooltip carries the full name.
 * The list opens below the trigger with every option visible. The hint tooltip is suppressed while open.
 */
export function HeaderSelect({ label, hint, value, options, onChange, placeholder, minRem = 8 }: {
  label: string; hint: string; value: string; options: HeaderOption[]; onChange: (v: string) => void; placeholder?: string; minRem?: number;
}) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const current = options.find((o) => o.value === value);
  const anyColor = options.some((o) => o.color);
  return (
    <Tooltip open={hover && !open} onOpenChange={setHover}>
      <TooltipTrigger asChild>
        <div className="min-w-0 shrink" style={minRem ? { minWidth: `${minRem}rem` } : undefined}>
          <Select value={value} onValueChange={onChange} open={open} onOpenChange={(o) => { setOpen(o); if (o) setHover(false); }}>
            <SelectTrigger aria-label={label} className="w-full min-w-0">
              <span className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)] text-left">
                {options.map((o) => (
                  <span key={o.value} aria-hidden={o.value !== value} className={`col-start-1 row-start-1 flex min-w-0 items-center gap-2 ${o.value === value ? '' : 'invisible'}`}>
                    <Swatch color={o.color} reserve={anyColor} /><span className="truncate">{o.label}</span>
                  </span>
                ))}
                {!current && <span className="col-start-1 row-start-1 truncate text-muted-foreground">{placeholder}</span>}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {options.map((o) => (
                  <SelectItem key={o.value} value={o.value} textValue={o.label}>
                    <span className="flex min-w-0 items-center gap-2"><Swatch color={o.color} reserve={anyColor} /><span className="whitespace-normal break-words">{o.label}</span></span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">{current ? <><strong className="font-semibold">{current.label}</strong><br /></> : null}{hint}</TooltipContent>
    </Tooltip>
  );
}
