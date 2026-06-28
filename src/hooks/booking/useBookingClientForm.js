import { useCallback, useEffect, useState } from "react";
import { createInspectionRequest } from "../../api/services/inspectionService";
import {
  INITIAL_CLIENT_DETAILS,
  INITIAL_ERRORS,
} from "../../lib/bookInspection/constants";
import { hasValidationErrors, validateBooking } from "../../lib/bookInspection/validation";

export function useBookingClientForm({
  propertyId,
  selectedDate,
  selectedTime,
  selectedDateKey,
  scrollToDetails,
  scrollToSummary,
  refreshBookedSlots,
}) {
  const [clientDetails, setClientDetails] = useState(INITIAL_CLIENT_DETAILS);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [submitted, setSubmitted] = useState(false);
  const [submission, setSubmission] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const detailsEnabled = Boolean(selectedDate && selectedTime);
  const showSummary = detailsEnabled || submitted;

  const handleSubmit = useCallback(async () => {
    const nextErrors = validateBooking({
      selectedDate,
      selectedTime,
      clientDetails,
    });

    if (hasValidationErrors(nextErrors)) {
      setErrors((prev) => ({ ...prev, ...nextErrors }));
      scrollToDetails();
      return;
    }

    const payload = {
      propertyId,
      date: selectedDateKey,
      time: selectedTime,
      client: {
        fullName: clientDetails.fullName.trim(),
        phone: clientDetails.phone.trim(),
        notes: clientDetails.notes.trim(),
      },
      confirmed: clientDetails.confirmed,
    };

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const record = await createInspectionRequest(payload);
      setSubmitted(true);
      setSubmission(record);
      setErrors(INITIAL_ERRORS);
      await refreshBookedSlots();
      scrollToSummary();
    } catch (error) {
      setSubmitError(
        error?.message ?? "Could not submit your request. Please try again."
      );
      if (clientDetails.confirmed) scrollToSummary();
    } finally {
      setIsSubmitting(false);
    }
  }, [
    clientDetails,
    propertyId,
    refreshBookedSlots,
    scrollToDetails,
    scrollToSummary,
    selectedDate,
    selectedDateKey,
    selectedTime,
  ]);

  const resetSubmission = useCallback(() => {
    setSubmitted(false);
    setSubmission(null);
    setSubmitError("");
  }, []);

  useEffect(() => {
    if (!clientDetails.confirmed || submitted) return;

    const frame = requestAnimationFrame(() => {
      scrollToSummary();
    });

    return () => cancelAnimationFrame(frame);
  }, [clientDetails.confirmed, submitted, scrollToSummary]);

  return {
    clientDetails,
    setClientDetails,
    errors,
    setErrors,
    submitted,
    submission,
    isSubmitting,
    submitError,
    detailsEnabled,
    showSummary,
    handleSubmit,
    resetSubmission,
  };
}
