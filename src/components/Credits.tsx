import { useState } from 'react';
import { useApp } from '@/app/context';
import type { Credit, CreditRole } from '@/domain/schema';

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
    ? <button type="button" className="underline decoration-dotted underline-offset-2 hover:decoration-solid" onClick={() => update({ people: [c.qid!], unit: null }, true)} title={`Show everything with ${c.name}`}>{c.name}</button>
    : <span>{c.name}</span>;
  const cast = credits.filter((c) => c.role === 'cast');
  const shownCast = allCast ? cast : cast.slice(0, 6);
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
          <ul className="space-y-0.5">
            {shownCast.map((c) => <li key={c.qid ?? c.name} className="[overflow-wrap:anywhere]">{person(c)}{c.character && <span className="text-muted-foreground"> as {c.character}</span>}</li>)}
          </ul>
          {cast.length > 6 && <button type="button" className="mt-1 text-xs underline" onClick={() => setAllCast((v) => !v)}>{allCast ? 'Show fewer' : `Show all ${cast.length}`}</button>}
        </div>
      )}
      <p className="text-xs text-muted-foreground">From Wikidata. Cast follows Wikidata&apos;s listing order (usually billing order); at most 10 are listed.</p>
    </div>
  );
}
