// Canonical data schema for TimeLiner. Shared by the app, scripts/verify-data.ts and tests.
// Model: UNIVERSE -> CONTINUITY -> (BRANCH) -> TITLE -> UNIT.
// Nothing franchise-specific lives here: phases, sagas, branches, studios, platforms are data.
import { z } from 'zod';

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'lower-kebab-case slug');
const isoDate = z.string().regex(/^-?\d{1,4}(-\d{2}(-\d{2})?)?$/, 'ISO date: yyyy, yyyy-mm or yyyy-mm-dd');
const url = z.string().url();
const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/);

// ---------- Registries (open vocabularies) ----------
export const Studio = z.object({
  id: slug,
  label: z.string(), // full, unambiguous name
  short_label: z.string().nullable().default(null), // compact badge text
  kind: z.enum(['studio', 'division', 'label', 'distributor', 'publisher', 'imprint', 'other']),
  parent: slug.nullable().default(null),
  /** UI grouping for entities that share a public name (e.g. two different "Marvel Television"s). */
  group: z.string().nullable().default(null),
  active: z.object({ from: z.number().int(), to: z.number().int().nullable() }).nullable().default(null),
  note: z.string().default(''),
});
export const Platform = z.object({
  id: slug,
  label: z.string(),
  kind: z.enum(['theatrical', 'streaming', 'broadcast', 'cable', 'home-media', 'print', 'ebook', 'serialized', 'audio', 'venue', 'game-platform', 'other']),
  note: z.string().default(''),
});
export const Tag = z.object({
  id: slug,
  label: z.string(),
  kind: z.enum(['character', 'team', 'franchise']),
  aliases: z.array(z.string()).default([]),
});

// ---------- Calendars ----------
/** Partial date on the continuity's own calendar scale. Gregorian: y<0 is BC (no year 0). */
export const PartialDate = z.object({
  y: z.number().int(),
  m: z.number().int().min(1).max(12).optional(),
  d: z.number().int().min(1).max(31).optional(),
});
export const Calendar = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('gregorian') }),
  z.object({
    kind: z.literal('era'),
    before_label: z.string(), // e.g. "BBY"
    after_label: z.string(), // e.g. "ABY"
    has_year_zero: z.boolean(),
    /** Display: "U.C. 0079"-style label before the year (default after: "32 BBY"), and zero-padding. */
    label_position: z.enum(['before', 'after']).default('after'),
    pad: z.number().int().min(0).max(6).default(0),
    /** Plain-language explanation shown in the Key (e.g. how the epoch and year 0 work, and the source). */
    note: z.string().default(''),
  }),
  z.object({ kind: z.literal('ordered-only') }),
  /** Successive ages (e.g. Tolkien's First/Second/Third/Fourth Age). Years are stored as one running count
   *  (age 1 year 1 = 1) so they sort; they are always shown as "<age label> <year in that age>". */
  z.object({
    kind: z.literal('ages'),
    ages: z.array(z.object({ label: z.string(), name: z.string(), length: z.number().int().positive().nullable() })).min(1),
    note: z.string().default(''),
  }),
]);

// ---------- Universe ----------
export const GroupingValue = z.object({
  id: slug,
  label: z.string(),
  order: z.number(),
  parent: slug.nullable().default(null), // e.g. phase -> saga value
});
export const GroupingScheme = z.object({
  id: slug,
  label: z.string(),
  parent_scheme: slug.nullable().default(null),
  values: z.array(GroupingValue),
});
export const Universe = z.object({
  id: slug,
  name: z.string(),
  short_name: z.string(),
  order: z.number(),
  enabled: z.boolean(), // false = data present but hidden in app
  accent: z.object({ primary: hexColor, secondary: hexColor }),
  default_continuity: slug,
  grouping_schemes: z.array(GroupingScheme).default([]),
  data_dir: z.string(), // relative to data/, e.g. "marvel"
  /** Picker group (e.g. "Fantasy"). Groups appear in the order of their first universe. */
  category: z.string().optional(),
  description: z.string().default(''),
  last_verified: isoDate.nullable(),
});

