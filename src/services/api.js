import products from "@/data/products.json";

export async function getProducts() {
  return products;
}

export async function getProduct(id) {
  return products.find((product) => String(product.id) === String(id)) ?? null;
}

export async function getCategories() {
  return [...new Set(products.map((product) => product.category))];
}
