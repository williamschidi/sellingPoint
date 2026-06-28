import { Link } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Terms() {
  usePageMeta({
    title: "Terms of Service",
    description: "Terms for using SellingPoint to discover verified land listings and book property inspections.",
    path: "/terms",
  });

  return (
    <PageShell>
      <article className="prose-page">
        <p className="section-eyebrow">Legal</p>
        <h1>Terms of Service</h1>
        <p className="mb-8 text-slate-500">
          Last updated: June 2026. By using SellingPoint you agree to the following
          terms.
        </p>
        <div className="space-y-8">
          <section className="surface-panel p-6">
            <h2>Platform role</h2>
            <p className="mt-3">
              SellingPoint is a property discovery and listing platform. We connect
              buyers with licensed agents but do not guarantee transactions, title
              validity, or property condition.
            </p>
          </section>
          <section className="surface-panel p-6">
            <h2>Due diligence</h2>
            <p className="mt-3">
              Buyers must conduct independent legal and physical due diligence before
              any purchase. Verification badges indicate document review status, not
              a guarantee of ownership. See our{" "}
              <Link to="/verification" className="font-semibold text-primary hover:underline">
                verification framework
              </Link>{" "}
              for details.
            </p>
          </section>
          <section className="surface-panel p-6">
            <h2>Inspection bookings</h2>
            <p className="mt-3">
              Inspection requests are subject to agent availability. SellingPoint
              does not charge buyers for booking through this platform.
            </p>
          </section>
        </div>
        <Link to="/" className="btn-ghost mt-10">
          ← Back to home
        </Link>
      </article>
    </PageShell>
  );
}
