// Galaxy maps: a drawing the app makes from data (no image), for settings spread over many worlds. Places sit
// in the grid square the source gives, or on the ring of the region the source names. Nothing here is
// franchise-specific: the grid's letters, the regions and every place come from data/<universe>/maps.json.
import type { MapPlace, WorldMap } from './schema';

export const CELL = 100; // drawing units per grid square
const RING_SIZE = 1000; // drawing size when the map has regions only

export interface GalaxyGeometry {
  w: number; h: number;
  /** centre and radius of the region rings (the disc inscribed in the drawing) */
  cx: number; cy: number; radius: number;
}

export function galaxyGeometry(m: WorldMap): GalaxyGeometry {
  const g = m.galaxy?.grid;
  const w = g ? g.cols.length * CELL : RING_SIZE, h = g ? g.rows * CELL : RING_SIZE;
  return { w, h, cx: w / 2, cy: h / 2, radius: Math.min(w, h) / 2 - 10 };
}

/** Drawing position (x right, y down) of every place on a galaxy map. Several places in one grid square are
 *  spread on a small circle round its centre; places known only by region are spaced evenly round that region's
 *  ring, in name order. In both cases the exact spot carries no meaning (the map's note says so). */
export function galaxyPositions(m: WorldMap): Map<string, { x: number; y: number }> {
  const out = new Map<string, { x: number; y: number }>();
  const gal = m.galaxy;
  if (!gal) return out;
  const geo = galaxyGeometry(m);
  const byName = (a: MapPlace, b: MapPlace) => a.name.localeCompare(b.name);
  const spread = (group: MapPlace[], x: number, y: number, r: number, turn = 0) => {
    group.sort(byName).forEach((p, i) => {
      const a = turn + (2 * Math.PI * i) / group.length - Math.PI / 2;
      const rr = group.length === 1 && r < CELL ? 0 : r;
      out.set(p.id, { x: x + rr * Math.cos(a), y: y + rr * Math.sin(a) });
    });
  };
  const cells = new Map<string, MapPlace[]>();
  const regions = new Map<string, MapPlace[]>();
  for (const p of m.places) {
    if (p.grid && gal.grid) cells.set(p.grid, [...(cells.get(p.grid) ?? []), p]);
    else if (p.region) regions.set(p.region, [...(regions.get(p.region) ?? []), p]);
  }
  for (const [sq, group] of cells) {
    const [col, row] = sq.split('-');
    const ci = gal.grid!.cols.indexOf(col!), ri = Number(row) - 1;
    spread(group, ci * CELL + CELL / 2, ri * CELL + CELL / 2, CELL * 0.28);
  }
  gal.regions.forEach((reg, i) => {
    const group = regions.get(reg.id);
    if (!group) return;
    const inner = i ? gal.regions[i - 1]!.r : 0;
    const r = (inner === 0 && group.length === 1) ? 0 : ((inner + reg.r) / 2) * geo.radius;
    spread(group, geo.cx, geo.cy, r, i * 0.9);
  });
  return out;
}

/** The drawing itself (SVG markup in drawing units): rings with their labels, then the grid with its letters
 *  and numbers. Colours come from the page's CSS variables so it follows the theme. */
export function galaxySvg(m: WorldMap): string {
  const gal = m.galaxy!;
  const geo = galaxyGeometry(m);
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const parts: string[] = [`<rect x="0" y="0" width="${geo.w}" height="${geo.h}" style="fill:var(--card)"/>`];
  [...gal.regions].reverse().forEach((reg) => {
    const i = gal.regions.indexOf(reg);
    parts.push(`<circle cx="${geo.cx}" cy="${geo.cy}" r="${reg.r * geo.radius}" style="fill:var(--u-secondary);fill-opacity:${0.05 + 0.05 * (gal.regions.length - i) / gal.regions.length};stroke:var(--u-secondary);stroke-opacity:.5;stroke-width:2"/>`);
  });
  gal.regions.forEach((reg, i) => {
    const inner = i ? gal.regions[i - 1]!.r : 0;
    const y = geo.cy - ((inner + reg.r) / 2) * geo.radius;
    parts.push(`<text x="${geo.cx}" y="${i === 0 ? geo.cy + 6 : y + 6}" text-anchor="middle" style="fill:var(--muted-foreground);font-size:${i === 0 ? 20 : 18}px;font-family:inherit">${esc(reg.label)}</text>`);
  });
  if (gal.grid) {
    const { cols, rows } = gal.grid;
    for (let c = 0; c <= cols.length; c++) parts.push(`<line x1="${c * CELL}" y1="0" x2="${c * CELL}" y2="${geo.h}" style="stroke:var(--border);stroke-width:2"/>`);
    for (let r = 0; r <= rows; r++) parts.push(`<line x1="0" y1="${r * CELL}" x2="${geo.w}" y2="${r * CELL}" style="stroke:var(--border);stroke-width:2"/>`);
    cols.forEach((c, i) => {
      parts.push(`<text x="${i * CELL + CELL / 2}" y="26" text-anchor="middle" style="fill:var(--muted-foreground);font-size:22px;font-family:inherit">${esc(c)}</text>`);
      parts.push(`<text x="${i * CELL + CELL / 2}" y="${geo.h - 10}" text-anchor="middle" style="fill:var(--muted-foreground);font-size:22px;font-family:inherit">${esc(c)}</text>`);
    });
    for (let r = 1; r <= rows; r++) {
      parts.push(`<text x="10" y="${(r - 1) * CELL + CELL / 2 + 8}" style="fill:var(--muted-foreground);font-size:22px;font-family:inherit">${r}</text>`);
      parts.push(`<text x="${geo.w - 10}" y="${(r - 1) * CELL + CELL / 2 + 8}" text-anchor="end" style="fill:var(--muted-foreground);font-size:22px;font-family:inherit">${r}</text>`);
    }
  }
  return parts.join('');
}

/** Short label for where a place is: "Grid L-9" and/or its region's label. */
export function galaxyWhere(m: WorldMap, p: MapPlace): string {
  const reg = p.region ? m.galaxy?.regions.find((r) => r.id === p.region)?.label : undefined;
  return [p.grid ? `Grid ${p.grid}` : null, reg].filter(Boolean).join(' · ');
}
