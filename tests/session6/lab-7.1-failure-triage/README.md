# Lab 7.1 — Failure-Pile Triage  (40 min)

You triage **20 real failures** and give each one label. There's a runnable file here so you
can watch the whole pile go red in VS Code, then read each failure's evidence and classify it.

## See them fail

```bash
npm run lab:triage
```

Or open the **Testing** panel (beaker icon) → run `failure-pile.spec.ts` → **20 red**.
Each failure reproduces the exact error you'd see at 22:00, plus the surrounding
**evidence** (attached as an annotation — open `npm run report` to read it, or read the
comment above each test in `failure-pile.spec.ts`). The labels are deliberately **not** in
the file — classifying them is the whole exercise. (Tagged `@lab`, so `npm test` skips the
pile; you run it directly.)

> Watch the **twins**: `F06` and `F14` throw the *identical* error — only the evidence
> (a renamed button vs an empty panel from a 500) separates a TEST BUG from an APP BUG.

## The five labels — and only five

```
APP BUG  — the application code is wrong
TEST BUG — the test is wrong
ENV      — infrastructure / data / config
FLAKY    — passes on retry; timing-sensitive
STALE    — the feature changed; the test didn't
```

## Two passes
1. **Fast pass (AI, 15 min):** feed each failure to Copilot with the taxonomy; capture its
   label, confidence, and reasoning. Prompt is in [`PROMPTS.md`](../../../PROMPTS.md) §Session 6 #4.
2. **Challenge pass (you, 15 min):** take the 5 where the AI was least confident, read the
   raw evidence yourself, and set the **final label — yours, not the AI's**.

## Done when
- All 20 are on the triage sheet with a one-line justification and a fix-owner.
- You overturned or refined at least 3 of the AI's first-pass labels.
- Watch for the AI's bias: it over-labels TEST BUG (the test is the only code it sees).

> The blank **triage sheet** and the **facilitator answer key** are handed out separately
> (the answer key is facilitator-only — it is not in this repo).
