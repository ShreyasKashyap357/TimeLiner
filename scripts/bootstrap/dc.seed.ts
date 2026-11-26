// Hand-curated DC seed. Units are listed in STORY ORDER within each continuity (order_index follows
// seed order). In-universe values cite their source (`src`, a Wikipedia title, or "arrowfandom:Page"
// / "dcfandom:Page" for Fandom). Release dates are pulled from cached sources by scripts/bootstrap/dc.ts.
import type { CanonTier, TitleType } from '../../src/domain/schema.ts';

type Conf = 'stated' | 'inferred' | 'disputed';
type Prec = 'exact' | 'year' | 'approx' | 'range' | 'relative';
export interface DcIU { y?: number; m?: number; y2?: number; label: string; precision: Prec; confidence: Conf; note: string; src: string[] }
export interface DcUnit { key: string; label: string; season?: number; relTitle?: string; episodes?: number; branch?: string; tier?: CanonTier; platform?: string; iu: DcIU; grp?: Record<string, string>; rel?: { date: string | null; end?: string | null; note?: string; src: string }; notes?: string }
export interface DcTitle { id: string; title: string; type: TitleType; wiki: string; continuity: string; studio: string; label?: string; platform: string; tier?: CanonTier; chars?: string[]; teams?: string[]; units: DcUnit[]; links?: { to: string; kind: string; note?: string }[]; notes?: string; constituents?: string[]; extra_sources?: string[] }

const R = (label: string, note: string, src: string[], confidence: Conf = 'inferred'): DcIU => ({ label, precision: 'relative', confidence, note, src });
const Y = (y: number, label: string, confidence: Conf, note: string, src: string[], y2?: number, precision?: Prec): DcIU => ({ y, y2, label, confidence, note, src, precision: precision ?? (y2 && y2 !== y ? 'range' : 'year') });
const UNRELEASED = (note: string, src: string[]) => R('Not yet placed (unreleased)', note, src, 'disputed');
const film = (o: Omit<DcTitle, 'type' | 'units' | 'platform'> & { iu: DcIU; grp?: Record<string, string>; platform?: string; unitBranch?: string; relTitle?: string }): DcTitle => ({
  type: 'film', platform: o.platform ?? 'theatrical', ...o, units: [{ key: '', label: 'Film', iu: o.iu, grp: o.grp, branch: o.unitBranch, relTitle: o.relTitle }],
});
const DCEU = 'DC Extended Universe', DCU = 'DC Universe (franchise)';
const CH1 = { chapter: 'chapter-1' };

// ================================================================ DCU (story order per DCU "Timeline and continuity")
export const DCU_TITLES: DcTitle[] = [
  { id: 'lanterns', title: 'Lanterns', type: 'series', wiki: 'Lanterns (TV series)', continuity: 'dcu', studio: 'dc-studios', platform: 'hbo', chars: ['green-lantern'], units: [
    { key: 's1', label: 'Season 1', season: 1, grp: CH1, iu: Y(2016, '2016 and 2026', 'stated', 'Two storylines: "the first, set in 2016 … and the second, involving Jordan\'s own murder, takes place in 2026." Placed at its earliest storyline.', ['Lanterns (TV series)'], 2026) }] },
  film({ id: 'clayface', title: 'Clayface', wiki: 'Clayface (film)', continuity: 'dcu', studio: 'dc-studios', chars: ['clayface'], grp: CH1,
    iu: R('Before Creature Commandos', '"Clayface (2026) is the first DCU film not to be set in the chronological order of its release, taking place before the events of Creature Commandos and the first DCU film, Superman."', [DCU], 'stated') }),
  { id: 'creature-commandos', title: 'Creature Commandos', type: 'animated-series', wiki: 'Creature Commandos (TV series)', continuity: 'dcu', studio: 'dc-studios', platform: 'max', chars: ['amanda-waller'], teams: ['creature-commandos'], units: [
    { key: 's1', label: 'Season 1', season: 1, grp: CH1, iu: Y(2024, '2024', 'inferred', '"After the events of the first season of Peacemaker (2022), Amanda Waller assembles…"; Superman "takes place after the events of Creature Commandos\'s first season". Year from the article category "Television series set in 2024".', ['Creature Commandos (TV series)', DCU]) }] },
  film({ id: 'superman-2025', title: 'Superman', wiki: 'Superman (2025 film)', continuity: 'dcu', studio: 'dc-studios', chars: ['superman', 'lois-lane', 'lex-luthor'], teams: ['superman-franchise'], grp: CH1,
    iu: Y(2025, 'Mid-2025', 'stated', '"Kal-El / Clark Kent emerged as Superman three years before the film\'s events, which occur in mid-2025".', [DCU], undefined, 'approx') }),
  { id: 'peacemaker-dcu', title: 'Peacemaker', type: 'series', wiki: 'Peacemaker (TV series)', continuity: 'dcu', studio: 'dc-studios', platform: 'max', chars: ['peacemaker'],
    notes: 'Season 1 is a DCEU title (peacemaker-dceu). DCU: "The majority of Peacemaker\'s first season is canon to the DCU, except for the cameo appearance of the DCEU Justice League."',
    links: [{ to: 'peacemaker-dceu', kind: 'continues', note: 'Season 2 continues the DCEU season 1, with retcons' }, { to: 'superman-2025', kind: 'sequel', note: 'Set a month after Superman' }],
    units: [{ key: 's2', label: 'Season 2', season: 2, grp: CH1, iu: Y(2025, 'Mid-2025', 'stated', '"Peacemaker season 2 is set a month after Superman". The gap to season 1 is disputed: "an unspecified amount of a couple of years" vs. Total Film\'s "six months".', [DCU], undefined, 'approx') }] },
  film({ id: 'supergirl-2026', title: 'Supergirl', wiki: 'Supergirl (2026 film)', continuity: 'dcu', studio: 'dc-studios', chars: ['supergirl'], teams: ['superman-franchise'], grp: CH1,
    iu: R('Between Superman and Man of Tomorrow', '"Supergirl (2026) takes place in between Superman and Man of Tomorrow".', [DCU], 'stated') }),
  film({ id: 'man-of-tomorrow', title: 'Man of Tomorrow', wiki: 'Man of Tomorrow (film)', continuity: 'dcu', studio: 'dc-studios', chars: ['superman', 'lex-luthor'], teams: ['superman-franchise'], grp: CH1,
    iu: UNRELEASED('Reported as set "in \'real time\' after Superman, roughly occurring in mid-2027" (Man of Tomorrow article). Not placed until release.', ['Man of Tomorrow (film)']) }),
  { id: 'the-people-v-gorilla-grodd', title: 'The People v. Gorilla Grodd', type: 'series', wiki: 'The People v. Gorilla Grodd', continuity: 'dcu', studio: 'dc-studios', platform: 'max',
    notes: '"an upcoming American mockumentary crime comedy superhero television series … for HBO Max".',
    units: [{ key: 's1', label: 'Season 1', season: 1, grp: CH1, iu: UNRELEASED('Listed in the Chapter One slate for 2027; no placement published.', [DCU]) }] },
];

