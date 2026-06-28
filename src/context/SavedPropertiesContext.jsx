import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "sellingpoint:saved-properties";

const SavedPropertiesContext = createContext(null);

function readSavedIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function SavedPropertiesProvider({ children }) {
  const [savedIds, setSavedIds] = useState(() => readSavedIds());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
  }, [savedIds]);

  const isSaved = useCallback(
    (propertyId) => savedIds.includes(propertyId),
    [savedIds]
  );

  /** @returns {'added' | 'removed'} */
  const toggleSaved = useCallback((propertyId) => {
    let action = "added";
    setSavedIds((current) => {
      if (current.includes(propertyId)) {
        action = "removed";
        return current.filter((id) => id !== propertyId);
      }
      return [...current, propertyId];
    });
    return action;
  }, []);

  const exportSaved = useCallback(() => {
    return JSON.stringify({ version: 1, savedIds }, null, 2);
  }, [savedIds]);

  const importSaved = useCallback((jsonText) => {
    const parsed = JSON.parse(jsonText);
    const ids = Array.isArray(parsed?.savedIds) ? parsed.savedIds : parsed;
    if (!Array.isArray(ids)) {
      throw new Error("Invalid saved properties file");
    }
    setSavedIds(ids.filter(Boolean));
  }, []);

  const value = useMemo(
    () => ({
      savedIds,
      savedCount: savedIds.length,
      isSaved,
      toggleSaved,
      exportSaved,
      importSaved,
    }),
    [savedIds, isSaved, toggleSaved, exportSaved, importSaved]
  );

  return (
    <SavedPropertiesContext.Provider value={value}>
      {children}
    </SavedPropertiesContext.Provider>
  );
}

export function useSavedProperties() {
  const context = useContext(SavedPropertiesContext);
  if (!context) {
    throw new Error(
      "useSavedProperties must be used within SavedPropertiesProvider"
    );
  }
  return context;
}
