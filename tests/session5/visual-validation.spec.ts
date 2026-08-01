import { test, expect } from "@playwright/test";

/**
 * ── LAB 5.3 · VISUAL VALIDATION ──────────────────────────────────────────────
 * Functional tests are BLIND to appearance. SauceDemo's `problem_user` shows the
 * WRONG product images, yet every functional assertion still passes. A visual
 * (screenshot) comparison is how you catch that.
 *
 *   1. Run it:  npm run lab:visual
 *      First run: Playwright has no baseline, so it CREATES one and the test
 *      "fails" saying it wrote a new snapshot. That is normal — run it AGAIN and
 *      it passes. (This is baseline discipline: record on purpose, compare after.)
 *   2. Change USER below to "problem_user" and run again. The screenshot now
 *      DIFFERS (broken images) and the test fails. Open  npm run report  and look
 *      at the pixel diff — the thing your functional tests never noticed.
 *   3. Change USER back to "standard_user".
 *   4. AI angle: paste the failing screenshot into Copilot / a multimodal chat and
 *      ask "list the visual defects on this page" — it describes the broken images
 *      with NO baseline at all.
 *
 * Tagged @lab so it stays out of `npm test` (screenshots are machine-specific and
 * should not gate the shared suite).
 * ─────────────────────────────────────────────────────────────────────────────
 */

// 🔧 LAB: change this to "problem_user" in step 2, then back to "standard_user".
const USER = "standard_user";

test("the inventory page looks right @lab", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Username").fill(USER);
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.locator(".inventory_list")).toBeVisible();

  // Compare the whole inventory list against a committed baseline image.
  await expect(page.locator(".inventory_list")).toHaveScreenshot("inventory.png", {
    maxDiffPixelRatio: 0.02, // allow tiny rendering noise; a wrong image is far bigger
  });
});
