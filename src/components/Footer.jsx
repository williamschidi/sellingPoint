import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { usePropertyCatalog } from "../context/PropertiesContext";
import { buildListingsSearchUrl } from "../lib/search/buildSearchParams";
import { getHomepageStats } from "../data/homepage";
import {
  LIST_PROPERTY_MAILTO,
  SOCIAL_LINKS,
} from "../lib/properties/constants";

const TRUST_BADGES = [
  { icon: "lucide:shield-check", label: "Verified Listing Framework" },
  { icon: "lucide:lock", label: "Secure & Encrypted Platform" },
  { icon: "lucide:badge-check", label: "Licensed Agents Only" },
];

const FOOTER_LINKS = {
  properties: [
    { label: "Browse All Listings", to: "/properties" },
    { label: "Lagos Properties", to: buildListingsSearchUrl({ state: "Lagos" }) },
    { label: "Abuja / FCT", to: buildListingsSearchUrl({ state: "Abuja" }) },
    { label: "Rivers State", to: buildListingsSearchUrl({ state: "Rivers" }) },
    {
      label: "Residential Land",
      to: buildListingsSearchUrl({ types: "Residential" }),
    },
    {
      label: "Commercial Land",
      to: buildListingsSearchUrl({ types: "Commercial" }),
    },
    { label: "Verified Only", to: buildListingsSearchUrl({ verification: "Verified" }) },
  ],
  agents: [
    { label: "List a Property", to: LIST_PROPERTY_MAILTO },
    {
      label: "Agent Enquiries",
      to: "mailto:nnaa4good@gmail.com?subject=Agent%20Partnership%20Enquiry",
    },
    { label: "Agent Dashboard", to: "/dashboard" },
  ],
  company: [
    { label: "About Selling Point", to: "/#about", hash: true },
    { label: "How It Works", to: "/#how-it-works", hash: true },
    { label: "Verification", to: "/verification" },
    { label: "Contact Us", to: "/#about", hash: true },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Service", to: "/terms" },
  ],
  support: [
    {
      label: "Report a Listing",
      to: "mailto:nnaa4good@gmail.com?subject=Report%20a%20Listing",
    },
    {
      label: "Help & Support",
      to: "mailto:nnaa4good@gmail.com?subject=SellingPoint%20Support",
    },
  ],
};

const SOCIAL_LINKS_FOOTER = SOCIAL_LINKS;

function FooterLink({ item }) {
  const className =
    "text-[13px] text-white/55 transition-colors duration-200 hover:text-accent-mint";

  if (item.hash) {
    return (
      <HashLink smooth to={item.to} className={className}>
        {item.label}
      </HashLink>
    );
  }

  if (item.to.startsWith("/")) {
    return (
      <Link to={item.to} className={className}>
        {item.label}
      </Link>
    );
  }

  return (
    <a href={item.to} className={className}>
      {item.label}
    </a>
  );
}

