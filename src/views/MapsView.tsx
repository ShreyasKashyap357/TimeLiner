// Maps view: per-universe maps from data/<universe>/maps.json, drawn with Leaflet (lazy chunk).
// Image maps use CRS.Simple + an image overlay (places in image pixels); 'osm' maps use OpenStreetMap tiles
// (places in lat/lng). Nothing franchise-specific here: maps, places and credits are all data.
import 'leaflet/dist/leaflet.css';
import './maps.css';
import L from 'leaflet';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CircleCheck, CircleHelp, ExternalLink, MapPin, TriangleAlert } from 'lucide-react';
import { useApp } from '@/app/context';
import { loadMaps } from '@/state/data';
import { titleLabel } from '@/domain/model';
import type { MapPlace, WorldMap } from '@/domain/schema';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const OSM_TILES = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSM_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const CONF = {
  stated: { label: 'Stated', icon: CircleCheck, cls: 'border-emerald-400/60 text-emerald-200', help: 'The source gives this place directly.' },
  inferred: { label: 'Inferred', icon: CircleHelp, cls: 'border-sky-400/60 text-sky-200', help: 'The position is read or derived; see the note.' },
  disputed: { label: 'Disputed', icon: TriangleAlert, cls: 'border-amber-400/70 text-amber-200', help: 'Sources disagree or are shaky; see the note.' },
} as const;

/** Leaflet position of a place: image pixels (y down) become CRS.Simple lat/lng (y up). */
export function placeLatLng(m: WorldMap, p: MapPlace): L.LatLngExpression {
  if (m.kind === 'image' && m.image) return [m.image.height - p.y!, p.x!];
  return [p.lat!, p.lng!];
}

/** Native `title` attributes are banned in the UI (they show the browser's plain tooltip); Leaflet adds some. */
function stripTitles(el: HTMLElement) {
  el.querySelectorAll('[title]').forEach((n) => n.removeAttribute('title'));
}

export function MapsView({ universe }: { universe: string }) {
  const [maps, setMaps] = useState<WorldMap[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mapId, setMapId] = useState<string | null>(null);
  const [placeId, setPlaceId] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    setMaps(null); setMapId(null); setPlaceId(null);
    loadMaps(universe).then((m) => { if (live) setMaps(m); }, (e) => { if (live) setError(String(e)); });
    return () => { live = false; };
  }, [universe]);

  if (error) return <p className="p-4 text-sm text-destructive">Failed to load maps: {error}</p>;
  if (!maps) return <p className="p-6 text-sm text-muted-foreground" role="status">Loading maps…</p>;
  if (!maps.length) return <p className="border border-border bg-muted/40 p-4 text-sm text-muted-foreground">There are no maps for this universe yet.</p>;
  const map = maps.find((m) => m.id === mapId) ?? maps[0]!;

  return (
    <section aria-labelledby="map-heading" className="space-y-4" data-testid="maps-view">
      {maps.length > 1 && (
        <div role="group" aria-label="Choose a map" className="flex flex-wrap gap-2">
          {maps.map((m) => (
            <Button key={m.id} size="sm" variant={m.id === map.id ? 'default' : 'outline'} aria-pressed={m.id === map.id}
              className="h-auto min-h-8 max-w-full whitespace-normal text-left" onClick={() => { setMapId(m.id); setPlaceId(null); }}>
              {m.title}
            </Button>
          ))}
        </div>
      )}
      <h2 id="map-heading" className="text-lg font-semibold">{map.title}</h2>
      <LeafletMap key={`${universe}/${map.id}`} map={map} placeId={placeId} onSelect={setPlaceId} />
      <div className="grid gap-4 md:grid-cols-2">
        <PlaceList map={map} placeId={placeId} onSelect={setPlaceId} />
        <AboutMap map={map} />
      </div>
    </section>
  );
}

