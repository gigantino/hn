import type { APIRoute } from "astro";
import { getBookmarks } from "@modules/bookmarks";

export const GET: APIRoute = async ({ cookies }) =>
  new Response(JSON.stringify({ bookmarks: getBookmarks(cookies) }, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="hn-bookmarks.json"',
    },
  });
