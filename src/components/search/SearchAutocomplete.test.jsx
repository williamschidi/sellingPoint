import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchAutocomplete from "./SearchAutocomplete";

const properties = [
  {
    id: "1",
    title: "Lekki Corner Plot",
    location: { address: "Admiralty Way", lga: "Eti-Osa", state: "Lagos" },
  },
  {
    id: "2",
    title: "Abuja Gwarinpa Estate",
    location: { address: "Gwarinpa", lga: "Municipal", state: "Abuja" },
  },
];

describe("SearchAutocomplete", () => {
  it("shows suggestions for matching keywords", () => {
    render(
      <SearchAutocomplete
        value="lek"
        onChange={vi.fn()}
        properties={properties}
        inputId="test-search"
      />
    );

    fireEvent.focus(screen.getByRole("combobox"));

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByText("Lekki Corner Plot")).toBeInTheDocument();
  });

  it("supports keyboard navigation and selection", () => {
    const onChange = vi.fn();
    const onSelect = vi.fn();

    render(
      <SearchAutocomplete
        value="lek"
        onChange={onChange}
        onSelect={onSelect}
        properties={properties}
        inputId="test-search"
      />
    );

    const combobox = screen.getByRole("combobox");
    fireEvent.focus(combobox);

    fireEvent.keyDown(combobox, { key: "ArrowDown" });
    expect(combobox).toHaveAttribute("aria-activedescendant");

    fireEvent.keyDown(combobox, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith("Lekki Corner Plot");
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ value: "Lekki Corner Plot", type: "title" })
    );
  });

  it("closes suggestions on Escape", () => {
    render(
      <SearchAutocomplete
        value="lek"
        onChange={vi.fn()}
        properties={properties}
        inputId="test-search"
      />
    );

    const combobox = screen.getByRole("combobox");
    fireEvent.focus(combobox);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.keyDown(combobox, { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
