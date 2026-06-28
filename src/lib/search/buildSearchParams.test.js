import {
  buildListingsSearchUrl,
  buildResultsLabel,
  parseListingsSearchParams,
} from "./buildSearchParams.js";

describe("buildListingsSearchUrl", () => {
  it("builds base path without empty filters", () => {
    expect(buildListingsSearchUrl({})).toBe("/properties");
  });

  it("serializes keyword and state", () => {
    expect(
      buildListingsSearchUrl({ keyword: "lekki", state: "Lagos" })
    ).toBe("/properties?q=lekki&state=Lagos");
  });

  it("skips default sort and page values", () => {
    expect(buildListingsSearchUrl({ sort: "latest", page: 1 })).toBe(
      "/properties"
    );
  });
});

describe("parseListingsSearchParams", () => {
  it("parses URLSearchParams with defaults", () => {
    const params = new URLSearchParams("q=plot&state=Lagos&page=2");
    expect(parseListingsSearchParams(params)).toEqual({
      keyword: "plot",
      state: "Lagos",
      price: "",
      types: "",
      sizes: "",
      verification: "",
      minPrice: "",
      maxPrice: "",
      sort: "latest",
      page: 2,
    });
  });
});

describe("buildResultsLabel", () => {
  it("describes unfiltered results", () => {
    expect(buildResultsLabel({}, { total: 11 })).toBe(
      "11 properties across Nigeria"
    );
  });

  it("includes keyword and state", () => {
    expect(
      buildResultsLabel({ keyword: "lekki", state: "Lagos" }, { total: 2 })
    ).toBe('2 properties matching "lekki" in Lagos');
  });
});
