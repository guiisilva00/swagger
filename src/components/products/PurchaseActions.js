"use client";

import { useState } from "react";
import QuantityStepper from "@/components/ui/QuantityStepper";
import AddToCartButton from "@/components/products/AddToCartButton";
import FavoriteButton from "@/components/products/FavoriteButton";
import ProductSizeSelector from "@/components/products/ProductSizeSelector";
import { getSizesForCategory } from "@/lib/sizes";

export default function PurchaseActions({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);

  const sizes = getSizesForCategory(product.category);
  const needsSize = Boolean(sizes);
  const canAdd = !needsSize || Boolean(size);

  return (
    <div className="mt-8 flex flex-col gap-6">
      {needsSize && (
        <ProductSizeSelector sizes={sizes} value={size} onChange={setSize} />
      )}

      <div className="flex items-center gap-3">
        <span className="text-xs uppercase tracking-wide text-muted">
          Quantidade
        </span>
        <QuantityStepper value={quantity} onChange={setQuantity} />
      </div>

      <div>
        <div className="flex items-center gap-3">
          <AddToCartButton
            product={product}
            quantity={quantity}
            size={size}
            disabled={!canAdd}
            className="flex-1 sm:flex-none"
          />
          <FavoriteButton
            productId={product.id}
            className="static h-12 w-12"
          />
        </div>
        {needsSize && !size && (
          <p className="mt-2 text-xs text-muted">Selecione um tamanho.</p>
        )}
      </div>
    </div>
  );
}
