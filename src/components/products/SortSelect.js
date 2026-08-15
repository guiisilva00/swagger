"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SORT_OPTIONS } from "@/lib/filters";

export default function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("ordenar") ?? "relevancia";

  function handleChange(event) {
    const params = new URLSearchParams(searchParams.toString());
    const value = event.target.value;

    if (value === "relevancia") {
      params.delete("ordenar");
    } else {
      params.set("ordenar", value);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="ordenar"
        className="text-xs uppercase tracking-wide text-zinc-500"
      >
        Ordenar
      </label>
      <select
        id="ordenar"
        value={current}
        onChange={handleChange}
        className="h-10 rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-50 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
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
