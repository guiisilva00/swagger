import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Carregando produtos"
      className="mx-auto w-full max-w-7xl flex-1 px-6 py-12 sm:px-8"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr]">
        <div className="hidden md:block" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
