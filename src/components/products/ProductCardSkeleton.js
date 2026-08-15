export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-[3/4] animate-pulse rounded-md border border-zinc-800 bg-zinc-900" />
      <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-900" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-900" />
      <div className="h-4 w-1/4 animate-pulse rounded bg-zinc-900" />
    </div>
  );
}
