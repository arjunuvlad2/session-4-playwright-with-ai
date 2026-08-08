# Lab 7.2 — Detect a Flaky Test  (30 min)  ← runnable

File: `flaky.spec.ts` — a test that fails ~half the time, on purpose.

```bash
npm run lab:flaky      # runs it 5x — watch some repeats PASS and some FAIL
```

That inconsistency **is** flakiness. Running with `--repeat-each` is how you surface
flakes so you can quarantine and fix them. (`@lab` keeps it out of `npm test`.)

## The trust arithmetic (say it out loud)
A 200-test suite with **6 tests flaky at 50%** throws **~3 false reds every run**.
Three cry-wolf failures and developers stop reading *any* failure — that's how a good
suite dies, from noise not bugs.

## The quarantine policy
Tag `@flaky` within 24h (excluded from gating) → root-cause within a sprint → fix or
delete. **Never** just ignore it.

## AI angle
Ask Copilot: *"why might this test be flaky, and how would I make it deterministic?"*
The usual culprits: a missing `await`, shared state, animation timing.

## Done when
- You saw the same test pass on some runs and fail on others.
- You can explain why 6 flaky tests can kill a 200-test suite.
- You asked AI how to make a flaky test deterministic.

---

## Exercise 7.2 — Make a Flaky Test Deterministic (the after-lab fix)  ← runnable, no Copilot

`flaky.spec.ts` shows you how to *spot* a flake; this exercise makes you *fix* one.

Files: `exercise-7.2-deterministic.spec.ts` + `banner-app.html` (a local page whose
success banner appears after a random 300–1700 ms delay — no server, no network).

```bash
npm run lab:deterministic   # runs BOTH tests 5x
```

- **BROKEN** — waits a fixed `1000 ms`, then reads once with `isVisible()` (no auto-wait).
  When the banner is slower than a second, it reads too early → red. Some repeats pass,
  some fail = **flaky**.
- **FIXED** — no fixed wait; `await expect(banner).toBeVisible()` waits for the *condition*.
  Passes on fast and slow runs, every time.

**The rule:** never wait for a NUMBER; wait for the THING to be true. A `waitForTimeout()`
in a real test is almost always a bug in waiting. (No Copilot needed — it's a rewrite.)