// ================================================================ DCEU (story order per DCEU#Timeline)
const S = (s: string) => [s, DCEU];
export const DCEU_TITLES: DcTitle[] = [
  film({ id: 'wonder-woman-2017', title: 'Wonder Woman', wiki: 'Wonder Woman (2017 film)', continuity: 'dceu', studio: 'warner-bros-pictures', chars: ['wonder-woman'], teams: ['justice-league'],
    iu: Y(1918, '1918', 'stated', '"In 1918, an adult Diana rescues US pilot Steve Trevor…"; DCEU#Timeline: it "also has bookend scenes set in the present after the events of Batman v Superman".', S('Wonder Woman (2017 film)')) }),
  film({ id: 'wonder-woman-1984', title: 'Wonder Woman 1984', wiki: 'Wonder Woman 1984', continuity: 'dceu', studio: 'warner-bros-pictures', chars: ['wonder-woman'], teams: ['justice-league'],
    iu: Y(1984, '1984', 'stated', '"In 1984, over sixty years after her battle with Ares during World War I…"', ['Wonder Woman 1984']) }),
  film({ id: 'man-of-steel', title: 'Man of Steel', wiki: 'Man of Steel (film)', continuity: 'dceu', studio: 'warner-bros-pictures', chars: ['superman', 'lois-lane'], teams: ['superman-franchise'],
    iu: Y(2013, '2013', 'inferred', 'DCEU#Timeline: it "takes place after the events of Wonder Woman and Wonder Woman 1984". Year from the article category "Films set in 2013"; the DCEU page notes the films "rarely explicitly make their exact years known".', S('Man of Steel (film)')) }),
  film({ id: 'batman-v-superman', title: 'Batman v Superman: Dawn of Justice', wiki: 'Batman v Superman: Dawn of Justice', continuity: 'dceu', studio: 'warner-bros-pictures', chars: ['batman', 'superman', 'wonder-woman', 'lex-luthor'], teams: ['justice-league'],
    iu: Y(2015, '2015', 'inferred', '"In the present, eighteen months after his cataclysmic battle with General Zod in Metropolis…"; year from the category "Films set in 2015".', ['Batman v Superman: Dawn of Justice']) }),
  film({ id: 'suicide-squad-2016', title: 'Suicide Squad', wiki: 'Suicide Squad (2016 film)', continuity: 'dceu', studio: 'warner-bros-pictures', chars: ['harley-quinn', 'joker', 'amanda-waller'], teams: ['suicide-squad'],
    iu: Y(2016, 'c. 2016', 'inferred', 'DCEU#Timeline: Superman\'s death "is emphasized in Suicide Squad and Justice League, taking place approximately one and two years later, respectively."', S('Suicide Squad (2016 film)'), undefined, 'approx') }),
  film({ id: 'justice-league-2017', title: 'Justice League', wiki: 'Justice League (film)', continuity: 'dceu', studio: 'warner-bros-pictures', chars: ['batman', 'superman', 'wonder-woman', 'flash', 'aquaman', 'cyborg'], teams: ['justice-league'],
    iu: Y(2017, 'c. 2017', 'inferred', 'About two years after Batman v Superman (DCEU#Timeline); category "Films set in 2017".', S('Justice League (film)'), undefined, 'approx') }),
  film({ id: 'zack-snyders-justice-league', title: "Zack Snyder's Justice League", wiki: "Zack Snyder's Justice League", continuity: 'dceu', studio: 'warner-bros-pictures', platform: 'max', unitBranch: 'snyder-cut', chars: ['batman', 'superman', 'wonder-woman', 'flash', 'aquaman', 'cyborg'], teams: ['justice-league'],
    links: [{ to: 'justice-league-2017', kind: 'remake', note: "Director's cut of the 2017 film" }],
    iu: Y(2017, 'c. 2017', 'disputed', 'DCEU page: Snyder said it "takes place in a slightly alternate universe" and is not meant to affect the DCEU; Momoa said Aquaman "takes place after Snyder\'s version, rather than Whedon\'s."', [DCEU, "Zack Snyder's Justice League"], undefined, 'approx') }),
  film({ id: 'aquaman-2018', title: 'Aquaman', wiki: 'Aquaman (film)', continuity: 'dceu', studio: 'warner-bros-pictures', chars: ['aquaman'], teams: ['justice-league'],
    iu: Y(2018, '2018', 'disputed', 'DCEU#Timeline: Momoa "confirmed that Aquaman takes place right after Zack Snyder\'s Justice League", but the plot says "One year after Steppenwolf\'s defeat". Category 2018.', S('Aquaman (film)')) }),
  film({ id: 'shazam', title: 'Shazam!', wiki: 'Shazam! (film)', continuity: 'dceu', studio: 'warner-bros-pictures', chars: ['shazam'],
    iu: Y(2018, 'Christmas 2018', 'stated', 'DCEU#Timeline: "Aquaman is followed by Shazam!, which occurs during the Christmas season of 2018."', [DCEU], undefined, 'approx') }),
  film({ id: 'birds-of-prey', title: 'Birds of Prey', wiki: 'Birds of Prey (2020 film)', continuity: 'dceu', studio: 'warner-bros-pictures', chars: ['harley-quinn'],
    iu: Y(2020, '2020', 'stated', 'DCEU#Timeline: "The events of Birds of Prey are set in 2020." Plot: "4 years after the defeat of the Enchantress".', S('Birds of Prey (2020 film)')) }),
  film({ id: 'the-suicide-squad', title: 'The Suicide Squad', wiki: 'The Suicide Squad (film)', continuity: 'dceu', studio: 'warner-bros-pictures', chars: ['harley-quinn', 'peacemaker', 'amanda-waller'], teams: ['suicide-squad'],
    notes: 'DCU status: Gunn said in October 2026 "the majority of The Suicide Squad was canon to the DCU", and that its DCU version "would need to occur around 2023 or 2024".',
    iu: Y(2021, '2021', 'stated', 'DCEU#Timeline: "The Suicide Squad is confirmed to take place in 2021."', [DCEU, DCU]) }),
  { id: 'peacemaker-dceu', title: 'Peacemaker', type: 'series', wiki: 'Peacemaker (TV series)', continuity: 'dceu', studio: 'warner-bros-television', platform: 'max', chars: ['peacemaker', 'amanda-waller'],
    notes: 'Season 2 is a DCU title (peacemaker-dcu); "a \'rough memory\'" of season 1 remains in the DCU.',
    links: [{ to: 'the-suicide-squad', kind: 'spinoff' }],
    units: [{ key: 's1', label: 'Season 1', season: 1, iu: Y(2021, '2021–2022', 'inferred', 'Peacemaker season 1: "Five months after his mission with the Suicide Squad in Corto Maltese…" (The Suicide Squad: 2021).', ['Peacemaker season 1', DCEU], 2022) }] },
  film({ id: 'black-adam', title: 'Black Adam', wiki: 'Black Adam (film)', continuity: 'dceu', studio: 'warner-bros-pictures', chars: ['black-adam'], teams: ['justice-society'],
    iu: Y(2021, '2021', 'inferred', 'DCEU#Timeline: "it can be inferred that the events of Black Adam happen shortly after Peacemaker". Category 2021.', S('Black Adam (film)')) }),
  film({ id: 'shazam-fury-of-the-gods', title: 'Shazam! Fury of the Gods', wiki: 'Shazam! Fury of the Gods', continuity: 'dceu', studio: 'warner-bros-pictures', chars: ['shazam'],
    links: [{ to: 'shazam', kind: 'sequel' }],
    iu: Y(2022, '2022', 'disputed', 'Plot: "Four years after Thaddeus Sivana\'s defeat…" vs DCEU#Timeline: "set about two years after its predecessor, but at least in 2021". Category 2022.', S('Shazam! Fury of the Gods')) }),
  film({ id: 'aquaman-and-the-lost-kingdom', title: 'Aquaman and the Lost Kingdom', wiki: 'Aquaman and the Lost Kingdom', continuity: 'dceu', studio: 'warner-bros-pictures', chars: ['aquaman'],
    links: [{ to: 'aquaman-2018', kind: 'sequel' }],
    iu: Y(2022, '2022', 'inferred', '"Four years after becoming king of Atlantis…" (Aquaman: 2018). Category 2022.', ['Aquaman and the Lost Kingdom']) }),
  film({ id: 'the-flash-2023', title: 'The Flash', wiki: 'The Flash (film)', continuity: 'dceu', studio: 'warner-bros-pictures', chars: ['flash', 'batman', 'supergirl'], teams: ['justice-league'],
    links: [{ to: 'batman-1989', kind: 'crossover', note: "Michael Keaton's Batman appears in an alternate timeline" }],
    iu: Y(2023, '2023 (and 2013, alternate timeline)', 'disputed', 'DCEU#Timeline: "The Flash is set in 2023 and 2013 of an alternative timeline where Michael Keaton is Batman"; the film article\'s categories say 2004, 2013 and 2022.', S('The Flash (film)')) }),
  film({ id: 'blue-beetle', title: 'Blue Beetle', wiki: 'Blue Beetle (film)', continuity: 'dceu', studio: 'warner-bros-pictures', chars: ['blue-beetle'],
    notes: 'DCU: the character is canon; Gunn "would not confirm whether the film itself was".',
    iu: R('Last in the DCEU', 'DCEU#Timeline: "Blue Beetle is the final film in the DCEU timeline, but Xolo Maridueña will reprise his role in the DCU." No year given.', [DCEU], 'stated') }),
];

