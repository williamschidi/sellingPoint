import { describe, expect, it } from "vitest";
import {
  getBookingActionsForStatus,
  getBookingDrawerActionsForStatus,
} from "./bookingActions.js";

describe("getBookingActionsForStatus", () => {
  it("returns pending actions", () => {
    const actions = getBookingActionsForStatus("pending");
    expect(actions.map((item) => item.id)).toEqual([
      "view",
      "approve",
      "decline",
      "reschedule",
      "contact",
      "delete",
    ]);
  });

  it("returns approved actions for confirmed status", () => {
    const actions = getBookingActionsForStatus("confirmed");
    expect(actions.map((item) => item.id)).toEqual([
      "view",
      "complete",
      "reschedule",
      "contact",
      "cancelApproval",
    ]);
  });

  it("returns declined actions", () => {
    const actions = getBookingActionsForStatus("declined");
    expect(actions.map((item) => item.id)).toEqual([
      "view",
      "reconsider",
      "contact",
      "delete",
    ]);
  });
  it("returns completed actions", () => {
    const actions = getBookingActionsForStatus("completed");
    expect(actions.map((item) => item.id)).toEqual(["view", "archive"]);
  });
});

describe("getBookingDrawerActionsForStatus", () => {
  it("shows only approve and decline for pending bookings", () => {
    const actions = getBookingDrawerActionsForStatus("pending");
    expect(actions.map((item) => item.id)).toEqual(["approve", "decline"]);
  });

  it("includes complete and cancel approval for approved bookings", () => {
    const actions = getBookingDrawerActionsForStatus("confirmed");
    expect(actions.map((item) => item.id)).toEqual([
      "complete",
      "reschedule",
      "contact",
      "cancelApproval",
    ]);
  });
});
