// "Watched" tracking in localStorage, with export/import and alias migration.
import { useCallback, useEffect, useMemo, useState } from 'react';

export const STORAGE_KEY = 'timeliner.watched.v1';
export interface WatchedFile { app: 'timeliner'; version: 1; exported_at?: string; watched: Record<string, string> }

/** Apply alias map (old unit id -> replacement ids). Unknown ids are kept, never dropped. */
export function migrate(watched: Record<string, string>, aliases: Record<string, string[]>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [id, at] of Object.entries(watched)) {
    const targets = aliases[id];
    if (targets) for (const t of targets) out[t] ??= at;
    else out[id] = at;
  }
  return out;
}

export function parseImport(text: string): Record<string, string> {
  const j = JSON.parse(text);
  if (!j || typeof j !== 'object') throw new Error('Not a JSON object');
  const w = j.watched ?? j; // accept bare maps too
  if (typeof w !== 'object' || Array.isArray(w)) throw new Error('Missing "watched" map');
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(w)) {
    if (!/^[a-z0-9-]+$/.test(k)) continue;
    out[k] = typeof v === 'string' ? v : new Date().toISOString();
  }
  return out;
}

function load(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return parseImport(raw);
  } catch {
    return {};
  }
}
function save(w: Record<string, string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ app: 'timeliner', version: 1, watched: w } satisfies WatchedFile));
  } catch {
    /* storage unavailable (private mode): keep in memory only */
  }
}

export function useWatched(aliases: Record<string, string[]>) {
  const [map, setMap] = useState<Record<string, string>>(() => migrate(load(), aliases));
  useEffect(() => { save(map); }, [map]);
  useEffect(() => {
    const onStorage = (e: StorageEvent) => { if (e.key === STORAGE_KEY) setMap(migrate(load(), aliases)); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [aliases]);
  const set = useMemo(() => new Set(Object.keys(map)), [map]);
  const toggle = useCallback((id: string, on?: boolean) => setMap((m) => {
    const next = { ...m };
    const want = on ?? !next[id];
    if (want) next[id] = new Date().toISOString(); else delete next[id];
    return next;
  }), []);
  const setMany = useCallback((ids: string[], on: boolean) => setMap((m) => {
    const next = { ...m };
    for (const id of ids) { if (on) next[id] ??= new Date().toISOString(); else delete next[id]; }
    return next;
  }), []);
  const exportJson = useCallback(() => JSON.stringify({ app: 'timeliner', version: 1, exported_at: new Date().toISOString(), watched: map } satisfies WatchedFile, null, 2), [map]);
  const importJson = useCallback((text: string, mode: 'merge' | 'replace') => {
    const incoming = migrate(parseImport(text), aliases);
    setMap((m) => (mode === 'replace' ? incoming : { ...m, ...incoming }));
    return Object.keys(incoming).length;
  }, [aliases]);
  const clear = useCallback(() => setMap({}), []);
  return { set, map, toggle, setMany, exportJson, importJson, clear };
}
