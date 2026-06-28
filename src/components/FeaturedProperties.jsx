import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import { useToggleSavedWithToast } from "../hooks/useToggleSavedWithToast";

export default function FeaturedProperties({ properties = [] }) {
  const { isSaved, handleToggleSave } = useToggleSavedWithToast();

  if (properties.length === 0) return null;

  return (
    <section className="section-padding bg-white" aria-labelledby="featured-heading">
      <div className="page-container">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="section-eyebrow">Verified listings</p>
            <h2 id="featured-heading" className="section-title">
              Featured properties
            </h2>
            <p className="mt-2.5 text-sm text-slate-500">
              Hand-picked plots with verified documentation and active agents.
            </p>
          </div>

          <Link
            to="/properties"
            className="btn-ghost hidden shrink-0 border-primary/15 text-primary hover:bg-primary-subtle sm:inline-flex"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              showBookInspection
              isSaved={isSaved(property.id)}
              onToggleSave={handleToggleSave}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
