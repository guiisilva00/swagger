"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "./Nav";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import CartIcon from "@/components/cart/CartIcon";
import Badge from "@/components/ui/Badge";
import { useFavorites } from "@/context/FavoritesContext";

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function HeartOutlineIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path
        d="M12 21s-7.5-4.6-10-9.1C.5 8.7 2 5 5.6 5c2 0 3.5 1.1 4.4 2.6C10.9 6.1 12.4 5 14.4 5 18 5 19.5 8.7 22 11.9 19.5 16.4 12 21 12 21z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.2" />
      <path
        d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Header({ searchIndex = [] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useFavorites();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-zinc-950 transition-colors ${
          scrolled ? "border-b border-zinc-800" : "border-b border-transparent"
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-7xl items-center justify-between px-6 transition-[height] duration-300 sm:px-8 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
            className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-50 hover:bg-zinc-900 md:hidden"
          >
            <MenuIcon />
          </button>

          <Link
            href="/"
            className="text-xl font-semibold uppercase tracking-[0.2em] text-zinc-50"
          >
            SWAGGER
          </Link>

          <Nav className="hidden items-center gap-8 md:flex" />

          <div className="flex items-center gap-1">
            <SearchBar
              className="hidden w-48 lg:block"
              products={searchIndex}
            />

            <Link
              href="/favoritos"
              aria-label={
                count > 0 ? `Favoritos (${count})` : "Favoritos"
              }
              className="relative hidden h-10 w-10 items-center justify-center rounded-md text-zinc-50 transition-colors hover:bg-zinc-900 sm:flex"
            >
              <HeartOutlineIcon />
              {count > 0 && (
                <Badge
                  key={count}
                  className="absolute -right-1 -top-1 animate-pulse-scale"
                >
                  {count}
                </Badge>
              )}
            </Link>

            <Link
              href="/conta"
              aria-label="Minha conta"
              className="hidden h-10 w-10 items-center justify-center rounded-md text-zinc-50 transition-colors hover:bg-zinc-900 sm:flex"
            >
              <UserIcon />
            </Link>

            <CartIcon />
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        searchIndex={searchIndex}
      />
    </>
  );
}
