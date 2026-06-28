import { Icon } from "@iconify/react";
import { forwardRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  buildGoogleCalendarUrl,
  downloadInspectionIcs,
} from "../lib/bookInspection/calendar";
import VerificationBadge from "./property/VerificationBadge";

const InspectionSummary = forwardRef(function InspectionSummary(
  {
    formattedDate,
    formattedTime,
    submitted = false,
    submission = null,
    isSubmitting = false,
    submitError = "",
    propertyId = "",
    propertyTitle = "Property",
    propertySubtitle = "",
    propertyImageUrl = null,
    verificationStatus = "verified",
    selectedDateKey = "",
    clientDetails,
    handleSubmit,
    showSubmitButton = true,
  },
  ref
) {
  const [copied, setCopied] = useState(false);
  const referenceId = submission?.id ?? "";

  async function handleCopyReference() {
    if (!referenceId) return;
    await navigator.clipboard.writeText(referenceId);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  function handleAddToCalendar() {
    if (!selectedDateKey || !submission) return;

    const googleUrl = buildGoogleCalendarUrl({
      title: `Property inspection — ${propertyTitle}`,
      dateKey: selectedDateKey,
      timeLabel: submission.time,
      location: propertySubtitle,
      details: `Reference: ${referenceId}`,
    });

    window.open(googleUrl, "_blank", "noopener,noreferrer");
  }

  function handleDownloadIcs() {
    if (!selectedDateKey || !submission) return;

    downloadInspectionIcs({
      title: `Property inspection — ${propertyTitle}`,
      dateKey: selectedDateKey,
      timeLabel: submission.time,
      location: propertySubtitle,
      description: `SellingPoint inspection reference ${referenceId}`,
      referenceId,
    });
  }

  return (
    <aside
      ref={ref}
      className="surface-panel w-full self-start p-6 lg:w-100 lg:shrink-0"
      aria-label="Inspection summary"
    >
      <p className="text-xs font-semibold tracking-[0.14em] text-text-muted uppercase">
        Inspection summary
      </p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        {propertyImageUrl ? (
          <img
            src={propertyImageUrl}
            alt=""
            className="h-16 w-16 rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-100">
            <Icon icon="lucide:image" className="h-5 w-5 text-slate-400" aria-hidden />
          </div>
        )}

        <div>
          <h4 className="text-sm font-semibold leading-5 text-slate-800">{propertyTitle}</h4>
          <p className="pt-2 text-xs text-text-muted">{propertySubtitle}</p>
          <VerificationBadge status={verificationStatus} className="mt-2" />
        </div>
      </div>

      <div className="my-5 border-t border-slate-100" />

      <div className="space-y-4 text-sm">
        {referenceId && (
          <div className="flex justify-between gap-4">
            <span className="text-xs font-semibold text-slate-600">Reference</span>
            <span className="text-right text-sm font-semibold text-primary">{referenceId}</span>
          </div>
        )}

        <div className="flex justify-between gap-4">
          <span className="text-xs font-semibold text-slate-600">Date</span>
          <span className="text-right text-sm font-medium text-slate-600">{formattedDate}</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-xs font-semibold text-slate-600">Time</span>
          <span className="text-right text-sm font-medium text-slate-600">{formattedTime}</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-xs font-semibold text-slate-600">Name</span>
          <span className="text-right text-sm font-medium text-slate-600">
            {clientDetails?.fullName}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-xs font-semibold text-slate-600">Contact</span>
          <span className="text-right text-sm font-medium text-slate-600">
            {clientDetails?.phone}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-xs font-semibold text-slate-600">Inspection fee</span>
          <span className="font-semibold text-secondary">Free</span>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-primary/10 bg-primary-subtle/60 p-4">
        <div className="flex items-start gap-2">
          <Icon icon="lucide:shield-check" className="mt-0.5 text-lg text-primary" aria-hidden />
          <div>
            <p className="text-xs font-semibold text-primary">SellingPoint verified inspection</p>
            <p className="mt-1 text-[11px] leading-5 text-text-muted">
              All inspections are verified and protected by SellingPoint&apos;s trust framework.
            </p>
          </div>
        </div>
      </div>

      {submitError && (
        <div
          className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-xs leading-5 text-red-800"
          role="alert"
        >
          {submitError}
        </div>
      )}

      {submitted && (
        <div
          className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs leading-5 text-emerald-800"
          role="status"
        >
          <strong className="mb-1 flex items-center gap-1.5">
            <Icon icon="lucide:check-circle" className="h-4 w-4" aria-hidden />
            Request submitted
          </strong>
          Your reference is <strong>{referenceId}</strong>. The agent will contact you within
          24 hours to confirm your inspection.
        </div>
      )}

      {submitted && (
        <div className="mt-4 flex flex-col gap-2">
          <button type="button" onClick={handleCopyReference} className="btn-ghost w-full gap-2">
            <Icon icon="lucide:copy" className="h-4 w-4" aria-hidden />
            {copied ? "Copied" : "Copy reference"}
          </button>

          <button type="button" onClick={handleAddToCalendar} className="btn-ghost w-full gap-2">
            <Icon icon="lucide:calendar-plus" className="h-4 w-4" aria-hidden />
            Add to Google Calendar
          </button>

          <button type="button" onClick={handleDownloadIcs} className="btn-ghost w-full gap-2">
            <Icon icon="lucide:download" className="h-4 w-4" aria-hidden />
            Download .ics file
          </button>

          {propertyId && (
            <Link
              to={`/propertyDetail/${propertyId}`}
              className="btn-ghost w-full text-primary"
            >
              Back to property
            </Link>
          )}

          <Link to="/properties" className="btn-primary w-full">
            Browse more listings
          </Link>
        </div>
      )}

      {showSubmitButton && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitted || isSubmitting}
          className="btn-primary mt-5 hidden w-full gap-2 lg:inline-flex"
        >
          <Icon
            icon={submitted ? "lucide:check-circle" : "lucide:calendar-check"}
            className="h-4 w-4"
            aria-hidden
          />
          {submitted
            ? "Request submitted"
            : isSubmitting
              ? "Submitting..."
              : "Submit request"}
        </button>
      )}
    </aside>
  );
});

export default InspectionSummary;
