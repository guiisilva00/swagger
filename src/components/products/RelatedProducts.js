import ProductGrid from "@/components/products/ProductGrid";

export default function RelatedProducts({ products }) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8">
      <p className="mb-2 text-xs uppercase tracking-wide text-muted">
        Combine com
      </p>
      <h2 className="mb-8 text-2xl font-semibold tracking-tight text-foreground">
        Você também pode gostar
      </h2>
      <ProductGrid products={products} />
    </section>
  );
}
