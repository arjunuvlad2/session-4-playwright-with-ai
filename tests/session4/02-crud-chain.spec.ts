import { test, expect } from "@playwright/test";

/**
 * ── LAB 4.1 · STEP 2 ─────────────────────────────────────────────────────────
 * Chaining requests: create → verify → update → delete → confirm gone.
 *
 * Real testing is rarely a single call. Here the OUTPUT of one call feeds the
 * next. Watch two things flow through the chain:
 *   • the TOKEN  — authorises every change (from step 1)
 *   • the ID     — every later step needs it (from step 2)
 *
 * Run:  npx playwright test 02
 * ─────────────────────────────────────────────────────────────────────────────
 */
const BASE = "https://restful-booker.herokuapp.com";

const sampleBooking = {
  firstname: "Ana", lastname: "Kowalska", totalprice: 150, depositpaid: true,
  bookingdates: { checkin: "2026-09-01", checkout: "2026-09-05" }, additionalneeds: "Breakfast",
};

test("full lifecycle: auth -> create -> get -> patch -> delete -> 404", async ({ request }) => {
  // 1) AUTH — send admin credentials, receive a token.
  const auth = await request.post(`${BASE}/auth`, {
    data: { username: "admin", password: "password123" },
  });
  const token = (await auth.json()).token;

  // 2) CREATE — the response gives us a bookingid we reuse below.
  const created = await request.post(`${BASE}/booking`, { data: sampleBooking });
  const { bookingid } = await created.json();

  // 3) GET — confirm it round-tripped.
  const got = await request.get(`${BASE}/booking/${bookingid}`);
  expect(got.status()).toBe(200);
  expect((await got.json()).firstname).toBe("Ana");

  // 4) PATCH — change the price. This needs the token in a Cookie header.
  const patched = await request.patch(`${BASE}/booking/${bookingid}`, {
    headers: { Cookie: `token=${token}` },
    data: { totalprice: 200 },
  });
  expect(patched.status()).toBe(200);
  expect((await patched.json()).totalprice).toBe(200);

  // 5) DELETE — also needs the token.
  const del = await request.delete(`${BASE}/booking/${bookingid}`, {
    headers: { Cookie: `token=${token}` },
  });
  // ⚠ FINDING / QUIRK: the REST spec says DELETE should return 200 or 204.
  // This API returns 201. Our test DOCUMENTS the real behaviour — that is a
  // finding, not a broken test.
  expect(del.status()).toBe(201);

  // 6) GET again — a 404 proves the booking is really gone.
  const gone = await request.get(`${BASE}/booking/${bookingid}`);
  expect(gone.status()).toBe(404);
});
