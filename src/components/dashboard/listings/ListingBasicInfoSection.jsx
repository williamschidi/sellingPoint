import ListingFormCard from "./ListingFormCard.jsx";

export default function ListingBasicInfoSection({ form, onChange }) {
  return (
    <ListingFormCard title="Basic Information">
      <div className="mb-4">
        <label className="dashboard-form-label" htmlFor="listing-title">
          Property Title *
        </label>
        <input
          id="listing-title"
          type="text"
          className="dashboard-form-input"
          placeholder="e.g. Prime Residential Plot, Lekki Phase 1"
          value={form.title}
          onChange={(event) => onChange("title", event.target.value)}
        />
        <p className="mt-1 text-[11px] text-[#6b7280]">
          Be specific — include location and type for better visibility.
        </p>
      </div>

      <div className="mb-4">
        <label className="dashboard-form-label" htmlFor="listing-description">
          Full Description *
        </label>
        <textarea
          id="listing-description"
          rows={4}
          className="dashboard-form-input dashboard-form-textarea"
          placeholder="Describe the land in detail — size, features, nearby landmarks, document status…"
          value={form.description}
          onChange={(event) => onChange("description", event.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="dashboard-form-label" htmlFor="listing-price">
            Asking Price (₦) *
          </label>
          <input
            id="listing-price"
            type="text"
            className="dashboard-form-input"
            placeholder="e.g. 12,500,000"
            value={form.price}
            onChange={(event) => onChange("price", event.target.value)}
          />
        </div>
        <div>
          <label className="dashboard-form-label" htmlFor="listing-price-type">
            Price Type
          </label>
          <select
            id="listing-price-type"
            className="dashboard-form-select"
            value={form.priceType}
            onChange={(event) => onChange("priceType", event.target.value)}
          >
            <option value="Fixed">Fixed</option>
            <option value="Negotiable">Negotiable</option>
          </select>
        </div>
      </div>
    </ListingFormCard>
  );
}
