import Button from "@/components/ui/Button";

export default function FinalCta() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20 text-center sm:px-8 sm:py-28">
      <p className="text-xs uppercase tracking-wide text-muted">SWAGGER</p>
      <h2 className="mx-auto mt-3 max-w-xl text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Moda que representa você.
      </h2>
      <Button href="/produtos" variant="primary" className="mt-8">
        Ver coleção completa
      </Button>
    </section>
  );
}
