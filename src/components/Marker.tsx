// Shape-coded markers (never colour alone). Colour reinforces; shape + text label carry meaning.
import type { Row } from '@/domain/model';
import type { Branch } from '@/domain/schema';

export type MarkerShape = Branch['marker'];

export function markerColor(r: Pick<Row, 'tier' | 'branch'>): string {
  if (r.tier === 'adjacent') return 'var(--marker-adjacent)';
  if (!r.branch.placeable || r.tier === 'non-placeable') return 'var(--marker-unplaced)';
  if (r.branch.is_main) return 'var(--marker-main)';
  return 'var(--marker-variant)';
}

/** Adjacent-tier units get a distinct shape so the tier is readable without colour. */
export function markerShape(r: Pick<Row, 'tier' | 'branch'>): MarkerShape {
  if (r.tier === 'adjacent') return 'triangle';
  if (r.tier === 'non-placeable' && r.branch.placeable) return 'hollow-dot';
  return r.branch.marker;
}

export function Marker({ shape, color, size = 12, title }: { shape: MarkerShape; color: string; size?: number; title?: string }) {
  const s = size, h = s / 2;
  const common = { fill: shape.startsWith('hollow') ? 'none' : color, stroke: color, strokeWidth: shape.startsWith('hollow') ? 2 : 0 };
  let el: React.ReactNode;
  switch (shape) {
    case 'dot': case 'hollow-dot': el = <circle cx={h} cy={h} r={h - 1.5} {...common} />; break;
    case 'diamond': case 'hollow-diamond': el = <path d={`M${h} 1 L${s - 1} ${h} L${h} ${s - 1} L1 ${h} Z`} {...common} />; break;
    case 'square': case 'hollow-square': el = <rect x={1.5} y={1.5} width={s - 3} height={s - 3} {...common} />; break;
    case 'triangle': el = <path d={`M${h} 1 L${s - 1} ${s - 1.5} L1 ${s - 1.5} Z`} {...common} />; break;
    case 'star': el = <path d={`M${h} 0.5 L${h + 1.8} ${h - 1.2} L${s - 0.5} ${h - 1.2} L${h + 2.6} ${h + 1.4} L${h + 3.6} ${s - 0.5} L${h} ${h + 3} L${h - 3.6} ${s - 0.5} L${h - 2.6} ${h + 1.4} L0.5 ${h - 1.2} L${h - 1.8} ${h - 1.2} Z`} {...common} />; break;
  }
  return (
    // aria-label, not an SVG <title>: <title> shows the browser-native hover text (R-55).
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined} aria-label={title} className="shrink-0">
      {el}
    </svg>
  );
}

export function RowMarker({ row, size }: { row: Row; size?: number }) {
  return <Marker shape={markerShape(row)} color={markerColor(row)} size={size} />;
}

/** Text describing the marker, for screen readers and the legend. */
export function markerMeaning(r: Row): string {
  if (r.tier === 'adjacent') return 'Adjacent (canon ambiguous)';
  if (!r.branch.placeable) return `${r.branch.label} (no fixed point)`;
  if (r.tier === 'non-placeable') return 'No confirmed placement';
  return r.branch.label;
}
