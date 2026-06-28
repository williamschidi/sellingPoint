import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ListingBasicInfoSection from "../../components/dashboard/listings/ListingBasicInfoSection.jsx";
import ListingFormSidebar from "../../components/dashboard/listings/ListingFormSidebar.jsx";
import ListingImagesSection from "../../components/dashboard/listings/ListingImagesSection.jsx";
import ListingLandSpecsSection from "../../components/dashboard/listings/ListingLandSpecsSection.jsx";
import ListingLocationSection from "../../components/dashboard/listings/ListingLocationSection.jsx";
import ListingsFormHeader from "../../components/dashboard/listings/ListingsFormHeader.jsx";
import { useToast } from "../../context/ToastContext";
import { usePageMeta } from "../../hooks/usePageMeta";
import {
  computeListingProgress,
  LISTING_FORM_INITIAL,
} from "../../lib/dashboard/listingForm.js";

export default function DashboardListings() {
  usePageMeta({
    title: "Add new listing",
    description: "Submit a new land listing for verification on SellingPoint.",
    path: "/dashboard/listings",
  });

  const { showToast } = useToast();
  const [form, setForm] = useState(LISTING_FORM_INITIAL);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = useMemo(() => computeListingProgress(form), [form]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleAddImages(files) {
    const nextImages = files.map((file, index) => ({
      id: `${file.name}-${Date.now()}-${index}`,
      name: file.name,
    }));
    setForm((current) => ({
      ...current,
      images: [...current.images, ...nextImages].slice(0, 8),
    }));
  }

  function handleRemoveImage(imageId) {
    setForm((current) => ({
      ...current,
      images: current.images.filter((image) => image.id !== imageId),
    }));
  }

  function handleSaveDraft() {
    showToast("Draft saved locally — backend sync coming soon.");
  }

  function handleSubmit() {
    const { basic, location, land, images } = progress;
    if (basic < 100 || location < 100 || land < 100 || images < 100) {
      showToast("Complete all required sections before submitting.", "error");
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      showToast(
        "Form validated — listing submission will be enabled once the backend is connected."
      );
    }, 400);
  }

  return (
    <>
      <ListingsFormHeader
        onSaveDraft={handleSaveDraft}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <div className="dashboard-listings-header flex flex-col gap-3 px-5 py-4 lg:hidden">
        <Link
          to="/dashboard"
          className="text-[13px] text-[#6b7280] no-underline hover:text-[#111827]"
        >
          ← My Listings
        </Link>
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-base font-bold text-[#111827]">Add New Listing</h1>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="dashboard-form-btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting…" : "Submit"}
          </button>
        </div>
      </div>

      <div className="dashboard-listings-content">
        <div className="flex flex-col gap-5">
          <ListingBasicInfoSection form={form} onChange={updateField} />
          <ListingLocationSection form={form} onChange={updateField} />
          <ListingLandSpecsSection form={form} onChange={updateField} />
          <ListingImagesSection
            images={form.images}
            onAddImages={handleAddImages}
            onRemoveImage={handleRemoveImage}
          />
        </div>

        <ListingFormSidebar
          sections={progress.sections}
          onSaveDraft={handleSaveDraft}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
