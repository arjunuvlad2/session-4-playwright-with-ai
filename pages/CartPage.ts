import { Page, Locator } from "@playwright/test";

/**
 * CartPage — Session 3, Lab 3.3. Covers the cart and the checkout flow.
 */
export class CartPage {
  readonly items: Locator;
  readonly checkoutButton: Locator;

  constructor(readonly page: Page) {
    this.items = page.locator(".cart_item");
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async itemNames(): Promise<string[]> {
    return this.items.locator(".inventory_item_name").allTextContents();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async fillDetailsAndContinue(first: string, last: string, postcode: string) {
    await this.page.locator('[data-test="firstName"]').fill(first);
    await this.page.locator('[data-test="lastName"]').fill(last);
    await this.page.locator('[data-test="postalCode"]').fill(postcode);
    await this.page.locator('[data-test="continue"]').click();
  }

  async finish() {
    await this.page.locator('[data-test="finish"]').click();
  }
}
