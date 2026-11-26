// Hand-curated Marvel seed: classification decisions only (continuity, branch, tier, studio,
// platform, characters) plus KEYS that tie each unit to source rows. Dates are NOT typed here;
// they are pulled from cached sources by scripts/bootstrap/marvel.ts. Where a value must be
// entered by hand, it carries `src` (the source page) and is listed in data/DATA_NOTES.md.
import type { CanonTier, TitleType } from '../../src/domain/schema.ts';

export interface SeedUnit {
  key: string; // unit id = `${title.id}${key ? '-' + key : ''}`
  label: string;
  season?: number; // match release row season
  eps?: [number, number, number, number]; // fromSeason, fromEp, toSeason, toEp
  tl?: string; // item text in Wikipedia's MCU timeline diagram
  book?: string; // substring in "An Official Timeline" (2023) table
  disney?: string; // exact item in Disney+ timeline order list
  branch?: string;
  tier?: CanonTier;
  /** Manual in-universe placement. Must cite `src`. */
  iu?: { y?: number; y2?: number; label: string; precision: 'exact' | 'year' | 'approx' | 'range' | 'relative'; confidence: 'stated' | 'inferred' | 'disputed'; note: string; src: string };
  /** Manual release when no table row exists. Must cite `src`. */
  rel?: { date: string | null; end?: string | null; note?: string; src: string; status?: 'upcoming' | 'in-production' | 'released' | 'cancelled' };
  phase?: string | null; // override phase (e.g. list-page rows without phase)
  episodes?: number;
  notes?: string;
}

export interface SeedTitle {
  id: string;
  title: string;
  type: TitleType;
  wiki: string; // enwiki article (link target)
  continuity: string;
  studio: string;
  label?: string;
  platform: string;
  tier: CanonTier;
  chars?: string[];
  teams?: string[];
  units?: SeedUnit[]; // default: one film unit
  links?: { to: string; kind: string; note?: string }[];
  notes?: string;
  extra_sources?: string[]; // extra enwiki article titles
}

const film = (o: Omit<SeedTitle, 'type' | 'studio' | 'platform' | 'continuity' | 'tier'> & Partial<SeedTitle> & { tl?: string; book?: string; disney?: string; branch?: string; uTier?: CanonTier; unit?: Partial<SeedUnit> }): SeedTitle => ({
  type: 'film', studio: 'marvel-studios', platform: 'theatrical', continuity: 'mcu', tier: 'core',
  units: [{ key: '', label: 'Film', tl: o.tl, book: o.book ?? o.title, disney: o.disney ?? o.title, branch: o.branch, ...(o.unit ?? {}) }],
  ...o,
});

