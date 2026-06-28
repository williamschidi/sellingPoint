/** Unified marketplace configuration — single source for filters, hero search, footer links. */

export const FEATURED_PROPERTY_IDS = [
  "lekki-phase-1-residential-plot",
  "gra-extension-corner-piece",
  "gwarinpa-estate-plot",
  "ikoyi-waterfront-land",
];

export const ALL_STATES_OPTION = "All States";
export const ANY_PRICE_OPTION = "Any Price";

export const FILTER_STATES = [
  "Lagos",
  "Abuja",
  "Rivers",
  "Anambra",
  "Delta",
  "Ogun",
  "Enugu",
  "Imo",
];

export const HERO_STATE_OPTIONS = [ALL_STATES_OPTION, ...FILTER_STATES];

export const PRICE_OPTIONS = [
  ANY_PRICE_OPTION,
  "Under ₦5M",
  "₦5M - ₦20M",
  "₦20M - ₦50M",
  "₦50M+",
];

export const PROPERTY_TYPES = ["Residential", "Commercial", "Premium"];

export const LAND_SIZE_BUCKETS = [
  { id: "under-600", label: "Under 600 sqm", min: 0, max: 599 },
  { id: "600-1200", label: "600 – 1,200 sqm", min: 600, max: 1200 },
  { id: "1200-2000", label: "1,200 – 2,000 sqm", min: 1200, max: 2000 },
  { id: "2000-plus", label: "2,000+ sqm", min: 2000, max: Infinity },
];

export const PRICE_PRESETS = {
  [ANY_PRICE_OPTION]: null,
  "Under ₦5M": { min: 0, max: 5_000_000 },
  "₦5M - ₦20M": { min: 5_000_000, max: 20_000_000 },
  "₦20M - ₦50M": { min: 20_000_000, max: 50_000_000 },
  "₦50M+": { min: 50_000_000, max: Infinity },
};

export const PRICE_RANGE_MIN = 1_000_000;
export const PRICE_RANGE_MAX = 50_000_000;
export const PRICE_RANGE_STEP = 500_000;

export const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export const LISTINGS_PAGE_SIZE = 6;

export const STATE_QUERY_MAP = {
  Lagos: ["Lagos", "Lagos State"],
  Abuja: ["Abuja", "FCT", "FCT Abuja"],
  Rivers: ["Rivers", "Rivers State"],
  Anambra: ["Anambra", "Anambra State"],
  Delta: ["Delta", "Delta State"],
  Ogun: ["Ogun", "Ogun State"],
  Enugu: ["Enugu", "Enugu State"],
  Imo: ["Imo", "Imo State"],
};

export const LIST_PROPERTY_MAILTO =
  "mailto:nnaa4good@gmail.com?subject=List%20a%20Property%20on%20SellingPoint";

export const SUPPORT_MAILTO =
  "mailto:nnaa4good@gmail.com?subject=SellingPoint%20Support";

export const SOCIAL_LINKS = [
  {
    icon: "mdi:whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/2348144002759",
  },
  {
    icon: "mdi:instagram",
    label: "Instagram",
    comingSoon: true,
  },
  {
    icon: "mdi:facebook",
    label: "Facebook",
    comingSoon: true,
  },
  {
    icon: "mdi:linkedin",
    label: "LinkedIn",
    comingSoon: true,
  },
];
