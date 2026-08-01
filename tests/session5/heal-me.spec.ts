import { test, expect } from "@playwright/test";

/**
 * ── LAB 5.2 · HEAL ME ────────────────────────────────────────────────────────
 * THIS TEST FAILS ON PURPOSE. That is the exercise.
 *
 * It was green yesterday. Overnight the UI "changed" and now a locator no longer
 * matches. Your job: use the REPAIR PROMPT PATTERN with Copilot to heal it.
 *
 *   1. Run it and watch it fail:   npm run lab:heal
 *   2. Open the trace:             npm run report   (click the trace icon)
 *      → copy the real HTML around the button from the DOM snapshot.
 *   3. Give Copilot THREE things: the error, the intent (below), and that HTML.
 *      Ask it to CLASSIFY the failure first, then propose the fix.
 *   4. Apply the fix, re-run — green.
 *
 * INTENT of this test: log in as standard_user and add the Sauce Labs Backpack to
 * the cart, then assert the cart badge shows "1".
 * ─────────────────────────────────────────────────────────────────────────────
 */
test("add the backpack to the cart @lab", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  const backpack = page.locator(".inventory_item").filter({ hasText: "Sauce Labs Backpack" });

  // 🔧 BROKEN LINE — the button on SauceDemo says "Add to cart", not "Add to basket".
  //    This is a RENAME-style failure: heal it by correcting the locator.
  await backpack.getByRole("button", { name: "Add to basket" }).click();

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});

/**
 * ── The one you must NOT heal (discussion) ───────────────────────────────────
 * Imagine a second failure: the checkout test breaks because checkout now requires
 * a PHONE NUMBER field that never existed before. That is NOT a broken locator —
 * the FEATURE changed. The correct response is not to patch the test to get past
 * it, but to write a NEW test for the new requirement. Healing a feature change
 * gives you a green suite that tests last week's behaviour. Be ready to explain
 * why you would refuse to "heal" this one.
 * ─────────────────────────────────────────────────────────────────────────────
 */
