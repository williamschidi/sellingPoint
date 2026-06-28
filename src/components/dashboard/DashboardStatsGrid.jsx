import { memo } from "react";

function DashboardStatsGrid({ stats, previewLabel = "Preview data" }) {
  return (
    <>
      <div className="mb-6 hidden gap-4 sm:grid-cols-2 lg:grid lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="dashboard-stat-card">
            <div className="mb-1 flex items-center justify-between gap-2">
              <p className="dashboard-stat-label">{stat.label}</p>
              {stat.isPreview && (
                <span className="rounded-full bg-[#f3f4f6] px-2 py-0.5 text-[9px] font-bold tracking-wide text-[#6b7280] uppercase">
                  {previewLabel}
                </span>
              )}
            </div>
            <p className="dashboard-stat-value" style={{ color: stat.valueColor }}>
              {stat.value}
            </p>
            <p
              className={`dashboard-stat-change ${
                stat.trend === "up" ? "dashboard-stat-up" : "text-[#6b7280]"
              }`}
              title={stat.previewNote}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2 lg:hidden">
        {stats.map((stat) => (
          <div
            key={`mobile-${stat.label}`}
            className="rounded-[10px] p-3"
            style={{ background: stat.mobileBg }}
          >
            <div className="mb-1 flex items-center justify-between gap-1">
              <p className="text-[9px] font-bold tracking-[0.06em] text-[#6b7280] uppercase">
                {stat.label}
              </p>
              {stat.isPreview && (
                <span className="text-[8px] font-bold text-[#9ca3af] uppercase">Demo</span>
              )}
            </div>
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

export default memo(DashboardStatsGrid);
