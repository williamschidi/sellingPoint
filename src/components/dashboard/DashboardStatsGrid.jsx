export default function DashboardStatsGrid({ stats }) {
  return (
    <>
      {/* Desktop — 4-column row matching Screen 5 */}
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

      {/* Mobile — 2×2 tinted cards from mobile mock */}
      <div className="mb-3 grid grid-cols-2 gap-2 lg:hidden">
        {stats.map((stat) => (
          <div
            key={`mobile-${stat.label}`}
            className="rounded-[10px] p-3"
            style={{ background: stat.mobileBg }}
          >
            <p className="mb-1 text-[9px] font-bold tracking-[0.06em] text-[#6b7280] uppercase">
              {stat.label}
            </p>
            <p
              className="text-[22px] font-bold"
              style={{ color: stat.valueColor }}
            >
              {stat.value}
            </p>
            <p
              className={`mt-1 text-[9px] ${
                stat.trend === "up" ? "text-secondary" : "text-[#6b7280]"
              }`}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
