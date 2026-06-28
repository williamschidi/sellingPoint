import { FILTER_STATES } from "../../../lib/properties/constants.js";
import { LISTING_LGA_OPTIONS } from "../../../lib/dashboard/listingForm.js";
import ListingFormCard from "./ListingFormCard.jsx";

export default function ListingLocationSection({ form, onChange }) {
  const lgaOptions = form.state ? (LISTING_LGA_OPTIONS[form.state] ?? []) : [];

  return (
    <ListingFormCard title="Location Details">
      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="dashboard-form-label" htmlFor="listing-state">
            State *
          </label>
          <select
            id="listing-state"
            className="dashboard-form-select"
            value={form.state}
            onChange={(event) => {
              onChange("state", event.target.value);
              onChange("lga", "");
            }}
          >
            <option value="">Select State…</option>
            {FILTER_STATES.map((state) => (
              <option key={state} value={state}>
                {state === "Abuja" ? "FCT Abuja" : state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="dashboard-form-label" htmlFor="listing-lga">
            LGA *
          </label>
          <select
            id="listing-lga"
            className="dashboard-form-select"
            value={form.lga}
            onChange={(event) => onChange("lga", event.target.value)}
            disabled={!form.state}
          >
            <option value="">Select LGA…</option>
            {lgaOptions.map((lga) => (
              <option key={lga} value={lga}>
                {lga}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="dashboard-form-label" htmlFor="listing-address">
          Full Address / Landmark
        </label>
        <input
          id="listing-address"
          type="text"
          className="dashboard-form-input"
          placeholder="e.g. Behind Chevron Drive, off Lekki Expressway"
          value={form.address}
          onChange={(event) => onChange("address", event.target.value)}
        />
      </div>
    </ListingFormCard>
  );
}
