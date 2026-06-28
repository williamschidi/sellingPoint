import { Icon } from "@iconify/react";
import PropertyCard from "./PropertyCard";
import PropertyGridSkeleton from "./common/PropertyGridSkeleton";
import EmptyState from "./common/EmptyState";
import { useToggleSavedWithToast } from "../hooks/useToggleSavedWithToast";
import { getPaginationRange } from "../lib/properties/filterProperties";

export default function ListingGrid({
  items = [],
  totalPages = 1,
  currentPage = 1,
  onPageChange,
  onClearFilters,
  isLoading = false,
  isRefreshing = false,
}) {
  const { isSaved, handleToggleSave } = useToggleSavedWithToast();
  const pages = getPaginationRange(currentPage, totalPages);

  if (isLoading) {
    return (
      <section className="flex-1 p-6 lg:p-8">
        <PropertyGridSkeleton count={6} label="Loading property results" />
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="flex-1 p-6 lg:p-8">
        <EmptyState
          icon="lucide:search-x"
          title="No properties match your search"
          description="Try widening your price range, choosing a different state, or clearing a few filters."
          actionLabel="Clear all filters"
          onAction={onClearFilters}
          actionVariant="primary"
        />
      </section>
    );
  }

  return (
    <section className="relative flex-1" aria-label="Property results">
      {isRefreshing && (
        <div
          className="absolute inset-0 z-10 flex items-start justify-center bg-white/60 pt-24 backdrop-blur-[1px]"
          role="status"
          aria-live="polite"
        >
          <p className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
            Updating results…
          </p>
        </div>
      )}
      <div className="space-y-8 p-6 lg:p-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              showBookInspection
              isSaved={isSaved(property.id)}
              onToggleSave={handleToggleSave}
            />
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <nav
          className="mt-2 flex flex-wrap justify-center gap-2 px-6 pb-10 lg:px-8"
          aria-label="Pagination"
        >
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Previous page"
            className="btn-ghost btn-sm gap-1 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Icon icon="lucide:chevron-left" className="h-4 w-4" aria-hidden />
            Prev
          </button>

          {pages.map((page) =>
            typeof page === "string" ? (
              <span
                key={page}
                className="flex h-9 min-w-9 items-center justify-center px-2 text-sm text-slate-400"
                aria-hidden
              >
                …
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? "page" : undefined}
                aria-label={`Page ${page}`}
                className={`focus-ring h-9 min-w-9 rounded-xl border px-3 text-sm font-medium transition-all duration-200 ${
                  page === currentPage
                    ? "border-primary bg-primary text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-primary/30 hover:text-primary"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            aria-label="Next page"
            className="btn-ghost btn-sm gap-1 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <Icon icon="lucide:chevron-right" className="h-4 w-4" aria-hidden />
          </button>
        </nav>
      )}
    </section>
  );
}
