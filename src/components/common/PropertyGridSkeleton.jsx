import PropertyCardSkeleton from "./PropertyCardSkeleton";

export default function PropertyGridSkeleton({
  count = 6,
  className = "grid gap-6 md:grid-cols-2 xl:grid-cols-3",
  label = "Loading properties",
}) {
  return (
    <div className={className} aria-busy="true" aria-label={label}>
      {Array.from({ length: count }).map((_, index) => (
        <PropertyCardSkeleton key={index} />
      ))}
    </div>
  );
}
