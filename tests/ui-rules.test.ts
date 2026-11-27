// UI rules that are cheap to check statically (see CLAUDE.md "UI text rules").
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const files = (dir: string): string[] => readdirSync(dir).flatMap((f) => {
  const p = path.join(dir, f);
  return statSync(p).isDirectory() ? (p.includes(`components${path.sep}ui`) ? [] : files(p)) : p.endsWith('.tsx') ? [p] : [];
});

describe('UI rules', () => {
  it('uses styled tooltips (<Tip>), never the browser-native title attribute', () => {
    const offenders = files('src').flatMap((f) => readFileSync(f, 'utf8').split('\n').map((l, i) => ({ f, i: i + 1, l })))
      // `title=` on an HTML element; component props named title (Section, Lane, dialogs) are fine.
      .filter(({ l }) => /<(?:[a-z][\w-]*|Badge|Button|Input)\b[^>]*\stitle=[{"]/.test(l));
    expect(offenders.map((o) => `${o.f}:${o.i}`)).toEqual([]);
  });
});
