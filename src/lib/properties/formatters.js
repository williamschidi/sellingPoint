import { STATE_QUERY_MAP } from "./constants.js";

export function parsePriceValue(raw) {
  if (raw == null) return 0;
  const value = Number(String(raw).replace(/,/g, ""));
  return Number.isNaN(value) ? 0 : value;
}

export function formatPrice(raw) {
  const value = parsePriceValue(raw);
  if (!value) return "₦0";
  return `₦${value.toLocaleString("en-NG")}`;
}

export function formatLocationShort(property) {
  const address = property.location?.address ?? "";
  const city = address.split(" ")[0] || address;
  const state = (property.location?.state ?? "")
    .replace(/ State$/, "")
    .replace(/^FCT /, "");
  return state ? `${city}, ${state}` : city;
}

export function formatLocationFull(property) {
  const { address, lga, state } = property.location ?? {};
  return [address, lga, state].filter(Boolean).join(", ");
}

export function getAgentInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "SP";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function propertyMatchesState(property, stateQuery) {
  if (!stateQuery) return true;

  const aliases = STATE_QUERY_MAP[stateQuery] ?? [stateQuery];
  const haystack = `${property.location?.state ?? ""} ${property.location?.address ?? ""} ${property.location?.lga ?? ""}`.toLowerCase();

  return aliases.some((alias) => haystack.includes(alias.toLowerCase()));
}

export function verificationLabel(status) {
  return status === "verified" ? "Verified" : "Pending review";
}

export function normalizeStateKey(stateRaw = "") {
  if (/lagos/i.test(stateRaw)) return "Lagos";
  if (/fct|abuja/i.test(stateRaw)) return "Abuja";
  if (/rivers/i.test(stateRaw)) return "Rivers";
  if (/anambra/i.test(stateRaw)) return "Anambra";
  if (/delta/i.test(stateRaw)) return "Delta";
  if (/ogun/i.test(stateRaw)) return "Ogun";
  if (/enugu/i.test(stateRaw)) return "Enugu";
  if (/imo/i.test(stateRaw)) return "Imo";
  return "Other";
}
