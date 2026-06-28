import { USE_MOCK_DATA } from "../config.js";
import { apiRequest } from "../client.js";
import {
  mockGetProperties,
  mockGetPropertyById,
  mockSearchProperties,
} from "../mock/handlers.js";

let propertiesCache = null;
const propertyByIdCache = new Map();
const propertyByIdInFlight = new Map();

export function invalidatePropertiesCache() {
  propertiesCache = null;
  propertyByIdCache.clear();
  propertyByIdInFlight.clear();
}

function cacheProperty(property) {
  if (property?.id) {
    propertyByIdCache.set(property.id, property);
  }
}

function cacheProperties(properties) {
  if (!Array.isArray(properties)) return;
  for (const property of properties) {
    cacheProperty(property);
  }
}

export async function getProperties() {
  if (propertiesCache) return propertiesCache;

  if (USE_MOCK_DATA) {
    propertiesCache = await mockGetProperties();
    cacheProperties(propertiesCache);
    return propertiesCache;
  }

  propertiesCache = await apiRequest("/properties");
  cacheProperties(propertiesCache);
  return propertiesCache;
}

export async function getPropertyById(propertyId) {
  if (!propertyId) return null;

  if (propertyByIdCache.has(propertyId)) {
    return propertyByIdCache.get(propertyId);
  }

  if (propertyByIdInFlight.has(propertyId)) {
    return propertyByIdInFlight.get(propertyId);
  }

  const request = (async () => {
    try {
      const data = USE_MOCK_DATA
        ? await mockGetPropertyById(propertyId)
        : await apiRequest(`/properties/${propertyId}`);

      if (data) cacheProperty(data);
      return data;
    } finally {
      propertyByIdInFlight.delete(propertyId);
    }
  })();

  propertyByIdInFlight.set(propertyId, request);
  return request;
}

/**
 * Server-style search contract. Mock runs filter/sort/paginate in handlers;
 * production should call GET /properties/search?...
 */
export async function searchProperties(filters = {}) {
  if (USE_MOCK_DATA) {
    return mockSearchProperties(filters);
  }

  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value != null && value !== "") params.set(key, String(value));
  });

  const query = params.toString();
  return apiRequest(query ? `/properties/search?${query}` : "/properties/search");
}

/** Looks up a property from the in-memory cache without triggering a fetch. */
export function getCachedPropertyById(propertyId) {
  if (!propertyId) return null;
  return propertyByIdCache.get(propertyId) ?? null;
}

/** Seeds the per-id cache from an already-loaded catalog (e.g. PropertiesContext). */
export function seedPropertyCache(properties) {
  cacheProperties(properties);
}
