// Shown instead of the in-universe timeline when the results span more than one universe: in-universe order
// only exists inside one continuity, so a cross-universe list (one entry per title, by release) is shown instead.
import { useApp } from '@/app/context';
import type { Row } from '@/domain/model';
import type { Credit } from '@/domain/schema';
import { Tip } from '@/components/Tip';
import { Empty } from './SpineView';

interface Entry { titleId: string; first: Row; units: number; years: string; roles: string[] }

function byTitle(rows: Row[], rolesOf: (r: Row) => string[] = () => []): Entry[] {
  const m = new Map<string, Row[]>();
  for (const r of rows) m.set(r.title.id, [...(m.get(r.title.id) ?? []), r]);
  return [...m.values()].map((rs) => {
    const ys = rs.map((r) => r.unit.release.year).filter((y): y is number => y !== null);
    const lo = ys.length ? Math.min(...ys) : null, hi = ys.length ? Math.max(...ys) : null;
    return { titleId: rs[0]!.title.id, first: rs[0]!, units: rs.length, years: lo === null ? 'TBA' : lo === hi ? String(lo) : `${lo}–${hi}`, roles: rolesOf(rs[0]!) };
  }).sort((a, b) => a.first.releaseKey.localeCompare(b.first.releaseKey));
}

const castText = (c: Credit) => `${c.character ? `as ${c.character}` : 'cast'}${c.cameo ? ' (cameo)' : ''}`;
const ROLE: Record<string, string> = { author: 'author', creator: 'creator', director: 'director', writer: 'screenplay', producer: 'producer', 'executive-producer': 'executive producer', composer: 'music' };

function EntryList({ entries }: { entries: Entry[] }) {
  const { update } = useApp();
  return (
    <ol className="divide-y divide-border">
      {entries.map((e) => (
        <li key={e.titleId} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 py-1.5" data-unit={e.first.key}>
          <span className="w-20 shrink-0 font-mono text-xs text-muted-foreground">{e.years}</span>
          <button type="button" className="min-w-0 text-left text-sm font-medium hover:underline" onClick={() => update({ unit: e.first.key })}>
            {e.first.titleName}{e.units > 1 && <span className="font-normal text-muted-foreground"> · {e.units} parts</span>}
          </button>
          <Tip content={`${e.first.universe.name} · ${e.first.continuity.name}`}>
            <span className="inline-flex items-center gap-1 border border-border px-1 text-[0.7rem] text-muted-foreground">
              <span aria-hidden className="size-2 ring-1 ring-foreground/60" style={{ background: e.first.universe.accent.primary }} />
              {e.first.universe.short_name} · {e.first.continuity.short_name}
            </span>
          </Tip>
          {e.roles.length > 0 && <span className="text-sm text-muted-foreground">{e.roles.join('; ')}</span>}
        </li>
      ))}
    </ol>
  );
}

export function AppearancesView({ rows }: { rows: Row[] }) {
  const { state, label } = useApp();
  if (!rows.length) return <Empty />;
  const sections: { key: string; heading: string; entries: Entry[] }[] = [];
  for (const qid of state.people) {
    const rs = rows.filter((r) => r.title.credits.some((c) => c.qid === qid));
    sections.push({ key: `p-${qid}`, heading: label.person(qid), entries: byTitle(rs, (r) => r.title.credits.filter((c) => c.qid === qid).map((c) => (c.role === 'cast' ? castText(c) : ROLE[c.role]!))) });
  }
  for (const qid of state.chars) {
    const rs = rows.filter((r) => r.title.credits.some((c) => c.character_qid === qid));
    sections.push({ key: `c-${qid}`, heading: label.character(qid), entries: byTitle(rs, (r) => r.title.credits.filter((c) => c.character_qid === qid).map((c) => `played by ${c.name}${c.cameo ? ' (cameo)' : ''}`)) });
  }
  for (const id of state.tags) {
    sections.push({ key: `t-${id}`, heading: label.tag(id), entries: byTitle(rows.filter((r) => r.title.characters.includes(id) || r.title.franchises.includes(id))) });
  }
  if (!sections.length) {
    const unis = [...new Set(rows.map((r) => r.universe.id))];
    for (const u of unis) sections.push({ key: `u-${u}`, heading: rows.find((r) => r.universe.id === u)!.universe.name, entries: byTitle(rows.filter((r) => r.universe.id === u)) });
  }
  return (
    <div className="space-y-6">
      <p className="border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
        These results span more than one universe. In-universe order only exists within one continuity, so this is a
        list of appearances by release date (one line per title). Pick a single universe to see its timeline.
      </p>
      {sections.map((s) => (
        <section key={s.key} aria-label={s.heading} className="border border-border bg-card p-4">
          <h2 className="font-heading mb-2 text-lg font-bold" style={{ color: 'var(--u-primary)' }}>{s.heading} <span className="text-sm font-normal text-muted-foreground">({s.entries.length} titles)</span></h2>
          {s.entries.length ? <EntryList entries={s.entries} /> : <p className="text-sm text-muted-foreground">No titles under the current filters.</p>}
        </section>
      ))}
    </div>
  );
}
