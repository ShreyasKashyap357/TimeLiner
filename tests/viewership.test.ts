import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { overview, parseMillions, seasonsOfPage, viewersHeader } from '../scripts/build/viewership.ts';
import { TitlesFile, UniversesFile, Unit } from '../src/domain/schema.ts';

const SEASON_PAGE = `
== Episodes ==
{{Episode table |background=#000 |overall=5 |season=5 |title=20 |airdate=12 |viewers=9 |country=U.S. |episodes=
{{Episode list/sublist|Show season 1
| EpisodeNumber = 1
| EpisodeNumber2 = 1
| Title = [[Pilot (Show)|Pilot]]
| OriginalAirDate = {{Start date|2012|10|10}}
| Viewers = 4.14<ref name="a">{{cite web |url=http://example.com |title=x|y}}</ref>
}}
{{Episode list/sublist|Show season 1
| EpisodeNumber = 2
| EpisodeNumber2 = 2
| Title = Second{{efn|A note.}}
| OriginalAirDate = {{Start date|2012|10|17}}
| Viewers = {{abbr|N/A|Not available}}
}}
{{Episode list/sublist|Show season 1
| NumParts = 2
| EpisodeNumber2_1 = 3
| EpisodeNumber2_2 = 4
| Title = Finale
| OriginalAirDate = {{Start date|2012|10|24}}
| Viewers = TBD
}}
}}
== Specials ==
{{Episode table |overall=5 |title=20 |viewers=9 |country=U.S. |episodes=
{{Episode list | EpisodeNumber = 1 | Title = Special | Viewers = 1.0 }}
}}`;

const CLASSIC = `== Serials ==
<onlyinclude>{{#invoke:Episode table|main |season=5 |title=15 |aux1=16 |viewers=10 |country=UK |dontclose=y}}
{{#invoke:Episode list|sublist |Show season 1
| Serial = yes
| NumParts = 2
| EpisodeNumber2 = 1
| RTitle = ''[[Story]]''
| Aux1_1 = "Part A"
| Aux1_2 = [Part B]<noinclude>{{refn|group=N|</noinclude><includeonly>{{efn|</includeonly>No on-screen title.}}
| OriginalAirDate_1 = {{Start date|1963|11|23|df=y}}
| OriginalAirDate_2 = {{Start date|1963|11|30|df=y}}
| Viewers_1 = 4.4
| Viewers_2 = 5.9
}}
{{#invoke:Episode table|end}}</onlyinclude>`;

describe('viewership parser', () => {
  it('builds the column wording the Episode table module prints', () => {
    expect(viewersHeader({ viewers: '9', country: 'U.S.' })).toBe('U.S. viewers (millions)');
    expect(viewersHeader({ viewers: '9' })).toBe('Viewers (millions)');
    expect(viewersHeader({ title: '9' })).toBeNull();
  });
  it('reads plain figures only; N/A and TBD are null, not 0', () => {
    expect(parseMillions('4.14<ref>x</ref>')).toBe(4.14);
    expect(parseMillions('{{abbr|N/A|Not available}}')).toBeNull();
    expect(parseMillions('TBD')).toBeNull();
    expect(parseMillions('')).toBeNull();
  });
  it('parses an episode table, expands multi-part rows and skips Specials sections', () => {
    const seasons = seasonsOfPage(SEASON_PAGE);
    const [table] = seasons.get(0)!.tables;
    expect(seasons.get(0)!.tables).toHaveLength(1);
    expect(table!.measure).toBe('U.S. viewers (millions)');
    expect(table!.country).toBe('U.S.');
    expect(table!.episodes.map((e) => [e.n, e.title, e.date, e.millions])).toEqual([
      [1, 'Pilot', '2012-10-10', 4.14],
      [2, 'Second', '2012-10-17', null],
      [3, 'Finale (part 1)', '2012-10-24', null],
      [4, 'Finale (part 2)', '2012-10-24', null],
    ]);
  });
  it('reads open (dontclose) tables with serial parts as the page renders on its own', () => {
    const [table] = seasonsOfPage(CLASSIC).get(0)!.tables;
    expect(table!.measure).toBe('UK viewers (millions)');
    expect(table!.episodes.map((e) => [e.n, e.title, e.millions])).toEqual([[1, 'Story: Part A', 4.4], [2, 'Story: [Part B]', 5.9]]);
  });
  it('finds season sections, season articles and the stated season average', () => {
    const page = `{{Series overview
| infoA = Rank
| infoB = Average viewers<br />(in millions)
| link1 = Show season 1
| infoB1 = 3.68<ref>x</ref>
| link2 = Show season 2
| infoB2 = {{TBA}}
}}
== Episodes ==
=== Season 1 (2012–13) ===
{{Main|Show season 1{{!}}''Show'' season 1}}
=== Season 2 ===
{{:Show season 2}}`;
    const ov = overview(page);
    expect(ov.averages).toEqual([{ season: 1, value: 3.68, header: 'Average viewers (in millions)' }]);
    expect(ov.links.get(2)).toBe('Show season 2');
    const s = seasonsOfPage(page);
    expect(s.get(1)!.seasonPage).toBe('Show season 1');
    expect(s.get(2)!.seasonPage).toBe('Show season 2');
  });
});

describe('viewership data (data/sources/tv-viewership.json)', () => {
  const cache = JSON.parse(readFileSync('data/sources/tv-viewership.json', 'utf8')) as { units: Record<string, { title_id: string; viewership: unknown }> };
  const units = new Map<string, ReturnType<typeof Unit.parse>>();
  for (const u of UniversesFile.parse(JSON.parse(readFileSync('data/universes.json', 'utf8')))) {
    for (const t of TitlesFile.parse(JSON.parse(readFileSync(`data/${u.data_dir}/titles.json`, 'utf8')))) for (const x of t.units) units.set(x.id, x);
  }
  it('every cached entry is a valid viewership for an existing unit', () => {
    for (const [id, c] of Object.entries(cache.units)) {
      expect(units.has(id), id).toBe(true);
      expect(() => Unit.shape.viewership.parse(c.viewership), id).not.toThrow();
    }
  });
  it('a network season has one figure row per episode', () => {
    const v = Unit.shape.viewership.parse(cache.units['arrow-s1']!.viewership)!;
    expect(v.measure).toBe('U.S. viewers (millions)');
    expect(v.episodes).toHaveLength(units.get('arrow-s1')!.episode_count!);
    expect(v.episodes.every((e) => e.millions !== null)).toBe(true);
    expect(v.season_average_kind).toBe('stated');
  });
  it('episode rows match the recorded episode count wherever both exist', () => {
    for (const [id, c] of Object.entries(cache.units)) {
      const v = Unit.shape.viewership.parse(c.viewership)!;
      const n = units.get(id)?.episode_count;
      if (n && v.episodes.length) expect(v.episodes.length, id).toBe(n);
      if (v.season_average_kind === 'computed') expect(v.note, id).toMatch(/mean of/);
    }
  });
  it('after the migration, titles carry exactly the cached figures', () => {
    for (const [id, c] of Object.entries(cache.units)) {
      const u = units.get(id);
      if (u?.viewership) expect(u.viewership, id).toEqual(Unit.shape.viewership.parse(c.viewership));
    }
  });
});
