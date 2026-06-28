import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { getBookingActionsForStatus } from "../../../lib/dashboard/bookingActions.js";

export default function BookingActionsMenu({ booking, onAction }) {
  const actions = getBookingActionsForStatus(booking.status);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        type="button"
        className="dashboard-form-btn-ghost px-2.5"
        aria-label={`Actions for booking ${booking.id}`}
      >
        <Icon icon="lucide:more-vertical" className="h-4 w-4" aria-hidden />
      </MenuButton>

      <MenuItems
        portal
        anchor="bottom end"
        className="dashboard-bookings-actions-menu focus:outline-none"
      >
        {actions.map((item) => (
          <MenuItem key={item.id}>
            <button
              type="button"
              onClick={() => onAction(item.id, booking)}
              className={`dashboard-bookings-actions-item ${
                item.danger ? "dashboard-bookings-actions-item-danger" : ""
              }`}
            >
              {item.emoji ? (
                <span className="text-sm leading-none" aria-hidden>
                  {item.emoji}
                </span>
              ) : (
                <Icon icon={item.icon} className="h-3.5 w-3.5 shrink-0" aria-hidden />
              )}
              {item.label}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
