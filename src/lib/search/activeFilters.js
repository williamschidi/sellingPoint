import {
  LAND_SIZE_BUCKETS,
  LISTINGS_PAGE_SIZE,
  PRICE_RANGE_MAX,
  PRICE_RANGE_MIN,
} from "../properties/constants.js";
import { buildListingsSearchUrl } from "./buildSearchParams.js";

function parseList(value) {
  return value
    ? value.split(",").map((item) => item.trim()).filter(Boolean)
    : [];
}

/**
 * Builds removable filter chips from current URL filter state.
 * Each chip includes a `nextFilters` object for navigation.
 */
export function buildActiveFilterChips(filters) {
  const chips = [];

  if (filters.keyword?.trim()) {
    chips.push({
      id: "keyword",
      label: `"${filters.keyword.trim()}"`,
      nextFilters: { ...filters, keyword: "", page: 1 },
    });
  }

  if (filters.state) {
    chips.push({
      id: "state",
      label: filters.state,
      nextFilters: { ...filters, state: "", page: 1 },
    });
  }

  if (filters.price && filters.price !== "Any Price") {
    chips.push({
      id: "price",
      label: filters.price,
      nextFilters: { ...filters, price: "", page: 1 },
    });
  }

  const minPrice = Number(filters.minPrice);
  const maxPrice = Number(filters.maxPrice);
  if (
    filters.minPrice &&
    filters.maxPrice &&
    (minPrice > PRICE_RANGE_MIN || maxPrice < PRICE_RANGE_MAX)
  ) {
    chips.push({
      id: "priceRange",
      label: `₦${minPrice.toLocaleString()} – ₦${maxPrice.toLocaleString()}`,
      nextFilters: { ...filters, minPrice: "", maxPrice: "", page: 1 },
    });
  }

  parseList(filters.types).forEach((type) => {
    const remaining = parseList(filters.types).filter((item) => item !== type);
    chips.push({
      id: `type-${type}`,
      label: type,
      nextFilters: { ...filters, types: remaining.join(","), page: 1 },
    });
  });

  parseList(filters.sizes).forEach((sizeId) => {
    const bucket = LAND_SIZE_BUCKETS.find((item) => item.id === sizeId);
    const remaining = parseList(filters.sizes).filter((item) => item !== sizeId);
    chips.push({
      id: `size-${sizeId}`,
      label: bucket?.label ?? sizeId,
      nextFilters: { ...filters, sizes: remaining.join(","), page: 1 },
    });
  });

  parseList(filters.verification).forEach((status) => {
    const remaining = parseList(filters.verification).filter(
      (item) => item !== status
    );
    chips.push({
      id: `verification-${status}`,
      label: status,
      nextFilters: { ...filters, verification: remaining.join(","), page: 1 },
    });
  });

  return chips;
}

export function buildFilterChipUrl(nextFilters) {
  return buildListingsSearchUrl(nextFilters);
}

export function buildResultsRangeLabel({
  currentPage = 1,
  total = 0,
  pageSize = LISTINGS_PAGE_SIZE,
} = {}) {
  if (total === 0) return "0 results";

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);
  const noun = total === 1 ? "result" : "results";

  return `${start}–${end} of ${total} ${noun}`;
}