// ================================================================ Reeves / Nolan / Burton-Schumacher / Joker / Superman
export const BATMAN_ETC: DcTitle[] = [
  film({ id: 'the-batman', title: 'The Batman', wiki: 'The Batman (film)', continuity: 'batman-epic-crime-saga', studio: 'warner-bros-pictures', chars: ['batman', 'penguin', 'catwoman', 'james-gordon'], teams: ['batman-franchise'],
    iu: Y(2022, 'Halloween 2022', 'inferred', '"The film follows Batman, in his second year fighting crime"; "On Halloween…". Year from the category "Films set in 2022".', ['The Batman (film)'], undefined, 'approx') }),
  { id: 'the-penguin', title: 'The Penguin', type: 'series', wiki: 'The Penguin (TV series)', continuity: 'batman-epic-crime-saga', studio: 'warner-bros-television', platform: 'hbo', chars: ['penguin'], teams: ['batman-franchise'],
    links: [{ to: 'the-batman', kind: 'spinoff' }],
    units: [{ key: 's1', label: 'Miniseries', season: 1, iu: Y(2022, 'November 2022', 'stated', '"In November 2022, one week after the assassination of Carmine Falcone…"; "The series begins one week after the events of The Batman".', ['The Penguin (TV series)'], undefined, 'approx') }] },
  film({ id: 'the-batman-part-ii', title: 'The Batman: Part II', wiki: 'The Batman: Part II', continuity: 'batman-epic-crime-saga', studio: 'warner-bros-pictures', chars: ['batman'], teams: ['batman-franchise'],
    links: [{ to: 'the-batman', kind: 'sequel' }],
    iu: UNRELEASED('"Part II occurs a few weeks after The Penguin." Not placed until release.', ['The Batman: Part II']) }),
  film({ id: 'batman-begins', title: 'Batman Begins', wiki: 'Batman Begins', continuity: 'nolan-dark-knight', studio: 'warner-bros-pictures', chars: ['batman', 'james-gordon'], teams: ['batman-franchise'],
    iu: Y(2005, '2005', 'inferred', 'Year from the article category "Films set in 2005" only.', ['Batman Begins']) }),
  film({ id: 'the-dark-knight', title: 'The Dark Knight', wiki: 'The Dark Knight', continuity: 'nolan-dark-knight', studio: 'warner-bros-pictures', chars: ['batman', 'joker', 'james-gordon'], teams: ['batman-franchise'],
    links: [{ to: 'batman-begins', kind: 'sequel' }], iu: Y(2008, '2008', 'inferred', '"the sequel to Batman Begins"; year from the category "Films set in 2008" only.', ['The Dark Knight']) }),
  film({ id: 'the-dark-knight-rises', title: 'The Dark Knight Rises', wiki: 'The Dark Knight Rises', continuity: 'nolan-dark-knight', studio: 'warner-bros-pictures', chars: ['batman', 'catwoman', 'james-gordon'], teams: ['batman-franchise'],
    links: [{ to: 'the-dark-knight', kind: 'sequel' }], iu: Y(2016, '2016–2017', 'inferred', '"Set eight years after the events of The Dark Knight…"; "Five months later…". Categories 2016 and 2017.', ['The Dark Knight Rises'], 2017) }),
  film({ id: 'batman-1989', title: 'Batman', wiki: 'Batman (1989 film)', continuity: 'burton-schumacher', studio: 'warner-bros-pictures', chars: ['batman', 'joker'], teams: ['batman-franchise'],
    iu: R('First film', '"The film takes place early in the war on crime of the title character". No year given.', ['Batman (1989 film)'], 'stated') }),
  film({ id: 'batman-returns', title: 'Batman Returns', wiki: 'Batman Returns', continuity: 'burton-schumacher', studio: 'warner-bros-pictures', chars: ['batman', 'penguin', 'catwoman'], teams: ['batman-franchise'],
    links: [{ to: 'batman-1989', kind: 'sequel' }], iu: R('Sequel', 'Sequel; no year given (only an internal "Thirty-three years later").', ['Batman Returns'], 'stated') }),
  film({ id: 'batman-forever', title: 'Batman Forever', wiki: 'Batman Forever', continuity: 'burton-schumacher', studio: 'warner-bros-pictures', chars: ['batman', 'robin'], teams: ['batman-franchise'],
    links: [{ to: 'batman-returns', kind: 'sequel' }], iu: R('Sequel', '"It is the sequel to Batman Returns"; no year given.', ['Batman Forever'], 'stated') }),
  film({ id: 'batman-and-robin', title: 'Batman & Robin', wiki: 'Batman & Robin (film)', continuity: 'burton-schumacher', studio: 'warner-bros-pictures', chars: ['batman', 'robin'], teams: ['batman-franchise'],
    links: [{ to: 'batman-forever', kind: 'sequel' }], iu: R('Sequel', '"a sequel to Batman Forever (1995)"; no year given.', ['Batman & Robin (film)'], 'stated') }),
  film({ id: 'joker-2019', title: 'Joker', wiki: 'Joker (2019 film)', continuity: 'joker-films', studio: 'warner-bros-pictures', chars: ['joker'],
    iu: Y(1981, '1981', 'stated', '"In 1981, Arthur Fleck is a party clown…"', ['Joker (2019 film)']) }),
  film({ id: 'joker-folie-a-deux', title: 'Joker: Folie à Deux', wiki: 'Joker: Folie à Deux', continuity: 'joker-films', studio: 'warner-bros-pictures', chars: ['joker', 'harley-quinn'],
    links: [{ to: 'joker-2019', kind: 'sequel' }], iu: Y(1983, '1983', 'inferred', '"…awaiting trial for the crimes he committed two years prior." Category 1983.', ['Joker: Folie à Deux']) }),
  // Reeve-era: two branches (I → II → III → Supergirl → IV; I → II → Returns)
  film({ id: 'superman-1978', title: 'Superman', wiki: 'Superman (1978 film)', continuity: 'reeve-superman', studio: 'warner-bros-pictures', chars: ['superman', 'lois-lane', 'lex-luthor'], teams: ['superman-franchise'],
    iu: R('First film', 'No year in text or categories.', ['Superman (1978 film)'], 'stated') }),
  film({ id: 'superman-ii', title: 'Superman II', wiki: 'Superman II', continuity: 'reeve-superman', studio: 'warner-bros-pictures', chars: ['superman', 'lois-lane'], teams: ['superman-franchise'],
    links: [{ to: 'superman-1978', kind: 'sequel' }], iu: R('Sequel', '"a sequel to the 1978 film"; no year given.', ['Superman II'], 'stated') }),
  film({ id: 'superman-iii', title: 'Superman III', wiki: 'Superman III', continuity: 'reeve-superman', studio: 'warner-bros-pictures', chars: ['superman'], teams: ['superman-franchise'],
    links: [{ to: 'superman-ii', kind: 'sequel' }], iu: Y(1983, '1983', 'inferred', 'Category "Films set in 1983" only.', ['Superman III']) }),
  film({ id: 'supergirl-1984', title: 'Supergirl', wiki: 'Supergirl (1984 film)', continuity: 'reeve-superman', studio: 'warner-bros-pictures', chars: ['supergirl'], teams: ['superman-franchise'],
    links: [{ to: 'superman-iii', kind: 'spinoff' }], iu: R('After Superman III', '"is set after the events of Superman III (1983)"; no year given.', ['Supergirl (1984 film)'], 'stated') }),
  film({ id: 'superman-iv', title: 'Superman IV: The Quest for Peace', wiki: 'Superman IV: The Quest for Peace', continuity: 'reeve-superman', studio: 'warner-bros-pictures', chars: ['superman', 'lex-luthor'], teams: ['superman-franchise'],
    links: [{ to: 'superman-iii', kind: 'sequel' }], iu: Y(1987, '1987', 'inferred', 'Category "Films set in 1987" only.', ['Superman IV: The Quest for Peace']) }),
  film({ id: 'superman-returns', title: 'Superman Returns', wiki: 'Superman Returns', continuity: 'reeve-superman', studio: 'warner-bros-pictures', unitBranch: 'returns', chars: ['superman', 'lois-lane', 'lex-luthor'], teams: ['superman-franchise'],
    links: [{ to: 'superman-ii', kind: 'sequel', note: 'Ignores III, Supergirl and IV' }],
    iu: R('Five years after Superman II', '"an homage sequel to Superman (1978) and Superman II (1980), ignoring the events of Superman III, Supergirl, and Superman IV"; "Superman has been missing for five years".', ['Superman Returns'], 'stated') }),
];