// ---------------------------------------------------------------- MCU films
export const MCU_FILMS: SeedTitle[] = [
  film({ id: 'iron-man', title: 'Iron Man', wiki: 'Iron Man (2008 film)', tl: 'Iron Man', chars: ['iron-man'], teams: ['avengers'] }),
  film({ id: 'the-incredible-hulk', title: 'The Incredible Hulk', wiki: 'The Incredible Hulk (film)', tl: 'The Incredible Hulk', chars: ['hulk'], teams: ['avengers'] }),
  film({ id: 'iron-man-2', title: 'Iron Man 2', wiki: 'Iron Man 2', tl: 'Iron Man 2', chars: ['iron-man', 'black-widow', 'nick-fury'], teams: ['avengers'] }),
  film({ id: 'thor', title: 'Thor', wiki: 'Thor (film)', tl: 'Thor', chars: ['thor', 'loki'], teams: ['avengers'] }),
  film({ id: 'captain-america-the-first-avenger', title: 'Captain America: The First Avenger', wiki: 'Captain America: The First Avenger', tl: 'The First Avenger', chars: ['captain-america', 'peggy-carter', 'bucky-barnes'], teams: ['avengers'] }),
  film({ id: 'the-avengers', title: 'The Avengers', wiki: 'The Avengers (2012 film)', tl: 'The Avengers', chars: ['iron-man', 'captain-america', 'thor', 'hulk', 'black-widow', 'hawkeye', 'loki', 'nick-fury'], teams: ['avengers'] }),
  film({ id: 'iron-man-3', title: 'Iron Man 3', wiki: 'Iron Man 3', tl: 'Iron Man 3', chars: ['iron-man'], teams: ['avengers'] }),
  film({ id: 'thor-the-dark-world', title: 'Thor: The Dark World', wiki: 'Thor: The Dark World', tl: 'The Dark World', chars: ['thor', 'loki'], teams: ['avengers'] }),
  film({ id: 'captain-america-the-winter-soldier', title: 'Captain America: The Winter Soldier', wiki: 'Captain America: The Winter Soldier', tl: 'The Winter Soldier', chars: ['captain-america', 'black-widow', 'falcon', 'bucky-barnes', 'nick-fury'], teams: ['avengers', 'shield'] }),
  film({ id: 'guardians-of-the-galaxy', title: 'Guardians of the Galaxy', wiki: 'Guardians of the Galaxy (film)', tl: 'Guardians of the Galaxy', chars: ['star-lord', 'groot'], teams: ['guardians-of-the-galaxy'] }),
  film({ id: 'avengers-age-of-ultron', title: 'Avengers: Age of Ultron', wiki: 'Avengers: Age of Ultron', tl: 'Age of Ultron', chars: ['iron-man', 'captain-america', 'thor', 'hulk', 'black-widow', 'hawkeye', 'scarlet-witch', 'vision'], teams: ['avengers'] }),
  film({ id: 'ant-man', title: 'Ant-Man', wiki: 'Ant-Man (film)', tl: 'Ant-Man', chars: ['ant-man', 'wasp'], teams: ['avengers'] }),
  film({ id: 'captain-america-civil-war', title: 'Captain America: Civil War', wiki: 'Captain America: Civil War', tl: 'Civil War', chars: ['captain-america', 'iron-man', 'black-widow', 'bucky-barnes', 'falcon', 'black-panther', 'spider-man', 'ant-man', 'scarlet-witch', 'vision', 'hawkeye'], teams: ['avengers', 'spider-man-franchise'] }),
  film({ id: 'doctor-strange', title: 'Doctor Strange', wiki: 'Doctor Strange (2016 film)', tl: 'Doctor Strange', chars: ['doctor-strange'] }),
  film({ id: 'guardians-of-the-galaxy-vol-2', title: 'Guardians of the Galaxy Vol. 2', wiki: 'Guardians of the Galaxy Vol. 2', tl: 'Guardians of the Galaxy Vol. 2', chars: ['star-lord', 'groot'], teams: ['guardians-of-the-galaxy'] }),
  film({ id: 'spider-man-homecoming', title: 'Spider-Man: Homecoming', wiki: 'Spider-Man: Homecoming', tl: 'Homecoming', chars: ['spider-man', 'iron-man'], teams: ['spider-man-franchise'], notes: 'Co-produced with Columbia Pictures (Sony); counted under Marvel Studios as the creative lead.' }),
  film({ id: 'thor-ragnarok', title: 'Thor: Ragnarok', wiki: 'Thor: Ragnarok', tl: 'Ragnarok', chars: ['thor', 'hulk', 'loki'], teams: ['avengers'] }),
  film({ id: 'black-panther', title: 'Black Panther', wiki: 'Black Panther (film)', tl: 'Black Panther', chars: ['black-panther'], teams: ['wakanda'] }),
  film({ id: 'avengers-infinity-war', title: 'Avengers: Infinity War', wiki: 'Avengers: Infinity War', tl: 'Infinity War', chars: ['iron-man', 'captain-america', 'thor', 'hulk', 'black-widow', 'spider-man', 'doctor-strange', 'black-panther', 'thanos', 'star-lord'], teams: ['avengers', 'guardians-of-the-galaxy'] }),
  film({ id: 'ant-man-and-the-wasp', title: 'Ant-Man and the Wasp', wiki: 'Ant-Man and the Wasp', tl: 'Ant-Man and the Wasp', chars: ['ant-man', 'wasp'], teams: ['avengers'] }),
  film({ id: 'captain-marvel', title: 'Captain Marvel', wiki: 'Captain Marvel (film)', tl: 'Captain Marvel', chars: ['captain-marvel', 'nick-fury'], teams: ['avengers'] }),
  film({ id: 'avengers-endgame', title: 'Avengers: Endgame', wiki: 'Avengers: Endgame', tl: 'Endgame', chars: ['iron-man', 'captain-america', 'thor', 'hulk', 'black-widow', 'hawkeye', 'thanos', 'ant-man', 'captain-marvel'], teams: ['avengers'], notes: 'Opens in 2018 before a five-year jump; Wikipedia places it in 2023, where most of it occurs.' }),
  film({ id: 'spider-man-far-from-home', title: 'Spider-Man: Far From Home', wiki: 'Spider-Man: Far From Home', tl: 'Far From Home', chars: ['spider-man', 'nick-fury'], teams: ['spider-man-franchise'] }),
  film({ id: 'black-widow', title: 'Black Widow', wiki: 'Black Widow (2021 film)', tl: 'Black Widow', chars: ['black-widow', 'yelena-belova'], teams: ['avengers'] }),
  film({ id: 'shang-chi-and-the-legend-of-the-ten-rings', title: 'Shang-Chi and the Legend of the Ten Rings', wiki: 'Shang-Chi and the Legend of the Ten Rings', tl: 'Shang-Chi', chars: ['shang-chi'] }),
  film({ id: 'eternals', title: 'Eternals', wiki: 'Eternals (film)', tl: 'Eternals', teams: ['eternals'] }),
  film({ id: 'spider-man-no-way-home', title: 'Spider-Man: No Way Home', wiki: 'Spider-Man: No Way Home', tl: 'No Way Home', chars: ['spider-man', 'doctor-strange'], teams: ['spider-man-franchise'],
    links: [{ to: 'spider-man-2002', kind: 'crossover', note: 'Raimi-film characters cross into the MCU' }, { to: 'the-amazing-spider-man', kind: 'crossover', note: 'Webb-film characters cross into the MCU' }, { to: 'venom-let-there-be-carnage', kind: 'crossover', note: 'Mid-credits scene links Eddie Brock to the MCU' }] }),
  film({ id: 'doctor-strange-in-the-multiverse-of-madness', title: 'Doctor Strange in the Multiverse of Madness', wiki: 'Doctor Strange in the Multiverse of Madness', tl: 'Multiverse of Madness', chars: ['doctor-strange', 'scarlet-witch'] }),
  film({ id: 'thor-love-and-thunder', title: 'Thor: Love and Thunder', wiki: 'Thor: Love and Thunder', tl: 'Love and Thunder', chars: ['thor'], teams: ['avengers'] }),
  film({ id: 'black-panther-wakanda-forever', title: 'Black Panther: Wakanda Forever', wiki: 'Black Panther: Wakanda Forever', tl: 'Wakanda Forever', chars: ['black-panther', 'ironheart'], teams: ['wakanda'] }),
  film({ id: 'ant-man-and-the-wasp-quantumania', title: 'Ant-Man and the Wasp: Quantumania', wiki: 'Ant-Man and the Wasp: Quantumania', tl: 'Quantumania', chars: ['ant-man', 'wasp', 'kang'], teams: ['avengers'] }),
  film({ id: 'guardians-of-the-galaxy-vol-3', title: 'Guardians of the Galaxy Vol. 3', wiki: 'Guardians of the Galaxy Vol. 3', tl: 'Guardians of the Galaxy Vol. 3', chars: ['star-lord', 'groot'], teams: ['guardians-of-the-galaxy'] }),
  film({ id: 'the-marvels', title: 'The Marvels', wiki: 'The Marvels', tl: 'The Marvels', chars: ['captain-marvel', 'ms-marvel', 'monica-rambeau'], teams: ['avengers'] }),
  film({ id: 'deadpool-and-wolverine', title: 'Deadpool & Wolverine', wiki: 'Deadpool & Wolverine', tl: 'Deadpool & Wolverine', branch: 'earth-10005', tier: 'outside-set-date', chars: ['deadpool', 'wolverine'], teams: ['x-men'],
    links: [{ to: 'deadpool-2', kind: 'sequel', note: 'Continues the Fox Deadpool films; Earth-10005 is the Fox X-Men universe' }, { to: 'logan', kind: 'feeds-into' }, { to: 'loki', kind: 'feeds-into', note: 'Wikipedia: occurs after Loki season 2' }] }),
  film({ id: 'captain-america-brave-new-world', title: 'Captain America: Brave New World', wiki: 'Captain America: Brave New World', tl: 'Brave New World', chars: ['captain-america', 'falcon'], teams: ['avengers'] }),
  film({ id: 'thunderbolts', title: 'Thunderbolts*', wiki: 'Thunderbolts*', tl: 'Thunderbolts*', chars: ['yelena-belova', 'bucky-barnes'], teams: ['thunderbolts'] }),
  film({ id: 'the-fantastic-four-first-steps', title: 'The Fantastic Four: First Steps', wiki: 'The Fantastic Four: First Steps', tl: 'The Fantastic Four: First Steps', branch: 'earth-828', tier: 'outside-set-date', teams: ['fantastic-four'] }),
  film({ id: 'spider-man-brand-new-day', title: 'Spider-Man: Brand New Day', wiki: 'Spider-Man: Brand New Day', tl: 'Brand New Day', disney: '', chars: ['spider-man'], teams: ['spider-man-franchise'], notes: 'Not on the Disney+ timeline (Sony-distributed; availability-dependent).' }),
  film({ id: 'avengers-doomsday', title: 'Avengers: Doomsday', wiki: 'Avengers: Doomsday', disney: '', chars: ['doctor-doom'], teams: ['avengers', 'fantastic-four', 'x-men'],
    unit: { iu: { label: 'Not yet placed (unreleased)', precision: 'relative', confidence: 'disputed', note: "Wikipedia's diagram keeps a 2028 row for it commented out until release; the reference image showed 2028.", src: 'Marvel Cinematic Universe timeline' } } }),
  film({ id: 'avengers-secret-wars', title: 'Avengers: Secret Wars', wiki: 'Avengers: Secret Wars', disney: '', teams: ['avengers'],
    unit: { iu: { label: 'Not yet placed (unreleased)', precision: 'relative', confidence: 'disputed', note: 'No placement published.', src: 'List of Marvel Cinematic Universe films' } } }),
  film({ id: 'untitled-x-men-film', title: 'Untitled X-Men film', wiki: 'Untitled X-Men film', disney: '', teams: ['x-men'],
    unit: { iu: { label: 'Not yet placed (unreleased)', precision: 'relative', confidence: 'disputed', note: 'No placement published.', src: 'List of Marvel Cinematic Universe films' } } }),
  film({ id: 'ghost-rider-2028', title: 'Ghost Rider', wiki: 'Ghost Rider (2028 film)', disney: '', chars: ['ghost-rider'],
    unit: { iu: { label: 'Not yet placed (unreleased)', precision: 'relative', confidence: 'disputed', note: 'No placement published.', src: 'List of Marvel Cinematic Universe films' } } }),
  film({ id: 'black-panther-iii', title: 'Black Panther III', wiki: 'Black Panther III', disney: '', chars: ['black-panther'], teams: ['wakanda'],
    unit: { iu: { label: 'Not yet placed (unreleased)', precision: 'relative', confidence: 'disputed', note: 'No placement published.', src: 'List of Marvel Cinematic Universe films' } } }),
];

