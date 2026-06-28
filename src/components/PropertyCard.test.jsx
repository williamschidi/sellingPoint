import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PropertyCard from "./PropertyCard";

const property = {
  id: "plot-lekki-1",
  title: "Lekki Phase 1 Plot",
  subtitle: "Lekki Phase 1 Plot, Admiralty Way",
  price: "₦45,000,000",
  location: "Lekki, Lagos",
  size: "600 sqm",
  verificationStatus: "verified",
  image: "https://example.com/plot.jpg",
  imageAlt: "Lekki Phase 1 Plot in Lekki, Lagos",
};

function renderCard(props = {}) {
  return render(
    <MemoryRouter>
      <PropertyCard property={property} {...props} />
    </MemoryRouter>
  );
}

describe("PropertyCard", () => {
  it("renders listing details and verified badge", () => {
    renderCard();

    expect(screen.getByText("Lekki Phase 1 Plot, Admiralty Way")).toBeInTheDocument();
    expect(screen.getByText("Verified")).toBeInTheDocument();
    expect(screen.getByText("600 sqm")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view lekki phase 1 plot/i })).toHaveAttribute(
      "href",
      "/propertyDetail/plot-lekki-1"
    );
  });

  it("toggles save state via heart button", () => {
    const onToggleSave = vi.fn();
    renderCard({ onToggleSave, isSaved: false });

    fireEvent.click(screen.getByRole("button", { name: /save property/i }));
    expect(onToggleSave).toHaveBeenCalledWith("plot-lekki-1");
  });

  it("shows remove label when already saved", () => {
    renderCard({ onToggleSave: vi.fn(), isSaved: true });

    expect(screen.getByRole("button", { name: /remove from saved/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });
});
