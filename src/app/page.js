import Hero from "@/components/home/Hero";
import CategoryTiles from "@/components/home/CategoryTiles";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { getProducts } from "@/services/api";
import { isStoreCategory } from "@/lib/format";

export default async function Home() {
  const products = await getProducts();
  const storeProducts = products.filter((product) =>
    isStoreCategory(product.category)
  );

  const featured = [...storeProducts]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 8);

  const accentProducts = [
    storeProducts.find((product) => product.category === "women's clothing"),
    storeProducts.find((product) => product.category === "men's clothing"),
  ].filter(Boolean);

  return (
    <>
      <Hero accentProducts={accentProducts} />
      <CategoryTiles />
      <FeaturedProducts products={featured} />
    </>
  );
}
