"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";
import Nav from "./Nav";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

export default function MobileMenu({ open, onClose, searchIndex = [] }) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 md:hidden ${
        open ? "" : "pointer-events-none"
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-overlay transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`absolute left-0 top-0 flex h-full w-full max-w-xs flex-col gap-8 border-r border-border bg-surface p-6 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold uppercase tracking-[0.2em] text-foreground"
          >
            SWAGGER
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="flex h-9 w-9 items-center justify-center rounded-md text-subtle hover:bg-surface-2 hover:text-foreground"
          >
            <X size={18} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>

        <SearchBar products={searchIndex} />

        <Nav className="flex flex-col items-start gap-5" />

        <div className="mt-auto flex flex-col gap-4 border-t border-border pt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm uppercase tracking-wide text-muted">
              Tema
            </span>
            <ThemeToggle />
          </div>
          <Link
            href="/favoritos"
            className="text-sm uppercase tracking-wide text-muted hover:text-foreground"
          >
            Favoritos
          </Link>
          <Link
            href="/conta"
            className="text-sm uppercase tracking-wide text-muted hover:text-foreground"
          >
            Minha Conta
          </Link>
        </div>
      </div>
    </div>
  );
}
