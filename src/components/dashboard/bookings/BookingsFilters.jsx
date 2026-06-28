import { Icon } from "@iconify/react";

export default function BookingsFilters({
  search,
  inspectionDateFrom,
  inspectionDateTo,
  sort,
  onSearchChange,
  onInspectionDateFromChange,
  onInspectionDateToChange,
  onSortChange,
}) {
  return (
    <div className="dashboard-bookings-toolbar">
      <div className="min-w-0 flex-1 lg:max-w-xs">
        <label className="dashboard-form-label" htmlFor="bookings-search">
          Search bookings
        </label>
        <div className="relative">
          <Icon
            icon="lucide:search"
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9ca3af]"
            aria-hidden
          />
          <input
            id="bookings-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="ID, customer, property, phone…"
            className="dashboard-form-input pl-9"
          />
        </div>
      </div>

      <div className="grid flex-1 gap-3 sm:grid-cols-3 lg:max-w-3xl">
        <div>
          <label className="dashboard-form-label" htmlFor="bookings-date-from">
            Inspection from
          </label>
          <input
            id="bookings-date-from"
            type="date"
            value={inspectionDateFrom}
            onChange={(event) => onInspectionDateFromChange(event.target.value)}
            className="dashboard-form-input"
          />
        </div>

        <div>
          <label className="dashboard-form-label" htmlFor="bookings-date-to">
            Inspection to
          </label>
          <input
            id="bookings-date-to"
            type="date"
            value={inspectionDateTo}
            min={inspectionDateFrom || undefined}
            onChange={(event) => onInspectionDateToChange(event.target.value)}
            className="dashboard-form-input"
          />
        </div>

        <div>
          <label className="dashboard-form-label" htmlFor="bookings-sort">
            Sort
          </label>
          <select
            id="bookings-sort"
            value={sort}
            onChange={(event) => onSortChange(event.target.value)}
            className="dashboard-form-select"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>
    </div>
  );
}
