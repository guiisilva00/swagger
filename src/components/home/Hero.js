import HeroCarousel from "./HeroCarousel";

const SLIDES = [
  {
    id: "brand",
    eyebrow: "Coleção Atual",
    title: "Vista sua atitude.",
    description:
      "Peças essenciais, cortes limpos e uma identidade que é só sua.",
    ctaLabel: "Comprar agora",
    ctaHref: "/produtos",
    image: "/images/hero/hero-01.jpg",
  },
  {
    id: "masculino",
    eyebrow: "Masculino",
    title: "Essenciais para todos os dias.",
    description: "Peças pensadas para durar além da estação.",
    ctaLabel: "Explorar Masculino",
    ctaHref: "/produtos?categoria=masculino",
    image: "/images/hero/hero-02.jpg",
  },
  {
    id: "feminino",
    eyebrow: "Feminino",
    title: "Seu estilo. Suas regras.",
    description: "Descubra a seleção feminina da SWAGGER.",
    ctaLabel: "Explorar Feminino",
    ctaHref: "/produtos?categoria=feminino",
    image: "/images/hero/hero-03.jpg",
  },
];

export default function Hero() {
  return (
    <>
      <h1 className="sr-only">SWAGGER — Moda que representa você.</h1>
      <HeroCarousel slides={SLIDES} />
    </>
  );
}
