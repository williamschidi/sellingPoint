import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function DashboardTopBar({ title = "Dashboard", notificationCount = 0 }) {
  return (
    <div className="dashboard-topbar hidden lg:flex">
      <h1 className="dashboard-topbar-title">{title}</h1>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          className="dashboard-btn-icon relative"
          aria-label={`Notifications${notificationCount ? ` (${notificationCount})` : ""}`}
        >
          <Icon icon="lucide:bell" className="h-[18px] w-[18px]" aria-hidden />
          {notificationCount > 0 && (
            <span className="dashboard-notif-badge">{notificationCount}</span>
          )}
        </button>

        <Link to="/dashboard/listings" className="dashboard-btn-add no-underline">
          <Icon icon="lucide:plus" className="h-4 w-4" aria-hidden />
          Add Listing
        </Link>
      </div>
    </div>
  );
}
