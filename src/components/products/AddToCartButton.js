"use client";

import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product, className = "" }) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() =>
        addItem({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        })
      }
      className={`inline-flex h-12 items-center justify-center rounded-md bg-zinc-50 px-6 text-sm font-semibold uppercase tracking-wide text-zinc-950 transition-colors hover:bg-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${className}`}
    >
      Adicionar ao Carrinho
    </button>
  );
}
