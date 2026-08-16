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
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-surface-2">
          <div className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="mt-3 flex flex-col gap-1.5">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-subtle">
            <span>SWG / {String(product.id).padStart(3, "0")}</span>
            <span>{categoryLabel(product.category)}</span>
          </div>
          <h3 className="line-clamp-2 text-sm font-semibold uppercase leading-snug text-foreground">
            {product.title}
          </h3>
          <div className="mt-1 flex items-center justify-between">
            <PriceTag value={product.price} className="text-base" />
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
