import Link from "next/link";

const TILES = [
  { label: "Feminino", href: "/produtos?categoria=feminino" },
  { label: "Masculino", href: "/produtos?categoria=masculino" },
  { label: "Acessórios", href: "/produtos?categoria=acessorios" },
];

export default function CategoryTiles() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8">
      <p className="mb-8 text-xs uppercase tracking-wide text-zinc-500">
        Comprar por categoria
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {TILES.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className="group flex h-40 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 transition-colors hover:border-zinc-500 sm:h-56"
          >
            <span className="text-lg font-semibold uppercase tracking-wide text-zinc-50 transition-transform group-hover:scale-105">
              {tile.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
