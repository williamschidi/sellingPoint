import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  listSavedSearches,
  removeSavedSearch,
  saveSearch,
} from "../api/services/savedSearchService";

const SavedSearchesContext = createContext(null);

export function SavedSearchesProvider({ children }) {
  const [searches, setSearches] = useState([]);
  const [loadState, setLoadState] = useState("loading");

  const reload = useCallback(async () => {
    setLoadState("loading");
    const data = await listSavedSearches();
    setSearches(data);
    setLoadState("success");
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const addSearch = useCallback(async (filters) => {
    const record = await saveSearch(filters);
    setSearches(await listSavedSearches());
    return record;
  }, []);

  const removeSearch = useCallback(async (id) => {
    await removeSavedSearch(id);
    setSearches(await listSavedSearches());
  }, []);

  const value = useMemo(
    () => ({
      searches,
      loadState,
      reload,
      addSearch,
      removeSearch,
    }),
    [searches, loadState, reload, addSearch, removeSearch]
  );

  return (
    <SavedSearchesContext.Provider value={value}>
      {children}
    </SavedSearchesContext.Provider>
  );
}

export function useSavedSearches() {
  const context = useContext(SavedSearchesContext);
  if (!context) {
    throw new Error("useSavedSearches must be used within SavedSearchesProvider");
  }
  return context;
}
