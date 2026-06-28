import { Link } from "react-router-dom";
import {
  formatBookingCreatedAt,
  formatInspectionDateTime,
} from "../../../lib/dashboard/bookings.js";
import BookingActionsMenu from "./BookingActionsMenu.jsx";
import BookingStatusBadge from "./BookingStatusBadge.jsx";

export default function BookingsTable({ bookings, propertyTitleById, onAction }) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-2xl border border-[#e5e7eb] bg-white px-6 py-16 text-center">
        <p className="text-sm font-semibold text-[#111827]">No bookings found</p>
        <p className="mt-1 text-sm text-[#6b7280]">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard-card hidden overflow-x-auto lg:block">
      <table className="dashboard-table min-w-full">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer Name</th>
            <th>Property</th>
            <th>Inspection Date</th>
            <th>Booking Date</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            const propertyTitle =
              propertyTitleById[booking.propertyId] ?? booking.propertyId;

            return (
              <tr key={booking.id}>
                <td className="font-medium text-primary">{booking.id}</td>
                <td className="font-medium">{booking.client?.fullName}</td>
                <td>
                  <Link
                    to={`/propertyDetail/${booking.propertyId}`}
                    className="text-[#111827] hover:text-primary hover:underline"
                  >
                    {propertyTitle}
                  </Link>
                </td>
                <td className="text-[#6b7280]">
                  {formatInspectionDateTime(booking.date, booking.time)}
                </td>
                <td className="text-[#6b7280]">
                  {formatBookingCreatedAt(booking.createdAt)}
                </td>
                <td className="text-[#6b7280]">{booking.client?.phone}</td>
                <td>
                  <BookingStatusBadge status={booking.status} />
                </td>
                <td className="relative whitespace-nowrap">
                  <BookingActionsMenu booking={booking} onAction={onAction} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
