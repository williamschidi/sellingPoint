import { Link } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Privacy() {
  usePageMeta({
    title: "Privacy Policy",
    description:
      "How SellingPoint collects, uses, and protects your personal information when you browse listings, save properties, and book inspections.",
    path: "/privacy",
  });

  return (
    <PageShell>
      <article className="prose-page">
        <p className="section-eyebrow">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="mb-8 text-slate-500">
          Last updated: June 2026. This policy describes how Selling Point Real
          Estate Brokers Network (&quot;SellingPoint&quot;) handles information when
          you use this website.
        </p>
        <div className="space-y-8">
          <section className="surface-panel p-6">
            <h2>Information we collect</h2>
            <p className="mt-3">
              When you browse listings, we may process usage data such as pages
              viewed and search filters applied to improve the marketplace
              experience. When you book an inspection, you provide a name and phone
              number so the listing agent can coordinate your visit.
            </p>
            <p className="mt-3">
              Saved properties and saved searches may be stored on your device
              until you sign in. Once account services are enabled, these
              preferences can be synced to your profile across devices.
            </p>
          </section>
          <section className="surface-panel p-6">
            <h2>How we use information</h2>
            <p className="mt-3">
              Inspection requests are shared with the listing agent to schedule
              your visit. We use contact details only for transaction-related
              communication related to listings you express interest in. We do not
              sell personal data to third parties.
            </p>
          </section>
          <section className="surface-panel p-6">
            <h2>Local storage on your device</h2>
            <p className="mt-3">
              Saved properties, saved searches, and inspection requests may be
              kept in your browser&apos;s local storage on this device. You can
              remove them in the app or by clearing site data in your browser
              settings.
            </p>
          </section>
          <section className="surface-panel p-6">
            <h2>Your choices</h2>
            <p className="mt-3">
              You may update or delete saved items at any time from the Saved
              properties page. When sign-in is available, you will be able to
              manage account data from your profile settings.
            </p>
          </section>
          <section className="surface-panel p-6">
            <h2>Contact</h2>
            <p className="mt-3">
              Questions about this policy:{" "}
              <a href="mailto:nnaa4good@gmail.com" className="font-semibold text-primary hover:underline">
                nnaa4good@gmail.com
              </a>
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
