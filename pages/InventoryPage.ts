import { Page, Locator } from "@playwright/test";

/**
 * InventoryPage — Session 3, Lab 3.3.
 * Pages EXPOSE state (cartCount, item names); tests ASSERT. No expect() in here.
 */
export class InventoryPage {
  readonly items: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(readonly page: Page) {
    this.items = page.locator(".inventory_item");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartLink = page.locator(".shopping_cart_link");
  }

  async addToCart(productName: string) {
    await this.items
      .filter({ hasText: productName })
      .getByRole("button", { name: "Add to cart" })
      .click();
  }

  async removeFromCart(productName: string) {
    await this.items
      .filter({ hasText: productName })
      .getByRole("button", { name: "Remove" })
      .click();
  }

  /** 0 when the badge isn't shown, otherwise the number on it. */
  async cartCount(): Promise<number> {
    if (!(await this.cartBadge.isVisible())) return 0;
    return Number(await this.cartBadge.textContent());
  }

  async openCart() {
    await this.cartLink.click();
  }
}
