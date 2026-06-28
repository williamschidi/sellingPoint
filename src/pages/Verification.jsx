import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import ListPropertyButton from "../components/auth/ListPropertyButton.jsx";
import PageShell from "../components/common/PageShell";
import { usePageMeta } from "../hooks/usePageMeta";

const STEPS = [
  {
    title: "Listing submission",
    body: "Agents submit property details, title document summaries, and supporting evidence for review.",
  },
  {
    title: "Document review",
    body: "Our team checks document availability, consistency, and agent licensing before approval.",
  },
  {
    title: "Verification badge",
    body: "Approved listings display a verification badge. Pending listings remain visible with clear status.",
  },
  {
    title: "Ongoing monitoring",
    body: "Reports from buyers and post-inspection feedback can trigger re-review of a listing.",
  },
];

export default function Verification() {
  usePageMeta({
    title: "Verification framework",
    description:
      "Learn how SellingPoint verifies land listings, title documents, and licensed agents before properties appear on the marketplace.",
    path: "/verification",
  });

  return (
    <PageShell>
      <div className="prose-page">
        <p className="section-eyebrow">Trust &amp; safety</p>
        <h1 className="mb-4 font-serif text-3xl tracking-tight text-slate-900 lg:text-4xl">
          How SellingPoint verifies listings
        </h1>
        <p className="mb-10 text-sm leading-8 text-slate-600">
          Verification is designed to help buyers identify listings where title
          documents and agent credentials have been reviewed. It is not a
          guarantee of title or a substitute for independent legal due diligence.
        </p>

        <ol className="space-y-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="surface-panel p-6">
              <div className="mb-2 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h2 className="text-base font-semibold text-slate-900">{step.title}</h2>
              </div>
              <p className="text-sm leading-7 text-slate-600">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 rounded-2xl border border-amber-200/80 bg-amber-50/80 p-6 text-sm leading-7 text-amber-900">
          <strong className="mb-2 flex items-center gap-2 font-semibold">
            <Icon icon="lucide:alert-triangle" className="h-4 w-4" aria-hidden />
            Important
          </strong>
          Verified status means our team has reviewed submitted documentation at
          listing level. Always request certified copies and conduct independent
          survey and legal searches before purchase.
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/properties" className="btn-primary">
            Browse verified listings
          </Link>
          <ListPropertyButton className="btn-ghost">
            Submit a listing for review
          </ListPropertyButton>
        </div>
      </div>
    </PageShell>
  );
}
