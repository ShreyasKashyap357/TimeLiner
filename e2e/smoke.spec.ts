import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const VIEW_NAMES: Record<string, string> = { release: 'Release order', platform: 'Platform', studio: 'Studio', groupings: 'Phase / Saga', tags: 'Characters', continuities: 'Continuities', dual: 'Dual axis', connections: 'Connections' };

test.describe('TimeLiner smoke', () => {
  test('in-universe spine renders the MCU in order', async ({ page }) => {
    await page.goto('/?u=marvel&c=mcu');
    await expect(page.getByRole('heading', { name: '1260 BC' })).toBeVisible({ timeout: 20_000 }); // first test: cold server
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
    await expect(page.getByRole('option', { name: /^Marvel Marvel Cinematic/ })).toBeInViewport();
    // With many universes the list scrolls; it must show several rows at once, not one.
    const visible = await page.getByRole('option').evaluateAll((els) => els.filter((e) => {
      const r = e.getBoundingClientRect();
      return r.height > 0 && r.top >= 0 && r.bottom <= window.innerHeight;
    }).length);
    expect(visible).toBeGreaterThanOrEqual(6);
    await expect(page.getByRole('option', { name: 'All universes' })).toBeInViewport();
    // The last universe is reachable by scrolling the list.
    const last = page.getByRole('option').last();
    await page.getByRole('option', { name: /^Marvel Marvel Cinematic/ }).hover();
    const list = page.locator('[cmdk-list]');
    for (let i = 0; i < 20 && !(await list.evaluate((e) => e.scrollTop + e.clientHeight >= e.scrollHeight - 2)); i++) { await page.mouse.wheel(0, 400); await page.waitForTimeout(50); }
    await expect(last).toBeInViewport();
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

test('continuity picker: grouped and searchable (DC has ~40 continuities)', async ({ page }) => {
  await page.goto('/?u=dc&c=dcu');
  await page.getByRole('combobox', { name: 'Continuity (in-universe views)' }).click();
  await expect(page.getByText(/^Shared universes \(\d+\)$/)).toBeVisible();
  await page.getByPlaceholder(/Search \d+ continuities/).fill('smallv');
  await page.getByRole('option', { name: /Smallville/ }).click();
  await expect(page).toHaveURL(/c=smallville/);
});

test('switching universe away from a watch order falls back to story order (regression)', async ({ page }) => {
  await page.goto('/?u=marvel&c=mcu&sort=alt&alt=recommended');
  await expect(page.locator('[aria-label^="Position 1."]').first()).toBeVisible({ timeout: 20_000 });
  await page.getByRole('combobox', { name: 'Universe', exact: true }).click();
  // Halloween has no watch order, so the view must fall back to story order.
  await page.getByRole('option', { name: 'Halloween' }).click();
  await expect(page).not.toHaveURL(/sort=alt/);
  await expect(page.getByRole('radio', { name: 'Story (in-universe)' })).toBeChecked();
  await expect(page.locator('[aria-label^="Position 1."]')).toHaveCount(0);
});

test('Wheel of Time story order shows both the in-universe and the release year (regression)', async ({ page }) => {
  await page.goto('/?u=wheel-of-time');
  await expect(page.getByRole('heading', { name: '998 NE' })).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('[data-unit="the-eye-of-the-world"]')).toContainText('998 NE');
  await expect(page.locator('[data-unit="the-eye-of-the-world"]')).toContainText('1990');
});

test('a watch order kept across universes still shows both dates', async ({ page }) => {
  await page.goto('/?u=wheel-of-time&sort=alt&alt=recommended');
  await expect(page.locator('[data-unit="the-eye-of-the-world"]')).toContainText('998 NE', { timeout: 20_000 });
  await expect(page.locator('[data-unit="the-eye-of-the-world"]')).toContainText('1990');
  await expect(page.getByText(/selective:|supported_by|sources? \d/)).toHaveCount(0);
});

test('no browser-native hover text anywhere (title attributes or SVG <title>)', async ({ page }) => {
  const nativeTips = () => page.evaluate(() => [...document.querySelectorAll('[title], svg title')]
    .filter((e) => !(e instanceof HTMLTitleElement)).map((e) => e.outerHTML.slice(0, 120)));
  for (const url of ['/?u=marvel&c=mcu', '/?u=marvel&c=mcu&view=lanes', '/?u=dc&view=dual', '/?u=all', '/?u=star-wars&sort=alt&alt=recommended']) {
    await page.goto(url);
    await page.locator('main').waitFor();
    await page.waitForTimeout(500);
    expect(await nativeTips(), url).toEqual([]);
  }
  await page.goto('/?u=marvel&c=mcu');
  await page.locator('[data-unit]').first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  expect(await nativeTips(), 'detail drawer').toEqual([]);
});

test('game drawer: releases by platform, no tooltip popping up on open, no overflow (regression)', async ({ page }) => {
  await page.goto('/?u=grand-theft-auto&unit=gta-v');
  const d = page.getByRole('dialog');
  await expect(d).toBeVisible({ timeout: 20000 });
  await expect(d.getByText('Releases by platform')).toBeVisible();
  await expect(d).toContainText('PlayStation 3');
  await expect(page.getByRole('tooltip')).toHaveCount(0);
  await d.getByText('Releases by platform').scrollIntoViewIfNeeded();
  const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(over).toBeLessThanOrEqual(0);

});

test('film drawer: runtime, budget and box office, cited, no overflow', async ({ page }) => {
  await page.goto('/?u=marvel&c=mcu&unit=avengers-endgame');
  const d = page.getByRole('dialog');
  await expect(d).toBeVisible({ timeout: 20000 });
  await expect(d).toContainText('Box office');
  await expect(page.getByRole('tooltip')).toHaveCount(0);
  await d.getByText('Box office').scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);

});

test('tv drawer: viewers per episode and season, no overflow', async ({ page }) => {
  await page.goto('/?u=dc&c=arrowverse&unit=arrow-s1');
  const d = page.getByRole('dialog');
  await expect(d).toBeVisible({ timeout: 20000 });
  const h = d.getByRole('heading', { name: 'Viewers' });
  await expect(h).toBeVisible();
  await expect(page.getByRole('tooltip')).toHaveCount(0);
  await h.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
});

test('long release lists render in batches with "Show more" (all universes)', async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto('/?u=all&view=release');
  const list = page.getByRole('list', { name: /release order/ }).first();
  await expect(list).toBeVisible({ timeout: 60_000 });
  const before = await page.locator('main [data-unit]').count();
  expect(before).toBeLessThanOrEqual(260);
  await page.getByRole('button', { name: /^Show \d+ more/ }).first().click();
  await expect.poll(() => page.locator('main [data-unit]').count()).toBeGreaterThan(before);
});

test('cross-universe connection: badge and switch (regression)', async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto('/?u=law-and-order&unit=law-and-order-svu-s1');
  const d = page.getByRole('dialog');
  const link = d.getByRole('button', { name: 'Chicago P.D.' });
  await expect(link).toBeVisible({ timeout: 40_000 });
  await expect(link.locator('xpath=following-sibling::*[1]')).toHaveText('One Chicago');
  await link.click();
  await expect(page).toHaveURL(/u=one-chicago/);
  await expect(page).toHaveURL(/unit=chicago-pd-s1/);
});

