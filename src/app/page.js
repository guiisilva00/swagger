import Hero from "@/components/home/Hero";
import BenefitsBar from "@/components/home/BenefitsBar";
import CategoryTiles from "@/components/home/CategoryTiles";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import EditorialSection from "@/components/home/EditorialSection";
import FinalCta from "@/components/home/FinalCta";
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

  return (
    <>
      <Hero />
      <BenefitsBar />
      <CategoryTiles />
      <FeaturedProducts products={featured} />
      <EditorialSection />
      <FinalCta />
    </>
  );
}
