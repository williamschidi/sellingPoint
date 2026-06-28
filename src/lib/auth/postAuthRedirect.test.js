import { describe, expect, it } from "vitest";
import { getPostAuthRedirect } from "./postAuthRedirect.js";

describe("getPostAuthRedirect", () => {
  it("sends agents to the dashboard after list-property flow", () => {
    expect(
      getPostAuthRedirect({
        role: "agent",
        intent: "list-property",
      })
    ).toBe("/dashboard");
  });

  it("returns the protected path for agents when provided", () => {
    expect(
      getPostAuthRedirect({
        role: "agent",
        from: "/dashboard/bookings",
      })
    ).toBe("/dashboard/bookings");
  });

  it("sends buyers to the homepage by default", () => {
    expect(getPostAuthRedirect({ role: "buyer" })).toBe("/");
  });

  it("returns a safe buyer destination when from is not agent-only", () => {
    expect(
      getPostAuthRedirect({
        role: "buyer",
        from: "/saved",
      })
    ).toBe("/saved");
  });
});
