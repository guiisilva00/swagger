import Link from "next/link";
import Image from "next/image";
import { assetPath } from "@/lib/basePath";

const TILES = [
  {
    label: "Feminino",
    href: "/produtos?categoria=feminino",
    image: "/images/categories/feminino.jpg",
  },
  {
    label: "Masculino",
    href: "/produtos?categoria=masculino",
    image: "/images/categories/masculino.jpg",
  },
  {
    label: "Acessórios",
    href: "/produtos?categoria=acessorios",
    image: "/images/categories/acessorios.jpg",
  },
];

export default function CategoryTiles() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8">
      <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-muted">
        Explore por categoria
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {TILES.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className="group relative flex h-64 items-end overflow-hidden rounded-sm sm:h-80"
          >
            <Image
              src={assetPath(tile.image)}
              alt=""
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B160D]/85 via-[#1B160D]/15 to-transparent" />
            <div className="absolute inset-0 border border-white/0 transition-colors duration-300 group-hover:border-brand-yellow/70" />
            <div className="relative flex w-full items-center justify-between px-6 pb-6">
              <span className="font-display text-2xl uppercase tracking-tight text-white">
                {tile.label}
              </span>
              <span className="font-mono text-xs uppercase tracking-wide text-brand-yellow opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Explorar ↗
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
