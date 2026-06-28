import { useEffect, useState } from "react";
import { searchProperties } from "../api/services/propertyService";
import { mapPropertyToCard } from "../lib/properties/mapPropertyToCard";

export function usePropertySearch(filters) {
  const [result, setResult] = useState({
    items: [],
    total: 0,
    totalPages: 1,
    currentPage: 1,
  });
  const [loadState, setLoadState] = useState("idle");
  const [error, setError] = useState(null);

  const filterKey = JSON.stringify(filters);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoadState("loading");
      setError(null);

      try {
        const response = await searchProperties(filters);
        if (cancelled) return;

        const items = (response.properties ?? []).map(mapPropertyToCard);

        setResult({
          items,
          total: response.total ?? items.length,
          totalPages: response.totalPages ?? 1,
          currentPage: response.currentPage ?? filters.page ?? 1,
        });
        setLoadState("success");
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setLoadState("error");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [filterKey]);

  return { ...result, loadState, error };
}
