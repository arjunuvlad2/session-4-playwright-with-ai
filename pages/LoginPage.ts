import { Page, Locator } from "@playwright/test";

/**
 * LoginPage — Session 3, Lab 3.3.
 * All login locators and actions live here. Tests never touch a selector.
 * Locators follow the resilience hierarchy: getByPlaceholder / getByRole over CSS.
 */
export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly error: Locator;

  constructor(readonly page: Page) {
    this.username = page.getByPlaceholder("Username");
    this.password = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.error = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto("/"); // baseURL is set in playwright.config.ts
  }

  async login(user: string, pass: string) {
    await this.goto();
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginButton.click();
  }
}
