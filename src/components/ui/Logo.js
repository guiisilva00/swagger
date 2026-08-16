import Link from "next/link";
import Image from "next/image";
import { assetPath } from "@/lib/basePath";

const SOURCES = {
  color: "/brand/swagger-logo.webp",
  white: "/brand/swagger-logo-white.webp",
  dark: "/brand/swagger-logo-dark.webp",
};

// Intrinsic ratio of the trimmed lockup (1130x512)
const RATIO = 512 / 1130;

export default function Logo({
  variant = "color",
  href = "/",
  width = 132,
  className = "",
  imageClassName = "",
  priority = false,
  ariaLabel = "SWAGGER",
}) {
  const image = (
    <Image
      src={assetPath(SOURCES[variant])}
      alt={href ? "" : ariaLabel}
      width={width}
      height={Math.round(width * RATIO)}
      priority={priority}
      className={`h-auto w-full select-none ${imageClassName}`}
    />
  );

  if (!href) {
    return (
      <span className={`inline-block ${className}`} style={{ width }} role="img" aria-label={ariaLabel}>
        {image}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
      style={{ width }}
    >
      {image}
    </Link>
  );
}
