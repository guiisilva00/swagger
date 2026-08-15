"use client";

import { useSearchParams } from "next/navigation";
import { filterProducts, sortProducts } from "@/lib/filters";
import ProductGrid from "@/components/products/ProductGrid";
import Filters from "@/components/products/Filters";
import FilterDrawer from "@/components/products/FilterDrawer";
import SortSelect from "@/components/products/SortSelect";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

export default function ProdutosResults({ products }) {
  const searchParams = useSearchParams();

  const filtered = filterProducts(products, {
    categoria: searchParams.get("categoria"),
    precoMin: searchParams.get("precoMin"),
    precoMax: searchParams.get("precoMax"),
    busca: searchParams.get("busca"),
  });

  const sorted = sortProducts(filtered, searchParams.get("ordenar"));

  return (
    <>
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
    </>
  );
}