function LeafletMap({ map, placeId, onSelect }: { map: WorldMap; placeId: string | null; onSelect: (id: string | null) => void }) {
  const el = useRef<HTMLDivElement>(null);
  const lmap = useRef<L.Map | null>(null);
  const markers = useRef(new Map<string, L.Marker>());
  const [popupEl] = useState(() => document.createElement('div'));
  const popup = useRef<L.Popup | null>(null);
  const select = useRef(onSelect);
  select.current = onSelect;
  const kbd = useRef(false); // last place was opened from the keyboard: focus moves into the popup and back
  const lastPlace = useRef<string | null>(null);

  useEffect(() => {
    const node = el.current!;
    const m = L.map(node, { crs: map.kind === 'image' ? L.CRS.Simple : L.CRS.EPSG3857, zoomSnap: 0.25, attributionControl: true, worldCopyJump: map.kind === 'osm' });
    m.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');
    let bounds: L.LatLngBounds;
    if (map.kind === 'image' && map.image) {
      bounds = L.latLngBounds([0, 0], [map.image.height, map.image.width]);
      L.imageOverlay(`${import.meta.env.BASE_URL}${map.image.path}`, bounds, { alt: `Map: ${map.title}` }).addTo(m);
      m.fitBounds(bounds);
      m.setMinZoom(m.getZoom() - 1);
      m.setMaxZoom(m.getZoom() + 4);
      m.setMaxBounds(bounds.pad(0.25));
    } else {
      L.tileLayer(OSM_TILES, { maxZoom: 19, attribution: OSM_ATTRIBUTION }).addTo(m);
      const pts = map.places.map((p) => placeLatLng(map, p));
      bounds = pts.length ? L.latLngBounds(pts) : L.latLngBounds([-60, -170], [75, 170]);
      m.fitBounds(bounds, { padding: [24, 24], maxZoom: 6 });
      m.setMinZoom(1);
    }
    for (const p of map.places) {
      const mk = L.marker(placeLatLng(map, p), {
        icon: L.divIcon({ className: 'tl-map-marker', iconSize: [16, 16], html: '' }),
        keyboard: true, riseOnHover: true,
      }).addTo(m);
      const icon = mk.getElement();
      icon?.setAttribute('aria-label', p.name);
      icon?.setAttribute('data-place', p.id);
      mk.on('click', () => { kbd.current = false; select.current(p.id); });
      // Leaflet only opens bound popups from the keyboard; markers here act as buttons (Enter / Space)
      icon?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); kbd.current = true; select.current(p.id); }
      });
      markers.current.set(p.id, mk);
    }
    const width = Math.max(180, Math.min(280, node.clientWidth - 72)); // fits a 360px phone
    popup.current = L.popup({ content: popupEl, maxWidth: width, minWidth: Math.min(200, width), maxHeight: Math.max(160, node.clientHeight - 90), autoPanPadding: [16, 16], className: 'tl-map-popup' });
    const onPopupKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); m.closePopup(); } };
    popupEl.addEventListener('keydown', onPopupKey);
    m.on('popupclose', () => {
      node.classList.remove('has-popup');
      setTimeout(() => {
        if (popup.current?.isOpen()) return;
        select.current(null);
        // keyboard users go back to the marker they opened
        if (kbd.current && lastPlace.current && (!document.activeElement || document.activeElement === document.body || popupEl.contains(document.activeElement) || node.contains(document.activeElement))) {
          markers.current.get(lastPlace.current)?.getElement()?.focus();
        }
      }, 0);
    });
    m.on('popupopen', () => { node.classList.add('has-popup'); stripTitles(node); });
    stripTitles(node);
    lmap.current = m;
    // The container can change size (sidebar, phone rotation); keep tiles and bounds right.
    const ro = new ResizeObserver(() => m.invalidateSize());
    ro.observe(node);
    const all = markers.current;
    return () => { ro.disconnect(); popupEl.removeEventListener('keydown', onPopupKey); m.remove(); lmap.current = null; all.clear(); };
  }, [map, popupEl]);

  // open the shared popup on the selected place; React renders its content into popupEl through a portal
  useEffect(() => {
    const m = lmap.current;
    const pop = popup.current;
    if (!m || !pop) return;
    for (const [id, mk] of markers.current) mk.getElement()?.classList.toggle('is-selected', id === placeId);
    const mk = placeId ? markers.current.get(placeId) : undefined;
    if (!mk) { if (pop.isOpen()) m.closePopup(pop); return; }
    lastPlace.current = placeId;
    pop.setLatLng(mk.getLatLng());
    if (!pop.isOpen()) pop.openOn(m);
    const raf = requestAnimationFrame(() => { pop.update(); stripTitles(el.current!); });
    // after the popup's fade-in/auto-pan (focus() is ignored while it is still animating)
    const t = kbd.current ? setTimeout(() => popupEl.querySelector<HTMLElement>('button, a[href]')?.focus(), 300) : undefined;
    return () => { cancelAnimationFrame(raf); clearTimeout(t); };
  }, [placeId, popupEl]);

  const place = map.places.find((p) => p.id === placeId);
  return (
    <>
      <div ref={el} role="region" aria-label={`Interactive map: ${map.title}. Use the place list below to visit each place.`}
        className="tl-map relative isolate z-0 h-[min(70dvh,36rem)] min-h-80 w-full overflow-hidden border border-border" />
      {place && createPortal(<PlaceCard place={place} />, popupEl)}
    </>
  );
}

