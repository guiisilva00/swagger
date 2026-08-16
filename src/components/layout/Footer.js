import Link from "next/link";
import Logo from "@/components/ui/Logo";

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
    <footer className="border-t border-border">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Logo variant="color" width={128} />
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
            Street is an attitude.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {column.title}
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative text-sm text-muted transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-[width] after:duration-200 hover:text-foreground hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border px-6 py-6 text-center text-xs uppercase tracking-wide text-subtle sm:px-8">
        © {new Date().getFullYear()} SWAGGER. Todos os direitos reservados.
      </div>
    </footer>
  );
}
