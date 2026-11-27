import type { ReactNode } from 'react';
import { useApp } from '@/app/context';
import { formatRelease } from '@/domain/dates';
import type { Unit } from '@/domain/schema';
import { Separator } from '@/components/ui/separator';

type PlatformRelease = NonNullable<Unit['platform_releases']>[number];

/** Wikipedia's {{Video game release}} region codes, spelled out. Unknown codes are shown as written. */
const REGIONS: Record<string, string> = {
  NA: 'North America', EU: 'Europe', JP: 'Japan', AU: 'Australia', AUS: 'Australia', NZ: 'New Zealand',
  PAL: 'PAL regions', WW: 'Worldwide', INT: 'International', UK: 'United Kingdom', KO: 'South Korea', KOR: 'South Korea',
  AS: 'Asia', CN: 'China', BR: 'Brazil', RU: 'Russia', DE: 'Germany', FR: 'France',
};
export const regionName = (r: string) => r.split('/').map((c) => REGIONS[c.trim().toUpperCase()] ?? c.trim()).join(', ');

/** "Releases by platform" for games (R-52): earliest date per platform, platforms released together on one line. */
export function PlatformReleases({ releases, cite }: { releases: PlatformRelease[]; cite: (url: string | null) => ReactNode }) {
  const { label } = useApp();
  if (!releases.length) return null;
  const groups: { date: string; region: string | null; source_url: string; platforms: string[] }[] = [];
  for (const r of releases) {
    const g = groups.find((x) => x.date === r.date && x.region === r.region && x.source_url === r.source_url);
    if (g) g.platforms.push(r.platform);
    else groups.push({ date: r.date, region: r.region, source_url: r.source_url, platforms: [r.platform] });
  }
  return (
    <section className="space-y-1.5">
      <Separator className="my-3" />
      <h3 className="text-sm font-semibold">Releases by platform</h3>
      <ul className="space-y-1 text-sm">
        {groups.map((g) => (
          <li key={`${g.date}-${g.region}-${g.platforms.join()}`} className="flex flex-wrap items-baseline gap-x-2 [overflow-wrap:anywhere]">
            <span className="font-medium">{g.platforms.map((p) => label.platform(p)).join(', ')}</span>
            <span className="tabular-nums text-muted-foreground">
              {formatRelease(g.date)}
              {g.region && ` · ${regionName(g.region)}`}
              {cite(g.source_url)}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground">Earliest release on each platform, as listed in the cited Wikipedia infobox.</p>
    </section>
  );
}
