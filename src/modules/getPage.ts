import type { AstroGlobal } from "astro";

const getPage = (Astro: Readonly<AstroGlobal<Record<string, any>>>) => {
  const rawPage = Number(Astro.url.searchParams.get("page"));
  return isNaN(rawPage) || rawPage <= 1 ? 1 : rawPage;
};

export default getPage;