// ---------------------------------------------------------------- MCU one-shots & specials
const oneShot = (id: string, title: string, wiki: string, tl: string, chars: string[], linkTo: string): SeedTitle => ({
  id, title, type: 'one-shot', wiki, continuity: 'mcu', studio: 'marvel-studios', platform: 'home-media', tier: 'core', chars, teams: ['shield'],
  units: [{ key: '', label: 'Short film', tl, book: title, disney: title }],
  links: [{ to: linkTo, kind: 'feeds-into', note: 'Released as a bonus feature on this film\'s home media' }],
  extra_sources: ['Marvel One-Shots'],
});
export const MCU_SHORTS: SeedTitle[] = [
  oneShot('the-consultant', 'The Consultant', 'Marvel One-Shots', 'The Consultant', ['phil-coulson'], 'thor'),
  oneShot('a-funny-thing-happened-on-the-way-to-thors-hammer', "A Funny Thing Happened on the Way to Thor's Hammer", 'Marvel One-Shots', 'A Funny Thing...', ['phil-coulson'], 'captain-america-the-first-avenger'),
  oneShot('item-47', 'Item 47', 'Item 47', 'Item 47', [], 'the-avengers'),
  oneShot('agent-carter-one-shot', 'Agent Carter', 'Agent Carter (film)', 'Agent Carter', ['peggy-carter'], 'iron-man-3'),
  oneShot('all-hail-the-king', 'All Hail the King', 'All Hail the King', 'All Hail the King', [], 'thor-the-dark-world'),
  { id: 'werewolf-by-night', title: 'Werewolf by Night', type: 'special', wiki: 'Werewolf by Night (TV special)', continuity: 'mcu', studio: 'marvel-studios', platform: 'disney-plus', tier: 'non-placeable', chars: ['werewolf-by-night'],
    units: [{ key: '', label: 'Special', disney: 'Werewolf by Night', book: 'Werewolf by Night',
      iu: { label: 'No confirmed placement', precision: 'relative', confidence: 'disputed', note: "Excluded from Wikipedia's diagram: the special does not say where it takes place. An Official Timeline (2023) dates it late 2025 but calls the placement uncertain. Disney+ lists it after Ironheart.", src: 'Marvel Cinematic Universe timeline' } }] },
  { id: 'the-guardians-of-the-galaxy-holiday-special', title: 'The Guardians of the Galaxy Holiday Special', type: 'special', wiki: 'The Guardians of the Galaxy Holiday Special', continuity: 'mcu', studio: 'marvel-studios', platform: 'disney-plus', tier: 'core', chars: ['star-lord'], teams: ['guardians-of-the-galaxy'],
    units: [{ key: '', label: 'Special', tl: 'The Guardians of the Galaxy Holiday Special', book: 'The Guardians of the Galaxy Holiday Special', disney: 'The Guardians of the Galaxy Holiday Special' }] },
  { id: 'the-punisher-one-last-kill', title: 'The Punisher: One Last Kill', type: 'special', wiki: 'The Punisher: One Last Kill', continuity: 'mcu', studio: 'marvel-studios', label: 'marvel-television-label', platform: 'disney-plus', tier: 'core', chars: ['punisher'],
    units: [{ key: '', label: 'Special', tl: 'The Punisher: One Last Kill', disney: 'The Punisher: One Last Kill' }] },
];

