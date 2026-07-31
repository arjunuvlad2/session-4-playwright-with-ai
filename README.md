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
