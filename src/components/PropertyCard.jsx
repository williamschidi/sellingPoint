import { Icon } from "@iconify/react";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { MOCK_IMAGE_FALLBACK } from "../lib/properties/mockMedia.js";
import VerificationBadge from "./property/VerificationBadge.jsx";

function PropertyCard({
  property,
  showBookInspection = false,
  lazyImage = true,
  isSaved = false,
  onToggleSave,
}) {
  const fallbackImage = property.imageFallback ?? MOCK_IMAGE_FALLBACK;
  const [imageSrc, setImageSrc] = useState(property.image ?? fallbackImage);

  return (
    <article className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
      <div className="relative h-56 overflow-hidden">
        <Link
          to={`/propertyDetail/${property.id}`}
          className="block h-full"
          aria-label={`View ${property.subtitle ?? property.title}`}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={property.imageAlt ?? property.title}
              loading={lazyImage ? "lazy" : "eager"}
              onError={() => setImageSrc(fallbackImage)}
              className="image-hover h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-100 text-sm text-slate-400">
              No image
            </div>
          )}
        </Link>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-slate-900/55 to-transparent" />

        <div className="absolute top-3.5 left-3.5">
          <VerificationBadge
            status={property.verificationStatus}
            showLabel={false}
            className="backdrop-blur-md"
          />
        </div>

        {onToggleSave && (
          <button
            type="button"
            onClick={() => onToggleSave(property.id)}
            aria-label={isSaved ? "Remove from saved" : "Save property"}
            aria-pressed={isSaved}
            className={`focus-ring absolute top-3.5 right-3.5 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 ${
              isSaved
                ? "bg-primary text-white shadow-md"
                : "bg-white/95 text-slate-600 shadow-sm hover:scale-105 hover:bg-white"
            }`}
          >
            <Icon
              icon="lucide:heart"
              className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
            />
          </button>
        )}

        <div className="absolute bottom-3.5 left-3.5 rounded-lg bg-white/95 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-slate-800 shadow-sm backdrop-blur-md">
          {property.size}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 py-5">
        <div className="text-primary mb-2 font-serif text-[1.65rem] leading-none tracking-tight tabular-nums">
          {property.price}
        </div>

        <h3 className="mb-2.5 line-clamp-2 text-[15px] leading-snug font-semibold text-slate-900">
          <Link
            to={`/propertyDetail/${property.id}`}
            className="transition-colors duration-200 hover:text-primary"
          >
            {property.subtitle ?? property.title}
          </Link>
        </h3>

        <div className="mb-5 flex items-start gap-1.5 text-xs leading-5 text-slate-500">
          <Icon
            icon="lucide:map-pin"
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400"
            aria-hidden
          />
          <span className="line-clamp-2">{property.location}</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="flex min-w-0 flex-col gap-0.5 text-[11px] text-slate-400">
            <span className="truncate font-medium text-slate-500">{property.type}</span>
            <span>{property.time}</span>
          </div>

          {showBookInspection && (
            <Link
              to={`/book-inspection/${property.id}`}
              className="btn-secondary btn-sm shrink-0 gap-1.5"
            >
              <Icon icon="lucide:calendar" className="h-3.5 w-3.5" aria-hidden />
              Inspect
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default memo(PropertyCard);
