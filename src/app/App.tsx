import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Ctx, type AppCtx } from './context';
import { useUrlState } from '@/state/url';
import { useWatched } from '@/state/watched';
import { usePrefs } from '@/state/prefs';
import { hasMaps, loadDataset, universes as allUniverses } from '@/state/data';
import { buildRows, type Dataset } from '@/domain/model';
import { applyFilters, CONTINUITY_VIEWS, VIEWS, type ViewId, type SortId } from '@/domain/filters';
import { nextUp, orderedForView, progress } from '@/domain/views';
import { HeaderBar } from './Header';
import { HeaderSelect } from './HeaderSelect';
import { Toolbar } from './Toolbar';
import { Footer } from './Footer';
import { Legend } from './Legend';
import { FilterPanel } from '@/components/FilterPanel';
import { ActiveFilters, UniverseChips } from '@/components/ActiveFilters';
import { DetailDrawer } from '@/components/DetailDrawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AllContinuities, SpineView } from '@/views/SpineView';
import { AppearancesView } from '@/views/AppearancesView';
// Secondary views are split into lazy chunks (D-4); the default story view stays in the main bundle.
const ReleaseView = lazy(() => import('@/views/ReleaseView').then((m) => ({ default: m.ReleaseView })));
const lanes = () => import('@/views/LaneViews');
const PlatformView = lazy(() => lanes().then((m) => ({ default: m.PlatformView })));
const StudioView = lazy(() => lanes().then((m) => ({ default: m.StudioView })));
const GroupingsView = lazy(() => lanes().then((m) => ({ default: m.GroupingsView })));
const TagsView = lazy(() => lanes().then((m) => ({ default: m.TagsView })));
const ContinuitiesView = lazy(() => lanes().then((m) => ({ default: m.ContinuitiesView })));
const charts = () => import('@/views/ChartViews');
const DualAxisView = lazy(() => charts().then((m) => ({ default: m.DualAxisView })));
const AllDualAxisView = lazy(() => charts().then((m) => ({ default: m.AllDualAxisView })));
const ConnectionsView = lazy(() => charts().then((m) => ({ default: m.ConnectionsView })));
// Leaflet and its CSS live only in this chunk.
const MapsView = lazy(() => import('@/views/MapsView').then((m) => ({ default: m.MapsView })));

export const VIEW_LABELS: Record<ViewId, string> = {
  spine: 'In-universe', release: 'Release order', platform: 'Platform', studio: 'Studio', groupings: 'Phase / Saga',
  tags: 'Characters', continuities: 'Continuities', dual: 'Dual axis', connections: 'Connections', maps: 'Atlas',
};
const CONTINUITY_SCOPED: ViewId[] = CONTINUITY_VIEWS;
/** Universe's default continuity ("all" uses the first enabled universe's). Module-level so it is a stable reference. */
const defaultContinuityFor = (u: string) => (allUniverses.find((x) => x.id === u) ?? allUniverses.find((x) => x.enabled))?.default_continuity ?? null;

function contrastOn(hex: string): string {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  const L = 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
  return L > 0.25 ? '#0b1020' : '#ffffff';
}

