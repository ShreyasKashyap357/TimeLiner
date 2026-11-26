import { createContext, useContext } from 'react';
import type { Dataset, Row } from '@/domain/model';
import type { FilterState } from '@/domain/filters';
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
}

export const Ctx = createContext<AppCtx | null>(null);
export function useApp(): AppCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error('useApp outside provider');
  return c;
}
