import PropertyCardSkeleton from "./PropertyCardSkeleton";
import Skeleton from "./Skeleton";

export default function HomeCatalogSkeleton() {
  return (
    <div className="section-padding bg-white" aria-busy="true" aria-label="Loading listings">
      <div className="page-container space-y-16">
        <section>
          <Skeleton className="mb-3 h-3 w-32" />
          <Skeleton className="mb-8 h-8 w-56" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <Skeleton className="h-36 w-full rounded-none" />
                <div className="space-y-2 p-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <Skeleton className="mb-3 h-3 w-32" />
          <Skeleton className="mb-8 h-8 w-48" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
