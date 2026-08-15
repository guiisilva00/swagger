import { getProducts } from "@/services/api";
import { isStoreCategory } from "@/lib/format";
import { filterProducts, sortProducts } from "@/lib/filters";
import ProductGrid from "@/components/products/ProductGrid";
import Filters from "@/components/products/Filters";
import FilterDrawer from "@/components/products/FilterDrawer";
import SortSelect from "@/components/products/SortSelect";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Produtos",
  description:
    "Explore toda a coleção SWAGGER: masculino, feminino e acessórios.",
};

export default async function ProdutosPage({ searchParams }) {
  const params = await searchParams;
  const products = await getProducts();
  const storeProducts = products.filter((product) =>
    isStoreCategory(product.category)
  );

  const filtered = filterProducts(storeProducts, {
    categoria: params.categoria,
    precoMin: params.precoMin,
    precoMax: params.precoMax,
    busca: params.busca,
  });

  const sorted = sortProducts(filtered, params.ordenar);

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-6 py-12 sm:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Coleção completa
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            Produtos
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            {sorted.length} {sorted.length === 1 ? "produto" : "produtos"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <FilterDrawer />
          <SortSelect />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr]">
        <aside className="hidden md:block">
          <Filters />
        </aside>

        <div>
          {sorted.length === 0 ? (
            <EmptyState
              title="Nenhum produto encontrado"
              description="Tente ajustar os filtros ou limpar a busca."
              action={
                <Button href="/produtos" variant="secondary">
                  Limpar filtros
                </Button>
              }
            />
          ) : (
            <ProductGrid products={sorted} />
          )}
        </div>
      </div>
    </div>
  );
}
