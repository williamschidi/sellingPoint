import { Link } from "react-router-dom";
import {
  formatBookingCreatedAt,
  formatInspectionDateTime,
} from "../../../lib/dashboard/bookings.js";
import BookingActionsMenu from "./BookingActionsMenu.jsx";
import BookingStatusBadge from "./BookingStatusBadge.jsx";

export default function BookingsMobileList({ bookings, propertyTitleById, onAction }) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-2xl border border-[#e5e7eb] bg-white px-5 py-12 text-center lg:hidden">
        <p className="text-sm font-semibold text-[#111827]">No bookings found</p>
        <p className="mt-1 text-sm text-[#6b7280]">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 lg:hidden">
      {bookings.map((booking) => {
        const propertyTitle =
          propertyTitleById[booking.propertyId] ?? booking.propertyId;

        return (
          <article key={booking.id} className="dashboard-card p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-primary">{booking.id}</p>
                <p className="mt-1 text-sm font-bold text-[#111827]">
                  {booking.client?.fullName}
                </p>
                <p className="text-xs text-[#6b7280]">{booking.client?.phone}</p>
              </div>
              <BookingStatusBadge status={booking.status} />
            </div>

            <div className="space-y-2 text-xs text-[#6b7280]">
              <p>
                <span className="font-semibold text-[#111827]">Property: </span>
                <Link
                  to={`/propertyDetail/${booking.propertyId}`}
                  className="text-primary hover:underline"
                >
                  {propertyTitle}
                </Link>
              </p>
              <p>
                <span className="font-semibold text-[#111827]">Inspection: </span>
                {formatInspectionDateTime(booking.date, booking.time)}
              </p>
              <p>
                <span className="font-semibold text-[#111827]">Booked: </span>
                {formatBookingCreatedAt(booking.createdAt)}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {booking.status === "pending" && (
                <>
                  <button
                    type="button"
                    onClick={() => onAction("approve", booking)}
                    className="dashboard-tbl-action dashboard-tbl-approve"
                  >
                    ✓ Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => onAction("decline", booking)}
                    className="dashboard-tbl-action dashboard-tbl-reject"
                  >
                    ✕ Decline
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => onAction("view", booking)}
                className="dashboard-tbl-action dashboard-tbl-view"
              >
                View Booking Details
              </button>
              <BookingActionsMenu booking={booking} onAction={onAction} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
