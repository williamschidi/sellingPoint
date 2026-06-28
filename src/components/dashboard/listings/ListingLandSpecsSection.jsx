import { PROPERTY_TYPES } from "../../../lib/properties/constants.js";
import ListingFormCard from "./ListingFormCard.jsx";

const LAND_UNITS = ["sqm", "acres", "hectares"];

export default function ListingLandSpecsSection({ form, onChange }) {
  return (
    <ListingFormCard title="Land Specifications">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="dashboard-form-label" htmlFor="listing-land-size">
            Land Size *
          </label>
          <input
            id="listing-land-size"
            type="text"
            className="dashboard-form-input"
            placeholder="e.g. 600"
            value={form.landSize}
            onChange={(event) => onChange("landSize", event.target.value)}
          />
        </div>
        <div>
          <label className="dashboard-form-label" htmlFor="listing-land-unit">
            Unit
          </label>
          <select
            id="listing-land-unit"
            className="dashboard-form-select"
            value={form.landUnit}
            onChange={(event) => onChange("landUnit", event.target.value)}
          >
            {LAND_UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="dashboard-form-label" htmlFor="listing-property-type">
            Property Type *
          </label>
          <select
            id="listing-property-type"
            className="dashboard-form-select"
            value={form.propertyType}
            onChange={(event) => onChange("propertyType", event.target.value)}
          >
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
            <option value="Agricultural">Agricultural</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>
      </div>
    </ListingFormCard>
  );
}
