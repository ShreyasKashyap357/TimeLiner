import { useApp } from '@/app/context';
import { connections, dualAxis } from '@/domain/views';
import { titleLabel, type Row } from '@/domain/model';
import { markerColor, markerShape } from '@/components/Marker';
import { ChartTip, PointShape, RowTip, usePinnedTip } from '@/components/ChartTip';
import { formatRelease, formatYear } from '@/domain/dates';
import { UnitItem } from '@/components/UnitItem';
import { SpoilerText } from '@/components/SpoilerText';
import { AllContinuities, Empty } from './SpineView';
import type { Continuity } from '@/domain/schema';
import { Button } from '@/components/ui/button';

const W = 900, H = 560, M = { l: 64, r: 16, t: 16, b: 44 };

/** In-universe year (y) vs release date (x) for the chosen continuity. Ranges are drawn as bars. */
export function DualAxisView({ rows, cont: only }: { rows: Row[]; cont?: Continuity }) {
  const { update, ds, state } = useApp();
  const tip = usePinnedTip<Row>();
  const cont = only ?? ds.continuities.find((c) => c.id === state.c);
  const { points, excluded, xDomain, yDomain } = dualAxis(rows);
  if (!rows.length) return <Empty />;
  if (!points.length) return <p className="text-muted-foreground">{cont?.name} has no calendar dates to plot. Use the in-universe timeline instead.</p>;
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
      <p className="text-muted-foreground">Each mark is one film or season. Across: release date. Up: when it is set in-universe. Bars show multi-year spans. Hover or tab to a mark for a summary; click to keep it open, Enter for details. {broken && 'The lowest band is compressed (axis break) to fit very early dates.'}</p>
      <div className="relative overflow-x-auto border border-border bg-card">
        <div className="relative min-w-[640px]">
          <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="group" aria-label={`Scatter plot of in-universe year against release date for ${cont?.name}. A table with the same data follows.`}>
            {yTicks.map((y) => <g key={`y${y}`}><line x1={M.l} x2={W - M.r} y1={sy(y)} y2={sy(y)} stroke="var(--border)" /><text x={M.l - 6} y={sy(y) + 4} textAnchor="end" fontSize="12" fill="var(--muted-foreground)">{cont ? formatYear(y, cont.calendar) : y}</text></g>)}
            {xTicks.map((x) => <g key={`x${x}`}><line y1={M.t} y2={H - M.b} x1={sx(x)} x2={sx(x)} stroke="var(--border)" strokeDasharray="2 4" /><text x={sx(x)} y={H - M.b + 16} textAnchor="middle" fontSize="12" fill="var(--muted-foreground)">{x}</text></g>)}
            {broken && <text x={M.l - 6} y={H - M.b - breakH / 2} textAnchor="end" fontSize="12" fill="var(--muted-foreground)">≤{yLo}</text>}
            <text x={M.l + innerW / 2} y={H - 6} textAnchor="middle" fontSize="13" fill="var(--foreground)">Release date</text>
            <text transform={`translate(14 ${M.t + innerH / 2}) rotate(-90)`} textAnchor="middle" fontSize="13" fill="var(--foreground)">In-universe year</text>
            {points.map((p) => {
              const color = markerColor(p.row), shape = markerShape(p.row);
              const cx = sx(p.x), cy0 = sy(p.y0), cy1 = sy(p.y1);
              const active = tip.active(p.row.key);
              return (
                <g key={p.row.key} tabIndex={0} role="button" aria-label={`${p.row.name}: set ${p.row.unit.in_universe.label}, released ${formatRelease(p.row.unit.release.date)}`}
                  {...tip.mark({ key: p.row.key, x: cx, y: cy0, content: p.row })}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); update({ unit: p.row.key }); } if (e.key === 'Escape') tip.close(); }}
                  className="cursor-pointer focus:outline-none">
                  {Math.abs(cy0 - cy1) > 3 && <line x1={cx} x2={cx} y1={cy0} y2={cy1} stroke={color} strokeWidth={active ? 5 : 3} strokeOpacity={0.7} />}
                  <circle cx={cx} cy={cy0} r={12} fill="transparent" />
                  {active && <circle cx={cx} cy={cy0} r={10} fill="none" stroke="var(--u-primary)" strokeWidth={2} />}
                  <PointShape shape={shape} x={cx} y={cy0} color={color} />
                </g>
              );
            })}
          </svg>
          {tip.tip && <ChartTip x={tip.tip.x} y={tip.tip.y} w={W} h={H} pinned={tip.pinned} cardRef={tip.card}><RowTip row={tip.tip.content} pinned={tip.pinned} /></ChartTip>}
        </div>
      </div>
      <details className="border border-border p-3">
        <summary className="cursor-pointer font-semibold">Data table ({points.length} plotted, {excluded.length} without dates)</summary>
        <table className="mt-2 w-full text-left text-sm">
          <thead><tr><th className="py-1">Title</th><th>In-universe</th><th>Released</th></tr></thead>
          <tbody>{points.map((p) => <tr key={p.row.key} className="border-t border-border"><td className="py-1">{p.row.name}</td><td>{p.row.unit.in_universe.label}</td><td>{formatRelease(p.row.unit.release.date)}</td></tr>)}</tbody>
        </table>
        {excluded.length > 0 && <><h3 className="mt-3 font-semibold">Not plotted (no in-universe date or no release date)</h3><ul>{excluded.map((r) => <UnitItem key={r.key} row={r} meta="in-universe" />)}</ul></>}
      </details>
    </div>
  );
}

