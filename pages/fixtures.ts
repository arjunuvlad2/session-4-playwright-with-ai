import { test as base } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { InventoryPage } from "./InventoryPage";
import { CartPage } from "./CartPage";

/**
 * Fixtures — Session 3, Lab 3.3.
 * The `loggedIn` fixture hands a test an already-logged-in session, so the
 * login preamble disappears from every test that uses it.
 *
 * Import { test, expect } from "../../pages/fixtures" instead of "@playwright/test".
 */
type CourseFixtures = {
  loggedIn: InventoryPage;
  cartPage: CartPage;
};

export const test = base.extend<CourseFixtures>({
  loggedIn: async ({ page }, use) => {
    await new LoginPage(page).login("standard_user", "secret_sauce");
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from "@playwright/test";
