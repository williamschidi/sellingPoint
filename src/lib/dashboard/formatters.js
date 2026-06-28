import { formatPrice, getAgentInitials } from "../properties/formatters.js";

export function getDashboardGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function formatListingSubtitle(property) {
  const size = property.landSize ? `${property.landSize} sqm` : "";
  const state = (property.location?.state ?? "")
    .replace(/ State$/, "")
    .replace(/^FCT /, "Abuja");
  const city = property.location?.address?.split(",")[0] ?? state;
  const location = state && city !== state ? `${city} · ${state}` : city || state;
  return [size, location].filter(Boolean).join(" · ");
}

export function formatListingPrice(property) {
  const raw = property.price;
  if (typeof raw === "string" && raw.includes("₦")) return raw;
  return formatPrice(raw);
}

export function getListingViews(propertyId = "") {
  let hash = 0;
  for (let i = 0; i < propertyId.length; i += 1) {
    hash += propertyId.charCodeAt(i);
  }
  return 12 + (hash % 80);
}

export function getClientInitials(name = "") {
  return getAgentInitials(name);
}

export function formatBookingDateLine(date, time) {
  return `${date} · ${time}`;
}
