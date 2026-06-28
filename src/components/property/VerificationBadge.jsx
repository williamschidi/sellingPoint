import { Icon } from "@iconify/react";
import { verificationLabel } from "../../lib/properties/formatters";

export default function VerificationBadge({
  status,
  showLabel = true,
  className = "",
}) {
  const isVerified = status === "verified";
  const label = showLabel ? verificationLabel(status) : isVerified ? "Verified" : "Under review";

  if (isVerified) {
    return (
      <span className={`verified-badge ${className}`.trim()}>
        <Icon icon="lucide:badge-check" className="h-3.5 w-3.5" aria-hidden />
        {label}
      </span>
    );
  }

  return (
    <span className={`pending-badge ${className}`.trim()}>
      <Icon icon="lucide:clock" className="h-3.5 w-3.5" aria-hidden />
      {label}
    </span>
  );
}
