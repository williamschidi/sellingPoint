import { useEffect, useState } from "react";

export function useBookingStepTracker({
  detailsRef,
  canContinue,
  clientDetails,
  submitted,
  selectedDate,
  selectedTime,
}) {
  const [detailsReached, setDetailsReached] = useState(false);

  const stepComplete = [
    Boolean(selectedDate),
    Boolean(selectedTime),
    detailsReached ||
      Boolean(clientDetails.fullName.trim() || clientDetails.phone.trim()),
    clientDetails.confirmed || submitted,
  ];

  useEffect(() => {
    if (!detailsRef.current || detailsReached) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && canContinue) {
          setDetailsReached(true);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(detailsRef.current);
    return () => observer.disconnect();
  }, [canContinue, detailsReached, detailsRef]);

  return { detailsReached, stepComplete };
}
