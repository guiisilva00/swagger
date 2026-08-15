import { formatPrice } from "@/lib/format";

export default function PriceTag({ value, className = "" }) {
  return (
    <span className={`font-semibold text-foreground ${className}`}>
      {formatPrice(value)}
    </span>
  );
}
