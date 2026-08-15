import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import FavoriteButton from "./FavoriteButton";
import PriceTag from "@/components/ui/PriceTag";
import { categoryLabel } from "@/lib/format";

export default function ProductCard({ product }) {
  return (
    <div className="group relative flex flex-col">
      <Link
        href={`/produto/${product.id}`}
        className="flex flex-col focus-visible:outline-none"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-border bg-surface transition-colors group-hover:border-border-strong group-focus-visible:border-ring">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="mt-3 flex flex-col gap-1">
          <p className="text-[11px] uppercase tracking-wide text-muted">
            {categoryLabel(product.category)}
          </p>
          <h3 className="line-clamp-2 text-sm text-foreground">
            {product.title}
          </h3>
          <div className="mt-1 flex items-center justify-between">
            <PriceTag value={product.price} />
            {product.rating && (
              <span className="flex items-center gap-1 text-xs text-muted">
                <Star size={12} strokeWidth={1.6} fill="currentColor" aria-hidden="true" />
                {product.rating.rate.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </Link>

      <FavoriteButton productId={product.id} className="absolute right-3 top-3" />
    </div>
  );
}
