import Skeleton from "./Skeleton";

export default function PropertyCardSkeleton() {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="space-y-3 px-5 py-5">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-9 w-24 rounded-xl" />
        </div>
      </div>
    </article>
  );
}