// ---------------------------------------------------------------- MCU Disney+ series (Marvel Studios)
const dplus = (o: Partial<SeedTitle> & Pick<SeedTitle, 'id' | 'title' | 'wiki' | 'units'>): SeedTitle => ({
  type: 'series', continuity: 'mcu', studio: 'marvel-studios', platform: 'disney-plus', tier: 'core', ...o,
});
const mini = (id: string, title: string, wiki: string, tl: string, chars: string[], teams: string[] = [], extra: Partial<SeedTitle> = {}, book?: string): SeedTitle =>
  dplus({ id, title, wiki, chars, teams, units: [{ key: 's1', label: 'Season 1', season: 1, tl, book: book ?? title, disney: title }], ...extra });

export const MCU_SERIES: SeedTitle[] = [
  mini('wandavision', 'WandaVision', 'WandaVision', 'WandaVision', ['scarlet-witch', 'vision', 'monica-rambeau', 'agatha-harkness']),
  mini('the-falcon-and-the-winter-soldier', 'The Falcon and the Winter Soldier', 'The Falcon and the Winter Soldier', 'The Falcon and the Winter Soldier', ['falcon', 'bucky-barnes'], ['avengers']),
  dplus({ id: 'loki', title: 'Loki', wiki: 'Loki (TV series)', chars: ['loki', 'kang'], teams: ['tva'], tier: 'non-placeable',
    units: [
      { key: 's1', label: 'Season 1', season: 1, branch: 'outside-time', disney: 'Loki season 1', iu: { label: 'Outside time (TVA)', precision: 'relative', confidence: 'stated', note: 'Excluded from Wikipedia\'s diagram: it occurs outside the main timeline with no set timeframe. Disney+ places season 1 between Endgame and WandaVision.', src: 'Marvel Cinematic Universe timeline' } },
      { key: 's2', label: 'Season 2', season: 2, branch: 'outside-time', disney: 'Loki season 2', iu: { label: 'Outside time (TVA)', precision: 'relative', confidence: 'stated', note: 'No set timeframe. Disney+ places season 2 after The Marvels.', src: 'Marvel Cinematic Universe timeline' } },
    ] }),
  dplus({ id: 'what-if', title: 'What If...?', wiki: 'What If...? (TV series)', type: 'animated-series', label: 'marvel-studios-animation', tier: 'non-placeable', chars: ['the-watcher'],
    notes: 'Season 3 was released under the Marvel Animation label.',
    units: [1, 2, 3].map((s) => ({ key: `s${s}`, label: `Season ${s}`, season: s, branch: 'multiverse', disney: `What If...? season ${s}`,
      iu: { label: 'Multiverse, no set timeframe', precision: 'relative' as const, confidence: 'stated' as const, note: `Excluded from Wikipedia's diagram (outside the main timeline, no set timeframe). Disney+ order is used only for relative position.`, src: 'Marvel Cinematic Universe timeline' } })) }),
  mini('hawkeye', 'Hawkeye', 'Hawkeye (miniseries)', 'Hawkeye', ['hawkeye', 'kate-bishop', 'yelena-belova', 'kingpin', 'echo'], ['avengers']),
  mini('moon-knight', 'Moon Knight', 'Moon Knight (miniseries)', 'Moon Knight', ['moon-knight']),
  mini('ms-marvel', 'Ms. Marvel', 'Ms. Marvel (miniseries)', 'Ms. Marvel', ['ms-marvel']),
  mini('she-hulk-attorney-at-law', 'She-Hulk: Attorney at Law', 'She-Hulk: Attorney at Law', 'She-Hulk', ['she-hulk', 'hulk', 'daredevil']),
  mini('secret-invasion', 'Secret Invasion', 'Secret Invasion (miniseries)', 'Secret Invasion', ['nick-fury']),
  mini('echo', 'Echo', 'Echo (miniseries)', 'Echo', ['echo', 'kingpin', 'daredevil'], ['defenders'], { label: 'marvel-spotlight', notes: 'Released simultaneously on Disney+ and Hulu; Disney+ recorded as original platform.' }),
  mini('agatha-all-along', 'Agatha All Along', 'Agatha All Along', 'Agatha All Along', ['agatha-harkness'], [], { label: 'marvel-television-label' }),
  mini('ironheart', 'Ironheart', 'Ironheart (miniseries)', 'Ironheart', ['ironheart']),
  mini('wonder-man', 'Wonder Man', 'Wonder Man (TV series)', 'Wonder Man', ['wonder-man'], [], { label: 'marvel-spotlight', notes: 'Wikipedia lists both Marvel Television and Marvel Spotlight banners; recorded as Marvel Spotlight.' }),
  mini('visionquest', 'VisionQuest', 'VisionQuest', 'VisionQuest', ['vision'], [], { label: 'marvel-television-label' }),
  dplus({ id: 'daredevil-born-again', title: 'Daredevil: Born Again', wiki: 'Daredevil: Born Again', label: 'marvel-television-label', chars: ['daredevil', 'kingpin', 'punisher'], teams: ['defenders'],
    links: [{ to: 'daredevil', kind: 'continues', note: 'Revival of the Netflix series' }],
    units: [
      { key: 's1-e1', label: 'Season 1, ep. 1', season: 1, eps: [1, 1, 1, 1], episodes: 1, tl: 'Born Again season 1 ep. 1', disney: 'Daredevil: Born Again season 1' },
      { key: 's1-e2-9', label: 'Season 1, eps. 2–9', season: 1, eps: [1, 2, 1, 9], episodes: 8, tl: 'Born Again season 1 eps. 2–9', disney: 'Daredevil: Born Again season 1' },
      { key: 's2', label: 'Season 2', season: 2, tl: 'Born Again season 2', disney: 'Daredevil: Born Again season 2' },
      { key: 's3', label: 'Season 3', season: 3, iu: { label: 'Not yet placed (unreleased)', precision: 'relative', confidence: 'disputed', note: "Wikipedia keeps a 2028 row for season 3 commented out until release. The reference image showed '2027 (into 2028)'.", src: 'Marvel Cinematic Universe timeline' } },
    ] }),
  // ---- animated (Marvel Studios Animation / Marvel Animation)
  dplus({ id: 'i-am-groot', title: 'I Am Groot', wiki: 'I Am Groot', type: 'animated-series', label: 'marvel-studios-animation', chars: ['groot'], teams: ['guardians-of-the-galaxy'],
    notes: "Wikipedia's diagram counts episodes across both seasons (S1 has 5, S2 has 5): 'ep. 1' = S1E1; 'eps. 2–10' = S1E2–S2E5.",
    units: [
      { key: 'ep1', label: 'Ep. 1 (S1E1)', season: 1, eps: [1, 1, 1, 1], episodes: 1, tl: 'I Am Groot ep. 1', book: 'I Am Groot episode 1', disney: 'I Am Groot season 1' },
      { key: 'ep2-10', label: 'Eps. 2–10 (S1E2–S2E5)', season: 1, eps: [1, 2, 2, 5], episodes: 9, tl: 'I Am Groot eps. 2–10', book: 'I Am Groot episodes 2–5', disney: 'I Am Groot season 2',
        notes: 'Release date is season 1 (2022-08-10); season 2 episodes released 2023-09-06.' },
    ] }),
  dplus({ id: 'your-friendly-neighborhood-spider-man', title: 'Your Friendly Neighborhood Spider-Man', wiki: 'Your Friendly Neighborhood Spider-Man', type: 'animated-series', label: 'marvel-animation', tier: 'outside-set-date', chars: ['spider-man'], teams: ['spider-man-franchise'],
    units: [
      { key: 's1', label: 'Season 1', season: 1, tl: 'Your Friendly Neighborhood Spider-Man season 1', branch: 'earth-86445' },
      { key: 's2', label: 'Season 2', season: 2, branch: 'earth-86445', iu: { label: 'Not yet placed (unreleased)', precision: 'relative', confidence: 'disputed', note: 'No placement published.', src: 'List of Marvel Cinematic Universe television series (Marvel Studios)' } },
      { key: 's3', label: 'Season 3', season: 3, phase: 'phase-7', branch: 'earth-86445', iu: { label: 'Not yet placed (unreleased)', precision: 'relative', confidence: 'disputed', note: 'No placement published.', src: 'List of Marvel Cinematic Universe television series (Marvel Studios)' } },
      { key: 's4', label: 'Season 4', season: 4, phase: 'phase-7', branch: 'earth-86445', iu: { label: 'Not yet placed (unreleased)', precision: 'relative', confidence: 'disputed', note: 'No placement published.', src: 'List of Marvel Cinematic Universe television series (Marvel Studios)' } },
    ] }),
  dplus({ id: 'eyes-of-wakanda', title: 'Eyes of Wakanda', wiki: 'Eyes of Wakanda', type: 'animated-series', label: 'marvel-animation', teams: ['wakanda'],
    units: [1, 2, 3, 4].map((e) => ({ key: `ep${e}`, label: `Ep. ${e}`, season: 1, eps: [1, e, 1, e] as [number, number, number, number], episodes: 1, tl: `Eyes of Wakanda ep. ${e}`, disney: 'Eyes of Wakanda' })) }),
  dplus({ id: 'marvel-zombies', title: 'Marvel Zombies', wiki: 'Marvel Zombies (TV series)', type: 'animated-series', label: 'marvel-animation', tier: 'outside-set-date', teams: ['avengers'],
    links: [{ to: 'what-if', kind: 'spinoff', note: 'Set in the reality of What If...? "What If... Zombies?!"' }],
    units: [
      { key: 's1', label: 'Season 1', season: 1, tl: 'Marvel Zombies season 1', disney: 'Marvel Zombies', branch: 'zombies-reality' },
      { key: 'fist-of-khonshu', label: 'The Fist of Khonshu', season: 3, phase: 'phase-7', branch: 'zombies-reality', notes: "Wikipedia's Series overview numbers these continuations as 'seasons' 3 and 4 (2 episodes each).",
        iu: { label: 'Not yet placed (unreleased)', precision: 'relative', confidence: 'disputed', note: 'No placement published.', src: 'List of Marvel Cinematic Universe television series (Marvel Studios)' } },
      { key: 'the-last-guardian', label: 'The Last Guardian', season: 4, phase: 'phase-7', branch: 'zombies-reality',
        iu: { label: 'Not yet placed (unreleased)', precision: 'relative', confidence: 'disputed', note: 'No placement published.', src: 'List of Marvel Cinematic Universe television series (Marvel Studios)' } },
    ] }),
  dplus({ id: 'zodiac', title: 'Zodiac', wiki: 'Zodiac (TV series)', label: 'marvel-television-label',
    units: [{ key: 's1', label: 'Season 1', season: 1, phase: 'phase-7', iu: { label: 'Not yet placed (unreleased)', precision: 'relative', confidence: 'disputed', note: 'No placement published.', src: 'List of Marvel Cinematic Universe television series (Marvel Studios)' } }] }),
];

