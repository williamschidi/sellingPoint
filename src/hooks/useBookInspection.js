import { useCallback, useRef } from "react";
import { getInspectionSummaryLabels } from "../lib/bookInspection/propertySummary";
import { useBookingClientForm } from "./booking/useBookingClientForm";
import { useBookingProperty } from "./booking/useBookingProperty";
import { useBookingSchedule } from "./booking/useBookingSchedule";
import { useBookingStepTracker } from "./booking/useBookingStepTracker";
import { useInspectionSlots } from "./booking/useInspectionSlots";

export function useBookInspection(propertyId) {
  const detailsRef = useRef(null);
  const summaryRef = useRef(null);

  const { property, propertyLoadState } = useBookingProperty(propertyId);
  const {
    timeSlots,
    bookedSlots,
    isLoadingSlots,
    refreshBookedSlots,
  } = useInspectionSlots(propertyId);

  const schedule = useBookingSchedule();
  const {
    selectedDate,
    selectedTime,
    setSelectedTime,
    selectedDateKey,
    formattedDate,
    formattedTime,
    compactFormattedDate,
    canContinue,
    handleSelectDate: selectDate,
  } = schedule;

  const scrollToDetails = useCallback(() => {
    detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToSummary = useCallback(() => {
    summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const form = useBookingClientForm({
    propertyId,
    selectedDate,
    selectedTime,
    selectedDateKey,
    scrollToDetails,
    scrollToSummary,
    refreshBookedSlots,
  });

  const { detailsReached, stepComplete } = useBookingStepTracker({
    detailsRef,
    canContinue,
    clientDetails: form.clientDetails,
    submitted: form.submitted,
    selectedDate,
    selectedTime,
  });

  const {
    clientDetails,
    setClientDetails,
    errors,
    setErrors,
    submitted,
    isSubmitting,
    submitError,
    detailsEnabled,
    showSummary,
    handleSubmit,
    resetSubmission,
  } = form;

  const handleSelectDate = useCallback(
    (date) => {
      selectDate(date);
      resetSubmission();
      setErrors((prev) => ({ ...prev, date: "", time: "" }));
    },
    [resetSubmission, selectDate, setErrors]
  );

  const summaryLabels = getInspectionSummaryLabels(property);

  return {
    property,
    propertyLoadState,
    detailsRef,
    summaryRef,
    clientDetails: form.clientDetails,
    setClientDetails: form.setClientDetails,
    errors: form.errors,
    setErrors: form.setErrors,
    selectedDate,
    selectedTime,
    setSelectedTime,
    detailsReached,
    submitted: form.submitted,
    submission: form.submission,
    isSubmitting: form.isSubmitting,
    submitError: form.submitError,
    timeSlots,
    bookedSlots,
    isLoadingSlots,
    selectedDateKey,
    formattedDate,
    compactFormattedDate,
    formattedTime,
    stepComplete,
    canContinue,
    detailsEnabled: form.detailsEnabled,
    showSummary: form.showSummary,
    summaryLabels,
    handleSelectDate,
    handleSubmit: form.handleSubmit,
  };
}
