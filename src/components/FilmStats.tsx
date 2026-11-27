// Film budget and box office for the detail drawer (R-56), each with a numbered citation. Runtime stays on the
// drawer's Type line (formatted with formatRuntime) and is cited there. Units without figures render nothing.
import type { ReactNode } from 'react';
import type { Money, Unit } from '@/domain/schema';
import { formatMoney, scopeLabel } from '@/domain/money';
export { formatRuntime } from '@/domain/money';
import { Tip } from './Tip';

/** Source URLs the film stats cite, for the drawer's numbered source list. */
export const filmStatSources = (u: Unit): string[] =>
  [u.film_stats?.runtime_source, u.film_stats?.budget?.source_url, u.film_stats?.box_office?.source_url].filter((s): s is string => !!s);

function Amount({ m, extra, cite }: { m: Money; extra?: string; cite: (url: string | null) => ReactNode }) {
  const wd = m.source_url.includes('wikidata.org');
  // Wikidata stores a bare number: show it in full; Wikipedia's figure is shown as its infobox words it.
  const full = (n: number) => { try { return new Intl.NumberFormat('en-US', { style: 'currency', currency: m.currency, maximumFractionDigits: 0 }).format(n); } catch { return `${n} ${m.currency}`; } };
  const said = wd ? `Wikidata: ${full(m.low)}${m.high ? ` to ${full(m.high)}` : ''}` : `Wikipedia: ${m.text}`;
  return (
    <>
      <Tip content={<span className="flex flex-col gap-0.5">{extra && <span>{extra}</span>}<span>{said}</span></span>}>
        <span tabIndex={0} className="underline decoration-dotted underline-offset-2">{formatMoney(m)}</span>
      </Tip>
      {cite(m.source_url)}
    </>
  );
}

function Row({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-0.5 py-1.5 text-sm sm:grid-cols-[9rem_1fr] sm:gap-2">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="min-w-0 [overflow-wrap:anywhere]">{children}</dd>
    </div>
  );
}

export function FilmStats({ unit, cite }: { unit: Unit; cite: (url: string | null) => ReactNode }) {
  const s = unit.film_stats;
  if (!s || (!s.budget && !s.box_office)) return null;
  return (
    <>
      {s.budget && <Row k="Budget"><Amount m={s.budget} extra="Not adjusted for inflation." cite={cite} /></Row>}
      {s.box_office && <Row k="Box office"><Amount m={s.box_office} extra={`${scopeLabel(s.box_office.scope)}, not adjusted for inflation.`} cite={cite} /></Row>}
    </>
  );
}
