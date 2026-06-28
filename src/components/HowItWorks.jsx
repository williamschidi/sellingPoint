import { Icon } from "@iconify/react";

export default function HowItWorks() {
  const steps = [
    {
      name: "Search",
      icon: "lucide:search",
      desc: "Filter by state, price, and keywords to find documented land that matches your budget.",
    },
    {
      name: "Verify",
      icon: "lucide:shield-check",
      desc: "Review title documents, agent credentials, and verification status on every listing.",
    },
    {
      name: "Inspect",
      icon: "lucide:calendar-check",
      desc: "Book a free on-site visit at a time that works — our key differentiator for serious buyers.",
    },
    {
      name: "Secure",
      icon: "lucide:handshake",
      desc: "Complete your purchase with your lawyer and agent, backed by transparent listing data.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="section-padding relative overflow-hidden bg-linear-to-b from-surface-muted to-white"
      aria-labelledby="how-it-works-heading"
    >
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-secondary/5 blur-3xl"
        aria-hidden
      />

      <div className="page-container relative">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="section-eyebrow mb-4">Simple process</p>

          <h2 id="how-it-works-heading" className="section-title mb-4">
            How SellingPoint works
          </h2>

          <p className="text-sm leading-8 text-slate-500 lg:text-base">
            From discovery to deed — a land-buying journey designed for clarity,
            not confusion. Inspection booking is built in, not bolted on.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.name}
              className="card-hover group relative rounded-2xl border border-slate-200/70 bg-white p-7"
            >
              <div
                className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-400 transition-colors duration-200 group-hover:bg-primary-subtle group-hover:text-primary"
                aria-hidden
              >
                {index + 1}
              </div>

              <div className="bg-secondary/8 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-secondary/10 transition-transform duration-200 group-hover:scale-105">
                <Icon icon={step.icon} className="h-6 w-6 text-secondary" aria-hidden />
              </div>

              <h3 className="mb-2.5 text-base font-semibold text-slate-900">{step.name}</h3>

              <p className="text-sm leading-7 text-slate-500">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
