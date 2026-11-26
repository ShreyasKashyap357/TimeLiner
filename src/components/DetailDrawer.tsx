import { useEffect, useMemo } from 'react';
import { useApp } from '@/app/context';
import { formatRelease } from '@/domain/dates';
import { connectionsFor, describeConnection, readingMinutes } from '@/domain/views';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronLeft, ChevronRight, ExternalLink, Check, SkipForward, Link2 } from 'lucide-react';
import { ConfidenceBadge } from './Badges';
import { RowMarker, markerMeaning } from './Marker';
import { SpoilerText } from './SpoilerText';
import { doneVerb } from '@/domain/model';

function Field({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[9rem_1fr] gap-2 py-1.5 text-sm">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-1.5">
      <Separator className="my-3" />
      <h3 className="text-sm font-semibold">{title}</h3>
      {children}
    </section>
  );
}

export function DetailDrawer() {
  const { rows, state, update, watched, label, ds, ordered } = useApp();
  const row = state.unit ? rows.find((r) => r.key === state.unit) : undefined;
  const open = Boolean(row);
  const idx = row ? ordered.findIndex((r) => r.key === row.key) : -1;
  const prev = idx > 0 ? ordered[idx - 1] : undefined;
  const next = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : undefined;
  const go = (key?: string) => { if (key) update({ unit: key }); };

  // Alt+← / Alt+→ step through the current order while the panel is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (!e.altKey) return;
      if (e.key === 'ArrowLeft' && prev) { e.preventDefault(); go(prev.key); }
      if (e.key === 'ArrowRight' && next) { e.preventDefault(); go(next.key); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const conns = useMemo(() => (row ? connectionsFor(row.title.id, ds) : []), [row, ds]);
  const studio = row ? ds.studios.find((s) => s.id === row.studio) : undefined;
  const lbl = row?.label ? ds.studios.find((s) => s.id === row.label) : undefined;
  const iu = row?.unit.in_universe;
  const siblings = row ? row.title.units.filter((u) => u.id !== row.key) : [];
  const isWatched = row ? watched.set.has(row.key) : false;
  const verb = row ? doneVerb(row.type) : 'watched';
  const Verb = verb[0]!.toUpperCase() + verb.slice(1);
  const isPrint = row?.medium === 'print';
  const firstUnitOf = (titleId: string) => rows.find((r) => r.title.id === titleId)?.key;

  return (
    <Sheet open={open} onOpenChange={(o) => { if (!o) update({ unit: null }); }}>
      <SheetContent side="right" className="w-full gap-0 overflow-y-auto sm:max-w-xl">
        {row && iu && (
          <>
            <SheetHeader className="border-b border-border">
              <div className="flex items-center gap-1 pr-8 text-xs text-muted-foreground">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={!prev} onClick={() => go(prev?.key)} aria-label={prev ? `Previous: ${prev.name}` : 'No previous entry'} aria-keyshortcuts="Alt+ArrowLeft"><ChevronLeft className="size-4" /></Button>
                  </TooltipTrigger>
                  <TooltipContent>{prev ? `Previous: ${prev.name} (Alt+←)` : 'Start of this order'}</TooltipContent>
                </Tooltip>
                <span className="tabular-nums">{idx >= 0 ? `${idx + 1} of ${ordered.length} in this view` : 'Not in the current filtered view'}</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={!next} onClick={() => go(next?.key)} aria-label={next ? `Next: ${next.name}` : 'No next entry'} aria-keyshortcuts="Alt+ArrowRight"><ChevronRight className="size-4" /></Button>
                  </TooltipTrigger>
                  <TooltipContent>{next ? `Next: ${next.name} (Alt+→)` : 'End of this order'}</TooltipContent>
                </Tooltip>
              </div>
              <SheetTitle className="font-heading text-xl" style={{ color: 'var(--u-primary)' }}>{row.name}</SheetTitle>
              <SheetDescription className="flex flex-wrap items-center gap-2">
                <RowMarker row={row} /> <span>{markerMeaning(row)}</span>
                <span aria-hidden>·</span> <span>{row.continuity.name}</span>
              </SheetDescription>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button variant={isWatched ? 'secondary' : 'default'} onClick={() => watched.toggle(row.key)} aria-pressed={isWatched}>
                  <Check className="size-4" aria-hidden />{isWatched ? Verb : `Mark as ${verb}`}
                </Button>
                {next && !isWatched && (
                  <Button variant="outline" onClick={() => { watched.toggle(row.key, true); go(next.key); }}>
                    <SkipForward className="size-4" aria-hidden />{Verb}, go to next
                  </Button>
                )}
              </div>
            </SheetHeader>
            <div className="px-4 pb-8 pt-3">
              <dl>
                <Field k="In-universe">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{iu.label}</span>
                    <ConfidenceBadge c={iu.confidence} />
                  </div>
                  {iu.note && <p className="mt-1 text-xs leading-relaxed text-muted-foreground"><SpoilerText unitKey={row.key}>{iu.note}</SpoilerText></p>}
                </Field>
                <Field k={isPrint ? 'Published' : 'Released'}>{formatRelease(row.unit.release.date)}{row.unit.release.end_date ? ` – ${formatRelease(row.unit.release.end_date)}` : ''} <span className="text-muted-foreground">({row.unit.status})</span>
                  {row.unit.release.note && <p className="text-xs text-muted-foreground">{row.unit.release.note}</p>}</Field>
                <Field k="Type">{row.type}{row.unit.episode_count ? ` · ${row.unit.episode_count} episode${row.unit.episode_count > 1 ? 's' : ''}` : ''}{row.unit.runtime_min ? ` · ${row.unit.runtime_min} min` : ''}{row.unit.pages ? ` · ${row.unit.pages} pages` : ''}{row.unit.word_count ? ` · ${row.unit.word_count.toLocaleString('en-US')} words (about ${Math.round(readingMinutes(row.unit.word_count) / 60)} h at 250 words/min)` : ''}</Field>
                <Field k={isPrint ? 'First edition' : 'Original platform'}>{label.platform(row.platform)}</Field>
                <Field k={studio?.kind === 'publisher' || studio?.kind === 'imprint' ? 'Publisher' : 'Studio'}>
                  <span className="flex flex-col gap-0.5">
                    <span>{studio?.label ?? row.studio}</span>
                    {lbl && <span className="text-xs text-muted-foreground">Label / banner: {lbl.label}</span>}
                  </span>
                </Field>
                <Field k="Continuity">{row.continuity.name} · {row.branch.label}</Field>
                <Field k="Canon tier">{row.tier}</Field>
                {Object.values(row.unit.groupings).some(Boolean) && (
                  <Field k="Grouping">{Object.values(row.unit.groupings).filter(Boolean).map((v) => label.grouping(v!)).join(' · ')}</Field>
                )}
              </dl>

              {row.title.constituents.length > 0 && (
                <Section title={`Episodes in this crossover (${row.title.constituents.length})`}>
                  <ol className="list-decimal space-y-1 pl-5 text-sm">
                    {row.title.constituents.map((ref) => {
                      const [uid, ep] = ref.split('#e');
                      const part = rows.find((r) => r.key === uid);
                      return (
                        <li key={ref}>
                          {part ? <button type="button" className="underline" onClick={() => go(part.key)}>{part.name}</button> : uid}
                          {ep && <span className="text-muted-foreground">, episode {ep}</span>}
                        </li>
                      );
                    })}
                  </ol>
                </Section>
              )}

              {conns.length > 0 && (
                <Section title={`Connections (${conns.length})`}>
                  <ul className="space-y-1.5 text-sm">
                    {conns.map((c, i) => (
                      <li key={i} className="flex flex-wrap items-baseline gap-x-2">
                        <Link2 className="size-3.5 self-center text-muted-foreground" aria-hidden />
                        <span className="text-muted-foreground">{describeConnection(c)}</span>
                        <button type="button" className="font-medium underline" onClick={() => go(firstUnitOf(c.titleId))}>{c.title}</button>
                        {c.note && <span className="text-xs text-muted-foreground"><SpoilerText unitKey={row.key}>({c.note})</SpoilerText></span>}
                      </li>
                    ))}
                  </ul>
                  <Button variant="link" className="h-auto p-0" onClick={() => update({ view: 'connections', unit: null }, true)}>Open the Connections view →</Button>
                </Section>
              )}

              {(row.title.characters.length > 0 || row.title.franchises.length > 0) && (
                <Section title="Characters & teams">
                  <div className="flex flex-wrap gap-1">
                    {[...row.title.characters, ...row.title.franchises].map((t) => (
                      <Tooltip key={t}>
                        <TooltipTrigger asChild>
                          <button type="button" onClick={() => update({ view: 'tags', tags: [t], unit: null }, true)}>
                            <Badge variant="secondary" className="cursor-pointer hover:bg-accent">{label.tag(t)}</Badge>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Show everything with {label.tag(t)}</TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </Section>
              )}

              {siblings.length > 0 && (
                <Section title={`Other parts of ${row.titleName}`}>
                  <ul className="space-y-1 text-sm">
                    {siblings.map((u) => (
                      <li key={u.id}><button type="button" className="underline" onClick={() => go(u.id)}>{u.label}</button> <span className="text-muted-foreground">· {u.in_universe.label} · {formatRelease(u.release.date)}</span>{watched.set.has(u.id) && <span className="text-muted-foreground"> · {verb}</span>}</li>
                    ))}
                  </ul>
                </Section>
              )}

              {(row.title.notes || row.unit.notes) && (
                <Section title="Notes">
                  {row.title.notes && <p className="text-sm text-muted-foreground"><SpoilerText unitKey={row.key}>{row.title.notes}</SpoilerText></p>}
                  {row.unit.notes && <p className="text-sm text-muted-foreground"><SpoilerText unitKey={row.key}>{row.unit.notes}</SpoilerText></p>}
                </Section>
              )}

              <Section title="Sources">
                <ul className="space-y-1 text-sm">
                  {[...new Set([...row.unit.source_urls, ...row.title.source_urls])].map((u) => (
                    <li key={u} className="[overflow-wrap:anywhere]">
                      <a href={u} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 underline">
                        {decodeURIComponent(u.replace(/^https?:\/\/(en\.)?/, '').replace(/_/g, ' '))}<ExternalLink aria-hidden className="size-3" />
                        <span className="sr-only">(opens in new tab)</span>
                      </a>
                    </li>
                  ))}
                  {row.title.external_ids.wikidata && (
                    <li><a className="underline" href={`https://www.wikidata.org/wiki/${row.title.external_ids.wikidata}`} target="_blank" rel="noreferrer noopener">Wikidata {row.title.external_ids.wikidata}</a></li>
                  )}
                </ul>
              </Section>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
