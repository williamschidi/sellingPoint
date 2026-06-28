import { useCallback, useEffect, useState } from "react";
import {
  getBookedSlots,
  getTimeSlots,
} from "../../api/services/inspectionService";

export function useInspectionSlots(propertyId) {
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);

  useEffect(() => {
    if (!propertyId) return;

    let cancelled = false;

    async function loadSlots() {
      setIsLoadingSlots(true);

      try {
        const [slots, booked] = await Promise.all([
          getTimeSlots(),
          getBookedSlots(propertyId),
        ]);

        if (!cancelled) {
          setTimeSlots(slots);
          setBookedSlots(booked);
        }
      } finally {
        if (!cancelled) setIsLoadingSlots(false);
      }
    }

    loadSlots();
    return () => {
      cancelled = true;
    };
  }, [propertyId]);

  const refreshBookedSlots = useCallback(async () => {
    const booked = await getBookedSlots(propertyId);
    setBookedSlots(booked);
    return booked;
  }, [propertyId]);

  return {
    timeSlots,
    bookedSlots,
    isLoadingSlots,
    refreshBookedSlots,
  };
}