// ---------- Continuity ----------
export const Marker = z.enum(['dot', 'diamond', 'square', 'triangle', 'hollow-dot', 'hollow-diamond', 'hollow-square', 'star']);
export const Branch = z.object({
  id: slug,
  label: z.string(),
  marker: Marker,
  description: z.string().default(''),
  placeable: z.boolean().default(true), // false: units live in a "no fixed point" lane
  parent: slug.nullable().default(null),
  diverges_at: PartialDate.nullable().default(null),
  /** Branch ceases and continues as another branch (e.g. Arrowverse Earths merging into Earth-Prime at Crisis). */
  merges_into: z.object({ branch: slug, at: PartialDate.nullable(), note: z.string().default('') }).nullable().default(null),
  is_main: z.boolean().default(false),
});
export const AltOrder = z.object({
  id: slug,
  label: z.string(),
  source_url: url,
  as_of: isoDate,
  note: z.string().default(''),
  unit_ids: z.array(z.string()),
  /** official = published by the rights holder; recommended = collated from several published guides. */
  kind: z.enum(['official', 'recommended']).default('official'),
  /** Units the sources treat as skippable on a first watch (subset of unit_ids). */
  optional_unit_ids: z.array(z.string()).default([]),
  /** All sources a collated order draws on (source_url is the primary one). */
  sources: z.array(z.object({ url, title: z.string(), date: isoDate.nullable() })).default([]),
  /** Plain-language rule for what counts as essential vs optional (recommended orders). */
  criteria: z.string().default(''),
  /** Per unit: indexes into `sources` of the guides that recommend it. */
  unit_sources: z.record(z.string(), z.array(z.number().int().min(0))).default({}),
});
export const Continuity = z.object({
  id: slug,
  universe: slug,
  name: z.string(),
  short_name: z.string(),
  order: z.number(),
  kind: z.enum(['shared', 'standalone-collection']),
  calendar: Calendar,
  branches: z.array(Branch).min(1),
  grouping_schemes: z.array(slug).default([]),
  alt_orders: z.array(AltOrder).default([]),
  description: z.string().default(''),
  source_urls: z.array(url).default([]),
  notes: z.string().default(''),
});

// ---------- Title & Unit ----------
// Screen types, then print types (novel … reference). Medium is derived from the type (see model.ts MEDIUM_OF).
export const TitleType = z.enum(['film', 'series', 'one-shot', 'special', 'animated-series', 'animated-film', 're-edit', 'motion-comic', 'crossover-event', 'novel', 'novella', 'short-story', 'anthology', 'comic', 'graphic-novel', 'reference', 'radio-drama', 'audio-drama', 'podcast', 'stage-play', 'musical', 'live-show', 'video-game', 'expansion']);
export const CanonTier = z.enum(['core', 'outside-set-date', 'multiverse-variant', 'adjacent', 'non-placeable']);
export const Status = z.enum(['released', 'upcoming', 'cancelled', 'in-production']);
export const Precision = z.enum(['exact', 'year', 'approx', 'range', 'relative']);
export const Confidence = z.enum(['stated', 'inferred', 'disputed']);

export const InUniverse = z.object({
  start: PartialDate.nullable(),
  end: PartialDate.nullable(),
  label: z.string(), // human label, e.g. "1943–1945", "Spring 2014", "No fixed point"
  precision: Precision,
  confidence: Confidence,
  note: z.string().default(''),
  /** Position within the continuity. Always present; unique per continuity. Drives in-universe order. */
  order_index: z.number(),
  /** For precision "relative": anchors by unit id. */
  relative_to: z.object({ after: z.string().nullable(), before: z.string().nullable() }).nullable().default(null),
});

/** A money figure as a source states it (film budget or box office). A range keeps both ends; never collapsed. */
export const Money = z.object({
  low: z.number(),
  high: z.number().nullable().default(null), // set only for a stated range ("$150–200 million")
  currency: z.string().regex(/^[A-Z]{3}$/), // ISO 4217
  text: z.string(), // as the source words it
  scope: z.enum(['worldwide', 'domestic', 'other']),
  source_url: url,
});

export const EpisodeRef = z.object({ season: z.number().int().min(0), episode: z.number().int().min(1) });

