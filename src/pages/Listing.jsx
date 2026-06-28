import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ListingGrid from "../components/ListingGrid";
import ListingFilter from "../components/ListingFilter";
import ActiveFilterChips from "../components/listing/ActiveFilterChips";
import PropertySearchForm from "../components/search/PropertySearchForm";
import SavedSearchesPanel from "../components/search/SavedSearchesPanel";
import PageShell from "../components/common/PageShell";
import PageStatus, { PageStatusButton } from "../components/common/PageStatus";
import { usePageMeta } from "../hooks/usePageMeta";
import { usePropertySearch } from "../hooks/usePropertySearch";
import { useSavedSearches } from "../context/SavedSearchesContext";
import { useToast } from "../context/ToastContext";
import { SORT_OPTIONS } from "../lib/properties";
import {
  buildListingsSearchUrl,
  buildResultsLabel,
  parseListingsSearchParams,
} from "../lib/search/buildSearchParams";
import { buildResultsRangeLabel } from "../lib/search/activeFilters";

function Listing() {
  usePageMeta({
    title: "Browse properties",
    description:
      "Search verified land listings across Nigeria. Filter by state, price, property type, and verification status.",
    path: "/properties",
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const { addSearch, searches } = useSavedSearches();
  const { showToast } = useToast();
  const filters = parseListingsSearchParams(searchParams);
  const showFilter = searchParams.get("filters") === "open";
  const [searchKeyword, setSearchKeyword] = useState(filters.keyword);

  useEffect(() => {
    setSearchKeyword(filters.keyword);
  }, [filters.keyword]);

  const { items, total, totalPages, currentPage, loadState, error } =
    usePropertySearch(filters);

  const resultsLabel = buildResultsLabel(filters, { total });
  const resultsRange = buildResultsRangeLabel({ currentPage, total });

  function updateFilters(nextFilters) {
    navigate(buildListingsSearchUrl(nextFilters));
  }

  function handleSortChange(event) {
    updateFilters({ ...filters, sort: event.target.value, page: 1 });
  }

  function handlePageChange(page) {
    updateFilters({ ...filters, page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openFilters() {
    const params = new URLSearchParams(searchParams);
    params.set("filters", "open");
    navigate(`/properties?${params.toString()}`);
  }

  function closeFilters() {
    if (searchParams.get("filters") !== "open") return;

    const params = new URLSearchParams(searchParams);
    params.delete("filters");
    const query = params.toString();
    navigate(query ? `/properties?${query}` : "/properties");
  }

  function clearFilters() {
    navigate("/properties");
  }

  async function handleSaveSearch() {
    const record = await addSearch(filters);
    showToast(`Search saved: ${record.label}`);
    setShowSavedSearches(true);
  }

  function handleListingSearch(keyword) {
    updateFilters({ ...filters, keyword, page: 1 });
  }

  const isInitialLoad = loadState === "loading" && items.length === 0;

  if (loadState === "error") {
    return (
      <PageStatus
        message="Could not load properties right now."
        className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-surface-muted px-4 text-center"
      >
        <PageStatusButton onClick={() => navigate(buildListingsSearchUrl(filters))}>
          Try again
        </PageStatusButton>
      </PageStatus>
    );
  }

  return (
    <PageShell variant="full">
      <section className="breadcrumb-bar">
        <div className="page-container space-y-6 px-6 py-8 lg:px-10 lg:py-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-eyebrow">Catalogue</p>
              <h1 className="section-title mb-2">Browse properties</h1>
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-800">{resultsLabel}</span>
                <span className="mx-2 text-slate-300">·</span>
                {resultsRange}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={openFilters}
                className="btn-ghost lg:hidden"
                aria-controls="listing-filters"
                aria-expanded={showFilter}
              >
                <Icon icon="lucide:sliders-horizontal" className="mr-2 h-4 w-4" aria-hidden />
                Filters
              </button>

              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5">
                <label htmlFor="listing-sort" className="sr-only">
                  Sort listings
                </label>
                <span className="text-xs font-medium text-slate-500">Sort</span>
                <select
                  id="listing-sort"
                  value={filters.sort}
                  onChange={handleSortChange}
                  className="focus-ring rounded-lg border-0 bg-transparent py-1.5 text-sm font-medium text-slate-800 outline-none"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handleSaveSearch}
                className="btn-ghost px-3 sm:px-5"
                aria-label="Save this search"
              >
                <Icon icon="lucide:bookmark" className="h-4 w-4 sm:mr-2" aria-hidden />
                <span className="hidden sm:inline">Save search</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSavedSearches((open) => !open)}
                className={`btn-ghost relative px-3 sm:px-5 ${
                  showSavedSearches ? "border-primary/20 bg-primary-subtle text-primary" : ""
                }`}
                aria-expanded={showSavedSearches}
              >
                <Icon icon="lucide:history" className="h-4 w-4 sm:mr-2" aria-hidden />
                <span className="hidden sm:inline">Saved searches</span>
                {searches.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-white">
                    {searches.length > 9 ? "9+" : searches.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="max-w-3xl">
            <PropertySearchForm
              variant="listing"
              inputId="listing-page-search"
              keyword={searchKeyword}
              onKeywordChange={setSearchKeyword}
              onSubmit={handleListingSearch}
              ariaLabel="Search listings by location, title, or keyword"
            />
          </div>

          <div className="mt-4">
            <ActiveFilterChips filters={filters} onClearAll={clearFilters} />
          </div>

          {showSavedSearches && (
            <div className="mt-4">
              <SavedSearchesPanel onClose={() => setShowSavedSearches(false)} />
            </div>
          )}
        </div>
      </section>

      <section className="page-container">
        <div className="flex flex-col items-stretch lg:flex-row lg:items-start">
          <ListingFilter
            filters={filters}
            onApply={updateFilters}
            onClear={clearFilters}
            showFilter={showFilter}
            onClose={closeFilters}
          />
          <ListingGrid
            items={items}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onClearFilters={clearFilters}
            isLoading={isInitialLoad}
          />
        </div>
      </section>
    </PageShell>
  );
}

export default Listing;
