import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-24 sm:px-8">
      <EmptyState
        title="404 — Página não encontrada"
        description="A página que você procura não existe ou foi movida."
        action={
          <div className="flex gap-3">
            <Button href="/" variant="primary">
              Voltar à home
            </Button>
            <Button href="/produtos" variant="secondary">
              Ver produtos
            </Button>
          </div>
        }
      />
    </div>
  );
}