// ================================================================ Live-action series (non-Arrowverse)
const seasons = (n: number, iu: (s: number) => DcIU, extra: (s: number) => Partial<DcUnit> = () => ({})): DcUnit[] =>
  Array.from({ length: n }, (_, i) => ({ key: `s${i + 1}`, label: `Season ${i + 1}`, season: i + 1, iu: iu(i + 1), ...extra(i + 1) }));
export const TV_TITLES: DcTitle[] = [
  { id: 'smallville', title: 'Smallville', type: 'series', wiki: 'Smallville', continuity: 'smallville', studio: 'warner-bros-television', platform: 'the-wb', chars: ['superman', 'lois-lane', 'lex-luthor'], teams: ['superman-franchise'],
    units: seasons(10, (s) => s === 1
      ? Y(2001, '2001', 'inferred', '"In October 1989, a meteor shower hits Smallville…"; "Twelve years later, Clark struggles…" (Smallville season 1); DC Database shows the pilot caption "October, 2001".', ['Smallville season 1', 'dcfandom:Smallville Episode: Pilot'])
      : s === 10 ? Y(2011, 'c. 2011', 'inferred', 'The finale has "a flashforward seven years into the future", and Smallville says "the last appearance … had been in 2018 in the series finale".', ['Finale (Smallville)', 'Smallville'], undefined, 'approx')
      : Y(2000 + s, `c. ${2000 + s}`, 'inferred', 'No per-season year in sources; assumed contemporaneous with broadcast, which matches the season 1 (2001) and finale (c. 2011) anchors.', ['Smallville'], undefined, 'approx'),
      (s) => (s >= 6 ? { platform: 'the-cw' } : {})) },
  { id: 'gotham', title: 'Gotham', type: 'series', wiki: 'Gotham (TV series)', continuity: 'gotham', studio: 'warner-bros-television', platform: 'fox', chars: ['james-gordon', 'batman', 'penguin', 'catwoman'], teams: ['batman-franchise'],
    units: seasons(5, (s) => R(`Season ${s}`, s === 5 ? 'No year in Wikipedia. DC Database: the finale jumps "Ten years in the future".' : 'No in-universe year in sources; sequential seasons.', s === 5 ? ['Gotham (TV series)', 'dcfandom:Gotham (TV Series) Episode: The Beginning...'] : ['Gotham (TV series)'])) },
  { id: 'titans', title: 'Titans', type: 'series', wiki: 'Titans (2018 TV series)', continuity: 'titans', studio: 'warner-bros-television', platform: 'dc-universe-streaming', chars: ['robin'], teams: ['teen-titans'],
    links: [{ to: 'doom-patrol', kind: 'shares-characters', note: 'Doom Patrol debuted in Titans but is a separate continuity' }],
    units: seasons(4, (s) => R(`Season ${s}`, s === 2 ? 'Titans season 2: "Three months after Trigon\'s defeat…"; no year given.' : 'No in-universe year in sources; sequential seasons. Crisis on Infinite Earths (Arrowverse) shows Titans on Earth-9.', s === 2 ? ['Titans season 2'] : ['Titans (2018 TV series)']),
      (s) => (s >= 3 ? { platform: 'max' } : {})) },
  { id: 'doom-patrol', title: 'Doom Patrol', type: 'series', wiki: 'Doom Patrol (TV series)', continuity: 'doom-patrol', studio: 'warner-bros-television', platform: 'dc-universe-streaming', teams: ['doom-patrol'],
    notes: 'Wikipedia: "Doom Patrol occupies a separate continuity from Titans." Season 2 premiered on DC Universe and HBO Max at the same time.',
    units: seasons(4, (s) => R(`Season ${s}`, 'No in-universe year in sources; sequential seasons. Crisis on Infinite Earths (Arrowverse) shows Doom Patrol on Earth-21.', ['Doom Patrol (TV series)']),
      (s) => (s >= 3 ? { platform: 'max' } : {})) },
];

