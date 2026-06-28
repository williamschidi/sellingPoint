import { formatLocationShort } from "../properties/formatters.js";

export function getInspectionSummaryLabels(property) {
  if (!property) {
    return {
      title: "Property",
      subtitle: "Select a property",
      image: null,
      verificationStatus: "verified",
    };
  }

  return {
    title: `${property.title}, ${property.location.address}`,
    subtitle: `${formatLocationShort(property)} • ${property.landSize} sqm`,
    image: property.propertyImages?.[0] ?? null,
    verificationStatus: property.verificationStatus,
  };
}
