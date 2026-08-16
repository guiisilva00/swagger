"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Heart, User } from "lucide-react";
import Nav from "./Nav";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import CartIcon from "@/components/cart/CartIcon";
import Badge from "@/components/ui/Badge";
import Logo from "@/components/ui/Logo";
import { useFavorites } from "@/context/FavoritesContext";

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
        className={`sticky top-0 z-40 bg-surface/95 backdrop-blur transition-colors ${
          scrolled ? "border-b border-border" : "border-b border-transparent"
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
            className="flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-surface-2 md:hidden"
          >
            <Menu size={22} strokeWidth={1.6} aria-hidden="true" />
          </button>

          <Logo
            variant="color"
            width={112}
            priority
            className="logo-tilt"
          />

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
              className="relative hidden h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:flex"
            >
              <Heart size={19} strokeWidth={1.6} aria-hidden="true" />
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
              className="hidden h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:flex"
            >
              <User size={20} strokeWidth={1.6} aria-hidden="true" />
            </Link>

            <ThemeToggle className="hidden sm:flex" />

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
