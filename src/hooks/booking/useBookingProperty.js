import { useEffect, useState } from "react";
import { getPropertyById } from "../../api/services/propertyService";

export function useBookingProperty(propertyId) {
  const [property, setProperty] = useState(null);
  const [propertyLoadState, setPropertyLoadState] = useState("loading");

  useEffect(() => {
    if (!propertyId) return;

    let cancelled = false;

    async function loadProperty() {
      setPropertyLoadState("loading");
      try {
        const data = await getPropertyById(propertyId);
        if (!cancelled) {
          setProperty(data);
          setPropertyLoadState(data ? "success" : "not-found");
        }
      } catch {
        if (!cancelled) setPropertyLoadState("error");
      }
    }

    loadProperty();
    return () => {
      cancelled = true;
    };
  }, [propertyId]);

  return { property, propertyLoadState };
}
