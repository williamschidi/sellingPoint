import { useCallback, useMemo, useState } from "react";
import BookingDetailDrawer from "../../components/dashboard/bookings/BookingDetailDrawer.jsx";
import BookingsFilters from "../../components/dashboard/bookings/BookingsFilters.jsx";
import BookingsMobileList from "../../components/dashboard/bookings/BookingsMobileList.jsx";
import BookingsStatsGrid from "../../components/dashboard/bookings/BookingsStatsGrid.jsx";
import BookingsStatusTabs from "../../components/dashboard/bookings/BookingsStatusTabs.jsx";
import BookingsTable from "../../components/dashboard/bookings/BookingsTable.jsx";
import DashboardConfirmDialog, {
  DashboardModal,
} from "../../components/dashboard/bookings/DashboardConfirmDialog.jsx";
import DataStatusPanel from "../../components/common/DataStatusPanel.jsx";
import { useBookings } from "../../context/BookingsContext.jsx";
import { usePropertyCatalog } from "../../context/PropertiesContext";
import { useToast } from "../../context/ToastContext";
import { usePageMeta } from "../../hooks/usePageMeta";
import {
  withReschedule,
  withStatusChange,
} from "../../lib/dashboard/bookingRecord.js";
import { filterAndSortBookings } from "../../lib/dashboard/bookings.js";

function BookingsSkeleton() {
  return (
    <div className="dashboard-content animate-pulse">
      <div className="mb-6 grid gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-28 rounded-2xl bg-slate-200/70" />
        ))}
      </div>
      <div className="mb-5 h-20 rounded-2xl bg-slate-200/70" />
      <div className="h-96 rounded-2xl bg-slate-200/70" />
    </div>
  );
}

