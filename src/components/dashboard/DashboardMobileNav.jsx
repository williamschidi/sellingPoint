import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    icon: "lucide:layout-grid",
    to: "/dashboard",
    end: true,
  },
  {
    id: "listings",
    label: "Listings",
    icon: "lucide:home",
    to: "/dashboard/listings",
  },
  {
    id: "bookings",
    label: "Bookings",
    icon: "lucide:calendar",
    to: "/dashboard/bookings",
    badge: true,
  },
  {
    id: "profile",
    label: "Profile",
    icon: "lucide:user",
  },
];

export default function DashboardMobileNav({ pendingBookings = 0 }) {
  return (
    <nav className="dashboard-mobile-nav" aria-label="Mobile dashboard navigation">
      {NAV_ITEMS.map((item) =>
        item.to ? (
          <NavLink
            key={item.id}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `dashboard-mobile-nav-item relative no-underline ${
                isActive ? "dashboard-mobile-nav-item-active" : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  icon={item.icon}
                  className={`h-[18px] w-[18px] ${
                    isActive ? "text-primary" : "text-[#6b7280]"
                  }`}
                  aria-hidden
                />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ) : (
          <button
            key={item.id}
            type="button"
            className="dashboard-mobile-nav-item relative"
          >
            <Icon icon={item.icon} className="h-[18px] w-[18px] text-[#6b7280]" aria-hidden />
            {item.badge && pendingBookings > 0 && (
              <span className="absolute top-0 right-[18px] flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-danger text-[8px] font-bold text-white">
                {pendingBookings}
              </span>
            )}
            <span>{item.label}</span>
          </button>
        )
      )}
    </nav>
  );
}
