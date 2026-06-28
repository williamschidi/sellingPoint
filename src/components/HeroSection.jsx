import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import propertyLandImage from "../assets/property-land.svg";
import { TRUST_CHIPS } from "../data/homepage";
import HeroSearch from "./home/HeroSearch";

export default function HeroSection() {
  return (
    <section className="bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(110,231,183,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.06),transparent_40%)]" />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] bg-cover bg-center opacity-[0.12] lg:block"
        style={{ backgroundImage: `url(${propertyLandImage})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/98 to-primary/75 lg:to-primary/40" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-14 lg:px-10 lg:pt-20 lg:pb-20">
        <div className="max-w-3xl animate-fade-in-up">
          <div className="hero-badge mb-6">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-mint" aria-hidden />
            Nigeria&apos;s verified land marketplace
          </div>

          <h1 className="mb-5 font-serif text-[2rem] leading-[1.08] font-semibold tracking-tight text-white sm:text-4xl lg:text-[3.25rem]">
            Find verified land you can{" "}
            <span className="text-accent-mint/90">trust</span> — then inspect
            before you buy
          </h1>

          <p className="mb-8 max-w-xl text-[15px] leading-8 text-white/75 sm:text-base lg:text-lg">
            Browse documented plots across Nigeria, connect with licensed agents,
            and book free on-site inspections — all in one place.
          </p>

          <ul className="mb-10 flex flex-wrap gap-2.5">
            {TRUST_CHIPS.map((chip) => (
              <li
                key={chip.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3.5 py-2 text-[11px] font-medium text-white/90 backdrop-blur-sm sm:text-xs"
              >
                <Icon icon={chip.icon} className="h-3.5 w-3.5 text-accent-mint" />
                {chip.label}
              </li>
            ))}
          </ul>

          <HeroSearch className="mb-8 shadow-hero" id="hero-search" />

          <div className="flex flex-wrap gap-3">
            <NavLink to="/properties" className="btn-secondary">
              Browse properties
            </NavLink>

            <HashLink
              smooth
              to="/#how-it-works"
              className="btn-ghost border-white/20 bg-white/8 text-white backdrop-blur-sm hover:border-white/35 hover:bg-white/12"
            >
              How it works
            </HashLink>
          </div>
        </div>
      </div>
    </section>
  );
}
