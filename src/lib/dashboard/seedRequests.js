/**
 * @typedef {'pending' | 'confirmed' | 'declined' | 'completed' | 'cancelled'} BookingStatus
 */

export const BOOKING_STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Approved" },
  { value: "declined", label: "Declined" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export const BOOKING_STATUS_META = {
  pending: { label: "Pending", badgeClass: "dashboard-badge-status-pending" },
  confirmed: { label: "Approved", badgeClass: "dashboard-badge-status-approved" },
  declined: { label: "Declined", badgeClass: "dashboard-badge-status-declined" },
  completed: { label: "Completed", badgeClass: "dashboard-badge-status-completed" },
  cancelled: { label: "Cancelled", badgeClass: "dashboard-badge-status-cancelled" },
};

/** Demo booking requests when no stored inspections exist. */
export const AGENT_DASHBOARD_SEED_REQUESTS = [
  {
    id: "SP-IR-DEMO-001",
    propertyId: "lekki-phase-1-residential-plot",
    date: "June 17, 2026",
    time: "11:00 AM",
    client: {
      fullName: "Tunde Kamoru",
      phone: "+2348012345678",
      notes: "Interested in residential development.",
    },
    confirmed: true,
    status: "pending",
    createdAt: "2026-06-16T09:00:00.000Z",
  },
  {
    id: "SP-IR-DEMO-002",
    propertyId: "gra-extension-corner-piece",
    date: "June 19, 2026",
    time: "2:00 PM",
    client: {
      fullName: "Amaka Chukwu",
      phone: "+2348098765432",
      notes: "",
    },
    confirmed: true,
    status: "pending",
    createdAt: "2026-06-16T11:30:00.000Z",
  },
  {
    id: "SP-IR-DEMO-003",
    propertyId: "gwarinpa-estate-plot",
    date: "June 22, 2026",
    time: "10:00 AM",
    client: {
      fullName: "Ibrahim Musa",
      phone: "+2348076543210",
      notes: "Commercial investor.",
    },
    confirmed: true,
    status: "confirmed",
    createdAt: "2026-06-14T08:15:00.000Z",
  },
  {
    id: "SP-IR-DEMO-004",
    propertyId: "ikoyi-waterfront-land",
    date: "June 12, 2026",
    time: "3:30 PM",
    client: {
      fullName: "Ngozi Eze",
      phone: "+2348123456789",
      notes: "",
    },
    confirmed: true,
    status: "declined",
    createdAt: "2026-06-10T14:20:00.000Z",
  },
  {
    id: "SP-IR-DEMO-005",
    propertyId: "lekki-phase-1-residential-plot",
    date: "June 8, 2026",
    time: "9:00 AM",
    client: {
      fullName: "David Okafor",
      phone: "+2348187654321",
      notes: "Completed site visit.",
    },
    confirmed: true,
    status: "completed",
    createdAt: "2026-06-05T10:00:00.000Z",
  },
  {
    id: "SP-IR-DEMO-006",
    propertyId: "gra-extension-corner-piece",
    date: "June 25, 2026",
    time: "1:00 PM",
    client: {
      fullName: "Fatima Bello",
      phone: "+2348032109876",
      notes: "",
    },
    confirmed: true,
    status: "cancelled",
    createdAt: "2026-06-12T16:45:00.000Z",
  },
];
