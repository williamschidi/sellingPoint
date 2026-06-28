import { BOOKING_STATUS_TABS } from "../../../lib/dashboard/bookingTabs.js";

export default function BookingsStatusTabs({ activeStatus, onChange, counts }) {
  function tabCount(tab) {
    if (tab.id === "all") return counts.total;
    if (tab.id === "approved") return counts.approved;
    return counts[tab.id] ?? 0;
  }

  return (
    <div
      className="mb-4 flex gap-2 overflow-x-auto pb-1"
      role="tablist"
      aria-label="Filter bookings by status"
    >
      {BOOKING_STATUS_TABS.map((tab) => {
        const isActive = activeStatus === tab.value;
        const count = tabCount(tab);

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            className={`dashboard-bookings-tab shrink-0 ${
              isActive ? "dashboard-bookings-tab-active" : ""
            }`}
          >
            {tab.label}
            <span
              className={`dashboard-bookings-tab-count ${
                isActive ? "dashboard-bookings-tab-count-active" : ""
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
