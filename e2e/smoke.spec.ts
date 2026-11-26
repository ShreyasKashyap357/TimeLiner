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
    await expect(page).toHaveURL(/tier=core%2Coutside-set-date%2Cadjacent|tier=core,outside-set-date,adjacent/);
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

  test('no WCAG A/AA violations on main views', async ({ page }) => {
    test.setTimeout(180_000);
    for (const q of ['/?u=marvel&c=mcu', '/?u=marvel&view=release', '/?u=marvel&c=mcu&view=dual']) {
      await page.goto(q);
      await page.getByTestId('result-count').waitFor();
      await page.waitForTimeout(300);
      const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      expect(res.violations.map((v) => `${v.id}: ${v.nodes.length} (${v.nodes[0]?.target})`)).toEqual([]);
    }
  });
});
