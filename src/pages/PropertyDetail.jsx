import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import PropertyDetailSkeleton from "../components/common/PropertyDetailSkeleton";
import PageStatus, {
  PageStatusButton,
  PageStatusLink,
} from "../components/common/PageStatus";
import PropertyImageGallery from "../components/property/PropertyImageGallery";
import PropertyDocuments from "../components/property/PropertyDocuments";
import PropertyLocationMap from "../components/property/PropertyLocationMap";
import TrustInspectionCallout from "../components/property/TrustInspectionCallout";
import VerificationBadge from "../components/property/VerificationBadge";
import { usePageMeta } from "../hooks/usePageMeta";
import { useProperty } from "../hooks/useProperty";
import { useToggleSavedWithToast } from "../hooks/useToggleSavedWithToast";
import {
  formatLocationFull,
  formatLocationShort,
  formatPrice,
  getAgentInitials,
} from "../lib/properties/formatters";

function PropertyDetail() {
  const { id } = useParams();
  const { property, loadState, reload } = useProperty(id);
  const [activeImage, setActiveImage] = useState(null);
  const { isSaved, handleToggleSave } = useToggleSavedWithToast();

  usePageMeta({
    title: property?.title ?? "Property details",
    description: property
      ? `${property.title} — ${formatLocationFull(property)}. View documents, location, and book a free inspection.`
      : "View property details, documents, and book a free inspection on SellingPoint.",
    path: id ? `/propertyDetail/${id}` : "",
    type: "article",
  });

  useEffect(() => {
    if (property?.propertyImages?.[0]) {
      setActiveImage(property.propertyImages[0]);
    }
  }, [property]);

  if (loadState === "loading" || loadState === "idle") {
    return <PropertyDetailSkeleton />;
  }

  if (loadState === "not-found") {
    return (
      <PageStatus message="Property not found." className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-muted px-4 text-center">
        <PageStatusLink to="/properties">Back to listings</PageStatusLink>
      </PageStatus>
    );
  }

  if (loadState === "error") {
    return (
      <PageStatus
        message="Could not load this property. Please try again."
        className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-muted px-4 text-center"
      >
        <PageStatusButton onClick={reload}>Retry</PageStatusButton>
        <PageStatusLink to="/properties" className="text-sm font-medium text-primary hover:underline">
          Back to listings
        </PageStatusLink>
      </PageStatus>
    );
  }

  return (
    <div className="min-h-screen bg-surface-muted">
      {/* BREADCRUMB */}
      <nav
        className="breadcrumb-bar"
        aria-label="Breadcrumb"
      >
        <div className="page-container flex items-center gap-2 px-6 py-4 text-sm text-text-muted lg:px-10">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>

          <Icon icon="lucide:chevron-right" className="h-3.5 w-3.5 text-slate-300" aria-hidden />

          <Link to="/properties" className="hover:text-primary transition-colors">
            Properties
          </Link>

          <Icon icon="lucide:chevron-right" className="h-3.5 w-3.5 text-slate-300" aria-hidden />

          <span className="line-clamp-1 font-medium text-primary">{property.title}</span>
        </div>
      </nav>

      {/* CONTAINER */}
      <div className="page-container px-6 pt-8 pb-16 lg:px-10 lg:pb-20">
        {/* MAIN LAYOUT */}
        <div className="mt-2 grid gap-8 lg:grid-cols-[1fr_350px]">
          {/* LEFT */}
          <section>
            {/* HEADER */}
            <div className="flex flex-col gap-8 pb-4 lg:flex-row lg:items-center lg:justify-between">
              {/* LEFT HEADER */}
              <div className="space-y-4">
                {/* BADGES */}
                <div className="flex flex-wrap gap-2">
                  <VerificationBadge status={property.verificationStatus} />
                  <span className="inline-flex items-center rounded-full bg-primary-subtle px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/10">
                    {property.propertyType}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleSave(property.id)}
                    className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-primary/30 hover:text-primary"
                    aria-pressed={isSaved(property.id)}
                  >
                    <Icon
                      icon={isSaved(property.id) ? "lucide:heart" : "lucide:heart"}
                      className={`h-3.5 w-3.5 ${isSaved(property.id) ? "fill-primary text-primary" : ""}`}
                      aria-hidden
                    />
                    {isSaved(property.id) ? "Saved" : "Save property"}
                  </button>
                </div>

                <h1 className="mt-3 max-w-2xl font-serif text-2xl leading-tight tracking-tight text-slate-900 lg:text-[2rem]">
                  {property.title}
                </h1>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <Icon icon="lucide:map-pin" className="h-4 w-4 text-slate-400" aria-hidden />
                  {property.location.address}, {property.location.lga},{" "}
                  {property.location.state}
                </div>
              </div>

              <div className="space-y-1 lg:text-right">
                <div className="font-serif text-[2rem] leading-none tracking-tight text-primary tabular-nums">
                  {formatPrice(property.price)}
                </div>
                <div className="text-xs font-medium text-slate-400">Asking price</div>
              </div>
            </div>

            {/* IMAGE GALLERY */}
            <PropertyImageGallery
              images={property.propertyImages}
              activeImage={activeImage}
              onSelectImage={setActiveImage}
              propertyTitle={property.title}
              locationLabel={formatLocationShort(property)}
            />

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="detail-stat">
                <p className="detail-stat-label">Land size</p>
                <p className="detail-stat-value">{property.landSize} sqm</p>
              </div>
              <div className="detail-stat">
                <p className="detail-stat-label">Property type</p>
                <p className="detail-stat-value">{property.propertyType}</p>
              </div>
              <div className="detail-stat">
                <p className="detail-stat-label">LGA</p>
                <p className="detail-stat-value">{property.location.lga}</p>
              </div>
              <div className="detail-stat">
                <p className="detail-stat-label">State</p>
                <p className="detail-stat-value">{property.location.state}</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* DESCRIPTION */}
              <section className="mt-12 border-t border-slate-200/80 pt-10">
                <h2 className="section-title mb-5 text-xl lg:text-2xl">
                  Property description
                </h2>

                <p className="text-[15px] leading-8 text-slate-600">
                  {property.description}
                </p>

                {(property.furtherDescription ?? property.furtherDescripture) && (
                  <p className="mt-4 text-[15px] leading-8 text-slate-600">
                    {property.furtherDescription ?? property.furtherDescripture}
                  </p>
                )}
              </section>

              <PropertyDocuments
                documents={property.documents}
                propertyTitle={property.title}
              />

              <PropertyLocationMap property={property} />
            </div>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <div className="surface-panel p-6">
              <div className="detail-stat-label mb-5">Contact &amp; inspect</div>

              <div className="mb-4 flex gap-3">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="btn-primary flex flex-1 flex-col gap-1.5 rounded-2xl py-4"
                >
                  <Icon icon="lucide:phone" className="h-5 w-5" aria-hidden />
                  <span className="text-[11px] font-semibold">Call</span>
                </a>

                <a
                  href={`https://wa.me/${property.agent.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp flex flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl py-4"
                >
                  <Icon icon="ri:whatsapp-fill" className="h-5 w-5" aria-hidden />
                  <span className="text-[11px] font-semibold">WhatsApp</span>
                </a>
              </div>

              <Link
                to={`/book-inspection/${property.id}`}
                className="btn-ghost w-full gap-2 border-primary/15 text-primary hover:bg-primary-subtle"
              >
                <Icon icon="lucide:calendar" className="h-4 w-4" aria-hidden />
                Book free inspection
              </Link>
            </div>

            <div className="surface-panel p-6">
              <div className="mb-4 text-sm font-semibold text-slate-900">Listed by agent</div>

              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary-subtle flex h-12 w-12 items-center justify-center rounded-full font-serif text-base text-primary">
                  {getAgentInitials(property.agent.name)}
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {property.agent.name}
                  </div>
                  <div className="text-xs text-text-muted">Licensed real estate agent</div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <div className="mb-1 text-[11px] text-text-muted">Agency</div>
                <div className="text-sm font-semibold text-slate-900">{property.agent.agency}</div>
                <div className="text-xs text-text-muted">
                  {property.agent.location.city}, {property.agent.location.state}
                </div>
              </div>

              <a
                href={`tel:${property.agent.phone}`}
                className="btn-ghost mt-4 w-full text-xs"
              >
                Contact agent directly
              </a>
            </div>

            <TrustInspectionCallout />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
