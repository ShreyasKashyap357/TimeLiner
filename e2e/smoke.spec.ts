import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const VIEW_NAMES: Record<string, string> = { release: 'Release order', platform: 'Platform', studio: 'Studio', groupings: 'Phase / Saga', tags: 'Characters', continuities: 'Continuities', dual: 'Dual axis', connections: 'Connections' };

test.describe('TimeLiner smoke', () => {
  test('in-universe spine renders the MCU in order', async ({ page }) => {
    await page.goto('/?u=marvel&c=mcu');
    await expect(page.getByRole('heading', { name: '1260 BC' })).toBeVisible();
    const first = page.locator('[data-unit]').first();
    await expect(first).toHaveAttribute('data-unit', 'eyes-of-wakanda-ep1');
    await expect(page.locator('[data-unit="iron-man"]')).toBeVisible();
  });

  test('view switching updates the URL and supports back/forward', async ({ page }) => {
    await page.goto('/?u=marvel&c=mcu');
    for (const [view, check] of [
      ['release', /view=release/], ['platform', /view=platform/], ['studio', /view=studio/], ['groupings', /view=groupings/],
      ['tags', /view=tags/], ['continuities', /view=continuities/], ['dual', /view=dual/], ['connections', /view=connections/],
    ] as const) {
      await page.getByTestId('result-count').waitFor({ state: 'attached' });
      const tab = page.locator(`[data-view="${view}"]`);
      if (await tab.isVisible()) await tab.click();
      else { // phones: the tab strip is replaced by a View picker
        await page.getByRole('combobox', { name: 'View', exact: true }).click();
        await page.getByRole('option', { name: VIEW_NAMES[view], exact: true }).click();
      }
      await expect(page).toHaveURL(check);
    }
    await page.goBack();
    await expect(page).toHaveURL(/view=dual/);
    await expect(page.getByRole('group', { name: /Scatter plot/ })).toBeVisible();
  });

  test('quick toggle and filters change results and persist in the URL', async ({ page, isMobile }) => {
    await page.goto('/?u=marvel&c=mcu&view=release');
    const count = page.getByTestId('result-count');
    const before = await count.textContent();
    await page.getByRole('radio', { name: 'Movies only' }).click();
    await expect(page).toHaveURL(/quick=movies/);
    await expect(count).not.toHaveText(before!);
    await expect(page.locator('[data-unit="daredevil-s1"]')).toHaveCount(0);
    if (isMobile) await page.getByRole('button', { name: 'Filters' }).click();
    const scope = isMobile ? page.getByRole('dialog') : page.getByRole('complementary', { name: 'Filters sidebar' });
    await scope.getByLabel(/^Adjacent/).click();
    await expect(page).toHaveURL(/tier=adjacent/);
    // reload: state restored from URL
    await page.reload();
    await expect(page.getByRole('radio', { name: 'Movies only' })).toHaveAttribute('data-state', 'on');
  });

  test('shared link opens the detail drawer', async ({ page }) => {
    await page.goto('/?u=marvel&c=mcu&unit=iron-man');
    const drawer = page.getByRole('dialog');
    await expect(drawer.getByRole('heading', { name: 'Iron Man' })).toBeVisible();
    await expect(drawer.getByText('Disputed')).toBeVisible();
    await expect(drawer.getByText(/Official Timeline/)).toBeVisible();
  });

  test('watched state persists across reloads and drives "what\'s next"', async ({ page }) => {
    await page.goto('/?u=marvel&c=mcu');
    await expect(page.getByTestId('next-up')).toHaveText(/Eyes of Wakanda — Ep\. 1/);
    await page.getByRole('checkbox', { name: 'Mark "Eyes of Wakanda — Ep. 1" as watched' }).click();
    await expect(page.getByTestId('next-up')).toHaveText(/Eyes of Wakanda — Ep\. 2/);
    await page.reload();
    await expect(page.getByRole('checkbox', { name: 'Mark "Eyes of Wakanda — Ep. 1" as watched' })).toBeChecked();
    const stored = await page.evaluate(() => localStorage.getItem('timeliner.watched.v1'));
    expect(JSON.parse(stored!).watched).toHaveProperty('eyes-of-wakanda-ep1');
  });

  test('search palette opens, finds a title and opens its details (regression: blank screen)', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(String(err)));
    await page.goto('/?u=marvel&c=mcu');
    await page.getByRole('button', { name: /^Search/ }).click();
    await page.keyboard.type('Thunderbolts');
    await expect(page.getByRole('option').first()).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('dialog').getByRole('heading', { name: 'Thunderbolts*' })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('header stays visible when scrolling and nothing overflows horizontally', async ({ page }) => {
    await page.goto('/?u=marvel&c=mcu');
    await page.mouse.wheel(0, 3000);
    await expect(page.getByRole('banner')).toBeInViewport();
    for (const q of ['/?u=marvel&c=mcu', '/?u=marvel&c=mcu&view=dual', '/?u=marvel&view=release']) {
      await page.goto(q);
      await page.getByTestId('result-count').waitFor({ state: 'attached' });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, q).toBeLessThanOrEqual(1);
    }
  });

  test('DC universe: switch, Arrowverse timeline, crossover episodes, combined release lanes', async ({ page }) => {
    await page.goto('/?u=dc&c=arrowverse');
    await expect(page.locator('[data-unit="arrow-s1"]')).toBeVisible();
    const accent = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--u-primary').trim().toLowerCase());
    expect(accent).toBe('#5da9ff');
    await page.goto('/?u=dc&c=arrowverse&unit=crisis-on-infinite-earths');
    await expect(page.getByRole('dialog').getByText(/Episodes in this crossover/)).toBeVisible();
    await page.goto('/?u=all&view=release&lanes=1');
    await expect(page.getByRole('region', { name: 'Marvel' })).toBeVisible({ timeout: 20_000 }); // all 7 universes load and render (~750 rows)
    await expect(page.getByRole('region', { name: 'DC' })).toBeVisible();
  });

  test('books universe: Books toggle, read wording, adapts links', async ({ page }) => {
    await page.goto('/?u=asoiaf&c=asoiaf-books');
    await expect(page.locator('[data-unit="a-game-of-thrones"]')).toBeVisible();
    await page.getByRole('radio', { name: 'Books' }).click();
    await expect(page).toHaveURL(/quick=books/);
    await expect(page.getByRole('checkbox', { name: 'Mark "A Game of Thrones" as read' })).toBeVisible();
    await page.goto('/?u=asoiaf&c=asoiaf-books&unit=a-game-of-thrones');
    await expect(page.getByRole('dialog').getByText('adapted as')).toBeVisible();
  });

  test('no WCAG A/AA violations on main views', async ({ page }) => {
    test.setTimeout(180_000);
    for (const q of ['/?u=marvel&c=mcu', '/?u=marvel&view=release', '/?u=marvel&c=mcu&view=dual', '/?u=dc&c=arrowverse']) {
      await page.goto(q);
      await page.getByTestId('result-count').waitFor({ state: 'attached' });
      await page.waitForTimeout(300);
      const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      expect(res.violations.map((v) => `${v.id}: ${v.nodes.length} (${v.nodes[0]?.target})`)).toEqual([]);
    }
  });
});

