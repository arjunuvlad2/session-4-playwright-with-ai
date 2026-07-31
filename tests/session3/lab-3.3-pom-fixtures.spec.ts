import { test, expect } from "../../pages/fixtures";

/**
 * SESSION 3 · LAB 3.3 — Page Object Model + fixtures.
 * Same behaviour as Lab 3.2, but notice: NO selectors and NO login code in the
 * tests. The `loggedIn` fixture logged us in; the page objects own the locators.
 * The tests read like sentences.
 */
test("cart badge reflects items added", async ({ loggedIn }) => {
  await loggedIn.addToCart("Sauce Labs Backpack");
  await loggedIn.addToCart("Sauce Labs Bike Light");
  expect(await loggedIn.cartCount()).toBe(2);
});

test("remove leaves exactly the right items", async ({ loggedIn, cartPage }) => {
  await loggedIn.addToCart("Sauce Labs Backpack");
  await loggedIn.addToCart("Sauce Labs Bike Light");
  await loggedIn.removeFromCart("Sauce Labs Bike Light");
  await loggedIn.openCart();
  expect(await cartPage.itemNames()).toEqual(["Sauce Labs Backpack"]);
});
