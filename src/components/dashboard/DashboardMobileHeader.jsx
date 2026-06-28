import { Icon } from "@iconify/react";
import { DEFAULT_AGENT } from "../../api/mock/agents.js";
import { getAgentInitials } from "../../lib/properties/formatters.js";

export default function DashboardMobileHeader({
  agent = DEFAULT_AGENT,
  notificationCount = 0,
}) {
  const firstName = agent.name.split(" ")[0] ?? agent.name;
  const initials = getAgentInitials(agent.name);

  return (
    <header className="dashboard-mobile-header">
      <div>
        <p className="text-[10px] text-white/60">Welcome back 👋</p>
        <p className="text-sm font-bold text-white">{firstName}</p>
      </div>

      <div className="flex items-center gap-2.5">
        <button type="button" className="relative p-1" aria-label="Notifications">
          <Icon icon="lucide:bell" className="h-5 w-5 text-white" aria-hidden />
          {notificationCount > 0 && (
            <span className="dashboard-notif-badge border-primary">{notificationCount}</span>
          )}
        </button>
        <div className="dashboard-avatar h-8 w-8 bg-white/15 text-[11px] text-white">
          {initials}
        </div>
      </div>
    </header>
  );
}
