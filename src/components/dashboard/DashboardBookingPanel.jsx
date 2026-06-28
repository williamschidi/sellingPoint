import { Link } from "react-router-dom";
import BookingRequestCard from "./BookingRequestCard.jsx";

export default function DashboardBookingPanel({
  requests,
  propertyTitleById,
  onApprove,
  onDecline,
  compact = false,
  id,
}) {
  const pendingCount = requests.filter((item) => item.status === "pending").length;
  const visibleRequests = compact ? requests.slice(0, 3) : requests;

  return (
    <section
      id={id}
      className="dashboard-card self-start"
      aria-labelledby="dashboard-bookings-heading"
    >
      <div className="dashboard-card-header">
        <h2 id="dashboard-bookings-heading" className="dashboard-card-title">
          Booking Requests
          {compact && pendingCount > 0 && (
            <span className="ml-2 rounded-full bg-danger-light px-1.5 py-0.5 text-[10px] font-bold text-danger">
              {pendingCount} new
            </span>
          )}
        </h2>
        {compact && (
          <Link to="/dashboard/bookings" className="dashboard-btn-ghost-sm no-underline">
            View all
          </Link>
        )}
      </div>

      <div className={compact ? "p-3.5" : "p-3"}>
        {requests.length === 0 ? (
          <div className="px-2 py-6 text-center">
            <p className="text-sm text-[#6b7280]">
              New inspection bookings from buyers will appear here.
            </p>
            <Link
              to="/dashboard/bookings"
              className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Open Bookings →
            </Link>
          </div>
        ) : (
          visibleRequests.map((request) => (
            <BookingRequestCard
              key={request.id}
              request={request}
              propertyTitle={
                propertyTitleById[request.propertyId] ?? request.propertyId
              }
              onApprove={onApprove}
              onDecline={onDecline}
              compact={compact}
            />
          ))
        )}
      </div>
    </section>
  );
}
