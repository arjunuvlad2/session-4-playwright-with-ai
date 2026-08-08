import { test, expect } from "@playwright/test";
import { pathToFileURL } from "url";
import path from "path";

/**
 * ── SESSION 6 · EXERCISE 7.2 — MAKE A FLAKY TEST DETERMINISTIC ─────────────────────
 * The after-lab exercise. Lab 7.2 showed you how to SPOT a flake; here you FIX one.
 *
 *   Watch the broken one flake, then see the fix hold:
 *   npm run lab:deterministic          (runs both tests 5x)
 *
 * Both tests do the same thing — click Submit, wait for the success banner — against a
 * local page that shows the banner after a RANDOM 300–1700 ms delay (banner-app.html).
 *
 *   • BROKEN: waits a fixed 1000 ms, then checks. When the app is slower than a second,
 *             the banner isn't there yet → red. Some repeats pass, some fail = FLAKY.
 *   • FIXED:  waits for the CONDITION (the banner being visible), not the clock. Passes
 *             on fast AND slow runs, every time.
 *
 * The lesson in one line: never wait for a NUMBER; wait for the THING to be true.
 * `page.waitForTimeout()` in a real test is almost always a bug in waiting.
 *
 * Tagged @lab so it never gates the real suite (`npm test` skips it).
 * ─────────────────────────────────────────────────────────────────────────────
 */

const APP = pathToFileURL(path.join(__dirname, "banner-app.html")).href;

test("BROKEN — fixed 1s wait after Submit (this is the flake) @lab", async ({ page }) => {
  await page.goto(APP);
  await page.click("#submit");

  // ✗ THE DEFECT: wait the CLOCK, then read ONCE, immediately. `isVisible()` does NOT
  //   auto-wait — it answers right now. If the banner takes >1s, we read too early → false.
  await page.waitForTimeout(1000);
  const visible = await page.locator("#success-banner").isVisible();

  expect(visible, "banner visible at the 1s mark?").toBe(true);
});

test("FIXED — wait for the condition, not the clock @lab", async ({ page }) => {
  await page.goto(APP);
  await page.click("#submit");

  // ✓ THE FIX: no fixed wait. expect() auto-waits for the banner (up to the test timeout),
  //   so it's reliable whether the app answered in 300 ms or 1700 ms.
  await expect(page.locator("#success-banner")).toBeVisible();
});
