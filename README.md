# qa-project — Automation Testing Using AI (through Session 3)

Course project as it stands **after Session 3**. UI automation against SauceDemo:
first tests, the locator hierarchy, the Page Object Model, fixtures, and data-driven
testing. **Verified: 14 tests pass.**

> Session 4 (API testing) is added in the next push.

---

## Setup (one time — two commands)

Open this folder in VS Code (**File → Open Folder…**), open a terminal, and run:

```bash
npm install
npx playwright install chromium
```

**Prerequisite:** Node.js 20+ (`node -v`).

---

## Run the tests

```bash
npm test              # everything
npm run test:s2       # Session 2 labs (first test, locators)
npm run test:s3       # Session 3 labs (page objects, data-driven)

npm run headed        # run with the browser visible
npm run watch         # UI Mode — watch and debug
npm run report        # open the HTML report
npm run codegen       # record clicks on SauceDemo into test code
```

Run one file or test by name:

```bash
npx playwright test lab-3.1
npx playwright test -g "cart badge"
```

Expected: **14 passed.**

---

## Structure (organised by day)

```
qa-project/
├── README.md
├── package.json  ·  playwright.config.ts  ·  tsconfig.json
├── pages/                    ← Page Object Model (Session 3)
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── fixtures.ts           ← the loggedIn fixture
├── test-data/                ← data for the data-driven lab
│   ├── login-data.json
│   ├── checkout-data.json
│   └── test-data.csv
└── tests/
    ├── session2/  (Day 2, 18 Jul)  lab-3.1, lab-3.2  + README
    └── session3/  (Day 3, 25 Jul)  lab-3.3, lab-3.4  + README
```

Each `tests/sessionN/` folder has its own README describing that day's labs.

---

## Push to git

```bash
git init
git add .
git commit -m "Automation project through Session 3: UI automation"
git branch -M main
git remote add origin https://github.com/<you>/qa-project.git
git push -u origin main
```

(`node_modules/`, `test-results/` and `playwright-report/` are already git-ignored.)

---

## Course rules in this code

- **Locator hierarchy** — `getByRole` > text/label/placeholder > testid > stable CSS >
  positional XPath (**banned**).
- **No hard sleeps** — auto-waiting handles timing.
- **Pages expose, tests assert** — no `expect()` inside a page object.
- **Assert outcomes** — badge counts, item names, exact error text.

---

## Session 4 — API Testing (added 31 July)

Session 4 adds API testing against Restful-Booker, fully commented, plus a bonus lab.
**All the Copilot prompts we used today are in [`PROMPTS.md`](PROMPTS.md).**

- `tests/session4/01`–`04` — Lab 4.1: first API test (3 assertion layers), the CRUD chain,
  auth negatives (403), schema validation.
- `tests/session4/05`–`08` — bonus: data-driven, a reusable API client (`lib/BookingClient.ts`),
  negative/security testing, and scaffolding a suite for a brand-new API.

```bash
npm run test:s4      # run all the API tests (no browser needed)
```

API tests use Playwright's `request` fixture, so they need no browser. Each file opens
with a comment explaining what it teaches. Findings we caught in the API: a missing field
returns **500 (should be 400)**, a negative price is **accepted**, and DELETE returns
**201** (spec says 200/204).

---

## Session 5 — Self-Healing & MCP (added 1 August)

- `tests/session5/resilient-locators.spec.ts` — resilient vs brittle vs page-object
  locators; the seam where self-healing happens. Run: `npm run test:s5`.
- `.vscode/mcp.json` — Playwright MCP server config for the agent demo. Open this folder
  in VS Code, restart, and use Copilot Chat in **Agent** mode.
- Session 5 Copilot prompts (repair prompt pattern, MCP agent tasks) are in
  [`PROMPTS.md`](PROMPTS.md).

---

## Session 6 — Agents & Defect Intelligence (added 8 August)

- `tests/session6/lab-7.1-failure-triage/` — **Lab 7.1**: 20 real failures to triage. Run
  `npm run lab:triage` to watch the whole pile go red, then classify each with the five-label
  taxonomy (the labels aren't in the repo — that's the exercise).
- `tests/session6/lab-7.2-flaky/` — **Lab 7.2** (`npm run lab:flaky`) shows a test flake;
  **Exercise 7.2** (`npm run lab:deterministic`) makes you fix one — a fixed-wait flake vs the
  condition-wait fix, side by side.
- `tests/session6/lab-6.1-agentic-workflow/` — **Lab 6.1**: drive the MCP agent behind
  guardrails (pairs). Process lab — its contract and prompts are in the folder README.
- Session 6 Copilot prompts (agent contract, defect reports, RCA, triage) are in
  [`PROMPTS.md`](PROMPTS.md) §Session 6.
