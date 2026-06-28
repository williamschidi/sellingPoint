import { getBookingDrawerActionsForStatus } from "../../../lib/dashboard/bookingActions.js";

function actionButtonClass(actionId) {
  if (actionId === "approve" || actionId === "complete" || actionId === "reconsider") {
    return "dashboard-tbl-action dashboard-tbl-approve";
  }
  if (actionId === "decline" || actionId === "delete" || actionId === "cancelApproval") {
    return "dashboard-tbl-action dashboard-tbl-reject";
  }
  if (actionId === "archive") {
    return "dashboard-tbl-action dashboard-tbl-view";
  }
  return "dashboard-tbl-action dashboard-tbl-view";
}

function actionLabel(action) {
  if (action.id === "approve") return "Approve Booking";
  if (action.id === "decline") return "Decline Booking";
  if (action.id === "complete") return "Mark as Completed";
  if (action.id === "cancelApproval") return "Cancel Approval";
  if (action.id === "reconsider") return "Reconsider Booking";
  if (action.id === "reschedule") return "Reschedule";
  if (action.id === "contact") return "Contact Customer";
  if (action.id === "delete") return "Delete Booking";
  if (action.id === "archive") return "Archive Booking";
  return action.label;
}

export default function BookingDrawerQuickActions({ booking, onAction }) {
  const actions = getBookingDrawerActionsForStatus(booking.status);

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <button
          key={action.id}
          type="button"
          onClick={() => onAction(action.id, booking)}
          className={actionButtonClass(action.id)}
        >
          {actionLabel(action)}
        </button>
      ))}
    </div>
  );
}