export const Unit = z.object({
  id: slug,
  label: z.string(), // e.g. "Film", "Season 1", "Season 1, ep. 1"
  season: z.number().int().nullable().default(null),
  episode_range: z.object({ from: EpisodeRef, to: EpisodeRef }).nullable().default(null),
  episode_count: z.number().int().nullable().default(null),
  runtime_min: z.number().nullable().default(null),
  pages: z.number().int().nullable().default(null), // print: first-edition page count
  word_count: z.number().int().nullable().default(null),
  /** Source of word_count, shown as a numbered citation next to it. */
  word_count_source: url.nullable().default(null),
  /** Films (R-56): runtime citation, budget and box office, each cited. */
  film_stats: z.object({ runtime_source: url.nullable(), budget: Money.nullable(), box_office: Money.nullable() }).nullish(), // optional, so unit literals elsewhere need not name it
  timeline_branch: slug,
  canon_tier: CanonTier.nullable().default(null), // null = inherit title's
  in_universe: InUniverse,
  release: z.object({
    date: isoDate.nullable(), // first release (original platform); partial allowed for upcoming
    end_date: isoDate.nullable().default(null), // last episode of a season
    year: z.number().int().nullable(),
    note: z.string().default(''),
  }),
  status: Status,
  groupings: z.record(z.string(), slug.nullable()).default({}),
  platform_or_network: slug.nullable().default(null), // null = inherit
  /** Games (R-52): earliest release on each platform (registry: platforms), from the cited Wikipedia infobox revision. */
  platform_releases: z.array(z.object({ platform: slug, date: isoDate, region: z.string().nullable().default(null), source_url: url })).optional(), // absent = none
  /** How this unit is named in each tracked source (drift detection). e.g. {"mcu-timeline-diagram": "Iron Man"} */
  source_keys: z.record(z.string(), z.string()).default({}),
  source_urls: z.array(url).default([]),
  notes: z.string().default(''),
  /** TV: viewers per episode and season average (R-56), from Wikipedia episode tables. Absent/null = no figures. */
  viewership: z.object({
    measure: z.string(), // the source's column wording, e.g. "U.S. viewers (millions)"
    country: z.string().nullable(),
    episodes: z.array(z.object({ n: z.number().int(), title: z.string(), date: isoDate.nullable(), millions: z.number().nullable() })),
    season_average: z.number().nullable(),
    season_average_kind: z.enum(['stated', 'computed']).nullable(), // computed = mean of the episode figures
    source_url: url,
    average_source_url: url.nullable().default(null), // when the stated average comes from another page
    note: z.string().default(''),
  }).nullable().optional(), // optional, not default(null): older migrations build Unit literals without it
});

// 'adapts': this title adapts the linked one (e.g. a TV season adapts a novel). Adaptations stay separate continuities.
export const LinkKind = z.enum(['sequel', 'continues', 'spinoff', 'crossover', 'cameo', 'feeds-into', 'remake', 'shares-characters', 'adapts', 're-edit-of', 'ignores', 'reboot-of', 'references']);
export const CreditRole = z.enum(['author', 'creator', 'director', 'writer', 'producer', 'executive-producer', 'composer', 'cast']);
export const Credit = z.object({
  role: CreditRole,
  name: z.string(),
  qid: z.string().regex(/^Q\d+$/).nullable().default(null), // Wikidata person id (stable key for the People filter)
  character: z.string().nullable().default(null), // cast only
  /** Wikidata id of the character, when Wikidata links one: lets the same character be found across titles. */
  character_qid: z.string().regex(/^Q\d+$/).nullable().default(null),
  /** Cast only: Wikidata marks the appearance as a cameo ("subject has role: cameo appearance"). */
  cameo: z.boolean().default(false),
  /** Where the cameo flag comes from: a Wikipedia revision or a fan-wiki page revision (shown as a citation). */
  cameo_source: url.nullable().default(null),
});
export const TitleLink = z.object({ to: slug, kind: LinkKind, note: z.string().default('') });

