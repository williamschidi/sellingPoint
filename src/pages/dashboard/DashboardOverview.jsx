import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { listInspectionRequests } from "../../api/services/inspectionService";
import DashboardBookingPanel from "../../components/dashboard/DashboardBookingPanel";
import DashboardListingsTable from "../../components/dashboard/DashboardListingsTable";
import DashboardStatsGrid from "../../components/dashboard/DashboardStatsGrid";
import DashboardWelcomeBanner from "../../components/dashboard/DashboardWelcomeBanner";
import { useToast } from "../../context/ToastContext";
import { usePropertiesStatus, usePropertyCatalog } from "../../context/PropertiesContext";
import { getListingViews } from "../../lib/dashboard/formatters.js";
import { LIST_PROPERTY_MAILTO } from "../../lib/properties/constants";
import { Link } from "react-router-dom";

function DashboardOverviewSkeleton() {
  return (
    <div className="dashboard-content animate-pulse">
      <div className="mb-6 h-28 rounded-2xl bg-slate-200/70" />
      <div className="mb-6 grid gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-28 rounded-2xl bg-slate-200/70" />
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
        <div className="h-80 rounded-2xl bg-slate-200/70" />
        <div className="h-80 rounded-2xl bg-slate-200/70" />
      </div>
    </div>
  );
}

export default function DashboardOverview({ agentName }) {
  const { showToast } = useToast();
  const { loadState } = usePropertiesStatus();
  const properties = usePropertyCatalog();
  const bookingsRef = useRef(null);

  const [requests, setRequests] = useState([]);
  const [requestsState, setRequestsState] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    async function loadRequests() {
      setRequestsState("loading");
      try {
        const data = await listInspectionRequests();
        if (!cancelled) {
          setRequests(data);
          setRequestsState("success");
        }
      } catch {
        if (!cancelled) setRequestsState("error");
      }
    }

    loadRequests();
    return () => {
      cancelled = true;
    };
  }, []);

  const propertyTitleById = useMemo(
    () => Object.fromEntries(properties.map((item) => [item.id, item.title])),
    [properties]
  );

  const pendingBookings = requests.filter((item) => item.status === "pending").length;
  const pendingListings = properties.filter(
    (item) => item.verificationStatus !== "verified"
  ).length;
  const totalViews = useMemo(
    () => properties.reduce((sum, item) => sum + getListingViews(item.id), 0),
    [properties]
  );
  const totalInquiries = Math.max(requests.length * 16, 48);

  const stats = [
    {
      label: "Active Listings",
      value: properties.length,
      valueColor: "var(--color-primary)",
      change: "↑ 2 this month",
      trend: "up",
      mobileBg: "var(--color-primary-light)",
    },
    {
      label: "Pending Bookings",
      value: pendingBookings,
      valueColor: "var(--color-gold)",
      change: "Awaiting approval",
      trend: "neutral",
      mobileBg: "var(--color-gold-light)",
    },
    {
      label: "Total Inquiries",
      value: totalInquiries,
      valueColor: "var(--color-text)",
      change: "↑ 12% vs last month",
      trend: "up",
      mobileBg: "var(--color-bg-soft)",
    },
    {
      label: "Profile Views",
      value: totalViews || 324,
      valueColor: "var(--color-text)",
      change: "↑ 8% this week",
      trend: "up",
      mobileBg: "var(--color-bg-soft)",
    },
  ];

  const handleApprove = useCallback(
    (requestId) => {
      setRequests((current) =>
        current.map((item) =>
          item.id === requestId ? { ...item, status: "confirmed" } : item
        )
      );
      showToast("Booking approved");
    },
    [showToast]
  );

  const handleDecline = useCallback(
    (requestId) => {
      setRequests((current) =>
        current.map((item) =>
          item.id === requestId ? { ...item, status: "cancelled" } : item
        )
      );
      showToast("Booking declined");
    },
    [showToast]
  );

  function scrollToBookings() {
    const target =
      bookingsRef.current ??
      document.getElementById("dashboard-booking-requests");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (loadState === "loading") {
    return <DashboardOverviewSkeleton />;
  }

  return (
    <div className="dashboard-content">
      <DashboardWelcomeBanner
        agentName={agentName}
        pendingBookings={pendingBookings}
        pendingListings={pendingListings}
        onViewBookings={scrollToBookings}
      />

      <DashboardStatsGrid stats={stats} />

      <div className="mb-3 flex gap-2 lg:hidden">
        <Link
          to="/dashboard/listings"
          className="flex-1 rounded-[10px] bg-primary py-2.5 text-center text-[11px] font-semibold text-white no-underline"
        >
          + Add Listing
        </Link>
        <button
          type="button"
          onClick={scrollToBookings}
          className="flex-1 rounded-[10px] border border-[#e5e7eb] bg-bg-soft py-2.5 text-[11px] font-semibold text-[#111827]"
        >
          View Bookings
        </button>
      </div>

      <div className="mb-3 lg:hidden" ref={bookingsRef}>
        <DashboardBookingPanel
          requests={requests}
          propertyTitleById={propertyTitleById}
          onApprove={handleApprove}
          onDecline={handleDecline}
          compact
        />
      </div>

      <div className="hidden gap-5 lg:grid lg:grid-cols-[minmax(0,1fr)_380px]">
        <DashboardListingsTable properties={properties} />

        <DashboardBookingPanel
          id="dashboard-booking-requests"
          requests={requests}
          propertyTitleById={propertyTitleById}
          onApprove={handleApprove}
          onDecline={handleDecline}
        />
      </div>

      {requestsState === "error" && (
        <p className="mt-4 text-center text-sm text-danger" role="alert">
          Could not load booking requests. Refresh to try again.
        </p>
      )}
    </div>
  );
}
