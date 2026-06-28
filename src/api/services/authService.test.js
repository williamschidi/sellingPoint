import { describe, expect, it, vi } from "vitest";

vi.mock("../config.js", () => ({
  USE_MOCK_DATA: true,
}));

import { isAuthBackendConnected } from "./authService.js";

describe("isAuthBackendConnected", () => {
  it("returns false while mock data mode is enabled", () => {
    expect(isAuthBackendConnected()).toBe(false);
  });
});
