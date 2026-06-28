import { useCallback, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DashboardConfirmDialog from "../../components/dashboard/bookings/DashboardConfirmDialog.jsx";
import DashboardBookingPanel from "../../components/dashboard/DashboardBookingPanel";
import DashboardListingsTable from "../../components/dashboard/DashboardListingsTable";
import DashboardStatsGrid from "../../components/dashboard/DashboardStatsGrid";
import DashboardWelcomeBanner from "../../components/dashboard/DashboardWelcomeBanner";
import DataStatusPanel from "../../components/common/DataStatusPanel.jsx";
import { useBookings } from "../../context/BookingsContext.jsx";
import { useToast } from "../../context/ToastContext";
import { usePropertiesStatus, usePropertyCatalog } from "../../context/PropertiesContext";
import { useDashboardOverviewStats } from "../../hooks/dashboard/useDashboardOverviewStats.js";
import { withStatusChange } from "../../lib/dashboard/bookingRecord.js";

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
  const { loadState: propertiesLoadState } = usePropertiesStatus();
  const properties = usePropertyCatalog();
  const { bookings, loadState, reload, replaceBooking } = useBookings();
  const { stats, pendingListings } = useDashboardOverviewStats();
  const bookingsRef = useRef(null);

  const [confirmState, setConfirmState] = useState(null);
  const [confirmReason, setConfirmReason] = useState("");

  const propertyTitleById = useMemo(
    () => Object.fromEntries(properties.map((item) => [item.id, item.title])),
    [properties]
  );

  const pendingBookings = bookings.filter((item) => item.status === "pending").length;

  const handleApprove = useCallback(
    (requestId) => {
      const booking = bookings.find((item) => item.id === requestId);
      if (!booking) return;
      setConfirmReason("");
      setConfirmState({
        type: "approve",
        booking,
        title: "Approve Booking",
        message: "Are you sure you want to approve this inspection request?",
        confirmLabel: "Approve",
      });
    },
    [bookings]
  );

  const handleDecline = useCallback(
    (requestId) => {
      const booking = bookings.find((item) => item.id === requestId);
      if (!booking) return;
      setConfirmReason("");
      setConfirmState({
        type: "decline",
        booking,
        title: "Decline Booking",
        message: "Are you sure you want to decline this inspection request?",
        tone: "danger",
        confirmLabel: "Decline",
        reasonLabel: "Decline reason",
        reasonPlaceholder: "e.g. Property unavailable on requested date",
      });
    },
    [bookings]
  );

  function handleConfirm() {
    if (!confirmState?.booking) return;

    const booking =
      bookings.find((item) => item.id === confirmState.booking.id) ??
      confirmState.booking;

    if (confirmState.type === "approve") {
      replaceBooking(
        withStatusChange(booking, "confirmed", "Booking approved by agent")
      );
      showToast("Booking approved successfully.");
    }

    if (confirmState.type === "decline") {
      const note = confirmReason.trim() || "Booking declined by agent";
      replaceBooking(withStatusChange(booking, "declined", note));
      showToast("Booking declined successfully.");
    }

    setConfirmState(null);
    setConfirmReason("");
  }

  function scrollToBookings() {
    const target =
      bookingsRef.current ?? document.getElementById("dashboard-booking-requests");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (propertiesLoadState === "loading" || loadState === "loading") {
    return <DashboardOverviewSkeleton />;
  }

  if (loadState === "error") {
    return (
      <div className="dashboard-content">
        <DataStatusPanel
          message="Could not load booking requests."
          onRetry={reload}
          actionTo="/dashboard/bookings"
          actionLabel="Open Bookings page"
        />
      </div>
    );
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
        <Link
          to="/dashboard/bookings"
          className="flex-1 rounded-[10px] border border-[#e5e7eb] bg-bg-soft py-2.5 text-center text-[11px] font-semibold text-[#111827] no-underline"
        >
          View Bookings
        </Link>
      </div>

      <div className="mb-3 lg:hidden" ref={bookingsRef}>
        <DashboardBookingPanel
          requests={bookings}
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
          requests={bookings}
          propertyTitleById={propertyTitleById}
          onApprove={handleApprove}
          onDecline={handleDecline}
        />
      </div>

      <DashboardConfirmDialog
        open={Boolean(confirmState)}
        title={confirmState?.title ?? ""}
        message={confirmState?.message ?? ""}
        tone={confirmState?.tone}
        reasonLabel={confirmState?.reasonLabel}
        reasonPlaceholder={confirmState?.reasonPlaceholder}
        reasonValue={confirmReason}
        onReasonChange={setConfirmReason}
        reasonOptional
        confirmLabel={confirmState?.confirmLabel ?? "Confirm"}
        onConfirm={handleConfirm}
        onCancel={() => {
          setConfirmState(null);
          setConfirmReason("");
        }}
      />
    </div>
  );
}
