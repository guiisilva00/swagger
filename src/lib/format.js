export const CATEGORY_LABELS = {
  "men's clothing": "Masculino",
  "women's clothing": "Feminino",
  jewelery: "Acessórios",
};

export const ALLOWED_CATEGORIES = Object.keys(CATEGORY_LABELS);

export const CATEGORY_SLUGS = {
  "men's clothing": "masculino",
  "women's clothing": "feminino",
  jewelery: "acessorios",
};

export const SLUG_TO_CATEGORY = Object.fromEntries(
  Object.entries(CATEGORY_SLUGS).map(([category, slug]) => [slug, category])
);

export function categoryLabel(category) {
  return CATEGORY_LABELS[category] ?? category;
}

export function categorySlug(category) {
  return CATEGORY_SLUGS[category];
}

export function isStoreCategory(category) {
  return ALLOWED_CATEGORIES.includes(category);
}

export function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}
