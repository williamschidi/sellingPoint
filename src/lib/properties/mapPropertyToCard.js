import { formatDistanceToNow } from "date-fns";
import {
  formatLocationShort,
  formatPrice,
  parsePriceValue,
  verificationLabel,
} from "./formatters.js";

function formatListedAgo(property) {
  if (!property.listedAt) return "Recently listed";

  try {
    return formatDistanceToNow(new Date(property.listedAt), { addSuffix: true });
  } catch {
    return "Recently listed";
  }
}

export function mapPropertyToCard(property) {
  const image = property.propertyImages?.[0] ?? null;

  return {
    id: property.id,
    price: formatPrice(property.price),
    priceValue: parsePriceValue(property.price),
    title: property.title,
    subtitle: property.location?.address
      ? `${property.title}, ${property.location.address}`
      : property.title,
    location: formatLocationShort(property),
    size: `${property.landSize} sqm`,
    landSize: property.landSize,
    type: property.propertyType,
    time: formatListedAgo(property),
    verificationStatus: property.verificationStatus,
    status: verificationLabel(property.verificationStatus),
    image,
    imageAlt: `${property.title} in ${formatLocationShort(property)}`,
    imageFallback: property.imageFallback ?? null,
  };
}
