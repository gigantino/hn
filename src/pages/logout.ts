import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, request }) => {
  cookies.delete("auth_user");
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
};
