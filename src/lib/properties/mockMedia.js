import propertyLandImage from "../../assets/property-land.svg";

/**
 * Deterministic placeholder images for mock listings.
 * Uses picsum.photos seeds so each property looks distinct in demos.
 * Falls back to local SVG when offline (img onError in UI can handle).
 */
export function buildPropertyImageUrls(propertyId, count = 3) {
  const safeId = encodeURIComponent(propertyId);
  return Array.from(
    { length: count },
    (_, index) => `https://picsum.photos/seed/sellingpoint-${safeId}-${index}/800/600`
  );
}

export function buildLocationImageUrl(locationName) {
  const safeName = encodeURIComponent(String(locationName).toLowerCase());
  return `https://picsum.photos/seed/sellingpoint-location-${safeName}/600/400`;
}

export const MOCK_IMAGE_FALLBACK = propertyLandImage;
