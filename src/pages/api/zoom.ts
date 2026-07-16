import validateZoom from "@modules/zoom";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const formData = await request.formData();
  const zoom = formData.get("zoom")?.toString();
  const redirectUrl = formData.get("redirect")?.toString() || "/settings";

  const validatedZoom = validateZoom(zoom);

  cookies.set("zoom", validatedZoom, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return redirect(redirectUrl, 303);
};
