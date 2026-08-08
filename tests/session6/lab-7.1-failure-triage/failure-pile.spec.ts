import { test, expect } from "@playwright/test";

/**
 * ── SESSION 6 · LAB 7.1 — THE FAILURE PILE (20 real failures to triage) ─────────────
 * This file exists so you can SEE the pile go red in VS Code, then triage it.
 *
 *   Show them all fail:   npm run lab:triage
 *   Or: open the Testing panel (beaker icon) → run "failure-pile.spec.ts" → 20 red.
 *
 * Each test reproduces one real end-of-night failure — the exact error you'd see, plus
 * the surrounding EVIDENCE (attached as an annotation; open `npm run report` to read it,
 * or read the comment above each test). Your job is to give each one ONE label:
 *
 *      APP BUG  — the application code is wrong
 *      TEST BUG — the test is wrong
 *      ENV      — infrastructure / data / config
 *      FLAKY    — passes on retry; timing-sensitive
 *      STALE    — the feature changed; the test didn't
 *
 * The labels are NOT in this file on purpose — triage is the exercise. The facilitator
 * holds the answer key. Watch the twins: F06 and F14 throw the *identical* error; only
 * the evidence tells them apart.
 *
 * Tagged @lab so the pile never gates the real suite (`npm test` skips it). We run it
 * directly, on purpose, to look at the failures.
 * ─────────────────────────────────────────────────────────────────────────────
 */

type Failure = { id: string; title: string; evidence: string; fail: () => void };

