import { Suspense } from "react";
import { getProducts } from "@/services/api";
import { isStoreCategory } from "@/lib/format";
import ProdutosResults from "@/components/products/ProdutosResults";

export const metadata = {
  title: "Produtos",
  description:
    "Explore toda a coleção SWAGGER: masculino, feminino e acessórios.",
};

export default async function ProdutosPage() {
  const products = await getProducts();
  const storeProducts = products.filter((product) =>
    isStoreCategory(product.category)
  );

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-6 py-12 sm:px-8">
      <Suspense>
        <ProdutosResults products={storeProducts} />
      </Suspense>
    </div>
  );
}
