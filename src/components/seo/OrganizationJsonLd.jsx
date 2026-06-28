import { Link } from "react-router-dom";

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "SellingPoint",
  description:
    "Nigeria's verified land marketplace for documented plots, licensed agents, and free inspection booking.",
  url: "https://sellingpoint.ng",
  areaServed: "NG",
  email: "nnaa4good@gmail.com",
  telephone: "+2348144002759",
};

/**
 * Static organization structured data for the homepage.
 * TODO: Add per-listing RealEstateListing JSON-LD when SSR/prerender is available.
 */
export default function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
    />
  );
}
