import { Icon } from "@iconify/react";
import { usePropertyCatalog } from "../../context/PropertiesContext";
import SearchAutocomplete from "./SearchAutocomplete";

const VARIANTS = {
  navbar: {
    form: "w-full",
    field: "relative min-w-0 flex-1",
    inputWrap: "",
    submit:
      "btn-primary btn-sm shrink-0 px-3",
    submitLabel: "sr-only",
    showSubmitIcon: true,
  },
  listing: {
    form: "w-full",
    field: "relative min-w-0 flex-1",
    inputWrap: "",
    submit: "btn-primary shrink-0 px-5",
    submitLabel: "Search",
    showSubmitIcon: false,
  },
};

/**
 * Shared keyword search with autocomplete — used in navbar, listings page, and mobile nav.
 */
export default function PropertySearchForm({
  keyword,
  onKeywordChange,
  onSubmit,
  variant = "listing",
  inputId = "property-search",
  ariaLabel = "Search properties by location, title, or keyword",
  autoFocus = false,
  className = "",
}) {
  const properties = usePropertyCatalog();
  const styles = VARIANTS[variant] ?? VARIANTS.listing;

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(keyword.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 ${styles.form} ${className}`}
      role="search"
      aria-label={ariaLabel}
    >
      <div className={styles.field}>
        <label htmlFor={inputId} className="sr-only">
          {ariaLabel}
        </label>
        <Icon
          icon="lucide:search"
          className="pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
        <SearchAutocomplete
          inputId={inputId}
          value={keyword}
          onChange={onKeywordChange}
          properties={properties}
          placeholder="Search location or keyword..."
          autoFocus={autoFocus}
          inputClassName={
            variant === "navbar"
              ? "h-9 rounded-lg border border-slate-200 bg-slate-50 pr-3 pl-9 text-sm focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-primary/20"
              : undefined
          }
        />
      </div>

      <button type="submit" className={styles.submit}>
        {styles.showSubmitIcon ? (
          <>
            <Icon icon="lucide:search" className="h-4 w-4" aria-hidden />
            <span className={styles.submitLabel}>Search</span>
          </>
        ) : (
          styles.submitLabel
        )}
      </button>
    </form>
  );
}
