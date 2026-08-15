"use client";

import { useState } from "react";
import QuantityStepper from "@/components/ui/QuantityStepper";
import AddToCartButton from "@/components/products/AddToCartButton";
import FavoriteButton from "@/components/products/FavoriteButton";

export default function PurchaseActions({ product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-8 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-xs uppercase tracking-wide text-zinc-500">
          Quantidade
        </span>
        <QuantityStepper value={quantity} onChange={setQuantity} />
      </div>

      <div className="flex items-center gap-3">
        <AddToCartButton
          product={product}
          quantity={quantity}
          className="flex-1 sm:flex-none"
        />
        <FavoriteButton productId={product.id} className="static h-12 w-12" />
      </div>
    </div>
  );
}
