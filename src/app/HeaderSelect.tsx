import { useRef, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// Last input modality, tracked app-wide: ':focus-visible' is unreliable when a Select hands focus back.
let lastInput: 'keyboard' | 'pointer' = 'pointer';
/** Last input modality (for tooltips that should open on keyboard focus but not on focus return). */
export const lastInputWasKeyboard = () => lastInput === 'keyboard';
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => { if (e.key === 'Tab') lastInput = 'keyboard'; }, true);
  window.addEventListener('pointerdown', () => { lastInput = 'pointer'; }, true);
}

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
export function HeaderSelect({ label, hint, value, options, onChange, placeholder, minRem = 8, disabled = false }: {
  label: string; hint: string; value: string; options: HeaderOption[]; onChange: (v: string) => void; placeholder?: string; minRem?: number; disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  // The hint opens on real pointer hover (after the provider's delay) or keyboard focus only. Radix would also
  // open it when the Select hands focus back to its trigger after a choice/Escape, and it then stayed open with
  // the pointer far away (user report: tooltips "interfering"), so focus that isn't :focus-visible is ignored.
  const [hover, setHover] = useState(false);
  const [kbd, setKbd] = useState(false);
  const hoverTimer = useRef<number | undefined>(undefined);
  const closedAt = useRef(0);
  const current = options.find((o) => o.value === value);
  const anyColor = options.some((o) => o.color);
  return (
    <Tooltip open={(hover || kbd) && !open} onOpenChange={(o) => { if (!o) { setHover(false); setKbd(false); } }}>
      <TooltipTrigger asChild>
        <div className="min-w-0 shrink" style={minRem ? { minWidth: `${minRem}rem` } : undefined}
          onPointerEnter={() => { window.clearTimeout(hoverTimer.current); hoverTimer.current = window.setTimeout(() => setHover(true), 350); }}
          onPointerLeave={() => { window.clearTimeout(hoverTimer.current); setHover(false); }}
          onPointerDown={() => { window.clearTimeout(hoverTimer.current); setHover(false); }}
          onFocus={() => setKbd(lastInput === 'keyboard' && Date.now() - closedAt.current > 500)}
          onBlur={() => setKbd(false)}>
          <Select disabled={disabled} value={value} onValueChange={onChange} open={open} onOpenChange={(o) => { setOpen(o); setHover(false); setKbd(false); if (!o) closedAt.current = Date.now(); }}>
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
      <TooltipContent className="max-w-xs">{disabled ? <>Pick a single universe to choose a continuity.<br /></> : null}{current ? <><strong className="font-semibold">{current.label}</strong><br /></> : null}{hint}</TooltipContent>
    </Tooltip>
  );
}
