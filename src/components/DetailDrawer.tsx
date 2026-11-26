import { useApp } from '@/app/context';
import { formatRelease } from '@/domain/dates';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { ConfidenceBadge } from './Badges';
import { RowMarker, markerMeaning } from './Marker';

function Field({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[8.5rem_1fr] gap-2 py-1 text-sm">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}

export function DetailDrawer() {
  const { rows, state, update, watched, label, ds } = useApp();
  const row = state.unit ? rows.find((r) => r.key === state.unit) : undefined;
  const open = Boolean(row);
  const studio = row ? ds.studios.find((s) => s.id === row.studio) : undefined;
  const lbl = row?.label ? ds.studios.find((s) => s.id === row.label) : undefined;
  const iu = row?.unit.in_universe;
  const siblings = row ? row.title.units.filter((u) => u.id !== row.key) : [];
  return (
    <Sheet open={open} onOpenChange={(o) => { if (!o) update({ unit: null }); }}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        {row && iu && (
          <>
            <SheetHeader>
              <SheetTitle className="font-heading text-xl text-primary">{row.name}</SheetTitle>
              <SheetDescription className="flex flex-wrap items-center gap-2">
                <RowMarker row={row} /> <span>{markerMeaning(row)}</span>
                <span aria-hidden>·</span> <span>{row.continuity.name}</span>
              </SheetDescription>
            </SheetHeader>
            <div className="px-4 pb-6">
              <Button
                variant={watched.set.has(row.key) ? 'secondary' : 'default'}
                className="mb-3 w-full"
                onClick={() => watched.toggle(row.key)}
                aria-pressed={watched.set.has(row.key)}
              >
                {watched.set.has(row.key) ? '✓ Watched (click to undo)' : 'Mark as watched'}
              </Button>
              <dl>
                <Field k="In-universe">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{iu.label}</span>
                    <ConfidenceBadge c={iu.confidence} />
                    <Badge variant="outline">{iu.precision}</Badge>
                  </div>
                  {iu.note && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{iu.note}</p>}
                </Field>
                <Field k="Release">{formatRelease(row.unit.release.date)}{row.unit.release.end_date ? ` – ${formatRelease(row.unit.release.end_date)}` : ''} <span className="text-muted-foreground">({row.unit.status})</span>
                  {row.unit.release.note && <p className="text-xs text-muted-foreground">{row.unit.release.note}</p>}</Field>
                <Field k="Type">{row.type}{row.unit.episode_count ? ` · ${row.unit.episode_count} episode${row.unit.episode_count > 1 ? 's' : ''}` : ''}{row.unit.runtime_min ? ` · ${row.unit.runtime_min} min` : ''}</Field>
                <Field k="Original platform">{label.platform(row.platform)}</Field>
                <Field k="Studio">
                  <span className="flex flex-col gap-1">
                    <span>{studio?.label ?? row.studio}</span>
                    {lbl && <span className="text-xs text-muted-foreground">Label / banner: {lbl.label}</span>}
                    {(lbl?.group || studio?.group) && (lbl?.note || studio?.note) && <span className="text-xs text-muted-foreground">{lbl?.note || studio?.note}</span>}
                  </span>
                </Field>
                <Field k="Continuity">{row.continuity.name} · {row.branch.label}</Field>
                <Field k="Canon tier">{row.tier}</Field>
                {Object.entries(row.unit.groupings).filter(([, v]) => v).length > 0 && (
                  <Field k="Grouping">{Object.entries(row.unit.groupings).filter(([, v]) => v).map(([, v]) => label.grouping(v!)).join(' · ')}</Field>
                )}
                {(row.title.characters.length > 0 || row.title.franchises.length > 0) && (
                  <Field k="Characters / teams">
                    <span className="flex flex-wrap gap-1">
                      {[...row.title.characters, ...row.title.franchises].map((t) => (
                        <button key={t} type="button" onClick={() => update({ view: 'tags', tags: [t], unit: null }, true)}>
                          <Badge variant="secondary" className="cursor-pointer hover:bg-accent">{label.tag(t)}</Badge>
                        </button>
                      ))}
                    </span>
                  </Field>
                )}
              </dl>
              {row.title.notes && <p className="mt-3 text-sm text-muted-foreground">{row.title.notes}</p>}
              {row.unit.notes && <p className="mt-2 text-sm text-muted-foreground">{row.unit.notes}</p>}
              {row.title.links.length > 0 && (
                <>
                  <Separator className="my-3" />
                  <h3 className="mb-1 text-sm font-semibold">Connections</h3>
                  <ul className="space-y-1 text-sm">
                    {row.title.links.map((l) => {
                      const target = rows.find((r) => r.title.id === l.to);
                      return (
                        <li key={l.to + l.kind}>
                          <span className="text-muted-foreground">{l.kind}: </span>
                          {target ? <button type="button" className="underline" onClick={() => update({ unit: target.key })}>{target.title.title}</button> : l.to}
                          {l.note && <span className="text-muted-foreground"> ({l.note})</span>}
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
              {siblings.length > 0 && (
                <>
                  <Separator className="my-3" />
                  <h3 className="mb-1 text-sm font-semibold">Other parts of {row.title.title}</h3>
                  <ul className="space-y-1 text-sm">
                    {siblings.map((u) => (
                      <li key={u.id}><button type="button" className="underline" onClick={() => update({ unit: u.id })}>{u.label}</button> <span className="text-muted-foreground">· {u.in_universe.label}</span></li>
                    ))}
                  </ul>
                </>
              )}
              <Separator className="my-3" />
              <h3 className="mb-1 text-sm font-semibold">Sources</h3>
              <ul className="space-y-1 text-sm">
                {[...new Set([...row.unit.source_urls, ...row.title.source_urls])].map((u) => (
                  <li key={u} className="truncate">
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
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