// ================================================================ Arrowverse
const AV = 'Arrowverse';
const bc = (y: number, y2?: number, extra = '') => Y(y, y2 && y2 !== y ? `c. ${y}–${y2}` : `c. ${y}`, 'inferred', `No present-day year stated for this season; assumed contemporaneous with broadcast, consistent with the stated anchors (Arrow S1 2012, Flash S5 2018–19, LoT 2016–2020, Flash S8–9 2021–23).${extra}`, [AV], y2, 'approx');
const CW = { studio: 'warner-bros-television', platform: 'the-cw', continuity: 'arrowverse', type: 'series' as const };
export const ARROWVERSE: DcTitle[] = [
  { id: 'arrow', title: 'Arrow', wiki: 'Arrow (TV series)', ...CW, chars: ['green-arrow'], units: [
    { key: 's1', label: 'Season 1', season: 1, branch: 'earth-1', iu: Y(2012, '2012–2013', 'stated', 'Arrow S8 "Fadeout": "In flashbacks to 2012, Oliver and Diggle track and imprison human trafficker John Byrne"; island flashbacks begin in 2007.', ['Arrow season 8', 'Arrow season 1'], 2013) },
    { key: 's2', label: 'Season 2', season: 2, branch: 'earth-1', iu: Y(2013, '2013–2014', 'stated', 'Arrow S8: "A flashback to 2014 depicts Oliver stopping Slade Wilson from killing his mother."', ['Arrow season 8'], 2014) },
    ...[3, 4, 5, 6, 7].map((s) => ({ key: `s${s}`, label: `Season ${s}`, season: s, branch: 'earth-1', iu: bc(2011 + s, 2012 + s) })),
    { key: 's8', label: 'Season 8', season: 8, branch: 'earth-1', iu: Y(2019, '2019–2020 (flash-forwards to 2040)', 'stated', 'E3: "teleported to the bunker in the year 2019"; flash-forwards "In 2040, two decades after Oliver\'s sacrifice". Moves to Earth-Prime after E8 (Crisis Part Four).', ['Arrow season 8'], 2020), notes: 'Episodes 1–8 on Earth-1; from the end of E8 on Earth-Prime.' },
  ] },
  { id: 'the-flash-2014', title: 'The Flash', wiki: 'The Flash (2014 TV series)', ...CW, chars: ['flash'], links: [{ to: 'arrow', kind: 'spinoff' }], units: [
    { key: 's1', label: 'Season 1', season: 1, branch: 'earth-1', iu: Y(2014, '2014–2015', 'inferred', 'Arrowverse Wiki (Pilot): "14 years ago, in 2000"; a future newspaper is dated April 25, 2024.', ['arrowfandom:Pilot (The Flash (The CW))'], 2015) },
    ...[2, 3, 4].map((s) => ({ key: `s${s}`, label: `Season ${s}`, season: s, branch: 'earth-1', iu: bc(2013 + s, 2014 + s) })),
    { key: 's5', label: 'Season 5', season: 5, branch: 'earth-1', iu: Y(2018, '2018–2019', 'stated', 'E3: "Sherloque begins to suspect that Nora is not in 2018…"; E22: "The date of the Crisis in the future newspaper becomes December 10, 2019."', ['The Flash season 5'], 2019) },
    { key: 's6', label: 'Season 6', season: 6, branch: 'earth-1', iu: bc(2019, 2020, ' Moves to Earth-Prime from E10 (after Crisis).'), notes: 'Episodes 1–9 on Earth-1; from E10 on Earth-Prime.' },
    { key: 's7', label: 'Season 7', season: 7, branch: 'earth-prime', iu: Y(2021, '2021', 'inferred', 'Arrowverse Wiki (Armageddon, Part 1): "It\'s confirmed Season 7 ended during 2021".', ['arrowfandom:Armageddon, Part 1']) },
    { key: 's8', label: 'Season 8', season: 8, branch: 'earth-prime', iu: Y(2021, '2021–2022', 'stated', 'E4: "The speed required for Barry to return to 2021…"; E19: "preventing her from returning to 2022".', ['The Flash season 8'], 2022) },
    { key: 's9', label: 'Season 9', season: 9, branch: 'earth-prime', iu: Y(2023, '2023', 'stated', 'E12: "In 2023, Cecile projects her consciousness into her 2049 self".', ['The Flash season 9']) },
  ] },
  { id: 'supergirl-tv', title: 'Supergirl', wiki: 'Supergirl (TV series)', ...CW, chars: ['supergirl'], notes: 'Season 1 aired on CBS; seasons 2–6 on The CW.', units: [
    ...[1, 2, 3, 4].map((s) => ({ key: `s${s}`, label: `Season ${s}`, season: s, branch: 'earth-38', iu: bc(2014 + s, 2015 + s, ' Earth-38: "Supergirl was confirmed as an alternate universe, later designated Earth-38".'), ...(s === 1 ? { platform: 'cbs' } : {}) })),
    { key: 's5', label: 'Season 5', season: 5, branch: 'earth-38', iu: bc(2019, 2020, ' Moves to Earth-Prime after E9 (Crisis Part One).'), notes: 'Episodes 1–9 on Earth-38; afterwards Earth-Prime.' },
    { key: 's6', label: 'Season 6', season: 6, branch: 'earth-prime', iu: bc(2021) },
  ] },
  { id: 'legends-of-tomorrow', title: 'Legends of Tomorrow', wiki: 'Legends of Tomorrow', ...CW, chars: ['atom'], teams: ['legends'], units: [
    { key: 's1', label: 'Season 1', season: 1, branch: 'earth-1', iu: Y(2016, '2016 (travels through time)', 'stated', '"Rip Hunter travels back to 2016 to assemble a group…"', ['Legends of Tomorrow season 1']) },
    { key: 's2', label: 'Season 2', season: 2, branch: 'earth-1', iu: Y(2016, '2016 (travels through time)', 'stated', '"In 2016, the historian Nate Heywood enlists Mayor Oliver Queen\'s help"', ['Legends of Tomorrow season 2']) },
    { key: 's3', label: 'Season 3', season: 3, branch: 'earth-1', iu: Y(2017, '2017–2018 (travels through time)', 'stated', '"In 2017, Grodd is approached by Damien."; "The Legends\' vacation in 2018 Aruba…"', ['Legends of Tomorrow season 3'], 2018) },
    { key: 's4', label: 'Season 4', season: 4, branch: 'earth-1', iu: Y(2018, '2018 (travels through time)', 'stated', '"Sara has Gideon look for Nora Darhk in 2018"', ['Legends of Tomorrow season 4']) },
    { key: 's5', label: 'Season 5', season: 5, branch: 'earth-prime', iu: Y(2020, '2020 (travels through time)', 'stated', '"…before returning to 2020… Meanwhile, in 2020, John Constantine…"', ['Legends of Tomorrow season 5']) },
    ...[6, 7].map((s) => ({ key: `s${s}`, label: `Season ${s}`, season: s, branch: 'earth-prime', iu: bc(2021, s === 7 ? 2022 : undefined, ' Present day not identified; the season visits many eras (S7 is stranded in 1925).') })),
  ] },
  { id: 'black-lightning', title: 'Black Lightning', wiki: 'Black Lightning (TV series)', ...CW, chars: ['black-lightning'], units: [
    ...[1, 2, 3].map((s) => ({ key: `s${s}`, label: `Season ${s}`, season: s, branch: 'jeffersons-earth', iu: bc(s === 1 ? 2018 : 2016 + s, s === 1 ? undefined : 2017 + s, s === 3 ? ' Moves to Earth-Prime after E9: "After an incident that merges Jefferson\'s Earth with Earth-1 and Earth-38…"' : ' "Black Lightning, which had been separate up to that point" (on its own Earth).'), ...(s === 3 ? { notes: 'Episodes 1–9 on Jefferson\'s Earth; afterwards Earth-Prime.' } : {}) })),
    { key: 's4', label: 'Season 4', season: 4, branch: 'earth-prime', iu: bc(2021) },
  ] },
  { id: 'batwoman', title: 'Batwoman', wiki: 'Batwoman (TV series)', ...CW, chars: ['batwoman'], teams: ['batman-franchise'], units: [
    { key: 's1', label: 'Season 1', season: 1, branch: 'earth-1', iu: Y(2019, 'c. 2019–2020', 'disputed', 'Arrowverse Wiki: "It\'s been 3 years since Batman disappeared" and "Mid-2015, Batman disappears", which implies 2018 and conflicts with the 2019 broadcast. Moves to Earth-Prime after E9 (Crisis Part Two).', ['arrowfandom:Pilot (Batwoman)', AV], 2020, 'approx'), notes: 'Episodes 1–9 on Earth-1; afterwards Earth-Prime.' },
    ...[2, 3].map((s) => ({ key: `s${s}`, label: `Season ${s}`, season: s, branch: 'earth-prime', iu: bc(2021, s === 3 ? 2022 : undefined) })),
  ] },
  { id: 'vixen', title: 'Vixen', wiki: 'Vixen (web series)', ...CW, type: 'animated-series', platform: 'cw-seed', units: [1, 2].map((s) => ({ key: `s${s}`, label: `Season ${s}`, season: s, branch: 'earth-1', iu: bc(2014 + s, undefined, ' "set in the Arrowverse, the same fictional universe as Arrow, The Flash…"') })) },
  { id: 'freedom-fighters-the-ray', title: 'Freedom Fighters: The Ray', wiki: 'Freedom Fighters: The Ray', ...CW, type: 'animated-series', platform: 'cw-seed', units: [1, 2].map((s) => ({ key: `s${s}`, label: `Season ${s}`, season: s, branch: 'earth-x', iu: bc(2016 + s, undefined, ' "primarily set on the dystopian Earth-X, while also partly taking place on Earth-1".') })) },
  { id: 'stargirl', title: 'Stargirl', wiki: 'Stargirl (TV series)', ...CW, chars: ['stargirl'], teams: ['justice-society'], notes: 'Season 1 premiered on DC Universe, with The CW airing it the next day.', units: [1, 2, 3].map((s) => ({
    key: `s${s}`, label: `Season ${s}`, season: s, branch: 'earth-2-post-crisis', ...(s === 1 ? { platform: 'dc-universe-streaming' } : {}),
    iu: bc(2019 + s, undefined, ' "Stargirl is set on a new Earth-2, created during the crossover."') })) },
  { id: 'superman-and-lois', title: 'Superman & Lois', wiki: 'Superman & Lois', ...CW, chars: ['superman', 'lois-lane'], teams: ['superman-franchise'], tier: 'adjacent', units: [1, 2, 3, 4].map((s) => ({
    key: `s${s}`, label: `Season ${s}`, season: s, branch: 'adjacent-earth',
    iu: Y(2020 + s, `c. ${2020 + s}`, 'disputed', '"The series was originally part of the Arrowverse\'s Earth-Prime in its first season"; "the second season finale establishes that the series takes place adjacent to Earth-Prime". Year assumed contemporaneous with broadcast.', ['Superman & Lois', 'Superman & Lois season 2'], undefined, 'approx') })) },
];

