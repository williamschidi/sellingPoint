import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function EmptyState({
  icon = "lucide:inbox",
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
  actionVariant = "primary",
  className = "",
}) {
  const actionClass =
    actionVariant === "ghost" ? "btn-ghost" : "btn-primary";

  return (
    <div className={`empty-state ${className}`}>
      <div className="empty-state-icon" aria-hidden>
        <Icon icon={icon} className="h-8 w-8 text-slate-400" />
      </div>
      {title && <h2 className="empty-state-title">{title}</h2>}
      {description && <p className="empty-state-description">{description}</p>}
      {actionLabel &&
        (actionTo ? (
          <Link to={actionTo} className={actionClass}>
            {actionLabel}
          </Link>
        ) : onAction ? (
          <button type="button" onClick={onAction} className={actionClass}>
            {actionLabel}
          </button>
        ) : null)}
    </div>
  );
}