// ---------------------------------------------------------------- Marvel Television (legacy division)
const netflix = (id: string, title: string, wiki: string, short: string, seasons: number, chars: string[]): SeedTitle => ({
  id, title, type: 'series', wiki, continuity: 'mcu', studio: 'marvel-television', platform: 'netflix', tier: 'core', chars, teams: ['defenders'],
  notes: "Marvel Television (legacy division). Placed on the Sacred Timeline by Wikipedia's diagram and the Disney+ timeline (season-level).",
  units: Array.from({ length: seasons }, (_, i) => ({ key: `s${i + 1}`, label: `Season ${i + 1}`, season: i + 1, tl: `${short} season ${i + 1}`, disney: `${short} season ${i + 1}` })),
});
export const MARVEL_TV: SeedTitle[] = [
  netflix('daredevil', 'Daredevil', 'Daredevil (TV series)', 'Daredevil', 3, ['daredevil', 'kingpin', 'punisher']),
  netflix('jessica-jones', 'Jessica Jones', 'Jessica Jones (TV series)', 'Jessica Jones', 3, ['jessica-jones']),
  netflix('luke-cage', 'Luke Cage', 'Luke Cage (TV series)', 'Luke Cage', 2, ['luke-cage']),
  netflix('iron-fist', 'Iron Fist', 'Iron Fist (TV series)', 'Iron Fist', 2, ['iron-fist']),
  { ...netflix('the-defenders', 'The Defenders', 'The Defenders (miniseries)', 'The Defenders', 1, ['daredevil', 'jessica-jones', 'luke-cage', 'iron-fist']),
    units: [{ key: 's1', label: 'Miniseries', season: 1, tl: 'The Defenders', disney: 'The Defenders' }] },
  netflix('the-punisher', 'The Punisher', 'The Punisher (TV series)', 'The Punisher', 2, ['punisher']),
  // ABC / Hulu / Freeform: adjacent tier, not placed by Wikipedia's diagram.
  ...(
    [
      ['agents-of-shield', 'Agents of S.H.I.E.L.D.', 'Agents of S.H.I.E.L.D.', 'abc', 7, ['phil-coulson'], ['shield']],
      ['inhumans', 'Inhumans', 'Inhumans (TV series)', 'abc', 1, [], ['inhumans']],
      ['runaways', 'Runaways', 'Runaways (TV series)', 'hulu', 3, [], ['runaways']],
      ['cloak-and-dagger', 'Cloak & Dagger', 'Cloak & Dagger (TV series)', 'freeform', 2, ['cloak-and-dagger'], []],
      ['helstrom', 'Helstrom', 'Helstrom (TV series)', 'hulu', 1, ['helstrom'], []],
    ] as const
  ).map(([id, title, wiki, platform, seasons, chars, teams]): SeedTitle => ({
    id, title, type: 'series', wiki, continuity: 'mcu', studio: 'marvel-television', platform, tier: 'adjacent', chars: [...chars], teams: [...teams],
    notes: "Marvel Television (legacy division). Not part of Wikipedia's MCU timeline diagram or the Disney+ timeline; canon status is ambiguous, so tier is 'adjacent'.",
    units: Array.from({ length: seasons }, (_, i) => ({
      key: `s${i + 1}`, label: `Season ${i + 1}`, season: i + 1,
      iu: { label: 'Not placed by sources', precision: 'relative' as const, confidence: 'inferred' as const, note: "Wikipedia's MCU timeline diagram covers Marvel Studios and the Netflix series only; the series article gives no in-universe year for this season.", src: wiki },
      ...(id === 'helstrom' ? { rel: { date: '2020-10-16', note: 'All episodes released at once.', src: 'Helstrom (TV series)' } } : {}),
    })),
  })),
  { id: 'agent-carter-series', title: 'Agent Carter', type: 'series', wiki: 'Agent Carter (TV series)', continuity: 'mcu', studio: 'marvel-television', platform: 'abc', tier: 'adjacent', chars: ['peggy-carter'], teams: ['shield'],
    notes: "Marvel Television (legacy division). Not in Wikipedia's MCU timeline diagram; years come from the series article.",
    links: [{ to: 'agent-carter-one-shot', kind: 'continues' }],
    units: [
      { key: 's1', label: 'Season 1', season: 1, iu: { y: 1946, label: '1946', precision: 'year', confidence: 'stated', note: 'Series article: "The first season takes place in 1946".', src: 'Agent Carter (TV series)' } },
      { key: 's2', label: 'Season 2', season: 2, iu: { y: 1947, label: '1947', precision: 'year', confidence: 'stated', note: 'Series article: second season "set approximately six months to a year following the events of the first season in 1947".', src: 'Agent Carter (TV series)' } },
    ] },
];

