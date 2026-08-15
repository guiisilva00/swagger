"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
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
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface py-1.5 pl-3 pr-2 text-xs text-muted transition-colors hover:border-border-strong hover:text-foreground"
        >
          {chip.label}
          <X size={12} strokeWidth={2} aria-hidden="true" className="text-subtle" />
          <span className="sr-only">Remover filtro {chip.label}</span>
        </button>
      ))}

      {chips.length > 1 && (
        <button
          type="button"
          onClick={() => router.push(pathname)}
          className="text-xs uppercase tracking-wide text-muted underline-offset-4 hover:text-foreground hover:underline"
        >
          Limpar tudo
        </button>
      )}
    </div>
  );
}
