import { Icon } from "@iconify/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageStatus, {
  PageStatusButton,
  PageStatusLink,
} from "../components/common/PageStatus";
import PageLoader from "../components/common/PageLoader";
import InspectionCalendar from "../components/InspectionCalendar";
import ClientDetails from "../components/ClientDetails";
import InspectionSummary from "../components/InspectionSummary";
import InspectionTime from "../components/InspectionTime";
import { useBookInspection } from "../hooks/useBookInspection";
import { usePageMeta } from "../hooks/usePageMeta";
import { BOOKING_STEPS } from "../lib/bookInspection/constants";

export default function BookInspection() {
  const navigate = useNavigate();
  const { propertyId } = useParams();

  const {
    propertyLoadState,
    detailsRef,
    summaryRef,
    clientDetails,
    setClientDetails,
    errors,
    setErrors,
    selectedDate,
    selectedTime,
    setSelectedTime,
    submitted,
    submission,
    isSubmitting,
    submitError,
    timeSlots,
    bookedSlots,
    isLoadingSlots,
    selectedDateKey,
    formattedDate,
    compactFormattedDate,
    formattedTime,
    stepComplete,
    canContinue,
    detailsEnabled,
    showSummary,
    summaryLabels,
    handleSelectDate,
    handleSubmit,
  } = useBookInspection(propertyId);

  usePageMeta({
    title: "Book inspection",
    description: "Schedule a free on-site property inspection with a licensed SellingPoint agent.",
  });

  const showMobileStickyBar = canContinue && !submitted;

  if (propertyLoadState === "loading") {
    return <PageLoader message="Loading booking details..." />;
  }

  if (propertyLoadState === "not-found") {
    return (
      <PageStatus message="Property not found.">
        <PageStatusLink to="/properties">Browse listings</PageStatusLink>
      </PageStatus>
    );
  }

  if (propertyLoadState === "error") {
    return (
      <PageStatus message="Could not load this property.">
        <PageStatusButton onClick={() => navigate(-1)} className="btn-ghost">
          Go back
        </PageStatusButton>
      </PageStatus>
    );
  }

  return (
    <div className={`min-h-screen bg-surface-muted ${showMobileStickyBar ? "pb-28 lg:pb-8" : ""}`}>
      <div className="breadcrumb-bar">
        <div className="page-container flex items-center justify-between px-6 py-4 lg:px-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-ghost btn-sm gap-2 border-0 px-3"
          >
            <Icon icon="lucide:arrow-left" className="h-4 w-4" aria-hidden />
            Back
          </button>
          <h1 className="text-sm font-semibold tracking-tight text-slate-900">Book inspection</h1>
          <Link
            to={`/propertyDetail/${propertyId}`}
            className="text-sm font-semibold text-primary transition hover:underline"
          >
            View property
          </Link>
        </div>
      </div>

      <div className="page-container px-6 py-8 lg:px-10 lg:py-10">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <ol
              className="mb-8 flex items-center"
              aria-label="Booking progress"
            >
              {BOOKING_STEPS.map((step, index) => {
                const complete = stepComplete[index];
                const current =
                  complete &&
                  (index === stepComplete.length - 1 ||
                    !stepComplete[index + 1]);

                return (
                  <li
                    key={step.num}
                    aria-current={current ? "step" : undefined}
                    className={`flex items-center ${index < BOOKING_STEPS.length - 1 ? "flex-1" : ""}`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                          complete
                            ? "bg-primary text-white"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {step.num}
                      </div>
                      <span
                        className={`ml-2 hidden text-sm sm:inline ${
                          complete ? "font-medium text-primary" : "text-text-muted"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>

                    {index < BOOKING_STEPS.length - 1 && (
                      <div
                        className={`mx-2 h-0.5 flex-1 sm:mx-4 ${
                          complete ? "bg-primary" : "bg-slate-200"
                        }`}
                        aria-hidden
                      />
                    )}
                  </li>
                );
              })}
            </ol>

            <InspectionCalendar
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
            />

            <InspectionTime
              formattedDate={formattedDate}
              errors={errors}
              ALL_TIME_SLOTS={timeSlots}
              bookedSlots={bookedSlots}
              selectedDateKey={selectedDateKey}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              isLoadingSlots={isLoadingSlots}
            />

            <ClientDetails
              detailsRef={detailsRef}
              detailsEnabled={detailsEnabled}
              clientDetails={clientDetails}
              setClientDetails={setClientDetails}
              errors={errors}
              setErrors={setErrors}
            />
          </div>

          {showSummary && (
            <InspectionSummary
              ref={summaryRef}
              formattedDate={formattedDate}
              formattedTime={formattedTime}
              clientDetails={clientDetails}
              submitted={submitted}
              isSubmitting={isSubmitting}
              submitError={submitError}
              propertyId={propertyId}
              submission={submission}
              selectedDateKey={selectedDateKey}
              propertyTitle={summaryLabels.title}
              propertySubtitle={summaryLabels.subtitle}
              propertyImageUrl={summaryLabels.image}
              verificationStatus={summaryLabels.verificationStatus}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>

      {showMobileStickyBar && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {compactFormattedDate}
              </p>
              <p className="truncate text-xs text-text-muted">{formattedTime}</p>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary shrink-0 gap-2 px-5"
            >
              <Icon icon="lucide:calendar-check" className="h-4 w-4" aria-hidden />
              {isSubmitting ? "Submitting..." : "Submit request"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
