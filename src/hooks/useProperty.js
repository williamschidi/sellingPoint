import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getCachedPropertyById,
  getPropertyById,
  seedPropertyCache,
} from "../api/services/propertyService";
import { usePropertyCatalog } from "../context/PropertiesContext";

export function useProperty(propertyId) {
  const properties = usePropertyCatalog();
  const catalogProperty = useMemo(
    () => properties.find((item) => item.id === propertyId) ?? null,
    [properties, propertyId]
  );

  const [property, setProperty] = useState(null);
  const [loadState, setLoadState] = useState("idle");
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => {
    setReloadKey((key) => key + 1);
  }, []);

  useEffect(() => {
    if (properties.length > 0) {
      seedPropertyCache(properties);
    }
  }, [properties]);

  useEffect(() => {
    if (!propertyId) {
      setLoadState("not-found");
      return;
    }

    let cancelled = false;

    async function load() {
      const fromCache = getCachedPropertyById(propertyId);

      if (catalogProperty || fromCache) {
        if (!cancelled) {
          setProperty(catalogProperty ?? fromCache);
          setLoadState("success");
          setError(null);
        }
        return;
      }

      setLoadState("loading");
      setProperty(null);
      setError(null);

      try {
        const data = await getPropertyById(propertyId);
        if (cancelled) return;

        if (!data) {
          setLoadState("not-found");
          return;
        }

        setProperty(data);
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
  }, [propertyId, catalogProperty, reloadKey]);

  return { property, loadState, error, reload };
}
