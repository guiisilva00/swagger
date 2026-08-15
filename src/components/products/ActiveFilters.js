"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { buildFilterHref, describeActiveFilters } from "@/lib/filters";

export default function ActiveFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const chips = describeActiveFilters(searchParams);

  if (chips.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() =>
            router.push(buildFilterHref(pathname, searchParams, chip.updates))
          }
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-950 py-1.5 pl-3 pr-2 text-xs text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-50"
        >
          {chip.label}
          <span aria-hidden="true" className="text-zinc-500">
            ✕
          </span>
          <span className="sr-only">Remover filtro {chip.label}</span>
        </button>
      ))}

      {chips.length > 1 && (
        <button
          type="button"
          onClick={() => router.push(pathname)}
          className="text-xs uppercase tracking-wide text-zinc-500 underline-offset-4 hover:text-zinc-50 hover:underline"
        >
          Limpar tudo
        </button>
      )}
    </div>
  );
}