test.describe('URL defaults and pickers (regressions)', () => {
  test('era calendars explain the missing year 0 in the Key', async ({ page }) => {
    await page.goto('/?u=asoiaf');
    await expect(page.getByTestId('calendar-note')).toContainText('no year 0');
  });
  test('an opened picker shows its whole list, even after choosing a lower option', async ({ page }) => {
    await page.goto('/?u=asoiaf');
    await page.getByRole('combobox', { name: 'Universe', exact: true }).click();
    await expect(page.getByRole('option', { name: 'Marvel' })).toBeInViewport();
    await expect(page.getByRole('option', { name: 'All universes' })).toBeInViewport();
  });
  test('a universe link without a continuity opens its default continuity', async ({ page }) => {
    await page.goto('/?u=star-wars&view=dual');
    await expect(page.getByRole('combobox', { name: 'Continuity (in-universe views)' })).toContainText('Star Wars canon');
    await expect(page.getByText('Nothing matches the current filters.')).toHaveCount(0);
  });
  test('non-timeline views never show a blank sort', async ({ page }) => {
    await page.goto('/?u=star-wars&view=connections&sort=in-universe');
    await expect(page.getByRole('combobox', { name: 'Sort order' }).first()).toHaveText(/\S/);
  });
});

test('detail panel shows cast & crew, and a name filters by that person', async ({ page }) => {
  await page.goto('/?u=marvel&c=mcu&unit=iron-man');
  const drawer = page.getByRole('dialog');
  await expect(drawer.getByText('Cast & crew')).toBeVisible();
  await drawer.getByRole('button', { name: 'Jon Favreau' }).first().click();
  await expect(page).toHaveURL(/ppl=Q\d+/);
  await expect(page.getByText(/Person: Jon Favreau/)).toBeVisible();
});

test('header picker tooltips: not on a quick pass, not after choosing, yes on a deliberate hover', async ({ page, isMobile }) => {
  test.skip(isMobile, 'hover only');
  const tips = () => page.locator('[data-slot="tooltip-content"]');
  await page.goto('/?u=marvel');
  const uni = page.getByRole('combobox', { name: 'Universe', exact: true });
  const box = (await uni.boundingBox())!;
  await page.mouse.move(10, 400);
  await page.mouse.move(box.x + box.width + 80, box.y + 10, { steps: 6 });
  await expect(tips()).toHaveCount(0);
  await uni.click();
  await page.getByRole('option', { name: 'A Song of Ice and Fire' }).click();
  await page.mouse.move(700, 500);
  await page.waitForTimeout(600);
  await expect(tips()).toHaveCount(0);
  await page.mouse.move(box.x + 10, box.y + 10);
  await expect(tips().first()).toContainText('Franchise universe');
});

test('a person across universes shows an Appearances list, not a timeline', async ({ page }) => {
  await page.goto('/?u=all&ppl=Q172678'); // Samuel L. Jackson
  const section = page.getByRole('region', { name: 'Samuel L. Jackson' });
  await expect(section).toBeVisible({ timeout: 20_000 });
  await expect(section.getByText('Kong: Skull Island')).toBeVisible();
  await expect(section.getByText('as Nick Fury').first()).toBeVisible();
  await expect(page.getByRole('group', { name: 'Universes shown' })).toBeVisible();
});
