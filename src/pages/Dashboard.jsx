import { useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { DEFAULT_AGENT } from "../api/mock/agents.js";
import AgentDashboardLayout from "../components/dashboard/AgentDashboardLayout";
import DashboardTopBar from "../components/dashboard/DashboardTopBar";
import { BookingsProvider, useBookings } from "../context/BookingsContext";
import { useAuth } from "../context/AuthContext";
import { usePropertiesStatus, usePropertyCatalog } from "../context/PropertiesContext";
import DataStatusPanel from "../components/common/DataStatusPanel";
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

function DashboardShell() {
  const location = useLocation();
  const isListingsRoute = location.pathname.startsWith("/dashboard/listings");
  const { user } = useAuth();
  const { loadState, reload: reloadProperties } = usePropertiesStatus();
  const properties = usePropertyCatalog();
  const { pendingCount } = useBookings();

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

  if (loadState === "loading") {
    return <DashboardShellSkeleton />;
  }

  if (loadState === "error") {
    return (
      <div className="agent-dashboard-shell">
        <div className="flex flex-1 items-center justify-center bg-bg-soft p-6">
          <DataStatusPanel
            message="Could not load your property catalogue. Check your connection and try again."
            onRetry={reloadProperties}
            className="max-w-md rounded-2xl border border-[#e5e7eb] bg-white px-6 py-10 text-center"
          />
        </div>
      </div>
    );
  }

  return (
    <AgentDashboardLayout
      agent={agent}
      listingCount={properties.length}
      pendingBookings={pendingCount}
      notificationCount={pendingCount}
      showDefaultTopBar={!isListingsRoute}
      topBar={
        !isListingsRoute ? (
          <DashboardTopBar
            title={getTopBarTitle(location.pathname)}
            notificationCount={pendingCount}
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

export default function Dashboard() {
  return (
    <BookingsProvider>
      <DashboardShell />
    </BookingsProvider>
  );
}
