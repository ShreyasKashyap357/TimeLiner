import { useMemo, useState } from 'react';
import { useApp } from '@/app/context';
import type { Row } from '@/domain/model';
import { tagIndex } from '@/domain/views';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronsUpDown, X } from 'lucide-react';

/** Searchable multi-select for characters / teams / franchises. Applies to every view (it is a filter). */
export function TagPicker({ scoped }: { scoped: Row[] }) {
  const { ds, state, update, label } = useApp();
  const [open, setOpen] = useState(false);
  const index = useMemo(() => tagIndex(scoped, ds), [scoped, ds]);
  const selected = state.tags;
  const toggle = (id: string) => update({ tags: selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id] });
  // Characters named in the titles' cast lists (Wikidata), incl. cameos: the same character id matches across
  // titles and universes. Kept separate from the curated tags above.
  const castChars = useMemo(() => {
    const m = new Map<string, { qid: string; name: string; titles: Set<string> }>();
    for (const r of scoped) for (const c of r.title.credits) {
      if (!c.character_qid || !c.character) continue;
      const e = m.get(c.character_qid) ?? { qid: c.character_qid, name: c.character.split(' / ')[0]!, titles: new Set() };
      e.titles.add(r.title.id); m.set(c.character_qid, e);
    }
    return [...m.values()].map((e) => ({ ...e, count: e.titles.size })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [scoped]);
  const chars = state.chars;
  const toggleChar = (qid: string) => update({ chars: chars.includes(qid) ? chars.filter((x) => x !== qid) : [...chars, qid] });
  const total = selected.length + chars.length;
  const groups = [
    { kind: 'character', heading: 'Characters' },
    { kind: 'team', heading: 'Teams' },
    { kind: 'franchise', heading: 'Franchises' },
  ];
  return (
    <fieldset className="space-y-2">
      <legend className="mb-1 text-sm font-semibold">Characters &amp; teams</legend>
      <p className="text-xs text-muted-foreground">Shows titles featuring any of the selected. Applies to every view.</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} aria-label={`Characters and teams: ${total ? `${total} selected` : "none selected"}`} className="w-full justify-between">
            {total ? `${total} selected` : 'Choose characters…'}
            <ChevronsUpDown aria-hidden className="size-4 opacity-60" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0" align="start">
          <Command>
            <CommandInput placeholder="Search characters or teams…" />
            <CommandList>
              <CommandEmpty>No match.</CommandEmpty>
              {groups.map((g) => {
                const items = index.filter((t) => t.kind === g.kind);
                if (!items.length) return null;
                return (
                  <CommandGroup key={g.kind} heading={g.heading}>
                    {items.map((t) => (
                      <CommandItem key={t.id} value={`${t.label} ${ds.tags.find((x) => x.id === t.id)?.aliases.join(' ') ?? ''}`} onSelect={() => toggle(t.id)}>
                        <Check aria-hidden className={`size-4 ${selected.includes(t.id) ? 'opacity-100' : 'opacity-0'}`} />
                        <span>{t.label}</span>
                        <span className="ml-auto text-muted-foreground">{t.count}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                );
              })}
              {castChars.length > 0 && (
                <CommandGroup heading="From cast lists (Wikidata, incl. cameos)">
                  {castChars.map((c) => (
                    <CommandItem key={c.qid} value={`${c.name} ${c.qid}`} onSelect={() => toggleChar(c.qid)}>
                      <Check aria-hidden className={`size-4 ${chars.includes(c.qid) ? 'opacity-100' : 'opacity-0'}`} />
                      <span className="[overflow-wrap:anywhere]">{c.name}</span>
                      <span className="ml-auto text-muted-foreground">{c.count}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {total > 0 && (
        <div className="flex flex-wrap gap-1">
          {chars.map((qid) => (
            <Badge key={qid} variant="secondary" className="gap-1">
              {label.character(qid)}
              <button type="button" onClick={() => toggleChar(qid)} aria-label={`Remove ${label.character(qid)}`} className="opacity-70 hover:opacity-100"><X className="size-3" aria-hidden /></button>
            </Badge>
          ))}
          {selected.map((id) => (
            <Badge key={id} variant="secondary" className="gap-1">
              {label.tag(id)}
              <button type="button" onClick={() => toggle(id)} aria-label={`Remove ${label.tag(id)}`} className="opacity-70 hover:opacity-100"><X className="size-3" aria-hidden /></button>
            </Badge>
          ))}
        </div>
      )}
    </fieldset>
  );
}
