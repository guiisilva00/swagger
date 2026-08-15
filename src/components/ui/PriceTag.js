import { formatPrice } from "@/lib/format";

export default function PriceTag({ value, className = "" }) {
  return (
    <span className={`font-semibold text-zinc-50 ${className}`}>
      {formatPrice(value)}
    </span>
  );
}
