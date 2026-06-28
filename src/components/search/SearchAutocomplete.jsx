import { memo, useEffect, useId, useMemo, useRef, useState } from "react";
import { buildSearchSuggestions } from "../../lib/search/suggestions";

function SearchAutocomplete({
  value,
  onChange,
  onSelect,
  properties = [],
  inputId,
  placeholder = "Search by location, title or keyword...",
  inputClassName = "",
  focusOnMount = false,
}) {
  const listboxId = useId();
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const suggestions = useMemo(
    () => buildSearchSuggestions(properties, value),
    [properties, value]
  );

  const activeOptionId =
    activeIndex >= 0 && suggestions[activeIndex]
      ? `${listboxId}-option-${activeIndex}`
      : undefined;

  useEffect(() => {
    if (focusOnMount) {
      inputRef.current?.focus();
    }
  }, [focusOnMount]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelectSuggestion(suggestion) {
    onChange(suggestion.value);
    onSelect?.(suggestion);
    setOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (!open || suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, suggestions.length - 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      handleSelectSuggestion(suggestions[activeIndex]);
    }
  }

  return (
    <div ref={rootRef} className="relative min-w-0 flex-1">
      <input
        ref={inputRef}
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={open && suggestions.length > 0}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={activeOptionId}
        className={
          inputClassName ||
          "h-11 w-full rounded-xl border border-transparent bg-slate-50 pr-4 pl-11 text-sm text-slate-800 outline-none transition focus:border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary/20"
        }
      />

      {open && suggestions.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-slate-200/80 bg-white py-1.5 shadow-xl shadow-slate-900/10"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.type}-${suggestion.value}`}
              id={`${listboxId}-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
            >
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelectSuggestion(suggestion)}
                className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm ${
                  index === activeIndex ? "bg-primary-subtle text-primary" : "text-slate-700"
                }`}
              >
                <span>{suggestion.value}</span>
                <span className="text-[10px] tracking-wide text-slate-400 uppercase">
                  {suggestion.type}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default memo(SearchAutocomplete);
