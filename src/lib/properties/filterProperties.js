import {
  LISTINGS_PAGE_SIZE,
  PRICE_PRESETS,
  PRICE_RANGE_MAX,
  PRICE_RANGE_MIN,
} from "./constants.js";
import { normalizeStateKey, parsePriceValue, propertyMatchesState } from "./formatters.js";

function parseListParam(value) {
  if (!value) return [];
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

export function parsePriceRange(pricePreset, minPrice, maxPrice) {
  if (minPrice || maxPrice) {
    const min = minPrice ? Number(minPrice) : PRICE_RANGE_MIN;
    const max = maxPrice ? Number(maxPrice) : PRICE_RANGE_MAX;

    if (min <= PRICE_RANGE_MIN && max >= PRICE_RANGE_MAX) {
      return null;
    }

    return { min, max };
  }

  const preset = PRICE_PRESETS[pricePreset];
  if (!preset) return null;
  return preset;
}

export function filterProperties(properties, filters = {}) {
  const {
    keyword = "",
    state = "",
    price = "",
    minPrice = "",
    maxPrice = "",
    types = "",
    sizes = "",
    verification = "",
  } = filters;

  const typeList = parseListParam(types);
  const sizeList = parseListParam(sizes);
  const verificationList = parseListParam(verification);
  const keywordLower = keyword.trim().toLowerCase();
  const priceRange = parsePriceRange(price, minPrice, maxPrice);

  return properties.filter((property) => {
    if (keywordLower) {
      const haystack = [
        property.title,
        property.location?.address,
        property.location?.lga,
        property.location?.state,
        property.propertyType,
        property.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(keywordLower)) return false;
    }

    if (state && !propertyMatchesState(property, state)) return false;

    if (typeList.length > 0 && !typeList.includes(property.propertyType)) {
      return false;
    }

    if (verificationList.length > 0) {
      const label =
        property.verificationStatus === "verified" ? "Verified" : "Pending";
      if (!verificationList.includes(label)) return false;
    }

    if (sizeList.length > 0) {
      const size = property.landSize ?? 0;
      const matchesBucket = sizeList.some((bucket) => {
        if (bucket === "under-600") return size < 600;
        if (bucket === "600-1200") return size >= 600 && size <= 1200;
        if (bucket === "1200-2000") return size >= 1200 && size <= 2000;
        if (bucket === "2000-plus") return size >= 2000;
        return false;
      });
      if (!matchesBucket) return false;
    }

    if (priceRange) {
      const value = parsePriceValue(property.price);
      if (value < priceRange.min || value > priceRange.max) return false;
    }

    return true;
  });
}

function getListedTime(property) {
  const listedAt = property.listedAt;
  if (!listedAt) return 0;
  const time = new Date(listedAt).getTime();
  return Number.isNaN(time) ? 0 : time;
}

export function sortProperties(properties, sort = "latest") {
  const sorted = [...properties];

  sorted.sort((a, b) => {
    const priceA = parsePriceValue(a.price);
    const priceB = parsePriceValue(b.price);
    const dateA = getListedTime(a);
    const dateB = getListedTime(b);

    switch (sort) {
      case "price-asc":
        return priceA - priceB;
      case "price-desc":
        return priceB - priceA;
      case "oldest":
        return dateA - dateB || a.id.localeCompare(b.id);
      case "latest":
      default:
        return dateB - dateA || b.id.localeCompare(a.id);
    }
  });

  return sorted;
}

export function paginateProperties(properties, page = 1, pageSize = LISTINGS_PAGE_SIZE) {
  const safePage = Math.max(1, page);
  const total = properties.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(safePage, totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    items: properties.slice(start, start + pageSize),
    total,
    totalPages,
    currentPage,
  };
}

export function getPaginationRange(currentPage, totalPages, siblingCount = 1) {
  if (totalPages <= 1) return [1];

  const range = [];
  const left = Math.max(2, currentPage - siblingCount);
  const right = Math.min(totalPages - 1, currentPage + siblingCount);

  range.push(1);

  if (left > 2) range.push("ellipsis-start");

  for (let page = left; page <= right; page += 1) {
    range.push(page);
  }

  if (right < totalPages - 1) range.push("ellipsis-end");

  if (totalPages > 1) range.push(totalPages);

  return range;
}

export function searchPropertiesCatalog(properties, filters = {}) {
  const filtered = filterProperties(properties, filters);
  const sorted = sortProperties(filtered, filters.sort ?? "latest");
  const page = paginateProperties(
    sorted,
    filters.page ?? 1,
    LISTINGS_PAGE_SIZE
  );

  return {
    ...page,
    properties: page.items,
  };
}

export function countByState(properties) {
  const counts = {};

  for (const property of properties) {
    const key = normalizeStateKey(property.location?.state ?? "");
    if (key === "Other") continue;
    counts[key] = (counts[key] ?? 0) + 1;
  }

  return counts;
}
