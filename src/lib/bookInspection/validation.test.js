import {
  hasValidationErrors,
  validateBooking,
} from "./validation.js";

describe("validateBooking", () => {
  const base = {
    selectedDate: new Date("2026-06-26"),
    selectedTime: "10:00 AM",
    clientDetails: {
      fullName: "Ada Lovelace",
      phone: "+234 814 400 2759",
      notes: "",
      confirmed: true,
    },
  };

  it("returns no errors for a valid booking", () => {
    expect(validateBooking(base)).toEqual({});
    expect(hasValidationErrors(validateBooking(base))).toBe(false);
  });

  it("requires confirmation before submit", () => {
    const errors = validateBooking({
      ...base,
      clientDetails: { ...base.clientDetails, confirmed: false },
    });

    expect(errors.confirmed).toBeTruthy();
  });

  it("validates phone format", () => {
    const errors = validateBooking({
      ...base,
      clientDetails: { ...base.clientDetails, phone: "abc" },
    });

    expect(errors.phone).toBeTruthy();
  });
});
