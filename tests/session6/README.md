# Day 6 (Sat 8 Aug) — Agents & Defect Intelligence

Three labs, one per folder. Two are runnable; one drives the MCP agent.

| Lab | Folder | Type | Run |
|-----|--------|------|-----|
| **6.1** Agentic workflow | `lab-6.1-agentic-workflow/` | drive the MCP agent (pairs) | — |
| **7.1** Failure-pile triage | `lab-7.1-failure-triage/` | **runnable** — 20 red to triage | `npm run lab:triage` |
| **7.2** Detect a flaky test | `lab-7.2-flaky/` | **runnable** (+ Exercise 7.2 fix) | `npm run lab:flaky` · `npm run lab:deterministic` |

Each folder has its own README with the full steps. All the Session 6 Copilot prompts are
in the project [`PROMPTS.md`](../../PROMPTS.md) §Session 6.

## The big ideas
1. **Guardrails** — the intern test; three human-in-the-loop checkpoints (plan/diff/verdict).
2. **Defect intelligence** — argue severity; label hypotheses as hypotheses; the five-label taxonomy.
3. **Flaky arithmetic** — a few coin-flip tests kill a suite through noise, not bugs.
4. **Determinism** — never wait for a number; wait for the thing to be true.
