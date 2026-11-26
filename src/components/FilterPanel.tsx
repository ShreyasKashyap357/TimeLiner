import { useId, useMemo } from 'react';
import { useApp } from '@/app/context';
import { defaultState, type FilterState, type SortId } from '@/domain/filters';
import { formatYear } from '@/domain/dates';
import { SortSelect } from '@/app/Toolbar';
import { TagPicker } from './TagPicker';
import type { Row } from '@/domain/model';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

const TIER_TEXT: Record<string, { label: string; help: string }> = {
  core: { label: 'Core', help: 'On the main line of its continuity' },
  'outside-set-date': { label: 'Other branch, set date', help: 'Another reality/branch placed at a set time' },
  'multiverse-variant': { label: 'Multiverse variant', help: 'Variant reality' },
  adjacent: { label: 'Adjacent', help: 'Linked to the continuity but canon status is ambiguous' },
  'non-placeable': { label: 'Non-placeable', help: 'No fixed point in the timeline' },
};
const TYPE_TEXT: Record<string, string> = {
  film: 'Film', series: 'Series', 'one-shot': 'One-Shot', special: 'Special', 'animated-series': 'Animated series', 'animated-film': 'Animated film', 're-edit': 'Re-edit (US version)', 'motion-comic': 'Motion comic', 'crossover-event': 'Crossover event', novel: 'Novel', novella: 'Novella', 'short-story': 'Short story', anthology: 'Anthology', comic: 'Comic', 'graphic-novel': 'Graphic novel', reference: 'Reference / lore book',
};

function toggleIn<T>(list: T[], v: T, on: boolean): T[] {
  return on ? [...new Set([...list, v])] : list.filter((x) => x !== v);
}

function CheckGroup({ legend, options, value, onChange, hint }: {
  legend: string; options: { id: string; label: string; count: number; help?: string; indent?: boolean }[]; value: string[]; onChange: (v: string[]) => void; hint?: string;
}) {
  const uid = useId();
  if (!options.length) return null;
  return (
    <fieldset className="space-y-1.5">
      <legend className="mb-1 text-sm font-semibold">{legend}</legend>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {options.map((o) => {
        const id = `${uid}-${o.id}`.replace(/[^\w-]+/g, '-');
        return (
          <div key={o.id} className={o.indent ? 'flex items-start gap-2 pl-5' : 'flex items-start gap-2'}>
            <Checkbox id={id} aria-describedby={o.help ? id + "-help" : undefined} className="mt-0.5" checked={value.includes(o.id)} onCheckedChange={(c) => onChange(toggleIn(value, o.id, c === true))} />
            <div className="min-w-0">
              <Label htmlFor={id} className="inline text-sm font-normal leading-tight">
                {o.label} <span className="text-muted-foreground">({o.count})</span>
              </Label>
              {o.help && <p id={id + "-help"} className="text-xs leading-snug text-muted-foreground">{o.help}</p>}
            </div>
          </div>
        );
      })}
    </fieldset>
  );
}

const count = (rows: Row[], f: (r: Row) => string | null | undefined | (string | null)[]) => {
  const m = new Map<string, number>();
  for (const r of rows) {
    const v = f(r);
    for (const k of Array.isArray(v) ? v : [v]) if (k) m.set(k, (m.get(k) ?? 0) + 1);
  }
  return m;
};

