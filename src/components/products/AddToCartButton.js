"use client";

import { useCart } from "@/context/CartContext";

export default function AddToCartButton({
  product,
  quantity = 1,
  size = null,
  className = "",
  disabled = false,
}) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() =>
        addItem(
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
          },
          quantity,
          size
        )
      }
      className={`inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 text-sm font-semibold uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 ${className}`}
    >
      Adicionar ao Carrinho
    </button>
  );
}
