import Skeleton from "./Skeleton";

export default function PropertyDetailSkeleton() {
  return (
    <div className="min-h-screen bg-surface-muted">
      <div className="border-b border-slate-200/80 bg-white px-4 py-3.5 lg:px-10">
        <Skeleton className="h-4 w-64 max-w-full" />
      </div>
      <div className="mx-auto max-w-7xl px-4 pt-6 pb-14 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          <section className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-9 w-full max-w-xl" />
              <Skeleton className="h-4 w-72 max-w-full" />
            </div>
            <Skeleton className="h-70 w-full rounded-2xl md:h-90" />
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-16 rounded-xl md:h-18" />
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-20 rounded-2xl" />
              ))}
            </div>
          </section>
          <aside className="space-y-4">
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-56 rounded-2xl" />
          </aside>
        </div>
      </div>
    </div>
  );
}
