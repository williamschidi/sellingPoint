import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { buildListingsSearchUrl } from "../../lib/search/buildSearchParams.js";
import { MOCK_IMAGE_FALLBACK } from "../../lib/properties/mockMedia.js";

function LocationCard({ location }) {
  const fallback = location.imageFallback ?? MOCK_IMAGE_FALLBACK;
  const [imageSrc, setImageSrc] = useState(location.image ?? fallback);

  return (
    <Link
      to={buildListingsSearchUrl({ state: location.state })}
      className="card-hover group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={imageSrc}
          alt=""
          loading="lazy"
          onError={() => setImageSrc(fallback)}
          className="image-hover h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        <div className="absolute right-4 bottom-4 left-4">
          <p className="font-serif text-xl text-white">{location.name}</p>
          <p className="text-xs text-white/75">{location.subtitle}</p>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-xs font-medium text-slate-500">
          {location.count} {location.count === 1 ? "listing" : "listings"}
        </span>
        <span className="text-primary text-xs font-semibold">Browse →</span>
      </div>
    </Link>
  );
}

export default function BrowseByLocation({ locations = [] }) {
  return (
    <section className="section-padding" aria-labelledby="browse-location-heading">
      <div className="page-container">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-eyebrow">Explore Nigeria</p>
            <h2 id="browse-location-heading" className="section-title mb-3">
              Browse by location
            </h2>
            <p className="max-w-lg text-sm leading-8 text-slate-500">
              Start with active markets in our catalogue — counts reflect live
              listings on SellingPoint.
            </p>
          </div>

          <Link
            to="/properties"
            className="text-primary inline-flex items-center gap-1 text-sm font-semibold hover:underline"
          >
            View all states
            <Icon icon="lucide:arrow-right" className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <LocationCard key={location.name} location={location} />
          ))}
        </div>
      </div>
    </section>
  );
}
