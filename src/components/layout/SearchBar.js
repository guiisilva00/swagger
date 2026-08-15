"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { formatPrice } from "@/lib/format";

const MAX_SUGGESTIONS = 5;

export default function SearchBar({ className = "", products = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const listboxId = useId();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const activeQueryRef = useRef(null);

  useEffect(() => {
    // Reads the URL's own `busca` param on mount/route change so the field
    // reflects an already-active search (e.g. a shared/bookmarked link).
    // `window.location` is a browser-only API — safe here since this only
    // runs client-side, never during the static build.
    const busca = new URLSearchParams(window.location.search).get("busca");
    activeQueryRef.current = busca;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(busca ?? "");
  }, [pathname]);

  const suggestions = useMemo(() => {
    const query = value.trim().toLowerCase();
    if (!query) return [];

    return products
      .filter((product) => product.title.toLowerCase().includes(query))
      .slice(0, MAX_SUGGESTIONS);
  }, [value, products]);

  function goToResults(query) {
    setOpen(false);
    router.push(
      query ? `/produtos?busca=${encodeURIComponent(query)}` : "/produtos"
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    goToResults(value.trim());
  }

  function handleClear() {
    setValue("");
    setOpen(false);
    if (activeQueryRef.current) {
      router.push("/produtos");
    }
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} role="search">
        <label htmlFor="search" className="sr-only">
          Buscar produtos
        </label>
        <div className="relative">
          <Search
            size={15}
            strokeWidth={1.8}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
          />
          <input
            id="search"
            type="search"
            role="combobox"
            aria-expanded={open && suggestions.length > 0}
            aria-controls={listboxId}
            aria-autocomplete="list"
            autoComplete="off"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 120)}
            placeholder="Buscar produtos"
            className="h-10 w-full rounded-md border border-border bg-surface pl-9 pr-8 text-sm text-foreground placeholder:text-subtle focus:border-border-strong focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Limpar busca"
              className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-muted hover:text-foreground"
            >
              <X size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
          )}
        </div>
      </form>

      {open && suggestions.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-md border border-border bg-surface shadow-lg"
        >
          {suggestions.map((product) => (
            <li key={product.id} role="option" aria-selected="false">
              <Link
                href={`/produto/${product.id}`}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-surface-2"
              >
                <span className="relative h-10 w-8 shrink-0 overflow-hidden rounded border border-border bg-surface">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    sizes="32px"
                    className="object-contain p-1"
                  />
                </span>
                <span className="line-clamp-1 flex-1">{product.title}</span>
                <span className="shrink-0 text-muted">
                  {formatPrice(product.price)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
