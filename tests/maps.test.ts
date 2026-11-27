import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { loadDataset } from '../scripts/verify-data.ts';
import { checkIntegrity, type Dataset, type Issue } from '../src/domain/integrity.ts';
import { MapsFile, WorldMap } from '../src/domain/schema.ts';
import { locationsToMap, STORY_MAP_ID } from '../scripts/build/apply-locations.ts';
import { parsePoint } from '../scripts/fetch/narrative-locations.ts';

const TODAY = '2026-11-26';
async function fresh(): Promise<Dataset> {
  const issues: Issue[] = [];
  const ds = await loadDataset(issues);
  expect(issues).toEqual([]);
  return structuredClone(ds!);
}
const codes = (ds: Dataset) => checkIntegrity(ds, TODAY).filter((i) => i.level === 'error').map((i) => i.code);

describe('maps data', () => {
  it('loads maps for image and osm universes, with images on disk and full credits', async () => {
    const ds = await fresh();
    const maps = ds.maps ?? [];
    expect(maps.some((m) => m.kind === 'image')).toBe(true);
    expect(maps.some((m) => m.kind === 'osm')).toBe(true);
    for (const m of maps) {
      if (m.image) expect(existsSync(`public/${m.image.path}`)).toBe(true);
      for (const k of ['title', 'author', 'licence', 'licence_url', 'source_url'] as const) expect(m.credit[k].trim()).not.toBe('');
    }
    expect(codes(ds)).toEqual([]);
  });

  it('rejects places linked to unknown or other-universe titles', async () => {
    const ds = await fresh();
    const m = ds.maps!.find((x) => x.kind === 'image' && x.places.length)!;
    m.places[0]!.title_ids = ['no-such-title'];
    expect(codes(ds)).toContain('ref-place-title');
    const other = ds.titles.find((t) => t.universe !== m.universe)!;
    m.places[0]!.title_ids = [other.id];
    expect(codes(ds)).toContain('ref-place-title');
  });

  it('rejects places outside the image, of the wrong kind, or inferred without a note', async () => {
    const ds = await fresh();
    const m = ds.maps!.find((x) => x.kind === 'image' && x.places.length)!;
    m.places[0]!.x = m.image!.width + 10;
    expect(codes(ds)).toContain('place-outside');
    const osm = ds.maps!.find((x) => x.kind === 'osm')!;
    osm.places[0] = { ...osm.places[0]!, lat: undefined, lng: undefined, x: 1, y: 1 };
    expect(codes(ds)).toContain('place-coords');
    m.places[1]!.note = '';
    expect(codes(ds)).toContain('place-note');
  });

  it('schema requires licence fields and the right coordinates', () => {
    const base = {
      id: 'm', universe: 'u', title: 'Map', kind: 'osm', continuity: null,
      credit: { title: 'x', author: 'a', licence: 'CC0', licence_url: 'https://example.org/l', source_url: 'https://example.org/s', modified: false, fan_made: false },
      places: [{ id: 'p', name: 'P', lat: 1, lng: 2, source_url: 'https://example.org/p', confidence: 'stated' }],
    };
    expect(WorldMap.safeParse(base).success).toBe(true);
    expect(WorldMap.safeParse({ ...base, credit: { ...base.credit, licence: ' ' } }).success).toBe(false);
    expect(WorldMap.safeParse({ ...base, places: [{ ...base.places[0], lat: undefined, lng: undefined }] }).success).toBe(false);
    expect(WorldMap.safeParse({ ...base, kind: 'image' }).success).toBe(false); // image map without an image
    expect(MapsFile.safeParse([base]).success).toBe(true);
  });
});

describe('narrative locations transform', () => {
  it('parses Wikidata WKT points and ignores other globes', () => {
    expect(parsePoint('Point(-0.1275 51.507222222)')).toEqual({ lng: -0.1275, lat: 51.507222222 });
    expect(parsePoint('<http://www.wikidata.org/entity/Q405> Point(1 2)')).toBeNull();
    expect(parsePoint(undefined)).toBeNull();
  });

  it('groups rows into one place per location, skipping unlocated or unlabelled ones', () => {
    const titles = [{ id: 'a', external_ids: { wikidata: 'Q1' } }, { id: 'b', external_ids: { wikidata: 'Q2' } }, { id: 'c', external_ids: { wikidata: null } }];
    const map = locationsToMap({
      universe: 'u', fetched: '2026-11-28', query_property: 'P840', rows: [
        { title_qid: 'Q2', location_qid: 'Q84', label: 'London', lat: 51.5, lng: -0.12 },
        { title_qid: 'Q1', location_qid: 'Q84', label: 'London', lat: 51.5, lng: -0.12 },
        { title_qid: 'Q1', location_qid: 'Q90', label: 'Paris', lat: 48.85, lng: 2.35 },
        { title_qid: 'Q1', location_qid: 'Q999', label: 'Hogsmeade', lat: null, lng: null },
        { title_qid: 'Q1', location_qid: 'Q1234', label: 'Q1234', lat: 1, lng: 1 },
        { title_qid: 'Q77', location_qid: 'Q60', label: 'New York City', lat: 40.7, lng: -74 },
      ],
    }, titles)!;
    expect(map.id).toBe(STORY_MAP_ID);
    expect(map.kind).toBe('osm');
    expect(map.places.map((p) => p.name)).toEqual(['London', 'Paris']);
    expect(map.places[0]).toMatchObject({ id: 'london-q84', title_ids: ['a', 'b'], confidence: 'stated', source_url: 'https://www.wikidata.org/wiki/Q84' });
    expect(WorldMap.safeParse(map).success).toBe(true);
  });

  it('returns null when nothing can be placed', () => {
    expect(locationsToMap({ universe: 'u', fetched: 'x', query_property: 'P840', rows: [] }, [])).toBeNull();
  });
});
