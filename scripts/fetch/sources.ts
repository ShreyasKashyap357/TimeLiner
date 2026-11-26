// Canonical list of source pages per universe. Add a universe = add an entry here.
export interface SourceSpec { site: 'wikipedia' | 'fandom-mcu'; title: string; why: string; primary?: boolean }

export const SOURCES: Record<string, SourceSpec[]> = {
  marvel: [
    // Primary pages named in the brief
    { site: 'wikipedia', title: 'Marvel Cinematic Universe timeline', why: 'in-universe chronology', primary: true },
    { site: 'wikipedia', title: 'List of Marvel Cinematic Universe television series (Marvel Studios)', why: 'Marvel Studios series, seasons, release dates', primary: true },
    { site: 'wikipedia', title: 'Marvel Television', why: 'production library', primary: true },
    { site: 'wikipedia', title: 'List of Marvel Cinematic Universe television series (Marvel Television)', why: 'Marvel Television series', primary: true },
    { site: 'wikipedia', title: 'List of Marvel Cinematic Universe films', why: 'films, phases, sagas, release dates', primary: true },
    { site: 'wikipedia', title: 'X-Men (film series)', why: 'Fox X-Men films and timeline', primary: true },
    // Supplementary
    { site: 'wikipedia', title: 'Marvel One-Shots', why: 'one-shots' },
    { site: 'wikipedia', title: "Marvel's Special Presentations", why: 'special presentations' },
    { site: 'wikipedia', title: 'Marvel Animation', why: 'animation productions' },
    { site: 'wikipedia', title: 'Marvel Studios Animation', why: 'MCU animated series' },
    { site: 'wikipedia', title: 'Marvel Cinematic Universe', why: 'overview, phases, sagas' },
    { site: 'wikipedia', title: 'Marvel Cinematic Universe: Phase One', why: 'phase membership' },
    { site: 'wikipedia', title: 'Marvel Cinematic Universe: Phase Two', why: 'phase membership' },
    { site: 'wikipedia', title: 'Marvel Cinematic Universe: Phase Three', why: 'phase membership' },
    { site: 'wikipedia', title: 'Marvel Cinematic Universe: Phase Four', why: 'phase membership' },
    { site: 'wikipedia', title: 'Marvel Cinematic Universe: Phase Five', why: 'phase membership' },
    { site: 'wikipedia', title: 'Marvel Cinematic Universe: Phase Six', why: 'phase membership' },
    { site: 'wikipedia', title: "Sony's Spider-Man Universe", why: 'SSU films' },
    { site: 'wikipedia', title: 'Spider-Man in film', why: 'Raimi and Webb films' },
    { site: 'wikipedia', title: 'X-Men: The Animated Series', why: 'X-Men TAS' },
    { site: 'wikipedia', title: "X-Men '97", why: "X-Men '97" },
    { site: 'wikipedia', title: 'What If...? (TV series)', why: 'non-placeable animated' },
    { site: 'wikipedia', title: 'Eyes of Wakanda', why: 'episode-level dating' },
    { site: 'wikipedia', title: 'Marvel Zombies (TV series)', why: 'alternate reality placement' },
    { site: 'wikipedia', title: 'Your Friendly Neighborhood Spider-Man', why: 'outside Sacred Timeline' },
    { site: 'wikipedia', title: 'Werewolf by Night (TV special)', why: 'placement' },
    { site: 'wikipedia', title: 'VisionQuest', why: 'upcoming status/placement' },
    { site: 'wikipedia', title: 'Spider-Man: Brand New Day', why: 'release status' },
    { site: 'wikipedia', title: 'Avengers: Doomsday', why: 'release status' },
    { site: 'wikipedia', title: "Marvel's Netflix television series", why: 'Netflix seasons (transcluded into Marvel Television list)' },
    { site: 'wikipedia', title: "Marvel's ABC television series", why: 'ABC seasons (transcluded)' },
    { site: 'wikipedia', title: "Marvel's young adult television series", why: 'Hulu/Freeform seasons (transcluded)' },
    { site: 'wikipedia', title: 'Loki (TV series)', why: 'non-placeable placement' },
    { site: 'wikipedia', title: 'I Am Groot', why: 'episode split' },
    { site: 'wikipedia', title: 'Daredevil: Born Again', why: 'season 3 status, episode split' },
  ],
};
