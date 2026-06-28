import { describe, expect, it } from "vitest";
import { buildSearchSuggestions } from "./suggestions.js";

const SAMPLE_PROPERTIES = [
  {
    title: "Lekki Phase 1 Plot",
    location: { address: "Admiralty Way", lga: "Eti-Osa", state: "Lagos" },
  },
  {
    title: "Port Harcourt Commercial Land",
    location: { address: "GRA Phase 2", lga: "Port Harcourt", state: "Rivers" },
  },
];

describe("buildSearchSuggestions", () => {
  it("returns empty array for short queries", () => {
    expect(buildSearchSuggestions(SAMPLE_PROPERTIES, "l")).toEqual([]);
  });

  it("matches titles, locations, and states", () => {
    const titleMatches = buildSearchSuggestions(SAMPLE_PROPERTIES, "lek");
    expect(titleMatches.some((item) => item.value === "Lekki Phase 1 Plot")).toBe(true);

    const stateMatches = buildSearchSuggestions(SAMPLE_PROPERTIES, "lag");
    expect(stateMatches.some((item) => item.value === "Lagos")).toBe(true);
  });

  it("respects the limit", () => {
    const suggestions = buildSearchSuggestions(SAMPLE_PROPERTIES, "la", 1);
    expect(suggestions).toHaveLength(1);
  });
});
