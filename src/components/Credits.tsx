import { useState } from 'react';
import { useApp } from '@/app/context';
import type { Credit, CreditRole } from '@/domain/schema';
import { Tip } from './Tip';

const ROLE_LABEL: Record<CreditRole, string> = {
  author: 'Written by', creator: 'Created by', director: 'Directed by', writer: 'Screenplay', producer: 'Producers',
  'executive-producer': 'Executive producers', composer: 'Music', cast: 'Cast',
};
const CREW: CreditRole[] = ['author', 'creator', 'director', 'writer', 'producer', 'executive-producer', 'composer'];

/** Cast & crew list for the detail panel. Each name filters the site to that person's titles. */
export function Credits({ credits }: { credits: Credit[] }) {
  const { update } = useApp();
  const [allCast, setAllCast] = useState(false);
  const person = (c: Credit) => c.qid
    ? <Tip content={`Show every appearance of ${c.name}, across all universes`}><button type="button" className="underline decoration-dotted underline-offset-2 hover:decoration-solid" onClick={() => update({ people: [c.qid!], u: "all", xu: [], view: "spine", unit: null }, true)}>{c.name}</button></Tip>
    : c.name ? <span>{c.name}</span> : <span className="italic text-muted-foreground">actor not listed</span>;
  /** Citation for a cameo flag: which source marked it (Wikipedia text or a fan wiki's {{Cameo}} marker). */
  const cameoCite = (c: Credit) => {
    if (!c.cameo || !c.cameo_source) return null;
    const host = new URL(c.cameo_source).hostname.replace(/^www\./, '');
    const fan = host.endsWith('fandom.com');
    return (
      <Tip content={fan ? `Marked as a cameo on the fan wiki ${host} (page revision linked)` : 'Named as a cameo in the Wikipedia article (revision linked)'}>
        <a href={c.cameo_source} target="_blank" rel="noreferrer noopener" className="ml-1 align-super text-[0.65rem] text-primary underline">[{fan ? `${host.split('.')[0]} fan wiki` : 'Wikipedia'}]</a>
      </Tip>
    );
  };
  // Cast with a named character first (in Wikidata's billing order), then the rest (user request).
  const byCharacter = (list: Credit[]) => [...list.filter((c) => c.character), ...list.filter((c) => !c.character)];
  const cast = byCharacter(credits.filter((c) => c.role === 'cast' && !c.cameo));
  const cameos = byCharacter(credits.filter((c) => c.role === 'cast' && c.cameo));
  const shownCast = allCast ? cast : cast.slice(0, 12);
  const castLine = (c: Credit) => <li key={(c.qid ?? c.name) + (c.character ?? '')} className="[overflow-wrap:anywhere]">{person(c)}{c.character && <span className="text-muted-foreground"> as {c.character}</span>}{cameoCite(c)}</li>;
  return (
    <div className="space-y-3 text-sm">
      <dl className="grid grid-cols-[minmax(7rem,auto)_1fr] gap-x-3 gap-y-1.5">
        {CREW.map((role) => {
          const ps = credits.filter((c) => c.role === role);
          if (!ps.length) return null;
          return [
            <dt key={`${role}-t`} className="text-muted-foreground">{ROLE_LABEL[role]}</dt>,
            <dd key={`${role}-d`} className="[overflow-wrap:anywhere]">{ps.map((c, i) => <span key={c.qid ?? c.name}>{i > 0 && ', '}{person(c)}</span>)}</dd>,
          ];
        })}
      </dl>
      {cast.length > 0 && (
        <div>
          <h4 className="mb-1 text-muted-foreground">Cast</h4>
          <ul className="space-y-0.5">{shownCast.map(castLine)}</ul>
          {cast.length > 12 && <button type="button" className="mt-1 text-xs underline" onClick={() => setAllCast((v) => !v)}>{allCast ? 'Show fewer' : `Show all ${cast.length}`}</button>}
        </div>
      )}
      {cameos.length > 0 && (
        <div>
          <h4 className="mb-1 text-muted-foreground">Cameos</h4>
          <ul className="space-y-0.5">{cameos.map(castLine)}</ul>
        </div>
      )}
      <p className="text-xs text-muted-foreground">From Wikidata. Cast follows Wikidata&apos;s listing order (usually billing order). Cameos are the appearances Wikidata marks as cameos.</p>
    </div>
  );
}
