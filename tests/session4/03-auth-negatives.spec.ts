import { test, expect } from "@playwright/test";

/**
 * ── LAB 4.1 · STEP 3 ─────────────────────────────────────────────────────────
 * Authentication negatives — proving the lock actually works.
 *
 * Every endpoint that CHANGES data deserves a test that it cannot be changed
 * without a valid token. These are your security tests.
 *
 * Remember the difference:
 *   401 Unauthorized = "I don't know who you are"  (missing/bad credentials)
 *   403 Forbidden    = "I know who you are — and no" (known, but not allowed)
 * Restful-Booker returns 403 here. (Arguably it should be 401 — a nice debate.)
 *
 * Run:  npx playwright test 03
 * ─────────────────────────────────────────────────────────────────────────────
 */
const BASE = "https://restful-booker.herokuapp.com";

const sampleBooking = {
  firstname: "Ana", lastname: "Kowalska", totalprice: 150, depositpaid: true,
  bookingdates: { checkin: "2026-09-01", checkout: "2026-09-05" },
};

test("modifying WITHOUT a token is refused (403)", async ({ request }) => {
  const created = await request.post(`${BASE}/booking`, { data: sampleBooking });
  const { bookingid } = await created.json();

  // No Cookie header at all:
  const res = await request.patch(`${BASE}/booking/${bookingid}`, { data: { totalprice: 999 } });
  expect(res.status()).toBe(403);
});

test("deleting with an INVALID token is refused (403)", async ({ request }) => {
  const created = await request.post(`${BASE}/booking`, { data: sampleBooking });
  const { bookingid } = await created.json();

  const res = await request.delete(`${BASE}/booking/${bookingid}`, {
    headers: { Cookie: "token=not-a-real-token" },
  });
  expect(res.status()).toBe(403);
});