export default function DashboardBookings() {
  usePageMeta({
    title: "Bookings",
    description: "Manage inspection booking requests on the SellingPoint agent dashboard.",
    path: "/dashboard/bookings",
  });

  const { showToast } = useToast();
  const properties = usePropertyCatalog();
  const {
    bookings,
    loadState,
    counts,
    reload,
    replaceBooking,
    removeBooking,
  } = useBookings();
  const [search, setSearch] = useState("");
  const [statusTab, setStatusTab] = useState("");
  const [inspectionDateFrom, setInspectionDateFrom] = useState("");
  const [inspectionDateTo, setInspectionDateTo] = useState("");
  const [sort, setSort] = useState("newest");

  const [detailBookingId, setDetailBookingId] = useState(null);
  const [rescheduleBooking, setRescheduleBooking] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [confirmState, setConfirmState] = useState(null);
  const [confirmReason, setConfirmReason] = useState("");

  const propertyTitleById = useMemo(
    () => Object.fromEntries(properties.map((item) => [item.id, item.title])),
    [properties]
  );

  const propertyById = useMemo(
    () => Object.fromEntries(properties.map((item) => [item.id, item])),
    [properties]
  );

  const detailBooking = useMemo(
    () => bookings.find((item) => item.id === detailBookingId) ?? null,
    [bookings, detailBookingId]
  );

  const filteredBookings = useMemo(
    () =>
      filterAndSortBookings(bookings, propertyTitleById, {
        search,
        status: statusTab,
        inspectionDateFrom,
        inspectionDateTo,
        sort,
      }),
    [bookings, propertyTitleById, search, statusTab, inspectionDateFrom, inspectionDateTo, sort]
  );

  const removeBookingLocal = useCallback(
    (bookingId) => {
      removeBooking(bookingId);
      setDetailBookingId((current) => (current === bookingId ? null : current));
    },
    [removeBooking]
  );

  function handleAction(actionId, booking) {
    switch (actionId) {
      case "view":
        setDetailBookingId(booking.id);
        break;
      case "approve":
        setConfirmReason("");
        setConfirmState({
          type: "approve",
          booking,
          title: "Approve Booking",
          message: "Are you sure you want to approve this inspection request?",
          confirmLabel: "Approve",
        });
        break;
      case "decline":
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
        break;
      case "complete":
        setConfirmReason("");
        setConfirmState({
          type: "complete",
          booking,
          title: "Mark as completed?",
          message: `Confirm that the inspection for ${booking.client?.fullName} has been completed.`,
        });
        break;
      case "cancelApproval":
        setConfirmReason("");
        setConfirmState({
          type: "cancelApproval",
          booking,
          title: "Cancel approval?",
          message: `This will move ${booking.client?.fullName}'s booking back to pending for review.`,
          tone: "danger",
        });
        break;
      case "reconsider":
        setConfirmReason("");
        setConfirmState({
          type: "reconsider",
          booking,
          title: "Reconsider booking?",
          message: `Move ${booking.client?.fullName}'s booking back to pending for review?`,
        });
        break;
      case "reschedule":
        setRescheduleBooking(booking);
        setRescheduleDate("");
        setRescheduleTime(booking.time ?? "");
        break;
      case "contact": {
        const phone = booking.client?.phone;
        if (phone) {
          window.location.href = `tel:${phone.replace(/\s/g, "")}`;
        } else {
          showToast("No phone number available for this customer.");
        }
        break;
      }
      case "delete":
        setConfirmReason("");
        setConfirmState({
          type: "delete",
          booking,
          title: "Delete booking?",
          message: `This permanently removes booking ${booking.id}. This action cannot be undone.`,
          tone: "danger",
        });
        break;
      case "archive":
        setConfirmReason("");
        setConfirmState({
          type: "archive",
          booking,
          title: "Archive Booking",
          message: `Archive this completed booking (${booking.id})? It will be moved to cancelled bookings.`,
        });
        break;
      default:
        break;
    }
  }

  function handleConfirm() {
    if (!confirmState?.booking) return;

    const { type } = confirmState;
    const booking =
      bookings.find((item) => item.id === confirmState.booking.id) ?? confirmState.booking;

    if (type === "approve") {
      replaceBooking(
        withStatusChange(booking, "confirmed", "Booking approved by agent")
      );
      showToast("Booking approved successfully.");
    }

    if (type === "decline") {
      const note = confirmReason.trim() || "Booking declined by agent";
      replaceBooking(withStatusChange(booking, "declined", note));
      showToast("Booking declined successfully.");
    }

    if (type === "complete") {
      replaceBooking(
        withStatusChange(booking, "completed", "Inspection marked as completed")
      );
      showToast("Booking marked as completed");
    }

    if (type === "cancelApproval") {
      replaceBooking(
        withStatusChange(booking, "pending", "Approval cancelled by agent")
      );
      showToast("Approval cancelled — booking is pending again");
    }

    if (type === "reconsider") {
      replaceBooking(
        withStatusChange(booking, "pending", "Booking reconsidered by agent")
      );
      showToast("Booking moved back to pending");
    }

    if (type === "delete") {
      removeBookingLocal(booking.id);
      showToast("Booking deleted");
    }

    if (type === "archive") {
      replaceBooking(withStatusChange(booking, "cancelled", "Booking archived by agent"));
      showToast("Booking archived successfully.");
    }

    setConfirmState(null);
    setConfirmReason("");
  }

  function handleRescheduleSubmit(event) {
    event.preventDefault();
    if (!rescheduleBooking) return;

    const formattedDate = rescheduleDate
      ? new Date(rescheduleDate).toLocaleDateString("en-NG", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : rescheduleBooking.date;

    replaceBooking(
      withReschedule(
        rescheduleBooking,
        {
          date: formattedDate,
          time: rescheduleTime || rescheduleBooking.time,
        },
        `Rescheduled to ${formattedDate} at ${rescheduleTime || rescheduleBooking.time}`
      )
    );

    showToast("Inspection rescheduled");
    setRescheduleBooking(null);
  }

  if (loadState === "loading") {
    return <BookingsSkeleton />;
  }

  if (loadState === "error") {
    return (
      <div className="dashboard-content">
        <DataStatusPanel
          message="Could not load bookings. Check your connection and try again."
          onRetry={reload}
        />
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="mb-2 hidden lg:block">
        <p className="text-sm text-[#6b7280]">
          Review, approve, and manage all property inspection requests.
        </p>
      </div>

      <BookingsStatsGrid counts={counts} />

      <BookingsStatusTabs
        activeStatus={statusTab}
        onChange={setStatusTab}
        counts={counts}
      />

      <BookingsFilters
        search={search}
        inspectionDateFrom={inspectionDateFrom}
        inspectionDateTo={inspectionDateTo}
        sort={sort}
        onSearchChange={setSearch}
        onInspectionDateFromChange={setInspectionDateFrom}
        onInspectionDateToChange={setInspectionDateTo}
        onSortChange={setSort}
      />

      <BookingsTable
        bookings={filteredBookings}
        propertyTitleById={propertyTitleById}
        onAction={handleAction}
      />

      <BookingsMobileList
        bookings={filteredBookings}
        propertyTitleById={propertyTitleById}
        onAction={handleAction}
      />

      <BookingDetailDrawer
        open={Boolean(detailBooking)}
        booking={detailBooking}
        property={detailBooking ? propertyById[detailBooking.propertyId] : null}
        propertyTitle={
          detailBooking
            ? (propertyTitleById[detailBooking.propertyId] ?? detailBooking.propertyId)
            : ""
        }
        onClose={() => setDetailBookingId(null)}
        onAction={handleAction}
      />

      <DashboardModal
        open={Boolean(rescheduleBooking)}
        title="Reschedule inspection"
        onClose={() => setRescheduleBooking(null)}
      >
        {rescheduleBooking && (
          <form onSubmit={handleRescheduleSubmit} className="space-y-4">
            <p className="text-sm text-[#6b7280]">
              Update the inspection slot for {rescheduleBooking.client?.fullName}.
            </p>
            <div>
              <label className="dashboard-form-label" htmlFor="reschedule-date">
                New inspection date
              </label>
              <input
                id="reschedule-date"
                type="date"
                required
                value={rescheduleDate}
                onChange={(event) => setRescheduleDate(event.target.value)}
                className="dashboard-form-input"
              />
            </div>
            <div>
              <label className="dashboard-form-label" htmlFor="reschedule-time">
                New time
              </label>
              <input
                id="reschedule-time"
                type="text"
                required
                placeholder="e.g. 11:00 AM"
                value={rescheduleTime}
                onChange={(event) => setRescheduleTime(event.target.value)}
                className="dashboard-form-input"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRescheduleBooking(null)}
                className="dashboard-form-btn-ghost"
              >
                Cancel
              </button>
              <button type="submit" className="dashboard-form-btn-primary">
                Save reschedule
              </button>
            </div>
          </form>
        )}
      </DashboardModal>

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
        confirmLabel={
          confirmState?.confirmLabel ??
          (confirmState?.type === "delete"
            ? "Delete Booking"
            : confirmState?.type === "complete"
              ? "Mark as Completed"
              : confirmState?.type === "cancelApproval"
                ? "Cancel Approval"
                : confirmState?.type === "reconsider"
                  ? "Reconsider Booking"
                  : confirmState?.type === "archive"
                    ? "Archive Booking"
                    : "Confirm")
        }
        onConfirm={handleConfirm}
        onCancel={() => {
          setConfirmState(null);
          setConfirmReason("");
        }}
      />
    </div>
  );
}
