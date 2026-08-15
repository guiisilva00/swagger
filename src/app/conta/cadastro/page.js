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
      <p className="text-xs uppercase tracking-wide text-zinc-500">
        Seja bem-vindo
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50">
        Criar conta
      </h1>

      <form className="mt-8 flex flex-col gap-4">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-xs uppercase tracking-wide text-zinc-500"
          >
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="h-11 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-50 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-xs uppercase tracking-wide text-zinc-500"
          >
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="h-11 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-50 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-xs uppercase tracking-wide text-zinc-500"
          >
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            className="h-11 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-50 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
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

      <p className="mt-6 text-center text-sm text-zinc-500">
        Já tem conta?{" "}
        <Link
          href="/conta/login"
          className="text-zinc-50 underline-offset-4 hover:underline"
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}