// ---------------------------------------------------------------- Fox X-Men
const fox = (id: string, title: string, wiki: string, branch: string, iu: SeedUnit['iu'], chars: string[] = [], extra: Partial<SeedTitle> = {}): SeedTitle => ({
  id, title, type: 'film', wiki, continuity: 'fox-x-men', studio: 'fox', platform: 'theatrical', tier: 'core', chars, teams: ['x-men'],
  units: [{ key: '', label: 'Film', branch, iu }], ...extra,
});
const XS = 'X-Men (film series)';
export const FOX_X_MEN: SeedTitle[] = [
  fox('x-men-origins-wolverine', 'X-Men Origins: Wolverine', 'X-Men Origins: Wolverine', 'original', { y: 1845, y2: 1979, label: '1845–1979', precision: 'range', confidence: 'stated', note: 'Franchise article: "set between 1845 and 1979". Shared history before the 1973 divergence.', src: XS }, ['wolverine']),
  fox('x-men-first-class', 'X-Men: First Class', 'X-Men: First Class', 'original', { y: 1962, label: '1962', precision: 'year', confidence: 'stated', note: 'Franchise article timeline. Shared history before the 1973 divergence.', src: XS }, ['professor-x', 'magneto']),
  fox('x-men', 'X-Men', 'X-Men (film)', 'original', { y: 2000, label: 'c. 2000', precision: 'approx', confidence: 'inferred', note: 'Franchise article: settings "mostly contemporaneous" with release; its timeline chart spans 2000–2006 for the original trilogy.', src: XS }, ['wolverine', 'professor-x', 'magneto']),
  fox('x2', 'X2', 'X2 (film)', 'original', { y: 2003, label: 'c. 2003', precision: 'approx', confidence: 'inferred', note: 'Contemporaneous with release per franchise article.', src: XS }, ['wolverine', 'professor-x', 'magneto']),
  fox('x-men-the-last-stand', 'X-Men: The Last Stand', 'X-Men: The Last Stand', 'original', { y: 2006, label: 'c. 2006', precision: 'approx', confidence: 'inferred', note: 'Contemporaneous with release per franchise article.', src: XS }, ['wolverine', 'professor-x', 'magneto']),
  fox('the-wolverine', 'The Wolverine', 'The Wolverine (film)', 'original', { y: 2013, label: 'c. 2013', precision: 'approx', confidence: 'inferred', note: 'Franchise timeline chart places it 2013.', src: XS }, ['wolverine']),
  fox('x-men-days-of-future-past', 'X-Men: Days of Future Past', 'X-Men: Days of Future Past', 'revised', { y: 1973, label: '1973 (and 2023)', precision: 'year', confidence: 'stated', note: 'Franchise article: Wolverine is sent back to 1973 from a future partially set in 2023; this creates the revised timeline.', src: XS }, ['wolverine', 'professor-x', 'magneto']),
  fox('x-men-apocalypse', 'X-Men: Apocalypse', 'X-Men: Apocalypse', 'revised', { y: 1983, label: '1983', precision: 'year', confidence: 'stated', note: 'Franchise article: second timeline "spanning from 1983 to 1992".', src: XS }, ['professor-x', 'magneto']),
  fox('dark-phoenix', 'Dark Phoenix', 'Dark Phoenix (film)', 'revised', { y: 1992, label: '1992', precision: 'year', confidence: 'stated', note: 'Franchise article timeline.', src: XS }, ['professor-x', 'magneto', 'jean-grey']),
  fox('deadpool', 'Deadpool', 'Deadpool (film)', 'revised', { y: 2016, label: 'c. 2016', precision: 'approx', confidence: 'disputed', note: 'Chart places the Deadpool films 2016–2018 on the new timeline, but the article notes their continuity is "not uniform".', src: XS }, ['deadpool']),
  fox('deadpool-2', 'Deadpool 2', 'Deadpool 2', 'revised', { y: 2018, label: 'c. 2018', precision: 'approx', confidence: 'disputed', note: 'As Deadpool; cameos of the young X-Men suggest the new timeline.', src: XS }, ['deadpool'], { links: [{ to: 'deadpool', kind: 'sequel' }] }),
  fox('the-new-mutants', 'The New Mutants', 'The New Mutants (film)', 'revised', { y: 2020, label: 'c. 2020', precision: 'approx', confidence: 'disputed', note: 'Chart places it 2020; article: "bears no obvious relationship to events in the main continuity films".', src: XS }),
  fox('logan', 'Logan', 'Logan (film)', 'revised', { y: 2029, label: '2029', precision: 'year', confidence: 'disputed', note: 'Chart places it 2029 on the new timeline; Jackman said it is an alternate timeline, contradicting Mangold.', src: XS }, ['wolverine', 'professor-x']),
];

