import { FEATURED_PROPERTY_IDS } from "../lib/properties/constants.js";
import { mapPropertyToCard } from "../lib/properties/mapPropertyToCard.js";
import { countByState } from "../lib/properties/filterProperties.js";
import { buildLocationImageUrl } from "../lib/properties/mockMedia.js";

export function getFeaturedListings(properties) {
  return FEATURED_PROPERTY_IDS.map((id) => {
    const property = properties.find((item) => item.id === id);
    return property ? mapPropertyToCard(property) : null;
  }).filter(Boolean);
}

export function getPopularLocations(properties) {
  const counts = countByState(properties);

  return [
    { name: "Lagos", subtitle: "Lekki, Ikoyi & more", state: "Lagos" },
    { name: "Abuja", subtitle: "FCT & environs", state: "Abuja" },
    { name: "Rivers", subtitle: "GRA & Port Harcourt", state: "Rivers" },
    { name: "Anambra", subtitle: "Awka & Asaba corridor", state: "Anambra" },
    { name: "Delta", subtitle: "Warri & Asaba", state: "Delta" },
    { name: "Ogun", subtitle: "Lekki outskirts", state: "Ogun" },
  ].map((location) => ({
    ...location,
    count: counts[location.name] ?? 0,
    image: buildLocationImageUrl(location.name),
    imageFallback: buildLocationImageUrl(location.name),
  }));
}

export const TRUST_CHIPS = [
  { icon: "lucide:shield-check", label: "Verified title documents" },
  { icon: "lucide:badge-check", label: "Licensed agents only" },
  { icon: "lucide:calendar-check", label: "Free inspection booking" },
];

export function getHomepageStats(properties) {
  const verified = properties.filter(
    (item) => item.verificationStatus === "verified"
  ).length;

  const states = new Set(
    properties.map((item) => item.location?.state).filter(Boolean)
  );

  return {
    totalListings: properties.length,
    verifiedListings: verified,
    statesCovered: states.size,
  };
}
