import type { AstroGlobal } from "astro";
import getPage from "@modules/getPage";
import type { HNItem } from "@/types/hn";

const ITEMS_PER_PAGE = 20;

const loadListing = async (Astro: AstroGlobal, basePath: string, list: string, filter?: string | null) => {
  const page = getPage(Astro.url);

  const data: undefined | number[] = await (await fetch(`${import.meta.env.HN_API}/${list}.json`)).json();
  if (!data) return Astro.redirect("/404");

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  if (page > totalPages && totalPages > 0) {
    const params = new URLSearchParams();
    params.set("page", String(totalPages));
    if (filter) params.set("filter", filter);
    return Astro.redirect(`${basePath}?${params.toString()}`);
  }

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const items: (HNItem | null)[] = await Promise.all(
    data
      .slice(startIndex, startIndex + ITEMS_PER_PAGE)
      .map(async (id) => (await fetch(`${import.meta.env.HN_API}/item/${id}.json`)).json()),
  );
  const posts = items.filter((item): item is HNItem => !!item && !item.deleted && !item.dead);

  if (posts.length == 0 && page === 1) return Astro.redirect("/404");

  return {
    page,
    totalPages,
    posts,
    baseUrl: filter ? `${basePath}?filter=${filter}` : basePath,
  };
};

export default loadListing;
