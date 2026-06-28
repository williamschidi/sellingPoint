import { describe, expect, it, beforeEach } from "vitest";
import {
  clearMockSession,
  clearPendingRole,
  loadMockSession,
  loadPendingRole,
  saveMockSession,
  savePendingRole,
} from "./mockAuthStorage.js";

describe("mockAuthStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("persists and clears mock sessions", () => {
    saveMockSession({
      id: "mock-1",
      email: "agent@test.com",
      name: "Agent",
      role: "agent",
    });

    expect(loadMockSession()?.role).toBe("agent");
    clearMockSession();
    expect(loadMockSession()).toBeNull();
  });

  it("persists pending role in session storage", () => {
    savePendingRole("agent");
    expect(loadPendingRole()).toBe("agent");
    clearPendingRole();
    expect(loadPendingRole()).toBeNull();
  });
});
