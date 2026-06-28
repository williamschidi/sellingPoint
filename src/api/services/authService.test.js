import { describe, expect, it, vi } from "vitest";

vi.mock("../config.js", () => ({
  USE_MOCK_DATA: true,
}));

import {
  isAuthBackendConnected,
  isAuthEnabled,
  isMockAuthEnabled,
} from "./authService.js";

describe("authService mock mode", () => {
  it("uses mock auth while mock data mode is enabled", () => {
    expect(isMockAuthEnabled()).toBe(true);
    expect(isAuthBackendConnected()).toBe(false);
    expect(isAuthEnabled()).toBe(true);
  });
});
