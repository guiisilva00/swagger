"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SORT_OPTIONS, buildFilterHref } from "@/lib/filters";

export default function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("ordenar") ?? "relevancia";

  function handleChange(event) {
    const value = event.target.value;
    router.push(
      buildFilterHref(pathname, searchParams, {
        ordenar: value === "relevancia" ? null : value,
      })
    );
  }

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="ordenar"
        className="text-xs uppercase tracking-wide text-muted"
      >
        Ordenar
      </label>
      <select
        id="ordenar"
        value={current}
        onChange={handleChange}
        className="h-10 rounded-md border border-border bg-surface px-3 text-sm text-foreground focus:border-border-strong focus:outline-none focus:ring-1 focus:ring-ring"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
