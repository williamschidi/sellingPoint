import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="section-padding border-t border-slate-200/80 bg-surface-muted"
      aria-labelledby="about-heading"
    >
      <div className="page-container flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="section-eyebrow">About Selling Point</p>
          <h2 id="about-heading" className="section-title mb-4">
            More than listings — a brokerage network you can reach
          </h2>
          <p className="text-sm leading-8 text-slate-500">
            Selling Point Real Estate Brokers Network connects verified land
            buyers with licensed agents across Asaba, Awka, and growing markets
            nationwide. We combine digital discovery with on-the-ground expertise.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <a href="tel:+2348144002759" className="btn-ghost gap-2">
            <Icon icon="lucide:phone" className="h-4 w-4" aria-hidden />
            0814 400 2759
          </a>
          <a href="mailto:nnaa4good@gmail.com" className="btn-ghost gap-2">
            <Icon icon="lucide:mail" className="h-4 w-4" aria-hidden />
            Email us
          </a>
          <Link to="/properties" className="btn-primary gap-2">
            Browse properties
          </Link>
        </div>
      </div>
    </section>
  );
}
