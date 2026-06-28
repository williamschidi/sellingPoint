import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useSavedSearches } from "../../context/SavedSearchesContext";

export default function SavedSearchesPanel({ onClose }) {
  const { searches, removeSearch } = useSavedSearches();

  if (searches.length === 0) {
    return (
      <div className="surface-panel flex items-center gap-3 px-4 py-5 text-sm text-slate-500">
        <Icon icon="lucide:bookmark" className="h-5 w-5 shrink-0 text-slate-300" aria-hidden />
        Save a search from this page to quickly return to it later.
      </div>
    );
  }

  return (
    <div className="surface-panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Saved searches</h3>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="focus-ring rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close saved searches"
          >
            <Icon icon="lucide:x" className="h-4 w-4" aria-hidden />
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {searches.map((search) => (
          <li
            key={search.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2.5 transition hover:border-slate-200 hover:bg-white"
          >
            <Link
              to={search.url}
              className="min-w-0 flex-1 truncate text-sm font-medium text-primary hover:underline"
            >
              {search.label}
            </Link>
            <button
              type="button"
              onClick={() => removeSearch(search.id)}
              aria-label={`Remove saved search ${search.label}`}
              className="focus-ring rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
            >
              <Icon icon="lucide:trash-2" className="h-4 w-4" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
