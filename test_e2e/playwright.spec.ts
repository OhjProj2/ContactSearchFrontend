import { test, expect, } from '@playwright/test';


async function mockBackend(page) {
  await page.route('**/seek/', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {
          contacts: [
            { name: 'John Doe', email: 'john@test.com', phone: '123456' }
          ]
        },
        time: 1.23,
        id: 'test-id'
      })
    });
  });

  await page.route('**/listdbs', async (route) => {
    await route.fulfill({
      json: ['test-db']
    });
  });

  await page.route('**/listcollections?**', async (route) => {
    await route.fulfill({
      json: ['contacts']
    });
  });
}

test.beforeEach(async ({ page }) => {
  await mockBackend(page);
});

test('user can search and see results', async ({ page }) => {
  await page.goto('/');

  await page.fill('#url', 'https://example.com');
  await page.fill('#occupations', 'developer');

  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.getByText('John Doe')).toBeVisible();
});

test('user can toggle data points', async ({ page }) => {
  await page.route('**/listfields', async (route) => {
    await route.fulfill({
      json: [
        { label: 'email', value: 'email' },
        { label: 'phone', value: 'phone' }
      ]
    });
  });
  await page.goto('/');

  const chip = page.getByText('email');
  await chip.click();

  await expect(chip).toBeVisible();
});

test('user can add new data field', async ({ page }) => {
  await page.goto('/');

  await page.fill('input[placeholder="Enter data point"]', 'linkedin');
  await page.getByRole('button', { name: 'Add' }).click();

  await expect(page.getByText('linkedin')).toBeVisible();
});

test('user can open save modal', async ({ page }) => {
  await page.goto('/');

  await page.fill('#url', 'https://example.com');
  await page.getByRole('button', { name: 'Search' }).click();

  await page.getByRole('button', { name: 'Save To Database' }).click();

  await expect(
    page.getByRole('heading', { name: 'Save To Database' })
  ).toBeVisible();
});
