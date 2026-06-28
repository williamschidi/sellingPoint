import { describe, expect, it } from "vitest";
import { AGENT_DASHBOARD_SEED_REQUESTS } from "./seedRequests.js";
import {
  countBookingsByStatus,
  filterAndSortBookings,
  getBookingStatusMeta,
} from "./bookings.js";

const propertyTitles = {
  "lekki-phase-1-residential-plot": "Prime Residential Plot",
  "gra-extension-corner-piece": "GRA Extension Land",
};

describe("countBookingsByStatus", () => {
  it("counts bookings by status", () => {
    const counts = countBookingsByStatus(AGENT_DASHBOARD_SEED_REQUESTS);
    expect(counts.total).toBe(6);
    expect(counts.pending).toBe(2);
    expect(counts.approved).toBe(1);
    expect(counts.declined).toBe(1);
  });
});

describe("filterAndSortBookings", () => {
  it("filters by status and search query", () => {
    const result = filterAndSortBookings(
      AGENT_DASHBOARD_SEED_REQUESTS,
      propertyTitles,
      { status: "pending", search: "tunde" }
    );

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("SP-IR-DEMO-001");
  });

  it("sorts oldest first", () => {
    const result = filterAndSortBookings(
      AGENT_DASHBOARD_SEED_REQUESTS,
      propertyTitles,
      { sort: "oldest" }
    );

    expect(result[0].id).toBe("SP-IR-DEMO-005");
  });

  it("filters by inspection date range", () => {
    const result = filterAndSortBookings(
      AGENT_DASHBOARD_SEED_REQUESTS,
      propertyTitles,
      { inspectionDateFrom: "2026-06-16", inspectionDateTo: "2026-06-20" }
    );

    expect(result.map((item) => item.id)).toEqual([
      "SP-IR-DEMO-002",
      "SP-IR-DEMO-001",
    ]);
  });
});

describe("getBookingStatusMeta", () => {
  it("returns approved label for confirmed status", () => {
    expect(getBookingStatusMeta("confirmed").label).toBe("Approved");
  });
});
