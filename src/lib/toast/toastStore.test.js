import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  getToastSnapshot,
  showToast,
  subscribeToToast,
} from "./toastStore.js";

describe("toastStore", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    showToast("reset");
    vi.runAllTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("notifies subscribers when a toast is shown", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToToast(listener);

    showToast("Saved", "success");

    expect(listener).toHaveBeenCalled();
    expect(getToastSnapshot()).toMatchObject({ message: "Saved", variant: "success" });

    unsubscribe();
  });

  it("clears toast after the default duration", () => {
    showToast("Done", "success");
    expect(getToastSnapshot()).not.toBeNull();

    vi.advanceTimersByTime(3200);
    expect(getToastSnapshot()).toBeNull();
  });
});
