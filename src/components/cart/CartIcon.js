"use client";

import { useCart } from "@/context/CartContext";
import Badge from "@/components/ui/Badge";

function BagIcon() {
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
      <path d="M6 8h12l-1 12H7L6 8z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}

export default function CartIcon() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={
        itemCount > 0
          ? `Abrir carrinho (${itemCount} ${itemCount === 1 ? "item" : "itens"})`
          : "Abrir carrinho"
      }
      className="relative flex h-10 w-10 items-center justify-center rounded-md text-zinc-50 transition-colors hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
    >
      <BagIcon />
      {itemCount > 0 && (
        <Badge
          key={itemCount}
          className="absolute -right-1 -top-1 animate-pulse-scale"
        >
          {itemCount}
        </Badge>
      )}
    </button>
  );
}
