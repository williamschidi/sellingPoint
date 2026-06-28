import { Link } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import PageShell from "../components/common/PageShell";
import { usePageMeta } from "../hooks/usePageMeta";

export default function NotFound() {
  usePageMeta({
    title: "Page not found",
    description: "The page you requested could not be found on SellingPoint.",
  });

  return (
    <PageShell variant="full" className="flex min-h-[60vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md animate-fade-in-up">
        <EmptyState
          icon="lucide:map-pin-off"
          title="Page not found"
          description="The page you are looking for does not exist or may have moved."
          actionLabel="Go home"
          actionTo="/"
        />
        <div className="mt-4 text-center">
          <Link
            to="/properties"
            className="text-sm font-semibold text-primary transition hover:underline"
          >
            Browse properties →
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
