// Small per-browser preferences (not shareable state, so not in the URL).
import { useCallback, useState } from 'react';

const KEY = 'timeliner.prefs.v1';
interface Prefs { spoilerSafe: boolean }
const DEFAULTS: Prefs = { spoilerSafe: false };

function load(): Prefs {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') }; } catch { return DEFAULTS; }
}

export function usePrefs() {
  const [prefs, setPrefs] = useState<Prefs>(load);
  const set = useCallback((patch: Partial<Prefs>) => setPrefs((p) => {
    const next = { ...p, ...patch };
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
    return next;
  }), []);
  return [prefs, set] as const;
}
