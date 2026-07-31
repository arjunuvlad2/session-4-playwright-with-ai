import { test, expect } from "@playwright/test";

/**
 * ── LAB 4.1 · STEP 4 ─────────────────────────────────────────────────────────
 * Schema validation — checking the SHAPE of a response, thoroughly.
 *
 * Instead of checking one field at a time, we check every required field has the
 * right type. This catches "structure drift" — when an API quietly changes shape.
 *
 * ⚠ THE ONE-SAMPLE TRAP (very common with AI):
 * If you ask Copilot to build a schema from ONE response, and that response
 * happened to include an optional field, the AI marks it REQUIRED. Your suite
 * then fails on every valid response that omits it. Below, `additionalneeds` is
 * OPTIONAL — we deliberately do NOT require it.
 *
 * Run:  npx playwright test 04
 * ─────────────────────────────────────────────────────────────────────────────
 */
const BASE = "https://restful-booker.herokuapp.com";

const sampleBooking = {
  firstname: "Ana", lastname: "Kowalska", totalprice: 150, depositpaid: true,
  bookingdates: { checkin: "2026-09-01", checkout: "2026-09-05" }, additionalneeds: "Breakfast",
};

/** A tiny hand-written validator. In a bigger project you might use a library
 *  like zod — but the idea is the same: required fields, with the right types. */
function isValidBooking(b: any): boolean {
  return (
    typeof b.firstname === "string" &&
    typeof b.lastname === "string" &&
    typeof b.totalprice === "number" &&
    typeof b.depositpaid === "boolean" &&
    typeof b.bookingdates?.checkin === "string" &&
    typeof b.bookingdates?.checkout === "string"
    // NOTE: additionalneeds is intentionally NOT checked — it is optional.
  );
}

test("a GET response matches the booking schema", async ({ request }) => {
  const created = await request.post(`${BASE}/booking`, { data: sampleBooking });
  const { bookingid } = await created.json();

  const body = await (await request.get(`${BASE}/booking/${bookingid}`)).json();
  expect(isValidBooking(body)).toBe(true);
});
