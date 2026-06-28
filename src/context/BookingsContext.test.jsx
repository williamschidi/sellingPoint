import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { BookingsProvider, useBookings } from "./BookingsContext.jsx";

vi.mock("../api/services/inspectionService.js", () => ({
  listInspectionRequests: vi.fn(async () => [
    {
      id: "SP-IR-TEST-1",
      propertyId: "plot-1",
      date: "June 17, 2026",
      time: "11:00 AM",
      client: { fullName: "Test", phone: "+234800", notes: "" },
      status: "pending",
      createdAt: "2026-06-16T09:00:00.000Z",
    },
  ]),
}));

import { listInspectionRequests } from "../api/services/inspectionService.js";
import { withStatusChange } from "../lib/dashboard/bookingRecord.js";

function wrapper({ children }) {
  return <BookingsProvider>{children}</BookingsProvider>;
}

describe("BookingsContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads bookings and exposes counts", async () => {
    const { result } = renderHook(() => useBookings(), { wrapper });

    await waitFor(() => {
      expect(result.current.loadState).toBe("success");
    });

    expect(result.current.bookings).toHaveLength(1);
    expect(result.current.pendingCount).toBe(1);
  });

  it("updates a single booking without affecting others", async () => {
    listInspectionRequests.mockResolvedValueOnce([
      {
        id: "A",
        propertyId: "p1",
        date: "June 1, 2026",
        time: "10:00 AM",
        client: { fullName: "A", phone: "1", notes: "" },
        status: "pending",
        createdAt: "2026-06-01T09:00:00.000Z",
      },
      {
        id: "B",
        propertyId: "p2",
        date: "June 2, 2026",
        time: "11:00 AM",
        client: { fullName: "B", phone: "2", notes: "" },
        status: "pending",
        createdAt: "2026-06-02T09:00:00.000Z",
      },
    ]);

    const { result } = renderHook(() => useBookings(), { wrapper });

    await waitFor(() => {
      expect(result.current.bookings).toHaveLength(2);
    });

    act(() => {
      const booking = result.current.bookings[0];
      result.current.replaceBooking(
        withStatusChange(booking, "confirmed", "Approved")
      );
    });

    expect(result.current.bookings.find((b) => b.id === "A")?.status).toBe("confirmed");
    expect(result.current.bookings.find((b) => b.id === "B")?.status).toBe("pending");
    expect(result.current.pendingCount).toBe(1);
  });
});
