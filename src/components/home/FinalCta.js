import Button from "@/components/ui/Button";

export default function FinalCta() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20 text-center sm:px-8 sm:py-28">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
        SWAGGER
      </p>
      <h2 className="mx-auto mt-3 max-w-xl font-display text-3xl uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
        Street is an attitude.
      </h2>
      <Button href="/produtos" variant="primary" className="mt-8">
        Ver coleção completa
      </Button>
    </section>
  );
}
