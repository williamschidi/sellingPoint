import { useRef } from "react";
import ListingFormCard from "./ListingFormCard.jsx";

const MOCK_THUMB_GRADIENTS = [
  "linear-gradient(135deg, #C7D2E8, #8DA4C8)",
  "linear-gradient(135deg, #C8DBC8, #88B888)",
];

export default function ListingImagesSection({ images, onAddImages, onRemoveImage }) {
  const inputRef = useRef(null);

  function handleFiles(event) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;
    onAddImages(files);
    event.target.value = "";
  }

  return (
    <ListingFormCard title="Property Images">
      <p className="mb-4 text-xs text-[#6b7280]">
        Upload clear photos of the land. Min. 3 images required. Max 20MB per image.
      </p>

      <button
        type="button"
        className="dashboard-upload-zone mb-4 w-full"
        onClick={() => inputRef.current?.click()}
      >
        <span className="mb-2.5 block text-[32px]" aria-hidden>
          📸
        </span>
        <p className="mb-1 text-sm font-semibold text-[#111827]">Drag & drop images here</p>
        <p className="mb-3 text-xs text-[#6b7280]">or click to browse from your device</p>
        <span className="dashboard-form-btn-outline">Browse Files</span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={handleFiles}
      />

      <div className="flex flex-wrap gap-2.5">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="relative h-[72px] w-[90px] overflow-hidden rounded-[10px]"
            style={{
              background:
                MOCK_THUMB_GRADIENTS[index % MOCK_THUMB_GRADIENTS.length],
            }}
          >
            <button
              type="button"
              onClick={() => onRemoveImage(image.id)}
              className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-danger text-[11px] text-white"
              aria-label={`Remove image ${index + 1}`}
            >
              ×
            </button>
            {index === 0 && (
              <span className="absolute bottom-1 left-1 rounded bg-black/50 px-1.5 py-0.5 text-[9px] font-semibold text-white">
                Main
              </span>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-[72px] w-[90px] items-center justify-center rounded-[10px] border-2 border-dashed border-[#d1d5db] bg-[#e5e7eb] text-xl text-[#6b7280]"
          aria-label="Add another image"
        >
          +
        </button>
      </div>
    </ListingFormCard>
  );
}
