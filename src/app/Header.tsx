import { useEffect, useRef, useState } from 'react';
import { useApp } from './context';
import { universes as allUniverses } from '@/state/data';
import { HeaderSelect } from './HeaderSelect';
import { ContinuityPicker } from './ContinuityPicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Search, ListChecks, EyeOff, Eye } from 'lucide-react';
import { RowMarker } from '@/components/Marker';
import { Tip } from '@/components/Tip';

/** Top bar: brand, universe + continuity pickers, filter-by-text, search palette, watched menu. */
export function HeaderBar() {
  const { ds, state, update } = useApp();
  const universes = allUniverses.filter((u) => u.enabled);
  const conts = ds.continuities.filter((c) => state.u === 'all' || c.universe === state.u).sort((a, b) => a.order - b.order);
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 py-2">
      <a href={import.meta.env.BASE_URL} className="mr-1 flex items-baseline gap-2" aria-label="TimeLiner home">
        <span className="font-heading text-xl font-bold tracking-widest" style={{ color: 'var(--u-primary)' }}>TIMELINER</span>
      </a>
      <div className="flex min-w-0 flex-[1_1_auto] items-center gap-2">
        <HeaderSelect label="Universe" hint="Franchise universe" value={state.u}
          options={[...(universes.length > 1 ? [{ value: 'all', label: 'All universes' }] : []), ...universes.map((u) => ({ value: u.id, label: u.name, color: u.accent.primary }))]}
          onChange={(u) => { const uni = allUniverses.find((x) => x.id === u); update({ u, c: uni ? uni.default_continuity : state.c, unit: null }, true); }} />
        <ContinuityPicker ds={ds} conts={conts} value={state.u === 'all' ? '' : state.c ?? ''} disabled={state.u === 'all'}
          placeholder={state.u === 'all' ? 'All continuities' : 'Continuity'} onChange={(c) => update({ c, unit: null }, true)} />
      </div>
      <div className="ml-auto flex min-w-0 max-w-full flex-[1_1_auto] flex-wrap items-center justify-end gap-2 sm:flex-none">
        <FilterBox />
        <SearchPalette />
        <SpoilerToggle />
        <WatchedMenu />
      </div>
    </div>
  );
}

function SpoilerToggle() {
  const { spoilerSafe, setSpoilerSafe } = useApp();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={spoilerSafe ? 'default' : 'outline'} size="icon" aria-pressed={spoilerSafe} aria-label="Spoiler-safe mode" onClick={() => setSpoilerSafe(!spoilerSafe)}>
          {spoilerSafe ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">Spoiler-safe mode {spoilerSafe ? 'on' : 'off'}: hides plot notes for anything you haven't marked done</TooltipContent>
    </Tooltip>
  );
}

function FilterBox() {
  const { state, update } = useApp();
  const [text, setText] = useState(state.q);
  const t = useRef<number | undefined>(undefined);
  useEffect(() => setText(state.q), [state.q]);
  return (
    <Tip content="Filter the list by title, character or person (narrows what is shown; use Search to jump to one title)">
    <div className="relative min-w-0 flex-1 basis-28 sm:flex-none">
      <Search aria-hidden className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search" value={text} placeholder="Filter titles…" aria-label="Filter by title, character or person"
        className="w-full pl-8 sm:w-52"
        onChange={(e) => { const v = e.target.value; setText(v); window.clearTimeout(t.current); t.current = window.setTimeout(() => update({ q: v }), 200); }}
      />
    </div>
    </Tip>
  );
}

function SearchPalette() {
  const { state, update, rows } = useApp();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen((o) => !o); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const inUniverse = rows.filter((r) => state.u === 'all' || r.universe.id === state.u);
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={() => setOpen(true)} aria-keyshortcuts="Control+K Meta+K">
            <Search aria-hidden className="size-4" /> <span className="max-sm:sr-only">Search</span> <kbd className="ml-1 hidden rounded border border-border px-1 text-[0.7em] text-muted-foreground sm:inline">Ctrl K</kbd>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Jump to any title or character (Ctrl+K / ⌘K)</TooltipContent>
      </Tooltip>
      <CommandDialog open={open} onOpenChange={setOpen} title="Search titles and characters" description="Type to find a title; Enter opens its details.">
        <Command>
          <CommandInput placeholder="Search titles, characters, teams…" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Titles">
              {inUniverse.map((r) => (
                <CommandItem key={r.key} value={`${r.name} ${r.search} ${r.key}`} onSelect={() => { setOpen(false); update({ unit: r.key }); }}>
                  <RowMarker row={r} /> <span>{r.name}</span><span className="ml-auto text-muted-foreground">{r.continuity.short_name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

function WatchedMenu() {
  const { watched } = useApp();
  const [importOpen, setImportOpen] = useState(false);
  const [text, setText] = useState('');
  const download = () => {
    const blob = new Blob([watched.exportJson()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `timeliner-watched-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const doImport = (mode: 'merge' | 'replace') => {
    try {
      const n = watched.importJson(text, mode);
      toast.success(`Imported ${n} watched entries (${mode}).`);
      setImportOpen(false); setText('');
    } catch (e) {
      toast.error(`Import failed: ${(e as Error).message}`);
    }
  };
  return (
    <>
      <DropdownMenu>
        <Tip content="Done list (watched / read): export, import or clear. Stored in this browser."><span className="inline-flex">
        <DropdownMenuTrigger asChild>
          <Button variant="outline" aria-label={`Done: ${watched.set.size}. Open done-list menu`}><ListChecks aria-hidden className="size-4" />{watched.set.size}</Button>
        </DropdownMenuTrigger>
        </span></Tip>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Done ({watched.set.size}) · stored in this browser</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={download}>Export JSON…</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setImportOpen(true)}>Import JSON…</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onSelect={() => { if (window.confirm('Clear all watched marks in this browser?')) watched.clear(); }}>Clear all</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={importOpen} onOpenChange={setImportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import done list</DialogTitle>
            <DialogDescription>Paste an exported TimeLiner JSON file, or choose a file.</DialogDescription>
          </DialogHeader>
          <input type="file" accept="application/json,.json" aria-label="Choose JSON file" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setText(await f.text()); }} className="text-sm" />
          <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} aria-label="JSON to import" placeholder='{"app":"timeliner","version":1,"watched":{…}}' />
          <DialogFooter>
            <Button variant="outline" onClick={() => doImport('replace')} disabled={!text.trim()}>Replace</Button>
            <Button onClick={() => doImport('merge')} disabled={!text.trim()}>Merge</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
