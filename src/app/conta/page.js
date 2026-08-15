import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Minha Conta",
  description: "Acesse sua conta ou crie uma nova na SWAGGER.",
};

export default function ContaPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 px-6 py-16 text-center sm:px-8">
      <div>
        <p className="text-xs uppercase tracking-wide text-zinc-500">
          Minha conta
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50">
          Entre ou crie sua conta
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          Em breve você poderá acompanhar pedidos e salvar preferências.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button href="/conta/login" variant="primary">
          Entrar
        </Button>
        <Button href="/conta/cadastro" variant="secondary">
          Criar conta
        </Button>
      </div>

      <Link
        href="/favoritos"
        className="text-sm text-zinc-500 underline-offset-4 hover:text-zinc-50 hover:underline"
      >
        Ver meus favoritos
      </Link>
    </div>
  );
}
