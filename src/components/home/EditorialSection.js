import Image from "next/image";
import Button from "@/components/ui/Button";
import { assetPath } from "@/lib/basePath";

export default function EditorialSection() {
  return (
    <section className="relative flex h-[70vh] max-h-[640px] min-h-[420px] items-center overflow-hidden">
      <Image
        src={assetPath("/images/editorial/editorial-01.jpg")}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[50%_38%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B160D]/90 via-[#1B160D]/35 to-[#1B160D]/10" />

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8">
        <div className="max-w-lg">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-yellow">
            SWAGGER Journal
          </p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight text-white sm:text-6xl">
            Moda é identidade.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-white/80">
            Cada peça conta uma história. Explore a coleção completa e
            encontre a sua.
          </p>
          <Button
            href="/produtos"
            variant="secondary"
            className="mt-8 border-2 border-white text-white hover:bg-white hover:text-brand-ink"
          >
            Explorar
          </Button>
        </div>
      </div>
    </section>
  );
}