export const Title = z.object({
  id: slug,
  title: z.string(),
  sort_title: z.string().nullable().default(null),
  type: TitleType,
  universe: slug,
  continuity: slug,
  studio_brand: slug, // registry: studios
  label: slug.nullable().default(null), // registry: studios (kind=label), e.g. Marvel Spotlight
  platform_or_network: slug, // registry: platforms (original release)
  canon_tier: CanonTier,
  characters: z.array(slug).default([]),
  franchises: z.array(slug).default([]),
  status: Status, // roll-up of units
  external_ids: z.object({
    enwiki: z.string().nullable().default(null), // English Wikipedia article title
    wikidata: z.string().regex(/^Q\d+$/).nullable().default(null),
    tmdb: z.string().nullable().default(null),
    imdb: z.string().nullable().default(null),
  }).default({ enwiki: null, wikidata: null, tmdb: null, imdb: null }),
  source_urls: z.array(url).min(1),
  notes: z.string().default(''),
  units: z.array(Unit).min(1),
  links: z.array(TitleLink).default([]),
  /** Cast and crew from Wikidata (D-29). Cast is in Wikidata's statement order (usually billing order). */
  credits: z.array(Credit).default([]),
  /** crossover-event only: parts owned by other titles. Either a unit id (whole unit) or
   *  "<unit id>#e<episode>" for one episode inside a season unit (e.g. "arrow-s8#e8"). */
  constituents: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*(#e\d+)?$/)).default([]),
});

export const UniversesFile = z.array(Universe);
export const ContinuitiesFile = z.array(Continuity);
export const TitlesFile = z.array(Title);
export const TagsFile = z.array(Tag);
export const StudiosFile = z.array(Studio);
export const PlatformsFile = z.array(Platform);
// ---------- Maps (optional data/<universe>/maps.json) ----------
const nonEmpty = z.string().trim().min(1);
export const MapCredit = z.object({
  title: nonEmpty, // the source file's title, e.g. "File:World of One Piece.svg"; for 'osm' maps the data source
  author: nonEmpty,
  licence: nonEmpty,
  licence_url: url,
  source_url: url, // the file page (or data source) the licence was read from
  modified: z.boolean(), // true when the image was altered from the source file
  fan_made: z.boolean(),
  /** No licence: shown with credit as a fan work and taken down if the author asks (decision R-70). */
  removal_on_request: z.boolean().default(false),
  note: z.string().default(''),
});
export const MapPlace = z.object({
  id: slug,
  name: nonEmpty,
  /** image maps: pixel coordinates in the source image (x right, y down). */
  x: z.number().optional(),
  y: z.number().optional(),
  /** osm maps: WGS84 coordinates. */
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  /** galaxy maps: the source's grid square (e.g. "L-9") and/or region id from the map's `galaxy.regions`. */
  grid: z.string().regex(/^[A-Z]+-\d+$/).optional(),
  region: slug.optional(),
  title_ids: z.array(slug).default([]),
  note: z.string().default(''),
  source_url: url,
  confidence: Confidence,
}).refine((p) => [p.x !== undefined && p.y !== undefined, p.lat !== undefined && p.lng !== undefined, p.grid !== undefined || p.region !== undefined].filter(Boolean).length === 1,
  'a place needs exactly one of x+y (image map), lat+lng (osm map) or grid/region (galaxy map)');
/** A galaxy (or any space setting) drawn by the app from data: a lettered grid as the source gives it, and/or
 *  regions as concentric rings (innermost first, `r` = outer radius as a share of the galaxy's radius). */
export const GalaxyLayout = z.object({
  grid: z.object({ cols: z.array(z.string().regex(/^[A-Z]+$/)).min(1), rows: z.number().int().positive() }).optional(),
  regions: z.array(z.object({ id: slug, label: nonEmpty, r: z.number().gt(0).max(1) })).default([]),
  /** what the drawing means and what it does not (e.g. "positions inside a grid square are not meaningful") */
  note: nonEmpty,
}).refine((g) => g.grid || g.regions.length, 'a galaxy layout needs a grid or regions');
export const WorldMap = z.object({
  id: slug,
  universe: slug,
  title: nonEmpty,
  /** Atlas section heading (e.g. "Regions of Westeros"); maps keep file order within a group. */
  group: z.string().default(''),
  /** Short caption, e.g. the period a historical map shows (from the source). */
  description: z.string().default(''),
  kind: z.enum(['image', 'osm', 'galaxy']),
  /** null = the map covers the whole universe. */
  continuity: slug.nullable().default(null),
  image: z.object({
    path: z.string().regex(/^maps\/[a-z0-9-]+\/([a-z0-9._-]+\/)?[a-z0-9._-]+\.(svg|png|jpe?g|webp)$/, 'path under public/maps/<universe>/'),
    width: z.number().int().positive(), height: z.number().int().positive(),
    /** Large images: zoom tiles at <path's folder>/{z}/{y}/{x}.webp (deepest level = full size); `path` is a small preview. */
    tiles: z.object({ max_zoom: z.number().int().min(0).max(10) }).optional(),
  }).optional(),
  galaxy: GalaxyLayout.optional(),
  credit: MapCredit,
  places: z.array(MapPlace).default([]),
}).refine((m) => (m.kind === 'image') === !!m.image, 'image maps need image; other maps must not have one')
  .refine((m) => (m.kind === 'galaxy') === !!m.galaxy, 'galaxy maps need galaxy; other maps must not have one');
export const MapsFile = z.array(WorldMap);

/** old unit id -> replacement unit ids (watched-state migration). */
export const AliasesFile = z.record(z.string(), z.array(z.string()));

export type Universe = z.infer<typeof Universe>;
export type Continuity = z.infer<typeof Continuity>;
export type AltOrder = z.infer<typeof AltOrder>;
export type Branch = z.infer<typeof Branch>;
export type Title = z.infer<typeof Title>;
export type Unit = z.infer<typeof Unit>;
export type PartialDate = z.infer<typeof PartialDate>;
export type InUniverse = z.infer<typeof InUniverse>;
export type Studio = z.infer<typeof Studio>;
export type Platform = z.infer<typeof Platform>;
export type Tag = z.infer<typeof Tag>;
export type CanonTier = z.infer<typeof CanonTier>;
export type TitleType = z.infer<typeof TitleType>;
export type Money = z.infer<typeof Money>;
export type Status = z.infer<typeof Status>;
export type Credit = z.infer<typeof Credit>;
export type CreditRole = z.infer<typeof CreditRole>;
export type WorldMap = z.infer<typeof WorldMap>;
export type MapPlace = z.infer<typeof MapPlace>;
export type MapCredit = z.infer<typeof MapCredit>;