/** Crossover events: each is a watchable unit with episode-level constituents. */
const EV = (id: string, title: string, y: number, y2: number | undefined, wiki: string, constituents: string[], date: string, note: string, conf: Conf = 'inferred'): DcTitle => ({
  id, title, type: 'crossover-event', wiki, continuity: 'arrowverse', studio: 'warner-bros-television', platform: 'the-cw', constituents,
  units: [{ key: '', label: 'Crossover event', episodes: constituents.length, branch: id === 'crisis-on-infinite-earths' ? 'earth-prime' : id === 'armageddon' ? 'earth-prime' : 'earth-1',
    rel: { date, note: 'Air date of the first part.', src: wiki },
    iu: Y(y, y2 ? `${y}–${y2}` : String(y), conf, note, [wiki, AV], y2) }],
});
export const ARROWVERSE_EVENTS: DcTitle[] = [
  EV('flash-vs-arrow', 'Flash vs. Arrow', 2014, undefined, 'Flash vs. Arrow', ['the-flash-2014-s1#e8', 'arrow-s3#e8'], '2014-12-02', 'Year assumed from the parent seasons (broadcast-contemporaneous).'),
  EV('heroes-join-forces', 'Heroes Join Forces', 2015, undefined, 'Heroes Join Forces', ['the-flash-2014-s2#e8', 'arrow-s4#e8'], '2015-12-01', 'Year assumed from the parent seasons.'),
  EV('worlds-finest', 'Worlds Finest', 2016, undefined, 'Worlds Finest', ['supergirl-tv-s1#e18'], '2016-03-28', 'Confirmed Supergirl as an alternate Earth (Earth-38). Tied to Flash S2E18 "Versus Zoom".'),
  EV('invasion', 'Invasion!', 2016, undefined, 'Invasion! (Arrowverse)', ['the-flash-2014-s3#e8', 'arrow-s5#e8', 'legends-of-tomorrow-s2#e7'], '2016-11-29', 'Lead-in at the end of Supergirl S2E8 "Medusa". Year assumed from the parent seasons.'),
  EV('duet', 'Duet', 2017, undefined, 'Duet (The Flash)', ['the-flash-2014-s3#e17'], '2017-03-21', 'Lead-in at the end of Supergirl S2E16 "Star-Crossed".'),
  EV('crisis-on-earth-x', 'Crisis on Earth-X', 2017, undefined, 'Crisis on Earth-X', ['supergirl-tv-s3#e8', 'arrow-s6#e8', 'the-flash-2014-s4#e8', 'legends-of-tomorrow-s3#e8'], '2017-11-27', 'Year assumed from the parent seasons.'),
  EV('elseworlds', 'Elseworlds', 2018, undefined, 'Elseworlds (Arrowverse)', ['the-flash-2014-s5#e9', 'arrow-s7#e9', 'supergirl-tv-s4#e9'], '2018-12-09', 'Flash S5 is stated to be set in 2018.'),
  EV('crisis-on-infinite-earths', 'Crisis on Infinite Earths', 2019, 2020, 'Crisis on Infinite Earths (Arrowverse)', ['supergirl-tv-s5#e9', 'batwoman-s1#e9', 'the-flash-2014-s6#e9', 'arrow-s8#e8'], '2019-12-08',
    'The Flash S5E22: "The date of the Crisis in the future newspaper becomes December 10, 2019"; Legends S5 returns to 2020 afterwards. Part Five aired as a Legends of Tomorrow special (not numbered in LoT S5), and Black Lightning S3E9 is a tie-in. Earth-1, Earth-38 and Jefferson\'s Earth "were merged into Earth-Prime".', 'stated'),
  EV('armageddon', 'Armageddon', 2021, undefined, 'The Flash season 8', ['the-flash-2014-s8#e1', 'the-flash-2014-s8#e2', 'the-flash-2014-s8#e3', 'the-flash-2014-s8#e4', 'the-flash-2014-s8#e5'], '2021-11-16', 'E4: "The speed required for Barry to return to 2021…".', 'stated'),
];

