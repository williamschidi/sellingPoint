export const LISTING_FORM_INITIAL = {
  title: "",
  description: "",
  price: "",
  priceType: "Fixed",
  state: "",
  lga: "",
  address: "",
  landSize: "",
  landUnit: "sqm",
  propertyType: "Residential",
  images: [],
};

export const LISTING_LGA_OPTIONS = {
  Lagos: ["Eti-Osa LGA", "Ikeja LGA", "Lekki LGA"],
  Abuja: ["Municipal Area Council", "Bwari", "Gwagwalada"],
  Rivers: ["Port Harcourt LGA", "Obio-Akpor LGA"],
  Ogun: ["Abeokuta South", "Ifo LGA"],
  Delta: ["Warri South", "Uvwie LGA"],
  Anambra: ["Awka South", "Onitsha North"],
  Enugu: ["Enugu North", "Enugu South"],
  Imo: ["Owerri Municipal", "Mbaitoli"],
};

export function computeListingProgress(form) {
  const basic =
    form.title.trim() && form.description.trim() && form.price.trim() ? 100 : 0;
  const location = form.state && form.lga ? 100 : form.state ? 50 : 0;
  const land =
    form.landSize.trim() && form.propertyType
      ? 100
      : form.landSize.trim() || form.propertyType
        ? 60
        : 0;
  const images =
    form.images.length >= 3 ? 100 : form.images.length > 0 ? 40 : 0;

  return {
    basic,
    location,
    land,
    images,
    sections: [
      { id: "basic", label: "Basic Info", percent: basic },
      { id: "location", label: "Location", percent: location },
      { id: "land", label: "Land Details", percent: land },
      { id: "images", label: "Images", percent: images },
    ],
  };
}

export function progressStatusLabel(percent) {
  if (percent >= 100) return { text: "✓ Done", tone: "done" };
  if (percent > 0) return { text: `${percent}%`, tone: "progress" };
  return { text: "0%", tone: "empty" };
}
