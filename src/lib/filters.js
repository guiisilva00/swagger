import { SLUG_TO_CATEGORY } from "@/lib/format";

export const SORT_OPTIONS = [
  { value: "relevancia", label: "Relevância" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "melhor-avaliacao", label: "Melhor avaliação" },
];

export function filterProducts(products, { categoria, precoMin, precoMax, busca }) {
  let result = products;

  if (categoria && SLUG_TO_CATEGORY[categoria]) {
    result = result.filter(
      (product) => product.category === SLUG_TO_CATEGORY[categoria]
    );
  }

  const min = Number(precoMin);
  if (!Number.isNaN(min) && precoMin !== undefined && precoMin !== "") {
    result = result.filter((product) => product.price >= min);
  }

  const max = Number(precoMax);
  if (!Number.isNaN(max) && precoMax !== undefined && precoMax !== "") {
    result = result.filter((product) => product.price <= max);
  }

  if (busca) {
    const query = busca.toLowerCase();
    result = result.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
  }

  return result;
}

export function sortProducts(products, ordenar) {
  const result = [...products];

  switch (ordenar) {
    case "menor-preco":
      return result.sort((a, b) => a.price - b.price);
    case "maior-preco":
      return result.sort((a, b) => b.price - a.price);
    case "melhor-avaliacao":
      return result.sort((a, b) => b.rating.rate - a.rating.rate);
    default:
      return result;
  }
}
