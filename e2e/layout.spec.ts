// Layout + leak audit (user requests: every aspect ratio / mobile friendly, nothing cut short without a way
// to read it, no internal text leaking into the UI – D-7). Runs every view at four viewport shapes.
import { test, expect, type Page } from '@playwright/test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const VIEWPORTS = [
  { name: 'phone', width: 360, height: 740 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'short-laptop', width: 1366, height: 600 },
  { name: 'ultrawide', width: 2560, height: 1080 },
];
const VIEWS = ['spine', 'release', 'platform', 'studio', 'groupings', 'tags', 'continuities', 'dual', 'connections'];
const SHOTS = process.env.LAYOUT_SHOTS; // set to a directory to save screenshots for manual review

/** Text that must never reach the UI: internal keys, unformatted values, raw ids. */
const LEAKS: [string, RegExp][] = [
  ['undefined', /\bundefined\b/],
  ['[object Object]', /\[object Object\]/],
  ['NaN', /\bNaN\b/],
  ['episode constituent key', /\b[a-z0-9-]+#e\d+\b/],
  ['internal decision code', /\b[DR]-\d+\b/],
];

/** Every hyphenated title/unit id in the dataset. A leak is one of these appearing as a bare word in the UI
 *  (matching real ids, not a pattern, so ordinary words like "direct-to-video" are fine). */
const IDS = new Set<string>();
for (const dir of readdirSync('data')) {
  const f = `data/${dir}/titles.json`;
  if (!existsSync(f)) continue;
  for (const t of JSON.parse(readFileSync(f, 'utf8')) as { id: string; units: { id: string }[] }[]) {
    for (const id of [t.id, ...t.units.map((u) => u.id)]) if (id.includes('-')) IDS.add(id);
  }
}
function leakedId(text: string): string | null {
  for (const m of text.matchAll(/[a-z0-9]+(?:-[a-z0-9]+)+/g)) {
    const before = text[m.index - 1] ?? ' ';
    const after = text[m.index + m[0].length] ?? ' ';
    if (IDS.has(m[0]) && !/[\w/.-]/.test(before) && !/[\w/.-]/.test(after)) return m[0];
  }
  return null;
}

async function audit(page: Page) {
  return page.evaluate(() => {
    const overflowX = document.documentElement.scrollWidth - window.innerWidth;
    const clipped: string[] = [];
    for (const el of Array.from(document.querySelectorAll<HTMLElement>('body *'))) {
      if (!el.offsetParent || el.closest('[aria-hidden="true"], .sr-only, svg')) continue;
      const cs = getComputedStyle(el);
      const clips = cs.textOverflow === 'ellipsis' || cs.overflowX === 'hidden' || cs.overflowX === 'clip';
      if (!clips || el.scrollWidth <= el.clientWidth + 1 || !el.textContent?.trim()) continue;
      // OK when it is a Truncated (tooltip on hover) or inside a scroll container meant to scroll.
      // A pan/zoom map viewport clips by design (its panes move under it).
      if (el.closest('[data-slot="tooltip-trigger"]') || el.matches('[data-slot="tabs-list"], .leaflet-container')) continue;
      clipped.push(`${el.tagName.toLowerCase()}.${el.className.toString().slice(0, 60)}: "${el.textContent.trim().slice(0, 50)}"`);
    }
    const text = document.body.innerText;
    return { overflowX, clipped: clipped.slice(0, 15), text };
  });
}

const UNIVERSES: string[] = [
  'marvel', 'asoiaf', 'star-wars',
  ...(JSON.parse(readFileSync('data/universes.json', 'utf8')) as { id: string; enabled: boolean }[]).filter((u) => u.enabled).map((u) => u.id).filter((id) => !['marvel', 'asoiaf', 'star-wars'].includes(id)),
];

for (const vp of VIEWPORTS) {
  test.describe(`layout @ ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });
    // Every enabled universe; the first three at all four sizes, the rest at the two extremes.
    for (const u of UNIVERSES.filter((x, i) => i < 3 || vp.name === 'phone' || vp.name === 'ultrawide')) {
      test(`${u}: every view fits, nothing clipped, nothing leaked`, async ({ page }) => {
        test.setTimeout(180_000);
        test.skip(test.info().project.name !== 'desktop', 'viewport set explicitly; run once');
        const problems: string[] = [];
        // the Maps view exists only for universes with data/<universe>/maps.json
        for (const v of existsSync(`data/${u}/maps.json`) ? [...VIEWS, 'maps'] : VIEWS) {
          await page.goto(`./?u=${u}${v === 'spine' ? '' : `&view=${v}`}`);
          await page.locator('main').waitFor();
          if (v === 'maps') await page.getByTestId('map-credit').waitFor();
          await page.waitForTimeout(150);
          const r = await audit(page);
          if (r.overflowX > 1) problems.push(`${v}: page scrolls horizontally by ${r.overflowX}px`);
          for (const c of r.clipped) problems.push(`${v}: clipped without tooltip: ${c}`);
          for (const [name, re] of LEAKS) { const m = re.exec(r.text); if (m) problems.push(`${v}: leaked ${name}: "${m[0]}"`); }
          const id = leakedId(r.text);
          if (id) problems.push(`${v}: leaked raw id: "${id}"`);
          if (SHOTS) await page.screenshot({ path: `${SHOTS}/${vp.name}-${u}-${v}.png`, fullPage: false });
        }
        expect(problems, problems.join('\n')).toEqual([]);
      });
    }
  });
}