// ---------------------------------------------------------------- Sony
const sony = (id: string, title: string, wiki: string, continuity: string, order: number, chars: string[], extra: Partial<SeedTitle> = {}): SeedTitle => ({
  id, title, type: 'film', wiki, continuity, studio: 'sony', platform: 'theatrical', tier: 'core', chars, teams: ['spider-man-franchise'],
  units: [{ key: '', label: 'Film', iu: { label: `Film ${order} (no calendar dates)`, precision: 'relative', confidence: 'inferred', note: 'Sources give no in-universe years; ordered by release as sequential films.', src: continuity === 'ssu' ? "Sony's Spider-Man Universe" : 'Spider-Man in film' } }],
  ...extra,
});
export const SONY: SeedTitle[] = [
  sony('spider-man-2002', 'Spider-Man', 'Spider-Man (2002 film)', 'raimi-spider-man', 1, ['spider-man']),
  sony('spider-man-2', 'Spider-Man 2', 'Spider-Man 2', 'raimi-spider-man', 2, ['spider-man'], { links: [{ to: 'spider-man-2002', kind: 'sequel' }] }),
  sony('spider-man-3', 'Spider-Man 3', 'Spider-Man 3', 'raimi-spider-man', 3, ['spider-man', 'venom'], { links: [{ to: 'spider-man-2', kind: 'sequel' }] }),
  sony('the-amazing-spider-man', 'The Amazing Spider-Man', 'The Amazing Spider-Man (film)', 'webb-spider-man', 1, ['spider-man']),
  sony('the-amazing-spider-man-2', 'The Amazing Spider-Man 2', 'The Amazing Spider-Man 2', 'webb-spider-man', 2, ['spider-man'], { links: [{ to: 'the-amazing-spider-man', kind: 'sequel' }] }),
  sony('venom', 'Venom', 'Venom (2018 film)', 'ssu', 1, ['venom']),
  sony('venom-let-there-be-carnage', 'Venom: Let There Be Carnage', 'Venom: Let There Be Carnage', 'ssu', 2, ['venom'], { links: [{ to: 'venom', kind: 'sequel' }, { to: 'spider-man-no-way-home', kind: 'crossover' }] }),
  sony('morbius', 'Morbius', 'Morbius (film)', 'ssu', 3, ['morbius']),
  sony('madame-web', 'Madame Web', 'Madame Web (film)', 'ssu', 4, ['madame-web']),
  sony('venom-the-last-dance', 'Venom: The Last Dance', 'Venom: The Last Dance', 'ssu', 5, ['venom'], { links: [{ to: 'venom-let-there-be-carnage', kind: 'sequel' }] }),
  sony('kraven-the-hunter', 'Kraven the Hunter', 'Kraven the Hunter (film)', 'ssu', 6, ['kraven']),
];

