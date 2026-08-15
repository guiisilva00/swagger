"use client";

import { useFavorites } from "@/context/FavoritesContext";
import ProductGrid from "@/components/products/ProductGrid";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

export default function FavoritesGrid({ products }) {
  const { ids } = useFavorites();
  const favoriteProducts = products.filter((product) => ids.includes(product.id));

  if (favoriteProducts.length === 0) {
    return (
      <EmptyState
        title="Você ainda não tem favoritos"
        description="Toque no coração de um produto para salvá-lo aqui."
        action={
          <Button href="/produtos" variant="secondary">
            Explorar produtos
          </Button>
        }
      />
    );
  }

  return <ProductGrid products={favoriteProducts} />;
}
