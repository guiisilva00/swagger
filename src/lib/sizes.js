const SIZE_SETS = {
  "men's clothing": ["PP", "P", "M", "G", "GG"],
  "women's clothing": ["PP", "P", "M", "G", "GG"],
};

/**
 * Returns the size options for a category, or null when the category
 * doesn't use sizes (e.g. jewelery/acessórios — the current catalog has no
 * clothing items in that category, so a size selector wouldn't map to
 * anything real). No per-size stock data exists yet, so every returned size
 * is just an option — availability defaults to "all available" until a real
 * backend can report otherwise.
 */
export function getSizesForCategory(category) {
  return SIZE_SETS[category] ?? null;
}
