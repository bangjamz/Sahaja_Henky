import { defineConfig, devices } from '@playwright/test'

// Uji alur, responsif, dan aksesibilitas (dokumen 10 bagian 4).
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? 'github' : 'list',
  use: { trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    {
      command: 'pnpm --filter siswa dev',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'pnpm --filter pendamping dev',
      url: 'http://localhost:5174',
      reuseExistingServer: !process.env.CI,
    },
  ],
})
