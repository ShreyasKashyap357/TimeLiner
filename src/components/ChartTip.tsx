// Shared pieces for the SVG charts (dual-axis, connections, branch graph): the floating card, the row summary
// inside it, point shapes, and the hover/pin behaviour (hover or focus shows the card; a click pins it until a
// click outside it, a click on the same mark, or Esc).
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Row } from '@/domain/model';
import { Marker, markerColor, markerMeaning, markerShape } from '@/components/Marker';
import { ConfidenceBadge } from '@/components/Badges';
import { formatRelease } from '@/domain/dates';
import { Button } from '@/components/ui/button';
import { useApp } from '@/app/context';

export interface TipState<T = ReactNode> { key: string; x: number; y: number; content: T }

/** Hover/focus shows a card; click pins it. Marks carry `data-tip-mark` so clicking another mark re-pins
 *  instead of first closing. */
export function usePinnedTip<T = ReactNode>() {
  const [tip, setTip] = useState<TipState<T> | null>(null);
  const [pinned, setPinned] = useState(false);
  const card = useRef<HTMLDivElement>(null);
  const pin = useRef(pinned);
  pin.current = pinned;
  useEffect(() => {
    if (!pinned) return;
    const down = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t || card.current?.contains(t) || t.closest('[data-tip-mark]')) return;
      setPinned(false); setTip(null);
    };
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') { setPinned(false); setTip(null); } };
    document.addEventListener('pointerdown', down);
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('pointerdown', down); document.removeEventListener('keydown', key); };
  }, [pinned]);
  return {
    tip, pinned, card,
    /** props for a mark: hover/focus preview, click pins (click again unpins) */
    mark: (t: TipState<T>) => ({
      'data-tip-mark': true,
      onMouseEnter: () => { if (!pin.current) setTip(t); },
      onMouseLeave: () => { if (!pin.current) setTip(null); },
      onFocus: () => { if (!pin.current) setTip(t); },
      onBlur: () => { if (!pin.current) setTip(null); },
      onClick: () => {
        if (pin.current && tip?.key === t.key) { setPinned(false); setTip(null); return; }
        setTip(t); setPinned(true);
      },
    }),
    active: (key: string) => tip?.key === key,
    close: () => { setPinned(false); setTip(null); },
  };
}

/** Floating card positioned in % of the chart's viewBox, so it tracks the SVG at any width. Pinned cards take
 *  pointer events (their buttons work); previews don't (they never block the marks under them). */
export function ChartTip({ x, y, w, h, children, pinned = false, cardRef }: {
  x: number; y: number; w: number; h: number; children: ReactNode; pinned?: boolean; cardRef?: React.Ref<HTMLDivElement>;
}) {
  const left = (x / w) * 100, top = (y / h) * 100;
  const flipX = left > 60, flipY = top < 30;
  return (
    <div ref={cardRef} role={pinned ? 'dialog' : 'tooltip'} aria-label={pinned ? 'Details' : undefined}
      className={`absolute z-20 w-72 max-w-[calc(100vw-2rem)] border border-border bg-popover p-3 text-popover-foreground shadow-lg ring-1 ring-foreground/10 ${pinned ? '' : 'pointer-events-none'}`}
      style={{ left: `${left}%`, top: `${top}%`, transform: `translate(${flipX ? 'calc(-100% - 12px)' : '12px'}, ${flipY ? '12px' : 'calc(-100% - 12px)'})` }}>
      {children}
    </div>
  );
}

/** One film/season: name, in-universe label + confidence, release; pinned cards offer the detail drawer. */
export function RowTip({ row, pinned = false }: { row: Row; pinned?: boolean }) {
  const { update } = useApp();
  const iu = row.unit.in_universe;
  return (
    <div className="space-y-1.5 text-sm">
      <div className="flex items-start gap-2"><Marker shape={markerShape(row)} color={markerColor(row)} size={14} /><span className="font-heading font-semibold leading-tight">{row.name}</span></div>
      <div className="flex flex-wrap items-center gap-2"><span>{iu.label}</span><ConfidenceBadge c={iu.confidence} small note={iu.note} /></div>
      <div className="text-muted-foreground">Released {formatRelease(row.unit.release.date)} · {markerMeaning(row)}</div>
      {pinned
        ? <Button size="sm" variant="outline" onClick={() => update({ unit: row.key })}>Open details</Button>
        : <div className="text-xs text-muted-foreground">Click to keep this open · Enter for details</div>}
    </div>
  );
}

export function PointShape({ shape, x, y, color, r = 6 }: { shape: string; x: number; y: number; color: string; r?: number }) {
  const hollow = shape.startsWith('hollow');
  const p = { fill: hollow ? 'var(--card)' : color, stroke: color, strokeWidth: hollow ? 2 : 1 };
  const k = r / 6;
  if (shape.includes('diamond')) return <path d={`M${x} ${y - 6 * k} L${x + 6 * k} ${y} L${x} ${y + 6 * k} L${x - 6 * k} ${y} Z`} {...p} />;
  if (shape.includes('square')) return <rect x={x - 5 * k} y={y - 5 * k} width={10 * k} height={10 * k} {...p} />;
  if (shape === 'triangle') return <path d={`M${x} ${y - 6 * k} L${x + 6 * k} ${y + 5 * k} L${x - 6 * k} ${y + 5 * k} Z`} {...p} />;
  if (shape === 'star') return <path d={`M${x} ${y - 7} L${x + 2} ${y - 2} L${x + 7} ${y - 2} L${x + 3} ${y + 1.5} L${x + 4.5} ${y + 7} L${x} ${y + 3.5} L${x - 4.5} ${y + 7} L${x - 3} ${y + 1.5} L${x - 7} ${y - 2} L${x - 2} ${y - 2} Z`} {...p} />;
  return <circle cx={x} cy={y} r={5 * k} {...p} />;
}