function LinkColumn({ title, links }) {
  return (
    <div>
      <p className="mb-5 text-[10px] font-bold tracking-[0.13em] text-white/30 uppercase">
        {title}
      </p>
      <ul className="flex flex-col gap-2.5">
        {links.map((item) => (
          <li key={item.label}>
            <FooterLink item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const properties = usePropertyCatalog();
  const stats = getHomepageStats(properties);

  const footerStats = [
    { value: String(stats.totalListings), label: "Live Listings" },
    { value: String(stats.verifiedListings), label: "Verified Listings" },
    { value: String(stats.statesCovered), label: "States in Catalogue" },
    {
      value: stats.totalListings
        ? `${Math.round((stats.verifiedListings / stats.totalListings) * 100)}%`
        : "—",
      label: "Verification Rate",
    },
  ];

  return (
    <footer className="w-full">
      {/* Newsletter — launch waitlist via email until backend ESP is connected */}
      <div className="bg-primary px-6 py-12 lg:px-10 lg:py-14">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 lg:flex-row lg:items-center lg:gap-12">
          <div className="min-w-0 flex-1">
            <p className="mb-3 text-[10px] font-bold tracking-[0.14em] text-accent-mint uppercase">
              Stay Informed
            </p>
            <h3 className="mb-2.5 font-serif text-2xl leading-tight tracking-tight text-white lg:text-[28px]">
              Get new verified listings
              <br />
              delivered to your inbox
            </h3>
            <p className="max-w-sm text-[13px] leading-relaxed text-white/55">
              Our email newsletter is launching soon. Join the waitlist and we
              will notify you when weekly listing updates go live.
            </p>
          </div>

          <div className="w-full shrink-0 lg:w-auto">
            <a
              href="mailto:nnaa4good@gmail.com?subject=SellingPoint%20Newsletter%20Waitlist"
              className="btn-secondary inline-flex w-full items-center justify-center sm:w-auto"
            >
              Join the waitlist via email →
            </a>
            <p className="mt-2.5 pl-1 text-[11px] text-white/35">
              No account required. Opens your email app — we do not store your
              address on this prototype. See our{" "}
              <Link to="/privacy" className="underline hover:text-white/60">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="bg-footer-bg">
        <div className="mx-auto max-w-7xl px-6 pt-12 pb-0 lg:px-10 lg:pt-14">
          <div className="grid gap-10 border-b border-white/7 pb-12 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr_1fr] lg:gap-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link to="/" className="mb-5 flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-[11px] border border-white/10 bg-white/8">
                  <Icon icon="mdi:home-outline" className="text-xl text-white" />
                </div>
                <span className="font-serif text-[22px] tracking-tight text-white">
                  Selling<span className="text-accent-mint">Point</span>
                </span>
              </Link>

              <p className="mb-7 max-w-[230px] text-[13px] leading-relaxed text-white/45">
                Nigeria&apos;s trusted marketplace for verified landed properties.
                Transparent, secure, and built for real buyers.
              </p>

              <div className="flex flex-col gap-2">
                {TRUST_BADGES.map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2.5 rounded-[9px] border border-white/7 bg-white/4 px-3 py-2"
                  >
                    <Icon
                      icon={badge.icon}
                      className="h-3.5 w-3.5 shrink-0 text-accent-mint"
                    />
                    <span className="text-[11px] font-medium text-white/65">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <LinkColumn title="Properties" links={FOOTER_LINKS.properties} />
            <LinkColumn title="For Agents" links={FOOTER_LINKS.agents} />
            <LinkColumn title="Company" links={FOOTER_LINKS.company} />

            <div>
              <LinkColumn title="Support" links={FOOTER_LINKS.support} />
              <div className="mt-6 flex flex-col gap-2.5 border-t border-white/7 pt-5">
                <a
                  href="mailto:nnaa4good@gmail.com"
                  className="flex items-center gap-2 text-xs text-white/45 transition duration-200 hover:text-accent-mint"
                >
                  <Icon icon="lucide:mail" className="h-3.5 w-3.5 shrink-0" />
                  nnaa4good@gmail.com
                </a>
                <a
                  href="tel:+2348144002759"
                  className="flex items-center gap-2 text-xs text-white/45 transition duration-200 hover:text-accent-mint"
                >
                  <Icon icon="lucide:phone" className="h-3.5 w-3.5 shrink-0" />
                  +234 814 400 2759
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 divide-x divide-y divide-white/7 border-b border-white/7 lg:grid-cols-4 lg:divide-y-0">
            {footerStats.map((stat) => (
              <div key={stat.label} className="px-4 py-8 text-center lg:px-5">
                <div className="mb-1 font-serif text-3xl text-white lg:text-[34px]">
                  {stat.value}
                </div>
                <div className="text-[11px] tracking-[0.09em] text-white/35 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright + social */}
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-start justify-between gap-6 py-6 lg:flex-row lg:items-center">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="font-serif text-[15px] text-white/85">
                  Selling<span className="text-accent-mint">Point</span>
                </span>
                <span className="text-white/20">·</span>
                <span className="text-xs text-white/35">
                  © {new Date().getFullYear()} Selling Point Real Estate
                  Brokers Network. All rights reserved.
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/privacy"
                  className="text-[11px] text-white/40 transition duration-200 hover:text-accent-mint"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-[11px] text-white/40 transition duration-200 hover:text-accent-mint"
                >
                  Terms of Service
                </Link>
                <span className="text-[11px] text-white/30">
                  Selling Point Real Estate Brokers Network
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="mr-1.5 text-[10px] tracking-[0.1em] text-white/25 uppercase">
                Follow us
              </span>
              {SOCIAL_LINKS_FOOTER.map((link) =>
                link.comingSoon ? (
                  <span
                    key={link.label}
                    title={`${link.label} — coming soon`}
                    aria-label={`${link.label} — coming soon`}
                    className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-[9px] border border-white/9 bg-white/6 text-white/35"
                  >
                    <Icon icon={link.icon} className="h-3.5 w-3.5" aria-hidden />
                  </span>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-white/9 bg-white/6 text-white/65 transition hover:border-white/20 hover:bg-white/14"
                  >
                    <Icon icon={link.icon} className="h-3.5 w-3.5" />
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="bg-black/20 px-6 py-4 lg:px-10 lg:py-5">
          <p className="mx-auto max-w-7xl text-center text-[11px] leading-relaxed text-white/20">
            Selling Point is a property discovery and listing platform. We do not
            facilitate, guarantee, or take responsibility for any real estate
            transactions. All property information is provided by listing agents
            and independently verified by our team where possible. Buyers are
            advised to conduct independent due diligence before any property
            purchase. Selling Point Real Estate Brokers Network facilitates
            connections between buyers and licensed agents. Property prices and
            availability are subject to change without notice.
          </p>
        </div>
      </div>
    </footer>
  );
}
