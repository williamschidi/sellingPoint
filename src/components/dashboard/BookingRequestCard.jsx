import { getClientInitials } from "../../lib/dashboard/formatters.js";

export default function BookingRequestCard({
  request,
  propertyTitle,
  onApprove,
  onDecline,
  compact = false,
}) {
  const initials = getClientInitials(request.client?.fullName);
  const isPending = request.status === "pending";

  return (
    <article className="dashboard-booking-card">
      <div className="mb-2 flex items-center gap-2">
        <div
          className={`dashboard-avatar ${
            compact ? "h-7 w-7 text-[10px]" : "h-8 w-8 text-xs"
          } bg-primary-light text-primary`}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className={`font-semibold text-[#111827] ${compact ? "text-[11px]" : "text-[13px]"}`}>
            {request.client?.fullName}
          </p>
          <p className={`text-[#6b7280] ${compact ? "text-[10px]" : "text-[11px]"}`}>
            {compact
              ? `${propertyTitle} · ${request.date}, ${request.time}`
              : propertyTitle}
          </p>
        </div>
        {isPending && (
          <span className={`dashboard-badge-pending ${compact ? "text-[9px]" : ""}`}>New</span>
        )}
      </div>

      {!compact && (
        <p className="mb-2.5 text-xs text-[#6b7280]">
          📅 {request.date} · {request.time}
        </p>
      )}

      {isPending ? (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onApprove(request.id)}
            className={`dashboard-tbl-action dashboard-tbl-approve flex-1 justify-center ${
              compact ? "text-[10px]" : ""
            }`}
          >
            ✓ Approve
          </button>
          <button
            type="button"
            onClick={() => onDecline(request.id)}
            className={`dashboard-tbl-action dashboard-tbl-reject flex-1 justify-center ${
              compact ? "text-[10px]" : ""
            }`}
          >
            ✕ Decline
          </button>
        </div>
      ) : (
        <p className="text-[11px] font-semibold text-[#15803d] capitalize">
          {request.status}
        </p>
      )}
    </article>
  );
}
