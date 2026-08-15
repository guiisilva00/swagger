import HeroCarousel from "./HeroCarousel";

export default function Hero({ accentProducts = [] }) {
  const slides = [
    {
      id: "brand",
      eyebrow: "Coleção Atual",
      title: "Vista sua atitude.",
      description:
        "Peças essenciais, cortes limpos e uma identidade que é só sua.",
      ctaLabel: "Ver coleção",
      ctaHref: "/produtos",
    },
    {
      id: "feminino",
      eyebrow: "Feminino",
      title: "Seu estilo. Sua identidade.",
      description: "Descubra a seleção feminina da SWAGGER.",
      ctaLabel: "Explorar Feminino",
      ctaHref: "/produtos?categoria=feminino",
      image: accentProducts[0]?.image,
    },
    {
      id: "masculino",
      eyebrow: "Masculino",
      title: "Não siga tendências. Crie as suas.",
      description: "Peças pensadas para durar além da estação.",
      ctaLabel: "Explorar Masculino",
      ctaHref: "/produtos?categoria=masculino",
      image: accentProducts[1]?.image,
    },
  ];

  return (
    <>
      <h1 className="sr-only">SWAGGER — Moda que representa você.</h1>
      <HeroCarousel slides={slides} />
    </>
  );
}