// ---------------------------------------------------------------- X-Men animated
export const X_MEN_ANIMATED: SeedTitle[] = [
  { id: 'x-men-the-animated-series', title: 'X-Men: The Animated Series', type: 'animated-series', wiki: 'X-Men: The Animated Series', continuity: 'x-men-animated', studio: 'marvel-entertainment-group', platform: 'fox-kids', tier: 'core', chars: ['wolverine', 'professor-x', 'magneto', 'jean-grey'], teams: ['x-men'],
    notes: 'Produced by Marvel Entertainment Group with Saban Entertainment, Graz Entertainment and AKOM (infobox). One unit for all 5 seasons; per-season split is a TODO.',
    units: [{ key: 's1-5', label: 'Seasons 1–5', season: 1, iu: { label: 'Seasons 1–5', precision: 'relative', confidence: 'inferred', note: 'No calendar dates; ordered by release.', src: 'X-Men: The Animated Series' } }] },
  { id: 'x-men-97', title: "X-Men '97", type: 'animated-series', wiki: "X-Men '97", continuity: 'x-men-animated', studio: 'marvel-studios', label: 'marvel-studios-animation', platform: 'disney-plus', tier: 'core', chars: ['wolverine', 'magneto', 'jean-grey'], teams: ['x-men'],
    links: [{ to: 'x-men-the-animated-series', kind: 'continues' }],
    units: [1, 2].map((s) => ({ key: `s${s}`, label: `Season ${s}`, season: s, iu: { label: `Season ${s}`, precision: 'relative' as const, confidence: 'inferred' as const, note: "Continues X-Men: The Animated Series; no calendar dates.", src: "X-Men '97" } })) },
];

export const MARVEL_SEED: SeedTitle[] = [...MCU_FILMS, ...MCU_SHORTS, ...MCU_SERIES, ...MARVEL_TV, ...FOX_X_MEN, ...SONY, ...X_MEN_ANIMATED];