function ConfidenceTag({ c }: { c: MapPlace['confidence'] }) {
  const x = CONF[c];
  const Icon = x.icon;
  return (
    <Badge variant="outline" className={cn('gap-1', x.cls)}>
      <Icon aria-hidden className="size-3" />{x.label}<span className="sr-only">: {x.help}</span>
    </Badge>
  );
}

/** Popup body: name, confidence, note, source and the linked titles (open the detail drawer). */
function PlaceCard({ place }: { place: MapPlace }) {
  const { ds, update } = useApp();
  const titles = place.title_ids.map((id) => ds.titles.find((t) => t.id === id)).filter((t) => t && t.units.length);
  return (
    <div className="space-y-2 text-sm" data-testid="place-card">
      <div className="flex flex-wrap items-center gap-2">
        <strong className="text-base font-semibold">{place.name}</strong>
        <ConfidenceTag c={place.confidence} />
      </div>
      {place.note && <p className="text-muted-foreground">{place.note}</p>}
      {titles.length > 0 && (
        <div>
          <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Set here</div>
          <ul className="flex max-h-40 flex-col gap-1 overflow-y-auto">
            {titles.map((t) => (
              <li key={t!.id}>
                <Button size="sm" variant="outline" className="h-auto w-full justify-start whitespace-normal py-1 text-left"
                  onClick={() => update({ unit: t!.units[0]!.id }, true)}>
                  {titleLabel(ds.titles, t!.id)}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <a href={place.source_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs underline">
        Source <ExternalLink aria-hidden className="size-3" />
      </a>
    </div>
  );
}

function PlaceList({ map, placeId, onSelect }: { map: WorldMap; placeId: string | null; onSelect: (id: string) => void }) {
  const places = useMemo(() => [...map.places].sort((a, b) => a.name.localeCompare(b.name)), [map]);
  return (
    <section aria-labelledby="places-heading" className="border border-border bg-card p-4">
      <h3 id="places-heading" className="mb-2 font-semibold">Places ({places.length})</h3>
      {places.length === 0
        ? <p className="text-sm text-muted-foreground">No places are marked on this map yet.</p>
        : (
          <ul className="flex max-h-72 flex-col gap-1 overflow-y-auto pr-1" data-testid="place-list">
            {places.map((p) => (
              <li key={p.id}>
                <button type="button" aria-pressed={p.id === placeId}
                  onClick={() => { onSelect(p.id); document.querySelector('.tl-map')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }}
                  className={cn('flex w-full items-center gap-2 px-2 py-1 text-left text-sm hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring', p.id === placeId && 'bg-muted font-medium')}>
                  <MapPin aria-hidden className="size-3.5 shrink-0 text-[var(--u-primary)]" />
                  <span className="min-w-0 flex-1 break-words">{p.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{p.title_ids.length} {p.title_ids.length === 1 ? 'title' : 'titles'}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
    </section>
  );
}

/** Credits: every map shows its source, author and licence. */
function AboutMap({ map }: { map: WorldMap }) {
  const c = map.credit;
  const counts = { stated: 0, inferred: 0, disputed: 0 };
  for (const p of map.places) counts[p.confidence]++;
  return (
    <section aria-labelledby="about-map-heading" className="space-y-2 border border-border bg-card p-4 text-sm" data-testid="map-credit">
      <div className="flex flex-wrap items-center gap-2">
        <h3 id="about-map-heading" className="font-semibold">About this map</h3>
        {c.fan_made && <Badge variant="outline">Fan-made</Badge>}
        {c.modified && <Badge variant="outline">Modified</Badge>}
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
        <dt className="text-muted-foreground">Source</dt>
        <dd className="min-w-0 break-words"><a href={c.source_url} target="_blank" rel="noreferrer" className="underline">{c.title}</a></dd>
        <dt className="text-muted-foreground">Author</dt>
        <dd className="min-w-0 break-words">{c.author}</dd>
        <dt className="text-muted-foreground">Licence</dt>
        <dd className="min-w-0 break-words"><a href={c.licence_url} target="_blank" rel="noreferrer" className="underline">{c.licence}</a></dd>
        {map.kind === 'osm' && <>
          <dt className="text-muted-foreground">Tiles</dt>
          <dd className="min-w-0 break-words">© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="underline">OpenStreetMap</a> contributors</dd>
        </>}
      </dl>
      {c.note && <p className="text-muted-foreground">{c.note}</p>}
      {map.places.length > 0 && (
        <p className="text-muted-foreground">
          {counts.stated > 0 && `${counts.stated} ${counts.stated === 1 ? 'place is' : 'places are'} stated by the source. `}
          {counts.inferred > 0 && `${counts.inferred} ${counts.inferred === 1 ? 'position is' : 'positions are'} inferred (see each place's note). `}
          {counts.disputed > 0 && `${counts.disputed} disputed.`}
        </p>
      )}
    </section>
  );
}
