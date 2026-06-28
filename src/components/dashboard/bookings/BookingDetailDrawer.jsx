import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useFocusTrap } from "../../../hooks/useFocusTrap";
import {
  formatBookingCreatedAt,
  formatInspectionDateTime,
  getBookingStatusMeta,
} from "../../../lib/dashboard/bookings.js";
import BookingStatusBadge from "./BookingStatusBadge.jsx";
import BookingDrawerQuickActions from "./BookingDrawerQuickActions.jsx";

function Section({ title, children }) {
  return (
    <section className="border-b border-[#e5e7eb] py-5 last:border-b-0">
      <h3 className="mb-3 text-xs font-bold tracking-[0.08em] text-[#6b7280] uppercase">
        {title}
      </h3>
      {children}
    </section>
  );
}

function DetailRow({ label, children }) {
  return (
    <div className="grid gap-1 py-1.5 text-sm sm:grid-cols-[130px_1fr]">
      <dt className="font-semibold text-[#6b7280]">{label}</dt>
      <dd className="text-[#111827]">{children}</dd>
    </div>
  );
}

export default function BookingDetailDrawer({
  open,
  booking,
  property,
  propertyTitle,
  onClose,
  onAction,
}) {
  const panelRef = useRef(null);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !booking) return null;

  return (
    <div className="dashboard-drawer-root" role="presentation">
      <button
        type="button"
        className="dashboard-drawer-backdrop"
        aria-label="Close booking details"
        onClick={onClose}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-drawer-title"
        className="dashboard-drawer-panel"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#e5e7eb] px-5 py-4">
          <div>
            <p className="text-xs font-semibold text-primary">{booking.id}</p>
            <h2 id="booking-drawer-title" className="mt-1 text-lg font-bold text-[#111827]">
              Booking details
            </h2>
            <div className="mt-2">
              <BookingStatusBadge status={booking.status} />
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="dashboard-btn-icon shrink-0"
            aria-label="Close drawer"
          >
            <Icon icon="lucide:x" className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          <Section title="Customer information">
            <dl>
              <DetailRow label="Name">{booking.client?.fullName ?? "—"}</DetailRow>
              <DetailRow label="Phone">
                {booking.client?.phone ? (
                  <a
                    href={`tel:${booking.client.phone.replace(/\s/g, "")}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {booking.client.phone}
                  </a>
                ) : (
                  "—"
                )}
              </DetailRow>
              <DetailRow label="Customer notes">
                {booking.client?.notes?.trim() ? booking.client.notes : "—"}
              </DetailRow>
            </dl>
          </Section>

          <Section title="Property details">
            <dl>
              <DetailRow label="Property">{propertyTitle}</DetailRow>
              <DetailRow label="Type">{property?.propertyType ?? "—"}</DetailRow>
              <DetailRow label="Location">
                {property?.location?.address
                  ? `${property.location.address}, ${property.location.state ?? ""}`
                  : "—"}
              </DetailRow>
              <DetailRow label="Price">{property?.price ? `₦${property.price}` : "—"}</DetailRow>
            </dl>
            <Link
              to={`/propertyDetail/${booking.propertyId}`}
              className="mt-2 inline-flex text-sm font-semibold text-primary hover:underline"
            >
              View property listing →
            </Link>
          </Section>

          <Section title="Inspection schedule">
            <dl>
              <DetailRow label="Inspection">
                {formatInspectionDateTime(booking.date, booking.time)}
              </DetailRow>
              <DetailRow label="Booked on">
                {formatBookingCreatedAt(booking.createdAt)}
              </DetailRow>
            </dl>
          </Section>

          <Section title="Booking history">
            <ol className="space-y-3">
              {(booking.statusHistory ?? []).map((entry, index) => (
                <li key={`${entry.at}-${index}`} className="flex gap-3 text-sm">
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
                  <div>
                    <p className="font-semibold text-[#111827]">
                      {entry.label ?? getBookingStatusMeta(entry.status).label}
                    </p>
                    <p className="text-xs text-[#6b7280]">
                      {formatBookingCreatedAt(entry.at)}
                      {entry.note ? ` · ${entry.note}` : ""}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Agent notes">
            {booking.internalNotes?.length ? (
              <ul className="space-y-2">
                {booking.internalNotes.map((note) => (
                  <li
                    key={note.id}
                    className="rounded-xl border border-[#e5e7eb] bg-bg-soft px-3 py-2.5 text-sm text-[#111827]"
                  >
                    <p>{note.text}</p>
                    <p className="mt-1 text-[11px] text-[#6b7280]">
                      {formatBookingCreatedAt(note.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[#6b7280]">No internal notes yet.</p>
            )}
          </Section>

          {booking.declineReason && (
            <Section title="Decline reason">
              <p className="text-sm text-[#111827]">{booking.declineReason}</p>
            </Section>
          )}
        </div>

        <div className="border-t border-[#e5e7eb] px-5 py-4">
          <p className="mb-3 text-xs font-bold tracking-[0.08em] text-[#6b7280] uppercase">
            Quick actions
          </p>
          <BookingDrawerQuickActions booking={booking} onAction={onAction} />
        </div>
      </aside>
    </div>
  );
}