export function App() {
  const first = allUniverses.find((u) => u.enabled) ?? allUniverses[0]!;
  const [state, update] = useUrlState(first.id, defaultContinuityFor);
  const [ds, setDs] = useState<Dataset | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  // expose the sticky header height so sticky sidebars sit right below it
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`));
    ro.observe(el);
    return () => ro.disconnect();
  });
  const [error, setError] = useState<string | null>(null);

  // First paint needs only the universe in the URL; every other universe (search, cross-universe links,
  // "All universes") loads right after and replaces the partial dataset. Chunks are cached in loadDataset.
  useEffect(() => {
    let full = false;
    if (state.u !== 'all') loadDataset([state.u]).then((d) => { if (!full) setDs(d); }, () => {});
    loadDataset().then((d) => { full = true; setDs(d); }, (e) => setError(String(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once, on mount
  }, []);
  const watched = useWatched(ds?.aliases ?? {});
  const [prefs, setPrefs] = usePrefs();

  // per-universe accent colours
  useEffect(() => {
    const u = allUniverses.find((x) => x.id === state.u) ?? first;
    const root = document.documentElement.style;
    root.setProperty('--u-primary', u.accent.primary);
    root.setProperty('--u-secondary', u.accent.secondary);
    root.setProperty('--u-on-primary', contrastOn(u.accent.primary));
    document.title = `TimeLiner · ${u.name}${state.view ? ' · ' + VIEW_LABELS[state.view] : ''}`;
  }, [state.u, state.view, first]);

  const rows = useMemo(() => (ds ? buildRows(ds) : []), [ds]);
  const continuity = ds?.continuities.find((c) => c.id === state.c);
  const alt = continuity?.alt_orders.find((a) => a.id === state.alt);
  const altOrder = alt?.unit_ids;
  // A watch order belongs to one continuity. After switching universe/continuity, a selected order that doesn't
  // exist there falls back to story order (it used to leave a flat list without in-universe years).
  useEffect(() => {
    if (ds && state.sort === 'alt' && !alt) update({ sort: 'in-universe', alt: null, ess: false });
  }, [ds, state.sort, alt, update]);

  const people = useMemo(() => new Map((ds?.titles ?? []).flatMap((t) => t.credits.filter((c) => c.qid).map((c) => [c.qid!, c.name] as const))), [ds]);
  const characters = useMemo(() => new Map((ds?.titles ?? []).flatMap((t) => t.credits.filter((c) => c.character_qid && c.character).map((c) => [c.character_qid!, c.character!.split(' / ')[0]!] as const))), [ds]);
  const label = useMemo<AppCtx['label']>(() => ({
    studio: (id) => ds?.studios.find((s) => s.id === id)?.label ?? id,
    studioShort: (id) => { const s = ds?.studios.find((x) => x.id === id); return s?.short_label ?? s?.label ?? id; },
    platform: (id) => ds?.platforms.find((p) => p.id === id)?.label ?? id,
    tag: (id) => ds?.tags.find((t) => t.id === id)?.label ?? id,
    person: (qid) => people.get(qid) ?? 'Unknown person',
    character: (qid) => characters.get(qid) ?? 'Unknown character',
    grouping: (id) => ds?.universes.flatMap((u) => u.grouping_schemes.flatMap((g) => g.values)).find((v) => v.id === id)?.label ?? id,
  }), [ds, people, characters]);

  // Cross-scope: "All universes", or a person / cast-character filter. In-universe order only exists inside one
  // continuity, so the timeline tab then lists appearances across continuities and universes instead.
  const crossScope = state.u === 'all' || state.people.length > 0 || state.chars.length > 0;
  const scoped = useMemo(() => {
    const continuityScoped = CONTINUITY_SCOPED.includes(state.view) && !crossScope;
    // scope only (universe/continuity), for filter option counts
    return rows.filter((r) => (state.u === 'all' || r.universe.id === state.u) && (!continuityScoped || !state.c || state.c === 'all' || r.continuity.id === state.c));
  }, [rows, state.u, state.c, state.view, crossScope]);
  const filtered = useMemo(() => applyFilters(scoped, state, { scopeContinuity: false, scopeUniverse: false, watched: watched.set }), [scoped, state, watched.set]);
  const tagScoped = useMemo(() => applyFilters(scoped, { ...state, tags: [] }, { scopeContinuity: false, scopeUniverse: false, watched: watched.set }), [scoped, state, watched.set]);
  const ordered = useMemo(() => orderedForView(filtered, state, altOrder, watched.set), [filtered, state, altOrder, watched.set]);
  const prog = progress(filtered, watched.set);
  const next = nextUp(ordered, watched.set);

  if (error) return <main className="p-8 text-destructive">Failed to load data: {error}</main>;
  if (!ds) return <main className="p-8 text-muted-foreground" aria-busy="true">Loading timeline…</main>;

  const ctx: AppCtx = { ds, rows, state, update, watched, label, altOrder, alt, ordered, multiUniverse: new Set(filtered.map((r) => r.universe.id)).size > 1, spoilerSafe: prefs.spoilerSafe, setSpoilerSafe: (v) => setPrefs({ spoilerSafe: v }) };
  const sortOptions: { id: SortId; label: string; alt?: string }[] = [
    ...(CONTINUITY_SCOPED.includes(state.view) ? [{ id: 'in-universe' as SortId, label: 'In-universe order' }] : []),
    ...(state.view === 'spine' ? (continuity?.alt_orders ?? []).map((a) => ({ id: 'alt' as SortId, label: a.label, alt: a.id })) : []),
    { id: 'release', label: 'Release date (oldest first)' },
    { id: 'release-desc', label: 'Release date (newest first)' },
    { id: 'title', label: 'Title A–Z' },
    { id: 'runtime', label: 'Shortest first' },
    { id: 'unwatched', label: 'Unwatched first' },
  ];

  const atlas = state.view === 'maps';
  const allConts = state.c === 'all' && !crossScope;
  // The Atlas (maps) view is offered only for universes that have maps (data/<universe>/maps.json).
  const views = VIEWS.filter((v) => v !== 'maps' || hasMaps(state.u));
  const changeView = (v: string) => {
    const view = v as ViewId;
    const sort: SortId = CONTINUITY_SCOPED.includes(view) ? (state.sort === 'release' || state.sort === 'in-universe' ? 'in-universe' : state.sort) : (state.sort === 'in-universe' || state.sort === 'alt' ? 'release' : state.sort);
    update({ view, sort, alt: sort === 'alt' ? state.alt : null }, true);
  };

  return (
    <Ctx.Provider value={ctx}>
      <TooltipProvider>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">Skip to content</a>
        <Tabs value={state.view} onValueChange={changeView}>
          <header ref={headerRef} className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="mx-auto max-w-7xl px-4 2xl:max-w-[110rem]">
              <HeaderBar />
              {/* Phones: one full-width view picker instead of a tab strip that would be cut off. */}
              <div className="pb-2 sm:hidden">
                <HeaderSelect label="View" hint="Choose how to look at the timeline" value={state.view} minRem={0}
                  options={views.map((v) => ({ value: v, label: VIEW_LABELS[v] }))} onChange={changeView} />
              </div>
              <div className="-mx-4 overflow-x-auto px-4 pb-2 max-sm:hidden">
                <TabsList aria-label="Views" className="w-max">
                  {views.map((v) => <TabsTrigger key={v} value={v} data-view={v}>{VIEW_LABELS[v]}</TabsTrigger>)}
                </TabsList>
              </div>
            </div>
          </header>
          <div className="mx-auto max-w-7xl px-4 2xl:max-w-[110rem]">
            {/* The Atlas shows maps, not the title list: no progress cards or filters, the map gets the full width. */}
            {!atlas && <Toolbar sortOptions={sortOptions} prog={prog} next={next} counts={{ shown: filtered.length, total: scoped.length, released: filtered.filter((r) => r.unit.status === 'released').length }} filterPanel={<FilterPanel scoped={scoped} sortOptions={sortOptions} />} />}
            <div className={atlas ? 'grid gap-6 pt-4' : 'grid gap-6 lg:grid-cols-[19rem_1fr]'}>
              <aside className={atlas ? 'hidden' : 'hidden lg:block'} aria-label="Filters sidebar">
                <div className="sticky overflow-y-auto border border-sidebar-border bg-sidebar p-4 text-sidebar-foreground" style={{ top: 'calc(var(--header-h, 0px) + 1rem)', maxHeight: 'calc(100dvh - var(--header-h, 0px) - 2rem)' }}>
                  <FilterPanel scoped={scoped} sortOptions={sortOptions} />
                </div>
              </aside>
              <main id="main" tabIndex={-1} className="min-w-0 pb-16" aria-busy={false}>
                <h1 className="sr-only">{VIEW_LABELS[state.view]}{CONTINUITY_SCOPED.includes(state.view) && (continuity || allConts) ? ` — ${continuity?.name ?? 'All continuities'}` : ''}</h1>
                <UniverseChips />
                {!atlas && <ActiveFilters />}
                <p className="sr-only" aria-live="polite" data-testid="result-count">{filtered.length} of {scoped.length} entries</p>
                {VIEWS.map((v) => (
                  <TabsContent key={v} value={v} tabIndex={-1}>
                    {state.view === v && (
                      <Suspense fallback={<p className="p-6 text-sm text-muted-foreground" role="status">Loading view…</p>}>
                        {v === 'spine' && (crossScope || ctx.multiUniverse ? <AppearancesView rows={filtered} /> : allConts ? <AllContinuities rows={filtered} /> : <SpineView rows={filtered} />)}
                        {v === 'release' && <ReleaseView rows={filtered} />}
                        {v === 'platform' && <PlatformView rows={filtered} />}
                        {v === 'studio' && <StudioView rows={filtered} />}
                        {v === 'groupings' && <GroupingsView rows={filtered} />}
                        {v === 'tags' && <TagsView rows={filtered} allScoped={tagScoped} />}
                        {v === 'continuities' && <ContinuitiesView rows={filtered} />}
                        {v === 'dual' && (allConts ? <AllDualAxisView rows={filtered} /> : crossScope || new Set(filtered.map((r) => r.continuity.id)).size > 1
                          ? <p className="border border-border bg-muted/40 p-4 text-sm text-muted-foreground">The dual-axis chart compares release dates with in-universe dates inside one continuity (calendars differ between continuities and are never merged). Pick a single universe and continuity{state.people.length || state.chars.length ? ', or clear the person / character filter,' : ''} to see it.</p>
                          : <DualAxisView rows={filtered} />)}
                        {v === 'connections' && <ConnectionsView rows={filtered} />}
                        {v === 'maps' && (hasMaps(state.u)
                          ? <MapsView universe={state.u} />
                          : <p className="border border-border bg-muted/40 p-4 text-sm text-muted-foreground">There are no maps for {state.u === 'all' ? 'all universes at once. Pick a single universe' : 'this universe yet. Pick another view'} to continue.</p>)}
                      </Suspense>
                    )}
                  </TabsContent>
                ))}
                {!atlas && <Legend rows={filtered} />}
              </main>
            </div>
          </div>
        </Tabs>
        <Footer />
        <DetailDrawer />
        <Toaster position="bottom-center" />
      </TooltipProvider>
    </Ctx.Provider>
  );
}
