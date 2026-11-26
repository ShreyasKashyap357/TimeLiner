import { useApp } from '@/app/context';
import { connections, dualAxis } from '@/domain/views';
import type { Row } from '@/domain/model';
import { markerColor, markerMeaning, markerShape } from '@/components/Marker';
import { formatRelease } from '@/domain/dates';
import { UnitItem } from '@/components/UnitItem';
import { Empty } from './SpineView';

const W = 900, H = 560, M = { l: 64, r: 16, t: 16, b: 44 };

/** In-universe year (y) vs release date (x) for the chosen continuity. Ranges are drawn as bars. */
export function DualAxisView({ rows }: { rows: Row[] }) {
  const { update, ds, state } = useApp();
  const cont = ds.continuities.find((c) => c.id === state.c);
  const { points, excluded, xDomain, yDomain } = dualAxis(rows);
  if (!rows.length) return <Empty />;
  if (!points.length) return <p className="text-muted-foreground">{cont?.name} has no calendar dates to plot. Use the in-universe timeline instead.</p>;
  // Compress huge in-universe ranges (e.g. 1260 BC): use a piecewise scale with a break below the 5th percentile.
  const ys = points.map((p) => p.y0).sort((a, b) => a - b);
  const cut = ys[Math.floor(ys.length * 0.05)] ?? yDomain[0];
  const yLo = Math.min(cut, yDomain[1] - 1), broken = yDomain[0] < yLo - 50;
  const innerH = H - M.t - M.b, innerW = W - M.l - M.r;
  const breakH = broken ? 40 : 0;
  const sx = (x: number) => M.l + ((x - xDomain[0]) / (xDomain[1] - xDomain[0] || 1)) * innerW;
  const sy = (y: number) => {
    if (broken && y < yLo) return H - M.b - ((y - yDomain[0]) / (yLo - yDomain[0])) * breakH;
    const lo = broken ? yLo : yDomain[0];
    return H - M.b - breakH - ((y - lo) / (yDomain[1] - lo || 1)) * (innerH - breakH);
  };
  const xTicks = range(xDomain[0], xDomain[1], niceStep(xDomain[1] - xDomain[0]));
  const yTicks = range(broken ? Math.ceil(yLo / 10) * 10 : yDomain[0], yDomain[1], niceStep(yDomain[1] - (broken ? yLo : yDomain[0])));
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Each mark is one film/season: horizontal = release date, vertical = when it is set in-universe. Bars show multi-year spans. {broken && 'The lowest band is compressed (axis break) to fit very early dates.'}</p>
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <svg viewBox={`0 0 ${W} ${H}`} className="min-w-[640px]" role="group" aria-label={`Scatter plot of in-universe year against release date for ${cont?.name}. A table with the same data follows.`}>
          {yTicks.map((y) => <g key={`y${y}`}><line x1={M.l} x2={W - M.r} y1={sy(y)} y2={sy(y)} stroke="var(--border)" /><text x={M.l - 6} y={sy(y) + 4} textAnchor="end" fontSize="11" fill="var(--muted-foreground)">{y < 0 ? `${-y} BC` : y}</text></g>)}
          {xTicks.map((x) => <g key={`x${x}`}><line y1={M.t} y2={H - M.b} x1={sx(x)} x2={sx(x)} stroke="var(--border)" strokeDasharray="2 4" /><text x={sx(x)} y={H - M.b + 16} textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">{x}</text></g>)}
          {broken && <text x={M.l - 6} y={H - M.b - breakH / 2} textAnchor="end" fontSize="11" fill="var(--muted-foreground)">≤{yLo}</text>}
          <text x={M.l + innerW / 2} y={H - 6} textAnchor="middle" fontSize="12" fill="var(--foreground)">Release date</text>
          <text transform={`translate(14 ${M.t + innerH / 2}) rotate(-90)`} textAnchor="middle" fontSize="12" fill="var(--foreground)">In-universe year</text>
          {points.map((p) => {
            const color = markerColor(p.row), shape = markerShape(p.row);
            const cx = sx(p.x), cy0 = sy(p.y0), cy1 = sy(p.y1);
            return (
              <g key={p.row.key} tabIndex={0} role="button" aria-label={`${p.row.name}: set ${p.row.unit.in_universe.label}, released ${formatRelease(p.row.unit.release.date)}`}
                onClick={() => update({ unit: p.row.key })} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); update({ unit: p.row.key }); } }}
                className="cursor-pointer focus:outline-none [&:focus>.ring]:opacity-100">
                <title>{`${p.row.name}\n${p.row.unit.in_universe.label} · ${formatRelease(p.row.unit.release.date)}\n${markerMeaning(p.row)}`}</title>
                {Math.abs(cy0 - cy1) > 3 && <line x1={cx} x2={cx} y1={cy0} y2={cy1} stroke={color} strokeWidth={3} strokeOpacity={0.6} />}
                <circle className="ring" cx={cx} cy={cy0} r={9} fill="none" stroke="var(--u-primary)" strokeWidth={2} opacity={0} />
                <PointShape shape={shape} x={cx} y={cy0} color={color} />
              </g>
            );
          })}
        </svg>
      </div>
      <details className="rounded-lg border border-border p-3">
        <summary className="cursor-pointer text-sm font-semibold">Data table ({points.length} plotted, {excluded.length} without dates)</summary>
        <table className="mt-2 w-full text-left text-sm">
          <thead><tr><th className="py-1">Title</th><th>In-universe</th><th>Released</th></tr></thead>
          <tbody>{points.map((p) => <tr key={p.row.key} className="border-t border-border"><td className="py-1">{p.row.name}</td><td>{p.row.unit.in_universe.label}</td><td>{formatRelease(p.row.unit.release.date)}</td></tr>)}</tbody>
        </table>
        {excluded.length > 0 && <><h3 className="mt-3 text-sm font-semibold">Not plotted (no in-universe date or no release date)</h3><ul>{excluded.map((r) => <UnitItem key={r.key} row={r} meta="in-universe" />)}</ul></>}
      </details>
    </div>
  );
}

