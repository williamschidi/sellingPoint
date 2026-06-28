import { BOOKING_STATUS_META } from "./seedRequests.js";

/**
 * @param {import('../../types/inspection.js').InspectionRequest[]} bookings
 */
export function countBookingsByStatus(bookings) {
  const counts = {
    total: bookings.length,
    pending: 0,
    approved: 0,
    declined: 0,
    completed: 0,
    cancelled: 0,
  };

  for (const booking of bookings) {
    if (booking.status === "pending") counts.pending += 1;
    if (booking.status === "confirmed") counts.approved += 1;
    if (booking.status === "declined") counts.declined += 1;
    if (booking.status === "completed") counts.completed += 1;
    if (booking.status === "cancelled") counts.cancelled += 1;
  }

  return counts;
}

function matchesSearch(booking, propertyTitle, query) {
  if (!query.trim()) return true;
  const haystack = [
    booking.id,
    booking.client?.fullName,
    booking.client?.phone,
    propertyTitle,
    booking.date,
    booking.time,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.trim().toLowerCase());
}

function toDateKey(value = "") {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return "";
  return new Date(parsed).toISOString().slice(0, 10);
}

function matchesInspectionDateRange(booking, from, to) {
  if (!from && !to) return true;

  const key = toDateKey(booking.date);
  if (!key) return true;
  if (from && key < from) return false;
  if (to && key > to) return false;
  return true;
}

/**
 * @param {import('../../types/inspection.js').InspectionRequest[]} bookings
 * @param {Record<string, string>} propertyTitleById
 * @param {{ search?: string, status?: string, inspectionDateFrom?: string, inspectionDateTo?: string, sort?: 'newest' | 'oldest' }} filters
 */
export function filterAndSortBookings(
  bookings,
  propertyTitleById,
  {
    search = "",
    status = "",
    inspectionDateFrom = "",
    inspectionDateTo = "",
    sort = "newest",
  } = {}
) {
  let result = bookings.filter((booking) => {
    const propertyTitle = propertyTitleById[booking.propertyId] ?? booking.propertyId;
    if (status && booking.status !== status) return false;
    if (!matchesInspectionDateRange(booking, inspectionDateFrom, inspectionDateTo)) {
      return false;
    }
    if (!matchesSearch(booking, propertyTitle, search)) return false;
    return true;
  });

  result = [...result].sort((a, b) => {
    const timeA = Date.parse(a.createdAt ?? "") || 0;
    const timeB = Date.parse(b.createdAt ?? "") || 0;
    return sort === "oldest" ? timeA - timeB : timeB - timeA;
  });

  return result;
}

export function getBookingStatusMeta(status) {
  return (
    BOOKING_STATUS_META[status] ?? {
      label: status,
      badgeClass: "dashboard-badge-status-cancelled",
    }
  );
}

export function formatBookingCreatedAt(createdAt) {
  if (!createdAt) return "—";
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return createdAt;
  return date.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatInspectionDateTime(date, time) {
  return `${date} · ${time}`;
}