export function FilterPanel({ scoped, sortOptions }: { scoped: Row[]; sortOptions: { id: SortId; label: string; alt?: string }[] }) {
  const { state, update, ds } = useApp();
  const set = (p: Partial<FilterState>) => update(p);

  const opts = useMemo(() => {
    const tiers = count(scoped, (r) => r.tier);
    const types = count(scoped, (r) => r.type);
    const platforms = count(scoped, (r) => r.platform);
    const studios = count(scoped, (r) => [r.studio, r.label]);
    const groupVals = count(scoped, (r) => Object.values(r.unit.groupings));
    const status = count(scoped, (r) => r.unit.status);
    const conf = count(scoped, (r) => r.unit.in_universe.confidence);
    const branches = count(scoped, (r) => r.branch.id);
    // Studio options grouped by shared public name (e.g. two "Marvel Television"s -> one group, two clear entries)
    const studioOpts: { id: string; label: string; count: number; help?: string; indent?: boolean }[] = [];
    const seenGroups = new Set<string>();
    const studiosPresent = ds.studios.filter((s) => studios.has(s.id));
    for (const s of studiosPresent) {
      if (s.group) {
        if (seenGroups.has(s.group)) continue;
        seenGroups.add(s.group);
        const members = studiosPresent.filter((x) => x.group === s.group);
        if (members.length > 1) {
          studioOpts.push(...members.map((m, i) => ({
            id: m.id, label: m.label, count: studios.get(m.id)!, indent: false,
            help: i === 0 ? `“${s.group}”: ${members.length} different entities share this name` : undefined,
          })));
          continue;
        }
      }
      studioOpts.push({ id: s.id, label: s.label, count: studios.get(s.id)! });
    }
    const u = ds.universes.find((x) => x.id === state.u);
    // One filter box per top-level grouping scheme (child schemes, e.g. Phase under Saga, join their parent's box),
    // labelled from the data, so universes can add schemes such as "Origin" without code changes.
    const schemes = u?.grouping_schemes ?? [];
    const groupingBoxes = schemes.filter((g) => !g.parent_scheme).map((root) => {
      const members = [root, ...schemes.filter((g) => g.parent_scheme === root.id)];
      return {
        id: root.id, legend: members.map((g) => g.label).join(' / '),
        options: members.flatMap((g) => [...g.values].sort((a, b) => a.order - b.order)
          .filter((v) => groupVals.has(v.id)).map((v) => ({ id: v.id, label: v.label, count: groupVals.get(v.id)!, help: undefined, indent: Boolean(g.parent_scheme) }))),
      };
    }).filter((b) => b.options.length);
    const cont = ds.continuities.find((c) => c.id === state.c);
    return {
      tiers: Object.keys(TIER_TEXT).filter((t) => tiers.has(t)).map((t) => ({ id: t, label: TIER_TEXT[t]!.label, help: TIER_TEXT[t]!.help, count: tiers.get(t)! })),
      types: Object.keys(TYPE_TEXT).filter((t) => types.has(t)).map((t) => ({ id: t, label: TYPE_TEXT[t]!, count: types.get(t)! })),
      platforms: ds.platforms.filter((p) => platforms.has(p.id)).map((p) => ({ id: p.id, label: p.label, count: platforms.get(p.id)! })),
      studios: studioOpts,
      groupingBoxes,
      status: ['released', 'upcoming', 'in-production', 'cancelled'].filter((s) => status.has(s)).map((s) => ({ id: s, label: s[0]!.toUpperCase() + s.slice(1), count: status.get(s)! })),
      conf: ['stated', 'inferred', 'disputed'].filter((s) => conf.has(s)).map((s) => ({ id: s, label: s[0]!.toUpperCase() + s.slice(1), count: conf.get(s)! })),
      branches: (cont?.branches ?? []).filter((b) => branches.has(b.id)).map((b) => ({ id: b.id, label: b.label, count: branches.get(b.id)! })),
      iuYears: scoped.flatMap((r) => (r.unit.in_universe.start ? [r.unit.in_universe.start.y, r.unit.in_universe.end!.y] : [])),
      relYears: scoped.map((r) => r.unit.release.year).filter((y): y is number => y !== null),
    };
  }, [scoped, ds, state.u, state.c]);

  const iuMin = Math.min(...opts.iuYears), iuMax = Math.max(...opts.iuYears);
  const relMin = Math.min(...opts.relYears), relMax = Math.max(...opts.relYears);
  const d = defaultState(state.u, state.c);
  const uid = useId();
  const cal = ds.continuities.find((c) => c.id === state.c)?.calendar;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={() => update({ ...d, u: state.u, c: state.c, view: state.view, sort: state.sort, unit: null })}>Reset</Button>
      </div>
      <fieldset className="space-y-2">
        <legend className="mb-1 text-sm font-semibold">Sort</legend>
        <SortSelect sortOptions={sortOptions} className="w-full" />
      </fieldset>
      <TagPicker scoped={scoped} />
      <Separator />
      <CheckGroup legend="Canon tier" value={state.tiers} onChange={(v) => set({ tiers: v as FilterState['tiers'] })} options={opts.tiers}
        hint="All tiers are shown by default. Tick one or more to narrow the list." />
      <Separator />
      <CheckGroup legend="Type" value={state.types} onChange={(v) => set({ types: v as FilterState['types'] })} options={opts.types} />
      <CheckGroup legend="Original platform" value={state.platforms} onChange={(platforms) => set({ platforms })} options={opts.platforms} />
      <CheckGroup legend="Studio / label" value={state.studios} onChange={(studios) => set({ studios })} options={opts.studios} />
      {opts.groupingBoxes.map((b) => {
        const ids = new Set(b.options.map((o) => o.id));
        return <CheckGroup key={b.id} legend={b.legend} value={state.groupings.filter((g) => ids.has(g))}
          onChange={(v) => set({ groupings: [...state.groupings.filter((g) => !ids.has(g)), ...v] })} options={b.options} />;
      })}
      {opts.branches.length > 1 && <CheckGroup legend="Branch / reality" value={state.branches} onChange={(branches) => set({ branches })} options={opts.branches} />}
      <CheckGroup legend="Status" value={state.status} onChange={(v) => set({ status: v as FilterState['status'] })} options={opts.status} />
      <CheckGroup legend="Date confidence" value={state.conf} onChange={(v) => set({ conf: v as FilterState['conf'] })} options={opts.conf} />
      <fieldset className="space-y-1.5">
        <legend className="mb-1 text-sm font-semibold">Done (watched / read)</legend>
        {(['all', 'unwatched', 'watched'] as const).map((w) => (
          <div key={w} className="flex items-center gap-2">
            <input type="radio" id={`${uid}-w-${w}`} name={`${uid}-watched`} checked={state.watched === w} onChange={() => set({ watched: w })} className="accent-[var(--u-primary)]" />
            <Label htmlFor={`${uid}-w-${w}`} className="font-normal">{w === 'all' ? 'All' : w === 'watched' ? 'Done' : 'Not done yet'}</Label>
          </div>
        ))}
      </fieldset>
      {Number.isFinite(iuMin) && iuMax > iuMin && (
        <RangeField label="In-universe years" min={iuMin} max={iuMax} value={state.iu} onChange={(iu) => set({ iu })} fmt={(y) => (cal ? formatYear(y, cal) : String(y))} />
      )}
      {Number.isFinite(relMin) && relMax > relMin && (
        <RangeField label="Release years" min={relMin} max={relMax} value={state.rel} onChange={(rel) => set({ rel })} />
      )}
      <p className="text-xs text-muted-foreground">Studio filter matches both studios and their labels/banners. Filters, sort and view are saved in the URL, so you can share the link.</p>
    </div>
  );
}

function RangeField({ label, min, max, value, onChange, fmt = String }: { label: string; min: number; max: number; value: [number, number] | null; onChange: (v: [number, number] | null) => void; fmt?: (n: number) => string }) {
  const v = value ?? [min, max];
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-semibold">{label}</legend>
      <Slider min={min} max={max} step={1} value={v} onValueChange={(x) => onChange(x[0] === min && x[1] === max ? null : [x[0]!, x[1]!])}
        aria-label={label} />
      <div className="flex justify-between text-xs text-muted-foreground"><span>{fmt(v[0])}</span><span>{fmt(v[1])}</span></div>
    </fieldset>
  );
}
