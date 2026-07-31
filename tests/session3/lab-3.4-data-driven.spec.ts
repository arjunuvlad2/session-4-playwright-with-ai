import { test, expect } from "../../pages/fixtures";
import { CartPage } from "../../pages/CartPage";
import loginData from "../../test-data/login-data.json";
import checkoutData from "../../test-data/checkout-data.json";

/**
 * SESSION 3 · LAB 3.4 — Data-driven testing.
 * One test definition, many rows of data. Each row becomes its OWN named test
 * in the report — if row 4 fails, rows 1-3 and 5 still run and report.
 *
 * Try it in parallel:      npx playwright test lab-3.4 --workers=1   (then --workers=4)
 */

// --- Data-driven LOGIN (from login-data.json) ---
for (const row of loginData) {
  const who = row.username || "(empty username)";
  const pass = row.password ? "" : " (empty password)";
  const detail = row.errorContains ? ` [${row.errorContains}]` : "";
  test(`login: ${who}${pass} -> ${row.expected}${detail}`, async ({ page }) => {
    const { LoginPage } = await import("../../pages/LoginPage");
    await new LoginPage(page).login(row.username, row.password);

    if (row.expected === "Success") {
      await expect(page).toHaveURL(/inventory/);
      await expect(page.locator(".inventory_item")).toHaveCount(6);
    } else {
      const error = page.locator('[data-test="error"]');
      await expect(error).toBeVisible();
      if (row.errorContains) await expect(error).toContainText(row.errorContains);
    }
  });
}

// --- Data-driven CHECKOUT (from checkout-data.json) ---
for (const row of checkoutData.valid) {
  test(`checkout ok: ${row.firstName} ${row.lastName}`, async ({ loggedIn, page }) => {
    await loggedIn.addToCart("Sauce Labs Backpack");
    await loggedIn.openCart();
    const cart = new CartPage(page);
    await cart.checkout();
    await cart.fillDetailsAndContinue(row.firstName, row.lastName, row.postcode);
    await expect(page.locator(".summary_total_label")).toBeVisible(); // overview page
    await cart.finish();
    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");
  });
}
