import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import {
  buildActiveFilterChips,
  buildFilterChipUrl,
} from "../../lib/search/activeFilters.js";

export default function ActiveFilterChips({ filters, onClearAll }) {
  const navigate = useNavigate();
  const chips = buildActiveFilterChips(filters);

  if (chips.length === 0) return null;

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      aria-label="Active filters"
    >
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={() => navigate(buildFilterChipUrl(chip.nextFilters))}
          className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-primary/30 hover:bg-primary-subtle"
        >
          {chip.label}
          <Icon icon="lucide:x" className="h-3 w-3 text-slate-400" aria-hidden />
          <span className="sr-only">Remove filter {chip.label}</span>
        </button>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="focus-ring text-xs font-semibold text-primary hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}