const PILE: Failure[] = [
  {
    id: "F01", title: "checkout › order total includes VAT",
    evidence: "Screenshot: order summary shows subtotal £29.99, VAT line reads '£0.00'. App log 21:14:03: TaxService timeout after 2000ms, returned default 0.",
    fail: () => expect("£29.99", "order summary total").toBe("£32.39"),
  },
  {
    id: "F02", title: "inventory › sort by price descending",
    evidence: "DOM snapshot: rendering unchanged for 14 months. The assertion string `${price} ${name}` was built in the wrong order in the test; the page shows `${name} ${price}`.",
    fail: () => expect("£79.99 Echo Headset", "first item text").toEqual("Echo Headset £79.99"),
  },
  {
    id: "F03", title: "login › SSO redirect completes",
    evidence: "All 6 tests hitting sso.staging.internal failed identically 02:00–02:40. Infra channel: staging DNS maintenance window 02:00–03:00.",
    fail: () => { throw new Error("page.goto: net::ERR_NAME_NOT_RESOLVED at https://sso.staging.internal/auth\n    at LoginPage.goto (pages/LoginPage.ts:12)"); },
  },
  {
    id: "F04", title: "profile › save phone number",
    evidence: "App log: NullPointerException at PhoneValidator.normalize(PhoneValidator.java:88) when country code omitted. PUT /api/profile → 500. Reproduces manually.",
    fail: () => { throw new Error('expect(locator).toHaveText("Saved!") timed out 5000ms\n    Received: "Error: something went wrong"\n    network: PUT /api/profile → 500'); },
  },
  {
    id: "F05", title: "dashboard › widgets render",
    evidence: "Run history last 10 nightlies: P F P P F P P P F P. Fails only on worker 4 (slowest VM). Fourth widget lazy-loads; test asserts count immediately after first match.",
    fail: () => expect(3, "widget count").toBe(4),
  },
  {
    id: "F06", title: "orders › confirm order (suite A)",
    evidence: "DOM snapshot AT FAILURE: <button class=\"confirm-btn btn-primary\">Confirm order</button> present and enabled. Element renamed in last week's frontend refactor (PR #412). Compare with F14.",
    fail: () => { throw new Error("TimeoutError: locator('.confirm-order') not found — waited 30000ms\n    at orders-a.spec.ts:33 — click('.confirm-order')"); },
  },
  {
    id: "F07", title: "search › special characters",
    evidence: "App log: SQL syntax error near \"'Brien\". GET /api/search?q=O'Brien → 500. Also a security finding (injection surface) — escalate.",
    fail: () => { throw new Error('expect(results).toContainText("O\'Brien") timed out\n    Received: "500 Internal Server Error"\n    network: GET /api/search?q=O\'Brien → 500'); },
  },
  {
    id: "F08", title: "cart › free shipping over £50",
    evidence: "Product announcement 1 Jul: free-shipping threshold raised £50 → £75. Basket total £54.20. Test asserts last quarter's business rule.",
    fail: () => expect("£2.99", "shipping cost").toBe("FREE"),
  },
  {
    id: "F09", title: "reports › export PDF",
    evidence: "Only fails on runner ci-linux-03 since its image update Tuesday. /tmp/exports owned by root on that runner. Passes on 01, 02, 04.",
    fail: () => { throw new Error("Error: EACCES: permission denied, open '/tmp/exports/report.pdf'\n    at exports.spec.ts:22"); },
  },
  {
    id: "F10", title: "signup › welcome email sent",
    evidence: "The flag window.__emailSent was a debug hook the devs removed in March. The email itself (per mail-catcher log) WAS sent; the test asserts an implementation detail that no longer exists.",
    fail: () => expect(undefined, "window.__emailSent").toBe(true),
  },
  {
    id: "F11", title: "payments › declined card shows message",
    evidence: "POST /api/pay → 402 {error_code: 'card_declined'}. Frontend maps error_code→message via lookup table; 'card_declined' key missing after copy refactor. Real users see literal 'undefined'.",
    fail: () => expect("undefined", "declined message").toBe("Your card was declined"),
  },
  {
    id: "F12", title: "notifications › toast disappears",
    evidence: "Toast auto-dismisses after 4800ms; assertion timeout is 5000ms — margin 200ms. Run history: fails ~1 in 4, always on loaded workers. Timing race.",
    fail: () => { throw new Error("expect(locator).toBeHidden() timed out 5000ms\n    at toast.spec.ts:31 — toast auto-dismisses after 4800ms"); },
  },
  {
    id: "F13", title: "api › create booking",
    evidence: "Suite config expects the mock API on :8081; the CI job that boots it was skipped (pipeline: 'mock-api — skipped, cache restore failed'). All 9 API tests failed identically.",
    fail: () => { throw new Error("apiRequestContext.post: connect ECONNREFUSED 127.0.0.1:8081\n    at api/bookings.spec.ts:15"); },
  },
  {
    id: "F14", title: "orders › confirm order (suite B)",
    evidence: "DOM snapshot AT FAILURE: order summary panel is EMPTY — no confirm control of any class. Network: GET /api/order-summary → 500 (OrderSummaryService OOM, app log 03:12:44). Same error text as F06 — different cause.",
    fail: () => { throw new Error("TimeoutError: locator('.confirm-order') not found — waited 30000ms\n    at orders-b.spec.ts:41 — click('.confirm-order')"); },
  },
  {
    id: "F15", title: "admin › bulk delete users",
    evidence: "The remaining row is the CURRENT admin — the app (correctly, per spec ADM-7) refuses self-deletion. The test's expectation is wrong, not the app.",
    fail: () => expect(1, "rows after bulk delete").toBe(0),
  },
  {
    id: "F16", title: "i18n › German locale renders dates",
    evidence: "App log: date parser throws on de-DE since library upgrade in release 4.2. English locale fine. Reproduces manually in a de-DE browser.",
    fail: () => expect("Invalid Date", "de-DE date").toBe("15.07.2026"),
  },
  {
    id: "F17", title: "upload › progress reaches 100%",
    evidence: "Test polls the progress label once after a fixed 3s waitForTimeout. Run history: P F P P P F P P. On slow runs the final tick lands after the read. The hard sleep is the defect.",
    fail: () => expect("99%", "upload progress").toBe("100%"),
  },
  {
    id: "F18", title: "nav › products menu has 5 categories",
    evidence: "Marketing launched the 'Outlet' category on 8 Jul (release notes). Menu is correct; the test's hardcoded 5 encodes the old catalogue.",
    fail: () => expect(6, "menu categories").toBe(5),
  },
  {
    id: "F19", title: "cart › badge count after add",
    evidence: "Notification badge and promo badge share the class. Selector was never specific; passed before only because the other badges rendered later. DOM unchanged this release.",
    fail: () => { throw new Error("strict mode violation: locator('.badge') resolved to 3 elements\n    at cart-badge.spec.ts:20"); },
  },
  {
    id: "F20", title: "password reset › expired token rejected",
    evidence: "App accepted an expired token (aged 61 min, limit 60) and reset the password. App log: TokenValidator comparing seconds vs milliseconds since release 4.2. Security-relevant, Sev-1 candidate.",
    fail: () => expect("/reset/success", "post-reset URL").toMatch(/.*token-expired/),
  },
];

for (const f of PILE) {
  test(`${f.id} · ${f.title} @lab`, async () => {
    // The evidence you triage from — also visible in `npm run report`.
    test.info().annotations.push({ type: "evidence", description: f.evidence });
    f.fail();
  });
}
