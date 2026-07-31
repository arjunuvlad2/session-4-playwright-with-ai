import { test, expect } from "@playwright/test";

/**
 * SESSION 2 · LAB 3.2 — Locators & assertions.
 * The locator hierarchy: getByRole > getByText/Label/Placeholder > getByTestId
 *                        > stable CSS > positional XPath (banned).
 * Assert OUTCOMES (badge count, button text, exact error) — not just "page loaded".
 */
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
});

test("adding the backpack updates the badge and the button", async ({ page }) => {
  const backpack = page.locator(".inventory_item").filter({ hasText: "Sauce Labs Backpack" });
  await backpack.getByRole("button", { name: "Add to cart" }).click();

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
  await expect(backpack.getByRole("button", { name: "Remove" })).toBeVisible();
});

test("add three, remove one, cart lists exactly the right two", async ({ page }) => {
  for (const name of ["Sauce Labs Backpack", "Sauce Labs Bike Light", "Sauce Labs Bolt T-Shirt"]) {
    await page.locator(".inventory_item").filter({ hasText: name })
      .getByRole("button", { name: "Add to cart" }).click();
  }
  await page.locator(".inventory_item").filter({ hasText: "Sauce Labs Bike Light" })
    .getByRole("button", { name: "Remove" }).click();

  await expect(page.locator(".shopping_cart_badge")).toHaveText("2");
  await page.locator(".shopping_cart_link").click();
  const names = await page.locator(".inventory_item_name").allTextContents();
  expect(names.sort()).toEqual(["Sauce Labs Backpack", "Sauce Labs Bolt T-Shirt"]);
});

test("negative: locked_out_user sees the exact error", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Username").fill("locked_out_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.locator('[data-test="error"]')).toContainText("Sorry, this user has been locked out.");
});