// ================================================================ Animation
const WBA = { studio: 'warner-bros-animation' };
const anim = (id: string, title: string, wiki: string, continuity: string, platform: string, iu: DcIU, chars: string[] = [], teams: string[] = [], relTitle?: string): DcTitle =>
  ({ id, title, type: 'animated-film', wiki, continuity, ...WBA, platform, chars, teams, units: [{ key: '', label: 'Film', iu, relTitle }] });
const ser = (id: string, title: string, wiki: string, n: number, platform: string, iu: (s: number) => DcIU, chars: string[] = [], teams: string[] = []): DcTitle =>
  ({ id, title, type: 'animated-series', wiki, continuity: 'dcau', ...WBA, platform, chars, teams, units: seasons(n, iu) });
const DCAU = 'DC Animated Universe';
const rel = (s: string) => R(s, 'No in-universe year in sources; DCAU entries are ordered by release.', [DCAU]);
export const DCAU_TITLES: DcTitle[] = [
  ser('batman-the-animated-series', 'Batman: The Animated Series', 'Batman: The Animated Series', 2, 'fox-kids', (s) => rel(`Season ${s}`), ['batman', 'joker', 'harley-quinn'], ['batman-franchise']),
  anim('batman-mask-of-the-phantasm', 'Batman: Mask of the Phantasm', 'Batman: Mask of the Phantasm', 'dcau', 'theatrical', rel('Film'), ['batman', 'joker'], ['batman-franchise']),
  ser('superman-the-animated-series', 'Superman: The Animated Series', 'Superman: The Animated Series', 3, 'kids-wb', (s) => rel(`Season ${s}`), ['superman', 'lois-lane', 'lex-luthor'], ['superman-franchise']),
  { ...ser('the-new-batman-adventures', 'The New Batman Adventures', 'The New Batman Adventures', 1, 'kids-wb', () => R('Season 1', 'TNBA "is now regarded as the third season of Batman: The Animated Series"; no year given.', ['Batman: The Animated Series'], 'stated'), ['batman', 'robin'], ['batman-franchise']), links: [{ to: 'batman-the-animated-series', kind: 'continues' }] },
  anim('batman-and-mr-freeze-subzero', 'Batman & Mr. Freeze: SubZero', 'Batman & Mr. Freeze: SubZero', 'dcau', 'home-media', rel('Film'), ['batman'], ['batman-franchise']),
  ser('static-shock', 'Static Shock', 'Static Shock', 4, 'kids-wb', (s) => rel(`Season ${s}`), ['static']),
  ser('justice-league-animated', 'Justice League', 'Justice League (TV series)', 2, 'cartoon-network', (s) => rel(`Season ${s}`), ['batman', 'superman', 'wonder-woman', 'flash', 'green-lantern'], ['justice-league']),
  anim('batman-mystery-of-the-batwoman', 'Batman: Mystery of the Batwoman', 'Batman: Mystery of the Batwoman', 'dcau', 'home-media', rel('Film'), ['batman'], ['batman-franchise']),
  { ...ser('justice-league-unlimited', 'Justice League Unlimited', 'Justice League Unlimited', 3, 'cartoon-network', (s) => R(`Season ${s}`, s === 1 ? 'JLU "is a direct sequel to the previous Justice League animated series and picks up around two years after it."' : s === 2 ? 'Includes "Epilogue", "set 15 years after Batman Beyond", which concludes the DCAU chronologically.' : 'No in-universe year in sources.', ['Justice League Unlimited', DCAU], 'stated'), ['batman', 'superman', 'wonder-woman'], ['justice-league']), links: [{ to: 'justice-league-animated', kind: 'sequel' }] },
  { ...ser('batman-beyond', 'Batman Beyond', 'Batman Beyond', 3, 'kids-wb', () => Y(2039, '2039 (prologue 2019)', 'stated', '"In the then-future year of 2019, Bruce Wayne is in his sixties…"; "Twenty years later, Bruce lives alone…"', ['Batman Beyond']), ['batman-beyond', 'batman'], ['batman-franchise']) },
  anim('batman-beyond-return-of-the-joker', 'Batman Beyond: Return of the Joker', 'Batman Beyond: Return of the Joker', 'dcau', 'home-media', Y(2039, 'c. 2039–2040', 'inferred', 'Batman Beyond era (series set from 2039).', ['Batman Beyond'], 2040, 'approx'), ['batman-beyond', 'joker'], ['batman-franchise']),
  { ...ser('the-zeta-project', 'The Zeta Project', 'The Zeta Project', 2, 'kids-wb', (s) => Y(2030, '2030s', 'inferred', 'Batman Beyond spin-off; category "Television series set in the 2030s" only.', ['The Zeta Project'], 2039, 'approx')), links: [{ to: 'batman-beyond', kind: 'spinoff' }] },
];

