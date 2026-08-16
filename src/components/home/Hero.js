import HeroCarousel from "./HeroCarousel";

const SLIDES = [
  {
    id: "brand",
    eyebrow: "New Drop",
    title: "Street is an attitude.",
    description:
      "Peças com atitude urbana, cortes ousados e uma identidade que é só sua.",
    ctaLabel: "Shop Now",
    ctaHref: "/produtos",
    image: "/images/hero/hero-01.jpg",
    focus: "50% 18%",
  },
  {
    id: "masculino",
    eyebrow: "Masculino",
    title: "Concreto sob os pés.",
    description: "Peças construídas para a rua, feitas para durar.",
    ctaLabel: "Ver Masculino",
    ctaHref: "/produtos?categoria=masculino",
    image: "/images/hero/hero-02.jpg",
    focus: "50% 18%",
  },
  {
    id: "feminino",
    eyebrow: "Feminino",
    title: "Sem pedir licença.",
    description: "Descubra a seleção feminina da SWAGGER.",
    ctaLabel: "Ver Feminino",
    ctaHref: "/produtos?categoria=feminino",
    image: "/images/hero/hero-03.jpg",
    focus: "50% 32%",
  },
];

export default function Hero() {
  return (
    <>
      <h1 className="sr-only">SWAGGER — Street is an attitude.</h1>
      <HeroCarousel slides={SLIDES} />
    </>
  );
}
