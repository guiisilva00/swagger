import { CATEGORY_LABELS, SLUG_TO_CATEGORY } from "@/lib/format";

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

  if (precoMin) {
    const min = Number(precoMin);
    if (!Number.isNaN(min)) {
      result = result.filter((product) => product.price >= min);
    }
  }

  if (precoMax) {
    const max = Number(precoMax);
    if (!Number.isNaN(max)) {
      result = result.filter((product) => product.price <= max);
    }
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

/**
 * Merge `updates` into the current search params and return the resulting
 * href for `pathname`. A falsy value in `updates` deletes that param.
 * Centralizes the query-string merge used by Filters, SortSelect and
 * ActiveFilters so the three stay in sync.
 */
export function buildFilterHref(pathname, searchParams, updates) {
  const params = new URLSearchParams(searchParams.toString());

  Object.entries(updates).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

/**
 * Describe the currently active filters/sort as a flat list, for rendering
 * removable chips. Each entry knows how to clear itself via `updates`.
 */
export function describeActiveFilters(searchParams) {
  const chips = [];

  const categoria = searchParams.get("categoria");
  if (categoria && SLUG_TO_CATEGORY[categoria]) {
    chips.push({
      key: "categoria",
      label: CATEGORY_LABELS[SLUG_TO_CATEGORY[categoria]],
      updates: { categoria: null },
    });
  }

  const precoMin = searchParams.get("precoMin");
  const precoMax = searchParams.get("precoMax");
  if (precoMin || precoMax) {
    const label =
      precoMin && precoMax
        ? `$${precoMin} – $${precoMax}`
        : precoMin
          ? `A partir de $${precoMin}`
          : `Até $${precoMax}`;
    chips.push({
      key: "preco",
      label,
      updates: { precoMin: null, precoMax: null },
    });
  }

  const busca = searchParams.get("busca");
  if (busca) {
    chips.push({
      key: "busca",
      label: `"${busca}"`,
      updates: { busca: null },
    });
  }

  const ordenar = searchParams.get("ordenar");
  if (ordenar && ordenar !== "relevancia") {
    const option = SORT_OPTIONS.find((item) => item.value === ordenar);
    if (option) {
      chips.push({
        key: "ordenar",
        label: option.label,
        updates: { ordenar: null },
      });
    }
  }

  return chips;
}
