import { Icon } from "@iconify/react";

export default function TrustInspectionCallout({ className = "" }) {
  return (
    <div className={`rounded-2xl border border-primary/10 bg-primary-subtle/60 p-5 ${className}`.trim()}>
      <div className="flex items-start gap-2.5">
        <Icon
          icon="lucide:shield-check"
          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
          aria-hidden
        />
        <div className="text-xs leading-relaxed text-primary">
          <strong className="mb-0.5 block font-semibold">
            SellingPoint verified inspection
          </strong>
          All inspections are verified and protected by our trust framework.
        </div>
      </div>
    </div>
  );
}
