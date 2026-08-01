# Day 5 (Sat 1 Aug) — Self-Healing & Agentic AI

Part of the single course project. Session 5 material — two hands-on labs plus the
Break & Heal assessment and the MCP demo.

## Lab 5.1 — Make your locators resilient with AI  (30 min)

File: `resilient-locators.spec.ts` (reuses `pages/LoginPage.ts`).

```bash
npm run test:s5        # 3 tests, verified green against SauceDemo
```

Run it, then use Copilot to turn the BRITTLE locators into resilient ones and to rank
your page object's locators by fragility. Prompts are in the project [`PROMPTS.md`](../../PROMPTS.md) §Session 5.

## Lab 5.2 — Heal a broken test with the repair prompt pattern  (30 min)

File: `heal-me.spec.ts`. **This test fails on purpose — that's the exercise.**

```bash
npm run lab:heal       # watch it fail
npm run report         # open the trace, copy the real HTML at the moment of failure
```

Give Copilot the three ingredients — the error, the intent, and the current HTML — and
ask it to classify the failure, then fix it. Apply the fix and re-run. Then read the
commented "feature change" scenario at the foot of the file: that one you do NOT heal —
you write a new test. (The `@lab` tag keeps this deliberate failure out of `npm test`.)

## The rest of Session 5

- **Break & Heal (PA4)** — the scored version of Lab 5.2 (a suite with 7 failures, one of
  which must not be healed). Delivered separately.
- **Playwright MCP live demo** — an AI agent that drives the browser. Config is in the
  project's `.vscode/mcp.json`; the agent's tasks are in `PROMPTS.md` §Session 5.

## The big ideas

1. **Resilient locators** — role/text/testid over CSS; never positional XPath. Ask AI
   what would *break* each locator, not just to generate one.
2. **Self-healing loop** — Detect → Diagnose → Repair → **Judge**. The fourth step stays
   human: healing a changed feature = a green suite testing the wrong thing.
3. **The repair prompt pattern** — error + intent + current DOM → classify, fix, confidence.
4. **Assistants vs agents; MCP** — a bad suggestion is free; a bad *action* has consequences.
