import { useApp } from '@/app/context';
import { defaultState, type FilterState } from '@/domain/filters';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

/** "All universes": one chip per universe, each can be switched off and back on. */
export function UniverseChips() {
  const { state, update, ds } = useApp();
  if (state.u !== 'all' || ds.universes.length < 2) return null;
  const toggle = (id: string) => update({ xu: state.xu.includes(id) ? state.xu.filter((x) => x !== id) : [...state.xu, id] });
  return (
    <div className="mb-3 flex flex-wrap items-center gap-1.5" role="group" aria-label="Universes shown">
      <span className="text-sm text-muted-foreground">Universes:</span>
      {[...ds.universes].sort((a, b) => a.order - b.order).map((u) => {
        const on = !state.xu.includes(u.id);
        return (
          <button key={u.id} type="button" aria-pressed={on} onClick={() => toggle(u.id)}
            className={`inline-flex items-center gap-1.5 border px-2 py-0.5 text-sm ${on ? 'border-border bg-card' : 'border-dashed border-border text-muted-foreground line-through'}`}>
            <span aria-hidden className="size-2.5 ring-1 ring-foreground/60" style={{ background: on ? u.accent.primary : 'transparent' }} />
            {u.short_name}
            {on ? <X className="size-3 opacity-70" aria-hidden /> : <span className="sr-only">(hidden)</span>}
          </button>
        );
      })}
      {state.xu.length > 0 && <Button variant="ghost" size="sm" onClick={() => update({ xu: [] })}>Show all</Button>}
    </div>
  );
}

/** Removable chips for every non-default filter, shown above the results so it's always clear what applies. */
export function ActiveFilters() {
  const { state, update, label, ds } = useApp();
  const d = defaultState(state.u, state.c);
  const chips: { key: string; text: string; clear: Partial<FilterState> }[] = [];
  const list = <K extends keyof FilterState>(k: K, name: string, fmt: (v: string) => string = (v) => v) => {
    const v = state[k] as unknown as string[];
    for (const x of v) chips.push({ key: `${String(k)}:${x}`, text: `${name}: ${fmt(x)}`, clear: { [k]: v.filter((y) => y !== x) } as Partial<FilterState> });
  };
  if (state.q) chips.push({ key: 'q', text: `Text: “${state.q}”`, clear: { q: '' } });
  if (state.quick !== 'all') chips.push({ key: 'quick', text: { movies: 'Movies only', series: 'Series only', animated: 'Animated', books: 'Books', audio: 'Audio', stage: 'Stage' }[state.quick as 'movies'], clear: { quick: 'all' } });
  list('tags', 'Character', label.tag);
  list('people', 'Person', label.person);
  list('chars', 'Character', label.character);
  list('tiers', 'Tier');
  list('types', 'Type');
  list('platforms', 'Platform', label.platform);
  list('studios', 'Studio', label.studio);
  list('groupings', 'Grouping', label.grouping);
  list('status', 'Status');
  list('conf', 'Confidence');
  list('branches', 'Branch', (b) => ds.continuities.flatMap((c) => c.branches).find((x) => x.id === b)?.label ?? b);
  if (state.watched !== 'all') chips.push({ key: 'w', text: state.watched === 'watched' ? 'Done only' : 'Not done yet', clear: { watched: 'all' } });
  if (state.iu) chips.push({ key: 'iu', text: `In-universe ${state.iu[0]}–${state.iu[1]}`, clear: { iu: null } });
  if (state.rel) chips.push({ key: 'rel', text: `Released ${state.rel[0]}–${state.rel[1]}`, clear: { rel: null } });
  if (!chips.length) return null;
  return (
    <div className="mb-4 flex flex-wrap items-center gap-1.5" aria-label="Active filters">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {chips.map((c) => (
        <Badge key={c.key} variant="outline" className="gap-1">
          {c.text}
          <button type="button" onClick={() => update(c.clear)} aria-label={`Remove filter ${c.text}`} className="opacity-70 hover:opacity-100"><X className="size-3" aria-hidden /></button>
        </Badge>
      ))}
      <Button variant="ghost" size="sm" onClick={() => update({ ...d, u: state.u, c: state.c, view: state.view, sort: state.sort, alt: state.alt, unit: null })}>Clear all</Button>
    </div>
  );
}
