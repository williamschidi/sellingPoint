import { useEffect, useRef, useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { useFocusTrap } from "../hooks/useFocusTrap";
import {
  FILTER_STATES,
  LAND_SIZE_BUCKETS,
  PRICE_RANGE_MAX,
  PRICE_RANGE_MIN,
  PRICE_RANGE_STEP,
  PROPERTY_TYPES,
} from "../lib/properties/constants.js";

function parseList(value) {
  return value
    ? value.split(",").map((item) => item.trim()).filter(Boolean)
    : [];
}

function ListingFilter({
  filters,
  onApply,
  onClear,
  showFilter = false,
  onClose,
}) {
  const [localTypes, setLocalTypes] = useState(parseList(filters.types));
  const [localState, setLocalState] = useState(filters.state ?? "");
  const [localSizes, setLocalSizes] = useState(parseList(filters.sizes));
  const [localVerification, setLocalVerification] = useState(
    parseList(filters.verification)
  );
  const [priceRange, setPriceRange] = useState([
    Number(filters.minPrice) || PRICE_RANGE_MIN,
    Number(filters.maxPrice) || PRICE_RANGE_MAX,
  ]);
  const drawerRef = useRef(null);

  useFocusTrap(drawerRef, showFilter);

  useEffect(() => {
    setLocalTypes(parseList(filters.types));
    setLocalState(filters.state ?? "");
    setLocalSizes(parseList(filters.sizes));
    setLocalVerification(parseList(filters.verification));
    setPriceRange([
      Number(filters.minPrice) || PRICE_RANGE_MIN,
      Number(filters.maxPrice) || PRICE_RANGE_MAX,
    ]);
  }, [filters]);

  function selectState(state) {
    setLocalState((current) => (current === state ? "" : state));
  }

  function toggleType(type) {
    setLocalTypes((current) => {
      const list = [...current];
      const index = list.indexOf(type);
      if (index >= 0) list.splice(index, 1);
      else list.push(type);
      return list;
    });
  }

  function toggleSize(sizeId) {
    setLocalSizes((current) => {
      const list = [...current];
      const index = list.indexOf(sizeId);
      if (index >= 0) list.splice(index, 1);
      else list.push(sizeId);
      return list;
    });
  }

  function toggleVerification(status) {
    setLocalVerification((current) => {
      const list = [...current];
      const index = list.indexOf(status);
      if (index >= 0) list.splice(index, 1);
      else list.push(status);
      return list;
    });
  }

  function handleApply() {
    const next = {
      ...filters,
      state: localState,
      types: localTypes.join(","),
      sizes: localSizes.join(","),
      verification: localVerification.join(","),
      price: "",
      page: 1,
      minPrice: "",
      maxPrice: "",
    };

    if (priceRange[0] > PRICE_RANGE_MIN || priceRange[1] < PRICE_RANGE_MAX) {
      next.minPrice = String(priceRange[0]);
      next.maxPrice = String(priceRange[1]);
    }

    onApply(next);
  }

  function handleClear() {
    setLocalTypes([]);
    setLocalState("");
    setLocalSizes([]);
    setLocalVerification([]);
    setPriceRange([PRICE_RANGE_MIN, PRICE_RANGE_MAX]);
    onClear();
  }

  const panel = (
    <div className="surface-panel border-0 p-6 shadow-none lg:border lg:shadow-sm">
      <div className="mb-7 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900">Filters</h3>
        <button
          type="button"
          onClick={handleClear}
          className="focus-ring text-xs font-medium text-primary hover:underline"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-6">
        <fieldset>
          <legend className="mb-3 text-xs font-medium tracking-wide text-slate-500 uppercase">
            State / Location
          </legend>
          <div className="space-y-3 border-b border-border pb-5">
            {FILTER_STATES.map((state) => (
              <label key={state} className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="filter-state"
                  checked={localState === state}
                  onChange={() => selectState(state)}
                  className="h-[18px] w-[18px] accent-secondary"
                />
                <span className="text-sm font-medium text-slate-600">{state}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="border-b border-border pb-5">
          <p className="mb-4 text-xs font-medium tracking-wide text-gray-500 uppercase">
            Property type
          </p>
          <div className="space-y-3">
            {PROPERTY_TYPES.map((type) => (
              <label key={type} className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={localTypes.includes(type)}
                  onChange={() => toggleType(type)}
                  className="h-[18px] w-[18px] accent-secondary"
                />
                <span className="text-sm font-medium text-slate-600">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4 border-b border-border pb-6">
          <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
            Price range
          </p>
          <Range
            values={priceRange}
            step={PRICE_RANGE_STEP}
            min={PRICE_RANGE_MIN}
            max={PRICE_RANGE_MAX}
            onChange={setPriceRange}
            ariaLabel={["Minimum price", "Maximum price"]}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                className="flex h-6 w-full items-center"
              >
                <div
                  ref={props.ref}
                  className="h-1 w-full rounded-full"
                  style={{
                    background: getTrackBackground({
                      values: priceRange,
                      colors: ["#e2e8f0", "var(--color-secondary)", "#e2e8f0"],
                        min: PRICE_RANGE_MIN,
                        max: PRICE_RANGE_MAX,
                    }),
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props }) => {
              const { key, ...rest } = props;
              return (
                <div
                  key={key}
                  {...rest}
                  className="focus-ring h-5 w-5 rounded-full border-2 border-secondary bg-white shadow-md"
                />
              );
            }}
          />
          <div className="flex items-center justify-between gap-2 text-sm font-medium text-slate-700">
            <span>₦{priceRange[0].toLocaleString()}</span>
            <span>₦{priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        <div className="border-b border-border pb-5">
          <p className="mb-4 text-xs font-medium tracking-wide text-gray-500 uppercase">
            Land size
          </p>
          <div className="space-y-3">
            {LAND_SIZE_BUCKETS.map((bucket) => (
              <label key={bucket.id} className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={localSizes.includes(bucket.id)}
                  onChange={() => toggleSize(bucket.id)}
                  className="h-[18px] w-[18px] accent-secondary"
                />
                <span className="text-sm font-medium text-slate-600">{bucket.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-b border-border pb-5">
          <p className="mb-4 text-xs font-medium tracking-wide text-gray-500 uppercase">
            Verification status
          </p>
          <div className="space-y-3">
            {["Verified", "Pending"].map((status) => (
              <label key={status} className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={localVerification.includes(status)}
                  onChange={() => toggleVerification(status)}
                  className="h-[18px] w-[18px] accent-secondary"
                />
                <span className="text-sm font-medium text-slate-600">{status}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleApply}
          className="focus-ring hover:bg-primary-dark w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition"
        >
          Apply filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      {showFilter && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close filters"
          onClick={onClose}
        />
      )}

      <aside
        id="listing-filters"
        ref={drawerRef}
        className={`w-full shrink-0 lg:w-70 ${
          showFilter
            ? "fixed inset-y-0 left-0 z-50 w-[min(100%,20rem)] overflow-y-auto bg-white p-4 shadow-xl lg:static lg:block lg:shadow-none"
            : "hidden lg:block"
        }`}
        aria-label="Listing filters"
      >
        {showFilter && (
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <h2 className="text-sm font-bold text-slate-900">Filters</h2>
            <button
              type="button"
              onClick={onClose}
              className="focus-ring rounded-lg px-3 py-2 text-sm font-medium text-slate-600"
            >
              Close
            </button>
          </div>
        )}
        {panel}
      </aside>
    </>
  );
}

export default ListingFilter;
