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
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/**
 * Placeholder for a future "Novidades" feature. The catalog snapshot has no
 * creation date, so there's no legitimate way to say a product is new yet —
 * this always returns false. Wire it up once a real `createdAt`/`dateAdded`
 * field exists on the product data.
 */
export function isNewProduct(_product) {
  return false;
}
