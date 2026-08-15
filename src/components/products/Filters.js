"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ALLOWED_CATEGORIES, CATEGORY_LABELS, categorySlug } from "@/lib/format";
import { buildFilterHref } from "@/lib/filters";

const CATEGORY_OPTIONS = [
  { slug: "", label: "Todos" },
  ...ALLOWED_CATEGORIES.map((category) => ({
    slug: categorySlug(category),
    label: CATEGORY_LABELS[category],
  })),
];

export default function Filters({ onApply }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategoria = searchParams.get("categoria") ?? "";
  const urlPrecoMin = searchParams.get("precoMin") ?? "";
  const urlPrecoMax = searchParams.get("precoMax") ?? "";

  const [priceInputs, setPriceInputs] = useState({
    min: urlPrecoMin,
    max: urlPrecoMax,
    syncedWith: `${urlPrecoMin}|${urlPrecoMax}`,
  });

  // Keep the (editable) local inputs in sync when the URL's price filter
  // changes from outside this form — e.g. a chip removed in ActiveFilters.
  if (priceInputs.syncedWith !== `${urlPrecoMin}|${urlPrecoMax}`) {
    setPriceInputs({
      min: urlPrecoMin,
      max: urlPrecoMax,
      syncedWith: `${urlPrecoMin}|${urlPrecoMax}`,
    });
  }

  const precoMin = priceInputs.min;
  const precoMax = priceInputs.max;
  const setPrecoMin = (value) =>
    setPriceInputs((prev) => ({ ...prev, min: value }));
  const setPrecoMax = (value) =>
    setPriceInputs((prev) => ({ ...prev, max: value }));

  function updateParams(updates) {
    router.push(buildFilterHref(pathname, searchParams, updates));
    onApply?.();
  }

  function handleCategoryChange(slug) {
    updateParams({ categoria: slug });
  }

  function handlePriceSubmit(event) {
    event.preventDefault();
    updateParams({ precoMin, precoMax });
  }

  function handleClear() {
    setPrecoMin("");
    setPrecoMax("");
    router.push(pathname);
    onApply?.();
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
          Categoria
        </p>
        <div className="flex flex-col gap-2">
          {CATEGORY_OPTIONS.map((option) => (
            <label
              key={option.slug || "todos"}
              className="flex items-center gap-2 text-sm text-foreground"
            >
              <input
                type="radio"
                name="categoria"
                checked={currentCategoria === option.slug}
                onChange={() => handleCategoryChange(option.slug)}
                className="h-4 w-4 border-border-strong accent-accent"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <form onSubmit={handlePriceSubmit} className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Preço
        </p>
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="precoMin">
            Preço mínimo
          </label>
          <input
            id="precoMin"
            type="number"
            min="0"
            inputMode="decimal"
            placeholder="Mín."
            value={precoMin}
            onChange={(event) => setPrecoMin(event.target.value)}
            className="h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-foreground placeholder:text-muted focus:border-border-strong focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <span className="text-subtle">–</span>
          <label className="sr-only" htmlFor="precoMax">
            Preço máximo
          </label>
          <input
            id="precoMax"
            type="number"
            min="0"
            inputMode="decimal"
            placeholder="Máx."
            value={precoMax}
            onChange={(event) => setPrecoMax(event.target.value)}
            className="h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-foreground placeholder:text-muted focus:border-border-strong focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <button
          type="submit"
          className="h-10 rounded-md border border-border-strong text-sm font-medium text-foreground hover:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Aplicar preço
        </button>
      </form>

      <button
        type="button"
        onClick={handleClear}
        className="text-left text-xs uppercase tracking-wide text-muted underline-offset-4 hover:text-foreground hover:underline"
      >
        Limpar filtros
      </button>
    </div>
  );
}
