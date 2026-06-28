import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  getCachedPropertyById,
  getPropertyById,
  invalidatePropertiesCache,
  seedPropertyCache,
} from "./propertyService.js";

vi.mock("../config.js", () => ({
  USE_MOCK_DATA: true,
}));

vi.mock("../mock/handlers.js", () => ({
  mockGetProperties: vi.fn(),
  mockGetPropertyById: vi.fn(),
  mockSearchProperties: vi.fn(),
}));

import { mockGetPropertyById } from "../mock/handlers.js";

describe("propertyService cache", () => {
  beforeEach(() => {
    invalidatePropertiesCache();
    vi.clearAllMocks();
  });

  it("returns seeded property without fetching", () => {
    const property = { id: "test-id", title: "Test" };
    seedPropertyCache([property]);

    expect(getCachedPropertyById("test-id")).toEqual(property);
  });

  it("deduplicates concurrent getPropertyById calls", async () => {
    const property = { id: "dup-id", title: "Dup" };
    mockGetPropertyById.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(property), 20);
        })
    );

    const first = getPropertyById("dup-id");
    const second = getPropertyById("dup-id");

    await Promise.all([first, second]);
    expect(mockGetPropertyById).toHaveBeenCalledTimes(1);
    await expect(first).resolves.toEqual(property);
  });
});
