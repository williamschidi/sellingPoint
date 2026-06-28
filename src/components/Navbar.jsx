import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Icon } from "@iconify/react";

import { LIST_PROPERTY_MAILTO } from "../lib/properties/constants";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useSavedProperties } from "../context/SavedPropertiesContext";
import PropertySearchForm from "./search/PropertySearchForm";
import {
  buildListingsSearchUrl,
  parseListingsSearchParams,
} from "../lib/search/buildSearchParams";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const menuRef = useRef(null);
  const { savedCount } = useSavedProperties();

  useFocusTrap(menuRef, isMenuOpen);

  const activeClass = "nav-link nav-link-active";
  const inactiveClass = "nav-link nav-link-inactive";

  const navItems = [
    { name: "Properties", path: "/properties" },
    { name: "Saved", path: "/saved" },
    { name: "How It Works", path: "#how-it-works" },
    { name: "About", path: "#about" },
  ];

  useEffect(() => {
    if (location.pathname === "/properties") {
      const parsed = parseListingsSearchParams(new URLSearchParams(location.search));
      setSearchKeyword(parsed.keyword);
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!isMenuOpen) return;

    function onKeyDown(event) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  function handleNavbarSearch(keyword) {
    navigate(buildListingsSearchUrl({ keyword }));
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/90 shadow-sm shadow-slate-900/[0.03] backdrop-blur-xl">
      <nav
        className="mx-auto flex h-[4.25rem] max-w-7xl items-center gap-3 px-6 lg:gap-4 lg:px-10"
        aria-label="Main navigation"
      >
        <Link to="/" className="flex shrink-0 items-center gap-2 md:gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <Icon icon="mdi:home-outline" className="text-xl text-white" />
          </div>
          <span className="text-primary font-serif text-xl font-semibold md:text-2xl">
            Selling
            <span className="text-secondary">Point</span>
          </span>
        </Link>

        <div className="hidden shrink-0 gap-1 lg:flex">
          {navItems.map((item) =>
            item.path.includes("#") ? (
              <HashLink
                key={item.name}
                smooth
                to={`/${item.path}`}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  location.hash === item.path ? activeClass : inactiveClass
                }`}
              >
                {item.name}
              </HashLink>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link relative ${
                    isActive ? "nav-link-active" : "nav-link-inactive"
                  }`
                }
              >
                {item.name}
                {item.path === "/saved" && savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-white">
                    {savedCount > 9 ? "9+" : savedCount}
                  </span>
                )}
              </NavLink>
            )
          )}
        </div>

        <div className="hidden min-w-0 flex-1 md:flex lg:max-w-sm xl:max-w-md">
          <PropertySearchForm
            variant="navbar"
            inputId="navbar-search"
            keyword={searchKeyword}
            onKeywordChange={setSearchKeyword}
            onSubmit={handleNavbarSearch}
            ariaLabel="Search properties from anywhere on the site"
          />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            to="/properties"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-50 md:hidden"
            aria-label="Search properties"
          >
            <Icon icon="lucide:search" className="h-5 w-5" />
          </Link>

          <Link
            to="/sign-in"
            className="btn-ghost btn-sm hidden lg:inline-flex"
          >
            Sign in
          </Link>

          <a href={LIST_PROPERTY_MAILTO} className="btn-primary btn-sm hidden lg:inline-flex">
            List property
          </a>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <Icon
              icon={isMenuOpen ? "lucide:x" : "lucide:menu"}
              className="h-5 w-5"
            />
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          id="mobile-nav-menu"
          ref={menuRef}
          className="border-t border-slate-200 bg-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="flex flex-col gap-1 p-4">
            <div className="mb-3">
              <PropertySearchForm
                variant="listing"
                inputId="mobile-nav-search"
                keyword={searchKeyword}
                onKeywordChange={setSearchKeyword}
                onSubmit={handleNavbarSearch}
                ariaLabel="Search properties"
              />
            </div>

            {navItems.map((item) =>
              item.path.includes("#") ? (
                <HashLink
                  key={item.name}
                  smooth
                  to={`/${item.path}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  {item.name}
                </HashLink>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="relative rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  {item.name}
                  {item.path === "/saved" && savedCount > 0 && (
                    <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1.5 text-[10px] font-bold text-white">
                      {savedCount > 9 ? "9+" : savedCount}
                    </span>
                  )}
                </NavLink>
              )
            )}

            <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
              <Link
                to="/sign-in"
                onClick={() => setIsMenuOpen(false)}
                className="btn-ghost w-full"
              >
                Sign in
              </Link>

              <a
                href={LIST_PROPERTY_MAILTO}
                className="btn-primary w-full text-center"
              >
                List property
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
