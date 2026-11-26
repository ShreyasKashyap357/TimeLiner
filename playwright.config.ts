import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  use: { baseURL: 'http://localhost:4199', trace: 'retain-on-failure' },
  // Always build fresh and serve on a dedicated port so tests never hit a stale server.
  webServer: { command: 'npx vite build && npx vite preview --port 4199 --strictPort', port: 4199, reuseExistingServer: false, timeout: 300_000 },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
