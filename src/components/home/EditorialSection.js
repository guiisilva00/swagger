import Image from "next/image";
import Button from "@/components/ui/Button";

export default function EditorialSection() {
  return (
    <section className="relative flex h-[70vh] max-h-[640px] min-h-[420px] items-center overflow-hidden">
      <Image
        src="/images/editorial/editorial-01.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[50%_25%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8">
        <div className="max-w-lg">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
            SWAGGER Journal
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Moda é identidade.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-white/80">
            Cada peça conta uma história. Explore a coleção completa e
            encontre a sua.
          </p>
          <Button
            href="/produtos"
            variant="secondary"
            className="mt-8 border-white text-white hover:border-white/70 hover:bg-white/10"
          >
            Explorar
          </Button>
        </div>
      </div>
    </section>
  );
}
