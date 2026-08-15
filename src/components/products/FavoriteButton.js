"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoriteButton({ productId, className = "" }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(productId);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(productId);
      }}
      aria-pressed={active}
      aria-label={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/90 text-foreground transition-colors hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        active ? "text-foreground" : "text-subtle"
      } ${className}`}
    >
      <span key={active} className="inline-flex animate-pulse-scale">
        <Heart
          size={17}
          strokeWidth={1.75}
          fill={active ? "currentColor" : "none"}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
