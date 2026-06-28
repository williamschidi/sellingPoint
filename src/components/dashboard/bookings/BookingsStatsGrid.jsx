export default function BookingsStatsGrid({ counts }) {
  const stats = [
    {
      label: "Total Bookings",
      value: counts.total,
      valueColor: "var(--color-text)",
      change: "All inspection requests",
      trend: "neutral",
      mobileBg: "var(--color-bg-soft)",
    },
    {
      label: "Pending Bookings",
      value: counts.pending,
      valueColor: "var(--color-gold)",
      change: "Awaiting your response",
      trend: "neutral",
      mobileBg: "var(--color-gold-light)",
    },
    {
      label: "Approved Bookings",
      value: counts.approved,
      valueColor: "var(--color-secondary)",
      change: "Confirmed inspections",
      trend: "up",
      mobileBg: "var(--color-secondary-light)",
    },
    {
      label: "Declined Bookings",
      value: counts.declined,
      valueColor: "var(--color-danger)",
      change: "Rejected requests",
      trend: "neutral",
      mobileBg: "var(--color-danger-light)",
    },
  ];

  return (
    <>
      <div className="mb-6 hidden gap-4 sm:grid-cols-2 lg:grid lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="dashboard-stat-card">
            <p className="dashboard-stat-label">{stat.label}</p>
            <p className="dashboard-stat-value" style={{ color: stat.valueColor }}>
              {stat.value}
            </p>
            <p
              className={`dashboard-stat-change ${
                stat.trend === "up" ? "dashboard-stat-up" : "text-[#6b7280]"
              }`}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 lg:hidden">
        {stats.map((stat) => (
          <div
            key={`mobile-${stat.label}`}
            className="rounded-[10px] p-3"
            style={{ background: stat.mobileBg }}
          >
            <p className="mb-1 text-[9px] font-bold tracking-[0.06em] text-[#6b7280] uppercase">
              {stat.label}
            </p>
            <p className="text-[22px] font-bold" style={{ color: stat.valueColor }}>
              {stat.value}
            </p>
            <p className="mt-1 text-[9px] text-[#6b7280]">{stat.change}</p>
          </div>
        ))}
      </div>
    </>
  );
}
