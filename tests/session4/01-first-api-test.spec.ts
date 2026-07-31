import { test, expect } from "@playwright/test";

/**
 * ── LAB 4.1 · STEP 1 ─────────────────────────────────────────────────────────
 * Your first API test.
 *
 * The one thing to notice: the argument is `{ request }`, NOT `{ page }`.
 * `request` talks straight to the server over HTTP. No browser opens. That is
 * why API tests are so much faster than UI tests.
 *
 * A good API test asserts THREE LAYERS. We label them below.
 *
 * Run just this file:   npx playwright test 01
 * ─────────────────────────────────────────────────────────────────────────────
 */

// The API we test all session. Docs: https://restful-booker.herokuapp.com/apidoc
const BASE = "https://restful-booker.herokuapp.com";

// A sample booking body we reuse. Tests create their OWN data so they never
// depend on records another person (or a reset) might delete.
const sampleBooking = {
  firstname: "Ana",
  lastname: "Kowalska",
  totalprice: 150,
  depositpaid: true,
  bookingdates: { checkin: "2026-09-01", checkout: "2026-09-05" },
  additionalneeds: "Breakfast",
};

test("GET a booking returns a well-formed booking", async ({ request }) => {
  // First create a booking so we have a real id to fetch.
  const created = await request.post(`${BASE}/booking`, { data: sampleBooking });
  const { bookingid } = await created.json();

  // Now fetch it and check the three layers:
  const res = await request.get(`${BASE}/booking/${bookingid}`);

  // LAYER 1 — STATUS: did the server say "OK"?
  expect(res.status()).toBe(200);

  const body = await res.json();

  // LAYER 2 — SHAPE: does the response have the right fields, of the right types?
  expect(body).toHaveProperty("firstname");
  expect(typeof body.totalprice).toBe("number");

  // LAYER 3 — BUSINESS RULE: does the data make SENSE? A check-in must come
  // before a check-out. This is the layer AI never writes unless you ask — it
  // requires knowing what a booking actually MEANS.
  expect(new Date(body.bookingdates.checkin) < new Date(body.bookingdates.checkout)).toBe(true);
});
