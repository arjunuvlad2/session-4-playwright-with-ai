# Lab 6.1 — Design & Demo an Agentic Workflow  (60 min, pairs)

No spec file — you **drive the MCP agent** (set up in Session 5, `.vscode/mcp.json`,
Copilot Chat → Agent mode). The deliverable is a *guarded* workflow, not a test file.

## Write the contract FIRST (on paper, before you prompt)

```
AGENT GOAL:          ..................................................
ALLOWED TOOLS:       ..................................................
FORBIDDEN ACTIONS:   no file deletion · no external POSTs · no installs
CHECKPOINT 1 (plan):    agent proposes a plan  -> you approve in writing
CHECKPOINT 2 (diff):    generated code arrives as a diff -> you review it
CHECKPOINT 3 (verdict): you verify one of its claims yourself
```

## Run it in three phases

Pick a small feature (SauceDemo sorting, or the-internet login), then paste the phased
prompt from [`PROMPTS.md`](../../../PROMPTS.md) §Session 6 #1. The agent must **stop at each
checkpoint**. In phase 2, **reject at least one thing** it produces — there is always
something (a weak assertion, a raw selector, a hard-coded credential).

## Done when
- You have a written contract with explicit forbidden actions.
- All three checkpoints were exercised, with at least one real catch.
- You gave another pair a 3-minute demo: contract, one catch, "would I use this Monday?".
