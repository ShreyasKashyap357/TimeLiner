// Layout + leak audit (user requests: every aspect ratio / mobile friendly, nothing cut short without a way
// to read it, no internal text leaking into the UI – D-7). Runs every view at four viewport shapes.
import { test, expect, type Page } from '@playwright/test';

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
  ['raw unit/title id', /(?<![\w/.-])[a-z0-9]+(?:-[a-z0-9]+){2,}(?![\w/.-])/],
];

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
      if (el.closest('[data-slot="tooltip-trigger"]') || el.matches('[data-slot="tabs-list"]')) continue;
      clipped.push(`${el.tagName.toLowerCase()}.${el.className.toString().slice(0, 60)}: "${el.textContent.trim().slice(0, 50)}"`);
    }
    const text = document.body.innerText;
    return { overflowX, clipped: clipped.slice(0, 15), text };
  });
}

for (const vp of VIEWPORTS) {
  test.describe(`layout @ ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });
    for (const u of ['marvel', 'asoiaf', 'star-wars']) {
      test(`${u}: every view fits, nothing clipped, nothing leaked`, async ({ page }) => {
        test.setTimeout(180_000);
        test.skip(test.info().project.name !== 'desktop', 'viewport set explicitly; run once');
        const problems: string[] = [];
        for (const v of VIEWS) {
          await page.goto(`./?u=${u}${v === 'spine' ? '' : `&view=${v}`}`);
          await page.locator('main').waitFor();
          await page.waitForTimeout(150);
          const r = await audit(page);
          if (r.overflowX > 1) problems.push(`${v}: page scrolls horizontally by ${r.overflowX}px`);
          for (const c of r.clipped) problems.push(`${v}: clipped without tooltip: ${c}`);
          for (const [name, re] of LEAKS) { const m = re.exec(r.text); if (m) problems.push(`${v}: leaked ${name}: "${m[0]}"`); }
          if (SHOTS) await page.screenshot({ path: `${SHOTS}/${vp.name}-${u}-${v}.png`, fullPage: false });
        }
        expect(problems, problems.join('\n')).toEqual([]);
      });
    }
  });
}
