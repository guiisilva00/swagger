import Link from "next/link";
import Button from "@/components/ui/Button";
import AuthNotice from "@/components/account/AuthNotice";

export const metadata = {
  title: "Criar Conta",
  description: "Crie sua conta SWAGGER.",
};

export default function CadastroPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16 sm:px-8">
      <p className="text-xs uppercase tracking-wide text-muted">
        Seja bem-vindo
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
        Criar conta
      </h1>

      <form className="mt-8 flex flex-col gap-4">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-xs uppercase tracking-wide text-muted"
          >
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-foreground focus:border-border-strong focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-xs uppercase tracking-wide text-muted"
          >
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-foreground focus:border-border-strong focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-xs uppercase tracking-wide text-muted"
          >
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            className="h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-foreground focus:border-border-strong focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        <Button
          as="button"
          type="submit"
          disabled
          variant="primary"
          className="mt-2 w-full"
          title="Cadastro ainda não disponível nesta demo"
        >
          Criar conta
        </Button>
      </form>

      <AuthNotice>
        Este formulário ainda não está conectado a um backend de
        autenticação — nada é enviado ou salvo.
      </AuthNotice>

      <p className="mt-6 text-center text-sm text-muted">
        Já tem conta?{" "}
        <Link
          href="/conta/login"
          className="text-foreground underline-offset-4 hover:underline"
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}
