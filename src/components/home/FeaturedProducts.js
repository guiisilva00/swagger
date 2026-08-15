import ProductGrid from "@/components/products/ProductGrid";
import Button from "@/components/ui/Button";

export default function FeaturedProducts({ products }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 sm:py-24">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Selecionados para você
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            Destaques
          </h2>
        </div>
        <Button
          href="/produtos"
          variant="secondary"
          className="hidden sm:inline-flex"
        >
          Ver tudo
        </Button>
      </div>

      <ProductGrid products={products} />

      <div className="mt-10 flex justify-center sm:hidden">
        <Button href="/produtos" variant="secondary">
          Ver tudo
        </Button>
      </div>
    </section>
  );
}
