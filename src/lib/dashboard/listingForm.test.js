import { describe, expect, it } from "vitest";
import {
  computeListingProgress,
  LISTING_FORM_INITIAL,
  progressStatusLabel,
} from "./listingForm.js";

describe("computeListingProgress", () => {
  it("returns zero progress for empty form", () => {
    const result = computeListingProgress(LISTING_FORM_INITIAL);
    expect(result.basic).toBe(0);
    expect(result.location).toBe(0);
    expect(result.land).toBe(60);
    expect(result.images).toBe(0);
  });

  it("marks sections complete when required fields are filled", () => {
    const result = computeListingProgress({
      ...LISTING_FORM_INITIAL,
      title: "Lekki Plot",
      description: "Prime land",
      price: "12500000",
      state: "Lagos",
      lga: "Eti-Osa LGA",
      landSize: "600",
      images: [{ id: "1" }, { id: "2" }, { id: "3" }],
    });

    expect(result.basic).toBe(100);
    expect(result.location).toBe(100);
    expect(result.land).toBe(100);
    expect(result.images).toBe(100);
  });
});

describe("progressStatusLabel", () => {
  it("returns done label for complete sections", () => {
    expect(progressStatusLabel(100)).toEqual({ text: "✓ Done", tone: "done" });
  });
});
