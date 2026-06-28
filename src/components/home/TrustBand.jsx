import { Icon } from "@iconify/react";

const VERIFICATION_STEPS = [
  {
    icon: "lucide:file-check",
    title: "Title documents reviewed",
    description:
      "Survey plans, C of O, and deed of assignment are checked against listing claims.",
  },
  {
    icon: "lucide:user-check",
    title: "Licensed agents only",
    description:
      "Every agent profile is tied to a registered brokerage before they can publish.",
  },
  {
    icon: "lucide:map-pin",
    title: "On-site inspection",
    description:
      "Book a free visit through SellingPoint before you commit — no pressure, no surprises.",
  },
];

export default function TrustBand() {
  return (
    <section
      id="trust"
      className="section-padding border-y border-slate-200/80 bg-white"
      aria-labelledby="trust-band-heading"
    >
      <div className="page-container">
        <div className="mb-12 max-w-2xl">
          <p className="section-eyebrow">Why trust SellingPoint</p>
          <h2 id="trust-band-heading" className="section-title mb-3">
            Verification you can see — not just a badge
          </h2>
          <p className="text-sm leading-8 text-slate-500">
            We reduce the risk of land fraud by combining document checks, vetted
            agents, and a structured inspection flow. Always conduct your own legal
            due diligence before purchase.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {VERIFICATION_STEPS.map((step) => (
            <article
              key={step.title}
              className="card-hover rounded-2xl border border-slate-200/70 bg-surface-muted/50 p-7"
            >
              <div className="bg-secondary/10 text-secondary mb-5 flex h-12 w-12 items-center justify-center rounded-xl">
                <Icon icon={step.icon} className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">{step.title}</h3>
              <p className="text-sm leading-7 text-slate-500">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
