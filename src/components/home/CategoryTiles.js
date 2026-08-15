import Link from "next/link";
import Image from "next/image";

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
      <p className="mb-8 text-xs uppercase tracking-wide text-muted">
        Explore por categoria
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {TILES.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className="group relative flex h-64 items-end overflow-hidden rounded-md border border-border sm:h-80"
          >
            <Image
              src={tile.image}
              alt=""
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="relative px-6 pb-6 text-lg font-semibold uppercase tracking-wide text-white">
              {tile.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
