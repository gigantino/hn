import type { APIRoute } from "astro";
import { BLOCKED_CRAWLERS } from "@modules/crawlers";

export const prerender = true;

const body = `${BLOCKED_CRAWLERS.map((agent) => `User-agent: ${agent}`).join("\n")}
Disallow: /

User-agent: *
Allow: /
Disallow: /api/theme
Disallow: /api/zoom
Disallow: /api/bookmarks
Disallow: /settings
Disallow: /bookmarks
Disallow: /search
Disallow: /@

Sitemap: https://hn.ggtn.ch/sitemap.xml
`;

export const GET: APIRoute = () =>
  new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
