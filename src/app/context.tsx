import { createContext, useContext } from 'react';
import type { Dataset, Row } from '@/domain/model';
import type { FilterState } from '@/domain/filters';
import type { AltOrder } from '@/domain/schema';
import type { useWatched } from '@/state/watched';

export interface AppCtx {
  ds: Dataset;
  rows: Row[]; // all rows of loaded universes
  state: FilterState;
  update: (patch: Partial<FilterState>, push?: boolean) => void;
  watched: ReturnType<typeof useWatched>;
  label: {
    studio: (id: string) => string;
    studioShort: (id: string) => string;
    platform: (id: string) => string;
    tag: (id: string) => string;
    grouping: (id: string) => string;
  };
  altOrder: string[] | undefined;
  /** The selected alternate order (kind, optional units, sources). */
  alt: AltOrder | undefined;
  /** Rows of the current view in display order (for prev/next and what's next). */
  ordered: Row[];
  /** Spoiler-safe mode: hide notes for anything not yet marked done. */
  spoilerSafe: boolean;
  setSpoilerSafe: (v: boolean) => void;
}

export const Ctx = createContext<AppCtx | null>(null);
export function useApp(): AppCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error('useApp outside provider');
  return c;
}
