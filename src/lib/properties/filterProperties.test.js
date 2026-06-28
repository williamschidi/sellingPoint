import {
  filterProperties,
  getPaginationRange,
  parsePriceRange,
  sortProperties,
} from "./filterProperties.js";

const sampleProperties = [
  {
    id: "a",
    title: "Lagos Plot",
    price: "₦15,000,000",
    landSize: 800,
    propertyType: "Residential",
    verificationStatus: "verified",
    listedAt: "2026-06-01T10:00:00.000Z",
    location: { state: "Lagos", lga: "Eti-Osa", address: "Lekki" },
    description: "Prime land",
  },
  {
    id: "b",
    title: "Abuja Estate",
    price: "₦45,000,000",
    landSize: 1500,
    propertyType: "Commercial",
    verificationStatus: "pending",
    listedAt: "2026-05-01T10:00:00.000Z",
    location: { state: "Abuja", lga: "Municipal", address: "Central" },
    description: "Commercial corner",
  },
  {
    id: "c",
    title: "Rivers Land",
    price: "₦8,000,000",
    landSize: 500,
    propertyType: "Residential",
    verificationStatus: "verified",
    listedAt: "2026-06-10T10:00:00.000Z",
    location: { state: "Rivers", lga: "Port Harcourt", address: "GRA" },
    description: "Affordable plot",
  },
];

describe("parsePriceRange", () => {
  it("returns null for full catalog range", () => {
    expect(parsePriceRange("", "1000000", "50000000")).toBeNull();
  });

  it("returns narrowed range when min/max differ from defaults", () => {
    expect(parsePriceRange("", "5000000", "20000000")).toEqual({
      min: 5_000_000,
      max: 20_000_000,
    });
  });
});

describe("filterProperties", () => {
  it("filters by state and keyword", () => {
    const result = filterProperties(sampleProperties, {
      state: "Lagos",
      keyword: "prime",
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("a");
  });

  it("ignores full-range price filters", () => {
    const result = filterProperties(sampleProperties, {
      minPrice: "1000000",
      maxPrice: "50000000",
    });

    expect(result).toHaveLength(3);
  });

  it("filters by property type", () => {
    const result = filterProperties(sampleProperties, {
      types: "Commercial",
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("b");
  });

  it("filters by verification status", () => {
    const result = filterProperties(sampleProperties, {
      verification: "Pending",
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("b");
  });

  it("filters by land size bucket", () => {
    const result = filterProperties(sampleProperties, {
      sizes: "under-600",
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("c");
  });

  it("combines multiple filters", () => {
    const result = filterProperties(sampleProperties, {
      state: "Lagos",
      types: "Residential",
      verification: "Verified",
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("a");
  });
});

describe("sortProperties", () => {
  it("sorts by listedAt for latest", () => {
    const sorted = sortProperties(sampleProperties, "latest");
    expect(sorted.map((item) => item.id)).toEqual(["c", "a", "b"]);
  });
});

describe("getPaginationRange", () => {
  it("includes ellipsis markers for large page counts", () => {
    expect(getPaginationRange(5, 10)).toEqual([
      1,
      "ellipsis-start",
      4,
      5,
      6,
      "ellipsis-end",
      10,
    ]);
  });
});
