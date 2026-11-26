import { describe, expect, it } from 'vitest';
import { cleanText, findTemplates, parseDateTemplate } from '../scripts/build/wikitext.ts';
import { extractFilmOverview, extractSeriesOverview, extractTimelineRows } from '../scripts/build/extract.ts';

describe('wikitext helpers', () => {
  it('parses Start date templates into partial ISO', () => {
    expect(parseDateTemplate('{{Start date|2023|6|21}}')).toBe('2023-06-21');
    expect(parseDateTemplate('{{Start date|2028|10|}}')).toBe('2028-10');
    expect(parseDateTemplate('{{Start date|2028}}')).toBe('2028');
    expect(parseDateTemplate('TBA')).toBeNull();
  });
  it('cleans links, abbr and efn', () => {
    expect(cleanText("[[Daredevil: Born Again season 1|''Born Again'' season 1]] {{abbr|ep.|episode}} 1{{efn|note}}")).toBe('Born Again season 1 ep. 1');
  });
  it('handles nested templates when splitting params', () => {
    const [t] = findTemplates('{{Row|year=2016|a {{efn|x|y}}|b}}', /^Row$/);
    expect(t!.params['1']).toBe('a {{efn|x|y}}');
    expect(t!.params['2']).toBe('b');
  });
  it('extracts Film overview rows', () => {
    const rows = extractFilmOverview('{{Film overview\n| title1 = [[Thor (film)|Thor]]\n| date1 = {{Start date|2011|5|6}}\n}}', 'p');
    expect(rows).toEqual([expect.objectContaining({ title: 'Thor', link: 'Thor (film)', start: '2011-05-06' })]);
  });
  it('extracts Series overview seasons by index', () => {
    const rows = extractSeriesOverview("{{Series overview\n| series = ''[[Loki (TV series)|Loki]]''\n| episodes2 = 6\n| start2 = {{Start date|2023|10|5}}\n| end2 = {{End date|2023|11|9}}\n}}", 'p');
    expect(rows[0]).toMatchObject({ season: 2, episodes: 6, start: '2023-10-05', end: '2023-11-09', link: 'Loki (TV series)' });
  });
  it('extracts timeline rows with multiverse flags', () => {
    const rows = extractTimelineRows("{{T/row|year=1964|''[[The Fantastic Four: First Steps]]''{{efn|Earth-828.}} |1_multiverse=y}}", /^T\/row$/);
    expect(rows[0]!.items[0]).toMatchObject({ text: 'The Fantastic Four: First Steps', multiverse: true, footnote: 'Earth-828.' });
  });
});
