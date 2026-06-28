import { describe, expect, it } from "vitest";
import { buildGoogleCalendarUrl } from "./calendar.js";

describe("buildGoogleCalendarUrl", () => {
  it("builds a Google Calendar template URL with date and time", () => {
    const url = buildGoogleCalendarUrl({
      title: "Property inspection",
      dateKey: "2026-06-26",
      timeLabel: "10:00 AM",
      location: "Lekki, Lagos",
      details: "Reference: SP-INSP-001",
    });

    expect(url).toContain("calendar.google.com");
    expect(url).toContain("action=TEMPLATE");
    expect(url).toContain("text=Property");
    expect(url).toContain("dates=");
  });
});
