/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it } from "vitest";
import {
  getBookedSlotsFromStorage,
  loadInspectionRequests,
  saveInspectionRequest,
} from "./inspectionStorage.js";

describe("inspectionStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("persists and loads inspection requests", () => {
    const record = {
      id: "SP-TEST-001",
      propertyId: "plot-1",
      date: "2026-06-26",
      time: "10:00 AM",
      status: "pending",
    };

    saveInspectionRequest(record);

    expect(loadInspectionRequests()).toHaveLength(1);
    expect(loadInspectionRequests()[0].id).toBe("SP-TEST-001");
  });

  it("returns booked slots for a property", () => {
    saveInspectionRequest({
      id: "SP-TEST-002",
      propertyId: "plot-1",
      date: "2026-06-27",
      time: "2:00 PM",
      status: "pending",
    });

    expect(getBookedSlotsFromStorage("plot-1")).toEqual([
      { propertyId: "plot-1", date: "2026-06-27", time: "2:00 PM" },
    ]);
  });
});