test('Universe picker: type to search, All universes pinned on top', async ({ page }) => {
  await page.goto('/?u=marvel&c=mcu');
  await page.getByRole('combobox', { name: 'Universe', exact: true }).click();
  await expect(page.getByRole('option').first()).toHaveText(/All universes/);
  await page.getByPlaceholder(/Search \d+ universes/).fill('dune');
  await expect(page.getByRole('option', { name: /^Dune Frank/ })).toBeVisible();
  await expect(page.getByRole('option', { name: /^Marvel Marvel Cinematic/ })).toHaveCount(0);
  await page.getByRole('option', { name: /^Dune Frank/ }).click();
  await expect(page).toHaveURL(/u=dune/);
});

test('Universe picker: grouped by category, descriptions are searchable', async ({ page }) => {
  await page.goto('/?u=marvel&c=mcu');
  await page.getByRole('combobox', { name: 'Universe', exact: true }).click();
  await expect(page.getByRole('group', { name: /^Fantasy \(\d+\)$/ })).toBeVisible();
  await page.getByPlaceholder(/Search \d+ universes/).fill('percy jackson');
  await expect(page.getByRole('option', { name: /Rick Riordan/ })).toBeVisible();
});

test('filters: long checkbox lists get a search box', async ({ page, isMobile }) => {
  await page.goto('/?u=marvel&view=release');
  if (isMobile) await page.getByRole('button', { name: 'Filters' }).click();
  const scope = isMobile ? page.getByRole('dialog') : page.getByRole('complementary', { name: 'Filters sidebar' });
  const box = scope.getByRole('searchbox', { name: 'Search studio / label' });
  await box.fill('sony');
  const studios = scope.getByRole('group', { name: 'Studio / label' });
  await expect(studios.getByRole('checkbox').first()).toBeVisible();
  await expect(studios.getByText(/Sony Pictures/).first()).toBeVisible();
  await expect(studios.getByText(/Marvel Studios/)).toHaveCount(0);
});

