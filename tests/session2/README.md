# Day 2 (Sat 18 July) — First Playwright Tests

Part of the single course project. These are the labs from Session 2.

## Labs in this folder

| Lab | File | What it teaches |
|-----|------|-----------------|
| **3.1** | `lab-3.1-first-test.spec.ts` | The anatomy of a test: `goto`, actions, assertions. Log in to SauceDemo and assert the inventory page. |
| **3.2** | `lab-3.2-locators.spec.ts` | The locator hierarchy (`getByRole` > text/label > testid > CSS > **no XPath**), asserting outcomes not just "page loaded", and a negative test. |

## Run just this day

```bash
npm run test:s2                     # both Session 2 labs
npx playwright test lab-3.1         # just the first test
npx playwright test lab-3.2 --headed  # watch the locators lab in a real browser
```

> Setup (once, from the project root): `npm install` then `npx playwright install chromium`.
> Full details and the command cheat-sheet are in the project root `README.md`.
