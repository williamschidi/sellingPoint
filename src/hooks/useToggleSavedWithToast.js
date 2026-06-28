import { useCallback } from "react";
import { useSavedProperties } from "../context/SavedPropertiesContext";
import { useToast } from "../context/ToastContext";

export function useToggleSavedWithToast() {
  const { isSaved, toggleSaved } = useSavedProperties();
  const { showToast } = useToast();

  const handleToggleSave = useCallback(
    (propertyId) => {
      const action = toggleSaved(propertyId);
      showToast(
        action === "added"
          ? "Property saved to your list"
          : "Removed from saved properties"
      );
    },
    [toggleSaved, showToast]
  );

  return { isSaved, handleToggleSave };
}
