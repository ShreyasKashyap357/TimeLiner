// Display labels for internal enum values (type, canon tier). UI must never show the raw ids.
export const TIER_TEXT: Record<string, { label: string; help: string }> = {
  core: { label: 'Core', help: 'On the main line of its continuity' },
  'outside-set-date': { label: 'Other branch, set date', help: 'Another reality/branch placed at a set time' },
  'multiverse-variant': { label: 'Multiverse variant', help: 'Variant reality' },
  adjacent: { label: 'Adjacent', help: 'Linked to the continuity but canon status is ambiguous' },
  'non-placeable': { label: 'Non-placeable', help: 'No fixed point in the timeline' },
};

export const TYPE_TEXT: Record<string, string> = {
  film: 'Film', series: 'Series', 'one-shot': 'One-Shot', special: 'Special', 'animated-series': 'Animated series', 'animated-film': 'Animated film', 're-edit': 'Re-edit (US version)', 'motion-comic': 'Motion comic', 'crossover-event': 'Crossover event', novel: 'Novel', novella: 'Novella', 'short-story': 'Short story', anthology: 'Anthology', comic: 'Comic', 'graphic-novel': 'Graphic novel', 'radio-drama': 'Radio drama', 'audio-drama': 'Audio drama', podcast: 'Podcast', 'stage-play': 'Stage play', musical: 'Musical', 'live-show': 'Live show', 'video-game': 'Video game', expansion: 'Game expansion / DLC', reference: 'Reference / lore book',
};

const humanize = (id: string) => id.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase());
export const typeText = (id: string): string => TYPE_TEXT[id] ?? humanize(id);
export const tierText = (id: string): string => TIER_TEXT[id]?.label ?? humanize(id);
