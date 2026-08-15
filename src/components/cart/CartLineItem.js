"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function CartLineItem({ item }) {
  const { setQuantity, removeItem } = useCart();

  return (
    <li className="flex gap-4 border-b border-zinc-800 py-4 last:border-0">
      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md border border-zinc-800 bg-zinc-950">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="64px"
          className="object-contain p-1"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <p className="line-clamp-2 text-sm font-medium text-zinc-50">
          {item.title}
        </p>
        <p className="text-sm text-zinc-500">{formatPrice(item.price)}</p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center rounded-md border border-zinc-800">
            <button
              type="button"
              onClick={() => setQuantity(item.id, item.quantity - 1)}
              aria-label="Diminuir quantidade"
              className="flex h-8 w-8 items-center justify-center text-zinc-50 hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
            >
              −
            </button>
            <span className="w-6 text-center text-sm text-zinc-50">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(item.id, item.quantity + 1)}
              aria-label="Aumentar quantidade"
              className="flex h-8 w-8 items-center justify-center text-zinc-50 hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="text-xs uppercase tracking-wide text-zinc-500 underline-offset-4 hover:text-zinc-50 hover:underline"
          >
            Remover
          </button>
        </div>
      </div>
    </li>
  );
}
