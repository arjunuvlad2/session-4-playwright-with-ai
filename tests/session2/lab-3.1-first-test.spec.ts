import { test, expect } from "@playwright/test";

/**
 * SESSION 2 · LAB 3.1 — Your first automated test.
 * Run just this file:  npx playwright test lab-3.1
 * Watch it happen:     npx playwright test lab-3.1 --headed
 */
test("logs in and lands on the inventory page with 6 products", async ({ page }) => {
  await page.goto("/"); // baseURL = https://www.saucedemo.com
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();

  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator(".inventory_item")).toHaveCount(6);
});
