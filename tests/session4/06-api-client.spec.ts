import { test, expect } from "@playwright/test";
import { BookingClient } from "../../lib/BookingClient";

/**
 * ── BONUS · PART 2 ───────────────────────────────────────────────────────────
 * The same lifecycle as test 02 — but now on the reusable BookingClient
 * (see lib/BookingClient.ts).
 *
 * Compare this test with 02-crud-chain.spec.ts. Same behaviour, but here there
 * are no raw URLs, no headers, no token plumbing in the test. It reads as pure
 * intent: auth, create, get, update, delete. That is the whole point of a client
 * class — the API equivalent of a Page Object.
 *
 * Run:  npx playwright test 06
 * ─────────────────────────────────────────────────────────────────────────────
 */
test("full lifecycle via the API client", async ({ request }) => {
  const api = new BookingClient(request);
  await api.auth();

  const created = await api.create({
    firstname: "Ravi", lastname: "Sharma", totalprice: 250, depositpaid: true,
    bookingdates: { checkin: "2026-11-01", checkout: "2026-11-04" },
  });
  const { bookingid } = await created.json();

  expect((await api.get(bookingid)).status()).toBe(200);

  const patched = await api.update(bookingid, { totalprice: 300 });
  expect(patched.status()).toBe(200);
  expect((await patched.json()).totalprice).toBe(300);

  expect((await api.delete(bookingid)).status()).toBe(201); // documented quirk
  expect((await api.get(bookingid)).status()).toBe(404);
});
