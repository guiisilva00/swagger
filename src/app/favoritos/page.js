import { getProducts } from "@/services/api";
import { isStoreCategory } from "@/lib/format";
import FavoritesGrid from "@/components/favorites/FavoritesGrid";

export const metadata = {
  title: "Favoritos",
  description: "Seus produtos favoritos na SWAGGER.",
};

export default async function FavoritosPage() {
  const products = await getProducts();
  const storeProducts = products.filter((product) =>
    isStoreCategory(product.category)
  );

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-6 py-12 sm:px-8">
      <p className="text-xs uppercase tracking-wide text-zinc-500">
        Sua seleção
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
        Favoritos
      </h1>

      <div className="mt-10">
        <FavoritesGrid products={storeProducts} />
      </div>
    </div>
  );
}
