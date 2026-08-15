const BASE_URL = "https://fakestoreapi.com";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);

  if (!res.ok) {
    throw new Error(`Falha ao buscar produtos: ${res.status}`);
  }

  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error(`Falha ao buscar produto: ${res.status}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`);

  if (!res.ok) {
    throw new Error(`Falha ao buscar categorias: ${res.status}`);
  }

  return res.json();
}
