// Filter/view state lives in the URL query string so every view is shareable.
import { useCallback, useEffect, useRef, useState } from 'react';
import { fromQuery, toQuery, type FilterState } from '@/domain/filters';

export function useUrlState(fallbackUniverse: string, fallbackContinuity: string | null) {
  const [state, setState] = useState<FilterState>(() => fromQuery(window.location.search, fallbackUniverse, fallbackContinuity));
  const current = useRef(state);
  current.current = state;

  useEffect(() => {
    const onPop = () => setState(fromQuery(window.location.search, fallbackUniverse, fallbackContinuity));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [fallbackUniverse, fallbackContinuity]);

  /** push: create a history entry (view/universe changes); otherwise replace (typing, toggles).
   *  History is written here, never inside a state updater (React may run updaters twice). */
  const update = useCallback((patch: Partial<FilterState>, push = false) => {
    const next = { ...current.current, ...patch };
    current.current = next;
    const url = `${window.location.pathname}?${toQuery(next)}${window.location.hash}`;
    const same = url === `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (push && !same) window.history.pushState(null, '', url);
    else window.history.replaceState(null, '', url);
    setState(next);
  }, []);

  return [state, update] as const;
}