function niceStep(span: number) { return span > 400 ? 100 : span > 150 ? 25 : span > 60 ? 10 : span > 20 ? 5 : span > 8 ? 2 : 1; }
function range(a: number, b: number, step: number) { const out: number[] = []; for (let v = Math.ceil(a / step) * step; v <= b; v += step) out.push(v); return out; }

/** Which titles feed into which: arc diagram on a release-year axis plus an accessible list. */
export function ConnectionsView({ rows }: { rows: Row[] }) {
  const { ds, update, spoilerSafe } = useApp();
  const tip = usePinnedTip();
  const { nodes, edges } = connections(rows, ds);
  if (!edges.length) return <p className="text-muted-foreground">No recorded connections among the filtered titles. Try widening the canon tier filter (e.g. include other continuities).</p>;
  const idx = new Map(nodes.map((n, i) => [n.id, i]));
  const mainConts = new Set(ds.universes.map((u) => u.default_continuity));
  const step = 36, w = Math.max(680, nodes.length * step + 40), h = 320, base = 220;
  const x = (id: string) => 20 + idx.get(id)! * step + step / 2;
  const firstUnit = (titleId: string) => rows.find((r) => r.title.id === titleId)?.key;
  const titleOf = (id: string) => ({ title: titleLabel(ds.titles, id) });
  const contName = (id: string) => ds.continuities.find((c) => c.id === id)?.name ?? id;
  const KIND_DASH: Record<string, string> = { sequel: '', continues: '', spinoff: '6 3', crossover: '2 3', cameo: '1 4', 'feeds-into': '8 3 2 3', remake: '4 4', 'shares-characters': '1 2' };
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">Arcs connect a title (left) to a later title it relates to. Line style shows the kind of link: sequel/continues solid, spinoff dashed, crossover dotted, feeds-into dash-dot. Links may cross continuities; that never merges their timelines. Hover or tab for a summary; click to keep it open.</p>
      <div className="relative overflow-x-auto border border-border bg-card">
        <div className="relative" style={{ width: w }}>
          <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} role="group" aria-label="Arc diagram of connections between titles. A list follows.">
            {edges.map((e, i) => {
              const a = x(e.from), b = x(e.to), r = Math.abs(b - a) / 2;
              const key = `e${i}`;
              const active = tip.active(key);
              const fk = firstUnit(e.from), tk = firstUnit(e.to);
              return (
                <g key={key} tabIndex={0} role="button" aria-label={`${titleOf(e.from).title} ${e.kind} ${titleOf(e.to).title}`} className="cursor-pointer focus:outline-none"
                  onKeyDown={(ev) => { if (ev.key === 'Escape') tip.close(); }}
                  {...tip.mark({ key, x: (a + b) / 2, y: base - Math.min(r, base - 10), content: (
                    <div className="space-y-1 text-sm"><div className="font-semibold">{titleOf(e.from).title} → {titleOf(e.to).title}</div><div className="text-muted-foreground">{e.kind}{e.note && !spoilerSafe ? ` · ${e.note}` : ''}</div>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {fk && <Button size="sm" variant="outline" className="h-auto whitespace-normal py-1 text-left" onClick={() => update({ unit: fk })}>{titleOf(e.from).title}</Button>}
                        {tk && <Button size="sm" variant="outline" className="h-auto whitespace-normal py-1 text-left" onClick={() => update({ unit: tk })}>{titleOf(e.to).title}</Button>}
                      </div></div>) })}>
                  <path d={`M${a} ${base} A ${r} ${Math.min(r, base - 10)} 0 0 1 ${b} ${base}`} fill="none" stroke="transparent" strokeWidth={10} />
                  <path d={`M${a} ${base} A ${r} ${Math.min(r, base - 10)} 0 0 1 ${b} ${base}`} fill="none" stroke="var(--u-primary)" strokeOpacity={active ? 1 : 0.6} strokeWidth={active ? 3 : 1.5} strokeDasharray={KIND_DASH[e.kind] ?? ''} />
                </g>
              );
            })}
            {nodes.map((n) => {
              const key = `n${n.id}`;
              const k = firstUnit(n.id);
              return (
                <g key={n.id} transform={`translate(${x(n.id)} ${base})`} tabIndex={0} role="button" aria-label={`${n.label}, ${contName(n.continuity)}`}
                  {...tip.mark({ key, x: x(n.id), y: base, content: (
                    <div className="space-y-1 text-sm"><div className="font-heading font-semibold">{n.label}</div><div className="text-muted-foreground">{contName(n.continuity)} · {n.year ?? 'TBA'}</div>
                      <div className="text-xs text-muted-foreground">{edges.filter((e) => e.from === n.id || e.to === n.id).length} connection(s)</div>
                      {k && <Button size="sm" variant="outline" onClick={() => update({ unit: k })}>Open details</Button>}</div>) })}
                  onKeyDown={(ev) => { if (ev.key === 'Enter' && k) update({ unit: k }); if (ev.key === 'Escape') tip.close(); }}
                  className="cursor-pointer focus:outline-none">
                  <circle r={tip.active(key) ? 8 : 6} fill={mainConts.has(n.continuity) ? 'var(--marker-main)' : 'var(--marker-variant)'} />
                  <text transform="rotate(55)" x={10} y={4} fontSize="11" fill="var(--foreground)">{n.label.length > 28 ? n.label.slice(0, 27) + '…' : n.label}</text>
                </g>
              );
            })}
          </svg>
          {tip.tip && <ChartTip x={tip.tip.x} y={tip.tip.y} w={w} h={h} pinned={tip.pinned} cardRef={tip.card}>{tip.tip.content}</ChartTip>}
        </div>
      </div>
      <ul className="grid gap-1 md:grid-cols-2">
        {edges.map((e, i) => (
          <li key={i}>
            <button type="button" className="underline" onClick={() => { const k = firstUnit(e.from); if (k) update({ unit: k }); }}>{titleOf(e.from).title}</button>
            <span className="text-muted-foreground"> → {e.kind} → </span>
            <button type="button" className="underline" onClick={() => { const k = firstUnit(e.to); if (k) update({ unit: k }); }}>{titleOf(e.to).title}</button>
            {e.note && <span className="text-muted-foreground"> <SpoilerText unitKey={firstUnit(e.to) ?? ''}>({e.note})</SpoilerText></span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Dual-axis chart for every continuity of the universe, one card each (calendars are never merged). */
export function AllDualAxisView({ rows }: { rows: Row[] }) {
  return <AllContinuities rows={rows} render={(rs, c) => <DualAxisView rows={rs} cont={c} />} />;
}
