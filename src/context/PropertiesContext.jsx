/**
 * Global property catalogue — fetched once on app boot via propertyService.
 * TODO (backend): Consider route-level loading or stale-while-revalidate when API latency matters.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  getProperties,
  invalidatePropertiesCache,
} from "../api/services/propertyService";

const PropertiesDataContext = createContext(null);
const PropertiesActionsContext = createContext(null);

export function PropertiesProvider({ children }) {
  const [properties, setProperties] = useState([]);
  const [loadState, setLoadState] = useState("loading");
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoadState("loading");
    setError(null);

    try {
      const data = await getProperties();
      setProperties(Array.isArray(data) ? data : []);
      setLoadState("success");
    } catch (err) {
      setError(err);
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const reload = useCallback(() => {
    invalidatePropertiesCache();
    return load();
  }, [load]);

  const dataValue = useMemo(
    () => ({ properties, loadState, error }),
    [properties, loadState, error]
  );

  const actionsValue = useMemo(() => ({ reload }), [reload]);

  return (
    <PropertiesActionsContext.Provider value={actionsValue}>
      <PropertiesDataContext.Provider value={dataValue}>
        {children}
      </PropertiesDataContext.Provider>
    </PropertiesActionsContext.Provider>
  );
}

export function usePropertiesContext() {
  const data = useContext(PropertiesDataContext);
  const actions = useContext(PropertiesActionsContext);

  if (!data || !actions) {
    throw new Error("usePropertiesContext must be used within PropertiesProvider");
  }

  return { ...data, ...actions };
}

/** Subscribe to catalog list only — avoids coupling to unrelated status-only consumers. */
export function usePropertyCatalog() {
  const data = useContext(PropertiesDataContext);
  if (!data) {
    throw new Error("usePropertyCatalog must be used within PropertiesProvider");
  }
  return data.properties;
}

export function usePropertiesStatus() {
  const data = useContext(PropertiesDataContext);
  const actions = useContext(PropertiesActionsContext);

  if (!data || !actions) {
    throw new Error("usePropertiesStatus must be used within PropertiesProvider");
  }

  return { loadState: data.loadState, error: data.error, reload: actions.reload };
}
