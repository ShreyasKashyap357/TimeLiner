import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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
      await page.locator(`[data-view="${view}"]`).click();
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
    await expect(page.getByRole('tablist', { name: 'Views' })).toBeInViewport();
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
    await expect(page.getByRole('region', { name: 'Marvel' })).toBeVisible();
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
