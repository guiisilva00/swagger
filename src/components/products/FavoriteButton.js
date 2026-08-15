"use client";

import { useFavorites } from "@/context/FavoritesContext";

function HeartIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <path
        d="M12 21s-7.5-4.6-10-9.1C.5 8.7 2 5 5.6 5c2 0 3.5 1.1 4.4 2.6C10.9 6.1 12.4 5 14.4 5 18 5 19.5 8.7 22 11.9 19.5 16.4 12 21 12 21z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/90 text-zinc-50 transition-colors hover:border-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 ${
        active ? "text-zinc-50" : "text-zinc-400"
      } ${className}`}
    >
      <HeartIcon filled={active} />
    </button>
  );
}
