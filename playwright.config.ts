import { defineConfig, devices } from "@playwright/test";

/**
 * Course config. The switches we actually teach live here.
 * - baseURL lets UI tests write page.goto("/") instead of the full URL.
 * - fullyParallel + workers control parallel execution (Session 3).
 * - projects add cross-browser coverage for free (Session 3).
 * - trace on-first-retry gives you a time-travel debugger when a test flakes.
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  workers: 4,
  retries: 0,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL: "https://www.saucedemo.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    // Uncomment in Session 3 to demo cross-browser (needs: npx playwright install firefox webkit):
    // { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    // { name: "webkit",  use: { ...devices["Desktop Safari"] } },
  ],
});
