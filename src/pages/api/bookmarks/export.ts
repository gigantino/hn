import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies }) => {
  const cookieValue = cookies.get("bookmarks")?.value;
  const bookmarks = cookieValue
    ? cookieValue
        .split(",")
        .map((id) => parseInt(id, 10))
        .filter((id) => !isNaN(id))
    : [];

  return new Response(JSON.stringify({ bookmarks }, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="hn-bookmarks.json"',
    },
  });
};
