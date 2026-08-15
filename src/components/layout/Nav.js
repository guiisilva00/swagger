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
            className="text-sm uppercase tracking-wide text-muted transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        )
      )}
    </nav>
  );
}
