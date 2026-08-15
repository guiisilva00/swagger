const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefixes a root-relative public asset path (e.g. "/images/x.jpg") with the
 * site's basePath, if any. Needed because next/image's `src` isn't
 * auto-prefixed for plain string paths when images.unoptimized is set.
 */
export function assetPath(path) {
  return `${BASE_PATH}${path}`;
}
