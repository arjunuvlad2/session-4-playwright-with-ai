import { test, expect } from "@playwright/test";

/**
 * ── BONUS · PART 3 ───────────────────────────────────────────────────────────
 * Negative, boundary & security testing — and the idea of a FINDING.
 *
 * Everything before this tested the happy path. Real bugs live at the edges.
 * The important lesson here: a test that captures a WEAKNESS is a FINDING, not a
 * failure. We assert the API's ACTUAL behaviour and name the problem in the test
 * title. Green does not mean the API is good — it means our test correctly
 * documented what the API does.
 *
 * Run:  npx playwright test 07
 * ─────────────────────────────────────────────────────────────────────────────
 */
const BASE = "https://restful-booker.herokuapp.com";

test("FINDING: a missing required field returns 500 (it should be 400)", async ({ request }) => {
  // No `lastname`. A well-behaved API validates the request and returns 400
  // Bad Request. This API falls over with a 500 Server Error instead.
  const res = await request.post(`${BASE}/booking`, {
    data: {
      firstname: "X", totalprice: 100, depositpaid: true,
      bookingdates: { checkin: "2026-09-01", checkout: "2026-09-05" },
    },
  });
  expect(res.status()).toBe(500); // documenting the actual (poor) behaviour
});

test("FINDING: the API accepts a negative price (no validation)", async ({ request }) => {
  const res = await request.post(`${BASE}/booking`, {
    data: {
      firstname: "Minus", lastname: "One", totalprice: -1, depositpaid: true,
      bookingdates: { checkin: "2026-09-01", checkout: "2026-09-05" },
    },
  });
  expect(res.status()).toBe(200);
  expect((await res.json()).booking.totalprice).toBe(-1); // stored as -1
});

test("GOOD: an SQL-injection string is stored as plain data, not executed", async ({ request }) => {
  const res = await request.post(`${BASE}/booking`, {
    data: {
      firstname: "Robert'); DROP TABLE bookings;--", lastname: "Tables", totalprice: 100,
      depositpaid: true, bookingdates: { checkin: "2026-09-01", checkout: "2026-09-05" },
    },
  });
  expect(res.status()).toBe(200);
  // it comes back verbatim — the string was treated as data. That is CORRECT.
  expect((await res.json()).booking.firstname).toContain("DROP TABLE");
});

test("GOOD: GET on a non-existent booking returns 404", async ({ request }) => {
  const res = await request.get(`${BASE}/booking/99999999`);
  expect(res.status()).toBe(404);
});
