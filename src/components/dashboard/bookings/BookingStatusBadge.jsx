import { getBookingStatusMeta } from "../../../lib/dashboard/bookings.js";

export default function BookingStatusBadge({ status }) {
  const meta = getBookingStatusMeta(status);
  return <span className={meta.badgeClass}>{meta.label}</span>;
}
