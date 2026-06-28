import { describe, expect, it } from "vitest";
import {
  getListPropertyNavigationTarget,
  requiresRoleSelection,
} from "./authFlow.js";

describe("requiresRoleSelection", () => {
  it("requires role for list-property intent", () => {
    expect(requiresRoleSelection({ intent: "list-property" })).toBe(true);
  });

  it("requires role when redirecting from agent dashboard", () => {
    expect(requiresRoleSelection({ from: "/dashboard/listings" })).toBe(true);
  });

  it("does not require role for a regular sign-in visit", () => {
    expect(requiresRoleSelection({})).toBe(false);
  });
});

describe("getListPropertyNavigationTarget", () => {
  it("sends guests to sign-in with list-property intent", () => {
    expect(getListPropertyNavigationTarget({ isAuthenticated: false })).toEqual({
      to: "/sign-in",
      state: {
        intent: "list-property",
        from: "/dashboard",
      },
    });
  });

  it("sends authenticated agents to the dashboard", () => {
    expect(
      getListPropertyNavigationTarget({
        isAuthenticated: true,
        user: { role: "agent" },
      })
    ).toEqual({ to: "/dashboard" });
  });

  it("sends authenticated buyers to the homepage", () => {
    expect(
      getListPropertyNavigationTarget({
        isAuthenticated: true,
        user: { role: "buyer" },
      })
    ).toEqual({ to: "/" });
  });
});
