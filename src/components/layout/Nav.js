import Link from "next/link";

const LINKS = [
  { label: "Masculino", href: "/produtos?categoria=masculino" },
  { label: "Feminino", href: "/produtos?categoria=feminino" },
  { label: "Acessórios", href: "/produtos?categoria=acessorios" },
];

export default function Nav({ className = "" }) {
  return (
    <nav className={className}>
      {LINKS.map((link) =>
        link.disabled ? (
          <span
            key={link.label}
            aria-disabled="true"
            title="Em breve"
            className="cursor-not-allowed text-sm uppercase tracking-wide text-subtle"
          >
            {link.label}
          </span>
        ) : (
          <Link
            key={link.label}
            href={link.href}
            className="relative text-sm uppercase tracking-wide text-muted transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-[width] after:duration-200 hover:text-foreground hover:after:w-full"
          >
            {link.label}
          </Link>
        )
      )}
    </nav>
  );
}
