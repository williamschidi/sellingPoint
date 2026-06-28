import { getDashboardGreeting } from "../../lib/dashboard/formatters.js";

export default function DashboardWelcomeBanner({
  agentName,
  pendingBookings,
  pendingListings,
  onViewBookings,
}) {
  return (
    <section className="dashboard-welcome" aria-label="Welcome summary">
      <div className="dashboard-welcome-orb" aria-hidden />
      <div className="relative z-10">
        <p className="mb-1 text-xs text-white/60">{getDashboardGreeting()} 👋</p>
        <h2 className="font-serif text-[22px] text-white">{agentName}</h2>
        <p className="mt-2 text-[13px] text-white/70">
          You have {pendingBookings} new booking request
          {pendingBookings === 1 ? "" : "s"} and {pendingListings} pending listing
          {pendingListings === 1 ? "" : "s"} awaiting verification.
        </p>
      </div>
      <button
        type="button"
        onClick={onViewBookings}
        className="relative z-10 rounded-[10px] border border-white/20 bg-white/10 px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-white/15"
      >
        View Bookings
      </button>
    </section>
  );
}
