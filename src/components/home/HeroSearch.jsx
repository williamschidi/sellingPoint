import { Icon } from "@iconify/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePropertyCatalog } from "../../context/PropertiesContext";
import { buildListingsSearchUrl } from "../../lib/search/buildSearchParams";
import {
  ALL_STATES_OPTION,
  ANY_PRICE_OPTION,
} from "../../lib/properties/constants";
import PriceSelect from "../PriceSelect";
import StateSelect from "../StateSelect";
import SearchAutocomplete from "../search/SearchAutocomplete";

export default function HeroSearch({ className = "", id }) {
  const navigate = useNavigate();
  const properties = usePropertyCatalog();
  const [keyword, setKeyword] = useState("");
  const [state, setState] = useState(ALL_STATES_OPTION);
  const [price, setPrice] = useState(ANY_PRICE_OPTION);

  function handleSubmit(event) {
    event.preventDefault();
    navigate(buildListingsSearchUrl({ keyword, state, price }));
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={`rounded-2xl border border-white/20 bg-white p-4 lg:p-5 ${className}`}
      role="search"
      aria-label="Search verified land listings"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative min-w-0 flex-1">
          <label htmlFor="hero-search-keyword" className="sr-only">
            Search by location, title or keyword
          </label>
          <Icon
            icon="lucide:search"
            className="pointer-events-none absolute top-1/2 left-4 z-10 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <SearchAutocomplete
            inputId="hero-search-keyword"
            value={keyword}
            onChange={setKeyword}
            properties={properties}
            placeholder="Search by location, title or keyword..."
          />
        </div>

        <div className="grid grid-cols-2 gap-3 md:flex md:items-center">
          <div className="min-w-0 md:w-40">
            <span id="hero-search-state-label" className="sr-only">
              State
            </span>
            <StateSelect
              id="hero-search-state"
              ariaLabelledBy="hero-search-state-label"
              value={state}
              onChange={setState}
              variant="hero"
            />
          </div>

          <div className="min-w-0 md:w-40">
            <span id="hero-search-price-label" className="sr-only">
              Price range
            </span>
            <PriceSelect
              id="hero-search-price"
              ariaLabelledBy="hero-search-price-label"
              value={price}
              onChange={setPrice}
              variant="hero"
            />
          </div>

          <button type="submit" className="btn-primary col-span-2 md:col-span-1">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
