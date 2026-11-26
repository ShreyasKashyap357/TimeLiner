import { useApp } from './context';

export function Footer() {
  const { ds } = useApp();
  const verified = ds.universes.map((u) => u.last_verified).filter(Boolean).sort().at(-1);
  const repo = 'https://github.com/ShreyasKashyap357/TimeLiner';
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl space-y-2 px-4 py-6 text-xs leading-relaxed text-muted-foreground">
        <p>
          <strong className="text-foreground">Sources:</strong> English Wikipedia (MCU timeline, film and television lists, phase pages, series articles),
          Wikidata, and the Marvel Cinematic Universe Wiki on Fandom (only for adjacent-tier series dating).
          Full list with revision ids: <a className="underline" href={`${repo}/blob/main/data/sources/manifest.json`}>data/sources/manifest.json</a>.
          Judgement calls: <a className="underline" href={`${repo}/blob/main/data/DATA_NOTES.md`}>DATA_NOTES.md</a>.
          {verified && <> Last verified <time dateTime={verified}>{verified}</time>.</>}
        </p>
        <p>
          Text and data derived from Wikipedia are available under the{' '}
          <a className="underline" href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 License</a>;
          Fandom content under CC BY-SA 3.0; Wikidata under CC0. TimeLiner&apos;s data is released under CC BY-SA 4.0 and its code under the MIT License.
        </p>
        <p>
          <strong className="text-foreground">TimeLiner is an unofficial fan project</strong> and is not affiliated with, endorsed by, or sponsored by Marvel, Disney, DC, or Warner Bros. Discovery.
          All titles and characters are trademarks of their respective owners. No posters, logos or other artwork are used.
        </p>
        <p><a className="underline" href={repo}>Source code on GitHub</a></p>
      </div>
    </footer>
  );
}
