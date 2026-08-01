import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

/**
 * SESSION 5 — Resilient locators & self-healing (demonstrated).
 *
 * All three tests log in and reach the inventory page. They behave identically
 * TODAY. The difference is what happens TOMORROW, when a developer changes the UI.
 * Read the comments — that is the whole lesson of self-healing.
 *
 * Run:  npx playwright test session5
 */

test("RESILIENT — survives a cosmetic UI change", async ({ page }) => {
  // Locators high on the hierarchy: by placeholder, by role. If the developer
  // renames #user-name, moves the field, or restyles the button, these KEEP
  // WORKING — they describe the page as a user sees it.
  await page.goto("/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/inventory/);
});

test("BRITTLE — the kind of locator self-healing has to repair", async ({ page }) => {
  // Locators tied to ids. They pass NOW, but a rename or a moved <div> would break
  // them. This is exactly the failure the self-healing loop diagnoses: is #user-name
  // gone, renamed, or moved? These id/CSS locators are what an AI repairs.
  // (A positional locator like  form > div:nth-child(3) input  is the MOST fragile
  // of all — one added <div> and it points at the wrong field. Avoid it entirely.)
  await page.goto("/");
  await page.locator("#user-name").fill("standard_user"); // dies if the id is renamed
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();
  await expect(page).toHaveURL(/inventory/);
});

test("the page object keeps the knowledge in ONE place", async ({ page }) => {
  // When the login page changes you fix it HERE (pages/LoginPage.ts), once — not in
  // every test. That single seam is what makes self-healing possible: an AI needs
  // one authoritative place to apply a repair.
  const login = new LoginPage(page);
  await login.login("standard_user", "secret_sauce");
  await expect(page).toHaveURL(/inventory/);
});
