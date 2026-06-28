import Skeleton from "./common/Skeleton";

function InspectionTime({
  formattedDate,
  errors,
  ALL_TIME_SLOTS,
  bookedSlots,
  selectedDateKey,
  selectedDate,
  selectedTime,
  setSelectedTime,
  isLoadingSlots = false,
}) {
  return (
    <div className="surface-panel mt-5 p-6">
      <h3 className="text-sm font-semibold text-slate-700">Available time slots</h3>
      <p className="mt-2 text-xs text-slate-400">{formattedDate}</p>
      {errors.time && (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {errors.time}
        </p>
      )}

      {isLoadingSlots ? (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3" aria-busy="true">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-11 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ALL_TIME_SLOTS.map((slot) => {
            const isBooked = bookedSlots.some(
              (booking) =>
                booking.date === selectedDateKey && booking.time === slot
            );

            return (
              <button
                key={slot}
                type="button"
                disabled={!selectedDate || isBooked}
                onClick={() => setSelectedTime(slot)}
                aria-pressed={selectedTime === slot}
                aria-label={`${slot}${isBooked ? " — booked" : ""}`}
                className={`focus-ring rounded-xl border py-2.5 text-sm transition ${
                  !selectedDate
                    ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
                    : isBooked
                      ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                      : selectedTime === slot
                        ? "border-primary bg-primary font-semibold text-white"
                        : "border-slate-200 bg-white text-slate-900 hover:border-primary"
                }`}
              >
                <div>{slot}</div>
                {isBooked && <div className="mt-1 text-[11px]">Booked</div>}
              </button>
            );
          })}
        </div>
      )}

      {selectedDate && !selectedTime && !isLoadingSlots && (
        <p className="mt-4 text-xs text-text-muted">Select a time slot to continue.</p>
      )}

      {selectedDate && selectedTime && (
        <p className="mt-4 text-xs text-text-muted">Next: fill in your details below.</p>
      )}
    </div>
  );
}

export default InspectionTime;
