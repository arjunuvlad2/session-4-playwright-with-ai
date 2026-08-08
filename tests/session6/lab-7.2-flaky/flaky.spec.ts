import { test, expect } from "@playwright/test";

/**
 * ── SESSION 6 · LAB 7.2 — FLAKY-TEST DETECTION ─────────────────────────────────────────
 * Module 7: how do you find a flaky test? You RUN IT SEVERAL TIMES and see if the
 * verdict changes. A test that is neither always-green nor always-red is flaky.
 *
 *   Detect it:   npm run lab:flaky
 *   (that runs: playwright test flaky --repeat-each=5)
 *
 * You'll see some of the 5 repeats pass and some fail — that inconsistency IS the
 * flakiness. A real suite hides flakes like this; running with --repeat-each surfaces
 * them so you can quarantine (tag @flaky, exclude from gating) and then fix or delete.
 *
 * Tagged @lab so it never gates the real suite (`npm test` skips it).
 * ─────────────────────────────────────────────────────────────────────────────
 */

test("flaky by design — fails about half the time @lab", async () => {
  // Intentionally non-deterministic. NEVER write a real test like this — the whole
  // point is to SEE what a flaky test looks like so you can recognise one.
  const roll = Math.random();
  expect(roll, `rolled ${roll.toFixed(2)} — needed > 0.5`).toBeGreaterThan(0.5);
});

test("stable — passes every time (the contrast) @lab", async () => {
  // A well-written test asserts something deterministic. Same result every run.
  expect(2 + 2).toBe(4);
});
