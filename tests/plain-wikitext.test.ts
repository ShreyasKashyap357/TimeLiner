import { describe, expect, it } from 'vitest';
import { plainWikitext as p } from '../src/domain/wikitext.ts';

describe('plainWikitext', () => {
  it('expands date templates', () => {
    expect(p('{{Start date|2013|9|17|df=y}}')).toBe('September 17, 2013');
    expect(p('{{Film date|2019|4|22|Los Angeles|2019|4|26|United States}}')).toBe('April 22, 2019 (Los Angeles); April 26, 2019 (United States)');
    expect(p('{{Video game release|NA|September 17, 2013|EU|September 18, 2013}}')).toBe('NA: September 17, 2013; EU: September 18, 2013');
  });
  it('strips formatting, links and footnotes but keeps the words', () => {
    expect(p("'''PS4''' on [[Xbox One|XB1]]<ref>x</ref>")).toBe('PS4 on XB1');
    expect(p('{{Nobold|17 September 2013}}')).toBe('17 September 2013');
    expect(p('carries a {{Dispute}} banner')).toBe('carries a dispute banner');
    expect(p('plain text stays')).toBe('plain text stays');
  });
});
