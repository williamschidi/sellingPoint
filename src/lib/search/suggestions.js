/**
 * Builds keyword/location suggestions from the loaded catalog.
 * TODO: Backend GET /search/suggest?q= — replace when search API supports autocomplete.
 */
export function buildSearchSuggestions(properties, query, limit = 8) {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length < 2) return [];

  const seen = new Set();
  const suggestions = [];

  function push(value, type) {
    const key = `${type}:${value}`;
    if (!value || seen.has(key)) return;
    seen.add(key);
    suggestions.push({ value, type });
  }

  for (const property of properties) {
    if (suggestions.length >= limit) break;

    const title = property.title ?? "";
    const address = property.location?.address ?? "";
    const lga = property.location?.lga ?? "";
    const state = property.location?.state ?? "";

    if (title.toLowerCase().includes(trimmed)) push(title, "title");
    if (address.toLowerCase().includes(trimmed)) push(address, "location");
    if (lga.toLowerCase().includes(trimmed)) push(lga, "location");
    if (state.toLowerCase().includes(trimmed)) push(state, "state");
  }

  return suggestions.slice(0, limit);
}
