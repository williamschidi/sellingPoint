import { useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { listInspectionRequests } from "../api/services/inspectionService";
import { DEFAULT_AGENT } from "../api/mock/agents.js";
import AgentDashboardLayout from "../components/dashboard/AgentDashboardLayout";
import DashboardTopBar from "../components/dashboard/DashboardTopBar";
import { useAuth } from "../context/AuthContext";
import { usePropertiesStatus, usePropertyCatalog } from "../context/PropertiesContext";
import { usePageMeta } from "../hooks/usePageMeta";
import DashboardBookings from "./dashboard/DashboardBookings";
import DashboardListings from "./dashboard/DashboardListings";
import DashboardOverview from "./dashboard/DashboardOverview";

function DashboardShellSkeleton() {
  return (
    <div className="agent-dashboard-shell animate-pulse">
      <div className="hidden w-[220px] bg-primary/80 lg:block" />
      <div className="flex-1 bg-bg-soft p-7">
        <div className="h-10 rounded-xl bg-slate-200/70" />
      </div>
    </div>
  );
}

function getTopBarTitle(pathname) {
  if (pathname.startsWith("/dashboard/bookings")) return "Bookings";
  if (pathname.startsWith("/dashboard/listings")) return "My Listings";
  return "Dashboard";
}

function getPageMeta(pathname) {
  if (pathname.startsWith("/dashboard/bookings")) {
    return {
      title: "Bookings",
      description:
        "Manage inspection booking requests on the SellingPoint agent dashboard.",
    };
  }
  if (pathname.startsWith("/dashboard/listings")) {
    return {
      title: "My listings",
      description:
        "Add and manage your land listings on the SellingPoint agent dashboard.",
    };
  }
  return {
    title: "Agent dashboard",
    description:
      "Manage listings, respond to inspection requests, and upload title documents on the SellingPoint agent dashboard.",
  };
}

export default function Dashboard() {
  const location = useLocation();
  const isListingsRoute = location.pathname.startsWith("/dashboard/listings");
  const { user } = useAuth();
  const { loadState } = usePropertiesStatus();
  const properties = usePropertyCatalog();
  const [pendingBookings, setPendingBookings] = useState(0);

  const agent = useMemo(() => {
    if (user?.name) {
      return {
        ...DEFAULT_AGENT,
        name: user.name,
        location: DEFAULT_AGENT.location,
      };
    }
    return DEFAULT_AGENT;
  }, [user?.name]);

  const pageMeta = getPageMeta(location.pathname);

  usePageMeta({
    ...pageMeta,
    path: location.pathname,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadBookingCount() {
      try {
        const data = await listInspectionRequests();
        if (!cancelled) {
          setPendingBookings(data.filter((item) => item.status === "pending").length);
        }
      } catch {
        if (!cancelled) setPendingBookings(0);
      }
    }

    loadBookingCount();
    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  if (loadState === "loading") {
    return <DashboardShellSkeleton />;
  }

  return (
    <AgentDashboardLayout
      agent={agent}
      listingCount={properties.length}
      pendingBookings={pendingBookings}
      notificationCount={pendingBookings}
      showDefaultTopBar={!isListingsRoute}
      topBar={
        !isListingsRoute ? (
          <DashboardTopBar
            title={getTopBarTitle(location.pathname)}
            notificationCount={pendingBookings}
          />
        ) : null
      }
    >
      <Routes>
        <Route index element={<DashboardOverview agentName={agent.name} />} />
        <Route path="listings" element={<DashboardListings />} />
        <Route path="bookings" element={<DashboardBookings />} />
      </Routes>
    </AgentDashboardLayout>
  );
}
