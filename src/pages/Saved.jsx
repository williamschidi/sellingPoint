import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import PropertyCard from "../components/PropertyCard";
import PageHeader from "../components/common/PageHeader";
import PageShell from "../components/common/PageShell";
import EmptyState from "../components/common/EmptyState";
import PropertyGridSkeleton from "../components/common/PropertyGridSkeleton";
import { usePropertiesStatus, usePropertyCatalog } from "../context/PropertiesContext";
import { useSavedProperties } from "../context/SavedPropertiesContext";
import { useToast } from "../context/ToastContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { useToggleSavedWithToast } from "../hooks/useToggleSavedWithToast";
import { mapPropertyToCard } from "../lib/properties/mapPropertyToCard";

export default function Saved() {
  usePageMeta({
    title: "Saved properties",
    description:
      "Your saved land listings on SellingPoint. Export or import your list across devices when signed in (coming soon).",
    path: "/saved",
  });

  const { loadState, reload } = usePropertiesStatus();
  const properties = usePropertyCatalog();
  const { savedIds, exportSaved, importSaved } = useSavedProperties();
  const { isSaved, handleToggleSave } = useToggleSavedWithToast();
  const { showToast } = useToast();
  const fileInputRef = useRef(null);
  const [importError, setImportError] = useState("");

  const savedProperties = properties
    .filter((property) => savedIds.includes(property.id))
    .map(mapPropertyToCard);

  function handleExport() {
    const json = exportSaved();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "sellingpoint-saved-properties.json";
    anchor.click();
    URL.revokeObjectURL(url);
    showToast("Saved list exported");
  }

  function handleImportClick() {
    setImportError("");
    fileInputRef.current?.click();
  }

  function handleImportFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        importSaved(String(reader.result));
        showToast("Saved list imported");
        setImportError("");
      } catch {
        setImportError("Could not import file. Check the format and try again.");
        showToast("Import failed", "error");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  if (loadState === "loading") {
    return (
      <PageShell>
        <div className="page-container">
          <PageHeader eyebrow="Your shortlist" title="Saved properties" />
          <PropertyGridSkeleton count={3} label="Loading saved properties" />
        </div>
      </PageShell>
    );
  }

  if (loadState === "error") {
    return (
      <PageShell className="flex min-h-[50vh] items-center justify-center">
        <div className="w-full max-w-md">
          <EmptyState
            icon="lucide:cloud-off"
            title="Could not load saved properties"
            description="Your shortlist is temporarily unavailable. Try again in a moment."
            actionLabel="Retry"
            onAction={reload}
          />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="page-container">
        <PageHeader
          eyebrow="Your shortlist"
          title="Saved properties"
          description="Keep track of listings you want to inspect or compare."
          actions={
            <>
              <button
                type="button"
                onClick={handleExport}
                disabled={savedIds.length === 0}
                className="btn-ghost btn-sm gap-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icon icon="lucide:download" className="h-4 w-4" aria-hidden />
                Export
              </button>
              <button
                type="button"
                onClick={handleImportClick}
                className="btn-ghost btn-sm gap-2"
              >
                <Icon icon="lucide:upload" className="h-4 w-4" aria-hidden />
                Import
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={handleImportFile}
                aria-hidden
              />
            </>
          }
        />

        {importError && (
          <p className="mb-6 text-sm text-red-600" role="alert">
            {importError}
          </p>
        )}

        {savedProperties.length === 0 ? (
          <EmptyState
            icon="lucide:heart"
            title="Nothing saved yet"
            description="Tap the heart on any listing to build your shortlist."
            actionLabel="Browse listings"
            actionTo="/properties"
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {savedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                showBookInspection
                isSaved={isSaved(property.id)}
                onToggleSave={handleToggleSave}
              />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
