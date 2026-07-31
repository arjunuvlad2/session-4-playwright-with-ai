# Day 3 (Sat 25 July) — Framework: Page Objects & Data-Driven

Part of the single course project. These are the labs from Session 3.

## Labs in this folder

| Lab | File | What it teaches |
|-----|------|-----------------|
| **3.3** | `lab-3.3-pom-fixtures.spec.ts` | Page Object Model + the `loggedIn` fixture. Notice: **no selectors and no login code** in the tests — they read like sentences. Page objects live in `../../pages/`. |
| **3.4** | `lab-3.4-data-driven.spec.ts` | One test, many rows. Login rows from `test-data/login-data.json` and checkout rows from `checkout-data.json`. Each row is its own reported test. |

## Run just this day

```bash
npm run test:s3                     # both Session 3 labs
npx playwright test lab-3.3
npx playwright test lab-3.4
```

## Two demos worth running live

```bash
# Parallel speed — change one number, ~3x faster:
npx playwright test lab-3.4 --workers=1
npx playwright test lab-3.4 --workers=4

# Cross-browser — uncomment firefox/webkit in playwright.config.ts, then:
npx playwright install firefox webkit
npm test
```

> Setup (once, from the project root): `npm install` then `npx playwright install chromium`.