function PointShape({ shape, x, y, color }: { shape: string; x: number; y: number; color: string }) {
  const hollow = shape.startsWith('hollow');
  const p = { fill: hollow ? 'var(--card)' : color, stroke: color, strokeWidth: hollow ? 2 : 1 };
  if (shape.includes('diamond')) return <path d={`M${x} ${y - 6} L${x + 6} ${y} L${x} ${y + 6} L${x - 6} ${y} Z`} {...p} />;
  if (shape.includes('square')) return <rect x={x - 5} y={y - 5} width={10} height={10} {...p} />;
  if (shape === 'triangle') return <path d={`M${x} ${y - 6} L${x + 6} ${y + 5} L${x - 6} ${y + 5} Z`} {...p} />;
  return <circle cx={x} cy={y} r={5} {...p} />;
}

function niceStep(span: number) { return span > 400 ? 100 : span > 150 ? 25 : span > 60 ? 10 : span > 20 ? 5 : span > 8 ? 2 : 1; }
function range(a: number, b: number, step: number) { const out: number[] = []; for (let v = Math.ceil(a / step) * step; v <= b; v += step) out.push(v); return out; }

/** Which titles feed into which: arc diagram on a release-year axis plus an accessible list. */
export function ConnectionsView({ rows }: { rows: Row[] }) {
  const { ds, update } = useApp();
  const { nodes, edges } = connections(rows, ds);
  if (!edges.length) return <p className="text-muted-foreground">No recorded connections among the filtered titles. Try widening the canon tier filter (e.g. include other continuities).</p>;
  const idx = new Map(nodes.map((n, i) => [n.id, i]));
  const mainConts = new Set(ds.universes.map((u) => u.default_continuity));
  const step = 34, w = Math.max(640, nodes.length * step + 40), h = 300, base = 210;
  const x = (id: string) => 20 + idx.get(id)! * step + step / 2;
  const firstUnit = (titleId: string) => rows.find((r) => r.title.id === titleId)?.key;
  const KIND_DASH: Record<string, string> = { sequel: '', continues: '', spinoff: '6 3', crossover: '2 3', cameo: '1 4', 'feeds-into': '8 3 2 3', remake: '4 4', 'shares-characters': '1 2' };
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Arcs connect a title (left) to a later title it feeds into. Line style shows the kind of link (sequel solid, spinoff dashed, crossover dotted, feeds-into dash-dot). Links may cross continuities; that never merges their timelines.</p>
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} role="img" aria-label="Arc diagram of connections between titles. A list follows.">
          {edges.map((e, i) => {
            const a = x(e.from), b = x(e.to), r = Math.abs(b - a) / 2;
            return <path key={i} d={`M${a} ${base} A ${r} ${Math.min(r, base - 10)} 0 0 1 ${b} ${base}`} fill="none" stroke="var(--u-primary)" strokeOpacity={0.7} strokeWidth={1.5} strokeDasharray={KIND_DASH[e.kind] ?? ''}><title>{`${e.from} → ${e.to} (${e.kind})`}</title></path>;
          })}
          {nodes.map((n) => (
            <g key={n.id} transform={`translate(${x(n.id)} ${base})`}>
              <circle r={5} fill={mainConts.has(n.continuity) ? 'var(--marker-main)' : 'var(--marker-variant)'}><title>{ds.continuities.find((c) => c.id === n.continuity)?.name}</title></circle>
              <text transform="rotate(55)" x={8} y={4} fontSize="10" fill="var(--foreground)">{n.label.length > 28 ? n.label.slice(0, 27) + '…' : n.label}</text>
            </g>
          ))}
        </svg>
      </div>
      <ul className="grid gap-1 text-sm md:grid-cols-2">
        {edges.map((e, i) => {
          const from = ds.titles.find((t) => t.id === e.from)!, to = ds.titles.find((t) => t.id === e.to)!;
          return (
            <li key={i}>
              <button type="button" className="underline" onClick={() => { const k = firstUnit(from.id); if (k) update({ unit: k }); }}>{from.title}</button>
              <span className="text-muted-foreground"> → {e.kind} → </span>
              <button type="button" className="underline" onClick={() => { const k = firstUnit(to.id); if (k) update({ unit: k }); }}>{to.title}</button>
              {e.note && <span className="text-muted-foreground"> ({e.note})</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
