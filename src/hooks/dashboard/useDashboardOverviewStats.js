import { useMemo } from "react";
import { useBookings } from "../../context/BookingsContext.jsx";
import { usePropertyCatalog } from "../../context/PropertiesContext.jsx";

/**
 * Dashboard overview stats — only values derived from real mock catalog/booking data.
 * Preview metrics are labeled explicitly until backend analytics ship.
 */
export function useDashboardOverviewStats() {
  const properties = usePropertyCatalog();
  const { counts, pendingCount } = useBookings();

  return useMemo(() => {
    const pendingListings = properties.filter(
      (item) => item.verificationStatus !== "verified"
    ).length;

    return {
      pendingListings,
      stats: [
        {
          label: "Active Listings",
          value: properties.length,
          valueColor: "var(--color-primary)",
          change: "From catalogue",
          trend: "neutral",
          mobileBg: "var(--color-primary-light)",
          isPreview: false,
        },
        {
          label: "Pending Bookings",
          value: pendingCount,
          valueColor: "var(--color-gold)",
          change: counts.pending === 1 ? "Awaiting approval" : `${counts.pending} awaiting`,
          trend: "neutral",
          mobileBg: "var(--color-gold-light)",
          isPreview: false,
        },
        {
          label: "Approved Bookings",
          value: counts.approved,
          valueColor: "var(--color-text)",
          change: "Live in mock data",
          trend: "neutral",
          mobileBg: "var(--color-bg-soft)",
          isPreview: false,
        },
        {
          label: "Profile Views",
          value: "—",
          valueColor: "var(--color-text)",
          change: "Preview analytics",
          trend: "neutral",
          mobileBg: "var(--color-bg-soft)",
          isPreview: true,
          previewNote: "Available after backend analytics integration",
        },
      ],
    };
  }, [properties, counts, pendingCount]);
}
