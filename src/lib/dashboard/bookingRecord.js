import { getBookingStatusMeta } from "./bookings.js";

/**
 * @typedef {Object} BookingStatusHistoryEntry
 * @property {string} status
 * @property {string} label
 * @property {string} at ISO timestamp
 * @property {string} [note]
 */

/**
 * @typedef {Object} BookingInternalNote
 * @property {string} id
 * @property {string} text
 * @property {string} createdAt
 */

/**
 * @param {import('../../types/inspection.js').InspectionRequest & Record<string, unknown>} booking
 */
export function normalizeBookingRecord(booking) {
  const history = Array.isArray(booking.statusHistory)
    ? booking.statusHistory
    : [
        {
          status: booking.status ?? "pending",
          label: getBookingStatusMeta(booking.status ?? "pending").label,
          at: booking.createdAt ?? new Date().toISOString(),
          note: "Booking submitted",
        },
      ];

  return {
    ...booking,
    statusHistory: history,
    internalNotes: Array.isArray(booking.internalNotes) ? booking.internalNotes : [],
    declineReason: booking.declineReason ?? "",
  };
}

/**
 * @param {ReturnType<typeof normalizeBookingRecord>} booking
 * @param {string} status
 * @param {string} [note]
 */
export function withStatusChange(booking, status, note = "") {
  const entry = {
    status,
    label: getBookingStatusMeta(status).label,
    at: new Date().toISOString(),
    note,
  };

  return normalizeBookingRecord({
    ...booking,
    status,
    statusHistory: [...(booking.statusHistory ?? []), entry],
    ...(status === "declined" && note ? { declineReason: note } : {}),
    ...(status === "pending" || status === "confirmed" ? { declineReason: "" } : {}),
  });
}

/**
 * @param {ReturnType<typeof normalizeBookingRecord>} booking
 * @param {string} text
 */
export function withInternalNote(booking, text) {
  const trimmed = text.trim();
  if (!trimmed) return booking;

  const note = {
    id: `note-${Date.now()}`,
    text: trimmed,
    createdAt: new Date().toISOString(),
  };

  return normalizeBookingRecord({
    ...booking,
    internalNotes: [note, ...(booking.internalNotes ?? [])],
  });
}

/**
 * @param {ReturnType<typeof normalizeBookingRecord>} booking
 * @param {{ date?: string, time?: string }} schedule
 * @param {string} [note]
 */
export function withReschedule(booking, schedule, note = "Inspection rescheduled") {
  const next = {
    ...booking,
    ...schedule,
  };

  return withStatusChange(next, booking.status, note);
}
