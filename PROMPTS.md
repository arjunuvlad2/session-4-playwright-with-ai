# Session 4 — Every Copilot Prompt We Used Today

This is the single file with **all the contextual prompts** from today's API-testing
session. Each one shows **when** to use it, the **prompt to paste into Copilot Chat**,
and **what to check** in the answer.

The formula behind every prompt (from Session 1):
> **ROLE + CONTEXT + TASK + CONSTRAINTS + OUTPUT FORMAT**

And the golden rule of the whole course:
> **AI output is a suspect until your test run proves it innocent.** Run it, read it, correct it.

> Tip: open the file you want the code in **before** you prompt — Copilot reads your open
> tabs, so it writes code that fits.

---

## Lab 4.1 — building the core suite

### 1. Your first API test (→ `tests/01-first-api-test.spec.ts`)
```
Write a Playwright API test in TypeScript using the request fixture (no browser).
GET https://restful-booker.herokuapp.com/booking/1 and assert three things:
(1) the status is 200, (2) the body has a firstname and a numeric totalprice,
(3) the check-in date is before the check-out date. Explain each assertion in a comment.
```
**Check:** Did it use `{ request }`, not `{ page }`? Did it actually write the
date-before-date business rule, or only the easy checks? That third assertion is the
skill — AI often skips it unless you ask.

### 2. The full CRUD chain (→ `tests/02-crud-chain.spec.ts`)
```
Add a Playwright API test that runs the full Restful-Booker lifecycle as one chain
against https://restful-booker.herokuapp.com:
(1) POST /auth with {username:"admin", password:"password123"} and read the token;
(2) POST /booking with a sample booking (checkin before checkout) and read the bookingid;
(3) GET /booking/:id and assert 200 and the firstname round-trips;
(4) PATCH /booking/:id with header Cookie: token=<token>, change totalprice, assert 200;
(5) DELETE /booking/:id with the same cookie;
(6) GET /booking/:id again and assert 404.
Add a comment on the DELETE line noting the status you actually observe.
```
**Check:** Did it put the token in a `Cookie: token=...` header (correct for this API),
not an `Authorization: Bearer` header? Note the DELETE returns **201**, not 200/204 — a
real quirk to document.

### 3. Auth negatives (→ `tests/03-auth-negatives.spec.ts`)
```
Add two negative auth tests. On a freshly created booking:
(1) PATCH /booking/:id WITHOUT any token — assert the status is 403;
(2) DELETE /booking/:id with an invalid token "not-a-real-token" — assert 403.
Create the booking inside each test so they are independent.
```
**Check:** Both return **403**. Discuss: should an unauthenticated request be 401 instead?

### 4. Schema validation (→ `tests/04-schema-validation.spec.ts`)
```
Add a helper that checks a booking response has all required fields with the right
types: firstname string, lastname string, totalprice number, depositpaid boolean,
bookingdates.checkin and checkout strings. Do NOT mark additionalneeds as required.
Assert a GET response against it.
```
**Check:** The one-sample trap — make sure it did **not** require `additionalneeds`
(an optional field), or the suite would fail on valid bookings that omit it.

---

## Bonus lab — going deeper

### 5. Generate test data (→ `test-data/bookings.json`, used by `tests/05`)
```
Generate a JSON file with a "valid" array of 3 realistic hotel booking objects for the
Restful-Booker API. Each needs firstname, lastname, totalprice (number),
depositpaid (boolean), bookingdates with checkin and checkout (YYYY-MM-DD, checkin
before checkout), and an optional additionalneeds. Vary the prices widely.
Output valid JSON only.
```
**Check:** Does it parse? Are the dates sensible and the prices varied?

### 6. Data-driven test (→ `tests/05-data-driven.spec.ts`)
```
Write a Playwright API test file that imports test-data/bookings.json and, for each
object in the valid array, creates ONE test that POSTs it to
https://restful-booker.herokuapp.com/booking, asserts 200, reads the bookingid, then
GETs /booking/{id} and asserts the firstname round-trips. One named test per row.
```
**Check:** Each row is its own reported test (not a loop inside one test).

### 7. Build the API client (→ `lib/BookingClient.ts`, used by `tests/06`)
```
Create a TypeScript class BookingClient for the Restful-Booker API. Constructor takes a
Playwright APIRequestContext and an optional base URL. Methods: auth(username, password)
that POSTs to /auth and stores+returns the token; create(booking); get(id);
update(id, patch) that PATCHes with a Cookie: token=... header; delete(id) with the same
header. Each method returns the APIResponse.
```
**Check:** Do `update()` and `delete()` actually attach the token? That's the bit AI
sometimes forgets.

### 8. Refactor the chain onto the client (→ `tests/06-api-client.spec.ts`)
```
Write a Playwright API test that uses my BookingClient: authenticate, create a booking,
GET it (expect 200), update its totalprice and assert the new price, delete it
(expect 201 — a known quirk), then GET it again and expect 404. Keep the test readable
with no raw URLs or headers.
```
**Check:** The test now reads like a sentence, with no URLs or headers.

