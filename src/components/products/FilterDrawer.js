"use client";

import { useState } from "react";
import Filters from "./Filters";

export default function FilterDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-10 rounded-md border border-zinc-700 px-4 text-sm font-medium text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
      >
        Filtrar
      </button>

      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filtros"
          className={`absolute bottom-0 left-0 max-h-[85vh] w-full overflow-y-auto rounded-t-lg border-t border-zinc-800 bg-zinc-950 p-6 transition-transform duration-300 ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-50">
              Filtros
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar filtros"
              className="flex h-9 w-9 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-900 hover:text-zinc-50"
            >
              ✕
            </button>
          </div>

          <Filters onApply={() => setOpen(false)} />
        </div>
      </div>
    </div>
  );
}
