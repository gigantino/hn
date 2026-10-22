import type { APIRoute } from "astro";
import { SITE_URL } from "@modules/seo";

const LISTS = ["topstories", "askstories", "showstories"];
const SECTIONS = ["/", "/ask", "/show"];

const getIds = async (list: string): Promise<number[]> => {
  const response = await fetch(`${import.meta.env.HN_API}/${list}.json`);
  if (!response.ok) return [];
  return (await response.json()) ?? [];
};

const entry = (path: string, changefreq: string) =>
  `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <changefreq>${changefreq}</changefreq>\n  </url>`;

export const GET: APIRoute = async () => {
  const ids = new Set((await Promise.all(LISTS.map(getIds))).flat());
  const urls = [
    ...SECTIONS.map((path) => entry(path, "hourly")),
    ...[...ids].map((id) => entry(`/item/${id}`, "daily")),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
};
