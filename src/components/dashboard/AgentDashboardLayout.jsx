import DashboardSidebar from "./DashboardSidebar.jsx";
import DashboardMobileHeader from "./DashboardMobileHeader.jsx";
import DashboardMobileNav from "./DashboardMobileNav.jsx";

export default function AgentDashboardLayout({
  agent,
  listingCount,
  pendingBookings,
  notificationCount,
  topBar = null,
  showDefaultTopBar = true,
  children,
}) {
  return (
    <div className="agent-dashboard-shell">
      <DashboardSidebar
        agent={agent}
        listingCount={listingCount}
        pendingBookings={pendingBookings}
      />

      <div className="dashboard-main pb-20 lg:pb-0">
        <DashboardMobileHeader
          agent={agent}
          notificationCount={notificationCount}
        />
        {showDefaultTopBar && topBar}
        {children}
      </div>

      <DashboardMobileNav pendingBookings={pendingBookings} />
    </div>
  );
}
