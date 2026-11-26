import { useMemo, useState } from 'react';
import { useApp } from '@/app/context';
import type { Row } from '@/domain/model';
import type { CreditRole } from '@/domain/schema';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronsUpDown, X } from 'lucide-react';

const ROLE_WORD: Record<CreditRole, string> = { author: 'author', creator: 'creator', director: 'director', writer: 'writer', producer: 'producer', 'executive-producer': 'exec. producer', composer: 'composer', cast: 'cast' };

/** People in the current scope (cast & crew from Wikidata), most titles first. */
export function peopleIndex(rows: Row[]) {
  const m = new Map<string, { qid: string; name: string; titles: Set<string>; roles: Set<CreditRole> }>();
  for (const r of rows) for (const c of r.title.credits) {
    if (!c.qid) continue;
    const e = m.get(c.qid) ?? { qid: c.qid, name: c.name, titles: new Set(), roles: new Set() };
    e.titles.add(r.title.id); e.roles.add(c.role); m.set(c.qid, e);
  }
  return [...m.values()].map((e) => ({ qid: e.qid, name: e.name, count: e.titles.size, roles: [...e.roles] }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Searchable multi-select for cast & crew. Like the character filter, it applies to every view. */
export function PeoplePicker({ scoped }: { scoped: Row[] }) {
  const { state, update, label } = useApp();
  const [open, setOpen] = useState(false);
  const index = useMemo(() => peopleIndex(scoped), [scoped]);
  const selected = state.people;
  const toggle = (qid: string) => update({ people: selected.includes(qid) ? selected.filter((x) => x !== qid) : [...selected, qid] });
  if (!index.length && !selected.length) return null;
  return (
    <fieldset className="space-y-2">
      <legend className="mb-1 text-sm font-semibold">Cast &amp; crew</legend>
      <p className="text-xs text-muted-foreground">Shows titles with any of the selected people (from Wikidata).</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} aria-label={`Cast and crew: ${selected.length ? `${selected.length} selected` : 'none selected'}`} className="w-full justify-between">
            {selected.length ? `${selected.length} selected` : 'Choose people…'}
            <ChevronsUpDown aria-hidden className="size-4 opacity-60" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <Command>
            <CommandInput placeholder="Search actors, directors, authors…" />
            <CommandList>
              <CommandEmpty>No match.</CommandEmpty>
              <CommandGroup heading={`${index.length} people`}>
                {index.map((p) => (
                  <CommandItem key={p.qid} value={`${p.name} ${p.qid}`} onSelect={() => toggle(p.qid)}>
                    <Check aria-hidden className={`size-4 ${selected.includes(p.qid) ? 'opacity-100' : 'opacity-0'}`} />
                    <span className="min-w-0 flex-1">
                      <span className="block [overflow-wrap:anywhere]">{p.name}</span>
                      <span className="block text-xs text-muted-foreground">{p.roles.map((r) => ROLE_WORD[r]).join(', ')}</span>
                    </span>
                    <span className="text-muted-foreground">{p.count}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selected.map((qid) => (
            <Badge key={qid} variant="secondary" className="gap-1">
              {label.person(qid)}
              <button type="button" onClick={() => toggle(qid)} aria-label={`Remove ${label.person(qid)}`} className="opacity-70 hover:opacity-100"><X className="size-3" aria-hidden /></button>
            </Badge>
          ))}
        </div>
      )}
    </fieldset>
  );
}
