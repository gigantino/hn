import type { AstroCookies } from "astro";

const PERSONALIZATION_COOKIES = ["theme", "zoom", "bookmarks"];

export const applyEdgeCache = (
  cookies: AstroCookies,
  response: { headers: Headers },
  maxAge: number,
) => {
  response.headers.set("Vary", "Cookie");

  if (PERSONALIZATION_COOKIES.some((name) => cookies.has(name))) {
    response.headers.set("Cache-Control", "private, no-store");
    return;
  }

  response.headers.set(
    "Cache-Control",
    `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 2}`,
  );
};
