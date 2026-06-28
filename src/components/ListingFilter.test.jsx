import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ListingFilter from "./ListingFilter";

vi.mock("react-range", () => ({
  Range: () => null,
  getTrackBackground: () => "",
}));

const baseFilters = {
  keyword: "",
  state: "",
  price: "",
  types: "",
  sizes: "",
  verification: "",
  minPrice: "",
  maxPrice: "",
  sort: "latest",
  page: 1,
};

function renderFilter(overrides = {}) {
  const onApply = vi.fn();
  const onClear = vi.fn();
  const onClose = vi.fn();

  render(
    <ListingFilter
      filters={baseFilters}
      onApply={onApply}
      onClear={onClear}
      onClose={onClose}
      {...overrides}
    />
  );

  return { onApply, onClear, onClose };
}

describe("ListingFilter", () => {
  it("applies filters without calling onClose", () => {
    const { onApply, onClose } = renderFilter();

    fireEvent.click(screen.getByLabelText("Lagos"));
    fireEvent.click(screen.getByRole("button", { name: /apply filters/i }));

    expect(onApply).toHaveBeenCalledWith(
      expect.objectContaining({ state: "Lagos", page: 1 })
    );
    expect(onClose).not.toHaveBeenCalled();
  });

  it("clears filters without calling onClose", () => {
    const { onClear, onClose } = renderFilter({
      filters: { ...baseFilters, state: "Lagos", types: "Residential" },
    });

    fireEvent.click(screen.getByRole("button", { name: /clear all/i }));

    expect(onClear).toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });
});
