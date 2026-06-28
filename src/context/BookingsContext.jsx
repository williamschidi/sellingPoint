import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { listInspectionRequests } from "../api/services/inspectionService";
import { normalizeBookingRecord } from "../lib/dashboard/bookingRecord.js";
import { countBookingsByStatus } from "../lib/dashboard/bookings.js";

const BookingsContext = createContext(null);

/**
 * Shared mock booking store for dashboard Overview + Bookings.
 * TODO: Replace with API-backed cache when backend inspection endpoints ship.
 */
export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [loadState, setLoadState] = useState("loading");
  const [error, setError] = useState(null);

  const loadBookings = useCallback(async () => {
    setLoadState("loading");
    setError(null);

    try {
      const data = await listInspectionRequests();
      setBookings(data.map((item) => normalizeBookingRecord(item)));
      setLoadState("success");
    } catch (err) {
      setError(err);
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const replaceBooking = useCallback((nextBooking) => {
    setBookings((current) =>
      current.map((item) => (item.id === nextBooking.id ? nextBooking : item))
    );
  }, []);

  const removeBooking = useCallback((bookingId) => {
    setBookings((current) => current.filter((item) => item.id !== bookingId));
  }, []);

  const counts = useMemo(() => countBookingsByStatus(bookings), [bookings]);
  const pendingCount = counts.pending;

  const value = useMemo(
    () => ({
      bookings,
      loadState,
      error,
      counts,
      pendingCount,
      reload: loadBookings,
      replaceBooking,
      removeBooking,
    }),
    [
      bookings,
      loadState,
      error,
      counts,
      pendingCount,
      loadBookings,
      replaceBooking,
      removeBooking,
    ]
  );

  return (
    <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error("useBookings must be used within BookingsProvider");
  }
  return context;
}
