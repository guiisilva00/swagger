"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Badge from "@/components/ui/Badge";

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
      className="relative flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <ShoppingBag size={20} strokeWidth={1.6} aria-hidden="true" />
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
