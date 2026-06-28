/**
 * Saved-search persistence (localStorage until backend user profiles ship).
 * TODO: Replace with GET/POST /users/me/saved-searches when API is available.
 */
import { buildListingsSearchUrl } from "../../lib/search/buildSearchParams.js";

const STORAGE_KEY = "sellingpoint:saved-searches";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(searches) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
}

function buildLabel(filters) {
  const parts = [];
  if (filters.keyword?.trim()) parts.push(`"${filters.keyword.trim()}"`);
  if (filters.state) parts.push(filters.state);
  if (filters.price && filters.price !== "Any Price") parts.push(filters.price);
  if (parts.length === 0) return "All listings";
  return parts.join(" · ");
}

/**
 * TODO: Backend GET /user/saved-searches — requires authenticated user.
 */
export async function listSavedSearches() {
  return readAll();
}

/**
 * TODO: Backend POST /user/saved-searches
 */
export async function saveSearch(filters) {
  const searches = readAll();
  const url = buildListingsSearchUrl(filters);

  const duplicate = searches.find((item) => item.url === url);
  if (duplicate) return duplicate;

  const record = {
    id: crypto.randomUUID(),
    label: buildLabel(filters),
    url,
    filters: { ...filters, page: 1 },
    createdAt: new Date().toISOString(),
  };

  searches.unshift(record);
  writeAll(searches.slice(0, 20));
  return record;
}

/**
 * TODO: Backend DELETE /user/saved-searches/:id
 */
export async function removeSavedSearch(id) {
  const searches = readAll().filter((item) => item.id !== id);
  writeAll(searches);
  return { ok: true };
}
