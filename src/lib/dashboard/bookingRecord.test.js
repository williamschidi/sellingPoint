import { describe, expect, it } from "vitest";
import {
  normalizeBookingRecord,
  withInternalNote,
  withStatusChange,
} from "./bookingRecord.js";

const baseBooking = {
  id: "SP-IR-TEST",
  propertyId: "plot-1",
  date: "June 17, 2026",
  time: "11:00 AM",
  client: { fullName: "Test User", phone: "+2348000000000", notes: "" },
  confirmed: true,
  status: "pending",
  createdAt: "2026-06-16T09:00:00.000Z",
};

describe("bookingRecord", () => {
  it("normalizes booking history", () => {
    const booking = normalizeBookingRecord(baseBooking);
    expect(booking.statusHistory).toHaveLength(1);
    expect(booking.internalNotes).toEqual([]);
  });

  it("appends status history on approval", () => {
    const booking = normalizeBookingRecord(baseBooking);
    const approved = withStatusChange(booking, "confirmed", "Approved by agent");
    expect(approved.status).toBe("confirmed");
    expect(approved.statusHistory).toHaveLength(2);
    expect(approved.declineReason).toBe("");
  });

  it("clears decline reason when reconsidering", () => {
    const declined = withStatusChange(
      normalizeBookingRecord(baseBooking),
      "declined",
      "Unavailable"
    );
    const pending = withStatusChange(declined, "pending", "Reconsidered");
    expect(pending.status).toBe("pending");
    expect(pending.declineReason).toBe("");
  });

  it("stores internal notes", () => {
    const booking = normalizeBookingRecord(baseBooking);
    const withNote = withInternalNote(booking, "Follow up tomorrow");
    expect(withNote.internalNotes).toHaveLength(1);
    expect(withNote.internalNotes[0].text).toBe("Follow up tomorrow");
  });
});
