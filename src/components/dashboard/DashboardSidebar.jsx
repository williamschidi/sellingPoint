import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { DEFAULT_AGENT } from "../../api/mock/agents.js";
import { getAgentInitials } from "../../lib/properties/formatters.js";

const MAIN_NAV = [
  {
    id: "overview",
    label: "Overview",
    icon: "lucide:layout-grid",
    to: "/dashboard",
    end: true,
  },
  {
    id: "listings",
    label: "My Listings",
    icon: "lucide:home",
    to: "/dashboard/listings",
    countKey: "listings",
  },
  {
    id: "bookings",
    label: "Bookings",
    icon: "lucide:calendar",
    to: "/dashboard/bookings",
    countKey: "bookings",
  },
  {
    id: "inquiries",
    label: "Inquiries",
    icon: "lucide:message-square",
  },
];

const ACCOUNT_NAV = [
  { id: "profile", label: "Profile", icon: "lucide:user" },
  { id: "settings", label: "Settings", icon: "lucide:sun" },
];

export default function DashboardSidebar({
  agent = DEFAULT_AGENT,
  listingCount = 0,
  pendingBookings = 0,
}) {
  const initials = getAgentInitials(agent.name);
  const agentLocation = agent.location?.city ?? "Lagos";

  function renderBadge(item) {
    if (item.countKey === "listings" && listingCount > 0) {
      return (
        <span className="dashboard-sidebar-badge bg-white/15 text-white">
          {listingCount}
        </span>
      );
    }
    if (item.countKey === "bookings" && pendingBookings > 0) {
      return (
        <span className="dashboard-sidebar-badge bg-secondary/30 text-accent-mint">
          {pendingBookings}
        </span>
      );
    }
    return null;
  }

  return (
    <aside className="dashboard-sidebar" aria-label="Agent dashboard navigation">
      <NavLink to="/" className="dashboard-sidebar-logo flex items-center gap-2 no-underline">
        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-white/15">
          <Icon icon="lucide:home" className="h-4 w-4 text-white" aria-hidden />
        </div>
        <span>
          Selling<span className="text-accent-mint">Point</span>
        </span>
      </NavLink>

      <div className="dashboard-sidebar-section">
        <p className="dashboard-sidebar-label">Main</p>
        {MAIN_NAV.map((item) =>
          item.to ? (
            <NavLink
              key={item.id}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `dashboard-sidebar-item w-full text-left no-underline ${
                  isActive ? "dashboard-sidebar-item-active" : ""
                }`
              }
            >
              <Icon icon={item.icon} className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
              <span>{item.label}</span>
              {renderBadge(item)}
            </NavLink>
          ) : (
            <button
              key={item.id}
              type="button"
              className="dashboard-sidebar-item w-full text-left"
            >
              <Icon icon={item.icon} className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
              <span>{item.label}</span>
              {renderBadge(item)}
            </button>
          )
        )}
      </div>

      <div className="dashboard-sidebar-section">
        <p className="dashboard-sidebar-label">Account</p>
        {ACCOUNT_NAV.map((item) => (
          <button
            key={item.id}
            type="button"
            className="dashboard-sidebar-item w-full text-left"
          >
            <Icon icon={item.icon} className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto border-t border-white/10 px-3 pt-8">
        <div className="flex items-center gap-2.5 px-2 py-2.5">
          <div className="dashboard-avatar h-9 w-9 bg-white/15 text-[13px] text-white">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">{agent.name}</p>
            <p className="text-[10px] text-white/50">Agent · {agentLocation}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