test.describe('maps', () => {
  const nativeTitles = (page: import('@playwright/test').Page) => page.evaluate(() => [...document.querySelectorAll('[title], svg title')].filter((e) => !(e instanceof HTMLTitleElement)).map((e) => e.outerHTML.slice(0, 120)));
  const overflowX = (page: import('@playwright/test').Page) => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);

  test('map: image map shows credits, places open a popup that opens the drawer', async ({ page }) => {
    await page.goto('/?u=narnia&view=maps');
    const credit = page.getByTestId('map-credit');
    await expect(credit).toBeVisible({ timeout: 30_000 });
    await expect(credit).toContainText('AnonMoos');
    await expect(credit).toContainText('Public domain');
    await expect(credit.getByText('Fan-made')).toBeVisible();
    await expect(page.locator('.tl-map img.leaflet-image-layer')).toHaveCount(1);
    await expect(page.locator('.tl-map [data-place]')).toHaveCount(4);
    await page.getByTestId('place-list').getByRole('button', { name: /Tashbaan/ }).click();
    const card = page.getByTestId('place-card');
    await expect(card).toBeVisible();
    await expect(card).toContainText('Inferred');
    await card.getByRole('button', { name: 'The Horse and His Boy' }).click();
    await expect(page).toHaveURL(/unit=/);
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    expect(await overflowX(page)).toBeLessThanOrEqual(1);
    expect(await nativeTitles(page)).toEqual([]);
  });

  test('map: OSM story locations render markers and credits without tiles', async ({ page }) => {
    await page.route('https://tile.openstreetmap.org/**', (r) => r.abort()); // never depend on (or load) real tiles in tests
    await page.goto('/?u=sherlock-holmes&view=maps');
    const credit = page.getByTestId('map-credit');
    await expect(credit).toBeVisible({ timeout: 30_000 });
    await expect(credit).toContainText('CC0');
    await expect(credit.getByRole('link', { name: 'OpenStreetMap' })).toHaveAttribute('href', 'https://www.openstreetmap.org/copyright');
    await expect.poll(() => page.locator('.tl-map [data-place]').count()).toBeGreaterThan(3);
    await page.locator('.tl-map [data-place]').first().focus();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('place-card')).toBeVisible();
    expect(await overflowX(page)).toBeLessThanOrEqual(1);
    expect(await nativeTitles(page)).toEqual([]);
  });

  test('map: the Maps view is offered only where maps exist', async ({ page, isMobile }) => {
    await page.goto('/?u=dune');
    await page.getByTestId('result-count').waitFor({ state: 'attached', timeout: 30_000 });
    if (isMobile) {
      await page.getByRole('combobox', { name: 'View', exact: true }).click();
      await expect(page.getByRole('option', { name: 'Maps', exact: true })).toHaveCount(0);
    } else await expect(page.locator('[data-view="maps"]')).toHaveCount(0);
    await page.goto('/?u=narnia');
    await page.getByTestId('result-count').waitFor({ state: 'attached', timeout: 30_000 });
    if (isMobile) {
      await page.getByRole('combobox', { name: 'View', exact: true }).click();
      await expect(page.getByRole('option', { name: 'Maps', exact: true })).toHaveCount(1);
    } else await expect(page.locator('[data-view="maps"]')).toHaveCount(1);
  });
});
