/**
 * Builds a Google Maps search URL for a property location.
 * TODO: Backend may provide canonical map URLs or embedded map tokens.
 */
export function buildGoogleMapsUrl({ lat, lng, label = "" }) {
  if (lat != null && lng != null) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }

  const query = encodeURIComponent(label);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/**
 * OpenStreetMap embed URL (no API key required).
 */
export function buildOpenStreetMapEmbedUrl({ lat, lng, zoom = 14 }) {
  if (lat == null || lng == null) return null;

  const delta = 0.02;
  const bbox = [lng - delta, lat - delta, lng + delta, lat + delta].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
}

export function buildDirectionsUrl({ lat, lng, label = "" }) {
  if (lat != null && lng != null) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }

  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(label)}`;
}
