import { Link } from "react-router-dom";

export default function DataStatusPanel({
  message,
  onRetry,
  retryLabel = "Try again",
  actionTo,
  actionLabel,
  className = "rounded-2xl border border-[#e5e7eb] bg-white px-6 py-10 text-center",
}) {
  return (
    <div className={className} role="alert">
      <p className="text-sm text-[#6b7280]">{message}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {onRetry && (
          <button type="button" onClick={onRetry} className="dashboard-form-btn-primary">
            {retryLabel}
          </button>
        )}
        {actionTo && actionLabel && (
          <Link to={actionTo} className="dashboard-form-btn-ghost no-underline">
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
