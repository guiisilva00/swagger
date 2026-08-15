"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import Filters from "./Filters";

export default function FilterDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center gap-2 rounded-md border border-border-strong px-4 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <SlidersHorizontal size={15} strokeWidth={1.8} aria-hidden="true" />
        Filtrar
      </button>

      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-overlay transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filtros"
          className={`absolute bottom-0 left-0 max-h-[85vh] w-full overflow-y-auto rounded-t-lg border-t border-border bg-surface p-6 transition-transform duration-300 ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Filtros
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar filtros"
              className="flex h-9 w-9 items-center justify-center rounded-md text-subtle hover:bg-surface-2 hover:text-foreground"
            >
              <X size={18} strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>

          <Filters onApply={() => setOpen(false)} />
        </div>
      </div>
    </div>
  );
}
