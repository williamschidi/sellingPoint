import {
  buildActiveFilterChips,
  buildResultsRangeLabel,
} from "./activeFilters.js";

describe("buildActiveFilterChips", () => {
  it("returns chips for keyword and state filters", () => {
    const chips = buildActiveFilterChips({
      keyword: "lekki",
      state: "Lagos",
      price: "",
      types: "",
      sizes: "",
      verification: "",
      minPrice: "",
      maxPrice: "",
      sort: "latest",
      page: 1,
    });

    expect(chips.map((chip) => chip.id)).toEqual(["keyword", "state"]);
  });

  it("returns empty array when no filters are active", () => {
    expect(buildActiveFilterChips({})).toEqual([]);
  });
});

describe("buildResultsRangeLabel", () => {
  it("formats a paginated range", () => {
    expect(
      buildResultsRangeLabel({ currentPage: 2, total: 11, pageSize: 6 })
    ).toBe("7–11 of 11 results");
  });

  it("handles empty results", () => {
    expect(buildResultsRangeLabel({ total: 0 })).toBe("0 results");
  });
});
