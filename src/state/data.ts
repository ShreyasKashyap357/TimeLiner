// Browser data loading. The universe index and registries load eagerly; each universe's data
// folder is a separate lazy chunk (scales to many universes). Adding a universe = adding data.
import { ContinuitiesFile, PlatformsFile, StudiosFile, TagsFile, TitlesFile, UniversesFile, AliasesFile } from '@/domain/schema';
import type { Dataset } from '@/domain/model';
import universesRaw from '../../data/universes.json';
import studiosRaw from '../../data/registry/studios.json';
import platformsRaw from '../../data/registry/platforms.json';

const chunks = import.meta.glob<{ default: unknown }>('../../data/*/{continuities,titles,tags,aliases}.json');

export const universes = UniversesFile.parse(universesRaw);
export const studios = StudiosFile.parse(studiosRaw);
export const platforms = PlatformsFile.parse(platformsRaw);

async function loadPart(dir: string, name: string): Promise<unknown> {
  const key = `../../data/${dir}/${name}.json`;
  const loader = chunks[key];
  if (!loader) return name === 'aliases' ? {} : [];
  return (await loader()).default;
}

const cache = new Map<string, Promise<Omit<Dataset, 'universes' | 'studios' | 'platforms'>>>();
function loadUniverse(id: string) {
  const u = universes.find((x) => x.id === id);
  if (!u) return Promise.resolve({ continuities: [], titles: [], tags: [], aliases: {} });
  if (!cache.has(id)) {
    cache.set(id, (async () => {
      const [c, t, g, a] = await Promise.all(['continuities', 'titles', 'tags', 'aliases'].map((n) => loadPart(u.data_dir, n)));
      return { continuities: ContinuitiesFile.parse(c), titles: TitlesFile.parse(t), tags: TagsFile.parse(g), aliases: AliasesFile.parse(a) };
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
