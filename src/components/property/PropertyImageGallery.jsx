import { Icon } from "@iconify/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusTrap } from "../../hooks/useFocusTrap";

export default function PropertyImageGallery({
  images = [],
  activeImage,
  onSelectImage,
  propertyTitle = "Property",
  locationLabel = "",
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const lightboxRef = useRef(null);
  useFocusTrap(lightboxRef, lightboxOpen);

  const activeIndex = images.findIndex((img) => img === activeImage);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index >= 0 ? index : 0);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const showPrevious = useCallback(() => {
    setLightboxIndex((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;

    function onKeyDown(event) {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, closeLightbox, showPrevious, showNext]);

  useEffect(() => {
    if (lightboxOpen && images[lightboxIndex]) {
      onSelectImage(images[lightboxIndex]);
    }
  }, [lightboxIndex, lightboxOpen, images, onSelectImage]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="group relative overflow-hidden rounded-2xl bg-slate-200 shadow-sm">
        <button
          type="button"
          onClick={() => openLightbox(activeIndex >= 0 ? activeIndex : 0)}
          className="focus-ring block w-full"
          aria-label={`View all ${images.length} photos in fullscreen`}
        >
          <img
            src={activeImage}
            alt={`${propertyTitle} — ${locationLabel}`}
            className="h-50 w-full object-cover transition duration-300 group-hover:scale-[1.01] md:h-70 lg:h-90"
          />
        </button>

        <button
          type="button"
          onClick={() => openLightbox(activeIndex >= 0 ? activeIndex : 0)}
          className="focus-ring absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-black/75"
        >
          <Icon icon="lucide:expand" className="h-3.5 w-3.5" aria-hidden />
          {images.length} photos
        </button>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
        {images.map((img, index) => (
          <button
            key={`${img}-${index}`}
            type="button"
            onClick={() => onSelectImage(img)}
            onDoubleClick={() => openLightbox(index)}
            aria-label={`View photo ${index + 1}`}
            aria-pressed={activeImage === img}
            className={`focus-ring overflow-hidden rounded-xl transition-all ${
              activeImage === img
                ? "ring-2 ring-primary ring-offset-2"
                : "opacity-80 hover:opacity-100"
            }`}
          >
            <img src={img} alt="" className="h-16 w-full object-cover md:h-18" />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <div
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${propertyTitle} photo gallery`}
            className="relative flex max-h-full max-w-full items-center justify-center"
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="focus-ring absolute top-0 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Close gallery"
            >
              <Icon icon="lucide:x" className="h-5 w-5" aria-hidden />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="focus-ring absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  aria-label="Previous photo"
                >
                  <Icon icon="lucide:chevron-left" className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="focus-ring absolute top-1/2 right-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  aria-label="Next photo"
                >
                  <Icon icon="lucide:chevron-right" className="h-5 w-5" aria-hidden />
                </button>
              </>
            )}

            <img
              src={images[lightboxIndex]}
              alt={`${propertyTitle} — ${lightboxIndex + 1} of ${images.length}`}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
            />

            <p className="absolute -bottom-8 text-sm font-medium text-white/80">
              {lightboxIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
