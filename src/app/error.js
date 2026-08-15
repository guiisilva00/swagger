"use client";

import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

export default function Error({ reset }) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-24 sm:px-8">
      <EmptyState
        title="Algo deu errado"
        description="Ocorreu um erro inesperado ao carregar esta página."
        action={
          <Button as="button" type="button" onClick={() => reset()} variant="primary">
            Tentar novamente
          </Button>
        }
      />
    </div>
  );
}