const DCAMU = 'DC Animated Movie Universe';
const amu = (id: string, title: string, wiki: string, note: string, chars: string[] = [], teams: string[] = [], relTitle?: string) =>
  anim(id, title, wiki, 'dcamu', 'home-media', R('Film', note, [DCAMU]), chars, teams, relTitle);
export const DCAMU_TITLES: DcTitle[] = [
  amu('justice-league-the-flashpoint-paradox', 'Justice League: The Flashpoint Paradox', 'Justice League: The Flashpoint Paradox', 'Creates the new timeline the arc follows. Release order used as story order (Wikipedia gives no separate chronology).', ['flash'], ['justice-league']),
  amu('justice-league-war', 'Justice League: War', 'Justice League: War', 'Release order. Category year 2014 (not used: calendar-less continuity).', [], ['justice-league']),
  amu('son-of-batman', 'Son of Batman', 'Son of Batman', 'Release order.', ['batman', 'robin'], ['batman-franchise']),
  amu('justice-league-throne-of-atlantis', 'Justice League: Throne of Atlantis', 'Justice League: Throne of Atlantis', '"standalone sequel to 2014\'s Justice League: War".', ['aquaman'], ['justice-league']),
  amu('batman-vs-robin', 'Batman vs. Robin', 'Batman vs. Robin', 'Release order.', ['batman', 'robin'], ['batman-franchise']),
  amu('batman-bad-blood', 'Batman: Bad Blood', 'Batman: Bad Blood', '"Six months after the defeat of the Court of Owls".', ['batman', 'batwoman'], ['batman-franchise']),
  amu('justice-league-vs-teen-titans', 'Justice League vs. Teen Titans', 'Justice League vs. Teen Titans', 'Release order.', ['robin'], ['justice-league', 'teen-titans']),
  amu('justice-league-dark', 'Justice League Dark', 'Justice League Dark (film)', 'Release order.', [], ['justice-league']),
  amu('teen-titans-the-judas-contract', 'Teen Titans: The Judas Contract', 'Teen Titans: The Judas Contract', 'Release order.', ['robin'], ['teen-titans']),
  amu('suicide-squad-hell-to-pay', 'Suicide Squad: Hell to Pay', 'Suicide Squad: Hell to Pay', 'Release order.', ['amanda-waller'], ['suicide-squad']),
  amu('the-death-of-superman', 'The Death of Superman', 'The Death of Superman (film)', 'Release order.', ['superman', 'lois-lane'], ['superman-franchise']),
  amu('constantine-city-of-demons', 'Constantine: City of Demons', 'Constantine: City of Demons', 'Release order. Originally a CW Seed web series (2018); the film is its feature cut.'),
  amu('reign-of-the-supermen', 'Reign of the Supermen', 'Reign of the Supermen (film)', '"Six months following Superman\'s sacrifice".', ['superman'], ['superman-franchise']),
  amu('batman-hush', 'Batman: Hush', 'Batman: Hush (film)', 'Placed after Reign of the Supermen (Wikipedia footnote).', ['batman', 'catwoman'], ['batman-franchise']),
  amu('wonder-woman-bloodlines', 'Wonder Woman: Bloodlines', 'Wonder Woman: Bloodlines', 'Release order. Its plot arithmetic (2013 + five years) conflicts with its 2019 category; not used.', ['wonder-woman']),
  amu('justice-league-dark-apokolips-war', 'Justice League Dark: Apokolips War', 'Justice League Dark: Apokolips War', '"Two years later"; ends the arc with a universal reset.', [], ['justice-league']),
];
const TV = 'DC Animated Movie Universe';
const tvf = (id: string, title: string, wiki: string, note: string, chars: string[] = [], teams: string[] = [], relTitle?: string) =>
  anim(id, title, wiki, 'tomorrowverse', 'home-media', R('Film', note, [TV]), chars, teams, relTitle);
export const TOMORROWVERSE_TITLES: DcTitle[] = [
  tvf('superman-man-of-tomorrow', 'Superman: Man of Tomorrow', 'Superman: Man of Tomorrow', 'Opens the arc, "set after the events of Justice League Dark: Apokolips War, which ends the first story arc with a universal reset."', ['superman', 'lois-lane', 'lex-luthor'], ['superman-franchise']),
  tvf('justice-society-world-war-ii', 'Justice Society: World War II', 'Justice Society: World War II', 'Present-day frame "Set after Superman: Man of Tomorrow".', ['flash'], ['justice-society']),
  { id: 'batman-the-long-halloween', title: 'Batman: The Long Halloween', type: 'animated-film', wiki: 'Batman: The Long Halloween (film)', continuity: 'tomorrowverse', ...WBA, platform: 'home-media', chars: ['batman', 'catwoman', 'james-gordon'], teams: ['batman-franchise'],
    units: [{ key: 'part-one', label: 'Part One', relTitle: 'Part One', iu: R('Part One', 'Release order; "This story is continued in Justice League: Crisis on Infinite Earths – Part One".', [TV]) }, { key: 'part-two', label: 'Part Two', relTitle: 'Part Two', iu: R('Part Two', 'Release order.', [TV]) }] },
  tvf('green-lantern-beware-my-power', 'Green Lantern: Beware My Power', 'Green Lantern: Beware My Power', 'Release order; Crisis footnote: "Hal Jordan later joins the Justice League sometime before the events of Green Lantern: Beware My Power".', ['green-lantern'], ['justice-league']),
  tvf('legion-of-super-heroes', 'Legion of Super-Heroes', 'Legion of Super-Heroes (film)', 'Release order; mostly set in the 31st century (category). "The story continues in Justice League: Warworld".', ['supergirl']),
  tvf('justice-league-warworld', 'Justice League: Warworld', 'Justice League: Warworld', '"The story continues in … Crisis on Infinite Earths – Part One".', ['superman', 'batman', 'wonder-woman'], ['justice-league']),
  { id: 'justice-league-crisis-on-infinite-earths', title: 'Justice League: Crisis on Infinite Earths', type: 'animated-film', wiki: 'Justice League: Crisis on Infinite Earths', continuity: 'tomorrowverse', ...WBA, platform: 'home-media', teams: ['justice-league'],
    units: ['One', 'Two', 'Three'].map((p) => ({ key: `part-${p.toLowerCase()}`, label: `Part ${p}`, relTitle: `Part ${p}`, iu: R(`Part ${p}`, 'Concludes the Tomorrowverse; release order.', [TV]) })) },
];

export const DC_SEED: DcTitle[] = [...DCU_TITLES, ...DCEU_TITLES, ...BATMAN_ETC, ...TV_TITLES, ...ARROWVERSE, ...ARROWVERSE_EVENTS, ...DCAU_TITLES, ...DCAMU_TITLES, ...TOMORROWVERSE_TITLES];
