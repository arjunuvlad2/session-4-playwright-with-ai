import { test, expect } from "@playwright/test";
import data from "../../test-data/bookings.json";

/**
 * ── BONUS · PART 1 ───────────────────────────────────────────────────────────
 * Data-driven testing: one test definition, many rows of data.
 *
 * We separate DATA (test-data/bookings.json) from LOGIC (this file). To add a
 * case you add a row of JSON — you don't write a new test.
 *
 * The `for` loop creates one SEPARATELY-REPORTED test per row. If row 2 fails,
 * rows 1 and 3 still run and report. A loop INSIDE one test would hide that.
 *
 * Run:  npx playwright test 05
 * ─────────────────────────────────────────────────────────────────────────────
 */
const BASE = "https://restful-booker.herokuapp.com";

for (const b of data.valid) {
  test(`create + verify booking: ${b.firstname} ${b.lastname} (price ${b.totalprice})`, async ({ request }) => {
    const created = await request.post(`${BASE}/booking`, { data: b });
    expect(created.status()).toBe(200);

    const { bookingid, booking } = await created.json();
    expect(booking.firstname).toBe(b.firstname);  // the API echoes back what we sent
    expect(booking.totalprice).toBe(b.totalprice);

    const got = await request.get(`${BASE}/booking/${bookingid}`);
    expect(got.status()).toBe(200);
    expect((await got.json()).lastname).toBe(b.lastname);
  });
}
