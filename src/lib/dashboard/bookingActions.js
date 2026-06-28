/** @typedef {{ id: string, label: string, icon: string, emoji?: string, danger?: boolean }} BookingActionItem */

/** @type {BookingActionItem[]} */
const PENDING_ACTIONS = [
  { id: "view", label: "View Booking Details", emoji: "👁", icon: "lucide:eye" },
  { id: "approve", label: "Approve Booking", emoji: "✅", icon: "lucide:check" },
  { id: "decline", label: "Decline Booking", emoji: "❌", icon: "lucide:x" },
  {
    id: "reschedule",
    label: "Reschedule Inspection",
    emoji: "📅",
    icon: "lucide:calendar-clock",
  },
  { id: "contact", label: "Contact Customer", emoji: "💬", icon: "lucide:phone" },
  { id: "delete", label: "Delete Booking", emoji: "🗑", icon: "lucide:trash-2", danger: true },
];

/** @type {BookingActionItem[]} */
const APPROVED_ACTIONS = [
  { id: "view", label: "View Booking", icon: "lucide:eye" },
  { id: "complete", label: "Mark as Completed", icon: "lucide:check-check" },
  { id: "reschedule", label: "Reschedule Inspection", icon: "lucide:calendar-clock" },
  { id: "contact", label: "Contact Customer", icon: "lucide:phone" },
  { id: "cancelApproval", label: "Cancel Approval", icon: "lucide:undo-2" },
];

/** @type {BookingActionItem[]} */
const DECLINED_ACTIONS = [
  { id: "view", label: "View Booking", icon: "lucide:eye" },
  { id: "reconsider", label: "Reconsider Booking", icon: "lucide:rotate-ccw" },
  { id: "contact", label: "Contact Customer", icon: "lucide:phone" },
  { id: "delete", label: "Delete Booking", icon: "lucide:trash-2", danger: true },
];

/** @type {BookingActionItem[]} */
const COMPLETED_ACTIONS = [
  { id: "view", label: "View Booking", icon: "lucide:eye" },
  { id: "archive", label: "Archive Booking", icon: "lucide:archive" },
];

/** @type {BookingActionItem[]} */
const CANCELLED_ACTIONS = [
  { id: "view", label: "View Booking", icon: "lucide:eye" },
  { id: "delete", label: "Delete Booking", icon: "lucide:trash-2", danger: true },
];

/**
 * @param {string} status
 * @returns {BookingActionItem[]}
 */
export function getBookingActionsForStatus(status) {
  switch (status) {
    case "pending":
      return PENDING_ACTIONS;
    case "confirmed":
      return APPROVED_ACTIONS;
    case "declined":
      return DECLINED_ACTIONS;
    case "completed":
      return COMPLETED_ACTIONS;
    case "cancelled":
      return CANCELLED_ACTIONS;
    default:
      return [{ id: "view", label: "View Booking", icon: "lucide:eye" }];
  }
}

/**
 * Quick actions shown in the booking detail drawer footer.
 * @param {string} status
 * @returns {BookingActionItem[]}
 */
export function getBookingDrawerActionsForStatus(status) {
  switch (status) {
    case "pending":
      return PENDING_ACTIONS.filter((item) => ["approve", "decline"].includes(item.id));
    case "confirmed":
      return APPROVED_ACTIONS.filter((item) =>
        ["complete", "reschedule", "contact", "cancelApproval"].includes(item.id)
      );
    case "declined":
      return DECLINED_ACTIONS.filter((item) =>
        ["reconsider", "contact", "delete"].includes(item.id)
      );
    case "completed":
      return COMPLETED_ACTIONS.filter((item) => item.id === "archive");
    default:
      return getBookingActionsForStatus(status).filter((item) => item.id !== "view");
  }
}
