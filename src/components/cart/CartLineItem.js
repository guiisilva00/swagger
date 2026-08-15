"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import QuantityStepper from "@/components/ui/QuantityStepper";

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
        <p className="text-sm text-zinc-500">
          {formatPrice(item.price)}
          {item.quantity > 1 && (
            <span className="text-zinc-600"> × {item.quantity}</span>
          )}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <QuantityStepper
            size="sm"
            value={item.quantity}
            onChange={(quantity) => setQuantity(item.id, quantity)}
          />

          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-zinc-50">
              {formatPrice(item.price * item.quantity)}
            </span>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="text-xs uppercase tracking-wide text-zinc-500 underline-offset-4 hover:text-zinc-50 hover:underline"
            >
              Remover
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
