import type { APIRoute } from "astro";
import formRedirect from "@modules/formRedirect";
import { setPreferenceCookie } from "@modules/cookies";
import validateZoom from "@modules/zoom";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const formData = await request.formData();
  const redirectUrl = formRedirect(formData, "/settings");

  setPreferenceCookie(cookies, "zoom", validateZoom(formData.get("zoom")?.toString()));

  return redirect(redirectUrl, 303);
};
