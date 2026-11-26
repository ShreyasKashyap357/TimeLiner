// Browser data loading. The universe index and registries load eagerly; each universe's data
// folder is a separate lazy chunk (scales to many universes). Adding a universe = adding data.
//
// Validation (D-4): the data is validated against the Zod schema in CI (`npm run verify` and the
// unit tests), so production builds skip runtime validation and Zod stays out of the bundle.
// In `npm run dev` every file is still parsed, so a bad edit fails loudly while developing.
import type { Continuity, Platform, Studio, Tag, Title, Universe } from '@/domain/schema';
import type { Dataset } from '@/domain/model';
import universesRaw from '../../data/universes.json';
import studiosRaw from '../../data/registry/studios.json';
import platformsRaw from '../../data/registry/platforms.json';

const chunks = import.meta.glob<{ default: unknown }>('../../data/*/{continuities,titles,tags,aliases}.json');

export const universes = universesRaw as unknown as Universe[];
export const studios = studiosRaw as unknown as Studio[];
export const platforms = platformsRaw as unknown as Platform[];

type Parsed = { continuities: Continuity[]; titles: Title[]; tags: Tag[]; aliases: Record<string, string[]> };

/** Dev only: parse with the schema. `import.meta.env.DEV` is false in builds, so this import is dropped. */
async function validate(p: Parsed): Promise<Parsed> {
  if (!import.meta.env.DEV) return p;
  const s = await import('@/domain/schema');
  s.UniversesFile.parse(universesRaw); s.StudiosFile.parse(studiosRaw); s.PlatformsFile.parse(platformsRaw);
  return { continuities: s.ContinuitiesFile.parse(p.continuities), titles: s.TitlesFile.parse(p.titles), tags: s.TagsFile.parse(p.tags), aliases: s.AliasesFile.parse(p.aliases) };
}

async function loadPart(dir: string, name: string): Promise<unknown> {
  const key = `../../data/${dir}/${name}.json`;
  const loader = chunks[key];
  if (!loader) return name === 'aliases' ? {} : [];
  return (await loader()).default;
}

const cache = new Map<string, Promise<Parsed>>();
function loadUniverse(id: string): Promise<Parsed> {
  const u = universes.find((x) => x.id === id);
  if (!u) return Promise.resolve({ continuities: [], titles: [], tags: [], aliases: {} });
  if (!cache.has(id)) {
    cache.set(id, (async () => {
      const [c, t, g, a] = await Promise.all(['continuities', 'titles', 'tags', 'aliases'].map((n) => loadPart(u.data_dir, n)));
      return validate({ continuities: c as Continuity[], titles: t as Title[], tags: g as Tag[], aliases: a as Record<string, string[]> });
    })());
  }
  return cache.get(id)!;
}

/** Load the given universes (or all enabled ones) into one Dataset. */
export async function loadDataset(ids: string[] = universes.filter((u) => u.enabled).map((u) => u.id)): Promise<Dataset> {
  const parts = await Promise.all(ids.map(loadUniverse));
  return {
    universes: universes.filter((u) => ids.includes(u.id)),
    studios, platforms,
    continuities: parts.flatMap((p) => p.continuities),
    titles: parts.flatMap((p) => p.titles),
    tags: parts.flatMap((p) => p.tags),
    aliases: Object.assign({}, ...parts.map((p) => p.aliases)),
  };
}
