import { format } from "date-fns";
import { useCallback, useMemo, useState } from "react";

export function useBookingSchedule() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const selectedDateKey = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;

  const formattedDate = selectedDate
    ? format(selectedDate, "EEEE, MMMM d, yyyy")
    : "Select a date";

  const formattedTime = selectedTime ?? "Select a time";

  const compactFormattedDate = selectedDate
    ? format(selectedDate, "MMM d, yyyy")
    : "Select a date";

  const canContinue = Boolean(selectedDate && selectedTime);

  const handleSelectDate = useCallback((date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  }, []);

  const resetSchedule = useCallback(() => {
    setSelectedDate(null);
    setSelectedTime(null);
  }, []);

  return useMemo(
    () => ({
      selectedDate,
      selectedTime,
      setSelectedTime,
      selectedDateKey,
      formattedDate,
      formattedTime,
      compactFormattedDate,
      canContinue,
      handleSelectDate,
      resetSchedule,
    }),
    [
      selectedDate,
      selectedTime,
      selectedDateKey,
      formattedDate,
      formattedTime,
      compactFormattedDate,
      canContinue,
      handleSelectDate,
      resetSchedule,
    ]
  );
}