### 9. Negative & security ideas (→ `tests/07-negative-and-security.spec.ts`)
```
List 8 negative and edge-case tests for a booking-creation API that takes firstname,
lastname, totalprice, depositpaid and dates. Include: a missing required field, a
wrong-typed price, a negative price, an SQL-injection string in a name, and check-out
before check-in. For each, say what a well-behaved API SHOULD return.
```
**Check:** Then implement a few. The findings we caught: a **missing field returns 500
(should be 400)**, a **negative price is accepted**, and an **SQL string is stored as
plain data** (correct). A test that captures a weakness is a **finding**, not a failure.

### 10. Scaffold a suite for a NEW API (→ `tests/08-new-api-jsonplaceholder.spec.ts`)
```
JSONPlaceholder (https://jsonplaceholder.typicode.com) is a REST API with /posts,
/users and /comments. Write a Playwright API test file with four tests:
(1) GET /posts/1 returns 200 and has a title and a numeric userId;
(2) GET /users returns 200 and an array of 10 users each with an email;
(3) POST /posts returns 201 with a generated id;
(4) GET /posts?userId=1 returns only posts whose userId is 1. Use the request fixture.
```
**Check:** POST returns **201** (not 200) and the fake id is **101**. You just built a
suite for an API you'd never seen — the review is the skill.

---

## Two prompts you can reuse forever

**Explain any code Copilot wrote (understand before you trust):**
```
Explain this test line by line as if I'm new to API testing. What would make it fail?
```

**Fix a failing test (the repair pattern):**
```
This test failed. Here is (1) the error, (2) what the test was trying to do, and
(3) the actual response body. Explain the cause and propose a fix.
```


---

# Session 5 — Self-Healing & MCP prompts


All the contextual prompts from Session 5 (self-healing + agentic AI), in one file.
Each shows **when** to use it, the **prompt to paste**, and **what to check**.

The golden rule still holds:
> **AI output is a suspect until your test run (or your own eyes) prove it innocent.**

---

## 1. Resilient locators — make AI a risk analyst, not just a typist

Paste an element's HTML and its surrounding container, then:
```
Here is a button's HTML and its parent container: [paste].
Give me three things: (1) the most resilient Playwright locator for it,
(2) two ranked fallback locators, and (3) for EACH option, exactly what change to
the UI would break it. Prefer getByRole and getByText over CSS; never use a
position-based XPath.
```
**Check:** the value is in part (3). If it can't say what would break each locator,
it doesn't understand the fragility — and neither will you.

**Rank your existing locators by fragility:**
```
Here is my page object [paste]. Rank each locator from most to least fragile and
justify each ranking in one line. Which would be the first to break if a developer
refactored the page?
```

---

## 2. The repair prompt pattern — THE most useful technique today

When a test fails, give the AI THREE things — error, intent, current page — and ask
for a classification BEFORE a fix:
```
This Playwright test failed. Here is:
  1. the error:   [paste the TimeoutError / assertion error]
  2. the test's intent:   [one sentence — what the test was trying to do]
  3. the CURRENT page HTML around where the element used to be:
     [paste the DOM fragment — you can copy it from the trace viewer]
Classify the failure (rename / move / removal / app-bug / timing), propose the fix
as a diff to my page object, and state your confidence.
```
**Check:** demanding the classification first stops it from blindly patching a
FEATURE CHANGE that should become a new test instead. Where do you get ingredient 3?
Playwright's trace viewer (`npm run report` → click the trace icon) holds the DOM
snapshot at the moment of failure.

---

## 3. Visual validation — let a multimodal model look

```
Here is a screenshot of a product page. List any visual defects you can see —
broken or missing images, overlapping elements, misaligned text, wrong colours.
```
**Check:** this catches things functional tests are blind to (e.g. broken product
images that still pass every assertion) — with no baseline needed.

---

## 4. The Playwright MCP live demo — the agent's tasks

With the MCP server configured (see `.vscode/mcp.json`) and Copilot Chat in **agent
mode**, these are the instructions given to the agent, in order:

**Explore:**
```
Open https://www.saucedemo.com, log in as standard_user (password secret_sauce),
and map what a user can do on the inventory page. Report what you find.
```
**Verify a behaviour:**
```
Sort the products by price, low to high, and verify the sort is actually correct
by reading the prices on the page.
```
**Write a test from what it saw:**
```
Now write a Playwright test file that captures what you just verified, using the
page-object style in the pages/ folder.
```
**The deliberate mistake (to show supervision):**
```
Check that the cart works.
```
**Check:** the last instruction is intentionally vague. Watch the agent make a
reasonable-but-wrong interpretation, then correct it. The point: the agent SEES the
real page (no guessed locators), its test is grounded in what it observed, and it
still makes mistakes — so your review discipline transfers unchanged.

---

## 5. Homework prompt (set at the end of the day)

```
Look at one test suite you own. For each locator, tell me what UI change would kill
it, and rewrite the three most fragile ones to be resilient.
```
