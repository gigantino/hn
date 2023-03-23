import type { AstroGlobal } from "astro";

export default function getPage(Astro: Readonly<AstroGlobal<Record<string, any>>>) {
  const rawPage = Number(Astro.url.searchParams.get("page"));
  return isNaN(rawPage) || rawPage <= 1 ? 1 : rawPage;
}
