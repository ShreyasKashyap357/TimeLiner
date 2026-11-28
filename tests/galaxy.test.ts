import { describe, expect, it } from 'vitest';
import { WorldMap } from '../src/domain/schema.ts';
import { CELL, galaxyGeometry, galaxyPositions, galaxySvg } from '../src/domain/galaxy.ts';

const credit = { title: 'Test data', author: 'Test', licence: 'CC0', licence_url: 'https://example.org/l', source_url: 'https://example.org/s', modified: false, fan_made: false };
const place = (id: string, extra: object) => ({ id, name: id, title_ids: [], note: 'n', source_url: 'https://example.org/p', confidence: 'inferred', ...extra });

describe('galaxy maps', () => {
  it('puts grid places in their square, spreading places that share one', () => {
    const m = WorldMap.parse({ id: 'g', universe: 'u', title: 'G', kind: 'galaxy', credit, galaxy: { grid: { cols: ['A', 'B', 'C'], rows: 3 }, note: 'grid' },
      places: [place('one', { grid: 'B-2' }), place('two', { grid: 'C-3' }), place('three', { grid: 'C-3' })] });
    const pos = galaxyPositions(m);
    expect(pos.get('one')).toEqual({ x: 1.5 * CELL, y: 1.5 * CELL });
    const a = pos.get('two')!, b = pos.get('three')!;
    for (const p of [a, b]) { expect(p.x).toBeGreaterThan(2 * CELL); expect(p.y).toBeGreaterThan(2 * CELL); }
    expect(a).not.toEqual(b);
    expect(galaxyGeometry(m)).toMatchObject({ w: 3 * CELL, h: 3 * CELL });
    expect(galaxySvg(m)).toContain('>B<');
  });

  it('puts region-only places on their ring', () => {
    const m = WorldMap.parse({ id: 'g', universe: 'u', title: 'G', kind: 'galaxy', credit,
      galaxy: { regions: [{ id: 'core', label: 'Core', r: 0.2 }, { id: 'edge', label: 'Edge', r: 1 }], note: 'rings' },
      places: [place('centre', { region: 'core' }), place('far1', { region: 'edge' }), place('far2', { region: 'edge' })] });
    const geo = galaxyGeometry(m), pos = galaxyPositions(m);
    expect(pos.get('centre')).toEqual({ x: geo.cx, y: geo.cy });
    for (const id of ['far1', 'far2']) {
      const p = pos.get(id)!;
      expect(Math.hypot(p.x - geo.cx, p.y - geo.cy)).toBeCloseTo(0.6 * geo.radius, 5);
    }
  });

  it('rejects a galaxy place without a grid square or region, and a galaxy map without a layout', () => {
    expect(() => WorldMap.parse({ id: 'g', universe: 'u', title: 'G', kind: 'galaxy', credit, galaxy: { note: 'x' } })).toThrow();
    expect(() => WorldMap.parse({ id: 'g', universe: 'u', title: 'G', kind: 'galaxy', credit, galaxy: { regions: [{ id: 'a', label: 'A', r: 1 }], note: 'x' },
      places: [place('p', {})] })).toThrow();
  });
});
