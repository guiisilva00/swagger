import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/services/api";
import { categoryLabel, categorySlug } from "@/lib/format";
import Breadcrumbs from "@/components/products/Breadcrumbs";
import PurchaseActions from "@/components/products/PurchaseActions";
import RelatedProducts from "@/components/products/RelatedProducts";
import PriceTag from "@/components/ui/PriceTag";

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    id: String(product.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return { title: "Produto não encontrado" };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const related = allProducts
    .filter(
      (item) => item.category === product.category && item.id !== product.id
    )
    .sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
    .slice(0, 4);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    {
      label: categoryLabel(product.category),
      href: `/produtos?categoria=${categorySlug(product.category)}`,
    },
    { label: product.title },
  ];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: [product.image],
    description: product.description,
    category: categoryLabel(product.category),
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
    },
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating.rate,
        reviewCount: product.rating.count,
      },
    }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: item.href }),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 sm:px-8">
        <Breadcrumbs items={breadcrumbItems} />

        <Link
          href="/produtos"
          className="text-xs uppercase tracking-wide text-zinc-500 transition-colors hover:text-zinc-50"
        >
          ← Voltar aos produtos
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="group relative aspect-square overflow-hidden rounded-md border border-zinc-800 bg-zinc-950">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain p-10 transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              {categoryLabel(product.category)}
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
              {product.title}
            </h1>

            {product.rating && (
              <p className="mt-2 text-sm text-zinc-500">
                ★ {product.rating.rate.toFixed(1)} · {product.rating.count}{" "}
                avaliações
              </p>
            )}

            <PriceTag value={product.price} className="mt-4 text-3xl" />

            <p className="mt-6 text-base leading-7 text-zinc-400">
              {product.description}
            </p>

            <PurchaseActions product={product} />
          </div>
        </div>
      </div>

      <RelatedProducts products={related} />
    </>
  );
}
