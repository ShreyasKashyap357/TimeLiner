import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { datesIn, parseReleased, platformsOf } from '../scripts/fetch/game-releases-parse.ts';
import { TitlesFile } from '../src/domain/schema.ts';

const URL = 'https://en.wikipedia.org/w/index.php?title=X&oldid=1';

describe('game release parser (R-52)', () => {
  it('maps platform headers and abbreviations', () => {
    expect(platformsOf('PS4, Windows & Xbox One').ids).toEqual(['playstation-4', 'windows', 'xbox-one']);
    expect(platformsOf('Xbox Series X/S').ids).toEqual(['xbox-series']);
    expect(platformsOf('Remastered').ids).toEqual([]);
  });
  it('reads US, UK and partial dates', () => {
    expect(datesIn('November 13, 2007')).toEqual(['2007-11-13']);
    expect(datesIn('17 September 2013')).toEqual(['2013-09-17']);
    expect(datesIn('November 1999')).toEqual(['1999-11']);
    expect(datesIn('TBA')).toEqual([]);
  });
  it('attributes dates to the header above them and keeps the earliest region', () => {
    const r = parseReleased("'''PlayStation 3''', '''Xbox 360'''{{Video game release|EU|November 16, 2007|NA|November 13, 2007}}'''Microsoft Windows'''{{Video game release|NA|April 8, 2008}}", null, URL);
    expect(r.releases).toEqual([
      { platform: 'playstation-3', date: '2007-11-13', region: 'NA', source_url: URL },
      { platform: 'xbox-360', date: '2007-11-13', region: 'NA', source_url: URL },
      { platform: 'windows', date: '2008-04-08', region: 'NA', source_url: URL },
    ]);
  });
  it('does not guess: a headerless date with several listed platforms is not recorded', () => {
    const r = parseReleased('December 8, 2021', '{{ubl|[[Windows]]|[[Xbox One]]}}', URL);
    expect(r.releases).toEqual([]);
    expect(r.problems.join()).toMatch(/not under a platform header/);
  });
  it('uses the single listed platform for a headerless date', () => {
    expect(parseReleased('September 14, 2010', '[[Xbox 360]]', URL).releases).toEqual([{ platform: 'xbox-360', date: '2010-09-14', region: null, source_url: URL }]);
  });
  it('drops edition dates when an earlier release is unattributed', () => {
    const r = parseReleased("{{Video game release|WW|17 May 2011}}'''''Enhanced Edition'''''{{ubl|'''Windows'''{{Video game release|WW|17 April 2012}}}}", '{{ubl|[[Windows]]|[[Xbox 360]]}}', URL);
    expect(r.releases).toEqual([]);
  });
});

describe('cached game releases', () => {
  const cache = JSON.parse(readFileSync('data/sources/game-releases.json', 'utf8'));
  it('GTA V has every generation, PS3 first on 2013-09-17', () => {
    const gta = cache['gta-v'];
    expect(gta.revid).toBeGreaterThan(0);
    expect(gta.releases.length).toBeGreaterThanOrEqual(4);
    expect(gta.releases).toContainEqual(expect.objectContaining({ platform: 'playstation-3', date: '2013-09-17' }));
    expect(gta.releases).toContainEqual(expect.objectContaining({ platform: 'windows', date: '2015-04-14' }));
    expect(gta.releases).toContainEqual(expect.objectContaining({ platform: 'playstation-5', date: '2022-03-15' }));
  });
});

// Needs scripts/migrations/2026-11-27-game-platform-releases.ts to have been applied to data/.
describe('game platform releases in titles', () => {
  const titles = TitlesFile.parse(JSON.parse(readFileSync('data/grand-theft-auto/titles.json', 'utf8')));
  it('GTA V unit carries per-platform dates, cited in its sources', () => {
    const unit = titles.find((t) => t.id === 'gta-v')!.units[0]!;
    const pr = unit.platform_releases ?? [];
    expect(pr.length).toBeGreaterThanOrEqual(4);
    expect(pr).toContainEqual(expect.objectContaining({ platform: 'playstation-3', date: '2013-09-17' }));
    for (const r of pr) expect(unit.source_urls).toContain(r.source_url);
  });
});
