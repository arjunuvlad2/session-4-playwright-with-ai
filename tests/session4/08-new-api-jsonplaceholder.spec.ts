import { test, expect } from "@playwright/test";

/**
 * ── BONUS · PART 4 ───────────────────────────────────────────────────────────
 * Transfer the skill to a NEW API you've never tested.
 *
 * Target: JSONPlaceholder — a free, no-auth practice API (a fake blog with
 * posts, users and comments). The point: with the patterns from today you can
 * scaffold a suite for an unfamiliar API in minutes. This is a mini-capstone.
 *
 * Run:  npx playwright test 08
 * ─────────────────────────────────────────────────────────────────────────────
 */
const BASE = "https://jsonplaceholder.typicode.com";

test("GET a post is well-formed", async ({ request }) => {
  const res = await request.get(`${BASE}/posts/1`);
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body).toHaveProperty("title");
  expect(typeof body.userId).toBe("number");
});

test("GET all users returns a list of 10", async ({ request }) => {
  const res = await request.get(`${BASE}/users`);
  expect(res.status()).toBe(200);
  const users = await res.json();
  expect(Array.isArray(users)).toBe(true);
  expect(users.length).toBe(10);
  expect(users[0]).toHaveProperty("email");
});

test("POST a new post returns 201 with a generated id", async ({ request }) => {
  const res = await request.post(`${BASE}/posts`, {
    data: { title: "AI-assisted testing", body: "written in Session 4", userId: 1 },
  });
  expect(res.status()).toBe(201);
  const created = await res.json();
  // JSONPlaceholder FAKES creation — it always returns id 101 and doesn't really
  // store anything. Knowing that quirk is part of testing an unfamiliar API.
  expect(created.id).toBe(101);
  expect(created.title).toBe("AI-assisted testing");
});

test("nested resource: a user's posts all belong to that user", async ({ request }) => {
  const res = await request.get(`${BASE}/posts?userId=1`);
  expect(res.status()).toBe(200);
  const posts = await res.json();
  expect(posts.length).toBeGreaterThan(0);
  for (const p of posts) expect(p.userId).toBe(1); // every returned post is user 1's
});
