import Link from "next/link";

const COLUMNS = [
  {
    title: "Compre",
    links: [
      { label: "Masculino", href: "/produtos?categoria=masculino" },
      { label: "Feminino", href: "/produtos?categoria=feminino" },
      { label: "Acessórios", href: "/produtos?categoria=acessorios" },
      { label: "Todos os produtos", href: "/produtos" },
    ],
  },
  {
    title: "Conta",
    links: [
      { label: "Entrar", href: "/conta/login" },
      { label: "Criar conta", href: "/conta/cadastro" },
      { label: "Favoritos", href: "/favoritos" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="text-xl font-semibold uppercase tracking-[0.2em] text-zinc-50">
            SWAGGER
          </p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-500">
            Moda que representa você.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              {column.title}
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-300 transition-colors hover:text-zinc-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-800 px-6 py-6 text-center text-xs text-zinc-600 sm:px-8">
        © {new Date().getFullYear()} SWAGGER. Todos os direitos reservados.
      </div>
    </footer>
  );
}
