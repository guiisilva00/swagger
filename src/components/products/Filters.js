"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ALLOWED_CATEGORIES, CATEGORY_LABELS, categorySlug } from "@/lib/format";

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
  const [precoMin, setPrecoMin] = useState(searchParams.get("precoMin") ?? "");
  const [precoMax, setPrecoMax] = useState(searchParams.get("precoMax") ?? "");

  function updateParams(updates) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
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
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Categoria
        </p>
        <div className="flex flex-col gap-2">
          {CATEGORY_OPTIONS.map((option) => (
            <label
              key={option.slug || "todos"}
              className="flex items-center gap-2 text-sm text-zinc-300"
            >
              <input
                type="radio"
                name="categoria"
                checked={currentCategoria === option.slug}
                onChange={() => handleCategoryChange(option.slug)}
                className="h-4 w-4 border-zinc-700 accent-zinc-50"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <form onSubmit={handlePriceSubmit} className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
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
            className="h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-50 placeholder:text-zinc-500 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
          />
          <span className="text-zinc-600">–</span>
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
            className="h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-50 placeholder:text-zinc-500 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
          />
        </div>
        <button
          type="submit"
          className="h-10 rounded-md border border-zinc-700 text-sm font-medium text-zinc-50 hover:border-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
        >
          Aplicar preço
        </button>
      </form>

      <button
        type="button"
        onClick={handleClear}
        className="text-left text-xs uppercase tracking-wide text-zinc-500 underline-offset-4 hover:text-zinc-50 hover:underline"
      >
        Limpar filtros
      </button>
    </div>
  );
}
