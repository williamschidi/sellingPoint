import { Icon } from "@iconify/react";
import {
  buildDirectionsUrl,
  buildGoogleMapsUrl,
  buildOpenStreetMapEmbedUrl,
} from "../../lib/properties/maps";
import { formatLocationFull } from "../../lib/properties/formatters";

export default function PropertyLocationMap({ property }) {
  const { lat, lng } = property.location ?? {};
  const label = formatLocationFull(property);
  const embedUrl = buildOpenStreetMapEmbedUrl({ lat, lng });
  const mapsUrl = buildGoogleMapsUrl({ lat, lng, label });
  const directionsUrl = buildDirectionsUrl({ lat, lng, label });

  return (
    <section className="border-t border-gray-200 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold tracking-wide text-gray-700">
          Property Location
        </h2>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Icon icon="lucide:map-pin" className="h-4 w-4" aria-hidden />
          {label}
        </div>
      </div>

      {embedUrl ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <iframe
            title={`Map showing ${label}`}
            src={embedUrl}
            className="h-72 w-full"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="mt-6 flex h-48 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
          Map coordinates will appear when provided by the listing agent.
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-primary"
        >
          <Icon icon="lucide:external-link" className="h-4 w-4" aria-hidden />
          Open in Google Maps
        </a>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
        >
          <Icon icon="lucide:navigation" className="h-4 w-4" aria-hidden />
          Get directions
        </a>
      </div>
    </section>
  );
}
