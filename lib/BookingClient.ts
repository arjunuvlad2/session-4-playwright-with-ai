import { APIRequestContext, APIResponse } from "@playwright/test";

/**
 * BookingClient — a reusable "API client" (see tests/06).
 *
 * WHY THIS EXISTS:
 * In our UI tests we used Page Objects so that every test didn't repeat the same
 * selectors. An API suite has the same problem: without this class, every test
 * repeats the base URL, the headers, and the token handling. This class puts all
 * of that knowledge in ONE place. Tests then read as plain intent.
 *
 * This is the API equivalent of a Page Object.
 */
export class BookingClient {
  private token = ""; // stored after auth() so update()/delete() can reuse it

  constructor(
    private request: APIRequestContext,
    private base = "https://restful-booker.herokuapp.com",
  ) {}

  /** Log in as admin and remember the token. Returns it too, in case you want it. */
  async auth(username = "admin", password = "password123"): Promise<string> {
    const res = await this.request.post(`${this.base}/auth`, { data: { username, password } });
    this.token = (await res.json()).token;
    return this.token;
  }

  /** Create a booking. Returns the raw response so the test can assert on it. */
  create(booking: object): Promise<APIResponse> {
    return this.request.post(`${this.base}/booking`, { data: booking });
  }

  /** Read a booking by id. */
  get(id: number): Promise<APIResponse> {
    return this.request.get(`${this.base}/booking/${id}`);
  }

  /** Partially update a booking — needs the token in a Cookie header. */
  update(id: number, patch: object): Promise<APIResponse> {
    return this.request.patch(`${this.base}/booking/${id}`, {
      headers: { Cookie: `token=${this.token}` }, // <-- Restful-Booker wants the token HERE, not in Authorization
      data: patch,
    });
  }

  /** Delete a booking — also needs the token. */
  delete(id: number): Promise<APIResponse> {
    return this.request.delete(`${this.base}/booking/${id}`, {
      headers: { Cookie: `token=${this.token}` },
    });
  }
}
